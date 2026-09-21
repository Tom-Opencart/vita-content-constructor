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
