/* aula-07.js — componentes-Executor interativos da Aula 7 (Incontinência urinária na mulher):
   (1) Régua da PPE (P9) — 3 ZONAS (< 60 defeito esfincteriano · 60–90 indeterminada · > 90
       hipermobilidade), input cmH₂O → zona + mecanismo + correlação; limites 60/90 validados,
       JAMAIS binário;
   (2) obj-corredor-casos-gineco (Lurdinha) — registro de estado consultável (go-a7-corredor);
   (3) obj-mapa-assoalho-pelvico — cresce A7→A8; marca marcos tocados (go-a7-mapa).
   Namespace de estado: go-a7-*. Element-scoped: só age se o componente existe na página. */
(function () {
  'use strict';

  /* ============ 1. Régua da PPE — 3 zonas (INEGOCIÁVEL) ============ */
  (function reguaPPE() {
    var input = document.getElementById('a7-ppe-input');
    if (!input) return;
    var out = document.getElementById('a7-ppe-out');
    var verdict = document.getElementById('a7-ppe-verdict');
    var hint = document.getElementById('a7-ppe-hint');
    var zones = {
      low:  document.querySelector('.a7-regua__zone.z-low'),
      mid:  document.querySelector('.a7-regua__zone.z-mid'),
      high: document.querySelector('.a7-regua__zone.z-high')
    };
    function setZone(key) {
      Object.keys(zones).forEach(function (k) { if (zones[k]) zones[k].classList.toggle('on', k === key); });
    }
    function compute() {
      var v = parseFloat(String(input.value).replace(',', '.'));
      if (!isFinite(v) || v < 0) {
        verdict.textContent = '—';
        hint.textContent = 'Informe a pressão de perda ao esforço (cmH₂O).';
        out.className = 'a7-regua__out'; setZone(''); return;
      }
      // Limites 60/90 validados: < 60 defeito · 60–90 indeterminada · > 90 hipermobilidade.
      if (v < 60) {
        verdict.textContent = 'Defeito esfincteriano';
        hint.textContent = '< 60 cmH₂O · o esfíncter mal fecha — perde aos mínimos esforços (um espirro, um riso).';
        out.className = 'a7-regua__out is-red'; setZone('low');
      } else if (v > 90) {
        verdict.textContent = 'Hipermobilidade do colo vesical';
        hint.textContent = '> 90 cmH₂O · foi preciso grande esforço — o esfíncter está competente; o que falha é a sustentação do colo.';
        out.className = 'a7-regua__out is-green'; setZone('high');
      } else {
        verdict.textContent = 'Zona indeterminada';
        hint.textContent = '60–90 cmH₂O · não crava — pode ser mistura dos dois. A banca cobra os extremos.';
        out.className = 'a7-regua__out is-amber'; setZone('mid');
      }
    }
    input.addEventListener('input', compute);
    compute();
  })();

  /* ============ 2. obj-corredor-casos-gineco (Lurdinha) — estado consultável ============ */
  (function corredor() {
    var el = document.querySelector('.a7-caso[data-corredor]');
    if (!el) return;
    var KEY = 'go-a7-corredor';
    var stage = el.getAttribute('data-corredor') || 'nasce';
    var state = {};
    try { state = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (_) { state = {}; }
    state.caso = 'Lurdinha';
    state[stage] = true;
    if (stage === 'fecha') { state.popq = 'Aa+3 Ba+5 Ap-3 Bp-3 C-6 D-7 CVT7'; state.perineo = 'episiotomia · ruptura 2º grau · atrofia'; }
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) {}
    var meta = el.querySelector('[data-corredor-meta]');
    if (meta) meta.textContent = stage === 'fecha' ? 'estado: fechado (POP-Q entregue → A8)' : 'estado: aberto · segue até o fecho do bloco';
  })();

  /* ============ 3. obj-mapa-assoalho-pelvico — cresce A7→A8 ============ */
  (function mapa() {
    var el = document.querySelector('.a7-mapa[data-mapa]');
    var touch = document.querySelectorAll('.a7-mapa-touch[data-mapa-touch]');
    if (!el && !touch.length) return;
    var KEY = 'go-a7-mapa';
    var visited = [];
    try { visited = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (_) { visited = []; }
    function mark(id) { if (id && visited.indexOf(id) === -1) visited.push(id); }
    if (el) mark(el.getAttribute('data-mapa'));
    touch.forEach(function (t) { mark(t.getAttribute('data-mapa-touch')); });
    try { localStorage.setItem(KEY, JSON.stringify(visited)); } catch (_) {}
    if (el) {
      var meta = el.querySelector('[data-mapa-meta]');
      if (meta) meta.textContent = 'funcional · ' + visited.length + ' marco(s) · colunas de distopia a hidratar';
    }
  })();
})();
