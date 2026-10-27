/* app.js — bootstrap da Aula Extra 11 (Sarcomas).
   Reusa o chassi compartilhado: router · quiz universal · interativos (hotspots canônicos).
   Página única long-scroll com 8 seções (p1…p8), hash-router SPA.
   Header (brand · tema · home · hambúrguer direita) + menu overlay + page-nav + progress + PWA.
   Os 8 SVGs interativos usam a engine canônica (.hs-shape) wirada por initInteractive;
   sarcomas-interactive.js é um stub no-op (não há comportamento além do hotspot). */

import { HashRouter } from '../../assets/js/router.js';
import { initQuiz } from '../../assets/js/components/quiz.js';
import { initInteractive } from '../../assets/js/components/interactive.js';

const PAGES = ['p1','p2','p3','p4','p5','p6','p7','p8'];
const PAGE_TITLES = {
  p1: 'O tema que assusta sem motivo',
  p2: 'Onde o sarcoma mora',
  p3: 'Que imagem pedir e que histologia esperar',
  p4: 'Por que o sarcoma mata (e para onde ele vai)',
  p5: 'Quando investigar e como biopsiar',
  p6: 'Tirar o tumor, salvar o membro',
  p7: 'Retroperitônio: o capítulo que vira tudo do avesso',
  p8: 'Tumor desmoide e o que a banca cobra',
};
const NAMESPACE = 'cironco2-aula-extra-11';
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

/* === Header / Menu (hambúrguer à direita) === */
function initHeader() {
  const menuBtn = $('#menu-toggle');
  const menuOverlay = $('#menu-overlay');
  const menuPanel = $('#menu-panel');
  const themeBtn = $('#theme-toggle');

  function closeMenu() {
    menuOverlay.setAttribute('aria-hidden', 'true');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  function openMenu() {
    menuOverlay.setAttribute('aria-hidden', 'false');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    const first = menuPanel.querySelector('a, button');
    if (first) first.focus();
  }
  menuBtn.addEventListener('click', () => {
    menuBtn.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
  });
  document.addEventListener('click', (e) => {
    if (menuOverlay.getAttribute('aria-hidden') === 'false' &&
        !menuPanel.contains(e.target) && !menuBtn.contains(e.target)) closeMenu();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOverlay.getAttribute('aria-hidden') === 'false') { closeMenu(); menuBtn.focus(); }
  });
  menuPanel.addEventListener('click', (e) => { if (e.target.closest('a')) closeMenu(); });

  // Tema (compartilha chave com o HUB e as demais aulas)
  const KEY = 'cironco2-theme';
  if (localStorage.getItem(KEY) === 'light') document.documentElement.setAttribute('data-theme', 'light');
  themeBtn.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    if (cur === 'light') { document.documentElement.removeAttribute('data-theme'); localStorage.setItem(KEY, 'dark'); }
    else { document.documentElement.setAttribute('data-theme', 'light'); localStorage.setItem(KEY, 'light'); }
  });
}

/* === Header auto-hide (some ao descer, volta ao subir) === */
function initHeaderAutohide() {
  const header = $('.site-header');
  if (!header) return;
  let lastY = window.scrollY;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (y > lastY && y > 120) header.setAttribute('data-hidden', 'true');
      else header.removeAttribute('data-hidden');
      lastY = y;
      ticking = false;
    });
  }, { passive: true });
}

/* === Renderização da página ativa === */
function renderActivePage(pageId) {
  $$('.page').forEach((p) => {
    const active = p.id === `page-${pageId}`;
    p.setAttribute('data-active', active ? 'true' : 'false');
    if (active) p.setAttribute('aria-current', 'page'); else p.removeAttribute('aria-current');
  });
  const idx = PAGES.indexOf(pageId);
  const total = PAGES.length;
  const counter = $('#progress-counter'); if (counter) counter.textContent = `${idx + 1} / ${total}`;
  const fill = $('#progress-fill'); if (fill) fill.style.width = `${((idx + 1) / total) * 100}%`;
  $$('.menu-panel__link').forEach((l) => {
    if (l.dataset.page === pageId) l.setAttribute('aria-current', 'page'); else l.removeAttribute('aria-current');
  });
  document.title = `${PAGE_TITLES[pageId]} — Cirurgia Oncológica 2 Bauer`;
  window.scrollTo({ top: 0, behavior: 'auto' });
  localStorage.setItem(`${NAMESPACE}-last-page`, pageId);
}

/* === Navegação inter-páginas === */
function initPageNav(router) {
  $$('.page-nav__btn--prev').forEach((b) => b.addEventListener('click', (e) => { e.preventDefault(); router.prev(); }));
  $$('.page-nav__btn--next').forEach((b) => b.addEventListener('click', (e) => { e.preventDefault(); router.next(); }));
  function updateNavStates() {
    $$('.page-nav__btn--prev').forEach((b) => router.hasPrev() ? b.removeAttribute('data-state') : b.setAttribute('data-state', 'disabled'));
    $$('.page-nav__btn--next').forEach((b) => router.hasNext() ? b.removeAttribute('data-state') : b.setAttribute('data-state', 'disabled'));
  }
  window.addEventListener('hashchange', updateNavStates);
  updateNavStates();
  document.addEventListener('keydown', (e) => {
    const t = e.target;
    // não sequestrar as setas quando o foco está num controle de formulário/link
    // OU dentro de qualquer interação SVG (hotspot, quiz): lá a seta pertence à própria interação.
    if (t.matches && (
      t.matches('input, textarea, button, select, a, [tabindex], [role="button"], [role="radio"], [role="radiogroup"], [role="slider"], [role="checkbox"], [role="group"]') ||
      (t.closest && t.closest('svg'))
    )) return;
    if (e.key === 'ArrowRight') router.next();
    if (e.key === 'ArrowLeft') router.prev();
  });
}

/* === Bootstrap === */
document.addEventListener('DOMContentLoaded', () => {
  const router = new HashRouter({ pages: PAGES, onChange: renderActivePage });
  initHeader();
  initHeaderAutohide();
  initPageNav(router);
  initQuiz({ namespace: NAMESPACE });
  initInteractive(document);
  // sarcomas-interactive.js (script clássico) é um stub no-op: tudo é hotspot canônico
  // já wirado por initInteractive. Mantido por paridade estrutural com as demais aulas.
  router.init();
});
