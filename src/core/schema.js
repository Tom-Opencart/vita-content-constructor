/* ============================================================
Вита — Конструктор контента · core/schema.js
JSON-спецификация проекта и блоков (контракт vcc-v1).
Файл служит и документацией модели, и системным промптом
для внешних инструментов: проект конструктора — валидируемый JSON.
============================================================ */
'use strict';

var CC_SCHEMA_SPEC = {
	contract: 'vcc-v1',
	description: 'JSON-проект конструктора контента темы Вита (OpenCart 3). Поля title, slug, themeMode, theme и blocks. Цветовые значения блоков — имена токенов (primary/secondary/text/muted), никогда hex.',
	project_fields: {
		title: 'String — название страницы',
		slug: 'String — латинский slug, влияет на имя файла экспорта content-{slug}.html',
		themeMode: 'String — light | dark: режим предпросмотра',
		theme: 'Object — { preset: String|null, tokens: Object } снимок палитры, применённой в предпросмотре',
		blocks: 'Array — упорядоченный список блоков'
	},
	supported_blocks: [
		{ type: 'heading', data_schema: { level: 'Integer 2-4 (H2-H4)', text: 'String (markdown: **bold**, *italic*, [text](url))' } },
		{ type: 'paragraph', data_schema: { text: 'String (markdown)' } },
		{ type: 'list', data_schema: { ordered: 'Boolean', items: 'Array of String (markdown)' } },
		{ type: 'quote', data_schema: { text: 'String (markdown)', author: 'String (опционально)' } },
		{ type: 'alert', data_schema: { style: 'info|success|warning|danger', text: 'String (markdown)' } },
		{ type: 'tabs', data_schema: { tabs: 'Array of { title: String, content: String (markdown) }' } },
		{ type: 'table', data_schema: { headers: 'Array of String', rows: 'Array of Array of String' } },
		{ type: 'image', data_schema: { path: 'String (URL или путь вида image/catalog/...)', caption: 'String (опционально)' } },
		{ type: 'toc', data_schema: { title: 'String (опционально)' } },
		/* 0.7.0: лендинг-секции. Общие поля секции — вложенный объект data.sec:
		 * { eyebrow, title, text, align, bg: none|light|surface|primary|image|video,
		 *   image, video, overlay, padding: s|m|l|xl, width: narrow|default|full,
		 *   anchor } — каркас .vcc-section > __inner > .vcc-container. */
		{ type: 'hero', data_schema: { title: 'String (markdown, H1)', sub: 'String (markdown)', btn1_label: 'String', btn1_url: 'String (или form:ID)', btn2_label: 'String', btn2_url: 'String', note: 'String — строка доверия', align: 'left|center', sec: 'Object — общие поля секции' } },
		{ type: 'logos', data_schema: { items: 'Array of { src, alt, url? }', sec: 'Object' } },
		{ type: 'features', data_schema: { cols: '2|3|4', items: 'Array of { icon: fa-имя, title, text (markdown) }', sec: 'Object' } },
		{ type: 'media_text', data_schema: { img: 'String — путь или URL', img_alt: 'String', caption: 'String', flip: 'Boolean — картинка справа', text: 'String (markdown)', btn_label: 'String', btn_url: 'String (или form:ID)', sec: 'Object' } },
		{ type: 'before_after', data_schema: { cols: '2|3|4', items: 'Array of { image, img_alt, title (плашка «До»/«После»), text (markdown) }', sec: 'Object' } },
		{ type: 'steps', data_schema: { style: 'numbers|timeline', items: 'Array of { icon?, title, text (markdown) }', sec: 'Object' } },
		{ type: 'stats', data_schema: { items: 'Array of { value, suffix?, label }', sec: 'Object' } },
		{ type: 'reviews', data_schema: { cols: '2|3', items: 'Array of { text, name, role?, stars: 0-5, avatar? }', sec: 'Object' } },
		{ type: 'team', data_schema: { items: 'Array of { photo?, name, role?, text? }', sec: 'Object' } },
		{ type: 'documents', data_schema: { items: 'Array of { image?, title, url? }', sec: 'Object' } },
		{ type: 'cta', data_schema: { text: 'String (markdown)', btn1_label: 'String', btn1_url: 'String (или form:ID)', btn2_label: 'String', btn2_url: 'String', sec: 'Object (title секции = заголовок призыва)' } },
		{ type: 'contacts', data_schema: { items: 'Array of { icon?, label, value, url? }', sec: 'Object' } },
		{ type: 'socials', data_schema: { align: 'left|center', items: 'Array of { icon, url, label }', sec: 'Object' } },
		{ type: 'badges', data_schema: { items: 'Array of { icon?, title, text? }', sec: 'Object' } },
		{ type: 'checklist', data_schema: { cols: '1|2', items: 'Array of { md: String (markdown-inline) }', sec: 'Object' } },
		{ type: 'divider', data_schema: { style: 'space|line|ornament', sec: 'Object' } },
		{ type: 'seotext', data_schema: { title: 'String', text: 'String (markdown, большой)', open: 'Boolean', sec: 'Object' } },
		{ type: 'pricing', data_schema: { align: 'left|center', items: 'Array of { name, price, old_price?, period?, features: String — по строке на пункт, featured: Boolean, flag_label?, btn_label, btn_url, note? }', sec: 'Object' } },
		{ type: 'columns', data_schema: { cols: '2|3|4', items: 'Array of { md: String (markdown-block) }', sec: 'Object' } },
		{ type: 'video', data_schema: { src: 'String — ссылка или iframe-код сервиса', ratio: '16x9|4x3|1x1', title: 'String', sec: 'Object; экспорт: .vcc-video с data-vcc-video (embed-URL разрешённого хоста), iframe строит рантайм темы' } },
		{ type: 'key_card', data_schema: { meta_left: 'String', meta_right: 'String', card_label: 'String', segs: 'Array of { value: String, dim: Boolean }', sep: 'String', chips: 'Array of { icon?: fa-имя, text: String }', sec: 'Object — общие поля секции; карточка-артефакт: sheen, перфорация, чипы' } },
		{ type: 'code_window', data_schema: { filename: 'String — имя файла в шапке окна', lines: 'Array of { tag: plain|keyword|function|string|number|property|comment|punctuation, text: String }', sec: 'Object — общие поля секции' } },
		{ type: 'vita_faq', data_schema: { faqId: 'Integer ≥ 0 — ID группы FAQ (0 — все активные)', title: 'String (опционально, переопределяет заголовок)', sec: 'Object — общие поля секции (блок оборачивается в vcc-section)' }, export: '[vita_faq id title] литерально в <div class="vcc-shortcode">' },
		{ type: 'vita_form', data_schema: { formId: 'Integer ≥ 1 — ID формы модуля «Вита — Формы» (0 = блок не экспортируется)', sec: 'Object — общие поля секции' }, export: '[vita_form id] литерально в <div class="vcc-shortcode">' },
		{ type: 'vita_visual', data_schema: { blockId: 'Integer ≥ 1 — ID инстанса модуля «Вита — Визуальные блоки» (0 = блок не экспортируется)', sec: 'Object — общие поля секции' }, export: '[vita_visual id] литерально в <div class="vcc-shortcode">' },
		{ type: 'vita_all_in_one', data_schema: { blockId: 'Integer ≥ 1 — ID блока модуля «Вита — Универсальные блоки товаров» (0 = блок не экспортируется)', sec: 'Object — общие поля секции' }, export: '[vita_all_in_one id] литерально в <div class="vcc-shortcode">' },
		{ type: 'vita_extra_wall', data_schema: { blockId: 'Integer ≥ 1 — ID стены модуля «Вита — Стена категорий, брендов и кастомных ссылок» (0 = блок не экспортируется)', sec: 'Object — общие поля секции' }, export: '[vita_extra_wall id] литерально в <div class="vcc-shortcode">' },
		{ type: 'vita_html', data_schema: { content: 'String — HTML строго в whitelist санитайзера (см. системную библиотеку security/content_sanitize.php)', sec: 'Object — общие поля секции' }, export: '[vita_html]…[/vita_html] литерально в <div class="vcc-shortcode">' }
	]
};

/* Гарантированная нормализация блока: id, unknown-типы не пропускаем */
function vccNormalizeBlock(raw) {
	if (!raw || typeof raw !== 'object' || !raw.type) return null;
	var known = Object.keys(BlockRegistry.getAll());
	if (known.indexOf(raw.type) === -1) return null;
	var block = {
		id: raw.id || ('b' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7)),
		type: raw.type,
		data: (raw.data && typeof raw.data === 'object') ? raw.data : {}
	};
	return block;
}

function vccNormalizeProject(raw) {
	if (!raw || typeof raw !== 'object') return null;
	var project = {
		title: typeof raw.title === 'string' ? raw.title : '',
		slug: typeof raw.slug === 'string' ? raw.slug.replace(/[^a-z0-9-]/gi, '-').toLowerCase() : '',
		themeMode: raw.themeMode === 'dark' ? 'dark' : 'light',
		theme: (raw.theme && typeof raw.theme === 'object') ? raw.theme : { preset: null, tokens: null },
		blocks: []
	};
	if (Array.isArray(raw.blocks)) {
		for (var i = 0; i < raw.blocks.length; i++) {
			var block = vccNormalizeBlock(raw.blocks[i]);
			if (block) project.blocks.push(block);
		}
	}
	return project;
}
