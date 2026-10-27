/* =========================================================================
   GO PREMIUM · DOENÇAS CLÍNICAS NA GRAVIDEZ
   sections-2.js
   Bloco 2 · Hiperêmese gravídica         · 3 páginas (14 → 16)
   Bloco 3 · Diabetes na gestação         · 10 páginas (17 → 26)
   -------------------------------------------------------------------------
   Placeholders premium da Fase 1C (Prompt 1). Conteúdo completo nos
   Prompts 2B (hiperêmese) e 2C (diabetes).
   ========================================================================= */

(function(){
  "use strict";
  if (typeof window.GORender !== "function") return;

  const root = document.getElementById("sectionRoot");
  if (!root) return;

  function inject(html){
    const wrap = document.createElement("div");
    wrap.innerHTML = html.trim();
    while (wrap.firstChild) root.appendChild(wrap.firstChild);
  }

  // ---------- Bloco 2 · Hiperêmese gravídica (3 páginas) — IMPLEMENTAÇÃO COMPLETA ----------

  inject(`
  <section class="section" data-id="hiperemese-vs-nausea">
    <div class="page-header">
      <div class="ph-meta">
        <span class="kicker k-teal">Hiperêmese · página 14</span>
        <h1>Náusea fisiológica × hiperêmese gravídica</h1>
        <p class="lead">Quando vômito de gestante deixa de ser esperado e vira internação. O comparador abaixo separa "náusea comum" de "hiperêmese" pelos critérios objetivos; o checklist decide entre orientar, ajustar antiemético em ambulatório ou internar.</p>
        <div class="hero-tags" style="margin-top:10px">
          <span class="relevance-tag r-cai-pouco">cai pouco</span>
          <span class="relevance-tag r-banca-grande">banca grande</span>
        </div>
      </div>
    </div>

    <div class="q-central"><span class="q-icon">?</span><p>Quando vômito de gestante deixa de ser esperado e vira internação?</p></div>

    <div class="grid cols-2">
      <div class="card glass">
        <span class="kicker k-teal">Visual</span>
        <h3>Comparador · náusea comum × hiperêmese</h3>
        <div class="go-cmp-pair">
          <div class="go-cmp-col go-cmp-ok">
            <h4>Náusea/vômito do 1º trimestre</h4>
            <ul class="list">
              <li>Ocorre em até <b>80%</b> das gestantes; tipicamente cede por volta de <b>16 semanas</b>.</li>
              <li>Tolera via oral entre os episódios.</li>
              <li>Sem perda de peso significativa.</li>
              <li>Sem desidratação clínica.</li>
              <li>Eletrólitos e função hepática normais.</li>
              <li>Fita urinária <b>sem cetonas</b>.</li>
              <li>Conduta: orientação dietética + B6 ± anti-histamínico em casa.</li>
            </ul>
          </div>
          <div class="go-cmp-col go-cmp-warn">
            <h4>Hiperêmese gravídica</h4>
            <ul class="list">
              <li>Vômitos <b>incoercíveis</b>, persistentes, sem trégua.</li>
              <li><b>Intolerância à via oral</b>.</li>
              <li>Perda de peso <b>≥5%</b> do peso pré-gestacional.</li>
              <li>Desidratação clínica (mucosas secas, taquicardia, hipotensão postural).</li>
              <li>Distúrbio hidroeletrolítico (hipocalemia, alcalose hipoclorêmica).</li>
              <li>Fita urinária com <b>cetonúria</b>.</li>
              <li>Pode haver leve elevação de transaminases (sem hepatopatia primária).</li>
              <li>Conduta: <b>internar</b>.</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="card" data-component="HyperemesisDecisionLab" data-implemented="1">
        <span class="kicker">Interação</span>
        <h3>Checklist clínico · orientar / ajustar / internar</h3>
        <p class="text-sm muted">Marque os achados presentes; o sistema decide a conduta.</p>
        <div class="hdl-grid">
          <label><input type="checkbox" data-criterion="incoercivel"> Vômitos incoercíveis</label>
          <label><input type="checkbox" data-criterion="via_oral"> Intolerância à via oral</label>
          <label><input type="checkbox" data-criterion="perda_5"> Perda de peso ≥5% do peso pré-gestacional</label>
          <label><input type="checkbox" data-criterion="desidratacao"> Desidratação clínica</label>
          <label><input type="checkbox" data-criterion="cetonuria"> Cetonúria na fita urinária</label>
          <label><input type="checkbox" data-criterion="disturbio"> Distúrbio hidroeletrolítico (hipocalemia, alcalose)</label>
          <label><input type="checkbox" data-criterion="tgo_leve"> TGO/TGP leve elevação (sem hepatopatia)</label>
          <label><input type="checkbox" data-criterion="taquicardia"> Taquicardia / hipotensão postural</label>
        </div>
        <div class="hdl-output" style="margin-top:12px"></div>
      </div>
    </div>

    <div class="grid cols-2" style="margin-top:18px">
      <div class="card">
        <span class="kicker k-teal">O que a banca quer</span>
        <h3>Critérios diagnósticos · objetivos sempre que possível</h3>
        <p>A hiperêmese gravídica não é definida apenas por "vomitar muito". A banca quer critérios objetivos:</p>
        <ul class="list">
          <li><b>Vômitos incoercíveis e persistentes</b> com intolerância à via oral.</li>
          <li><b>Perda de peso ≥5%</b> do peso pré-gestacional. É o critério mais cobrado.</li>
          <li><b>Desidratação clínica</b>: mucosas secas, turgor reduzido, taquicardia compensatória, hipotensão postural.</li>
          <li><b>Distúrbio hidroeletrolítico</b>: hipocalemia (perda gástrica), alcalose hipoclorêmica (perda de cloro), hiponatremia em casos graves.</li>
          <li><b>Cetonúria</b>: marcador de jejum prolongado/desidratação. Aparece na fita urinária.</li>
          <li>Pode haver <b>elevação leve de transaminases</b> e/ou <b>hiperbilirrubinemia leve</b>, sem doença hepática primária — não confundir com HELLP, esteatose ou hepatite.</li>
        </ul>
        <p>O quadro tipicamente começa entre 4 e 6 semanas, pico em 9 semanas, melhora gradual a partir da 12ª semana e cede em torno de 16–20 semanas. Persistência além disso pede investigação ampliada.</p>
      </div>

      <div class="card">
        <span class="kicker k-amber">Pegadinhas e diferenciais rápidos</span>
        <h3>O que a banca esconde</h3>
        <ul class="list">
          <li><b>"Vômito a partir da 14ª semana sem ter tido antes."</b> Quebra o padrão da hiperêmese clássica (que começa cedo). Investigar outras causas: gastroenterite, cetoacidose diabética, doença biliar, pancreatite.</li>
          <li><b>"Perda de 4% do peso."</b> Não fecha critério (limite é ≥5%). Se há outros marcadores (cetonúria, intolerância via oral), pode-se internar pela soma.</li>
          <li><b>"TGO 80, TGP 65 em gestante com hiperêmese."</b> Elevação leve compatível com hiperêmese — não pula direto para HELLP nem hepatite. Avalie plaquetas, LDH, bilirrubina e siga.</li>
          <li><b>"Vômitos com sangue."</b> Síndrome de Mallory-Weiss (laceração da junção esofagogástrica por esforço de vômito) é diferencial.</li>
          <li><b>"Edema generalizado e PA 138/88 em gestante de 8 semanas com vômitos."</b> Atenção: hiperêmese antes de 20 sem com útero grande para IG e HCG muito alto pede USG para descartar mola.</li>
        </ul>

        <hr style="border:none;border-top:1px solid var(--border);margin:14px 0">

        <span class="kicker k-info">Mnemônico</span>
        <p class="go-mnemonic">"Hiperêmese não é só vômito: tem perda de peso, desidratação e distúrbio."</p>
      </div>
    </div>

    <div class="card" style="margin-top:18px" data-component="quiz" data-correct="c">
      <span class="kicker">Mini-quiz</span>
      <h3>Gestante de 9 semanas com vômitos há 2 semanas</h3>
      <p>Vomita 8–10×/dia, não tolera água há 24h. Peso pré-gestacional 60 kg, peso atual 56 kg. Mucosas secas, taquicardia 108 bpm. Fita urinária: <b>cetona ++</b>.</p>
      <div class="quiz-options">
        <button data-k="a" data-why="Não — perda &gt;5%, intolerância via oral, desidratação e cetonúria fecham hiperêmese, não náusea fisiológica.">A) Náusea fisiológica do 1º trimestre — orientar dieta</button>
        <button data-k="b" data-why="Antiemético em casa não cobre desidratação e distúrbio hidroeletrolítico já instalados — paciente precisa de via venosa.">B) Receitar metoclopramida via oral em casa</button>
        <button data-k="c" data-why="Correto. Perda de ~6,7% do peso + intolerância VO + desidratação + cetonúria = hiperêmese gravídica. Indicação de internação para reposição IV, tiamina antes da glicose e antieméticos.">C) Internar para hidratação IV, tiamina e antieméticos</button>
        <button data-k="d" data-why="USG é importante para descartar mola/gemelar mas não substitui a internação imediata para reposição.">D) Solicitar USG e reavaliar em 7 dias</button>
      </div>
      <div class="quiz-feedback"></div>
    </div>

    <div class="page-dock">
      <a class="dock-link" href="#puerperio-reclassificacao"><small>Anterior</small>← Puerpério e reclassificação</a>
      <a class="dock-link next" href="#hiperemese-diferenciais"><small>Próximo</small>Risco e diferenciais (HCG, tireoide) →</a>
    </div>
  </section>
  `);

  /* ============== 15 · DIFERENCIAIS HCG / TIREOIDE ============== */
  inject(`
  <section class="section" data-id="hiperemese-diferenciais">
    <div class="page-header">
      <div class="ph-meta">
        <span class="kicker k-teal">Hiperêmese · página 15</span>
        <h1>Hiperêmese · risco e diferenciais (HCG, tireoide)</h1>
        <p class="lead">O HCG alto está explicando mais do que o vômito. Esta página mapeia a cadeia HCG → receptor de TSH → hipertireoidismo transitório → vômitos, e separa diagnósticos vizinhos: mola, gemelaridade, Graves verdadeiro e pancreatite gestacional.</p>
        <div class="hero-tags" style="margin-top:10px"><span class="relevance-tag r-aprofundamento">aprofundamento</span></div>
      </div>
    </div>

    <div class="q-central"><span class="q-icon">?</span><p>O HCG alto está explicando mais do que o vômito? Mola, gemelar e hipertireoidismo transitório são parte da história?</p></div>

    <div class="grid cols-2">
      <div class="card glass go-svg-card">
        <span class="kicker k-teal">Visual</span>
        <h3>Cadeia HCG → tireoide → vômito</h3>
        <svg viewBox="0 0 540 320" role="img" class="go-svg">
          <title>Mapa HCG · tireoide · vômito</title>
          <desc>Cadeia mostrando como HCG elevado estimula receptor de TSH e gera hipertireoidismo transitório com vômitos.</desc>
          <defs>
            <linearGradient id="htmTeal" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#0a9f9c"/><stop offset="1" stop-color="#066c6a"/></linearGradient>
            <marker id="htmArr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#7282a0"/></marker>
          </defs>
          <g transform="translate(20,40)">
            <rect width="140" height="44" rx="10" fill="#5b3bd1" fill-opacity=".18" stroke="#5b3bd1" stroke-width="1.6"/>
            <text x="70" y="20" text-anchor="middle" font-size="11" font-weight="800" fill="#3a2a8a">Mola hidatiforme</text>
            <text x="70" y="36" text-anchor="middle" font-size="9.5" fill="#3a2a8a">HCG muito alto</text>
          </g>
          <g transform="translate(20,100)">
            <rect width="140" height="44" rx="10" fill="#5b3bd1" fill-opacity=".18" stroke="#5b3bd1" stroke-width="1.6"/>
            <text x="70" y="20" text-anchor="middle" font-size="11" font-weight="800" fill="#3a2a8a">Gestação gemelar</text>
            <text x="70" y="36" text-anchor="middle" font-size="9.5" fill="#3a2a8a">HCG elevado</text>
          </g>
          <g transform="translate(20,160)">
            <rect width="140" height="44" rx="10" fill="#5b3bd1" fill-opacity=".18" stroke="#5b3bd1" stroke-width="1.6"/>
            <text x="70" y="20" text-anchor="middle" font-size="11" font-weight="800" fill="#3a2a8a">Gestação única</text>
            <text x="70" y="36" text-anchor="middle" font-size="9.5" fill="#3a2a8a">HCG fisiológico</text>
          </g>
          <g transform="translate(200,84)">
            <rect width="120" height="56" rx="12" fill="url(#htmTeal)" opacity=".25" stroke="#0a9f9c" stroke-width="1.8"/>
            <text x="60" y="24" text-anchor="middle" font-size="13" font-weight="800" fill="#066c6a">β-HCG</text>
            <text x="60" y="42" text-anchor="middle" font-size="9.5" fill="#066c6a">subunidade α homóloga ao TSH</text>
          </g>
          <path d="M160 62 L200 100" stroke="#7282a0" stroke-width="1.6" marker-end="url(#htmArr)"/>
          <path d="M160 122 L200 116" stroke="#7282a0" stroke-width="1.6" marker-end="url(#htmArr)"/>
          <path d="M160 182 L200 130" stroke="#7282a0" stroke-width="1.6" stroke-dasharray="3 3" marker-end="url(#htmArr)"/>
          <g transform="translate(360,30)">
            <rect width="160" height="58" rx="12" fill="#fff" fill-opacity=".88" stroke="#b47d18" stroke-width="1.8"/>
            <text x="80" y="22" text-anchor="middle" font-size="12" font-weight="800" fill="#7a5210">Tireoide</text>
            <text x="80" y="38" text-anchor="middle" font-size="9.5" fill="#7a5210">TSH suprimido</text>
            <text x="80" y="50" text-anchor="middle" font-size="9.5" fill="#7a5210">T4 livre normal/borderline</text>
          </g>
          <path d="M320 110 L360 60" stroke="#7282a0" stroke-width="2" marker-end="url(#htmArr)"/>
          <text x="338" y="92" font-size="10" font-weight="700" fill="#7282a0">estimula</text>
          <g transform="translate(360,128)">
            <rect width="160" height="58" rx="12" fill="#fff" fill-opacity=".88" stroke="#d6406b" stroke-width="1.8"/>
            <text x="80" y="22" text-anchor="middle" font-size="12" font-weight="800" fill="#7a1f3d">Vômitos</text>
            <text x="80" y="38" text-anchor="middle" font-size="9.5" fill="#7a1f3d">centro do vômito (área postrema)</text>
            <text x="80" y="50" text-anchor="middle" font-size="9.5" fill="#7a1f3d">e estrogênios elevados</text>
          </g>
          <path d="M320 130 L360 158" stroke="#7282a0" stroke-width="2" marker-end="url(#htmArr)"/>
          <g transform="translate(160,232)">
            <rect width="240" height="58" rx="12" fill="url(#htmTeal)" opacity=".18" stroke="#0a9f9c" stroke-width="1.6"/>
            <text x="120" y="22" text-anchor="middle" font-size="12" font-weight="800" fill="#066c6a">Hiperêmese gravídica</text>
            <text x="120" y="40" text-anchor="middle" font-size="9.5" fill="#066c6a">vômitos + perda de peso + cetonúria + distúrbios</text>
          </g>
          <path d="M260 192 L260 230" stroke="#7282a0" stroke-width="2" marker-end="url(#htmArr)"/>
          <text x="270" y="216" font-size="10" font-weight="700" fill="#7282a0">consequência clínica</text>
        </svg>
        <p class="text-sm muted" style="margin-top:8px">A subunidade α do β-HCG é homóloga à do TSH — em concentrações altas, estimula o receptor de TSH e gera <b>hipertireoidismo transitório</b>.</p>
      </div>

      <div class="card" data-component="HCGThyroidDifferentialMap" data-implemented="1">
        <span class="kicker">Interação</span>
        <h3>Painel de diferenciais</h3>
        <p class="text-sm muted">Clique em cada hipótese para ver pistas, exames e conduta.</p>
        <div class="htm-buttons">
          <button class="htm-dx btn ghost" data-dx="mola">Mola hidatiforme</button>
          <button class="htm-dx btn ghost" data-dx="gemelar">Gestação gemelar</button>
          <button class="htm-dx btn ghost" data-dx="tireoide_transitorio">Hipertireoidismo transitório (HCG)</button>
          <button class="htm-dx btn ghost" data-dx="tireoide_graves">Doença de Graves verdadeira</button>
          <button class="htm-dx btn ghost" data-dx="pancreatite">Pancreatite gestacional</button>
          <button class="htm-dx btn ghost" data-dx="hiperemese_isolada">Hiperêmese isolada</button>
        </div>
        <div class="htm-output" style="margin-top:12px"></div>
      </div>
    </div>

    <div class="grid cols-2" style="margin-top:18px">
      <div class="card">
        <span class="kicker k-teal">O que a banca quer</span>
        <h3>Por que o HCG mexe com a tireoide</h3>
        <p>O β-HCG e o TSH compartilham a <b>subunidade α</b>. Em concentrações altas (mola, gemelar, hiperêmese mais intensa), o HCG cruza-reage com o receptor de TSH e estimula a tireoide. O resultado é um <b>hipertireoidismo transitório</b>, com TSH suprimido e T4 livre normal ou levemente elevado, sem bócio, sem oftalmopatia, com TRAb negativo. Essa forma <b>resolve sozinha</b> com a queda do HCG ao final do 1º trimestre.</p>
        <p>A banca cobra justamente a diferença com a <b>doença de Graves</b>:</p>
        <ul class="list">
          <li><b>Graves verdadeira:</b> TSH suprimido, T4 livre <b>elevado</b>, bócio, oftalmopatia, TRAb <b>positivo</b>, sintomas adrenérgicos significativos. Tratar com propiltiouracil (1º trimestre, menos teratogênico) ou metimazol (2º/3º trimestre).</li>
          <li><b>Transitório por HCG:</b> NÃO tratar com antitireoidiano de rotina. Tratar a hiperêmese (volume, tiamina, antiemético) e acompanhar.</li>
        </ul>
        <p><b>Pancreatite gestacional</b> entra no diferencial em hiperêmese mais intensa com dor em barra: pedir <b>amilase</b> e <b>lipase</b> (se ≥3× o limite, fecha o diagnóstico). A causa mais frequente é colelitíase. <b>Mola hidatiforme</b> tem útero grande para IG, β-HCG muito acima do esperado e USG com vesículas em "cacho de uva".</p>
      </div>

      <div class="card">
        <span class="kicker k-amber">Pegadinhas finas</span>
        <h3>O que a questão tenta esconder</h3>
        <ul class="list">
          <li><b>"TSH 0,02 e T4 livre 1,3 em gestante com vômitos."</b> TSH suprimido + T4L normal/borderline = transitório por HCG. NÃO entrar com antitireoidiano só por causa do TSH.</li>
          <li><b>"Bócio palpável e oftalmopatia."</b> Mudou o diagnóstico — Graves verdadeira. PTU 1º trimestre, metimazol depois.</li>
          <li><b>"β-HCG &gt;100.000 com útero maior que esperado para IG."</b> USG urgente para descartar mola.</li>
          <li><b>"Dor em barra e amilase 1.200."</b> Pancreatite gestacional — colelitíase é a causa mais frequente.</li>
          <li><b>"Hiperêmese refratária após 20 semanas."</b> Sair do quadro clássico — ampliar investigação para causas não obstétricas.</li>
          <li><b>"Vômitos com sangue."</b> Mallory-Weiss; tratar suporte e proteção gástrica.</li>
        </ul>

        <hr style="border:none;border-top:1px solid var(--border);margin:14px 0">

        <span class="kicker k-info">Mnemônico</span>
        <p class="go-mnemonic">"HCG alto explica vômito — mas explica também tireoide."</p>
      </div>
    </div>

    <div class="page-dock">
      <a class="dock-link" href="#hiperemese-vs-nausea"><small>Anterior</small>← Náusea × hiperêmese</a>
      <a class="dock-link next" href="#hiperemese-conduta"><small>Próximo</small>Conduta · tiamina e antieméticos →</a>
    </div>
  </section>
  `);

  /* ============== 16 · CONDUTA · TIAMINA E ANTIEMÉTICOS ============== */
  inject(`
  <section class="section" data-id="hiperemese-conduta">
    <div class="page-header">
      <div class="ph-meta">
        <span class="kicker k-teal">Hiperêmese · página 16</span>
        <h1>Hiperêmese · conduta, tiamina e antieméticos</h1>
        <p class="lead">A falha grave que a questão quer que você esqueça é a <b>tiamina antes ou junto da glicose</b>. Esta página apresenta a pirâmide da conduta e treina a ordem correta no simulador, com as linhas de antieméticos detalhadas.</p>
        <div class="hero-tags" style="margin-top:10px"><span class="relevance-tag r-pegadinha">pegadinha</span></div>
      </div>
    </div>

    <div class="q-central"><span class="q-icon">?</span><p>Qual é a falha grave que a questão quer que você esqueça — e em que ordem entram hidratação, tiamina e antiemético?</p></div>

    <div class="grid cols-2">
      <div class="card glass">
        <span class="kicker k-teal">Visual</span>
        <h3>Pirâmide da conduta</h3>
        <div class="go-pyramid">
          <div class="go-pyr-step go-pyr-1"><strong>1. Internar</strong><span>via venosa, jejum inicial</span></div>
          <div class="go-pyr-step go-pyr-2"><strong>2. Hidratar</strong><span>SF 0,9% ou Ringer lactato; corrigir K+ e Na+</span></div>
          <div class="go-pyr-step go-pyr-3"><strong>3. Tiamina</strong><span>100 mg IV antes/junto da glicose · prevenção de Wernicke</span></div>
          <div class="go-pyr-step go-pyr-4"><strong>4. Antiemético</strong><span>anti-histamínico → metoclopramida → clorpromazina → ondansetrona</span></div>
          <div class="go-pyr-step go-pyr-5"><strong>5. Reintroduzir VO</strong><span>dieta líquida fria → branda → habitual; alta com tolerância e ganho ponderal</span></div>
        </div>
        <p class="text-sm muted" style="margin-top:8px">A pegadinha clássica é infundir glicose sem tiamina em paciente com jejum prolongado — risco de encefalopatia de Wernicke.</p>
      </div>

      <div class="card" data-component="HyperemesisTreatmentProtocol" data-implemented="1">
        <span class="kicker">Interação</span>
        <h3>Ordem correta da conduta</h3>
        <p class="text-sm muted">Clique nas etapas na ordem correta. Erros mostram qual passo deveria ter vindo no momento.</p>
        <div class="htp-list">
          <button class="htp-step" data-step="antiemetico" data-label="Antiemético">Antiemético</button>
          <button class="htp-step" data-step="reintroduzir" data-label="Reintroduzir VO">Reintroduzir VO</button>
          <button class="htp-step" data-step="hidratar" data-label="Hidratar IV">Hidratar IV</button>
          <button class="htp-step" data-step="internar" data-label="Internar">Internar</button>
          <button class="htp-step" data-step="tiamina" data-label="Tiamina IV">Tiamina IV</button>
        </div>
        <div class="htp-chosen" style="margin-top:10px"></div>
        <div class="htp-output" style="margin-top:10px"></div>
        <button class="btn ghost htp-reset" type="button" style="margin-top:8px">Reiniciar</button>
      </div>
    </div>

    <div class="grid cols-2" style="margin-top:18px">
      <div class="card">
        <span class="kicker k-teal">O que a banca quer</span>
        <h3>Conduta passo a passo</h3>
        <ol class="list" style="padding-left:20px">
          <li><b>Internar.</b> Acesso venoso, jejum inicial. Pesar e calcular perda em relação ao peso pré-gestacional.</li>
          <li><b>Hidratar.</b> SF 0,9% ou Ringer lactato. Reposição agressiva nas primeiras horas. Corrigir <b>potássio</b> (perda gástrica gera hipocalemia) e <b>sódio</b> conforme déficit. Cuidado com correção rápida de hiponatremia (mielinólise pontina).</li>
          <li><b>Tiamina (vitamina B1).</b> 100 mg IV diluída em SF, infusão lenta — antes ou simultaneamente à glicose. <b>NUNCA</b> infundir glicose isoladamente em paciente com jejum prolongado: o aporte de glicose sem cofator B1 precipita encefalopatia de Wernicke (ataxia, oftalmoparesia, confusão; pode evoluir para psicose de Korsakoff irreversível).</li>
          <li><b>Antiemético.</b> Linhas de tratamento (escolha conforme protocolo local e disponibilidade):
            <ul class="list">
              <li><b>1ª linha:</b> piridoxina (B6) ± anti-histamínico (meclizina, dimenidrinato).</li>
              <li><b>2ª linha:</b> metoclopramida 10 mg IV/IM 8/8h — segura e amplamente usada.</li>
              <li><b>3ª linha:</b> clorpromazina 25 mg IV/IM (sedação possível).</li>
              <li><b>4ª linha:</b> ondansetrona 4–8 mg IV 8/8h — frequentemente reservada para casos refratários (há discussão sobre potencial associação com fenda labial em uso muito precoce; conferir referência da banca).</li>
            </ul>
          </li>
          <li><b>Reintroduzir VO.</b> Dieta líquida fria, em pequenos volumes; progredir para branda, depois habitual. Alta com <b>tolerância via oral, ganho ponderal e sem cetonúria</b>.</li>
        </ol>
      </div>

      <div class="card">
        <span class="kicker k-amber">Pegadinhas e detalhes finos</span>
        <h3>Erros que mais derrubam o aluno</h3>
        <ul class="list">
          <li><b>"Iniciar SG 5% antes da tiamina."</b> Erro clássico. Tiamina sempre antes ou junto da glicose em paciente com jejum prolongado.</li>
          <li><b>"Reintroduzir dieta normal já no 1º dia."</b> Não. Progressão gradual reduz recidiva.</li>
          <li><b>"Receber antiemético VO antes de tolerar VO."</b> Não funciona — paciente vomita. Use IV ou IM enquanto não tolera VO.</li>
          <li><b>"Ondansetrona como 1ª linha em qualquer banca."</b> Risco de cair em pegadinha sobre o uso precoce no 1º trimestre. Banca tradicional pede classes mais antigas primeiro.</li>
          <li><b>"Corticoide como tratamento da hiperêmese."</b> Reservado a casos extremamente refratários, em centros experientes — não é conduta padrão e raramente cobrado.</li>
          <li><b>"Não internar porque não tem cetonúria."</b> Cetonúria é critério, mas a soma de fatores manda — perda ≥5% + intolerância VO + desidratação podem internar mesmo sem cetona.</li>
        </ul>

        <hr style="border:none;border-top:1px solid var(--border);margin:14px 0">

        <span class="kicker k-info">Mnemônicos</span>
        <p class="go-mnemonic">"Na hiperêmese, não esqueça tiamina."</p>
        <p class="go-mnemonic">"Trilho antes do trem: B1 antes da glicose."</p>
      </div>
    </div>

    <div class="card" style="margin-top:18px" data-component="quiz" data-correct="b">
      <span class="kicker">Mini-quiz</span>
      <h3>Gestante de 11 semanas internada por hiperêmese</h3>
      <p>Vomita há 3 semanas, perda de 6 kg (10% do peso), intolerância VO, desidratação grave, cetona +++. Está sendo preparada para hidratação. Qual a próxima medida obrigatória <b>antes</b> de iniciar SG 5%?</p>
      <div class="quiz-options">
        <button data-k="a" data-why="Ondansetrona é 4ª linha — entra depois das classes anteriores e não substitui a tiamina antes da glicose.">A) Ondansetrona 8 mg IV</button>
        <button data-k="b" data-why="Correto. Em paciente com jejum prolongado, infundir glicose sem tiamina precipita encefalopatia de Wernicke. Sempre tiamina (100 mg IV) antes ou junto da glicose.">B) Tiamina 100 mg IV antes/junto da glicose</button>
        <button data-k="c" data-why="Soro fisiológico isolado é ok, mas a questão pediu o que vem ANTES da glicose — o ponto-chave é a tiamina.">C) SF 0,9% 1.000 mL EV em bolus</button>
        <button data-k="d" data-why="Corticoide é exceção em casos extremamente refratários, não é etapa padrão.">D) Hidrocortisona 100 mg IV</button>
      </div>
      <div class="quiz-feedback"></div>
    </div>

    <div class="page-dock">
      <a class="dock-link" href="#hiperemese-diferenciais"><small>Anterior</small>← Diferenciais HCG e tireoide</a>
      <a class="dock-link next" href="#diabetes-rastreio"><small>Próximo</small>Diabetes · rastreio universal →</a>
    </div>
  </section>
  `);

  /* ============== 17 · DIABETES · RASTREIO UNIVERSAL ============== */
  inject(`
  <section class="section" data-id="diabetes-rastreio">
    <div class="page-header">
      <div class="ph-meta">
        <span class="kicker k-emerald">Diabetes na gestação · página 17</span>
        <h1>Diabetes · caso, fatores de risco e rastreio universal</h1>
        <p class="lead">Fator de risco existe, mas <b>não muda o protocolo</b>. O rastreio é universal: toda gestante é rastreada, com fator ou sem fator. O cartão de anamnese e o jogo verdadeiro/falso treinam o que conta — e o que é só pegadinha de banca.</p>
      </div>
    </div>

    <div class="q-central"><span class="q-icon">?</span><p>Fator de risco muda o protocolo de rastreio?</p></div>

    <div class="grid cols-2">
      <div class="card glass">
        <span class="kicker k-emerald">Visual</span>
        <h3>Cartão de anamnese · pistas destacadas</h3>
        <div class="go-anamnesis">
          <div class="go-an-row"><strong>Antecedente obstétrico:</strong> RN anterior 4.450 g, óbito fetal tardio aos 36 sem.</div>
          <div class="go-an-row"><strong>Antecedente clínico:</strong> obesidade (IMC 33), HAS leve, SOP confirmada.</div>
          <div class="go-an-row"><strong>História familiar:</strong> mãe diabética, tia-avó diabética.</div>
          <div class="go-an-row"><strong>Idade:</strong> 38 anos.</div>
          <div class="go-an-row"><strong>Glicemia de jejum prévia:</strong> 104 mg/dL (há 1 ano).</div>
          <div class="go-an-row go-an-trap"><strong>Pegadinha:</strong> tia-avó diabética é parente de 4º grau — <b>não conta</b>.</div>
        </div>
      </div>

      <div class="card" data-component="DiabetesRiskClassifier" data-implemented="1">
        <span class="kicker">Interação</span>
        <h3>Verdadeiro × falso · fator de risco</h3>
        <p class="text-sm muted">Clique em cada fator para ver se conta como risco para DMG.</p>
        <div class="drc-grid">
          <button class="drc-factor btn ghost" data-factor="macrossomia">Macrossomia anterior (≥4.000 g)</button>
          <button class="drc-factor btn ghost" data-factor="obito">Óbito fetal tardio inexplicado</button>
          <button class="drc-factor btn ghost" data-factor="obesidade">Obesidade (IMC ≥30)</button>
          <button class="drc-factor btn ghost" data-factor="hipertensao">Hipertensão arterial</button>
          <button class="drc-factor btn ghost" data-factor="familiar1">Diabetes em familiar de 1º grau</button>
          <button class="drc-factor btn ghost" data-factor="tiavo">Tia-avó diabética</button>
          <button class="drc-factor btn ghost" data-factor="sop">SOP</button>
          <button class="drc-factor btn ghost" data-factor="idade">Idade ≥35 anos</button>
          <button class="drc-factor btn ghost" data-factor="glicemia_previa">Glicemia de jejum prévia alterada</button>
          <button class="drc-factor btn ghost" data-factor="rastreio">"Sem fator de risco — não rastrear"</button>
        </div>
        <div class="drc-output" style="margin-top:12px"></div>
      </div>
    </div>

    <div class="grid cols-2" style="margin-top:18px">
      <div class="card">
        <span class="kicker k-emerald">O que a banca quer</span>
        <h3>Quem é alto risco — e quem precisa rastreio universal</h3>
        <p>O rastreio do diabetes na gestação é <b>universal</b>. Toda gestante deve ser rastreada, independentemente da presença de fator de risco. A diferença é o nível de atenção e a frequência: pacientes de alto risco merecem ampliação dos exames e seguimento mais próximo.</p>
        <p><b>Fatores de risco clássicos:</b></p>
        <ul class="list">
          <li>Macrossomia em gestação anterior (RN ≥4.000 g) — a banca adora dizer "RN de 4.450 g".</li>
          <li>Óbito fetal tardio inexplicado em gestação anterior.</li>
          <li>Obesidade pré-gestacional (IMC ≥30).</li>
          <li>Hipertensão arterial.</li>
          <li>Diabetes em familiar de <b>1º grau</b> (pai, mãe, irmãos).</li>
          <li>Síndrome dos ovários policísticos (SOP).</li>
          <li>Glicemia de jejum prévia alterada.</li>
          <li>Idade materna avançada (≥35 anos).</li>
          <li>Etnia (em populações com maior prevalência).</li>
          <li>DMG em gestação anterior (rastreio precoce).</li>
        </ul>
        <p class="muted text-sm">"Tia-avó diabética" é a pegadinha clássica — parente de 4º grau não conta.</p>
      </div>

      <div class="card">
        <span class="kicker k-amber">Pegadinhas</span>
        <h3>Detalhes que decidem o gabarito</h3>
        <ul class="list">
          <li><b>"Sem fator de risco — não precisa rastrear."</b> ERRADO. Rastreio é universal.</li>
          <li><b>"Tia-avó / prima diabéticas."</b> Não contam — só parente de 1º grau.</li>
          <li><b>"DMG em gestação anterior."</b> Não é só fator de risco — é indicação de rastreio precoce no início do pré-natal e novamente em 24–28 semanas se inicial normal.</li>
          <li><b>"Óbito fetal tardio sem causa documentada."</b> Pista forte para DMG não diagnosticado.</li>
          <li><b>"Glicemia capilar 110 fora do contexto pré-natal."</b> Não diagnostica nada — usa-se glicemia de jejum venosa ou TOTG.</li>
        </ul>

        <hr style="border:none;border-top:1px solid var(--border);margin:14px 0">

        <span class="kicker k-info">Mnemônico</span>
        <p class="go-mnemonic">"Tia-avó diabética não conta — só parente de 1º grau."</p>
      </div>
    </div>

    <div class="page-dock">
      <a class="dock-link" href="#hiperemese-conduta"><small>Anterior</small>← Hiperêmese · conduta</a>
      <a class="dock-link next" href="#diabetes-diagnostico"><small>Próximo</small>Diagnóstico · jejum e TOTG 75 g →</a>
    </div>
  </section>
  `);

  /* ============== 18 · DIAGNÓSTICO · JEJUM + TOTG ============== */
  inject(`
  <section class="section" data-id="diabetes-diagnostico">
    <div class="page-header">
      <div class="ph-meta">
        <span class="kicker k-emerald">Diabetes na gestação · página 18</span>
        <h1>Diagnóstico · glicemia de jejum e TOTG 75 g</h1>
        <p class="lead">Isso é diabetes <b>gestacional</b> ou <b>prévio</b> que entrou em pré-natal sem diagnóstico anterior? O fluxograma separa as três janelas (jejum &lt;20 sem, TOTG 24–28 sem, pré-natal tardio) e a calculadora classifica automaticamente.</p>
        <div class="hero-tags" style="margin-top:10px"><span class="relevance-tag r-pegadinha">pegadinha</span></div>
      </div>
    </div>

    <div class="q-central"><span class="q-icon">?</span><p>Isso é diabetes gestacional ou diabetes prévio que entrou em pré-natal sem diagnóstico anterior?</p></div>

    <div class="grid cols-2">
      <div class="card glass go-svg-card">
        <span class="kicker k-emerald">Visual</span>
        <h3>Fluxograma diagnóstico</h3>
        <svg viewBox="0 0 540 380" role="img" class="go-svg">
          <title>Fluxograma diagnóstico · DMG e diabetes prévio</title>
          <desc>Caminho de glicemia de jejum antes de 20 semanas e TOTG 75 g entre 24 e 28 semanas, com saídas para normal, DMG e diabetes prévio.</desc>
          <defs>
            <marker id="ddArr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#7282a0"/></marker>
          </defs>
          <!-- raiz -->
          <g transform="translate(180,18)">
            <rect width="180" height="48" rx="10" fill="#0a8a6b" fill-opacity=".18" stroke="#0a8a6b" stroke-width="1.6"/>
            <text x="90" y="22" text-anchor="middle" font-size="12" font-weight="800" fill="#066c4a">Pré-natal &lt;20 semanas</text>
            <text x="90" y="38" text-anchor="middle" font-size="10" fill="#066c4a">Glicemia de jejum venosa</text>
          </g>
          <path d="M270 70 L130 110" stroke="#7282a0" stroke-width="2" marker-end="url(#ddArr)"/>
          <path d="M270 70 L270 110" stroke="#7282a0" stroke-width="2" marker-end="url(#ddArr)"/>
          <path d="M270 70 L420 110" stroke="#7282a0" stroke-width="2" marker-end="url(#ddArr)"/>
          <!-- 3 saídas do jejum -->
          <g transform="translate(40,116)">
            <rect width="180" height="56" rx="10" fill="#0a8a6b" fill-opacity=".22" stroke="#0a8a6b" stroke-width="1.6"/>
            <text x="90" y="22" text-anchor="middle" font-size="12" font-weight="800" fill="#066c4a">&lt;92</text>
            <text x="90" y="40" text-anchor="middle" font-size="10" fill="#066c4a">Normal · solicitar TOTG 24–28 sem</text>
          </g>
          <g transform="translate(220,116)">
            <rect width="100" height="56" rx="10" fill="#b47d18" fill-opacity=".22" stroke="#b47d18" stroke-width="1.6"/>
            <text x="50" y="22" text-anchor="middle" font-size="12" font-weight="800" fill="#7a5210">92–125</text>
            <text x="50" y="40" text-anchor="middle" font-size="10" fill="#7a5210">DMG</text>
          </g>
          <g transform="translate(330,116)">
            <rect width="180" height="56" rx="10" fill="#d6406b" fill-opacity=".22" stroke="#d6406b" stroke-width="1.6"/>
            <text x="90" y="22" text-anchor="middle" font-size="12" font-weight="800" fill="#7a1f3d">≥126</text>
            <text x="90" y="40" text-anchor="middle" font-size="10" fill="#7a1f3d">Diabetes prévio</text>
          </g>
          <!-- TOTG -->
          <path d="M130 172 L270 200" stroke="#7282a0" stroke-width="2" marker-end="url(#ddArr)"/>
          <g transform="translate(180,206)">
            <rect width="180" height="48" rx="10" fill="#0a8a6b" fill-opacity=".18" stroke="#0a8a6b" stroke-width="1.6"/>
            <text x="90" y="22" text-anchor="middle" font-size="12" font-weight="800" fill="#066c4a">TOTG 75 g · 24–28 sem</text>
            <text x="90" y="38" text-anchor="middle" font-size="10" fill="#066c4a">Jejum · 1h · 2h</text>
          </g>
          <path d="M270 258 L130 298" stroke="#7282a0" stroke-width="2" marker-end="url(#ddArr)"/>
          <path d="M270 258 L270 298" stroke="#7282a0" stroke-width="2" marker-end="url(#ddArr)"/>
          <path d="M270 258 L420 298" stroke="#7282a0" stroke-width="2" marker-end="url(#ddArr)"/>
          <g transform="translate(40,304)">
            <rect width="180" height="56" rx="10" fill="#0a8a6b" fill-opacity=".22" stroke="#0a8a6b" stroke-width="1.6"/>
            <text x="90" y="22" text-anchor="middle" font-size="12" font-weight="800" fill="#066c4a">Normal</text>
            <text x="90" y="40" text-anchor="middle" font-size="9.5" fill="#066c4a">jejum &lt;92 · 1h &lt;180 · 2h &lt;153</text>
          </g>
          <g transform="translate(220,304)">
            <rect width="100" height="56" rx="10" fill="#b47d18" fill-opacity=".22" stroke="#b47d18" stroke-width="1.6"/>
            <text x="50" y="22" text-anchor="middle" font-size="12" font-weight="800" fill="#7a5210">DMG</text>
            <text x="50" y="40" text-anchor="middle" font-size="9" fill="#7a5210">≥1 valor alterado</text>
          </g>
          <g transform="translate(330,304)">
            <rect width="180" height="56" rx="10" fill="#d6406b" fill-opacity=".22" stroke="#d6406b" stroke-width="1.6"/>
            <text x="90" y="22" text-anchor="middle" font-size="12" font-weight="800" fill="#7a1f3d">Diabetes prévio</text>
            <text x="90" y="40" text-anchor="middle" font-size="9.5" fill="#7a1f3d">jejum ≥126 OU 2h ≥200</text>
          </g>
        </svg>
      </div>

      <div class="card" data-component="GestationalDiabetesDiagnosisFlow" data-implemented="1">
        <span class="kicker">Interação</span>
        <h3>Calculadora diagnóstica</h3>
        <p class="text-sm muted">Insira valores em qualquer um dos quatro campos; o sistema classifica automaticamente.</p>
        <div class="gdd-form">
          <label>Glicemia de jejum (&lt;20 sem) <input type="number" data-field="jejum_inicial" placeholder="ex.: 95" min="0" max="400"></label>
          <label>TOTG · jejum <input type="number" data-field="totg_jejum" placeholder="ex.: 90" min="0" max="400"></label>
          <label>TOTG · 1h <input type="number" data-field="totg_1h" placeholder="ex.: 175" min="0" max="400"></label>
          <label>TOTG · 2h <input type="number" data-field="totg_2h" placeholder="ex.: 150" min="0" max="400"></label>
        </div>
        <div class="gdd-output" style="margin-top:12px"></div>
      </div>
    </div>

    <div class="grid cols-2" style="margin-top:18px">
      <div class="card">
        <span class="kicker k-emerald">O que a banca quer</span>
        <h3>Pontos de corte e três janelas</h3>
        <p><b>1ª janela · &lt;20 semanas (primeira consulta) · glicemia de jejum venosa:</b></p>
        <ul class="list">
          <li>&lt;92 mg/dL → normal nessa fase. Solicitar TOTG 75 g entre 24 e 28 semanas.</li>
          <li>92–125 mg/dL → <b>diabetes mellitus gestacional (DMG)</b>.</li>
          <li>≥126 mg/dL → <b>diabetes prévio</b> não diagnosticado. Encaminhar imediatamente ao alto risco. Considerar HbA1c para confirmar.</li>
        </ul>
        <p><b>2ª janela · 24 a 28 semanas · TOTG 75 g (3 medidas: jejum, 1h, 2h):</b></p>
        <ul class="list">
          <li>Pontos de corte: jejum 92, 1h 180, 2h 153.</li>
          <li><b>Um único valor alterado fecha DMG.</b></li>
          <li>Jejum ≥126 OU 2h ≥200 → <b>diabetes prévio</b>.</li>
        </ul>
        <p><b>3ª janela · pré-natal iniciado tardiamente (≥20 semanas):</b> seguir direto para o TOTG 75 g; usar os mesmos pontos de corte da 2ª janela.</p>
      </div>

      <div class="card">
        <span class="kicker k-amber">Pegadinhas</span>
        <h3>Detalhes que viram gabarito</h3>
        <ul class="list">
          <li><b>"Jejum 92 antes de 20 sem"</b> → DMG (limite). 91 = normal.</li>
          <li><b>"TOTG: jejum 90, 1h 165, 2h 154"</b> → DMG (apenas 2h alterado, mas basta um).</li>
          <li><b>"Jejum 126 antes de 20 sem"</b> → diabetes prévio, não DMG. Encaminhar alto risco.</li>
          <li><b>"TOTG 2h = 205"</b> → diabetes prévio (não DMG).</li>
          <li><b>Diferença diagnóstico × acompanhamento:</b> jejum 92 é diagnóstico; jejum 95 é alvo de acompanhamento. Não confundir.</li>
          <li><b>"HbA1c na gestação"</b> não é exame de rastreio — pode auxiliar em casos de diabetes prévio para avaliar controle, mas não substitui jejum/TOTG no diagnóstico de DMG.</li>
          <li><b>"Glicemia capilar"</b> não diagnostica DMG — usar amostra venosa.</li>
        </ul>

        <hr style="border:none;border-top:1px solid var(--border);margin:14px 0">

        <span class="kicker k-info">Mnemônicos</span>
        <p class="go-mnemonic">"Diagnóstico é 92; acompanhamento é 95."</p>
        <p class="go-mnemonic">"TOTG: jejum 92, 1h 180, 2h 153 — basta um."</p>
      </div>
    </div>

    <div class="card" style="margin-top:18px" data-component="quiz" data-correct="b">
      <span class="kicker">Mini-quiz</span>
      <h3>Gestante de 14 semanas com glicemia de jejum 104</h3>
      <p>Sem outros exames. IMC 32. RN anterior de 4.300 g. Mãe diabética.</p>
      <div class="quiz-options">
        <button data-k="a" data-why="≥126 mg/dL é o ponto para diabetes prévio. 104 não atinge esse limite — fica em DMG.">A) Diabetes prévio não diagnosticado</button>
        <button data-k="b" data-why="Correto. Jejum entre 92 e 125 mg/dL antes de 20 semanas fecha DMG. Iniciar dieta + atividade física e perfil glicêmico. Considerar fatores de risco para encaminhamento conforme protocolo.">B) Diabetes mellitus gestacional (DMG)</button>
        <button data-k="c" data-why="O ponto de corte de DMG no jejum &lt;20 sem é 92, não 100. 104 já está no espectro.">C) Glicemia normal — pedir TOTG 24–28 sem</button>
        <button data-k="d" data-why="Pré-diabetes não é diagnóstico padrão na gestação — usa-se DMG ou diabetes prévio.">D) Pré-diabetes gestacional</button>
      </div>
      <div class="quiz-feedback"></div>
    </div>

    <div class="page-dock">
      <a class="dock-link" href="#diabetes-rastreio"><small>Anterior</small>← Diabetes · rastreio</a>
      <a class="dock-link next" href="#diabetes-fisiologia"><small>Próximo</small>Fisiologia placentária e perfil glicêmico →</a>
    </div>
  </section>
  `);

  /* ============== 19 · FISIOLOGIA + PERFIL GLICÊMICO ============== */
  inject(`
  <section class="section" data-id="diabetes-fisiologia">
    <div class="page-header">
      <div class="ph-meta">
        <span class="kicker k-emerald">Diabetes na gestação · página 19</span>
        <h1>Fisiologia placentária e perfil glicêmico</h1>
        <p class="lead">A glicose piora quando a placenta cresce — porque a placenta produz hormônios contra-insulínicos. Esta página entrega a cadeia fisiológica e o painel de alvos: <b>diagnóstico (92)</b> × <b>acompanhamento (95)</b>.</p>
      </div>
    </div>

    <div class="q-central"><span class="q-icon">?</span><p>Por que a glicose piora quando a placenta cresce — e por que o pâncreas ainda funciona no DMG?</p></div>

    <div class="grid cols-2">
      <div class="card glass go-svg-card">
        <span class="kicker k-emerald">Visual</span>
        <h3>Cadeia fisiológica · placenta → contra-insulínicos → resistência</h3>
        <svg viewBox="0 0 540 280" role="img" class="go-svg">
          <title>Cadeia fisiológica do DMG</title>
          <desc>Linha mostrando placenta crescendo, secreção de hLP/cortisol/GH placentário e resistência insulínica progressiva.</desc>
          <line x1="40" y1="160" x2="500" y2="160" stroke="#7282a0" stroke-width="2"/>
          <g font-size="11" fill="#066c4a" font-weight="700">
            <circle cx="80" cy="160" r="6" fill="#0a8a6b"/><text x="80" y="186" text-anchor="middle">12 sem</text>
            <circle cx="220" cy="160" r="8" fill="#b47d18"/><text x="220" y="186" text-anchor="middle">24 sem</text>
            <circle cx="360" cy="160" r="10" fill="#d6406b"/><text x="360" y="186" text-anchor="middle">32 sem</text>
            <circle cx="480" cy="160" r="6" fill="#0a8a6b"/><text x="480" y="186" text-anchor="middle">parto</text>
          </g>
          <text x="80" y="140" text-anchor="middle" font-size="9.5" fill="#44546f">Placenta pequena</text>
          <text x="220" y="140" text-anchor="middle" font-size="9.5" fill="#44546f">hLP ↑ · cortisol ↑</text>
          <text x="360" y="140" text-anchor="middle" font-size="9.5" fill="#44546f">resistência ↑↑</text>
          <text x="480" y="140" text-anchor="middle" font-size="9.5" fill="#44546f">queda</text>
          <rect x="60" y="40" width="440" height="60" rx="10" fill="#0a8a6b" fill-opacity=".10" stroke="#0a8a6b" stroke-width="1.4"/>
          <text x="280" y="62" text-anchor="middle" font-size="12" font-weight="800" fill="#066c4a">Hormônios contra-insulínicos placentários</text>
          <text x="280" y="80" text-anchor="middle" font-size="10" fill="#066c4a">Lactogênio placentário (hLP) · cortisol · GH placentário · estrogênio · progesterona</text>
          <rect x="60" y="220" width="440" height="44" rx="10" fill="#b47d18" fill-opacity=".12" stroke="#b47d18" stroke-width="1.4"/>
          <text x="280" y="240" text-anchor="middle" font-size="11" font-weight="800" fill="#7a5210">Pâncreas materno tenta compensar</text>
          <text x="280" y="256" text-anchor="middle" font-size="9.5" fill="#7a5210">Quem não compensa → DMG · pâncreas ainda funciona, dieta ainda funciona</text>
        </svg>
      </div>

      <div class="card" data-component="GlycemicProfileDashboard" data-implemented="1">
        <span class="kicker">Interação</span>
        <h3>Painel · diagnóstico × acompanhamento</h3>
        <div class="gpd-tabs">
          <button class="gpd-tab" data-tab="dx">Pontos de corte diagnósticos</button>
          <button class="gpd-tab" data-tab="seg">Alvos de acompanhamento</button>
        </div>
        <div class="gpd-pane" data-tab="dx">
          <table class="gpd-table">
            <thead><tr><th>Exame</th><th>Ponto de corte</th><th>Resultado</th></tr></thead>
            <tbody>
              <tr><td>Jejum &lt;20 sem</td><td>92–125</td><td>DMG</td></tr>
              <tr><td>Jejum &lt;20 sem</td><td>≥126</td><td>Diabetes prévio</td></tr>
              <tr><td>TOTG · jejum</td><td>≥92</td><td>DMG</td></tr>
              <tr><td>TOTG · 1h</td><td>≥180</td><td>DMG</td></tr>
              <tr><td>TOTG · 2h</td><td>≥153</td><td>DMG</td></tr>
              <tr><td>TOTG · 2h</td><td>≥200</td><td>Diabetes prévio</td></tr>
            </tbody>
          </table>
          <p class="text-sm muted" style="margin-top:8px">Apenas <b>um valor alterado</b> fecha DMG no TOTG.</p>
        </div>
        <div class="gpd-pane" data-tab="seg" style="display:none">
          <table class="gpd-table">
            <thead><tr><th>Medida</th><th>Alvo (acompanhamento)</th></tr></thead>
            <tbody>
              <tr><td>Jejum</td><td><b>&lt;95 mg/dL</b></td></tr>
              <tr><td>1h pós-refeição</td><td><b>&lt;140 mg/dL</b></td></tr>
              <tr><td>2h pós-refeição</td><td><b>&lt;120 mg/dL</b></td></tr>
              <tr><td>Mínimo (evitar)</td><td>&gt;60 (evitar hipoglicemia)</td></tr>
            </tbody>
          </table>
          <p class="text-sm muted" style="margin-top:8px"><b>Diagnóstico é 92; acompanhamento é 95.</b> Pontos diferentes para finalidades diferentes.</p>
        </div>
      </div>
    </div>

    <div class="grid cols-2" style="margin-top:18px">
      <div class="card">
        <span class="kicker k-emerald">O que a banca quer</span>
        <h3>Por que o DMG aparece e por que dieta funciona</h3>
        <p>A placenta cresce ao longo da gestação e produz hormônios <b>contra-insulínicos</b>: lactogênio placentário humano (hLP), cortisol, hormônio do crescimento placentário (GH placentário), estrogênio e progesterona em alta concentração. Esses hormônios <b>antagonizam a ação da insulina</b> nos tecidos periféricos, gerando <b>resistência insulínica fisiológica</b> que aumenta progressivamente do 2º para o 3º trimestre, com pico em torno de 24–28 semanas (justamente a janela do TOTG).</p>
        <p>Em gestantes com reserva pancreática adequada, o pâncreas <b>compensa</b> aumentando a produção de insulina. Quem não compensa desenvolve <b>DMG</b>. Diferentemente do diabetes prévio (em que há disfunção de células β estabelecida), o DMG é primariamente <b>resistência</b> com pâncreas ainda funcional — por isso <b>dieta e atividade física resolvem na maioria dos casos</b>.</p>
        <p><b>Alvos de acompanhamento</b> (perfil glicêmico capilar):</p>
        <ul class="list">
          <li>Jejum: &lt;95 mg/dL.</li>
          <li>1 hora pós-refeição: &lt;140 mg/dL.</li>
          <li>2 horas pós-refeição: &lt;120 mg/dL.</li>
          <li>Evitar hipoglicemia (&gt;60 mg/dL).</li>
        </ul>
        <p>Notar a diferença: o ponto <b>92</b> é diagnóstico (define se há DMG); o ponto <b>95</b> é alvo de manejo (mostra se o tratamento está adequado).</p>
      </div>

      <div class="card">
        <span class="kicker k-amber">Pegadinhas e detalhes</span>
        <h3>O que a banca esconde</h3>
        <ul class="list">
          <li><b>"Jejum 95 em DMG em uso de dieta"</b> → no <b>limite</b>; perfil glicêmico mostra se passa. Repetir e avaliar tendência.</li>
          <li><b>"Hipoglicemia inesperada no 3º trimestre"</b> com mesma dose e mesma dieta = sinal de <b>insuficiência placentária</b> (placenta sofrendo, produzindo menos hormônios contra-insulínicos). Avaliar vitalidade fetal.</li>
          <li><b>"DMG bem controlado com dieta — manter sempre."</b> No puerpério, suspender — não manter dieta hipoglicemiante.</li>
          <li><b>"HbA1c &lt;6% normal."</b> Em diabetes prévio engravidando, alvo periconcepcional ideal é HbA1c o mais baixo possível para evitar malformações; durante a gestação, alvo &lt;6,0–6,5%.</li>
          <li><b>"Frutosamina"</b> não é uma medida padrão — não cai com frequência.</li>
        </ul>

        <hr style="border:none;border-top:1px solid var(--border);margin:14px 0">

        <span class="kicker k-info">Mnemônico</span>
        <p class="go-mnemonic">"Diabetes gestacional é resistência, não falência absoluta."</p>
      </div>
    </div>

    <div class="page-dock">
      <a class="dock-link" href="#diabetes-diagnostico"><small>Anterior</small>← Diagnóstico · jejum e TOTG</a>
      <a class="dock-link next" href="#diabetes-dieta-30"><small>Próximo</small>Dieta, atividade e regra dos 30% →</a>
    </div>
  </section>
  `);

  /* ============== 20 · DIETA · ATIVIDADE · REGRA DOS 30% ============== */
  inject(`
  <section class="section" data-id="diabetes-dieta-30">
    <div class="page-header">
      <div class="ph-meta">
        <span class="kicker k-emerald">Diabetes na gestação · página 20</span>
        <h1>Dieta, atividade e regra dos 30%</h1>
        <p class="lead">Quando dieta e exercício deixam de ser suficientes — o gatilho é a <b>regra dos 30%</b>. O dashboard abaixo simula um perfil glicêmico de 1 semana e calcula o percentual fora do alvo em tempo real.</p>
      </div>
    </div>

    <div class="q-central"><span class="q-icon">?</span><p>Quando dieta e exercício deixam de ser suficientes — e quando entrar com medicação?</p></div>

    <div class="grid cols-2">
      <div class="card glass">
        <span class="kicker k-emerald">Visual</span>
        <h3>Plano alimentar e atividade</h3>
        <ul class="list">
          <li><b>6 refeições/dia:</b> 3 principais + 3 lanches.</li>
          <li><b>Composição aproximada:</b> 50% carboidratos, 30% lipídios, 20% proteínas.</li>
          <li><b>Carboidratos preferencialmente complexos</b> (integrais, legumes); reduzir ultraprocessados, refrigerantes, açúcar simples.</li>
          <li><b>Atividade física:</b> 30 minutos de moderada intensidade, 5 dias por semana, adaptada à gestante (caminhada, hidroginástica, alongamento).</li>
          <li><b>Monitorização capilar:</b> jejum, 1h ou 2h pós-refeição (variável por protocolo).</li>
          <li><b>Avaliar adesão e perfil por 1–2 semanas</b> antes de decidir medicação.</li>
        </ul>
        <p class="text-sm muted" style="margin-top:8px">Em pacientes que tinham hábito alimentar ruim, a maior parte se controla apenas com dieta — pâncreas ainda funcional.</p>
      </div>

      <div class="card" data-component="ThirtyPercentRuleSimulator" data-implemented="1">
        <span class="kicker">Interação</span>
        <h3>Simulador da regra dos 30%</h3>
        <p class="text-sm muted">Clique nas células do perfil para marcar como "fora do alvo". Quando &gt;30% das medidas estiverem alteradas, entra medicação.</p>
        <div class="tpr-grid">
          <div class="tpr-row"><strong>Seg</strong><button class="tpr-cell" title="Jejum">J</button><button class="tpr-cell" title="1h café">1h</button><button class="tpr-cell" title="1h almoço">1h</button><button class="tpr-cell" title="1h jantar">1h</button></div>
          <div class="tpr-row"><strong>Ter</strong><button class="tpr-cell" title="Jejum">J</button><button class="tpr-cell" title="1h café">1h</button><button class="tpr-cell" title="1h almoço">1h</button><button class="tpr-cell" title="1h jantar">1h</button></div>
          <div class="tpr-row"><strong>Qua</strong><button class="tpr-cell" title="Jejum">J</button><button class="tpr-cell" title="1h café">1h</button><button class="tpr-cell" title="1h almoço">1h</button><button class="tpr-cell" title="1h jantar">1h</button></div>
          <div class="tpr-row"><strong>Qui</strong><button class="tpr-cell" title="Jejum">J</button><button class="tpr-cell" title="1h café">1h</button><button class="tpr-cell" title="1h almoço">1h</button><button class="tpr-cell" title="1h jantar">1h</button></div>
          <div class="tpr-row"><strong>Sex</strong><button class="tpr-cell" title="Jejum">J</button><button class="tpr-cell" title="1h café">1h</button><button class="tpr-cell" title="1h almoço">1h</button><button class="tpr-cell" title="1h jantar">1h</button></div>
          <div class="tpr-row"><strong>Sáb</strong><button class="tpr-cell" title="Jejum">J</button><button class="tpr-cell" title="1h café">1h</button><button class="tpr-cell" title="1h almoço">1h</button><button class="tpr-cell" title="1h jantar">1h</button></div>
          <div class="tpr-row"><strong>Dom</strong><button class="tpr-cell" title="Jejum">J</button><button class="tpr-cell" title="1h café">1h</button><button class="tpr-cell" title="1h almoço">1h</button><button class="tpr-cell" title="1h jantar">1h</button></div>
        </div>
        <div class="tpr-counter" style="margin-top:8px;font-weight:700">0 de 28 medidas alteradas</div>
        <div class="tpr-output" style="margin-top:8px"></div>
      </div>
    </div>

    <div class="grid cols-2" style="margin-top:18px">
      <div class="card">
        <span class="kicker k-emerald">O que a banca quer</span>
        <h3>Quando entra medicação</h3>
        <p>Após 1 a 2 semanas de adesão a dieta fracionada e atividade física, com perfil glicêmico monitorado, avalia-se o controle. A regra prática mais cobrada é a <b>regra dos 30%</b>:</p>
        <ul class="list">
          <li>Mais de <b>30% das medidas</b> do perfil estiverem fora do alvo (jejum &lt;95, 1h &lt;140, 2h &lt;120) → entra medicação.</li>
          <li>Igual ou menos de 30% → manter dieta e atividade, reforçar adesão, reavaliar em 1 semana.</li>
        </ul>
        <p>O perfil glicêmico ideal abrange jejum + 1h ou 2h pós-refeições principais. A frequência diária varia por protocolo (6 medidas/dia em pacientes em insulina; 3–4 medidas em DMG só com dieta).</p>
        <p>Macrossomia ou polidrâmnio em USG seriada também são indicações para intensificar o tratamento, mesmo se o perfil parece "controlado" — o feto está dizendo o contrário.</p>
      </div>

      <div class="card">
        <span class="kicker k-amber">Pegadinhas</span>
        <h3>Detalhes que viram gabarito</h3>
        <ul class="list">
          <li><b>"Iniciar insulina já na 1ª consulta de DMG."</b> Não. Tentar dieta primeiro (pâncreas ainda funciona).</li>
          <li><b>"Diabetes prévio — tentar dieta."</b> Não. Diabetes prévio já tem disfunção de β-célula — encaminhar alto risco e iniciar/ajustar insulina.</li>
          <li><b>"Glicemias todas no alvo, mas USG mostra macrossomia."</b> Intensificar — o feto denuncia que algo está sendo subestimado.</li>
          <li><b>"Apenas 25% das medidas alteradas."</b> Não atinge 30% — manter dieta, reforçar adesão, repetir em 1 semana.</li>
          <li><b>"Diet com baixo carboidrato extremo (&lt;30%)."</b> Não. Pode levar a cetose. Manter ~50% de carboidratos complexos.</li>
        </ul>

        <hr style="border:none;border-top:1px solid var(--border);margin:14px 0">

        <span class="kicker k-info">Mnemônico</span>
        <p class="go-mnemonic">"Mais de 30% fora do alvo: entra medicação."</p>
      </div>
    </div>

    <div class="page-dock">
      <a class="dock-link" href="#diabetes-fisiologia"><small>Anterior</small>← Fisiologia e perfil</a>
      <a class="dock-link next" href="#diabetes-tratamento"><small>Próximo</small>Insulina, metformina e alto risco →</a>
    </div>
  </section>
  `);

  /* ============== 21 · INSULINA · METFORMINA · UBS × ALTO RISCO ============== */
  inject(`
  <section class="section" data-id="diabetes-tratamento">
    <div class="page-header">
      <div class="ph-meta">
        <span class="kicker k-emerald">Diabetes na gestação · página 21</span>
        <h1>Insulina, metformina e alto risco</h1>
        <p class="lead">Quando entrar com remédio e para onde encaminhar — UBS ou alto risco. <b>Insulina</b> é a principal medicação; <b>metformina</b> tem lugar específico; <b>diabetes prévio</b> sempre vai para alto risco.</p>
      </div>
    </div>

    <div class="q-central"><span class="q-icon">?</span><p>Quando entrar com remédio e para onde encaminhar — UBS ou alto risco?</p></div>

    <div class="grid cols-2">
      <div class="card glass">
        <span class="kicker k-emerald">Visual</span>
        <h3>Mapa de tratamento e encaminhamento</h3>
        <div class="go-treatment-map">
          <div class="go-tr-step go-tr-1">
            <strong>1. Dieta + atividade física</strong>
            <p>1–2 semanas, perfil glicêmico monitorado. Maior parte das DMG resolve aqui.</p>
          </div>
          <div class="go-tr-step go-tr-2">
            <strong>2. Falha de dieta? &gt;30% fora do alvo</strong>
            <p>Avaliar adesão. Se realmente houve falha, entra medicação.</p>
          </div>
          <div class="go-tr-step go-tr-3">
            <strong>3a. Insulina · principal escolha</strong>
            <p>Esquemas: NPH 2×/dia ± regular pré-refeições. Ajuste por glicemias capilares.</p>
          </div>
          <div class="go-tr-step go-tr-4">
            <strong>3b. Metformina · lugar específico</strong>
            <p>Falha de adesão à insulina, dificuldade de acesso, recusa. Avaliar protocolo local.</p>
          </div>
          <div class="go-tr-step go-tr-5">
            <strong>4. Encaminhar ao alto risco</strong>
            <p>Toda DMG com medicação. Diabetes prévio sempre, mesmo sem medicação.</p>
          </div>
        </div>
      </div>

      <div class="card" data-component="DiabetesTreatmentNavigator" data-implemented="1">
        <span class="kicker">Interação</span>
        <h3>Classificador · UBS × alto risco</h3>
        <p class="text-sm muted">Escolha o caso; o sistema indica nível de cuidado e medicação.</p>
        <div class="dtn-cases">
          <button class="dtn-case btn ghost" data-case="dmg_dieta">DMG controlado com dieta</button>
          <button class="dtn-case btn ghost" data-case="dmg_med">DMG com insulina/metformina</button>
          <button class="dtn-case btn ghost" data-case="dm_previo">Diabetes prévio (DM1 ou DM2)</button>
        </div>
        <div class="dtn-output" style="margin-top:12px"></div>
      </div>
    </div>

    <div class="grid cols-2" style="margin-top:18px">
      <div class="card">
        <span class="kicker k-emerald">O que a banca quer</span>
        <h3>Insulina × metformina e o critério de encaminhamento</h3>
        <p><b>Insulina</b> é a medicação <b>principal</b> na gestação:</p>
        <ul class="list">
          <li>Não atravessa a placenta — segura para o feto.</li>
          <li>Ajuste fácil a partir de glicemias capilares.</li>
          <li>Esquemas típicos: NPH 2×/dia (manhã + à noite), com ou sem insulina regular pré-refeições, conforme padrão glicêmico.</li>
          <li>Análogos de ação ultrarrápida (lispro, aspart) e basais (detemir) também são opções.</li>
        </ul>
        <p><b>Metformina</b> tem lugar específico, não é primeira escolha universal:</p>
        <ul class="list">
          <li>Atravessa a placenta — sem evidência robusta de dano fetal, mas com seguimento de longo prazo ainda em estudo.</li>
          <li>Indicações: dificuldade de adesão à insulina (técnica, recursos), recusa da paciente após informação adequada, dificuldade de acesso à insulina.</li>
          <li>Pode ser usada em monoterapia ou em associação com insulina.</li>
          <li>Avaliar protocolo local — alguns serviços a usam mais liberalmente, outros reservam-na.</li>
        </ul>
        <p><b>Encaminhamento ao alto risco:</b></p>
        <ul class="list">
          <li><b>Diabetes prévio (DM1 ou DM2):</b> SEMPRE alto risco, independentemente de medicação.</li>
          <li><b>DMG com medicação</b> (insulina ou metformina): alto risco.</li>
          <li><b>DMG sem medicação</b> (controle apenas com dieta): pode permanecer na UBS conforme protocolo local.</li>
        </ul>
      </div>

      <div class="card">
        <span class="kicker k-amber">Pegadinhas e detalhes</span>
        <h3>O que a banca esconde</h3>
        <ul class="list">
          <li><b>"Iniciar metformina como 1ª escolha em DMG."</b> Em geral, insulina é primeira. Metformina entra por critério (acesso, recusa, adesão). Conferir referência da banca.</li>
          <li><b>"Glibenclamida na gestação."</b> Sulfoniluréia atravessa placenta, hoje é menos usada. Cuidado em provas mais antigas.</li>
          <li><b>"DMG bem controlada com dieta — encaminhar ao alto risco."</b> Não obrigatoriamente. Pode seguir na UBS se protocolo local permitir.</li>
          <li><b>"Diabetes prévio com glicemia controlada — UBS."</b> Não. Sempre alto risco — risco de malformação, pré-eclâmpsia, restrição de crescimento, óbito fetal.</li>
          <li><b>"Pacient com DMG em alto risco e glicemia perfeita — voltar à UBS."</b> Não. Uma vez no alto risco, mantém-se até o parto e puerpério.</li>
          <li><b>"Início da insulina:"</b> dose inicial empírica em torno de 0,5 UI/kg/dia, dividida (2/3 manhã, 1/3 noite, com 2/3 NPH e 1/3 regular se necessário). Ajustar conforme glicemias.</li>
        </ul>

        <hr style="border:none;border-top:1px solid var(--border);margin:14px 0">

        <span class="kicker k-info">Mnemônico</span>
        <p class="go-mnemonic">"Insulina é o pilar; metformina tem janela; diabetes prévio é alto risco sempre."</p>
      </div>
    </div>

    <div class="page-dock">
      <a class="dock-link" href="#diabetes-dieta-30"><small>Anterior</small>← Dieta e regra dos 30%</a>
      <a class="dock-link next" href="#diabetes-insulina-trimestre"><small>Próximo</small>Insulina por trimestre →</a>
    </div>
  </section>
  `);

  /* ============== 22 · INSULINA POR TRIMESTRE ============== */
  inject(`
  <section class="section" data-id="diabetes-insulina-trimestre">
    <div class="page-header">
      <div class="ph-meta">
        <span class="kicker k-emerald">Diabetes na gestação · página 22</span>
        <h1>Insulina por trimestre e insuficiência placentária</h1>
        <p class="lead">A dose acompanha o ciclo: ↓ no 1º (náusea), ↑ no 2º/3º (resistência), ↓ no pós-parto. <b>Hipoglicemia inesperada no 3º trimestre</b> com mesma dose e mesma dieta é sinal de <b>insuficiência placentária</b> — sempre cobrado.</p>
        <div class="hero-tags" style="margin-top:10px">
          <span class="relevance-tag r-aprofundamento">aprofundamento</span>
          <span class="relevance-tag r-pegadinha">pegadinha</span>
        </div>
      </div>
    </div>

    <div class="q-central"><span class="q-icon">?</span><p>Por que hipoglicemia no 3º trimestre, com a mesma dose e a mesma dieta, é sinal de alarme?</p></div>

    <div class="grid cols-2">
      <div class="card glass go-svg-card">
        <span class="kicker k-emerald">Visual</span>
        <h3>Escadinha · dose por trimestre</h3>
        <svg viewBox="0 0 540 280" role="img" class="go-svg">
          <title>Escadinha de dose de insulina por trimestre</title>
          <desc>Degraus mostrando como a dose de insulina varia por trimestre, com queda no 1º, elevação no 2º e 3º trimestres e nova queda no pós-parto.</desc>
          <line x1="40" y1="220" x2="500" y2="220" stroke="#7282a0" stroke-width="2"/>
          <!-- 1º T baixo -->
          <rect x="60" y="180" width="100" height="40" rx="6" fill="#1d57bb" fill-opacity=".25" stroke="#1d57bb" stroke-width="1.6"/>
          <text x="110" y="205" text-anchor="middle" font-size="12" font-weight="800" fill="#14418f">1º T</text>
          <text x="110" y="245" text-anchor="middle" font-size="10" fill="#44546f">↓ dose · náusea</text>
          <!-- 2º T médio -->
          <rect x="180" y="130" width="100" height="90" rx="6" fill="#b47d18" fill-opacity=".22" stroke="#b47d18" stroke-width="1.6"/>
          <text x="230" y="180" text-anchor="middle" font-size="12" font-weight="800" fill="#7a5210">2º T</text>
          <text x="230" y="245" text-anchor="middle" font-size="10" fill="#44546f">↑ dose · resistência</text>
          <!-- 3º T alto -->
          <rect x="300" y="80" width="100" height="140" rx="6" fill="#d6406b" fill-opacity=".22" stroke="#d6406b" stroke-width="1.6"/>
          <text x="350" y="155" text-anchor="middle" font-size="12" font-weight="800" fill="#7a1f3d">3º T</text>
          <text x="350" y="245" text-anchor="middle" font-size="10" fill="#44546f">↑↑ dose</text>
          <!-- pós-parto -->
          <rect x="420" y="180" width="60" height="40" rx="6" fill="#0a8a6b" fill-opacity=".25" stroke="#0a8a6b" stroke-width="1.6"/>
          <text x="450" y="205" text-anchor="middle" font-size="12" font-weight="800" fill="#066c4a">PP</text>
          <text x="450" y="245" text-anchor="middle" font-size="10" fill="#44546f">↓ imediata</text>
          <!-- alerta -->
          <rect x="60" y="20" width="420" height="48" rx="10" fill="#d6406b" fill-opacity=".10" stroke="#d6406b" stroke-width="1.4" stroke-dasharray="4 3"/>
          <text x="270" y="42" text-anchor="middle" font-size="12" font-weight="800" fill="#7a1f3d">⚠ Hipoglicemia no 3º T com mesma dose/dieta</text>
          <text x="270" y="58" text-anchor="middle" font-size="10" fill="#7a1f3d">→ insuficiência placentária. Avaliar vitalidade fetal!</text>
        </svg>
      </div>

      <div class="card" data-component="InsulinPregnancyTimeline" data-implemented="1">
        <span class="kicker">Interação</span>
        <h3>Simulador de ajuste fisiológico</h3>
        <p class="text-sm muted">Clique em cada trimestre para ver o ajuste esperado e o porquê.</p>
        <div class="ipt-steps">
          <button class="ipt-step btn ghost" data-step="t1">1º trimestre · ↓ dose</button>
          <button class="ipt-step btn ghost" data-step="t2">2º trimestre · ↑ dose</button>
          <button class="ipt-step btn ghost" data-step="t3">3º trimestre · ↑↑ dose (atenção)</button>
          <button class="ipt-step btn ghost" data-step="pp">Pós-parto · ↓ dose</button>
        </div>
        <div class="ipt-output" style="margin-top:12px"></div>
      </div>
    </div>

    <div class="grid cols-2" style="margin-top:18px">
      <div class="card">
        <span class="kicker k-emerald">O que a banca quer</span>
        <h3>Por que a dose varia — e por que o 3º trimestre alarma</h3>
        <p>A resistência insulínica é dinâmica e segue a placenta:</p>
        <ul class="list">
          <li><b>1º trimestre:</b> placenta ainda pequena, pouca produção de hormônios contra-insulínicos. Náuseas, vômitos e baixa ingesta tornam a paciente <b>mais sensível à insulina</b> e mais suscetível a hipoglicemia. Reduzir a dose pré-gestacional (em DM prévio) ou ainda não iniciar (em DMG novo).</li>
          <li><b>2º e 3º trimestres:</b> placenta cresce, hormônios contra-insulínicos sobem, resistência aumenta. Dose de insulina sobe progressivamente. Pico em torno de 32–36 semanas.</li>
          <li><b>3º trimestre tardio (após 36–37 semanas):</b> placenta começa a senescer fisiologicamente. Em alguns casos, a queda de hormônios contra-insulínicos é normal. Mas <b>queda inesperada com mesma dose e mesma dieta</b>, especialmente associada a redução de movimentos fetais ou achados ultrassonográficos suspeitos, indica <b>insuficiência placentária patológica</b> — a placenta está sofrendo, produzindo menos hormônios. Avaliar vitalidade fetal (cardiotocografia, perfil biofísico, Doppler) imediatamente.</li>
          <li><b>Pós-parto imediato:</b> ao retirar a placenta, os hormônios contra-insulínicos somem. Dose <b>cai drasticamente</b>. Em DMG, geralmente suspender. Em DM prévio, voltar à dose pré-gestacional ou metade da dose final.</li>
        </ul>
      </div>

      <div class="card">
        <span class="kicker k-amber">Pegadinhas e detalhes</span>
        <h3>O que a banca esconde</h3>
        <ul class="list">
          <li><b>"Hipoglicemia inesperada no 3º trimestre."</b> Sinal de insuficiência placentária — não é "boa adesão". Avaliar vitalidade fetal antes de reduzir dose.</li>
          <li><b>"Manter dose final pós-parto."</b> Erro grave — risco de hipoglicemia severa.</li>
          <li><b>"Lactação aumenta sensibilidade à insulina."</b> Verdade — atenção a hipoglicemia em DM1 que continua em insulina.</li>
          <li><b>"Insulina humana × análogos."</b> Ambas seguras na gestação. Insulina humana (NPH/regular) é mais barata e amplamente disponível; análogos (lispro, aspart, detemir) podem ser usados conforme protocolo.</li>
          <li><b>"Bomba de insulina na gestação."</b> Possível em DM1 selecionadas com bom controle prévio; não é padrão em DMG.</li>
        </ul>

        <hr style="border:none;border-top:1px solid var(--border);margin:14px 0">

        <span class="kicker k-info">Mnemônico</span>
        <p class="go-mnemonic">"Hipoglicemia no 3º T denuncia placenta."</p>
      </div>
    </div>

    <div class="page-dock">
      <a class="dock-link" href="#diabetes-tratamento"><small>Anterior</small>← Insulina, metformina, alto risco</a>
      <a class="dock-link next" href="#diabetes-parto"><small>Próximo</small>Momento do parto no diabetes →</a>
    </div>
  </section>
  `);

  /* ============== 23 · MOMENTO DO PARTO NO DIABETES ============== */
  inject(`
  <section class="section" data-id="diabetes-parto">
    <div class="page-header">
      <div class="ph-meta">
        <span class="kicker k-emerald">Diabetes na gestação · página 23</span>
        <h1>Momento do parto no diabetes</h1>
        <p class="lead">Induzir não é o mesmo que fazer cesárea. A régua 37–40 semanas combina tipo de diabetes, qualidade do controle e complicações ultrassonográficas para definir o momento — e a via continua sendo decidida por critério obstétrico.</p>
      </div>
    </div>

    <div class="q-central"><span class="q-icon">?</span><p>Em que semana cada gestante diabética deve nascer — e por que indução não é cesárea?</p></div>

    <div class="grid cols-2">
      <div class="card glass go-svg-card">
        <span class="kicker k-emerald">Visual</span>
        <h3>Régua gestacional · 37–40 semanas</h3>
        <svg viewBox="0 0 540 220" role="img" class="go-svg">
          <title>Régua de momento do parto no diabetes</title>
          <desc>Linha de 36 a 41 semanas com três faixas: DMG sem medicação até 40 sem; DMG com medicação ou diabetes prévio bom controle até 39 sem; mau controle ou complicação 37 a 38 sem.</desc>
          <line x1="40" y1="120" x2="500" y2="120" stroke="#7282a0" stroke-width="2"/>
          <g font-size="11" fill="#44546f" font-weight="700">
            <text x="60" y="146">36</text>
            <text x="170" y="146">37</text>
            <text x="280" y="146">38</text>
            <text x="390" y="146">39</text>
            <text x="490" y="146">40</text>
          </g>
          <!-- DMG sem med (até 40) -->
          <rect x="60" y="60" width="430" height="22" rx="6" fill="#0a8a6b" fill-opacity=".25" stroke="#0a8a6b" stroke-width="1.4"/>
          <text x="275" y="76" text-anchor="middle" font-size="11" font-weight="800" fill="#066c4a">DMG sem medicação · até 40 sem</text>
          <!-- DMG com med (até 39) -->
          <rect x="60" y="86" width="335" height="22" rx="6" fill="#b47d18" fill-opacity=".22" stroke="#b47d18" stroke-width="1.4"/>
          <text x="227" y="102" text-anchor="middle" font-size="11" font-weight="800" fill="#7a5210">DMG c/ med · DM prévio bom controle · até 39 sem</text>
          <!-- mau controle (37-38) -->
          <rect x="170" y="160" width="225" height="22" rx="6" fill="#d6406b" fill-opacity=".22" stroke="#d6406b" stroke-width="1.4"/>
          <text x="282" y="176" text-anchor="middle" font-size="11" font-weight="800" fill="#7a1f3d">Mau controle · macrossomia · polidrâmnio · 37–38 sem</text>
          <!-- alerta -->
          <rect x="60" y="20" width="430" height="32" rx="8" fill="#fff" fill-opacity=".0" stroke="#cdd5e0" stroke-dasharray="3 3"/>
          <text x="275" y="40" text-anchor="middle" font-size="10" fill="#44546f">Evitar parto antes de 37 sem (salvo exceção). Via vaginal possível — cesárea por critério obstétrico.</text>
        </svg>
      </div>

      <div class="card" data-component="DiabetesDeliveryTimingStepper" data-implemented="1">
        <span class="kicker">Interação</span>
        <h3>Stepper · tipo × controle × complicações</h3>
        <p class="text-sm muted">Escolha tipo, qualidade do controle e presença de complicações; o sistema sugere semana e via.</p>

        <div class="dds-axis">
          <strong>Tipo de diabetes</strong>
          <div class="dds-buttons">
            <button data-axis="type" data-val="dmg_dieta">DMG sem medicação</button>
            <button data-axis="type" data-val="dmg_med">DMG com medicação</button>
            <button data-axis="type" data-val="dm_previo">Diabetes prévio</button>
          </div>
        </div>

        <div class="dds-axis">
          <strong>Controle glicêmico</strong>
          <div class="dds-buttons">
            <button data-axis="control" data-val="good">Bom controle</button>
            <button data-axis="control" data-val="bad">Mau controle</button>
          </div>
        </div>

        <div class="dds-axis">
          <strong>Complicações ultrassonográficas (macrossomia, polidrâmnio)</strong>
          <div class="dds-buttons">
            <button data-axis="complications" data-val="no">Ausentes</button>
            <button data-axis="complications" data-val="yes">Presentes</button>
          </div>
        </div>

        <div class="dds-output" style="margin-top:12px"></div>
      </div>
    </div>

    <div class="grid cols-2" style="margin-top:18px">
      <div class="card">
        <span class="kicker k-emerald">O que a banca quer</span>
        <h3>Decisão por tipo, controle e USG</h3>
        <ul class="list">
          <li><b>DMG sem medicação · bom controle:</b> aguardar parto espontâneo até <b>40 semanas</b>. Indução se ultrapassar termo.</li>
          <li><b>DMG com medicação (insulina ou metformina) · bom controle:</b> programar parto até <b>39 semanas</b>.</li>
          <li><b>Diabetes prévio · bom controle:</b> também até 39 semanas.</li>
          <li><b>Mau controle</b> (glicemias persistentemente fora do alvo) <b>ou complicações</b> (macrossomia, polidrâmnio, restrição de crescimento, sofrimento fetal): <b>antecipar para 37–38 semanas</b> após avaliação de maturidade.</li>
          <li><b>Evitar parto antes de 37 semanas</b>, salvo indicações específicas (sofrimento fetal grave, complicação materna).</li>
        </ul>
        <p><b>Via de parto:</b> a presença de DMG ou diabetes prévio NÃO indica cesárea automaticamente. Via vaginal é possível e frequentemente preferida. Cesárea por critério obstétrico:</p>
        <ul class="list">
          <li>Macrossomia estimada &gt;4.500 g (alguns serviços: &gt;4.000 g em diabéticas).</li>
          <li>Distócia em parto anterior.</li>
          <li>Apresentação anômala.</li>
          <li>Sofrimento fetal.</li>
          <li>Falha de indução.</li>
        </ul>
      </div>

      <div class="card">
        <span class="kicker k-amber">Pegadinhas</span>
        <h3>O que a banca esconde</h3>
        <ul class="list">
          <li><b>"DMG bem controlada com dieta — programar cesárea em 38 sem."</b> ERRADO. Aguardar até 40 sem; cesárea por critério obstétrico.</li>
          <li><b>"DMG com insulina e bom controle — induzir em 36 sem."</b> Cedo demais. Programar 39 sem.</li>
          <li><b>"Macrossomia estimada &gt;4.500 g."</b> Aceita-se cesárea por risco de distócia de ombros.</li>
          <li><b>"Indução do parto"</b> NÃO é o mesmo que cesárea. Indução com misoprostol, ocitocina ou sonda visa parto vaginal.</li>
          <li><b>"Cesárea com 36 sem em DM bem controlado"</b> sem indicação — induz prematuridade iatrogênica e SDR neonatal.</li>
          <li><b>"USG estimou 4.200 g em DMG com bom controle."</b> Pode-se discutir indução em 39 sem para evitar crescimento adicional, mas não é cesárea automática.</li>
        </ul>

        <hr style="border:none;border-top:1px solid var(--border);margin:14px 0">

        <span class="kicker k-info">Mnemônicos</span>
        <p class="go-mnemonic">"Induzir parto não é fazer cesárea."</p>
        <p class="go-mnemonic">"Macrossomia e polidrâmnio denunciam mau controle."</p>
      </div>
    </div>

    <div class="page-dock">
      <a class="dock-link" href="#diabetes-insulina-trimestre"><small>Anterior</small>← Insulina por trimestre</a>
      <a class="dock-link next" href="#diabetes-complicacoes"><small>Próximo</small>Complicações do filho da diabética →</a>
    </div>
  </section>
  `);

  /* ============== 24 · COMPLICAÇÕES DO FILHO DA DIABÉTICA ============== */
  inject(`
  <section class="section" data-id="diabetes-complicacoes">
    <div class="page-header">
      <div class="ph-meta">
        <span class="kicker k-emerald">Diabetes na gestação · página 24</span>
        <h1>Complicações do filho da diabética</h1>
        <p class="lead">O ultrassom denuncia mau controle. Esta página entrega a cadeia "mãe hiperglicêmica → feto hiperinsulinêmico → complicações neonatais", e separa as malformações associadas a diabetes prévio mal controlado <b>periconcepcional</b>.</p>
        <div class="hero-tags" style="margin-top:10px"><span class="relevance-tag r-aprofundamento">aprofundamento</span></div>
      </div>
    </div>

    <div class="q-central"><span class="q-icon">?</span><p>O ultrassom está denunciando mau controle — e quais malformações apontam diabetes prévio?</p></div>

    <div class="grid cols-2">
      <div class="card glass go-svg-card">
        <span class="kicker k-emerald">Visual</span>
        <h3>Cadeia mãe → feto → recém-nascido</h3>
        <svg viewBox="0 0 540 280" role="img" class="go-svg">
          <title>Cadeia mãe diabética e seu filho</title>
          <desc>Setas conectando hiperglicemia materna a hiperinsulinismo fetal e complicações neonatais.</desc>
          <defs><marker id="dfcArr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#7282a0"/></marker></defs>
          <!-- mãe -->
          <g transform="translate(20,90)">
            <rect width="120" height="60" rx="10" fill="#d6406b" fill-opacity=".22" stroke="#d6406b" stroke-width="1.6"/>
            <text x="60" y="26" text-anchor="middle" font-size="12" font-weight="800" fill="#7a1f3d">Mãe</text>
            <text x="60" y="44" text-anchor="middle" font-size="10" fill="#7a1f3d">hiperglicemia</text>
          </g>
          <path d="M140 120 L180 120" stroke="#7282a0" stroke-width="2" marker-end="url(#dfcArr)"/>
          <text x="160" y="112" text-anchor="middle" font-size="9.5" fill="#44546f">glicose</text>
          <text x="160" y="138" text-anchor="middle" font-size="9.5" fill="#44546f">livre</text>
          <!-- feto -->
          <g transform="translate(190,80)">
            <rect width="140" height="80" rx="10" fill="#b47d18" fill-opacity=".22" stroke="#b47d18" stroke-width="1.6"/>
            <text x="70" y="22" text-anchor="middle" font-size="12" font-weight="800" fill="#7a5210">Feto</text>
            <text x="70" y="40" text-anchor="middle" font-size="10" fill="#7a5210">hiperinsulinismo</text>
            <text x="70" y="56" text-anchor="middle" font-size="9.5" fill="#7a5210">macrossomia · poliglobulia</text>
            <text x="70" y="70" text-anchor="middle" font-size="9.5" fill="#7a5210">poliúria → polidrâmnio</text>
          </g>
          <path d="M330 120 L370 120" stroke="#7282a0" stroke-width="2" marker-end="url(#dfcArr)"/>
          <text x="350" y="112" text-anchor="middle" font-size="9.5" fill="#44546f">parto</text>
          <text x="350" y="138" text-anchor="middle" font-size="9.5" fill="#44546f">corte</text>
          <!-- RN -->
          <g transform="translate(380,80)">
            <rect width="140" height="80" rx="10" fill="#1d57bb" fill-opacity=".22" stroke="#1d57bb" stroke-width="1.6"/>
            <text x="70" y="22" text-anchor="middle" font-size="12" font-weight="800" fill="#14418f">RN</text>
            <text x="70" y="40" text-anchor="middle" font-size="9.5" fill="#14418f">hipoglicemia</text>
            <text x="70" y="54" text-anchor="middle" font-size="9.5" fill="#14418f">policitemia</text>
            <text x="70" y="68" text-anchor="middle" font-size="9.5" fill="#14418f">distócia · plexo braquial</text>
          </g>
          <!-- malformações (rodapé) -->
          <rect x="20" y="200" width="500" height="60" rx="10" fill="#5b3bd1" fill-opacity=".10" stroke="#5b3bd1" stroke-width="1.4" stroke-dasharray="4 3"/>
          <text x="270" y="222" text-anchor="middle" font-size="11" font-weight="800" fill="#3a2a8a">Diabetes PRÉVIO mal controlado periconcepcional</text>
          <text x="270" y="240" text-anchor="middle" font-size="10" fill="#3a2a8a">Síndrome de regressão caudal · cardiopatias congênitas · defeitos do tubo neural</text>
          <text x="270" y="254" text-anchor="middle" font-size="9.5" fill="#3a2a8a">Prevenção: HbA1c baixa antes de engravidar (consulta pré-concepcional)</text>
        </svg>
      </div>

      <div class="card" data-component="DiabeticFetusComplicationMap" data-implemented="1">
        <span class="kicker">Interação</span>
        <h3>Liga mecanismo × complicação</h3>
        <p class="text-sm muted">Clique em cada complicação para ver o mecanismo correspondente.</p>
        <div class="dfc-grid">
          <button class="dfc-comp btn ghost" data-comp="macrossomia">Macrossomia</button>
          <button class="dfc-comp btn ghost" data-comp="polidramnio">Polidrâmnio</button>
          <button class="dfc-comp btn ghost" data-comp="distocia">Distócia de ombros</button>
          <button class="dfc-comp btn ghost" data-comp="hipoglicemia">Hipoglicemia neonatal</button>
          <button class="dfc-comp btn ghost" data-comp="policitemia">Policitemia neonatal</button>
          <button class="dfc-comp btn ghost" data-comp="regressao">Regressão caudal / malformações</button>
        </div>
        <div class="dfc-output" style="margin-top:12px"></div>
      </div>
    </div>

    <div class="grid cols-2" style="margin-top:18px">
      <div class="card">
        <span class="kicker k-emerald">O que a banca quer</span>
        <h3>Mecanismos e prevenção</h3>
        <p>O cerne da fisiopatologia é simples: <b>glicose materna atravessa a placenta livremente; insulina materna NÃO atravessa</b>. Se a glicose materna está alta, o pâncreas fetal responde produzindo insulina em excesso. Insulina é o hormônio anabólico fetal por excelência — daí a macrossomia, o ganho de gordura central e o polidrâmnio.</p>
        <p><b>Complicações no feto/RN (DMG ou diabetes prévio mal controlado):</b></p>
        <ul class="list">
          <li><b>Macrossomia</b> (≥4.000 g): hiperinsulinismo fetal → ganho de peso desproporcional, especialmente em tronco e ombros.</li>
          <li><b>Polidrâmnio:</b> hiperglicemia fetal → diurese osmótica → aumento de líquido amniótico.</li>
          <li><b>Distócia de ombros:</b> ombros largos travam na sínfise púbica.</li>
          <li><b>Hipoglicemia neonatal:</b> ao cortar o cordão, o aporte de glicose acaba subitamente, mas o pâncreas fetal continua produzindo insulina por inércia → hipoglicemia nas primeiras horas de vida.</li>
          <li><b>Policitemia neonatal:</b> hipóxia crônica intrauterina (maior consumo de O2 pelo feto hiperinsulinêmico) estimula eritropoetina.</li>
          <li><b>Hiperbilirrubinemia neonatal:</b> consequência da policitemia.</li>
          <li><b>Imaturidade pulmonar (SDR neonatal)</b> mesmo a termo — insulina antagoniza ação do cortisol fetal sobre os pneumócitos.</li>
        </ul>
        <p><b>Malformações</b> são raras e exclusivas do <b>diabetes PRÉVIO mal controlado periconcepcional</b> (não da DMG, que aparece após a 20ª semana e a organogênese já terminou):</p>
        <ul class="list">
          <li><b>Síndrome de regressão caudal</b> (anomalia raríssima, mas patognomônica do diabetes prévio).</li>
          <li><b>Cardiopatias congênitas.</b></li>
          <li><b>Defeitos do tubo neural.</b></li>
          <li><b>Anomalias renais.</b></li>
        </ul>
        <p><b>Prevenção:</b> consulta pré-concepcional com hemoglobina glicada o mais baixa possível antes de engravidar. Avaliar fundo de olho (retinopatia pode piorar na gestação) e função renal.</p>
      </div>

      <div class="card">
        <span class="kicker k-amber">Pegadinhas</span>
        <h3>O que a banca esconde</h3>
        <ul class="list">
          <li><b>"DMG mal controlado e malformação fetal."</b> Pegadinha. DMG não causa malformação porque aparece DEPOIS da organogênese. Malformação aponta diabetes <b>prévio</b> mal controlado periconcepcional.</li>
          <li><b>"Macrossomia + polidrâmnio em DMG bem controlada."</b> Reavalie o controle — o feto está dizendo que algo passa.</li>
          <li><b>"Hipoglicemia neonatal em RN de mãe não diabética."</b> Pode acontecer por outras causas (sepse neonatal, prematuridade), mas em mãe diabética é hiperinsulinismo persistente.</li>
          <li><b>"Cardiopatia congênita em filho de DMG."</b> Reavalie — provavelmente é diabetes prévio não diagnosticado.</li>
          <li><b>"Mortinatalidade tardia em diabetes mal controlado."</b> Risco real, especialmente após 36 semanas — vigilância intensiva da vitalidade fetal.</li>
        </ul>

        <hr style="border:none;border-top:1px solid var(--border);margin:14px 0">

        <span class="kicker k-info">Mnemônico</span>
        <p class="go-mnemonic">"DMG faz crescer; diabetes prévio mal controlado faz malformar."</p>
      </div>
    </div>

    <div class="page-dock">
      <a class="dock-link" href="#diabetes-parto"><small>Anterior</small>← Momento do parto</a>
      <a class="dock-link next" href="#distocia-ombros"><small>Próximo</small>Distócia de ombros · McRoberts → Gaskin →</a>
    </div>
  </section>
  `);

  /* ============== 25 · DISTÓCIA DE OMBROS ============== */
  inject(`
  <section class="section" data-id="distocia-ombros">
    <div class="page-header">
      <div class="ph-meta">
        <span class="kicker k-emerald">Diabetes na gestação · página 25</span>
        <h1>Distócia de ombros · McRoberts, Jacquemier, Gaskin</h1>
        <p class="lead">Primeira <b>conduta</b> não é a mesma coisa que primeira <b>manobra</b>. A pegadinha mais clássica das emergências obstétricas. O simulador abaixo treina a sequência exata sob pressão.</p>
        <div class="hero-tags" style="margin-top:10px"><span class="relevance-tag r-pegadinha">pegadinha</span></div>
      </div>
    </div>

    <div class="q-central"><span class="q-icon">?</span><p>Primeira CONDUTA é a mesma coisa que primeira MANOBRA — e qual é a sequência segura quando a cabeça já saiu?</p></div>

    <div class="grid cols-2">
      <div class="card glass go-svg-card">
        <span class="kicker k-emerald">Visual</span>
        <h3>Pelve simplificada · ombro preso na sínfise</h3>
        <svg viewBox="0 0 540 280" role="img" class="go-svg">
          <title>Distócia de ombros · vista esquemática</title>
          <desc>Pelve em corte com cabeça fetal já fora e ombro anterior preso na sínfise púbica.</desc>
          <!-- pelve -->
          <ellipse cx="270" cy="140" rx="180" ry="120" fill="none" stroke="#7282a0" stroke-width="2"/>
          <ellipse cx="270" cy="140" rx="120" ry="80" fill="none" stroke="#7282a0" stroke-width="1.4" stroke-dasharray="4 3"/>
          <!-- sínfise púbica -->
          <rect x="240" y="40" width="60" height="14" rx="4" fill="#7a1f3d"/>
          <text x="270" y="34" text-anchor="middle" font-size="10" font-weight="800" fill="#7a1f3d">sínfise púbica</text>
          <!-- cabeça fora -->
          <circle cx="270" cy="220" r="34" fill="#1d57bb" fill-opacity=".25" stroke="#1d57bb" stroke-width="1.6"/>
          <text x="270" y="226" text-anchor="middle" font-size="11" font-weight="800" fill="#14418f">cabeça fora</text>
          <!-- ombro preso -->
          <rect x="220" y="60" width="100" height="36" rx="8" fill="#d6406b" fill-opacity=".30" stroke="#d6406b" stroke-width="1.8"/>
          <text x="270" y="84" text-anchor="middle" font-size="11" font-weight="800" fill="#7a1f3d">⚠ ombro anterior PRESO</text>
          <!-- legenda -->
          <text x="32" y="262" font-size="11" font-weight="700" fill="#7a1f3d">Não aumentar a força!</text>
          <text x="180" y="262" font-size="11" font-weight="700" fill="#066c4a">Parto é jeito, não força.</text>
        </svg>
        <div class="go-dystocia-card">
          <strong>Lema absoluto:</strong> primeira CONDUTA é <b>chamar ajuda</b> · primeira MANOBRA é <b>McRoberts</b>.
        </div>
      </div>

      <div class="card" data-component="ShoulderDystociaSimulator" data-implemented="1">
        <span class="kicker">Interação</span>
        <h3>Sequência de manobras com feedback</h3>
        <p class="text-sm muted">Clique nas etapas na ordem correta. Erros mostram a etapa que deveria ter vindo no momento.</p>
        <div class="sds-steps">
          <button class="sds-step" data-step="rotacional" data-label="Rotacional / saca-rolha">Rotacional / saca-rolha</button>
          <button class="sds-step" data-step="ajuda" data-label="Chamar ajuda (1ª conduta)">Chamar ajuda</button>
          <button class="sds-step" data-step="gaskin" data-label="Gaskin (4 apoios)">Gaskin (4 apoios)</button>
          <button class="sds-step" data-step="suprapubica" data-label="Pressão suprapúbica">Pressão suprapúbica</button>
          <button class="sds-step" data-step="mcroberts" data-label="McRoberts (1ª manobra)">McRoberts</button>
          <button class="sds-step" data-step="jacquemier" data-label="Jacquemier (braço posterior)">Jacquemier</button>
        </div>
        <div class="sds-chosen" style="margin-top:10px"></div>
        <div class="sds-output" style="margin-top:10px"></div>
        <button class="btn ghost sds-reset" type="button" style="margin-top:8px">Reiniciar</button>
      </div>
    </div>

    <div class="grid cols-2" style="margin-top:18px">
      <div class="card">
        <span class="kicker k-emerald">O que a banca quer</span>
        <h3>O que aconteceu — e o que NÃO fazer</h3>
        <p>A distócia de ombros ocorre quando, após o desprendimento da cabeça, os ombros não passam — o ombro anterior fica preso atrás da sínfise púbica. Característica clínica clássica: o "<b>sinal da tartaruga</b>" — a cabeça nasce e retrai contra o períneo.</p>
        <p><b>O que NÃO fazer:</b></p>
        <ul class="list">
          <li><b>Não aumentar a força de tração</b> sobre a cabeça. A força não move o ombro travado e gera <b>lesão de plexo braquial</b> (paralisia de Erb), <b>fratura de clavícula</b> e até de úmero.</li>
          <li><b>Não fazer pressão fúndica.</b> Aumenta o impacto do ombro contra a sínfise.</li>
          <li><b>Não tentar episiotomia de rotina como medida resolutiva.</b> A distócia é óssea (ombro × sínfise), não de partes moles. Episiotomia pode facilitar manobras internas, mas isoladamente não resolve.</li>
        </ul>
        <p><b>Sequência correta:</b></p>
        <ol class="list" style="padding-left:20px">
          <li><b>1ª CONDUTA · chamar ajuda.</b> Anestesista, neonatologista, obstetra mais experiente. Suporte para reanimação neonatal.</li>
          <li><b>1ª MANOBRA · McRoberts.</b> Hiperflexão e abdução das coxas da mãe sobre o abdome (joelhos no peito). Endireita o ângulo lombossacro e libera o ombro em ~50% dos casos.</li>
          <li><b>Pressão suprapúbica</b> (não fúndica): assistente comprime acima da sínfise para deslocar o ombro do plano transverso para o oblíquo.</li>
          <li><b>Manobra de Jacquemier:</b> retirar o braço posterior do feto (mão obstetra entra pela vagina, segue o úmero, flete cotovelo, varre o braço pelo peito).</li>
          <li><b>Manobras rotacionais</b> (saca-rolha de Woods, Rubin): rodar o ombro do diâmetro biacromial para o axiloacromial.</li>
          <li><b>Manobra de Gaskin (4 apoios):</b> mãe em posição quadrupedal — muda a relação dos diâmetros pélvicos.</li>
          <li><b>Medidas heroicas</b> (último recurso): Zavanelli (recolocar a cabeça e fazer cesárea), sinfisiotomia, fratura de clavícula intencional.</li>
        </ol>
      </div>

      <div class="card">
        <span class="kicker k-amber">Pegadinhas</span>
        <h3>O que a banca testa</h3>
        <ul class="list">
          <li><b>"Primeira conduta na distócia."</b> = <b>chamar ajuda</b>. Pegadinha clássica responder McRoberts.</li>
          <li><b>"Primeira manobra na distócia."</b> = <b>McRoberts</b>. Não é Jacquemier nem Gaskin.</li>
          <li><b>"Pressão fúndica resolve distócia."</b> ERRADO — agrava. Use suprapúbica.</li>
          <li><b>"Lesão de plexo braquial em RN com distócia."</b> Conhecida como <b>paralisia de Erb-Duchenne</b> (raízes C5-C6). Pode ser permanente.</li>
          <li><b>"Episiotomia obrigatória."</b> Não é obrigatória; pode facilitar manobras internas, mas a essência é óssea.</li>
          <li><b>"Profilaxia de distócia em DMG."</b> Cesárea por macrossomia estimada &gt;4.500 g (alguns: &gt;4.000 g em diabéticas). Antes disso, parto vaginal com equipe preparada.</li>
        </ul>

        <hr style="border:none;border-top:1px solid var(--border);margin:14px 0">

        <span class="kicker k-info">Mnemônicos</span>
        <p class="go-mnemonic">"Distócia: primeira CONDUTA é chamar ajuda; primeira MANOBRA é McRoberts."</p>
        <p class="go-mnemonic">"Parto é jeito, não força."</p>
      </div>
    </div>

    <div class="card" style="margin-top:18px" data-component="quiz" data-correct="b">
      <span class="kicker">Mini-quiz</span>
      <h3>Distócia de ombros após desprendimento da cabeça</h3>
      <p>Multípara em parto vaginal, RN estimado em 4.200 g, mãe com DMG. Após desprendimento da cabeça, os ombros não passam (sinal da tartaruga). Qual a primeira <b>manobra</b> a realizar?</p>
      <div class="quiz-options">
        <button data-k="a" data-why="Pressão fúndica é proibida — agrava a distócia. Use suprapúbica.">A) Pressão fúndica vigorosa</button>
        <button data-k="b" data-why="Correto. Após chamar ajuda (1ª conduta), McRoberts é a primeira MANOBRA: hiperflexão e abdução das coxas. Resolve ~50% dos casos.">B) McRoberts (hiperflexão e abdução das coxas)</button>
        <button data-k="c" data-why="Jacquemier (braço posterior) entra após McRoberts e suprapúbica falharem.">C) Manobra de Jacquemier</button>
        <button data-k="d" data-why="Gaskin (4 apoios) é manobra de etapa mais avançada da sequência.">D) Posição de Gaskin</button>
      </div>
      <div class="quiz-feedback"></div>
    </div>

    <div class="page-dock">
      <a class="dock-link" href="#diabetes-complicacoes"><small>Anterior</small>← Complicações do filho</a>
      <a class="dock-link next" href="#diabetes-puerperio"><small>Próximo</small>Puerpério no diabetes →</a>
    </div>
  </section>
  `);

  /* ============== 26 · PUERPÉRIO NO DIABETES ============== */
  inject(`
  <section class="section" data-id="diabetes-puerperio">
    <div class="page-header">
      <div class="ph-meta">
        <span class="kicker k-emerald">Diabetes na gestação · página 26</span>
        <h1>Puerpério no diabetes · DM1, DM2 e DMG</h1>
        <p class="lead">Terminou a gravidez — terminou o diabetes? Depende. Em DMG, sim (geralmente). Em diabetes prévio, ajusta a dose. As três trilhas pós-parto (DM1, DM2, DMG) abaixo definem condutas distintas — e o TOTG em 6 sem reclassifica a DMG.</p>
      </div>
    </div>

    <div class="q-central"><span class="q-icon">?</span><p>Terminou a gravidez, terminou o diabetes? E quando pedir TOTG no pós-parto?</p></div>

    <div class="grid cols-2">
      <div class="card glass">
        <span class="kicker k-emerald">Visual</span>
        <h3>Três trilhas pós-parto</h3>
        <div class="go-trails">
          <div class="go-trail go-trail-1">
            <strong>DM1</strong>
            <p>Continua sendo insulinodependente. Dose pré-gestacional ou ½ dose final como ponto de partida. Atenção a hipoglicemia (lactação aumenta sensibilidade).</p>
          </div>
          <div class="go-trail go-trail-2">
            <strong>DM2</strong>
            <p>½ dose final ou retornar a antidiabético oral conforme contexto e amamentação. Metformina compatível com lactação. Avaliar com endocrinologista.</p>
          </div>
          <div class="go-trail go-trail-3">
            <strong>DMG</strong>
            <p><b>Suspender insulina</b>. Liberar dieta normal. <b>TOTG 75 g em 6 semanas</b> para reclassificação. Risco aumentado de DM2 ao longo da vida — rastreio cardiovascular periódico.</p>
          </div>
        </div>
      </div>

      <div class="card" data-component="DiabetesPuerperiumClassifier" data-implemented="1">
        <span class="kicker">Interação</span>
        <h3>Classificador puerperal</h3>
        <p class="text-sm muted">Escolha o tipo; o sistema entrega ajuste pós-parto e seguimento.</p>
        <div class="dpc-trails">
          <button class="dpc-trail btn ghost" data-trail="dm1">DM1</button>
          <button class="dpc-trail btn ghost" data-trail="dm2">DM2</button>
          <button class="dpc-trail btn ghost" data-trail="dmg">DMG</button>
        </div>
        <div class="dpc-output" style="margin-top:12px"></div>
      </div>
    </div>

    <div class="grid cols-2" style="margin-top:18px">
      <div class="card">
        <span class="kicker k-emerald">O que a banca quer</span>
        <h3>Ajuste pós-parto e seguimento</h3>
        <p><b>DM1 no puerpério:</b></p>
        <ul class="list">
          <li>Voltar à dose pré-gestacional <b>ou</b> metade da dose final da gestação como ponto de partida.</li>
          <li>Ajustar conforme glicemias capilares — atenção a hipoglicemia, especialmente durante a lactação (aumenta sensibilidade à insulina).</li>
          <li><b>Não suspender insulina</b> — DM1 é insulinodependente.</li>
          <li>Manter monitorização capilar frequente nas primeiras semanas.</li>
        </ul>
        <p><b>DM2 no puerpério:</b></p>
        <ul class="list">
          <li>Reduzir para metade da dose final da gestação ou retornar a antidiabético oral conforme contexto e amamentação.</li>
          <li><b>Metformina é compatível com lactação</b> — opção comum.</li>
          <li>Glibenclamida em lactação tem mais incertezas — preferir metformina.</li>
          <li>Avaliar conjuntamente com endocrinologista. Reforçar mudanças de estilo de vida.</li>
        </ul>
        <p><b>DMG no puerpério:</b></p>
        <ul class="list">
          <li><b>Suspender insulina</b> imediatamente após o parto.</li>
          <li><b>Liberar dieta normal</b> — não manter dieta hipoglicemiante (pegadinha clássica).</li>
          <li><b>TOTG 75 g em 6 semanas pós-parto</b> para reclassificação. Pode revelar DM2, pré-diabetes ou normalidade.</li>
          <li>Risco aumentado de <b>DM2 ao longo da vida</b> — rastreio periódico (a cada 1–3 anos), além de rastreio cardiovascular.</li>
          <li>Aconselhar sobre planejamento de gestações futuras (alto risco de DMG recorrente).</li>
        </ul>
      </div>

      <div class="card">
        <span class="kicker k-amber">Pegadinhas</span>
        <h3>Detalhes que viram gabarito</h3>
        <ul class="list">
          <li><b>"DMG bem controlada — manter dieta hipoglicemiante após parto."</b> ERRADO. Liberar dieta normal.</li>
          <li><b>"DMG resolveu — não precisa rastreio futuro."</b> ERRADO. TOTG em 6 semanas e rastreio periódico ao longo da vida (risco de DM2).</li>
          <li><b>"DM1 — manter dose final no pós-parto."</b> Risco de hipoglicemia severa. Reduzir.</li>
          <li><b>"DM2 lactante — não pode antidiabético oral."</b> Metformina é compatível.</li>
          <li><b>"Lactação aumenta a glicemia."</b> Inverso — aumenta a sensibilidade à insulina, o que pode causar hipoglicemia em quem mantém doses altas.</li>
          <li><b>"TOTG no momento do parto."</b> Não. TOTG em 6 semanas, com a fisiologia já estabilizada.</li>
        </ul>

        <hr style="border:none;border-top:1px solid var(--border);margin:14px 0">

        <span class="kicker k-info">Mnemônico</span>
        <p class="go-mnemonic">"DMG no puerpério: suspende insulina, libera dieta, marca TOTG em 6 sem."</p>
      </div>
    </div>

    <div class="card" style="margin-top:18px" data-component="quiz" data-correct="b">
      <span class="kicker">Mini-quiz</span>
      <h3>Puérpera de 3 dias com DMG controlado por insulina</h3>
      <p>Gestante teve DMG diagnosticado em 26 sem, controlado com NPH 30 UI/dia até o parto. Parto vaginal sem complicações. Lactando exclusivamente.</p>
      <div class="quiz-options">
        <button data-k="a" data-why="Manter dose pré-parto leva a hipoglicemia severa — a fisiologia mudou drasticamente.">A) Manter NPH 30 UI/dia e reavaliar em 1 mês</button>
        <button data-k="b" data-why="Correto. Em DMG, suspender insulina ao puerpério e liberar dieta normal. Solicitar TOTG 75 g em 6 semanas para reclassificação. Reforçar rastreio cardiovascular periódico.">B) Suspender insulina, liberar dieta normal, marcar TOTG em 6 sem</button>
        <button data-k="c" data-why="Metformina não é necessária — DMG sem medicação prévia ao parto e DMG com insulina geralmente resolvem ao parto.">C) Trocar insulina por metformina</button>
        <button data-k="d" data-why="HbA1c não é o exame ideal de reclassificação após o parto — TOTG é o padrão.">D) Solicitar HbA1c hoje</button>
      </div>
      <div class="quiz-feedback"></div>
    </div>

    <div class="page-dock">
      <a class="dock-link" href="#distocia-ombros"><small>Anterior</small>← Distócia de ombros</a>
      <a class="dock-link next" href="#gemelar-classificacao"><small>Próximo</small>Gemelaridade · zigoticidade →</a>
    </div>
  </section>
  `);

  /* placeholders antigos da hiperêmese (substituídos acima) */
  const __HIPEREMESE_PLACEHOLDERS_REMOVED__ = (function dummy(){
    return null; // os GORender originais ficam abaixo mas referenciam ids já injetados — desabilitando.
  });
  /* eslint-disable */
  if (false) GORender({
    id: "hiperemese-vs-nausea",
    kicker: "Hiperêmese · página 14",
    kickerClass: "k-teal",
    title: "Náusea fisiológica × hiperêmese gravídica",
    lead: "Quando vômito de gestante deixa de ser esperado e vira internação.",
    perguntaCentral: "Quando vômito de gestante deixa de ser esperado e vira internação?",
    visualTitle: "Comparador \"náusea comum\" × \"hiperêmese\"",
    visualLegend: "Duas colunas com critérios paralelos: frequência, peso, hidratação, eletrólitos, cetonúria, função hepática. Selo coral acende quando a coluna fecha hiperêmese.",
    interacaoTitle: "Checklist clínico de decisão",
    interacaoLegend: "O aluno marca presença de vômitos incoercíveis, intolerância via oral, perda de peso ≥5%, desidratação e cetonúria; o sistema decide entre orientar, ajustar antiemético ou internar.",
    componentName: "HyperemesisDecisionLab",
    objetivo: "Diferenciar náuseas/vômitos fisiológicos do primeiro trimestre da hiperêmese gravídica e reconhecer os critérios que indicam internação.",
    cobertura: [
      "Náuseas e vômitos do primeiro trimestre são fisiológicos em até 80% das gestantes — normalmente cedem por volta de 16 semanas.",
      "Hiperêmese gravídica: vômitos incoercíveis com intolerância à via oral.",
      "Perda de peso ≥5% do peso pré-gestacional.",
      "Desidratação clínica (mucosas secas, taquicardia, hipotensão postural).",
      "Distúrbio hidroeletrolítico (hipocalemia, alcalose hipoclorêmica).",
      "Cetonúria como marcador de jejum prolongado.",
      "Pode haver elevação leve de transaminases sem doença hepática primária."
    ],
    relevanceTags: ["cai-pouco", "banca-grande"],
    prev: { id: "puerperio-reclassificacao", label: "Puerpério e reclassificação" },
    next: { id: "hiperemese-diferenciais", label: "Hiperêmese · risco e diferenciais" }
  });

  if (false) GORender({
    id: "hiperemese-diferenciais",
    kicker: "Hiperêmese · página 15",
    kickerClass: "k-teal",
    title: "Hiperêmese · risco e diferenciais (HCG, tireoide)",
    lead: "Quando o HCG alto está explicando mais do que o vômito.",
    perguntaCentral: "O HCG alto está explicando mais do que o vômito? Mola, gemelar e hipertireoidismo transitório são parte da história?",
    visualTitle: "Mapa HCG → tireoide → vômitos → risco obstétrico",
    visualLegend: "Cadeia visual: HCG elevado estimula receptor de TSH, gera hipertireoidismo transitório (TSH suprimido / T4 livre normal) e potencializa vômitos. Mola e gemelaridade aparecem como fontes de HCG aumentado.",
    interacaoTitle: "Painel de diferenciais",
    interacaoLegend: "O aluno alterna entre mola, gemelaridade, hiperêmese isolada, pancreatite e hipertireoidismo transitório; o sistema explica como diferenciar.",
    componentName: "HCGThyroidDifferentialMap",
    objetivo: "Investigar todas as causas de HCG elevado (mola, gemelaridade) e diferenciar hipertireoidismo transitório do verdadeiro hipertireoidismo de Graves; lembrar pancreatite no diferencial.",
    cobertura: [
      "Fatores de risco: mola hidatiforme, gestação gemelar, HCG muito alto, primigesta jovem, hiperêmese em gestação anterior.",
      "Hipertireoidismo transitório por HCG: TSH suprimido com T4 livre normal e ausência de bócio/oftalmopatia. Não tratar com antitireoidiano de rotina.",
      "Diferencial: hipertireoidismo de Graves (anticorpos anti-receptor de TSH positivos, bócio, oftalmopatia).",
      "Pancreatite gestacional: amilase/lipase elevadas, dor em barra; pode ser confundida com hiperêmese grave.",
      "Mola hidatiforme: útero aumentado para a idade gestacional, sangramento, vesículas em \"cacho de uva\" no USG."
    ],
    relevanceTags: ["aprofundamento"],
    prev: { id: "hiperemese-vs-nausea", label: "Náusea fisiológica × hiperêmese" },
    next: { id: "hiperemese-conduta", label: "Hiperêmese · conduta, tiamina e antieméticos" }
  });

  if (false) GORender({
    id: "hiperemese-conduta",
    kicker: "Hiperêmese · página 16",
    kickerClass: "k-teal",
    title: "Hiperêmese · conduta, tiamina e antieméticos",
    lead: "A falha grave que a questão quer que você esqueça é a tiamina.",
    perguntaCentral: "Qual é a falha grave que a questão quer que você esqueça — e em que ordem entram hidratação, tiamina e antiemético?",
    visualTitle: "Protocolo em camadas",
    visualLegend: "Pirâmide de conduta: internar → dieta zero → reposição hidroeletrolítica → tiamina antes da glicose (prevenção de encefalopatia de Wernicke) → antieméticos → reintroduzir via oral.",
    interacaoTitle: "Ordem correta da conduta",
    interacaoLegend: "O aluno arrasta cards (hidratar, tiamina, glicose, antiemético, reintroduzir VO) na ordem; o sistema valida e explica o porquê.",
    componentName: "HyperemesisTreatmentProtocol",
    objetivo: "Conduzir hiperêmese: internar, repor volume, ofertar tiamina antes da glicose, escolher antieméticos por linha (anti-histamínicos, metoclopramida, clorpromazina, ondansetrona) e reintroduzir dieta progressivamente.",
    cobertura: [
      "Internação para reposição e proteção contra distúrbios hidroeletrolíticos.",
      "Dieta zero inicial; reintroduzir conforme tolerância.",
      "Reposição hidroeletrolítica com soro fisiológico ou ringer lactato.",
      "Tiamina (vitamina B1) IV antes/junto de glicose para prevenir encefalopatia de Wernicke.",
      "Piridoxina (B6): reduz náusea isoladamente.",
      "Anti-histamínicos: meclizina, dimenidrinato.",
      "Metoclopramida: opção classicamente segura.",
      "Clorpromazina: para casos refratários.",
      "Ondansetrona: opção possível, frequentemente reservada quando classes anteriores falham (atenção a discussões sobre fenda labial em uso muito precoce; conferir referência da banca).",
      "Alta após melhora clínica, ganho de peso e tolerância via oral."
    ],
    relevanceTags: ["pegadinha"],
    prev: { id: "hiperemese-diferenciais", label: "Hiperêmese · risco e diferenciais" },
    next: { id: "diabetes-rastreio", label: "Diabetes · caso, fatores de risco e rastreio" }
  });

  // ---------- Bloco 3 · Diabetes na gestação (10 páginas) ----------

  if (false) GORender({
    id: "diabetes-rastreio",
    kicker: "Diabetes na gestação · página 17",
    kickerClass: "k-emerald",
    title: "Diabetes · caso, fatores de risco e rastreio universal",
    lead: "Fator de risco existe — mas não muda o protocolo. O rastreio é universal.",
    perguntaCentral: "Fator de risco muda o protocolo de rastreio?",
    visualTitle: "Cartão de anamnese com pistas destacadas",
    visualLegend: "Anamnese de gestante com fatores marcados: macrossomia prévia, óbito fetal tardio, obesidade, hipertensão, familiar de 1º grau diabético. Tia-avó diabética aparece como pegadinha (não conta).",
    interacaoTitle: "Verdadeiro × falso de fatores de risco",
    interacaoLegend: "O aluno marca fatores como verdadeiros ou falsos; o sistema explica e reforça que mesmo gestante sem fator deve ser rastreada (rastreio universal).",
    componentName: "DiabetesRiskClassifier",
    objetivo: "Listar fatores de risco para diabetes na gestação e entender que o rastreio é universal — todos rastreiam, com fator ou sem fator.",
    cobertura: [
      "Macrossomia em gestação anterior (RN ≥4.000 g).",
      "Óbito fetal tardio inexplicado.",
      "Obesidade pré-gestacional (IMC ≥30).",
      "Hipertensão arterial.",
      "Histórico familiar de diabetes em familiar de 1º grau (pai, mãe, irmãos).",
      "Tia-avó diabética não conta (parente de 4º grau).",
      "SOP, glicemia de jejum prévia alterada, idade materna avançada.",
      "Rastreio universal: todas as gestantes devem ser rastreadas."
    ],
    prev: { id: "hiperemese-conduta", label: "Hiperêmese · conduta" },
    next: { id: "diabetes-diagnostico", label: "Diagnóstico · glicemia de jejum e TOTG 75 g" }
  });

  if (false) GORender({
    id: "diabetes-diagnostico",
    kicker: "Diabetes na gestação · página 18",
    kickerClass: "k-emerald",
    title: "Diagnóstico · glicemia de jejum e TOTG 75 g",
    lead: "Isso é diabetes gestacional ou diabetes prévio não diagnosticado.",
    perguntaCentral: "Isso é diabetes gestacional ou diabetes prévio que entrou em pré-natal sem diagnóstico anterior?",
    visualTitle: "Fluxograma diagnóstico completo",
    visualLegend: "Caminho: primeira consulta <20 sem (jejum <92 / 92–125 / ≥126) → TOTG 75 g entre 24 e 28 sem (jejum, 1h, 2h). Cada saída do fluxo com selo: normal, DMG, diabetes prévio.",
    interacaoTitle: "Calculadora diagnóstica",
    interacaoLegend: "O aluno digita valores de glicemia de jejum e/ou TOTG e recebe a classificação automática (normal, DMG, diabetes prévio).",
    componentName: "GestationalDiabetesDiagnosisFlow",
    objetivo: "Aplicar os pontos de corte da glicemia de jejum (<20 sem) e do TOTG 75 g (24–28 sem) para diferenciar normalidade, DMG e diabetes prévio não diagnosticado.",
    cobertura: [
      "Glicemia de jejum na primeira consulta antes de 20 semanas: <92 = normal; 92–125 = DMG; ≥126 = diabetes prévio.",
      "TOTG 75 g entre 24 e 28 semanas (jejum, 1 h, 2 h).",
      "Pontos de corte do TOTG: jejum 92, 1h 180, 2h 153 — basta um alterado para fechar DMG.",
      "Diabetes prévio no TOTG: jejum ≥126 ou 2h ≥200.",
      "Pré-natal iniciado tardiamente (após 20 semanas): seguir direto para TOTG.",
      "Diferença chave: alvos diagnósticos (jejum 92) × alvos de acompanhamento (jejum 95)."
    ],
    relevanceTags: ["pegadinha"],
    prev: { id: "diabetes-rastreio", label: "Diabetes · rastreio universal" },
    next: { id: "diabetes-fisiologia", label: "Fisiologia placentária e perfil glicêmico" }
  });

  if (false) GORender({
    id: "diabetes-fisiologia",
    kicker: "Diabetes na gestação · página 19",
    kickerClass: "k-emerald",
    title: "Fisiologia placentária e perfil glicêmico",
    lead: "A glicose piora quando a placenta cresce — porque a placenta produz hormônios contra-insulínicos.",
    perguntaCentral: "Por que a glicose piora quando a placenta cresce — e por que o pâncreas ainda funciona no DMG?",
    visualTitle: "Timeline placenta → hormônios contra-insulínicos → resistência",
    visualLegend: "Linha gestacional: placenta cresce e secreta hormônio lactogênio placentário, cortisol, GH placentário; resistência periférica à insulina aumenta no 2º/3º trimestre. Pâncreas materno tenta compensar.",
    interacaoTitle: "Painel de perfil glicêmico",
    interacaoLegend: "O aluno alterna entre alvos diagnósticos × alvos de acompanhamento; o sistema mostra os pontos de corte e explica a diferença.",
    componentName: "GlycemicProfileDashboard",
    objetivo: "Entender que a resistência à insulina é fisiológica na gestação e que o tratamento começa pela dieta porque o pâncreas ainda está produzindo insulina; conhecer alvos do perfil glicêmico.",
    cobertura: [
      "Placenta produz hormônio lactogênio placentário, cortisol e GH placentário, todos contra-insulínicos.",
      "Resistência à insulina aumenta no 2º e 3º trimestres; gestante normal compensa, gestante predisposta não.",
      "Pâncreas materno ainda produz insulina no DMG — por isso dieta e exercício funcionam inicialmente.",
      "Alvos de acompanhamento: jejum <95, 1 h pós-refeição <140, 2 h pós-refeição <120.",
      "Evitar hipoglicemia (<60).",
      "Diagnóstico (jejum 92) × acompanhamento (jejum 95) — pontos diferentes para finalidades diferentes."
    ],
    prev: { id: "diabetes-diagnostico", label: "Diagnóstico · glicemia e TOTG" },
    next: { id: "diabetes-dieta-30", label: "Dieta, atividade e regra dos 30%" }
  });

  if (false) GORender({
    id: "diabetes-dieta-30",
    kicker: "Diabetes na gestação · página 20",
    kickerClass: "k-emerald",
    title: "Dieta, atividade e regra dos 30%",
    lead: "Quando dieta e exercício deixam de ser suficientes — o gatilho é a regra dos 30%.",
    perguntaCentral: "Quando dieta e exercício deixam de ser suficientes — e quando entrar com medicação?",
    visualTitle: "Dashboard de glicemias da semana",
    visualLegend: "Painel com perfil glicêmico de uma semana: jejum, 1h e 2h pós-refeição. Cada medida acende verde (alvo) / âmbar (limítrofe) / coral (fora do alvo). Contador da regra dos 30%.",
    interacaoTitle: "Simulador da regra dos 30%",
    interacaoLegend: "O aluno altera medidas; o sistema calcula o percentual fora do alvo e decide se mantém dieta ou entra com medicação.",
    componentName: "ThirtyPercentRuleSimulator",
    objetivo: "Implementar dieta fracionada e atividade física como primeira linha; aplicar a regra dos 30% (mais de 30% das medidas fora do alvo em 1–2 semanas → entra medicação).",
    cobertura: [
      "Dieta fracionada em seis refeições (3 principais + 3 lanches).",
      "Composição aproximada: 50% carboidratos, 30% lipídios, 20% proteínas (pode variar com protocolo).",
      "Carboidratos preferencialmente complexos; reduzir ultraprocessados.",
      "Atividade física regular adaptada à gestação.",
      "Monitorar perfil glicêmico por 1–2 semanas.",
      "Regra dos 30%: se mais de 30% das medidas estiverem fora do alvo, entra medicação."
    ],
    prev: { id: "diabetes-fisiologia", label: "Fisiologia placentária e perfil glicêmico" },
    next: { id: "diabetes-tratamento", label: "Insulina, metformina e alto risco" }
  });

  if (false) GORender({
    id: "diabetes-tratamento",
    kicker: "Diabetes na gestação · página 21",
    kickerClass: "k-emerald",
    title: "Insulina, metformina e alto risco",
    lead: "Quando entrar com remédio e para onde encaminhar.",
    perguntaCentral: "Quando entrar com remédio e para onde encaminhar — UBS ou alto risco?",
    visualTitle: "Mapa de tratamento e encaminhamento",
    visualLegend: "Fluxo: dieta/exercício → metformina (lugar específico) → insulina. Cards de encaminhamento: UBS × alto risco. Diabetes prévio sempre alto risco.",
    interacaoTitle: "Classificador UBS × alto risco",
    interacaoLegend: "O aluno informa tipo (DMG sem medicação / DMG com medicação / diabetes prévio) e o sistema sugere o nível de cuidado e a medicação.",
    componentName: "DiabetesTreatmentNavigator",
    objetivo: "Saber quando entrar com insulina ou metformina, em que ordem, e classificar UBS versus alto risco conforme tipo de diabetes e necessidade de medicação.",
    cobertura: [
      "Insulina é a principal medicação na gestação — ajuste fácil, segurança bem estabelecida.",
      "Metformina tem lugar: falha de adesão à insulina, dificuldade de acesso, paciente que recusa insulina (avaliar protocolo local).",
      "Diabetes prévio sempre vai para alto risco.",
      "DMG com medicação: encaminhar ao alto risco.",
      "DMG sem medicação (controlada com dieta e exercício): pode seguir na UBS conforme protocolo local.",
      "Acompanhamento conjunto com obstetra e endocrinologista no alto risco."
    ],
    prev: { id: "diabetes-dieta-30", label: "Dieta e regra dos 30%" },
    next: { id: "diabetes-insulina-trimestre", label: "Insulina por trimestre" }
  });

  if (false) GORender({
    id: "diabetes-insulina-trimestre",
    kicker: "Diabetes na gestação · página 22",
    kickerClass: "k-emerald",
    title: "Insulina por trimestre e insuficiência placentária",
    lead: "Por que hipoglicemia no terceiro trimestre assusta.",
    perguntaCentral: "Por que hipoglicemia no terceiro trimestre, com a mesma dose e a mesma dieta, é sinal de alarme?",
    visualTitle: "Escadinha de dose de insulina por trimestre",
    visualLegend: "Degraus: 1º trimestre (↓ dose por náusea/baixa ingesta), 2º/3º trimestre (↑ dose pela resistência placentária), pós-parto (↓ dose). Alerta no degrau onde dose mantida + hipoglicemia = insuficiência placentária.",
    interacaoTitle: "Simulador de ajuste fisiológico",
    interacaoLegend: "O aluno passeia pelos trimestres e o sistema explica o porquê de cada ajuste; em \"hipoglicemia inesperada no 3º trimestre\" surge o alerta de insuficiência placentária.",
    componentName: "InsulinPregnancyTimeline",
    objetivo: "Ajustar insulina por trimestre conforme fisiologia da gestação e reconhecer hipoglicemia inesperada no 3º trimestre como sinal de insuficiência placentária.",
    cobertura: [
      "1º trimestre: reduzir dose pré-gestacional pela menor ingesta e náusea.",
      "2º e 3º trimestres: aumentar dose pela resistência insulínica progressiva.",
      "Pós-parto imediato: reduzir dose drasticamente — em diabetes gestacional, geralmente suspender.",
      "Hipoglicemia no 3º trimestre com mesma dose e mesma alimentação → insuficiência placentária (placenta produzindo menos hormônios contra-insulínicos por estar sofrendo).",
      "Avaliar vitalidade fetal sempre que houver hipoglicemia inesperada no terceiro trimestre."
    ],
    relevanceTags: ["aprofundamento", "pegadinha"],
    prev: { id: "diabetes-tratamento", label: "Insulina, metformina e alto risco" },
    next: { id: "diabetes-parto", label: "Momento do parto no diabetes" }
  });

  if (false) GORender({
    id: "diabetes-parto",
    kicker: "Diabetes na gestação · página 23",
    kickerClass: "k-emerald",
    title: "Momento do parto no diabetes",
    lead: "Induzir não é o mesmo que fazer cesárea.",
    perguntaCentral: "Em que semana cada gestante diabética deve nascer — e por que indução não é cesárea?",
    visualTitle: "Régua gestacional 37–40 semanas",
    visualLegend: "Linha por categoria: DMG sem medicação (até 40 sem) · DMG com medicação e bom controle (39 sem) · diabetes mal controlado (37–38 sem). Selos de macrossomia/polidrâmnio acendem em mau controle.",
    interacaoTitle: "Stepper de momento do parto",
    interacaoLegend: "O aluno escolhe categoria + controle + complicações ultrassonográficas; o sistema sugere semana e via.",
    componentName: "DiabetesDeliveryTimingStepper",
    objetivo: "Decidir o momento do parto no diabetes conforme tipo (DMG ou prévio), uso de medicação e qualidade do controle; entender que indução do parto não significa cesárea.",
    cobertura: [
      "DMG sem medicação: parto até 40 semanas.",
      "DMG ou diabetes prévio com medicação e bom controle: até 39 semanas.",
      "Diabetes mal controlado: parto entre 37–38 semanas.",
      "Evitar parto antes de 37 semanas, salvo exceção (sofrimento fetal, complicações maternas).",
      "Sinais de mau controle: glicemias persistentemente fora do alvo, macrossomia, polidrâmnio.",
      "Via de parto: pode ser vaginal — cesárea por critério obstétrico, não pelo diabetes em si."
    ],
    prev: { id: "diabetes-insulina-trimestre", label: "Insulina por trimestre" },
    next: { id: "diabetes-complicacoes", label: "Complicações do filho da diabética" }
  });

  if (false) GORender({
    id: "diabetes-complicacoes",
    kicker: "Diabetes na gestação · página 24",
    kickerClass: "k-emerald",
    title: "Complicações do filho da diabética",
    lead: "O ultrassom denuncia mau controle.",
    perguntaCentral: "O ultrassom está denunciando mau controle — e quais malformações apontam diabetes prévio?",
    visualTitle: "Fluxo mãe hiperglicêmica → feto → recém-nascido",
    visualLegend: "Cadeia: hiperglicemia materna → glicose atravessa placenta → hiperinsulinismo fetal → macrossomia, polidrâmnio, hipoglicemia neonatal, policitemia. À parte, diabetes prévio e malformações (síndrome de regressão caudal, cardiopatias, NTD).",
    interacaoTitle: "Liga mecanismo × complicação",
    interacaoLegend: "O aluno conecta cada mecanismo (hiperinsulinismo, policitemia, malformação) à complicação fetal/neonatal correspondente.",
    componentName: "DiabeticFetusComplicationMap",
    objetivo: "Identificar complicações do filho da diabética: macrossomia, polidrâmnio, distócia de ombros, hipoglicemia e policitemia neonatais; reconhecer que malformações apontam diabetes prévio mal controlado periconcepcional.",
    cobertura: [
      "Hiperglicemia materna → hiperinsulinismo fetal → macrossomia.",
      "Macrossomia → distócia de ombros.",
      "Hiperinsulinismo fetal → ao cortar cordão, hipoglicemia neonatal.",
      "Hipóxia crônica intrauterina → policitemia neonatal.",
      "Polidrâmnio: hiperglicemia fetal → diurese osmótica.",
      "Diabetes prévio mal controlado periconcepcional: malformações cardíacas, defeitos do tubo neural, síndrome de regressão caudal.",
      "Retinopatia materna pode piorar na gestação — consulta pré-concepcional ideal com hemoglobina glicada baixa antes de engravidar."
    ],
    relevanceTags: ["aprofundamento"],
    prev: { id: "diabetes-parto", label: "Momento do parto no diabetes" },
    next: { id: "distocia-ombros", label: "Distócia de ombros · McRoberts, Jacquemier e Gaskin" }
  });

  if (false) GORender({
    id: "distocia-ombros",
    kicker: "Diabetes na gestação · página 25",
    kickerClass: "k-emerald",
    title: "Distócia de ombros · McRoberts, Jacquemier, Gaskin",
    lead: "Primeira conduta não é a mesma coisa que primeira manobra.",
    perguntaCentral: "Primeira conduta é a mesma coisa que primeira manobra — e qual é a sequência segura quando a cabeça já saiu?",
    visualTitle: "Simulador anatômico simplificado da pelve e ombro",
    visualLegend: "Vista esquemática: ombro anterior preso na sínfise púbica. Cards animados mostram cada manobra: McRoberts (hiperflexão de coxas), suprapúbica, Jacquemier (extração do braço posterior), rotacional/saca-rolha, Gaskin (quatro apoios).",
    interacaoTitle: "Sequência de manobras com feedback",
    interacaoLegend: "O aluno arrasta cards na ordem; o sistema valida (chamar ajuda primeiro / McRoberts antes de força) e explica complicações em cada manobra errada.",
    componentName: "ShoulderDystociaSimulator",
    objetivo: "Diagnosticar distócia de ombros, lembrar que primeira conduta é chamar ajuda, primeira manobra é McRoberts e que parto é jeito, não força.",
    cobertura: [
      "Cabeça já nasceu, ombros não passam — ombro anterior preso na sínfise púbica.",
      "Não aumentar a força (não ajuda; lesa plexo braquial e fratura clavícula).",
      "Primeira CONDUTA: chamar ajuda (anestesista, neonatologista, obstetra).",
      "Primeira MANOBRA: McRoberts — hiperflexão e abdução das coxas.",
      "Pressão suprapúbica (não fúndica).",
      "Manobra de Jacquemier: retirar o braço posterior.",
      "Manobras rotacionais (saca-rolha / parafuso): trocar diâmetro biacromial pelo axiloacromial.",
      "Manobra de Gaskin: mãe em quatro apoios.",
      "Mantra: \"parto é jeito, não força.\""
    ],
    relevanceTags: ["pegadinha"],
    prev: { id: "diabetes-complicacoes", label: "Complicações do filho da diabética" },
    next: { id: "diabetes-puerperio", label: "Puerpério no diabetes" }
  });

  if (false) GORender({
    id: "diabetes-puerperio",
    kicker: "Diabetes na gestação · página 26",
    kickerClass: "k-emerald",
    title: "Puerpério no diabetes · DM1, DM2 e DMG",
    lead: "Terminou a gravidez — terminou o diabetes? Depende.",
    perguntaCentral: "Terminou a gravidez, terminou o diabetes? E quando pedir TOTG no pós-parto?",
    visualTitle: "Três trilhas pós-parto",
    visualLegend: "Trilhas separadas para DM1, DM2 e DMG, com ajuste de dose, escolha de medicação na lactação e momento do TOTG (6 semanas) na DMG.",
    interacaoTitle: "Classificador puerperal",
    interacaoLegend: "O aluno escolhe o tipo de diabetes; o sistema entrega o ajuste pós-parto e o seguimento.",
    componentName: "DiabetesPuerperiumClassifier",
    objetivo: "Ajustar diabetes no puerpério conforme tipo (DM1, DM2, DMG), saber quando suspender insulina, quando retornar antidiabético oral e quando rastrear novamente.",
    cobertura: [
      "DM1: voltar dose pré-gestacional ou metade da dose final da gestação como ponto de partida.",
      "DM2: metade da dose final ou retornar ao antidiabético oral conforme contexto e amamentação.",
      "DMG: dieta normal e suspender insulina; não manter dieta hipoglicemiante (pegadinha).",
      "TOTG em 6 semanas pós-parto na DMG para reclassificação.",
      "Mulheres com DMG têm risco aumentado de DM2 ao longo da vida — rastreio periódico.",
      "Lactação afeta sensibilidade à insulina — atenção a hipoglicemia."
    ],
    prev: { id: "distocia-ombros", label: "Distócia de ombros" },
    next: { id: "gemelar-classificacao", label: "Zigoticidade, corionicidade e amnionicidade" }
  });

})();
