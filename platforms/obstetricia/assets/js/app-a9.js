/* app-a9.js — chassi interativo GO para a Aula 9 (Ginecologia · Módulo III, sub-bloco III.b:
   revisão do ciclo menstrual): tema, menu, header auto-hide, progresso de 10 páginas. Namespace
   localStorage próprio: go-a9-* (não colide com as Aulas 1–8). Clone element-scoped de app-a8.js.
   NÃO editar app.js genérico (é a instância da Aula 2). */
(function () {
  'use strict';

  /* ---- Tema (persistente, compartilhado go-theme) ---- */
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

  /* ---- Progresso de 10 páginas + registro de visita (namespace go-a9-*) ---- */
  var pid = document.body.getAttribute('data-page-id');
  if (pid) {
    var ORDER = ['p1','p2','p3','p4','p5','p6','p7','p8','p9','p10'];
    var PROGRESS_KEY = 'go-a9-progress';
    try {
      var v = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '[]');
      if (v.indexOf(pid) === -1) { v.push(pid); localStorage.setItem(PROGRESS_KEY, JSON.stringify(v)); }
    } catch (_) {}
    var i = ORDER.indexOf(pid);
    var progressEl = document.getElementById('progress');
    if (progressEl && i >= 0) progressEl.textContent = (i + 1) + '/' + ORDER.length;
    var cur = document.querySelector('.menu-panel__link[data-page-id="' + pid + '"]');
    if (cur) cur.setAttribute('aria-current', 'page');
  }
})();
