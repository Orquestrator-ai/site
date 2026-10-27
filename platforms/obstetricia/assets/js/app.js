/* app.js — chassi interativo GO: tema, menu, header auto-hide, progresso multi-página.
   Modelo multi-arquivo (cada página = 1 HTML). Namespace localStorage: go-* (cross-aula). */
(function () {
  'use strict';

  /* ---- Tema (persistente) ---- */
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
      var cur = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      if (cur === 'dark') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', 'light');
      try { localStorage.setItem(THEME_KEY, cur); } catch (_) {}
      themeBtn.setAttribute('aria-pressed', String(cur === 'light'));
    });
  }

  /* ---- Menu overlay (não-fullscreen, fecha ao tocar fora / Esc) ---- */
  var menuBtn = document.getElementById('menu-toggle');
  var overlay = document.getElementById('menu-overlay');
  // Menu fechado é aria-hidden=true COM links focáveis => aria-hidden-focus (WCAG serious).
  // inert tira os links do tab order enquanto fechado; ligado no open, desligado no close.
  if (overlay && overlay.getAttribute('aria-hidden') !== 'false') overlay.inert = true;
  function closeMenu() { if (!overlay) return; overlay.setAttribute('aria-hidden', 'true'); overlay.inert = true; if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; }
  function openMenu() { if (!overlay) return; overlay.setAttribute('aria-hidden', 'false'); overlay.inert = false; if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; }
  if (menuBtn && overlay) {
    menuBtn.addEventListener('click', function () { (overlay.getAttribute('aria-hidden') === 'false') ? closeMenu() : openMenu(); });
    document.addEventListener('click', function (e) {
      var panel = overlay.querySelector('.menu-panel');
      if (overlay.getAttribute('aria-hidden') === 'false' && panel && !panel.contains(e.target) && !menuBtn.contains(e.target)) closeMenu();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  }

  /* ---- Header auto-hide (some ao descer, volta ao subir; sem flicker) ---- */
  var header = document.getElementById('site-header');
  if (header) {
    var lastY = window.scrollY, ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return; ticking = true;
      window.requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y > lastY && y > 140) header.setAttribute('data-hidden', 'true'); else header.removeAttribute('data-hidden');
        lastY = y; ticking = false;
      });
    }, { passive: true });
  }

  /* ---- Progresso multi-página + registro de visita ---- */
  var pid = document.body.getAttribute('data-page-id');
  if (pid) {
    var ORDER = ['p1','p2','p3','p4','p5','p6','p7','p8','p9','p10','p11','p12'];
    var PROGRESS_KEY = 'go-a2-progress';
    try {
      var v = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '[]');
      if (v.indexOf(pid) === -1) { v.push(pid); localStorage.setItem(PROGRESS_KEY, JSON.stringify(v)); }
    } catch (_) {}
    var i = ORDER.indexOf(pid);
    var progressEl = document.getElementById('progress');
    if (progressEl && i >= 0) progressEl.textContent = (i + 1) + '/' + ORDER.length;
    // marca o item do menu como atual
    var cur = document.querySelector('.menu-panel__link[data-page-id="' + pid + '"]');
    if (cur) cur.setAttribute('aria-current', 'page');
  }
})();
