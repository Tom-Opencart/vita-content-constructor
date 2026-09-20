# -*- coding: utf-8 -*-
"""
sync_to_theme.py — синхронизация export.css конструктора с темой Вита.

Контракт «ОДИН ФАЙЛ В ДВУХ РЕПОЗИТОРИЯХ» (AGENTS.md):
    css/export.css  этого репозитория  <-ИСТОЧНИК->
    <theme>/upload/catalog/view/theme/vita/stylesheet/vita-content-constructor.css

Режимы:
    python build/sync_to_theme.py status     — сверка источника и копии в теме (дефолт)
    python build/sync_to_theme.py sync       — скопировать export.css в тему (+ бэкап .bak)
    python build/sync_to_theme.py check      — только гейты совместного коммита (для CI/хуков)

Гейты режима check (защита от раздельного коммита):
  1. Копия в теме байт-в-байт равна export.css (после CRLF-нормализации)
     — правка источника без синка (или наоборот) невозможна.
  2. В обоих репозиториях нет незакоммиченных изменений отслеживаемых
     файлов (git status -uno) — полуприменённая правка «повиснуть» не может.
  3. Оба репозитория запушены: HEAD == origin/<branch> (если remote настроен).
  4. Канонический текст подсказки о спец-метках (docs/shortcode-hint.md,
     строка VCC-SHORTCODE-HINT-v1) присутствует в шапке экспортного файла
     (src/export/export.js) и в документации темы (docs/index.html)
     — три поверхности одной подсказки расходиться не могут.

Дополнительно (информационно, без влияния на код выхода) печатается
последний коммит каждого файла — для eyeball-сверки пары.

Путь темы ищется автоматически: соседняя папка vita-main рядом с этим
репозиторием; можно переопределить переменной окружения VITA_THEME_DIR.
"""

import hashlib
import os
import subprocess
import sys

# --- Пути -----------------------------------------------------------------

CONSTRUCTOR_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOURCE_CSS = os.path.join(CONSTRUCTOR_ROOT, "css", "export.css")

THEME_DIR = os.environ.get("VITA_THEME_DIR") or os.path.join(
    os.path.dirname(CONSTRUCTOR_ROOT), "vita-main"
)
THEME_CSS_REL = os.path.join(
    "upload", "catalog", "view", "theme", "vita", "stylesheet",
    "vita-content-constructor.css",
)
THEME_CSS = os.path.join(THEME_DIR, *THEME_CSS_REL.split("/"))

# Файлы, составляющие пару (относительно корня каждого репозитория).
SOURCE_REL = "css/export.css"

# Гейт 4: каноническая подсказка о спец-метках (один текст на три поверхности:
# справочник, шапка экспортного файла, документация темы). Маркер — в справочнике
# и шапке экспорта; в доках темы проверяется сама фраза (маркер человеку в
# тексте карточки не нужен).
HINT_DOCS_REL = os.path.join("docs", "shortcode-hint.md")
HINT_EXPORT_REL = os.path.join("src", "export", "export.js")
HINT_THEME_DOCS_REL = os.path.join("docs", "index.html")
HINT_MARKER = "VCC-SHORTCODE-HINT-v1"
HINT_SENTENCE = ("Спец-метки модулей Виты вставляйте текстовым блоком или через блок "
                 "«HTML темы» — они переживают экспорт и импорт, а на витрине "
                 "превращаются в живые блоки модулей.")


# --- Утилиты git -----------------------------------------------------------

def git(repo, *args):
    """git -C <repo> args -> (rc, stdout). Ошибки сети/репо не падают, а возвращаются."""
    try:
        p = subprocess.run(
            ["git", "-C", repo] + list(args),
            capture_output=True, text=True, encoding="utf-8", errors="replace",
        )
        return p.returncode, (p.stdout or "").strip()
    except FileNotFoundError:
        return 1, ""


def is_repo(path):
    rc, _ = git(path, "rev-parse", "--is-inside-work-tree")
    return rc == 0


# --- Нормализация и сверка -------------------------------------------------

def normalized_bytes(path):
    """Содержимое файла с CRLF -> LF (сборка темы нормализует переводы строк)."""
    with open(path, "rb") as f:
        return f.read().replace(b"\r\n", b"\n")


def files_equal(a, b):
    try:
        return normalized_bytes(a) == normalized_bytes(b)
    except FileNotFoundError:
        return False


def sha256(path):
    return hashlib.sha256(normalized_bytes(path)).hexdigest()


# --- Содержательная часть --------------------------------------------------

def css_commits(repo, rel_path, limit=40):
    """Последние коммиты, меняющие файл (hash + subject) — информационная сверка пары."""
    rc, out = git(repo, "log", "-n%d" % limit, "--format=%h%x09%s", "--", rel_path)
    commits = []
    for line in out.splitlines():
        if "\t" not in line:
            continue
        h, subject = line.split("\t", 1)
        commits.append({"hash": h, "subject": subject})
    return commits


