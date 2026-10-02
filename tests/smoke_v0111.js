#!/usr/bin/env node
/* Смоук-тест v0.10.11 «Пикер иконок Font Awesome 4.7»:
 * 1) список сгенерирован из CSS темы: нет алиасов, нет мусорных имён,
 *    нет дублей между категориями, ключевые иконки на месте;
 * 2) normalizeIcon: срезает fa-, регистр, мусорные символы;
 * 3) ВСЕ поля иконок в реестре переведены на icon-picker, а поля
 *    «иконка после текста» (чекбоксы) и «пилюли» не сломаны;
 * 4) экспорт не изменился: iconHtml по-прежнему пишет data-vcc-icon,
 *    сырых fa-классов в разметке нет. */
'use strict';
const fs = require('fs');

global.window = global;
global.location = { search: '' };
global.document = {
	addEventListener: function () {},
	querySelector: function () { return null; },
	documentElement: { setAttribute: function () {}, style: { setProperty: function () {} } },
	createElement: function () { return { style: {}, classList: { add: function () {}, remove: function () {}, toggle: function () {} }, setAttribute: function () {}, appendChild: function () {}, addEventListener: function () {} }; }
};
global.localStorage = { getItem: function () { return null; }, setItem: function () {}, removeItem: function () {} };

const code = fs.readFileSync('js/app.js', 'utf8');
const hook = 'global.__T = { BR: BlockRegistry, Passport: VccPassport, norm: vccNormalizeProject, version: VCC_APP_VERSION, normIcon: window.vccNormalizeIcon, faGroups: window.VCC_FA_GROUPS };';
// eslint-disable-next-line no-eval
eval(code.replace(/\}\)\(\);\s*$/, hook + '\n})();'));

const BR = global.__T.BR;
const normIcon = global.__T.normIcon;
const groups = global.__T.faGroups;
let fails = 0;
function ok(cond, name) {
	if (cond) { console.log('OK   ' + name); } else { fails++; console.log('FAIL ' + name); }
}

/* --- 1) Список иконок --- */
ok(Array.isArray(groups) && groups.length > 0, 'список категорий загружен');
const seen = {};
let total = 0, bad = 0, dupes = 0;
(groups || []).forEach(function (g) {
	ok(Array.isArray(g.icons) && g.icons.length > 0, 'категория «' + g.title + '» непустая');
	g.icons.forEach(function (n) {
		total++;
		if (!/^[a-z0-9-]+$/.test(n)) bad++;
		if (seen[n]) dupes++;
		seen[n] = true;
	});
});
ok(total > 700, 'иконок не меньше 700 (Font Awesome 4.7): ' + total);
ok(bad === 0, 'все имена — только [a-z0-9-]');
ok(dupes === 0, 'дублей между категориями нет');
['truck', 'shield', 'headphones', 'check', 'vk', 'telegram', 'instagram', 'star-o']
	.forEach(function (n) { ok(!!seen[n], 'иконка FA 4.7 «' + n + '» есть в списке'); });
ok(groups.filter(function (g) { return g.title.indexOf('Прочее') === 0; })
	.every(function (g) { return g.icons.length <= 120; }), 'остаток разложен по алфавиту (нет корзины на сотни)');

/* --- 2) Нормализация --- */
ok(normIcon('fa-truck') === 'truck', "normalizeIcon: ведущий 'fa-' срезан");
ok(normIcon('  Truck ') === 'truck', 'normalizeIcon: пробелы и регистр');
ok(normIcon('fa-user" onload=x') === 'useronloadx', 'normalizeIcon: инъекция в имя вырезана');
ok(normIcon(null) === '' && normIcon(undefined) === '', 'normalizeIcon: пустое значение');
ok(normIcon('') === '', 'normalizeIcon: пустая строка');

/* --- 3) Все поля иконок — icon-picker --- */
const MUST_PICKER = ['btn1_icon', 'btn2_icon', 'btn_icon', 'left_btn1_icon', 'left_promo_btn_icon'];
let pickerCount = 0, leftover = [], checkboxSafe = 0, chipsSafe = 0;
Object.keys(BR.getAll()).forEach(function (type) {
	const def = BR.get(type);
	let fields = typeof def.fields === 'function' ? def.fields({ data: {}, type: type }) : (def.fields || []);
	fields.forEach(function walk(f) {
		if (!f) return;
		if (f.type === 'icon-picker') pickerCount++;
		if (f.type === 'text' && /иконк/i.test(f.label || '') && MUST_PICKER.indexOf(f.key) === -1) {
			leftover.push(type + '.' + f.key);
		}
		/* Чекбоксы «иконка после текста» и текстовые «пилюли (иконка | текст)»
		   остались как были — их трогать было нельзя */
		if (f.type === 'checkbox' && /иконк/i.test(f.label || '')) checkboxSafe++;
		if (f.type === 'textarea' && /иконк/i.test(f.label || '')) chipsSafe++;
		(f.itemFields || []).forEach(walk);
		(f.tabs || []).forEach(function (t) { (t.fields || []).forEach(walk); });
	});
});
ok(pickerCount >= 13, 'полей icon-picker: ' + pickerCount + ' (ожидалось ≥ 13)');
ok(leftover.length === 0, 'текстовых полей иконок не осталось' + (leftover.length ? ': ' + leftover.join(', ') : ''));
ok(checkboxSafe > 0, 'чекбоксы «иконка после текста» целы: ' + checkboxSafe);
ok(chipsSafe > 0, 'текстовые «пилюли (иконка | текст)» целы: ' + chipsSafe);

/* --- 4) Экспорт не изменился --- */
const html = BR.get('features').toHTML({
	items: [{ icon: 'truck', title: 'Доставка', text: 'Быстро' }]
});
ok(html.indexOf('data-vcc-icon="fa-truck"') !== -1, 'экспорт: иконка едет в data-vcc-icon');
ok(!/\sclass="[^"]*\bfa\b/.test(html), 'экспорт: сырых fa-классов в разметке нет');
ok(BR.get('features').toHTML({ items: [{ icon: '', title: 'Без иконки', text: '' }] })
	.indexOf('data-vcc-icon') === -1, 'экспорт: пустая иконка не даёт мусорной разметки');
const promo = BR.get('promo_card').toHTML({ title: 'Акция', btn_label: 'Купить', btn_url: '#', btn_icon: 'fa-arrow-right' });
ok(promo.indexOf('data-vcc-icon="fa-arrow-right"') !== -1, 'экспорт: кнопка с иконкой (значение с fa- нормализуется)');

console.log(fails ? '\nSMOKE FAILED: ' + fails : '\nSMOKE PASSED');
process.exit(fails ? 1 : 0);
