# Паспорт возможностей — Вита · Конструктор контента

Версия конструктора: 0.9.13 · контракт: vcc-v1
Документ сгенерирован из реестра блоков при сборке — ручные правки будут затёрты (tools/dump_passport.js).

Этот документ — полное описание того, что умеет конструктор. Он же входит в промт
режима «Создать по донору»: вставьте его в любой AI с доступом в веб вместе со ссылкой
на страницу-донор — и получите JSON-проект, который конструктор соберёт в лендинг.

## Каркас проекта

КАРКАС ПРОЕКТА (JSON):
- type: "vita-constructor-project" (обязателен)
- contract: "vcc-v1" (обязателен)
- slug — латинский slug для имени файла (title устарел и не нужен)
- themeMode: "light" | "dark" (режим предпросмотра)
- blocks — упорядоченный массив блоков: { id: String, type: String (из реестра), data: Object }

## Общие поля секции (`data.sec` у секционных блоков)

eyebrow — надзаголовок (короткая строка над заголовком);
title — заголовок секции;
text — подзаголовок секции;
align — left | center;
bg — фон: none | light | surface | primary | image | video;
image — путь картинки фона (для bg=image), image/catalog/...;
video — ссылка фонового видео (для bg=video);
overlay — true: затемнение поверх фона (обязательно для читаемости текста на bg=image/video);
padding — вертикальные отступы: s | m | l | xl;
width — ширина контента: narrow | default | full;
anchor — якорь латиницей для ссылок #anchor

## Инлайн-разметка текстов

Единственный разрешённый «HTML» в текстовых полях:
- `**жирный**`, `*курсив*`, `` `код` ``
- `[текст](https://example.com)` — ссылка
- `[текст](form:N)` — кнопка-ссылка, открывающая форму магазина N
- `[текст](agree:N)` — ссылка на страницу соглашения N
- `==акцент==` — выделение фирменным цветом

## Правила качества

1. Ровно один H1 на страницу — только в блоке hero. Остальные заголовки: heading H2/H3/H4 или заголовки секций (sec.title).
2. Тексты — короткие заглушки-намёки по мотивам донора (ремикс, НЕ дословное копирование чужого контента). Русский язык.
3. Цвета, шрифты и отступы НЕ указываются — их задаёт палитра магазина. Никакого HTML, CSS, JavaScript и hex-цветов в текстах.
4. Якоря секций (sec.anchor) — латиницей, без пробелов.
5. Ссылки: https://..., #якорь, form:N (открыть форму магазина), agree:N (страница соглашения). form:N и ID модулей (faqId/formId/blockId) ставь ТОЛЬКО если пользователь попросил в пожеланиях; иначе оставь 0.
6. Объём: 6–12 блоков. Структура донора важнее его наполнения: порядок и смысл секций, не их количество.
7. Не выдумывай типы блоков: только перечисленные в реестре. Если для части донора нет подходящего блока — просто опусти её.
8. Иконки — FontAwesome 4 имена без префикса fa- (truck, shield, clock-o...).

## Реестр блоков

### Секции лендинга

#### hero — Обложка (Hero)
Первый экран лендинга: H1, подзаголовок, до двух кнопок, строка доверия.
Поля data:
- `_hint` — hint
- `sec` — общие поля секции (см. «Общие поля секции» выше)
- `title` — многострочный текст с инлайн-разметкой (**жирный**, *курсив*, [текст](url), [кнопка](form:N), [соглашение](agree:N), ==акцент==, `код`)
- `sub` — многострочный текст с инлайн-разметкой (**жирный**, *курсив*, [текст](url), [кнопка](form:N), [соглашение](agree:N), ==акцент==, `код`)
- `btn1_label` — строка
- `btn1_url` — строка
- `btn2_label` — строка
- `btn2_url` — строка
- `note` — строка
- `align` — одно из значений: center | left
Пример:
```json
{"id":"b1","type":"hero","data":{"title":"Заголовок, который ==продаёт== сам","sub":"Подзаголовок с главным обещанием страницы: что получит покупатель и почему это стоит десяти секунд его внимания.","btn1_label":"Выбрать товар","btn1_url":"#tarify","btn2_label":"Как мы работаем","btn2_url":"#shagi","note":"Гарантия возврата · Доставка по всей стране","align":"center","sec":{"eyebrow":"","title":"","text":"","align":"left","bg":"image","image":"","video":"","overlay":true,"padding":"xl","width":"default","anchor":""}}}
```

