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
			var img = String(sec.image || '').trim();
			if (img) attrs += ' data-vcc-bg="' + vccEscapeHtml(img) + '"';
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
				options: [['default', 'Стандартная (1140px)'], ['narrow', 'Узкая (720px)'], ['full', 'Во всю ширину']] },
			{ key: 'sec.anchor', label: 'Якорь секции (латиница, для ссылок #якорь)', type: 'text', mark: 'sec',
				placeholder: 'tarify' }
		];
	}

	/* Собирает data.sec из плоских ключей «sec.*» (values: { 'sec.bg': 'light', ... }) */
	function secData(values) {
		var sec = {};
		var keys = ['eyebrow', 'title', 'text', 'align', 'bg', 'image', 'video', 'overlay', 'padding', 'width', 'anchor'];
		for (var i = 0; i < keys.length; i++) {
			sec[keys[i]] = values['sec.' + keys[i]];
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
			sec: { bg: 'image', image: '', overlay: true, padding: 'xl', width: 'default', anchor: '' }
		},
		fields: function () {
			return sectionFields().concat([
				{ key: 'title', label: 'Заголовок H1 (на странице он должен быть один)', type: 'textarea', rows: 2, markdown: true },
				{ key: 'sub', label: 'Подзаголовок', type: 'textarea', rows: 3, markdown: true },
				{ key: 'btn1_label', label: 'Кнопка 1 — текст', type: 'text' },
				{ key: 'btn1_url', label: 'Кнопка 1 — ссылка (или form:ID)', type: 'text' },
				{ key: 'btn2_label', label: 'Кнопка 2 — текст (необязательно)', type: 'text' },
				{ key: 'btn2_url', label: 'Кнопка 2 — ссылка (или form:ID)', type: 'text' },
				{ key: 'note', label: 'Строка доверия под кнопками', type: 'text' },
				{ key: 'align', label: 'Выравнивание', type: 'select', options: [['center', 'По центру'], ['left', 'По левому краю']] }
			]);
		},
		toHTML: function (data) {
			var v = data || {};
			var title = String(v.title || '').trim();
			var sub = String(v.sub || '').trim();
			if (!title && !sub) return '';
			var b1 = btnHtml(v.btn1_label, v.btn1_url, 'primary');
			var b2 = btnHtml(v.btn2_label, v.btn2_url, 'ghost');
			var actions = b1 + b2;
			var html = sectionOpen(secData(v)) +
				'<div class="vcc-hero' + (v.align === 'left' ? '' : ' vcc-hero--center') + '">';
			if (title) html += '<h1 class="vcc-hero__title">' + vccInline(title) + '</h1>';
			if (sub) html += '<p class="vcc-hero__sub">' + vccInline(sub) + '</p>';
			if (actions) html += '<div class="vcc-hero__actions">' + actions + '</div>';
			if (String(v.note || '').trim()) html += '<p class="vcc-hero__note">' + vccInline(v.note) + '</p>';
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
			var items = arr(v.items).filter(function (it) { return it && String(it.src || '').trim(); });
			if (!items.length && !String(v.sec && v.sec.title || '').trim()) return '';
			var html = sectionOpen(secData(v)) + sectionHead(v.sec);
			html += '<div class="vcc-logos">';
			for (var i = 0; i < items.length; i++) {
				var it = items[i];
				var img = '<img class="vcc-logos__img" src="' + vccEscapeHtml(vccSafeHref(it.src)) + '" alt="' + vccEscapeHtml(it.alt || '') + '" loading="lazy">';
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
			var img = String(v.img || '').trim();
			if (!text && !img) return '';
			var media = '';
			if (img) {
				media = '<figure class="vcc-media-text__media">' +
					'<img src="' + vccEscapeHtml(vccSafeHref(img)) + '" alt="' + vccEscapeHtml(v.img_alt || '') + '" loading="lazy">';
				if (String(v.caption || '').trim()) media += '<figcaption class="vcc-figure__caption">' + vccInline(v.caption) + '</figcaption>';
				media += '</figure>';
			}
			var btn = btnHtml(v.btn_label, v.btn_url, 'primary');
			var body = '<div class="vcc-media-text__body">' + (text ? vccBlock(text) : '');
			if (btn) body += '<div class="vcc-media-text__actions">' + btn + '</div>';
			body += '</div>';
			return sectionOpen(secData(v)) +
				'<div class="vcc-media-text' + (v.flip ? ' vcc-media-text--flip' : '') + '">' + media + body + '</div>' +
				sectionClose();
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
				{ key: 'style', label: 'Стиль', type: 'select', options: [['timeline', 'Таймлайн (вертикальная линия)'], ['numbers', 'Простые номера']] },
				{
					key: 'items', label: 'Шаги', type: 'rows-editor', addLabel: 'Добавить шаг', max: 8,
					itemFields: [
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
			var html = sectionOpen(secData(v)) + sectionHead(v.sec);
			html += '<div class="vcc-steps vcc-steps--' + style + '">';
			for (var i = 0; i < items.length; i++) {
				html += '<div class="vcc-step">' +
					'<span class="vcc-step__num">' + (i + 1) + '</span>' +
					'<div class="vcc-step__body">' +
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
			items: [
				{ value: '10', suffix: ' лет', label: 'на рынке' },
				{ value: '25', suffix: ' 000+', label: 'довольных клиентов' },
				{ value: '98', suffix: '%', label: 'заказов точно в срок' }
			]
		},
		fields: function () {
			return sectionFields().concat([
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
			var html = sectionOpen(secData(v)) + sectionHead(v.sec);
			html += '<div class="vcc-stats">';
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
				{ key: '_hint', label: 'Живые отзывы магазина выводятся модулями темы; здесь — статичные тексты для лендинга.', type: 'hint' }
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
				if (String(it.avatar || '').trim()) {
					html += '<img class="vcc-review__avatar" src="' + vccEscapeHtml(vccSafeHref(it.avatar)) + '" alt="' + vccEscapeHtml(it.name || '') + '" loading="lazy">';
				}
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
				if (String(it.photo || '').trim()) {
					html += '<img class="vcc-member__photo" src="' + vccEscapeHtml(vccSafeHref(it.photo)) + '" alt="' + vccEscapeHtml(it.name || '') + '" loading="lazy">';
				}
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
				var inner = (String(it.image || '').trim()
					? '<img class="vcc-doc__img" src="' + vccEscapeHtml(vccSafeHref(it.image)) + '" alt="' + vccEscapeHtml(it.title || '') + '" loading="lazy">'
					: '') +
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
				{ key: '_hint', label: 'Чтобы кнопка открыла форму магазина, укажите ссылку вида form:ID (ID формы — из модуля «Вита — Формы»), а на странице добавьте блок «Форма (шорткод)».', type: 'hint' }
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
				{ key: '_hint', label: 'Ссылки tel: и mailto: в кнопках и значениях контактов пропускаются санитайзером темы; без них значение выводится текстом.', type: 'hint' }
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
				{ key: '_hint', label: 'Не забудьте блок «Форма (шорткод)» на странице, если кнопки ведут на form:ID.', type: 'hint' }
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
			var attrs = resolved.url ? ' data-vcc-video="' + vccEscapeHtml(resolved.url) + '"' : '';
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

})();