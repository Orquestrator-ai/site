/* aula-03.js — interações próprias da Aula 3 (Fórceps e Vácuo-extrator).
   Único componente-Executor que precisa de JS: o checklist APLICAR interativo (P5) —
   recuperação ativa (clicar a letra marca a caixa e abre explicação + pegadinha).
   Idempotente e guardado: em páginas sem o checklist não faz nada. Namespace: go-a3-aplicar-* */
(function () {
  'use strict';

  var box = document.querySelector('[data-aplicar]');
  if (!box) return;

  var items = Array.prototype.slice.call(box.querySelectorAll('.a3-aplicar__item'));
  var counter = box.querySelector('[data-aplicar-count]');
  var STORE = 'go-a3-aplicar-' + (box.getAttribute('data-aplicar') || 'p5');

  function persist() {
    try {
      var done = items.filter(function (it) { return it.classList.contains('is-done'); })
                      .map(function (it) { return it.getAttribute('data-letter'); });
      localStorage.setItem(STORE, JSON.stringify(done));
    } catch (_) {}
  }

  function updateCount() {
    if (!counter) return;
    var n = items.filter(function (it) { return it.classList.contains('is-done'); }).length;
    counter.textContent = n + '/' + items.length + ' conferidos';
    box.classList.toggle('is-complete', n === items.length);
  }

  function toggle(item, forceOpen) {
    var head = item.querySelector('.a3-aplicar__head');
    var detail = item.querySelector('.a3-aplicar__detail');
    var open = forceOpen === undefined ? (head.getAttribute('aria-expanded') !== 'true') : forceOpen;
    head.setAttribute('aria-expanded', String(open));
    if (detail) detail.hidden = !open;
    if (open) item.classList.add('is-done');
    updateCount();
  }

  items.forEach(function (item) {
    var head = item.querySelector('.a3-aplicar__head');
    if (!head) return;
    head.addEventListener('click', function () { toggle(item); persist(); });
    head.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(item); persist(); }
    });
  });

  /* restaura estado salvo */
  try {
    var saved = JSON.parse(localStorage.getItem(STORE) || '[]');
    if (Array.isArray(saved)) {
      items.forEach(function (item) {
        if (saved.indexOf(item.getAttribute('data-letter')) !== -1) toggle(item, true);
      });
    }
  } catch (_) {}
  updateCount();
})();