#### logos — Логотипы партнёров
Полоса логотипов партнёров/клиентов.
Поля data:
- `sec` — общие поля секции (см. «Общие поля секции» выше)
- `items` — массив объектов { src, alt, url }
Пример:
```json
{"id":"b1","type":"logos","data":{"sec":{"eyebrow":"Нам доверяют","title":"Работают с нами","text":"","align":"left","bg":"none","image":"","video":"","overlay":false,"padding":"m","width":"default","anchor":""},"items":[{"src":"","alt":"Партнёр 1"},{"src":"","alt":"Партнёр 2"},{"src":"","alt":"Партнёр 3"}]}}
```

#### features — Преимущества
Сетка карточек-преимуществ с иконками (2–4 колонки).
Поля data:
- `sec` — общие поля секции (см. «Общие поля секции» выше)
- `cols` — одно из значений: 2 | 3 | 4
- `items` — массив объектов { icon, title, text }
Пример:
```json
{"id":"b1","type":"features","data":{"sec":{"eyebrow":"Почему мы","title":"Наши преимущества","text":"","align":"left","bg":"light","image":"","video":"","overlay":false,"padding":"l","width":"default","anchor":""},"cols":"3","items":[{"icon":"truck","title":"Быстрая доставка","text":"Отправляем заказ в день оформления — покупатель получит покупку без лишнего ожидания."},{"icon":"shield","title":"Гарантия качества","text":"Официальная гарантия на весь ассортимент и честный возврат без объяснения причин."},{"icon":"headphones","title":"Живая поддержка","text":"Отвечаем на вопросы по телефону и в мессенджерах — люди, а не роботы."}]}}
```

#### media_text — Картинка + текст
Картинка + текст рядом, кнопка, картинка может стоять справа (flip).
Поля data:
- `sec` — общие поля секции (см. «Общие поля секции» выше)
- `img` — строка
- `img_alt` — строка
- `caption` — строка
- `flip` — булево (true/false)
- `text` — многострочный текст с инлайн-разметкой (**жирный**, *курсив*, [текст](url), [кнопка](form:N), [соглашение](agree:N), ==акцент==, `код`)
- `btn_label` — строка
- `btn_url` — строка
Пример:
```json
{"id":"b1","type":"media_text","data":{"sec":{"eyebrow":"","title":"О компании в двух словах","text":"","align":"left","bg":"surface","image":"","video":"","overlay":false,"padding":"l","width":"default","anchor":""},"img":"","img_alt":"","caption":"","text":"Расскажите историю магазина: как появились, чем помогаете покупателям и почему вам можно доверять. Живой текст продаёт лучше любого баннера.","btn_label":"","btn_url":""}}
```

#### before_after — До / После
Поля data:
- `sec` — общие поля секции (см. «Общие поля секции» выше)
- `cols` — одно из значений: 2 | 3 | 4
- `items` — массив объектов { image, img_alt, title, text }
- `_hint` — hint
Пример:
```json
{"id":"b1","type":"before_after","data":{"sec":{"eyebrow":"","title":"Результат до и после","text":"","align":"center","bg":"surface","image":"","video":"","overlay":false,"padding":"l","width":"default","anchor":""},"cols":"2","items":[{"image":"","img_alt":"До","title":"До","text":"Опишите исходное состояние: с чем пришёл клиент и что его не устраивало."},{"image":"","img_alt":"После","title":"После","text":"Покажите результат: что изменилось и какую пользу получил клиент."}]}}
```

#### steps — Шаги / Таймлайн
Шаги процесса: numbers (номера) или timeline (вертикальная линия).
Поля data:
- `sec` — общие поля секции (см. «Общие поля секции» выше)
- `style` — одно из значений: timeline | numbers
- `items` — массив объектов { label, icon, title, text }
Пример:
```json
{"id":"b1","type":"steps","data":{"sec":{"eyebrow":"Как это работает","title":"Три шага до результата","text":"","align":"left","bg":"none","image":"","video":"","overlay":false,"padding":"l","width":"default","anchor":""},"style":"timeline","items":[{"title":"Заявка","text":"Оставьте заявку на сайте или позвоните — это займёт минуту."},{"title":"Подбор","text":"Подберём решение под вашу задачу и бюджет, предложим варианты."},{"title":"Результат","text":"Выполняем работу и сдаём результат точно в срок."}]}}
```

