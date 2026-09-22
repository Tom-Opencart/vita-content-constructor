/* ============================================================
Вита — Конструктор контента · ui/assistant.js
Визард «Собрать страницу по образцу»: три шага, ведёт сам.
  Шаг 1 — ссылка на страницу-образец (+ что важно учесть).
  Шаг 2 — одна кнопка: скопировать задание → отдать нейросети;
          после копирования шаг сам объясняет, что дальше.
  Шаг 3 — вставить ответ → «Готово — собрать страницу».
Конструктор остаётся статическим: ни одной сети, ни одного ключа.
Термины JSON/HTML/CSS не используются вовсе: пользователь делает
«Скачал / Загрузил», всё остальное визард делает за него.
============================================================ */
'use strict';

(function () {
	function $(sel) { return document.querySelector(sel); }

	function showStep(n) {
		var modal = $('#vcc-assistant');
		if (!modal) return;
		var steps = modal.querySelectorAll('.vcc-wizard__step');
		for (var i = 0; i < steps.length; i++) {
			steps[i].classList.toggle('is-active', steps[i].getAttribute('data-step') === String(n));
		}
		var out = $('#vcc-assistant-result');
		if (out) { out.style.display = 'none'; out.innerHTML = ''; }
		/* Фокус на первый контрол шага: вставил → сразу можно работать */
		var step = modal.querySelector('.vcc-wizard__step[data-step="' + n + '"]');
		if (step) {
			var focusable = step.querySelector('input, textarea, .vcc-btn--primary');
			if (focusable) focusable.focus();
		}
	}

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
		/* Сброс шага 2 к стартовому виду: подсказка скрыта, список — исходный */
		var hint = $('#vcc-wizard-step2-hint');
		if (hint) hint.classList.remove('is-visible');
		if (howInitial && modalOl()) modalOl().innerHTML = howInitial;
		showStep(1);
		modal.classList.add('is-open');
		var first = $('#vcc-assistant-donor');
		if (first) first.focus();
	}

	function closeAssistant() {
		var modal = $('#vcc-assistant');
		if (modal) modal.classList.remove('is-open');
	}

	function updateSize() {
		var size = $('#vcc-assistant-size');
		if (size && $('#vcc-assistant-prompt')) {
			var kb = ($('#vcc-assistant-prompt').value.length / 1024).toFixed(1);
			size.textContent = kb + ' КБ';
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
			if (okFlag) {
				/* Ведём за руку: после копирования шаг сам объясняет, что делать */
				var how = modalOl();
				if (how) {
					how.innerHTML = '<li><i class="fa fa-check" style="color: var(--mp-success, #4CAF50); margin-right: 6px;"></i>Задание скопировано — оно уже в буфере обмена.</li>' +
						'<li>Откройте нейросеть с доступом в интернет (ChatGPT, Claude, DeepSeek) и вставьте задание в чат.</li>' +
						'<li>Когда она ответит — переходите к шагу 3: там её ответ превратится в страницу.</li>';
				}
				var hint = $('#vcc-wizard-step2-hint');
				if (hint) hint.classList.add('is-visible');
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

	function modalOl() {
		var step2 = document.querySelector('.vcc-wizard__step[data-step="2"]');
		return step2 ? step2.querySelector('.vcc-wizard__how') : null;
	}

	var howInitial = '';

	function buildLanding() {
		var out = $('#vcc-assistant-result');
		var raw = $('#vcc-assistant-response').value;
		var res = VccPassport.extractJson(raw);
		if (!res.ok) {
			/* НЕ валить пользователя в технические ошибки: ответ нейросети,
			   из которого не извлекается проект, — обычная ситуация. Всё,
			   что он вставил, остаётся в поле: исправит и повторит. */
			showError(out, [
				'Нейросеть ответила не тем — в её ответе нет страницы для сборки. Чаще всего она что-то объясняет вместо того, чтобы собрать страницу.',
				'Напишите ей в чате: «Собери страницу строго по заданию, верни только данные страницы». Проверьте, что отправили ей задание из шага 2 целиком, — и вставьте её новый ответ сюда вместо этого.'
			]);
			return;
		}
		var data = res.data;
		try {
			/* Палитру задаёт пресет магазина: чужие токены от модели не сохраняем */
			if (data.theme && data.theme.tokens) delete data.theme.tokens;
			if (data.theme && data.theme.preset) delete data.theme.preset;
		} catch (e) { /* необязательно */ }
		var blocks = Array.isArray(data.blocks) ? data.blocks.length : 0;
		if (!blocks) {
			showError(out, ['Нейросеть вернула пустую страницу — в задании был образец по ссылке из шага 1. Перейдите назад, проверьте ссылку и попросите её переделать ответ.']);
			return;
		}
		VccStore.setProject(data);
		if (res.warnings.length) showWarn(out, res.warnings);
		else out.style.display = 'none';
		toast('Страница собрана: ' + blocks + ' блоков — правьте свободно', 'success');
		setTimeout(closeAssistant, res.warnings.length ? 400 : 150);
		var canvas = $('#vcc-canvas');
		if (canvas) canvas.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	function initAssistant() {
		var modal = $('#vcc-assistant');
		if (!modal) return;
		var howEl = modalOl();
		howInitial = howEl ? howEl.innerHTML : '';

		$('#vcc-wizard-next1').addEventListener('click', function () {
			var donor = $('#vcc-assistant-donor').value.trim();
			if (!donor) {
				toast('Сначала укажите ссылку на страницу-образец', 'warn');
				$('#vcc-assistant-donor').focus();
				return;
			}
			taSyncPrompt();
			showStep(2);
		});
		$('#vcc-wizard-back2').addEventListener('click', function () { showStep(1); });
		$('#vcc-wizard-next2').addEventListener('click', function () { showStep(3); });
		$('#vcc-assistant-copy').addEventListener('click', function () { copyPrompt(this); });
		$('#vcc-wizard-back3').addEventListener('click', function () { showStep(2); });
		$('#vcc-assistant-build').addEventListener('click', buildLanding);
		$('#vcc-assistant-close').addEventListener('click', closeAssistant);
		$('#vcc-assistant-backdrop').addEventListener('click', closeAssistant);

		$('#vcc-assistant-donor').addEventListener('input', taSyncPrompt);
		$('#vcc-assistant-wishes').addEventListener('input', taSyncPrompt);
	}

	function taSyncPrompt() {
		var ta = $('#vcc-assistant-prompt');
		if (!ta) return;
		ta.value = VccPassport.buildPrompt(
			$('#vcc-assistant-donor').value,
			$('#vcc-assistant-wishes').value
		);
		updateSize();
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initAssistant);
	} else {
		initAssistant();
	}

	window.VccAssistant = { open: openAssistant, close: closeAssistant };
})();
