# -*- coding: utf-8 -*-
"""
release_to_theme.py — оркестратор цепочки «Конструктор → Тема Вита».

Один прогон заменяет ручную последовательность из AGENTS.md
(«Update flow» контракта vcc-v1):

    python build/release_to_theme.py
        [--constructor-version 0.10.0]   # бамп версии конструктора (build.py APP_VERSION)
        [--theme-version 1.12.0.0]       # бамп версии темы (install.xml + 2x VITA_VERSION + докс-бейдж)
        [--skip-build]                   # не пересобирать js/app.js (уже собрано)

Что делает:
    1. (опц.) бамп APP_VERSION в build/build.py конструктора;
    2. пересборка конструктора: python build/build.py
       (js/app.js + вшивание export.css + ?v= в index.html + гейт Паспорта);
    3. синхронизация css/export.css -> тема
       (build/sync_to_theme.py sync, с .bak-бэкапом);
    4. (опц.) бамп версии темы в 4 точках:
       install.xml <version>, VITA_VERSION админ-контроллера,
       VITA_VERSION каталог-контроллера, бейдж docs/index.html;
    5. печать СПИСКА ФАЙЛОВ для двойного коммита (оба репозитория)
       и чек-листа релиза (коммиты -> сборка темы -> гейт vcc-sync).

Скрипт НЕ коммитит и НЕ пушит — коммиты остаются ручным шагом
(двойной коммит: оба репозитория в одной сессии, правило AGENTS.md).

Путь темы: соседняя папка vita-main или VITA_THEME_DIR (как в sync_to_theme.py).
"""

import argparse
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
CONSTRUCTOR_ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)

import sync_to_theme as syncer  # noqa: E402  (общие пути и механика синка)

THEME_ROOT = syncer.THEME_DIR
BUILD_PY = os.path.join(CONSTRUCTOR_ROOT, "build", "build.py")

# Точки бампа версии темы: (файл, метка для отчёта)
THEME_BUMP_FILES = [
    ("install.xml", "install.xml <version>"),
    (os.path.join("upload", "admin", "controller", "extension", "module", "vita_theme.php"),
     "VITA_VERSION (admin)"),
    (os.path.join("upload", "catalog", "controller", "extension", "module", "vita_theme.php"),
     "VITA_VERSION (catalog)"),
    (os.path.join("docs", "index.html"), "бейдж документации"),
]

# Файлы двойного коммита (маски git pathspec для фильтрации статусов)
CONSTRUCTOR_OWN = ("css/export.css", "js/app.js", "index.html", "build/build.py",
                   "CHANGELOG.md", "src/", "presets/", "docs/shortcode-hint.md")
THEME_OWN = ("upload/catalog/view/theme/vita/stylesheet/vita-content-constructor.css",
             "install.xml",
             "upload/admin/controller/extension/module/vita_theme.php",
             "upload/catalog/controller/extension/module/vita_theme.php",
             "docs/index.html", "CHANGELOG.md", "docs/assets/")


def sh(repo, *args):
    p = subprocess.run(["git", "-C", repo] + list(args),
                       capture_output=True, text=True, encoding="utf-8", errors="replace")
    return p.returncode, (p.stdout or "").strip(), (p.stderr or "").strip()


def is_repo(path):
    rc, _, _ = sh(path, "rev-parse", "--is-inside-work-tree")
    return rc == 0


def dirty_files(repo, prefixes):
    """Отслеживаемые изменённые файлы репо, отфильтрованные по префиксам нашей цепочки."""
    rc, out, _ = sh(repo, "status", "--porcelain", "-uno")
    if rc != 0:
        return []
    rows = []
    for line in out.splitlines():
        if len(line) < 4:
            continue
        state, path = line[:2], line[3:].strip().strip('"')
        if any(path.startswith(p) or path == p for p in prefixes):
            rows.append((state, path))
    return rows


def bump_constructor_version(new_version):
    """APP_VERSION = 'X.Y.Z' в build/build.py."""
    with open(BUILD_PY, "r", encoding="utf-8", newline="") as fh:
        src = fh.read()
    pat = re.compile(r'APP_VERSION = "[0-9][0-9.]*"')
    if not pat.search(src):
        raise SystemExit("FAIL: в build/build.py не найдена строка APP_VERSION")
    src2, n = pat.subn('APP_VERSION = "%s"' % new_version, src)
    if src2 != src:
        with open(BUILD_PY, "w", encoding="utf-8", newline="") as fh:
            fh.write(src2)
    print("[bump] конструктор APP_VERSION -> %s (замен: %d)" % (new_version, n))


