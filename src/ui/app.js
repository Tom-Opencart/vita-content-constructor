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
