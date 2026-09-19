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
