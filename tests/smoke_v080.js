#!/usr/bin/env node
/* Смоук-тест v0.8.0 «Помощник» (чек-лист спеки docs/v0.8.0-ai-assistant.md §6):
 * 1) паспорт покрывает 100% реестра (каркас, правила, формат ответа);
 * 2) промт: донор/пожелания/строгий формат/пример блока, размер ≤ 25 КБ;
 * 3) extractJson: ```-забор, текст вокруг JSON, висячие запятые,
 *    массив без обёртки, unknown-тип → ошибка с ближайшим именем;
 * 4) собранный из ответа AI проект проходит нормализацию и импорт;
 * 5) гейт паспорта: docs/CONSTRUCTOR-PASSPORT.md = дампу бандла. */
'use strict';
const fs = require('fs');

global.window = global; /* VccSection виден как глобал */
global.location = { search: '' };
global.document = {
	addEventListener: function () {},
	querySelector: function () { return null; },
	documentElement: { setAttribute: function () {}, style: { setProperty: function () {} } },
	createElement: function () { return { style: {}, classList: { add: function () {}, remove: function () {}, toggle: function () {} }, setAttribute: function () {}, appendChild: function () {}, addEventListener: function () {} }; }
};
global.localStorage = { getItem: function () { return null; }, setItem: function () {}, removeItem: function () {} };

const code = fs.readFileSync('js/app.js', 'utf8');
const hook = 'global.__T = { BR: BlockRegistry, Passport: VccPassport, Import: VccImport, Store: VccStore, norm: vccNormalizeProject, version: VCC_APP_VERSION };';
// eslint-disable-next-line no-eval
eval(code.replace(/\}\)\(\);\s*$/, hook + '\n})();'));

const BR = global.__T.BR, P = global.__T.Passport, Import = global.__T.Import, norm = global.__T.norm;
let fails = 0;
function ok(cond, name) {
	if (cond) { console.log('OK   ' + name); } else { fails++; console.log('FAIL ' + name); }
}

/* --- 1) Паспорт покрывает реестр --- */
const types = Object.keys(BR.getAll());
const doc = P.buildPassportMd();
ok(types.every(t => doc.indexOf('#### ' + t + ' —') !== -1), 'паспорт: все ' + types.length + ' типов в реестре');
ok(doc.indexOf('vita-constructor-project') !== -1 && doc.indexOf('vcc-v1') !== -1, 'паспорт: каркас проекта');
ok(doc.indexOf('Общие поля секции') !== -1 && doc.indexOf('data.sec') !== -1, 'паспорт: общие поля секции');
ok(doc.indexOf('Ровно один H1') !== -1, 'паспорт: правило одного H1');
ok(doc.indexOf('заглушки') !== -1, 'паспорт: тексты-заглушки (ремикс)');
ok(doc.indexOf('ТОЛЬКО JSON') !== -1, 'паспорт: формат ответа');
ok(doc.indexOf(global.__T.version) !== -1, 'паспорт: маркер версии ' + global.__T.version);

/* --- 2) Промт --- */
const prompt = P.buildPrompt('https://example.com/landing', 'акцент на тарифы, без блога');
ok(prompt.indexOf('https://example.com/landing') !== -1, 'промт: донор на месте');
ok(prompt.indexOf('акцент на тарифы') !== -1, 'промт: пожелания на месте');
ok(prompt.indexOf('ТОЛЬКО JSON') !== -1, 'промт: строгий формат ответа');
ok(prompt.indexOf('"type": "hero"') !== -1 || prompt.indexOf('"type":"hero"') !== -1, 'промт: пример блока целиком');
ok(types.every(t => prompt.indexOf('#### ' + t + ' —') !== -1), 'промт: строгий реестр — все типы');
ok(prompt.length <= 25 * 1024, 'промт: ≤ 25 КБ (' + (prompt.length / 1024).toFixed(1) + ' КБ)');
const promptNoDonor = P.buildPrompt('', '');
ok(promptNoDonor.indexOf('ДОНОР') === -1 && promptNoDonor.indexOf('ПОЖЕЛАНИЯ') === -1, 'промт: работает без донора и пожеланий');

/* --- 3) extractJson: починка --- */
function extract(name, cond) { ok(cond, 'extractJson: ' + name); }

const clean = { type: 'vita-constructor-project', contract: 'vcc-v1', title: 'T', blocks: [{ id: 'b1', type: 'hero', data: { title: 'X' } }] };
extract('чистый JSON проходит', P.extractJson(JSON.stringify(clean, null, 2)).ok);

