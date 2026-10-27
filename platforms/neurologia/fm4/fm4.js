/* fm4.js — Esclerose lateral amiotrófica (fm4) · neurologia
   Self-contained para o quiz e interações da página; o tema, o menu e o
   header auto-hide ficam com o app.js do chassi (já corrigido para escrever
   no <html> E no <body>). Aqui só o que é da cara desta aula:
     · syncSvgTheme — espelha o tema do <body> no <html> para os SVGs
       self-contained resolverem os tokens no seletor :root que cada peça
       declara na própria camada (Bronca 17 / Aprendizado 05).
     · quiz universal — <button class="quiz__alt" data-correct> com a letra
       visível no texto; aria-live; persiste em localStorage (namespace
       neurologia-ela:fm4:pNN:quiz:v1).
     · interações de página: case-cards, trap-card, comparison, details.
   ⛔ NUNCA <input type="radio">: sem a letra visível o gabarito perde a âncora.
*/
(function () {
  "use strict";
  var page = document.body.getAttribute("data-page-id") || "p1";
  var nn = (page.replace("p", "") || "1").padStart(2, "0");
  var quizKey = "neurologia-ela:fm4:p" + nn + ":quiz:v1";
  var uiKey   = "neurologia-ela:fm4:p" + nn + ":ui:v1";

  function lsGet(k){ try { return localStorage.getItem(k); } catch(e){ return null; } }
  function lsSet(k,v){ try { localStorage.setItem(k,v); } catch(e){} }

  /* ── syncSvgTheme ────────────────────────────────────────────────────
     Os SVGs self-contained declaram os alias de cor no :root (== <html>).
     O app.js aplica o tema no <html> e no <body>, mas este observer garante
     que qualquer mudança posterior (toggle fora do DOMContentLoaded, ou
     tema salvo aplicado tardiamente) se reflita no <html> que os SVGs leem. */
  function syncSvgTheme(){
    var t = document.body.getAttribute("data-theme") || "dark";
    document.documentElement.setAttribute("data-theme", t);
  }
  syncSvgTheme();
  if (window.MutationObserver){
    new MutationObserver(syncSvgTheme).observe(document.body, {
      attributes:true, attributeFilter:["data-theme"]
    });
  }

  /* ── Quiz universal ─────────────────────────────────────────────────
     Cada <li class="quiz__question" data-q="N"> contém N <button class="quiz__alt"
     data-correct="true|false"> e um <div class="quiz__feedback" hidden>. */
  var quizState = {};
  try { quizState = JSON.parse(lsGet(quizKey) || "{}") || {}; } catch(e){ quizState = {}; }

  document.querySelectorAll(".quiz__question").forEach(function(qEl){
    var qn = qEl.getAttribute("data-q");
    var alts = Array.prototype.slice.call(qEl.querySelectorAll(".quiz__alt"));
    var fb = qEl.querySelector(".quiz__feedback");
    var verdict = qEl.querySelector(".quiz__verdict");

    function reveal(btn){
      var ok = btn.getAttribute("data-correct") === "true";
      alts.forEach(function(a){
        a.setAttribute("aria-checked", a === btn ? "true" : "false");
        a.classList.remove("is-correct","is-wrong");
        if (a.getAttribute("data-correct") === "true") a.classList.add("is-correct");
        if (a === btn && !ok) a.classList.add("is-wrong");
      });
      if (fb){
        fb.hidden = false;
        fb.setAttribute("aria-hidden","false");
        if (verdict){
          verdict.textContent = ok ? "Correto" : "Não é essa — veja a explicação.";
          verdict.classList.toggle("is-ok", ok);
          verdict.classList.toggle("is-bad", !ok);
        }
      }
      quizState[qn] = { choice: btn.getAttribute("data-l"), correct: ok };
      lsSet(quizKey, JSON.stringify(quizState));
    }

    alts.forEach(function(btn, idx){
      btn.addEventListener("click", function(){ reveal(btn); });
      btn.addEventListener("keydown", function(e){
        if (e.key === "ArrowDown" || e.key === "ArrowRight"){
          e.preventDefault(); (alts[idx+1] || alts[0]).focus();
        } else if (e.key === "ArrowUp" || e.key === "ArrowLeft"){
          e.preventDefault(); (alts[idx-1] || alts[alts.length-1]).focus();
        } else if (e.key === " " || e.key === "Enter"){
          e.preventDefault(); reveal(btn);
        }
      });
    });

    /* restaura estado salvo */
    var st = quizState[qn];
    if (st && st.choice){
      var match = alts.find(function(a){ return a.getAttribute("data-l") === st.choice; });
      if (match) reveal(match);
    }
  });

  /* ── UI: checkboxes e toggles persistidos ─────────────────────────── */
  var uiState = {};
  try { uiState = JSON.parse(lsGet(uiKey) || "{}") || {}; } catch(e){ uiState = {}; }
  document.querySelectorAll("input[data-ui]").forEach(function(inp){
    var k = inp.getAttribute("data-ui");
    if (uiState[k]) inp.checked = true;
    inp.addEventListener("change", function(){
      uiState[k] = inp.checked;
      lsSet(uiKey, JSON.stringify(uiState));
    });
  });

  /* ── Case-card expansível (linhas de timeline / vignette) ────────────
     <button class="case-row__toggle" aria-expanded="false" aria-controls="id"> */
  document.querySelectorAll(".case-row__toggle").forEach(function(btn){
    btn.addEventListener("click", function(){
      var target = document.getElementById(btn.getAttribute("aria-controls"));
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", open ? "false" : "true");
      if (target) target.hidden = open;
    });
  });

  /* ── Trap-card: revela o chip ouro ───────────────────────────────────
     <button class="trap__reveal" aria-expanded="false" aria-controls="id"> */
  document.querySelectorAll(".trap__reveal").forEach(function(btn){
    btn.addEventListener("click", function(){
      var target = document.getElementById(btn.getAttribute("aria-controls"));
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", open ? "false" : "true");
      if (target) target.hidden = open;
    });
  });

  /* ── Comparison ELA × GBS: destaque da linha "sítio" ──────────────── */
  document.querySelectorAll("[data-compare-highlight]").forEach(function(btn){
    btn.addEventListener("click", function(){
      var row = btn.getAttribute("data-compare-highlight");
      document.querySelectorAll(".cmp__row").forEach(function(r){
        r.classList.toggle("is-hl", r.getAttribute("data-row") === row);
      });
    });
  });

  /* ── Mantra board-wants: montar 1º+2º e revelar gabarito ─────────────
     <button class="board__build" data-board="mantra"> */
  document.querySelectorAll(".board__build").forEach(function(btn){
    btn.addEventListener("click", function(){
      var wrap = btn.closest(".board");
      if (!wrap) return;
      wrap.classList.add("is-built");
      var ans = wrap.querySelector(".board__answer");
      if (ans) ans.hidden = false;
      btn.disabled = true;
    });
  });
})();