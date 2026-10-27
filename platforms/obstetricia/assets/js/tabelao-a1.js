/* tabelao-a1.js — Tabelão da Vitalidade Fetal (metade CRÔNICA, Aula 1).
   Semente P8 (líquido) -> nasce P10 (uterina) -> hidrata umbilical(P11)/cerebral(P13)/ducto(P15)
   -> completo P16. As linhas Cardiotocografia e Perfil biofísico são *ghosted* (handoff -> aula 2).
   Namespace go-a1-* (isolado da aula 2, que usa go-a2-* e go-tabelao-vitalidade). Consultável do HUB. */
(function () {
  'use strict';
  var SNAP = 'go-a1-tabelao';
  var PROG = 'go-a1-progress';

  function visited() { try { return JSON.parse(localStorage.getItem(PROG) || '[]'); } catch (_) { return []; } }

  function apply(scope) {
    var v = visited();
    var rows = scope.querySelectorAll('.tabelao__row');
    var snapshot = {};
    rows.forEach(function (row) {
      var st = row.querySelector('.t-state');
      row.classList.remove('filled', 'pending', 'ghost');
      if (row.getAttribute('data-ghost') === 'true') {           // linhas CTG/PBF — handoff aula 2
        row.classList.add('ghost'); if (st) st.textContent = '→ aula 2';
        snapshot[row.getAttribute('data-row')] = 'ghost';
        return;
      }
      var need = row.getAttribute('data-unlock');
      var unlocked = !need || v.indexOf(need) !== -1;
      if (unlocked) { row.classList.add('filled'); if (st) st.textContent = 'preenchida'; }
      else          { row.classList.add('pending'); if (st) st.textContent = 'aguardando'; }
      snapshot[row.getAttribute('data-row') || need] = unlocked ? 'filled' : 'pending';
    });
    try { localStorage.setItem(SNAP, JSON.stringify(snapshot)); } catch (_) {}
    var counter = scope.querySelector('[data-tabelao-count]');
    if (counter) {
      var doppler = scope.querySelectorAll('.tabelao__row:not([data-ghost])');
      var total = doppler.length, done = 0;
      doppler.forEach(function (r) { if (r.classList.contains('filled')) done++; });
      counter.textContent = done + '/' + total + ' linhas do arco crônico';
    }
  }

  var local = document.querySelector('[data-tabelao-a1]');
  if (local) {
    apply(local);
    window.addEventListener('hashchange', function () { setTimeout(function () { apply(local); }, 30); });
    document.addEventListener('click', function () { setTimeout(function () { apply(local); }, 30); });
  }
})();
