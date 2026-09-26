/* ============================================================
Вита — Конструктор контента · core/markdown.js
Мини-markdown для экспортного HTML: жирный, курсив, `код`,
ссылки, спойлеры-соглашения [text](agree:ID), кнопки-формы
[text](form:ID) и акцент ==текст== (0.7.0), списки в поле.
Безопасность: HTML во входе экранируется всегда, разметка
добавляется только сгенерированная. URL-схемы http/https/agree/form.
============================================================ */
'use strict';

function vccEscapeHtml(text) {
	return String(text == null ? '' : text)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

function vccSafeHref(url) {
	var s = String(url || '').trim();
	if (/^(https?:)?\/\//i.test(s)) return s;
	if (/^\//.test(s)) return s;
	if (/^image\//i.test(s)) return s;
	if (/^agree:\d+$/i.test(s)) return s;
	if (/^form:\d+$/i.test(s)) return s; /* 0.7.0: кнопка вызова формы магазина */
	if (/^#/.test(s)) return s;
	return '#';
}

/* Инлайн-разметка: escape -> code -> accent -> links -> bold -> italic.
 * 0.7.0: ==акцент== и кнопка-форма [text](form:ID) (спецификация
 * docs/v0.5.0-landing-blocks.md §5.5; ветка form: зеркальна agree:). */
function vccInline(text) {
	var s = vccEscapeHtml(text);
	/* `code` */
	s = s.replace(/`([^`]+)`/g, function (_, code) {
		return '<code class="vcc-code">' + code + '</code>';
	});
	/* ==акцент== (до bold/italic) */
	s = s.replace(/==([^=\n]+)==/g, '<span class="vcc-accent">$1</span>');
	/* [text](url), [text](agree:ID) и [text](form:ID) */
	s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (_, label, href) {
		var safe = vccSafeHref(href);
		if (/^agree:/i.test(safe)) {
			return '<a href="#" class="vcc-agree" data-agree="' + vccEscapeHtml(safe.slice(6)) + '">' + label + '</a>';
		}
		if (/^form:\d+$/i.test(safe)) {
			return '<a href="' + vccEscapeHtml(safe) + '" class="vcc-btn vcc-btn--primary">' + label + '</a>';
		}
		return '<a href="' + vccEscapeHtml(safe) + '"' + (/^https?:/i.test(safe) ? ' target="_blank" rel="noopener"' : '') + '>' + label + '</a>';
	});
	/* **bold** */
	s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
	/* *italic* (не задевая уже обработанное bold — курсив идёт после) */
	s = s.replace(/\*([^*\n]+)\*/g, '<em>$1</em>');
	return s;
}

/*
 * Многострочный текст: абзацы, маркированные/нумерованные списки.
 * Строки, начинающиеся с "- " или "* ", склеиваются в <ul>,
 * "1. " и т.п. — в <ol>, пустая строка разделяет абзацы.
 */
function vccBlock(text) {
	var lines = String(text == null ? '' : text).split(/\r?\n/);
	var out = [];
	var para = [];
	var listItems = null;
	var listType = null;

	function flushPara() {
		if (para.length) {
			out.push('<p>' + vccInline(para.join(' ')) + '</p>');
			para = [];
		}
	}
	function flushList() {
		if (listItems && listItems.length) {
			var tag = listType === 'ol' ? 'ol' : 'ul';
			out.push('<' + tag + ' class="vcc-list">');
			for (var i = 0; i < listItems.length; i++) {
				out.push('<li>' + vccInline(listItems[i]) + '</li>');
			}
			out.push('</' + tag + '>');
		}
		listItems = null;
		listType = null;
	}

	for (var i = 0; i < lines.length; i++) {
		var line = lines[i];
		var trimmed = line.trim();
		var ulMatch = trimmed.match(/^[-*]\s+(.*)$/);
		var olMatch = trimmed.match(/^\d+[.)]\s+(.*)$/);
		if (ulMatch) {
			flushPara();
			if (listType !== 'ul') { flushList(); listType = 'ul'; listItems = []; }
			listItems.push(ulMatch[1]);
		} else if (olMatch) {
			flushPara();
			if (listType !== 'ol') { flushList(); listType = 'ol'; listItems = []; }
			listItems.push(olMatch[1]);
		} else if (trimmed === '') {
			flushPara();
			flushList();
		} else {
			flushList();
			para.push(trimmed);
		}
	}
	flushPara();
	flushList();
	return out.join('\n');
}

/* ============================================================
 * Универсальная кнопка (0.10.3): единая фабрика для ВСЕХ блоков.
 * Владелец: «в каждый блок — возможность добавить кнопку; потом эту кнопку
 * отдельно изменить: 1. выбор фона, 2. выбор размера, 3. выбор функции при
 * клике, итд». Действие при клике — существующие механизмы: ссылка
 * (http/якорь/внутренняя) или form:ID (модалка формы магазина — санитайзер
 * темы кладёт data-vcc-form, рантайм common.js открывает #vita-form-modal-N).
 * Класс-контракт прежний (vcc-btn), доп. состояние — на модификаторах и
 * data-vcc-*: скин-философия (JS темы не зависит от разметки блоков).
 * cfg: { label, url, bg: primary|accent|secondary|dark|ghost|link,
 *        size: md|sm|lg|full, icon: 'имя FA без fa-', icon_after: Boolean }
 * ============================================================ */
function vccButton(cfg) {
	cfg = cfg || {};
	var label = String(cfg.label || '').trim();
	if (!label) return ''; /* пустой текст = кнопки нет — прежний рендер не меняется */
	var rawUrl = String(cfg.url || '').trim();
	var href = /^form:\d+$/i.test(rawUrl) ? rawUrl : vccSafeHref(rawUrl);
	var bg = ['primary', 'accent', 'secondary', 'dark', 'ghost', 'link'].indexOf(cfg.bg) !== -1 ? cfg.bg : 'primary';
	/* Совместимость 0.10.5: 'primary' сохраняет старое значение (палитра) —
	 * собранные статьи не меняют вид. Референсная тёмная кнопка — 'dark'
	 * (дефолт НОВЫХ блоков переключён на dark в vccButtonDefaults). */
	var size = ['md', 'sm', 'lg', 'full'].indexOf(cfg.size) !== -1 && cfg.size !== 'md' ? ' vcc-btn--' + cfg.size : '';
	var iconBefore = '';
	var iconAfter = '';
	var ic = String(cfg.icon || '').trim().replace(/^fa-/, '');
	if (ic) {
		var iconTag = '<span class="vcc-icon vcc-icon--inline" data-vcc-icon="fa-' + vccEscapeHtml(ic) + '"></span>';
		if (cfg.icon_after) iconAfter = iconTag;
		else iconBefore = iconTag + ' ';
	}
	return '<a class="vcc-btn vcc-btn--' + bg + size + '" href="' + vccEscapeHtml(href) + '">' + iconBefore + vccInline(label) + iconAfter + '</a>';
}

/* ============================================================
 * SEO-тег заголовка (0.10.4): страница магазина УЖЕ несёт свой H1
 * (микроразметка темы), а конструкторский контент вставляется в модули
 * на главной/в карточке товара/в статьях — жёсткий <h1>/<h2> из блока
 * плодил десятки H1 и портил SEO. Правило: по умолчанию заголовок —
 * НЕЙТРАЛЬНЫЙ тег (div/p) с прежним классом-контрактом (стилизация
 * не меняется); настоящий H1..H6 — явный выбор в поле «SEO-тег».
 * tag: 'h1'..'h6' | 'div' | 'p' (всё остальное -> 'div').
 * ============================================================ */
function vccHeadingTag(tag) {
	tag = String(tag || '').toLowerCase().trim();
	return /^h[1-6]$/.test(tag) ? tag : 'div';
}

/* Рендер заголовка с выбором SEO-тега: <tag class>…</tag>.
 * cls — класс-контракт (не зависит от выбора тега). */
function vccHeadingHtml(tag, cls, innerHtml) {
	var t = vccHeadingTag(tag);
	return '<' + t + ' class="' + cls + '">' + innerHtml + '</' + t + '>';
}

/* Поля редактора универсальной кнопки (одинаковый набор у всех блоков).
 * opts: { prefix: 'btn', labelPrefix: 'Кнопка', urlPlaceholder } */
function vccButtonFields(opts) {
	opts = opts || {};
	var p = opts.prefix || 'btn';
	var L = opts.labelPrefix || 'Кнопка';
	return [
		{ key: p + '_label', label: L + ' — текст (пусто = без кнопки)', type: 'text' },
		{ key: p + '_url', label: L + ' — ссылка или действие (https://…, #якорь, form:ID)', type: 'text', placeholder: opts.urlPlaceholder || 'form:0' },
		{ key: p + '_bg', label: L + ' — фон', type: 'select', options: [['primary', 'Тёмная (референс)'], ['accent', 'Фирменная (палитра)'], ['secondary', 'Вторичная (палитра)'], ['ghost', 'Контурная'], ['dark', 'Тёмная нейтральная (#27272A)'], ['link', 'Текстовая ссылка']] },
		{ key: p + '_size', label: L + ' — размер', type: 'select', options: [['md', 'Обычная'], ['sm', 'Компактная'], ['lg', 'Крупная'], ['full', 'На всю ширину']] },
		{ key: p + '_icon', label: L + ' — иконка (FA-имя без fa-, опционально)', type: 'text', placeholder: 'arrow-right' },
		{ key: p + '_icon_after', label: L + ' — иконка после текста', type: 'checkbox' }
	];
}

/* Данные по умолчанию универсальной кнопки для defaults блока */
function vccButtonDefaults(opts) {
	opts = opts || {};
	var p = opts.prefix || 'btn';
	var d = {};
		d[p + '_label'] = '';
		d[p + '_url'] = '';
		d[p + '_bg'] = opts.bg || 'dark';
		d[p + '_size'] = 'md';
		d[p + '_icon'] = '';
		d[p + '_icon_after'] = false;
	return d;
}