def bump_theme_version(new_version):
    """Бамп версии темы во всех 4 точках; старая версия читается из install.xml."""
    install_xml = os.path.join(THEME_ROOT, "install.xml")
    if not os.path.isfile(install_xml):
        raise SystemExit("FAIL: %s не найден — VITA_THEME_DIR указывает не на репозиторий темы" % install_xml)
    with open(install_xml, "r", encoding="utf-8", newline="") as fh:
        m = re.search(r"<version>([0-9][0-9.]*)</version>", fh.read())
    if not m:
        raise SystemExit("FAIL: в install.xml не найден <version>")
    old = m.group(1)
    if old == new_version:
        print("[bump] тема: версия уже %s — бамп не требуется" % old)
        return old

    for rel, label in THEME_BUMP_FILES:
        path = os.path.join(THEME_ROOT, *rel.split("/"))
        if not os.path.isfile(path):
            raise SystemExit("FAIL: не найдена точка бампа: %s" % path)
        with open(path, "r", encoding="utf-8", newline="") as fh:
            src = fh.read()
        if src.count(old) == 0:
            raise SystemExit("FAIL: в %s нет текущей версии %s — проверьте точку бампа" % (label, old))
        src2 = src.replace(old, new_version)
        with open(path, "w", encoding="utf-8", newline="") as fh:
            fh.write(src2)
        print("[bump] тема: %-26s %s -> %s" % (label, old, new_version))
    return old


