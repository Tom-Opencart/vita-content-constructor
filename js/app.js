(function () {

'use strict';

window.VCC_APP_VERSION = '0.9.13';

window.VCC_EXPORT_CSS = "/* ============================================================\n\u0412\u0438\u0442\u0430 \u2014 \u041a\u043e\u043d\u0441\u0442\u0440\u0443\u043a\u0442\u043e\u0440 \u043a\u043e\u043d\u0442\u0435\u043d\u0442\u0430 \u00b7 \u042d\u043a\u0441\u043f\u043e\u0440\u0442\u043d\u044b\u0435 \u0441\u0442\u0438\u043b\u0438 vcc-v1\n\u042d\u0442\u043e\u0442 \u0444\u0430\u0439\u043b \u2014 \u0415\u0414\u0418\u041d\u0421\u0422\u0412\u0415\u041d\u041d\u042b\u0419 \u0438\u0441\u0442\u043e\u0447\u043d\u0438\u043a \u0441\u0442\u0438\u043b\u0435\u0439 \u044d\u043a\u0441\u043f\u043e\u0440\u0442\u0430: \u0431\u0438\u043b\u0434\u0435\u0440 \u0432\u0448\u0438\u0432\u0430\u0435\u0442\n\u0435\u0433\u043e \u0432 \u0440\u0435\u0434\u0430\u043a\u0442\u043e\u0440 (\u043e\u043a\u043d\u043e \u043f\u0440\u0435\u0434\u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0430) \u0438 \u043e\u0442\u0434\u0430\u0451\u0442 \u043a\u043d\u043e\u043f\u043a\u043e\u0439 \u00ab\u0421\u043a\u0430\u0447\u0430\u0442\u044c CSS\u00bb.\n\u0422\u0435\u043c\u0430 \u0412\u0438\u0442\u0430 \u043f\u043e\u0441\u0442\u0430\u0432\u043b\u044f\u0435\u0442 \u044d\u0442\u043e\u0442 \u0436\u0435 \u0444\u0430\u0439\u043b \u043a\u0430\u043a\ncatalog/view/theme/vita/stylesheet/vita-content-constructor.css.\n\u041f\u0440\u0430\u0432\u0438\u043b\u0430: \u0442\u043e\u043b\u044c\u043a\u043e var(--mp-*, fallback) \u2014 \u043d\u0438 \u043e\u0434\u043d\u043e\u0433\u043e \u043b\u0438\u0442\u0435\u0440\u0430\u043b\u044c\u043d\u043e\u0433\u043e\n\u0446\u0432\u0435\u0442\u0430 \u0432 \u043f\u0440\u0430\u0432\u0438\u043b\u0430\u0445. \u041a\u043e\u043d\u0442\u0440\u0430\u043a\u0442 vcc-v1 \u044d\u0432\u043e\u043b\u044e\u0446\u0438\u043e\u043d\u0438\u0440\u0443\u0435\u0442 \u0430\u0434\u0434\u0438\u0442\u0438\u0432\u043d\u043e.\n============================================================ */\n\n.vcc-content {\n\tcolor: var(--mp-text-body, #2D3748);\n\tfont-family: var(--mp-font-family, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif);\n\tfont-size: 16px;\n\tline-height: 1.65;\n\toverflow-wrap: break-word;\n}\n.vcc-content > *:first-child { margin-top: 0; }\n.vcc-content > *:last-child { margin-bottom: 0; }\n\n/* --- \u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043a\u0438 --- */\n.vcc-heading {\n\tcolor: var(--mp-text-main, #2D3748);\n\tfont-weight: 700;\n\tline-height: 1.3;\n\tmargin: 28px 0 12px;\n}\n.vcc-heading--h2 { font-size: 26px; }\n.vcc-heading--h3 { font-size: 21px; }\n.vcc-heading--h4 { font-size: 18px; }\n\n/* --- \u0410\u0431\u0437\u0430\u0446\u044b --- */\n.vcc-paragraph { margin: 0 0 14px; }\n.vcc-paragraph p { margin: 0 0 14px; }\n\n/* --- \u0421\u0441\u044b\u043b\u043a\u0438 \u0438 \u0438\u043d\u043b\u0430\u0439\u043d --- */\n/* \u0421\u0441\u044b\u043b\u043a\u0438 \u0441\u0442\u0438\u043b\u0438\u0437\u0443\u0435\u043c \u0447\u0435\u0440\u0435\u0437 :where() + :not(.vcc-btn): \u043f\u0440\u0430\u0432\u0438\u043b\u043e \u043d\u0435 \u043c\u0430\u0442\u0447\u0438\u0442\n   \u043a\u043d\u043e\u043f\u043a\u0438 \u0432\u043e\u0432\u0441\u0435, \u0438\u043d\u0430\u0447\u0435 (0,1,1) \u043f\u0440\u043e\u0442\u0438\u0432 (0,1,0) \u0443 .vcc-btn--primary\n   \u0446\u0432\u0435\u0442 \u0441\u0441\u044b\u043b\u043a\u0438 \u043f\u043e\u0431\u0435\u0436\u0434\u0430\u043b --mp-text-inverse \u0438 \u0442\u0435\u043a\u0441\u0442 \u0441\u043b\u0438\u0432\u0430\u043b\u0441\u044f \u0441 \u0444\u043e\u043d\u043e\u043c. */\n.vcc-content :where(a:not(.vcc-btn)) { color: var(--mp-primary, #8C9D93); text-decoration: none; }\n.vcc-content :where(a:not(.vcc-btn)):hover { color: var(--mp-primary-hover, #7A8B81); text-decoration: underline; }\n.vcc-code {\n\tbackground: var(--mp-bg-subtle, #f8fafc);\n\tborder: 1px solid var(--mp-border-divider, #F1F5F9);\n\tborder-radius: var(--mp-radius-sm, 2px);\n\tcolor: var(--mp-text-main, #2D3748);\n\tfont-size: 0.9em;\n\tpadding: 1px 6px;\n}\n\n/* --- \u0421\u043f\u0438\u0441\u043a\u0438 --- */\n.vcc-list { margin: 0 0 14px; padding-left: 22px; }\n.vcc-list li { margin-bottom: 6px; }\n\n/* --- \u0426\u0438\u0442\u0430\u0442\u0430 --- */\n.vcc-quote {\n\tbackground: var(--mp-bg-subtle, #f8fafc);\n\tborder: 1px solid var(--mp-border-divider, #F1F5F9);\n\tborder-radius: var(--mp-radius-md, 4px);\n\tbox-shadow: var(--mp-shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.05));\n\tcolor: var(--mp-text-muted, #64748B);\n\tfont-style: italic;\n\tmargin: 18px 0;\n\tpadding: 14px 18px;\n}\n.vcc-quote__author {\n\tcolor: var(--mp-text-light, #94A3B8);\n\tfont-size: 14px;\n\tfont-style: normal;\n\tmargin-top: 8px;\n}\n\n/* --- \u0412\u0440\u0435\u0437\u043a\u0438 (alert): \u0432\u0430\u0440\u0438\u0430\u043d\u0442 \u0437\u0430\u0434\u0430\u0451\u0442\u0441\u044f \u0446\u0432\u0435\u0442\u043d\u043e\u0439 \u043c\u0435\u0442\u043a\u043e\u0439 \u0441\u0432\u0435\u0440\u0445\u0443, \u0431\u0435\u0437 \u0431\u043e\u0440\u0434\u0435\u0440\u043e\u0432 \u0441\u043b\u0435\u0432\u0430 --- */\n.vcc-alert {\n\tborder: 1px solid var(--mp-border-color, #E2E8F0);\n\tborder-radius: var(--mp-radius-md, 4px);\n\tbox-shadow: var(--mp-shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.05));\n\tmargin: 18px 0;\n\tpadding: 14px 18px;\n}\n.vcc-alert--info    { background: var(--mp-primary-light, #F2F6F4); border-top: 2px solid var(--mp-primary, #8C9D93); }\n.vcc-alert--success { background: var(--mp-bg-subtle, #f8fafc); border-top: 2px solid var(--mp-badge-express-bg, #059669); }\n.vcc-alert--warning { background: var(--mp-bg-subtle, #f8fafc); border-top: 2px solid var(--mp-badge-hit-bg, #d97706); }\n.vcc-alert--danger  { background: var(--mp-bg-subtle, #f8fafc); border-top: 2px solid var(--mp-badge-discount-bg, #dc2626); }\n/* \u0422\u0451\u043c\u043d\u0430\u044f \u0442\u0435\u043c\u0430 \u043c\u0430\u0433\u0430\u0437\u0438\u043d\u0430: primary-light \u043d\u0435 \u043f\u0435\u0440\u0435\u043e\u043f\u0440\u0435\u0434\u0435\u043b\u044f\u0435\u0442\u0441\u044f \u0442\u0435\u043c\u043e\u0439 \u2014 \u0432\u0440\u0435\u0437\u043a\u0435 info \u043d\u0443\u0436\u0435\u043d \u0442\u0451\u043c\u043d\u044b\u0439 \u0444\u043e\u043d (\u0430\u0434\u0434\u0438\u0442\u0438\u0432\u043d\u043e\u0435 \u043f\u0440\u0430\u0432\u0438\u043b\u043e) */\n[data-theme=\"dark\"] .vcc-alert--info { background: var(--mp-bg-hover, #38343E); }\n.vcc-alert p:last-child { margin-bottom: 0; }\n\n/* --- \u0421\u043f\u043e\u0439\u043b\u0435\u0440 --- */\n.vcc-spoiler {\n\tborder: 1px solid var(--mp-border-color, #E2E8F0);\n\tborder-radius: var(--mp-radius-md, 4px);\n\tmargin: 14px 0;\n}\n.vcc-spoiler__summary {\n\tcursor: pointer;\n\tfont-weight: 600;\n\tpadding: 12px 16px;\n\tcolor: var(--mp-text-main, #2D3748);\n}\n.vcc-spoiler__summary:hover { color: var(--mp-primary, #8C9D93); }\n.vcc-spoiler__body {\n\tborder-top: 1px solid var(--mp-border-divider, #F1F5F9);\n\tpadding: 12px 16px;\n}\n.vcc-spoiler__body p:last-child { margin-bottom: 0; }\n\n/* --- \u0422\u0430\u0431\u044b --- */\n.vcc-tabs { margin: 18px 0; }\n.vcc-tabs__nav {\n\tborder-bottom: 1px solid var(--mp-border-color, #E2E8F0);\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\tgap: 4px;\n}\n.vcc-tabs__btn {\n\tbackground: none;\n\tborder: none;\n\tborder-bottom: 2px solid transparent;\n\tcolor: var(--mp-text-muted, #64748B);\n\tcursor: pointer;\n\tfont-size: 15px;\n\tmargin-bottom: -1px;\n\tpadding: 10px 14px;\n}\n.vcc-tabs__btn.is-active {\n\tborder-bottom-color: var(--mp-primary, #8C9D93);\n\tcolor: var(--mp-primary, #8C9D93);\n\tfont-weight: 600;\n}\n.vcc-tabs__panel { display: none; padding-top: 14px; }\n.vcc-tabs__panel.is-active { display: block; }\n\n/* --- \u0422\u0430\u0431\u043b\u0438\u0446\u0430 --- */\n.vcc-table-wrap { margin: 18px 0; overflow-x: auto; }\n.vcc-table {\n\tborder-collapse: collapse;\n\twidth: 100%;\n}\n.vcc-table th,\n.vcc-table td {\n\tborder: 1px solid var(--mp-border-color, #E2E8F0);\n\tpadding: 9px 12px;\n\ttext-align: left;\n}\n.vcc-table th {\n\tbackground: var(--mp-bg-subtle, #f8fafc);\n\tcolor: var(--mp-text-main, #2D3748);\n\tfont-weight: 600;\n}\n.vcc-table tr:nth-child(even) td { background: var(--mp-bg-subtle, #f8fafc); }\n\n/* --- \u041a\u0430\u0440\u0442\u0438\u043d\u043a\u0430 --- */\n.vcc-figure { margin: 18px 0; }\n.vcc-figure__img {\n\tborder-radius: var(--mp-radius-md, 4px);\n\theight: auto;\n\tmax-width: 100%;\n}\n.vcc-figure__caption {\n\tcolor: var(--mp-text-light, #94A3B8);\n\tfont-size: 13px;\n\tmargin-top: 6px;\n\ttext-align: center;\n}\n\n/* --- \u041e\u0433\u043b\u0430\u0432\u043b\u0435\u043d\u0438\u0435 --- */\n.vcc-toc {\n\tbackground: var(--mp-bg-subtle, #f8fafc);\n\tborder: 1px solid var(--mp-border-divider, #F1F5F9);\n\tborder-radius: var(--mp-radius-lg, 6px);\n\tmargin: 18px 0;\n\tpadding: 14px 20px;\n}\n.vcc-toc__title {\n\tcolor: var(--mp-text-main, #2D3748);\n\tfont-weight: 600;\n\tmargin-bottom: 8px;\n}\n.vcc-toc__list { margin: 0; padding-left: 20px; }\n.vcc-toc__list li { margin-bottom: 4px; }\n\n/* ==== v0.7.0 landing ==== */\n\n/* --- \u0421\u0435\u043a\u0446\u0438\u0438: \u043a\u0430\u0440\u043a\u0430\u0441 --- */\n.vcc-section { position: relative; overflow: hidden; }\n.vcc-section--bg-light   { background: var(--mp-bg-subtle, #f8fafc); }\n.vcc-section--bg-surface { background: var(--mp-bg-surface, #ffffff); }\n.vcc-section--bg-primary { background: var(--mp-primary, #8C9D93); color: var(--mp-text-inverse, #ffffff); }\n.vcc-section--bg-image, .vcc-section--bg-video {\n\tbackground-color: var(--mp-bg-surface, #ffffff);\n\tbackground-position: center;\n\tbackground-size: cover;\n}\n.vcc-section__video {\n\theight: 100%;\n\tleft: 0;\n\tobject-fit: cover;\n\tposition: absolute;\n\ttop: 0;\n\twidth: 100%;\n\tz-index: 0;\n}\n/* \u041e\u0432\u0435\u0440\u043b\u0435\u0439 \u2014 \u0441\u043b\u043e\u0439 \u0421\u0415\u041a\u0426\u0418\u0418 (z1): \u043f\u043e\u0434 \u043a\u043e\u043d\u0442\u0435\u043d\u0442\u043e\u043c (inner z2), \u043d\u0430\u0434 \u0444\u043e\u043d\u043e\u043c/\u0432\u0438\u0434\u0435\u043e\n * (video z0). \u041d\u0430 __inner \u043e\u043d \u0437\u0430\u0442\u0435\u043c\u043d\u044f\u043b \u0431\u044b \u0441\u0430\u043c \u0442\u0435\u043a\u0441\u0442. */\n.vcc-section--overlay::before {\n\tbackground: rgba(0, 0, 0, 0.45);\n\tbottom: 0;\n\tcontent: '';\n\tleft: 0;\n\tposition: absolute;\n\tright: 0;\n\ttop: 0;\n\tz-index: 1;\n}\n.vcc-section__inner { position: relative; z-index: 2; }\n.vcc-section--pad-s { padding: 48px 0; }\n.vcc-section--pad-m { padding: 80px 0; }\n.vcc-section--pad-l { padding: 112px 0; }\n.vcc-section--pad-xl { padding: 160px 0; }\n/* \u0428\u0438\u0440\u0438\u043d\u0430 \u043a\u043e\u043d\u0442\u0435\u043d\u0442\u0430 \u043f\u043e\u0432\u0442\u043e\u0440\u044f\u0435\u0442 \u043d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0443 \u0442\u0435\u043c\u044b \u00ab\u0428\u0438\u0440\u0438\u043d\u0430 \u0441\u0430\u0439\u0442\u0430\u00bb\n   (\u0414\u0438\u0437\u0430\u0439\u043d \u0438 \u0441\u0442\u0438\u043b\u0438): --vita-container-max \u043f\u0440\u0438\u0445\u043e\u0434\u0438\u0442 \u0438\u0437 \u043f\u0440\u0435\u0441\u0435\u0442\u0430\n   (1210/1400/1640/100%) \u2014 \u043f\u0440\u0435\u0434\u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440 \u0440\u0430\u0432\u0435\u043d \u0432\u0438\u0442\u0440\u0438\u043d\u0435. */\n.vcc-container { margin: 0 auto; max-width: var(--vita-container-max, 1640px); padding: 0 24px; }\n.vcc-section--w-narrow .vcc-container { max-width: 720px; }\n.vcc-section--w-full .vcc-container { max-width: none; }\n\n/* --- \u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a \u0441\u0435\u043a\u0446\u0438\u0438 --- */\n.vcc-section__head { margin: 0 0 40px; }\n.vcc-section__head--center { text-align: center; }\n.vcc-eyebrow {\n\tcolor: var(--mp-secondary, #5A8F76);\n\tdisplay: inline-block;\n\tfont-size: 12px;\n\tletter-spacing: 0.08em;\n\tmargin-bottom: 8px;\n\ttext-transform: uppercase;\n}\n.vcc-section--bg-primary .vcc-eyebrow { color: var(--mp-text-inverse, #ffffff); opacity: 0.85; }\n.vcc-section__title { margin: 0 0 10px; }\n.vcc-section__sub { color: var(--mp-text-muted, #64748B); margin: 0 auto; max-width: 720px; }\n.vcc-section--bg-primary .vcc-section__sub { color: var(--mp-text-inverse, #ffffff); opacity: 0.9; }\n\n/* --- \u041a\u043d\u043e\u043f\u043a\u0438 --- */\n.vcc-btn {\n\talign-items: center;\n\tborder: 1px solid transparent;\n\tborder-radius: var(--mp-radius-md, 4px);\n\tbox-sizing: border-box;\n\tdisplay: inline-flex;\n\tfont-weight: 600;\n\tjustify-content: center;\n\tmin-height: 44px;\n\tpadding: 10px 24px;\n\ttext-decoration: none;\n}\n.vcc-btn--primary { background: var(--mp-primary, #8C9D93); color: var(--mp-text-inverse, #ffffff); }\n.vcc-btn--primary:hover { background: var(--mp-primary-hover, #7A8B81); }\n.vcc-btn--secondary { background: var(--mp-secondary, #5A8F76); color: var(--mp-text-inverse, #ffffff); }\n.vcc-btn--secondary:hover { filter: brightness(1.05); }\n.vcc-btn--ghost { background: transparent; border-color: var(--mp-border-color, #E2E8F0); color: inherit; }\n.vcc-btn--ghost:hover { border-color: var(--mp-primary, #8C9D93); color: var(--mp-primary, #8C9D93); }\n.vcc-hero .vcc-btn--ghost,\n.vcc-section--bg-primary .vcc-btn--ghost { border-color: currentColor; }\n\n/* --- \u0418\u043a\u043e\u043d\u043a\u0430 (span -> i \u0440\u0430\u043d\u0442\u0430\u0439\u043c\u043e\u043c \u0442\u0435\u043c\u044b) --- */\n.vcc-icon {\n\talign-items: center;\n\tbackground: var(--mp-bg-hover, #f1f5f9);\n\tborder-radius: var(--mp-radius-pill, 9999px);\n\tcolor: var(--mp-primary, #8C9D93);\n\tdisplay: inline-flex;\n\tfont-size: 20px;\n\theight: 48px;\n\tjustify-content: center;\n\twidth: 48px;\n}\n.vcc-section--bg-primary .vcc-icon { background: rgba(255, 255, 255, 0.18); color: inherit; }\n\n/* --- \u0410\u043a\u0446\u0435\u043d\u0442 inline --- */\n.vcc-accent { color: var(--mp-primary, #8C9D93); font-weight: inherit; }\n.vcc-section--bg-primary .vcc-accent {\n\tcolor: var(--mp-text-inverse, #ffffff);\n\ttext-decoration: underline;\n\ttext-decoration-color: var(--mp-text-inverse, #ffffff);\n}\n\n/* --- hero --- */\n.vcc-hero { padding: 8px 0; }\n.vcc-hero--center { text-align: center; }\n.vcc-hero__title { font-size: 42px; line-height: 1.15; margin: 0 0 14px; }\n.vcc-hero__sub { color: var(--mp-text-muted, #64748B); font-size: 19px; margin: 0 auto 28px; max-width: 720px; }\n.vcc-section--bg-primary .vcc-hero__sub,\n.vcc-section--bg-image .vcc-hero__sub,\n.vcc-section--bg-video .vcc-hero__sub { color: inherit; opacity: 0.9; }\n.vcc-hero__actions { align-items: center; display: flex; flex-wrap: wrap; gap: 12px; }\n.vcc-hero--center .vcc-hero__actions { justify-content: center; }\n.vcc-hero__note { color: var(--mp-text-light, #94A3B8); font-size: 13px; margin: 18px 0 0; }\n.vcc-section--bg-primary .vcc-hero__note,\n.vcc-section--bg-image .vcc-hero__note,\n.vcc-section--bg-video .vcc-hero__note { color: inherit; opacity: 0.75; }\n\n/* --- logos --- */\n.vcc-logos { align-items: center; display: flex; flex-wrap: wrap; gap: 40px; row-gap: 24px; }\n/* \u0426\u0435\u043d\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0439 \u0437\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a \u0441\u0435\u043a\u0446\u0438\u0438 \u2014 \u0446\u0435\u043d\u0442\u0440\u0438\u0440\u0443\u0435\u043c \u0438 \u0440\u044f\u0434 \u043b\u043e\u0433\u043e\u0442\u0438\u043f\u043e\u0432,\n   \u0438\u043d\u0430\u0447\u0435 3-4 \u0437\u043d\u0430\u043a\u0430 \u043b\u0438\u043f\u043d\u0443\u0442 \u043a \u043b\u0435\u0432\u043e\u043c\u0443 \u043a\u0440\u0430\u044e \u0448\u0438\u0440\u043e\u043a\u043e\u0433\u043e \u043a\u043e\u043d\u0442\u0435\u0439\u043d\u0435\u0440\u0430. */\n.vcc-section__head--center + .vcc-logos { justify-content: center; }\n.vcc-logos__img { height: 40px; width: auto; opacity: 0.75; }\n.vcc-logos__link:hover .vcc-logos__img { opacity: 1; }\n\n/* --- features --- */\n.vcc-features { display: grid; gap: 24px; }\n.vcc-features--c2 { grid-template-columns: repeat(2, 1fr); }\n.vcc-features--c3 { grid-template-columns: repeat(3, 1fr); }\n.vcc-features--c4 { grid-template-columns: repeat(4, 1fr); }\n.vcc-feature { text-align: left; }\n.vcc-section__head--center + .vcc-features .vcc-feature { text-align: center; }\n.vcc-section__head--center + .vcc-features .vcc-feature .vcc-icon { margin-bottom: 14px; }\n.vcc-feature__icon { margin-bottom: 0; }\n.vcc-feature__title { font-size: 18px; margin: 14px 0 8px; }\n.vcc-feature__text { color: var(--mp-text-muted, #64748B); }\n.vcc-feature__text p { margin: 0 0 10px; }\n.vcc-feature__text p:last-child { margin-bottom: 0; }\n.vcc-section--bg-primary .vcc-feature__text { color: inherit; opacity: 0.9; }\n\n/* --- media_text --- */\n.vcc-media-text { align-items: center; display: grid; gap: 40px; grid-template-columns: 1fr 1fr; }\n.vcc-media-text--flip .vcc-media-text__media { order: 2; }\n.vcc-media-text--flip .vcc-media-text__body { order: 1; }\n.vcc-media-text__media { margin: 0; }\n.vcc-media-text__media img { border-radius: var(--mp-radius-lg, 6px); height: auto; max-width: 100%; }\n.vcc-media-text__actions { margin-top: 20px; }\n\n/* --- steps --- */\n.vcc-steps { display: grid; gap: 28px; }/* \u0422\u0430\u0439\u043c\u043b\u0430\u0439\u043d: \u0442\u043e\u0447\u043d\u043e\u0435 \u0441\u043e\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0435 \u0440\u0435\u0444\u0435\u0440\u0435\u043d\u0441\u0443 \u2014 \u0442\u043e\u043d\u043a\u0430\u044f \u0440\u043e\u0432\u043d\u0430\u044f \u043b\u0438\u043d\u0438\u044f \u0441\u043b\u0435\u0432\u0430,\n   \u043c\u0430\u043b\u0435\u043d\u044c\u043a\u0438\u0435 \u0441\u043f\u043b\u043e\u0448\u043d\u044b\u0435 \u0442\u043e\u0447\u043a\u0438-\u043c\u0430\u0440\u043a\u0435\u0440\u044b \u043d\u0430 \u043b\u0438\u043d\u0438\u0438, \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0438 \u0431\u0435\u0437 \u0440\u0430\u043c\u043a\u0438 \u0441 \u043c\u044f\u0433\u043a\u043e\u0439\n   \u0442\u0435\u043d\u044c\u044e, \u0433\u043e\u0434 \u2014 \u043e\u0431\u044b\u0447\u043d\u044b\u0439 \u0436\u0438\u0440\u043d\u044b\u0439 \u0430\u043a\u0446\u0435\u043d\u0442\u043d\u044b\u0439 \u0442\u0435\u043a\u0441\u0442 (\u043d\u0435 \u043a\u0430\u043f\u0441). */\n.vcc-steps--timeline { gap: 24px; padding-left: 56px; position: relative; }\n.vcc-steps--timeline::before {\n\tbackground: var(--mp-border-color, #E2E8F0);\n\tbottom: 44px;\n\tcontent: '';\n\tleft: 7px;\n\tposition: absolute;\n\ttop: 31px;\n\twidth: 2px;\n}\n.vcc-steps--timeline .vcc-step {\n\tbackground: var(--mp-card-bg, #ffffff);\n\tborder: 0;\n\tborder-radius: 16px;\n\tbox-shadow: 0 2px 6px rgba(0, 0, 0, 0.04), 0 12px 28px rgba(0, 0, 0, 0.06);\n\theight: 100%;\n\tpadding: 24px 30px 26px;\n\tposition: relative;\n\ttransition: box-shadow 0.25s ease, transform 0.25s ease;\n}\n.vcc-steps--timeline .vcc-step:hover {\n\tbox-shadow: 0 2px 6px rgba(0, 0, 0, 0.05), 0 18px 44px rgba(0, 0, 0, 0.1);\n\ttransform: translateY(-3px);\n}\n/* \u0422\u043e\u0447\u043a\u0430-\u043c\u0430\u0440\u043a\u0435\u0440 \u043d\u0430 \u043b\u0438\u043d\u0438\u0438: \u0441\u043f\u043b\u043e\u0448\u043d\u0430\u044f, \u043c\u0430\u043b\u0435\u043d\u044c\u043a\u0430\u044f (10px), \u0446\u0432\u0435\u0442 \u0431\u0440\u0435\u043d\u0434\u0430;\n   \u0446\u0435\u043d\u0442\u0440 \u0442\u043e\u0447\u043d\u043e \u043d\u0430 \u043e\u0441\u0438 \u043b\u0438\u043d\u0438\u0438 (left: -53px \u2192 \u0446\u0435\u043d\u0442\u0440 8px = \u0446\u0435\u043d\u0442\u0440 \u043b\u0438\u043d\u0438\u0438 8px).\n   \u041d\u0430 hover \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0438 \u0442\u043e\u0447\u043a\u0430 \u043c\u044f\u0433\u043a\u043e \u0443\u0432\u0435\u043b\u0438\u0447\u0438\u0432\u0430\u0435\u0442\u0441\u044f. */\n.vcc-steps--timeline .vcc-step__num {\n\tbackground: var(--mp-primary, #8C9D93);\n\tborder: 0;\n\tborder-radius: 50%;\n\tfont-size: 0;\n\theight: 10px;\n\tleft: -53px;\n\toverflow: hidden;\n\tposition: absolute;\n\ttop: 31px;\n\ttransition: transform 0.25s ease;\n\twidth: 10px;\n}\n.vcc-steps--timeline .vcc-step:hover .vcc-step__num { transform: scale(1.5); }\n/* \u0421\u0442\u0438\u043b\u044c \u00ab\u041d\u043e\u043c\u0435\u0440\u0430\u00bb \u2014 \u0433\u043e\u0440\u0438\u0437\u043e\u043d\u0442\u0430\u043b\u044c\u043d\u0430\u044f \u0441\u0435\u0442\u043a\u0430 \u043a\u043e\u043b\u043e\u043d\u043e\u043a (\u043a\u0430\u043a \u0443 \u00ab\u041f\u0440\u0435\u0438\u043c\u0443\u0449\u0435\u0441\u0442\u0432\u00bb):\n   4 \u0448\u0430\u0433\u0430 \u0438 \u043c\u0435\u043d\u044c\u0448\u0435 \u2014 \u0432\u043e \u0441\u0442\u043e\u043b\u044c\u043a\u043e \u0436\u0435 \u043a\u043e\u043b\u043e\u043d\u043e\u043a, 5+ \u2014 \u0432 3; \u043d\u0430 \u043c\u043e\u0431\u0438\u043b\u044c\u043d\u044b\u0445 \u2014 \u043a\u043e\u043b\u043e\u043d\u043a\u0430.\n   \u041a\u0430\u0440\u0442\u043e\u0447\u043a\u0430: \u043d\u043e\u043c\u0435\u0440-\u043a\u0440\u0443\u0433 \u0441\u043b\u0435\u0432\u0430, \u0437\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a \u0441\u043f\u0440\u0430\u0432\u0430 \u043f\u043e \u0446\u0435\u043d\u0442\u0440\u0443 \u043a\u0440\u0443\u0433\u0430,\n   \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u043f\u043e\u0434 \u0437\u0430\u0433\u043e\u043b\u043e\u0432\u043a\u043e\u043c \u2014 \u0431\u0435\u0437 \u043f\u0443\u0441\u0442\u043e\u0439 \u0441\u0442\u0440\u043e\u043a\u0438 \u043f\u043e\u0434 \u043d\u043e\u043c\u0435\u0440\u043e\u043c. */\n.vcc-steps--numbers { grid-template-columns: repeat(3, 1fr); }\n.vcc-steps--numbers.is-c2 { grid-template-columns: repeat(2, 1fr); }\n.vcc-steps--numbers.is-c4 { grid-template-columns: repeat(4, 1fr); }\n@media (max-width: 767px) {\n\t.vcc-steps--numbers,\n\t.vcc-steps--numbers.is-c2,\n\t.vcc-steps--numbers.is-c4 { grid-template-columns: 1fr; }\n}\n.vcc-steps--numbers .vcc-step {\n\tbackground: var(--mp-card-bg, #ffffff);\n\tborder: 1px solid var(--mp-border-color, #E2E8F0);\n\tborder-radius: 16px;\n\tbox-shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 0 10px 30px rgba(0, 0, 0, 0.06);\n\tdisplay: flex;\n\tgap: 16px;\n\theight: 100%;\n\tpadding: 24px 26px;\n\ttransition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;\n}\n.vcc-steps--numbers .vcc-step:hover {\n\tborder-color: var(--mp-primary, #8C9D93);\n\tbox-shadow: 0 2px 6px rgba(0, 0, 0, 0.05), 0 18px 44px rgba(0, 0, 0, 0.1);\n\ttransform: translateY(-3px);\n}\n.vcc-steps--numbers .vcc-step__num {\n\talign-items: center;\n\tbackground: linear-gradient(135deg, var(--mp-primary, #8C9D93), var(--mp-secondary, #5A8F76));\n\tborder: 0;\n\tborder-radius: var(--mp-radius-pill, 9999px);\n\tbox-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);\n\tcolor: var(--mp-text-inverse, #ffffff);\n\tdisplay: inline-flex;\n\tflex-shrink: 0;\n\tfont-size: 17px;\n\tfont-weight: 700;\n\theight: 44px;\n\tjustify-content: center;\n\tline-height: 1;\n\tmargin-bottom: 0;\n\tposition: static;\n\ttransition: transform 0.25s ease;\n\twidth: 44px;\n}\n/* \u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a \u043f\u0440\u0438\u0436\u0430\u0442 \u043a \u043a\u0440\u0443\u0433\u0443: \u043f\u0435\u0440\u0432\u0430\u044f \u0441\u0442\u0440\u043e\u043a\u0430 \u0432\u0438\u0437\u0443\u0430\u043b\u044c\u043d\u043e \u043f\u043e \u0446\u0435\u043d\u0442\u0440\u0443 \u043a\u0440\u0443\u0433\u0430 (44px),\n   \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u0438\u0434\u0451\u0442 \u043d\u0438\u0436\u0435 \u043d\u0430 \u0432\u0441\u044e \u0448\u0438\u0440\u0438\u043d\u0443 \u043a\u043e\u043b\u043e\u043d\u043a\u0438 \u0442\u0435\u043b\u0430. */\n.vcc-steps--numbers .vcc-step__body { flex: 1 1 auto; min-width: 0; }\n.vcc-steps--numbers .vcc-step__label { margin-bottom: 2px; }\n.vcc-steps--numbers .vcc-step__title { line-height: 44px; margin: -2px 0 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.vcc-steps--numbers .vcc-step:hover .vcc-step__num { transform: scale(1.08); }\n.vcc-step__label {\n\tcolor: var(--mp-primary, #8C9D93);\n\tfont-size: 14px;\n\tfont-weight: 700;\n\tmargin-bottom: 3px;\n}\n.vcc-step__title { font-size: 19px; margin: 6px 0 6px; }\n.vcc-step__text { color: var(--mp-text-muted, #64748B); }\n.vcc-step__text p { margin: 0 0 8px; }\n.vcc-step__text p:last-child { margin-bottom: 0; }\n/* \u0422\u0451\u043c\u043d\u0430\u044f \u0442\u0435\u043c\u0430: \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0438 \u043d\u0430 --mp-card-bg (\u0442\u043e\u043a\u0435\u043d \u0441\u0430\u043c \u0442\u0451\u043c\u043d\u044b\u0439),\n   \u0442\u0435\u043d\u0438 \u0433\u043b\u0443\u0431\u0436\u0435 \u2014 \u043d\u0430 \u0442\u0451\u043c\u043d\u043e\u043c \u0444\u043e\u043d\u0435 \u0441\u043b\u0430\u0431\u044b\u0435 \u0442\u0435\u043d\u0438 \u0438\u0441\u0447\u0435\u0437\u0430\u044e\u0442. */\n[data-theme=\"dark\"] .vcc-steps--timeline .vcc-step__num,\n[data-theme=\"dark\"] .vcc-steps--numbers .vcc-step__num { border-color: transparent; }\n[data-theme=\"dark\"] .vcc-steps--timeline .vcc-step,\n[data-theme=\"dark\"] .vcc-steps--numbers .vcc-step { box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2), 0 10px 30px rgba(0, 0, 0, 0.25); }\n.vcc-step__text p { margin: 0 0 8px; }\n.vcc-step__text p:last-child { margin-bottom: 0; }\n\n/* --- stats --- */\n.vcc-stats { display: grid; gap: 24px; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); text-align: center; }\n.vcc-stat__value { color: inherit; display: block; font-size: 40px; font-weight: 700; line-height: 1.1; }\n.vcc-stat__suffix { font-size: 0.55em; font-weight: 600; margin-left: 2px; opacity: 0.85; }\n.vcc-stat__label { color: var(--mp-text-muted, #64748B); font-size: 14px; }\n.vcc-section--bg-primary .vcc-stat__label { color: inherit; opacity: 0.85; }\n\n/* --- reviews --- */\n.vcc-reviews { display: grid; gap: 24px; }\n.vcc-reviews--c2 { grid-template-columns: repeat(2, 1fr); }\n.vcc-reviews--c3 { grid-template-columns: repeat(3, 1fr); }\n.vcc-review {\n\tbackground: var(--mp-bg-surface, #ffffff);\n\tborder: 1px solid var(--mp-border-color, #E2E8F0);\n\tborder-radius: var(--mp-radius-lg, 6px);\n\tbox-shadow: var(--mp-shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.05));\n\tcolor: var(--mp-text-body, #2D3748);\n\tfont-style: normal;\n\tmargin: 0;\n\tpadding: 24px;\n}\n.vcc-review__text { margin: 0 0 12px; }\n.vcc-stars { color: var(--mp-star-color, #f59e0b); display: block; font-size: 15px; letter-spacing: 2px; margin-bottom: 10px; }\n.vcc-review__person { align-items: center; display: flex; flex-wrap: wrap; gap: 10px; }\n.vcc-review__avatar { border-radius: var(--mp-radius-pill, 9999px); height: 40px; width: 40px; object-fit: cover; }\n.vcc-review__name { color: var(--mp-text-main, #2D3748); }\n.vcc-review__role { color: var(--mp-text-light, #94A3B8); display: block; font-size: 13px; width: 100%; }\n\n/* --- before_after (\u0414\u043e / \u041f\u043e\u0441\u043b\u0435) --- */\n.vcc-ba { display: grid; gap: 24px; }\n.vcc-ba--c2 { grid-template-columns: repeat(2, 1fr); }\n.vcc-ba--c3 { grid-template-columns: repeat(3, 1fr); }\n.vcc-ba--c4 { grid-template-columns: repeat(4, 1fr); }\n.vcc-ba__item { margin: 0; }\n.vcc-ba__media {\n\tposition: relative;\n\toverflow: hidden;\n\tborder-radius: var(--mp-radius-lg, 6px);\n\tbox-shadow: var(--mp-shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.05));\n}\n.vcc-ba__media img {\n\tdisplay: block;\n\theight: auto;\n\tobject-fit: cover;\n\twidth: 100%;\n}\n.vcc-ba__label {\n\tbackground: var(--mp-primary, #8C9D93);\n\tborder-radius: var(--mp-radius-pill, 9999px);\n\tcolor: var(--mp-text-inverse, #ffffff);\n\tfont-size: 12px;\n\tfont-weight: 700;\n\tleft: 12px;\n\tletter-spacing: 0.04em;\n\tpadding: 4px 12px;\n\tposition: absolute;\n\ttop: 12px;\n}\n.vcc-ba__item:hover .vcc-ba__media {\n\tbox-shadow: var(--mp-shadow-md, 0 4px 12px rgba(0, 0, 0, 0.1));\n}\n.vcc-ba__caption { color: var(--mp-text-muted, #64748B); font-size: 14px; margin-top: 10px; }\n.vcc-ba__caption p { margin: 0 0 8px; }\n.vcc-ba__caption p:last-child { margin-bottom: 0; }\n.vcc-section__head--center + .vcc-ba .vcc-ba__caption { text-align: center; }\n\n/* --- team --- */\n.vcc-team { display: grid; gap: 24px; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }\n.vcc-member { text-align: center; }\n.vcc-member__photo { border-radius: var(--mp-radius-pill, 9999px); height: 128px; width: 128px; object-fit: cover; }\n.vcc-member__name { color: var(--mp-text-main, #2D3748); display: block; margin-top: 12px; }\n.vcc-member__role { color: var(--mp-secondary, #5A8F76); display: block; font-size: 13px; margin-top: 2px; }\n.vcc-member__text { color: var(--mp-text-muted, #64748B); font-size: 14px; margin-top: 8px; }\n.vcc-member__text p { margin: 0 0 8px; }\n.vcc-member__text p:last-child { margin-bottom: 0; }\n\n/* --- documents --- */\n.vcc-docs { display: grid; gap: 20px; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); }\n.vcc-doc { color: inherit; display: block; text-align: center; text-decoration: none; }\n.vcc-doc__img { border: 1px solid var(--mp-border-color, #E2E8F0); border-radius: var(--mp-radius-md, 4px); height: auto; max-width: 100%; }\n.vcc-doc__title { color: var(--mp-text-muted, #64748B); display: block; font-size: 14px; margin-top: 8px; }\n.vcc-doc:hover .vcc-doc__title { color: var(--mp-primary, #8C9D93); }\n\n/* --- cta --- */\n.vcc-cta { text-align: center; }\n.vcc-cta__title { margin: 0 0 12px; }\n.vcc-cta__text { color: var(--mp-text-muted, #64748B); margin: 0 auto 24px; max-width: 640px; }\n.vcc-section--bg-primary .vcc-cta__text { color: inherit; opacity: 0.9; }\n.vcc-cta__actions { align-items: center; display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; }\n\n/* --- contacts --- */\n.vcc-contacts { display: grid; gap: 18px; }\n.vcc-contact { align-items: center; display: flex; flex-wrap: wrap; gap: 14px; }\n.vcc-contact__label { color: var(--mp-text-light, #94A3B8); min-width: 90px; }\n.vcc-contact__value { color: var(--mp-text-main, #2D3748); font-weight: 600; text-decoration: none; }\na.vcc-contact__value:hover { color: var(--mp-primary, #8C9D93); text-decoration: underline; }\n\n/* --- socials --- */\n.vcc-socials { display: flex; flex-wrap: wrap; gap: 14px; }\n.vcc-socials--center { justify-content: center; }\n.vcc-social {\n\talign-items: center;\n\tborder: 1px solid var(--mp-border-color, #E2E8F0);\n\tborder-radius: var(--mp-radius-pill, 9999px);\n\tcolor: var(--mp-text-body, #2D3748);\n\tdisplay: inline-flex;\n\tgap: 8px;\n\tpadding: 8px 18px 8px 10px;\n\tposition: relative;\n\ttext-decoration: none;\n}\n.vcc-social .vcc-icon { height: 32px; width: 32px; font-size: 15px; }\n.vcc-social:hover { border-color: var(--mp-primary, #8C9D93); color: var(--mp-primary, #8C9D93); }\n\n/* --- badges --- */\n.vcc-badges { display: grid; gap: 18px; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }\n.vcc-badge {\n\talign-items: center;\n\tbackground: var(--mp-bg-surface, #ffffff);\n\tborder: 1px solid var(--mp-border-color, #E2E8F0);\n\tborder-radius: var(--mp-radius-md, 4px);\n\tdisplay: flex;\n\tgap: 12px;\n\tpadding: 14px 16px;\n}\n.vcc-badge .vcc-icon { flex: 0 0 auto; height: 40px; width: 40px; font-size: 17px; }\n.vcc-badge__title { color: var(--mp-text-main, #2D3748); display: block; font-weight: 600; }\n.vcc-badge__text { color: var(--mp-text-light, #94A3B8); display: block; font-size: 13px; }\n\n/* --- checklist --- */\n.vcc-checklist { list-style: none; margin: 0; padding: 0; }\n.vcc-checklist--c2 { display: grid; gap: 8px 32px; }\n.vcc-checklist__item { padding: 6px 0 6px 34px; position: relative; }\n.vcc-checklist__item::before {\n\tcolor: var(--mp-primary, #8C9D93);\n\tcontent: '\\2713';\n\tfont-weight: 700;\n\tleft: 4px;\n\tposition: absolute;\n}\n\n/* --- divider --- */\n.vcc-divider {\n\talign-items: center;\n\tdisplay: flex;\n\tjustify-content: center;\n}\n.vcc-divider--line { border-top: 1px solid var(--mp-border-color, #E2E8F0); }\n.vcc-divider__ornament { color: var(--mp-text-light, #94A3B8); font-size: 20px; letter-spacing: 6px; }\n\n/* --- seotext --- */\n.vcc-seotext {\n\tbackground: var(--mp-bg-subtle, #f8fafc);\n\tborder: 1px solid var(--mp-border-divider, #F1F5F9);\n\tborder-radius: var(--mp-radius-md, 4px);\n}\n.vcc-seotext__summary {\n\tcolor: var(--mp-text-main, #2D3748);\n\tcursor: pointer;\n\tfont-weight: 600;\n\tpadding: 14px 18px;\n}\n.vcc-seotext__summary:hover { color: var(--mp-primary, #8C9D93); }\n.vcc-seotext__body { border-top: 1px solid var(--mp-border-divider, #F1F5F9); padding: 14px 18px; }\n.vcc-seotext__body p:last-child { margin-bottom: 0; }\n\n/* --- pricing --- */\n.vcc-plans { align-items: stretch; display: grid; gap: 24px; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }\n.vcc-plan {\n\tbackground: var(--mp-bg-surface, #ffffff);\n\tborder: 1px solid var(--mp-border-color, #E2E8F0);\n\tborder-radius: var(--mp-radius-lg, 6px);\n\tdisplay: flex;\n\tflex-direction: column;\n\tpadding: 28px 24px;\n\tposition: relative;\n\ttext-align: center;\n}\n.vcc-plan--left { text-align: left; }\n.vcc-plan--featured {\n\tbackground: var(--mp-primary-light, #F2F6F4);\n\tborder-color: var(--mp-primary, #8C9D93);\n\tbox-shadow: var(--mp-shadow-md, 0 4px 12px rgba(0, 0, 0, 0.08));\n}\n.vcc-plan__flag {\n\tbackground: var(--mp-primary, #8C9D93);\n\tborder-radius: var(--mp-radius-pill, 9999px);\n\tcolor: var(--mp-text-inverse, #ffffff);\n\tfont-size: 12px;\n\tfont-weight: 600;\n\tleft: 50%;\n\tpadding: 3px 14px;\n\tposition: absolute;\n\ttop: -13px;\n\ttransform: translateX(-50%);\n}\n.vcc-plan__name { color: var(--mp-text-main, #2D3748); font-size: 18px; margin: 4px 0 10px; }\n.vcc-plan__price { color: var(--mp-text-main, #2D3748); font-size: 30px; font-weight: 700; }\n.vcc-plan__period { color: var(--mp-text-muted, #64748B); font-size: 15px; font-weight: 400; margin-left: 4px; }\n.vcc-plan__old { color: var(--mp-text-light, #94A3B8); text-decoration: line-through; }\n.vcc-plan__features { list-style: none; margin: 18px 0 22px; padding: 0; text-align: left; }\n.vcc-plan__features li { border-bottom: 1px solid var(--mp-border-divider, #F1F5F9); padding: 8px 0 8px 24px; position: relative; }\n.vcc-plan__features li::before { color: var(--mp-primary, #8C9D93); content: '\\2713'; font-weight: 700; left: 2px; position: absolute; }\n.vcc-plan__features li:last-child { border-bottom: none; }\n.vcc-plan .vcc-btn { margin-top: auto; width: 100%; }\n.vcc-plan__note { color: var(--mp-text-light, #94A3B8); font-size: 12px; margin-top: 10px; }\n\n/* --- video --- */\n.vcc-video {\n\tposition: relative;\n\twidth: 100%;\n}\n.vcc-video--16x9 { aspect-ratio: 16 / 9; }\n.vcc-video--4x3 { aspect-ratio: 4 / 3; }\n.vcc-video--1x1 { aspect-ratio: 1 / 1; }\n.vcc-video__frame,\n.vcc-video__link {\n\tborder: 0;\n\tdisplay: block;\n\theight: 100%;\n\tleft: 0;\n\tposition: absolute;\n\ttop: 0;\n\twidth: 100%;\n}\n.vcc-video__link {\n\talign-items: center;\n\tbackground: var(--mp-bg-subtle, #f8fafc);\n\tborder-radius: var(--mp-radius-md, 4px);\n\tcolor: var(--mp-text-body, #2D3748);\n\tdisplay: flex;\n\tjustify-content: center;\n\toverflow: hidden;\n\tposition: relative;\n\ttext-decoration: none;\n}\n.vcc-video__link::before { color: var(--mp-primary, #8C9D93); content: '\\25B6'; font-size: 28px; margin-right: 12px; }\n.vcc-video__caption { color: var(--mp-text-light, #94A3B8); font-size: 13px; margin: 8px 0 0; text-align: center; }\n\n/* --- columns --- */\n.vcc-columns { display: grid; gap: 32px; }\n.vcc-columns--c2 { grid-template-columns: repeat(2, 1fr); }\n.vcc-columns--c3 { grid-template-columns: repeat(3, 1fr); }\n.vcc-columns--c4 { grid-template-columns: repeat(4, 1fr); }\n.vcc-column p { margin: 0 0 12px; }\n.vcc-column p:last-child { margin-bottom: 0; }\n\n/* --- \u0410\u0434\u0430\u043f\u0442\u0438\u0432: \u043e\u0434\u0438\u043d \u043f\u0430\u0442\u0442\u0435\u0440\u043d, \u0441\u0435\u0442\u043a\u0438 \u0441\u0445\u043b\u043e\u043f\u044b\u0432\u0430\u044e\u0442\u0441\u044f \u0432 \u043a\u043e\u043b\u043e\u043d\u043a\u0443 --- */\n@media (max-width: 767px) {\n\t.vcc-hero__title { font-size: 31px; }\n\t.vcc-features--c2, .vcc-features--c3, .vcc-features--c4,\n\t.vcc-media-text, .vcc-reviews--c2, .vcc-reviews--c3,\n\t.vcc-columns--c2, .vcc-columns--c3, .vcc-columns--c4,\n\t.vcc-ba--c2, .vcc-ba--c3, .vcc-ba--c4 {\n\t\tgrid-template-columns: 1fr;\n\t}\n\t.vcc-media-text--flip .vcc-media-text__media { order: 0; }\n\t.vcc-media-text--flip .vcc-media-text__body { order: 0; }\n\t.vcc-section--pad-s { padding: 36px 0; }\n\t.vcc-section--pad-m { padding: 52px 0; }\n\t.vcc-section--pad-l { padding: 64px 0; }\n\t.vcc-section--pad-xl { padding: 80px 0; }\n}\n\n/* --- \u0422\u0451\u043c\u043d\u0430\u044f \u0442\u0435\u043c\u0430: \u0440\u043e\u0432\u043d\u043e \u0434\u0432\u0430 \u0430\u0434\u0434\u0438\u0442\u0438\u0432\u043d\u044b\u0445 \u043e\u0432\u0435\u0440\u0440\u0430\u044f (\u0441\u043f\u0435\u043a\u0430 \u00a74.4) --- */\n[data-theme=\"dark\"] .vcc-plan--featured { background: var(--mp-bg-hover, #38343E); }\n[data-theme=\"dark\"] .vcc-section--overlay::before { background: rgba(0, 0, 0, 0.65); }";

window.VCC_LAYOUT_PRESETS = [{"type": "vita-constructor-project", "contract": "vcc-v1", "layoutTitle": "Статья-гид", "layoutDesc": "Гид покупателя: оглавление, нумерованный список, цитата, табы сравнения материалов и финальная врезка со ссылкой-соглашением.", "layoutIcon": "fa-file-text-o", "title": "Статья: как выбрать товар", "slug": "guide", "themeMode": "light", "theme": {"preset": null, "tokens": null}, "blocks": [{"id": "a1", "type": "heading", "data": {"level": "2", "text": "Как выбрать первый товар для дома: гид покупателя"}}, {"id": "a2", "type": "paragraph", "data": {"text": "Разбираемся, на что смотреть при выборе, чем отличаются материалы и почему цена не всегда показатель качества. Гид подойдёт и новичкам, и тем, кто уже сталкивался с неудачной покупкой."}}, {"id": "a3", "type": "toc", "data": {"title": "В этом гиде"}}, {"id": "a4", "type": "heading", "data": {"level": "3", "text": "Три признака качественного товара"}}, {"id": "a5", "type": "list", "data": {"ordered": true, "items": "Материал: смотрите плотность и состав на ярлыке\nФурнитура: швы, молнии и крепления без люфта\nДокументы: гарантийный талон и сертификат в комплекте"}}, {"id": "a6", "type": "quote", "data": {"text": "Дешёвый товар часто оказывается дорогим: его приходится менять каждый сезон.", "author": "Команда магазина «Вита»"}}, {"id": "a7", "type": "heading", "data": {"level": "3", "text": "Материалы: сравнение"}}, {"id": "a8", "type": "tabs", "data": {"tabs": [{"title": "Хлопок", "content": "Дышащий и гипоаллергенный. Минус — мнётся, требует глажки.\n\n- плотность от 200 г/м²\n- сатин прочнее бязи"}, {"title": "Лён", "content": "Прочный, становится мягче после стирок. Дороже хлопка, служит годами."}, {"title": "Микрофибра", "content": "Недорого и практично, не мнётся. Хуже пропускает воздух — не для жарких спален."}]}}, {"id": "a9", "type": "alert", "data": {"style": "success", "text": "Готовы к покупке? Откройте **каталог** и фильтруйте товары по материалу — [к правилам возврата](agree:3)."}}]}, {"type": "vita-constructor-project", "contract": "vcc-v1", "layoutTitle": "Страница FAQ", "layoutDesc": "Готовая страница вопросов и ответов: живой FAQ-модуль магазина по спец-метке [vita_faq] и контактная врезка. Вопросы и ответы редактируются в админке, страница их просто выводит.", "layoutIcon": "fa-question-circle-o", "title": "Частые вопросы", "slug": "faq", "themeMode": "light", "theme": {"preset": null, "tokens": null}, "blocks": [{"id": "f1", "type": "heading", "data": {"level": "2", "text": "Частые вопросы и ответы"}}, {"id": "f2", "type": "paragraph", "data": {"text": "Собрали ответы на то, что спрашивают чаще всего. Не нашли свой вопрос — напишите нам, контакты в конце страницы."}}, {"id": "f3", "type": "vita_faq", "data": {"faqId": 0, "title": ""}}, {"id": "f4", "type": "alert", "data": {"style": "info", "text": "Не нашли ответ? Позвоните: **+7 (900) 000-00-00** — или напишите на sale@example.com."}}]}, {"type": "vita-constructor-project", "contract": "vcc-v1", "layoutTitle": "Лендинг услуги", "layoutDesc": "Продающая страница: обложка, преимущества, шаги, тарифы, отзывы и форма заявки", "layoutIcon": "fa-rocket", "title": "Лендинг услуги", "slug": "landing", "themeMode": "light", "theme": {"preset": null, "tokens": null}, "blocks": [{"id": "b1", "type": "hero", "data": {"title": "Профессиональный монтаж кондиционеров за ==один день==", "sub": "Замер, подбор модели и установка под ключ — с гарантией три года и обслуживанием после сдачи.", "btn1_label": "Рассчитать стоимость", "btn1_url": "form:0", "btn2_label": "Как мы работаем", "btn2_url": "#shagi", "note": "Гарантия по договору · Более 2 500 установок", "align": "center", "sec": {"bg": "image", "image": "", "overlay": true, "padding": "xl", "width": "default", "anchor": "start", "eyebrow": "", "title": "", "text": "", "align": "center"}}}, {"id": "b2", "type": "badges", "data": {"sec": {"bg": "surface", "padding": "s", "width": "default", "eyebrow": "", "title": "", "text": "", "align": "center"}, "items": [{"icon": "credit-card", "title": "Удобная оплата", "text": "Картой, наличными или по счёту"}, {"icon": "truck", "title": "Доставка и монтаж", "text": "Приезжаем в день заявки"}, {"icon": "shield", "title": "Гарантия 3 года", "text": "Сервисное обслуживание"}]}}, {"id": "b3", "type": "features", "data": {"sec": {"eyebrow": "Почему мы", "title": "Монтаж, о котором не придётся жалеть", "text": "", "align": "center", "bg": "light", "padding": "l", "width": "default", "image": "", "video": "", "overlay": false, "anchor": ""}, "cols": "3", "items": [{"icon": "clock-o", "title": "За один день", "text": "Приезжаем с оборудованием и завершаем монтаж за один визит — без «доделаем потом»."}, {"icon": "shield", "title": "Гарантия 3 года", "text": "Работаем по договору, даём письменную гарантию на монтаж и материалы."}, {"icon": "wrench", "title": "Чистая работа", "text": "Штробы с пылесосом, уборка после установки — квартира остаётся чистой."}]}}, {"id": "b4", "type": "steps", "data": {"sec": {"eyebrow": "Как это работает", "title": "Три шага до прохлады", "text": "", "align": "left", "bg": "none", "padding": "l", "width": "default", "image": "", "video": "", "overlay": false, "anchor": "shagi"}, "style": "timeline", "items": [{"title": "Заявка", "text": "Оставьте заявку или позвоните — согласуем удобное время замера."}, {"title": "Замер и смета", "text": "Инженер приезжает с образцами, подбирает модель и называет точную цену."}, {"title": "Монтаж", "text": "Устанавливаем за один день, показываем, как пользоваться, и убираем за собой."}]}}, {"id": "b5", "type": "pricing", "data": {"sec": {"eyebrow": "Тарифы", "title": "Выберите подходящий", "text": "", "align": "center", "bg": "light", "padding": "l", "width": "default", "image": "", "video": "", "overlay": false, "anchor": "tarify"}, "align": "center", "items": [{"name": "Базовый", "price": "от 9 900 ₽", "period": "", "old_price": "", "features": "Монтаж стандартной сплит-системы\nТрасса до 3 метров\nПусконаладка", "featured": false, "flag_label": "Рекомендуем", "btn_label": "Заказать", "btn_url": "form:0", "note": ""}, {"name": "Стандарт", "price": "от 14 900 ₽", "period": "", "old_price": "17 400 ₽", "features": "Всё из «Базового»\nТрасса до 5 метров\nДекоративный короб", "featured": true, "flag_label": "Рекомендуем", "btn_label": "Заказать", "btn_url": "form:0", "note": ""}, {"name": "Премиум", "price": "по запросу", "period": "", "old_price": "", "features": "Всё из «Стандарта»\nСкрытая трасса любой длины\nОбслуживание первый год", "featured": false, "flag_label": "Рекомендуем", "btn_label": "Обсудить", "btn_url": "form:0", "note": ""}]}}, {"id": "b6", "type": "reviews", "data": {"sec": {"eyebrow": "Отзывы", "title": "Что говорят клиенты", "text": "", "align": "center", "bg": "surface", "padding": "l", "width": "default", "image": "", "video": "", "overlay": false, "anchor": ""}, "cols": "3", "items": [{"text": "Приехали в тот же день, к вечеру уже работало. Убрали за собой идеально — даже пыли не осталось.", "name": "Ольга", "role": "квартира, новостройка", "stars": 5, "avatar": ""}, {"text": "Смета совпала с обещанной по телефону до рубля. По договору — три года гарантии, все бумаги на руках.", "name": "Сергей", "role": "частный дом", "stars": 5, "avatar": ""}, {"text": "Заказывали три кондиционера в офис. Уложились в один день, всё чисто и без лишнего шума.", "name": "Марина", "role": "офис компании", "stars": 4, "avatar": ""}]}}, {"id": "b7", "type": "cta", "data": {"sec": {"eyebrow": "", "title": "Готовы к лету?", "text": "", "align": "center", "bg": "primary", "padding": "l", "width": "narrow", "image": "", "video": "", "overlay": false, "anchor": ""}, "text": "Оставьте заявку — перезвоним в течение рабочего дня, ответим на вопросы и рассчитаем точную стоимость.", "btn1_label": "Оставить заявку", "btn1_url": "form:0", "btn2_label": "", "btn2_url": ""}}, {"id": "b8", "type": "vita_form", "data": {"formId": 0}}, {"id": "b9", "type": "seotext", "data": {"sec": {"bg": "none", "padding": "m", "width": "narrow", "align": "left", "eyebrow": "", "title": "", "text": "", "image": "", "video": "", "overlay": false, "anchor": ""}, "title": "Подробнее о монтаже кондиционеров", "text": "Монтаж кондиционера начинается с правильного подбора мощности: избыточная модель будет часто отключаться, недостаточная — работать на пределе. Инженер учитывает площадь, высоту потолков, сторону света и назначение помещения.\n\nСама установка включает прокладку фреоновой трассы, монтаж наружного блока с учётом шума и правил УК, подключение питания и пусконаладку. После сдачи мы показываем, как обслуживать фильтры, и остаёмся на связи для сервисного визита.", "open": false}}]}, {"type": "vita-constructor-project", "contract": "vcc-v1", "layoutTitle": "Обзор товара", "layoutDesc": "Структура обзора: вступление, оглавление, секции с подзаголовками, таблица характеристик, совет-врезка и живой FAQ-модуль магазина по спец-метке.", "layoutIcon": "fa-star-o", "title": "Обзор товара", "slug": "product-review", "themeMode": "light", "theme": {"preset": null, "tokens": null}, "blocks": [{"id": "p1", "type": "heading", "data": {"level": "2", "text": "Обзор: умные часы **Vita Watch 2**"}}, {"id": "p2", "type": "paragraph", "data": {"text": "Vita Watch 2 — обновлённая модель с автономностью до 14 дней и корпусом из медицинской стали. В этом обзоре разбираем экран, датчики и время работы, сравниваем с прошлым поколением и отвечаем на частые вопросы.\n\nПроект создан в **конструкторе Виты** и собран из готового макета — отредактируйте его под свой товар."}}, {"id": "p3", "type": "toc", "data": {"title": "Содержание"}}, {"id": "p4", "type": "heading", "data": {"level": "3", "text": "Экран и корпус"}}, {"id": "p5", "type": "paragraph", "data": {"text": "AMOLED-экран 1,43\" с яркостью до 1000 нит читается на солнце. Корпус защищён по стандарту *5 ATM* — плавать в часах можно, душ и бассейн им не страшны."}}, {"id": "p6", "type": "image", "data": {"path": "image/catalog/watch-angle.jpg", "caption": "Vita Watch 2, вид сбоку — толщина 10,9 мм"}}, {"id": "p7", "type": "heading", "data": {"level": "3", "text": "Характеристики"}}, {"id": "p8", "type": "table", "data": {"headers": "Параметр\nЗначение", "rows": "Экран\nAMOLED 1,43\", 466×466\nАвтономность\nдо 14 дней\nЗащита\n5 ATM\nВес\n38 г"}}, {"id": "p9", "type": "alert", "data": {"style": "info", "text": "Совет: для уведомлений на русском включите шрифт таблиц в настройках приложения часов."}}, {"id": "p10", "type": "heading", "data": {"level": "3", "text": "Частые вопросы"}}, {"id": "p11", "type": "vita_faq", "data": {"faqId": 0, "title": ""}}]}];

/* ============================================================
Вита — Конструктор контента · core/tokens.js
Контракт vcc-v1: токены --mp-* (палитра Виты) + маппинг
настроек пресета темы (theme_vita_color_*) на эти токены.
Значения по умолчанию — дефолтная палитра vita.css (:root / [data-theme=dark]).
============================================================ */
'use strict';

var VCC_CONTRACT = 'vcc-v1';
/* Единственный источник версии — билдер (build/build.py, APP_VERSION):
 * он вшивает window.VCC_APP_VERSION до подключения модулей. Локальный
 * фолбэк — только для запуска модулей вне бандла (смоуки, дампер паспорта). */
var VCC_APP_VERSION = (typeof window !== 'undefined' && window.VCC_APP_VERSION) || '0.8.1';

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

	/* Ширина контейнера контента — из настроек темы (Дизайн и стили →
	 * «Ширина сайта»). Дефолт совпадает с vars_css.php (wide = 1640px). */
	'--vita-container-max': '1640px',

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
var VCC_CATALOG_DEFAULT = { faqGroups: [], forms: [], visualBlocks: [], productBlocks: [], walls: [], testimonials: [] };

function vccNormalizeCatalog(raw) {
	var out = { faqGroups: [], forms: [], visualBlocks: [], productBlocks: [], walls: [], testimonials: [] };
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
	/* Отзывы о магазине (0.9.2): каталог для пикера [vita_testimonial].
	 * count несёт рейтинг (1-5) — он же подпись в селекте. */
	out.testimonials = clean(raw.testimonials);
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
		/* Геометрические ключи обрабатываются своими ветками ниже и
		 * в цветовую карту VCC_PRESET_MAP не входят. */
		var isGeometry = key === 'theme_vita_border_radius' || key === 'theme_vita_container_width';
		var mapped = isGeometry ? key : VCC_PRESET_MAP[key];
		if (!mapped) continue;
		var value = String(tokensObj[key]).trim();
		/* Радиус приходит числом в px: 0..24. Формула — ровно как в
		 * vars_css.php темы: sm = round(n*0.5), md = n, lg = round(n*1.5). */
		if (key === 'theme_vita_border_radius') {
			var n = parseInt(value, 10);
			if (isNaN(n)) continue;
			n = Math.max(0, Math.min(24, n));
			out['--mp-radius-sm'] = Math.round(n * 0.5) + 'px';
			out['--mp-radius-md'] = n + 'px';
			out['--mp-radius-lg'] = Math.round(n * 1.5) + 'px';
			continue;
		}
		/* Ширина контейнера: строковый ключ из настроек темы. Тема
		 * (vars_css.php) превращает его в --vita-container-max; здесь —
		 * та же таблица, чтобы предпросмотр и экспорт совпадали с витриной. */
		if (key === 'theme_vita_container_width') {
			var widths = {
				compact: '1210px',
				optimal: '1400px',
				wide: '1640px',
				fluid: '100%'
			};
			if (Object.prototype.hasOwnProperty.call(widths, value)) {
				out['--vita-container-max'] = widths[value];
			}
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
Вита — Конструктор контента · core/passport.js
Паспорт возможностей конструктора: генерируется из ЖИВОГО
BlockRegistry при загрузке — не пишется руками и не устаревает.

Три экспортные функции:
  - buildPassportMd()  — полный документ (docs/CONSTRUCTOR-PASSPORT.md,
    кнопка «Скачать паспорт»);
  - buildPrompt(donor, wishes) — промт-конверт для любого AI с
    веб-доступом (конструктор сам ничего не читает и никуда не ходит);
  - extractJson(text) — мягкая починка ответа AI: срез markdown-забора,
    извлечение JSON из текста, починка висячих запятых, человеческие
    ошибки (unknown-тип → ближайшее имя из реестра).
============================================================ */
'use strict';

var VccPassport = (function () {

	/* ---------- Человекочитаемые описания блоков ---------- */
	var DESC = {
		heading: 'Заголовок статьи (H2–H4). H1 конструктор ставит сам только в блоке hero.',
		paragraph: 'Абзац текста с инлайн-разметкой.',
		list: 'Маркированный или нумерованный список, один пункт на строку.',
		quote: 'Цитата с необязательным автором.',
		alert: 'Цветная врезка-акцент: info/success/warning/danger.',
		tabs: 'Вкладки: массив { title, content }.',
		table: 'Таблица: строка заголовков и строки данных, ячейки через перенос строки.',
		image: 'Картинка из медиатеки (image/catalog/...) с подписью.',
		toc: 'Оглавление по заголовкам статьи — собирается автоматически.',
		hero: 'Первый экран лендинга: H1, подзаголовок, до двух кнопок, строка доверия.',
		logos: 'Полоса логотипов партнёров/клиентов.',
		features: 'Сетка карточек-преимуществ с иконками (2–4 колонки).',
		media_text: 'Картинка + текст рядом, кнопка, картинка может стоять справа (flip).',
		steps: 'Шаги процесса: numbers (номера) или timeline (вертикальная линия).',
		stats: 'Полоса цифр-показателей: { value, suffix, label }.',
		reviews: 'Карточки отзывов: текст, имя, роль, звёзды 0–5, аватар.',
		team: 'Команда: фото, имя, роль, описание.',
		documents: 'Сетка документов/сертификатов: картинка-превью + название.',
		cta: 'Финальный призыв к действию: заголовок, текст, до двух кнопок.',
		contacts: 'Список контактов: { icon, label, value, url }.',
		socials: 'Кнопки-ссылки соцсетей: { icon, url, label }.',
		badges: 'Плашки доверия с иконкой: { icon, title, text }.',
		checklist: 'Список с галочками, пункты — инлайн-разметка.',
		divider: 'Разделитель: отступ / линия / орнамент.',
		seotext: 'Сворачиваемый SEO-текст: заголовок + большой текст.',
		pricing: 'Карточки тарифов: цена, старая цена, пункты-фичи, флаг «Рекомендуем», кнопка.',
		columns: 'Колонки произвольного текста (2–4).',
		video: 'Видео с YouTube/Vimeo/Rutube: ссылка или iframe-код сервиса.',
		vita_faq: 'Живой FAQ магазина: аккордеон из модуля «Вита — FAQ» + SEO-разметка. faqId 0 — все активные группы. Можно задать секцию (фон/отступы/якорь) — блок обернётся в vcc-section.',
		vita_form: 'Живая форма магазина (модуль «Вита — Формы»). formId 0 — блок не экспортируется. Можно задать секцию (фон/отступы/якорь) — блок обернётся в vcc-section.',
		vita_visual: 'Готовый визуальный блок модуля «Вита — Визуальные блоки» по ID. Можно задать секцию (фон/отступы/якорь).',
		vita_all_in_one: 'Блок модуля «Вита — Универсальные блоки товаров» по ID. Можно задать секцию (фон/отступы/якорь).',
		vita_extra_wall: 'Стена категорий/брендов модуля «Вита — Стена» по ID. Можно задать секцию (фон/отступы/якорь).',
		vita_html: 'Сырой HTML строго в whitelist санитайзера темы — используйте в последнюю очередь. Можно задать секцию (фон/отступы/якорь).'
	};

	var GROUP_TITLES = {
		landing: 'Секции лендинга',
		text: 'Текстовые блоки',
		modules: 'Живые модули магазина (спец-метки)'
	};
	var GROUP_ORDER = ['landing', 'text', 'modules'];

	var FIELD_TYPE_LABEL = {
		text: 'строка',
		textarea: 'текст (многострочный',
		select: 'одно из значений',
		checkbox: 'булево (true/false)',
		tabs_editor: 'массив { title, content }',
		rows_editor: 'массив объектов'
	};

	/* ---------- Утилиты ---------- */
	function esc(s) {
		return String(s == null ? '' : s)
			.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}

	function describeField(f) {
		var desc;
		if (f.type === 'select') {
			var opts = (f.options || []).map(function (o) { return o[0]; }).join(' | ');
			desc = FIELD_TYPE_LABEL.select + ': ' + opts;
		} else if (f.type === 'tabs-editor') {
			desc = FIELD_TYPE_LABEL.tabs_editor;
		} else if (f.type === 'rows-editor') {
			var keys = (f.itemFields || []).map(function (it) { return it.key; }).join(', ');
			desc = FIELD_TYPE_LABEL.rows_editor + ' { ' + keys + ' }';
		} else if (f.type === 'checkbox') {
			desc = FIELD_TYPE_LABEL.checkbox;
		} else if (f.markdown) {
			desc = 'текст с инлайн-разметкой (**жирный**, *курсив*, [текст](url), [кнопка](form:N), [соглашение](agree:N), ==акцент==, `код`)';
		} else {
			desc = FIELD_TYPE_LABEL[f.type] || f.type;
		}
		if (f.type === 'textarea' && f.markdown) desc = 'многострочный ' + desc;
		return desc;
	}

	function fieldsOf(def) {
		var raw = typeof def.fields === 'function' ? def.fields() : (def.fields || []);
		return raw.filter(function (f) { return f && f.key; });
	}

	/* Пример блока: дефолты реестра, дополненные до реалистичного вида.
	   Секционные блоки получают полный набор полей sec; ID-шники модулей
	   показываются единицами (0 = «не экспортируется» — в примере бесполезен). */
	function blockExample(type) {
		var def = BlockRegistry.get(type);
		if (!def) return null;
		var data = JSON.parse(JSON.stringify(def.defaults || {}));
		if (data.sec && typeof data.sec === 'object') {
			data.sec = mergeSec(data.sec);
		}
		if (type === 'vita_form' || type === 'vita_visual' || type === 'vita_all_in_one' || type === 'vita_extra_wall') {
			data[type === 'vita_form' ? 'formId' : 'blockId'] = 1;
		}
		return { id: 'b1', type: type, data: data };
	}

	function mergeSec(sec) {
		return {
			eyebrow: sec.eyebrow || '',
			title: sec.title || '',
			text: sec.text || '',
			align: sec.align || 'left',
			bg: sec.bg || 'none',
			image: sec.image || '',
			video: sec.video || '',
			overlay: !!sec.overlay,
			padding: sec.padding || 'l',
			width: sec.width || 'default',
			anchor: sec.anchor || ''
		};
	}

	var SEC_FIELDS = [
		'eyebrow — надзаголовок (короткая строка над заголовком)',
		'title — заголовок секции',
		'text — подзаголовок секции',
		'align — left | center',
		'bg — фон: none | light | surface | primary | image | video',
		'image — путь картинки фона (для bg=image), image/catalog/...',
		'video — ссылка фонового видео (для bg=video)',
		'overlay — true: затемнение поверх фона (обязательно для читаемости текста на bg=image/video)',
		'padding — вертикальные отступы: s | m | l | xl',
		'width — ширина контента: narrow | default | full',
		'anchor — якорь латиницей для ссылок #anchor'
	].join(';\n');

	/* ---------- Расстояние Дамерау—Левенштейна (для подсказок) ---------- */
	function damLev(a, b) {
		a = String(a); b = String(b);
		var m = a.length, n = b.length;
		if (!m) return n;
		if (!n) return m;
		var d = [], i, j;
		for (i = 0; i <= m; i++) { d[i] = [i]; }
		for (j = 0; j <= n; j++) { d[0][j] = j; }
		for (i = 1; i <= m; i++) {
			for (j = 1; j <= n; j++) {
				var cost = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
				d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
				if (i > 1 && j > 1 && a.charAt(i - 1) === b.charAt(j - 2) && a.charAt(i - 2) === b.charAt(j - 1)) {
					d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
				}
			}
		}
		return d[m][n];
	}

	function nearestType(name, known) {
		var best = null, bestD = Infinity;
		var low = String(name).toLowerCase();
		for (var i = 0; i < known.length; i++) {
			var d = damLev(low, known[i].toLowerCase());
			if (d < bestD) { bestD = d; best = known[i]; }
		}
		return { type: best, distance: bestD };
	}

	/* Латиница → кириллица по символам: модели часто пишут типы транслитом
	   («tarifs» вместо label «Тарифы»). Посимвольного отображения достаточно
	   для расстояния Дамерау—Левенштейна. */
	var TRANSLIT = { a: 'а', b: 'б', c: 'ц', d: 'д', e: 'е', f: 'ф', g: 'г', h: 'х', i: 'и', j: 'й', k: 'к', l: 'л', m: 'м', n: 'н', o: 'о', p: 'п', q: 'к', r: 'р', s: 'с', t: 'т', u: 'у', v: 'в', w: 'в', x: 'х', y: 'ы', z: 'з' };
	function translitRu(s) {
		return String(s).toLowerCase().replace(/[a-z]/g, function (ch) { return TRANSLIT[ch] || ch; });
	}

	/* Подсказка ближайшего блока: три слоя, берём лучший.
	   1. Посимвольное расстояние: ввод vs type/label (как есть + транслит)
	      — ловит опечатки латиницей («herо», «tarifs»).
	   2. Слово-по-слову: слово ввода совпало со словом label или псевдонима
	      — ловит русские описания, которые посимвольно далеко
	      («о компании» → media_text «Картинка + текст» с дефолтом
	      «О компании в двух словах»; «вопросы» → vita_faq).
	   3. Слова псевдонимов — надёжные синонимы из практики моделей,
	      в label не попавшие. */
	var ALIASES = {
		hero: ['обложка', 'шапка страницы', 'первый экран', 'баннер', 'hero'],
		heading: ['заголовок', 'подзаголовок', 'заголовок раздела'],
		paragraph: ['абзац', 'параграф', 'описание', 'текстовый блок'],
		list: ['список', 'перечисление', 'маркеры'],
		quote: ['цитата', 'цитата в тексте'],
		alert: ['внимание', 'важно', 'предупреждение', 'заметка', 'врезка'],
		tabs: ['вкладки', 'табы', 'переключаемые секции'],
		table: ['таблица', 'сравнение', 'табличные данные'],
		image: ['картинка', 'изображение', 'фото', 'иллюстрация'],
		toc: ['оглавление', 'содержание'],
		divider: ['разделитель', 'линия'],
		features: ['преимущества', 'фичи', 'почему мы', 'особенности', 'features', 'benefits'],
		logos: ['логотипы', 'партнёры', 'клиенты', 'бренды', 'brands', 'clients'],
		media_text: ['о компании', 'картинка с текстом', 'изображение с текстом', 'о нас', 'о магазине', 'about', 'about us'],
		steps: ['шаги', 'этапы', 'как мы работаем', 'таймлайн', 'процесс', 'process', 'how it works'],
		stats: ['цифры', 'факты', 'статистика', 'показатели', 'цифры и факты', 'metrics', 'numbers'],
		reviews: ['отзывы', 'рекомендации клиентов', 'отзывы клиентов', 'testimonials', 'review'],
		team: ['команда', 'сотрудники', 'специалисты', 'team'],
		documents: ['документы', 'сертификаты', 'лицензии'],
		cta: ['призыв', 'призыв к действию', 'кнопка действия', 'подписка', 'заказать', 'subscribe'],
		contacts: ['контакты', 'контактная информация', 'связаться', 'адрес и телефон', 'контакт', 'contacts', 'contact us', 'контакты и адрес'],
		socials: ['соцсети', 'социальные сети', 'мессенджеры'],
		badges: ['бейджи', 'доверие', 'гарантии', 'бейджи доверия'],
		checklist: ['чек-лист', 'чеклист', 'что входит', 'проверенный список'],
		seotext: ['seo текст', 'сео текст', 'скрытый текст', 'спойлер'],
		pricing: ['тарифы', 'цены', 'прайс', 'планы', 'тарифы и цены'],
		columns: ['колонки', 'колонки текста', 'две колонки', 'три колонки'],
		video: ['видео', 'ролик', 'видеоролик', 'плеер'],
		vita_html: ['html темы', 'произвольный html', 'свой html'],
		vita_faq: ['faq', 'вопросы и ответы', 'вопросы', 'ответы на вопросы', 'часто задаваемые вопросы', 'questions'],
		vita_form: ['форма', 'форма заявки', 'форма обратной связи', 'форма связи', 'form', 'заявка'],
		vita_visual: ['слайдер', 'баннеры', 'визуальные блоки', 'lookbook', 'реклама', 'рекламные баннеры'],
		vita_all_in_one: ['товары', 'товарный блок', 'каталог товаров', 'универсальные блоки товаров', 'витрина товаров'],
		vita_extra_wall: ['стена категорий', 'категории и бренды', 'стена магазина']
	};

	function splitWords(s) {
		return String(s).toLowerCase().replace(/[^\sа-яёa-z0-9-]/gi, ' ').split(/\s+/).filter(function (w) { return w.length >= 3; });
	}

	function aliasFor(type) {
		return ALIASES[type] || [];
	}

	/* Слово-матч: слово ввода vs слова label/псевдонимов.
	   Возвращаем лучший штраф (0 при точном слове, иначе посимвольная цена
	   опечатки внутри слова ≤2, морфология — через общий префикс) и покрытие —
	   сколько слов ввода совпало точно (для tie-break при равном штрафе). */
	function wordMatchScore(inputWords, targetWords) {
		var best = Infinity, hits = 0;
		inputWords.forEach(function (iw) {
			var wordBest = Infinity;
			targetWords.forEach(function (tw) {
				if (iw === tw) wordBest = Math.min(wordBest, 0);
				else {
					var d = damLev(iw, tw);
					if (d <= 2 && d < wordBest) wordBest = d;
					/* Префикс: «вопросы» vs «вопрос», «контакты» vs «контакт» —
					   русская морфология. Порог высокий: общий префикс ≥5 букв
					   и ≥ половины короткого слова («табл...» vs «табы» не пройдёт). */
					var shared = 0;
					var minLen = Math.min(iw.length, tw.length);
					while (shared < minLen && iw.charAt(shared) === tw.charAt(shared)) shared++;
					if (shared >= 5 && shared * 2 >= minLen && wordBest > 1) wordBest = Math.min(wordBest, 1);
				}
			});
			if (wordBest === 0) hits++;
			best = Math.min(best, wordBest);
		});
		return { score: best, hits: hits };
	}

	/* Подсказка ближайшего блока: сравниваем ввод с type И русским label,
	   в обоих написаниях (как есть + транслит), плюс слово-матч по label
	   и псевдонимам — берём минимальный штраф. */
	function nearestSuggestion(name) {
		var low = String(name).toLowerCase();
		var variants = [low, translitRu(low)];
		/* Слова в двух написаниях: латиница моделей («forma», «otzyvy»)
		   и её транслит — иначе слово-матч не видит русских псевдонимов. */
		var inputWords = splitWords(low);
		var inputWordsRu = splitWords(translitRu(low));
		var best = null, bestD = Infinity, bestHits = -1;
		BlockRegistry.getList().forEach(function (def) {
			var targets = [def.type.toLowerCase()];
			if (def.label) targets.push(String(def.label).toLowerCase());
			/* Слой 1+2: посимвольно по type и label */
			var score = Infinity, hits = 0;
			variants.forEach(function (v) {
				targets.forEach(function (t) {
					score = Math.min(score, damLev(v, t));
				});
			});
			/* Слой 3: слово-матч по label и псевдонимам — русские описания
			   («о компании» → media_text), где посимвольно далеко до всего. */
			if (inputWords.length || inputWordsRu.length) {
				var wordTargets = aliasFor(def.type).slice();
				if (def.label) wordTargets.push(String(def.label));
				var targetWords = splitWords(wordTargets.join(' '));
				var m = wordMatchScore(inputWords, targetWords);
				if (inputWordsRu.length) {
					var mRu = wordMatchScore(inputWordsRu, targetWords);
					if (mRu.score < m.score || (mRu.score === m.score && mRu.hits > m.hits)) m = mRu;
				}
				if (m.score < score || (m.score === score && m.hits > hits)) { score = m.score; hits = m.hits; }
			}
			/* Равный штраф выигрывает большее покрытие точными словами:
			   «seo текст» → seotext (2 слова), а не paragraph (1 слово «текст»). */
			if (score < bestD || (score === bestD && hits > bestHits)) {
				bestD = score; bestHits = hits; best = def.type;
			}
		});
		return { type: best, distance: bestD };
	}

	/* ---------- Реестр в текст ---------- */
	function orderedGroups() {
		var seen = {}, groups = [];
		BlockRegistry.getList().forEach(function (def) {
			var g = def.group || 'other';
			if (!seen[g]) { seen[g] = true; groups.push(g); }
		});
		groups.sort(function (a, b) {
			var ia = GROUP_ORDER.indexOf(a), ib = GROUP_ORDER.indexOf(b);
			if (ia === -1) ia = 99; if (ib === -1) ib = 99;
			return ia - ib || String(a).localeCompare(String(b));
		});
		return groups;
	}

	/* withExamples: полный паспорт (документация) — с примером на каждый блок;
	   в промт идёт компактный реестр без примеров (пример каркаса один). */
	function registryMd(withExamples) {
		var out = [];
		orderedGroups().forEach(function (g) {
			out.push('### ' + (GROUP_TITLES[g] || 'Блоки: ' + g));
			out.push('');
			BlockRegistry.getList().forEach(function (def) {
				if ((def.group || 'other') !== g) return;
				out.push('#### ' + def.type + ' — ' + def.label);
				if (DESC[def.type]) out.push(DESC[def.type]);
				var fields = fieldsOf(def);
				if (fields.length) {
					out.push('Поля data:');
					var secMentioned = false;
					fields.forEach(function (f) {
						/* sec и sec.* — один указатель на блок вместо 11 строк-дублей:
						 * состав полей секции документирован в «Общие поля секции» */
						if (f.key === 'sec' || f.key.indexOf('sec.') === 0) {
							if (!secMentioned) {
								out.push('- `sec` — общие поля секции (см. «Общие поля секции» выше)');
								secMentioned = true;
							}
							return;
						}
						out.push('- `' + f.key + '` — ' + describeField(f));
					});
				} else {
					out.push('Поля: нет (только `sec`).');
				}
				if (withExamples) {
					var ex = blockExample(def.type);
					if (ex) out.push('Пример:\n```json\n' + JSON.stringify(ex) + '\n```');
				}
				out.push('');
			});
		});
		return out.join('\n');
	}

	var RULES_MD = [
		'1. Ровно один H1 на страницу — только в блоке hero. Остальные заголовки: heading H2/H3/H4 или заголовки секций (sec.title).',
		'2. Тексты — короткие заглушки-намёки по мотивам донора (ремикс, НЕ дословное копирование чужого контента). Русский язык.',
		'3. Цвета, шрифты и отступы НЕ указываются — их задаёт палитра магазина. Никакого HTML, CSS, JavaScript и hex-цветов в текстах.',
		'4. Якоря секций (sec.anchor) — латиницей, без пробелов.',
		'5. Ссылки: https://..., #якорь, form:N (открыть форму магазина), agree:N (страница соглашения). form:N и ID модулей (faqId/formId/blockId) ставь ТОЛЬКО если пользователь попросил в пожеланиях; иначе оставь 0.',
		'6. Объём: 6–12 блоков. Структура донора важнее его наполнения: порядок и смысл секций, не их количество.',
		'7. Не выдумывай типы блоков: только перечисленные в реестре. Если для части донора нет подходящего блока — просто опусти её.',
		'8. Иконки — FontAwesome 4 имена без префикса fa- (truck, shield, clock-o...).'
	].join('\n');

	var ANSWER_FORMAT_MD = [
		'ФОРМАТ ОТВЕТА (строго):',
		'Верни ТОЛЬКО JSON-объект проекта, без markdown-забора ``` и без пояснений до или после:',
		'{',
		'  "type": "vita-constructor-project",',
		'  "contract": "vcc-v1",',
		'  "slug": "латинский-slug",',
		'  "themeMode": "light",',
		'  "blocks": [ { "id": "b1", "type": "…", "data": { … } } ]',
		'}',
		'Поля id/theme/themeMode можно опустить — конструктор достроит их сам. Обязательны: type блока и data.'
	].join('\n');

	var ENVELOPE_MD = [
		'КАРКАС ПРОЕКТА (JSON):',
		'- type: "vita-constructor-project" (обязателен)',
		'- contract: "vcc-v1" (обязателен)',
		'- slug — латинский slug для имени файла (title устарел и не нужен)',
		'- themeMode: "light" | "dark" (режим предпросмотра)',
		'- blocks — упорядоченный массив блоков: { id: String, type: String (из реестра), data: Object }'
	].join('\n');

	function passportHeader() {
		return [
			'# Паспорт возможностей — Вита · Конструктор контента',
			'',
			'Версия конструктора: ' + VCC_APP_VERSION + ' · контракт: ' + VCC_CONTRACT,
			'Документ сгенерирован из реестра блоков при сборке — ручные правки будут затёрты (tools/dump_passport.js).',
			'',
			'Этот документ — полное описание того, что умеет конструктор. Он же входит в промт',
			'режима «Создать по донору»: вставьте его в любой AI с доступом в веб вместе со ссылкой',
			'на страницу-донор — и получите JSON-проект, который конструктор соберёт в лендинг.'
		].join('\n');
	}

	var INSTRUCTIONS_MD = [
		'## Инлайн-разметка текстов',
		'',
		'Единственный разрешённый «HTML» в текстовых полях:',
		'- `**жирный**`, `*курсив*`, `` `код` ``',
		'- `[текст](https://example.com)` — ссылка',
		'- `[текст](form:N)` — кнопка-ссылка, открывающая форму магазина N',
		'- `[текст](agree:N)` — ссылка на страницу соглашения N',
		'- `==акцент==` — выделение фирменным цветом'
	].join('\n');

	/* ---------- Публичные сборщики ---------- */
	function buildPassportMd() {
		return [
			passportHeader(),
			'',
			'## Каркас проекта',
			'',
			ENVELOPE_MD,
			'',
			'## Общие поля секции (`data.sec` у секционных блоков)',
			'',
			SEC_FIELDS,
			'',
			INSTRUCTIONS_MD,
			'',
			'## Правила качества',
			'',
			RULES_MD,
			'',
			'## Реестр блоков',
			'',
			registryMd(true),
			'## Формат ответа для AI',
			'',
			ANSWER_FORMAT_MD,
			''
		].join('\n');
	}

	function buildPrompt(donor, wishes) {
		var url = String(donor || '').trim();
		var w = String(wishes || '').trim();
		var head = [
			'Ты — проектировщик структуры страниц для «Вита — Конструктор контента» (OpenCart 3, тема Вита).',
			'',
			'ЗАДАЧА: пользователь хочет воспроизвести структуру страницы-донора средствами конструктора.',
			'Прочитай донор по ссылке, выдели его смысловые секции и спроектируй страницу ТОЛЬКО из блоков',
			'реестра ниже. Воспроизведённая структура должна читаться как та же страница в стилистике магазина:',
			'порядок и смысл секций — как у донора, тексты — нейтральные заглушки.'
		];
		if (url) head.push('', 'ДОНОР: ' + url);
		if (w) head.push('', 'ПОЖЕЛАНИЯ ПОЛЬЗОВАТЕЛЯ (приоритет выше донора): ' + w);
		return head.join('\n') +
			'\n\n' + passportHeader().split('\n').slice(4).join('\n') +
			'\n\n## Каркас проекта\n\n' + ENVELOPE_MD +
			'\n\n## Общие поля секции (data.sec)\n\n' + SEC_FIELDS +
			'\n\n' + INSTRUCTIONS_MD +
			'\n\n## Реестр блоков (строгий список — ничего вне него)\n\n' + registryMd(false) +
			'Пример блока целиком:\n```json\n' + JSON.stringify(blockExample('hero')) + '\n```\n\n' +
			'## Правила\n\n' + RULES_MD + '\n\n' + ANSWER_FORMAT_MD + '\n';
	}

	/* ---------- Мягкая починка ответа AI ---------- */
	function extractJson(raw) {
		var result = { ok: false, data: null, errors: [], warnings: [] };
		var text = String(raw || '').trim();
		if (!text) {
			result.errors.push('Ответ пуст — вставьте JSON, который вернула модель.');
			return result;
		}
		var fence = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
		if (fence && fence[1].trim()) {
			text = fence[1].trim();
			result.warnings.push('Срезана markdown-обёртка ```.');
		}
		var parsed = null;
		try { parsed = JSON.parse(text); } catch (e) { /* дальше починка */ }
		if (parsed === null) {
			var s = text.indexOf('{'), e2 = text.lastIndexOf('}');
			if (s !== -1 && e2 > s) {
				try { parsed = JSON.parse(text.slice(s, e2 + 1)); result.warnings.push('JSON извлечён из текста ответа (вокруг были пояснения).'); } catch (e3) { /* дальше */ }
			}
		}
		if (parsed === null) {
			try { parsed = JSON.parse(text.replace(/,\s*([}\]])/g, '$1')); result.warnings.push('Убраны висячие запятые.'); } catch (e4) { /* всё */ }
		}
		if (parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed) && !parsed.blocks && Array.isArray(parsed.project)) {
			parsed = parsed.project;
		}
		if (Array.isArray(parsed)) {
			parsed = { type: 'vita-constructor-project', contract: VCC_CONTRACT, blocks: parsed };
			result.warnings.push('Ответ был массивом блоков — обёрнут в каркас проекта автоматически.');
		}
		if (parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed) &&
			!parsed.type && Array.isArray(parsed.blocks)) {
			parsed.type = 'vita-constructor-project';
			parsed.contract = parsed.contract || VCC_CONTRACT;
			result.warnings.push('В ответе не было обёртки проекта — type и contract добавлены автоматически.');
		}
		if (parsed === null || typeof parsed !== 'object') {
			result.errors.push('Не удалось найти JSON в ответе. Попросите модель вернуться к формату из промта (только JSON).');
			return result;
		}
		if (parsed.type !== 'vita-constructor-project') {
			result.errors.push('Это не проект конструктора: поле type = "' + String(parsed.type) + '", ожидалось "vita-constructor-project".');
			return result;
		}
		if (parsed.contract && parsed.contract !== VCC_CONTRACT) {
			result.errors.push('Неизвестный контракт "' + parsed.contract + '" — ожидался "' + VCC_CONTRACT + '". Обновите конструктор или попросите модель использовать контракт vcc-v1.');
			return result;
		}
		if (!Array.isArray(parsed.blocks) || !parsed.blocks.length) {
			result.errors.push('В ответе нет блоков (blocks: []).');
			return result;
		}
		var known = Object.keys(BlockRegistry.getAll());
		var unknowns = [];
		for (var i = 0; i < parsed.blocks.length; i++) {
			var b = parsed.blocks[i];
			if (!b || typeof b !== 'object' || !b.type) continue;
			if (known.indexOf(b.type) === -1) {
				var near = nearestSuggestion(b.type);
				unknowns.push('Блок ' + (i + 1) + ': тип "' + b.type + '" не существует' +
					(near.type && near.distance <= 3 ? ' — возможно, имелся в виду "' + near.type + '"' : '') + '.');
			}
		}
		if (unknowns.length) {
			result.errors = result.errors.concat(unknowns.slice(0, 4));
			if (unknowns.length > 4) result.errors.push('…и ещё ' + (unknowns.length - 4) + ' неизвестных типов.');
			return result;
		}
		if (parsed.blocks.length > 20) {
			result.warnings.push('Модель вернула ' + parsed.blocks.length + ' блоков — обычно достаточно 6–12. Лишнее удалите после сборки.');
		}
		result.ok = true;
		result.data = parsed;
		return result;
	}

	return {
		buildPassportMd: buildPassportMd,
		buildPrompt: buildPrompt,
		extractJson: extractJson,
		blockExample: blockExample,
		nearestType: nearestType,
		nearestSuggestion: nearestSuggestion
	};
})();

