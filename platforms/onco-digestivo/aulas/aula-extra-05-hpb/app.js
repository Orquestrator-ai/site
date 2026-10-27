/* app.js — bootstrap da Aula Extra 5 (Hiperplasia Prostática Benigna)
   Reusa o chassi compartilhado: router · quiz universal · interativos (hotspots).
   Página única long-scroll com 16 seções (p1…p16), hash-router SPA.
   Header (brand · tema · home · hambúrguer direita) + menu overlay + page-nav + progress + PWA.
   As interações bespoke (sliders, calculadoras, step-through, diagramas causais, quiz-caso)
   são wiradas por hpb-interactive.js (carregado como script clássico no index). */

import { HashRouter } from '../../assets/js/router.js';
import { initQuiz } from '../../assets/js/components/quiz.js';
import { initInteractive } from '../../assets/js/components/interactive.js';

const PAGES = ['p1','p2','p3','p4','p5','p6','p7','p8','p9','p10','p11','p12','p13','p14','p15','p16'];
const PAGE_TITLES = {
  p1: 'A próstata do idoso: onde ela está e por que importa',
  p2: 'A uretra masculina em 4 trechos e os 2 traumas clássicos',
  p3: 'Por que a HPB dá sintoma cedo e o câncer dá sintoma tarde',
  p4: 'Se os homens fossem imortais, todos teriam HPB',
  p5: 'A obstrução que você enxerga e a que você não enxerga',
  p6: 'A bexiga é só músculo — e músculo que força, engrossa',
  p7: 'Três mecanismos, três fármacos: o slide que junta tudo',
  p8: 'Esvaziar × encher: os dois times do LUTS',
  p9: 'Como transformar "doutor, já me acostumei" em número',
  p10: 'Quando observar, quando medicar — e o remédio de todos',
  p11: 'O 5-ARI demora, o anticolinérgico é seletivo, e o custo decide',
  p12: 'Quando o remédio não basta: as indicações de cirurgia',
  p13: 'O bexigoma na emergência: por que NÃO é cirurgia de cara',
  p14: 'Manteiga, cautério e a síndrome que dá enjoo na sala',
  p15: 'Diagnóstico clínico: o dedo aponta para o umbigo',
  p16: 'Duas provas, dois desfechos: UNIFESP e UEPA',
};
const NAMESPACE = 'cironco2-aula-extra-05';
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
    // OU dentro de qualquer interação SVG (hotspot, radio IPSS, step, quiz-caso):
    // lá a seta pertence à própria interação / à navegação por teclado interna.
    if (t.matches && (
      t.matches('input, textarea, button, select, a, [tabindex], [role="button"], [role="radio"], [role="radiogroup"]') ||
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
  // hpb-interactive.js (script clássico) já roda seu próprio auto-init no carregamento
  // (IIFE no fim do arquivo). NÃO re-invocar aqui — chamada dupla registrava o focus
  // listener dos hotspots duas vezes. initAll é idempotente, mas a fonte única é o IIFE.
  router.init();
});
