/* tabelao.js — Tabelão da Vitalidade Fetal (objeto persistente, estado cross-aula).
   Semente P2 -> hidrata P4-P9 -> completa P11 (linha VLA = link-back). Consultável do HUB.
   Namespace localStorage: go-tabelao-vitalidade (compartilhado entre aulas) + go-a2-progress. */
(function () {
  'use strict';
  var SNAP = 'go-tabelao-vitalidade';
  var PROG = 'go-a2-progress';

  function visited() { try { return JSON.parse(localStorage.getItem(PROG) || '[]'); } catch (_) { return []; } }

  function apply(scope) {
    var v = visited();
    var rows = scope.querySelectorAll('.tabelao__row[data-unlock]');
    var snapshot = {};
    rows.forEach(function (row) {
      var need = row.getAttribute('data-unlock');            // page id que hidrata a linha
      var linkback = row.getAttribute('data-linkback') === 'true';
      var unlocked = v.indexOf(need) !== -1;
      var st = row.querySelector('.t-state');
      row.classList.remove('filled', 'pending', 'linkback');
      if (unlocked && linkback) { row.classList.add('linkback'); if (st) st.textContent = 'link-back'; }
      else if (unlocked)        { row.classList.add('filled');   if (st) st.textContent = 'preenchida'; }
      else                      { row.classList.add('pending');  if (st) st.textContent = 'aguardando'; }
      snapshot[row.getAttribute('data-row') || need] = unlocked ? (linkback ? 'linkback' : 'filled') : 'pending';
    });
    try { localStorage.setItem(SNAP, JSON.stringify(snapshot)); } catch (_) {}
    var counter = scope.querySelector('[data-tabelao-count]');
    if (counter) {
      var total = rows.length, done = 0;
      rows.forEach(function (r) { if (!r.classList.contains('pending')) done++; });
      counter.textContent = done + '/' + total + ' linhas';
    }
  }

  // Em cada página da aula, reaplica ao trocar de página (o app.js mexe no progress).
  var local = document.querySelector('[data-tabelao]');
  if (local) {
    apply(local);
    // reavalia periodicamente/ao navegar (barato)
    window.addEventListener('hashchange', function () { setTimeout(function () { apply(local); }, 30); });
    document.addEventListener('click', function () { setTimeout(function () { apply(local); }, 30); });
  }

  // No HUB: renderiza a visão consultável a partir do snapshot.
  var hub = document.querySelector('[data-tabelao-hub]');
  if (hub) apply(hub);
})();
