/* =========================================================================
   GO PREMIUM · DOENÇAS CLÍNICAS NA GRAVIDEZ
   sections-3.js
   Bloco 4 · Gemelaridade            · 6 páginas (27 → 32)
   Bloco 5 · Revisão final integrada · 1 página  (33)
   -------------------------------------------------------------------------
   Placeholders premium da Fase 1C (Prompt 1). Conteúdo completo nos
   Prompts 2D (gemelaridade) e 2E (simulador final).
   ========================================================================= */

(function(){
  "use strict";
  if (typeof window.GORender !== "function") return;

  const root = document.getElementById("sectionRoot");
  function inject(html){
    if (!root) return;
    const wrap = document.createElement("div");
    wrap.innerHTML = html.trim();
    while (wrap.firstChild) root.appendChild(wrap.firstChild);
  }

  // ---------- Bloco 4 · Gemelaridade (6 páginas) — IMPLEMENTAÇÃO COMPLETA ----------

  /* ============== 27 · CLASSIFICAÇÃO · ZIGOTO × CÓRION × ÂMNIO ============== */
  inject(`
  <section class="section" data-id="gemelar-classificacao">
    <div class="page-header">
      <div class="ph-meta">
        <span class="kicker k-violet">Gemelaridade · página 27</span>
        <h1>Zigoticidade, corionicidade e amnionicidade</h1>
        <p class="lead">Dois placentas <b>não significam</b> dois zigotos. Esta página separa os três eixos (zigoto, córion, âmnio) e treina o que se pode afirmar a partir de cada achado — e onde a divisão precoce engana.</p>
        <div class="hero-tags" style="margin-top:10px"><span class="relevance-tag r-pegadinha">pegadinha</span></div>
      </div>
    </div>

    <div class="q-central"><span class="q-icon">?</span><p>Duas placentas significam dois zigotos — ou monozigoticidade pode esconder dois córions?</p></div>

    <div class="grid cols-2">
      <div class="card glass go-svg-card">
        <span class="kicker k-violet">Visual</span>
        <h3>Três eixos · zigoto × córion × âmnio</h3>
        <svg viewBox="0 0 540 320" role="img" class="go-svg">
          <title>Comparador zigoto, córion e âmnio</title>
          <desc>Três linhas horizontais com possíveis combinações entre zigoticidade, corionicidade e amnionicidade.</desc>
          <g font-size="12" font-weight="800" fill="#3a2a8a">
            <text x="20" y="40">Zigoticidade</text>
            <text x="20" y="140">Corionicidade</text>
            <text x="20" y="240">Amnionicidade</text>
          </g>
          <!-- Zigoticidade -->
          <g transform="translate(180,18)">
            <rect width="100" height="40" rx="8" fill="#5b3bd1" fill-opacity=".22" stroke="#5b3bd1" stroke-width="1.4"/>
            <text x="50" y="26" text-anchor="middle" font-size="11" font-weight="700" fill="#3a2a8a">Monozigótica</text>
          </g>
          <g transform="translate(300,18)">
            <rect width="100" height="40" rx="8" fill="#5b3bd1" fill-opacity=".22" stroke="#5b3bd1" stroke-width="1.4"/>
            <text x="50" y="26" text-anchor="middle" font-size="11" font-weight="700" fill="#3a2a8a">Dizigótica</text>
          </g>
          <g transform="translate(420,18)">
            <rect width="100" height="40" rx="8" fill="#5b3bd1" fill-opacity=".18" stroke="#5b3bd1" stroke-width="1.4"/>
            <text x="50" y="22" text-anchor="middle" font-size="10" font-weight="700" fill="#3a2a8a">Polizigótica</text>
            <text x="50" y="35" text-anchor="middle" font-size="9" fill="#3a2a8a">(≥3 zigotos)</text>
          </g>
          <!-- Corionicidade -->
          <g transform="translate(180,118)">
            <rect width="160" height="40" rx="8" fill="#0a8a6b" fill-opacity=".18" stroke="#0a8a6b" stroke-width="1.4"/>
            <text x="80" y="22" text-anchor="middle" font-size="11" font-weight="700" fill="#066c4a">Dicoriônica</text>
            <text x="80" y="34" text-anchor="middle" font-size="9" fill="#066c4a">(2 placentas ou 2 sacos)</text>
          </g>
          <g transform="translate(360,118)">
            <rect width="160" height="40" rx="8" fill="#d6406b" fill-opacity=".18" stroke="#d6406b" stroke-width="1.4"/>
            <text x="80" y="22" text-anchor="middle" font-size="11" font-weight="700" fill="#7a1f3d">Monocoriônica</text>
            <text x="80" y="34" text-anchor="middle" font-size="9" fill="#7a1f3d">(1 placenta)</text>
          </g>
          <!-- Amnionicidade -->
          <g transform="translate(180,218)">
            <rect width="160" height="40" rx="8" fill="#1d57bb" fill-opacity=".18" stroke="#1d57bb" stroke-width="1.4"/>
            <text x="80" y="22" text-anchor="middle" font-size="11" font-weight="700" fill="#14418f">Diamniótica</text>
            <text x="80" y="34" text-anchor="middle" font-size="9" fill="#14418f">(2 cavidades)</text>
          </g>
          <g transform="translate(360,218)">
            <rect width="160" height="40" rx="8" fill="#d6406b" fill-opacity=".22" stroke="#d6406b" stroke-width="1.4"/>
            <text x="80" y="22" text-anchor="middle" font-size="11" font-weight="700" fill="#7a1f3d">Monoamniótica</text>
            <text x="80" y="34" text-anchor="middle" font-size="9" fill="#7a1f3d">(1 cavidade · rara)</text>
          </g>
          <!-- nota inferior -->
          <text x="20" y="290" font-size="10" fill="#7282a0" font-style="italic">Toda dicoriônica é diamniótica · monocoriônica pode ser di ou monoamniótica · gêmeos conjugados não se separam</text>
          <text x="20" y="305" font-size="10" fill="#7a1f3d" font-weight="700">⚠ Dicoriônica monozigótica EXISTE (divisão até 72h) — não use placentas para inferir zigoticidade</text>
        </svg>
      </div>

      <div class="card" data-component="TwinClassificationMap" data-implemented="1">
        <span class="kicker">Interação</span>
        <h3>Seletor de achados</h3>
        <p class="text-sm muted">Marque os achados; o sistema diz o que se pode afirmar.</p>

        <div class="tcm-axis">
          <strong>Sexo dos fetos</strong>
          <div class="tcm-buttons">
            <button data-axis="sex" data-val="diferente">Diferentes</button>
            <button data-axis="sex" data-val="igual">Iguais</button>
          </div>
        </div>

        <div class="tcm-axis">
          <strong>Sacos gestacionais (USG 6–9 sem)</strong>
          <div class="tcm-buttons">
            <button data-axis="sacs" data-val="dois">Dois sacos</button>
            <button data-axis="sacs" data-val="um">Um saco</button>
          </div>
        </div>

        <div class="tcm-axis">
          <strong>Placentas (USG ou pós-parto)</strong>
          <div class="tcm-buttons">
            <button data-axis="placentas" data-val="duas">Duas placentas</button>
            <button data-axis="placentas" data-val="uma">Uma placenta</button>
          </div>
        </div>

        <div class="tcm-axis">
          <strong>Sinal na membrana (11–14 sem)</strong>
          <div class="tcm-buttons">
            <button data-axis="sign" data-val="lambda">Lambda / Y / twin peak</button>
            <button data-axis="sign" data-val="t">Sinal do T</button>
            <button data-axis="sign" data-val="ausente">Sem membrana visível</button>
          </div>
        </div>

        <div class="tcm-output" style="margin-top:12px"></div>
        <button class="btn ghost tcm-reset" type="button" style="margin-top:8px">Reiniciar</button>
      </div>
    </div>

    <div class="grid cols-2" style="margin-top:18px">
      <div class="card">
        <span class="kicker k-violet">O que a banca quer</span>
        <h3>Os três eixos · separados</h3>
        <p><b>Zigoticidade</b> = origem genética. Dois eixos:</p>
        <ul class="list">
          <li><b>Monozigótica</b>: um zigoto que se divide. Gêmeos idênticos, mesmo DNA, sempre mesmo sexo.</li>
          <li><b>Dizigótica</b>: dois zigotos (dois óvulos fecundados por dois espermatozoides). Gêmeos fraternos, DNA diferente, podem ter sexos diferentes.</li>
          <li><b>Polizigótica</b>: três ou mais zigotos.</li>
        </ul>
        <p><b>Corionicidade</b> = número de placentas (córions):</p>
        <ul class="list">
          <li><b>Dicoriônica</b>: dois córions. Pode ser por dois zigotos OU por um zigoto que se dividiu até 72h.</li>
          <li><b>Monocoriônica</b>: um córion. SEMPRE monozigótica (divisão entre 4 e 12 dias).</li>
        </ul>
        <p><b>Amnionicidade</b> = número de cavidades amnióticas:</p>
        <ul class="list">
          <li><b>Diamniótica</b>: duas cavidades.</li>
          <li><b>Monoamniótica</b>: uma única cavidade. Sempre monocoriônica (divisão entre 8 e 12 dias).</li>
        </ul>
        <p><b>Regras de inferência:</b></p>
        <ul class="list">
          <li>Sexos diferentes → dizigótica → dicoriônica e diamniótica (DEFINITIVO).</li>
          <li>Toda dicoriônica é diamniótica.</li>
          <li>Toda monoamniótica é monocoriônica.</li>
          <li>Dicoriônica NÃO prova dizigoticidade (divisão precoce engana).</li>
          <li>Monocoriônica → sempre monozigótica.</li>
        </ul>
      </div>

      <div class="card">
        <span class="kicker k-amber">Pegadinhas</span>
        <h3>Detalhes que viram gabarito</h3>
        <ul class="list">
          <li><b>"Duas placentas confirmam dois zigotos."</b> ERRADO. Pode ser monozigótica com divisão precoce (até 72h).</li>
          <li><b>"Sexos diferentes prova dicoriônica e diamniótica."</b> Verdadeiro — pela sequência: dizigótica → DC/DA.</li>
          <li><b>"Monocoriônica diamniótica é gemelar fraterna."</b> ERRADO. Toda monocoriônica é monozigótica (idêntica).</li>
          <li><b>"Gêmeos conjugados são monoamnióticos."</b> Verdadeiro — divisão após 12 dias.</li>
          <li><b>"Dicoriônica pode compartilhar membrana com aspecto monocoriônico após 14 sem."</b> Verdadeiro — placentas que se aproximam podem mascarar o sinal do lambda. USG precoce (6–9 sem) é mais confiável.</li>
        </ul>

        <hr style="border:none;border-top:1px solid var(--border);margin:14px 0">

        <span class="kicker k-info">Mnemônicos</span>
        <p class="go-mnemonic">"Dois placentas não provam dois zigotos."</p>
        <p class="go-mnemonic">"Dicoriônica é sempre diamniótica."</p>
      </div>
    </div>

    <div class="page-dock">
      <a class="dock-link" href="#diabetes-puerperio"><small>Anterior</small>← Puerpério no diabetes</a>
      <a class="dock-link next" href="#gemelar-divisao"><small>Próximo</small>Linha do tempo da divisão →</a>
    </div>
  </section>
  `);

  /* ============== 28 · LINHA DO TEMPO DA DIVISÃO ============== */
  inject(`
  <section class="section" data-id="gemelar-divisao">
    <div class="page-header">
      <div class="ph-meta">
        <span class="kicker k-violet">Gemelaridade · página 28</span>
        <h1>Linha do tempo da divisão gemelar</h1>
        <p class="lead">Quanto mais tarde divide, mais juntos ficam. O slider abaixo cobre os 14 dias da janela embrionária — e a partir do dia 12, surgem os gêmeos conjugados.</p>
        <div class="hero-tags" style="margin-top:10px"><span class="relevance-tag r-aprofundamento">aprofundamento</span></div>
      </div>
    </div>

    <div class="q-central"><span class="q-icon">?</span><p>Quanto mais tarde a divisão acontece, mais juntos os gêmeos ficam — e a partir de quando aparecem os conjugados?</p></div>

    <div class="grid cols-2">
      <div class="card glass go-svg-card">
        <span class="kicker k-violet">Visual</span>
        <h3>Timeline embrionária · 14 dias</h3>
        <svg viewBox="0 0 540 240" role="img" class="go-svg">
          <title>Timeline da divisão embrionária</title>
          <desc>Linha do dia 0 ao 14 com 4 janelas de divisão e suas consequências de corionicidade e amnionicidade.</desc>
          <line x1="40" y1="120" x2="500" y2="120" stroke="#7282a0" stroke-width="2"/>
          <!-- ≤72h DC/DA -->
          <rect x="40" y="80" width="100" height="80" rx="8" fill="#1d57bb" fill-opacity=".18" stroke="#1d57bb" stroke-width="1.4"/>
          <text x="90" y="100" text-anchor="middle" font-size="11" font-weight="800" fill="#14418f">≤ 3 dias</text>
          <text x="90" y="120" text-anchor="middle" font-size="11" font-weight="800" fill="#14418f">DC/DA</text>
          <text x="90" y="140" text-anchor="middle" font-size="9" fill="#14418f">risco baixo</text>
          <!-- 4-8d MC/DA -->
          <rect x="150" y="80" width="120" height="80" rx="8" fill="#b47d18" fill-opacity=".22" stroke="#b47d18" stroke-width="1.4"/>
          <text x="210" y="100" text-anchor="middle" font-size="11" font-weight="800" fill="#7a5210">4–8 dias</text>
          <text x="210" y="120" text-anchor="middle" font-size="11" font-weight="800" fill="#7a5210">MC/DA</text>
          <text x="210" y="140" text-anchor="middle" font-size="9" fill="#7a5210">TFF</text>
          <!-- 8-12d MC/MA -->
          <rect x="280" y="80" width="120" height="80" rx="8" fill="#d6406b" fill-opacity=".22" stroke="#d6406b" stroke-width="1.4"/>
          <text x="340" y="100" text-anchor="middle" font-size="11" font-weight="800" fill="#7a1f3d">8–12 dias</text>
          <text x="340" y="120" text-anchor="middle" font-size="11" font-weight="800" fill="#7a1f3d">MC/MA</text>
          <text x="340" y="140" text-anchor="middle" font-size="9" fill="#7a1f3d">enovelamento</text>
          <!-- >12d conjugados -->
          <rect x="410" y="80" width="90" height="80" rx="8" fill="#5b3bd1" fill-opacity=".25" stroke="#5b3bd1" stroke-width="1.4"/>
          <text x="455" y="100" text-anchor="middle" font-size="11" font-weight="800" fill="#3a2a8a">&gt;12 dias</text>
          <text x="455" y="120" text-anchor="middle" font-size="11" font-weight="800" fill="#3a2a8a">conjugados</text>
          <text x="455" y="140" text-anchor="middle" font-size="9" fill="#3a2a8a">cesárea</text>
          <!-- legenda -->
          <text x="270" y="200" text-anchor="middle" font-size="11" font-weight="700" fill="#7a1f3d">Quanto mais tarde divide, mais juntos ficam — e maior o risco</text>
        </svg>
      </div>

      <div class="card" data-component="EmbryoSplitTimeline" data-implemented="1">
        <span class="kicker">Interação</span>
        <h3>Slider · dia da divisão</h3>
        <p class="text-sm muted">Arraste o dia da divisão (1–15) para ver corionicidade, amnionicidade e principais riscos.</p>
        <div class="est-track">
          <div class="est-marks">
            <span class="est-mark" style="left:14%">3</span>
            <span class="est-mark" style="left:50%">8</span>
            <span class="est-mark" style="left:79%">12</span>
          </div>
          <div class="est-bar"></div>
          <div class="est-marker"></div>
        </div>
        <input type="range" min="1" max="15" value="6" step="1" aria-label="Dia da divisão" style="width:100%;margin-top:8px">
        <div class="est-output" style="margin-top:12px"></div>
      </div>
    </div>

    <div class="grid cols-2" style="margin-top:18px">
      <div class="card">
        <span class="kicker k-violet">O que a banca quer</span>
        <h3>4 janelas, 4 desfechos</h3>
        <ul class="list">
          <li><b>Até 72 horas (≤3 dias):</b> dicoriônica e diamniótica. Cada embrião ainda mantém capacidade de gerar seu próprio córion e seu próprio âmnio. <b>Risco mais baixo</b> entre as monozigóticas. Morfologicamente idêntica a uma DC/DA dizigótica — só DNA confirma zigoticidade.</li>
          <li><b>4 a 8 dias:</b> monocoriônica e diamniótica (MC/DA). Compartilham córion (uma placenta) mas têm cavidades amnióticas separadas. Forma <b>mais comum</b> de gemelar monocoriônica. <b>Risco principal: transfusão feto-fetal (TFF)</b>.</li>
          <li><b>8 a 12 dias:</b> monocoriônica e monoamniótica (MC/MA). Compartilham placenta E cavidade. Risco máximo de <b>enovelamento de cordão</b> e óbito intrauterino. Internação no 3º trimestre, cesárea 32–34 sem.</li>
          <li><b>Após 12 dias:</b> gêmeos conjugados (siameses). Não há separação completa do disco embrionário. Classificação por região de fusão (toracópagos, onfalópagos, craniópagos, pigópagos etc.). Cesárea sempre — idade gestacional individualizada.</li>
        </ul>
        <p><b>Por que importa?</b> A janela define o risco fetal e o protocolo de seguimento. Quanto mais tarde a divisão, mais próximos os fetos e maiores as complicações.</p>
      </div>

      <div class="card">
        <span class="kicker k-amber">Pegadinhas</span>
        <h3>O que a banca esconde</h3>
        <ul class="list">
          <li><b>"DC/DA é sempre dizigótica."</b> ERRADO — divisão até 72h gera DC/DA monozigótica.</li>
          <li><b>"Monocoriônica é sempre diamniótica."</b> ERRADO — pode ser monoamniótica (raro).</li>
          <li><b>"Gêmeos conjugados são monocoriônicos diamnióticos."</b> ERRADO — são monocoriônicos monoamnióticos com divisão incompleta.</li>
          <li><b>"Divisão no dia 7."</b> = MC/DA (forma mais comum).</li>
          <li><b>"Divisão no dia 14."</b> = conjugados (siameses).</li>
        </ul>

        <hr style="border:none;border-top:1px solid var(--border);margin:14px 0">

        <span class="kicker k-info">Mnemônico</span>
        <p class="go-mnemonic">"Quanto mais tarde divide, mais juntos ficam."</p>
      </div>
    </div>

    <div class="page-dock">
      <a class="dock-link" href="#gemelar-classificacao"><small>Anterior</small>← Classificação</a>
      <a class="dock-link next" href="#gemelar-ultrassom"><small>Próximo</small>Ultrassom · sacos, lambda, T →</a>
    </div>
  </section>
  `);

  /* ============== 29 · ULTRASSOM · SACOS, LAMBDA, T ============== */
  inject(`
  <section class="section" data-id="gemelar-ultrassom">
    <div class="page-header">
      <div class="ph-meta">
        <span class="kicker k-violet">Gemelaridade · página 29</span>
        <h1>Ultrassom gemelar · sacos, lambda, Y e T</h1>
        <p class="lead">Qual achado ultrassonográfico resolve a questão. O USG entre 6 e 9 semanas é o mais confiável para definir corionicidade; entre 11 e 14 semanas, os sinais lambda/Y/twin peak (DC) e T (MC/DA) confirmam.</p>
      </div>
    </div>

    <div class="q-central"><span class="q-icon">?</span><p>Qual achado ultrassonográfico resolve a questão da corionicidade — e em que idade gestacional ele é mais confiável?</p></div>

    <div class="grid cols-2">
      <div class="card glass go-svg-card">
        <span class="kicker k-violet">Visual</span>
        <h3>USG estilizado · sinais clássicos</h3>
        <svg viewBox="0 0 540 320" role="img" class="go-svg">
          <title>Ultrassom gemelar estilizado</title>
          <desc>Quatro painéis com sinais ultrassonográficos: dois sacos, um saco com sinal do T, sinal do lambda, sinal do T detalhado.</desc>
          <!-- Painel 1: 2 sacos -->
          <g transform="translate(20,20)">
            <rect width="240" height="120" rx="10" fill="#0e1a2c" stroke="#5b3bd1" stroke-width="1.4"/>
            <text x="120" y="20" text-anchor="middle" font-size="11" font-weight="800" fill="#b29aff">USG 6–9 sem · DC</text>
            <ellipse cx="80" cy="78" rx="40" ry="34" fill="none" stroke="#b29aff" stroke-width="1.4"/>
            <ellipse cx="170" cy="78" rx="40" ry="34" fill="none" stroke="#b29aff" stroke-width="1.4"/>
            <circle cx="80" cy="78" r="6" fill="#b29aff"/>
            <circle cx="170" cy="78" r="6" fill="#b29aff"/>
            <text x="120" y="115" text-anchor="middle" font-size="10" fill="#b29aff">2 sacos = dicoriônica</text>
          </g>
          <!-- Painel 2: 1 saco MC -->
          <g transform="translate(280,20)">
            <rect width="240" height="120" rx="10" fill="#0e1a2c" stroke="#d6406b" stroke-width="1.4"/>
            <text x="120" y="20" text-anchor="middle" font-size="11" font-weight="800" fill="#ff85a6">USG 6–9 sem · MC</text>
            <ellipse cx="120" cy="78" rx="80" ry="38" fill="none" stroke="#ff85a6" stroke-width="1.4"/>
            <circle cx="92" cy="78" r="6" fill="#ff85a6"/>
            <circle cx="148" cy="78" r="6" fill="#ff85a6"/>
            <text x="120" y="115" text-anchor="middle" font-size="10" fill="#ff85a6">1 saco = monocoriônica</text>
          </g>
          <!-- Painel 3: lambda -->
          <g transform="translate(20,160)">
            <rect width="240" height="140" rx="10" fill="#0e1a2c" stroke="#0a8a6b" stroke-width="1.4"/>
            <text x="120" y="20" text-anchor="middle" font-size="11" font-weight="800" fill="#38d6a8">11–14 sem · DC</text>
            <!-- placentas que se aproximam -->
            <path d="M30 130 Q30 70 80 50" fill="none" stroke="#38d6a8" stroke-width="3"/>
            <path d="M210 130 Q210 70 160 50" fill="none" stroke="#38d6a8" stroke-width="3"/>
            <!-- cunha (lambda) -->
            <polygon points="80,50 160,50 120,90" fill="#38d6a8" fill-opacity=".4" stroke="#38d6a8" stroke-width="1.4"/>
            <!-- membrana fina -->
            <line x1="120" y1="90" x2="120" y2="130" stroke="#38d6a8" stroke-width="1"/>
            <text x="120" y="125" text-anchor="middle" font-size="10" font-weight="700" fill="#38d6a8">sinal do lambda / Y / twin peak</text>
          </g>
          <!-- Painel 4: T -->
          <g transform="translate(280,160)">
            <rect width="240" height="140" rx="10" fill="#0e1a2c" stroke="#d6406b" stroke-width="1.4"/>
            <text x="120" y="20" text-anchor="middle" font-size="11" font-weight="800" fill="#ff85a6">11–14 sem · MC/DA</text>
            <!-- placenta única -->
            <path d="M30 130 Q120 50 210 130" fill="#ff85a6" fill-opacity=".22" stroke="#ff85a6" stroke-width="3"/>
            <!-- T -->
            <line x1="120" y1="90" x2="120" y2="125" stroke="#ff85a6" stroke-width="2"/>
            <line x1="80" y1="90" x2="160" y2="90" stroke="#ff85a6" stroke-width="2"/>
            <text x="120" y="115" text-anchor="middle" font-size="10" font-weight="700" fill="#ff85a6">sinal do T (perpendicular)</text>
          </g>
        </svg>
      </div>

      <div class="card" data-component="ChorionicityUltrasoundLab" data-implemented="1">
        <span class="kicker">Interação</span>
        <h3>Laboratório de imagem · clique nos achados</h3>
        <p class="text-sm muted">Cada achado abre a interpretação correspondente.</p>
        <div class="cul-grid">
          <button class="cul-finding btn ghost" data-finding="dois_sacos">2 sacos gestacionais (6–9 sem)</button>
          <button class="cul-finding btn ghost" data-finding="um_saco_2_vesiculas">1 saco + 2 vesículas vitelínicas</button>
          <button class="cul-finding btn ghost" data-finding="um_saco_1_vesicula">1 saco + 1 vesícula vitelínica</button>
          <button class="cul-finding btn ghost" data-finding="lambda">Sinal do lambda / Y / twin peak</button>
          <button class="cul-finding btn ghost" data-finding="t">Sinal do T</button>
          <button class="cul-finding btn ghost" data-finding="sem_membrana">Sem membrana intermediária</button>
        </div>
        <div class="cul-output" style="margin-top:12px"></div>
      </div>
    </div>

    <div class="grid cols-2" style="margin-top:18px">
      <div class="card">
        <span class="kicker k-violet">O que a banca quer</span>
        <h3>USG precoce × USG de 11–14 sem</h3>
        <p><b>USG entre 6 e 9 semanas</b> é o momento mais confiável para definir corionicidade:</p>
        <ul class="list">
          <li>Dois sacos gestacionais → dicoriônica (toda dicoriônica é diamniótica).</li>
          <li>Um saco gestacional → monocoriônica.</li>
          <li>Vesículas vitelínicas: ajudam a definir cavidades amnióticas. Duas vesículas = duas cavidades; uma vesícula = uma cavidade (monoamniótica).</li>
        </ul>
        <p><b>USG entre 11 e 14 semanas</b> traz os sinais clássicos da membrana intermediária:</p>
        <ul class="list">
          <li><b>Sinal do lambda / Y / twin peak:</b> projeção triangular de placenta entrando entre as duas membranas — confirma <b>dicoriônica</b>. A membrana é espessa (4 camadas: 2 córions + 2 âmnios).</li>
          <li><b>Sinal do T:</b> membrana fina e perpendicular à placenta única, sem cunha placentária — confirma <b>monocoriônica e diamniótica</b>. Membrana fina (2 camadas: só os 2 âmnios).</li>
          <li><b>Ausência de membrana</b> identificável: monoamniótica (rara).</li>
        </ul>
        <p><b>Após 14 semanas</b>: a placenta dicoriônica que se fundiu pode mascarar o sinal do lambda. Por isso o USG precoce é mais confiável.</p>
      </div>

      <div class="card">
        <span class="kicker k-amber">Pegadinhas</span>
        <h3>Detalhes que viram gabarito</h3>
        <ul class="list">
          <li><b>"USG de 22 semanas mostra placenta única — é monocoriônica."</b> Não necessariamente. Pode ser dicoriônica fundida. USG precoce confirmaria.</li>
          <li><b>"Membrana espessa = monocoriônica."</b> Inverso — espessa é dicoriônica (4 camadas).</li>
          <li><b>"Sinal do T = dicoriônica."</b> Inverso — T é monocoriônica diamniótica.</li>
          <li><b>"Vesícula vitelínica única = sempre monoamniótica."</b> Achado precoce — confirmar com USG seguinte.</li>
          <li><b>"Placentas em locais opostos = dizigótica."</b> Sugere DC, mas não fecha zigoticidade.</li>
        </ul>

        <hr style="border:none;border-top:1px solid var(--border);margin:14px 0">

        <span class="kicker k-info">Mnemônico</span>
        <p class="go-mnemonic">"Lambda/Y é dicoriônica; T é monocoriônica diamniótica."</p>
      </div>
    </div>

    <div class="page-dock">
      <a class="dock-link" href="#gemelar-divisao"><small>Anterior</small>← Linha do tempo da divisão</a>
      <a class="dock-link next" href="#gemelar-risco"><small>Próximo</small>Fatores de risco e pegadinhas →</a>
    </div>
  </section>
  `);

  /* ============== 30 · FATORES DE RISCO ============== */
  inject(`
  <section class="section" data-id="gemelar-risco">
    <div class="page-header">
      <div class="ph-meta">
        <span class="kicker k-violet">Gemelaridade · página 30</span>
        <h1>Fatores de risco e pegadinhas</h1>
        <p class="lead">História familiar de gêmeos sempre conta — ou só conta para gêmeos dizigóticos? O jogo "conta ou não conta" treina a nuance entre fatores que influenciam só dizigótica, fatores que influenciam ambos e mitos populares.</p>
        <div class="hero-tags" style="margin-top:10px">
          <span class="relevance-tag r-pegadinha">pegadinha</span>
          <span class="relevance-tag r-cai-pouco">cai pouco</span>
        </div>
      </div>
    </div>

    <div class="q-central"><span class="q-icon">?</span><p>História familiar de gêmeos sempre conta — ou só conta para gêmeos dizigóticos?</p></div>

    <div class="grid cols-2">
      <div class="card glass">
        <span class="kicker k-violet">Visual</span>
        <h3>Cards de risco · DZ × MZ × ambos</h3>
        <div class="go-risk-cards">
          <div class="go-risk-card go-risk-dz">
            <strong>Aumentam dizigótica</strong>
            <ul class="list">
              <li>História familiar materna</li>
              <li>Idade ≈35 anos</li>
              <li>Etnia (Yoruba > média mundial)</li>
              <li>Indução de ovulação</li>
              <li>Gemelar dizigótica anterior</li>
            </ul>
          </div>
          <div class="go-risk-card go-risk-mz">
            <strong>Aumentam monozigótica</strong>
            <ul class="list">
              <li>Geralmente nada — é evento aleatório</li>
              <li><b>Exceção:</b> FIV (mecanismo discutido, taxa ~2%)</li>
            </ul>
          </div>
          <div class="go-risk-card go-risk-both">
            <strong>FIV</strong>
            <ul class="list">
              <li>Aumenta dizigótica (transferência múltipla)</li>
              <li>Aumenta monozigótica (divisão induzida)</li>
              <li>Único fator que mexe nos dois</li>
            </ul>
          </div>
          <div class="go-risk-card go-risk-myth">
            <strong>Mitos / não conta</strong>
            <ul class="list">
              <li>Dieta com batata-doce</li>
              <li>História familiar de gêmeos idênticos</li>
              <li>Posição sexual</li>
              <li>Fase da lua</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="card" data-component="TwinRiskCardGame" data-implemented="1">
        <span class="kicker">Interação</span>
        <h3>Conta ou não conta?</h3>
        <p class="text-sm muted">Clique em cada fator para ver se aumenta risco — e o porquê.</p>
        <div class="trc-grid">
          <button class="trc-card btn ghost" data-factor="familiar_dz">História familiar de gêmeos fraternos</button>
          <button class="trc-card btn ghost" data-factor="familiar_mz">História familiar de gêmeos idênticos</button>
          <button class="trc-card btn ghost" data-factor="idade">Idade materna ≥35 anos</button>
          <button class="trc-card btn ghost" data-factor="etnia">Etnia (variação populacional)</button>
          <button class="trc-card btn ghost" data-factor="inducao">Indução de ovulação (clomifeno)</button>
          <button class="trc-card btn ghost" data-factor="fiv">FIV (transferência múltipla)</button>
          <button class="trc-card btn ghost" data-factor="dieta_amido">"Dieta rica em batata-doce"</button>
          <button class="trc-card btn ghost" data-factor="gemelar_anterior">Gemelar em gestação anterior</button>
        </div>
        <div class="trc-output" style="margin-top:12px"></div>
      </div>
    </div>

    <div class="grid cols-2" style="margin-top:18px">
      <div class="card">
        <span class="kicker k-violet">O que a banca quer</span>
        <h3>Fatores que aumentam — e por quê</h3>
        <p><b>Fatores que aumentam DIZIGOTICIDADE</b> (poliovulação):</p>
        <ul class="list">
          <li><b>História familiar materna</b> de gêmeos dizigóticos. Herdada como tendência a múltiplas ovulações por ciclo (FSH endógeno mais alto).</li>
          <li><b>Idade materna avançada</b> (≈35 anos). Conforme a idade avança, há picos compensatórios de FSH que favorecem múltiplas ovulações.</li>
          <li><b>Etnia.</b> Yoruba (Nigéria) tem a taxa mais alta documentada (~45/1.000); asiáticos têm taxa basal mais baixa.</li>
          <li><b>Multiparidade.</b> Aumenta levemente.</li>
          <li><b>Indução de ovulação.</b> Citrato de clomifeno e gonadotrofinas estimulam múltiplas ovulações.</li>
        </ul>
        <p><b>Fatores que aumentam MONOZIGOTICIDADE:</b></p>
        <ul class="list">
          <li>Praticamente nenhum em gestações espontâneas — é evento aleatório do zigoto.</li>
          <li><b>Exceção: FIV</b> aumenta a chance de divisão monozigótica posterior à transferência (mecanismo ainda debatido — possivelmente relacionado à manipulação do zigoto e/ou ambiente da cultura).</li>
        </ul>
        <p><b>FIV</b> é o único fator que aumenta os <b>dois tipos</b>: dizigótica pela transferência de múltiplos embriões; monozigótica pela divisão induzida.</p>
      </div>

      <div class="card">
        <span class="kicker k-amber">Pegadinhas</span>
        <h3>Mitos e nuances</h3>
        <ul class="list">
          <li><b>"História familiar de gêmeos idênticos aumenta risco."</b> ERRADO — divisão é aleatória, não herdada.</li>
          <li><b>"História familiar de gêmeos fraternos aumenta risco."</b> Verdadeiro — herda-se a tendência à poliovulação (transmitida pela linhagem materna).</li>
          <li><b>"Etnia 'asiática' aumenta gemelaridade."</b> ERRADO — etnia asiática tem taxa basal mais baixa.</li>
          <li><b>"FIV aumenta apenas dizigóticos."</b> ERRADO — aumenta os dois tipos.</li>
          <li><b>"Dieta de batata-doce aumenta gemelaridade."</b> Lenda popular sem evidência.</li>
          <li><b>"Idade paterna avançada."</b> Não há evidência consistente.</li>
        </ul>

        <hr style="border:none;border-top:1px solid var(--border);margin:14px 0">

        <span class="kicker k-info">Mnemônico</span>
        <p class="go-mnemonic">"História familiar só conta para gêmeos dizigóticos."</p>
      </div>
    </div>

    <div class="page-dock">
      <a class="dock-link" href="#gemelar-ultrassom"><small>Anterior</small>← Ultrassom gemelar</a>
      <a class="dock-link next" href="#gemelar-parto"><small>Próximo</small>Momento e via de parto →</a>
    </div>
  </section>
  `);

  /* ============== 31 · MOMENTO E VIA DE PARTO ============== */
  inject(`
  <section class="section" data-id="gemelar-parto">
    <div class="page-header">
      <div class="ph-meta">
        <span class="kicker k-violet">Gemelaridade · página 31</span>
        <h1>Momento e via de parto na gemelaridade</h1>
        <p class="lead">Quando gemelar pode nascer por via vaginal — e quando a cesárea é mandatória. A régua por corionicidade define o momento; primeiro feto cefálico é a chave para a via.</p>
      </div>
    </div>

    <div class="q-central"><span class="q-icon">?</span><p>Quando gemelar pode nascer por via vaginal — e quando a cesárea é mandatória?</p></div>

    <div class="grid cols-2">
      <div class="card glass go-svg-card">
        <span class="kicker k-violet">Visual</span>
        <h3>Régua de idade gestacional por corionicidade</h3>
        <svg viewBox="0 0 540 200" role="img" class="go-svg">
          <title>Régua de momento do parto na gemelaridade</title>
          <desc>Linhas paralelas para dicoriônica (até 38 sem), monocoriônica diamniótica (até 36 sem), monoamniótica (32 a 34 sem cesárea).</desc>
          <line x1="40" y1="120" x2="500" y2="120" stroke="#7282a0" stroke-width="2"/>
          <g font-size="11" fill="#44546f" font-weight="700">
            <text x="60" y="146">30</text>
            <text x="160" y="146">32</text>
            <text x="260" y="146">34</text>
            <text x="360" y="146">36</text>
            <text x="460" y="146">38</text>
          </g>
          <!-- DC/DA até 38 -->
          <rect x="60" y="40" width="430" height="20" rx="6" fill="#0a8a6b" fill-opacity=".25" stroke="#0a8a6b" stroke-width="1.4"/>
          <text x="275" y="54" text-anchor="middle" font-size="11" font-weight="800" fill="#066c4a">Dicoriônica diamniótica · até 38 sem</text>
          <!-- MC/DA até 36 -->
          <rect x="60" y="64" width="330" height="20" rx="6" fill="#b47d18" fill-opacity=".22" stroke="#b47d18" stroke-width="1.4"/>
          <text x="225" y="78" text-anchor="middle" font-size="11" font-weight="800" fill="#7a5210">Monocoriônica diamniótica · até 36 sem</text>
          <!-- MC/MA 32-34 cesárea -->
          <rect x="160" y="88" width="160" height="20" rx="6" fill="#d6406b" fill-opacity=".22" stroke="#d6406b" stroke-width="1.4"/>
          <text x="240" y="102" text-anchor="middle" font-size="11" font-weight="800" fill="#7a1f3d">Monoamniótica · 32–34 sem · cesárea</text>
          <!-- nota -->
          <text x="270" y="180" text-anchor="middle" font-size="10" fill="#7a1f3d" font-weight="700">Cesárea obrigatória: monoamniótica · conjugados · ≥3 fetos · 1º não cefálico · gemelar complicada</text>
        </svg>
      </div>

      <div class="card" data-component="TwinDeliveryRouteSimulator" data-implemented="1">
        <span class="kicker">Interação</span>
        <h3>Simulador · via de parto</h3>
        <p class="text-sm muted">Defina corionicidade, número de fetos, apresentação e complicações.</p>

        <div class="tds-axis">
          <strong>Corionicidade / amnionicidade</strong>
          <div class="tds-buttons">
            <button data-axis="type" data-val="dc_da">DC/DA</button>
            <button data-axis="type" data-val="mc_da">MC/DA</button>
            <button data-axis="type" data-val="mc_ma">MC/MA</button>
            <button data-axis="type" data-val="conjugados">Conjugados</button>
          </div>
        </div>

        <div class="tds-axis">
          <strong>Número de fetos</strong>
          <div class="tds-buttons">
            <button data-axis="count" data-val="2">2 fetos</button>
            <button data-axis="count" data-val="3">3 ou mais</button>
          </div>
        </div>

        <div class="tds-axis">
          <strong>Apresentação do 1º feto</strong>
          <div class="tds-buttons">
            <button data-axis="first" data-val="cefalico">Cefálico</button>
            <button data-axis="first" data-val="nao_cefalico">Não cefálico</button>
          </div>
        </div>

        <div class="tds-axis">
          <strong>Gemelar complicada (TFF, CIUR seletivo, sofrimento)</strong>
          <div class="tds-buttons">
            <button data-axis="complications" data-val="no">Não</button>
            <button data-axis="complications" data-val="yes">Sim</button>
          </div>
        </div>

        <div class="tds-output" style="margin-top:12px"></div>
      </div>
    </div>

    <div class="grid cols-2" style="margin-top:18px">
      <div class="card">
        <span class="kicker k-violet">O que a banca quer</span>
        <h3>Momento por corionicidade</h3>
        <ul class="list">
          <li><b>Dicoriônica diamniótica:</b> parto até <b>38 semanas</b>. Após o termo, considerar indução.</li>
          <li><b>Monocoriônica diamniótica:</b> parto até <b>36 semanas</b>. A monocoriônica tem maior risco de complicações tardias (TFF, óbito intrauterino) — não esperar 38 sem.</li>
          <li><b>Monoamniótica:</b> parto entre <b>32 e 34 semanas</b>, sempre por <b>cesárea</b>. Risco de enovelamento de cordão é máximo. Internação no 3º trimestre para monitorização contínua.</li>
          <li><b>Gêmeos conjugados:</b> cesárea, idade individualizada conforme avaliação multidisciplinar.</li>
          <li><b>≥3 fetos:</b> cesárea sempre. Idade conforme avaliação (geralmente 34–36 sem).</li>
        </ul>
        <p><b>Cesárea obrigatória:</b></p>
        <ul class="list">
          <li>Monoamniótica.</li>
          <li>Gêmeos conjugados.</li>
          <li>≥3 fetos.</li>
          <li><b>Primeiro feto não cefálico</b> (independentemente da apresentação do 2º).</li>
          <li>Gemelar complicada (TFF grave, CIUR seletivo grave).</li>
        </ul>
        <p><b>Via vaginal possível:</b></p>
        <ul class="list">
          <li>Cavidades amnióticas separadas (di ou monoamniótica? só DC/DA ou MC/DA — nunca MA).</li>
          <li>Dois fetos (não 3 ou mais).</li>
          <li>Sem complicação grave.</li>
          <li>Primeiro feto cefálico.</li>
          <li>Idealmente ambos cefálicos.</li>
          <li>Equipe preparada e UTI neonatal disponível.</li>
        </ul>
      </div>

      <div class="card">
        <span class="kicker k-amber">Pegadinhas</span>
        <h3>Detalhes que viram gabarito</h3>
        <ul class="list">
          <li><b>"Monocoriônica diamniótica até 38 sem."</b> ERRADO — até 36 sem.</li>
          <li><b>"Monoamniótica via vaginal."</b> ERRADO — sempre cesárea.</li>
          <li><b>"Primeiro feto pélvico, segundo cefálico — via vaginal."</b> ERRADO — primeiro não cefálico = cesárea.</li>
          <li><b>"Trigêmeas via vaginal."</b> ERRADO — ≥3 fetos = cesárea.</li>
          <li><b>"Gemelar com TFF tratada com laser — via vaginal pós-procedimento."</b> Possível em alguns casos selecionados; depende do tempo decorrido e da estabilidade. Não é regra automática.</li>
          <li><b>"Após nascimento do 1º feto, descobre-se transverso do 2º."</b> Possível tentar versão externa ou interna; cesárea pelo 2º se necessário.</li>
        </ul>

        <hr style="border:none;border-top:1px solid var(--border);margin:14px 0">

        <span class="kicker k-info">Mnemônico</span>
        <p class="go-mnemonic">"Gemelar vaginal precisa primeiro cefálico e sem complicação."</p>
      </div>
    </div>

    <div class="page-dock">
      <a class="dock-link" href="#gemelar-risco"><small>Anterior</small>← Fatores de risco</a>
      <a class="dock-link next" href="#gemelar-tttf"><small>Próximo</small>Síndrome da transfusão feto-fetal →</a>
    </div>
  </section>
  `);

  /* ============== 32 · TRANSFUSÃO FETO-FETAL ============== */
  inject(`
  <section class="section" data-id="gemelar-tttf">
    <div class="page-header">
      <div class="ph-meta">
        <span class="kicker k-violet">Gemelaridade · página 32</span>
        <h1>Síndrome da transfusão feto-fetal</h1>
        <p class="lead">O que denuncia o doador e o receptor — e por que diferença de tamanho não basta. O critério decisivo é <b>oligodrâmnio + polidrâmnio discordantes</b> em monocoriônica.</p>
        <div class="hero-tags" style="margin-top:10px">
          <span class="relevance-tag r-aprofundamento">aprofundamento</span>
          <span class="relevance-tag r-banca-grande">banca grande</span>
        </div>
      </div>
    </div>

    <div class="q-central"><span class="q-icon">?</span><p>O que denuncia o doador e o receptor — e por que diferença de tamanho não basta?</p></div>

    <div class="grid cols-2">
      <div class="card glass go-svg-card">
        <span class="kicker k-violet">Visual</span>
        <h3>Placenta única com anastomoses · TFF</h3>
        <svg viewBox="0 0 540 320" role="img" class="go-svg">
          <title>Síndrome da transfusão feto-fetal</title>
          <desc>Placenta monocoriônica com anastomoses arteriovenosas, feto doador (oligodrâmnio) e feto receptor (polidrâmnio).</desc>
          <!-- placenta única -->
          <ellipse cx="270" cy="60" rx="200" ry="40" fill="#d6406b" fill-opacity=".25" stroke="#d6406b" stroke-width="1.6"/>
          <text x="270" y="50" text-anchor="middle" font-size="12" font-weight="800" fill="#7a1f3d">Placenta única (monocoriônica)</text>
          <text x="270" y="68" text-anchor="middle" font-size="10" fill="#7a1f3d">com anastomoses arteriovenosas</text>
          <!-- anastomoses -->
          <path d="M180 80 Q220 110 270 130" stroke="#d6406b" stroke-width="2" fill="none"/>
          <path d="M270 130 Q320 110 360 80" stroke="#1d57bb" stroke-width="2" fill="none"/>
          <path d="M170 90 L270 140" stroke="#5b3bd1" stroke-width="1.4" fill="none" stroke-dasharray="3 3"/>
          <path d="M370 90 L270 140" stroke="#5b3bd1" stroke-width="1.4" fill="none" stroke-dasharray="3 3"/>
          <!-- feto doador (esq) -->
          <g transform="translate(40,160)">
            <ellipse cx="100" cy="60" rx="90" ry="50" fill="#1d57bb" fill-opacity=".18" stroke="#1d57bb" stroke-width="1.4" stroke-dasharray="3 3"/>
            <circle cx="100" cy="60" r="22" fill="#1d57bb" fill-opacity=".4"/>
            <text x="100" y="65" text-anchor="middle" font-size="10" font-weight="800" fill="#fff">DOADOR</text>
            <text x="100" y="125" text-anchor="middle" font-size="11" font-weight="800" fill="#14418f">oligodrâmnio</text>
            <text x="100" y="142" text-anchor="middle" font-size="9.5" fill="#14418f">CIUR · "stuck twin"</text>
          </g>
          <!-- feto receptor (dir) -->
          <g transform="translate(310,160)">
            <ellipse cx="100" cy="60" rx="120" ry="70" fill="#d6406b" fill-opacity=".30" stroke="#d6406b" stroke-width="1.4"/>
            <circle cx="100" cy="60" r="32" fill="#d6406b" fill-opacity=".5"/>
            <text x="100" y="65" text-anchor="middle" font-size="10" font-weight="800" fill="#fff">RECEPTOR</text>
            <text x="100" y="155" text-anchor="middle" font-size="11" font-weight="800" fill="#7a1f3d">polidrâmnio · hidropsia</text>
          </g>
          <text x="270" y="305" text-anchor="middle" font-size="10" fill="#44546f" font-style="italic">Critério principal: oligodrâmnio + polidrâmnio discordantes (não diferença de tamanho)</text>
        </svg>
      </div>

      <div class="card" data-component="TTTSSimulator" data-implemented="1">
        <span class="kicker">Interação</span>
        <h3>Simulador · líquido amniótico</h3>
        <p class="text-sm muted">Ajuste o ILA do doador e do receptor; o sistema avalia critério de TFF.</p>

        <div class="ttts-stage">
          <div class="ttts-feto">
            <div class="ttts-d-bolsa" style="height:18px"></div>
            <strong>Doador</strong>
            <span class="ttts-d-label">3 cm</span>
          </div>
          <div class="ttts-feto">
            <div class="ttts-r-bolsa" style="height:30px"></div>
            <strong>Receptor</strong>
            <span class="ttts-r-label">5 cm</span>
          </div>
        </div>

        <div class="ttts-axis">
          <strong>Maior bolsão · Doador (cm)</strong>
          <input type="range" data-axis="doador" min="0" max="10" value="3" step="1" aria-label="ILA doador" style="width:100%">
        </div>
        <div class="ttts-axis">
          <strong>Maior bolsão · Receptor (cm)</strong>
          <input type="range" data-axis="receptor" min="0" max="14" value="5" step="1" aria-label="ILA receptor" style="width:100%">
        </div>

        <div class="ttts-output" style="margin-top:12px"></div>
      </div>
    </div>

    <div class="grid cols-2" style="margin-top:18px">
      <div class="card">
        <span class="kicker k-violet">O que a banca quer</span>
        <h3>Patogenia, critério e estadiamento</h3>
        <p>A síndrome da transfusão feto-fetal (TFF) é <b>exclusiva da gemelar monocoriônica</b> (placenta única). Ocorre por <b>desequilíbrio nas anastomoses vasculares</b> da placenta, com transferência líquida de sangue de um feto (doador) para o outro (receptor).</p>
        <p><b>Doador</b>: hipovolêmico, anêmico, hipotônico, com restrição de crescimento e <b>oligodrâmnio</b>. Pode ficar "preso" à parede uterina pela falta de líquido (\"stuck twin\").</p>
        <p><b>Receptor</b>: hipervolêmico, com sobrecarga cardíaca, <b>polidrâmnio</b>, risco de <b>insuficiência cardíaca e hidropsia</b>.</p>
        <p><b>Critério diagnóstico principal:</b></p>
        <ul class="list">
          <li><b>Oligodrâmnio</b> em um feto (maior bolsão ≤2 cm) + <b>polidrâmnio</b> no outro (maior bolsão ≥8 cm).</li>
          <li><b>Diferença de tamanho/peso isolada NÃO fecha TFF</b> — pode ser CIUR seletivo (situação diferente, com prognóstico próprio).</li>
        </ul>
        <p><b>Estadiamento de Quintero (I a V):</b></p>
        <ul class="list">
          <li><b>I</b>: oligo/poli discordantes, bexiga do doador visível.</li>
          <li><b>II</b>: bexiga do doador NÃO visível.</li>
          <li><b>III</b>: alterações dopplerfluxométricas críticas (artéria umbilical, ducto venoso, veia umbilical).</li>
          <li><b>IV</b>: hidropsia (do receptor, geralmente).</li>
          <li><b>V</b>: óbito de um ou ambos os fetos.</li>
        </ul>
        <p><b>Conduta:</b></p>
        <ul class="list">
          <li><b>Casos leves (Quintero I):</b> seguimento próximo, pode-se considerar amniocentese seriada (descompressão).</li>
          <li><b>Casos graves (Quintero II–IV):</b> <b>fotocoagulação a laser</b> das anastomoses placentárias (ablação seletiva via fetoscopia) — tratamento padrão atual.</li>
          <li><b>Quintero V:</b> conduta individualizada conforme tempo e situação fetal.</li>
        </ul>
      </div>

      <div class="card">
        <span class="kicker k-amber">Pegadinhas</span>
        <h3>Detalhes que viram gabarito</h3>
        <ul class="list">
          <li><b>"TFF em dicoriônica."</b> ERRADO — exclusiva da monocoriônica (placenta única).</li>
          <li><b>"Diferença de peso de 25% fecha TFF."</b> Não — é critério de CIUR seletivo, não TFF. TFF exige discordância de líquido amniótico.</li>
          <li><b>"Oligodrâmnio isolado fecha TFF."</b> Não — precisa polidrâmnio discordante no outro feto.</li>
          <li><b>"Tratamento padrão é amniocentese seriada para casos graves."</b> ERRADO — graves vão para laser.</li>
          <li><b>"Hidropsia do doador."</b> Geralmente do receptor (sobrecarga cardíaca). Doador tipicamente é anêmico e restrição de crescimento.</li>
          <li><b>"Sequência TRAP / acárdico."</b> Forma rara de TFF em que um feto não desenvolve coração funcional e é perfundido reversamente pelo outro — situação distinta da TFF clássica.</li>
        </ul>

        <hr style="border:none;border-top:1px solid var(--border);margin:14px 0">

        <span class="kicker k-info">Mnemônico</span>
        <p class="go-mnemonic">"Transfusão feto-fetal: uma placenta, um oligo, um poli."</p>
      </div>
    </div>

    <div class="card" style="margin-top:18px" data-component="quiz" data-correct="b">
      <span class="kicker">Mini-quiz</span>
      <h3>Gemelar monocoriônica de 24 sem com USG seriada</h3>
      <p>USG mostra: feto A com maior bolsão de 1,5 cm e peso estimado no percentil 8; feto B com maior bolsão de 9 cm, peso no percentil 75, sinais sutis de sobrecarga cardíaca. Doppler com alterações.</p>
      <div class="quiz-options">
        <button data-k="a" data-why="CIUR seletivo é diferença de tamanho sem discordância de líquido. Aqui há discordância clara de ILA — fecha TFF.">A) CIUR seletivo</button>
        <button data-k="b" data-why="Correto. Oligodrâmnio (1,5 cm) + polidrâmnio (9 cm) em monocoriônica = TFF. Doppler alterado classifica como Quintero III. Conduta padrão: fotocoagulação a laser das anastomoses.">B) TFF · Quintero III · indicação de laser</button>
        <button data-k="c" data-why="Quintero V é óbito fetal — não é o caso aqui (ambos os fetos vivos).">C) TFF · Quintero V</button>
        <button data-k="d" data-why="Sem TFF não se justifica laser; aqui há TFF clara.">D) Sem TFF — apenas seguimento</button>
      </div>
      <div class="quiz-feedback"></div>
    </div>

    <div class="page-dock">
      <a class="dock-link" href="#gemelar-parto"><small>Anterior</small>← Momento e via de parto</a>
      <a class="dock-link next" href="#simulador-final"><small>Próximo</small>Simulador final integrado →</a>
    </div>
  </section>
  `);

  if (false) GORender({
    id: "gemelar-classificacao",
    kicker: "Gemelaridade · página 27",
    kickerClass: "k-violet",
    title: "Zigoticidade, corionicidade e amnionicidade",
    lead: "Dois placentas significam dois zigotos? Não necessariamente.",
    perguntaCentral: "Duas placentas significam dois zigotos — ou monozigoticidade pode esconder dois córions?",
    visualTitle: "Comparador zigoto × placenta × cavidade amniótica",
    visualLegend: "Três eixos paralelos: número de zigotos, número de córions, número de cavidades amnióticas. Cards mostram combinações possíveis e onde a divisão precoce engana.",
    interacaoTitle: "Seletor de achados",
    interacaoLegend: "O aluno escolhe achados (sexos diferentes, dois sacos, uma placenta, sinal do lambda...) e o sistema diz o que se pode afirmar com certeza.",
    componentName: "TwinClassificationMap",
    objetivo: "Distinguir zigoticidade (mono / di / poli), corionicidade (di / mono) e amnionicidade (di / mono), e entender que monozigótica com divisão precoce pode ser dicoriônica.",
    cobertura: [
      "Monozigótica: um zigoto que se divide → gêmeos idênticos.",
      "Dizigótica: dois zigotos (dois óvulos fecundados por dois espermatozoides) → gêmeos fraternos.",
      "Polizigótica: três ou mais zigotos.",
      "Dicoriônica: dois córions (duas placentas, ou uma placenta fundida com membrana intermediária grossa).",
      "Monocoriônica: um córion (uma placenta).",
      "Diamniótica: duas cavidades amnióticas.",
      "Monoamniótica: uma única cavidade amniótica — risco de enovelamento de cordão.",
      "Toda dicoriônica é diamniótica.",
      "Cuidado: dicoriônica pode ser monozigótica (divisão precoce até 72 h)."
    ],
    relevanceTags: ["pegadinha"],
    prev: { id: "diabetes-puerperio", label: "Puerpério no diabetes" },
    next: { id: "gemelar-divisao", label: "Linha do tempo da divisão gemelar" }
  });

  if (false) GORender({
    id: "gemelar-divisao",
    kicker: "Gemelaridade · página 28",
    kickerClass: "k-violet",
    title: "Linha do tempo da divisão gemelar",
    lead: "Quanto mais tarde divide, mais juntos ficam.",
    perguntaCentral: "Quanto mais tarde a divisão acontece, mais juntos os gêmeos ficam — e a partir de quando aparecem os conjugados?",
    visualTitle: "Timeline embrionária",
    visualLegend: "Linha de 0 a 14 dias com quatro janelas: ≤72 h (DC/DA), 4–8 d (MC/DA), 8–12 d (MC/MA), >12 d (gêmeos conjugados). Cada janela traz selos de risco crescente.",
    interacaoTitle: "Slider de dia da divisão",
    interacaoLegend: "O aluno arrasta o dia da divisão; o sistema mostra a corionicidade/amnionicidade resultante e os principais riscos.",
    componentName: "EmbryoSplitTimeline",
    objetivo: "Mapear corionicidade e amnionicidade conforme o dia da divisão embrionária e entender que quanto mais tarde a divisão, maior a proximidade e o risco.",
    cobertura: [
      "Até 72 horas (≤3 dias): dicoriônica e diamniótica (DC/DA).",
      "4 a 8 dias: monocoriônica e diamniótica (MC/DA).",
      "8 a 12 dias: monocoriônica e monoamniótica (MC/MA).",
      "Após 12 dias: gêmeos conjugados (siameses).",
      "Quanto mais tardia a divisão, maior a proximidade fetal e maior o risco.",
      "Monoamniótica: enovelamento de cordão é causa importante de óbito."
    ],
    relevanceTags: ["aprofundamento"],
    prev: { id: "gemelar-classificacao", label: "Zigoticidade, corionicidade e amnionicidade" },
    next: { id: "gemelar-ultrassom", label: "Ultrassom gemelar · sacos, lambda, Y e T" }
  });

  if (false) GORender({
    id: "gemelar-ultrassom",
    kicker: "Gemelaridade · página 29",
    kickerClass: "k-violet",
    title: "Ultrassom gemelar · sacos, lambda, Y e T",
    lead: "Qual achado ultrassonográfico resolve a questão.",
    perguntaCentral: "Qual achado ultrassonográfico resolve a questão da corionicidade — e em que idade gestacional ele é mais confiável?",
    visualTitle: "Painel de ultrassom estilizado",
    visualLegend: "USG entre 6–9 semanas com dois sacos × um saco e vesículas vitelínicas. À direita, USG de 11–14 semanas com sinal do lambda/Y/twin peak (DC) × sinal do T (MC/DA). Membrana grossa × linha fina.",
    interacaoTitle: "Laboratório de imagem",
    interacaoLegend: "O aluno clica em sacos, vesículas, espessura de membrana e sinais; o sistema valida a classificação e explica.",
    componentName: "ChorionicityUltrasoundLab",
    objetivo: "Aplicar achados ultrassonográficos para definir corionicidade/amnionicidade: dois sacos × um saco, vesículas vitelínicas, sinal do lambda/Y (DC) e sinal do T (MC/DA).",
    cobertura: [
      "USG precoce (6 a 9 semanas) é o melhor momento para definir corionicidade.",
      "Dois sacos gestacionais → dicoriônica (toda dicoriônica é diamniótica).",
      "Um saco gestacional → monocoriônica.",
      "Vesículas vitelínicas: ajudam a definir cavidades amnióticas (uma vesícula × duas vesículas).",
      "11 a 14 semanas: sinal do lambda/Y/twin peak (membrana espessa em forma de cunha) → dicoriônica.",
      "Sinal do T (membrana fina perpendicular à placenta) → monocoriônica e diamniótica.",
      "Após 14 semanas, a placenta dicoriônica que se aproxima pode mascarar o sinal do lambda."
    ],
    prev: { id: "gemelar-divisao", label: "Linha do tempo da divisão" },
    next: { id: "gemelar-risco", label: "Fatores de risco e pegadinhas da gemelaridade" }
  });

  if (false) GORender({
    id: "gemelar-risco",
    kicker: "Gemelaridade · página 30",
    kickerClass: "k-violet",
    title: "Fatores de risco e pegadinhas da gemelaridade",
    lead: "História familiar de gêmeos sempre conta?",
    perguntaCentral: "História familiar de gêmeos sempre conta — ou só conta para gêmeos dizigóticos?",
    visualTitle: "Cards de risco verdadeiro × falso",
    visualLegend: "Cards de fatores de risco (história familiar, etnia, idade, FIV, indução de ovulação) com marcadores: \"conta para dizigótica\", \"não muda risco\", \"aumenta dizigótica e monozigótica em FIV\".",
    interacaoTitle: "Jogo \"conta ou não conta?\"",
    interacaoLegend: "O aluno responde se cada fator aumenta risco ou não; o sistema explica a nuance (idênticos × fraternos × FIV).",
    componentName: "TwinRiskCardGame",
    objetivo: "Distinguir fatores de risco que aumentam apenas gêmeos dizigóticos (história familiar) dos que aumentam ambos (reprodução assistida).",
    cobertura: [
      "História familiar de gêmeos: aumenta risco apenas para gêmeos dizigóticos (mãe com tendência a poliovulação).",
      "Gêmeos idênticos (monozigóticos) na família: teoricamente não aumentam risco hereditário.",
      "Etnia: variação populacional na taxa de gemelaridade dizigótica.",
      "Idade materna avançada (≈35 anos): aumenta risco de dizigótica.",
      "Indução de ovulação: aumenta dizigótica.",
      "FIV: pode aumentar ambos (transferência de múltiplos embriões + maior chance de divisão monozigótica)."
    ],
    relevanceTags: ["pegadinha", "cai-pouco"],
    prev: { id: "gemelar-ultrassom", label: "Ultrassom gemelar" },
    next: { id: "gemelar-parto", label: "Momento e via de parto na gemelaridade" }
  });

  if (false) GORender({
    id: "gemelar-parto",
    kicker: "Gemelaridade · página 31",
    kickerClass: "k-violet",
    title: "Momento e via de parto na gemelaridade",
    lead: "Quando gemelar pode nascer por via vaginal.",
    perguntaCentral: "Quando gemelar pode nascer por via vaginal — e quando a cesárea é mandatória?",
    visualTitle: "Régua de idade gestacional por corionicidade",
    visualLegend: "Linhas paralelas: dicoriônica (até 38 sem), monocoriônica diamniótica (até 36 sem), monoamniótica (32–34 sem). Selos vermelhos indicam cesárea obrigatória.",
    interacaoTitle: "Simulador de via de parto",
    interacaoLegend: "O aluno escolhe corionicidade, número de fetos, apresentação do primeiro feto, presença de complicação (TFF, CIUR seletivo); o sistema sugere via.",
    componentName: "TwinDeliveryRouteSimulator",
    objetivo: "Definir momento e via do parto gemelar conforme corionicidade, amnionicidade, número de fetos, apresentação e complicações.",
    cobertura: [
      "Dicoriônica: parto até 38 semanas.",
      "Monocoriônica diamniótica: parto até 36 semanas.",
      "Monoamniótica: parto entre 32 e 34 semanas.",
      "Cesárea obrigatória: monoamniótica, gêmeos conjugados, três ou mais fetos, primeiro gemelar não cefálico, gemelar complicado (TFF grave, CIUR seletivo grave).",
      "Via vaginal possível: cavidades amnióticas separadas, dois fetos, sem complicação grave, primeiro feto em apresentação cefálica.",
      "Idealmente, ambos cefálicos para tentar via vaginal."
    ],
    prev: { id: "gemelar-risco", label: "Fatores de risco e pegadinhas" },
    next: { id: "gemelar-tttf", label: "Síndrome da transfusão feto-fetal" }
  });

  if (false) GORender({
    id: "gemelar-tttf",
    kicker: "Gemelaridade · página 32",
    kickerClass: "k-violet",
    title: "Síndrome da transfusão feto-fetal",
    lead: "O que denuncia o doador e o receptor.",
    perguntaCentral: "O que denuncia o doador e o receptor — e por que diferença de tamanho não basta?",
    visualTitle: "Placenta única com anastomoses",
    visualLegend: "Placenta monocoriônica com vasos comunicantes; doador (oligo) e receptor (poli/hidropsia). Linhas vasculares vermelhas/azuis ilustram desequilíbrio.",
    interacaoTitle: "Simulador de líquido amniótico",
    interacaoLegend: "O aluno ajusta o ILA de cada feto; o sistema explica o estágio (Quintero) e indica conduta (amniocentese seriada × fotocoagulação a laser).",
    componentName: "TTTSSimulator",
    objetivo: "Diagnosticar síndrome da transfusão feto-fetal (TFF) por critérios de líquido amniótico (oligo/polidrâmnio discordantes), reconhecer hidropsia do receptor e indicar conduta (amniocentese × laser).",
    cobertura: [
      "Exclusiva da monocoriônica (placenta única com anastomoses vasculares).",
      "Feto doador: oligodrâmnio, restrição de crescimento.",
      "Feto receptor: polidrâmnio, sobrecarga volêmica, risco de hidropsia.",
      "Diferença de tamanho ISOLADA não fecha TFF — o critério principal é o desequilíbrio de líquido amniótico.",
      "Estadiamento de Quintero (graus I a V).",
      "Conduta em casos leves: amniocentese seriada (descompressão).",
      "Conduta em casos graves: fotocoagulação a laser das anastomoses (ablação seletiva).",
      "Gemelar monocoriônica é gemelar de risco — segmento mais frequente, USG dopplerfluxometria seriada."
    ],
    relevanceTags: ["aprofundamento", "banca-grande"],
    prev: { id: "gemelar-parto", label: "Momento e via de parto na gemelaridade" },
    next: { id: "simulador-final", label: "Simulador final · doenças clínicas na gravidez" }
  });

  // ---------- Bloco 5 · Revisão final integrada (1 página) ----------

  /* ============== 33 · SIMULADOR FINAL INTEGRADO ============== */
  inject(`
  <section class="section" data-id="simulador-final">
    <div class="page-header">
      <div class="ph-meta">
        <span class="kicker">Revisão final · página 33</span>
        <h1>Simulador final · doenças clínicas na gravidez</h1>
        <p class="lead">Cockpit clínico que junta as quatro trilhas. Preencha o que o enunciado fornece — em qualquer combinação — e o sistema devolve <b>diagnóstico</b>, <b>exame-chave</b>, <b>conduta inicial</b>, <b>momento e via de parto</b>, <b>pegadinha</b>, <b>palavra-chave</b> e <b>link de revisão</b> para cada trilha ativa.</p>
      </div>
    </div>

    <div class="q-central"><span class="q-icon">?</span><p>Como resolver a questão inteira sem decorar solto — cobrindo pressão, glicose, vômito, gêmeos e parto?</p></div>

    <div class="card glass" data-component="GOProofSimulator" data-implemented="1">
      <div class="gps-cockpit">

        <!-- Coluna geral + hipertensão -->
        <div class="gps-section">
          <h3>Geral</h3>
          <label class="gps-field">
            Idade gestacional (semanas)
            <input type="number" data-input="ig" min="4" max="44" placeholder="ex.: 32">
          </label>
        </div>

        <div class="gps-section gps-rose">
          <h3>1 · Hipertensão & pré-eclâmpsia</h3>
          <label class="gps-field">
            PA confirmada
            <select data-input="pa">
              <option value="">—</option>
              <option value="normal">Normal (&lt;140/90)</option>
              <option value="leve">140–159 / 90–109</option>
              <option value="grave">≥160/110</option>
            </select>
          </label>

          <div class="gps-field">
            <strong>Proteinúria significativa (≥300/24h ou P/Cr ≥0,3)</strong>
            <div class="gps-toggles">
              <button class="gps-toggle btn ghost" data-input="proteinuria" data-val="yes">Sim</button>
              <button class="gps-toggle btn ghost" data-input="proteinuria" data-val="no">Não</button>
            </div>
          </div>

          <div class="gps-field">
            <strong>Sintomas cerebrais/visuais (cefaleia persistente, escotomas, hiperreflexia)</strong>
            <div class="gps-toggles">
              <button class="gps-toggle btn ghost" data-input="cerebral" data-val="yes">Sim</button>
              <button class="gps-toggle btn ghost" data-input="cerebral" data-val="no">Não</button>
            </div>
          </div>

          <div class="gps-field">
            <strong>Plaquetas &lt;100.000</strong>
            <div class="gps-toggles">
              <button class="gps-toggle btn ghost" data-input="plaq" data-val="yes">Sim</button>
              <button class="gps-toggle btn ghost" data-input="plaq" data-val="no">Não</button>
            </div>
          </div>

          <div class="gps-field">
            <strong>Creatinina alta / oligúria</strong>
            <div class="gps-toggles">
              <button class="gps-toggle btn ghost" data-input="cr" data-val="yes">Sim</button>
              <button class="gps-toggle btn ghost" data-input="cr" data-val="no">Não</button>
            </div>
          </div>

          <div class="gps-field">
            <strong>TGO ≥2× LSN</strong>
            <div class="gps-toggles">
              <button class="gps-toggle btn ghost" data-input="tgo" data-val="yes">Sim</button>
              <button class="gps-toggle btn ghost" data-input="tgo" data-val="no">Não</button>
            </div>
          </div>

          <div class="gps-field">
            <strong>Edema agudo de pulmão</strong>
            <div class="gps-toggles">
              <button class="gps-toggle btn ghost" data-input="eap" data-val="yes">Sim</button>
              <button class="gps-toggle btn ghost" data-input="eap" data-val="no">Não</button>
            </div>
          </div>

          <div class="gps-field">
            <strong>Em uso de AAS profilático (12–16 sem até 36 sem)</strong>
            <div class="gps-toggles">
              <button class="gps-toggle btn ghost" data-input="aas" data-val="yes">Sim</button>
              <button class="gps-toggle btn ghost" data-input="aas" data-val="no">Não</button>
            </div>
          </div>
        </div>

        <div class="gps-section gps-teal">
          <h3>2 · Hiperêmese</h3>
          <div class="gps-field">
            <strong>Vômitos persistentes/incoercíveis</strong>
            <div class="gps-toggles">
              <button class="gps-toggle btn ghost" data-input="vomitos" data-val="yes">Sim</button>
              <button class="gps-toggle btn ghost" data-input="vomitos" data-val="no">Não</button>
            </div>
          </div>
          <div class="gps-field">
            <strong>Perda de peso ≥5% pré-gestacional</strong>
            <div class="gps-toggles">
              <button class="gps-toggle btn ghost" data-input="perda5" data-val="yes">Sim</button>
              <button class="gps-toggle btn ghost" data-input="perda5" data-val="no">Não</button>
            </div>
          </div>
          <div class="gps-field">
            <strong>Cetonúria na fita</strong>
            <div class="gps-toggles">
              <button class="gps-toggle btn ghost" data-input="cetonuria" data-val="yes">Sim</button>
              <button class="gps-toggle btn ghost" data-input="cetonuria" data-val="no">Não</button>
            </div>
          </div>
        </div>

        <div class="gps-section gps-emerald">
          <h3>3 · Diabetes</h3>
          <label class="gps-field">
            Glicemia de jejum (&lt;20 sem)
            <select data-input="jejum">
              <option value="">—</option>
              <option value="<92">&lt;92 mg/dL</option>
              <option value="92-125">92–125 mg/dL</option>
              <option value=">=126">≥126 mg/dL</option>
            </select>
          </label>
          <label class="gps-field">
            TOTG 75 g (24–28 sem)
            <select data-input="totg">
              <option value="">—</option>
              <option value="normal">Normal</option>
              <option value="dmg">DMG (≥1 valor alterado: jejum 92 / 1h 180 / 2h 153)</option>
              <option value="previo">Diabetes prévio (jejum ≥126 ou 2h ≥200)</option>
            </select>
          </label>
          <div class="gps-field">
            <strong>Regra dos 30% — &gt;30% das medidas fora do alvo</strong>
            <div class="gps-toggles">
              <button class="gps-toggle btn ghost" data-input="regra30" data-val="yes">Sim</button>
              <button class="gps-toggle btn ghost" data-input="regra30" data-val="no">Não</button>
            </div>
          </div>
          <div class="gps-field">
            <strong>Já em uso de insulina ou metformina</strong>
            <div class="gps-toggles">
              <button class="gps-toggle btn ghost" data-input="insulina" data-val="yes">Sim</button>
              <button class="gps-toggle btn ghost" data-input="insulina" data-val="no">Não</button>
            </div>
          </div>
          <div class="gps-field">
            <strong>USG · macrossomia ou polidrâmnio</strong>
            <div class="gps-toggles">
              <button class="gps-toggle btn ghost" data-input="macrossomia" data-val="yes">Sim</button>
              <button class="gps-toggle btn ghost" data-input="macrossomia" data-val="no">Não</button>
            </div>
          </div>
        </div>

        <div class="gps-section gps-purple">
          <h3>4 · Gemelaridade</h3>
          <label class="gps-field">
            Tipo de gestação
            <select data-input="gemelar">
              <option value="">—</option>
              <option value="unica">Única (não gemelar)</option>
              <option value="dc_da">Dicoriônica diamniótica (DC/DA)</option>
              <option value="mc_da">Monocoriônica diamniótica (MC/DA)</option>
              <option value="mc_ma">Monocoriônica monoamniótica (MC/MA)</option>
              <option value="conjugados">Gêmeos conjugados</option>
            </select>
          </label>
          <div class="gps-field">
            <strong>Apresentação do 1º feto</strong>
            <div class="gps-toggles">
              <button class="gps-toggle btn ghost" data-input="primeiroFeto" data-val="cefalico">Cefálico</button>
              <button class="gps-toggle btn ghost" data-input="primeiroFeto" data-val="nao_cefalico">Não cefálico</button>
            </div>
          </div>
          <div class="gps-field">
            <strong>Discordância de líquido (oligo + poli) — TFF</strong>
            <div class="gps-toggles">
              <button class="gps-toggle btn ghost" data-input="tff" data-val="yes">Sim</button>
              <button class="gps-toggle btn ghost" data-input="tff" data-val="no">Não</button>
            </div>
          </div>
        </div>

      </div>

      <div class="gps-actions">
        <button class="btn ghost gps-reset" type="button">Reiniciar inputs</button>
      </div>

      <div class="gps-output" style="margin-top:14px"></div>
    </div>

    <div class="card" style="margin-top:18px" data-component="QuickRevisionFlashcards" data-implemented="1">
      <span class="kicker">Revisão ativa</span>
      <h3>Flashcards · clique para virar</h3>
      <p class="text-sm muted">Filtro por trilha · clique no card para ver a resposta.</p>
      <div class="qrf-filters">
        <button class="qrf-filter btn ghost is-active" data-filter="all">Todas</button>
        <button class="qrf-filter btn ghost" data-filter="hta">Hipertensão & PE</button>
        <button class="qrf-filter btn ghost" data-filter="hip">Hiperêmese</button>
        <button class="qrf-filter btn ghost" data-filter="dm">Diabetes</button>
        <button class="qrf-filter btn ghost" data-filter="gem">Gemelaridade</button>
      </div>

      <div class="qrf-deck">

        <div class="qrf-card" data-trail="hta">
          <div class="qrf-front"><strong>Q.</strong> Como diferenciar hipertensão crônica de pré-eclâmpsia em consulta?</div>
          <div class="qrf-back"><strong>R.</strong> Janela das <b>20 semanas</b> · antes = crônica; depois = gestacional ou PE. Calciúria baixa e ácido úrico ↑ são pistas de PE; reclassificar até 12 sem PP.</div>
        </div>
        <div class="qrf-card" data-trail="hta">
          <div class="qrf-front"><strong>Q.</strong> Quais 5 lesões sistêmicas fecham PE sem proteinúria?</div>
          <div class="qrf-back"><strong>R.</strong> EAP · plaq &lt;100k · Cr ↑ / oligúria · TGO ≥2× · sintomas cerebrais/visuais persistentes.</div>
        </div>
        <div class="qrf-card" data-trail="hta">
          <div class="qrf-front"><strong>Q.</strong> Pritchard × Zuspan · qual a diferença essencial?</div>
          <div class="qrf-back"><strong>R.</strong> <b>Pritchard:</b> 4 g IV + 10 g IM + 5 g IM 4/4h · <b>Zuspan:</b> 4 g IV + 1 g/h em bomba. Pritchard útil em transferência; Zuspan preferível em coagulopatia/HELLP.</div>
        </div>
        <div class="qrf-card" data-trail="hta">
          <div class="qrf-front"><strong>Q.</strong> Quais são os 3 Rs do sulfato — e qual é o antídoto?</div>
          <div class="qrf-back"><strong>R.</strong> <b>Reflexo</b> patelar · <b>Respiração</b> (FR ≥12) · <b>Rins</b> (diurese ≥25 mL/h). Antídoto: <b>gluconato de cálcio 1 g IV lento</b>.</div>
        </div>

        <div class="qrf-card" data-trail="hip">
          <div class="qrf-front"><strong>Q.</strong> Por que tiamina antes da glicose na hiperêmese?</div>
          <div class="qrf-back"><strong>R.</strong> Em jejum prolongado, glicose isolada precipita encefalopatia de <b>Wernicke</b>. Sempre <b>tiamina 100 mg IV</b> antes ou junto da glicose.</div>
        </div>
        <div class="qrf-card" data-trail="hip">
          <div class="qrf-front"><strong>Q.</strong> Como diferenciar hipertireoidismo transitório (HCG) de Graves?</div>
          <div class="qrf-back"><strong>R.</strong> Transitório: TSH suprimido, T4L normal/borderline, sem bócio, sem oftalmopatia, TRAb negativo · Graves: T4L elevado, bócio, oftalmopatia, TRAb positivo. Tratamento muda.</div>
        </div>
        <div class="qrf-card" data-trail="hip">
          <div class="qrf-front"><strong>Q.</strong> 4 linhas de antieméticos na hiperêmese?</div>
          <div class="qrf-back"><strong>R.</strong> 1) B6 ± anti-histamínico · 2) metoclopramida · 3) clorpromazina · 4) ondansetrona (refratários · cuidado com discussão sobre fenda labial em uso muito precoce).</div>
        </div>

        <div class="qrf-card" data-trail="dm">
          <div class="qrf-front"><strong>Q.</strong> Pontos de corte do TOTG 75 g e do jejum &lt;20 sem?</div>
          <div class="qrf-back"><strong>R.</strong> Jejum &lt;20 sem: &lt;92 normal · 92–125 DMG · ≥126 prévio. TOTG: jejum 92 · 1h 180 · 2h 153 (≥1 valor alterado fecha DMG). 2h ≥200 ou jejum ≥126 = prévio.</div>
        </div>
        <div class="qrf-card" data-trail="dm">
          <div class="qrf-front"><strong>Q.</strong> O que é a regra dos 30%?</div>
          <div class="qrf-back"><strong>R.</strong> Mais de <b>30% das medidas do perfil glicêmico fora do alvo</b> em 1–2 sem após dieta + atividade → entra <b>medicação</b> (insulina como pilar; metformina em situações específicas).</div>
        </div>
        <div class="qrf-card" data-trail="dm">
          <div class="qrf-front"><strong>Q.</strong> Distócia: 1ª conduta × 1ª manobra?</div>
          <div class="qrf-back"><strong>R.</strong> 1ª <b>conduta</b>: <b>chamar ajuda</b>. 1ª <b>manobra</b>: <b>McRoberts</b> (hiperflexão e abdução das coxas). Sequência: McRoberts → suprapúbica → Jacquemier → rotacional → Gaskin.</div>
        </div>
        <div class="qrf-card" data-trail="dm">
          <div class="qrf-front"><strong>Q.</strong> Hipoglicemia inesperada no 3º trimestre — o que pensar?</div>
          <div class="qrf-back"><strong>R.</strong> <b>Insuficiência placentária</b>: a placenta está produzindo menos hormônios contra-insulínicos. Avaliar vitalidade fetal antes de reduzir dose.</div>
        </div>

        <div class="qrf-card" data-trail="gem">
          <div class="qrf-front"><strong>Q.</strong> Lambda × T no USG — o que cada um significa?</div>
          <div class="qrf-back"><strong>R.</strong> <b>Lambda/Y/twin peak:</b> dicoriônica (membrana espessa, 4 camadas). <b>T:</b> monocoriônica diamniótica (membrana fina, 2 camadas).</div>
        </div>
        <div class="qrf-card" data-trail="gem">
          <div class="qrf-front"><strong>Q.</strong> Linha do tempo da divisão monozigótica?</div>
          <div class="qrf-back"><strong>R.</strong> ≤72h DC/DA · 4–8d MC/DA · 8–12d MC/MA · &gt;12d gêmeos conjugados. Quanto mais tarde divide, mais juntos ficam.</div>
        </div>
        <div class="qrf-card" data-trail="gem">
          <div class="qrf-front"><strong>Q.</strong> Critério de TFF e tratamento padrão dos casos graves?</div>
          <div class="qrf-back"><strong>R.</strong> Critério: <b>oligo (≤2 cm) + poli (≥8 cm)</b> em monocoriônica. Casos leves: amniocentese seriada. Casos graves (Quintero II–IV): <b>fotocoagulação a laser</b> das anastomoses.</div>
        </div>
        <div class="qrf-card" data-trail="gem">
          <div class="qrf-front"><strong>Q.</strong> Quando cesárea é obrigatória na gemelaridade?</div>
          <div class="qrf-back"><strong>R.</strong> Monoamniótica · gêmeos conjugados · ≥3 fetos · primeiro feto não cefálico · gemelar complicada (TFF grave, CIUR seletivo grave).</div>
        </div>

      </div>
    </div>

    <div class="page-dock">
      <a class="dock-link" href="#gemelar-tttf"><small>Anterior</small>← Síndrome da transfusão feto-fetal</a>
      <a class="dock-link next" href="#hero"><small>Voltar</small>Capa →</a>
    </div>
  </section>
  `);

  if (false) GORender({
    id: "simulador-final",
    kicker: "Revisão final · página 33",
    kickerClass: "",
    title: "Simulador final · doenças clínicas na gravidez",
    lead: "Como resolver a questão inteira sem decorar solto — cockpit clínico que junta os quatro blocos.",
    perguntaCentral: "Como o aluno resolve a questão inteira sem decorar solto — cobrindo pressão, glicose, vômito, gêmeos e parto?",
    visualTitle: "Memory board premium · trilhas integradas",
    visualLegend: "Painel com nove trilhas (PA, proteinúria, gravidade, sulfato, glicose, TOTG, vômitos, gêmeos, parto). Cada trilha acende ao receber input e contribui para os outputs.",
    interacaoTitle: "Cockpit clínico · 18 inputs → 9 outputs",
    interacaoLegend: "O aluno preenche idade gestacional, PA, proteinúria, sintomas cerebrais/visuais, plaquetas, creatinina, transaminases, EAP, AAS/cálcio, vômitos, perda de peso, cetonúria, glicemia de jejum, TOTG, perfil glicêmico, uso de insulina/metformina, macrossomia/polidrâmnio, tipo de gemelaridade, apresentação fetal, oligo/polidrâmnio discordante. Outputs: 1) diagnóstico provável; 2) gravidade; 3) exame-chave; 4) conduta inicial; 5) momento do parto; 6) via de parto provável; 7) pegadinha; 8) palavra-chave; 9) link para revisão.",
    componentName: "GOProofSimulator",
    objetivo: "Integrar os quatro blocos em um único raciocínio de prova, devolvendo diagnóstico, gravidade, exame-chave, conduta, momento do parto, via de parto, pegadinha, palavra-chave e link para revisão.",
    cobertura: [
      "Trilha pressão: PA, proteinúria, lesão sistêmica, gravidade, HELLP/eclâmpsia.",
      "Trilha glicose: jejum, TOTG, perfil glicêmico, regra dos 30%, insulina/metformina.",
      "Trilha vômito: hiperêmese × náusea fisiológica, tiamina, diferenciais.",
      "Trilha gêmeos: zigoticidade, corionicidade, amnionicidade, USG, TFF.",
      "Trilha parto: idade gestacional, gravidade, controle glicêmico, corionicidade, complicações.",
      "Saída pedagógica: cada output traz link para a página correspondente do estudo."
    ],
    prev: { id: "gemelar-tttf", label: "Síndrome da transfusão feto-fetal" },
    next: { id: "hero", label: "Voltar à capa" }
  });

})();
