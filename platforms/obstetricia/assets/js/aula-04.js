/* aula-04.js — interações próprias da Aula 4 (Infecção puerperal).
   Componente-Executor com estado: a LINHA DO TEMPO DO PUERPÉRIO (C1) — nasce na P1,
   hidrata P3 (lóquios) e P6 (mama), consolida na P9. Cada faixa/marco é clicável e
   revela a explicação; o que foi explorado fica salvo. Namespace: go-a4-tl-*
   Idempotente e guardado: em páginas sem timeline não faz nada. */
(function () {
  'use strict';

  var timelines = Array.prototype.slice.call(document.querySelectorAll('[data-tl]'));
  if (!timelines.length) return;

  timelines.forEach(function (tl) {
    var id = tl.getAttribute('data-tl') || 'tl';
    var STORE = 'go-a4-tl-' + id;
    var segs = Array.prototype.slice.call(tl.querySelectorAll('.a4-tl__seg'));
    var detail = tl.querySelector('[data-tl-detail]');
    var detailTitle = detail ? detail.querySelector('.a4-tl__detail-t') : null;
    var detailBody = detail ? detail.querySelector('.a4-tl__detail-b') : null;
    var counter = tl.querySelector('[data-tl-count]');
    var explored = [];
    try { explored = JSON.parse(localStorage.getItem(STORE) || '[]'); if (!Array.isArray(explored)) explored = []; } catch (_) { explored = []; }

    function updateCount() {
      if (!counter) return;
      counter.textContent = explored.length + '/' + segs.length + ' explorados';
      tl.classList.toggle('is-complete', explored.length === segs.length && segs.length > 0);
    }

    function persist() { try { localStorage.setItem(STORE, JSON.stringify(explored)); } catch (_) {} }

    function activate(seg) {
      segs.forEach(function (s) { s.classList.toggle('is-active', s === seg); s.setAttribute('aria-pressed', String(s === seg)); });
      var key = seg.getAttribute('data-tl-seg');
      if (key && explored.indexOf(key) === -1) { explored.push(key); persist(); }
      seg.classList.add('is-seen');
      if (detail) {
        if (detailTitle) detailTitle.textContent = seg.getAttribute('data-tl-title') || seg.textContent.trim();
        if (detailBody) detailBody.textContent = seg.getAttribute('data-tl-detail-text') || '';
        detail.hidden = false;
      }
      updateCount();
    }

    segs.forEach(function (seg) {
      seg.setAttribute('role', 'button');
      seg.setAttribute('aria-pressed', 'false');
      seg.setAttribute('tabindex', '0');
      if (explored.indexOf(seg.getAttribute('data-tl-seg')) !== -1) seg.classList.add('is-seen');
      seg.addEventListener('click', function () { activate(seg); });
      seg.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(seg); }
      });
    });

    updateCount();
  });
})();
