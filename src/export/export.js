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
