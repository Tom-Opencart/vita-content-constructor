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
		{ type: 'spoiler', data_schema: { title: 'String (вопрос)', text: 'String (markdown, ответ)', opened: 'Boolean' } },
		{ type: 'tabs', data_schema: { tabs: 'Array of { title: String, content: String (markdown) }' } },
		{ type: 'table', data_schema: { headers: 'Array of String', rows: 'Array of Array of String' } },
		{ type: 'image', data_schema: { path: 'String (URL или путь вида image/catalog/...)', caption: 'String (опционально)' } },
		{ type: 'toc', data_schema: { title: 'String (опционально)' } },
		{ type: 'vita_faq', data_schema: { faqId: 'Integer ≥ 0 — ID группы FAQ (0 — все активные)', title: 'String (опционально, переопределяет заголовок)' }, export: '[vita_faq id title] литерально в <div class="vcc-shortcode">' },
		{ type: 'vita_form', data_schema: { formId: 'Integer ≥ 1 — ID формы модуля «Вита — Формы» (0 = блок не экспортируется)' }, export: '[vita_form id] литерально в <div class="vcc-shortcode">' }
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
