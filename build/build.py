# -*- coding: utf-8 -*-
"""
Сборщик «Вита — Конструктор контента».
Конкатенация src/ в js/app.js (IIFE, 'use strict') + вшивание
css/export.css в window.VCC_EXPORT_CSS (единый источник стилей
экспорта: превью и кнопка «Скачать CSS» читают одну и ту же строку).
Сборка детерминированная: версии и порядок фиксированы, timestamp нет.
"""
import os

APP_VERSION = "0.1.0"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

FILES_ORDER = [
	"src/core/tokens.js",
	"src/core/schema.js",
	"src/core/markdown.js",
	"src/core/registry.js",
	"src/core/store.js",
	"src/blocks/index.js",
	"src/export/export.js",
	"src/ui/app.js",
]


def read(path):
	full = os.path.join(ROOT, path)
	if not os.path.exists(full):
		raise SystemExit("File not found: %s" % path)
	with open(full, "r", encoding="utf-8") as f:
		return f.read().rstrip()


def build():
	parts = [
		"(function () {",
		"'use strict';",
		"window.VCC_APP_VERSION = '%s';" % APP_VERSION,
	]
	export_css = read("css/export.css")
	parts.append("window.VCC_EXPORT_CSS = %s;" % __import__("json").dumps(export_css))
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
