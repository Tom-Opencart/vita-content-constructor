/* ============================================================
Вита — Конструктор контента · blocks/shortcodes.js
Блоки-шорткоды (M5): вставка живых модулей темы в контент.
  [vita_faq]  — FAQ-группы модуля «Вита — FAQ» (атрибуты: id, title)
  [vita_form] — форма модуля «Вита — Формы» (атрибут: id, обязателен)
Пикер ID (0.4.0): поля типа select со списком РЕАЛЬНЫХ групп/форм
из каталога пресета темы (store.catalog). Пустой каталог (пресет не
загружен или старый пресет) — то же поле превращается в ручной ввод
числа, ничего не ломается.
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
	/* Каталог из store: [] или готовые options для select.
	 * Подпись: название из магазина + счётчик (вопросы/тип формы). */
	function faqOptions() {
		var catalog = VccStore.getCatalog() || VCC_CATALOG_DEFAULT;
		var options = [['0', 'Все активные группы']];
		for (var i = 0; i < catalog.faqGroups.length; i++) {
			var g = catalog.faqGroups[i];
			options.push([String(g.id), 'Группа #' + g.id + ' · ' + (g.title || 'Без названия') + ' (' + g.count + ')']);
		}
		return options;
	}

	function formOptions() {
		var catalog = VccStore.getCatalog() || VCC_CATALOG_DEFAULT;
		var options = [['0', '— Выберите форму —']];
		for (var i = 0; i < catalog.forms.length; i++) {
			var f = catalog.forms[i];
			options.push([String(f.id), 'Форма #' + f.id + ' · ' + (f.title || 'Без названия')]);
		}
		return options;
	}

	function hasCatalog() {
		var catalog = VccStore.getCatalog() || VCC_CATALOG_DEFAULT;
		return catalog.faqGroups.length > 0 || catalog.forms.length > 0;
	}

	/* Подсказка над полями: откуда берётся список */
	function catalogHint() {
		var hint = {
			key: '_catalog_hint', label: hasCatalog()
				? 'Список из пресета вашего магазина — пересоздайте пресет, если добавили новые группы/формы'
				: 'Список появится после загрузки пресета магазина (шаг 1 онбординга) — пока введите ID вручную',
			type: 'hint'
		};
		return hint;
	}

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

	/* Подпись мока: имя из каталога, если ID там есть */
	function faqLabel(id, title) {
		var head = title ? '«' + title + '» · ' : '';
		if (!id) return head + 'все активные группы';
		var catalog = VccStore.getCatalog() || VCC_CATALOG_DEFAULT;
		for (var i = 0; i < catalog.faqGroups.length; i++) {
			if (catalog.faqGroups[i].id === id) {
				return head + (catalog.faqGroups[i].title || ('группа #' + id));
			}
		}
		return head + 'группа #' + id;
	}

	function formLabel(id) {
		if (!id) return 'форма не выбрана — выберите из списка или укажите ID';
		var catalog = VccStore.getCatalog() || VCC_CATALOG_DEFAULT;
		for (var i = 0; i < catalog.forms.length; i++) {
			if (catalog.forms[i].id === id) {
				return catalog.forms[i].title || ('форма #' + id);
			}
		}
		return 'форма #' + id;
	}

	/* --- FAQ-группы темы ([vita_faq]) --- */
	BlockRegistry.register({
		type: 'vita_faq',
		label: 'FAQ-группы (шорткод)',
		icon: 'fa-question-circle-o',
		group: 'modules',
		defaults: { faqId: 0, title: '' },
		fields: function () {
			return [
				catalogHint(),
				{ key: 'faqId', label: 'Группа FAQ', type: hasCatalog() ? 'select' : 'number', options: faqOptions(), picker: true },
				{ key: 'title', label: 'Заголовок блока (опционально)', type: 'text', placeholder: 'Оставьте пустым — возьмётся из группы' }
			];
		},
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
			return shortcodeChip('FAQ-группы темы', faqLabel(id, title));
		}
	});

	/* --- Формы темы ([vita_form]) --- */
	BlockRegistry.register({
		type: 'vita_form',
		label: 'Форма (шорткод)',
		icon: 'fa-wpforms',
		group: 'modules',
		defaults: { formId: 0 },
		fields: function () {
			return [
				catalogHint(),
				{ key: 'formId', label: 'Форма магазина', type: hasCatalog() ? 'select' : 'number', options: formOptions(), picker: true }
			];
		},
		/* Без формы шорткод ничего не выведет — не экспортируем блок вовсе */
		toExportHTML: function (data) {
			var id = Math.max(0, parseInt(data.formId, 10) || 0);
			if (!id) return '';
			return shortcodeWrap('[vita_form id="' + id + '"]');
		},
		toHTML: function (data) {
			var id = Math.max(0, parseInt(data.formId, 10) || 0);
			return shortcodeChip('Форма темы', formLabel(id));
		}
	});
})();
