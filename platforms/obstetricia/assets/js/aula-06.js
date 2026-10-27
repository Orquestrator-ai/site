/* aula-06.js — componentes-Executor interativos da Aula 6 (bônus):
   (1) Régua "Linha do Tempo do Puerpério" (consolidada, cresce com localStorage go-a6-timeline);
   (2) Calculadora de dose profilática por peso (P7) — limites 50/90/130/170 validados;
   (3) Mini-EPDS (P12) — DOIS caminhos de alerta (soma > 12 E sentinela ≠ "nenhuma vez");
   (4) rede de segurança de init do SVG-piso IL-06 (onload).
   Namespace de estado: go-a6-*. Element-scoped: só age se o componente existe na página. */
(function () {
  'use strict';

  /* ============ 1. Régua "Linha do Tempo do Puerpério" ============ */
  (function regua() {
    var el = document.querySelector('.a6-regua');
    if (!el) return;
    var KEY = 'go-a6-timeline';
    var active = el.getAttribute('data-regua-active') || '';
    var visited = [];
    try { visited = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (_) { visited = []; }
    if (active && visited.indexOf(active) === -1) visited.push(active);
    try { localStorage.setItem(KEY, JSON.stringify(visited)); } catch (_) {}
    var marks = el.querySelectorAll('.a6-regua__mk');
    marks.forEach(function (mk) {
      var id = mk.getAttribute('data-mk');
      if (visited.indexOf(id) !== -1) mk.classList.add('visited');
      if (id === active) mk.classList.add('is-active');
    });
    var meta = el.querySelector('[data-regua-count]');
    if (meta) meta.textContent = visited.length + '/' + marks.length + ' marcos';
  })();

  /* ============ 2. Calculadora de dose profilática por peso (P7) ============ */
  (function calc() {
    var input = document.getElementById('a6-calc-weight');
    if (!input) return;
    var out = document.getElementById('a6-calc-out');
    var val = document.getElementById('a6-calc-val');
    var band = document.getElementById('a6-calc-band');
    var scale = document.querySelectorAll('.a6-calc__scale li');

    function setScale(key) {
      scale.forEach(function (li) { li.classList.toggle('on', li.getAttribute('data-band') === key); });
    }
    function compute() {
      var w = parseFloat(String(input.value).replace(',', '.'));
      if (!isFinite(w) || w <= 0) {
        val.textContent = '—'; band.textContent = 'Informe o peso'; out.className = 'a6-calc__out'; setScale(''); return;
      }
      var dose, label, key, tone;
      if (w < 50)        { dose = '20 mg'; label = '< 50 kg · dose reduzida'; key = 'lt50';  tone = 'is-amber'; }
      else if (w <= 90)  { dose = '40 mg'; label = '50–90 kg · dose base (≈ 0,5 mg/kg)'; key = '50-90'; tone = 'is-green'; }
      else if (w <= 130) { dose = '60 mg'; label = '91–130 kg · ajuste obrigatório'; key = '91-130'; tone = 'is-amber'; }
      else if (w <= 170) { dose = '80 mg'; label = '131–170 kg · degrau seguinte'; key = '131-170'; tone = 'is-amber'; }
      else               { dose = Math.round(w * 0.6) + ' mg'; label = '> 170 kg · 0,6 mg/kg (volta ao cálculo)'; key = 'gt170'; tone = 'is-amber'; }
      val.textContent = dose;
      band.textContent = label + ' · 1×/dia';
      out.className = 'a6-calc__out ' + tone;
      setScale(key);
    }
    input.addEventListener('input', compute);
    compute();
  })();

  /* ============ 3. Mini-EPDS (P12) — dois caminhos de alerta ============ */
  (function epds() {
    var el = document.querySelector('.a6-epds');
    if (!el) return;
    var qs = Array.prototype.slice.call(el.querySelectorAll('.a6-epds__q'));
    var scoreEl = el.querySelector('.a6-epds__score .n');
    var flagScore = el.querySelector('.a6-epds__flag.path-score');
    var flagSent = el.querySelector('.a6-epds__flag.path-sent');

    function recompute() {
      var sum = 0, sentinel = -1;
      qs.forEach(function (q) {
        var pressed = q.querySelector('button[aria-pressed="true"]');
        var v = pressed ? parseInt(pressed.getAttribute('data-v'), 10) : 0;
        sum += v;
        if (q.classList.contains('sentinel')) sentinel = pressed ? v : -1;
      });
      if (scoreEl) scoreEl.textContent = String(sum);
      var scoreOn = sum > 12;
      var sentOn = sentinel > 0;
      if (flagScore) {
        flagScore.classList.toggle('on', scoreOn);
        var st = flagScore.querySelector('.txt');
        if (st) st.textContent = scoreOn ? 'Escore > 12 · rastreamento POSITIVO' : 'Escore ≤ 12 · soma abaixo do corte';
      }
      if (flagSent) {
        flagSent.classList.toggle('on', sentOn);
        var se = flagSent.querySelector('.txt');
        if (se) se.textContent = sentOn ? 'Sentinela POSITIVA · alerta independente do escore' : 'Sentinela (10ª pergunta) sem marcação de risco';
      }
    }

    qs.forEach(function (q) {
      var opts = Array.prototype.slice.call(q.querySelectorAll('button'));
      opts.forEach(function (b) {
        b.setAttribute('aria-pressed', 'false');
        b.addEventListener('click', function () {
          opts.forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
          b.setAttribute('aria-pressed', 'true');
          recompute();
        });
      });
    });
    recompute();
  })();

  /* ============ 4. Rede de segurança: init do SVG-piso IL-06 (onload) ============ */
  (function il06safety() {
    if (typeof window.initIl06 === 'function') {
      try { window.initIl06(); } catch (_) {}
    }
  })();
})();
