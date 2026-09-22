# -*- coding: utf-8 -*-
"""
Сборщик «Вита — Конструктор контента».
Конкатенация src/ в js/app.js (IIFE, 'use strict') + вшивание
css/export.css в window.VCC_EXPORT_CSS (единый источник стилей
экспорта: превью и кнопка «Скачать CSS» читают одну и ту же строку)
+ вшивание пресетов макетов (presets/layouts/*.json) в
window.VCC_LAYOUT_PRESETS для галереи первого экрана.
Сборка детерминированная: версии, сортировка и порядок фиксированы,
timestamp нет. Гейт: каждый макет обязан быть валидным JSON с
contract=vcc-v1, иначе сборка падает.
"""
import glob
import json
import os

APP_VERSION = "0.9.11"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

FILES_ORDER = [
	"src/core/tokens.js",
	"src/core/schema.js",
	"src/core/markdown.js",
	"src/core/registry.js",
	"src/core/passport.js",
	"src/core/store.js",
	"src/blocks/index.js",
	"src/blocks/shortcodes.js",
	"src/blocks/landing.js",
	"src/export/export.js",
	"src/ui/app.js",
	"src/ui/assistant.js",
]


def read(path):
	full = os.path.join(ROOT, path)
	if not os.path.exists(full):
		raise SystemExit("File not found: %s" % path)
	with open(full, "r", encoding="utf-8") as f:
		return f.read().rstrip()


def load_layout_presets():
	"""Гейт + вшивание макетов: валидный JSON, контракт vcc-v1, сортировка по имени файла."""
	pattern = os.path.join(ROOT, "presets", "layouts", "*.json")
	presets = []
	for path in sorted(glob.glob(pattern)):
		name = os.path.basename(path)
		with open(path, "r", encoding="utf-8") as f:
			try:
				data = json.load(f)
			except ValueError as err:
				raise SystemExit("Layout gate FAILED (%s): invalid JSON: %s" % (name, err))
		if data.get("type") != "vita-constructor-project":
			raise SystemExit("Layout gate FAILED (%s): type must be vita-constructor-project" % name)
		if data.get("contract") != "vcc-v1":
			raise SystemExit("Layout gate FAILED (%s): contract must be vcc-v1" % name)
		if not isinstance(data.get("blocks"), list) or not data["blocks"]:
			raise SystemExit("Layout gate FAILED (%s): blocks must be a non-empty array" % name)
		presets.append(data)
		print("Layout: %s (%d blocks)" % (name, len(data["blocks"])))
	return presets


def build():
	parts = [
		"(function () {",
		"'use strict';",
		"window.VCC_APP_VERSION = '%s';" % APP_VERSION,
	]
	export_css = read("css/export.css")
	parts.append("window.VCC_EXPORT_CSS = %s;" % __import__("json").dumps(export_css))
	parts.append("window.VCC_LAYOUT_PRESETS = %s;" % json.dumps(load_layout_presets(), ensure_ascii=False))
	for path in FILES_ORDER:
		print("Reading: %s" % path)
		parts.append(read(path))
	parts.append("})();")
	out_path = os.path.join(ROOT, "js", "app.js")
	with open(out_path, "w", encoding="utf-8", newline="\n") as f:
		f.write("\n\n".join(parts) + "\n")
	print("Successfully compiled js/app.js (%d chars)" % os.path.getsize(out_path))
	sync_index_version()
	check_passport()


def sync_index_version():
	"""Cache-busting ?v= в index.html — из того же APP_VERSION, что и в бандле:
	последняя ручная копия версии устранена. Заменяются только атрибуты
	?v= у css/app.css и js/app.js; остальной HTML не трогается."""
	import re
	idx = os.path.join(ROOT, "index.html")
	with open(idx, "r", encoding="utf-8", newline="") as f:
		html = f.read()
	pattern = re.compile(r'((?:css/app\.css|js/app\.js)\?v=)[^"\']+')
	html2, n = pattern.subn(lambda m: m.group(1) + APP_VERSION, html)
	if n == 0:
		raise SystemExit("Build FAILED: в index.html не найдено ?v= у css/app.css/js/app.js — проверьте разметку")
	if html2 != html:
		with open(idx, "w", encoding="utf-8", newline="") as f:
			f.write(html2)
		print("index.html: ?v= обновлён на %s (%d ссылок)" % (APP_VERSION, n))
	else:
		print("index.html: ?v= уже %s" % APP_VERSION)


def check_passport():
	"""Гейт рассинхрона Паспорта: docs/CONSTRUCTOR-PASSPORT.md должен быть
	дампом текущего бандла. Если registry менялся — прогнать
	node tools/dump_passport.js и закоммитить обновлённый документ."""
	import subprocess
	tool = os.path.join(ROOT, "tools", "dump_passport.js")
	r = subprocess.run(["node", tool, "--check"], cwd=ROOT, capture_output=True, text=True)
	if r.returncode != 0:
		raise SystemExit("Build FAILED: " + (r.stdout or r.stderr).strip())
	print(r.stdout.strip())


if __name__ == "__main__":
	build()