def repo_branch(repo):
    rc, out = git(repo, "rev-parse", "--abbrev-ref", "HEAD")
    return out if rc == 0 else "?", rc == 0


def repo_dirty(repo):
    """Только отслеживаемые файлы (-uno): untracked-утилиты не считаем грязью."""
    rc, out = git(repo, "status", "--porcelain", "-uno")
    return rc != 0 or bool(out.strip())


def repo_unpushed(repo):
    """(True, '?') если remote нет; (True, branch) если HEAD != origin/branch; иначе (False, branch).

    Detached HEAD (checkout в CI) не считается «не запушенным»: сравнение
    HEAD <-> origin/<branch> в этом состоянии бессмысленно, а реальный
    незапушенный коммит ловится на обычной рабочей копии разработчика.
    """
    branch, ok = repo_branch(repo)
    if not ok:
        return True, "?"
    if branch == "HEAD":
        return False, "HEAD (detached)"
    rc, out = git(repo, "rev-parse", "origin/%s" % branch)
    if rc != 0:
        return True, branch  # нет remote-ветки
    rc2, head = git(repo, "rev-parse", "HEAD")
    if rc2 != 0:
        return True, branch
    return (out != head), branch


def do_status():
    print("=" * 64)
    print("SYNC STATUS: export.css -> vita-content-constructor.css")
    print("=" * 64)
    print("source : %s" % SOURCE_CSS)
    print("theme  : %s" % THEME_CSS)
    print()

    if not os.path.isfile(SOURCE_CSS):
        print("FAIL: source export.css not found")
        return 2
    if not os.path.isfile(THEME_CSS):
        print("FAIL: theme copy not found (тема не установлена по ожидаемому пути?)")
        print("      Подсказка: set VITA_THEME_DIR=<путь к репозиторию темы>")
        return 2

    ok_copy = files_equal(SOURCE_CSS, THEME_CSS)
    print("files identical   : %s" % ("YES" if ok_copy else "NO  <- нужно: sync"))
    print("  source sha256   : %s" % sha256(SOURCE_CSS)[:16])
    print("  theme  sha256   : %s" % sha256(THEME_CSS)[:16])

    for label, repo in (("constructor", CONSTRUCTOR_ROOT), ("theme", THEME_DIR)):
        if not is_repo(repo):
            print("repo %-12s: NOT A GIT REPO" % label)
            continue
        dirty = repo_dirty(repo)
        unpushed, branch = repo_unpushed(repo)
        print("repo %-12s: branch=%s dirty=%s unpushed=%s" % (
            label, branch, dirty, unpushed))

    rc, out = git(CONSTRUCTOR_ROOT, "log", "-1", "--format=%h %s")
    print("constructor HEAD  : %s" % (out or "?"))
    rc, out = git(THEME_DIR, "log", "-1", "--format=%h %s")
    print("theme HEAD        : %s" % (out or "?"))

    print()
    if not ok_copy:
        print("Вердикт: КОПИЯ В ТЕМЕ УСТАРЕЛА. Запустите: python build/sync_to_theme.py sync")
        return 1
    print("Вердикт: файлы синхронизированы.")
    return 0


def do_sync(backup=True):
    if not os.path.isfile(SOURCE_CSS):
        print("FAIL: source export.css not found")
        return 2
    if not is_repo(THEME_DIR):
        print("FAIL: theme dir is not a git repo: %s" % THEME_DIR)
        print("      Подсказка: set VITA_THEME_DIR=<путь к репозиторию темы>")
        return 2

    if files_equal(SOURCE_CSS, THEME_CSS):
        print("Копия в теме уже идентична export.css — копировать нечего.")
        return 0

    bak = None
    if backup and os.path.isfile(THEME_CSS):
        bak = THEME_CSS + ".bak"
        with open(THEME_CSS, "rb") as src, open(bak, "wb") as dst:
            dst.write(src.read())

    os.makedirs(os.path.dirname(THEME_CSS), exist_ok=True)
    # Копируем как есть (конструктор хранит LF; тема нормализует через .gitattributes)
    with open(SOURCE_CSS, "rb") as src, open(THEME_CSS, "wb") as dst:
        dst.write(src.read())

    if not files_equal(SOURCE_CSS, THEME_CSS):
        # Откат: восстанавливаем бэкап, чтобы не оставлять битое состояние
        if bak and os.path.isfile(bak):
            with open(bak, "rb") as src, open(THEME_CSS, "wb") as dst:
                dst.write(src.read())
        print("FAIL: после копирования файлы всё ещё различаются — восстановлен бэкап")
        return 1

    # Бэкап больше не нужен: откат возможен через git (checkout/старый коммит).
    # Удаляем, чтобы не делать дерево темы грязным untracked-файлом.
    if bak and os.path.isfile(bak):
        os.remove(bak)

    print("Скопировано: %s" % THEME_CSS_REL.replace("/", os.sep))
    print()
    print("ВАЖНО: коммит ОБОИХ репозиториев одной сессией (AGENTS.md).")
    print("Проверка: python build/sync_to_theme.py check")
    return 0


