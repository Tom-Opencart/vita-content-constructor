(function () {

'use strict';

window.VCC_APP_VERSION = '0.1.0';

window.VCC_EXPORT_CSS = "/* ============================================================\n\u0412\u0438\u0442\u0430 \u2014 \u041a\u043e\u043d\u0441\u0442\u0440\u0443\u043a\u0442\u043e\u0440 \u043a\u043e\u043d\u0442\u0435\u043d\u0442\u0430 \u00b7 \u042d\u043a\u0441\u043f\u043e\u0440\u0442\u043d\u044b\u0435 \u0441\u0442\u0438\u043b\u0438 vcc-v1\n\u042d\u0442\u043e\u0442 \u0444\u0430\u0439\u043b \u2014 \u0415\u0414\u0418\u041d\u0421\u0422\u0412\u0415\u041d\u041d\u042b\u0419 \u0438\u0441\u0442\u043e\u0447\u043d\u0438\u043a \u0441\u0442\u0438\u043b\u0435\u0439 \u044d\u043a\u0441\u043f\u043e\u0440\u0442\u0430: \u0431\u0438\u043b\u0434\u0435\u0440 \u0432\u0448\u0438\u0432\u0430\u0435\u0442\n\u0435\u0433\u043e \u0432 \u0440\u0435\u0434\u0430\u043a\u0442\u043e\u0440 (\u043e\u043a\u043d\u043e \u043f\u0440\u0435\u0434\u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0430) \u0438 \u043e\u0442\u0434\u0430\u0451\u0442 \u043a\u043d\u043e\u043f\u043a\u043e\u0439 \u00ab\u0421\u043a\u0430\u0447\u0430\u0442\u044c CSS\u00bb.\n\u0422\u0435\u043c\u0430 \u0412\u0438\u0442\u0430 \u043f\u043e\u0441\u0442\u0430\u0432\u043b\u044f\u0435\u0442 \u044d\u0442\u043e\u0442 \u0436\u0435 \u0444\u0430\u0439\u043b \u043a\u0430\u043a\ncatalog/view/theme/vita/stylesheet/vita-content-constructor.css.\n\u041f\u0440\u0430\u0432\u0438\u043b\u0430: \u0442\u043e\u043b\u044c\u043a\u043e var(--mp-*, fallback) \u2014 \u043d\u0438 \u043e\u0434\u043d\u043e\u0433\u043e \u043b\u0438\u0442\u0435\u0440\u0430\u043b\u044c\u043d\u043e\u0433\u043e\n\u0446\u0432\u0435\u0442\u0430 \u0432 \u043f\u0440\u0430\u0432\u0438\u043b\u0430\u0445. \u041a\u043e\u043d\u0442\u0440\u0430\u043a\u0442 vcc-v1 \u044d\u0432\u043e\u043b\u044e\u0446\u0438\u043e\u043d\u0438\u0440\u0443\u0435\u0442 \u0430\u0434\u0434\u0438\u0442\u0438\u0432\u043d\u043e.\n============================================================ */\n\n.vcc-content {\n\tcolor: var(--mp-text-body, #2D3748);\n\tfont-family: var(--mp-font-family, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif);\n\tfont-size: 16px;\n\tline-height: 1.65;\n\toverflow-wrap: break-word;\n}\n.vcc-content > *:first-child { margin-top: 0; }\n.vcc-content > *:last-child { margin-bottom: 0; }\n\n/* --- \u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043a\u0438 --- */\n.vcc-heading {\n\tcolor: var(--mp-text-main, #2D3748);\n\tfont-weight: 700;\n\tline-height: 1.3;\n\tmargin: 28px 0 12px;\n}\n.vcc-heading--h2 { font-size: 26px; }\n.vcc-heading--h3 { font-size: 21px; }\n.vcc-heading--h4 { font-size: 18px; }\n\n/* --- \u0410\u0431\u0437\u0430\u0446\u044b --- */\n.vcc-paragraph { margin: 0 0 14px; }\n.vcc-paragraph p { margin: 0 0 14px; }\n\n/* --- \u0421\u0441\u044b\u043b\u043a\u0438 \u0438 \u0438\u043d\u043b\u0430\u0439\u043d --- */\n.vcc-content a { color: var(--mp-primary, #8C9D93); text-decoration: none; }\n.vcc-content a:hover { color: var(--mp-primary-hover, #7A8B81); text-decoration: underline; }\n.vcc-code {\n\tbackground: var(--mp-bg-subtle, #f8fafc);\n\tborder: 1px solid var(--mp-border-divider, #F1F5F9);\n\tborder-radius: var(--mp-radius-sm, 2px);\n\tcolor: var(--mp-text-main, #2D3748);\n\tfont-size: 0.9em;\n\tpadding: 1px 6px;\n}\n\n/* --- \u0421\u043f\u0438\u0441\u043a\u0438 --- */\n.vcc-list { margin: 0 0 14px; padding-left: 22px; }\n.vcc-list li { margin-bottom: 6px; }\n\n/* --- \u0426\u0438\u0442\u0430\u0442\u0430 --- */\n.vcc-quote {\n\tborder-left: 3px solid var(--mp-primary, #8C9D93);\n\tcolor: var(--mp-text-muted, #64748B);\n\tfont-style: italic;\n\tmargin: 18px 0;\n\tpadding: 10px 18px;\n}\n.vcc-quote__author {\n\tcolor: var(--mp-text-light, #94A3B8);\n\tfont-size: 14px;\n\tfont-style: normal;\n\tmargin-top: 8px;\n}\n\n/* --- \u0412\u0440\u0435\u0437\u043a\u0438 (alert) --- */\n.vcc-alert {\n\tborder: 1px solid var(--mp-border-color, #E2E8F0);\n\tborder-left-width: 3px;\n\tborder-radius: var(--mp-radius-md, 4px);\n\tmargin: 18px 0;\n\tpadding: 14px 18px;\n}\n.vcc-alert--info    { background: var(--mp-primary-light, #F2F6F4); border-left-color: var(--mp-primary, #8C9D93); }\n.vcc-alert--success { background: var(--mp-bg-subtle, #f8fafc); border-left-color: var(--mp-badge-express-bg, #059669); }\n.vcc-alert--warning { background: var(--mp-bg-subtle, #f8fafc); border-left-color: var(--mp-badge-hit-bg, #d97706); }\n.vcc-alert--danger  { background: var(--mp-bg-subtle, #f8fafc); border-left-color: var(--mp-badge-discount-bg, #dc2626); }\n/* \u0422\u0451\u043c\u043d\u0430\u044f \u0442\u0435\u043c\u0430 \u043c\u0430\u0433\u0430\u0437\u0438\u043d\u0430: primary-light \u043d\u0435 \u043f\u0435\u0440\u0435\u043e\u043f\u0440\u0435\u0434\u0435\u043b\u044f\u0435\u0442\u0441\u044f \u0442\u0435\u043c\u043e\u0439 \u2014 \u0432\u0440\u0435\u0437\u043a\u0435 info \u043d\u0443\u0436\u0435\u043d \u0442\u0451\u043c\u043d\u044b\u0439 \u0444\u043e\u043d (\u0430\u0434\u0434\u0438\u0442\u0438\u0432\u043d\u043e\u0435 \u043f\u0440\u0430\u0432\u0438\u043b\u043e) */\n[data-theme=\"dark\"] .vcc-alert--info { background: var(--mp-bg-hover, #38343E); }\n.vcc-alert p:last-child { margin-bottom: 0; }\n\n/* --- \u0421\u043f\u043e\u0439\u043b\u0435\u0440 --- */\n.vcc-spoiler {\n\tborder: 1px solid var(--mp-border-color, #E2E8F0);\n\tborder-radius: var(--mp-radius-md, 4px);\n\tmargin: 14px 0;\n}\n.vcc-spoiler__summary {\n\tcursor: pointer;\n\tfont-weight: 600;\n\tpadding: 12px 16px;\n\tcolor: var(--mp-text-main, #2D3748);\n}\n.vcc-spoiler__summary:hover { color: var(--mp-primary, #8C9D93); }\n.vcc-spoiler__body {\n\tborder-top: 1px solid var(--mp-border-divider, #F1F5F9);\n\tpadding: 12px 16px;\n}\n.vcc-spoiler__body p:last-child { margin-bottom: 0; }\n\n/* --- \u0422\u0430\u0431\u044b --- */\n.vcc-tabs { margin: 18px 0; }\n.vcc-tabs__nav {\n\tborder-bottom: 1px solid var(--mp-border-color, #E2E8F0);\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\tgap: 4px;\n}\n.vcc-tabs__btn {\n\tbackground: none;\n\tborder: none;\n\tborder-bottom: 2px solid transparent;\n\tcolor: var(--mp-text-muted, #64748B);\n\tcursor: pointer;\n\tfont-size: 15px;\n\tmargin-bottom: -1px;\n\tpadding: 10px 14px;\n}\n.vcc-tabs__btn.is-active {\n\tborder-bottom-color: var(--mp-primary, #8C9D93);\n\tcolor: var(--mp-primary, #8C9D93);\n\tfont-weight: 600;\n}\n.vcc-tabs__panel { display: none; padding-top: 14px; }\n.vcc-tabs__panel.is-active { display: block; }\n\n/* --- \u0422\u0430\u0431\u043b\u0438\u0446\u0430 --- */\n.vcc-table-wrap { margin: 18px 0; overflow-x: auto; }\n.vcc-table {\n\tborder-collapse: collapse;\n\twidth: 100%;\n}\n.vcc-table th,\n.vcc-table td {\n\tborder: 1px solid var(--mp-border-color, #E2E8F0);\n\tpadding: 9px 12px;\n\ttext-align: left;\n}\n.vcc-table th {\n\tbackground: var(--mp-bg-subtle, #f8fafc);\n\tcolor: var(--mp-text-main, #2D3748);\n\tfont-weight: 600;\n}\n.vcc-table tr:nth-child(even) td { background: var(--mp-bg-subtle, #f8fafc); }\n\n/* --- \u041a\u0430\u0440\u0442\u0438\u043d\u043a\u0430 --- */\n.vcc-figure { margin: 18px 0; }\n.vcc-figure__img {\n\tborder-radius: var(--mp-radius-md, 4px);\n\theight: auto;\n\tmax-width: 100%;\n}\n.vcc-figure__caption {\n\tcolor: var(--mp-text-light, #94A3B8);\n\tfont-size: 13px;\n\tmargin-top: 6px;\n\ttext-align: center;\n}\n\n/* --- \u041e\u0433\u043b\u0430\u0432\u043b\u0435\u043d\u0438\u0435 --- */\n.vcc-toc {\n\tbackground: var(--mp-bg-subtle, #f8fafc);\n\tborder: 1px solid var(--mp-border-divider, #F1F5F9);\n\tborder-radius: var(--mp-radius-lg, 6px);\n\tmargin: 18px 0;\n\tpadding: 14px 20px;\n}\n.vcc-toc__title {\n\tcolor: var(--mp-text-main, #2D3748);\n\tfont-weight: 600;\n\tmargin-bottom: 8px;\n}\n.vcc-toc__list { margin: 0; padding-left: 20px; }\n.vcc-toc__list li { margin-bottom: 4px; }";

window.VCC_LAYOUT_PRESETS = [{"type": "vita-constructor-project", "contract": "vcc-v1", "layoutTitle": "Статья-гид", "layoutDesc": "Гид покупателя: оглавление, нумерованный список, цитата, табы сравнения материалов и финальная врезка со ссылкой-соглашением.", "layoutIcon": "fa-file-text-o", "title": "Статья: как выбрать товар", "slug": "guide", "themeMode": "light", "theme": {"preset": null, "tokens": null}, "blocks": [{"id": "a1", "type": "heading", "data": {"level": "2", "text": "Как выбрать первый товар для дома: гид покупателя"}}, {"id": "a2", "type": "paragraph", "data": {"text": "Разбираемся, на что смотреть при выборе, чем отличаются материалы и почему цена не всегда показатель качества. Гид подойдёт и новичкам, и тем, кто уже сталкивался с неудачной покупкой."}}, {"id": "a3", "type": "toc", "data": {"title": "В этом гиде"}}, {"id": "a4", "type": "heading", "data": {"level": "3", "text": "Три признака качественного товара"}}, {"id": "a5", "type": "list", "data": {"ordered": true, "items": "Материал: смотрите плотность и состав на ярлыке\nФурнитура: швы, молнии и крепления без люфта\nДокументы: гарантийный талон и сертификат в комплекте"}}, {"id": "a6", "type": "quote", "data": {"text": "Дешёвый товар часто оказывается дорогим: его приходится менять каждый сезон.", "author": "Команда магазина «Вита»"}}, {"id": "a7", "type": "heading", "data": {"level": "3", "text": "Материалы: сравнение"}}, {"id": "a8", "type": "tabs", "data": {"tabs": [{"title": "Хлопок", "content": "Дышащий и гипоаллергенный. Минус — мнётся, требует глажки.\n\n- плотность от 200 г/м²\n- сатин прочнее бязи"}, {"title": "Лён", "content": "Прочный, становится мягче после стирок. Дороже хлопка, служит годами."}, {"title": "Микрофибра", "content": "Недорого и практично, не мнётся. Хуже пропускает воздух — не для жарких спален."}]}}, {"id": "a9", "type": "alert", "data": {"style": "success", "text": "Готовы к покупке? Откройте **каталог** и фильтруйте товары по материалу — [к правилам возврата](agree:3)."}}]}, {"type": "vita-constructor-project", "contract": "vcc-v1", "layoutTitle": "Страница FAQ", "layoutDesc": "Готовая страница вопросов и ответов: вступление, четыре спойлера (первый раскрыт) и контактная врезка. Ставится на отдельную страницу или в модуль на главной.", "layoutIcon": "fa-question-circle-o", "title": "Частые вопросы", "slug": "faq", "themeMode": "light", "theme": {"preset": null, "tokens": null}, "blocks": [{"id": "f1", "type": "heading", "data": {"level": "2", "text": "Частые вопросы и ответы"}}, {"id": "f2", "type": "paragraph", "data": {"text": "Собрали ответы на то, что спрашивают чаще всего. Не нашли свой вопрос — напишите нам, контакты в конце страницы."}}, {"id": "f3", "type": "spoiler", "data": {"title": "Сколько идёт доставка?", "text": "По городу — 1-2 дня, по России — 2-7 дней службами СДЭК и Почтой России. Трек-номер приходит в SMS.", "opened": true}}, {"id": "f4", "type": "spoiler", "data": {"title": "Можно ли вернуть товар?", "text": "Да, в течение 14 дней без объяснения причин, если сохранён вид и упаковка. Подробно: [политика возврата](agree:3)."}}, {"id": "f5", "type": "spoiler", "data": {"title": "Есть ли гарантия?", "text": "На всю технику — 12 месяцев, на остальной товар — по производителю. Гарантийный отдел работает пн-пт с 10 до 18."}}, {"id": "f6", "type": "spoiler", "data": {"title": "Как оплатить?", "text": "Картой онлайн, при получении или по счёту для юридических лиц. Чек приходит на e-mail автоматически."}}, {"id": "f7", "type": "alert", "data": {"style": "info", "text": "Не нашли ответ? Позвоните: **+7 (900) 000-00-00** — или напишите на sale@example.com."}}]}, {"type": "vita-constructor-project", "contract": "vcc-v1", "layoutTitle": "Обзор товара", "layoutDesc": "Структура обзора: вступление, оглавление, секции с подзаголовками, таблица характеристик, совет-врезка и блок частых вопросов со ссылками-соглашениями.", "layoutIcon": "fa-star-o", "title": "Обзор товара", "slug": "product-review", "themeMode": "light", "theme": {"preset": null, "tokens": null}, "blocks": [{"id": "p1", "type": "heading", "data": {"level": "2", "text": "Обзор: умные часы **Vita Watch 2**"}}, {"id": "p2", "type": "paragraph", "data": {"text": "Vita Watch 2 — обновлённая модель с автономностью до 14 дней и корпусом из медицинской стали. В этом обзоре разбираем экран, датчики и время работы, сравниваем с прошлым поколением и отвечаем на частые вопросы.\n\nПроект создан в **конструкторе Виты** и собран из готового макета — отредактируйте его под свой товар."}}, {"id": "p3", "type": "toc", "data": {"title": "Содержание"}}, {"id": "p4", "type": "heading", "data": {"level": "3", "text": "Экран и корпус"}}, {"id": "p5", "type": "paragraph", "data": {"text": "AMOLED-экран 1,43\" с яркостью до 1000 нит читается на солнце. Корпус защищён по стандарту *5 ATM* — плавать в часах можно, душ и бассейн им не страшны."}}, {"id": "p6", "type": "image", "data": {"path": "image/catalog/watch-angle.jpg", "caption": "Vita Watch 2, вид сбоку — толщина 10,9 мм"}}, {"id": "p7", "type": "heading", "data": {"level": "3", "text": "Характеристики"}}, {"id": "p8", "type": "table", "data": {"headers": "Параметр\nЗначение", "rows": "Экран\nAMOLED 1,43\", 466×466\nАвтономность\nдо 14 дней\nЗащита\n5 ATM\nВес\n38 г"}}, {"id": "p9", "type": "alert", "data": {"style": "info", "text": "Совет: для уведомлений на русском включите шрифт таблиц в настройках приложения часов."}}, {"id": "p10", "type": "heading", "data": {"level": "3", "text": "Частые вопросы"}}, {"id": "p11", "type": "spoiler", "data": {"title": "Совместим ли с iPhone?", "text": "Да, приложение доступно для iOS 14+ и Android 8+. Звонки через часы работают на обеих платформах.", "opened": true}}, {"id": "p12", "type": "spoiler", "data": {"title": "Какая гарантия?", "text": "Официальная гарантия производителя — 12 месяцев. Подробности: [условия доставки и гарантии](agree:5)."}}]}];

/* ============================================================
Вита — Конструктор контента · core/tokens.js
Контракт vcc-v1: токены --mp-* (палитра Виты) + маппинг
настроек пресета темы (theme_vita_color_*) на эти токены.
Значения по умолчанию — дефолтная палитра vita.css (:root / [data-theme=dark]).
============================================================ */
'use strict';

var VCC_CONTRACT = 'vcc-v1';
var VCC_APP_VERSION = '0.1.0';

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
		{ type: 'toc', data_schema: { title: 'String (опционально)' } }
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

/* ============================================================
Вита — Конструктор контента · core/registry.js
Реестр типов блоков. Контракт блока:
  label  — человекочитаемое имя в палитре;
  icon   — иконка FontAwesome для кнопки добавления;
  group  — группа в палитре (text | media | layout);
  fields — декларация полей формы редактора;
  toHTML — рендер блока в экспортный HTML (markdown уже преобразован
           вызывающей стороной там, где это заявлено в fields).
============================================================ */
'use strict';

var BlockRegistry = {
	_blocks: {},
	register: function (blockDef) {
		if (!blockDef || !blockDef.type || typeof blockDef.toHTML !== 'function') {
			console.error('Invalid block definition', blockDef);
			return;
		}
		this._blocks[blockDef.type] = blockDef;
	},
	get: function (type) {
		return this._blocks[type] || null;
	},
	getAll: function () {
		return this._blocks;
	},
	getList: function () {
		var list = [];
		for (var type in this._blocks) {
			if (Object.prototype.hasOwnProperty.call(this._blocks, type)) list.push(this._blocks[type]);
		}
		return list;
	},
	createBlock: function (type) {
		var def = this.get(type);
		if (!def) return null;
		return {
			id: 'b' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
			type: type,
			data: def.defaults ? JSON.parse(JSON.stringify(def.defaults)) : {}
		};
	}
};

/* ============================================================
Вита — Конструктор контента · core/store.js
Состояние приложения: проект (title/slug/blocks), палитра
(пресет темы или дефолт), режим light/dark. Автосейв в
localStorage, подписки, undo в пределах сессии.
============================================================ */
'use strict';

var VccStore = (function () {
	var LS_KEY = 'vcc_project_v1';
	var state = {
		project: { title: '', slug: '', themeMode: 'light', theme: { preset: null, tokens: null }, blocks: [] },
		palette: VCC_DEFAULT_TOKENS,
		paletteName: '',
		undoStack: []
	};
	var listeners = [];

	function currentProject() {
		return state.project;
	}

	function emit() {
		for (var i = 0; i < listeners.length; i++) listeners[i](state);
	}

	function subscribe(fn) {
		listeners.push(fn);
	}

	function snapshot() {
		return JSON.stringify(state.project);
	}

	function mutate(fn) {
		state.undoStack.push(snapshot());
		if (state.undoStack.length > 50) state.undoStack.shift();
		fn(state.project);
		save();
		emit();
	}

	function save() {
		try {
			localStorage.setItem(LS_KEY, JSON.stringify(state.project));
		} catch (e) { /* приватный режим — молча */ }
	}

	function load() {
		try {
			var raw = localStorage.getItem(LS_KEY);
			if (!raw) return;
			var normalized = vccNormalizeProject(JSON.parse(raw));
			if (normalized) state.project = normalized;
		} catch (e) { /* битый кэш — начинаем с пустого */ }
	}

	function setProject(project) {
		state.undoStack.push(snapshot());
		state.project = vccNormalizeProject(project) || state.project;
		save();
		emit();
	}

	/* Чекпойнт undo без ре-рендера: ставится при входе в редактирование блока,
	   чтобы undo вернул состояние ДО начала правки полей. */
	function checkpoint() {
		state.undoStack.push(snapshot());
		if (state.undoStack.length > 50) state.undoStack.shift();
	}

	function addBlock(type, index) {
		var block = BlockRegistry.createBlock(type);
		if (!block) return null;
		mutate(function (p) {
			if (typeof index === 'number' && index >= 0 && index <= p.blocks.length) {
				p.blocks.splice(index, 0, block);
			} else {
				p.blocks.push(block);
			}
		});
		return block;
	}

	/* Тихий патч полей блока: сохраняет и уведомляет подписчиков, но НЕ
	   перестраивает DOM редактора (иначе терялся бы фокус при вводе). */
	function updateBlockSilent(id, patch) {
		var p = state.project;
		for (var i = 0; i < p.blocks.length; i++) {
			if (p.blocks[i].id === id) {
				for (var key in patch) {
					if (Object.prototype.hasOwnProperty.call(patch, key)) p.blocks[i].data[key] = patch[key];
				}
			}
		}
		save();
		emit();
	}

	function updateBlock(id, patch) {
		mutate(function (p) {
			for (var i = 0; i < p.blocks.length; i++) {
				if (p.blocks[i].id === id) {
					for (var key in patch) {
						if (Object.prototype.hasOwnProperty.call(patch, key)) p.blocks[i].data[key] = patch[key];
					}
				}
			}
		});
	}

	function removeBlock(id) {
		mutate(function (p) {
			p.blocks = p.blocks.filter(function (b) { return b.id !== id; });
		});
	}

	function moveBlock(id, dir) {
		mutate(function (p) {
			var idx = -1;
			for (var i = 0; i < p.blocks.length; i++) {
				if (p.blocks[i].id === id) { idx = i; break; }
			}
			if (idx === -1) return;
			var to = idx + dir;
			if (to < 0 || to >= p.blocks.length) return;
			var tmp = p.blocks[idx];
			p.blocks[idx] = p.blocks[to];
			p.blocks[to] = tmp;
		});
	}

	function setMeta(patch) {
		mutate(function (p) {
			if (typeof patch.title === 'string') p.title = patch.title;
			if (typeof patch.slug === 'string') p.slug = patch.slug.replace(/[^a-z0-9-]/gi, '-').toLowerCase();
		});
	}

	function setPalette(tokens, name) {
		state.palette = tokens;
		state.paletteName = name || '';
		emit();
	}

	function setMode(mode) {
		mutate(function (p) { p.themeMode = mode === 'dark' ? 'dark' : 'light'; });
	}

	function undo() {
		if (!state.undoStack.length) return;
		var prev = state.undoStack.pop();
		try {
			state.project = vccNormalizeProject(JSON.parse(prev)) || state.project;
			save();
			emit();
		} catch (e) { /* ignore */ }
	}

	return {
		subscribe: subscribe,
		load: load,
		save: save,
		currentProject: currentProject,
		setProject: setProject,
		checkpoint: checkpoint,
		addBlock: addBlock,
		updateBlock: updateBlock,
		updateBlockSilent: updateBlockSilent,
		removeBlock: removeBlock,
		moveBlock: moveBlock,
		setMeta: setMeta,
		setPalette: setPalette,
		setMode: setMode,
		undo: undo,
		getPalette: function () { return state.palette; },
		getPaletteName: function () { return state.paletteName; },
		canUndo: function () { return state.undoStack.length > 0; }
	};
})();

/* ============================================================
Вита — Конструктор контента · blocks/index.js
Все типы блоков vcc-v1: декларации полей + рендер в экспортный HTML.
Именование классов: vcc-* (неймспейс контракта), вся стилизация —
на токенах --mp-* с фолбэками.
============================================================ */
'use strict';

(function () {
	/* --- Заголовок --- */
	BlockRegistry.register({
		type: 'heading',
		label: 'Заголовок',
		icon: 'fa-header',
		group: 'text',
		defaults: { level: 2, text: 'Новый заголовок' },
		fields: [
			{ key: 'level', label: 'Уровень', type: 'select', options: [['2', 'H2'], ['3', 'H3'], ['4', 'H4']] },
			{ key: 'text', label: 'Текст', type: 'textarea', rows: 2, markdown: true }
		],
		toHTML: function (data) {
			var level = [2, 3, 4].indexOf(parseInt(data.level, 10)) !== -1 ? parseInt(data.level, 10) : 2;
			return '<h' + level + ' class="vcc-heading vcc-heading--h' + level + '">' + vccInline(data.text || '') + '</h' + level + '>';
		}
	});

	/* --- Абзац --- */
	BlockRegistry.register({
		type: 'paragraph',
		label: 'Текст',
		icon: 'fa-align-left',
		group: 'text',
		defaults: { text: 'Текст абзаца. Поддерживается **жирный**, *курсив*, `код`, [ссылки](https://example.com) и [соглашения](agree:3).' },
		fields: [
			{ key: 'text', label: 'Текст', type: 'textarea', rows: 5, markdown: true }
		],
		toHTML: function (data) {
			return '<div class="vcc-paragraph">' + vccBlock(data.text || '') + '</div>';
		}
	});

	/* --- Список --- */
	BlockRegistry.register({
		type: 'list',
		label: 'Список',
		icon: 'fa-list-ul',
		group: 'text',
		defaults: { ordered: false, items: 'Первый пункт\nВторой пункт\nТретий пункт' },
		fields: [
			{ key: 'ordered', label: 'Нумерованный', type: 'checkbox' },
			{ key: 'items', label: 'Пункты (каждый с новой строки)', type: 'textarea', rows: 5, markdown: true }
		],
		toHTML: function (data) {
			var tag = data.ordered ? 'ol' : 'ul';
			var lines = String(data.items || '').split(/\r?\n/).filter(function (l) { return l.trim() !== ''; });
			if (!lines.length) return '';
			var html = '<' + tag + ' class="vcc-list">';
			for (var i = 0; i < lines.length; i++) {
				html += '<li>' + vccInline(lines[i]) + '</li>';
			}
			return html + '</' + tag + '>';
		}
	});

	/* --- Цитата --- */
	BlockRegistry.register({
		type: 'quote',
		label: 'Цитата',
		icon: 'fa-quote-left',
		group: 'text',
		defaults: { text: 'Текст цитаты', author: '' },
		fields: [
			{ key: 'text', label: 'Текст', type: 'textarea', rows: 3, markdown: true },
			{ key: 'author', label: 'Автор (опционально)', type: 'text', markdown: false }
		],
		toHTML: function (data) {
			var html = '<blockquote class="vcc-quote">' + vccBlock(data.text || '');
			if (data.author && String(data.author).trim() !== '') {
				html += '<footer class="vcc-quote__author">— ' + vccInline(data.author) + '</footer>';
			}
			return html + '</blockquote>';
		}
	});

	/* --- Врезка (alert) --- */
	BlockRegistry.register({
		type: 'alert',
		label: 'Врезка',
		icon: 'fa-exclamation-circle',
		group: 'text',
		defaults: { style: 'info', text: 'Важная информация для покупателя.' },
		fields: [
			{
				key: 'style', label: 'Стиль', type: 'select',
				options: [['info', 'Информация'], ['success', 'Успех'], ['warning', 'Внимание'], ['danger', 'Важно']]
			},
			{ key: 'text', label: 'Текст', type: 'textarea', rows: 3, markdown: true }
		],
		toHTML: function (data) {
			var style = ['info', 'success', 'warning', 'danger'].indexOf(data.style) !== -1 ? data.style : 'info';
			return '<div class="vcc-alert vcc-alert--' + style + '">' + vccBlock(data.text || '') + '</div>';
		}
	});

	/* --- Спойлер (FAQ) --- */
	BlockRegistry.register({
		type: 'spoiler',
		label: 'Спойлер',
		icon: 'fa-chevron-down',
		group: 'text',
		defaults: { title: 'Вопрос', text: 'Ответ.', opened: false },
		fields: [
			{ key: 'title', label: 'Заголовок (вопрос)', type: 'text' },
			{ key: 'text', label: 'Текст (ответ)', type: 'textarea', rows: 4, markdown: true },
			{ key: 'opened', label: 'Раскрыт по умолчанию', type: 'checkbox' }
		],
		toHTML: function (data) {
			var open = data.opened ? ' open' : '';
			var inner = vccBlock(data.text || '');
			return '<details class="vcc-spoiler"' + open + '>' +
				'<summary class="vcc-spoiler__summary">' + vccInline(data.title || '') + '</summary>' +
				'<div class="vcc-spoiler__body">' + inner + '</div>' +
				'</details>';
		}
	});

	/* --- Табы --- */
	BlockRegistry.register({
		type: 'tabs',
		label: 'Табы',
		icon: 'fa-folder-o',
		group: 'text',
		defaults: { tabs: [{ title: 'Вкладка 1', content: 'Содержимое первой вкладки.' }, { title: 'Вкладка 2', content: 'Содержимое второй вкладки.' }] },
		fields: [
			{ key: 'tabs', label: 'Вкладки', type: 'tabs-editor' }
		],
		toHTML: function (data) {
			var list = Array.isArray(data.tabs) ? data.tabs : [];
			if (!list.length) return '';
			var html = '<div class="vcc-tabs" data-vcc-tabs>';
			html += '<div class="vcc-tabs__nav">';
			for (var i = 0; i < list.length; i++) {
				html += '<button type="button" class="vcc-tabs__btn' + (i === 0 ? ' is-active' : '') + '" data-vcc-tab="' + i + '">' + vccInline(list[i].title || '') + '</button>';
			}
			html += '</div><div class="vcc-tabs__panels">';
			for (var j = 0; j < list.length; j++) {
				html += '<div class="vcc-tabs__panel' + (j === 0 ? ' is-active' : '') + '" data-vcc-panel="' + j + '">' + vccBlock(list[j].content || '') + '</div>';
			}
			return html + '</div></div>';
		}
	});

	/* --- Таблица --- */
	BlockRegistry.register({
		type: 'table',
		label: 'Таблица',
		icon: 'fa-table',
		group: 'text',
		defaults: { headers: 'Параметр\nЗначение', rows: 'Гарантия\n12 месяцев' },
		fields: [
			{ key: 'headers', label: 'Заголовки (каждый с новой строки)', type: 'textarea', rows: 3 },
			{ key: 'rows', label: 'Строки (столбцы через « | », строки с новой строки)', type: 'textarea', rows: 5, markdown: false }
		],
		toHTML: function (data) {
			var headers = String(data.headers || '').split(/\r?\n/).filter(function (h) { return h.trim() !== ''; });
			var rowLines = String(data.rows || '').split(/\r?\n/).filter(function (r) { return r.trim() !== ''; });
			if (!headers.length && !rowLines.length) return '';
			var html = '<div class="vcc-table-wrap"><table class="vcc-table">';
			if (headers.length) {
				html += '<thead><tr>';
				for (var i = 0; i < headers.length; i++) html += '<th>' + vccInline(headers[i]) + '</th>';
				html += '</tr></thead>';
			}
			html += '<tbody>';
			for (var r = 0; r < rowLines.length; r++) {
				var cells = rowLines[r].split('|');
				html += '<tr>';
				for (var c = 0; c < cells.length; c++) html += '<td>' + vccInline(cells[c].trim()) + '</td>';
				html += '</tr>';
			}
			return html + '</tbody></table></div>';
		}
	});

	/* --- Изображение --- */
	BlockRegistry.register({
		type: 'image',
		label: 'Картинка',
		icon: 'fa-picture-o',
		group: 'media',
		defaults: { path: '', caption: '' },
		fields: [
			{ key: 'path', label: 'Путь или URL (image/catalog/... или https://)', type: 'text' },
			{ key: 'caption', label: 'Подпись (опционально)', type: 'text' }
		],
		toHTML: function (data) {
			var src = vccSafeHref(data.path || '');
			if (src === '#') return '';
			var html = '<figure class="vcc-figure"><img class="vcc-figure__img" src="' + vccEscapeHtml(src) + '" alt="' + vccEscapeHtml(data.caption || '') + '" loading="lazy" />';
			if (data.caption && String(data.caption).trim() !== '') {
				html += '<figcaption class="vcc-figure__caption">' + vccInline(data.caption) + '</figcaption>';
			}
			return html + '</figure>';
		}
	});

	/* --- Оглавление --- */
	BlockRegistry.register({
		type: 'toc',
		label: 'Оглавление',
		icon: 'fa-list-ol',
		group: 'text',
		defaults: { title: 'Содержание' },
		fields: [
			{ key: 'title', label: 'Заголовок (опционально)', type: 'text' }
		],
		/* Список ссылок заполняется на магазине после рендера статьи (см. README: шаг после импорта не нужен — якоря создаёт сама тема). */
		toHTML: function (data) {
			var html = '<nav class="vcc-toc" data-vcc-toc>';
			if (data.title && String(data.title).trim() !== '') {
				html += '<div class="vcc-toc__title">' + vccInline(data.title) + '</div>';
			}
			return html + '<ol class="vcc-toc__list"></ol></nav>';
		}
	});
})();

/* ============================================================
Вита — Конструктор контента · export/export.js
Экспорт vcc-v1:
  - HTML статьи: маркер контракта в комментарии + разметка vcc-*;
  - CSS: только var(--mp-*, fallback) — ни одного hex в правилах;
  - JSON проекта (бэкап) с полем contract;
  - full-HTML для импорта в Summernote (внешний CSS подключает тема).
Импорт: JSON проекта, пресет темы (vita-theme-preset).
============================================================ */
'use strict';

var VccExport = (function () {

	function buildHtml(project) {
		var parts = ['<!-- Вита — Конструктор контента | контракт: ' + VCC_CONTRACT + ' -->'];
		var blocks = project.blocks || [];
		for (var i = 0; i < blocks.length; i++) {
			var def = BlockRegistry.get(blocks[i].type);
			if (!def) continue;
			var html = def.toHTML(blocks[i].data || {});
			if (html) parts.push(html);
		}
		return parts.join('\n');
	}

	/* Единый источник стилей экспорта — editor.js и эта функция читают один файл css/export.css */
	function buildCss() {
		return window.VCC_EXPORT_CSS || '';
	}

	function buildJson(project) {
		return {
			type: 'vita-constructor-project',
			contract: VCC_CONTRACT,
			appVersion: VCC_APP_VERSION,
			title: project.title || '',
			slug: project.slug || '',
			themeMode: project.themeMode || 'light',
			theme: project.theme || { preset: null, tokens: null },
			blocks: project.blocks || []
		};
	}

	/* HTML с подключением внешнего стиля темы (vcc-v1 поставляется с Витой) */
	function buildFullHtml(project) {
		var inner = buildHtml(project);
		var title = project.title || 'Контент';
		return '<!-- Вита — Конструктор контента. Стили: контракт ' + VCC_CONTRACT + ' подключается темой Вита автоматически. -->\n' + inner;
	}

	function download(filename, content, mime) {
		var blob = new Blob([content], { type: mime || 'text/plain;charset=utf-8' });
		var url = URL.createObjectURL(blob);
		var a = document.createElement('a');
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
	}

	function slugify(text) {
		var map = { а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ё:'e',ж:'zh',з:'z',и:'i',й:'y',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',х:'h',ц:'c',ч:'ch',ш:'sh',щ:'sch',ъ:'',ы:'y',ь:'',э:'e',ю:'yu',я:'ya' };
		var s = String(text || '').toLowerCase().split('').map(function (ch) {
			return Object.prototype.hasOwnProperty.call(map, ch) ? map[ch] : ch;
		}).join('');
		var slug = s.replace(/[^a-z0-9-]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
		return slug || 'content';
	}

	return {
		buildHtml: buildHtml,
		buildCss: buildCss,
		buildJson: buildJson,
		buildFullHtml: buildFullHtml,
		download: download,
		slugify: slugify,
		downloadHtml: function (project) {
			var slug = project.slug || slugify(project.title);
			download('content-' + slug + '.html', buildFullHtml(project), 'text/html;charset=utf-8');
		},
		downloadJson: function (project) {
			var slug = project.slug || slugify(project.title);
			download('project-' + slug + '.json', JSON.stringify(buildJson(project), null, 2), 'application/json');
		},
		downloadCss: function () {
			download('vita-content-constructor.css', buildCss(), 'text/css;charset=utf-8');
		}
	};
})();

/* ============================================================
Импорт файлов: JSON проекта и пресет темы.
Безопасность: принимается ТОЛЬКО JSON; текстовые поля проекта
нормализуются схемой; HTML в файле не исполняется.
============================================================ */
'use strict';

var VccImport = (function () {

	function readFile(file, cb) {
		var reader = new FileReader();
		reader.onload = function (e) { cb(e.target.result); };
		reader.readAsText(file);
	}

	function importProject(text) {
		var data = JSON.parse(text);
		if (!data || data.type !== 'vita-constructor-project') {
			throw new Error('Это не файл проекта конструктора Вита.');
		}
		if (data.contract !== VCC_CONTRACT) {
			throw new Error('Неизвестный контракт: ' + data.contract + '. Обновите конструктор.');
		}
		VccStore.setProject(data);
		return data;
	}

	/* Пресет темы: type=vita-theme-preset, tokens = { theme_vita_color_*: value }.
	 * Совместимость: ранние экспорты темы несли schema=vita-theme-preset-v1 без type
	 * и title вместо name — принимаем оба формата. */
	function isThemePreset(data) {
		if (!data || typeof data !== 'object' || !data.tokens || typeof data.tokens !== 'object') return false;
		if (data.type === 'vita-theme-preset') return true;
		return data.type === undefined && data.schema === 'vita-theme-preset-v1';
	}

	function importThemePreset(text) {
		var data = JSON.parse(text);
		if (!isThemePreset(data)) {
			throw new Error('Это не файл пресета темы Вита (экспорт из «Дизайна и стилей»).');
		}
		var tokens = vccApplyPreset(data.tokens);
		VccStore.setPalette(tokens, data.name || data.title || 'Пресет магазина');
		return tokens;
	}

	function handleFiles(files, showToast) {
		if (!files || !files.length) return;
		for (var i = 0; i < files.length; i++) {
			(function (file) {
				if (!/\.json$/i.test(file.name)) {
					showToast('Пока поддерживаются только .json (проект и пресет темы).', 'warning');
					return;
				}
				readFile(file, function (text) {
					try {
						var parsed = JSON.parse(text);
						if (isThemePreset(parsed)) {
							importThemePreset(text);
							showToast('Палитра магазина применена: ' + (parsed.name || parsed.title || 'пресет'), 'success');
						} else if (parsed && parsed.type === 'vita-constructor-project') {
							importProject(text);
							showToast('Проект загружен: ' + (parsed.title || 'без названия'), 'success');
						} else {
							showToast('Неизвестный формат файла.', 'warning');
						}
					} catch (err) {
						showToast(err.message || 'Не удалось прочитать файл.', 'danger');
					}
				});
			})(files[i]);
		}
	}

	return {
		importProject: importProject,
		importThemePreset: importThemePreset,
		handleFiles: handleFiles
	};
})();

/* ============================================================
Вита — Конструктор контента · ui/app.js
Сборка интерфейса: первый экран (схема магазина + файлы),
редактор (палитра блоков + карточки), предпросмотр в контексте
магазина (мок шапки/подвала, некликабельные тестовые данные),
тосты, экспорт/импорт.
============================================================ */
'use strict';

(function () {
	var editingId = null;
	var previewMode = false;
	var welcomeActive = true;

	/* ---------- Утилиты ---------- */
	function $(sel, root) { return (root || document).querySelector(sel); }
	function el(tag, cls, html) {
		var node = document.createElement(tag);
		if (cls) node.className = cls;
		if (html != null) node.innerHTML = html;
		return node;
	}

	function showToast(msg, kind) {
		var box = $('#vcc-toasts');
		if (!box) return;
		var toast = el('div', 'vcc-toast' + (kind ? ' vcc-toast--' + kind : ''));
		toast.textContent = msg;
		box.appendChild(toast);
		setTimeout(function () { toast.remove(); }, 3200);
	}
	window.vccToast = showToast;

	/* Токены -> DOM. Тёмный режим накладывает поверх палитры
	   тёмные поверхности Виты — ровно как [data-theme=dark] в теме. */
	function applyTokensToDom() {
		var palette = VccStore.getPalette();
		var mode = VccStore.currentProject().themeMode;
		var tokens = palette;
		if (mode === 'dark') {
			tokens = {};
			var key;
			for (key in palette) {
				if (Object.prototype.hasOwnProperty.call(palette, key)) tokens[key] = palette[key];
			}
			for (key in VCC_DARK_TOKENS) {
				if (Object.prototype.hasOwnProperty.call(VCC_DARK_TOKENS, key)) tokens[key] = VCC_DARK_TOKENS[key];
			}
		}
		var root = document.documentElement;
		/* data-vcc-mode — режим предпросмотра конструктора;
		   data-theme=dark — тот же атрибут, что ставит тема Виты,
		   чтобы dark-правила экспортного CSS работали одинаково. */
		root.setAttribute('data-vcc-mode', mode);
		root.setAttribute('data-theme', mode);
		for (var name in tokens) {
			if (Object.prototype.hasOwnProperty.call(tokens, name)) root.style.setProperty(name, tokens[name]);
		}
	}

	/* Экспортный CSS: билдер вшивает его в window.VCC_EXPORT_CSS;
	   в dev-режиме подтягиваем файл напрямую. Строка внедряется как
	   <style> — ею живут и карточки блоков, и режим предпросмотра. */
	function injectExportStyle(css) {
		if (!css) return;
		var style = document.getElementById('vcc-export-style');
		if (!style) {
			style = document.createElement('style');
			style.id = 'vcc-export-style';
			document.head.appendChild(style);
		}
		style.textContent = css;
	}
	function ensureExportCss() {
		if (window.VCC_EXPORT_CSS) {
			injectExportStyle(window.VCC_EXPORT_CSS);
			return Promise.resolve(window.VCC_EXPORT_CSS);
		}
		return fetch('css/export.css').then(function (r) { return r.text(); }).then(function (css) {
			window.VCC_EXPORT_CSS = css;
			injectExportStyle(css);
			return css;
		}).catch(function () { return ''; });
	}

	/* ---------- Палитра блоков ---------- */
	function renderPalette() {
		var box = $('#vcc-palette');
		if (!box) return;
		box.innerHTML = '';
		var groups = { text: 'Текст', media: 'Медиа' };
		var defs = BlockRegistry.getList();
		Object.keys(groups).forEach(function (group) {
			var defsInGroup = defs.filter(function (d) { return (d.group || 'text') === group; });
			if (!defsInGroup.length) return;
			box.appendChild(el('div', 'vcc-sidebar__title', groups[group]));
			var grid = el('div', 'vcc-palette-grid');
			defsInGroup.forEach(function (def) {
				var btn = el('button', 'vcc-palette-btn',
					'<i class="fa ' + def.icon + '"></i><span>' + def.label + '</span>');
				btn.type = 'button';
				btn.addEventListener('click', function () {
					VccStore.addBlock(def.type);
					previewMode = false;
				});
				grid.appendChild(btn);
			});
			box.appendChild(grid);
		});
	}

	/* ---------- Формы ---------- */
	function fieldValue(key) { return function (block) { return block.data[key]; }; }

	function makeField(def, block, onChange) {
		var wrap = el('div', 'vcc-field');
		if (def.type === 'checkbox') {
			var row = el('label', 'vcc-checkbox-row');
			var cb = el('input');
			cb.type = 'checkbox';
			cb.checked = !!block.data[def.key];
			cb.addEventListener('change', function () { onChange(def.key, cb.checked); });
			row.appendChild(cb);
			row.appendChild(el('span', null, def.label));
			wrap.appendChild(row);
			return wrap;
		}
		var label = el('label', 'vcc-field__label', def.label);
		wrap.appendChild(label);
		if (def.type === 'select') {
			var select = el('select', 'vcc-select');
			(def.options || []).forEach(function (opt) {
				var option = el('option', null, opt[1]);
				option.value = opt[0];
				if (String(block.data[def.key]) === String(opt[0])) option.selected = true;
				select.appendChild(option);
			});
			select.addEventListener('change', function () { onChange(def.key, select.value); });
			wrap.appendChild(select);
			return wrap;
		}
		if (def.type === 'tabs-editor') {
			return makeTabsEditor(def, block, onChange, wrap);
		}
		var input = def.type === 'textarea' ? el('textarea', 'vcc-textarea') : el('input', 'vcc-input');
		if (def.type === 'textarea') input.rows = def.rows || 4;
		input.value = block.data[def.key] == null ? '' : block.data[def.key];
		input.addEventListener('input', function () { onChange(def.key, input.value); });
		wrap.appendChild(input);
		if (def.markdown) {
			wrap.appendChild(el('div', 'vcc-hint', 'Markdown: **жирный**, *курсив*, `код`, [текст](url), [соглашение](agree:ID), списки через «- »'));
		}
		return wrap;
	}

	function makeTabsEditor(def, block, onChange, wrap) {
		var list = Array.isArray(block.data.tabs) ? block.data.tabs : [];
		function commit() { onChange('tabs', JSON.parse(JSON.stringify(list))); }
		list.forEach(function (tab, idx) {
			var card = el('div', 'vcc-tabs-item');
			var head = el('div', 'vcc-tabs-item__head');
			var title = el('input', 'vcc-input');
			title.value = tab.title || '';
			title.placeholder = 'Заголовок вкладки ' + (idx + 1);
			title.addEventListener('input', function () { tab.title = title.value; commit(); });
			head.appendChild(title);
			var del = el('button', 'vcc-block__icon-btn vcc-block__icon-btn--danger', '<i class="fa fa-trash"></i>');
			del.type = 'button';
			del.title = 'Удалить вкладку';
			del.addEventListener('click', function () {
				list.splice(idx, 1);
				commit();
				refreshEditor();
			});
			head.appendChild(del);
			card.appendChild(head);
			var content = el('textarea', 'vcc-textarea');
			content.rows = 3;
			content.value = tab.content || '';
			content.placeholder = 'Содержимое вкладки';
			content.addEventListener('input', function () { tab.content = content.value; commit(); });
			card.appendChild(content);
			wrap.appendChild(card);
		});
		var add = el('button', 'vcc-btn vcc-btn--sm', '<i class="fa fa-plus"></i> Добавить вкладку');
		add.type = 'button';
		add.addEventListener('click', function () {
			list.push({ title: 'Вкладка ' + (list.length + 1), content: '' });
			commit();
			refreshEditor();
		});
		wrap.appendChild(add);
		return wrap;
	}

	function refreshEditor() {
		render(VccStore.currentProject(), true);
	}

	/* ---------- Карточки блоков ---------- */
	function blockForm(block) {
		var def = BlockRegistry.get(block.type);
		var body = el('div', 'vcc-block__body');
		/* Правки полей — тихие (без перестройки DOM, фокус сохраняется);
		   чекпойнт undo ставится один раз при входе в редактирование. */
		var onChange = function (key, value) {
			var patch = {};
			patch[key] = value;
			VccStore.updateBlockSilent(block.id, patch);
		};
		(def.fields || []).forEach(function (fieldDef) {
			body.appendChild(makeField(fieldDef, block, onChange));
		});
		return body;
	}

	function blockPreviewHtml(block) {
		var def = BlockRegistry.get(block.type);
		try {
			return def.toHTML(block.data || {});
		} catch (e) {
			return '<p><em>Ошибка отображения блока</em></p>';
		}
	}

	function renderBlockCard(block, index, total) {
		var card = el('div', 'vcc-block');
		var isEditing = editingId === block.id && !previewMode;
		if (isEditing) card.classList.add('is-editing');

		var bar = el('div', 'vcc-block__bar');
		bar.appendChild(el('span', 'vcc-block__label', BlockRegistry.get(block.type).label));
		if (!previewMode) {
			bar.appendChild(iconBtn('fa-arrow-up', 'Выше', function () { VccStore.moveBlock(block.id, -1); }, index === 0));
			bar.appendChild(iconBtn('fa-arrow-down', 'Ниже', function () { VccStore.moveBlock(block.id, 1); }, index === total - 1));
			bar.appendChild(iconBtn(isEditing ? 'fa-compress' : 'fa-pencil', isEditing ? 'Свернуть' : 'Редактировать', function () {
				if (!isEditing) VccStore.checkpoint();
				editingId = isEditing ? null : block.id;
				refreshEditor();
			}));
			bar.appendChild(iconBtn('fa-trash', 'Удалить', function () {
				if (confirm('Удалить блок?')) VccStore.removeBlock(block.id);
			}, false, true));
		}
		card.appendChild(bar);

		var body = el('div', 'vcc-block__body');
		if (isEditing) {
			body.appendChild(blockForm(block));
			card.appendChild(body);
		} else {
			var preview = el('div', 'vcc-block__preview vcc-content', blockPreviewHtml(block));
			if (!previewMode) {
				preview.addEventListener('click', function () {
					editingId = block.id;
					refreshEditor();
				});
			}
			body.appendChild(preview);
			card.appendChild(body);
		}
		return card;
	}

	function iconBtn(icon, title, onClick, disabled, danger) {
		var btn = el('button', 'vcc-block__icon-btn' + (danger ? ' vcc-block__icon-btn--danger' : ''),
			'<i class="fa ' + icon + '"></i>');
		btn.type = 'button';
		btn.title = title;
		btn.disabled = !!disabled;
		btn.addEventListener('click', onClick);
		return btn;
	}

	/* Табы в предпросмотре: делегированный обработчик (canvas перерисовывается) */
	function bindTabsDelegate(root) {
		root.removeEventListener('click', root._vccTabsDelegate || function () {});
		root._vccTabsDelegate = function (e) {
			var btn = e.target.closest('.vcc-tabs__btn');
			if (!btn) return;
			var container = btn.closest('.vcc-tabs');
			if (!container) return;
			var index = btn.getAttribute('data-vcc-tab');
			container.querySelectorAll('.vcc-tabs__btn').forEach(function (b) {
				b.classList.toggle('is-active', b === btn);
			});
			container.querySelectorAll('.vcc-tabs__panel').forEach(function (p) {
				p.classList.toggle('is-active', p.getAttribute('data-vcc-panel') === index);
			});
		};
		root.addEventListener('click', root._vccTabsDelegate);
	}

	/* ---------- Мок магазина (только предпросмотр, некликабельно) ---------- */
	function mockHeader() {
		return '<div class="vcc-mock" aria-hidden="true">' +
			'<div class="vcc-mock__topbar"><span>Бесплатная доставка от 3 000 ₽</span><span>+7 (900) 000-00-00</span></div>' +
			'<div class="vcc-mock__header">' +
			'<span class="vcc-mock__logo"><i class="fa fa-leaf"></i> Магазин «Вита»</span>' +
			'<span class="vcc-mock__catalog"><i class="fa fa-bars"></i> Каталог</span>' +
			'<span class="vcc-mock__search">Поиск по магазину…</span>' +
			'<span class="vcc-mock__actions"><i class="fa fa-heart-o"></i><i class="fa fa-shopping-cart"></i></span>' +
			'</div>' +
			'<div class="vcc-mock__note">Предпросмотр в контексте магазина — тестовые данные не кликабельны</div>' +
			'</div>';
	}
	function mockFooter() {
		return '<div class="vcc-mock vcc-mock--footer" aria-hidden="true">' +
			'<div class="vcc-mock__cols">' +
			'<span><strong>Магазин «Вита»</strong><br>О магазине<br>Доставка</span>' +
			'<span><strong>Покупателям</strong><br>Оплата<br>Гарантия</span>' +
			'<span><strong>Контакты</strong><br>+7 (900) 000-00-00<br>sale@example.com</span>' +
			'</div>' +
			'<div class="vcc-mock__copy">© 2026 Магазин «Вита». Демонстрационные данные конструктора.</div>' +
			'</div>';
	}

	/* ---------- Рендер ---------- */
	function render(src, force) {
		/* Токены применяются всегда — пресет загружают и с первого экрана,
		   и палитра обязана перекрашивать welcome до входа в редактор. */
		applyTokensToDom();
		if (welcomeActive) return;
		var canvas = $('#vcc-canvas');
		if (!canvas) return;
		/* render вызывают и с state (subscribe), и с project напрямую */
		var project = (src && src.project) ? src.project : (src || VccStore.currentProject());

		var titleInput = $('#vcc-title-input');
		if (titleInput && document.activeElement !== titleInput && titleInput.value !== project.title) {
			titleInput.value = project.title;
		}
		var slugLabel = $('#vcc-slug-label');
		if (slugLabel) slugLabel.textContent = project.slug ? ('content-' + project.slug + '.html') : 'content.html';

		/* Ввод в поле редактируемого блока: DOM уже актуален, перестройка
		   канваса убивала бы фокус. Структурные изменения идут через
		   refreshEditor() и всегда перестраивают. */
		if (!previewMode && document.activeElement) {
			var host = document.activeElement.closest('.vcc-block.is-editing');
			if (host) return;
		}

		document.querySelectorAll('#vcc-mode-switch button').forEach(function (btn) {
			btn.classList.toggle('is-active', btn.dataset.mode === project.themeMode);
		});

		if (previewMode) {
			var parts = [mockHeader()];
			bindTabsDelegate(canvas);
			var blocksHtml = project.blocks.map(blockPreviewHtml).join('\n');
			parts.push('<div class="vcc-content">' + (blocksHtml || '<p style="text-align:center;color:var(--mp-text-light,#94A3B8)">Пока пусто — добавьте блоки из палитры слева</p>') + '</div>');
			parts.push(mockFooter());
			canvas.innerHTML = parts.join('\n');
			return;
		}

		canvas.innerHTML = '';
		if (!project.blocks.length) {
			canvas.appendChild(el('div', 'vcc-canvas__empty',
				'<i class="fa fa-cube" style="font-size:26px; margin-bottom:10px; display:block;"></i>Добавьте первый блок из палитры слева'));
			return;
		}
		project.blocks.forEach(function (block, i) {
			canvas.appendChild(renderBlockCard(block, i, project.blocks.length));
		});
	}

	/* ---------- Галерея макетов (первый экран) ---------- */
	/* Миниатюра карточки: НАСТОЯЩИЙ экспортный рендер первых блоков
	   (те же toHTML + vcc-*), урезанный до заголовков и коротких строк —
	   превью = то, что пользователь получит (WYSIWYG). */
	function layoutPreviewHtml(layout) {
		var def;
		var parts = [];
		for (var i = 0; i < layout.blocks.length && parts.length < 4; i++) {
			def = BlockRegistry.get(layout.blocks[i].type);
			if (!def) continue;
			parts.push(def.toHTML(layout.blocks[i].data || {}));
		}
		return parts.join('');
	}

	function renderLayoutGallery() {
		var box = $('#vcc-layouts-grid');
		if (!box) return;
		box.innerHTML = '';
		var presets = window.VCC_LAYOUT_PRESETS || [];
		if (!presets.length) {
			box.appendChild(el('div', 'vcc-layout-empty', 'Макеты не найдены — запустите build/build.py'));
			return;
		}
		presets.forEach(function (layout) {
			var card = el('button', 'vcc-layout-card');
			card.type = 'button';
			var icon = el('span', 'vcc-layout-card__icon', '<i class="fa ' + (layout.layoutIcon || 'fa-file-text-o') + '"></i>');
			card.appendChild(icon);
			card.appendChild(el('span', 'vcc-layout-card__title', layout.layoutTitle || layout.title || 'Макет'));
			card.appendChild(el('span', 'vcc-layout-card__desc', layout.layoutDesc || ''));
			card.appendChild(el('span', 'vcc-layout-card__meta',
				'<i class="fa fa-cube"></i> блоков: ' + layout.blocks.length +
				' · контракт: ' + layout.contract));
			var preview = el('span', 'vcc-layout-card__preview vcc-content', layoutPreviewHtml(layout));
			card.appendChild(preview);
			card.appendChild(el('span', 'vcc-layout-card__cta', '<i class="fa fa-download"></i> Загрузить макет'));
			card.addEventListener('click', function () {
				VccStore.setProject(layout);
				showApp();
				showToast('Макет «' + (layout.layoutTitle || layout.title) + '» загружен — правьте свободно', 'success');
			});
			box.appendChild(card);
		});
	}

	/* ---------- Первый экран / навигация ---------- */
	function showApp() {
		welcomeActive = false;
		$('#vcc-welcome').style.display = 'none';
		$('#vcc-app').classList.add('is-visible');
		refreshEditor();
	}

	function showWelcome() {
		welcomeActive = true;
		$('#vcc-app').classList.remove('is-visible');
		$('#vcc-welcome').style.display = '';
	}

	function bindDropZone(zone, input) {
		zone.addEventListener('click', function () { input.click(); });
		zone.addEventListener('dragover', function (e) { e.preventDefault(); zone.classList.add('is-over'); });
		zone.addEventListener('dragleave', function () { zone.classList.remove('is-over'); });
		zone.addEventListener('drop', function (e) {
			e.preventDefault();
			zone.classList.remove('is-over');
			VccImport.handleFiles(e.dataTransfer.files, showToast);
		});
		input.addEventListener('change', function () {
			VccImport.handleFiles(input.files, showToast);
			input.value = '';
		});
	}

	function copyHtml() {
		var html = VccExport.buildHtml(VccStore.currentProject());
		if (navigator.clipboard && navigator.clipboard.writeText) {
			navigator.clipboard.writeText(html).then(function () {
				showToast('HTML скопирован — вставьте в редактор магазина', 'success');
			}, function () { fallbackCopy(html); });
		} else {
			fallbackCopy(html);
		}
	}
	function fallbackCopy(text) {
		var ta = el('textarea');
		ta.value = text;
		document.body.appendChild(ta);
		ta.select();
		try {
			document.execCommand('copy');
			showToast('HTML скопирован — вставьте в редактор магазина', 'success');
		} catch (e) {
			showToast('Не удалось скопировать — скачайте файл HTML', 'warning');
		}
		ta.remove();
	}

	function init() {
		VccStore.load();
		renderPalette();
		ensureExportCss();

		/* Первый экран */
		$('#vcc-start-empty').addEventListener('click', showApp);
		var resume = $('#vcc-resume');
		if (VccStore.currentProject().blocks.length) {
			resume.style.display = '';
			resume.addEventListener('click', showApp);
		}
		bindDropZone($('#vcc-welcome-drop'), $('#vcc-welcome-file'));
		bindDropZone($('#vcc-layouts-drop'), $('#vcc-layouts-file'));
		renderLayoutGallery();
		bindDropZone($('#vcc-header-file-label'), $('#vcc-header-file'));

		/* Шапка редактора */
		$('#vcc-title-input').addEventListener('input', function () {
			VccStore.setMeta({ title: this.value });
		});
		$('#vcc-mode-switch').addEventListener('click', function (e) {
			var btn = e.target.closest('button');
			if (btn) VccStore.setMode(btn.dataset.mode);
		});
		$('#vcc-preview-toggle').addEventListener('click', function () {
			previewMode = !previewMode;
			editingId = null;
			this.innerHTML = previewMode
				? '<i class="fa fa-pencil"></i> К редактированию'
				: '<i class="fa fa-eye"></i> Предпросмотр';
			refreshEditor();
		});
		$('#vcc-undo').addEventListener('click', function () { VccStore.undo(); });
		$('#vcc-copy-html').addEventListener('click', copyHtml);
		$('#vcc-dl-html').addEventListener('click', function () { VccExport.downloadHtml(VccStore.currentProject()); });
		$('#vcc-dl-json').addEventListener('click', function () { VccExport.downloadJson(VccStore.currentProject()); });
		$('#vcc-dl-css').addEventListener('click', function () {
			ensureExportCss().then(function () {
				VccExport.downloadCss();
				showToast('CSS скачан. Тема Вита подключает стили сама — файл нужен только для нестандартных шаблонов.', 'success');
			});
		});
		$('#vcc-home').addEventListener('click', showWelcome);

		VccStore.subscribe(render);
		render(VccStore.currentProject());
	}

	/* Debug-хэндл для автоматических проверок: ?debug=1 */
	if (/[?&]debug=1/.test(location.search)) {
		window.VCC_DEBUG = { store: VccStore, export: VccExport, import: VccImport };
	}

	document.addEventListener('DOMContentLoaded', init);
})();

})();
