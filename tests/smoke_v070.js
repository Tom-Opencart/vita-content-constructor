#!/usr/bin/env node
/* Смоук-тест v0.7.0 (чек-лист спеки §11):
 * 1) все 34 блока экспортируются с дефолтными и максимальными данными;
 * 2) в экспорте нет запрещённых тегов/атрибутов (whitelist санитайзера темы);
 * 3) гекс-линт export.css: нет hex вне var(--mp-*, fallback);
 * 4) JSON round-trip проекта;
 * 5) VccVideo.resolve: youtube/vimeo/iframe/script/чужой хост. */
'use strict';
const fs = require('fs');

global.window = {};
global.location = { search: '' };
global.document = {
	addEventListener: function () {},
	querySelector: function () { return null; },
	documentElement: { setAttribute: function () {}, style: { setProperty: function () {} } },
	createElement: function () { return { style: {}, classList: { add: function () {}, remove: function () {}, toggle: function () {} }, setAttribute: function () {}, appendChild: function () {}, addEventListener: function () {} }; }
};

const code = fs.readFileSync('js/app.js', 'utf8');
const hook = 'global.__T = { BR: BlockRegistry, Export: VccExport, Import: VccImport, Store: VccStore, inline: vccInline, block: vccBlock, norm: vccNormalizeProject };';
eval(code.replace(/\}\)\(\);\s*$/, hook + '\n})();'));

const BR = global.__T.BR, Export = global.__T.Export, Import = global.__T.Import, Store = global.__T.Store;
const types = Object.keys(BR.getAll());
let fails = 0;
function ok(cond, name) {
	if (cond) { console.log('OK   ' + name); } else { fails++; console.log('FAIL ' + name); }
}

/* --- Whitelist санитайзера темы (§3 спеки) --- */
const allowedTags = new Set(['h1','h2','h3','h4','h5','h6','p','div','span','br','hr','strong','b','em','i','u','s','sub','sup','code','pre','ul','ol','li','blockquote','figure','figcaption','table','thead','tbody','tr','th','td','a','img','details','summary','nav','footer','button']);
const allowedAttrs = new Set(['class','dir','lang','href','title','target','rel','data-agree','src','alt','width','height','loading','open','type','start','colspan','scope','rowspan']);

function checkHtml(html, label) {
	const problems = [];
	// Теги
	const tagRe = /<\/?([a-zA-Z][a-zA-Z0-9-]*)((?:\s+[^<>]*?)?)\/?>/g;
	let m;
	while ((m = tagRe.exec(html)) !== null) {
		const tag = m[1].toLowerCase();
		if (!allowedTags.has(tag)) problems.push('tag <' + tag + '>');
		const attrs = m[2] || '';
		const attrRe = /([a-zA-Z-]+)\s*=/g;
		let a;
		while ((a = attrRe.exec(attrs)) !== null) {
			const name = a[1].toLowerCase();
			if (!allowedAttrs.has(name) && name.indexOf('data-vcc-') !== 0) problems.push('attr ' + name + ' on <' + tag + '>');
		}
		// Классы: только vcc-* и is-active
		const cls = attrs.match(/class\s*=\s*"([^"]*)"/);
		if (cls) {
			for (const c of cls[1].split(/\s+/)) {
				if (c && c.indexOf('vcc-') !== 0 && c !== 'is-active') problems.push('class ' + c);
			}
		}
		// href: safe-схемы
		const href = attrs.match(/href\s*=\s*"([^"]*)"/);
		if (href && !/^(#|https?:\/\/|\/|image\/|agree:\d+$|form:\d+$)/i.test(href[1]) && href[1] !== '') problems.push('href ' + href[1].slice(0, 40));
		// script/iframe вообще не должны пройти как теги
		if (tag === 'script' || tag === 'iframe' || tag === 'style' || tag === 'video' || tag === 'source') problems.push('forbidden tag <' + tag + '>');
	}
	ok(problems.length === 0, label + (problems.length ? ' → ' + [...new Set(problems)].slice(0, 6).join(', ') : ''));
}

/* --- 1) Экспорт всех блоков: дефолты + max-данные --- */
for (const t of types) {
	const def = BR.get(t);
	// Дефолты. Моки toHTML у шорткод-блоков — это ЧИПЫ редактора с FA-иконкой:
	// они не идут в экспорт (экспортируется toExportHTML), FA в интерфейсе допустим.
	const hasExport = typeof def.toExportHTML === 'function';
	if (!hasExport) {
		const d0 = BR.createBlock(t);
		checkHtml(def.toHTML(d0.data), 'default.toHTML ' + t);
	}
	// Максимальные данные
	const max = { sec: { eyebrow: 'Бровь', title: 'Заголовок <b>с html</b> & кавычками', text: 'Подзаголовок с **жирным** и ==акцентом== и [кнопкой](form:26) и [соглашением](agree:3)', align: 'left', bg: 'image', image: 'image/catalog/x.jpg', video: 'https://example.com/bg.mp4', overlay: true, padding: 'xl', width: 'full', anchor: 'Anchor-1' }, items: [] };
	for (let i = 1; i <= 3; i++) {
		max.items.push({
			src: 'image/catalog/logo' + i + '.png', alt: 'Alt & <co> ' + i, url: 'https://example.com/' + i,
			icon: 'truck', title: 'Элемент ' + i + ' & more', text: 'Текст ==акцент== ' + i,
			md: 'Колонка **md** ' + i, value: String(10 * i), suffix: '+', label: 'Подпись ' + i,
			name: 'Имя ' + i, role: 'Роль', stars: i % 6, avatar: 'image/catalog/a' + i + '.jpg',
			photo: 'image/catalog/p' + i + '.jpg', image: 'image/catalog/d' + i + '.jpg', title2: null,
			price: 'от ' + (990 * i) + ' ₽', old_price: '1 990 ₽', period: '/мес', features: 'Пункт один\nВсё из X\n- a', featured: i === 1, flag_label: 'Флаг', btn_label: 'Кнопка', btn_url: 'form:' + i, note: 'Прим.',
			content: '<p class="vcc-paragraph">HTML ' + i + '</p>'
		});
	}
	max.cols = '4'; max.style = 'timeline'; max.ratio = '4x3';
	max.src = '<iframe src="https://www.youtube-nocookie.com/embed/abc123" allowfullscreen></iframe>';
	max.title = 'Видео <тест>'; max.open = true; max.flip = true; max.align2 = null;
	// tabs-структура для табов
	if (t === 'tabs') { max.tabs = max.items.map(function (it, i) { return { title: 'В ' + i, content: 'С ' + i }; }); }
	if (!hasExport) checkHtml(def.toHTML(max), 'max.toHTML ' + t);
	const mh = hasExport ? def.toExportHTML(max) : def.toHTML(max);
	if (typeof mh === 'string' && mh) checkHtml(mh, 'max.toExportHTML ' + t);
}

