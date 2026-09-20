/* ============================================================
Вита — Конструктор контента · core/tokens.js
Контракт vcc-v1: токены --mp-* (палитра Виты) + маппинг
настроек пресета темы (theme_vita_color_*) на эти токены.
Значения по умолчанию — дефолтная палитра vita.css (:root / [data-theme=dark]).
============================================================ */
'use strict';

var VCC_CONTRACT = 'vcc-v1';
var VCC_APP_VERSION = '0.7.5';

/* Дефолтная светлая палитра Виты (vita.css :root) */
var VCC_DEFAULT_TOKENS = {
	'--mp-primary': '#8C9D93',
	'--mp-primary-hover': '#7A8B81',
	'--mp-primary-light': '#F2F6F4',
	'--mp-accent': '#8C9D93',
	'--mp-accent-hover': '#7A8B81',
	'--mp-secondary': '#5A8F76',

	'--mp-bg-body': '#f8fafc',
	'--mp-bg-surface': '#ffffff',
	'--mp-bg-hover': '#f1f5f9',
	'--mp-bg-subtle': '#f8fafc',
	'--mp-card-bg': '#ffffff',

	'--mp-text-main': '#2D3748',
	'--mp-text-body': '#2D3748',
	'--mp-text-muted': '#64748B',
	'--mp-text-light': '#94A3B8',
	'--mp-text-inverse': '#ffffff',

	'--mp-border-color': '#E2E8F0',
	'--mp-border-hover': '#CBD5E1',
	'--mp-border-divider': '#F1F5F9',

	'--mp-badge-discount-bg': '#dc2626',
	'--mp-badge-express-bg': '#059669',
	'--mp-badge-hit-bg': '#d97706',
	'--mp-star-color': '#f59e0b',

	'--mp-radius-sm': '2px',
	'--mp-radius-md': '4px',
	'--mp-radius-lg': '6px',
	'--mp-radius-pill': '9999px',

	'--mp-shadow-sm': '0 1px 3px rgba(0, 0, 0, 0.05)',
	'--mp-shadow-md': '0 4px 12px rgba(0, 0, 0, 0.08)',
	'--mp-shadow-lg': '0 10px 25px rgba(0, 0, 0, 0.1)',

	'--mp-font-family': 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
};

/* Тёмная тема Виты (vita.css [data-theme=dark]) — переопределяет только поверхности/текст */
var VCC_DARK_TOKENS = {
	'--mp-bg-body': '#221F24',
	'--mp-bg-surface': '#2C2930',
	'--mp-bg-hover': '#38343E',
	'--mp-bg-subtle': '#262329',
	'--mp-card-bg': '#2C2930',

	'--mp-text-main': '#FFFFFF',
	'--mp-text-body': '#E5E2E8',
	'--mp-text-muted': '#9E99A6',
	'--mp-text-light': '#7A7582',
	'--mp-text-inverse': '#221F24',

	'--mp-border-color': '#3D3844',
	'--mp-border-hover': '#504A59',
	'--mp-border-divider': '#262329'
};

/*
 * Маппинг настроек пресета темы (theme_vita_color_*) на токены vcc-v1.
 * Пресет может нести и незнакомые конструктору ключи — они игнорируются.
 */
var VCC_PRESET_MAP = {
	'theme_vita_color_primary': '--mp-primary',
	'theme_vita_color_link': '--mp-primary',
	'theme_vita_color_catalog_btn': '--mp-primary',
	'theme_vita_color_catalog_btn_hover': '--mp-primary-hover',
	'theme_vita_color_buy_btn_bg': '--mp-primary',
	'theme_vita_color_buy_btn_hover_bg': '--mp-primary-hover',
	'theme_vita_color_text_main': '--mp-text-main',
	'theme_vita_color_text_muted': '--mp-text-muted',
	'theme_vita_color_price_old': '--mp-text-light',
	'theme_vita_color_link_hover': '--mp-primary-hover',
	'theme_vita_border_radius': '--mp-radius-md'
};

