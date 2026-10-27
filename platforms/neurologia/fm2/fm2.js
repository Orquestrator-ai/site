/* fm2.js — Esclerose múltipla (estação fm2)
   Quiz universal no molde .alt/.ltr do chassi _CHASSI-NE (button-based, COM LETRA).
   ⛔ Nunca <input type="radio"> — a letra é elemento (<span class="ltr">) e amarra o gabarito.
   Persistência em localStorage namespace fm2-em- (D6 §3.6). Degrada para memória se falhar. */
(function(){
  'use strict';
  var NS='fm2-em-';
  var mem={};
  function sget(k){ try{ return localStorage.getItem(k); }catch(e){ return k in mem?mem[k]:null; } }
  function sset(k,v){ try{ localStorage.setItem(k,v); }catch(e){ mem[k]=v; } }
  function pageId(){ return (document.body&&document.body.dataset.pageId)||'p0'; }

  function ligarQuiz(sec){
    var gabarito = sec.dataset.gabarito;
    var qid = sec.dataset.quizId || (sec.dataset.quiz||'q');
    var alts = sec.querySelectorAll('.alt');
    var btn = sec.querySelector('[data-quiz-verificar]');
    var exp = sec.querySelector('[data-quiz-explicacao]');
    var live = sec.querySelector('[data-quiz-live]');
    var sel = null;
    alts.forEach(function(b){
      b.addEventListener('click', function(){
        alts.forEach(function(x){ x.setAttribute('aria-checked','false'); x.classList.remove('is-marked'); });
        b.setAttribute('aria-checked','true');
        b.classList.add('is-marked');
        sel = b.dataset.l;
        if (btn){ btn.disabled=false; }
      });
    });
    if (!btn) return;
    btn.addEventListener('click', function(){
      if (!sel){ if (live) live.textContent='Escolha uma alternativa para verificar.'; return; }
      var correta = sel === gabarito;
      alts.forEach(function(b){
        var isGab = b.dataset.l === gabarito;
        b.classList.toggle('is-correct', isGab);
        if (b.dataset.l === sel && !isGab) b.classList.add('is-wrong');
        b.disabled = true;
      });
      if (exp){ exp.hidden=false; exp.setAttribute('aria-hidden','false'); }
      if (live) live.textContent = correta ? 'Resposta correta.' : 'Resposta incorreta — veja a explicação de cada alternativa.';
      sset(NS+pageId()+':quiz:'+qid, correta?'1':'0');
      btn.disabled=true;
      btn.textContent = correta ? '✓ Correto' : '✗ Verificar novamente';
      if (!correta){ setTimeout(function(){ btn.disabled=false; btn.textContent='Verificar resposta'; }, 1200); }
    });
  }

  function ligarDisclosure(t){
    t.addEventListener('click', function(){
      var target=document.getElementById(t.getAttribute('aria-controls'));
      if (!target) return;
      var open=t.getAttribute('aria-expanded')==='true';
      t.setAttribute('aria-expanded', String(!open));
      target.hidden=open;
    });
  }

  function ligarTabs(group){
    var btns=group.querySelectorAll('[data-tab-btn]');
    var panels=group.querySelectorAll('[data-tab-panel]');
    btns.forEach(function(b){
      b.addEventListener('click', function(){
        var id=b.dataset.tabBtn;
        btns.forEach(function(x){ x.setAttribute('aria-selected', x===b?'true':'false'); x.classList.toggle('is-active', x===b); });
        panels.forEach(function(p){ p.hidden = p.dataset.tabPanel!==id; });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('section.quiz[data-quiz]').forEach(ligarQuiz);
    document.querySelectorAll('[data-disclosure-toggle]').forEach(ligarDisclosure);
    document.querySelectorAll('[data-tabs]').forEach(ligarTabs);
  });
})();