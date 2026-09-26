/* ============================================================
Вита — Конструктор контента · blocks/landing.js
Лендинг-блоки (v0.7.0, спецификация docs/v0.5.0-landing-blocks.md):
Tilda-модель — каждый «широкий» блок экспортируется одной
полноширинной секцией .vcc-section с общим каркасом:
  div.vcc-section > div.vcc-section__inner > div.vcc-container
Секция сама по себе НЕ блок реестра — это хелпер для блоков.
Фоны/иконки/якоря/видео живут в data-vcc-* и собираются рантаймом
темы (common.js → initVccBlocks) ПОСЛЕ санитайзера; без рантайма
весь контент остаётся читаемым (грациозная деградация).
Контракт vcc-v1 аддитивен: существующие классы не трогаются.
============================================================ */
'use strict';

(function () {

	/* ================= Каркас секции ================= */

	/* Валидный фон секции: none/light/surface/primary/image/video */
	function safeBg(bg) {
		return ['none', 'light', 'surface', 'primary', 'image', 'video'].indexOf(bg) !== -1 ? bg : 'none';
	}
	function safePad(pad) {
		return ['s', 'm', 'l', 'xl'].indexOf(pad) !== -1 ? pad : 'm';
	}
	function safeWidth(w) {
		return ['narrow', 'default', 'full'].indexOf(w) !== -1 ? w : 'default';
	}

	/* ---------- Штатные заглушки изображений (0.9.3) ----------
	 * Файлы живут в ТЕМЕ: image/catalog/vita-placeholder-*.jpg|png.
	 * Владелец один раз заменяет файл в Менеджере изображений магазина
	 * (тот же путь) — все блоки, где путь не меняли, получают его фото.
	 * В предпросмотре конструктора пути подменяются на локальные копии
	 * assets/placeholders/ — битых картинок в редакторе нет. */
	var PLACEHOLDER_BASE = 'image/catalog/';
	var PLACEHOLDER_LOCAL = 'assets/placeholders/';
	var PLACEHOLDERS = {
		hero: PLACEHOLDER_BASE + 'vita-placeholder-hero.jpg',
		photo: PLACEHOLDER_BASE + 'vita-placeholder-photo.jpg',
		logo: PLACEHOLDER_BASE + 'vita-placeholder-logo.png'
	};

	function ph(name) {
		return PLACEHOLDERS[name] || PLACEHOLDERS.photo;
	}

	/* Путь картинки для ПРЕДПРОСМОТРА: штатная заглушка рисуется локальной
	 * копией (в конструкторе на Pages пути image/catalog/ не существуют).
	 * ВАЖНО: вызывается ТОЛЬКО рендерером предпросмотра (app.js) — toHTML
	 * всегда пишет магазинные пути, они едут в файл для магазина.
	 * Кеш-бастер ?v=<версия>: копии обновляются между релизами конструктора,
	 * без суффикса браузер показывает устаревшую заглушку из дискового кеша. */
	var PH_V = '?v=' + String(window.VCC_APP_VERSION || '0');

	function phPreview(src) {
		var s = String(src || '').trim();
		if (s === PLACEHOLDERS.hero) return PLACEHOLDER_LOCAL + 'vita-placeholder-hero.jpg' + PH_V;
		if (s === PLACEHOLDERS.photo) return PLACEHOLDER_LOCAL + 'vita-placeholder-photo.jpg' + PH_V;
		if (s === PLACEHOLDERS.logo) return PLACEHOLDER_LOCAL + 'vita-placeholder-logo.png' + PH_V;
		return s;
	}

	/* Экспорт/предпросмотр НЕ отличимы по вызову: toHTML возвращает HTML с
	 * магазинными путями; превью-подмена идёт отдельной функцией. */
	function vccPhPreviewHtml(html) {
		return html
			.split(PLACEHOLDERS.hero).join(PLACEHOLDER_LOCAL + 'vita-placeholder-hero.jpg' + PH_V)
			.split(PLACEHOLDERS.photo).join(PLACEHOLDER_LOCAL + 'vita-placeholder-photo.jpg' + PH_V)
			.split(PLACEHOLDERS.logo).join(PLACEHOLDER_LOCAL + 'vita-placeholder-logo.png' + PH_V);
	}

	/* Открытие секции. sec = { bg, image, video, overlay, padding, width, anchor }.
	 * Классы фона: bg-primary => --bg-primary; image/video => --bg-image/--bg-video.
	 * Атрибуты данных принимает рантайм темы: якорь (id), фон-картинка, фон-видео. */
	function sectionOpen(sec) {
		sec = sec || {};
		var bg = safeBg(sec.bg);
		var cls = 'vcc-section vcc-section--pad-' + safePad(sec.padding);
		if (bg !== 'none') {
			cls += bg === 'image' || bg === 'video'
				? ' vcc-section--bg-' + bg
				: ' vcc-section--bg-' + bg;
		}
		var w = safeWidth(sec.width);
		if (w !== 'default') cls += ' vcc-section--w-' + w;
		if (sec.overlay && (bg === 'image' || bg === 'video')) cls += ' vcc-section--overlay';

		var attrs = '';
		var anchor = String(sec.anchor || '').trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '');
		if (anchor) attrs += ' data-vcc-anchor="' + vccEscapeHtml(anchor) + '"';
		if (bg === 'image' || bg === 'video') {
			/* Пустой путь — штатная заглушка фона: экспорт всегда валиден,
			 * владелец заменит файл в магазине. Явно введённый путь не трогаем. */
			var img = String(sec.image || '').trim() || ph('hero');
			attrs += ' data-vcc-bg="' + vccEscapeHtml(vccSafeHref(img)) + '"';
			if (bg === 'video') {
				var vid = String(sec.video || '').trim();
				if (vid) attrs += ' data-vcc-bg-video="' + vccEscapeHtml(vid) + '"';
				else if (img) attrs += ' data-vcc-bg-video="' + vccEscapeHtml(img) + '"';
			}
		}
		return '<div class="' + cls + '"' + attrs + '><div class="vcc-section__inner"><div class="vcc-container">';
	}

	function sectionClose() {
		return '</div></div></div>';
	}

	/* Заголовок секции: бровь + H2 + подзаголовок. Рисуется, если есть
	 * хотя бы одно из полей eyebrow/title/text. */
	function sectionHead(sec) {
		sec = sec || {};
		var eyebrow = String(sec.eyebrow || '').trim();
		var title = String(sec.title || '').trim();
		var text = String(sec.text || '').trim();
		if (!eyebrow && !title && !text) return '';
		var center = sec.align !== 'left';
		var html = '<div class="vcc-section__head' + (center ? ' vcc-section__head--center' : '') + '">';
		if (eyebrow) html += '<span class="vcc-eyebrow">' + vccInline(eyebrow) + '</span>';
		if (title) html += '<h2 class="vcc-heading vcc-section__title">' + vccInline(title) + '</h2>';
		if (text) html += '<p class="vcc-section__sub">' + vccInline(text) + '</p>';
		return html + '</div>';
	}

	/* Общий набор полей секции (ключи «sec.*» складываются в data.sec) */
	function sectionFields(secDefaults) {
		secDefaults = secDefaults || {};
		return [
			{ key: 'sec.eyebrow', label: 'Надзаголовок (бровь, опционально)', type: 'text', mark: 'sec' },
			{ key: 'sec.title', label: 'Заголовок секции', type: 'text', mark: 'sec' },
			{ key: 'sec.text', label: 'Подзаголовок секции', type: 'textarea', rows: 2, markdown: true, mark: 'sec' },
			{ key: 'sec.align', label: 'Выравнивание заголовка', type: 'select', mark: 'sec',
				options: [['center', 'По центру'], ['left', 'По левому краю']] },
			{ key: 'sec.bg', label: 'Фон секции', type: 'select', mark: 'sec',
				options: [['none', 'Как у страницы'], ['light', 'Приглушённый'], ['surface', 'Карточка'], ['primary', 'Фирменный'], ['image', 'Картинка'], ['video', 'Видео (.mp4)']] },
			{ key: 'sec.image', label: 'Картинка фона (image/catalog/... или URL)', type: 'text', mark: 'sec',
				placeholder: 'image/catalog/hero.jpg' },
			{ key: 'sec.video', label: 'Видео фона (прямой URL .mp4)', type: 'text', mark: 'sec' },
			{ key: 'sec.overlay', label: 'Затемнить фон (для читаемости текста)', type: 'checkbox', mark: 'sec' },
			{ key: 'sec.padding', label: 'Вертикальные отступы', type: 'select', mark: 'sec',
				options: [['s', 'Компактно'], ['m', 'Обычно'], ['l', 'Просторно'], ['xl', 'Максимально']] },
			{ key: 'sec.width', label: 'Ширина контента', type: 'select', mark: 'sec',
				options: [['default', 'Как у сайта (--vita-container-max)'], ['narrow', 'Узкая (720px)'], ['full', 'Во всю ширину']] },
			{ key: 'sec.anchor', label: 'Якорь секции (латиница, для ссылок #якорь)', type: 'text', mark: 'sec',
				placeholder: 'tarify' }
		];
	}

	/* Собирает data.sec из плоских ключей «sec.*» (values: { 'sec.bg': 'light', ... }) */
	function secData(values) {
		/* Данные блока хранят sec ВЛОЖЕННЫМ объектом (data.sec) — так его
		 * пишет редактор; плоские ключи 'sec.*' — легаси-форма вызова.
		 * Приоритет: плоский ключ перекрывает вложенный (форма редактора). */
		var nested = (values && typeof values.sec === 'object' && values.sec) ? values.sec : {};
		var sec = {};
		var keys = ['eyebrow', 'title', 'text', 'align', 'bg', 'image', 'video', 'overlay', 'padding', 'width', 'anchor'];
		for (var i = 0; i < keys.length; i++) {
			sec[keys[i]] = values['sec.' + keys[i]] !== undefined ? values['sec.' + keys[i]] : nested[keys[i]];
		}
		return sec;
	}

	/* Кнопка: kind = primary | secondary | ghost.
	 * href вида form:N проходит как есть (рантайм темы открывает модалку формы). */
	function btnHtml(label, url, kind) {
		label = String(label || '').trim();
		if (!label) return '';
		var href = String(url || '').trim();
		href = /^form:\d+$/i.test(href) ? href : vccSafeHref(href);
		return '<a class="vcc-btn vcc-btn--' + (kind || 'primary') + '" href="' + vccEscapeHtml(href) + '">' + vccInline(label) + '</a>';
	}

	/* Иконка: span c data-vcc-icon — рантайм темы подменяет на <i class="fa …">.
	 * Класс fa-* санитайзер срезает (не vcc-*), поэтому в экспорте только data. */
	function iconHtml(name) {
		var ic = String(name || '').trim().replace(/^fa-/, '');
		if (!ic) return '';
		return '<span class="vcc-icon" data-vcc-icon="fa-' + vccEscapeHtml(ic) + '"></span>';
	}

	/* Массив из data-поля: всегда массив объектов */
	function arr(list) {
		return Array.isArray(list) ? list : [];
	}

	/* ================= Блоки ================= */

	/* --- hero: Обложка --- */
	BlockRegistry.register({
		type: 'hero',
		label: 'Обложка (Hero)',
		icon: 'fa-star-o',
		group: 'landing',
		defaults: {
			title: 'Заголовок, который ==продаёт== сам',
			sub: 'Подзаголовок с главным обещанием страницы: что получит покупатель и почему это стоит десяти секунд его внимания.',
			btn1_label: 'Выбрать товар', btn1_url: '#tarify',
			btn2_label: 'Как мы работаем', btn2_url: '#shagi',
			note: 'Гарантия возврата · Доставка по всей стране',
			align: 'center',
			kicker: '',
			title_size: 'default',
			note_lined: false,
			sec: { bg: 'image', image: '', overlay: true, padding: 'xl', width: 'default', anchor: '' }
		},
		fields: function () {
			return [
				{ key: '_hint', label: 'H1 на странице должен быть один — не дублируйте его с заголовком статьи (спека §6.1).', type: 'hint' }
			].concat(sectionFields()).concat([
				{ key: 'kicker', label: 'Кикер над заголовком (аннотация мелким шрифтом, uppercase)', type: 'text', placeholder: 'Сообщество с 2020 года' },
				{ key: 'title', label: 'Заголовок H1 (на странице он должен быть один)', type: 'textarea', rows: 2, markdown: true },
				{ key: 'title_size', label: 'Размер заголовка', type: 'select', options: [['default', 'Обычный (42px)'], ['md', 'Средний (56px)'], ['lg', 'Крупный (64px)'], ['xl', 'Максимальный (76px)']] },
				{ key: 'sub', label: 'Подзаголовок', type: 'textarea', rows: 3, markdown: true },
				{ key: 'btn1_label', label: 'Кнопка 1 — текст', type: 'text' },
				{ key: 'btn1_url', label: 'Кнопка 1 — ссылка (или form:ID)', type: 'text' },
				{ key: 'btn1_style', label: 'Кнопка 1 — стиль', type: 'select', options: [['primary', 'Фирменная (палитра)'], ['dark', 'Тёмная нейтральная (#27272A)']] },
				{ key: 'btn2_label', label: 'Кнопка 2 — текст (необязательно)', type: 'text' },
				{ key: 'btn2_url', label: 'Кнопка 2 — ссылка (или form:ID)', type: 'text' },
			{ key: 'note', label: 'Строка доверия под кнопками', type: 'text' },
			{ key: 'note_lined', label: 'Линия-разделитель над строкой доверия', type: 'checkbox' },
			{ key: 'align', label: 'Выравнивание', type: 'select', options: [['center', 'По центру'], ['left', 'По левому краю']] },
				{ key: 'visual', label: 'Панель-визуал справа', type: 'select', options: [['none', 'Без панели'], ['metrics', 'Метрики (kickер + путь + цифры)']] },
				{ key: 'visual_kicker', label: 'Панель: статус-лейбл (например «Live»)', type: 'text', depends: 'visual:metrics' },
				{ key: 'visual_path', label: 'Панель: строка пути/страницы', type: 'text', depends: 'visual:metrics' },
				{
					key: 'visual_metrics', label: 'Панель: метрики (значение + подпись)', type: 'rows-editor', addLabel: 'Добавить метрику', max: 4, depends: 'visual:metrics',
					itemFields: [
						{ key: 'value', label: 'Значение', type: 'text' },
						{ key: 'label', label: 'Подпись', type: 'text' }
					],
					itemTitle: function (item, i) { return (item && item.value) ? item.value : ('Метрика ' + (i + 1)); }
				}
			]);
		},
		toHTML: function (data) {
			var v = data || {};
			var title = String(v.title || '').trim();
			var sub = String(v.sub || '').trim();
			if (!title && !sub) return '';
			var b1 = btnHtml(v.btn1_label, v.btn1_url, v.btn1_style === 'dark' ? 'dark' : 'primary');
			var b2 = btnHtml(v.btn2_label, v.btn2_url, 'ghost');
			var actions = b1 + b2;
			/* Панель-визуал (референс hero-visual): рамочный блок справа с
			 * topline (статус + путь) и метриками. Пустые части не выводятся. */
			var visualHtml = '';
			if (v.visual === 'metrics') {
				var mets = arr(v.visual_metrics).filter(function (m) { return m && String(m.value || '').trim(); });
				if (mets.length) {
					var top = String(v.visual_kicker || '').trim();
					var path = String(v.visual_path || '').trim();
					visualHtml = '<div class="vcc-hero__visual">' +
						(top || path ? '<div class="vcc-hero__visual-top">' +
							(top ? '<span class="vcc-hero__visual-kicker">' + vccInline(top) + '</span>' : '') +
							(path ? '<span>' + vccEscapeHtml(path) + '</span>' : '') +
							'</div>' : '') +
						'<div class="vcc-hero__visual-metrics">';
					for (var m = 0; m < mets.length; m++) {
						visualHtml += '<article><strong>' + vccInline(mets[m].value) + '</strong><span>' + vccInline(mets[m].label || '') + '</span></article>';
					}
					visualHtml += '</div></div>';
				}
			}
			var titleCls = 'vcc-hero__title';
			if (v.title_size === 'md' || v.title_size === 'lg' || v.title_size === 'xl') titleCls += ' vcc-hero__title--' + v.title_size;
			var html = sectionOpen(secData(v)) +
				'<div class="vcc-hero' + (v.align === 'left' ? '' : ' vcc-hero--center') + (visualHtml ? ' vcc-hero--split' : '') + '">' +
				'<div class="vcc-hero__main">';
			if (String(v.kicker || '').trim()) html += '<p class="vcc-hero__kicker">' + vccInline(v.kicker) + '</p>';
			if (title) html += '<h1 class="' + titleCls + '">' + vccInline(title) + '</h1>';
			if (sub) html += '<p class="vcc-hero__sub">' + vccInline(sub) + '</p>';
			if (actions) html += '<div class="vcc-hero__actions">' + actions + '</div>';
			if (String(v.note || '').trim()) html += '<p class="vcc-hero__note' + (v.note_lined ? ' vcc-hero__note--lined' : '') + '">' + vccInline(v.note) + '</p>';
			html += '</div>';
			if (visualHtml) html += visualHtml;
			return html + '</div>' + sectionClose();
		}
	});

	/* --- logos: Логотипы партнёров --- */
	BlockRegistry.register({
		type: 'logos',
		label: 'Логотипы партнёров',
		icon: 'fa-handshake-o',
		group: 'landing',
		defaults: {
			sec: { eyebrow: 'Нам доверяют', title: 'Работают с нами', bg: 'none', padding: 'm', width: 'default' },
			items: [{ src: '', alt: 'Партнёр 1' }, { src: '', alt: 'Партнёр 2' }, { src: '', alt: 'Партнёр 3' }]
		},
		fields: function () {
			return sectionFields().concat([
				{
					key: 'items', label: 'Логотипы', type: 'rows-editor', addLabel: 'Добавить логотип', max: 12,
					itemFields: [
						{ key: 'src', label: 'Картинка (image/catalog/... или URL)', type: 'text' },
						{ key: 'alt', label: 'Название (alt)', type: 'text' },
						{ key: 'url', label: 'Ссылка (необязательно)', type: 'text' }
					],
					itemTitle: function (item, i) { return item.alt || ('Логотип ' + (i + 1)); }
				}
			]);
		},
		toHTML: function (data) {
			var v = data || {};
			/* Пустой src больше НЕ выбрасывает элемент: без картинок блок был бы
			 * пустой рамкой — штатная заглушка «Логотип» наполняет его. */
			var items = arr(v.items).filter(function (it) { return it && (String(it.src || '').trim() || String(it.alt || '').trim()); });
			if (!items.length && !String(v.sec && v.sec.title || '').trim()) return '';
			var html = sectionOpen(secData(v)) + sectionHead(v.sec);
			html += '<div class="vcc-logos">';
			for (var i = 0; i < items.length; i++) {
				var it = items[i];
				/* Пустой src — штатная заглушка «Логотип»: картинка в блоке
				 * всегда есть, владелец заменит файл в магазине. */
				var img = '<img class="vcc-logos__img" src="' + vccEscapeHtml(vccSafeHref(String(it.src || '').trim() || ph('logo'))) + '" alt="' + vccEscapeHtml(it.alt || '') + '" loading="lazy">';
				html += String(it.url || '').trim()
					? '<a class="vcc-logos__link" href="' + vccEscapeHtml(vccSafeHref(it.url)) + '" target="_blank" rel="noopener">' + img + '</a>'
					: img;
			}
			return html + '</div>' + sectionClose();
		}
	});

	/* --- features: Преимущества --- */
	BlockRegistry.register({
		type: 'features',
		label: 'Преимущества',
		icon: 'fa-thumbs-o-up',
		group: 'landing',
		defaults: {
			sec: { eyebrow: 'Почему мы', title: 'Наши преимущества', bg: 'light', padding: 'l', width: 'default' },
			cols: '3',
			items: [
				{ icon: 'truck', title: 'Быстрая доставка', text: 'Отправляем заказ в день оформления — покупатель получит покупку без лишнего ожидания.' },
				{ icon: 'shield', title: 'Гарантия качества', text: 'Официальная гарантия на весь ассортимент и честный возврат без объяснения причин.' },
				{ icon: 'headphones', title: 'Живая поддержка', text: 'Отвечаем на вопросы по телефону и в мессенджерах — люди, а не роботы.' }
			]
		},
		fields: function () {
			return sectionFields().concat([
				{ key: 'cols', label: 'Колонок', type: 'select', options: [['2', '2'], ['3', '3'], ['4', '4']] },
				{
					key: 'items', label: 'Карточки', type: 'rows-editor', addLabel: 'Добавить преимущество', max: 8,
					itemFields: [
						{ key: 'icon', label: 'Иконка FontAwesome 4 (fa-truck, fa-shield…)', type: 'text', placeholder: 'truck' },
						{ key: 'title', label: 'Заголовок', type: 'text' },
						{ key: 'text', label: 'Описание', type: 'textarea', rows: 3, markdown: true }
					],
					itemTitle: function (item, i) { return item.title || ('Преимущество ' + (i + 1)); }
				}
			]);
		},
		toHTML: function (data) {
			var v = data || {};
			var items = arr(v.items).filter(function (it) { return it && (String(it.title || '').trim() || String(it.text || '').trim()); });
			if (!items.length) return '';
			var cols = ['2', '3', '4'].indexOf(String(v.cols)) !== -1 ? String(v.cols) : '3';
			var html = sectionOpen(secData(v)) + sectionHead(v.sec);
			html += '<div class="vcc-features vcc-features--c' + cols + '">';
			for (var i = 0; i < items.length; i++) {
				html += '<div class="vcc-feature">' +
					iconHtml(items[i].icon) +
					'<h3 class="vcc-feature__title">' + vccInline(items[i].title || '') + '</h3>' +
					'<div class="vcc-feature__text">' + vccBlock(items[i].text || '') + '</div>' +
					'</div>';
			}
			return html + '</div>' + sectionClose();
		}
	});

	/* --- media_text: Медиа + текст --- */
	BlockRegistry.register({
		type: 'media_text',
		label: 'Картинка + текст',
		icon: 'fa-file-image-o',
		group: 'landing',
		defaults: {
			sec: { title: 'О компании в двух словах', bg: 'surface', padding: 'l', width: 'default' },
			img: '', img_alt: '', caption: '',
			text: 'Расскажите историю магазина: как появились, чем помогаете покупателям и почему вам можно доверять. Живой текст продаёт лучше любого баннера.',
			btn_label: '', btn_url: ''
		},
		fields: function () {
			return sectionFields().concat([
				{ key: 'img', label: 'Картинка (image/catalog/... или URL)', type: 'text' },
				{ key: 'img_alt', label: 'Описание картинки (alt)', type: 'text' },
				{ key: 'caption', label: 'Подпись под картинкой', type: 'text' },
				{ key: 'flip', label: 'Картинка справа', type: 'checkbox' },
				{ key: 'text', label: 'Текст', type: 'textarea', rows: 6, markdown: true },
				{ key: 'btn_label', label: 'Кнопка — текст (необязательно)', type: 'text' },
				{ key: 'btn_url', label: 'Кнопка — ссылка (или form:ID)', type: 'text' }
			]);
		},
		toHTML: function (data) {
			var v = data || {};
			var text = String(v.text || '').trim();
			/* Пустой путь — штатная заглушка «Фотография»: медиаколонка всегда
			 * наполнена, владелец заменит файл в магазине. */
			var img = String(v.img || '').trim() || ph('photo');
			if (!text && !String(v.img || '').trim()) return '';
			var media = '';
			media = '<figure class="vcc-media-text__media">' +
				'<img src="' + vccEscapeHtml(vccSafeHref(img)) + '" alt="' + vccEscapeHtml(v.img_alt || '') + '" loading="lazy">';
			if (String(v.caption || '').trim()) media += '<figcaption class="vcc-figure__caption">' + vccInline(v.caption) + '</figcaption>';
			media += '</figure>';
			var btn = btnHtml(v.btn_label, v.btn_url, 'primary');
			var body = '<div class="vcc-media-text__body">' + (text ? vccBlock(text) : '');
			if (btn) body += '<div class="vcc-media-text__actions">' + btn + '</div>';
			body += '</div>';
			return sectionOpen(secData(v)) +
				'<div class="vcc-media-text' + (v.flip ? ' vcc-media-text--flip' : '') + '">' + media + body + '</div>' +
				sectionClose();
		}
	});

	/* --- before_after: До / После --- */
	BlockRegistry.register({
		type: 'before_after',
		label: 'До / После',
		icon: 'fa-exchange',
		group: 'landing',
		defaults: {
			sec: { title: 'Результат до и после', bg: 'surface', padding: 'l', width: 'default', align: 'center' },
			cols: '2',
			items: [
				{ image: '', img_alt: 'До', title: 'До', text: 'Опишите исходное состояние: с чем пришёл клиент и что его не устраивало.' },
				{ image: '', img_alt: 'После', title: 'После', text: 'Покажите результат: что изменилось и какую пользу получил клиент.' }
			]
		},
		fields: function () {
			return sectionFields().concat([
				{ key: 'cols', label: 'Колонки', type: 'select', options: [['2', '2'], ['3', '3'], ['4', '4']] },
				{
					key: 'items', label: 'Кадры', type: 'rows-editor', addLabel: 'Добавить кадр', max: 6,
					itemFields: [
						{ key: 'image', label: 'Картинка (image/catalog/... или URL)', type: 'text' },
						{ key: 'img_alt', label: 'Описание картинки (alt)', type: 'text' },
						{ key: 'title', label: 'Плашка на кадре (например, «До»)', type: 'text' },
						{ key: 'text', label: 'Пояснение под кадром (необязательно)', type: 'textarea', rows: 2, markdown: true }
					],
					itemTitle: function (item, i) { return item.title || ('Кадр ' + (i + 1)); }
				},
				{ key: '_hint', label: 'Пустой путь — штатная заглушка «Фотография»: замените файл с тем же именем в Менеджере изображений магазина, и кадр обновится везде.', type: 'hint' }
			]);
		},
		toHTML: function (data) {
			var v = data || {};
			var items = arr(v.items).filter(function (it) {
				return it && (String(it.image || '').trim() || String(it.title || '').trim() || String(it.text || '').trim());
			});
			if (!items.length) return '';
			var cols = ['2', '3', '4'].indexOf(String(v.cols)) !== -1 ? String(v.cols) : '2';
			var html = sectionOpen(secData(v)) + sectionHead(v.sec);
			html += '<div class="vcc-ba vcc-ba--c' + cols + '">';
			for (var i = 0; i < items.length; i++) {
				var it = items[i];
				/* Пустой путь — штатная заглушка «Фотография» (медиаколонка всегда наполнена). */
				var img = String(it.image || '').trim() || ph('photo');
				var label = String(it.title || '').trim();
				var text = String(it.text || '').trim();
				html += '<figure class="vcc-ba__item">' +
					'<div class="vcc-ba__media">' +
						'<img src="' + vccEscapeHtml(vccSafeHref(img)) + '" alt="' + vccEscapeHtml(it.img_alt || label) + '" loading="lazy">' +
						(label ? '<span class="vcc-ba__label">' + vccInline(label) + '</span>' : '') +
					'</div>' +
					(text ? '<figcaption class="vcc-ba__caption">' + vccInline(text) + '</figcaption>' : '') +
					'</figure>';
			}
			return html + '</div>' + sectionClose();
		}
	});

	/* --- steps: Шаги (numbers / timeline) --- */
	BlockRegistry.register({
		type: 'steps',
		label: 'Шаги / Таймлайн',
		icon: 'fa-map-o',
		group: 'landing',
		defaults: {
			sec: { eyebrow: 'Как это работает', title: 'Три шага до результата', bg: 'none', padding: 'l', width: 'default', align: 'left' },
			style: 'timeline',
			items: [
				{ title: 'Заявка', text: 'Оставьте заявку на сайте или позвоните — это займёт минуту.' },
				{ title: 'Подбор', text: 'Подберём решение под вашу задачу и бюджет, предложим варианты.' },
				{ title: 'Результат', text: 'Выполняем работу и сдаём результат точно в срок.' }
			]
		},
		fields: function () {
			return sectionFields().concat([
				{ key: 'style', label: 'Стиль', type: 'select', options: [['timeline', 'Таймлайн — карточки на линии'], ['numbers', 'Простые номера (без линии)']] },
				{
					key: 'items', label: 'Шаги', type: 'rows-editor', addLabel: 'Добавить шаг', max: 8,
					itemFields: [
						{ key: 'label', label: 'Подпись над названием (например, год)', type: 'text', placeholder: '2024' },
						{ key: 'icon', label: 'Иконка (необязательно)', type: 'text', placeholder: 'check' },
						{ key: 'title', label: 'Название шага', type: 'text' },
						{ key: 'text', label: 'Описание', type: 'textarea', rows: 2, markdown: true }
					],
					itemTitle: function (item, i) { return item.title || ('Шаг ' + (i + 1)); }
				}
			]);
		},
		toHTML: function (data) {
			var v = data || {};
			var items = arr(v.items).filter(function (it) { return it && (String(it.title || '').trim() || String(it.text || '').trim()); });
			if (!items.length) return '';
			var style = v.style === 'numbers' ? 'numbers' : 'timeline';
			/* «Номера» — горизонтальная сетка: класс колонок по числу шагов */
			var colsClass = '';
			if (style === 'numbers') {
				var n = items.length;
				colsClass = n === 2 ? ' is-c2' : (n === 4 ? ' is-c4' : (n >= 5 ? '' : ''));
			}
			var html = sectionOpen(secData(v)) + sectionHead(v.sec);
			html += '<div class="vcc-steps vcc-steps--' + style + colsClass + '">';
			for (var i = 0; i < items.length; i++) {
				var label = String(items[i].label || '').trim();
				html += '<div class="vcc-step">' +
					'<span class="vcc-step__num">' + (i + 1) + '</span>' +
					'<div class="vcc-step__body">' +
					(label ? '<div class="vcc-step__label">' + vccInline(label) + '</div>' : '') +
					'<h3 class="vcc-step__title">' + vccInline(items[i].title || '') + '</h3>' +
					'<div class="vcc-step__text">' + vccBlock(items[i].text || '') + '</div>' +
					'</div></div>';
			}
			return html + '</div>' + sectionClose();
		}
	});

	/* --- stats: Цифры --- */
	BlockRegistry.register({
		type: 'stats',
		label: 'Цифры и факты',
		icon: 'fa-bar-chart',
		group: 'landing',
		defaults: {
			sec: { eyebrow: '', title: 'Немного цифр', bg: 'primary', padding: 'm', width: 'default' },
			style: 'plain',
			items: [
				{ value: '10', suffix: ' лет', label: 'на рынке' },
				{ value: '25', suffix: ' 000+', label: 'довольных клиентов' },
				{ value: '98', suffix: '%', label: 'заказов точно в срок' }
			]
		},
		fields: function () {
			return sectionFields().concat([
				{ key: 'style', label: 'Вид', type: 'select', options: [['plain', 'Обычный (число + подпись)'], ['boxed', 'Рамочные карточки'], ['strips', 'Полоска + лейбл + значение']] },
				{
					key: 'items', label: 'Показатели', type: 'rows-editor', addLabel: 'Добавить показатель', max: 6,
					itemFields: [
						{ key: 'value', label: 'Число', type: 'text', placeholder: '10' },
						{ key: 'suffix', label: 'Суффикс (лет, %, +)', type: 'text' },
						{ key: 'label', label: 'Подпись', type: 'text' }
					],
					itemTitle: function (item, i) { return (item.value || '?') + (item.suffix || '') + ' · ' + (item.label || ''); }
				}
			]);
		},
		toHTML: function (data) {
			var v = data || {};
			var items = arr(v.items).filter(function (it) { return it && String(it.value || '').trim(); });
			if (!items.length) return '';
			var styleCls = v.style === 'boxed' ? ' vcc-stats--boxed' : (v.style === 'strips' ? ' vcc-stats--strips' : '');
			var html = sectionOpen(secData(v)) + sectionHead(v.sec);
			html += '<div class="vcc-stats' + styleCls + '">';
			for (var i = 0; i < items.length; i++) {
				html += '<div class="vcc-stat">' +
					'<span class="vcc-stat__value">' + vccInline(items[i].value || '') +
					(String(items[i].suffix || '').trim() ? '<span class="vcc-stat__suffix">' + vccInline(items[i].suffix) + '</span>' : '') +
					'</span>' +
					'<span class="vcc-stat__label">' + vccInline(items[i].label || '') + '</span>' +
					'</div>';
			}
			return html + '</div>' + sectionClose();
		}
	});

	/* --- reviews: Отзывы (текстовые, статичные) --- */
	BlockRegistry.register({
		type: 'reviews',
		label: 'Отзывы (текстовые)',
		icon: 'fa-comments-o',
		group: 'landing',
		defaults: {
			sec: { eyebrow: 'Отзывы', title: 'Что говорят покупатели', bg: 'light', padding: 'l', width: 'default' },
			cols: '3',
			items: [
				{ text: 'Заказ пришёл на день раньше срока, упаковка — на отлично. Теперь покупаю только здесь.', name: 'Анна', role: 'постоянный покупатель', stars: 5 },
				{ text: 'Помогли подобрать модель под мою задачу, ответили на все вопросы по телефону. Спасибо!', name: 'Дмитрий', role: 'Частное лицо', stars: 5 },
				{ text: 'Прозрачные цены и честная гарантия — никаких сюрпризов после оплаты.', name: 'Марина', role: 'Корпоративный клиент', stars: 4 }
			]
		},
		fields: function () {
			return sectionFields().concat([
				{ key: 'cols', label: 'Колонок', type: 'select', options: [['2', '2'], ['3', '3']] },
				{
					key: 'items', label: 'Отзывы', type: 'rows-editor', addLabel: 'Добавить отзыв', max: 6,
					itemFields: [
						{ key: 'text', label: 'Текст отзыва', type: 'textarea', rows: 3 },
						{ key: 'name', label: 'Имя', type: 'text' },
						{ key: 'role', label: 'Роль / компания', type: 'text' },
						{ key: 'stars', label: 'Звёзды (0–5, 0 — без рейтинга)', type: 'number' },
						{ key: 'avatar', label: 'Фото (необязательно)', type: 'text' }
					],
					itemTitle: function (item, i) { return item.name || ('Отзыв ' + (i + 1)); }
				},
				{ key: '_hint', label: 'Здесь — статичные тексты для лендинга. Живые отзывы магазина — блоком «Отзыв о магазине (спец-метка)»: они обновляются сами из раздела «Отзывы о магазине».', type: 'hint' }
			]);
		},
		toHTML: function (data) {
			var v = data || {};
			var items = arr(v.items).filter(function (it) { return it && String(it.text || '').trim(); });
			if (!items.length) return '';
			var cols = ['2', '3'].indexOf(String(v.cols)) !== -1 ? String(v.cols) : '3';
			var html = sectionOpen(secData(v)) + sectionHead(v.sec);
			html += '<div class="vcc-reviews vcc-reviews--c' + cols + '">';
			for (var i = 0; i < items.length; i++) {
				var it = items[i];
				var stars = Math.max(0, Math.min(5, parseInt(it.stars, 10) || 0));
				html += '<blockquote class="vcc-review">';
				html += '<p class="vcc-review__text">' + vccInline(it.text) + '</p>';
				if (stars) {
					var s = '★★★★★'.slice(0, stars) + '☆☆☆☆☆'.slice(0, 5 - stars);
					html += '<span class="vcc-stars" title="' + stars + ' из 5">' + s + '</span>';
				}
				html += '<footer class="vcc-review__person">';
				/* Аватар: пусто → заглушка «Фотография»; не задаёт владелец —
				 * показывает штатную, замена тем же файлом в магазине */
				html += '<img class="vcc-review__avatar" src="' + vccEscapeHtml(vccSafeHref(String(it.avatar || '').trim() || ph('photo'))) + '" alt="' + vccEscapeHtml(it.name || '') + '" loading="lazy">';
				html += '<strong class="vcc-review__name">' + vccInline(it.name || '') + '</strong>';
				if (String(it.role || '').trim()) html += '<span class="vcc-review__role">' + vccInline(it.role) + '</span>';
				html += '</footer></blockquote>';
			}
			return html + '</div>' + sectionClose();
		}
	});

	/* --- team: Команда --- */
	BlockRegistry.register({
		type: 'team',
		label: 'Команда',
		icon: 'fa-users',
		group: 'landing',
		defaults: {
			sec: { eyebrow: 'Команда', title: 'Люди, которым вы доверяете', bg: 'none', padding: 'l', width: 'default' },
			items: [{ photo: '', name: 'Иван Петров', role: 'Основатель', text: 'Отвечает за качество каждой поставки.' }]
		},
		fields: function () {
			return sectionFields().concat([
				{
					key: 'items', label: 'Сотрудники', type: 'rows-editor', addLabel: 'Добавить сотрудника', max: 8,
					itemFields: [
						{ key: 'photo', label: 'Фото (image/catalog/... или URL)', type: 'text' },
						{ key: 'name', label: 'Имя', type: 'text' },
						{ key: 'role', label: 'Должность', type: 'text' },
						{ key: 'text', label: 'О человеке (необязательно)', type: 'textarea', rows: 2, markdown: true }
					],
					itemTitle: function (item, i) { return item.name || ('Сотрудник ' + (i + 1)); }
				}
			]);
		},
		toHTML: function (data) {
			var v = data || {};
			var items = arr(v.items).filter(function (it) { return it && (String(it.name || '').trim() || String(it.photo || '').trim()); });
			if (!items.length) return '';
			var html = sectionOpen(secData(v)) + sectionHead(v.sec);
			html += '<div class="vcc-team">';
			for (var i = 0; i < items.length; i++) {
				var it = items[i];
				html += '<div class="vcc-member">';
				/* Фото члена команды: пусто → заглушка «Фотография» */
				html += '<img class="vcc-member__photo" src="' + vccEscapeHtml(vccSafeHref(String(it.photo || '').trim() || ph('photo'))) + '" alt="' + vccEscapeHtml(it.name || '') + '" loading="lazy">';
				html += '<strong class="vcc-member__name">' + vccInline(it.name || '') + '</strong>';
				if (String(it.role || '').trim()) html += '<span class="vcc-member__role">' + vccInline(it.role) + '</span>';
				if (String(it.text || '').trim()) html += '<div class="vcc-member__text">' + vccBlock(it.text) + '</div>';
				html += '</div>';
			}
			return html + '</div>' + sectionClose();
		}
	});

	/* --- documents: Документы / Сертификаты --- */
	BlockRegistry.register({
		type: 'documents',
		label: 'Документы',
		icon: 'fa-certificate',
		group: 'landing',
		defaults: {
			sec: { eyebrow: 'Документы', title: 'Сертификаты и разрешения', bg: 'surface', padding: 'm', width: 'default' },
			items: [{ image: '', title: 'Сертификат соответствия', url: '' }]
		},
		fields: function () {
			return sectionFields().concat([
				{
					key: 'items', label: 'Документы', type: 'rows-editor', addLabel: 'Добавить документ', max: 8,
					itemFields: [
						{ key: 'image', label: 'Картинка (image/catalog/... или URL)', type: 'text' },
						{ key: 'title', label: 'Название', type: 'text' },
						{ key: 'url', label: 'Ссылка на файл (необязательно)', type: 'text' }
					],
					itemTitle: function (item, i) { return item.title || ('Документ ' + (i + 1)); }
				}
			]);
		},
		toHTML: function (data) {
			var v = data || {};
			var items = arr(v.items).filter(function (it) { return it && (String(it.image || '').trim() || String(it.title || '').trim()); });
			if (!items.length) return '';
			var html = sectionOpen(secData(v)) + sectionHead(v.sec);
			html += '<div class="vcc-docs">';
			for (var i = 0; i < items.length; i++) {
				var it = items[i];
				/* Пусто → заглушка «Фотография»: карточка документа без «дыры» */
				var inner = '<img class="vcc-doc__img" src="' + vccEscapeHtml(vccSafeHref(String(it.image || '').trim() || ph('photo'))) + '" alt="' + vccEscapeHtml(it.title || '') + '" loading="lazy">' +
					'<span class="vcc-doc__title">' + vccInline(it.title || '') + '</span>';
				html += String(it.url || '').trim()
					? '<a class="vcc-doc" href="' + vccEscapeHtml(vccSafeHref(it.url)) + '" target="_blank" rel="noopener">' + inner + '</a>'
					: '<div class="vcc-doc">' + inner + '</div>';
			}
			return html + '</div>' + sectionClose();
		}
	});

	/* --- cta: Призыв к действию --- */
	BlockRegistry.register({
		type: 'cta',
		label: 'Призыв к действию',
		icon: 'fa-bullhorn',
		group: 'landing',
		defaults: {
			sec: { eyebrow: '', title: 'Готовы начать?', bg: 'primary', padding: 'l', width: 'narrow', align: 'center' },
			text: 'Оставьте заявку — перезвоним в течение рабочего дня, ответим на вопросы и подберём решение под вашу задачу.',
			btn1_label: 'Оставить заявку', btn1_url: 'form:0',
			btn2_label: '', btn2_url: ''
		},
		fields: function () {
			return sectionFields().concat([
				{ key: 'text', label: 'Текст призыва', type: 'textarea', rows: 3, markdown: true },
				{ key: 'btn1_label', label: 'Кнопка 1 — текст', type: 'text' },
				{ key: 'btn1_url', label: 'Кнопка 1 — ссылка (или form:ID для формы)', type: 'text' },
				{ key: 'btn2_label', label: 'Кнопка 2 — текст (необязательно)', type: 'text' },
				{ key: 'btn2_url', label: 'Кнопка 2 — ссылка (или form:ID)', type: 'text' },
				{ key: '_hint', label: 'Чтобы кнопка открыла форму магазина, укажите ссылку вида form:ID (ID формы — из модуля «Вита — Формы»), а на странице добавьте блок «Форма (спец-метка)».', type: 'hint' }
			]);
		},
		toHTML: function (data) {
			var v = data || {};
			var text = String(v.text || '').trim();
			var b1 = btnHtml(v.btn1_label, v.btn1_url, 'primary');
			var b2 = btnHtml(v.btn2_label, v.btn2_url, 'ghost');
			var actions = b1 + b2;
			if (!text && !actions && !String(v.sec && v.sec.title || '').trim()) return '';
			var html = sectionOpen(secData(v));
			var title = String(v.sec && v.sec.title || '').trim();
			html += '<div class="vcc-cta">';
			if (title) html += '<h2 class="vcc-heading vcc-cta__title">' + vccInline(title) + '</h2>';
			if (text) html += '<div class="vcc-cta__text">' + vccBlock(text) + '</div>';
			if (actions) html += '<div class="vcc-cta__actions">' + actions + '</div>';
			return html + '</div>' + sectionClose();
		}
	});

	/* --- contacts: Контакты --- */
	BlockRegistry.register({
		type: 'contacts',
		label: 'Контакты',
		icon: 'fa-address-book-o',
		group: 'landing',
		defaults: {
			sec: { eyebrow: 'Контакты', title: 'Свяжитесь с нами', bg: 'light', padding: 'l', width: 'narrow' },
			items: [
				{ icon: 'phone', label: 'Телефон', value: '+7 (900) 000-00-00', url: 'tel:+79000000000' },
				{ icon: 'envelope-o', label: 'E-mail', value: 'sale@example.com', url: 'mailto:sale@example.com' },
				{ icon: 'map-marker', label: 'Адрес', value: 'г. Москва, ул. Примерная, 1', url: '' }
			]
		},
		fields: function () {
			return sectionFields().concat([
				{
					key: 'items', label: 'Способы связи', type: 'rows-editor', addLabel: 'Добавить контакт', max: 8,
					itemFields: [
						{ key: 'icon', label: 'Иконка (fa-phone, fa-envelope-o…)', type: 'text' },
						{ key: 'label', label: 'Подпись', type: 'text' },
						{ key: 'value', label: 'Значение', type: 'text' },
						{ key: 'url', label: 'Ссылка (tel:, mailto:, https://)', type: 'text' }
					],
					itemTitle: function (item, i) { return (item.label || 'Контакт') + ': ' + (item.value || ''); }
				},
				{ key: '_hint', label: 'Значение выводится текстом; кликабельные tel:/mailto: добавьте кнопкой через markdown [текст](https://…) или ссылками на страницу контактов магазина.', type: 'hint' }
			]);
		},
		toHTML: function (data) {
			var v = data || {};
			var items = arr(v.items).filter(function (it) { return it && (String(it.value || '').trim() || String(it.label || '').trim()); });
			if (!items.length) return '';
			var html = sectionOpen(secData(v)) + sectionHead(v.sec);
			html += '<div class="vcc-contacts">';
			for (var i = 0; i < items.length; i++) {
				var it = items[i];
				html += '<div class="vcc-contact">' + iconHtml(it.icon);
				if (String(it.label || '').trim()) html += '<span class="vcc-contact__label">' + vccInline(it.label) + '</span>';
				var val = vccInline(it.value || '');
				if (String(it.url || '').trim()) {
					html += '<a class="vcc-contact__value" href="' + vccEscapeHtml(vccSafeHref(it.url)) + '">' + val + '</a>';
				} else {
					html += '<span class="vcc-contact__value">' + val + '</span>';
				}
				html += '</div>';
			}
			return html + '</div>' + sectionClose();
		}
	});

	/* --- socials: Соцсети --- */
	BlockRegistry.register({
		type: 'socials',
		label: 'Соцсети',
		icon: 'fa-share-alt',
		group: 'landing',
		defaults: {
			sec: { title: 'Мы в соцсетях', bg: 'none', padding: 'm', width: 'default' },
			align: 'center',
			items: [{ icon: 'telegram', url: 'https://example.com/tg', label: 'Telegram' }]
		},
		fields: function () {
			return sectionFields().concat([
				{ key: 'align', label: 'Выравнивание', type: 'select', options: [['center', 'По центру'], ['left', 'По левому краю']] },
				{
					key: 'items', label: 'Ссылки', type: 'rows-editor', addLabel: 'Добавить соцсеть', max: 10,
					itemFields: [
						{ key: 'icon', label: 'Иконка (fa-telegram, fa-vk, fa-instagram…)', type: 'text' },
						{ key: 'url', label: 'Ссылка', type: 'text' },
						{ key: 'label', label: 'Название', type: 'text' }
					],
					itemTitle: function (item, i) { return item.label || ('Ссылка ' + (i + 1)); }
				},
				{ key: '_hint', label: 'В FontAwesome 4 нет fa-vk и fa-whatsapp — используйте fa-telegram, fa-instagram, fa-comment, fa-phone и т.п.', type: 'hint' }
			]);
		},
		toHTML: function (data) {
			var v = data || {};
			var items = arr(v.items).filter(function (it) { return it && String(it.url || '').trim(); });
			if (!items.length) return '';
			var html = sectionOpen(secData(v)) + sectionHead(v.sec);
			html += '<div class="vcc-socials' + (v.align !== 'left' ? ' vcc-socials--center' : '') + '">';
			for (var i = 0; i < items.length; i++) {
				var it = items[i];
			var label = String(it.label || '').trim();
			var ic = String(it.icon || '').trim();
			/* aria-label вне whitelist санитайзера темы — доступность через видимый
			 * текст и title (тоже озвучивается скринридерами) */
			html += '<a class="vcc-social" href="' + vccEscapeHtml(vccSafeHref(it.url)) + '" target="_blank" rel="noopener"' +
				(label ? ' title="' + vccEscapeHtml(label) + '"' : '') + '>' +
					(ic ? iconHtml(ic) : '') +
					(label ? '<span class="vcc-social__label">' + vccInline(label) + '</span>' : '') +
					'</a>';
			}
			return html + '</div>' + sectionClose();
		}
	});

	/* --- badges: Бейджи доверия --- */
	BlockRegistry.register({
		type: 'badges',
		label: 'Бейджи доверия',
		icon: 'fa-shield',
		group: 'landing',
		defaults: {
			sec: { bg: 'none', padding: 's', width: 'default' },
			items: [
				{ icon: 'credit-card', title: 'Удобная оплата', text: 'Картой, наличными или по счёту' },
				{ icon: 'truck', title: 'Быстрая доставка', text: 'СДЭК, Почта, самовывоз' },
				{ icon: 'shield', title: 'Гарантия', text: 'Возврат без объяснений' }
			]
		},
		fields: function () {
			return sectionFields().concat([
				{
					key: 'items', label: 'Бейджи', type: 'rows-editor', addLabel: 'Добавить бейдж', max: 8,
					itemFields: [
						{ key: 'icon', label: 'Иконка', type: 'text' },
						{ key: 'title', label: 'Заголовок', type: 'text' },
						{ key: 'text', label: 'Пояснение (необязательно)', type: 'text' }
					],
					itemTitle: function (item, i) { return item.title || ('Бейдж ' + (i + 1)); }
				}
			]);
		},
		toHTML: function (data) {
			var v = data || {};
			var items = arr(v.items).filter(function (it) { return it && String(it.title || '').trim(); });
			if (!items.length) return '';
			var html = sectionOpen(secData(v)) + sectionHead(v.sec);
			html += '<div class="vcc-badges">';
			for (var i = 0; i < items.length; i++) {
				html += '<div class="vcc-badge">' + iconHtml(items[i].icon) +
					'<span class="vcc-badge__title">' + vccInline(items[i].title) + '</span>' +
					(String(items[i].text || '').trim() ? '<span class="vcc-badge__text">' + vccInline(items[i].text) + '</span>' : '') +
					'</div>';
			}
			return html + '</div>' + sectionClose();
		}
	});

	/* --- checklist: Чек-лист --- */
	BlockRegistry.register({
		type: 'checklist',
		label: 'Чек-лист',
		icon: 'fa-check-square-o',
		group: 'landing',
		defaults: {
			sec: { eyebrow: '', title: 'Что вы получаете', bg: 'surface', padding: 'm', width: 'narrow', align: 'left' },
			cols: '1',
			items: [{ md: 'Прозрачную смету без скрытых доплат' }, { md: 'Договор и гарантию на работы' }, { md: 'Поддержку после сдачи проекта' }]
		},
		fields: function () {
			return sectionFields().concat([
				{ key: 'cols', label: 'Колонок', type: 'select', options: [['1', '1'], ['2', '2']] },
				{
					key: 'items', label: 'Пункты (одна строка = один пункт, поддерживается markdown)', type: 'rows-editor', addLabel: 'Добавить пункт', max: 20,
					itemFields: [
						{ key: 'md', label: 'Пункт', type: 'text', markdown: true }
					],
					itemTitle: function (item, i) { return item.md || ('Пункт ' + (i + 1)); }
				}
			]);
		},
		toHTML: function (data) {
			var v = data || {};
			var items = arr(v.items).filter(function (it) { return it && String(it.md || '').trim(); });
			if (!items.length) return '';
			var cols = ['1', '2'].indexOf(String(v.cols)) !== -1 ? String(v.cols) : '1';
			var html = sectionOpen(secData(v)) + sectionHead(v.sec);
			html += '<ul class="vcc-checklist vcc-checklist--c' + cols + '">';
			for (var i = 0; i < items.length; i++) {
				html += '<li class="vcc-checklist__item">' + vccInline(items[i].md) + '</li>';
			}
			return html + '</ul>' + sectionClose();
		}
	});

	/* --- divider: Разделитель --- */
	BlockRegistry.register({
		type: 'divider',
		label: 'Разделитель',
		icon: 'fa-ellipsis-h',
		group: 'landing',
		defaults: { style: 'space', sec: { bg: 'none', padding: 's', width: 'default' } },
		fields: function () {
			return sectionFields().concat([
				{ key: 'style', label: 'Вид', type: 'select', options: [['space', 'Пустое пространство'], ['line', 'Тонкая линия'], ['ornament', 'Орнамент ···']] }
			]);
		},
		toHTML: function (data) {
			var v = data || {};
			var style = ['line', 'space', 'ornament'].indexOf(v.style) !== -1 ? v.style : 'space';
			if (style === 'space') {
				/* Пустая секция с отступом — «воздух» между блоками */
				return sectionOpen(secData(v)) + sectionClose();
			}
			return sectionOpen(secData(v)) +
				'<div class="vcc-divider' + (style === 'line' ? ' vcc-divider--line' : ' vcc-divider--ornament') + '">' +
				(style === 'ornament' ? '<span class="vcc-divider__ornament">· · ·</span>' : '') +
				'</div>' + sectionClose();
		}
	});

	/* --- seotext: SEO-текст (details) --- */
	BlockRegistry.register({
		type: 'seotext',
		label: 'SEO-текст (спойлер)',
		icon: 'fa-file-text-o',
		group: 'landing',
		defaults: {
			sec: { bg: 'none', padding: 'm', width: 'narrow', align: 'left' },
			title: 'Подробнее о магазине',
			text: 'Развернутый текст о компании, ассортименте и преимуществах для поисковых систем. Посетители видят только заголовок и могут раскрыть его кликом.',
			open: false
		},
		fields: function () {
			return sectionFields().concat([
				{ key: 'title', label: 'Заголовок спойлера', type: 'text' },
				{ key: 'text', label: 'Текст', type: 'textarea', rows: 8, markdown: true },
				{ key: 'open', label: 'Раскрыт по умолчанию', type: 'checkbox' }
			]);
		},
		toHTML: function (data) {
			var v = data || {};
			var title = String(v.title || '').trim();
			var text = String(v.text || '').trim();
			if (!title && !text) return '';
			return sectionOpen(secData(v)) +
				'<details class="vcc-seotext"' + (v.open ? ' open' : '') + '>' +
				(title ? '<summary class="vcc-seotext__summary">' + vccInline(title) + '</summary>' : '') +
				'<div class="vcc-seotext__body">' + vccBlock(text) + '</div>' +
				'</details>' + sectionClose();
		}
	});

	/* --- pricing: Тарифы --- */
	BlockRegistry.register({
		type: 'pricing',
		label: 'Тарифы',
		icon: 'fa-tags',
		group: 'landing',
		defaults: {
			sec: { eyebrow: 'Тарифы', title: 'Выберите подходящий', bg: 'light', padding: 'l', width: 'default' },
			align: 'center',
			items: [
				{ name: 'Базовый', price: 'от 5 900 ₽', period: '', features: 'Консультация\nПодбор решения\nПоддержка 1 месяц', featured: false, btn_label: 'Выбрать', btn_url: 'form:0' },
				{ name: 'Стандарт', price: 'от 12 900 ₽', period: '', features: 'Всё из «Базового»\nНастройка под задачу\nОбучение команды', featured: true, btn_label: 'Выбрать', btn_url: 'form:0' },
				{ name: 'Максимум', price: 'по запросу', period: '', features: 'Всё из «Стандарта»\nПерсональный менеджер\nSLA-поддержка', featured: false, btn_label: 'Связаться', btn_url: 'form:0' }
			]
		},
		fields: function () {
			return sectionFields().concat([
				{ key: 'align', label: 'Выравнивание текста', type: 'select', options: [['center', 'По центру'], ['left', 'По левому краю']] },
				{
					key: 'items', label: 'Тарифы', type: 'rows-editor', addLabel: 'Добавить тариф', max: 4,
					itemFields: [
						{ key: 'name', label: 'Название', type: 'text' },
						{ key: 'price', label: 'Цена («от 990 ₽», «99 $»)', type: 'text' },
						{ key: 'old_price', label: 'Старая цена (зачёркнутая, необязательно)', type: 'text' },
						{ key: 'period', label: 'Период («/мес», «/год»)', type: 'text' },
						{ key: 'features', label: 'Что входит (каждый пункт с новой строки)', type: 'textarea', rows: 4, markdown: true },
						{ key: 'featured', label: 'Выделить как рекомендуемый', type: 'checkbox' },
						{ key: 'flag_label', label: 'Надпись выделения', type: 'text' },
						{ key: 'btn_label', label: 'Кнопка — текст', type: 'text' },
						{ key: 'btn_url', label: 'Кнопка — ссылка (или form:ID)', type: 'text' },
						{ key: 'note', label: 'Примечание под кнопкой', type: 'text' }
					],
					itemTitle: function (item, i) { return item.name || ('Тариф ' + (i + 1)); }
				},
				{ key: '_hint', label: 'Не забудьте блок «Форма (спец-метка)» на странице, если кнопки ведут на form:ID.', type: 'hint' }
			]);
		},
		toHTML: function (data) {
			var v = data || {};
			var items = arr(v.items).filter(function (it) { return it && (String(it.name || '').trim() || String(it.price || '').trim()); });
			if (!items.length) return '';
			var html = sectionOpen(secData(v)) + sectionHead(v.sec);
			html += '<div class="vcc-plans">';
			for (var i = 0; i < items.length; i++) {
				var it = items[i];
				var featured = !!it.featured;
				var align = v.align === 'left' ? ' vcc-plan--left' : '';
				html += '<div class="vcc-plan' + (featured ? ' vcc-plan--featured' : '') + align + '">';
				if (featured) {
					html += '<span class="vcc-plan__flag">' + vccInline(it.flag_label || 'Рекомендуем') + '</span>';
				}
				if (String(it.name || '').trim()) html += '<h3 class="vcc-plan__name">' + vccInline(it.name) + '</h3>';
				if (String(it.price || '').trim()) {
					html += '<div class="vcc-plan__price">' + vccInline(it.price) +
						(String(it.period || '').trim() ? '<span class="vcc-plan__period">' + vccInline(it.period) + '</span>' : '') +
						'</div>';
				}
				if (String(it.old_price || '').trim()) html += '<div class="vcc-plan__old">' + vccInline(it.old_price) + '</div>';
				var feats = String(it.features || '').split(/\r?\n/).filter(function (f) { return f.trim() !== ''; });
				if (feats.length) {
					html += '<ul class="vcc-plan__features">';
					for (var f = 0; f < feats.length; f++) html += '<li>' + vccInline(feats[f]) + '</li>';
					html += '</ul>';
				}
				html += btnHtml(it.btn_label, it.btn_url, featured ? 'primary' : 'secondary');
				if (String(it.note || '').trim()) html += '<div class="vcc-plan__note">' + vccInline(it.note) + '</div>';
				html += '</div>';
			}
			return html + '</div>' + sectionClose();
		}
	});

	/* --- columns: Колонки (markdown на колонку) --- */
	BlockRegistry.register({
		type: 'columns',
		label: 'Колонки текста',
		icon: 'fa-columns',
		group: 'landing',
		defaults: {
			sec: { bg: 'none', padding: 'm', width: 'default' },
			cols: '3',
			items: [
				{ md: 'Первая колонка. Здесь может быть описание, список или ссылка [пример](https://example.com).' },
				{ md: 'Вторая колонка. Поддерживается всё, что умеет текстовый блок.' },
				{ md: 'Третья колонка. ==Акцент== выделяется фирменным цветом.' }
			]
		},
		fields: function () {
			return sectionFields().concat([
				{ key: 'cols', label: 'Колонок', type: 'select', options: [['2', '2'], ['3', '3'], ['4', '4']] },
				{
					key: 'items', label: 'Колонки', type: 'rows-editor', addLabel: 'Добавить колонку', max: 4,
					itemFields: [
						{ key: 'md', label: 'Текст колонки', type: 'textarea', rows: 4, markdown: true }
					],
					itemTitle: function (item, i) { return 'Колонка ' + (i + 1); }
				}
			]);
		},
		toHTML: function (data) {
			var v = data || {};
			var items = arr(v.items).filter(function (it) { return it && String(it.md || '').trim(); });
			if (!items.length) return '';
			var cols = ['2', '3', '4'].indexOf(String(v.cols)) !== -1 ? String(v.cols) : '3';
			var html = sectionOpen(secData(v)) + sectionHead(v.sec);
			html += '<div class="vcc-columns vcc-columns--c' + cols + '">';
			for (var i = 0; i < items.length; i++) {
				html += '<div class="vcc-column">' + vccBlock(items[i].md) + '</div>';
			}
			return html + '</div>' + sectionClose();
		}
	});

	/* --- promo_card: Промо-карточка (референс «UNISHOP2» — шапка-полоса с
	 * логотипом, бейдж-стикер, выделенный заголовок, промо-текст, кнопка) --- */
	BlockRegistry.register({
		type: 'promo_card',
		label: 'Промо-карточка',
		icon: 'fa-ticket',
		group: 'landing',
		defaults: {
			sec: { eyebrow: '', title: '', bg: 'none', padding: 'm', width: 'default' },
			top_logo: '',
			badge: 'Самый продаваемый',
			title: 'UNISHOP2 — универсальный шаблон',
			text: 'Сравнение товаров, быстрый просмотр, мини-корзина — всё из коробки.\n\nПодходит для любого каталога.',
			btn_label: 'Купить шаблон →',
			btn_url: '#',
			btn_style: 'dark',
			copy: false,
			copy_label: 'Скопировать',
			copy_text: '',
			copy_layout: 'full'
		},
		fields: function () {
			return sectionFields().concat([
				{ key: 'top_logo', label: 'Картинка в шапке-полосе (пусто — без шапки)', type: 'text', placeholder: 'image/catalog/logo.png' },
				{ key: 'badge', label: 'Бейдж-стикер (пусто — без бейджа)', type: 'text' },
				{ key: 'title', label: 'Заголовок карточки', type: 'text' },
				{ key: 'text', label: 'Текст промо (markdown, абзацы через пустую строку)', type: 'textarea', rows: 5, markdown: true },
				{ key: 'btn_label', label: 'Кнопка — текст (пусто — без кнопки)', type: 'text' },
				{ key: 'btn_url', label: 'Кнопка — ссылка (или form:ID)', type: 'text' },
				{ key: 'btn_style', label: 'Кнопка — стиль', type: 'select', options: [['dark', 'Тёмная нейтральная'], ['primary', 'Фирменная (палитра)'], ['ghost', 'Контурная']] },
				{ key: '_gc', label: 'Кнопка копирования', type: 'group-label' },
				{ key: 'copy', label: 'Добавить кнопку копирования', type: 'checkbox' },
				{ key: 'copy_label', label: 'Текст кнопки', type: 'text', depends: 'copy:true' },
				{ key: 'copy_text', label: 'Что копировать', type: 'textarea', rows: 2, depends: 'copy:true' },
				{ key: 'copy_layout', label: 'Размещение кнопки', type: 'select', depends: 'copy:true', options: [['full', 'Полноширинная под карточкой'], ['inline', 'В строку']] }
			]);
		},
		toHTML: function (data) {
			var v = data || {};
			var title = String(v.title || '').trim();
			var text = String(v.text || '').trim();
			if (!title && !text) return '';
			var logo = String(v.top_logo || '').trim();
			var badge = String(v.badge || '').trim();
			var style = ['dark', 'primary', 'ghost'].indexOf(v.btn_style) !== -1 ? v.btn_style : 'dark';
			var html = sectionOpen(secData(v));
			html += '<div class="vcc-promocard">';
			if (logo) html += '<div class="vcc-promocard__top"><img class="vcc-promocard__logo" src="' + vccEscapeHtml(vccSafeHref(logo)) + '" alt="" loading="lazy"></div>';
			html += '<div class="vcc-promocard__body">';
			if (badge) html += '<span class="vcc-promocard__badge">' + vccInline(badge) + '</span>';
			if (title) html += '<h3 class="vcc-promocard__title">' + vccInline(title) + '</h3>';
			if (text) html += '<div class="vcc-promocard__text">' + vccBlock(text) + '</div>';
			if (String(v.btn_label || '').trim()) html += '<div class="vcc-promocard__actions">' + btnHtml(v.btn_label, v.btn_url, style) + '</div>';
			html += '</div></div>';
			if (v.copy && String(v.copy_text || '').trim()) {
				html += '<div class="vcc-row__sidebtn"><button type="button" class="vcc-copybtn' + (v.copy_layout === 'inline' ? ' vcc-copybtn--inline' : '') + '" data-vcc-copy="' + vccEscapeHtml(v.copy_text.trim()) + '">' +
					'<span class="vcc-icon" data-vcc-icon="fa-clone"></span>' + vccInline(String(v.copy_label || 'Скопировать').trim()) + '</button></div>';
			}
			return html + sectionClose();
		}
	});

	/* --- row: Ряд — двухколоночная композиция (текст/promo_card слева,
	 * выбираемая карточка справа). Референсы: «OpenCart Клуб» и «Быстрый
	 * старт» opencartforum.com.ru. Обе стороны опциональны. --- */
	BlockRegistry.register({
		type: 'row',
		label: 'Ряд (2 колонки)',
		icon: 'fa-columns',
		group: 'landing',
		defaults: {
			sec: { eyebrow: '', title: '', bg: 'none', padding: 'm', width: 'default' },
			left_mode: 'text',
			left_kicker: 'Рекомендуем',
			left_title: 'ПРОВЕРЕННЫЕ РЕШЕНИЯ для ==быстрого старта==',
			left_title_size: 'default',
			left_text: '',
			left_btn1_label: '',
			left_btn1_url: '',
			left_btn1_style: 'dark',
			left_btn2_label: '',
			left_btn2_url: '',
			left_note: '',
			right_card: 'key_card',
			right_key: null,
			right_code: '',
			right_metrics: '',
			ratio: 'wide'
		},
		fields: function () {
			return sectionFields().concat([
				{ key: '_hl', label: 'Левая колонка', type: 'group-label' },
				{ key: 'left_mode', label: 'Наполнение слева', type: 'select', options: [['text', 'Текстовый стек (заголовок, текст, кнопки)'], ['promo', 'Промо-карточка (promo_card)'], ['none', 'Пусто (только правая карточка)']] },
				{ key: 'left_kicker', label: 'Кикер (аннотация мелким шрифтом)', type: 'text', depends: 'left_mode:text' },
				{ key: 'left_title', label: 'Заголовок (markdown, ==акцент==)', type: 'textarea', rows: 2, markdown: true, depends: 'left_mode:text' },
				{ key: 'left_title_size', label: 'Размер заголовка', type: 'select', depends: 'left_mode:text', options: [['default', 'Обычный (42px)'], ['md', 'Средний (56px)'], ['lg', 'Крупный (64px)'], ['xl', 'Максимальный (76px)']] },
				{ key: 'left_text', label: 'Текст (markdown, абзацы через пустую строку)', type: 'textarea', rows: 4, markdown: true, depends: 'left_mode:text' },
				{ key: 'left_btn1_label', label: 'Кнопка 1 — текст', type: 'text', depends: 'left_mode:text' },
				{ key: 'left_btn1_url', label: 'Кнопка 1 — ссылка (или form:ID)', type: 'text', depends: 'left_mode:text' },
				{ key: 'left_btn1_style', label: 'Кнопка 1 — стиль', type: 'select', depends: 'left_mode:text', options: [['dark', 'Тёмная нейтральная'], ['primary', 'Фирменная (палитра)'], ['ghost', 'Контурная']] },
				{ key: 'left_btn2_label', label: 'Кнопка 2 — текст', type: 'text', depends: 'left_mode:text' },
				{ key: 'left_btn2_url', label: 'Кнопка 2 — ссылка', type: 'text', depends: 'left_mode:text' },
				{ key: 'left_note', label: 'Строка доверия под кнопками', type: 'text', depends: 'left_mode:text' },
				{ key: '_hint_promo', label: 'Промо-карточка слева настраивается в самом блоке «Ряд»: бейдж, заголовок, текст и кнопка — ниже.', type: 'hint', depends: 'left_mode:promo' },
				{ key: 'left_badge', label: 'Бейдж-стикер', type: 'text', depends: 'left_mode:promo' },
				{ key: 'left_promo_title', label: 'Заголовок карточки', type: 'text', depends: 'left_mode:promo' },
				{ key: 'left_promo_logo', label: 'Картинка в шапке-полосе (пусто — без шапки)', type: 'text', depends: 'left_mode:promo' },
				{ key: 'left_promo_text', label: 'Текст промо (markdown)', type: 'textarea', rows: 5, markdown: true, depends: 'left_mode:promo' },
				{ key: 'left_promo_btn_label', label: 'Кнопка — текст', type: 'text', depends: 'left_mode:promo' },
				{ key: 'left_promo_btn_url', label: 'Кнопка — ссылка (или form:ID)', type: 'text', depends: 'left_mode:promo' },
				{ key: '_hr', label: 'Правая колонка', type: 'group-label' },
				{ key: 'right_card', label: 'Карточка справа', type: 'select', options: [['key_card', 'Карточка ключа / купон'], ['code', 'Код-окно'], ['metrics', 'Метрики (значение + подпись)'], ['none', 'Без карточки']] },
				{ key: 'ratio', label: 'Пропорция колонок', type: 'select', options: [['wide', 'Текст шире (2:1)'], ['equal', 'Поровну']] },
				/* Поля правой карточки — общие для всех видов (упрощение против
				 * ветвления по видам: пустые поля не выводятся) */
				{ key: 'right_meta_left', label: 'Карточка: метаданные слева (шапка)', type: 'text' },
				{ key: 'right_meta_right', label: 'Карточка: метаданные справа (шапка)', type: 'text' },
				{ key: 'right_label', label: 'Карточка: метка/бейдж внутри', type: 'text' },
				{ key: 'right_value', label: 'Карточка: главное значение (моно)', type: 'text', depends: 'right_card:key_card' },
				{ key: 'right_value_dim', label: 'Приглушаемая часть значения (середина)', type: 'text', depends: 'right_card:key_card' },
				{ key: 'right_chips', label: 'Карточка: пилюли (по строке: иконка | текст)', type: 'textarea', rows: 3, depends: 'right_card:key_card' },
				{ key: 'right_window', label: 'Тёмное окно (сине-тёмный градиент) + пунктир с узлами', type: 'checkbox', depends: 'right_card:key_card' },
				{ key: 'right_code_text', label: 'Текст кода (переносы строк сохраняются)', type: 'textarea', rows: 5, depends: 'right_card:code' },
				{ key: 'right_metrics_rows', label: 'Метрики (по строке: значение | подпись)', type: 'textarea', rows: 4, depends: 'right_card:metrics' },
				{ key: '_gc', label: 'Кнопка копирования (под правой карточкой)', type: 'group-label' },
				{ key: 'right_copy', label: 'Добавить кнопку копирования', type: 'checkbox' },
				{ key: 'right_copy_label', label: 'Текст кнопки', type: 'text', depends: 'right_copy:true' },
				{ key: 'right_copy_text', label: 'Что копировать (пусто — значение/код карточки)', type: 'textarea', rows: 2, depends: 'right_copy:true' }
			]);
		},
		toHTML: function (data) {
			var v = data || {};
			var mode = ['text', 'promo', 'none'].indexOf(v.left_mode) !== -1 ? v.left_mode : 'text';
			var card = ['key_card', 'code', 'metrics', 'none'].indexOf(v.right_card) !== -1 ? v.right_card : 'key_card';
			var mainHtml = '';
			if (mode === 'text') {
				var lt = String(v.left_title || '').trim();
				var ltxt = String(v.left_text || '').trim();
				if (lt || ltxt) {
					var titleCls = 'vcc-hero__title';
					if (v.left_title_size === 'md' || v.left_title_size === 'lg' || v.left_title_size === 'xl') titleCls += ' vcc-hero__title--' + v.left_title_size;
					mainHtml += '<div class="vcc-hero__main">';
					if (String(v.left_kicker || '').trim()) mainHtml += '<p class="vcc-hero__kicker">' + vccInline(v.left_kicker) + '</p>';
					if (lt) mainHtml += '<h2 class="' + titleCls + '">' + vccInline(lt) + '</h2>';
					if (ltxt) mainHtml += '<div class="vcc-paragraph">' + vccBlock(ltxt) + '</div>';
					var b1 = btnHtml(v.left_btn1_label, v.left_btn1_url, ['dark', 'primary', 'ghost'].indexOf(v.left_btn1_style) !== -1 ? v.left_btn1_style : 'dark');
					var b2 = btnHtml(v.left_btn2_label, v.left_btn2_url, 'ghost');
					if (b1 || b2) mainHtml += '<div class="vcc-hero__actions">' + b1 + b2 + '</div>';
					if (String(v.left_note || '').trim()) mainHtml += '<p class="vcc-hero__note">' + vccInline(v.left_note) + '</p>';
					mainHtml += '</div>';
				}
			} else if (mode === 'promo') {
				var pt = String(v.left_promo_title || '').trim();
				var ptxt = String(v.left_promo_text || '').trim();
				var plogo = String(v.left_promo_logo || '').trim();
				if (pt || ptxt) {
					mainHtml += '<div class="vcc-promocard">';
					if (plogo) mainHtml += '<div class="vcc-promocard__top"><img class="vcc-promocard__logo" src="' + vccEscapeHtml(vccSafeHref(plogo)) + '" alt="" loading="lazy"></div>';
					mainHtml += '<div class="vcc-promocard__body">';
					if (String(v.left_badge || '').trim()) mainHtml += '<span class="vcc-promocard__badge">' + vccInline(v.left_badge) + '</span>';
					if (pt) mainHtml += '<h3 class="vcc-promocard__title">' + vccInline(pt) + '</h3>';
					if (ptxt) mainHtml += '<div class="vcc-promocard__text">' + vccBlock(ptxt) + '</div>';
					if (String(v.left_promo_btn_label || '').trim()) mainHtml += '<div class="vcc-promocard__actions">' + btnHtml(v.left_promo_btn_label, v.left_promo_btn_url, 'dark') + '</div>';
					mainHtml += '</div></div>';
				}
			}
			/* Правая карточка */
			var sideHtml = '';
			var copySrc = String(v.right_copy_text || '').trim();
			if (card === 'key_card') {
				var val = String(v.right_value || '').trim();
				var dim = String(v.right_value_dim || '').trim();
				var chips = String(v.right_chips || '').split(/\r?\n/).filter(function (l) { return l.trim(); });
				if (val || chips.length) {
					var isWin = !!v.right_window;
					var valueHtml = '';
					if (val && dim) {
						/* Три части: до dim / dim / после dim. Edge-дефисы всех частей
						 * обрезаются, разделитель рисует segSep (моно-дефис) — так
						 * «3834-uni-opencartclub» с dim=«uni» даёт ровно один дефис
						 * между частями, как в референсе, при любом вводе. */
						var at = val.indexOf(dim);
						if (at > 0) {
							var head = val.slice(0, at).replace(/-+$/, '');
							var tail = val.slice(at + dim.length).replace(/^-+/, '');
							var dimCore = dim.replace(/^-+|-+$/g, '');
							var segSep = '-';
							valueHtml = '<span>' + vccEscapeHtml(head) + '</span>' +
								'<span class="vcc-keycard__sep">' + vccEscapeHtml(segSep) + '</span>' +
								'<span class="vcc-keycard__seg--dim">' + vccEscapeHtml(dimCore) + '</span>' +
								'<span class="vcc-keycard__sep">' + vccEscapeHtml(segSep) + '</span>' +
								'<span>' + vccEscapeHtml(tail) + '</span>';
						} else {
							valueHtml = '<span>' + vccEscapeHtml(val) + '</span>';
						}
					} else {
						valueHtml = '<span>' + vccEscapeHtml(val) + '</span>';
					}
					/* Авто-источник копии: код без приглушённой середины */
					if (!copySrc && val) {
						copySrc = dim && val.indexOf(dim) > 0
							? val.slice(0, val.indexOf(dim)) + val.slice(val.indexOf(dim) + dim.length)
							: val;
					}
					sideHtml += '<div class="vcc-keycard">';
					var mL = String(v.right_meta_left || '').trim(), mR = String(v.right_meta_right || '').trim();
					if (mL || mR) sideHtml += '<div class="vcc-keycard__meta"><span>' + vccInline(mL) + '</span><span>' + vccInline(mR) + '</span></div>';
					sideHtml += '<div class="vcc-keycard__card' + (isWin ? ' vcc-keycard__card--window' : '') + '">' +
						'<div class="vcc-keycard__sheen"></div>' +
						(String(v.right_label || '').trim() ? '<div class="vcc-keycard__label">' + vccInline(v.right_label) + '</div>' : '') +
						(valueHtml ? '<div class="vcc-keycard__value">' + valueHtml + '</div>' : '') +
						(isWin ? '<div class="vcc-keycard__window"></div>' : '');
					if (chips.length) {
						var chipsHtml = '';
						for (var ci = 0; ci < chips.length; ci++) {
							var cp = chips[ci].split('|');
							var cIcon = String(cp[0] || '').trim().replace(/^fa-/, '');
							var cText = String(cp[1] !== undefined ? cp[1] : cp[0]).trim();
							chipsHtml += '<span class="vcc-chip">' + (cIcon && cp.length > 1 ? '<span class="vcc-icon" data-vcc-icon="fa-' + vccEscapeHtml(cIcon) + '"></span> ' : '') + vccInline(cText) + '</span>';
						}
						sideHtml += '<div class="vcc-keycard__perforation"><div class="vcc-keycard__footer">' + chipsHtml + '</div></div>';
					}
					sideHtml += '</div>';
					if (v.right_copy && copySrc) {
						sideHtml += '<div class="vcc-row__sidebtn"><button type="button" class="vcc-copybtn" data-vcc-copy="' + vccEscapeHtml(copySrc) + '">' +
							'<span class="vcc-icon" data-vcc-icon="fa-clone"></span>' + vccInline(String(v.right_copy_label || 'Скопировать').trim()) + '</button></div>';
					}
					sideHtml += '</div>';
				}
			} else if (card === 'code') {
				var codeText = String(v.right_code_text || '').trim();
				if (codeText) {
					if (!copySrc) copySrc = codeText;
					var codeHtml = vccEscapeHtml(codeText).replace(/\r?\n/g, '<br>');
					sideHtml += '<div class="vcc-codewin">' +
						'<div class="vcc-codewin__header"><span class="vcc-codewin__dots"><span></span><span></span><span></span></span>' +
						'<span class="vcc-codewin__title">' + vccEscapeHtml(String(v.right_meta_left || 'window').trim()) + '</span></div>' +
						'<div class="vcc-codewin__body"><pre><code>' + codeHtml + '</code></pre></div>' +
						'</div>';
					if (v.right_copy) {
						sideHtml += '<div class="vcc-row__sidebtn"><button type="button" class="vcc-copybtn" data-vcc-copy="' + vccEscapeHtml(copySrc) + '">' +
							'<span class="vcc-icon" data-vcc-icon="fa-clone"></span>' + vccInline(String(v.right_copy_label || 'Скопировать').trim()) + '</button></div>';
					}
				}
			} else if (card === 'metrics') {
				var mrows = String(v.right_metrics_rows || '').split(/\r?\n/).filter(function (l) { return l.trim(); });
				if (mrows.length) {
					sideHtml += '<div class="vcc-hero__visual">';
					var tmL = String(v.right_meta_left || '').trim(), tmR = String(v.right_meta_right || '').trim();
					if (tmL || tmR) sideHtml += '<div class="vcc-hero__visual-top">' + (tmL ? '<span class="vcc-hero__visual-kicker">' + vccInline(tmL) + '</span>' : '') + (tmR ? '<span>' + vccEscapeHtml(tmR) + '</span>' : '') + '</div>';
					sideHtml += '<div class="vcc-hero__visual-metrics">';
					for (var mi = 0; mi < mrows.length; mi++) {
						var mp = mrows[mi].split('|');
						sideHtml += '<article><strong>' + vccInline(String(mp[0] || '').trim()) + '</strong><span>' + vccInline(String(mp[1] !== undefined ? mp[1] : '').trim()) + '</span></article>';
					}
					sideHtml += '</div></div>';
				}
			}
			if (!mainHtml && !sideHtml) return '';
			var rowCls = 'vcc-row' + (v.ratio !== 'equal' ? ' vcc-row--ratio-wide' : '');
			var html = sectionOpen(secData(v)) + '<div class="' + rowCls + '">';
			if (mainHtml) html += '<div class="vcc-row__main">' + mainHtml + '</div>';
			if (sideHtml) html += '<div class="vcc-row__side">' + sideHtml + '</div>';
			return html + '</div>' + sectionClose();
		}
	});

	/* --- key_card: Премиум-карточка ключа (Tom Modern key-card) ---
	 * Сегменты ключа перечисляются по строкам; флаг dim — приглушённый сегмент.
	 * Чипы: «текст» + опциональная иконка fa-*. */
	BlockRegistry.register({
		type: 'key_card',
		label: 'Карточка ключа',
		icon: 'fa-key',
		group: 'landing',
		defaults: {
			sec: { eyebrow: '', title: '', bg: 'none', padding: 'm', width: 'narrow' },
			meta_left: 'Лицензия',
			meta_right: 'VITA-3.0',
			card_label: 'Ключ продукта',
			segs: [
				{ value: 'VITA', dim: false },
				{ value: '8F2C-ZQ91', dim: true },
				{ value: 'K4D7-TX5E', dim: false }
			],
			sep: '-',
			chips: [
				{ icon: 'fa-check-circle-o', text: 'Активирован' },
				{ icon: 'fa-calendar-check-o', text: 'До 2027-01-15' }
			],
			body: 'classic',
			window_line: true,
			copy: false,
			copy_label: 'Скопировать',
			copy_text: '',
			copy_layout: 'full'
		},
		fields: function () {
			return sectionFields().concat([
				{ key: '_hint', label: 'Тёмная карточка-артефакт: sheen-блик, перфорация, чипы. Значение печатается моноширинно; сегменты перечисляются списком.', type: 'hint' },
				{ key: 'meta_left', label: 'Метаданные слева', type: 'text' },
				{ key: 'meta_right', label: 'Метаданные справа', type: 'text' },
				{ key: 'card_label', label: 'Метка карточки', type: 'text' },
				{ key: 'body', label: 'Тело карточки', type: 'select', options: [['classic', 'Классика (инверсия токенов)'], ['window', 'Тёмное окно (сине-тёмный градиент)']] },
				{ key: 'window_line', label: 'Пунктирная линия с узлами', type: 'checkbox', depends: 'body:window' },
				{
					key: 'segs', label: 'Сегменты ключа', type: 'rows-editor', addLabel: 'Добавить сегмент', max: 8,
					itemFields: [
						{ key: 'value', label: 'Текст сегмента', type: 'text' },
						{ key: 'dim', label: 'Приглушить (dim)', type: 'checkbox' }
					],
					itemTitle: function (item) { return item.value || 'сегмент'; }
				},
				{ key: 'sep', label: 'Разделитель', type: 'text' },
				{
					key: 'chips', label: 'Чипы', type: 'rows-editor', addLabel: 'Добавить чип', max: 4,
					itemFields: [
						{ key: 'icon', label: 'Иконка FontAwesome (опц.)', type: 'text', placeholder: 'fa-check-circle-o' },
						{ key: 'text', label: 'Текст', type: 'text' }
					],
					itemTitle: function (item) { return item.text || 'чип'; }
				},
				{ key: '_gc', label: 'Кнопка копирования', type: 'group-label' },
				{ key: 'copy', label: 'Добавить кнопку копирования', type: 'checkbox' },
				{ key: 'copy_label', label: 'Текст кнопки', type: 'text', depends: 'copy:true' },
				{ key: 'copy_text', label: 'Что копировать (пусто — код из сегментов)', type: 'textarea', rows: 2, depends: 'copy:true' },
				{ key: 'copy_layout', label: 'Размещение кнопки', type: 'select', depends: 'copy:true', options: [['full', 'Полноширинная под карточкой'], ['inline', 'В строку под карточкой']] }
			]);
		},
		toHTML: function (data) {
			var v = data || {};
			var segs = arr(v.segs).filter(function (s) { return s && String(s.value || '').trim(); });
			var chips = arr(v.chips).filter(function (c) { return c && String(c.text || '').trim(); });
			var sep = String(v.sep || '-');
			var valueHtml = '';
			for (var i = 0; i < segs.length; i++) {
				if (i) valueHtml += '<span class="vcc-keycard__sep">' + vccEscapeHtml(sep) + '</span>';
				valueHtml += '<span' + (segs[i].dim ? ' class="vcc-keycard__seg--dim"' : '') + '>' + vccEscapeHtml(String(segs[i].value).trim()) + '</span>';
			}
			var chipsHtml = '';
			for (var j = 0; j < chips.length; j++) {
				var cIcon = String(chips[j].icon || '').trim().replace(/^fa-/, '');
				chipsHtml += '<span class="vcc-chip">' + (cIcon ? '<span class="vcc-icon" data-vcc-icon="fa-' + vccEscapeHtml(cIcon) + '"></span> ' : '') + vccInline(chips[j].text) + '</span>';
			}
			if (!valueHtml && !chipsHtml) return '';
			var isWindow = v.body === 'window';
			var html = sectionOpen(secData(v)) + '<div class="vcc-keycard">';
			var mL = String(v.meta_left || '').trim(), mR = String(v.meta_right || '').trim();
			if (mL || mR) html += '<div class="vcc-keycard__meta"><span>' + vccInline(mL) + '</span><span>' + vccInline(mR) + '</span></div>';
			html += '<div class="vcc-keycard__card' + (isWindow ? ' vcc-keycard__card--window' : '') + '">' +
				'<div class="vcc-keycard__sheen"></div>' +
				'<div class="vcc-keycard__label">' + vccInline(String(v.card_label || '').trim()) + '</div>' +
				'<div class="vcc-keycard__value">' + valueHtml + '</div>' +
				(isWindow && v.window_line !== false ? '<div class="vcc-keycard__window"></div>' : '') +
				(chipsHtml ? '<div class="vcc-keycard__perforation"><div class="vcc-keycard__footer">' + chipsHtml + '</div></div>' : '') +
				'</div>';
			if (v.copy) {
				var copySrc = String(v.copy_text || '').trim();
				if (!copySrc) {
					/* Авто-источник: неприглушённые сегменты через разделитель */
					var parts = [];
					for (var s = 0; s < segs.length; s++) { if (!segs[s].dim) parts.push(String(segs[s].value).trim()); }
					copySrc = parts.join(sep);
				}
				if (copySrc) {
					html += '<div class="vcc-row__sidebtn"><button type="button" class="vcc-copybtn' + (v.copy_layout === 'inline' ? ' vcc-copybtn--inline' : '') + '" data-vcc-copy="' + vccEscapeHtml(copySrc) + '">' +
						'<span class="vcc-icon" data-vcc-icon="fa-clone"></span>' + vccInline(String(v.copy_label || 'Скопировать').trim()) + '</button></div>';
				}
			}
			return html + '</div>' + sectionClose();
		}
	});

	/* --- spec_list: Спецификация «лейбл → значение» (Tom Modern spec-list) --- */
	BlockRegistry.register({
		type: 'spec_list',
		label: 'Спецификация',
		icon: 'fa-list-alt',
		group: 'landing',
		defaults: {
			sec: { eyebrow: 'Характеристики', title: 'Технические ==детали==', bg: 'none', padding: 'm', width: 'narrow' },
			items: [
				{ label: 'Материал', value: 'Алюминий 6061-T6, анодирование' },
				{ label: 'Габариты', value: '120 × 80 × 45 мм' },
				{ label: 'Гарантия', value: '[12 месяцев](form:0)' }
			]
		},
		fields: function () {
			return sectionFields().concat([
				{
					key: 'items', label: 'Строки спецификации', type: 'rows-editor', addLabel: 'Добавить строку', max: 30,
					itemFields: [
						{ key: 'label', label: 'Лейбл (название параметра)', type: 'text' },
						{ key: 'value', label: 'Значение (markdown)', type: 'textarea', rows: 2, markdown: true }
					],
					itemTitle: function (item, i) { return (item && item.label) ? item.label : ('Строка ' + (i + 1)); }
				}
			]);
		},
		toHTML: function (data) {
			var v = data || {};
			var items = arr(v.items).filter(function (it) { return it && (String(it.label || '').trim() || String(it.value || '').trim()); });
			if (!items.length) return '';
			var html = sectionOpen(secData(v)) + sectionHead(v.sec) + '<div class="vcc-speclist">';
			for (var i = 0; i < items.length; i++) {
				html += '<div class="vcc-speclist__row">' +
					'<div class="vcc-speclist__label">' + vccInline(items[i].label || '') + '</div>' +
					'<div class="vcc-speclist__value">' + vccBlock(items[i].value || '') + '</div>' +
					'</div>';
			}
			return html + '</div>' + sectionClose();
		}
	});

	/* --- comparison: Сравнение «альтернатива / мы» (Tom Modern comparison) --- */
	BlockRegistry.register({
		type: 'comparison',
		label: 'Сравнение',
		icon: 'fa-balance-scale',
		group: 'landing',
		defaults: {
			sec: { eyebrow: 'Сравнение', title: 'Почему ==мы==, а не они', bg: 'none', padding: 'm', width: 'default' },
			rows: [
				{ alt: 'Альтернатива один', us: 'Что предлагаем мы', us_row: false },
				{ alt: 'Альтернатива два', us: 'Что предлагаем мы', us_row: false },
				{ alt: 'Альтернатива три', us: 'Что предлагаем мы', us_row: true }
			],
			note: ''
		},
		fields: function () {
			return sectionFields().concat([
				{
					key: 'rows', label: 'Пары «альтернатива / мы»', type: 'rows-editor', addLabel: 'Добавить пару', max: 10,
					itemFields: [
						{ key: 'alt', label: 'Альтернатива (что предлагают другие)', type: 'textarea', rows: 2, markdown: true },
						{ key: 'us', label: 'Наше решение', type: 'textarea', rows: 2, markdown: true },
						{ key: 'us_row', label: 'Это строка «нашего решения» (подсветить)', type: 'checkbox' }
					],
					itemTitle: function (item, i) { return (item && item.alt) ? String(item.alt).slice(0, 30) : ('Пара ' + (i + 1)); }
				},
				{ key: 'note', label: 'Примечание под таблицей (необязательно)', type: 'text' }
			]);
		},
		toHTML: function (data) {
			var v = data || {};
			var rows = arr(v.rows).filter(function (r) { return r && (String(r.alt || '').trim() || String(r.us || '').trim()); });
			if (!rows.length) return '';
			var html = sectionOpen(secData(v)) + sectionHead(v.sec) + '<div class="vcc-compare">';
			for (var i = 0; i < rows.length; i++) {
				html += (rows[i].us_row ? '<div class="vcc-compare__row vcc-compare__row--us">' : '<div class="vcc-compare__row">') +
					'<span>' + vccInline(rows[i].alt || '') + '</span>' +
					'<strong>' + vccInline(rows[i].us || '') + '</strong>' +
					'</div>';
			}
			html += '</div>';
			if (String(v.note || '').trim()) html += '<p class="vcc-compare__note">' + vccInline(v.note) + '</p>';
			return html + sectionClose();
		}
	});

	/* --- pain_points: Типичные проблемы (Tom Modern pain-points) --- */
	BlockRegistry.register({
		type: 'pain_points',
		label: 'Типичные проблемы',
		icon: 'fa-exclamation-triangle',
		group: 'landing',
		defaults: {
			sec: { eyebrow: 'Проблемы', title: 'Знакомые ==боли== покупателя', bg: 'light', padding: 'l', width: 'default' },
			cols: '3',
			items: [
				{ title: 'Проблема номер один', text: 'Описание ситуации, в которую попадает покупатель, и чем это для него плохо.' },
				{ title: 'Проблема номер два', text: 'Описание ситуации, в которую попадает покупатель, и чем это для него плохо.' },
				{ title: 'Проблема номер три', text: 'Описание ситуации, в которую попадает покупатель, и чем это для него плохо.' }
			]
		},
		fields: function () {
			return sectionFields().concat([
				{ key: 'cols', label: 'Колонок', type: 'select', options: [['2', '2'], ['3', '3'], ['4', '4']] },
				{
					key: 'items', label: 'Проблемы', type: 'rows-editor', addLabel: 'Добавить проблему', max: 8,
					itemFields: [
						{ key: 'title', label: 'Заголовок проблемы', type: 'text' },
						{ key: 'text', label: 'Описание', type: 'textarea', rows: 3, markdown: true }
					],
					itemTitle: function (item, i) { return (item && item.title) ? item.title : ('Проблема ' + (i + 1)); }
				}
			]);
		},
		toHTML: function (data) {
			var v = data || {};
			var items = arr(v.items).filter(function (it) { return it && (String(it.title || '').trim() || String(it.text || '').trim()); });
			if (!items.length) return '';
			var cols = ['2', '3', '4'].indexOf(String(v.cols)) !== -1 ? String(v.cols) : '3';
			var html = sectionOpen(secData(v)) + sectionHead(v.sec) + '<div class="vcc-pains vcc-pains--c' + cols + '">';
			for (var i = 0; i < items.length; i++) {
				html += '<div class="vcc-pain">' +
					'<h3 class="vcc-pain__title">' + vccInline(items[i].title || '') + '</h3>' +
					'<div class="vcc-pain__text">' + vccBlock(items[i].text || '') + '</div>' +
					'</div>';
			}
			return html + '</div>' + sectionClose();
		}
	});

	/* --- updates_grid: Обновления/новинки (Tom Modern updates-grid) --- */
	BlockRegistry.register({
		type: 'updates_grid',
		label: 'Обновления',
		icon: 'fa-refresh',
		group: 'landing',
		defaults: {
			sec: { eyebrow: 'Что нового', title: 'Последние ==обновления==', bg: 'none', padding: 'l', width: 'default' },
			cols: '3',
			items: [
				{ tag: 'Новое', tag_new: true, title: 'Возможность номер один', text: 'Короткое описание возможности и пользы для владельца магазина.' },
				{ tag: 'Улучшение', tag_new: false, title: 'Возможность номер два', text: 'Короткое описание возможности и пользы для владельца магазина.' },
				{ tag: 'Исправлено', tag_new: false, title: 'Возможность номер три', text: 'Короткое описание возможности и пользы для владельца магазина.' }
			]
		},
		fields: function () {
			return sectionFields().concat([
				{ key: 'cols', label: 'Колонок', type: 'select', options: [['2', '2'], ['3', '3'], ['4', '4']] },
				{
					key: 'items', label: 'Позиции', type: 'rows-editor', addLabel: 'Добавить позицию', max: 9,
					itemFields: [
						{ key: 'tag', label: 'Метка (например «Новое»)', type: 'text' },
						{ key: 'tag_new', label: 'Метка зелёная (акцентная)', type: 'checkbox' },
						{ key: 'title', label: 'Заголовок', type: 'text' },
						{ key: 'text', label: 'Описание', type: 'textarea', rows: 3, markdown: true }
					],
					itemTitle: function (item, i) { return (item && item.title) ? item.title : ('Позиция ' + (i + 1)); }
				}
			]);
		},
		toHTML: function (data) {
			var v = data || {};
			var items = arr(v.items).filter(function (it) { return it && (String(it.title || '').trim() || String(it.text || '').trim()); });
			if (!items.length) return '';
			var cols = ['2', '3', '4'].indexOf(String(v.cols)) !== -1 ? String(v.cols) : '3';
			var html = sectionOpen(secData(v)) + sectionHead(v.sec) + '<div class="vcc-updates vcc-updates--c' + cols + '">';
			for (var i = 0; i < items.length; i++) {
				var tag = String(items[i].tag || '').trim();
				/* div, не article: whitelist тегов санитайзера темы исторически
				 * без article — контракт vcc-v1 держится на div/span */
				html += '<div class="vcc-update">' +
					(tag ? '<span class="vcc-update__tag' + (items[i].tag_new ? ' vcc-update__tag--new' : '') + '">' + vccInline(tag) + '</span>' : '') +
					'<h3 class="vcc-update__title">' + vccInline(items[i].title || '') + '</h3>' +
					'<div class="vcc-update__text">' + vccBlock(items[i].text || '') + '</div>' +
					'</div>';
			}
			return html + '</div>' + sectionClose();
		}
	});

	/* --- code_window: Код-окно с подсветкой (Tom Modern code-window) ---
	 * Код собирается из фрагментов; «роль» задаёт цвет подсветки:
	 * plain | keyword | function | string | number | property | comment | punctuation. */
	BlockRegistry.register({
		type: 'code_window',
		label: 'Код-окно',
		icon: 'fa-code',
		group: 'landing',
		defaults: {
			sec: { eyebrow: '', title: '', bg: 'none', padding: 'm', width: 'narrow' },
			filename: 'example.js',
			lines: [
				{ tag: 'keyword', text: 'const' },
				{ tag: 'plain', text: ' greeting ' },
				{ tag: 'punctuation', text: '= ' },
				{ tag: 'string', text: "'Привет, мир!'" },
				{ tag: 'punctuation', text: ';' }
			]
		},
		fields: function () {
			return sectionFields().concat([
				{ key: '_hint', label: 'Код собирается из фрагментов с ролью: plain | keyword | function | string | number | property | comment | punctuation. Перенос строки внутри фрагмента сохраняется.', type: 'hint' },
				{ key: 'filename', label: 'Имя файла в шапке', type: 'text' },
				{
					key: 'lines', label: 'Код', type: 'rows-editor', addLabel: 'Добавить фрагмент', max: 200,
					itemFields: [
						{ key: 'tag', label: 'Роль', type: 'select', options: [['plain', 'plain'], ['keyword', 'keyword'], ['function', 'function'], ['string', 'string'], ['number', 'number'], ['property', 'property'], ['comment', 'comment'], ['punctuation', 'punctuation']] },
						{ key: 'text', label: 'Текст', type: 'textarea', rows: 2 }
					],
					itemTitle: function (item) { return '[' + (item.tag || 'plain') + '] ' + String(item.text || '').slice(0, 30); }
				}
			]);
		},
		toHTML: function (data) {
			var v = data || {};
			var lines = arr(v.lines).filter(function (l) { return l && String(l.text || '').length; });
			if (!lines.length) return '';
			var SAFE_TAGS = ['plain', 'keyword', 'function', 'string', 'number', 'property', 'comment', 'punctuation'];
			var code = '';
			for (var i = 0; i < lines.length; i++) {
				var tag = SAFE_TAGS.indexOf(String(lines[i].tag || 'plain')) !== -1 ? String(lines[i].tag) : 'plain';
				/* \n внутри фрагмента -> <br>: литеральные переводы строк ненадёжны
				 * (минификатор HTML темы схлопывает их — строки кода склеиваются). */
				var txt = vccEscapeHtml(String(lines[i].text)).replace(/\r?\n/g, '<br>');
				code += tag === 'plain' ? txt : '<span class="vcc-tok-' + tag + '">' + txt + '</span>';
			}
			var html = sectionOpen(secData(v)) + '<div class="vcc-codewin">' +
				'<div class="vcc-codewin__header"><span class="vcc-codewin__dots"><span></span><span></span><span></span></span>' +
				'<span class="vcc-codewin__title">' + vccEscapeHtml(String(v.filename || '').trim()) + '</span></div>' +
				'<div class="vcc-codewin__body"><pre><code>' + code + '</code></pre></div>' +
				'</div>' + sectionClose();
			return html;
		}
	});

	/* --- video: Видео из сервиса (iframe собирает рантайм темы) --- */
	BlockRegistry.register({
		type: 'video',
		label: 'Видео',
		icon: 'fa-youtube-play',
		group: 'landing',
		defaults: { src: '', ratio: '16x9', title: '', sec: { bg: 'none', padding: 'm', width: 'default' } },
		fields: function () {
			return sectionFields().concat([
				{ key: 'src', label: 'Ссылка на видео или полный iframe-код из «Встроить»', type: 'textarea', rows: 3,
					placeholder: 'https://www.youtube.com/watch?v=…  или  <iframe src="…"></iframe>' },
				{ key: 'ratio', label: 'Пропорции', type: 'select', options: [['16x9', '16:9'], ['4x3', '4:3'], ['1x1', '1:1']] },
				{ key: 'title', label: 'Название видео (подпись)', type: 'text' }
			]);
		},
		toHTML: function (data) {
			var v = data || {};
			var resolved = resolveVideoUrl(v.src);
			if (!resolved.url && !String(v.title || '').trim()) return '';
			var html = sectionOpen(secData(v)) + sectionHead(v.sec);
			var attrs = resolved.url
				? ' data-vcc-video="' + vccEscapeHtml(resolved.url) + '"' +
					(String(v.title || '').trim() ? ' data-vcc-video-title="' + vccEscapeHtml(v.title) + '"' : '')
				: '';
			var inner = resolved.url
				? '<a class="vcc-video__link" href="' + vccEscapeHtml(resolved.url) + '">' + vccEscapeHtml(v.title || resolved.url) + '</a>'
				: '<span class="vcc-video__link">' + vccEscapeHtml(v.title || '') + '</span>';
			html += '<div class="vcc-video vcc-video--' + (['16x9', '4x3', '1x1'].indexOf(v.ratio) !== -1 ? v.ratio : '16x9') + '"' + attrs + '>' + inner + '</div>';
			if (String(v.title || '').trim()) html += '<p class="vcc-video__caption">' + vccInline(v.title) + '</p>';
			return html + sectionClose();
		}
	});

	/* Разрешённые хосты embed — единый список с рантаймом темы (§7.5 спеки) */
	function isVideoHostAllowed(url) {
		return /^(https:\/\/)?(www\.youtube-nocookie\.com|player\.vimeo\.com|rutube\.ru|ok\.ru|www\.dailymotion\.com|vk\.com\/video_ext\.php)/i.test(String(url || ''));
	}

	/* Из вставленного кода/ссылки — канонический embed-URL (или '' — тогда
	 * блок экспортируется без iframe-заглушки, как текст). */
	function resolveVideoUrl(raw) {
		var s = String(raw || '').trim();
		if (!s) return { url: '', warn: '' };
		var m = s.match(/<iframe[^>]*\ssrc=["']([^"']+)["'][^>]*>/i);
		if (m) {
			var url = m[1].trim();
			return { url: isVideoHostAllowed(url) ? url : '', warn: isVideoHostAllowed(url) ? '' : 'Хост этого плеера не входит в разрешённый список темы — видео экспортируется ссылкой.' };
		}
		if (/<script/i.test(s)) {
			return { url: '', warn: 'Видео через скрипт добавить нельзя (политика безопасности темы) — скопируйте iframe-код или ссылку на ролик.' };
		}
		var id;
		id = s.match(/(?:youtube\.com\/watch\?(?:.*&)?v=|youtu\.be\/)([A-Za-z0-9_-]{6,})/i);
		if (id) return { url: 'https://www.youtube-nocookie.com/embed/' + id[1], warn: '' };
		id = s.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
		if (id) return { url: 'https://player.vimeo.com/video/' + id[1], warn: '' };
		id = s.match(/rutube\.ru\/video\/([a-z0-9]+)/i);
		if (id) return { url: 'https://rutube.ru/play/embed/' + id[1], warn: '' };
		id = s.match(/ok\.ru\/video\/(\d+)/i);
		if (id) return { url: 'https://ok.ru/videoembed/' + id[1], warn: '' };
		id = s.match(/dailymotion\.com\/video\/([a-z0-9]+)/i);
		if (id) return { url: 'https://www.dailymotion.com/embed/video/' + id[1], warn: '' };
		/* vk video_ext-URL проходит как есть */
		if (/vk\.com\/video_ext\.php/i.test(s)) return { url: isVideoHostAllowed(s) ? s : '', warn: '' };
		/* Уже embed-URL разрешённого хоста */
		if (isVideoHostAllowed(s)) return { url: s, warn: '' };
		/* Ссылка на ролик разрешённого сервиса, не разобранная выше, — оставим ссылкой */
		if (/^https?:\/\//i.test(s)) return { url: '', warn: 'Не удалось распознать ссылку как видео разрешённого сервиса — блок экспортируется текстом.' };
		return { url: '', warn: 'Вставьте ссылку на видео (YouTube, Vimeo, Rutube, OK, Dailymotion, VK) или iframe-код из кнопки «Встроить».' };
	}
	window.VccVideo = { resolve: resolveVideoUrl, isHostAllowed: isVideoHostAllowed };
	/* Хелперы секций для блоков-спец-меток (shortcodes.js): модульные блоки
	 * тоже оборачиваются в vcc-section — фон/отступы/якорь/заголовок секции. */
	window.VccSection = {
		open: sectionOpen,
		close: sectionClose,
		head: sectionHead,
		data: secData,
		fields: sectionFields,
		safeBg: safeBg,
		safePad: safePad,
		safeWidth: safeWidth,
		/* Подмена штатных заглушек на локальные копии — ТОЛЬКО для
		 * предпросмотра (app.js); экспорт не трогает. */
		phPreviewHtml: vccPhPreviewHtml
	};

})();