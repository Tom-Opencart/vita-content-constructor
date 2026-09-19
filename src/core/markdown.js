/* ============================================================
Вита — Конструктор контента · core/markdown.js
Мини-markdown для экспортного HTML: жирный, курсив, `код`,
ссылки, спойлеры-соглашения [text](agree:ID), списки в поле.
Безопасность: HTML во входе экранируется всегда, разметка
добавляется только сгенерированная. URL-схемы http/https/agree.
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
	if (/^#/.test(s)) return s;
	return '#';
}

/* Инлайн-разметка: escape -> code -> links -> bold -> italic */
function vccInline(text) {
	var s = vccEscapeHtml(text);
	/* `code` */
	s = s.replace(/`([^`]+)`/g, function (_, code) {
		return '<code class="vcc-code">' + code + '</code>';
	});
	/* [text](url) и [text](agree:ID) */
	s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (_, label, href) {
		var safe = vccSafeHref(href);
		if (/^agree:/i.test(safe)) {
			return '<a href="#" class="vcc-agree" data-agree="' + vccEscapeHtml(safe.slice(6)) + '">' + label + '</a>';
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