/* ============================================================
Вита — Конструктор контента · core/store.js
Состояние приложения: проект (title/slug/blocks), палитра
(пресет темы или дефолт), режим light/dark. Автосейв в
localStorage, подписки, undo в пределах сессии.
============================================================ */
'use strict';

var VccStore = (function () {
	var LS_KEY = 'vcc_project_v1';
	var LS_CATALOG_KEY = 'vcc_catalog_v1';
	var LS_WIDTH_KEY = 'vcc_container_width_v1';
	var state = {
		project: { title: '', slug: '', themeMode: 'light', theme: { preset: null, tokens: null }, blocks: [] },
		palette: VCC_DEFAULT_TOKENS,
		paletteName: '',
		/* Ширина сайта — настройка темы (Дизайн и стили), не свойство проекта:
		   задаёт --vita-container-max для моков, предпросмотра и CSS-превью карточек.
		   Приходит из пресета (theme_vita_container_width), селектом в шапке — вручную. */
		containerWidth: 'wide',
		catalog: VCC_CATALOG_DEFAULT,
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
		loadCatalog();
		try {
			var w = localStorage.getItem(LS_WIDTH_KEY);
			if (w && ['compact', 'optimal', 'wide', 'fluid'].indexOf(w) !== -1) state.containerWidth = w;
		} catch (e) { /* приватный режим — дефолт */ }
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

	/* Ширина сайта: compact/optimal/wide/fluid — та же таблица, что в vars_css.php */
	function setContainerWidth(value) {
		if (['compact', 'optimal', 'wide', 'fluid'].indexOf(value) === -1) return;
		state.containerWidth = value;
		try { localStorage.setItem(LS_WIDTH_KEY, value); } catch (e) { /* приватный режим */ }
		emit();
	}

	/* Каталог модулей магазина: из пресета темы, живёт в localStorage —
	 * блоки-шорткоды строят по нему пикеры ID */
	function setCatalog(catalog) {
		state.catalog = vccNormalizeCatalog(catalog);
		try {
			localStorage.setItem(LS_CATALOG_KEY, JSON.stringify(state.catalog));
		} catch (e) { /* приватный режим — молча */ }
		emit();
	}

	function loadCatalog() {
		try {
			var raw = localStorage.getItem(LS_CATALOG_KEY);
			if (raw) state.catalog = vccNormalizeCatalog(JSON.parse(raw));
		} catch (e) { /* битый кэш — пустой каталог */ }
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
		setCatalog: setCatalog,
		getCatalog: function () { return state.catalog; },
		setMode: setMode,
		undo: undo,
		getPalette: function () { return state.palette; },
		getPaletteName: function () { return state.paletteName; },
		setContainerWidth: setContainerWidth,
		getContainerWidth: function () { return state.containerWidth; },
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

	/* --- Таблица (0.7.0: конструктор строк/колонок вместо « | »-списка).
	 * Каждая ячейка — отдельное markdown-поле: ссылки, кнопки форм [текст](form:ID),
	 * акцент, соглашения. Модель: headers: [String], rows: [[String,…]] — плоская. */
	BlockRegistry.register({
		type: 'table',
		label: 'Таблица',
		icon: 'fa-table',
		group: 'text',
		defaults: {
			cols: '2',
			headers: ['Параметр', 'Значение'],
			rows: [
				['Гарантия', '12 месяцев'],
				['Доставка', '[Рассчитать](form:0)']
			]
		},
		fields: function (block) {
			var cols = Math.max(1, Math.min(4, parseInt(block && block.data && block.data.cols, 10) || 2));
			var headerFields = [];
			for (var c = 0; c < cols; c++) {
				headerFields.push({ key: 'h' + c, label: 'Заголовок ' + (c + 1), type: 'text', mark: 'hcol', idx: c });
			}
			var colFields = [];
			for (var k = 0; k < cols; k++) {
				colFields.push({ key: 'c' + k, label: 'Колонка ' + (k + 1), type: 'textarea', rows: 2, markdown: true, mark: 'rcol', idx: k });
			}
			return [
				{ key: 'cols', label: 'Колонок', type: 'select', options: [['2', '2'], ['3', '3'], ['4', '4']] },
				{ key: '_hh', label: 'Заголовки', type: 'group-label' }
			].concat(headerFields).concat([
				{
					key: 'rows', label: 'Строки', type: 'rows-editor', addLabel: 'Добавить строку', max: 30,
					itemFields: colFields,
					itemTitle: function (item, i) { return 'Строка ' + (i + 1) + (item && item.c0 ? ' — ' + String(item.c0).slice(0, 24) : ''); }
				},
				{ key: '_hint', label: 'В каждой ячейке работает markdown: [ссылка](https://…), [кнопка формы](form:ID), ==акцент==, **жирный**.', type: 'hint' }
			]);
		},
		toHTML: function (data) {
			var cols = Math.max(1, Math.min(4, parseInt(data.cols, 10) || 2));
			/* Обратная совместимость: старый формат хранил headers/rows строками
			 * («A\nB», ячейки через « | ») — рендерим их как раньше */
			var headers = Array.isArray(data.headers)
				? data.headers
				: (String(data.headers || '').trim() ? String(data.headers).split(/\r?\n/) : []);
			var rowList = Array.isArray(data.rows)
				? data.rows
				: (String(data.rows || '').trim() ? String(data.rows).split(/\r?\n/) : []);
			var rows = rowList.map(function (r) {
				return Array.isArray(r) ? r : String(r || '').split('|').map(function (cell) { return cell.trim(); });
			});
			if (!headers.length && !rows.length) return '';
			var html = '<div class="vcc-table-wrap"><table class="vcc-table">';
			var hasHeaders = headers.some(function (h) { return String(h || '').trim() !== ''; });
			if (hasHeaders) {
				html += '<thead><tr>';
				for (var i = 0; i < cols; i++) html += '<th>' + vccInline(headers[i] || '') + '</th>';
				html += '</tr></thead>';
			}
			html += '<tbody>';
			for (var r = 0; r < rows.length; r++) {
				var cells = rows[r];
				html += '<tr>';
				for (var cc = 0; cc < cols; cc++) html += '<td>' + vccInline(String(cells[cc] || '')) + '</td>';
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
		group: 'text',
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
			sec: { bg: 'image', image: '', overlay: true, padding: 'xl', width: 'default', anchor: '' }
		},
		fields: function () {
			return [
				{ key: '_hint', label: 'H1 на странице должен быть один — не дублируйте его с заголовком статьи (спека §6.1).', type: 'hint' }
			].concat(sectionFields()).concat([
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
			/* Блоки-шорткоды: toExportHTML (литеральный [vita_*] в vcc-shortcode)
			 * приоритетнее мока toHTML — в файл/буфер моки не попадают */
			var html = typeof def.toExportHTML === 'function'
				? def.toExportHTML(blocks[i].data || {})
				: def.toHTML(blocks[i].data || {});
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

	/* HTML с подключением внешнего стиля темы (vcc-v1 поставляется с Витой).
	 * Второй комментарий — каноническая подсказка про спец-метки модулей
	 * (docs/shortcode-hint.md, строка VCC-SHORTCODE-HINT-v1; синхронизирована
	 * с документацией темы — гейт sync_to_theme.py check). В тексте комментария
	 * нет символа '>' — санитайзер темы снимает его регэкспом с [^>]*. */
	function buildFullHtml(project) {
		var inner = buildHtml(project);
		return '<!-- Вита — Конструктор контента. Стили: контракт ' + VCC_CONTRACT + ' подключается темой Вита автоматически. -->\n' +
			'<!-- VCC-SHORTCODE-HINT-v1: Спец-метки модулей Виты вставляйте текстовым блоком или через блок «HTML темы» — они переживают экспорт и импорт, а на витрине превращаются в живые блоки модулей. В палитре конструктора есть готовые блоки спец-меток с выбором ID из каталога магазина. -->\n' + inner;
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
		/* Ширина сайта — из пресета (если несёт): селект в шапке подстроится,
		   пользователь может перекрыть вручную. */
		var w = data.tokens && data.tokens.theme_vita_container_width;
		if (w && ['compact', 'optimal', 'wide', 'fluid'].indexOf(w) !== -1) {
			VccStore.setContainerWidth(w);
		}
		/* Каталог модулей магазина (0.4.0): реальные FAQ-группы и формы —
		 * пикеры блоков-шорткодов. Старые пресеты поля не несут — каталог
		 * остаётся прежним (обычно пустым, блоки дают ручной ввод ID). */
		if (data.catalog && typeof data.catalog === 'object') {
			VccStore.setCatalog(data.catalog);
		}
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
Сборка интерфейса: онбординг-модалка (принцип работы + пресет
магазина) поверх сразу открытого редактора, палитра блоков,
карточки, предпросмотр в контексте магазина (мок шапки/подвала,
некликабельные тестовые данные), тосты, экспорт/импорт.
============================================================ */
'use strict';

(function () {
	var editingId = null;
	var previewMode = false;
	var fullscreenMode = false;

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
	/* Ширина сайта — та же таблица, что в vars_css.php темы и tokens.js:
	 * единый источник значений для селекта в шапке. */
	var WIDTH_TABLE = { compact: '1210px', optimal: '1400px', wide: '1640px', fluid: '100%' };

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
		/* Ширина сайта (селект в шапке / пресет) — поверх палитры:
		   моки, канвас и превью карточек следуют одному --vita-container-max. */
		root.style.setProperty('--vita-container-max', WIDTH_TABLE[VccStore.getContainerWidth()] || '1640px');
		var widthSel = $('#vcc-width-switch');
		if (widthSel && widthSel.value !== VccStore.getContainerWidth()) widthSel.value = VccStore.getContainerWidth();
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
		/* Картинка в группе «Текст» — отдельной группы из одного блока нет */
		var groups = { text: 'Блоки контента', landing: 'Лендинг-секции', modules: 'Модули магазина' };
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
				refreshEditor();
			});
				grid.appendChild(btn);
			});
			box.appendChild(grid);
		});
	}

	/* ---------- Формы ---------- */
	function fieldValue(key) { return function (block) { return block.data[key]; }; }

	/* Значение поля: обычные ключи лежат в data напрямую, ключи с меткой
	 * mark:'sec' — вложенным объектом data.sec (общие поля секции лендинга);
	 * mark:'hcol' — элемент массива data.headers[idx] (таблица);
	 * mark:'rcol' — элемент массива rows[idx][idx] ячейки строки таблицы
	 * (используется ВНУТРИ rows-editor, block = { data: item }). */
	function valOf(block, def) {
		if (def.mark === 'sec') return (block.data.sec || {})[def.key.slice(4)];
		if (def.mark === 'hcol') return (block.data.headers || [])[def.idx];
		if (def.mark === 'rcol') return block.data[def.key];
		return block.data[def.key];
	}

	/* ---------- Smart-подсказка спец-меток Виты (0.7.2) ----------
	 * Пользователь начал вводить [vita_…] руками — под полем появляется
	 * сворачиваемая мини-справка: реестр тегов темы (сверен с контроллером
	 * vita_theme.php 1.10.1), пример и правило (не вкладывать в [vita_html]).
	 * Прячется, когда спец-метки в тексте больше нет. */
	var SHORTCODE_HELP = [
		{ tag: 'vita_visual', args: 'id', what: 'слайдер / баннер / LookBook' },
		{ tag: 'vita_all_in_one', args: 'id', what: 'универсальный блок товаров' },
		{ tag: 'vita_extra_wall', args: 'id', what: 'стена категорий и брендов' },
		{ tag: 'vita_faq', args: 'id, title', what: 'FAQ-группа (без id — все активные)' },
		{ tag: 'vita_form', args: 'id', what: 'форма магазина' },
		{ tag: 'vita_news', args: 'id', what: 'статья блога (без id — лента)' },
		{ tag: 'vita_testimonial', args: 'id', what: 'отзывы о магазине' },
		{ tag: 'vita_news_gallery', args: 'id', what: 'галерея из блога' },
		{ tag: 'vita_gallery', args: 'id', what: 'галерея изображений' },
		{ tag: 'vita_html', args: 'обёртка', what: '[vita_html]ваш HTML[/vita_html] — точечная вёрстка' }
	];

	function shortcodeHtml() {
		var rows = SHORTCODE_HELP.map(function (h) {
			return '<tr><td><code>[vita_' + h.tag.replace(/^vita_/, '') + ' id=N]</code></td><td>' + vccEscapeHtml(h.what) + '</td></tr>';
		});
		return '<strong>Спец-метки модулей Виты — рендерятся на витрине живыми блоками</strong>' +
			'<table class="vcc-sc-help__table"><tbody>' + rows.join('') + '</tbody></table>' +
			'<span class="vcc-sc-help__note">ID — номер модуля/группы в админке (в палитре есть блоки спец-меток с выбором из каталога). Спец-метки не вкладывайте внутрь [vita_html]…[/vita_html].</span>';
	}

	function attachShortcodeHint(wrap, input) {
		var box = el('div', 'vcc-sc-help');
		box.innerHTML = '<button type="button" class="vcc-sc-help__toggle"><i class="fa fa-magic"></i> Справка по спец-меткам Виты</button>' +
			'<div class="vcc-sc-help__body" hidden>' + shortcodeHtml() + '</div>';
		var body = box.querySelector('.vcc-sc-help__body');
		box.querySelector('.vcc-sc-help__toggle').addEventListener('click', function () {
			body.hidden = !body.hidden;
			box.classList.toggle('vcc-sc-help--open', !body.hidden);
		});
		/* Детект в вводе: подсветка кнопки справки, пока в тексте есть [vita_…] */
		input.addEventListener('input', function () {
			box.classList.toggle('vcc-sc-help--detected', /\[vita_[a-z0-9_]/i.test(input.value));
		});
		if (/\[vita_[a-z0-9_]/i.test(input.value || '')) {
			box.classList.add('vcc-sc-help--detected');
		}
		wrap.appendChild(box);
	}

	function makeField(def, block, onChange) {
		var wrap = el('div', 'vcc-field');
		/* Разделитель группы полей без ввода */
		if (def.type === 'group-label') {
			wrap.appendChild(el('div', 'vcc-field__group', def.label));
			return wrap;
		}
		/* Пояснительная строка без ввода (например, откуда список пикера) */
		if (def.type === 'hint') {
			wrap.appendChild(el('div', 'vcc-hint', def.label));
			return wrap;
		}
		if (def.type === 'checkbox') {
			var row = el('label', 'vcc-checkbox-row');
			var cb = el('input');
			cb.type = 'checkbox';
			cb.checked = !!valOf(block, def);
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
			if (String(valOf(block, def)) === String(opt[0])) option.selected = true;
			select.appendChild(option);
			});
			select.addEventListener('change', function () { onChange(def.key, select.value); });
			wrap.appendChild(select);
			return wrap;
		}
		if (def.type === 'rows-editor') {
		return makeRowsEditor(def, block, onChange, wrap);
	}
	if (def.type === 'tabs-editor') {
		return makeTabsEditor(def, block, onChange, wrap);
	}
	var input = def.type === 'textarea' ? el('textarea', 'vcc-textarea') : el('input', 'vcc-input');
		if (def.type === 'textarea') input.rows = def.rows || 4;
		if (def.type === 'number') { input.type = 'number'; input.min = 0; input.step = 1; }
		if (def.placeholder) input.placeholder = def.placeholder;
		input.value = valOf(block, def) == null ? '' : valOf(block, def);
		input.addEventListener('input', function () { onChange(def.key, input.value); });
		wrap.appendChild(input);
		if (def.markdown) {
			wrap.appendChild(el('div', 'vcc-hint', 'Markdown: **жирный**, *курсив*, ==акцент==, `код`, [текст](url), [соглашение](agree:ID), [кнопка формы](form:ID), списки через «- »'));
		}
		/* Smart-подсказка спец-меток (0.7.2): пользователь начал вводить
		 * [vita_…] руками — показываем мини-справку по синтаксису. */
		if (def.markdown || def.type === 'textarea') {
			attachShortcodeHint(wrap, input);
		}
		return wrap;
	}

	/* Универсальный редактор повторяющихся элементов (0.7.0, спека §5.3):
	 * карточки с заголовком, сортировкой, удалением и вложенными полями.
	 * tabs-editor — частный случай (те же механики, ключ tabs). */
	function makeRowsEditor(def, block, onChange, wrap) {
		var key = def.key;
		var list = Array.isArray(block.data[key]) ? block.data[key] : [];
		var max = def.max || 99;

		function commit() {
			var copy = JSON.parse(JSON.stringify(list));
			onChange(key, copy);
		}

		list.forEach(function (item, idx) {
			var card = el('div', 'vcc-rows-item');
			var head = el('div', 'vcc-rows-item__head');
			head.appendChild(el('span', 'vcc-rows-item__title',
				(def.itemTitle ? def.itemTitle(item, idx) : '') || ('Элемент ' + (idx + 1))));
			head.appendChild(iconBtn('fa-arrow-up', 'Выше', function () {
				if (idx === 0) return;
				list.splice(idx - 1, 0, list.splice(idx, 1)[0]);
				commit();
				refreshEditor();
			}, idx === 0));
			head.appendChild(iconBtn('fa-arrow-down', 'Ниже', function () {
				if (idx === list.length - 1) return;
				list.splice(idx + 1, 0, list.splice(idx, 1)[0]);
				commit();
				refreshEditor();
			}, idx === list.length - 1));
			head.appendChild(iconBtn('fa-trash', 'Удалить', function () {
				list.splice(idx, 1);
				commit();
				refreshEditor();
			}, false, true));
			card.appendChild(head);
			var body = el('div', 'vcc-rows-item__body');
			(def.itemFields || []).forEach(function (fd) {
				/* §5.3 спеки: вложенные rows-editor запрещены (плоская модель данных) */
				if (fd.type === 'rows-editor' || fd.type === 'tabs-editor') return;
				body.appendChild(makeField(fd, { data: item }, function (ikey, value) {
					item[ikey] = value;
					commit();
				}));
			});
			card.appendChild(body);
			wrap.appendChild(card);
		});

		var add = el('button', 'vcc-btn vcc-btn--sm', '<i class="fa fa-plus"></i> ' + (def.addLabel || 'Добавить элемент'));
		add.type = 'button';
		add.disabled = list.length >= max;
		add.addEventListener('click', function () {
			if (list.length >= max) return;
			var fresh = {};
			(def.itemFields || []).forEach(function (fd) {
				if (fd.key && fd.type !== 'hint') fresh[fd.key] = '';
			});
			list.push(fresh);
			commit();
			refreshEditor();
		});
		wrap.appendChild(add);
		return wrap;
	}

	/* Вкладки = частный случай rows-editor (0.7.0): данные и совместимость
	 * не меняются, редактор общий. */
	function makeTabsEditor(def, block, onChange, wrap) {
		return makeRowsEditor({
			key: 'tabs',
			addLabel: 'Добавить вкладку',
			max: 12,
			itemFields: [
				{ key: 'title', label: 'Заголовок вкладки', type: 'text' },
				{ key: 'content', label: 'Содержимое вкладки', type: 'textarea', rows: 3, markdown: true }
			],
			itemTitle: function (item, i) { return item.title || ('Вкладка ' + (i + 1)); }
		}, block, onChange, wrap);
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
			/* Общие поля секции лендинга живут вложенным объектом data.sec */
			if (key.indexOf('sec.') === 0) {
				var sec = JSON.parse(JSON.stringify(block.data.sec || {}));
				sec[key.slice(4)] = value;
				VccStore.updateBlockSilent(block.id, { sec: sec });
				return;
			}
			/* Таблица: заголовок-колонка — элемент массива data.headers */
			if (def.mark === 'hcol') {
				var heads = JSON.parse(JSON.stringify(block.data.headers || []));
				heads[def.idx] = value;
				VccStore.updateBlockSilent(block.id, { headers: heads });
				return;
			}
			var patch = {};
			patch[key] = value;
			VccStore.updateBlockSilent(block.id, patch);
			/* Смена числа колонок таблицы перестраивает набор полей-ячеек */
			if (block.type === 'table' && key === 'cols') setTimeout(refreshEditor, 0);
		};
		/* Поля могут быть функцией (пикеры шорткодов зависят от каталога
		   пресета — он может появиться/обновиться в любой момент; таблица
		   читает из block число колонок для набора ячеек) */
		var fields = typeof def.fields === 'function' ? def.fields(block) : (def.fields || []);
		fields.forEach(function (fieldDef) {
			body.appendChild(makeField(fieldDef, block, onChange));
		});
		return body;
	}

	function blockPreviewHtml(block) {
		var def = BlockRegistry.get(block.type);
		try {
			var html = def.toHTML(block.data || {});
			/* Штатные заглушки (image/catalog/vita-placeholder-*) рисуются
			 * локальными копиями — на Pages пути магазина не существуют.
			 * Экспорт вызывает toHTML без этой подмены — в магазин едут
			 * правильные пути. */
			return window.VccSection && typeof window.VccSection.phPreviewHtml === 'function'
				? window.VccSection.phPreviewHtml(html)
				: html;
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
			bar.appendChild(iconBtn('fa-arrow-up', 'Выше', function () { VccStore.moveBlock(block.id, -1); refreshEditor(); }, index === 0));
			bar.appendChild(iconBtn('fa-arrow-down', 'Ниже', function () { VccStore.moveBlock(block.id, 1); refreshEditor(); }, index === total - 1));
			bar.appendChild(iconBtn(isEditing ? 'fa-compress' : 'fa-pencil', isEditing ? 'Свернуть' : 'Редактировать', function () {
				if (!isEditing) VccStore.checkpoint();
				editingId = isEditing ? null : block.id;
				refreshEditor();
			}));
			bar.appendChild(iconBtn('fa-trash', 'Удалить', function () {
				if (confirm('Удалить блок?')) {
					VccStore.removeBlock(block.id);
					refreshEditor();
				}
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

	/* Рантайм предпросмотра: data-vcc-bg -> background-image (в магазине это
	 * делает common.js темы; здесь — то же самое для превью и фуллскрина). */
	function applyPreviewBg(root) {
		if (!root) return;
		root.querySelectorAll('.vcc-section[data-vcc-bg]').forEach(function (sec) {
			var url = (sec.getAttribute('data-vcc-bg') || '').trim();
			if (/^(image\/|\/|https?:\/\/|assets\/)/i.test(url)) {
				sec.style.backgroundImage = 'url("' + url + '")';
			}
		});
	}

	/* ---------- Мок магазина (некликабельные данные — в канвасе редактора и предпросмотре) ---------- */
	function mockHeader() {
		/* Разметка = структура шапки Виты (header_topbar.twig + header_main.twig):
		   .mp-header-top → .mp-header > .mp-container > .mp-header-main.
		   Стили — точные из vita.css (см. блок .vcc-mock в app.css). */
		return '<div class="vcc-mock" aria-hidden="true">' +
			'<div class="mp-header-top"><div class="mp-container"><div class="mp-header-top-nav">' +
			'<span>Бесплатная доставка от 3 000 ₽</span>' +
			'<span>+7 (900) 000-00-00</span>' +
			'</div></div></div>' +
			'<div class="mp-header"><div class="mp-container"><div class="mp-header-main">' +
			'<a class="mp-logo" href="javascript:void(0)"><span class="mp-logo-text-col">' +
			'<i class="fa fa-leaf mp-logo-text-icon" aria-hidden="true"></i> ' +
			'<span class="mp-logo-text-title">Магазин «Вита»</span></span></a>' +
			'<button class="btn-catalog-toggle has-label" type="button"><i class="fa fa-bars" aria-hidden="true"></i><span class="btn-catalog-label">Каталог</span></button>' +
			'<div class="mp-search-form"><i class="fa fa-search mp-search-icon-inside" aria-hidden="true"></i>' +
			'<input type="text" class="mp-search-input" placeholder="Поиск по магазину…" tabindex="-1"></div>' +
			'<div class="mp-header-actions">' +
			'<span class="mp-action-item"><i class="fa fa-heart-o mp-action-icon" aria-hidden="true"></i>Избранное</span>' +
			'<span class="mp-action-item"><i class="fa fa-shopping-cart mp-action-icon" aria-hidden="true"></i>Корзина</span>' +
			'<span class="mp-action-item"><i class="fa fa-user-o mp-action-icon" aria-hidden="true"></i>Войти</span>' +
			'</div>' +
			'</div></div></div>' +
			'<div class="mp-container"><div class="vcc-mock__note">Предпросмотр в контексте магазина — тестовые данные не кликабельны</div></div>' +
			'</div>';
	}
	function mockFooter() {
		/* Разметка = структура tech-footer Виты (footer.twig):
		   .tech-footer > .mp-container > .tech-footer-grid + .tech-footer-bottom. */
		return '<div class="vcc-mock vcc-mock--footer" aria-hidden="true">' +
			'<div class="tech-footer">' +
			'<div class="mp-container">' +
			'<div class="tech-footer-grid">' +
			'<div class="tech-footer-col"><h5 class="tech-footer-title">Магазин «Вита»</h5>' +
			'<div class="tech-footer-desc">Демонстрационные данные конструктора — здесь будет описание вашего магазина.</div></div>' +
			'<div class="tech-footer-col"><h5 class="tech-footer-title">Покупателям</h5>' +
			'<ul class="tech-footer-list"><li><a href="javascript:void(0)">О магазине</a></li><li><a href="javascript:void(0)">Доставка и оплата</a></li><li><a href="javascript:void(0)">Гарантия</a></li></ul></div>' +
			'<div class="tech-footer-col"><h5 class="tech-footer-title">Контакты</h5>' +
			'<ul class="tech-footer-list"><li><span>+7 (900) 000-00-00</span></li><li><span>sale@example.com</span></li></ul></div>' +
			'</div>' +
			'<div class="mp-footer-bottom"><div class="mp-footer-copyright">© 2026 Магазин «Вита». Все права защищены.</div></div>' +
			'</div>' +
			'</div>' +
			'</div>';
	}

	function renderFullscreen(project) {
		var fs = $('#vcc-fullscreen');
		var page = $('#vcc-fullscreen-page');
		if (!fs || !page) return;
		bindTabsDelegate(page);
		/* Страница как на витрине Виты: некликабельные шапка/подвал магазина
		   и лендинг-секции на всю ширину окна. Скроллится весь документ —
		   скроллбара справа у страницы нет (см. css .vcc-fullscreen__page). */
		page.innerHTML = mockHeader() +
			'<div class="vcc-content">' +
			(project.blocks.map(blockPreviewHtml).join('\n') ||
				'<p style="text-align:center;color:var(--mp-text-light,#94A3B8);padding:60px 20px">Страница пока пуста — вернитесь в редактирование и добавьте блоки из палитры</p>') +
			'</div>' +
			mockFooter();
		applyPreviewBg(page);
		window.scrollTo(0, 0);
	}

	/* ---------- Рендер ---------- */
	function render(src, force) {
		/* Токены применяются всегда: пресет можно загрузить прямо в
		   онбординге — модалка и редактор под ней красятся сразу. */
		applyTokensToDom();
		var canvas = $('#vcc-canvas');
		if (!canvas) return;
		/* render вызывают и с state (subscribe), и с project напрямую */
		var project = (src && src.project) ? src.project : (src || VccStore.currentProject());


		/* Ввод в поле редактируемого блока: DOM уже актуален, перестройка
		   канваса убивала бы фокус. Структурные изменения (add/delete/move
		   строк, вкладок, блоков) идут через refreshEditor() с force —
		   guard не должен их блокировать, иначе клик «Добавить» кажется
		   мёртвым: фокус остаётся на кнопке внутри .is-editing. */
		if (!previewMode && !force && document.activeElement) {
			var host = document.activeElement.closest('.vcc-block.is-editing');
			if (host) return;
		}

		document.querySelectorAll('#vcc-mode-switch button').forEach(function (btn) {
			btn.classList.toggle('is-active', btn.dataset.mode === project.themeMode);
		});

		var fsTitle = $('#vcc-fs-title');
		if (fsTitle) fsTitle.textContent = project.title || 'Без названия';
		if (fullscreenMode) {
			renderFullscreen(project);
			return; /* фуллскрин обновляется отдельно: свой блок, канвас не нужен */
		}

		if (previewMode) {
			var parts = [mockHeader()];
			bindTabsDelegate(canvas);
			var blocksHtml = project.blocks.map(blockPreviewHtml).join('\n');
			parts.push('<div class="vcc-content">' + (blocksHtml || '<p style="text-align:center;color:var(--mp-text-light,#94A3B8)">Пока пусто — добавьте блоки из палитры слева</p>') + '</div>');
			parts.push(mockFooter());
			canvas.innerHTML = parts.join('\n');
			applyPreviewBg(canvas);
			return;
		}

		/* Канвас редактора — только карточки блоков. Моки шапки/подвала Виты
		 * живут в предпросмотре (кнопка «глаз») и в фуллскрине — там они и
		 * показывают контекст магазина, не мешая редактированию. */
		canvas.innerHTML = '';
		if (!project.blocks.length) {
			canvas.appendChild(el('div', 'vcc-canvas__empty',
				'<i class="fa fa-cube" style="font-size:26px; margin-bottom:10px; display:block;"></i>Добавьте первый блок из палитры слева'));
		} else {
			project.blocks.forEach(function (block, i) {
				canvas.appendChild(renderBlockCard(block, i, project.blocks.length));
			});
			applyPreviewBg(canvas);
		}
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

	/* ---------- Онбординг-модалка ---------- */
	/* Редактор открыт всегда: модалка — ненавязчивый слой поверх,
	   который можно закрыть кликом в фон или Escape. */
	function openOnboard() {
		var modal = $('#vcc-onboard');
		if (!modal) return;
		modal.classList.add('is-open');
		renderLayoutGallery();
		var resume = $('#vcc-resume');
		if (resume) resume.style.display = VccStore.currentProject().blocks.length ? '' : 'none';
	}

	function closeOnboard() {
		var modal = $('#vcc-onboard');
		if (modal) modal.classList.remove('is-open');
	}

	function showApp() {
		closeOnboard();
	}

	function showWelcome() {
		openOnboard();
	}

	/* ---------- Фуллскрин: только сгенерированная страница ---------- */
	function enterFullscreen() {
		if (fullscreenMode) return;
		fullscreenMode = true;
		editingId = null;
		previewMode = false;
		$('#vcc-app').style.display = 'none';
		$('#vcc-fullscreen').classList.add('is-active');
		document.body.classList.add('is-vcc-fs');
		render(VccStore.currentProject(), true);
		$('#vcc-fullscreen-page').focus({ preventScroll: true });
	}
	function exitFullscreen() {
		if (!fullscreenMode) return;
		fullscreenMode = false;
		$('#vcc-app').style.display = '';
		$('#vcc-fullscreen').classList.remove('is-active');
		document.body.classList.remove('is-vcc-fs');
		refreshEditor();
	}

	/* Статус кнопки пресета: имя палитры или призыв к действию */
	function renderPresetButton() {
		var btn = $('#vcc-preset-open');
		if (!btn) return;
		var name = VccStore.getPaletteName();
		$('#vcc-preset-btn-label').textContent = name ? ('Палитра: ' + name) : 'Загрузить пресет';
		btn.classList.toggle('is-set', !!name);
	}
	VccStore.subscribe(renderPresetButton);

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

	/* Валидация перед экспортом (спека §5.5/§6.19/§6.20): предупреждения
	 * показываются, но экспорт не блокируется. */
	function validateExport(project) {
		var html = VccExport.buildHtml(project);
		var formIds = {};
		project.blocks.forEach(function (b) {
			if (b.type === 'vita_form') {
				var fid = Math.max(0, parseInt(b.data.formId, 10) || 0);
				if (fid) formIds[fid] = true;
			}
		});
		var warned = [];
		var seen = {};
		var m;
		var re = /href="form:(\d+)"/g;
		while ((m = re.exec(html)) !== null) {
			var id = m[1];
			if (seen[id]) continue;
			seen[id] = true;
			if (id === '0') {
				warned.push('form:0 — задайте ID формы в блоке «Форма (спец-метка)» или замените ссылку');
			} else if (!formIds[id]) {
				warned.push('form:' + id + ' — на странице нет блока «Форма (спец-метка)» с этой формой, кнопка ничего не откроет');
			}
		}
		project.blocks.forEach(function (b) {
			if (b.type === 'video' && window.VccVideo && String(b.data.src || '').trim()) {
				var r = window.VccVideo.resolve(b.data.src);
				if (r.warn) warned.push('видео: ' + r.warn);
			}
		});
		/* Чек-лист: проект без спец-меток — мягкое напоминание (не предупреждение):
		 * живые модули добавляются блоками группы «Модули магазина». */
		var hasModule = false;
		for (var i = 0; i < project.blocks.length; i++) {
			if (BlockRegistry.get(project.blocks[i].type) &&
				BlockRegistry.get(project.blocks[i].type).group === 'modules') {
				hasModule = true;
				break;
			}
		}
		if (!hasModule && project.blocks.length) {
			showToast('Совет: в проекте нет живых модулей магазина. Добавить слайдер, FAQ, форму, отзывы или товары можно блоками из группы «Модули магазина» — на витрине они превращаются в живые блоки.', 'info');
		}
		if (warned.length) showToast(warned.slice(0, 3).join(' · '), 'warning');
	}

	function init() {
		VccStore.load();
		renderPalette();
		ensureExportCss();

		/* Онбординг: редактор уже открыт, модалка поверх */
		$('#vcc-start-empty').addEventListener('click', closeOnboard);
		var resume = $('#vcc-resume');
		if (resume && VccStore.currentProject().blocks.length) resume.style.display = '';
		if (resume) resume.addEventListener('click', closeOnboard);
		$('#vcc-onboard-backdrop').addEventListener('click', closeOnboard);			document.addEventListener('keydown', function (e) {
				if (e.key === 'Escape' || e.keyCode === 27) {
					if (fullscreenMode) { exitFullscreen(); return; }
					var assistant = $('#vcc-assistant');
					if (assistant && assistant.classList.contains('is-open')) { window.VccAssistant.close(); return; }
					closeOnboard();
				}
			});
		bindDropZone($('#vcc-welcome-drop'), $('#vcc-welcome-file'));
		bindDropZone($('#vcc-layouts-drop'), $('#vcc-layouts-file'));
		renderLayoutGallery();
		/* Первое открытие (проект пуст) — модалка онбординга поверх редактора;
		   у вернувшегося с черновиком открыта просто палитра */
		if (!VccStore.currentProject().blocks.length) openOnboard();

		/* Шапка редактора */
		$('#vcc-mode-switch').addEventListener('click', function (e) {
			var btn = e.target.closest('button');
			if (btn) VccStore.setMode(btn.dataset.mode);
		});
		$('#vcc-width-switch').addEventListener('change', function () {
			VccStore.setContainerWidth(this.value);
		});
		/* Экспорт: одна кнопка «Скачал / Загрузил» — файл для магазина, загрузка
		   черновика — на первом экране, стили всегда подключает тема */
		$('#vcc-dl-html').addEventListener('click', function () {
			validateExport(VccStore.currentProject());
			VccExport.downloadHtml(VccStore.currentProject());
		});
		$('#vcc-home').addEventListener('click', showWelcome);

		/* Помощник «Создать по донору»: кнопка в шапке + карточка онбординга */
		$('#vcc-assistant-open').addEventListener('click', function () { window.VccAssistant.open(); });
		$('#vcc-assistant-open-onboard').addEventListener('click', function () { window.VccAssistant.open(); });

		/* Фуллскрин: страница на всю ширину без палитры и шапки конструктора */
		$('#vcc-fullscreen-toggle').addEventListener('click', enterFullscreen);
		$('#vcc-fullscreen-exit').addEventListener('click', exitFullscreen);

		/* Пресет: отдельная кнопка в шапке — открыть онбординг с дропзоной */
		$('#vcc-preset-open').addEventListener('click', showWelcome);

		VccStore.subscribe(render);
		renderPresetButton();
		render(VccStore.currentProject());
	}

	/* Debug-хэндл для автоматических проверок: ?debug=1 */
	if (/[?&]debug=1/.test(location.search)) {
		window.VCC_DEBUG = { store: VccStore, export: VccExport, import: VccImport };
	}

	document.addEventListener('DOMContentLoaded', init);
})();

/* ============================================================
Вита — Конструктор контента · ui/assistant.js
Визард «Собрать страницу по образцу»: три шага, ведёт сам.
  Шаг 1 — ссылка на страницу-образец (+ что важно учесть).
  Шаг 2 — одна кнопка: скопировать задание → отдать нейросети;
          после копирования шаг сам объясняет, что дальше.
  Шаг 3 — вставить ответ → «Готово — собрать страницу».
Конструктор остаётся статическим: ни одной сети, ни одного ключа.
Термины JSON/HTML/CSS не используются вовсе: пользователь делает
«Скачал / Загрузил», всё остальное визард делает за него.
============================================================ */
'use strict';

(function () {
	function $(sel) { return document.querySelector(sel); }

	function showStep(n) {
		var modal = $('#vcc-assistant');
		if (!modal) return;
		var steps = modal.querySelectorAll('.vcc-wizard__step');
		for (var i = 0; i < steps.length; i++) {
			steps[i].classList.toggle('is-active', steps[i].getAttribute('data-step') === String(n));
		}
		var out = $('#vcc-assistant-result');
		if (out) { out.style.display = 'none'; out.innerHTML = ''; }
		/* Фокус на первый контрол шага: вставил → сразу можно работать */
		var step = modal.querySelector('.vcc-wizard__step[data-step="' + n + '"]');
		if (step) {
			var focusable = step.querySelector('input, textarea, .vcc-btn--primary');
			if (focusable) focusable.focus();
		}
	}

	function openAssistant() {
		var modal = $('#vcc-assistant');
		if (!modal) return;
		/* Паспорт строится в момент открытия — из живого реестра текущей версии */
		var ta = $('#vcc-assistant-prompt');
		if (ta) {
			ta.value = VccPassport.buildPrompt(
				$('#vcc-assistant-donor') ? $('#vcc-assistant-donor').value : '',
				$('#vcc-assistant-wishes') ? $('#vcc-assistant-wishes').value : ''
			);
			updateSize();
		}
		var resp = $('#vcc-assistant-response');
		if (resp) resp.value = '';
		/* Сброс шага 2 к стартовому виду: подсказка скрыта, список — исходный */
		var hint = $('#vcc-wizard-step2-hint');
		if (hint) hint.classList.remove('is-visible');
		if (howInitial && modalOl()) modalOl().innerHTML = howInitial;
		showStep(1);
		modal.classList.add('is-open');
		var first = $('#vcc-assistant-donor');
		if (first) first.focus();
	}

	function closeAssistant() {
		var modal = $('#vcc-assistant');
		if (modal) modal.classList.remove('is-open');
	}

	function updateSize() {
		var size = $('#vcc-assistant-size');
		if (size && $('#vcc-assistant-prompt')) {
			var kb = ($('#vcc-assistant-prompt').value.length / 1024).toFixed(1);
			size.textContent = kb + ' КБ';
		}
	}

	function downloadPrompt() {
		var text = $('#vcc-assistant-prompt').value;
		var blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
		var url = URL.createObjectURL(blob);
		var a = document.createElement('a');
		a.href = url;
		a.download = 'vita-constructor-prompt.txt';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
	}

	function copyPrompt(btn) {
		var text = $('#vcc-assistant-prompt').value;
		var label = btn.querySelector('span');
		var done = function (okFlag) {
			if (label) {
				var prev = label.textContent;
				label.textContent = okFlag ? 'Скопировано' : 'Не удалось — скачайте файл';
				setTimeout(function () { label.textContent = prev; }, 2200);
			}
			if (okFlag) {
				/* Ведём за руку: после копирования шаг сам объясняет, что делать */
				var how = modalOl();
				if (how) {
					how.innerHTML = '<li><i class="fa fa-check" style="color: var(--mp-success, #4CAF50); margin-right: 6px;"></i>Задание скопировано — оно уже в буфере обмена.</li>' +
						'<li>Откройте нейросеть с доступом в интернет (ChatGPT, Claude, DeepSeek) и вставьте задание в чат.</li>' +
						'<li>Когда она ответит — переходите к шагу 3: там её ответ превратится в страницу.</li>';
				}
				var hint = $('#vcc-wizard-step2-hint');
				if (hint) hint.classList.add('is-visible');
			}
		};
		if (navigator.clipboard && navigator.clipboard.writeText && window.isSecureContext) {
			navigator.clipboard.writeText(text).then(function () { done(true); }, function () { legacy(); });
		} else {
			legacy();
		}
		function legacy() {
			var ta = $('#vcc-assistant-prompt');
			ta.focus();
			ta.select();
			var okFlag = false;
			try { okFlag = document.execCommand('copy'); } catch (e) { /* file:// без прав */ }
			ta.blur();
			done(okFlag);
			if (!okFlag) downloadPrompt();
		}
	}

	function showError(out, msgs) {
		out.style.display = '';
		out.className = 'vcc-assistant__result vcc-assistant__result--error';
		out.innerHTML = msgs.map(function (m) { return '<div><i class="fa fa-exclamation-triangle"></i> ' + m + '</div>'; }).join('');
	}

	function showWarn(out, msgs) {
		out.style.display = '';
		out.className = 'vcc-assistant__result vcc-assistant__result--warn';
		out.innerHTML = msgs.map(function (m) { return '<div><i class="fa fa-info-circle"></i> ' + m + '</div>'; }).join('');
	}

	function toast(text, kind) {
		if (window.vccToast) window.vccToast(text, kind || 'info');
	}

	function modalOl() {
		var step2 = document.querySelector('.vcc-wizard__step[data-step="2"]');
		return step2 ? step2.querySelector('.vcc-wizard__how') : null;
	}

	var howInitial = '';

	function buildLanding() {
		var out = $('#vcc-assistant-result');
		var raw = $('#vcc-assistant-response').value;
		var res = VccPassport.extractJson(raw);
		if (!res.ok) {
			/* НЕ валить пользователя в технические ошибки: ответ нейросети,
			   из которого не извлекается проект, — обычная ситуация. Всё,
			   что он вставил, остаётся в поле: исправит и повторит. */
			showError(out, [
				'Нейросеть ответила не тем — в её ответе нет страницы для сборки. Чаще всего она что-то объясняет вместо того, чтобы собрать страницу.',
				'Напишите ей в чате: «Собери страницу строго по заданию, верни только данные страницы». Проверьте, что отправили ей задание из шага 2 целиком, — и вставьте её новый ответ сюда вместо этого.'
			]);
			return;
		}
		var data = res.data;
		try {
			/* Палитру задаёт пресет магазина: чужие токены от модели не сохраняем */
			if (data.theme && data.theme.tokens) delete data.theme.tokens;
			if (data.theme && data.theme.preset) delete data.theme.preset;
		} catch (e) { /* необязательно */ }
		var blocks = Array.isArray(data.blocks) ? data.blocks.length : 0;
		if (!blocks) {
			showError(out, ['Нейросеть вернула пустую страницу — в задании был образец по ссылке из шага 1. Перейдите назад, проверьте ссылку и попросите её переделать ответ.']);
			return;
		}
		VccStore.setProject(data);
		if (res.warnings.length) showWarn(out, res.warnings);
		else out.style.display = 'none';
		toast('Страница собрана: ' + blocks + ' блоков — правьте свободно', 'success');
		setTimeout(closeAssistant, res.warnings.length ? 400 : 150);
		var canvas = $('#vcc-canvas');
		if (canvas) canvas.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	function initAssistant() {
		var modal = $('#vcc-assistant');
		if (!modal) return;
		var howEl = modalOl();
		howInitial = howEl ? howEl.innerHTML : '';

		$('#vcc-wizard-next1').addEventListener('click', function () {
			var donor = $('#vcc-assistant-donor').value.trim();
			if (!donor) {
				toast('Сначала укажите ссылку на страницу-образец', 'warn');
				$('#vcc-assistant-donor').focus();
				return;
			}
			taSyncPrompt();
			showStep(2);
		});
		$('#vcc-wizard-back2').addEventListener('click', function () { showStep(1); });
		$('#vcc-wizard-next2').addEventListener('click', function () { showStep(3); });
		$('#vcc-assistant-copy').addEventListener('click', function () { copyPrompt(this); });
		$('#vcc-wizard-back3').addEventListener('click', function () { showStep(2); });
		$('#vcc-assistant-build').addEventListener('click', buildLanding);
		$('#vcc-assistant-close').addEventListener('click', closeAssistant);
		$('#vcc-assistant-backdrop').addEventListener('click', closeAssistant);

		$('#vcc-assistant-donor').addEventListener('input', taSyncPrompt);
		$('#vcc-assistant-wishes').addEventListener('input', taSyncPrompt);
	}

	function taSyncPrompt() {
		var ta = $('#vcc-assistant-prompt');
		if (!ta) return;
		ta.value = VccPassport.buildPrompt(
			$('#vcc-assistant-donor').value,
			$('#vcc-assistant-wishes').value
		);
		updateSize();
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initAssistant);
	} else {
		initAssistant();
	}

	window.VccAssistant = { open: openAssistant, close: closeAssistant };
})();

})();
