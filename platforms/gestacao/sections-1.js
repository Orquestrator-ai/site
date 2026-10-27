/* =========================================================================
   GO PREMIUM · DOENÇAS CLÍNICAS NA GRAVIDEZ
   sections-1.js — Bloco 1 · Hipertensão na gestação e pré-eclâmpsia
   12 páginas (02 → 13) · IMPLEMENTAÇÃO COMPLETA · Sub-fase 2A do Prompt 2
   -------------------------------------------------------------------------
   Cada página contém: visual SVG/HTML autoral, interação funcional via
   data-component (implementadas em scripts.js), conteúdo textual integral
   sem resumo, callouts (O que a banca quer / Pegadinha / Não confunda /
   Cai pouco / Atualização), mini-quiz quando aplicável e mnemônicos como
   selo memorável.
   ========================================================================= */

(function(){
  "use strict";
  const root = document.getElementById("sectionRoot");
  if (!root) return;

  function inject(html){
    const wrap = document.createElement("div");
    wrap.innerHTML = html.trim();
    while (wrap.firstChild) root.appendChild(wrap.firstChild);
  }

  /* ===================== 02 · MAPA DIAGNÓSTICO ===================== */
  inject(`
  <section class="section" data-id="mapa-hipertensivo">
    <div class="page-header">
      <div class="ph-meta">
        <span class="kicker k-rose">Hipertensão & pré-eclâmpsia · página 02</span>
        <h1>Mapa diagnóstico dos distúrbios hipertensivos</h1>
        <p class="lead">Antes de tratar, é preciso classificar. Esta página entrega a árvore que o aluno aplica em todo enunciado de gestante hipertensa — e o seletor guiado treina a leitura dos detalhes que mudam o gabarito.</p>
        <div class="hero-tags" style="margin-top:10px">
          <span class="relevance-tag r-pegadinha">pegadinha</span>
          <span class="tag t-info">PA confirmada · semana 20 · proteinúria · lesão sistêmica</span>
        </div>
      </div>
    </div>

    <div class="q-central"><span class="q-icon">?</span><p>Antes de tratar, qual hipertensão é essa: crônica, gestacional, pré-eclâmpsia ou pré-eclâmpsia sobreposta?</p></div>

    <div class="grid cols-2">
      <div class="card glass go-svg-card">
        <span class="kicker k-rose">Visual</span>
        <h3>Árvore diagnóstica · 4 saídas</h3>
        <svg viewBox="0 0 540 420" role="img" aria-labelledby="hdtT hdtD" class="go-svg">
          <title id="hdtT">Árvore diagnóstica dos distúrbios hipertensivos da gestação</title>
          <desc id="hdtD">Sequência de bifurcações: PA confirmada, antes ou depois de 20 semanas, proteinúria ou lesão sistêmica, puerpério até 12 semanas, com 4 saídas: hipertensão crônica, hipertensão gestacional, pré-eclâmpsia e pré-eclâmpsia sobreposta.</desc>
          <defs>
            <linearGradient id="hdtRose" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#d6406b"/><stop offset="1" stop-color="#7a1f3d"/></linearGradient>
            <marker id="hdtArr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#7282a0"/></marker>
          </defs>
          <!-- raiz -->
          <g transform="translate(190,18)">
            <rect width="160" height="48" rx="10" fill="url(#hdtRose)" opacity=".22" stroke="#d6406b" stroke-width="1.6"/>
            <text x="80" y="22" text-anchor="middle" font-size="12" font-weight="800" fill="#7a1f3d">PA ≥140/90 confirmada</text>
            <text x="80" y="38" text-anchor="middle" font-size="10" fill="#7a1f3d">(2 aferições, técnica adequada)</text>
          </g>
          <path d="M270 70 L270 92" stroke="#7282a0" stroke-width="2" marker-end="url(#hdtArr)"/>
          <!-- pergunta 1 -->
          <g transform="translate(180,98)">
            <rect width="180" height="42" rx="10" fill="#fff" fill-opacity=".88" stroke="#5b3bd1" stroke-width="1.5"/>
            <text x="90" y="26" text-anchor="middle" font-size="12" font-weight="700" fill="#3a2a8a">Antes ou depois de 20 semanas?</text>
          </g>
          <!-- ramo esquerdo: antes -->
          <path d="M220 142 L120 178" stroke="#7282a0" stroke-width="2" marker-end="url(#hdtArr)"/>
          <text x="148" y="166" font-size="11" font-weight="700" fill="#7282a0">antes</text>
          <g transform="translate(28,182)">
            <rect width="186" height="60" rx="10" fill="#d6406b" fill-opacity=".18" stroke="#d6406b" stroke-width="1.6"/>
            <text x="93" y="26" text-anchor="middle" font-size="13" font-weight="800" fill="#7a1f3d">Hipertensão crônica</text>
            <text x="93" y="46" text-anchor="middle" font-size="10" fill="#7a1f3d">(mola é a única exceção que abre PE)</text>
          </g>
          <!-- ramo direito: depois -->
          <path d="M320 142 L420 178" stroke="#7282a0" stroke-width="2" marker-end="url(#hdtArr)"/>
          <text x="370" y="166" font-size="11" font-weight="700" fill="#7282a0">depois</text>
          <g transform="translate(322,182)">
            <rect width="200" height="42" rx="10" fill="#fff" fill-opacity=".88" stroke="#5b3bd1" stroke-width="1.5"/>
            <text x="100" y="26" text-anchor="middle" font-size="12" font-weight="700" fill="#3a2a8a">Proteinúria ou lesão sistêmica?</text>
          </g>
          <!-- ramo direito: sim -->
          <path d="M380 226 L320 274" stroke="#7282a0" stroke-width="2" marker-end="url(#hdtArr)"/>
          <text x="332" y="252" font-size="11" font-weight="700" fill="#7282a0">sim</text>
          <g transform="translate(220,278)">
            <rect width="200" height="60" rx="10" fill="#d6406b" fill-opacity=".22" stroke="#d6406b" stroke-width="1.6"/>
            <text x="100" y="26" text-anchor="middle" font-size="13" font-weight="800" fill="#7a1f3d">Pré-eclâmpsia</text>
            <text x="100" y="46" text-anchor="middle" font-size="10" fill="#7a1f3d">(clássica ou sem proteinúria)</text>
          </g>
          <!-- ramo direito: não -->
          <path d="M460 226 L490 274" stroke="#7282a0" stroke-width="2" marker-end="url(#hdtArr)"/>
          <text x="478" y="252" font-size="11" font-weight="700" fill="#7282a0">não</text>
          <g transform="translate(430,278)">
            <rect width="100" height="60" rx="10" fill="#b47d18" fill-opacity=".18" stroke="#b47d18" stroke-width="1.6"/>
            <text x="50" y="26" text-anchor="middle" font-size="12" font-weight="800" fill="#7a5210">HAS gestacional</text>
            <text x="50" y="46" text-anchor="middle" font-size="10" fill="#7a5210">(reavaliar 12 sem PP)</text>
          </g>
          <!-- saída sobreposta -->
          <g transform="translate(120,278)">
            <rect width="86" height="60" rx="10" fill="#d6406b" fill-opacity=".10" stroke="#d6406b" stroke-width="1.4" stroke-dasharray="4 3"/>
            <text x="43" y="26" text-anchor="middle" font-size="11" font-weight="800" fill="#7a1f3d">PE sobreposta</text>
            <text x="43" y="44" text-anchor="middle" font-size="9" fill="#7a1f3d">(crônica + nova proteinúria/lesão após 20 sem)</text>
          </g>
          <path d="M120 220 L160 274" stroke="#d6406b" stroke-width="1.4" stroke-dasharray="3 3" marker-end="url(#hdtArr)"/>
          <!-- legenda inferior -->
          <g font-size="10" fill="#44546f">
            <rect x="20" y="356" width="500" height="50" rx="8" fill="none" stroke="#cdd5e0" stroke-dasharray="3 3"/>
            <text x="32" y="376" font-weight="700" fill="#7a1f3d">Reclassificação puerperal</text>
            <text x="32" y="392">Resolução até 12 semanas pós-parto = HAS gestacional ou PE; persistência = HAS crônica.</text>
          </g>
        </svg>
        <p class="text-sm muted" style="margin-top:8px">Os nós da árvore acendem ao usar o seletor ao lado. As 4 saídas cobrem 100% dos cenários cobrados em prova.</p>
      </div>

      <div class="card" data-component="HypertensionDiagnosisTree" data-implemented="1">
        <span class="kicker">Interação</span>
        <h3>Seletor guiado de classificação</h3>
        <p class="text-sm muted">Responda as 3 perguntas; a classificação aparece embaixo com a pegadinha que mais cai.</p>

        <div class="hdt-step" data-step="week">
          <div class="hdt-q">1. Quando a PA apareceu?</div>
          <div class="hdt-options">
            <button data-val="before20">Antes de 20 sem</button>
            <button data-val="after20">A partir de 20 sem</button>
          </div>
        </div>
        <div class="hdt-step" data-step="proteinuria">
          <div class="hdt-q">2. Há proteinúria significativa?</div>
          <div class="hdt-options">
            <button data-val="yes">Sim (≥300 mg/24h ou P/Cr ≥0,3)</button>
            <button data-val="no">Não</button>
          </div>
        </div>
        <div class="hdt-step" data-step="lesion">
          <div class="hdt-q">3. Há lesão sistêmica?</div>
          <div class="hdt-options">
            <button data-val="yes">Sim (EAP, plaq &lt;100k, Cr ↑, TGO ≥2×, sintomas cerebrais/visuais)</button>
            <button data-val="no">Não</button>
          </div>
        </div>
        <div class="hdt-output"></div>
        <button class="btn ghost hdt-reset" type="button" style="margin-top:8px">Reiniciar</button>
      </div>
    </div>

    <div class="grid cols-2" style="margin-top:18px">
      <div class="card">
        <span class="kicker k-rose">O que a banca quer</span>
        <h3>Os 5 marcos que decidem o diagnóstico</h3>
        <ul class="list">
          <li><b>Aferição confirmada.</b> PA ≥140/90 em duas medidas, com técnica adequada (paciente sentada, manguito apropriado, repouso de 5 minutos). Aferição isolada não diagnostica.</li>
          <li><b>Janela das 20 semanas.</b> Antes: pense em crônica. Depois: pense em gestacional ou pré-eclâmpsia. A única exceção real é a mola hidatiforme, que pode dar pré-eclâmpsia precocemente.</li>
          <li><b>Proteinúria significativa.</b> Continua sendo critério clássico — mas <b>deixou de ser obrigatória</b> para fechar pré-eclâmpsia.</li>
          <li><b>Lesão sistêmica.</b> Edema agudo de pulmão, plaquetopenia &lt;100.000, creatinina elevada, transaminases ≥2× o limite superior, sintomas cerebrais/visuais (cefaleia persistente, escotomas, alteração visual) ou epigastralgia em barra fecham pré-eclâmpsia mesmo sem proteinúria.</li>
          <li><b>Reclassificação puerperal.</b> Hipertensão que persiste após 12 semanas de puerpério vira hipertensão crônica retroativamente.</li>
        </ul>
      </div>

      <div class="card">
        <span class="kicker k-amber">Pegadinha clássica</span>
        <h3>"Antes de 20 sem com proteinúria — é PE?"</h3>
        <p>Não. Em hipertensa antes de 20 semanas com proteinúria, pense em <b>nefropatia pré-existente</b>, <b>diabetes prévio</b>, <b>LES</b> ou <b>SAF</b>. Pré-eclâmpsia precoce (&lt;20 sem) só é exceção em <b>mola hidatiforme</b>, e ainda assim com útero aumentado para a idade gestacional, β-HCG muito alto e vesículas em "cacho de uva" no USG.</p>
        <p class="muted"><b>Não confunda:</b> a presença de proteinúria antes de 20 semanas em diabética ou lúpica não exclui que essa paciente desenvolva pré-eclâmpsia <b>sobreposta</b> mais tarde — só significa que o ponto de partida proteico já estava alto.</p>

        <hr style="border:none;border-top:1px solid var(--border);margin:14px 0">

        <span class="kicker k-info">Mnemônico</span>
        <p class="go-mnemonic">"Antes de 20 semanas pensa em crônica; depois de 20, procure pré-eclâmpsia."</p>
      </div>
    </div>

    <div class="card" style="margin-top:18px" data-component="quiz" data-correct="b">
      <span class="kicker">Mini-quiz</span>
      <h3>Gestante de 18 semanas com PA 152/96 mmHg</h3>
      <p>Primigesta, sem comorbidades, traz aferições repetidas em 3 consultas seguidas com PA ≥140/90. Fita urinária sem proteínas. Função renal e hepática normais.</p>
      <div class="quiz-options">
        <button data-k="a" data-why="Não dá para chamar de pré-eclâmpsia antes de 20 semanas (exceto mola). Reveja a janela das 20 semanas.">A) Pré-eclâmpsia leve</button>
        <button data-k="b" data-why="Correto — antes de 20 semanas, PA elevada confirmada e sem proteinúria/lesão sistêmica é hipertensão crônica até prova em contrário. Investigue causa secundária se for jovem (renovascular, feocromocitoma, SAF, LES).">B) Hipertensão crônica</button>
        <button data-k="c" data-why="Hipertensão gestacional, por definição, surge após 20 semanas.">C) Hipertensão gestacional</button>
        <button data-k="d" data-why="Pré-eclâmpsia sobreposta exige hipertensão crônica prévia conhecida que piora ou desenvolve proteinúria/lesão sistêmica após 20 semanas — não é o caso aqui.">D) Pré-eclâmpsia sobreposta</button>
      </div>
      <div class="quiz-feedback"></div>
    </div>

    <div class="page-dock">
      <a class="dock-link" href="#caso-integrador"><small>Anterior</small>← Caso integrador</a>
      <a class="dock-link next" href="#cronica-vs-gestacional"><small>Próximo</small>Crônica × pré-eclâmpsia × gestacional →</a>
    </div>
  </section>
  `);

  /* ===================== 03 · CRÔNICA × PE × GESTACIONAL ===================== */
  inject(`
  <section class="section" data-id="cronica-vs-gestacional">
    <div class="page-header">
      <div class="ph-meta">
        <span class="kicker k-rose">Hipertensão & pré-eclâmpsia · página 03</span>
        <h1>Crônica × pré-eclâmpsia × hipertensão gestacional</h1>
        <p class="lead">O tempo, a proteinúria e o puerpério mudam o nome da doença — e a banca usa exatamente esse jogo para confundir o aluno. Esta página coloca as três entidades lado a lado, com timeline interativa para reforçar a janela das 20 semanas e o limite das 12 semanas pós-parto.</p>
        <div class="hero-tags" style="margin-top:10px"><span class="relevance-tag r-aprofundamento">aprofundamento</span></div>
      </div>
    </div>

    <div class="q-central"><span class="q-icon">?</span><p>O que separa hipertensão crônica, gestacional e pré-eclâmpsia além da semana de aparecimento?</p></div>

    <div class="grid cols-2">
      <div class="card glass">
        <span class="kicker k-rose">Visual</span>
        <h3>Comparador lado a lado</h3>
        <div class="go-compare">
          <table class="go-cmp-table">
            <thead>
              <tr><th></th><th>HAS crônica</th><th>HAS gestacional</th><th>Pré-eclâmpsia</th></tr>
            </thead>
            <tbody>
              <tr><th>Idade típica</th><td>Extremos da vida reprodutiva</td><td>Variável</td><td>Primigesta jovem ou idade avançada</td></tr>
              <tr><th>Paridade</th><td>Multíparas</td><td>Variável</td><td>Primigesta clássica</td></tr>
              <tr><th>Início</th><td>&lt;20 semanas (ou pré-gestacional)</td><td>≥20 semanas</td><td>≥20 semanas</td></tr>
              <tr><th>Proteinúria</th><td>Pode estar presente desde o início (basal)</td><td><b>Ausente</b></td><td>Presente OU ausente (com lesão sistêmica)</td></tr>
              <tr><th>Calciúria 24h</th><td>Normal/alta</td><td>Variável</td><td><b>Baixa</b> (pista clássica)</td></tr>
              <tr><th>Ácido úrico</th><td>Normal (até prova em contrário)</td><td>Pode subir</td><td><b>Eleva</b> (pista, não critério)</td></tr>
              <tr><th>Resolução pós-parto</th><td>Persiste</td><td>Resolve até 12 sem PP</td><td>Pode resolver até 12 sem PP</td></tr>
              <tr><th>Risco PE sobreposta</th><td><b>Alto</b> (vigilância seriada)</td><td>—</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-sm muted" style="margin-top:8px">Calciúria baixa e ácido úrico elevado são <b>pistas</b> (sensíveis), não <b>critérios</b> — não fecham diagnóstico isolados.</p>
      </div>

      <div class="card" data-component="PreeclampsiaVsChronicComparator" data-implemented="1">
        <span class="kicker">Interação</span>
        <h3>Timeline gestacional × pós-parto</h3>
        <p class="text-sm muted">Arraste o slider entre 4 e 44 semanas para ver o que muda. A linha 20 e a linha 12 (puerpério) são os divisores.</p>

        <div class="pvc-track">
          <div class="pvc-marks">
            <span class="pvc-mark" style="left:36%">20 sem</span>
            <span class="pvc-mark" style="left:73%">parto (40 sem)</span>
          </div>
          <div class="pvc-bar"></div>
          <div class="pvc-marker"></div>
        </div>
        <input type="range" min="4" max="52" value="22" step="1" aria-label="Semana gestacional ou puerperal" style="width:100%;margin-top:8px">
        <div class="pvc-output" style="margin-top:10px"></div>
      </div>
    </div>

    <div class="grid cols-2" style="margin-top:18px">
      <div class="card">
        <span class="kicker k-rose">O que a banca quer</span>
        <h3>Os pontos que separam as três</h3>
        <p><b>Hipertensa crônica</b> é a paciente que <b>já era hipertensa</b> ou que descobre HAS antes de 20 semanas. Frequente em multíparas, idade avançada, pacientes com comorbidades (DM, obesidade, nefropatia). Pode ter proteinúria desde o início — e isso não vira PE automaticamente. O risco aumentado é de <b>pré-eclâmpsia sobreposta</b>, que aparece como piora súbita de PA, nova proteinúria significativa ou lesão sistêmica após 20 semanas.</p>
        <p><b>Hipertensão gestacional</b> é o diagnóstico provisório quando a PA passa de 140/90 após 20 semanas <b>sem proteinúria</b> e <b>sem lesão sistêmica</b>. É instável: 20 a 50% evoluem para pré-eclâmpsia até o termo. Por isso a vigilância tem que ser seriada — não basta aferir PA: pedir proteinúria a cada consulta e questionar sintomas.</p>
        <p><b>Pré-eclâmpsia</b> é a doença sistêmica clássica da segunda metade da gestação. PA + proteinúria, ou PA + lesão sistêmica. Calciúria baixa e ácido úrico elevado reforçam — mas não fecham sozinhos.</p>
      </div>

      <div class="card">
        <span class="kicker k-amber">Pegadinhas e pistas finas</span>
        <h3>Quando a banca esconde a resposta</h3>
        <ul class="list">
          <li><b>"Hipertensa em uso de captopril que engravidou."</b> Suspender IECA imediatamente. Substituir por metildopa, nifedipina LP, pindolol ou hidralazina oral. Se em uso de hidroclorotiazida e bem controlada, pode-se manter.</li>
          <li><b>"Calciúria de 24h reduzida em gestante de 32 semanas."</b> Pista forte para pré-eclâmpsia, mesmo se a proteinúria ainda não fechou critério.</li>
          <li><b>"Ácido úrico 6,5 em gestante hipertensa."</b> Pista de pré-eclâmpsia em curso. Não diagnóstica — mas pede ampliação dos exames (24h, P/Cr, transaminases, plaquetas, creatinina).</li>
          <li><b>"PA 138/88 em consulta única."</b> Não fecha hipertensão. Aferir novamente e seguir técnica.</li>
          <li><b>"Hipertensa crônica que para de fazer pré-natal."</b> Risco máximo de pré-eclâmpsia sobreposta despercebida — descompensa rápido.</li>
        </ul>

        <hr style="border:none;border-top:1px solid var(--border);margin:14px 0">

        <span class="kicker k-info">Mnemônico</span>
        <p class="go-mnemonic">"Hipertensão crônica é a paciente; pré-eclâmpsia é a doença que a placenta entrega depois das 20 semanas."</p>
      </div>
    </div>

    <div class="page-dock">
      <a class="dock-link" href="#mapa-hipertensivo"><small>Anterior</small>← Mapa diagnóstico</a>
      <a class="dock-link next" href="#preeclampsia-diagnostico"><small>Próximo</small>Pré-eclâmpsia · com e sem proteinúria →</a>
    </div>
  </section>
  `);

  /* ===================== 05 · PROTEINÚRIA ===================== */
  inject(`
  <section class="section" data-id="proteinuria">
    <div class="page-header">
      <div class="ph-meta">
        <span class="kicker k-rose">Hipertensão & pré-eclâmpsia · página 05</span>
        <h1>Proteinúria · 24 horas, P/Cr e fita</h1>
        <p class="lead">Qual exame confirma e qual exame só quebra o galho. A urina de 24 horas é padrão-ouro, a relação P/Cr é a operacional do dia a dia, e a fita é a triagem grosseira que pede confirmação.</p>
      </div>
    </div>

    <div class="q-central"><span class="q-icon">?</span><p>Qual exame confirma proteinúria significativa e qual deles só serve para quebrar galho na emergência?</p></div>

    <div class="grid cols-2">
      <div class="card glass go-svg-card">
        <span class="kicker k-rose">Visual</span>
        <h3>Pódio dos métodos</h3>
        <svg viewBox="0 0 520 280" role="img" aria-labelledby="plT plD" class="go-svg">
          <title id="plT">Pódio dos métodos de proteinúria</title>
          <desc id="plD">Três degraus em pódio: padrão-ouro urina de 24 horas, operacional relação proteína/creatinina, triagem fita urinária.</desc>
          <!-- 1º lugar: 24h -->
          <g transform="translate(180,82)">
            <rect width="160" height="150" rx="10" fill="url(#hdtRose)" opacity=".22" stroke="#d6406b" stroke-width="1.6"/>
            <text x="80" y="32" text-anchor="middle" font-size="13" font-weight="800" fill="#7a1f3d">Urina 24h</text>
            <text x="80" y="52" text-anchor="middle" font-size="11" fill="#7a1f3d">PADRÃO-OURO</text>
            <text x="80" y="78" text-anchor="middle" font-size="14" font-weight="800" fill="#7a1f3d">≥300 mg</text>
            <text x="80" y="100" text-anchor="middle" font-size="9.5" fill="#7a1f3d">resultado em 24h</text>
            <text x="80" y="124" text-anchor="middle" font-size="9.5" fill="#7a1f3d">ambulatório estável</text>
          </g>
          <!-- 2º lugar: P/Cr -->
          <g transform="translate(40,124)">
            <rect width="120" height="108" rx="10" fill="#5b3bd1" fill-opacity=".18" stroke="#5b3bd1" stroke-width="1.6"/>
            <text x="60" y="26" text-anchor="middle" font-size="12" font-weight="800" fill="#3a2a8a">P/Cr</text>
            <text x="60" y="46" text-anchor="middle" font-size="10" fill="#3a2a8a">OPERACIONAL</text>
            <text x="60" y="68" text-anchor="middle" font-size="13" font-weight="800" fill="#3a2a8a">≥0,3</text>
            <text x="60" y="86" text-anchor="middle" font-size="9.5" fill="#3a2a8a">resultado em horas</text>
          </g>
          <!-- 3º lugar: fita -->
          <g transform="translate(360,160)">
            <rect width="120" height="72" rx="10" fill="#b47d18" fill-opacity=".18" stroke="#b47d18" stroke-width="1.6"/>
            <text x="60" y="22" text-anchor="middle" font-size="12" font-weight="800" fill="#7a5210">Fita</text>
            <text x="60" y="36" text-anchor="middle" font-size="10" fill="#7a5210">TRIAGEM</text>
            <text x="60" y="56" text-anchor="middle" font-size="11" font-weight="800" fill="#7a5210">≥1+</text>
          </g>
          <text x="260" y="32" text-anchor="middle" font-size="11" fill="#44546f" font-weight="700">Hierarquia · maior = melhor evidência</text>
          <text x="260" y="50" text-anchor="middle" font-size="10" fill="#44546f">Falsos da fita: positivo (concentrada) · negativo (diluída)</text>
        </svg>
      </div>

      <div class="card" data-component="ProteinuriaLab" data-implemented="1">
        <span class="kicker">Interação</span>
        <h3>Cenário clínico × exame</h3>
        <p class="text-sm muted">Escolha o cenário e o sistema indica qual exame pedir e por quê.</p>
        <div class="pl-scenarios">
          <button class="pl-scenario btn ghost" data-scenario="amb_estavel">Ambulatório · paciente estável</button>
          <button class="pl-scenario btn ghost" data-scenario="amb_pressa">Ambulatório · resultado em horas</button>
          <button class="pl-scenario btn ghost" data-scenario="emergencia">Emergência · PA grave / sintomas</button>
          <button class="pl-scenario btn ghost" data-scenario="triagem">Triagem inicial em consulta</button>
        </div>
        <div class="pl-output" style="margin-top:12px"></div>
      </div>
    </div>

    <div class="grid cols-2" style="margin-top:18px">
      <div class="card">
        <span class="kicker k-rose">O que a banca quer</span>
        <h3>Hierarquia, pontos de corte e armadilhas</h3>
        <p><b>Urina de 24 horas</b> é o método de referência: requer coleta perfeita (descartar 1ª urina, coletar todas as outras inclusive a primeira do dia seguinte). Ponto de corte: ≥300 mg/24h é proteinúria significativa, ponto que confirma critério clássico de pré-eclâmpsia. Limitação: tempo. Não serve para emergência.</p>
        <p><b>Relação proteína/creatinina (P/Cr)</b> em amostra única simples. Ponto de corte: ≥0,3 sugere proteinúria significativa. É o exame operacional moderno: rápido, confiável o suficiente para decisão clínica, especialmente útil em emergência.</p>
        <p><b>Fita urinária</b> é triagem grosseira. ≥1+ é sugestivo, mas tem alta taxa de falso-positivo (urina concentrada — desidratação) e falso-negativo (urina diluída — hidratação). Resultado positivo na fita SEMPRE pede confirmação por método quantitativo (P/Cr ou 24h).</p>
        <p><b>Não esqueça:</b> proteinúria não é mais obrigatória para fechar pré-eclâmpsia. Lesão sistêmica em qualquer eixo (rim, pulmão, fígado, plaqueta, cérebro/visão) faz o mesmo serviço.</p>
      </div>

      <div class="card">
        <span class="kicker k-amber">Não confunda</span>
        <h3>Outros métodos e detalhes</h3>
        <ul class="list">
          <li><b>Microalbuminúria</b> não é o exame da pré-eclâmpsia. Pertence à nefropatia diabética e ao rastreio de doença renal crônica.</li>
          <li><b>Eletroforese de proteínas urinárias</b> ajuda em diferenciais nefrológicos (mieloma, doença glomerular específica), não no rastreio rotineiro de PE.</li>
          <li><b>Proteinúria postural / ortostática</b> existe e pode confundir em jovens — mas é raríssima em gestante.</li>
          <li><b>Contaminação por sangue ou descarga vaginal</b> falso-positiva fita e P/Cr. Coleta limpa de jato médio.</li>
          <li><b>Massagem do bebê / contração uterina forte recente</b> pode aumentar transitoriamente a proteinúria. Repetir em momento neutro.</li>
        </ul>

        <hr style="border:none;border-top:1px solid var(--border);margin:14px 0">

        <span class="kicker k-info">Mnemônico</span>
        <p class="go-mnemonic">"Proteinúria ajuda, mas não manda sozinha."</p>
      </div>
    </div>

    <div class="page-dock">
      <a class="dock-link" href="#preeclampsia-diagnostico"><small>Anterior</small>← PE · diagnóstico</a>
      <a class="dock-link next" href="#rastreio-preeclampsia"><small>Próximo</small>Rastreio de pré-eclâmpsia →</a>
    </div>
  </section>
  `);

  /* ===================== 06 · RASTREIO DE PE ===================== */
  inject(`
  <section class="section" data-id="rastreio-preeclampsia">
    <div class="page-header">
      <div class="ph-meta">
        <span class="kicker k-rose">Hipertensão & pré-eclâmpsia · página 06</span>
        <h1>Rastreio de pré-eclâmpsia</h1>
        <p class="lead">Quem é alto risco antes da doença aparecer. O rastreio se faz em quatro camadas — clínica, PA, Doppler e biomarcadores — e o construtor de risco abaixo combina os fatores em um score que indica prevenção.</p>
        <div class="hero-tags" style="margin-top:10px">
          <span class="relevance-tag r-atualizacao">atualização</span>
          <span class="relevance-tag r-aprofundamento">aprofundamento</span>
        </div>
      </div>
    </div>

    <div class="q-central"><span class="q-icon">?</span><p>Quem é alto risco antes da doença aparecer — e quais marcadores devem entrar no rastreio?</p></div>

    <div class="grid cols-2">
      <div class="card glass go-svg-card">
        <span class="kicker k-rose">Visual</span>
        <h3>Painel de predição em 4 camadas</h3>
        <svg viewBox="0 0 520 320" role="img" class="go-svg">
          <title>Rastreio de pré-eclâmpsia em 4 camadas</title>
          <desc>Camadas de rastreio: clínica, PA, Doppler de artéria uterina e oftálmica, biomarcadores PAPP-A e PLGF.</desc>
          <g transform="translate(20,28)">
            <rect width="480" height="48" rx="10" fill="#5b3bd1" fill-opacity=".18" stroke="#5b3bd1" stroke-width="1.6"/>
            <text x="240" y="30" text-anchor="middle" font-size="13" font-weight="800" fill="#3a2a8a">Camada 1 · Clínica (anamnese)</text>
          </g>
          <g transform="translate(20,90)">
            <rect width="480" height="48" rx="10" fill="#1d57bb" fill-opacity=".16" stroke="#1d57bb" stroke-width="1.6"/>
            <text x="240" y="30" text-anchor="middle" font-size="13" font-weight="800" fill="#14418f">Camada 2 · Pressão arterial seriada</text>
          </g>
          <g transform="translate(20,152)">
            <rect width="480" height="48" rx="10" fill="#0a8a6b" fill-opacity=".18" stroke="#0a8a6b" stroke-width="1.6"/>
            <text x="240" y="30" text-anchor="middle" font-size="13" font-weight="800" fill="#066c4a">Camada 3 · Doppler uterino + oftálmica</text>
          </g>
          <g transform="translate(20,214)">
            <rect width="480" height="48" rx="10" fill="#b47d18" fill-opacity=".18" stroke="#b47d18" stroke-width="1.6"/>
            <text x="240" y="30" text-anchor="middle" font-size="13" font-weight="800" fill="#7a5210">Camada 4 · Biomarcadores (PAPP-A, PLGF)</text>
          </g>
          <g font-size="10" fill="#44546f">
            <rect x="20" y="276" width="480" height="34" rx="8" fill="none" stroke="#cdd5e0" stroke-dasharray="3 3"/>
            <text x="32" y="296" font-weight="700" fill="#7a1f3d">Combinação &gt; isolado</text>
            <text x="170" y="296">Nenhum marcador isolado é suficiente — combinar camadas eleva acurácia.</text>
          </g>
        </svg>
      </div>

      <div class="card" data-component="PreeclampsiaScreeningBuilder" data-implemented="1">
        <span class="kicker">Interação</span>
        <h3>Construtor de risco</h3>
        <p class="text-sm muted">Marque os fatores presentes; o sistema classifica risco basal × intermediário × alto e indica prevenção.</p>
        <div class="psb-grid">
          <label><input type="checkbox" data-risk="has_cronica" data-weight="2"> HAS crônica</label>
          <label><input type="checkbox" data-risk="dm_previo" data-weight="2"> Diabetes prévio</label>
          <label><input type="checkbox" data-risk="les" data-weight="2"> LES</label>
          <label><input type="checkbox" data-risk="saf" data-weight="2"> SAF</label>
          <label><input type="checkbox" data-risk="pe_anterior" data-weight="3"> PE em gestação anterior</label>
          <label><input type="checkbox" data-risk="gemelar" data-weight="2"> Gestação gemelar</label>
          <label><input type="checkbox" data-risk="fiv" data-weight="1"> Reprodução assistida (FIV)</label>
          <label><input type="checkbox" data-risk="primigesta" data-weight="1"> Primigesta</label>
          <label><input type="checkbox" data-risk="idade" data-weight="1"> Idade ≥35 anos</label>
          <label><input type="checkbox" data-risk="obesidade" data-weight="1"> Obesidade (IMC ≥30)</label>
          <label><input type="checkbox" data-risk="doppler" data-weight="2"> Incisura bilateral persistente (Doppler uterino)</label>
        </div>
        <div class="psb-output" style="margin-top:12px"></div>
      </div>
    </div>

    <div class="grid cols-2" style="margin-top:18px">
      <div class="card">
        <span class="kicker k-rose">O que a banca quer</span>
        <h3>O que pesa em cada camada</h3>
        <p><b>Camada 1 · Clínica.</b> História prévia de pré-eclâmpsia, hipertensão crônica, diabetes prévio, LES, SAF, gemelaridade, reprodução assistida, primigesta, idade ≥35, obesidade, raça, intervalo interpartal curto. Pré-eclâmpsia em gestação anterior é o fator clínico de maior peso.</p>
        <p><b>Camada 2 · PA.</b> Aferição em todas as consultas, com técnica adequada. Pacientes com PA limítrofe (130–139/85–89) já merecem acompanhamento mais próximo.</p>
        <p><b>Camada 3 · Doppler.</b> O <b>Doppler de artérias uterinas</b> entre 22 e 24 semanas detecta resistência aumentada e a chamada <b>incisura bilateral persistente</b>, que reflete falha de invasão trofoblástica. O <b>Doppler de artéria oftálmica</b> avalia fluxo cerebral periférico e é uma das atualizações recentes — útil mais como adjuvante.</p>
        <p><b>Camada 4 · Biomarcadores.</b> <b>PAPP-A</b> baixa no primeiro trimestre e <b>PLGF</b> (fator de crescimento placentário) baixo no 2º trimestre indicam disfunção placentária e elevam risco. Não há consenso universal para uso isolado — combinação com camadas anteriores eleva acurácia.</p>
      </div>

      <div class="card">
        <span class="kicker k-amber">Pegadinhas</span>
        <h3>Detalhes que decidem o gabarito</h3>
        <ul class="list">
          <li><b>"PE em gestação anterior"</b> é o fator clínico isolado de maior peso — sozinho já indica AAS profilático.</li>
          <li><b>"Incisura bilateral persistente após 22–24 semanas"</b>: reforça risco. Antes de 22 semanas a incisura ainda pode ser fisiológica.</li>
          <li><b>"PLGF baixo + PAPP-A baixa"</b> em primigesta jovem: combinação que pesa.</li>
          <li><b>"Reprodução assistida"</b> conta como fator, mas peso menor que PE prévia ou comorbidade clássica.</li>
          <li><b>Não confundir</b> rastreio de pré-eclâmpsia com rastreio de cromossomopatia (translucência nucal, β-HCG livre, PAPP-A) — embora compartilhem PAPP-A.</li>
        </ul>

        <hr style="border:none;border-top:1px solid var(--border);margin:14px 0">

        <span class="kicker k-info">Atualização</span>
        <p class="text-sm">O <b>Doppler de artéria oftálmica</b> entrou nas atualizações como ferramenta complementar — fluxo cerebral periférico aumentado pode predizer pré-eclâmpsia em fases mais tardias.</p>
      </div>
    </div>

    <div class="page-dock">
      <a class="dock-link" href="#proteinuria"><small>Anterior</small>← Proteinúria</a>
      <a class="dock-link next" href="#prevencao-aas-calcio"><small>Próximo</small>Prevenção · AAS e cálcio →</a>
    </div>
  </section>
  `);

  /* ===================== 07 · PREVENÇÃO ===================== */
  inject(`
  <section class="section" data-id="prevencao-aas-calcio">
    <div class="page-header">
      <div class="ph-meta">
        <span class="kicker k-rose">Hipertensão & pré-eclâmpsia · página 07</span>
        <h1>Prevenção · atividade física, AAS e cálcio</h1>
        <p class="lead">Quando é prevenção, quando é tratamento e quando a banca muda a regra. Aqui mora a controvérsia <b>FEBRASGO × Ministério da Saúde</b> sobre o cálcio — você responde pela referência citada na questão.</p>
        <div class="hero-tags" style="margin-top:10px">
          <span class="relevance-tag r-atualizacao">atualização</span>
          <span class="relevance-tag r-pegadinha">pegadinha</span>
        </div>
      </div>
    </div>

    <div class="q-central"><span class="q-icon">?</span><p>Quando é prevenção, quando é tratamento e quando a banca muda a regra (FEBRASGO × Ministério da Saúde)?</p></div>

    <div class="grid cols-2">
      <div class="card glass go-svg-card">
        <span class="kicker k-rose">Visual</span>
        <h3>4 cards comparativos · prevenção</h3>
        <div class="go-prev-cards">
          <div class="go-prev-card go-prev-1">
            <span class="kicker">Atividade física</span>
            <h4>Comportamental</h4>
            <p>Regular, adaptada à gestação. Reduz risco geral cardiovascular e ganho excessivo de peso. Segura na maioria das gestantes sem complicações.</p>
          </div>
          <div class="go-prev-card go-prev-2">
            <span class="kicker">AAS 100–150 mg</span>
            <h4>12–16 sem · até 36 sem</h4>
            <p>Profilaxia <b>em alto risco</b>. Janela crítica: iniciar entre 12 e 16 semanas. Após 16 semanas perde efeito profilático para PE.</p>
          </div>
          <div class="go-prev-card go-prev-3">
            <span class="kicker">Cálcio 1 g</span>
            <h4>Baixa ingesta</h4>
            <p>Carbonato de cálcio 1.250 mg ≅ 500 mg de cálcio elementar — <b>2 comprimidos</b> para 1 g. Não tomar junto com ferro (competição de absorção).</p>
          </div>
          <div class="go-prev-card go-prev-4 go-prev-controv">
            <span class="kicker k-amber">Controvérsia</span>
            <h4>FEBRASGO × MS</h4>
            <p>FEBRASGO atualizou: cálcio só em alto risco com baixa ingesta. MS mantém recomendação ampla. <b>Resolva pela referência citada</b>.</p>
          </div>
        </div>
      </div>

      <div class="card" data-component="PreventionControversyPanel" data-implemented="1">
        <span class="kicker">Interação</span>
        <h3>Simulador de banca</h3>
        <p class="text-sm muted">Escolha a referência citada na questão; o sistema entrega a conduta esperada.</p>
        <div class="pcp-benches">
          <button class="pcp-bench btn ghost" data-bench="ms">Ministério da Saúde</button>
          <button class="pcp-bench btn ghost" data-bench="febrasgo">FEBRASGO (atual)</button>
          <button class="pcp-bench btn ghost" data-bench="evidencia">Evidências atuais</button>
          <button class="pcp-bench btn ghost" data-bench="sem_ref">Sem referência explícita</button>
        </div>
        <div class="pcp-output" style="margin-top:12px"></div>
      </div>
    </div>

    <div class="grid cols-2" style="margin-top:18px">
      <div class="card">
        <span class="kicker k-rose">O que a banca quer</span>
        <h3>Doses, janelas e racional</h3>
        <p><b>Atividade física.</b> Recomendação universal — não há janela específica. Adapta-se à gestante, evita esportes de contato, hidratação reforçada. Reduz risco cardiovascular global e parece reduzir incidência de pré-eclâmpsia em alguns estudos. Não substitui AAS em alto risco.</p>
        <p><b>AAS (ácido acetilsalicílico) 100 a 150 mg/dia.</b> Profilaxia em pacientes com fator de risco clínico significativo (PE prévia, HAS crônica, DM prévio, LES, SAF, gemelaridade). Iniciar <b>entre 12 e 16 semanas</b> de gestação — esse é o período em que o trofoblasto invade as artérias espiraladas. Após 16 semanas, perde efeito profilático para pré-eclâmpsia (pode ainda ter outras indicações). Manter <b>até 36 semanas</b>.</p>
        <p><b>Cálcio 1 g/dia.</b> Carbonato de cálcio 1.250 mg ≅ 500 mg de cálcio elementar. Para 1 g de elementar/dia, dois comprimidos (geralmente 1 manhã + 1 noite). <b>Não administrar junto com ferro</b> — competem pela mesma via de absorção intestinal; espaçar pelo menos 2 horas.</p>
        <p><b>Controvérsia FEBRASGO × MS.</b> A FEBRASGO atualizou suas recomendações reduzindo a indicação rotineira de cálcio para gestantes com baixa ingesta documentada e/ou alto risco. O <b>Ministério da Saúde brasileiro</b> mantém recomendação mais ampla. Em prova: leia a referência citada e responda por ela. Quando a banca não cita, a alternativa que mencione "alto risco" ou "baixa ingesta" geralmente é a esperada.</p>
      </div>

      <div class="card">
        <span class="kicker k-amber">Pegadinhas e nuances</span>
        <h3>Detalhes que viram gabarito</h3>
        <ul class="list">
          <li><b>"AAS iniciado em 19 semanas perde efeito?"</b> Sim, para prevenção primária de pré-eclâmpsia. Após 16 semanas o trofoblasto já completou invasão — não há mais o que prevenir nessa fase.</li>
          <li><b>"AAS contraindica via vaginal?"</b> Não. AAS em dose profilática (100–150 mg/dia) não contraindica parto vaginal. Suspende-se idealmente 5 a 7 dias antes da cesárea programada para reduzir sangramento, mas em emergência pode ser feita com AAS em uso.</li>
          <li><b>"Pode tomar cálcio junto com ferro?"</b> NÃO. Espaçar pelo menos 2 horas.</li>
          <li><b>"Cálcio elementar"</b> é a quantidade real de cálcio absorvido — 1 g elementar é a meta. Carbonato 1.250 mg fornece 500 mg de elementar.</li>
          <li><b>"Heparina profilática"</b> é uma medicação que entra em quadros específicos (SAF, antecedentes trombóticos), não é prevenção rotineira de PE.</li>
          <li><b>"Vitamina E e C"</b> NÃO previnem pré-eclâmpsia — estudos antigos descartaram benefício e mostraram potencial dano.</li>
        </ul>

        <hr style="border:none;border-top:1px solid var(--border);margin:14px 0">

        <span class="kicker k-info">Mnemônicos</span>
        <p class="go-mnemonic">"AAS previne cedo; depois de 16 semanas perdeu o timing."</p>
        <p class="go-mnemonic">"Cálcio depende da referência: MS ainda cobra, FEBRASGO atualizou."</p>
      </div>
    </div>

    <div class="card" style="margin-top:18px" data-component="quiz" data-correct="b">
      <span class="kicker">Mini-quiz</span>
      <h3>Multípara com PE em gestação anterior</h3>
      <p>Gestante de 11 semanas, com pré-eclâmpsia grave em gestação anterior (parto prematuro de 32 semanas). Perguntada sobre prevenção. Qual conduta inicial?</p>
      <div class="quiz-options">
        <button data-k="a" data-why="Atividade física é universal, mas não é a principal medida em alto risco. AAS é o pilar.">A) Apenas atividade física</button>
        <button data-k="b" data-why="Correto. PE em gestação anterior é fator de alto risco — AAS 100–150 mg/dia entre 12 e 16 semanas até 36 sem é a profilaxia padrão. Cálcio entra conforme referência (MS amplo / FEBRASGO em alto risco com baixa ingesta).">B) AAS 100–150 mg/dia entre 12 e 16 sem até 36 sem (+ cálcio conforme referência)</button>
        <button data-k="c" data-why="Heparina profilática é para SAF ou trombofilias clínicas, não para prevenção rotineira de PE.">C) Heparina profilática</button>
        <button data-k="d" data-why="Vitamina E/C foram descartadas para prevenção de PE.">D) Vitamina E + C como antioxidantes</button>
      </div>
      <div class="quiz-feedback"></div>
    </div>

    <div class="page-dock">
      <a class="dock-link" href="#rastreio-preeclampsia"><small>Anterior</small>← Rastreio de PE</a>
      <a class="dock-link next" href="#criterios-gravidade"><small>Próximo</small>Critérios de gravidade →</a>
    </div>
  </section>
  `);

  /* ===================== 04 · PE · DIAGNÓSTICO ===================== */
  inject(`
  <section class="section" data-id="preeclampsia-diagnostico">
    <div class="page-header">
      <div class="ph-meta">
        <span class="kicker k-rose">Hipertensão & pré-eclâmpsia · página 04</span>
        <h1>Pré-eclâmpsia · diagnóstico clássico e sem proteinúria</h1>
        <p class="lead">Proteinúria deixou de ser obrigatória. Lesão sistêmica em qualquer um de cinco eixos (rim, pulmão, fígado, plaqueta, cérebro/visão) fecha pré-eclâmpsia mesmo com fita limpa. Esta página apresenta o painel multissistêmico e o checklist diagnóstico.</p>
        <div class="hero-tags" style="margin-top:10px">
          <span class="relevance-tag r-atualizacao">atualização</span>
          <span class="tag t-rose">multissistêmica</span>
        </div>
      </div>
    </div>

    <div class="q-central"><span class="q-icon">?</span><p>Quando a proteinúria deixou de ser obrigatória — e qual lesão sistêmica fecha o diagnóstico em seu lugar?</p></div>

    <div class="grid cols-2">
      <div class="card glass go-svg-card">
        <span class="kicker k-rose">Visual</span>
        <h3>Painel multissistêmico</h3>
        <svg viewBox="0 0 520 360" role="img" aria-labelledby="sicT sicD" class="go-svg">
          <title id="sicT">Painel multissistêmico da pré-eclâmpsia</title>
          <desc id="sicD">Silhueta central de gestante com cinco órgãos ao redor (rim, pulmão, fígado, plaqueta, cérebro/visão), cada um com seu critério laboratorial e clínico.</desc>
          <defs>
            <radialGradient id="sicCenter" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#d6406b" stop-opacity=".22"/><stop offset="1" stop-color="#d6406b" stop-opacity="0"/></radialGradient>
          </defs>
          <ellipse cx="260" cy="180" rx="160" ry="130" fill="url(#sicCenter)"/>
          <!-- gestante simplificada -->
          <g transform="translate(238,128)" stroke="#7a1f3d" stroke-width="2" fill="none">
            <circle cx="22" cy="14" r="12"/>
            <path d="M10 30 Q22 60 36 60" />
            <ellipse cx="32" cy="56" rx="18" ry="14" fill="#d6406b" fill-opacity=".25"/>
          </g>
          <!-- cérebro/visão (topo) -->
          <g transform="translate(220,32)" class="sic-org">
            <rect width="120" height="56" rx="10" fill="#fff" fill-opacity=".88" stroke="#5b3bd1" stroke-width="1.6"/>
            <text x="60" y="22" text-anchor="middle" font-size="11" font-weight="800" fill="#3a2a8a">Cérebro / visão</text>
            <text x="60" y="38" text-anchor="middle" font-size="9.5" fill="#3a2a8a">Cefaleia · escotomas</text>
            <text x="60" y="50" text-anchor="middle" font-size="9.5" fill="#3a2a8a">Hiperreflexia</text>
          </g>
          <!-- pulmão (esquerda) -->
          <g transform="translate(28,148)" class="sic-org">
            <rect width="120" height="56" rx="10" fill="#fff" fill-opacity=".88" stroke="#1d57bb" stroke-width="1.6"/>
            <text x="60" y="22" text-anchor="middle" font-size="11" font-weight="800" fill="#14418f">Pulmão</text>
            <text x="60" y="40" text-anchor="middle" font-size="9.5" fill="#14418f">Edema agudo de pulmão</text>
          </g>
          <!-- fígado (direita) -->
          <g transform="translate(372,148)" class="sic-org">
            <rect width="120" height="56" rx="10" fill="#fff" fill-opacity=".88" stroke="#b47d18" stroke-width="1.6"/>
            <text x="60" y="22" text-anchor="middle" font-size="11" font-weight="800" fill="#7a5210">Fígado</text>
            <text x="60" y="38" text-anchor="middle" font-size="9.5" fill="#7a5210">TGO ≥2×</text>
            <text x="60" y="50" text-anchor="middle" font-size="9.5" fill="#7a5210">Epigastralgia (Glisson)</text>
          </g>
          <!-- rim (esquerda baixo) -->
          <g transform="translate(60,260)" class="sic-org">
            <rect width="120" height="56" rx="10" fill="#fff" fill-opacity=".88" stroke="#0a8a6b" stroke-width="1.6"/>
            <text x="60" y="22" text-anchor="middle" font-size="11" font-weight="800" fill="#066c4a">Rim</text>
            <text x="60" y="38" text-anchor="middle" font-size="9.5" fill="#066c4a">Cr ↑ · oligúria</text>
            <text x="60" y="50" text-anchor="middle" font-size="9.5" fill="#066c4a">Proteinúria ≥300/24h</text>
          </g>
          <!-- plaqueta (direita baixo) -->
          <g transform="translate(340,260)" class="sic-org">
            <rect width="120" height="56" rx="10" fill="#fff" fill-opacity=".88" stroke="#d6406b" stroke-width="1.6"/>
            <text x="60" y="22" text-anchor="middle" font-size="11" font-weight="800" fill="#7a1f3d">Plaqueta</text>
            <text x="60" y="40" text-anchor="middle" font-size="9.5" fill="#7a1f3d">&lt;100.000</text>
          </g>
          <!-- conexões -->
          <g stroke="#7282a0" stroke-width="1" stroke-dasharray="3 3" fill="none" opacity=".6">
            <path d="M280 90 L260 130"/>
            <path d="M148 176 L240 168"/>
            <path d="M372 176 L290 170"/>
            <path d="M180 286 L240 196"/>
            <path d="M340 286 L290 200"/>
          </g>
        </svg>
        <p class="text-sm muted" style="margin-top:8px">Pré-eclâmpsia <b>não mora só no rim</b>. Qualquer eixo + PA fecha diagnóstico.</p>
      </div>

      <div class="card" data-component="SystemicInjuryChecklist" data-implemented="1">
        <span class="kicker">Interação</span>
        <h3>Checklist diagnóstico</h3>
        <p class="text-sm muted">Marque os critérios presentes; o sistema fecha (ou descarta) pré-eclâmpsia.</p>
        <div class="sic-grid">
          <label><input type="checkbox" data-criterion="pa20"> PA ≥140/90 após 20 sem (confirmada)</label>
          <label><input type="checkbox" data-criterion="proteinuria"> Proteinúria ≥300 mg/24h ou P/Cr ≥0,3</label>
          <label><input type="checkbox" data-criterion="eap"> Edema agudo de pulmão</label>
          <label><input type="checkbox" data-criterion="plaq"> Plaquetas &lt;100.000</label>
          <label><input type="checkbox" data-criterion="cre"> Creatinina elevada / oligúria</label>
          <label><input type="checkbox" data-criterion="tgo"> TGO ≥2× LSN</label>
          <label><input type="checkbox" data-criterion="cerebral"> Cefaleia persistente · escotomas · hiperreflexia · alteração visual</label>
        </div>
        <div class="sic-output" style="margin-top:10px"></div>
      </div>
    </div>

    <div class="grid cols-2" style="margin-top:18px">
      <div class="card">
        <span class="kicker k-rose">O que a banca quer</span>
        <h3>Os 6 critérios de lesão sistêmica</h3>
        <ol class="list" style="padding-left:20px">
          <li><b>Edema agudo de pulmão / cianose.</b> Dispneia súbita, crepitações em bases, saturação caindo. Confirmar com radiografia se possível, mas a clínica resolve.</li>
          <li><b>Plaquetopenia &lt;100.000.</b> Não é "qualquer queda"; é o limite que entra como critério. Lembrar do diferencial com HELLP (LDH ↑, esquizócitos, TGO ≥2×).</li>
          <li><b>Creatinina elevada.</b> Em geral, &gt;1,1 mg/dL ou dobro do basal. Oligúria também conta como sinal de gravidade.</li>
          <li><b>TGO ≥2× o limite superior.</b> Função hepática agredida. Epigastralgia em barra (cápsula de Glisson distendida) frequentemente acompanha.</li>
          <li><b>Sintomas cerebrais/visuais persistentes.</b> Cefaleia que não cede com analgesia comum, escotomas, alteração visual, hiperreflexia. Não é "qualquer dor de cabeça" — tem que ser persistente e progressiva.</li>
          <li><b>Iminência de eclâmpsia.</b> Tríade clássica: cefaleia + escotomas + epigastralgia. Sinaliza convulsão iminente — sulfato imediatamente.</li>
        </ol>
        <p class="muted text-sm"><b>Edema de membros inferiores</b> NÃO entra nessa lista. É fisiológico em até 80% das gestantes.</p>
      </div>

      <div class="card">
        <span class="kicker k-amber">Pegadinhas finas</span>
        <h3>Detalhes que viram gabarito</h3>
        <ul class="list">
          <li><b>Pré-eclâmpsia sem proteinúria existe.</b> Se a fita está limpa mas há plaqueta &lt;100k + PA + cefaleia persistente, fecha o diagnóstico. Essa é a atualização que mais cai.</li>
          <li><b>Proteinúria isolada não é PE.</b> Sem PA, proteinúria pode ser nefropatia primária (glomerulonefrite, infecção, contaminação). Confirme PA antes de assumir PE.</li>
          <li><b>HELLP pode ocorrer SEM hipertensão.</b> Se aparecer hemólise + TGO + plaquetopenia em gestante, considere HELLP mesmo com PA normal.</li>
          <li><b>Epigastralgia em PE é fígado, não estômago.</b> Não trate com IBP isolado — investigue função hepática e plaquetas.</li>
          <li><b>Hiperreflexia 4+</b> em gestante após 20 semanas é sinal cerebral de PE — chama mais atenção que cefaleia leve.</li>
        </ul>

        <hr style="border:none;border-top:1px solid var(--border);margin:14px 0">

        <span class="kicker k-info">Mnemônicos</span>
        <p class="go-mnemonic">"Pré-eclâmpsia não mora só no rim."</p>
        <p class="go-mnemonic">"EAP, plaqueta, rim, fígado e cérebro fecham PE sem proteinúria."</p>
      </div>
    </div>

    <div class="card" style="margin-top:18px" data-component="quiz" data-correct="c">
      <span class="kicker">Mini-quiz</span>
      <h3>Gestante de 32 semanas com cefaleia e PA 152/100</h3>
      <p>Multípara, sem comorbidades, traz cefaleia há 3 dias que não cede com analgésico comum. PA 152/100 confirmada. Fita urinária <b>negativa</b> para proteínas. Plaquetas 87.000. TGO normal. Função renal normal.</p>
      <div class="quiz-options">
        <button data-k="a" data-why="Não. Proteinúria não é mais obrigatória — plaquetopenia &lt;100k já fecha PE como critério de lesão sistêmica.">A) Hipertensão gestacional (sem PE)</button>
        <button data-k="b" data-why="HELLP requer hemólise (LDH ↑, esquizócitos) E elevação de transaminases (TGO ≥2×) E plaquetopenia. Aqui só temos plaquetopenia — falta hemólise e TGO.">B) Síndrome HELLP</button>
        <button data-k="c" data-why="Correto. PA elevada após 20 sem + lesão sistêmica (plaquetopenia &lt;100k + cefaleia persistente) fecha pré-eclâmpsia mesmo sem proteinúria. Essa é a atualização clássica que a banca cobra.">C) Pré-eclâmpsia sem proteinúria</button>
        <button data-k="d" data-why="Iminência exige a tríade cefaleia + escotomas + epigastralgia. Aqui só há cefaleia.">D) Iminência de eclâmpsia</button>
      </div>
      <div class="quiz-feedback"></div>
    </div>

    <div class="page-dock">
      <a class="dock-link" href="#cronica-vs-gestacional"><small>Anterior</small>← Crônica × pré-eclâmpsia × gestacional</a>
      <a class="dock-link next" href="#proteinuria"><small>Próximo</small>Proteinúria · 24h, P/Cr e fita →</a>
    </div>
  </section>
  `);

  /* ===================== 08 · CRITÉRIOS DE GRAVIDADE ===================== */
  inject(`
  <section class="section" data-id="criterios-gravidade">
    <div class="page-header">
      <div class="ph-meta">
        <span class="kicker k-rose">Hipertensão & pré-eclâmpsia · página 08</span>
        <h1>Critérios de gravidade</h1>
        <p class="lead">Quem precisa internar agora. O semáforo clínico abaixo separa em 3 níveis (vigilância ambulatorial / internação / urgência) e o painel de triagem decide entre sulfato, anti-hipertensivo IV e parto.</p>
        <div class="hero-tags" style="margin-top:10px"><span class="relevance-tag r-pegadinha">pegadinha</span></div>
      </div>
    </div>

    <div class="q-central"><span class="q-icon">?</span><p>Quem precisa internar agora — e qual achado decide entre vigilância ambulatorial, sulfato e parto?</p></div>

    <div class="grid cols-2">
      <div class="card glass go-svg-card">
        <span class="kicker k-rose">Visual</span>
        <h3>Semáforo clínico de gravidade</h3>
        <div class="go-semaphore">
          <div class="go-sem go-sem-ok">
            <span class="go-sem-bullet">●</span>
            <strong>Verde · ambulatório</strong>
            <p>PE sem critérios de gravidade. Vigilância seriada, anti-hipertensivo de manutenção se necessário, parto a termo.</p>
          </div>
          <div class="go-sem go-sem-warn">
            <span class="go-sem-bullet">●</span>
            <strong>Amarelo · internação</strong>
            <p>≥1 critério de gravidade. Internar, sulfato, anti-hipertensivo IV se PA ≥160/110, corticoide se &lt;34 sem.</p>
          </div>
          <div class="go-sem go-sem-danger">
            <span class="go-sem-bullet">●</span>
            <strong>Vermelho · urgência</strong>
            <p>Eclâmpsia, HELLP instável, EAP, iminência de eclâmpsia. Estabilizar e parto após estabilização.</p>
          </div>
        </div>
      </div>

      <div class="card" data-component="SeverityTriageBoard" data-implemented="1">
        <span class="kicker">Interação</span>
        <h3>Triagem · marque os achados</h3>
        <p class="text-sm muted">Marque os critérios presentes; o sistema decide entre ambulatório, internação, sulfato ou parto.</p>
        <div class="stb-grid">
          <label><input type="checkbox" data-severity="pa160"> PA ≥160/110 confirmada</label>
          <label><input type="checkbox" data-severity="eap"> Edema agudo de pulmão / cianose</label>
          <label><input type="checkbox" data-severity="cr"> Creatinina elevada / oligúria</label>
          <label><input type="checkbox" data-severity="tgo"> TGO ≥2× LSN</label>
          <label><input type="checkbox" data-severity="plaq"> Plaquetas &lt;100.000</label>
          <label><input type="checkbox" data-severity="cerebral"> Cefaleia persistente · escotomas · alteração visual</label>
          <label><input type="checkbox" data-severity="epigastralgia"> Epigastralgia em barra</label>
          <label><input type="checkbox" data-severity="iminencia"> Iminência de eclâmpsia (cefaleia + escotomas + epigastralgia)</label>
          <label><input type="checkbox" data-severity="hellp"> HELLP confirmada</label>
          <label><input type="checkbox" data-severity="eclampsia"> Eclâmpsia (convulsão tônico-clônica)</label>
        </div>
        <div class="stb-output" style="margin-top:12px"></div>
      </div>
    </div>

    <div class="grid cols-2" style="margin-top:18px">
      <div class="card">
        <span class="kicker k-rose">O que a banca quer</span>
        <h3>Os 9 critérios de gravidade</h3>
        <ol class="list" style="padding-left:20px">
          <li><b>PA ≥160/110 mmHg</b> confirmada em duas medidas com técnica adequada.</li>
          <li><b>Edema agudo de pulmão / cianose.</b> Dispneia súbita, crepitações em bases, saturação caindo.</li>
          <li><b>Creatinina elevada</b> (geralmente &gt;1,1 mg/dL ou dobro do basal). <b>Oligúria</b> (&lt;25 mL/h ou &lt;500 mL/24h) também conta.</li>
          <li><b>Transaminases ≥2× o limite superior</b> (TGO/AST e/ou TGP/ALT).</li>
          <li><b>Plaquetopenia &lt;100.000.</b></li>
          <li><b>Sintomas cerebrais/visuais persistentes.</b> Cefaleia que não cede com analgesia comum, escotomas, alteração visual, hiperreflexia 4+, alteração de consciência.</li>
          <li><b>Epigastralgia em barra</b> (cápsula de Glisson distendida) — confunde com gastrite, mas é fígado.</li>
          <li><b>Iminência de eclâmpsia.</b> Tríade cefaleia + escotomas + epigastralgia. Sulfato imediato.</li>
          <li><b>Eclâmpsia / HELLP.</b> Já estão no nível máximo — emergência.</li>
        </ol>
        <p class="muted text-sm"><b>Importante:</b> oligúria por si só não é diagnóstica de intoxicação por magnésio — ela é fator de RISCO para intoxicação porque o magnésio é eliminado pelo rim. Em uso de sulfato com oligúria, monitorar mais de perto.</p>
      </div>

      <div class="card">
        <span class="kicker k-amber">Pegadinhas</span>
        <h3>O que confunde os candidatos</h3>
        <ul class="list">
          <li><b>"PA 158/108 com cefaleia leve."</b> Não atinge o critério de PA grave (≥160/110), mas a cefaleia persistente já é critério isolado. Internar e considerar sulfato.</li>
          <li><b>"Plaqueta 102.000."</b> Não fecha critério (limite é &lt;100.000). Mas plaquetopenia em queda rápida em PE é alarme — repetir hemograma.</li>
          <li><b>"Edema generalizado em multípara"</b> sem outros achados: pode ser fisiológico exagerado. Não fecha gravidade isolado.</li>
          <li><b>"Cefaleia que cede com paracetamol."</b> Provavelmente não é cefaleia da PE — esta é persistente, progressiva e refratária a analgesia comum.</li>
          <li><b>"Epigastralgia que melhora com IBP."</b> Pode mascarar epigastralgia da PE — sempre solicitar TGO + plaquetas em gestante hipertensa com queixa epigástrica.</li>
        </ul>

        <hr style="border:none;border-top:1px solid var(--border);margin:14px 0">

        <span class="kicker k-info">Mnemônico</span>
        <p class="go-mnemonic">"Epigastralgia da PE é fígado, não estômago."</p>
      </div>
    </div>

    <div class="page-dock">
      <a class="dock-link" href="#prevencao-aas-calcio"><small>Anterior</small>← Prevenção · AAS e cálcio</a>
      <a class="dock-link next" href="#hellp-diferenciais"><small>Próximo</small>HELLP, epigastralgia e diferenciais →</a>
    </div>
  </section>
  `);

  /* ===================== 09 · HELLP E DIFERENCIAIS ===================== */
  inject(`
  <section class="section" data-id="hellp-diferenciais">
    <div class="page-header">
      <div class="ph-meta">
        <span class="kicker k-rose">Hipertensão & pré-eclâmpsia · página 09</span>
        <h1>HELLP, epigastralgia e diferenciais</h1>
        <p class="lead">Quando dor epigástrica não é estômago — e quando HELLP aparece sem hipertensão. Esta página apresenta o trio integrado fígado/plaqueta/hemólise e o classificador que separa HELLP de esteatose hepática aguda da gestação.</p>
        <div class="hero-tags" style="margin-top:10px">
          <span class="relevance-tag r-aprofundamento">aprofundamento</span>
          <span class="relevance-tag r-banca-grande">banca grande</span>
        </div>
      </div>
    </div>

    <div class="q-central"><span class="q-icon">?</span><p>Quando dor epigástrica não é estômago — e como diferenciar HELLP de esteatose hepática aguda da gestação?</p></div>

    <div class="grid cols-2">
      <div class="card glass go-svg-card">
        <span class="kicker k-rose">Visual</span>
        <h3>HELLP · trio integrado</h3>
        <div class="go-hellp-trio">
          <div class="go-hellp-org">
            <span class="kicker k-rose">H</span>
            <h4>Hemólise</h4>
            <ul class="list">
              <li>LDH &gt;600 U/L</li>
              <li>Esquizócitos no sangue periférico</li>
              <li>Bilirrubina total ≥1,2 mg/dL (fração indireta)</li>
              <li>Haptoglobina baixa (se disponível)</li>
            </ul>
          </div>
          <div class="go-hellp-org">
            <span class="kicker k-amber">EL</span>
            <h4>Enzimas hepáticas elevadas</h4>
            <ul class="list">
              <li>AST/TGO ≥2× LSN</li>
              <li>ALT/TGP elevada</li>
              <li>Distensão da cápsula de Glisson</li>
              <li>Risco raro: rotura hepática</li>
            </ul>
          </div>
          <div class="go-hellp-org">
            <span class="kicker k-rose">LP</span>
            <h4>Low platelets</h4>
            <ul class="list">
              <li>Plaquetas &lt;100.000</li>
              <li>Sangramento mucoso possível</li>
              <li>Risco de coagulopatia se queda rápida</li>
            </ul>
          </div>
        </div>
        <p class="text-sm muted" style="margin-top:8px">Os três pilares precisam estar presentes para HELLP. <b>Pode ocorrer SEM hipertensão.</b></p>
      </div>

      <div class="card" data-component="HELLPDifferentialPanel" data-implemented="1">
        <span class="kicker">Interação</span>
        <h3>Classificador · HELLP × esteatose × PE grave</h3>
        <p class="text-sm muted">Marque achados laboratoriais; o sistema separa os três quadros.</p>
        <div class="hdp-grid">
          <strong>Pista de HELLP</strong>
          <label><input type="checkbox" data-lab="ldh"> LDH &gt;600 / esquizócitos</label>
          <label><input type="checkbox" data-lab="tgo"> TGO ≥2× LSN</label>
          <label><input type="checkbox" data-lab="plaq"> Plaquetas &lt;100.000</label>
          <strong style="margin-top:8px">Pista de esteatose hepática aguda</strong>
          <label><input type="checkbox" data-lab="glic"> Hipoglicemia (&lt;60)</label>
          <label><input type="checkbox" data-lab="inr"> INR alargado / coagulopatia</label>
          <label><input type="checkbox" data-lab="amonia"> Hiperamonemia / encefalopatia</label>
        </div>
        <div class="hdp-output" style="margin-top:12px"></div>
      </div>
    </div>

    <div class="grid cols-2" style="margin-top:18px">
      <div class="card">
        <span class="kicker k-rose">O que a banca quer</span>
        <h3>HELLP · do diagnóstico ao parto</h3>
        <p>HELLP é o acrônimo de <b>Hemolysis, Elevated Liver enzymes, Low Platelets</b>. Os três pilares precisam estar presentes:</p>
        <ul class="list">
          <li><b>Hemólise:</b> LDH &gt;600 U/L, esquizócitos no esfregaço, bilirrubina total ≥1,2 mg/dL com predomínio de fração indireta (hemólise gera bilirrubina não conjugada).</li>
          <li><b>Enzimas hepáticas:</b> AST/TGO ≥2× o limite superior. ALT/TGP costuma acompanhar.</li>
          <li><b>Plaquetas &lt;100.000.</b></li>
        </ul>
        <p>Pode haver classificação por gravidade (Mississippi, Tennessee), mas o que cai em prova é a tríade laboratorial. Conduta: <b>internar, sulfato, anti-hipertensivo</b>; se &lt;34 semanas com mãe e feto estáveis, considerar <b>corticoide</b> e estabilização <b>curta</b> (24–48h) seguida de parto. Se ≥34 semanas ou instável, parto após estabilização.</p>
        <p><b>Epigastralgia em barra</b> reflete distensão da cápsula de Glisson — distensão hepática por edema/hemorragia subcapsular. Em casos extremos pode haver <b>rotura hepática</b>: dor súbita, instabilidade hemodinâmica, queda rápida de hematócrito. Mortalidade alta — laparotomia/embolização.</p>
      </div>

      <div class="card">
        <span class="kicker k-amber">Diferencial · esteatose hepática aguda da gestação</span>
        <h3>Quando o quadro é hepático, não placentário</h3>
        <p>A <b>esteatose hepática aguda da gestação</b> aparece geralmente no terceiro trimestre, com clínica que pode confundir com HELLP, mas tem assinatura laboratorial diferente:</p>
        <ul class="list">
          <li><b>Hipoglicemia</b> (&lt;60 mg/dL) — falência hepática real.</li>
          <li><b>Coagulopatia precoce</b> (INR alargado, TAP prolongado) por queda da síntese hepática de fatores.</li>
          <li><b>Hiperamonemia</b> e encefalopatia hepática.</li>
          <li><b>Plaquetas inicialmente normais</b> (caem depois).</li>
          <li><b>Hipertensão e proteinúria podem estar ausentes.</b></li>
        </ul>
        <p>Tratamento: <b>parto imediato</b> (a única medida que estanca o processo) + suporte hepático intensivo. Diferenciar de HELLP muda a urgência: na esteatose, o fígado está falindo de verdade; na HELLP, o fígado está agredido pela placenta.</p>

        <hr style="border:none;border-top:1px solid var(--border);margin:14px 0">

        <span class="kicker k-info">Mnemônico</span>
        <p class="go-mnemonic">"HELLP pede ajuda: Hemolysis, Liver, Low Platelets."</p>
      </div>
    </div>

    <div class="card" style="margin-top:18px" data-component="quiz" data-correct="b">
      <span class="kicker">Mini-quiz</span>
      <h3>Gestante de 35 sem com epigastralgia</h3>
      <p>PA 138/88 (controlada com metildopa). Epigastralgia em barra há 12h. Lab: TGO 220, plaquetas 78.000, LDH 850, esquizócitos no esfregaço, INR 1,1, glicemia 92.</p>
      <div class="quiz-options">
        <button data-k="a" data-why="A esteatose hepática aguda cursa com hipoglicemia e coagulopatia precoce. Aqui glicemia e INR estão normais.">A) Esteatose hepática aguda da gestação</button>
        <button data-k="b" data-why="Correto. Tríade clássica de HELLP: hemólise (LDH ↑, esquizócitos), enzimas (TGO 220 ≥2× LSN), plaquetopenia (78k). Pode ocorrer com PA controlada — não exclua pelo PA limítrofe.">B) Síndrome HELLP</button>
        <button data-k="c" data-why="Pode até haver gastrite, mas em gestante hipertensa com epigastralgia em barra a primeira hipótese é HELLP. Não trate apenas com IBP.">C) Gastrite refratária</button>
        <button data-k="d" data-why="Iminência exige tríade cefaleia + escotomas + epigastralgia, sem necessariamente ter os achados laboratoriais de hemólise/plaquetopenia.">D) Iminência de eclâmpsia isolada</button>
      </div>
      <div class="quiz-feedback"></div>
    </div>

    <div class="page-dock">
      <a class="dock-link" href="#criterios-gravidade"><small>Anterior</small>← Critérios de gravidade</a>
      <a class="dock-link next" href="#anti-hipertensivos"><small>Próximo</small>Anti-hipertensivos · manutenção × crise →</a>
    </div>
  </section>
  `);

  /* ===================== 10 · ANTI-HIPERTENSIVOS ===================== */
  inject(`
  <section class="section" data-id="anti-hipertensivos">
    <div class="page-header">
      <div class="ph-meta">
        <span class="kicker k-rose">Hipertensão & pré-eclâmpsia · página 10</span>
        <h1>Anti-hipertensivos · manutenção × crise</h1>
        <p class="lead">O remédio é para manutenção ou para crise — e quais são proibidos na gestação. A tabela abaixo separa por cenário; o simulador escolhe medicação conforme PA e contexto.</p>
      </div>
    </div>

    <div class="q-central"><span class="q-icon">?</span><p>O remédio é para manutenção ou para crise — e quais não pisam na gestação?</p></div>

    <div class="grid cols-2">
      <div class="card glass">
        <span class="kicker k-rose">Visual</span>
        <h3>Tabela premium · medicações por cenário</h3>
        <div class="go-meds-table">
          <table>
            <thead><tr><th>Medicação</th><th>Manutenção</th><th>Crise</th><th>Lactação</th></tr></thead>
            <tbody>
              <tr><td><b>Metildopa</b></td><td class="ok">✓ escolha</td><td>—</td><td class="warn">avaliar</td></tr>
              <tr><td><b>Nifedipina LP</b></td><td class="ok">✓ escolha</td><td>—</td><td class="ok">✓</td></tr>
              <tr><td><b>Nifedipina rápida</b></td><td>—</td><td class="ok">✓ escolha</td><td>—</td></tr>
              <tr><td><b>Hidralazina oral</b></td><td class="ok">✓</td><td>—</td><td class="ok">✓</td></tr>
              <tr><td><b>Hidralazina IV</b></td><td>—</td><td class="ok">✓ escolha</td><td>—</td></tr>
              <tr><td><b>Pindolol</b></td><td class="ok">✓</td><td>—</td><td class="ok">✓</td></tr>
              <tr><td><b>Labetalol</b></td><td class="ok">✓ (limitado no BR)</td><td class="ok">✓ (limitado no BR)</td><td class="ok">✓</td></tr>
              <tr><td><b>Hidroclorotiazida</b></td><td class="warn">manter se em uso</td><td>—</td><td class="ok">✓ doses baixas</td></tr>
              <tr><td><b>IECA</b></td><td class="danger">✗ proibido</td><td class="danger">✗</td><td class="ok">✓ (cap/enalapril)</td></tr>
              <tr><td><b>BRA</b></td><td class="danger">✗ proibido</td><td class="danger">✗</td><td class="warn">avaliar</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card" data-component="AntihypertensiveCrisisSimulator" data-implemented="1">
        <span class="kicker">Interação</span>
        <h3>Simulador · cenário → medicação</h3>
        <p class="text-sm muted">Escolha o cenário; o sistema sugere a classe e a meta de redução.</p>
        <div class="acs-scenarios">
          <button class="acs-scenario btn ghost" data-scenario="pa_150_100">PE leve · PA 150/100</button>
          <button class="acs-scenario btn ghost" data-scenario="pa_160_110">Crise · PA 160/110</button>
          <button class="acs-scenario btn ghost" data-scenario="cronica">Hipertensa crônica engravidando</button>
          <button class="acs-scenario btn ghost" data-scenario="pe_lactante">Lactação</button>
        </div>
        <div class="acs-output" style="margin-top:12px"></div>
      </div>
    </div>

    <div class="grid cols-2" style="margin-top:18px">
      <div class="card">
        <span class="kicker k-rose">O que a banca quer</span>
        <h3>Manutenção × crise · doses e metas</h3>
        <p><b>Manutenção</b> é o anti-hipertensivo do dia a dia, em pacientes com PE leve ou hipertensa crônica gestante:</p>
        <ul class="list">
          <li><b>Metildopa</b> 250–500 mg 3 a 4 vezes/dia. Segura, decades de experiência. Pode causar sonolência, hipotensão postural.</li>
          <li><b>Nifedipina LP (liberação prolongada)</b> 30–60 mg/dia. Bem tolerada.</li>
          <li><b>Hidralazina oral</b> 50 mg 3 a 4 vezes/dia. Útil quando outras classes não atingem alvo.</li>
          <li><b>Pindolol</b> (β-bloqueador com atividade simpaticomimética intrínseca) 5–10 mg 2 vezes/dia.</li>
          <li><b>Labetalol</b> teria papel, mas <b>disponibilidade limitada no Brasil</b>.</li>
        </ul>
        <p><b>Crise hipertensiva</b> (PA ≥160/110): drogas de ataque, via parenteral preferencial:</p>
        <ul class="list">
          <li><b>Hidralazina IV</b> 5 mg em bolus. Repetir a cada 20 minutos se necessário (até 4 doses, máximo 20 mg).</li>
          <li><b>Nifedipina rápida</b> 10 mg VO (via oral). Pode repetir após 30 minutos.</li>
        </ul>
        <p><b>Meta:</b> reduzir 15 a 25% da PA na primeira hora. <b>NÃO</b> derrubar a PA para 110/70 — risco de hipoperfusão placentária e fetal. Estabilizar em torno de 140–150/90–100.</p>
      </div>

      <div class="card">
        <span class="kicker k-amber">Pegadinhas</span>
        <h3>Detalhes que viram gabarito</h3>
        <ul class="list">
          <li><b>IECA e BRA são proibidos na gestação.</b> Causam oligohidrâmnio, malformação renal fetal, hipoplasia pulmonar e óbito. Suspender imediatamente ao confirmar gestação. Em pré-concepção, idealmente trocar antes de engravidar.</li>
          <li><b>Hidroclorotiazida</b> em hipertensa crônica que já fazia uso pode ser <b>mantida</b> conforme protocolo local — não tem dado robusto que contraindique se paciente bem controlada.</li>
          <li><b>Lactação</b> tem regra própria. <b>IECA (captopril, enalapril) são liberados na lactação</b> — diferente da gestação. Metildopa pode ter efeito depressivo em lactante. Nifedipina e hidralazina são compatíveis.</li>
          <li><b>"Atenolol"</b> é evitado em gestação (associado a restrição de crescimento).</li>
          <li><b>Não derrubar PA na crise:</b> queda abrupta para PA &lt;130/80 prejudica perfusão útero-placentária. Meta é redução de 15–25%, não normalização.</li>
        </ul>

        <hr style="border:none;border-top:1px solid var(--border);margin:14px 0">

        <span class="kicker k-info">Mnemônico</span>
        <p class="go-mnemonic">"Hidralazina venosa é crise; hidralazina oral é manutenção."</p>
      </div>
    </div>

    <div class="card" style="margin-top:18px" data-component="quiz" data-correct="b">
      <span class="kicker">Mini-quiz</span>
      <h3>Gestante de 30 sem com PA 168/112 mmHg na emergência</h3>
      <p>Cefaleia leve, sem outros sintomas. Sem uso prévio de anti-hipertensivo.</p>
      <div class="quiz-options">
        <button data-k="a" data-why="Captopril (IECA) é proibido na gestação.">A) Captopril 25 mg VO</button>
        <button data-k="b" data-why="Correto. Crise hipertensiva (≥160/110): hidralazina IV 5 mg, repetir a cada 20 min até 4 doses se necessário. Meta: reduzir 15–25% na primeira hora.">B) Hidralazina IV 5 mg, repetir até 4× se necessário</button>
        <button data-k="c" data-why="Furosemida não é a primeira escolha — só entra se houver edema agudo de pulmão associado.">C) Furosemida IV</button>
        <button data-k="d" data-why="Metildopa é manutenção, não crise. Em emergência hipertensiva, droga parenteral é a prioridade.">D) Metildopa 500 mg VO</button>
      </div>
      <div class="quiz-feedback"></div>
    </div>

    <div class="page-dock">
      <a class="dock-link" href="#hellp-diferenciais"><small>Anterior</small>← HELLP e diferenciais</a>
      <a class="dock-link next" href="#sulfato-magnesio"><small>Próximo</small>Sulfato de magnésio · Pritchard, Zuspan e 3 Rs →</a>
    </div>
  </section>
  `);

  /* ===================== 11 · SULFATO DE MAGNÉSIO ===================== */
  inject(`
  <section class="section" data-id="sulfato-magnesio">
    <div class="page-header">
      <div class="ph-meta">
        <span class="kicker k-rose">Hipertensão & pré-eclâmpsia · página 11</span>
        <h1>Sulfato de magnésio · Pritchard, Zuspan e 3 Rs</h1>
        <p class="lead">Quando o sulfato previne convulsão e quando ele intoxica. Aqui ficam o laboratório com os dois esquemas e o simulador dos 3 Rs (reflexo, respiração, rins) com o gluconato de cálcio como antídoto.</p>
        <div class="hero-tags" style="margin-top:10px"><span class="relevance-tag r-pegadinha">pegadinha</span></div>
      </div>
    </div>

    <div class="q-central"><span class="q-icon">?</span><p>Quando o sulfato previne convulsão — e quais são os três sinais que avisam toxicidade antes da parada?</p></div>

    <div class="grid cols-2">
      <div class="card glass" data-component="MagnesiumProtocolLab" data-implemented="1">
        <span class="kicker k-rose">Visual + Interação</span>
        <h3>Laboratório do magnésio · Pritchard × Zuspan</h3>
        <div class="mpl-tabs">
          <button class="mpl-tab" data-tab="pritchard">Esquema de Pritchard</button>
          <button class="mpl-tab" data-tab="zuspan">Esquema de Zuspan</button>
          <button class="mpl-tab" data-tab="recorrencia">Convulsão em uso</button>
        </div>
        <div class="mpl-pane" data-tab="pritchard">
          <h4>Pritchard · IV + IM</h4>
          <ul class="list">
            <li><b>Ataque:</b> 4 g IV (em 15–20 min, infusão lenta) + <b>10 g IM</b> (5 g em cada glúteo, com lidocaína).</li>
            <li><b>Manutenção:</b> 5 g IM de 4 em 4 horas, alternando glúteos.</li>
            <li><b>Quando usar:</b> transferência inter-hospitalar, ausência de bomba infusora.</li>
            <li><b>Quando evitar:</b> coagulopatia (HELLP avançado, plaquetas muito baixas) — IM pode causar hematoma.</li>
            <li><b>Mnemônico:</b> "Pritchard arde" (lembra do IM).</li>
          </ul>
        </div>
        <div class="mpl-pane" data-tab="zuspan" style="display:none">
          <h4>Zuspan · IV em bomba</h4>
          <ul class="list">
            <li><b>Ataque:</b> 4 g IV em 15–20 min.</li>
            <li><b>Manutenção:</b> <b>1 g/hora</b> em bomba infusora contínua.</li>
            <li><b>Quando usar:</b> hospital com bomba e equipe para monitorização contínua.</li>
            <li><b>Vantagem:</b> dose constante, fácil ajuste, evita IM em coagulopatia.</li>
          </ul>
        </div>
        <div class="mpl-pane" data-tab="recorrencia" style="display:none">
          <h4>Convulsão recorrente em uso de sulfato</h4>
          <ul class="list">
            <li><b>Dose:</b> 2 g IV (metade da dose de ataque).</li>
            <li><b>Avaliação:</b> dosar magnesemia se possível; pode ser necessário aumentar a manutenção.</li>
            <li><b>Considerar:</b> outras causas de convulsão (AVC, encefalopatia, hipoglicemia, distúrbio eletrolítico).</li>
          </ul>
        </div>
      </div>

      <div class="card" data-component="MagnesiumToxicitySimulator" data-implemented="1">
        <span class="kicker">Interação</span>
        <h3>Simulador dos 3 Rs · monitorização da toxicidade</h3>
        <p class="text-sm muted">Ajuste reflexo, FR e diurese; o sistema avisa quando suspender o sulfato.</p>

        <div class="mts-axis">
          <strong>Reflexo patelar</strong>
          <div class="mts-buttons">
            <button data-axis="reflexo" data-val="presente">Presente</button>
            <button data-axis="reflexo" data-val="abolido">Abolido</button>
          </div>
        </div>

        <div class="mts-axis">
          <strong>Frequência respiratória <span class="mts-fr-label">14 irpm</span></strong>
          <input type="range" data-axis="fr" min="6" max="22" value="14" step="1" aria-label="Frequência respiratória">
        </div>

        <div class="mts-axis">
          <strong>Diurese</strong>
          <div class="mts-buttons">
            <button data-axis="diurese" data-val="ok">Adequada (≥25 mL/h)</button>
            <button data-axis="diurese" data-val="oliguria">Oligúria</button>
          </div>
        </div>

        <div class="mts-output" style="margin-top:12px"></div>
      </div>
    </div>

    <div class="grid cols-2" style="margin-top:18px">
      <div class="card">
        <span class="kicker k-rose">O que a banca quer</span>
        <h3>Indicação, esquemas e segurança</h3>
        <p><b>Indicação do sulfato de magnésio:</b> pré-eclâmpsia <b>com gravidade</b>, eclâmpsia (durante e após a convulsão), iminência de eclâmpsia. Profilaxia da convulsão e da recorrência.</p>
        <p><b>Mecanismo:</b> bloqueia receptores NMDA cerebrais, estabiliza a membrana neuronal, reduz hiperexcitabilidade. Não é um anti-hipertensivo — não tira a doença, apenas previne convulsão. <b>Sulfato estabiliza convulsão; parto trata a pré-eclâmpsia.</b></p>
        <p><b>Esquema de Pritchard:</b> 4 g IV + 10 g IM (ataque); manutenção 5 g IM de 4/4h. Útil em transferência ou ausência de bomba. Mnemônico: <b>"Pritchard arde"</b>.</p>
        <p><b>Esquema de Zuspan:</b> 4 g IV (ataque); manutenção 1 g/h em bomba infusora. Preferível em hospital com bomba e equipe para monitorização contínua.</p>
        <p><b>Manutenção:</b> mantém-se durante o trabalho de parto, parto e por <b>24 horas após</b> o parto (ou após a última convulsão na eclâmpsia).</p>
        <p><b>Coagulopatia (HELLP, plaquetas muito baixas):</b> evitar Pritchard pelo IM (risco de hematoma); preferir Zuspan IV.</p>
      </div>

      <div class="card">
        <span class="kicker k-amber">Toxicidade · 3 Rs</span>
        <h3>Como reconhecer antes da parada</h3>
        <p>Os <b>3 Rs</b> são a régua de monitorização à beira do leito:</p>
        <ul class="list">
          <li><b>R1 · Reflexo patelar.</b> Deve estar PRESENTE durante o uso. Sua abolição é o primeiro sinal de toxicidade — suspender o sulfato imediatamente.</li>
          <li><b>R2 · Respiração.</b> FR ≥12 irpm. FR &lt;12 sugere depressão respiratória — suspender e ofertar suporte ventilatório se necessário.</li>
          <li><b>R3 · Rins / diurese.</b> ≥25 mL/h (ou ≥100 mL/4h). <b>Oligúria não é sinal de intoxicação por si só</b> — é fator de RISCO, porque o magnésio é eliminado pelo rim. Em uso com oligúria, monitorar mais de perto e ajustar dose.</li>
        </ul>
        <p><b>Antídoto:</b> <b>gluconato de cálcio 1 g IV lento</b> (10 mL a 10%, em 10 minutos). Reverte a depressão respiratória e neuromuscular induzida pelo magnésio.</p>

        <hr style="border:none;border-top:1px solid var(--border);margin:14px 0">

        <span class="kicker k-info">Mnemônicos</span>
        <p class="go-mnemonic">"Sulfato estabiliza convulsão; parto trata a pré-eclâmpsia."</p>
        <p class="go-mnemonic">"3 Rs: Reflexo, Respiração e Rins."</p>
        <p class="go-mnemonic">"Oligúria é risco de intoxicação, não sinal isolado."</p>
      </div>
    </div>

    <div class="card" style="margin-top:18px" data-component="quiz" data-correct="c">
      <span class="kicker">Mini-quiz</span>
      <h3>Eclâmpsia em uso de sulfato</h3>
      <p>Gestante em uso de sulfato (Zuspan 1 g/h) há 6 horas apresenta nova convulsão tônico-clônica generalizada. Qual a conduta imediata para a convulsão?</p>
      <div class="quiz-options">
        <button data-k="a" data-why="Diazepam não é primeira linha em eclâmpsia — sulfato é superior. Diazepam só se sulfato indisponível ou crise refratária após dose adicional.">A) Diazepam 10 mg IV</button>
        <button data-k="b" data-why="Não. Recorrência em uso de sulfato é justamente quando se faz dose adicional, e não suspender. Suspende-se apenas se há sinal de toxicidade (3 Rs).">B) Suspender sulfato imediatamente</button>
        <button data-k="c" data-why="Correto. Convulsão em uso de sulfato: dose adicional de 2 g IV (metade da dose de ataque). Em seguida, avaliar magnesemia e ajustar manutenção. Investigar outras causas se persistir.">C) Sulfato 2 g IV adicional (metade da dose de ataque)</button>
        <button data-k="d" data-why="Gluconato de cálcio é antídoto da toxicidade do magnésio (reflexo abolido, FR &lt;12). Aqui a paciente teve convulsão, não toxicidade — o reverso.">D) Gluconato de cálcio 1 g IV</button>
      </div>
      <div class="quiz-feedback"></div>
    </div>

    <div class="page-dock">
      <a class="dock-link" href="#anti-hipertensivos"><small>Anterior</small>← Anti-hipertensivos</a>
      <a class="dock-link next" href="#parto-preeclampsia"><small>Próximo</small>Conduta e momento do parto →</a>
    </div>
  </section>
  `);

  /* ===================== 12 · MOMENTO DO PARTO ===================== */
  inject(`
  <section class="section" data-id="parto-preeclampsia">
    <div class="page-header">
      <div class="ph-meta">
        <span class="kicker k-rose">Hipertensão & pré-eclâmpsia · página 12</span>
        <h1>Conduta e momento do parto na pré-eclâmpsia</h1>
        <p class="lead">Estabilizar é tratar — mas o tratamento definitivo da pré-eclâmpsia é o parto. O stepper abaixo combina idade gestacional, gravidade, HELLP e eclâmpsia para definir o momento e a via.</p>
      </div>
    </div>

    <div class="q-central"><span class="q-icon">?</span><p>Estabilizar é tratar? Ou tratar é parir? E em que semana cada gestante deve nascer?</p></div>

    <div class="grid cols-2">
      <div class="card glass" data-component="DeliveryTimingPreeclampsiaStepper" data-implemented="1">
        <span class="kicker k-rose">Visual + Interação</span>
        <h3>Stepper · idade gestacional × gravidade</h3>

        <div class="dtp-track">
          <div class="dtp-marks">
            <span class="dtp-mark" style="left:0%">24</span>
            <span class="dtp-mark" style="left:42%">34</span>
            <span class="dtp-mark" style="left:73%">37</span>
            <span class="dtp-mark" style="left:100%">42</span>
          </div>
          <div class="dtp-bar"></div>
          <div class="dtp-week-label" style="text-align:center;margin-top:8px;font-weight:700">32 semanas</div>
        </div>
        <input type="range" min="24" max="42" value="32" step="1" style="width:100%" aria-label="Idade gestacional">

        <div class="dtp-toggles">
          <button data-toggle="severe" type="button">Com gravidade</button>
          <button data-toggle="hellp" type="button">HELLP</button>
          <button data-toggle="eclampsia" type="button">Eclâmpsia</button>
          <button data-toggle="stable" type="button">Mãe e feto estáveis</button>
        </div>

        <div class="dtp-output" style="margin-top:12px"></div>
      </div>

      <div class="card">
        <span class="kicker k-rose">O que a banca quer</span>
        <h3>Decisão por idade e gravidade</h3>
        <ul class="list">
          <li><b>PE sem gravidade:</b> vigilância seriada, anti-hipertensivo se necessário, parto a termo (≥37 semanas).</li>
          <li><b>PE com gravidade &lt;34 semanas, mãe e feto estáveis:</b> internar, sulfato, anti-hipertensivo, <b>corticoide</b> para maturação pulmonar, <b>conduta conservadora</b> sob vigilância intensiva. Parto se piora materna ou fetal.</li>
          <li><b>PE com gravidade ≥34 semanas:</b> estabilizar e parto.</li>
          <li><b>Eclâmpsia:</b> estabilizar (sulfato, anti-hipertensivo, via aérea) e parto após estabilização, independentemente da idade gestacional.</li>
          <li><b>HELLP &lt;34 semanas, mãe e feto estáveis:</b> corticoide e conduta conservadora curta (24–48h), depois parto.</li>
          <li><b>HELLP ≥34 sem ou instável:</b> estabilizar e parto.</li>
        </ul>
        <p><b>Cesárea NÃO é automática.</b> Muitas pré-eclâmpsias podem nascer por via vaginal após estabilização. Cesárea por critério obstétrico (apresentação anômala, sofrimento fetal, falha de indução, condição materna que impeça trabalho de parto). <b>Estabilizar SEMPRE antes</b> de programar via.</p>
      </div>
    </div>

    <div class="grid cols-2" style="margin-top:18px">
      <div class="card">
        <span class="kicker k-amber">Pegadinhas</span>
        <h3>O que cai escondido</h3>
        <ul class="list">
          <li><b>"PE com gravidade em 34 semanas exatas."</b> Limite. Estabilizar e parto. Não conservar para tentar ganhar maturidade — risco materno supera benefício fetal a partir das 34 semanas completas.</li>
          <li><b>"PE com gravidade em 27 semanas, mãe estável."</b> Conservar com corticoide sob vigilância intensiva. Sulfato e anti-hipertensivo presentes. Parto se piora.</li>
          <li><b>"Cesárea programada na PE estável."</b> Não há indicação de cesárea pelo diagnóstico de PE. Pode-se induzir parto vaginal se condições obstétricas favoráveis.</li>
          <li><b>"Eclâmpsia em 28 semanas."</b> Estabilizar e parto após estabilização — não importa a idade gestacional. A vida da mãe vem antes da imaturidade fetal nessa equação.</li>
          <li><b>"HELLP em 26 semanas, paciente estável."</b> Caso conservador é exceção e exige UTI obstétrica — corticoide e parto em 24–48h.</li>
        </ul>
      </div>

      <div class="card">
        <span class="kicker k-info">Não confunda</span>
        <h3>Estabilização × indução × cesárea</h3>
        <p><b>Estabilizar</b> é o conjunto de ações que tornam o parto seguro: sulfato (prevenção/tratamento de convulsão), anti-hipertensivo (controle da PA), corticoide (maturação pulmonar fetal se &lt;34 sem), monitorização materna e fetal. <b>É um pré-requisito do parto, não um substituto.</b></p>
        <p><b>Induzir o parto</b> é provocar o trabalho de parto (com misoprostol, ocitocina, sonda de Foley etc.) com o objetivo de parto vaginal. Não é cesárea.</p>
        <p><b>Cesárea</b> é via cirúrgica, indicada por critério obstétrico (apresentação, sofrimento fetal, falha de indução, condição materna grave que impeça trabalho de parto). Não é decidida pelo diagnóstico de PE em si.</p>

        <hr style="border:none;border-top:1px solid var(--border);margin:14px 0">

        <span class="kicker k-info">Mnemônico</span>
        <p class="go-mnemonic">"Estabilizar é cuidar; parir é tratar."</p>
      </div>
    </div>

    <div class="page-dock">
      <a class="dock-link" href="#sulfato-magnesio"><small>Anterior</small>← Sulfato de magnésio</a>
      <a class="dock-link next" href="#puerperio-reclassificacao"><small>Próximo</small>Puerpério e reclassificação →</a>
    </div>
  </section>
  `);

  /* ===================== 13 · PUERPÉRIO E RECLASSIFICAÇÃO ===================== */
  inject(`
  <section class="section" data-id="puerperio-reclassificacao">
    <div class="page-header">
      <div class="ph-meta">
        <span class="kicker k-rose">Hipertensão & pré-eclâmpsia · página 13</span>
        <h1>Puerpério e reclassificação até 12 semanas</h1>
        <p class="lead">Quando a hipertensão da gestação vira hipertensão crônica. A linha do tempo cruza 12 semanas pós-parto — e a partir daí, a paciente recebe rótulo definitivo. A interação ajusta a conduta no puerpério.</p>
        <div class="hero-tags" style="margin-top:10px"><span class="relevance-tag r-aprofundamento">aprofundamento</span></div>
      </div>
    </div>

    <div class="q-central"><span class="q-icon">?</span><p>Quando a hipertensão da gestação vira hipertensão crônica — e quais medicações entram na lactação?</p></div>

    <div class="grid cols-2">
      <div class="card glass go-svg-card">
        <span class="kicker k-rose">Visual</span>
        <h3>Linha do tempo · gestação → 12 sem PP</h3>
        <svg viewBox="0 0 540 240" role="img" class="go-svg">
          <title>Linha do tempo puerperal</title>
          <desc>Linha de gestação até 12 semanas pós-parto, indicando quando a hipertensão deve resolver para ser classificada como gestacional ou pré-eclâmpsia. Persistência após 12 semanas reclassifica como hipertensão crônica.</desc>
          <line x1="40" y1="120" x2="500" y2="120" stroke="#7282a0" stroke-width="2"/>
          <!-- marcadores -->
          <g font-size="11" fill="#44546f" font-weight="700">
            <circle cx="80" cy="120" r="6" fill="#5b3bd1"/><text x="80" y="146" text-anchor="middle">Gestação</text>
            <circle cx="200" cy="120" r="6" fill="#d6406b"/><text x="200" y="146" text-anchor="middle">Parto</text>
            <circle cx="350" cy="120" r="6" fill="#b47d18"/><text x="350" y="146" text-anchor="middle">6 sem PP</text>
            <circle cx="470" cy="120" r="8" fill="#0a8a6b"/><text x="470" y="146" text-anchor="middle">12 sem PP</text>
          </g>
          <g font-size="10" fill="#44546f">
            <text x="80" y="100" text-anchor="middle">PA elevada</text>
            <text x="200" y="100" text-anchor="middle">Estabilização</text>
            <text x="350" y="100" text-anchor="middle">Reavaliação</text>
            <text x="470" y="100" text-anchor="middle">Limite definitivo</text>
          </g>
          <rect x="200" y="160" width="270" height="36" rx="8" fill="#0a8a6b" fill-opacity=".15" stroke="#0a8a6b" stroke-width="1.4"/>
          <text x="335" y="183" text-anchor="middle" font-size="11" font-weight="700" fill="#066c4a">JANELA DE RECLASSIFICAÇÃO (até 12 sem)</text>
          <text x="270" y="220" text-anchor="middle" font-size="10" fill="#44546f">Resolução: HAS gestacional ou PE confirmadas. Persistência: HAS crônica retroativamente.</text>
        </svg>
      </div>

      <div class="card" data-component="PuerperiumReclassificationTimeline" data-implemented="1">
        <span class="kicker">Interação</span>
        <h3>Classificador puerperal</h3>
        <p class="text-sm muted">Ajuste a semana pós-parto e o estado da PA; o sistema reclassifica.</p>

        <div class="prt-axis">
          <strong>Semana pós-parto · <span class="prt-week-label">6 semanas pós-parto</span></strong>
          <input type="range" min="0" max="20" value="6" step="1" aria-label="Semana puerperal" style="width:100%">
        </div>

        <div class="prt-axis" style="margin-top:8px">
          <strong>PA atual</strong>
          <div class="mts-buttons">
            <button data-pa="ok">Controlada (&lt;140/90)</button>
            <button data-pa="alta">Persistente (≥140/90)</button>
          </div>
        </div>

        <div class="prt-output" style="margin-top:12px"></div>
      </div>
    </div>

    <div class="grid cols-2" style="margin-top:18px">
      <div class="card">
        <span class="kicker k-rose">O que a banca quer</span>
        <h3>Reclassificação e seguimento</h3>
        <p>A janela das <b>12 semanas pós-parto</b> é o limite formal de reclassificação. Antes disso, a paciente é considerada em puerpério e a hipertensão pode ainda resolver. Depois disso, hipertensão persistente vira <b>hipertensão crônica retroativamente</b>: a paciente é hipertensa de fato, e o pré-natal só "destacou" a doença prévia.</p>
        <p><b>Hipertensão gestacional sem PE:</b> tipicamente resolve nas primeiras semanas de puerpério. Persistência aponta para HAS crônica não diagnosticada.</p>
        <p><b>Pré-eclâmpsia:</b> pode persistir além do parto. Anti-hipertensivos podem ser necessários por dias a semanas. Em alguns casos pode haver pré-eclâmpsia <b>de início pós-parto</b> (geralmente até 4 semanas) — mesmo critérios diagnósticos, mesma conduta.</p>
        <p><b>PE sobreposta:</b> hipertensa crônica que desenvolveu PE — pode ter PA mais difícil de controlar no puerpério, exige seguimento prolongado.</p>
        <p><b>Risco cardiovascular ao longo da vida:</b> mulheres com história de PE têm risco aumentado de hipertensão crônica, AVC e infarto futuros. <b>Rastreio cardiovascular periódico</b> é parte do seguimento.</p>
      </div>

      <div class="card">
        <span class="kicker k-amber">Lactação · medicações compatíveis</span>
        <h3>O que pode e o que evitar</h3>
        <ul class="list">
          <li><b>Compatíveis na lactação:</b> nifedipina, hidralazina, pindolol, propranolol (em doses baixas). <b>IECA (captopril, enalapril) são liberados na lactação</b> — diferente da gestação, onde são proibidos.</li>
          <li><b>Metildopa</b>: pode causar sonolência e potencial efeito depressivo no lactante; muitos protocolos preferem trocar no puerpério.</li>
          <li><b>Hidroclorotiazida</b> em doses baixas é compatível, mas pode reduzir produção de leite em doses altas.</li>
          <li><b>BRA (losartana, valsartana)</b>: dado limitado em lactação — preferir IECA quando precisar de bloqueio de SRAA no puerpério.</li>
          <li><b>"Nova convulsão no puerpério":</b> manter sulfato por 24h após a última convulsão ou parto. Se nova convulsão tardia, investigar AVC, encefalopatia hipertensiva, distúrbio eletrolítico.</li>
        </ul>

        <hr style="border:none;border-top:1px solid var(--border);margin:14px 0">

        <span class="kicker k-info">Mnemônico</span>
        <p class="go-mnemonic">"12 semanas pós-parto é a régua — depois dela, a hipertensão tem dono fixo."</p>
      </div>
    </div>

    <div class="page-dock">
      <a class="dock-link" href="#parto-preeclampsia"><small>Anterior</small>← Conduta e momento do parto</a>
      <a class="dock-link next" href="#hiperemese-vs-nausea"><small>Próximo</small>Náusea fisiológica × hiperêmese →</a>
    </div>
  </section>
  `);

})();
