/* aula.js — bootstrap da Aula 07 "Puberdade fisiológica e distúrbios puberais" (Pediatria Bauer · NÚCLEO)
   Reusa o chassi: HashRouter + initQuiz + initInteractive (hotspots/.hs-shape, se houver).
   Adiciona: header/menu/tema/auto-hide, page-nav, progresso, collapsibles (scaffold opt-in P3).
   Os SVGs de piso (S-*) e as 2 figuras-herói (P5 curva de velocidade, P13 Mapa de Tanner) são
   SELF-CONTAINED: o engine (mouse-follow + revelação + toggle + step-through + slider + teclado +
   aria-live) vive dentro do <script>/CDATA do próprio SVG. Não há engine de herói aqui —
   cada SVG se auto-wira ao ser embutido como markup parseado. THEME_KEY compartilha com o HUB. */

import { HashRouter } from '../../assets/js/router.js';
import { initQuiz } from '../../assets/js/components/quiz.js';
import { initInteractive } from '../../assets/js/components/interactive.js';

const PAGES = ['p1','p2','p3','p4','p5','p6','p7','p8','p9','p10','p11','p12','p13'];
const PAGE_TITLES = {
  p1: 'Três adolescentes, três relógios: quem está doente?',
  p2: 'Puberdade é hormônio: dois eventos, dois eixos',
  p3: 'O eixo gonadal: pulso a pulso até a gônada acordar',
  p4: 'Adrenarca: não é o eixo que liga, é a adrenal que muda de assunto',
  p5: 'O crescimento em três tempos, e o número que decide o sexo do estirão',
  p6: 'O crescimento desproporcional: dos pés para o centro',
  p7: 'A ordem feminina: broto, pelo, menstruação — nessa sequência',
  p8: 'Tanner feminino: cinco estágios, e o que muda em cada um',
  p9: 'O que a menarca promete — e o que ela ainda não entrega',
  p10: 'No menino, a puberdade tem número: ≥ 4 mL',
  p11: 'Ginecomastia: por que quase sempre é normal — e quando não é',
  p12: 'Os pares confundíveis: o que decide cada um',
  p13: 'Voltando ao começo: o que Blair, Serena e Dan têm',
};
const NAMESPACE = 'pediatria-aula-07-puberdade';
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

/* === Collapsibles (scaffold opt-in da P3) === */
function initCollapsibles() {
  $$('.collapsible__btn').forEach((btn) => {
    if (btn.dataset.bound) return; btn.dataset.bound = '1';
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
    });
  });
}

/* === Componentes nativos do Executor (repertório §2.9) ===
   mirror-flow (P2): clicar/focar a coluna da gonadarca acende o "marca o início".
   Os cast-cards e o fork-flow são CSS-only (hover/focus-within); só o motor
   precisa de JS para a marcação de "qual dos dois dá a largada". */
function initMotors() {
  $$('.motors__col[data-toggle="start"]').forEach((col) => {
    if (col.dataset.bound) return; col.dataset.bound = '1';
    const flag = col.querySelector('.motors__start-flag');
    const set = (on) => {
      col.setAttribute('data-start', on ? 'true' : 'false');
      if (flag) flag.hidden = !on;
      col.setAttribute('aria-pressed', on ? 'true' : 'false');
    };
    col.setAttribute('role', 'button');
    col.setAttribute('tabindex', '0');
    col.addEventListener('click', () => set(col.getAttribute('data-start') !== 'true'));
    col.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); set(col.getAttribute('data-start') !== 'true'); }
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
  initMotors();
  router.init();
});
