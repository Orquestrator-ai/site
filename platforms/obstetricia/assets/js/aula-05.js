/* aula-05.js — componentes-Executor interativos da Aula 5 (Hemorragia puerperal).
   Namespace go-a5-*. Idempotente e guardado: em páginas sem o componente, não faz nada.
   (1) Calculadora do índice de choque (peça-forte da P2) — FC/PAS, trata divisão por zero,
       acende AMARELO ≥0,9 / VERMELHO ≥1,0, aria-live.
   (2) Grid de acrônimo dos 4 "Ts" (P3) — hotspot por T revela o detalhe. */
(function () {
  'use strict';

  /* ---------- (1) Calculadora do índice de choque ---------- */
  Array.prototype.slice.call(document.querySelectorAll('[data-shock-calc]')).forEach(function (calc) {
    var fcEl = calc.querySelector('[data-fc]');
    var pasEl = calc.querySelector('[data-pas]');
    var out = calc.querySelector('.a5-calc__out');
    var valEl = calc.querySelector('[data-out]');
    var flagEl = calc.querySelector('[data-flag]');
    if (!fcEl || !pasEl || !out || !valEl || !flagEl) return;

    function compute() {
      var fc = parseFloat(fcEl.value);
      var pas = parseFloat(pasEl.value);
      out.classList.remove('is-alert', 'is-danger');
      if (isNaN(fc) || isNaN(pas) || fcEl.value === '' || pasEl.value === '') {
        valEl.textContent = '—'; flagEl.textContent = 'Informe FC e PAS'; return;
      }
      if (pas <= 0) {                       // divisão por zero / PAS inválida
        valEl.textContent = '—'; flagEl.textContent = 'PAS deve ser maior que zero'; return;
      }
      if (fc < 0) { valEl.textContent = '—'; flagEl.textContent = 'FC inválida'; return; }
      var idx = fc / pas;
      valEl.textContent = idx.toFixed(2).replace('.', ',');
      if (idx >= 1.0) { out.classList.add('is-danger'); flagEl.textContent = 'Risco de transfusão — abra o protocolo'; }
      else if (idx >= 0.9) { out.classList.add('is-alert'); flagEl.textContent = 'Alerta precoce (corte internacional 0,9)'; }
      else { flagEl.textContent = 'Abaixo dos cortes — mantenha a vigilância'; }
    }
    fcEl.addEventListener('input', compute);
    pasEl.addEventListener('input', compute);
    compute();
  });

  /* ---------- (2) Grid de acrônimo dos 4 "Ts" ---------- */
  Array.prototype.slice.call(document.querySelectorAll('[data-ts-grid]')).forEach(function (grid) {
    var cards = Array.prototype.slice.call(grid.querySelectorAll('[data-ts]'));
    var detail = grid.querySelector('[data-ts-detail]');
    if (!cards.length || !detail) return;
    var titleEl = detail.querySelector('h5');
    var bodyEl = detail.querySelector('p');

    function activate(card) {
      cards.forEach(function (c) { c.setAttribute('aria-expanded', String(c === card)); });
      if (titleEl) titleEl.textContent = card.getAttribute('data-ts-title') || '';
      if (bodyEl) bodyEl.textContent = card.getAttribute('data-ts-body') || '';
      detail.hidden = false;
    }
    cards.forEach(function (card) {
      card.setAttribute('aria-expanded', 'false');
      card.addEventListener('click', function () { activate(card); });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(card); }
      });
    });
  });
})();
