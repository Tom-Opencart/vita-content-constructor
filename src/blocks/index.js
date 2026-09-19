/* ============================================================
Вита — Конструктор контента · blocks/index.js
Все типы блоков vcc-v1: декларации полей + рендер в экспортный HTML.
Именование классов: vcc-* (неймспейс контракта), вся стилизация —
на токенах --mp-* с фолбэками.
============================================================ */
'use strict';

(function () {
	/* --- Заголовок --- */
	BlockRegistry.register({
		type: 'heading',
		label: 'Заголовок',
		icon: 'fa-header',
		group: 'text',
		defaults: { level: 2, text: 'Новый заголовок' },
		fields: [
			{ key: 'level', label: 'Уровень', type: 'select', options: [['2', 'H2'], ['3', 'H3'], ['4', 'H4']] },
			{ key: 'text', label: 'Текст', type: 'textarea', rows: 2, markdown: true }
		],
		toHTML: function (data) {
			var level = [2, 3, 4].indexOf(parseInt(data.level, 10)) !== -1 ? parseInt(data.level, 10) : 2;
			return '<h' + level + ' class="vcc-heading vcc-heading--h' + level + '">' + vccInline(data.text || '') + '</h' + level + '>';
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
		],
		toHTML: function (data) {
			return '<div class="vcc-paragraph">' + vccBlock(data.text || '') + '</div>';
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
		],
		toHTML: function (data) {
			var tag = data.ordered ? 'ol' : 'ul';
			var lines = String(data.items || '').split(/\r?\n/).filter(function (l) { return l.trim() !== ''; });
			if (!lines.length) return '';
			var html = '<' + tag + ' class="vcc-list">';
			for (var i = 0; i < lines.length; i++) {
				html += '<li>' + vccInline(lines[i]) + '</li>';
			}
			return html + '</' + tag + '>';
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
		],
		toHTML: function (data) {
			var html = '<blockquote class="vcc-quote">' + vccBlock(data.text || '');
			if (data.author && String(data.author).trim() !== '') {
				html += '<footer class="vcc-quote__author">— ' + vccInline(data.author) + '</footer>';
			}
			return html + '</blockquote>';
		}
	});

	/* --- Врезка (alert) --- */
	BlockRegistry.register({
		type: 'alert',
		label: 'Врезка',
		icon: 'fa-exclamation-circle',
		group: 'text',
		defaults: { style: 'info', text: 'Важная информация для покупателя.' },
		fields: [
			{
				key: 'style', label: 'Стиль', type: 'select',
				options: [['info', 'Информация'], ['success', 'Успех'], ['warning', 'Внимание'], ['danger', 'Важно']]
			},
			{ key: 'text', label: 'Текст', type: 'textarea', rows: 3, markdown: true }
		],
		toHTML: function (data) {
			var style = ['info', 'success', 'warning', 'danger'].indexOf(data.style) !== -1 ? data.style : 'info';
			return '<div class="vcc-alert vcc-alert--' + style + '">' + vccBlock(data.text || '') + '</div>';
		}
	});

	/* --- Спойлер (FAQ) --- */
	BlockRegistry.register({
		type: 'spoiler',
		label: 'Спойлер',
		icon: 'fa-chevron-down',
		group: 'text',
		defaults: { title: 'Вопрос', text: 'Ответ.', opened: false },
		fields: [
			{ key: 'title', label: 'Заголовок (вопрос)', type: 'text' },
			{ key: 'text', label: 'Текст (ответ)', type: 'textarea', rows: 4, markdown: true },
			{ key: 'opened', label: 'Раскрыт по умолчанию', type: 'checkbox' }
		],
		toHTML: function (data) {
			var open = data.opened ? ' open' : '';
			var inner = vccBlock(data.text || '');
			return '<details class="vcc-spoiler"' + open + '>' +
				'<summary class="vcc-spoiler__summary">' + vccInline(data.title || '') + '</summary>' +
				'<div class="vcc-spoiler__body">' + inner + '</div>' +
				'</details>';
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
		],
		toHTML: function (data) {
			var list = Array.isArray(data.tabs) ? data.tabs : [];
			if (!list.length) return '';
			var html = '<div class="vcc-tabs" data-vcc-tabs>';
			html += '<div class="vcc-tabs__nav">';
			for (var i = 0; i < list.length; i++) {
				html += '<button type="button" class="vcc-tabs__btn' + (i === 0 ? ' is-active' : '') + '" data-vcc-tab="' + i + '">' + vccInline(list[i].title || '') + '</button>';
			}
			html += '</div><div class="vcc-tabs__panels">';
			for (var j = 0; j < list.length; j++) {
				html += '<div class="vcc-tabs__panel' + (j === 0 ? ' is-active' : '') + '" data-vcc-panel="' + j + '">' + vccBlock(list[j].content || '') + '</div>';
			}
			return html + '</div></div>';
		}
	});

	/* --- Таблица --- */
	BlockRegistry.register({
		type: 'table',
		label: 'Таблица',
		icon: 'fa-table',
		group: 'text',
		defaults: { headers: 'Параметр\nЗначение', rows: 'Гарантия\n12 месяцев' },
		fields: [
			{ key: 'headers', label: 'Заголовки (каждый с новой строки)', type: 'textarea', rows: 3 },
			{ key: 'rows', label: 'Строки (столбцы через « | », строки с новой строки)', type: 'textarea', rows: 5, markdown: false }
		],
		toHTML: function (data) {
			var headers = String(data.headers || '').split(/\r?\n/).filter(function (h) { return h.trim() !== ''; });
			var rowLines = String(data.rows || '').split(/\r?\n/).filter(function (r) { return r.trim() !== ''; });
			if (!headers.length && !rowLines.length) return '';
			var html = '<div class="vcc-table-wrap"><table class="vcc-table">';
			if (headers.length) {
				html += '<thead><tr>';
				for (var i = 0; i < headers.length; i++) html += '<th>' + vccInline(headers[i]) + '</th>';
				html += '</tr></thead>';
			}
			html += '<tbody>';
			for (var r = 0; r < rowLines.length; r++) {
				var cells = rowLines[r].split('|');
				html += '<tr>';
				for (var c = 0; c < cells.length; c++) html += '<td>' + vccInline(cells[c].trim()) + '</td>';
				html += '</tr>';
			}
			return html + '</tbody></table></div>';
		}
	});

	/* --- Изображение --- */
	BlockRegistry.register({
		type: 'image',
		label: 'Картинка',
		icon: 'fa-picture-o',
		group: 'media',
		defaults: { path: '', caption: '' },
		fields: [
			{ key: 'path', label: 'Путь или URL (image/catalog/... или https://)', type: 'text' },
			{ key: 'caption', label: 'Подпись (опционально)', type: 'text' }
		],
		toHTML: function (data) {
			var src = vccSafeHref(data.path || '');
			if (src === '#') return '';
			var html = '<figure class="vcc-figure"><img class="vcc-figure__img" src="' + vccEscapeHtml(src) + '" alt="' + vccEscapeHtml(data.caption || '') + '" loading="lazy" />';
			if (data.caption && String(data.caption).trim() !== '') {
				html += '<figcaption class="vcc-figure__caption">' + vccInline(data.caption) + '</figcaption>';
			}
			return html + '</figure>';
		}
	});

	/* --- Оглавление --- */
	BlockRegistry.register({
		type: 'toc',
		label: 'Оглавление',
		icon: 'fa-list-ol',
		group: 'text',
		defaults: { title: 'Содержание' },
		fields: [
			{ key: 'title', label: 'Заголовок (опционально)', type: 'text' }
		],
		/* Список ссылок заполняется на магазине после рендера статьи (см. README: шаг после импорта не нужен — якоря создаёт сама тема). */
		toHTML: function (data) {
			var html = '<nav class="vcc-toc" data-vcc-toc>';
			if (data.title && String(data.title).trim() !== '') {
				html += '<div class="vcc-toc__title">' + vccInline(data.title) + '</div>';
			}
			return html + '<ol class="vcc-toc__list"></ol></nav>';
		}
	});
})();
