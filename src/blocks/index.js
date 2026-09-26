/* ============================================================
Вита — Конструктор контента · blocks/index.js
Все типы блоков vcc-v1: декларации полей + рендер в экспортный HTML.
Именование классов: vcc-* (неймспейс контракта), вся стилизация —
на токенах --mp-* с фолбэками.
============================================================ */
'use strict';

(function () {
	/* Кнопка-хелпер (как btnHtml в landing.js — файлы изолированы IIFE,
	 * поэтому здесь своя копия; класс и поведение те же). */
	function alertBtnHtml(label, url, kind) {
		label = String(label || '').trim();
		if (!label) return '';
		var href = String(url || '').trim();
		href = /^form:\d+$/i.test(href) ? href : vccSafeHref(href);
		return '<a class="vcc-btn vcc-btn--' + (kind || 'ghost') + '" href="' + vccEscapeHtml(href) + '">' + vccInline(label) + '</a>';
	}

	/* --- Заголовок --- */
	BlockRegistry.register({
		type: 'heading',
		label: 'Заголовок',
		icon: 'fa-header',
		group: 'text',
		defaults: { level: 2, text: 'Новый заголовок', seo_tag: 'div' },
		fields: [
			{ key: 'level', label: 'Размер текста', type: 'select', options: [['2', 'H2-размер (26px)'], ['3', 'H3-размер (21px)'], ['4', 'H4-размер (18px)']] },
			{ key: 'text', label: 'Текст', type: 'textarea', rows: 2, markdown: true },
			{ key: 'seo_tag', label: 'SEO-тег (по умолчанию div — H1 на странице один, его ставит сама страница)', type: 'select', options: [['div', 'div — нейтральный (рекомендуется)'], ['h1', 'h1 — главный (ОДИН на страницу!)'], ['h2', 'h2 — раздел'], ['h3', 'h3 — подраздел'], ['h4', 'h4 — пункт']] }
		].concat(vccButtonFields()),
		toHTML: function (data) {
			var level = [2, 3, 4].indexOf(parseInt(data.level, 10)) !== -1 ? parseInt(data.level, 10) : 2;
			var btn = vccButton({ label: data.btn_label, url: data.btn_url, bg: data.btn_bg, size: data.btn_size, icon: data.btn_icon, icon_after: data.btn_icon_after });
			var row = btn ? '<div class="vcc-btnrow">' + btn + '</div>' : '';
			/* SEO: тег выбирается явно (по умолчанию div), размер живёт в классе */
			return vccHeadingHtml(data.seo_tag, 'vcc-heading vcc-heading--h' + level, vccInline(data.text || '')) + row;
		}
	});

	/* --- Абзац --- */
	BlockRegistry.register({
		type: 'paragraph',
		label: 'Текст',
		icon: 'fa-align-left',
		group: 'text',
		defaults: { text: 'Текст абзаца. Поддерживается **жирный**, *курсив*, `код`, [ссылки](https://example.com) и [соглашения](agree:3).' },
		fields: [
			{ key: 'text', label: 'Текст', type: 'textarea', rows: 5, markdown: true }
		].concat(vccButtonFields()),
		toHTML: function (data) {
			var btn = vccButton({ label: data.btn_label, url: data.btn_url, bg: data.btn_bg, size: data.btn_size, icon: data.btn_icon, icon_after: data.btn_icon_after });
			var row = btn ? '<div class="vcc-btnrow">' + btn + '</div>' : '';
			return '<div class="vcc-paragraph">' + vccBlock(data.text || '') + '</div>' + row;
		}
	});

	/* --- Список --- */
	BlockRegistry.register({
		type: 'list',
		label: 'Список',
		icon: 'fa-list-ul',
		group: 'text',
		defaults: { ordered: false, items: 'Первый пункт\nВторой пункт\nТретий пункт' },
		fields: [
			{ key: 'ordered', label: 'Нумерованный', type: 'checkbox' },
			{ key: 'items', label: 'Пункты (каждый с новой строки)', type: 'textarea', rows: 5, markdown: true }
		].concat(vccButtonFields()),
		toHTML: function (data) {
			var tag = data.ordered ? 'ol' : 'ul';
			var lines = String(data.items || '').split(/\r?\n/).filter(function (l) { return l.trim() !== ''; });
			if (!lines.length) return '';
			var html = '<' + tag + ' class="vcc-list' + (data.ordered ? ' vcc-list--ordered' : '') + '">';
			for (var i = 0; i < lines.length; i++) {
				html += '<li>' + vccInline(lines[i]) + '</li>';
			}
			html += '</' + tag + '>';
			var btn = vccButton({ label: data.btn_label, url: data.btn_url, bg: data.btn_bg, size: data.btn_size, icon: data.btn_icon, icon_after: data.btn_icon_after });
			if (btn) html += '<div class="vcc-btnrow">' + btn + '</div>';
			return html;
		}
	});

	/* --- Цитата --- */
	BlockRegistry.register({
		type: 'quote',
		label: 'Цитата',
		icon: 'fa-quote-left',
		group: 'text',
		defaults: { text: 'Текст цитаты', author: '' },
		fields: [
			{ key: 'text', label: 'Текст', type: 'textarea', rows: 3, markdown: true },
			{ key: 'author', label: 'Автор (опционально)', type: 'text', markdown: false }
		].concat(vccButtonFields()),
		toHTML: function (data) {
			var html = '<blockquote class="vcc-quote">' + vccBlock(data.text || '');
			if (data.author && String(data.author).trim() !== '') {
				html += '<footer class="vcc-quote__author">— ' + vccInline(data.author) + '</footer>';
			}
			html += '</blockquote>';
			var btn = vccButton({ label: data.btn_label, url: data.btn_url, bg: data.btn_bg, size: data.btn_size, icon: data.btn_icon, icon_after: data.btn_icon_after });
			if (btn) html += '<div class="vcc-btnrow">' + btn + '</div>';
			return html;
		}
	});

	/* --- Врезка (alert) --- */
	BlockRegistry.register({
		type: 'alert',
		label: 'Врезка',
		icon: 'fa-exclamation-circle',
		group: 'text',
		defaults: { style: 'info', look: 'fill', text: 'Важная информация для покупателя.' },
		fields: [
			{
				key: 'style', label: 'Стиль', type: 'select',
				options: [['info', 'Информация'], ['success', 'Успех'], ['warning', 'Внимание'], ['danger', 'Важно']]
			},
			{
				key: 'look', label: 'Исполнение', type: 'select',
				options: [['fill', 'Заливка (как референс)'], ['leftbar', 'Левая кромка 4px'], ['topline', 'Линия сверху']]
			},
			{ key: 'text', label: 'Текст', type: 'textarea', rows: 3, markdown: true },
			{ key: 'btn1_label', label: 'Кнопка 1 — текст (необязательно)', type: 'text' },
			{ key: 'btn1_url', label: 'Кнопка 1 — ссылка', type: 'text' },
			{ key: 'btn2_label', label: 'Кнопка 2 — текст (необязательно)', type: 'text' },
			{ key: 'btn2_url', label: 'Кнопка 2 — ссылка', type: 'text' }
		],
		toHTML: function (data) {
			var style = ['info', 'success', 'warning', 'danger'].indexOf(data.style) !== -1 ? data.style : 'info';
			var look = ['fill', 'leftbar', 'topline'].indexOf(data.look) !== -1 ? data.look : 'fill';
			var lookCls = look === 'fill' ? ' vcc-alert--fill' : (look === 'leftbar' ? ' vcc-alert--leftbar' : ' vcc-alert--topline');
			var btns = '';
			var b1 = alertBtnHtml(data.btn1_label, data.btn1_url, 'ghost');
			var b2 = alertBtnHtml(data.btn2_label, data.btn2_url, 'ghost');
			if (b1 || b2) btns = '<div class="vcc-alert__actions">' + b1 + b2 + '</div>';
			var main = vccButton({ label: data.btn_label, url: data.btn_url, bg: data.btn_bg, size: data.btn_size, icon: data.btn_icon, icon_after: data.btn_icon_after });
			if (main) btns = '<div class="vcc-alert__actions">' + main + '</div>' + btns;
			return '<div class="vcc-alert vcc-alert--' + style + lookCls + '">' + vccBlock(data.text || '') + btns + '</div>';
		}
	});

	/* --- Табы --- */
	BlockRegistry.register({
		type: 'tabs',
		label: 'Табы',
		icon: 'fa-folder-o',
		group: 'text',
		defaults: { tabs: [{ title: 'Вкладка 1', content: 'Содержимое первой вкладки.' }, { title: 'Вкладка 2', content: 'Содержимое второй вкладки.' }] },
		fields: [
			{ key: 'tabs', label: 'Вкладки', type: 'tabs-editor' }
		].concat(vccButtonFields()),
		toHTML: function (data) {
			var list = Array.isArray(data.tabs) ? data.tabs : [];
			if (!list.length) return '';
			var html = '<div class="vcc-tabs" data-vcc-tabs>';
			html += '<div class="vcc-tabs__nav">';
			for (var i = 0; i < list.length; i++) {
				html += '<button type="button" class="vcc-tabs__btn' + (i === 0 ? ' is-active' : '') + '" data-vcc-tab="' + i + '">' + vccInline(list[i].title || '') + '</button>';
			}
			html += '</div><div class="vcc-tabs__panels">';					for (var j = 0; j < list.length; j++) {
					html += '<div class="vcc-tabs__panel' + (j === 0 ? ' is-active' : '') + '" data-vcc-panel="' + j + '">' + vccBlock(list[j].content || '') + '</div>';
				}
				html += '</div>';
				var btn = vccButton({ label: data.btn_label, url: data.btn_url, bg: data.btn_bg, size: data.btn_size, icon: data.btn_icon, icon_after: data.btn_icon_after });
				if (btn) html += '<div class="vcc-btnrow">' + btn + '</div>';
				return html + '</div>';
		}
	});

	/* --- Таблица (0.7.0: конструктор строк/колонок вместо « | »-списка).
	 * Каждая ячейка — отдельное markdown-поле: ссылки, кнопки форм [текст](form:ID),
	 * акцент, соглашения. Модель: headers: [String], rows: [[String,…]] — плоская. */
	BlockRegistry.register({
		type: 'table',
		label: 'Таблица',
		icon: 'fa-table',
		group: 'text',
		defaults: {
			cols: '2',
			headers: ['Параметр', 'Значение'],
			rows: [
				['Гарантия', '12 месяцев'],
				['Доставка', '[Рассчитать](form:0)']
			]
		},
		fields: function (block) {
			var cols = Math.max(1, Math.min(4, parseInt(block && block.data && block.data.cols, 10) || 2));
			var headerFields = [];
			for (var c = 0; c < cols; c++) {
				headerFields.push({ key: 'h' + c, label: 'Заголовок ' + (c + 1), type: 'text', mark: 'hcol', idx: c });
			}
			var colFields = [];
			for (var k = 0; k < cols; k++) {
				colFields.push({ key: 'c' + k, label: 'Колонка ' + (k + 1), type: 'textarea', rows: 2, markdown: true, mark: 'rcol', idx: k });
			}
			return [
				{ key: 'cols', label: 'Колонок', type: 'select', options: [['2', '2'], ['3', '3'], ['4', '4']] },
				{ key: '_hh', label: 'Заголовки', type: 'group-label' }
			].concat(headerFields).concat([
				{
					key: 'rows', label: 'Строки', type: 'rows-editor', addLabel: 'Добавить строку', max: 30,
					itemFields: colFields,
					itemTitle: function (item, i) { return 'Строка ' + (i + 1) + (item && item.c0 ? ' — ' + String(item.c0).slice(0, 24) : ''); }
				},								{ key: '_hint', label: 'В каждой ячейке работает markdown: [ссылка](https://…), [кнопка формы](form:ID), ==акцент==, **жирный**. Для характеристик товара есть отдельный блок «Спецификация», для «мы vs альтернативы» — «Сравнение».', type: 'hint' }
						].concat(vccButtonFields()));
		},
		toHTML: function (data) {
			var cols = Math.max(1, Math.min(4, parseInt(data.cols, 10) || 2));
			/* Обратная совместимость: старый формат хранил headers/rows строками
			 * («A\nB», ячейки через « | ») — рендерим их как раньше */
			var headers = Array.isArray(data.headers)
				? data.headers
				: (String(data.headers || '').trim() ? String(data.headers).split(/\r?\n/) : []);
			var rowList = Array.isArray(data.rows)
				? data.rows
				: (String(data.rows || '').trim() ? String(data.rows).split(/\r?\n/) : []);
			var rows = rowList.map(function (r) {
				return Array.isArray(r) ? r : String(r || '').split('|').map(function (cell) { return cell.trim(); });
			});
			if (!headers.length && !rows.length) return '';
			var html = '<div class="vcc-table-wrap"><table class="vcc-table">';
			var hasHeaders = headers.some(function (h) { return String(h || '').trim() !== ''; });
			if (hasHeaders) {
				html += '<thead><tr>';
				for (var i = 0; i < cols; i++) html += '<th>' + vccInline(headers[i] || '') + '</th>';
				html += '</tr></thead>';
			}
			html += '<tbody>';
			for (var r = 0; r < rows.length; r++) {
				var cells = rows[r];
				html += '<tr>';
				for (var cc = 0; cc < cols; cc++) html += '<td>' + vccInline(String(cells[cc] || '')) + '</td>';
				html += '</tr>';
			}
			html += '</tbody></table></div>';
			var btn = vccButton({ label: data.btn_label, url: data.btn_url, bg: data.btn_bg, size: data.btn_size, icon: data.btn_icon, icon_after: data.btn_icon_after });
			if (btn) html += '<div class="vcc-btnrow">' + btn + '</div>';
			return html;
		}
	});

	/* --- Изображение --- */
	BlockRegistry.register({
		type: 'image',
		label: 'Картинка',
		icon: 'fa-picture-o',
		group: 'text',
		defaults: { path: '', caption: '' },
		fields: [
			{ key: 'path', label: 'Путь или URL (image/catalog/... или https://)', type: 'text' },
			{ key: 'caption', label: 'Подпись (опционально)', type: 'text' }
		].concat(vccButtonFields()),
		toHTML: function (data) {
			var src = vccSafeHref(data.path || '');
			if (src === '#') return '';
			var html = '<figure class="vcc-figure"><img class="vcc-figure__img" src="' + vccEscapeHtml(src) + '" alt="' + vccEscapeHtml(data.caption || '') + '" loading="lazy" />';
			if (data.caption && String(data.caption).trim() !== '') {
				html += '<figcaption class="vcc-figure__caption">' + vccInline(data.caption) + '</figcaption>';
			}
			html += '</figure>';
			var btn = vccButton({ label: data.btn_label, url: data.btn_url, bg: data.btn_bg, size: data.btn_size, icon: data.btn_icon, icon_after: data.btn_icon_after });
			if (btn) html += '<div class="vcc-btnrow">' + btn + '</div>';
			return html;
		}
	});

	/* --- Оглавление --- */
	BlockRegistry.register({
		type: 'toc',
		label: 'Оглавление',
		icon: 'fa-list-ol',
		group: 'text',
		defaults: { title: 'Содержание', style: 'header' },
		fields: [
			{ key: 'title', label: 'Заголовок (опционально)', type: 'text' },
			{ key: 'style', label: 'Отображение', type: 'select', options: [['header', 'Сверху (в контенте)'], ['column', 'Фиксированная левая колонка']] }
		].concat(vccButtonFields()),
		/* Список ссылок заполняется на магазине после рендера статьи (см. README: шаг после импорта не нужен — якоря создаёт сама тема).
		 * style: header — бокс в потоке контента; column — sticky-колонка слева
		 * (обёртку .vcc-toc-wrap строит рантайм темы, см. common.js initVccTocColumn). */
		toHTML: function (data) {
			var style = data.style === 'column' ? 'column' : 'header';
			var cls = style === 'column' ? 'vcc-toc vcc-toc--column' : 'vcc-toc';
			var html = '<nav class="' + cls + '" data-vcc-toc>';
			if (data.title && String(data.title).trim() !== '') {
				html += '<div class="vcc-toc__title">' + vccInline(data.title) + '</div>';
			}
			html += '<ol class="vcc-toc__list"></ol></nav>';
			/* Кнопка у toc — только в стиле header (в колонке неуместна) */
			if (style === 'header') {
				var btn = vccButton({ label: data.btn_label, url: data.btn_url, bg: data.btn_bg, size: data.btn_size, icon: data.btn_icon, icon_after: data.btn_icon_after });
				if (btn) html += '<div class="vcc-btnrow">' + btn + '</div>';
			}
			return html;
		}
	});
})();
