/* interactions-a1.js — calculadoras card-ouro da Aula 1 (ensinam pela ação do aluno):
   ILA (soma dos 4 quadrantes -> classe) na P8 · relação umbílico-cerebral (AU/ACM -> centralização) na P14.
   Vanilla, sem dependência. Respeita a semântica de cor da plataforma. */
(function () {
  'use strict';

  /* ----- Calculadora de ILA (P8): soma dos 4 quadrantes -----
     < 5 = oligodrâmnio · 5 a 8 = líquido diminuído · 8 a 18 = normal · > 18 = aumentado */
  var ila = document.querySelector('[data-calc="ila"]');
  if (ila) {
    var ilaInputs = Array.prototype.slice.call(ila.querySelectorAll('[data-ila]'));
    var ilaSum = ila.querySelector('[data-ila-sum]');
    var ilaClass = ila.querySelector('[data-ila-class]');
    var updateIla = function () {
      var values = ilaInputs.map(function (el) { return el.value === '' ? NaN : parseFloat(el.value); });
      var incomplete = values.some(function (n) { return isNaN(n); });
      if (incomplete) {
        if (ilaSum) ilaSum.textContent = '—';
        if (ilaClass) { ilaClass.textContent = 'informe os 4 quadrantes'; ilaClass.className = 'calc__class'; }
        return;
      }
      var s = values.reduce(function (a, n) { return a + n; }, 0);
      s = Math.round(s * 10) / 10;
      if (ilaSum) ilaSum.textContent = String(s).replace('.', ',');
      var cls, txt;
      if (s < 5)       { cls = 'oligo';  txt = 'oligodrâmnio (< 5)'; }
      else if (s <= 8) { cls = 'dim';    txt = 'líquido diminuído (5–8)'; }
      else if (s <= 18){ cls = 'normal'; txt = 'normal (8–18)'; }
      else             { cls = 'dim';    txt = 'aumentado (> 18)'; }
      if (ilaClass) { ilaClass.textContent = txt; ilaClass.className = 'calc__class ' + cls; }
    };
    ilaInputs.forEach(function (el) { el.addEventListener('input', updateIla); });
    updateIla();
  }

  /* ----- Calculadora da relação umbílico-cerebral (P14): AU / ACM -----
     >= 1 = centralização (número grande sobre número pequeno cruza o 1) */
  var uc = document.querySelector('[data-calc="uc"]');
  if (uc) {
    var umb = uc.querySelector('[data-uc-umb]');
    var cer = uc.querySelector('[data-uc-cer]');
    var ratio = uc.querySelector('[data-uc-ratio]');
    var ucClass = uc.querySelector('[data-uc-class]');
    var updateUc = function () {
      var u = parseFloat(umb && umb.value), c = parseFloat(cer && cer.value);
      if (isNaN(u) || isNaN(c) || c === 0) {
        if (ratio) ratio.textContent = '—';
        if (ucClass) { ucClass.textContent = 'informe os dois S/D'; ucClass.className = 'calc__class'; }
        return;
      }
      var r = Math.round((u / c) * 100) / 100;
      if (ratio) ratio.textContent = String(r).replace('.', ',');
      if (ucClass) {
        if (r >= 1) { ucClass.textContent = 'centralização (≥ 1)'; ucClass.className = 'calc__class central'; }
        else        { ucClass.textContent = 'sem centralização (< 1)'; ucClass.className = 'calc__class normal'; }
      }
    };
    if (umb) umb.addEventListener('input', updateUc);
    if (cer) cer.addEventListener('input', updateUc);
    updateUc();
  }
})();
