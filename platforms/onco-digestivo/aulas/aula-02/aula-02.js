/* aula-02.js — bootstrap da Aula 2 (Câncer gástrico)
   Reusa router.js + quiz.js compartilhados do template antibioticoterapia.
   Header (brand esq · tema · hambúrguer DIREITA) + menu overlay + router +
   page-nav + progress + quiz universal + auto-hide header.
   Mesma arquitetura da Aula 1; PAGES/PAGE_TITLES próprios (14 páginas: dashboard + 13). */

import { HashRouter } from '../../assets/js/router.js';
import { initQuiz } from '../../assets/js/components/quiz.js';

const PAGES = ['p1','p2','p3','p4','p5','p6','p7','p8','p9','p10','p11','p12','p13','p14'];
const PAGE_TITLES = {
  p1:  'Mapa da aula: o tumor praga',
  p2:  'O caso da mulher de 46 anos',
  p3:  'O tumor praga e as três vias de disseminação',
  p4:  'Fatores de risco: hábitos × H. pylori',
  p5:  'Clínica e sinais de alarme',
  p6:  'Os cinco sinais de doença incurável',
  p7:  'Diagnóstico: EDA, biópsia e o CA 72-4',
  p8:  'Borrmann: a classificação macroscópica',
  p9:  'Lauren: intestinal × difuso',
  p10: 'Estadiamento: o irmão do esôfago',
  p11: 'Carcinomatose peritoneal e a videolaparoscopia',
  p12: 'Mucosectomia × câncer precoce: a pegadinha',
  p13: 'Cirurgia: gastrectomia, margens e linfadenectomia D2',
  p14: 'Síntese, M1/paliação e a resposta ao caso',
};
const NAMESPACE = 'cironco2-aula-02';
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

  // Tema (compartilha chave com o HUB e a Aula 1)
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
    if (e.target.matches('input, textarea, button, select, a')) return;
    if (e.key === 'ArrowRight') router.next();
    if (e.key === 'ArrowLeft') router.prev();
  });
}

/* === Dashboard: links da trilha levam à página === */
function initDashboardLinks() {
  $$('[data-goto]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      location.hash = `#/${el.dataset.goto}`;
    });
  });
}

/* === Bootstrap === */
document.addEventListener('DOMContentLoaded', () => {
  const router = new HashRouter({ pages: PAGES, onChange: renderActivePage });
  initHeader();
  initHeaderAutohide();
  initPageNav(router);
  initDashboardLinks();
  initQuiz({ namespace: NAMESPACE });
  router.init();
});
