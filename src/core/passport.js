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