/* --- 2) Гекс-линт export.css --- */
const css = fs.readFileSync('css/export.css', 'utf8');
const hexLands = [];
const lines = css.split('\n');
lines.forEach((line, i) => {
	const stripped = line.replace(/var\([^)]*\)/g, 'VAR');
	const m = stripped.match(/#[0-9a-fA-F]{3,8}\b/g);
	if (m) hexLands.push('line ' + (i + 1) + ': ' + m.join(' '));
});
ok(hexLands.length === 0, 'гекс-линт export.css' + (hexLands.length ? ' → ' + hexLands.slice(0, 4).join(' | ') : ''));

/* --- 3) Round-trip проекта со всеми блоками --- */
const project = { title: 'Смоук <тест>', slug: 'smoke', themeMode: 'dark', theme: { preset: 'P', tokens: { '--mp-primary': '#123456' } }, blocks: [] };
for (const t of types) {
	const b = BR.createBlock(t);
	b.data.sec = { eyebrow: 'E', title: 'T', text: 'S', align: 'center', bg: 'light', image: 'image/catalog/i.jpg', video: '', overlay: true, padding: 'l', width: 'narrow', anchor: 'a-1' };
	b.data.items = [{ md: 'x', title: 'y', text: 'z', src: 'image/catalog/s.png', alt: 'a', icon: 'truck', value: '1', suffix: '%', label: 'l', name: 'n', role: 'r', stars: 3, avatar: '', photo: '', image: '', url: 'https://e.com', price: '9 ₽', period: '/мес', features: 'f1\nf2', featured: true, btn_label: 'B', btn_url: 'form:1', note: 'n', content: '<p class="vcc-paragraph">c</p>' }];
	if (t === 'video') b.data.src = 'https://youtu.be/abc123';
	if (t === 'tabs') b.data.tabs = [{ title: 'T1', content: 'C1' }];
	project.blocks.push(b);
}
const norm = global.__T.norm(project);
ok(norm.blocks.length === types.length, 'round-trip: все блоки прошли нормализацию');
const json = JSON.parse(JSON.stringify(Export.buildJson(norm)));
ok(json.blocks.every(b => b.data && b.data.sec && b.data.sec.bg === 'light'), 'round-trip: data.sec сохранился');
const reimported = JSON.parse(JSON.stringify(Import.importProject(JSON.stringify(json))));
ok(reimported.blocks.length === norm.blocks.length && reimported.blocks.every((b, i) => b.type === norm.blocks[i].type), 'round-trip: импорт проекта идентичен');

/* --- 4) Экспорт полного проекта: нет запрещённого, маркер на месте --- */
const html = Export.buildHtml(norm);
ok(html.indexOf('<!-- Вита — Конструктор контента | контракт: vcc-v1 -->') === 0, 'маркер контракта первым комментарием');
checkHtml(html, 'экспорт полного проекта (34 блока)');

/* --- 5) VccVideo.resolve --- */
const VccVideo = (function () {
	// resolve живёт в IIFE landing.js — доступен через глобал, выставленный там
	return window.VccVideo;
})();
const cases = [
	['https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'],
	['https://youtu.be/dQw4w9WgXcQ', 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'],
	['https://vimeo.com/123456789', 'https://player.vimeo.com/video/123456789'],
	['https://rutube.ru/video/abc123def0/', 'https://rutube.ru/play/embed/abc123def0'],
	['<iframe src="https://player.vimeo.com/video/999" title="x"></iframe>', 'https://player.vimeo.com/video/999'],
	['https://www.dailymotion.com/video/x7tgz0', 'https://www.dailymotion.com/embed/video/x7tgz0']
];
for (const [input, expected] of cases) {
	const r = VccVideo.resolve(input);
	ok(r.url === expected, 'video: ' + input.slice(0, 44) + ' → ' + (r.url || '(нет)'));
}
const bad = VccVideo.resolve('<script src="https://evil.example/widget.js"></script>');
ok(!bad.url && !!bad.warn, 'video: script-код → warning, url пуст');
const foreign = VccVideo.resolve('https://player.jwplatform.com/xyz');
ok(!foreign.url, 'video: чужой хост → без embed');

console.log('');
if (fails) { console.log('SMOKE FAILED: ' + fails); process.exit(1); }
console.log('SMOKE PASSED');
