/* aula.js — bootstrap da Aula 05 "Síndromes genéticas" (Pediatria Bauer)
   Reusa o chassi: HashRouter + initQuiz + initInteractive (hotspots/.hs-shape, se houver).
   Adiciona: header/menu/tema/auto-hide, page-nav, progresso, collapsibles.
   Os SVGs de piso (S-01..S-11 + atlas B-15) e as 2 figuras-herói (P9, P15) são
   SELF-CONTAINED: o engine (mouse-follow + revelação + toggle + step-through + teclado +
   aria-live) vive dentro do <script>/CDATA do próprio SVG. Não há engine de herói aqui —
   cada SVG se auto-wira ao ser embutido como markup parseado. */

import { HashRouter } from '../../assets/js/router.js';
import { initQuiz } from '../../assets/js/components/quiz.js';
import { initInteractive } from '../../assets/js/components/interactive.js';

const PAGES = ['p1','p2','p3','p4','p5','p6','p7','p8','p9','p10','p11','p12','p13','p14','p15'];
const PAGE_TITLES = {
  p1: 'O melhor amigo do pediatra é um bom geneticista',
  p2: 'Síndrome de Down: a rainha da prova — e a raiz no cromossomo 21',
  p3: 'Mecanismo 1: a trissomia livre e a idade materna',
  p4: 'Mecanismo 2: a translocação 14;21 e o aconselhamento do casal',
  p5: 'Mecanismo 3: o mosaico — e os três caminhos para a mesma síndrome',
  p6: 'O rosto, as mãos e os pés da Down: o diagnóstico que se faz no olhar',
  p7: 'O coração da Down: cardiopatia em metade das crianças',
  p8: 'Tireoide, crescimento e o intestino: as outras comorbidades da Down',
  p9: 'O mapa de seguimento da Down: cada exame e sua periodicidade',
  p10: 'A coluna que pode luxar: instabilidade atlanto-axial e o cuidado com esportes',
  p11: 'Síndrome de Turner: a menina 45,X e a gônada que não responde',
  p12: 'O corpo do Turner, o GH e o coração: do linfedema neonatal ao coarc-Turner',
  p13: 'Síndrome de Klinefelter: o 47,XXY que só aparece na puberdade',
  p14: 'O eunucoide alto e as duas trissomias graves: Klinefelter, Edwards e Patau',
  p15: 'A ponte das cinco síndromes: cada uma, seu cromossomo, seu achado',
};
const NAMESPACE = 'pediatria-aula-05-sindromes-geneticas';
const THEME_KEY = 'neonato-theme'; // compartilha chave com o HUB
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

  if (localStorage.getItem(THEME_KEY) === 'light') document.documentElement.setAttribute('data-theme', 'light');
  themeBtn.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    if (cur === 'light') { document.documentElement.removeAttribute('data-theme'); localStorage.setItem(THEME_KEY, 'dark'); }
    else { document.documentElement.setAttribute('data-theme', 'light'); localStorage.setItem(THEME_KEY, 'light'); }
  });
}

/* === Header auto-hide === */
function initHeaderAutohide() {
  const header = $('.site-header');
  if (!header) return;
  let lastY = window.scrollY, ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (y > lastY && y > 120) header.setAttribute('data-hidden', 'true');
      else header.removeAttribute('data-hidden');
      lastY = y; ticking = false;
    });
  }, { passive: true });
}

/* === Página ativa === */
function renderActivePage(pageId) {
  $$('.page').forEach((p) => {
    const active = p.id === `page-${pageId}`;
    p.setAttribute('data-active', active ? 'true' : 'false');
    if (active) p.setAttribute('aria-current', 'page'); else p.removeAttribute('aria-current');
  });
  const idx = PAGES.indexOf(pageId), total = PAGES.length;
  const counter = $('#progress-counter'); if (counter) counter.textContent = `${idx + 1} / ${total}`;
  const fill = $('#progress-fill'); if (fill) fill.style.width = `${((idx + 1) / total) * 100}%`;
  $$('.menu-panel__link').forEach((l) => {
    if (l.dataset.page === pageId) l.setAttribute('aria-current', 'page'); else l.removeAttribute('aria-current');
  });
  document.title = `${PAGE_TITLES[pageId]} — Pediatria Bauer`;
  window.scrollTo({ top: 0, behavior: 'auto' });
  try { localStorage.setItem(`${NAMESPACE}-last-page`, pageId); } catch (_) {}
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

/* === Collapsibles === */
function initCollapsibles() {
  $$('.collapsible__btn').forEach((btn) => {
    if (btn.dataset.bound) return; btn.dataset.bound = '1';
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
    });
  });
}

/* === Bootstrap === */
document.addEventListener('DOMContentLoaded', () => {
  const router = new HashRouter({ pages: PAGES, onChange: renderActivePage });
  initHeader();
  initHeaderAutohide();
  initPageNav(router);
  initQuiz({ namespace: NAMESPACE });
  initInteractive(document); // hotspots .hs-shape (se houver); pisos e heróis se auto-wiram pelo script do próprio SVG
  initCollapsibles();
  router.init();
});
