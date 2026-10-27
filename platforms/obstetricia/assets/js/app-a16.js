/* app-a16.js — chassi interativo GO da Aula 16. */
(function () {
  'use strict';
  var THEME_KEY = 'go-theme';
  var root = document.documentElement;
  try {
    var saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light') root.setAttribute('data-theme', 'light');
    else if (saved === 'dark') root.removeAttribute('data-theme');
  } catch (_) {}
  var themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.setAttribute('aria-pressed', String(root.getAttribute('data-theme') === 'light'));
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      if (next === 'dark') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', 'light');
      try { localStorage.setItem(THEME_KEY, next); } catch (_) {}
      themeBtn.setAttribute('aria-pressed', String(next === 'light'));
    });
  }
  var menuBtn = document.getElementById('menu-toggle');
  var overlay = document.getElementById('menu-overlay');
  if (overlay && overlay.getAttribute('aria-hidden') !== 'false') overlay.inert = true;
  function closeMenu() {
    if (!overlay) return;
    overlay.setAttribute('aria-hidden', 'true'); overlay.inert = true;
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  function openMenu() {
    if (!overlay) return;
    overlay.setAttribute('aria-hidden', 'false'); overlay.inert = false;
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    var first = overlay.querySelector('.menu-panel__link');
    if (first) first.focus();
  }
  if (menuBtn) menuBtn.addEventListener('click', function () {
    if (overlay && overlay.getAttribute('aria-hidden') === 'true') openMenu(); else closeMenu();
  });
  if (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeMenu();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
  // progress (1/15)
  var total = 15;
  var pid = document.body.getAttribute('data-page-id') || 'p1';
  var idx = parseInt(String(pid).replace(/\D/g, ''), 10) || 1;
  var prog = document.getElementById('progress');
  if (prog) prog.textContent = idx + '/' + total;
})();
