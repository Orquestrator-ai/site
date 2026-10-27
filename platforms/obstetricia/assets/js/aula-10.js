/* aula-10.js — componentes-Executor da Aula 10 (BÔNUS · síndrome pré-menstrual e síndrome disfórica
   pré-menstrual). Element-scoped: só age sobre nós com prefixo .a10-. Namespace localStorage
   go-a10-* (não colide com as Aulas 1–9). Vanilla, sem dependência externa.

   Peças:
   1) .a10-check  (P3) — checklist de critério em duas colunas unidas pelo conector "E".
   2) .a10-maq    (P4) — máquina de critério: caixa major + contador "= 5" + portões em série.
   3) .a10-clf    (P5) — classificador booleano (interação-âncora): grade etiquetada + 8 portões.
   4) .a10-rot    (P7) — roteador de três escadas paralelas (acordeão em mobile).
   5) .a10-tl     (P8) — timeline tripla de esquemas de dose.

   Regras que valem para as cinco: veredito SEMPRE textual (nunca só por cor); toque e ponteiro
   funcionam em paralelo; teclado opera todo controle; reset visível onde há estado acumulado. */
(function () {
  'use strict';

  var NS = 'go-a10-';
  function save(key, val) { try { localStorage.setItem(NS + key, JSON.stringify(val)); } catch (_) {} }
  function load(key) { try { var v = localStorage.getItem(NS + key); return v === null ? null : JSON.parse(v); } catch (_) { return null; } }
  function pressed(el) { return el.getAttribute('aria-pressed') === 'true'; }
  function setPressed(el, on) { el.setAttribute('aria-pressed', String(!!on)); }
  function ids(list) { return list.map(function (b) { return b.getAttribute('data-id'); }); }

  /* Liga um grupo de botões-alternância: clique e teclado (Enter/Espaço vêm de graça em <button>). */
  function wireToggles(nodes, onChange) {
    nodes.forEach(function (b) {
      b.addEventListener('click', function () { setPressed(b, !pressed(b)); onChange(); });
    });
  }

  /* ============================================================
     1) P3 — CHECKLIST DE CRITÉRIO: 1 afetivo E 1 somático + faixa temporal em três partes
     ============================================================ */
  document.querySelectorAll('.a10-check').forEach(function (box) {
    var afet = Array.prototype.slice.call(box.querySelectorAll('.a10-check__item[data-col="afetivo"]'));
    var soma = Array.prototype.slice.call(box.querySelectorAll('.a10-check__item[data-col="somatico"]'));
    var tempo = Array.prototype.slice.call(box.querySelectorAll('.a10-check__gate'));
    var out = box.querySelector('.a10-check__out');
    var resetBtn = box.querySelector('.a10-check__reset');
    var KEY = 'check';
    if (!out) return;

    function persist() {
      save(KEY, { a: ids(afet.filter(pressed)), s: ids(soma.filter(pressed)), t: ids(tempo.filter(pressed)) });
    }

    function evaluate() {
      var nA = afet.filter(pressed).length;
      var nS = soma.filter(pressed).length;
      var faltamTempo = tempo.filter(function (g) { return !pressed(g); });
      var falta = [];
      if (nA === 0) falta.push('um sintoma afetivo');
      if (nS === 0) falta.push('um sintoma somático');
      faltamTempo.forEach(function (g) { falta.push(g.getAttribute('data-falta')); });

      if (falta.length === 0) {
        out.className = 'a10-out a10-check__out is-ok';
        out.textContent = 'Critério de síndrome pré-menstrual preenchido: ' + nA + ' afetivo(s) E ' + nS +
          ' somático(s), com avaliação retrospectiva, três ciclos consecutivos e presença nos cinco dias que antecedem.';
      } else {
        out.className = 'a10-out a10-check__out is-no';
        out.textContent = 'Ainda não fecha. Falta: ' + falta.join(' · ') + '.';
      }
    }

    wireToggles(afet.concat(soma).concat(tempo), function () { evaluate(); persist(); });
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        afet.concat(soma).concat(tempo).forEach(function (b) { setPressed(b, false); });
        evaluate();
        persist();
      });
    }
    var st = load(KEY);
    if (st) {
      afet.forEach(function (b) { if ((st.a || []).indexOf(b.getAttribute('data-id')) > -1) setPressed(b, true); });
      soma.forEach(function (b) { if ((st.s || []).indexOf(b.getAttribute('data-id')) > -1) setPressed(b, true); });
      tempo.forEach(function (b) { if ((st.t || []).indexOf(b.getAttribute('data-id')) > -1) setPressed(b, true); });
    }
    evaluate();
  });

  /* ============================================================
     2) P4 — MÁQUINA DE CRITÉRIO: >=1 major, total 5, portões em série (dois deles documentais)
     ============================================================ */
  document.querySelectorAll('.a10-maq').forEach(function (box) {
    var major = Array.prototype.slice.call(box.querySelectorAll('.a10-maq__item[data-grupo="major"]'));
    var outros = Array.prototype.slice.call(box.querySelectorAll('.a10-maq__item[data-grupo="outro"]'));
    var portoes = Array.prototype.slice.call(box.querySelectorAll('.a10-maq__gate'));
    var contador = box.querySelector('.a10-maq__count');
    var out = box.querySelector('.a10-maq__out');
    var resetBtn = box.querySelector('.a10-maq__reset');
    var KEY = 'maq';
    if (!out) return;

    function persist() {
      save(KEY, { m: ids(major.filter(pressed)), o: ids(outros.filter(pressed)), g: ids(portoes.filter(pressed)) });
    }

    function evaluate() {
      var nM = major.filter(pressed).length;
      var total = nM + outros.filter(pressed).length;
      if (contador) {
        contador.textContent = total + ' / 5';
        contador.setAttribute('data-ok', String(total >= 5 && nM >= 1));
      }

      var falta = [];
      if (nM < 1) falta.push('pelo menos um sintoma do grupo major');
      if (total < 5) falta.push('total de cinco sintomas (há ' + total + ')');
      var faltaPortao = portoes.filter(function (g) { return !pressed(g); });
      faltaPortao.forEach(function (g) { falta.push(g.getAttribute('data-falta')); });

      /* Regra fina: se o ÚNICO item ausente for o diário prospectivo, o veredito é PROVISÓRIO. */
      var soFaltaDiario = falta.length === 1 && faltaPortao.length === 1 &&
        faltaPortao[0].getAttribute('data-gate') === 'diario';

      if (falta.length === 0) {
        out.className = 'a10-out a10-maq__out is-ok';
        out.textContent = 'Fecha transtorno disfórico pré-menstrual: ' + total + ' sintomas com ' + nM +
          ' do grupo major, história na maioria dos ciclos do último ano, diário prospectivo de ≥2 ciclos, ' +
          '≥5 sintomas na semana que antecede, melhora documentada e exclusão psiquiátrica.';
      } else if (soFaltaDiario) {
        out.className = 'a10-out a10-maq__out is-prov';
        out.textContent = 'Diagnóstico provisório de transtorno disfórico pré-menstrual: o quadro preenche o critério clínico, ' +
          'mas falta a confirmação prospectiva por diário de ≥2 ciclos sintomáticos. A conduta já pode começar.';
      } else {
        out.className = 'a10-out a10-maq__out is-no';
        out.textContent = 'Não fecha. Falta: ' + falta.join(' · ') + '.';
      }
    }

    wireToggles(major.concat(outros).concat(portoes), function () { evaluate(); persist(); });
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        major.concat(outros).concat(portoes).forEach(function (b) { setPressed(b, false); });
        evaluate();
        persist();
      });
    }
    var st = load(KEY);
    if (st) {
      major.forEach(function (b) { if ((st.m || []).indexOf(b.getAttribute('data-id')) > -1) setPressed(b, true); });
      outros.forEach(function (b) { if ((st.o || []).indexOf(b.getAttribute('data-id')) > -1) setPressed(b, true); });
      portoes.forEach(function (b) { if ((st.g || []).indexOf(b.getAttribute('data-id')) > -1) setPressed(b, true); });
    }
    evaluate();
  });

  /* ============================================================
     3) P5 — CLASSIFICADOR BOOLEANO (interação-âncora)
     Grade única de sintomas etiquetados (afetivo · somático · major · outro) + 8 portões.
     Saídas: não preenche · síndrome pré-menstrual · transtorno disfórico provisório · síndrome
     disfórica pré-menstrual — SEMPRE com o critério que faltou.
     ============================================================ */
  document.querySelectorAll('.a10-clf').forEach(function (box) {
    var sintomas = Array.prototype.slice.call(box.querySelectorAll('.a10-clf__sym'));
    var portoes = Array.prototype.slice.call(box.querySelectorAll('.a10-clf__gate'));
    var out = box.querySelector('.a10-clf__out');
    var outTitle = box.querySelector('.a10-clf__verdict');
    var outWhy = box.querySelector('.a10-clf__why');
    var resetBtn = box.querySelector('.a10-clf__reset');
    var KEY = 'clf';
    if (!out || !outTitle || !outWhy) return;

    function persist() {
      save(KEY, { s: ids(sintomas.filter(pressed)), g: ids(portoes.filter(pressed)) });
    }

    function gate(name) {
      var g = portoes.filter(function (x) { return x.getAttribute('data-gate') === name; })[0];
      return g ? pressed(g) : false;
    }
    function temTag(tag) {
      return sintomas.filter(function (s) {
        return pressed(s) && (s.getAttribute('data-tags') || '').split(' ').indexOf(tag) > -1;
      }).length;
    }

    function evaluate() {
      var nAfet = temTag('afetivo');
      var nSoma = temTag('somatico');
      var nMajor = temTag('major');
      var total = sintomas.filter(pressed).length;

      /* --- via da síndrome disfórica --- */
      var faltaD = [];
      if (nMajor < 1) faltaD.push('pelo menos um sintoma do grupo major');
      if (total < 5) faltaD.push('total de cinco sintomas (há ' + total + ')');
      if (!gate('ano')) faltaD.push('história na maioria dos ciclos do último ano');
      if (!gate('semana')) faltaD.push('≥5 sintomas na semana que antecede');
      if (!gate('melhora')) faltaD.push('melhora documentada após o início da menstruação');
      if (!gate('psiq')) faltaD.push('exclusão de distúrbio psiquiátrico');
      if (!gate('incap')) faltaD.push('interferência incapacitante nos quatro domínios');
      var faltaDiario = !gate('diario');

      /* --- via da síndrome pré-menstrual --- */
      var faltaS = [];
      if (nAfet < 1) faltaS.push('um sintoma afetivo');
      if (nSoma < 1) faltaS.push('um sintoma somático');
      if (!gate('retro')) faltaS.push('avaliação retrospectiva de três ciclos consecutivos');
      if (!gate('cinco')) faltaS.push('presença nos ≥5 dias que antecedem');

      var verdict, why, cls;
      if (faltaD.length === 0 && !faltaDiario) {
        cls = 'is-dis';
        verdict = 'Síndrome disfórica pré-menstrual';
        why = 'Todos os portões passaram: ' + total + ' sintomas com ' + nMajor + ' do grupo major, na semana que antecede, ' +
          'história na maioria dos ciclos do último ano, diário prospectivo de ≥2 ciclos, melhora documentada, ' +
          'exclusão psiquiátrica e interferência incapacitante nos quatro domínios.';
      } else if (faltaD.length === 0 && faltaDiario) {
        cls = 'is-prov';
        verdict = 'Transtorno disfórico provisório (falta confirmação prospectiva)';
        why = 'Critério ausente: diário prospectivo de ≥2 ciclos sintomáticos. O diagnóstico existe em caráter provisório ' +
          'e a conduta já pode começar — a confirmação vem com o registro.';
      } else if (faltaS.length === 0) {
        cls = 'is-spm';
        verdict = 'Síndrome pré-menstrual';
        why = 'A conjunção afetivo E somático e o critério temporal em três partes estão satisfeitos. ' +
          'Para o outro lado da graduação ainda falta: ' + faltaD.concat(faltaDiario ? ['diário prospectivo de ≥2 ciclos'] : []).join(' · ') + '.';
      } else {
        cls = 'is-no';
        verdict = 'Não preenche';
        why = 'Para a síndrome pré-menstrual falta: ' + faltaS.join(' · ') + '.';
      }

      out.className = 'a10-clf__out ' + cls;
      outTitle.textContent = verdict;
      outWhy.textContent = why;
    }

    wireToggles(sintomas.concat(portoes), function () { evaluate(); persist(); });
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        sintomas.concat(portoes).forEach(function (b) { setPressed(b, false); });
        evaluate();
        persist();
      });
    }
    var st = load(KEY);
    if (st) {
      sintomas.forEach(function (b) { if ((st.s || []).indexOf(b.getAttribute('data-id')) > -1) setPressed(b, true); });
      portoes.forEach(function (b) { if ((st.g || []).indexOf(b.getAttribute('data-id')) > -1) setPressed(b, true); });
    }
    evaluate();
  });

  /* ============================================================
     4) P7 — ROTEADOR DE TRÊS ESCADAS PARALELAS
     Desktop: três colunas abertas em paralelo. Mobile: acordeão por sintoma-alvo.
     ============================================================ */
  (function () {
    var cols = Array.prototype.slice.call(document.querySelectorAll('.a10-rot__col'));
    if (!cols.length) return;
    var mq = window.matchMedia('(max-width: 860px)');
    function sync() {
      cols.forEach(function (c, i) { c.open = mq.matches ? i === 0 : true; });
    }
    sync();
    if (mq.addEventListener) mq.addEventListener('change', sync);
    else if (mq.addListener) mq.addListener(sync);
  })();

  /* ============================================================
     5) P8 — TIMELINE TRIPLA: destaca a faixa sob o ponteiro/foco e narra o esquema em texto
     ============================================================ */
  document.querySelectorAll('.a10-tl').forEach(function (box) {
    var faixas = Array.prototype.slice.call(box.querySelectorAll('.a10-tl__row'));
    var out = box.querySelector('.a10-tl__out');
    if (!faixas.length || !out) return;
    var base = out.textContent;

    function focar(f) {
      faixas.forEach(function (x) { x.classList.toggle('is-on', x === f); });
      out.textContent = f.getAttribute('data-nota') || base;
    }
    function limpar() {
      faixas.forEach(function (x) { x.classList.remove('is-on'); });
      out.textContent = base;
    }
    faixas.forEach(function (f) {
      f.setAttribute('tabindex', '0');
      f.setAttribute('role', 'button');
      var nome = f.querySelector('.a10-tl__name');
      if (nome && !f.getAttribute('aria-label')) f.setAttribute('aria-label', nome.textContent.trim());
      f.addEventListener('mouseenter', function () { focar(f); });
      f.addEventListener('focus', function () { focar(f); });
      f.addEventListener('click', function () { focar(f); });
      f.addEventListener('mouseleave', limpar);
      f.addEventListener('blur', limpar);
      f.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); focar(f); }
      });
    });
  });
})();
