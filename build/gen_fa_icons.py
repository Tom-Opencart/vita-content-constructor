# -*- coding: utf-8 -*-
"""Генератор src/core/fa_icons.js — списка иконок Font Awesome 4.7 для пикера.

Источник истины — CSS темы (upload/catalog/view/theme/<theme>/stylesheet/
vendor/font-awesome.min.css): это ровно тот шрифт, которым рисуется витрина,
поэтому пикер не может предложить иконку, которой на магазине нет.

Запуск (из корня репозитория конструктора):
    python build/gen_fa_icons.py [--css <путь к font-awesome.min.css>]

Результат детерминирован: имена отсортированы, категории в фиксированном
порядке, timestamp не пишется.
"""
import argparse
import io
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DEFAULT_CSS_CANDIDATES = [
    r"C:/Users/tomop/Downloads/vita-main/upload/catalog/view/theme/vita/stylesheet/vendor/font-awesome.min.css",
    r"C:/Users/tomop/Downloads/vita-theme/upload/catalog/view/theme/vita/stylesheet/vendor/font-awesome.min.css",
]

# Категории в порядке показа. Первое совпадение по ключу забирает иконку,
# поэтому более специфичные группы стоят раньше общих.
GROUPS = [
    ("Бренды и соцсети", [
        "facebook", "twitter", "instagram", "linkedin", "youtube", "vimeo",
        "telegram", "whatsapp", "skype", "pinterest", "tumblr", "flickr",
        "dribbble", "behance", "github", "gitlab", "bitbucket", "vk",
        "odnoklassniki", "ok", "tiktok", "twitch", "spotify", "soundcloud",
        "rss", "slideshare", "stack-overflow", "yelp", "foursquare",
        "xing", "renren", "qq", "weibo", "alipay", "amazon", "paypal",
        "apple", "android", "windows", "linux", "chrome", "firefox",
        "edge", "opera", "internet-explorer", "modx", "joomla", "drupal",
        "wordpress", "magento", "shopify", "bity",
    ]),
    ("Действия", [
        "check", "times", "plus", "minus", "pencil", "trash", "edit", "save",
        "copy", "cut", "paste", "search", "refresh", "repeat", "undo", "redo",
        "download", "upload", "import", "export", "print", "envelope",
        "send", "reply", "forward", "share", "link", "unlink", "paperclip",
        "bookmark", "tag", "filter", "sort", "bars", "list", "th", "compress",
        "expand", "eye", "eye-slash", "wrench", "cog", "cogs", "gears",
        "truck", "gift", "bolt", "plug", "power-off", "cogs",
    ]),
    ("Стрелки и направление", [
        "arrow", "chevron", "angle", "caret", "exchange", "compress",
        "expand", "rotate", "random", "shuffle", "sort", "backward",
        "forward", "fast", "step", "play", "stop", "pause",
    ]),
    ("Формы и статусы", [
        "info-circle", "question-circle", "exclamation", "ban", "warning",
        "bell", "clock-o", "calendar", "hourglass", "spinner", "check-circle",
        "times-circle", "dot-circle-o", "plus-circle", "minus-circle",
        "key", "lock", "unlock", "shield", "fire", "bolt",
    ]),
    ("Интерфейс", [
        "home", "user", "users", "cog", "dashboard", "bars", "menu",
        "th-large", "picture-o", "camera", "film", "music", "headphones",
        "microphone", "volume", "search", "bell", "star", "heart", "bookmark",
        "folder", "file", "files-o", "clipboard", "table", "list-alt",
        "map", "map-marker", "location-arrow", "globe", "language",
        "desktop", "laptop", "tablet", "mobile", "tv", "wifi", "signal",
        "battery", "plug", "usb", "database", "server", "sitemap",
    ]),
    ("Коммерция", [
        "shopping-cart", "shopping-bag", "credit-card", "money", "dollar",
        "euro", "ruble", "gbp", "jpy", "tag", "tags", "gift", "bar-chart",
        "line-chart", "area-chart", "pie-chart", "briefcase", "suitcase",
        "calculator", "balance-scale", "bank", "certificate", "award",
    ]),
    ("Интернет и технологии", [
        "code", "terminal", "keyboard", "laptop", "server", "database",
        "git", "github", "linux", "windows", "apple", "android", "chrome",
        "firefox", "cloud", "cogs", "microchip", "bolt", "cube", "cubes",
    ]),
]