#### stats — Цифры и факты
Полоса цифр-показателей: { value, suffix, label }.
Поля data:
- `sec` — общие поля секции (см. «Общие поля секции» выше)
- `items` — массив объектов { value, suffix, label }
Пример:
```json
{"id":"b1","type":"stats","data":{"sec":{"eyebrow":"","title":"Немного цифр","text":"","align":"left","bg":"primary","image":"","video":"","overlay":false,"padding":"m","width":"default","anchor":""},"items":[{"value":"10","suffix":" лет","label":"на рынке"},{"value":"25","suffix":" 000+","label":"довольных клиентов"},{"value":"98","suffix":"%","label":"заказов точно в срок"}]}}
```

#### reviews — Отзывы (текстовые)
Карточки отзывов: текст, имя, роль, звёзды 0–5, аватар.
Поля data:
- `sec` — общие поля секции (см. «Общие поля секции» выше)
- `cols` — одно из значений: 2 | 3
- `items` — массив объектов { text, name, role, stars, avatar }
- `_hint` — hint
Пример:
```json
{"id":"b1","type":"reviews","data":{"sec":{"eyebrow":"Отзывы","title":"Что говорят покупатели","text":"","align":"left","bg":"light","image":"","video":"","overlay":false,"padding":"l","width":"default","anchor":""},"cols":"3","items":[{"text":"Заказ пришёл на день раньше срока, упаковка — на отлично. Теперь покупаю только здесь.","name":"Анна","role":"постоянный покупатель","stars":5},{"text":"Помогли подобрать модель под мою задачу, ответили на все вопросы по телефону. Спасибо!","name":"Дмитрий","role":"Частное лицо","stars":5},{"text":"Прозрачные цены и честная гарантия — никаких сюрпризов после оплаты.","name":"Марина","role":"Корпоративный клиент","stars":4}]}}
```

#### team — Команда
Команда: фото, имя, роль, описание.
Поля data:
- `sec` — общие поля секции (см. «Общие поля секции» выше)
- `items` — массив объектов { photo, name, role, text }
Пример:
```json
{"id":"b1","type":"team","data":{"sec":{"eyebrow":"Команда","title":"Люди, которым вы доверяете","text":"","align":"left","bg":"none","image":"","video":"","overlay":false,"padding":"l","width":"default","anchor":""},"items":[{"photo":"","name":"Иван Петров","role":"Основатель","text":"Отвечает за качество каждой поставки."}]}}
```

#### documents — Документы
Сетка документов/сертификатов: картинка-превью + название.
Поля data:
- `sec` — общие поля секции (см. «Общие поля секции» выше)
- `items` — массив объектов { image, title, url }
Пример:
```json
{"id":"b1","type":"documents","data":{"sec":{"eyebrow":"Документы","title":"Сертификаты и разрешения","text":"","align":"left","bg":"surface","image":"","video":"","overlay":false,"padding":"m","width":"default","anchor":""},"items":[{"image":"","title":"Сертификат соответствия","url":""}]}}
```

#### cta — Призыв к действию
Финальный призыв к действию: заголовок, текст, до двух кнопок.
Поля data:
- `sec` — общие поля секции (см. «Общие поля секции» выше)
- `text` — многострочный текст с инлайн-разметкой (**жирный**, *курсив*, [текст](url), [кнопка](form:N), [соглашение](agree:N), ==акцент==, `код`)
- `btn1_label` — строка
- `btn1_url` — строка
- `btn2_label` — строка
- `btn2_url` — строка
- `_hint` — hint
Пример:
```json
{"id":"b1","type":"cta","data":{"sec":{"eyebrow":"","title":"Готовы начать?","text":"","align":"center","bg":"primary","image":"","video":"","overlay":false,"padding":"l","width":"narrow","anchor":""},"text":"Оставьте заявку — перезвоним в течение рабочего дня, ответим на вопросы и подберём решение под вашу задачу.","btn1_label":"Оставить заявку","btn1_url":"form:0","btn2_label":"","btn2_url":""}}
```