const fenced = '```json\n' + JSON.stringify(clean) + '\n```';
const r2 = P.extractJson(fenced);
extract('```-забор срезан', r2.ok && r2.warnings.some(w => w.indexOf('markdown') !== -1));

const noisy = 'Вот структура страницы, которую вы просили:\n' + JSON.stringify(clean) + '\nНадеюсь, помог!';
extract('JSON извлечён из текста с пояснениями', P.extractJson(noisy).ok);

const trailing = '{"type":"vita-constructor-project","contract":"vcc-v1","blocks":[{"type":"hero","data":{"title":"X"},}]}';
extract('висячая запятая починена', P.extractJson(trailing).ok);

const bare = [{ type: 'hero', data: { title: 'X' } }, { type: 'cta', data: {} }];
const r5 = P.extractJson(JSON.stringify(bare));
extract('массив блоков обёрнут в каркас', r5.ok && r5.data.type === 'vita-constructor-project');

const badType = { type: 'vita-constructor-project', contract: 'vcc-v1', blocks: [{ type: 'tarifs', data: {} }] };
const r6 = P.extractJson(JSON.stringify(badType));
extract('unknown-тип → ошибка с ближайшим именем (pricing)',
	!r6.ok && r6.errors.some(e => e.indexOf('tarifs') !== -1 && e.indexOf('pricing') !== -1));

extract('чужой type → человеческая ошибка',
	!P.extractJson('{"type":"other","blocks":[]}').errors.every(e => e.indexOf('vita-constructor-project') === -1));
extract('чужой контракт → ошибка с именем',
	!P.extractJson('{"type":"vita-constructor-project","contract":"v9","blocks":[{"type":"hero"}]}').ok);
extract('пустой ответ → ошибка', !P.extractJson('').ok && !P.extractJson('   ').ok);
extract('ответ без JSON → ошибка', !P.extractJson('Модель не смогла построить проект, извините.').ok);

const big = { type: 'vita-constructor-project', contract: 'vcc-v1', blocks: [] };
for (let i = 0; i < 25; i++) big.blocks.push({ type: 'paragraph', data: { text: 'P' + i } });
const rBig = P.extractJson(JSON.stringify(big));
extract('>20 блоков → предупреждение, но успех', rBig.ok && rBig.warnings.some(w => w.indexOf('25') !== -1));

/* --- 4) Собранный из ответа проект проходит полный конвейер --- */
const aiAnswer = '```json\n' + JSON.stringify({
	blocks: [
		{ type: 'hero', data: { title: 'Заголовок', sub: 'Подзаголовок', align: 'center', btn1_label: 'Оставить заявку', btn1_url: 'form:0', sec: { bg: 'image', overlay: true, padding: 'xl', anchor: 'start' } } },
		{ type: 'features', data: { sec: { eyebrow: 'Почему мы', title: 'Преимущества', bg: 'light' }, cols: '3', items: [{ icon: 'truck', title: 'Быстро', text: 'В день заказа' }] } },
		{ type: 'vita_faq', data: { faqId: 0, title: 'Вопросы и ответы' } },
		{ type: 'cta', data: { text: 'Готовы?', btn1_label: 'Поехали', btn1_url: 'form:0', sec: { bg: 'primary' } } }
	]
}) + '\n```';
const rAI = P.extractJson(aiAnswer);
ok(rAI.ok, 'конвейер: ответ AI из промта принят');
const normalized = norm(rAI.data);
ok(normalized.blocks.length === 4, 'конвейер: 4 блока после нормализации (id/поля добраны)');
ok(normalized.blocks.every(b => b.id && b.type), 'конвейер: у всех блоков есть id и type');
const reimport = Import.importProject(JSON.stringify({ type: 'vita-constructor-project', contract: 'vcc-v1', blocks: normalized.blocks }));
ok(reimport.blocks.length === 4, 'конвейер: проект импортируется штатным импортом');

/* --- 5) Гейт паспорта --- */
const passportFile = fs.readFileSync('docs/CONSTRUCTOR-PASSPORT.md', 'utf8');
ok(passportFile === doc, 'гейт: docs/CONSTRUCTOR-PASSPORT.md = дампу бандла');

console.log('');
if (fails) { console.log('SMOKE FAILED: ' + fails); process.exit(1); }
console.log('SMOKE PASSED');
