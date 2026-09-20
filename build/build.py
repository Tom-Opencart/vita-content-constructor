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

APP_VERSION = "0.5.0"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

FILES_ORDER = [
	"src/core/tokens.js",
	"src/core/schema.js",
	"src/core/markdown.js",
	"src/core/registry.js",
	"src/core/store.js",
	"src/blocks/index.js",
	"src/blocks/shortcodes.js",
	"src/export/export.js",
	"src/ui/app.js",
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


if __name__ == "__main__":
	build()
