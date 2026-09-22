/* ============================================================
Вита — Конструктор контента · blocks/shortcodes.js
Блоки-шорткоды (M5, 0.5.0): вставка живых модулей темы в контент.
  [vita_faq]          — FAQ-группы модуля «Вита — FAQ» (атрибуты: id, title)
  [vita_form]         — форма модуля «Вита — Формы» (атрибут: id, обязателен)
  [vita_testimonial]  — отзывы о магазине (атрибуты: id | count, random)
  [vita_visual]       — инстанс «Вита — Визуальные блоки» (слайдер/баннер/LookBook)
  [vita_all_in_one] — инстанс «Вита — Универсальные блоки товаров»
  [vita_extra_wall] — инстанс «Вита — Стена категорий, брендов и кастомных ссылок»
Пикер ID (0.4.0): поля типа select со списком РЕАЛЬНЫХ групп/форм/блоков
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
  • testimonialId=0 → без count≥1 экспорт = ''; с count — первые N последних
    (или случайных, random='1') отзывов status=1
  • blockId=0  → блок не выбран; экспорт этого блока = '' (vita_visual/
    vita_all_in_one/vita_extra_wall рендерят конкретный инстанс)
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

	function hasCatalog(key) {
		var catalog = VccStore.getCatalog() || VCC_CATALOG_DEFAULT;
		if (key) return (catalog[key] || []).length > 0;
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
			'<span class="vcc-shortcode-mock__badge">спец-метка темы</span></div>' +
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

	/* Отзывы (0.9.2): options/label пикера [vita_testimonial]. count несёт
	 * рейтинг — подпись селекта «Имя · город (5★)». */
	function testimonialOptions() {
		var catalog = VccStore.getCatalog() || VCC_CATALOG_DEFAULT;
		var options = [['0', '— Выберите отзыв —']];
		for (var i = 0; i < (catalog.testimonials || []).length; i++) {
			var t = catalog.testimonials[i];
			options.push([String(t.id), 'Отзыв #' + t.id + ' · ' + (t.title || 'Без автора') + (t.count ? ' (' + t.count + '\u2605)' : '')]);
		}
		return options;
	}

	function testimonialLabel(id) {
		if (!id) return 'отзыв не выбран — выберите из списка или укажите ID';
		var catalog = VccStore.getCatalog() || VCC_CATALOG_DEFAULT;
		for (var i = 0; i < (catalog.testimonials || []).length; i++) {
			if (catalog.testimonials[i].id === id) {
				return catalog.testimonials[i].title || ('отзыв #' + id);
			}
		}
		return 'отзыв #' + id;
	}

	/* --- Инстансы модулей темы ([vita_visual], [vita_all_in_one],
	 * [vita_extra_wall]): каталог ключа = список инстансов oc_module --- */
	function moduleOptions(listKey, emptyLabel) {
		var catalog = VccStore.getCatalog() || VCC_CATALOG_DEFAULT;
		var list = catalog[listKey] || [];
		var options = [[String(0), emptyLabel]];
		for (var i = 0; i < list.length; i++) {
			var m = list[i];
			options.push([String(m.id), 'Блок #' + m.id + ' · ' + (m.title || 'Без названия') + (!m.status ? ' (выключен)' : '')]);
		}
		return options;
	}

	function moduleLabel(listKey, id) {
		var catalog = VccStore.getCatalog() || VCC_CATALOG_DEFAULT;
		var list = catalog[listKey] || [];
		for (var i = 0; i < list.length; i++) {
			if (list[i].id === id) {
				return list[i].title || ('блок #' + id);
			}
		}
		return 'блок #' + id;
	}

	/* Общие поля/экспорт/мок для блоков-инстансов: id обязателен */
	function moduleBlock(type, label, icon, listKey, fieldLabel) {
		BlockRegistry.register({
			type: type,
			label: label,
			icon: icon,
			group: 'modules',
			defaults: { blockId: 0, sec: { bg: 'none', padding: 'm', width: 'default' } },
			fields: function () {
				return [
					catalogHint(),
					{ key: 'blockId', label: fieldLabel, type: hasCatalog(listKey) ? 'select' : 'number', options: moduleOptions(listKey, '— Выберите блок —'), picker: true }
				].concat(VccSection.fields());
			},
			/* Без ID шорткод ничего не выведет — не экспортируем блок вовсе.
			 * Секция (vcc-section) рисуется, когда задан фон/отступы/заголовок:
			 * движок шорткодов темы обрабатывает [vita_*] в любом выводе,
			 * санитайзер пропускает vcc-* классы и data-vcc-* атрибуты. */
			toExportHTML: function (data) {
				var id = Math.max(0, parseInt(data.blockId, 10) || 0);
				if (!id) return '';
				var sc = shortcodeWrap('[' + type + ' id="' + id + '"]');
				/* Секция рисуется только при осмысленных отклонениях от
				 * дефолта (bg none / pad m / width default): старые проекты
				 * без sec экспортируются как прежде — голым шорткодом. */
				var sec = data.sec || {};
				var hasSec = (sec.bg && sec.bg !== 'none') ||
					(sec.padding && sec.padding !== 'm') ||
					(sec.width && sec.width !== 'default') ||
					sec.anchor || sec.eyebrow || sec.title || sec.text;
				if (!hasSec) return sc;
				return VccSection.open(sec) + VccSection.head(sec) + sc + VccSection.close();
			},
			toHTML: function (data) {
				var id = Math.max(0, parseInt(data.blockId, 10) || 0);
				return shortcodeChip(label.replace(' (спец-метка)', ' магазина'), id ? moduleLabel(listKey, id) : 'блок не выбран — выберите из списка или укажите ID');
			}
		});
	}

	/* --- HTML-модуль темы ([vita_html]…[/vita_html]) — клапан отхода (0.7.0):
	 * точечная вёрстка, которой нет в каталоге блоков. Тема рендерит шорткод
	 * как есть; содержимое должно оставаться в whitelist санитайзера, чтобы
	 * файл выживал и при импорте через кнопку (путь B). --- */
	BlockRegistry.register({
		type: 'vita_html',
		label: 'HTML темы (спец-метка)',
		icon: 'fa-code',
		group: 'modules',
		defaults: { content: '<div class="vcc-paragraph">Ваш HTML…</div>', sec: { bg: 'none', padding: 'm', width: 'default' } },
		fields: function () {
			return [
				{ key: 'content', label: 'HTML (теги и классы — только из справочника контракта vcc)', type: 'textarea', rows: 10 },
				{ key: '_hint', label: 'Bootstrap-классы и теги вне whitelist (script, iframe, style) тема вырезает при импорте файла. Сервисные скрипты ставьте в поле «Custom JS» модуля, а не сюда.', type: 'hint' }
			].concat(VccSection.fields());
		},
		toExportHTML: function (data) {
			var content = String(data.content || '').trim();
			if (!content) return '';
			var sc = shortcodeWrap('[vita_html]' + content + '[/vita_html]');
			var sec = data.sec || {};
			var hasSec = (sec.bg && sec.bg !== 'none') ||
				(sec.padding && sec.padding !== 'm') ||
				(sec.width && sec.width !== 'default') ||
				sec.anchor || sec.eyebrow || sec.title || sec.text;
			if (!hasSec) return sc;
			return VccSection.open(sec) + VccSection.head(sec) + sc + VccSection.close();
		},
		toHTML: function (data) {
			return shortcodeChip('HTML темы', String(data.content || '').trim()
				? 'Переданный HTML выведется как есть (в рамках whitelist санитайзера)'
				: 'HTML не задан');
		}
	});

	moduleBlock('vita_visual', 'Визуальные блоки (спец-метка)', 'fa-picture-o', 'visualBlocks', 'Слайдер / Баннер / LookBook');
	moduleBlock('vita_all_in_one', 'Универсальные блоки товаров (спец-метка)', 'fa-th-large', 'productBlocks', 'Товарный блок магазина');
	moduleBlock('vita_extra_wall', 'Стена категорий и брендов (спец-метка)', 'fa-th', 'walls', 'Стена магазина');

	/* --- FAQ-группы темы ([vita_faq]) --- */
	BlockRegistry.register({
		type: 'vita_faq',
		label: 'FAQ-группы (спец-метка)',
		icon: 'fa-question-circle-o',
		group: 'modules',
		defaults: { faqId: 0, title: '', sec: { bg: 'none', padding: 'm', width: 'default' } },
		fields: function () {
			return [
				catalogHint(),
				{ key: 'faqId', label: 'Группа FAQ', type: hasCatalog() ? 'select' : 'number', options: faqOptions(), picker: true },
				{ key: 'title', label: 'Заголовок блока (опционально)', type: 'text', placeholder: 'Оставьте пустым — возьмётся из группы' }
			].concat(VccSection.fields());
		},
		/* Экспорт: литеральный шорткод — на витрине тема рендерит FAQ.
		 * Секция (vcc-section) — при заданных фоне/отступах/заголовке секции. */
		toExportHTML: function (data) {
			var id = Math.max(0, parseInt(data.faqId, 10) || 0);
			var title = String(data.title || '').trim();
			var sc = '[vita_faq' + (id ? ' id="' + id + '"' : '') + (title ? ' title="' + vccEscapeHtml(title) + '"' : '') + ']';
			if (!sc) return '';
			sc = shortcodeWrap(sc);
			var sec = data.sec || {};
			var hasSec = (sec.bg && sec.bg !== 'none') ||
				(sec.padding && sec.padding !== 'm') ||
				(sec.width && sec.width !== 'default') ||
				sec.anchor || sec.eyebrow || sec.title || sec.text;
			if (!hasSec) return sc;
			return VccSection.open(sec) + VccSection.head(sec) + sc + VccSection.close();
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
		label: 'Форма (спец-метка)',
		icon: 'fa-wpforms',
		group: 'modules',
		defaults: { formId: 0, sec: { bg: 'none', padding: 'm', width: 'default' } },
		fields: function () {
			return [
				catalogHint(),
				{ key: 'formId', label: 'Форма магазина', type: hasCatalog() ? 'select' : 'number', options: formOptions(), picker: true }
			].concat(VccSection.fields());
		},
		/* Без формы шорткод ничего не выведет — не экспортируем блок вовсе.
		 * Секция (vcc-section) — при заданных фоне/отступах/заголовке секции. */
		toExportHTML: function (data) {
			var id = Math.max(0, parseInt(data.formId, 10) || 0);
			if (!id) return '';
			var sc = shortcodeWrap('[vita_form id="' + id + '"]');
			var sec = data.sec || {};
			var hasSec = (sec.bg && sec.bg !== 'none') ||
				(sec.padding && sec.padding !== 'm') ||
				(sec.width && sec.width !== 'default') ||
				sec.anchor || sec.eyebrow || sec.title || sec.text;
			if (!hasSec) return sc;
			return VccSection.open(sec) + VccSection.head(sec) + sc + VccSection.close();
		},
		toHTML: function (data) {
			var id = Math.max(0, parseInt(data.formId, 10) || 0);
			return shortcodeChip('Форма темы', formLabel(id));
		}
	});

	/* --- Отзывы о магазине ([vita_testimonial]) — 0.9.2: живые отзывы
	 * витрины (vita_comment, status=1) вместо статичных текстов. Пикер по
	 * каталогу пресета; атрибуты: id (конкретный отзыв), count, random.
	 * Без id шорткод выводит первые count отзывов — count=0 не экспортируем. --- */
	BlockRegistry.register({
		type: 'vita_testimonial',
		label: 'Отзыв о магазине (спец-метка)',
		icon: 'fa-comments-o',
		group: 'modules',
		defaults: { testimonialId: 0, count: 3, random: false, sec: { bg: 'none', padding: 'm', width: 'default' } },
		fields: function () {
			return [
				catalogHint(),
				{ key: 'testimonialId', label: 'Конкретный отзыв', type: hasCatalog('testimonials') ? 'select' : 'number', options: testimonialOptions(), picker: true },
				{ key: 'count', label: 'Сколько отзывов вывести (если не выбран конкретный)', type: 'number' },
				{ key: 'random', label: 'Случайный порядок', type: 'checkbox' },
				{ key: '_hint', label: 'Выводятся живые отзывы из раздела «Отзывы о магазине» — новые появляются сами. Конкретный отзыв сильнее счётчика.', type: 'hint' }
			].concat(VccSection.fields());
		},
		/* Экспорт: без id берём count≥1; оба пустые — блок не экспортируем.
		 * random='1' → движок темы тасует выборку (ORDER BY RAND()). */
		toExportHTML: function (data) {
			var id = Math.max(0, parseInt(data.testimonialId, 10) || 0);
			var count = Math.max(0, parseInt(data.count, 10) || 0);
			if (!id && count < 1) return '';
			var attrs = id ? ' id="' + id + '"' : (count > 1 ? ' count="' + count + '"' : '');
			if (!id && data.random) attrs += ' random="1"';
			var sc = shortcodeWrap('[vita_testimonial' + attrs + ']');
			var sec = data.sec || {};
			var hasSec = (sec.bg && sec.bg !== 'none') ||
				(sec.padding && sec.padding !== 'm') ||
				(sec.width && sec.width !== 'default') ||
				sec.anchor || sec.eyebrow || sec.title || sec.text;
			if (!hasSec) return sc;
			return VccSection.open(sec) + VccSection.head(sec) + sc + VccSection.close();
		},
		toHTML: function (data) {
			var id = Math.max(0, parseInt(data.testimonialId, 10) || 0);
			var count = Math.max(0, parseInt(data.count, 10) || 0);
			var label = id ? testimonialLabel(id) : (count > 0 ? count + ' последних' + (data.random ? ', случайный порядок' : '') : 'отзыв не выбран');
			return shortcodeChip('Отзывы темы', label);
		}
	});
})();