#### contacts — Контакты
Список контактов: { icon, label, value, url }.
Поля data:
- `sec` — общие поля секции (см. «Общие поля секции» выше)
- `items` — массив объектов { icon, label, value, url }
- `_hint` — hint
Пример:
```json
{"id":"b1","type":"contacts","data":{"sec":{"eyebrow":"Контакты","title":"Свяжитесь с нами","text":"","align":"left","bg":"light","image":"","video":"","overlay":false,"padding":"l","width":"narrow","anchor":""},"items":[{"icon":"phone","label":"Телефон","value":"+7 (900) 000-00-00","url":"tel:+79000000000"},{"icon":"envelope-o","label":"E-mail","value":"sale@example.com","url":"mailto:sale@example.com"},{"icon":"map-marker","label":"Адрес","value":"г. Москва, ул. Примерная, 1","url":""}]}}
```

#### socials — Соцсети
Кнопки-ссылки соцсетей: { icon, url, label }.
Поля data:
- `sec` — общие поля секции (см. «Общие поля секции» выше)
- `align` — одно из значений: center | left
- `items` — массив объектов { icon, url, label }
- `_hint` — hint
Пример:
```json
{"id":"b1","type":"socials","data":{"sec":{"eyebrow":"","title":"Мы в соцсетях","text":"","align":"left","bg":"none","image":"","video":"","overlay":false,"padding":"m","width":"default","anchor":""},"align":"center","items":[{"icon":"telegram","url":"https://example.com/tg","label":"Telegram"}]}}
```

#### badges — Бейджи доверия
Плашки доверия с иконкой: { icon, title, text }.
Поля data:
- `sec` — общие поля секции (см. «Общие поля секции» выше)
- `items` — массив объектов { icon, title, text }
Пример:
```json
{"id":"b1","type":"badges","data":{"sec":{"eyebrow":"","title":"","text":"","align":"left","bg":"none","image":"","video":"","overlay":false,"padding":"s","width":"default","anchor":""},"items":[{"icon":"credit-card","title":"Удобная оплата","text":"Картой, наличными или по счёту"},{"icon":"truck","title":"Быстрая доставка","text":"СДЭК, Почта, самовывоз"},{"icon":"shield","title":"Гарантия","text":"Возврат без объяснений"}]}}
```

#### checklist — Чек-лист
Список с галочками, пункты — инлайн-разметка.
Поля data:
- `sec` — общие поля секции (см. «Общие поля секции» выше)
- `cols` — одно из значений: 1 | 2
- `items` — массив объектов { md }
Пример:
```json
{"id":"b1","type":"checklist","data":{"sec":{"eyebrow":"","title":"Что вы получаете","text":"","align":"left","bg":"surface","image":"","video":"","overlay":false,"padding":"m","width":"narrow","anchor":""},"cols":"1","items":[{"md":"Прозрачную смету без скрытых доплат"},{"md":"Договор и гарантию на работы"},{"md":"Поддержку после сдачи проекта"}]}}
```

#### divider — Разделитель
Разделитель: отступ / линия / орнамент.
Поля data:
- `sec` — общие поля секции (см. «Общие поля секции» выше)
- `style` — одно из значений: space | line | ornament
Пример:
```json
{"id":"b1","type":"divider","data":{"style":"space","sec":{"eyebrow":"","title":"","text":"","align":"left","bg":"none","image":"","video":"","overlay":false,"padding":"s","width":"default","anchor":""}}}
```

#### seotext — SEO-текст (спойлер)
Сворачиваемый SEO-текст: заголовок + большой текст.
Поля data:
- `sec` — общие поля секции (см. «Общие поля секции» выше)
- `title` — строка
- `text` — многострочный текст с инлайн-разметкой (**жирный**, *курсив*, [текст](url), [кнопка](form:N), [соглашение](agree:N), ==акцент==, `код`)
- `open` — булево (true/false)
Пример:
```json
{"id":"b1","type":"seotext","data":{"sec":{"eyebrow":"","title":"","text":"","align":"left","bg":"none","image":"","video":"","overlay":false,"padding":"m","width":"narrow","anchor":""},"title":"Подробнее о магазине","text":"Развернутый текст о компании, ассортименте и преимуществах для поисковых систем. Посетители видят только заголовок и могут раскрыть его кликом.","open":false}}
```