def find_css(explicit):
    if explicit:
        return explicit
    for path in DEFAULT_CSS_CANDIDATES:
        if os.path.exists(path):
            return path
    return None


def extract_names(css_path):
    with io.open(css_path, "r", encoding="utf-8") as f:
        css = f.read()
    names = set(re.findall(r"\.fa-([a-z0-9-]+):before", css))
    # .fa-alias.fa-x:before — псевдонимы, в пикере не нужны: тот же глиф
    # уже есть под основным именем, дубли только путают.
    aliases = set(re.findall(r"\.fa-alias\.fa-([a-z0-9-]+):before", css))
    return sorted(names - aliases)


def assign_group(name):
    """Категория по ТОКЕНАМ имени, не по подстроке.

    Имена FA строятся через '-': 'address-book', 'book-o', 'facebook-square'.
    Ключ совпадает, если он сам токен, целое имя или его префикс до
    варианта ('-o', '-square', '-alt', ...). Наивный поиск подстроки ломал
    разбор: ключ 'ok' ловил 'address-book' и 'bookmark'.
    """
    tokens = name.split('-')
    for title, keys in GROUPS:
        for key in keys:
            key_tokens = key.split('-')
            if key_tokens == tokens:
                return title
            if name == key:
                return title
            # префикс до варианта: facebook-square -> facebook
            if len(tokens) > len(key_tokens) and tokens[:len(key_tokens)] == key_tokens:
                return title
    return "Прочее"


# Остаток делится по первой букве на небольшие группы: одна «Прочее»
# на 400+ иконок в пикере бесполезна, а поиск всё равно ведёт по имени.
REST_RANGES = [
    ("0-9", "0", "9"),
    ("A-C", "a", "c"),
    ("D-F", "d", "f"),
    ("G-I", "g", "i"),
    ("J-L", "j", "l"),
    ("M-P", "m", "p"),
    ("Q-S", "q", "s"),
    ("T-V", "t", "v"),
    ("W-Z", "w", "z"),
]


def bucket_rest(rest):
    """Остаток -> компактные алфавитные группы; нерассортированное — в хвост."""
    out = []
    for title, lo, hi in REST_RANGES:
        chunk = [n for n in rest if lo <= n[0] <= hi]
        if chunk:
            out.append(("Прочее · " + title, chunk))
    tail = [n for n in rest if not any(lo <= n[0] <= hi for _, lo, hi in REST_RANGES)]
    if tail:
        out.append(("Прочее · прочее", tail))
    return out


def render(names):
    buckets = [(title, []) for title, _ in GROUPS]
    index = dict((title, i) for i, (title, _) in enumerate(buckets))
    rest = []
    for name in names:
        title = assign_group(name)
        if title in index:
            buckets[index[title]][1].append(name)
        else:
            rest.append(name)
    buckets.extend(bucket_rest(rest))

    lines = []
    lines.append("/* Font Awesome 4.7 — список иконок для пикера. Файл СГЕНЕРИРОВАН:")
    lines.append(" *   python build/gen_fa_icons.py")
    lines.append(" * Источник — CSS темы (тот же шрифт, что рисует витрину),")
    lines.append(" * поэтому пикер не предложит иконку, которой на магазине нет.")
    lines.append(" * Правьте build/gen_fa_icons.py, не этот файл. */")
    lines.append("window.VCC_FA_GROUPS = [")
    for title, items in buckets:
        lines.append("\t{ title: '%s', icons: [" % title)
        for i in range(0, len(items), 12):
            chunk = items[i:i + 12]
            lines.append("\t\t" + " ".join("'%s'," % n for n in chunk))
        lines.append("\t] },")
    lines.append("];")
    return "\n".join(lines) + "\n"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--css", default=None)
    args = ap.parse_args()

    css_path = find_css(args.css)
    if not css_path:
        sys.stderr.write(
            "CSS темы не найден. Передайте путь явно: --css <font-awesome.min.css>\n"
        )
        return 1

    names = extract_names(css_path)
    if len(names) < 500:
        sys.stderr.write("Странно мало иконок (%d) — проверьте файл: %s\n" % (len(names), css_path))
        return 1

    out = os.path.join(ROOT, "src", "core", "fa_icons.js")
    with io.open(out, "w", encoding="utf-8", newline="\n") as f:
        f.write(render(names))
    print("icons: %d -> %s" % (len(names), out))
    return 0


if __name__ == "__main__":
    sys.exit(main())
