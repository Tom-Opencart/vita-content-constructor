#!/usr/bin/env node
/* Дамп Паспорта возможностей из СОБРАННОГО бандла js/app.js:
 * документ генерируется тем же кодом, что и промт Помощника,
 * поэтому docs/CONSTRUCTOR-PASSPORT.md всегда точно соответствует
 * реестру блоков текущей версии. Гейт сборки сравнивает файл с дампом.
 * Запуск: node tools/dump_passport.js [--check] */
'use strict';
const fs = require('fs');
const path = require('path');

global.window = global; /* VccSection (landing.js) виден как глобал в ленивых fields() */
global.location = { search: '' };
global.document = {
	addEventListener: function () {},
	querySelector: function () { return null; },
	documentElement: { setAttribute: function () {}, style: { setProperty: function () {} } },
	createElement: function () { return { style: {}, classList: { add: function () {}, remove: function () {}, toggle: function () {} }, setAttribute: function () {}, appendChild: function () {}, addEventListener: function () {} }; }
};
global.localStorage = { getItem: function () { return null; }, setItem: function () {}, removeItem: function () {} };

const code = fs.readFileSync(path.join(__dirname, '..', 'js', 'app.js'), 'utf8');
const hook = 'global.__P = { passport: VccPassport, version: VCC_APP_VERSION };';
// eslint-disable-next-line no-eval
eval(code.replace(/\}\)\(\);\s*$/, hook + '\n})();'));

const md = global.__P.passport.buildPassportMd();
const target = path.join(__dirname, '..', 'docs', 'CONSTRUCTOR-PASSPORT.md');
const check = process.argv.includes('--check');

if (check) {
	const current = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : '';
	if (current !== md) {
		console.error('PASSPORT GATE FAILED: docs/CONSTRUCTOR-PASSPORT.md устарел. Запустите: node tools/dump_passport.js');
		process.exit(1);
	}
	console.log('PASSPORT GATE OK (' + global.__P.version + ', ' + md.length + ' chars)');
	process.exit(0);
}

fs.writeFileSync(target, md, 'utf8');
console.log('PASSPORT WRITTEN: docs/CONSTRUCTOR-PASSPORT.md (' + md.length + ' chars, v' + global.__P.version + ')');