#### pricing — Тарифы
Карточки тарифов: цена, старая цена, пункты-фичи, флаг «Рекомендуем», кнопка.
Поля data:
- `sec` — общие поля секции (см. «Общие поля секции» выше)
- `align` — одно из значений: center | left
- `items` — массив объектов { name, price, old_price, period, features, featured, flag_label, btn_label, btn_url, note }
- `_hint` — hint
Пример:
```json
{"id":"b1","type":"pricing","data":{"sec":{"eyebrow":"Тарифы","title":"Выберите подходящий","text":"","align":"left","bg":"light","image":"","video":"","overlay":false,"padding":"l","width":"default","anchor":""},"align":"center","items":[{"name":"Базовый","price":"от 5 900 ₽","period":"","features":"Консультация\nПодбор решения\nПоддержка 1 месяц","featured":false,"btn_label":"Выбрать","btn_url":"form:0"},{"name":"Стандарт","price":"от 12 900 ₽","period":"","features":"Всё из «Базового»\nНастройка под задачу\nОбучение команды","featured":true,"btn_label":"Выбрать","btn_url":"form:0"},{"name":"Максимум","price":"по запросу","period":"","features":"Всё из «Стандарта»\nПерсональный менеджер\nSLA-поддержка","featured":false,"btn_label":"Связаться","btn_url":"form:0"}]}}
```

#### columns — Колонки текста
Колонки произвольного текста (2–4).
Поля data:
- `sec` — общие поля секции (см. «Общие поля секции» выше)
- `cols` — одно из значений: 2 | 3 | 4
- `items` — массив объектов { md }
Пример:
```json
{"id":"b1","type":"columns","data":{"sec":{"eyebrow":"","title":"","text":"","align":"left","bg":"none","image":"","video":"","overlay":false,"padding":"m","width":"default","anchor":""},"cols":"3","items":[{"md":"Первая колонка. Здесь может быть описание, список или ссылка [пример](https://example.com)."},{"md":"Вторая колонка. Поддерживается всё, что умеет текстовый блок."},{"md":"Третья колонка. ==Акцент== выделяется фирменным цветом."}]}}
```

#### key_card — Карточка ключа
Поля data:
- `sec` — общие поля секции (см. «Общие поля секции» выше)
- `_hint` — hint
- `meta_left` — строка
- `meta_right` — строка
- `card_label` — строка
- `segs` — массив объектов { value, dim }
- `sep` — строка
- `chips` — массив объектов { icon, text }
Пример:
```json
{"id":"b1","type":"key_card","data":{"sec":{"eyebrow":"","title":"","text":"","align":"left","bg":"none","image":"","video":"","overlay":false,"padding":"m","width":"narrow","anchor":""},"meta_left":"Лицензия","meta_right":"VITA-3.0","card_label":"Ключ продукта","segs":[{"value":"VITA","dim":false},{"value":"8F2C-ZQ91","dim":true},{"value":"K4D7-TX5E","dim":false}],"sep":"-","chips":[{"icon":"fa-check-circle-o","text":"Активирован"},{"icon":"fa-calendar-check-o","text":"До 2027-01-15"}]}}
```

#### code_window — Код-окно
Поля data:
- `sec` — общие поля секции (см. «Общие поля секции» выше)
- `_hint` — hint
- `filename` — строка
- `lines` — массив объектов { tag, text }
Пример:
```json
{"id":"b1","type":"code_window","data":{"sec":{"eyebrow":"","title":"","text":"","align":"left","bg":"none","image":"","video":"","overlay":false,"padding":"m","width":"narrow","anchor":""},"filename":"example.js","lines":[{"tag":"keyword","text":"const"},{"tag":"plain","text":" greeting "},{"tag":"punctuation","text":"= "},{"tag":"string","text":"'Привет, мир!'"},{"tag":"punctuation","text":";"}]}}
```

