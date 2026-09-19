/* ============================================================
Вита — Конструктор контента · core/registry.js
Реестр типов блоков. Контракт блока:
  label  — человекочитаемое имя в палитре;
  icon   — иконка FontAwesome для кнопки добавления;
  group  — группа в палитре (text | media | layout);
  fields — декларация полей формы редактора;
  toHTML — рендер блока в экспортный HTML (markdown уже преобразован
           вызывающей стороной там, где это заявлено в fields).
============================================================ */
'use strict';

var BlockRegistry = {
	_blocks: {},
	register: function (blockDef) {
		if (!blockDef || !blockDef.type || typeof blockDef.toHTML !== 'function') {
			console.error('Invalid block definition', blockDef);
			return;
		}
		this._blocks[blockDef.type] = blockDef;
	},
	get: function (type) {
		return this._blocks[type] || null;
	},
	getAll: function () {
		return this._blocks;
	},
	getList: function () {
		var list = [];
		for (var type in this._blocks) {
			if (Object.prototype.hasOwnProperty.call(this._blocks, type)) list.push(this._blocks[type]);
		}
		return list;
	},
	createBlock: function (type) {
		var def = this.get(type);
		if (!def) return null;
		return {
			id: 'b' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
			type: type,
			data: def.defaults ? JSON.parse(JSON.stringify(def.defaults)) : {}
		};
	}
};