def main():
    ap = argparse.ArgumentParser(description="Оркестратор «Конструктор → Тема Вита» (контракт vcc-v1).")
    ap.add_argument("--constructor-version", metavar="X.Y.Z",
                    help="бамп версии конструктора (APP_VERSION в build/build.py) ПЕРЕД сборкой")
    ap.add_argument("--theme-version", metavar="M.M.B.P",
                    help="бамп версии темы (install.xml + 2x VITA_VERSION + докс-бейдж)")
    ap.add_argument("--skip-build", action="store_true",
                    help="не пересобирать js/app.js (например, повторный прогон после сбоя)")
    args = ap.parse_args()

    print("=" * 64)
    print("RELEASE TO THEME: конструктор %s" % CONSTRUCTOR_ROOT)
    print("                  тема        %s" % THEME_ROOT)
    print("=" * 64)

    if not is_repo(CONSTRUCTOR_ROOT):
        raise SystemExit("FAIL: конструктор не git-репозиторий")
    if not is_repo(THEME_ROOT):
        raise SystemExit("FAIL: тема не git-репозиторий (или VITA_THEME_DIR неверен)")

    # 1. Бамп версии конструктора (до сборки — ?v= в index.html получит новую версию)
    if args.constructor_version:
        bump_constructor_version(args.constructor_version)

    # 2. Пересборка конструктора. Порядок обязан учитывать два гейта:
    #    - dump_passport.js читает СОБРАННЫЙ js/app.js -> паспорт генерируется ПОСЛЕ сборки;
    #    - гейт Паспорта в build.py сравнивает файл с дампом -> сборка с бампом версии
    #      требует уже обновлённого паспорта. Решение: временный пред-сбор (bulid-черновик)
    #    не нужен — build.py читает паспорт ГЛАВНЫМ образом после компиляции: сначала
    #    прогоняем сборку со старым паспортом (она компилирует app.js, но падает на гейте),
    #    затем перегенерируем паспорт и собираем начисто.
    if not args.skip_build:
        print("\n--- шаг 2: сборка конструктора (build/build.py) ---")
        first = subprocess.run([sys.executable, os.path.join(HERE, "build.py")], cwd=CONSTRUCTOR_ROOT,
                               capture_output=True, text=True, encoding="utf-8", errors="replace")
        if first.returncode != 0 and "PASSPORT GATE FAILED" not in (first.stdout or "") + (first.stderr or ""):
            print((first.stdout or "") + (first.stderr or ""))
            raise SystemExit("FAIL: сборка конструктора упала (не на гейте Паспорта)")
        if args.constructor_version:
            print("--- шаг 2a: перегенерация Паспорта (node tools/dump_passport.js) ---")
            r = subprocess.run(["node", os.path.join(CONSTRUCTOR_ROOT, "tools", "dump_passport.js")],
                               cwd=CONSTRUCTOR_ROOT)
            if r.returncode != 0:
                raise SystemExit("FAIL: dump_passport.js упал (нужен node)")
            print("--- шаг 2b: чистовая сборка с обновлённым Паспортом ---")
            r = subprocess.run([sys.executable, os.path.join(HERE, "build.py")], cwd=CONSTRUCTOR_ROOT)
            if r.returncode != 0:
                raise SystemExit("FAIL: чистовая сборка конструктора упала")
        elif first.returncode != 0:
            # Паспорт устарел и без бампа версии (менялся registry) — перегенерируем и пересобираем.
            print("--- шаг 2a: Паспорт устарел (registry менялся) — перегенерация и пересборка ---")
            r = subprocess.run(["node", os.path.join(CONSTRUCTOR_ROOT, "tools", "dump_passport.js")],
                               cwd=CONSTRUCTOR_ROOT)
            if r.returncode != 0:
                raise SystemExit("FAIL: dump_passport.js упал (нужен node)")
            r = subprocess.run([sys.executable, os.path.join(HERE, "build.py")], cwd=CONSTRUCTOR_ROOT)
            if r.returncode != 0:
                raise SystemExit("FAIL: чистовая сборка конструктора упала")

    # 3. Синхронизация export.css -> тема
    print("\n--- шаг 3: синхронизация export.css -> тема ---")
    rc = syncer.do_sync()
    css_copied = (rc == 0)

    # 4. Бамп версии темы
    if args.theme_version:
        print("\n--- шаг 4: бамп версии темы ---")
        bump_theme_version(args.theme_version)

    # 5. Список файлов + двойной коммит + чек-лист
    print("\n--- шаг 5: двойной коммит (оба репозитория в ОДНОЙ сессии) ---")
    ctor_rows = dirty_files(CONSTRUCTOR_ROOT, CONSTRUCTOR_OWN)
    theme_rows = dirty_files(THEME_ROOT, THEME_OWN)
    other_ctor = dirty_files(CONSTRUCTOR_ROOT, ("",))
    other_theme = dirty_files(THEME_ROOT, ("",))

    print("\n[Конструктор] файлы цепочки (git add):")
    for state, path in ctor_rows:
        print("  %s %s" % (state, path))
    if not ctor_rows:
        print("  (изменений цепочки нет)")
    print("[Тема] файлы цепочки (git add):")
    for state, path in theme_rows:
        print("  %s %s" % (state, path))
    if not theme_rows:
        print("  (изменений цепочки нет%s)" % ("" if css_copied else ""))

    extra_ctor = [p for _, p in other_ctor if not any(p.startswith(x) or p == x for x in CONSTRUCTOR_OWN)]
    extra_theme = [p for _, p in other_theme if not any(p.startswith(x) or p == x for x in THEME_OWN)]
    if extra_ctor or extra_theme:
        print("\nВНИМАНИЕ: есть изменённые файлы ВНЕ цепочки (в коммит пары не класть):")
        for p in extra_ctor:
            print("  конструктор: %s" % p)
        for p in extra_theme:
            print("  тема:        %s" % p)

    print("\n" + "=" * 64)
    print("ЧЕК-ЛИСТ ЗАВЕРШЕНИЯ (вручную, по порядку):")
    print("=" * 64)
    print("1) Конструктор: закоммитить и запушить файлы цепочки выше.")
    if args.constructor_version:
        print("   + внести запись [v%s] в CHANGELOG.md конструктора (текст вручную)." % args.constructor_version)
    print("2) Тема: закоммитить и запушить файлы цепочки выше — КОММИТ ПАРЫ к шагу 1.")
    if args.theme_version:
        print("   + внести запись [%s] в CHANGELOG.md темы (категория по схеме M.M.B.P," % args.theme_version)
        print("     карточку «Изменения в версии» — в docs/index.html).")
    elif css_copied:
        print("   + СТИЛИ ИЗМЕНИЛИСЬ — теме нужен бамп версии: --theme-version M.M.B.P")
        print("     (MINOR новый элемент/возможность, BUILD улучшение, PATCH фикс стиля).")
    print("3) Тема: python build/build_release.py --latest")
    print("   гейт vcc-sync докажет байт-идентичность стилей (сборка валидна только после шага 2).")
    print("4) Тема: деплой/тег/релиз по обычному циклу; конструктор — CI Pages подхватит push.")
    print()
    print("Напоминание: экспортные классы — ТОЛЬКО vcc-*; токены var(--mp-*, fallback);")
    print("тёмная тема — через [data-theme=\"dark\"] темы, не отдельными правилами.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
