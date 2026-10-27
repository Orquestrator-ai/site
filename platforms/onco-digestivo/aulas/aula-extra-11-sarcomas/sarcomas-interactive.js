/* sarcomas-interactive.js — Aula Extra 11 (Sarcomas).
   Os 8 SVGs interativos desta aula usam a ENGINE CANÔNICA de hotspot
   (initInteractive de assets/js/components/interactive.js, wirada pelo app.js):
   cada <g class="hs-shape" data-hs-label/data-hs-text/data-hs-hint> é o alvo do
   clique/foco/teclado, e o painel .hotspot-detail[data-hs-detail-for="saN"] recebe
   o conteúdo. Não há, nesta aula, comportamento além do hotspot canônico (sem slider,
   sem step bespoke, sem toggle externo) — portanto este arquivo é intencionalmente um
   no-op: existe só para paridade estrutural com as demais aulas (que têm um
   <aula>-interactive.js) e como ponto de extensão futuro. A init real é do app.js.
   ZERO efeito colateral, idempotente. */

(function () {
  'use strict';
  // Tudo é hotspot canônico → nada a wirar aqui. initInteractive(document) (chamado
  // pelo app.js) já liga os .hs-shape e os painéis .hotspot-detail.
  window.SarcomasInteractive = { initAll: function () { /* no-op: engine canônica */ } };
})();
