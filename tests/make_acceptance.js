#!/usr/bin/env node
/* Контрольный экспорт (приёмка «собрал → скопировал → вставил»):
 * репрезентативный проект через РЕАЛЬНЫЙ VccExport.buildHtml (живой реестр).
 * OUT=<path> — куда писать сырой экспорт. */
'use strict';
const fs = require('fs');
global.window = global; global.location = { search: '' };
global.document = {
	addEventListener: function () {}, querySelector: function () { return null; },
	documentElement: { setAttribute: function () {}, style: { setProperty: function () {} } },
	createElement: function () { return { style: {}, classList: { add: function () {}, remove: function () {}, toggle: function () {} }, setAttribute: function () {}, appendChild: function () {}, addEventListener: function () {} }; }
};
global.localStorage = { getItem: function () { return null; }, setItem: function () {}, removeItem: function () {} };
const code = fs.readFileSync(__dirname + '/../js/app.js', 'utf8');
const hook = 'global.__T = { BR: BlockRegistry, Export: VccExport };';
eval(code.replace(/\}\)\(\);\s*$/, hook + '\n})();'));
const Export = global.__T.Export;

const proj = {
	type: 'vita-constructor-project', contract: 'vcc-v1',
	title: 'Контрольный сбор', slug: 'acceptance',
	blocks: [
		{ id: 'a1', type: 'hero', data: {
			kicker: 'Сообщество с 2020 года',
			title: 'OPENCART\nКЛУБ: ==СООБЩЕСТВО ЭКСПЕРТОВ==',
			sub: 'Обменивайтесь опытом и находите проверенные модули.',
			btn1_label: 'Присоединиться в Telegram', btn1_url: '#telegram', btn1_style: 'dark', btn1_size: 'lg', btn1_icon: 'telegram',
			btn2_label: 'Проверить сайт', btn2_url: '#site',
			note: '800+ участников · Бесплатно · Без спама', note_lined: true,
			align: 'left', title_size: 'xl',
			sec: { bg: 'none', padding: 'l', width: 'default' }
		}},
		{ id: 'a2', type: 'row', data: {
			left_mode: 'promo',
			left_badge: 'Самый продаваемый',
			left_promo_title: 'UniShop2 — универсальный шаблон',
			left_promo_text: 'Всё из коробки за день.',
			left_promo_btn_label: 'Купить шаблон →', left_promo_btn_url: 'form:14',
			right_card: 'key_card',
			right_meta_left: 'Купон от автора', right_meta_right: '-15%',
			right_label: 'Скидка на UniShop2',
			right_value: '3834-uni-opencartclub', right_value_dim: 'uni',
			right_window: true,
			right_chips: 'fa-lock | Копируйте при покупке',
			right_copy: true, right_copy_label: 'Скопировать купон',
			sec: { bg: 'none', padding: 'm', width: 'default' }
		}},
		{ id: 'a3', type: 'paragraph', data: { text: 'Проверка **жирного**, ==акцента== и `кода` в обычном абзаце.', btn_label: 'Текстовая кнопка', btn_url: 'https://example.com', btn_bg: 'link', btn_size: 'sm' } },
		{ id: 'a4', type: 'list', data: { ordered: false, items: 'Квадратная точка-акцент\nЖирные lead-слова — основным цветом', btn_label: 'Кнопка списка', btn_url: '#go', btn_bg: 'ghost', btn_size: 'md' } },
		{ id: 'a5', type: 'alert', data: { style: 'warning', text: 'Врезка с кнопками.', btn1_label: 'Ghost 1', btn1_url: '#a', btn_label: 'Универсальная', btn_url: 'form:14', btn_bg: 'dark', btn_size: 'full' } },
		{ id: 'a6', type: 'stats', data: { style: 'strips', items: [ { value: 'OC 3.x', label: 'Платформы' }, { value: '6', label: 'Инструментов' } ], sec: { bg: 'none', padding: 's', width: 'default' } } },
		{ id: 'a7', type: 'toc', data: { title: 'Содержание', style: 'column' } },
		{ id: 'a8', type: 'heading', data: { level: 2, text: 'Проверенные решения', btn_label: 'Кнопка заголовка', btn_url: '#h', btn_bg: 'primary', btn_size: 'lg', btn_icon: 'arrow-right', btn_icon_after: true } }
	]
};

const html = Export.buildHtml(proj);
fs.writeFileSync(process.env.OUT, html, 'utf8');
console.log('EXPORT OK: ' + html.length + ' chars');
