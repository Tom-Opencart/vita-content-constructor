/* ============================================================
Вита — Конструктор контента · ui/assistant.js
Помощник «Создать по донору»: одна модалка, две вкладки.
  - Промт: донор + пожелания → конверт из Паспорта → копировать/скачать.
  - Ответ AI: вставка ответа модели → мягкая починка → лендинг в канвасе.
Конструктор остаётся статическим: ни одной сети, ни одного ключа.
============================================================ */
'use strict';

(function () {
	function $(sel) { return document.querySelector(sel); }

	function openAssistant() {
		var modal = $('#vcc-assistant');
		if (!modal) return;
		/* Паспорт строится в момент открытия — из живого реестра текущей версии */
		var ta = $('#vcc-assistant-prompt');
		if (ta) {
			ta.value = VccPassport.buildPrompt(
				$('#vcc-assistant-donor') ? $('#vcc-assistant-donor').value : '',
				$('#vcc-assistant-wishes') ? $('#vcc-assistant-wishes').value : ''
			);
			updateSize();
		}
		var resp = $('#vcc-assistant-response');
		if (resp) resp.value = '';
		var out = $('#vcc-assistant-result');
		if (out) { out.style.display = 'none'; out.innerHTML = ''; }
		modal.classList.add('is-open');
		switchTab('prompt');
		var first = $('#vcc-assistant-donor');
		if (first) first.focus();
	}

	function closeAssistant() {
		var modal = $('#vcc-assistant');
		if (modal) modal.classList.remove('is-open');
	}

	function updateSize() {
		var size = $('#vcc-assistant-size');
		if (size) {
			var kb = ($('#vcc-assistant-prompt').value.length / 1024).toFixed(1);
			size.textContent = kb + ' КБ';
		}
	}

	function switchTab(name) {
		var modal = $('#vcc-assistant');
		if (!modal) return;
		var tabs = modal.querySelectorAll('[data-tab]');
		for (var i = 0; i < tabs.length; i++) {
			tabs[i].classList.toggle('is-active', tabs[i].getAttribute('data-tab') === name);
		}
		var panes = modal.querySelectorAll('[data-pane]');
		for (var j = 0; j < panes.length; j++) {
			panes[j].classList.toggle('is-active', panes[j].getAttribute('data-pane') === name);
		}
	}

	function downloadPrompt() {
		var text = $('#vcc-assistant-prompt').value;
		var blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
		var url = URL.createObjectURL(blob);
		var a = document.createElement('a');
		a.href = url;
		a.download = 'vita-constructor-prompt.txt';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
	}

	function copyPrompt(btn) {
		var text = $('#vcc-assistant-prompt').value;
		var label = btn.querySelector('span');
		var done = function (okFlag) {
			if (label) {
				var prev = label.textContent;
				label.textContent = okFlag ? 'Скопировано' : 'Не удалось — скачайте файл';
				setTimeout(function () { label.textContent = prev; }, 2200);
			}
		};
		if (navigator.clipboard && navigator.clipboard.writeText && window.isSecureContext) {
			navigator.clipboard.writeText(text).then(function () { done(true); }, function () { legacy(); });
		} else {
			legacy();
		}
		function legacy() {
			var ta = $('#vcc-assistant-prompt');
			ta.focus();
			ta.select();
			var okFlag = false;
			try { okFlag = document.execCommand('copy'); } catch (e) { /* file:// без прав */ }
			ta.blur();
			done(okFlag);
			if (!okFlag) downloadPrompt();
		}
	}

	function showError(out, msgs) {
		out.style.display = '';
		out.className = 'vcc-assistant__result vcc-assistant__result--error';
		out.innerHTML = msgs.map(function (m) { return '<div><i class="fa fa-exclamation-triangle"></i> ' + m + '</div>'; }).join('');
	}

	function showWarn(out, msgs) {
		out.style.display = '';
		out.className = 'vcc-assistant__result vcc-assistant__result--warn';
		out.innerHTML = msgs.map(function (m) { return '<div><i class="fa fa-info-circle"></i> ' + m + '</div>'; }).join('');
	}

	function toast(text, kind) {
		if (window.vccToast) window.vccToast(text, kind || 'info');
	}

	function buildLanding() {
		var out = $('#vcc-assistant-result');
		var raw = $('#vcc-assistant-response').value;
		var res = VccPassport.extractJson(raw);
		if (!res.ok) {
			showError(out, res.errors);
			return;
		}
		var data = res.data;
		try {
			/* Палитру задаёт пресет магазина: чужие токены от модели не сохраняем */
			if (data.theme && data.theme.tokens) delete data.theme.tokens;
			if (data.theme && data.theme.preset) delete data.theme.preset;
		} catch (e) { /* необязательно */ }
		VccStore.setProject(data);
		var n = VccStore.currentProject().blocks.length;
		if (res.warnings.length) showWarn(out, res.warnings);
		else out.style.display = 'none';
		toast('Лендинг собран: ' + n + ' блоков — правьте свободно', 'success');
		setTimeout(closeAssistant, res.warnings.length ? 400 : 150);
		var canvas = $('#vcc-canvas');
		if (canvas) canvas.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	function initAssistant() {
		var modal = $('#vcc-assistant');
		if (!modal) return;
		modal.querySelectorAll('[data-tab]').forEach(function (btn) {
			btn.addEventListener('click', function () { switchTab(btn.getAttribute('data-tab')); });
		});
		$('#vcc-assistant-donor').addEventListener('input', function () {
			$('#vcc-assistant-prompt').value = VccPassport.buildPrompt(this.value, $('#vcc-assistant-wishes').value);
			updateSize();
		});
		$('#vcc-assistant-wishes').addEventListener('input', function () {
			$('#vcc-assistant-prompt').value = VccPassport.buildPrompt($('#vcc-assistant-donor').value, this.value);
			updateSize();
		});
		$('#vcc-assistant-copy').addEventListener('click', function () { copyPrompt(this); });
		$('#vcc-assistant-download').addEventListener('click', downloadPrompt);
		$('#vcc-assistant-build').addEventListener('click', buildLanding);
		$('#vcc-assistant-close').addEventListener('click', closeAssistant);
		$('#vcc-assistant-backdrop').addEventListener('click', closeAssistant);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initAssistant);
	} else {
		initAssistant();
	}

	window.VccAssistant = { open: openAssistant, close: closeAssistant };
})();
