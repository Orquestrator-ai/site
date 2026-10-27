/* app-a14.js — chassi interativo GO da Aula 14. Sufixo a14.
   Reusa a gramática do app-a13.js; troca chave de progress e ordem de 12. */
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
  }
  if (menuBtn && overlay) {
    menuBtn.addEventListener('click', function () {
      if (overlay.getAttribute('aria-hidden') === 'false') closeMenu(); else openMenu();
    });
    document.addEventListener('click', function (event) {
      var panel = overlay.querySelector('.menu-panel');
      if (overlay.getAttribute('aria-hidden') === 'false' && panel && !panel.contains(event.target) && !menuBtn.contains(event.target)) closeMenu();
    });
    document.addEventListener('keydown', function (event) { if (event.key === 'Escape') closeMenu(); });
  }
  var header = document.getElementById('site-header');
  if (header) {
    var lastY = window.scrollY, ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y > lastY && y > 140) header.setAttribute('data-hidden', 'true'); else header.removeAttribute('data-hidden');
        lastY = y; ticking = false;
      });
    }, { passive: true });
  }
  var pid = document.body.getAttribute('data-page-id');
  if (pid) {
    var ORDER = [];
    for (var i = 1; i <= 12; i++) ORDER.push('p' + i);
    var KEY = 'go-a14-progress';
    try {
      var visited = JSON.parse(localStorage.getItem(KEY) || '[]');
      if (visited.indexOf(pid) === -1) { visited.push(pid); localStorage.setItem(KEY, JSON.stringify(visited)); }
    } catch (_) {}
    var index = ORDER.indexOf(pid);
    var progress = document.getElementById('progress');
    if (progress && index >= 0) progress.textContent = (index + 1) + '/' + ORDER.length;
    var current = document.querySelector('.menu-panel__link[data-page-id="' + pid + '"]');
    if (current) current.setAttribute('aria-current', 'page');
  }
})();