/*
 * Каталог модулей магазина (пресет темы, поле catalog): реальные
 * FAQ-группы и формы — пикеры блоков-шорткодов вместо ручного ввода ID.
 * Старые пресеты поля не несут — каталог пуст, блоки дают ручной ввод.
 */
var VCC_CATALOG_DEFAULT = { faqGroups: [], forms: [], visualBlocks: [], productBlocks: [], walls: [] };

function vccNormalizeCatalog(raw) {
	var out = { faqGroups: [], forms: [], visualBlocks: [], productBlocks: [], walls: [] };
	if (!raw || typeof raw !== 'object') return out;
	function clean(list, nameKey) {
		var res = [];
		if (!Array.isArray(list)) return res;
		for (var i = 0; i < list.length; i++) {
			var it = list[i];
			if (!it || typeof it !== 'object') continue;
			var id = parseInt(it.id, 10);
			if (isNaN(id) || id < 1) continue;
			res.push({
				id: id,
				title: String(it.title != null ? it.title : (it.name != null ? it.name : '')),
				count: parseInt(it.count, 10) || 0,
				status: parseInt(it.status, 10) || 0
			});
		}
		return res;
	}
	out.faqGroups = clean(raw.faqGroups);
	out.forms = clean(raw.forms);
	/* Инстансы модулей-шорткодов (0.5.0): слайдеры/баннеры/LookBook,
	 * товарные блоки, стены. Старые пресеты поля не несут — списки пусты. */
	out.visualBlocks = clean(raw.visualBlocks);
	out.productBlocks = clean(raw.productBlocks);
	out.walls = clean(raw.walls);
	return out;
}

/*
 * Палитра доступных акцентов для блоков: имена токенов, а не hex.
 * Конструктор физически не предлагает цвет вне палитры магазина.
 */
var VCC_ACCENT_CHOICES = [
	{ value: 'primary', label: 'Акцент', token: '--mp-primary' },
	{ value: 'secondary', label: 'Вторичный', token: '--mp-secondary' },
	{ value: 'text', label: 'Текст', token: '--mp-text-main' },
	{ value: 'muted', label: 'Приглушённый', token: '--mp-text-muted' }
];

function vccResolveToken(name) {
	if (Object.prototype.hasOwnProperty.call(VCC_DEFAULT_TOKENS, name)) {
		return VCC_DEFAULT_TOKENS[name];
	}
	return null;
}

/* Применить пресет темы: мутирует копию дефолтных токенов */
function vccApplyPreset(tokensObj) {
	var out = {};
	var key;
	for (key in VCC_DEFAULT_TOKENS) {
		if (Object.prototype.hasOwnProperty.call(VCC_DEFAULT_TOKENS, key)) {
			out[key] = VCC_DEFAULT_TOKENS[key];
		}
	}
	if (!tokensObj || typeof tokensObj !== 'object') {
		return out;
	}
	for (key in tokensObj) {
		if (!Object.prototype.hasOwnProperty.call(tokensObj, key)) continue;
		var mapped = VCC_PRESET_MAP[key];
		if (!mapped) continue;
		var value = String(tokensObj[key]).trim();
		/* Радиус приходит числом в px: 0..8 */
		if (key === 'theme_vita_border_radius') {
			var n = parseInt(value, 10);
			if (isNaN(n)) continue;
			n = Math.max(0, Math.min(8, n));
			out['--mp-radius-sm'] = Math.max(0, n - 2) + 'px';
			out['--mp-radius-md'] = n + 'px';
			out['--mp-radius-lg'] = (n + 2) + 'px';
			continue;
		}
		if (!/^#[0-9a-fA-F]{3,8}$/.test(value) && !/^rgba?\(/.test(value)) continue;
		out[mapped] = value;
	}
	return out;
}

/* Собрать CSS-строку объявления токенов для контейнера превью */
function vccTokensToCss(tokens, scope) {
	var selector = scope || ':root';
	var lines = [selector + ' {'];
	for (var key in tokens) {
		if (Object.prototype.hasOwnProperty.call(tokens, key)) {
			lines.push('  ' + key + ': ' + tokens[key] + ';');
		}
	}
	lines.push('}');
	return lines.join('\n');
}
