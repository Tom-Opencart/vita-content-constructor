/* ============================================================
Вита — Конструктор контента · blocks/shortcodes.js
Блоки-шорткоды (M5): вставка живых модулей темы в контент.
  [vita_faq]  — FAQ-группы модуля «Вита — FAQ» (атрибуты: id, title)
  [vita_form] — форма модуля «Вита — Формы» (атрибут: id, обязателен)
Контракт vcc-v1:
  • в редакторе — некликабельный мок-плейсхолдер (стили app.css);
  • в экспорт идёт ТОЛЬКО литеральный шорткод в обёртке
    div.vcc-shortcode: движок шорткодов темы, событие
    catalog view after, заменяет vita-шорткоды на витрине;
    санитайзер модуля пропускает div, span и текст как есть;
  • id подставляются как числа — инъекция атрибутов невозможна.
Плейсхолдеры id:
  • faqId=0    → все активные группы (валидный вызов renderFaq)
  • formId=0   → форма не выбрана; экспорт этого блока = ''
============================================================ */
'use strict';

(function () {
	/* Общая часть: обёртка экспорта + чип в моке */
	function shortcodeWrap(shortcode) {
		return '<div class="vcc-shortcode">' + shortcode + '</div>';
	}

	function shortcodeChip(modules, hint) {
		var html = '<div class="vcc-shortcode-mock" aria-hidden="true">' +
			'<div class="vcc-shortcode-mock__head">' +
			'<i class="fa fa-magic"></i><span class="vcc-shortcode-mock__tag">' + vccEscapeHtml(modules) + '</span>' +
			'<span class="vcc-shortcode-mock__badge">шорткод темы</span></div>' +
			'<div class="vcc-shortcode-mock__body">' + vccEscapeHtml(hint) + '</div>' +
			'<div class="vcc-shortcode-mock__note">На витрине здесь выведется живой модуль — содержимое задаётся в админке магазина</div>' +
			'</div>';
		return html;
	}

	/* --- FAQ-группы темы ([vita_faq]) --- */
	BlockRegistry.register({
		type: 'vita_faq',
		label: 'FAQ-группы (шорткод)',
		icon: 'fa-question-circle-o',
		group: 'modules',
		defaults: { faqId: 0, title: '' },
		fields: [
			{ key: 'faqId', label: 'ID группы FAQ (0 — все активные)', type: 'number' },
			{ key: 'title', label: 'Заголовок блока (опционально)', type: 'text', placeholder: 'Оставьте пустым — возьмётся из группы' }
		],
		/* Экспорт: литеральный шорткод — на витрине тема рендерит FAQ */
		toExportHTML: function (data) {
			var id = Math.max(0, parseInt(data.faqId, 10) || 0);
			var title = String(data.title || '').trim();
			var sc = '[vita_faq' + (id ? ' id="' + id + '"' : '') + (title ? ' title="' + vccEscapeHtml(title) + '"' : '') + ']';
			return sc ? shortcodeWrap(sc) : '';
		},
		/* Редактор/галерея: некликабельный мок */
		toHTML: function (data) {
			var id = Math.max(0, parseInt(data.faqId, 10) || 0);
			var title = String(data.title || '').trim();
			var where = id ? 'группа #' + id : 'все активные группы';
			var head = title ? '«' + title + '» · ' : '';
			return shortcodeChip('FAQ-группы темы', head + where);
		}
	});

	/* --- Формы темы ([vita_form]) --- */
	BlockRegistry.register({
		type: 'vita_form',
		label: 'Форма (шорткод)',
		icon: 'fa-wpforms',
		group: 'modules',
		defaults: { formId: 0 },
		fields: [
			{ key: 'formId', label: 'ID формы (обязателен)', type: 'number', placeholder: 'Например, 26' }
		],
		/* Без формы шорткод ничего не выведет — не экспортируем блок вовсе */
		toExportHTML: function (data) {
			var id = Math.max(0, parseInt(data.formId, 10) || 0);
			if (!id) return '';
			return shortcodeWrap('[vita_form id="' + id + '"]');
		},
		toHTML: function (data) {
			var id = Math.max(0, parseInt(data.formId, 10) || 0);
			var hint = id ? 'форма #' + id : 'форма не выбрана — укажите ID формы';
			return shortcodeChip('Форма темы', hint);
		}
	});
})();