#### video — Видео
Видео с YouTube/Vimeo/Rutube: ссылка или iframe-код сервиса.
Поля data:
- `sec` — общие поля секции (см. «Общие поля секции» выше)
- `src` — текст (многострочный
- `ratio` — одно из значений: 16x9 | 4x3 | 1x1
- `title` — строка
Пример:
```json
{"id":"b1","type":"video","data":{"src":"","ratio":"16x9","title":"","sec":{"eyebrow":"","title":"","text":"","align":"left","bg":"none","image":"","video":"","overlay":false,"padding":"m","width":"default","anchor":""}}}
```

### Текстовые блоки

#### heading — Заголовок
Заголовок статьи (H2–H4). H1 конструктор ставит сам только в блоке hero.
Поля data:
- `level` — одно из значений: 2 | 3 | 4
- `text` — многострочный текст с инлайн-разметкой (**жирный**, *курсив*, [текст](url), [кнопка](form:N), [соглашение](agree:N), ==акцент==, `код`)
Пример:
```json
{"id":"b1","type":"heading","data":{"level":2,"text":"Новый заголовок"}}
```

#### paragraph — Текст
Абзац текста с инлайн-разметкой.
Поля data:
- `text` — многострочный текст с инлайн-разметкой (**жирный**, *курсив*, [текст](url), [кнопка](form:N), [соглашение](agree:N), ==акцент==, `код`)
Пример:
```json
{"id":"b1","type":"paragraph","data":{"text":"Текст абзаца. Поддерживается **жирный**, *курсив*, `код`, [ссылки](https://example.com) и [соглашения](agree:3)."}}
```

#### list — Список
Маркированный или нумерованный список, один пункт на строку.
Поля data:
- `ordered` — булево (true/false)
- `items` — многострочный текст с инлайн-разметкой (**жирный**, *курсив*, [текст](url), [кнопка](form:N), [соглашение](agree:N), ==акцент==, `код`)
Пример:
```json
{"id":"b1","type":"list","data":{"ordered":false,"items":"Первый пункт\nВторой пункт\nТретий пункт"}}
```

#### quote — Цитата
Цитата с необязательным автором.
Поля data:
- `text` — многострочный текст с инлайн-разметкой (**жирный**, *курсив*, [текст](url), [кнопка](form:N), [соглашение](agree:N), ==акцент==, `код`)
- `author` — строка
Пример:
```json
{"id":"b1","type":"quote","data":{"text":"Текст цитаты","author":""}}
```

#### alert — Врезка
Цветная врезка-акцент: info/success/warning/danger.
Поля data:
- `style` — одно из значений: info | success | warning | danger
- `text` — многострочный текст с инлайн-разметкой (**жирный**, *курсив*, [текст](url), [кнопка](form:N), [соглашение](agree:N), ==акцент==, `код`)
Пример:
```json
{"id":"b1","type":"alert","data":{"style":"info","text":"Важная информация для покупателя."}}
```

#### tabs — Табы
Вкладки: массив { title, content }.
Поля data:
- `tabs` — массив { title, content }
Пример:
```json
{"id":"b1","type":"tabs","data":{"tabs":[{"title":"Вкладка 1","content":"Содержимое первой вкладки."},{"title":"Вкладка 2","content":"Содержимое второй вкладки."}]}}
```

#### table — Таблица
Таблица: строка заголовков и строки данных, ячейки через перенос строки.
Поля data:
- `cols` — одно из значений: 2 | 3 | 4
- `_hh` — group-label
- `h0` — строка
- `h1` — строка
- `rows` — массив объектов { c0, c1 }
- `_hint` — hint
Пример:
```json
{"id":"b1","type":"table","data":{"cols":"2","headers":["Параметр","Значение"],"rows":[["Гарантия","12 месяцев"],["Доставка","[Рассчитать](form:0)"]]}}
```

#### image — Картинка
Картинка из медиатеки (image/catalog/...) с подписью.
Поля data:
- `path` — строка
- `caption` — строка
Пример:
```json
{"id":"b1","type":"image","data":{"path":"","caption":""}}
```

#### toc — Оглавление
Оглавление по заголовкам статьи — собирается автоматически.
Поля data:
- `title` — строка
- `style` — одно из значений: header | column
Пример:
```json
{"id":"b1","type":"toc","data":{"title":"Содержание","style":"header"}}
```

### Живые модули магазина (спец-метки)

#### vita_html — HTML темы (спец-метка)
Сырой HTML строго в whitelist санитайзера темы — используйте в последнюю очередь. Можно задать секцию (фон/отступы/якорь).
Поля data:
- `content` — текст (многострочный
- `_hint` — hint
- `sec` — общие поля секции (см. «Общие поля секции» выше)
Пример:
```json
{"id":"b1","type":"vita_html","data":{"content":"<div class=\"vcc-paragraph\">Ваш HTML…</div>","sec":{"eyebrow":"","title":"","text":"","align":"left","bg":"none","image":"","video":"","overlay":false,"padding":"m","width":"default","anchor":""}}}
```

#### vita_visual — Визуальные блоки (спец-метка)
Готовый визуальный блок модуля «Вита — Визуальные блоки» по ID. Можно задать секцию (фон/отступы/якорь).
Поля data:
- `_catalog_hint` — hint
- `blockId` — number
- `sec` — общие поля секции (см. «Общие поля секции» выше)
Пример:
```json
{"id":"b1","type":"vita_visual","data":{"blockId":1,"sec":{"eyebrow":"","title":"","text":"","align":"left","bg":"none","image":"","video":"","overlay":false,"padding":"m","width":"default","anchor":""}}}
```

#### vita_all_in_one — Универсальные блоки товаров (спец-метка)
Блок модуля «Вита — Универсальные блоки товаров» по ID. Можно задать секцию (фон/отступы/якорь).
Поля data:
- `_catalog_hint` — hint
- `blockId` — number
- `sec` — общие поля секции (см. «Общие поля секции» выше)
Пример:
```json
{"id":"b1","type":"vita_all_in_one","data":{"blockId":1,"sec":{"eyebrow":"","title":"","text":"","align":"left","bg":"none","image":"","video":"","overlay":false,"padding":"m","width":"default","anchor":""}}}
```

#### vita_extra_wall — Стена категорий и брендов (спец-метка)
Стена категорий/брендов модуля «Вита — Стена» по ID. Можно задать секцию (фон/отступы/якорь).
Поля data:
- `_catalog_hint` — hint
- `blockId` — number
- `sec` — общие поля секции (см. «Общие поля секции» выше)
Пример:
```json
{"id":"b1","type":"vita_extra_wall","data":{"blockId":1,"sec":{"eyebrow":"","title":"","text":"","align":"left","bg":"none","image":"","video":"","overlay":false,"padding":"m","width":"default","anchor":""}}}
```

#### vita_faq — FAQ-группы (спец-метка)
Живой FAQ магазина: аккордеон из модуля «Вита — FAQ» + SEO-разметка. faqId 0 — все активные группы. Можно задать секцию (фон/отступы/якорь) — блок обернётся в vcc-section.
Поля data:
- `_catalog_hint` — hint
- `faqId` — number
- `title` — строка
- `sec` — общие поля секции (см. «Общие поля секции» выше)
Пример:
```json
{"id":"b1","type":"vita_faq","data":{"faqId":0,"title":"","sec":{"eyebrow":"","title":"","text":"","align":"left","bg":"none","image":"","video":"","overlay":false,"padding":"m","width":"default","anchor":""}}}
```

#### vita_form — Форма (спец-метка)
Живая форма магазина (модуль «Вита — Формы»). formId 0 — блок не экспортируется. Можно задать секцию (фон/отступы/якорь) — блок обернётся в vcc-section.
Поля data:
- `_catalog_hint` — hint
- `formId` — number
- `sec` — общие поля секции (см. «Общие поля секции» выше)
Пример:
```json
{"id":"b1","type":"vita_form","data":{"formId":1,"sec":{"eyebrow":"","title":"","text":"","align":"left","bg":"none","image":"","video":"","overlay":false,"padding":"m","width":"default","anchor":""}}}
```

#### vita_testimonial — Отзыв о магазине (спец-метка)
Поля data:
- `_catalog_hint` — hint
- `testimonialId` — number
- `count` — number
- `random` — булево (true/false)
- `_hint` — hint
- `sec` — общие поля секции (см. «Общие поля секции» выше)
Пример:
```json
{"id":"b1","type":"vita_testimonial","data":{"testimonialId":0,"count":3,"random":false,"sec":{"eyebrow":"","title":"","text":"","align":"left","bg":"none","image":"","video":"","overlay":false,"padding":"m","width":"default","anchor":""}}}
```

## Формат ответа для AI

ФОРМАТ ОТВЕТА (строго):
Верни ТОЛЬКО JSON-объект проекта, без markdown-забора ``` и без пояснений до или после:
{
  "type": "vita-constructor-project",
  "contract": "vcc-v1",
  "slug": "латинский-slug",
  "themeMode": "light",
  "blocks": [ { "id": "b1", "type": "…", "data": { … } } ]
}
Поля id/theme/themeMode можно опустить — конструктор достроит их сам. Обязательны: type блока и data.