def do_check(limit=40):
    """Гейты «оба репозитория коммитятся вместе». Возвращает 0 если всё ок."""
    problems = []
    print("=" * 64)
    print("COMMIT-PAIR CHECK")
    print("=" * 64)

    # -- Свежие remote-ссылки: без fetch гейт 3 сравнивает с устаревшим origin --
    for label, repo in (("constructor", CONSTRUCTOR_ROOT), ("theme", THEME_DIR)):
        if is_repo(repo):
            rc, _ = git(repo, "fetch", "--quiet", "origin")
            if rc != 0:
                print("[info] fetch %s не удался (офлайн?) — сверка по локальным remote-ссылкам" % label)

    # -- Гейт 1: идентичность файлов --------------------------------------
    g1 = os.path.isfile(SOURCE_CSS) and os.path.isfile(THEME_CSS) and files_equal(SOURCE_CSS, THEME_CSS)
    print("[gate 1] files identical        : %s" % g1)
    if not g1:
        problems.append("копия в теме отличается от export.css")

    # -- Гейт 2: оба дерева чисты ------------------------------------------
    d_c = is_repo(CONSTRUCTOR_ROOT) and repo_dirty(CONSTRUCTOR_ROOT)
    d_t = is_repo(THEME_DIR) and repo_dirty(THEME_DIR)
    g2 = not d_c and not d_t
    print("[gate 2] both worktrees clean   : %s (constructor dirty=%s, theme dirty=%s)" % (g2, d_c, d_t))
    if not g2:
        problems.append("есть незакоммиченные изменения (коммитите оба репо одной сессией)")

    # -- Информация: последние коммиты каждого файла (eyeball-сверка пары) --
    c_c = css_commits(CONSTRUCTOR_ROOT, SOURCE_REL, limit)
    c_t = css_commits(THEME_DIR, THEME_CSS_REL.replace("/", os.sep), limit) if is_repo(THEME_DIR) else []
    print("[info] last commit on export.css (constructor) : %s %s" % (
        c_c[0]["hash"] if c_c else "-", c_c[0]["subject"] if c_c else ""))
    print("[info] last commit on theme copy               : %s %s" % (
        c_t[0]["hash"] if c_t else "-", c_t[0]["subject"] if c_t else ""))

    # -- Гейт 3: оба запушены -----------------------------------------------
    u_c, b_c = repo_unpushed(CONSTRUCTOR_ROOT)
    u_t, b_t = repo_unpushed(THEME_DIR)
    g3 = not u_c and not u_t
    print("[gate 3] both pushed            : %s (constructor:%s theme:%s)" % (g3, b_c, b_t))
    if not g3:
        problems.append("HEAD не равен origin/<branch> (или remote нет)")

    # -- Гейт 4: каноническая подсказка на всех трёх поверхностях ------------
    g4 = True

    def file_has(path, needles):
        try:
            with open(path, encoding="utf-8") as f:
                text = f.read()
            return all(n in text for n in needles)
        except (OSError, UnicodeDecodeError):
            return False

    hint_sources = (
        ("reference (constructor docs/shortcode-hint.md)",
         os.path.join(CONSTRUCTOR_ROOT, HINT_DOCS_REL), [HINT_MARKER, HINT_SENTENCE]),
        ("export header (src/export/export.js)",
         os.path.join(CONSTRUCTOR_ROOT, HINT_EXPORT_REL), [HINT_MARKER, HINT_SENTENCE]),
        ("theme docs (docs/index.html)",
         os.path.join(THEME_DIR, HINT_THEME_DOCS_REL), [HINT_SENTENCE]),
    )
    for label, path, needles in hint_sources:
        has_hint = file_has(path, needles)
        print("[gate 4] %-46s: %s" % (label, "OK" if has_hint else "MISSING"))
        if not has_hint:
            g4 = False
    if not g4:
        problems.append("подсказка о спец-метках (%s) отсутствует/устарела на одной из поверхностей — эталон: docs/shortcode-hint.md" % HINT_MARKER)

    print()
    if problems:
        print("ВЕРДИКТ: FAILED — %d проблем(ы):" % len(problems))
        for p in problems:
            print("  - %s" % p)
        return 1
    print("ВЕРДИКТ: PASS — оба репозитория синхронны и закоммичены парой.")
    return 0


def main():
    mode = (sys.argv[1] if len(sys.argv) > 1 else "status").lower()
    if mode == "status":
        return do_status()
    if mode == "sync":
        return do_sync()
    if mode == "check":
        return do_check()
    print(__doc__)
    return 2


if __name__ == "__main__":
    sys.exit(main())
