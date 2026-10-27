/* aula.js — bootstrap da Aula 08 "Puberdade precoce" (Pediatria Bauer · NÚCLEO · sequência direta da 07)
   Reusa o chassi: HashRouter + initQuiz + initInteractive (hotspots/.hs-shape, se houver).
   Adiciona: header/menu/tema/auto-hide, page-nav, progresso, collapsibles (scaffold opt-in P8),
   reveal-by-par do "Não confunda" (P12) e card-Bela carimbado (P12).
   Os SVGs de piso (S-*), a Árvore (objeto persistente, 5 estados de piso) e as 2 figuras-herói
   (P3 curva-paradoxo, P12 Árvore completa + Bela) são SELF-CONTAINED: o engine vive dentro do
   <script>/CDATA do próprio SVG; cada um se auto-wira ao ser embutido como markup parseado.
   THEME_KEY compartilha com o HUB. */

import { HashRouter } from '../../assets/js/router.js';
import { initQuiz } from '../../assets/js/components/quiz.js';
import { initInteractive } from '../../assets/js/components/interactive.js';

const PAGES = ['p1','p2','p3','p4','p5','p6','p7','p8','p9','p10','p11','p12'];
const PAGE_TITLES = {
  p1: 'Bela: parece igual à puberdade normal, mas não é',
  p2: 'A equação: sinal puberal + aceleração = puberdade precoce',
  p3: 'O paradoxo da estatura: alto agora, baixo depois',
  p4: 'Central × Periférica: a bifurcação que organiza tudo',
  p5: 'Causas centrais: ♀ idiopática, ♂ investigue o cérebro',
  p6: 'Causas periféricas: a gônada e a adrenal',
  p7: 'Investigação por imagem: idade óssea, RM e ultrassonografia',
  p8: 'O LH como juiz: central ou periférica',
  p9: 'O atalho do menino: o volume testicular entrega a causa',
  p10: 'Variantes benignas: telarca × adrenarca precoce',
  p11: 'Tratamento: o agonista do GnRH que, paradoxalmente, freia',
  p12: 'O algoritmo completo e a resolução de Bela',
};
const NAMESPACE = 'pediatria-aula-08-puberdade-precoce';
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

/* === Collapsibles (scaffold opt-in da P8 — teste de estímulo) === */
function initCollapsibles() {
  $$('.collapsible__btn').forEach((btn) => {
    if (btn.dataset.bound) return; btn.dataset.bound = '1';
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
    });
  });
}

/* === Reveal por par (componente-Executor: "Não confunda" P12 + card-Bela carimbado P12) ===
   Cada peça com [data-reveal] esconde a "resposta" até clique/Enter; toggle acessível. */
function initReveals() {
  $$('[data-reveal]').forEach((el) => {
    if (el.dataset.bound) return; el.dataset.bound = '1';
    const set = (on) => {
      el.setAttribute('data-open', on ? 'true' : 'false');
      el.setAttribute('aria-expanded', on ? 'true' : 'false');
    };
    set(false);
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.addEventListener('click', () => set(el.getAttribute('data-open') !== 'true'));
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); set(el.getAttribute('data-open') !== 'true'); }
    });
  });
}

/* === Opener sheen (vida COM função) — o sheen radial do opener segue o cursor.
   Pura apresentação: escreve --mx/--my (%). Sob reduced-motion, não move (o
   :hover do CSS mantém o sheen estático). Delegado no document → cobre os
   openers de todas as páginas sem re-bind a cada troca de rota. === */
function initOpenerSheen() {
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;
  let raf = 0, pending = null;
  document.addEventListener('pointermove', (e) => {
    const op = e.target.closest && e.target.closest('.opener');
    if (!op) return;
    pending = { op, e };
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      if (!pending) return;
      const { op, e } = pending; pending = null;
      const r = op.getBoundingClientRect();
      op.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
      op.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
    });
  }, { passive: true });
}

/* === Bootstrap === */
document.addEventListener('DOMContentLoaded', () => {
  const router = new HashRouter({ pages: PAGES, onChange: renderActivePage });
  initHeader();
  initHeaderAutohide();
  initOpenerSheen();
  initPageNav(router);
  initQuiz({ namespace: NAMESPACE });
  initInteractive(document); // hotspots .hs-shape (se houver); pisos e heróis se auto-wiram pelo script do próprio SVG
  initCollapsibles();
  initReveals();
  router.init();
});
