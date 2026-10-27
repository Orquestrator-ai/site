/* =========================================
   INTENSIVÃO PREVENTIVA — PÁGINAS GLOBAIS
   Home, Como estudar, Mapa global, Matriz, Bayesiano, Revisão, Instalar
   ========================================= */

/* ─────────────────────────────────────────
   HOME — Dashboard
───────────────────────────────────────── */
GO_RENDER['home'] = function(container, page) {
  const heroSvg = PrevSVG.heroMapa();
  const modules = [
    { key: 'm1', mod: MODULE_DATA.m1 },
    { key: 'm2', mod: MODULE_DATA.m2 },
    { key: 'm3', mod: MODULE_DATA.m3 },
    { key: 'm4', mod: MODULE_DATA.m4 },
  ];
  const visited = JSON.parse(localStorage.getItem('sf_visited') || '[]');
  const progressByModule = modules.map(m => {
    const pages = GO_BLOCKS[m.key].pages;
    const done = pages.filter(p => visited.includes(p.id)).length;
    return { ...m, done, total: pages.length, pct: pages.length ? Math.round(done/pages.length*100) : 0 };
  });

  container.innerHTML = `
  <div class="dash-hero">
    <span class="tag">★ Medicina Preventiva III · Epidemiologia Clínica · Bioestatística</span>
    <h1>Intensivão Preventiva — do raciocínio bayesiano à banca</h1>
    <p>Plataforma autoral para residência médica. Quatro módulos integrados — validação de testes, valores preditivos, curva ROC e estatística descritiva — costurados pelo mesmo raciocínio clínico: <em>quem é o paciente, qual a hipótese, qual o teste, o que o resultado significa.</em></p>
    <div style="margin-top: 18px; border-radius: 18px; overflow: hidden; background: rgba(255,255,255,.35); padding: 12px;">${heroSvg}</div>
  </div>

  <div class="module-grid">
    ${progressByModule.map((m, i) => `
      <div class="module-card --${m.key}" data-goto="${m.mod.route}">
        <div style="display:flex; align-items:center; gap:14px; justify-content: space-between;">
          <div style="display:flex; align-items:center; gap: 14px;">
            <div class="mc-num">${i+1}</div>
            <div>
              <div style="font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:.06em; color: var(--mod-accent)">${m.mod.tag}</div>
              <h3 style="margin:2px 0 0">${m.mod.label}</h3>
            </div>
          </div>
          <div style="font-size: 28px;">${m.mod.icon}</div>
        </div>
        <p class="mc-thesis" style="margin-top:10px">"${m.mod.thesis}"</p>
        <div class="mc-meta">
          <span class="chip">${m.mod.pages} páginas</span>
          <span class="chip">${m.done}/${m.total} concluídas</span>
          <span class="chip">${m.pct}%</span>
        </div>
        <div style="margin-top:10px; height:6px; border-radius:999px; background: rgba(0,0,0,.06); overflow: hidden;">
          <div style="height:100%; width:${m.pct}%; background: var(--mod-accent); transition: width .4s ease;"></div>
        </div>
      </div>
    `).join('')}
  </div>

  ${sectionTitle('🔗', 'Pontes editoriais entre os módulos', 'var(--c-teal)')}
  <div style="display:grid; grid-template-columns: 1fr; gap: 10px;">
    ${GLOBAL_BRIDGES.map(b => `
      <div data-goto="${b.target}" style="cursor:pointer; padding:14px 16px; border-radius:14px; background: var(--bg-card-strong); border: 1px solid var(--border-color); border-left: 4px solid var(--c-teal); transition: transform .2s;">
        <div style="display:flex; gap:8px; align-items:center; margin-bottom: 4px;">
          <span class="didax-chip --teal">${b.from.toUpperCase()} → ${b.to.toUpperCase()}</span>
          <strong style="color: var(--text-primary)">${b.title}</strong>
        </div>
        <div style="font-size:14px; color: var(--text-secondary); line-height:1.55;">${b.msg}</div>
      </div>
    `).join('')}
  </div>

  ${sectionTitle('🚀', 'Comece por onde fizer sentido', 'var(--c-blue)')}
  <div class="split2">
    <div class="split-card --a">
      <h4><span class="dot"></span>Primeiro contato com epidemiologia clínica?</h4>
      <p style="font-size:14px; color:var(--text-secondary); line-height:1.6;">Comece pelo Módulo 1. A tabela 2x2, sensibilidade e especificidade são a base de tudo.</p>
      <button class="page-nav-btn" data-goto="m1-01" style="margin-top: 6px;">Começar Módulo 1 →</button>
    </div>
    <div class="split-card --b">
      <h4><span class="dot"></span>Já domina o básico, quer treinar prova?</h4>
      <p style="font-size:14px; color:var(--text-secondary); line-height:1.6;">Use o simulador bayesiano e os fechamentos de cada módulo (m1-13, m2-10, m3-07, m4-09).</p>
      <button class="page-nav-btn" data-goto="simulador-bayesiano" style="margin-top: 6px;">Simulador Bayesiano →</button>
    </div>
  </div>
  ${navFooter(page.id)}
  `;
};

/* ─────────────────────────────────────────
   COMO ESTUDAR
───────────────────────────────────────── */
GO_RENDER['como-estudar'] = function(container, page) {
  const body = `
  ${pageHero({ module: 'm1', moduleLabel: 'Guia da plataforma', title: 'Como aproveitar o Intensivão Preventiva', lead: 'Esta plataforma foi escrita para profissionais médicos e estudantes avançados de medicina que estão tentando passar nas bancas mais concorridas do país.', grad: 'var(--grad-prev-home)' })}

  ${conceptHero({
    question: 'O que torna esta plataforma diferente de uma apostila?',
    title: 'Cada página tem didática própria. O texto é soberano. Os interativos existem para confirmar que você entendeu.',
    lead: 'Você não vai encontrar "leia este parágrafo e veja o gráfico". Vai encontrar: leia o conceito → entenda por que ele importa → veja o interativo que prova que você entendeu → confronte com a pegadinha de banca → revise ativamente antes de virar a página.'
  })}

  ${sectionTitle('🧭', 'O roteiro mental que sustenta cada página', 'var(--c-blue)')}
  <div class="prose">
    <p>Toda página segue uma <strong>arquitetura cognitiva consistente</strong>, mesmo que a estética e os recursos variem. Você vai encontrar, em ordem, alguns ou todos destes blocos:</p>
  </div>

  <div style="display:grid; grid-template-columns: 1fr; gap: 10px; margin: 12px 0;">
    ${[
      ['❓','Pergunta provocadora', 'Toda página começa com uma pergunta clínica ou epidemiológica que dá sentido ao conteúdo.'],
      ['📖','Texto principal completo', 'Prosa explicativa real, com analogias, exemplos numéricos e fórmulas. Não é resumo.'],
      ['🎯','Caso clínico ou situação-problema', 'Aterramos o conceito em um cenário que poderia chegar na sua sala.'],
      ['🧠','Visual didático específico', 'SVG, tabela 2x2, gráfico ROC, dot plot — cada página escolhe a metáfora visual que melhor encaixa.'],
      ['⚙','Componente interativo contextualizado', 'Slider, calculadora, simulador, flashcards. Sempre conectado ao texto que veio antes.'],
      ['🎯','O que a banca quer', 'Pegadinhas reais, não confunda, erro comum, diferencial do aluno avançado.'],
      ['🔄','Revisão ativa', 'Perguntas para você responder mentalmente antes de seguir.'],
      ['→','Conexão com a próxima página', 'A plataforma é costurada — você sempre sabe por que está estudando aquilo.'],
    ].map(([ico, t, d]) => `
      <div style="display:grid; grid-template-columns: 40px 1fr; gap: 12px; padding: 12px 14px; border-radius: 12px; background: var(--bg-card-strong); border: 1px solid var(--border-color);">
        <div style="font-size: 22px; display:grid; place-items:center;">${ico}</div>
        <div><strong style="color: var(--text-primary)">${t}</strong><div style="font-size: 14px; color: var(--text-secondary); margin-top: 2px;">${d}</div></div>
      </div>`).join('')}
  </div>

  ${didaxBlock('caso', '🩺', 'A regra de ouro do estudo aqui',
    `<p>Não termine uma página sem responder, na sua cabeça, três perguntas:</p>
    <ul class="tight"><li><strong>Qual é o conceito central?</strong></li><li><strong>Como ele cai em prova?</strong></li><li><strong>Que erro a banca quer me ver cometendo?</strong></li></ul>
    <p>Se você responder essas três, pode avançar.</p>`)}

  ${didaxBlock('importa', '🎨', 'Cores semânticas — o que cada cor significa',
    `<div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px,1fr)); gap:8px;">
      <span class="didax-chip --blue"><span class="ico">●</span>azul · estrutura, eixos, tabela</span>
      <span class="didax-chip --green"><span class="ico">●</span>verde · acerto, VP/VN, segurança</span>
      <span class="didax-chip --red"><span class="ico">●</span>vermelho · erro, FP/FN, risco</span>
      <span class="didax-chip --amber"><span class="ico">●</span>amarelo · banca, pegadinha</span>
      <span class="didax-chip --violet"><span class="ico">●</span>roxo · razão de verossimilhança, AUC, raciocínio avançado</span>
      <span class="didax-chip --teal"><span class="ico">●</span>teal · probabilidade, método</span>
      <span class="didax-chip --orange"><span class="ico">●</span>laranja · ponto de corte, limiar, mudança</span>
    </div>`)}

  ${didaxBlock('proxima', '→', 'Pronto para começar?', `<p>Vá ao <strong>Módulo 1</strong> — comece pela pergunta que sustenta toda a epidemiologia clínica.</p><button class="page-nav-btn" data-goto="m1-01" style="margin-top:8px">Ir para Módulo 1 — Página 1 →</button>`)}
  `;
  renderStandard(container, page, body);
};

/* ─────────────────────────────────────────
   MAPA GLOBAL (placeholder rico)
───────────────────────────────────────── */
GO_RENDER['mapa-global'] = function(container, page) {
  const body = `
  ${pageHero({ module: 'integ', moduleLabel: '★ Integração Global', title: 'Mapa mental integrado da Preventiva', lead: 'Todos os conceitos da plataforma em uma única visão.', grad: 'var(--grad-prev-revisao)' })}

  ${conceptHero({
    question: 'Como os 4 módulos se costuram em um único raciocínio clínico?',
    title: 'Da pergunta à decisão: o fio que liga validação, prevalência, corte e descrição estatística',
    lead: 'Quando um paciente chega, você ativa uma cadeia mental: qual a hipótese (pré-teste)? qual o teste vou pedir (Sens, Esp, RV)? como o resultado muda minha hipótese (pós-teste)? em que corte estou interpretando esse exame (ROC)? como descrevo a amostra ou comparo grupos (centro e dispersão)?'
  })}

  ${sectionTitle('🗺', 'O fluxo cognitivo do raciocínio bayesiano', 'var(--c-teal)')}

  <div class="flowchart">${PrevSVG.bayesFluxo()}</div>

  ${sectionTitle('🔁', 'O ciclo entre os 4 módulos', 'var(--c-violet)')}

  <div class="prose">
    <p>Quando você pede um exame, está girando este ciclo — mesmo sem perceber:</p>
  </div>

  <div style="display:grid; grid-template-columns: 1fr; gap: 12px; margin: 14px 0;">
    ${[
      ['1','Validação','Esse teste foi validado para esse uso? Qual a sensibilidade, especificidade e razão de verossimilhança?','m1-01'],
      ['2','Valores preditivos','Em quem estou aplicando? Qual a prevalência? Posso confiar mais no positivo ou no negativo?','m2-01'],
      ['3','Corte e ROC','Em que ponto estou cortando o resultado? Esse limiar privilegia detecção ou confirmação?','m3-01'],
      ['4','Descrição estatística','Para comparar grupos, descrevo amostras com medidas de centro e dispersão — base da bioestatística.','m4-01'],
    ].map(([n, t, d, target]) => `
      <div data-goto="${target}" style="cursor:pointer; display:grid; grid-template-columns: 50px 1fr; gap:14px; padding:14px 16px; border-radius:14px; background: var(--bg-card-strong); border:1px solid var(--border-color); border-left: 4px solid var(--c-violet); transition: transform .15s;">
        <div style="background: var(--c-violet); color: #fff; border-radius: 12px; font-size:22px; font-weight:800; display:grid; place-items:center;">${n}</div>
        <div>
          <strong style="color: var(--text-primary); font-size:16px">${t}</strong>
          <p style="margin:4px 0 0; font-size:14px; color: var(--text-secondary); line-height:1.55;">${d}</p>
        </div>
      </div>`).join('')}
  </div>

  ${didaxBlock('avancado','⚡','A frase que amarra tudo','<p>“<strong>Sensibilidade e especificidade são propriedades do teste. Valores preditivos dependem da prevalência. O ponto de corte ajusta o trade-off. A descrição estatística sustenta a comparação.</strong>” Se você consegue dizer essa frase com clareza, dominou os 4 módulos.</p>')}
  `;
  renderStandard(container, page, body);
};

/* ─────────────────────────────────────────
   MATRIZ COMPARATIVA
───────────────────────────────────────── */
GO_RENDER['matriz-comparativa'] = function(container, page) {
  const body = `
  ${pageHero({ module: 'integ', moduleLabel: '★ Integração Global', title: 'Matriz comparativa dos 4 módulos', lead: 'O que cada módulo ensina, qual o erro típico de prova e qual a frase de fechamento.', grad: 'var(--grad-prev-revisao)' })}

  <div style="overflow-x:auto;">
  <table class="prev-table" style="min-width: 720px;">
    <thead>
      <tr>
        <th>Módulo</th>
        <th>Conceito-chave</th>
        <th>Pergunta clínica que ele responde</th>
        <th>Erro típico de prova</th>
        <th>Frase de fechamento</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><span class="mod-pill --m1">M1</span></td>
        <td>Sensibilidade · Especificidade · RV</td>
        <td>Esse teste detecta doença? Esse teste confirma doença?</td>
        <td>Achar que Sens e Esp dependem de prevalência.</td>
        <td>"Sens detecta, Esp confirma. As duas são propriedades do teste."</td>
      </tr>
      <tr>
        <td><span class="mod-pill --m2">M2</span></td>
        <td>VPP · VPN · Prevalência</td>
        <td>Posso confiar no resultado positivo/negativo neste paciente?</td>
        <td>Confiar cegamente em positivo de população com baixa prevalência.</td>
        <td>"Valores preditivos dependem de quem você examina."</td>
      </tr>
      <tr>
        <td><span class="mod-pill --m3">M3</span></td>
        <td>Curva ROC · AUC · Corte</td>
        <td>Qual o limiar correto e qual teste é melhor?</td>
        <td>Ler "área = sensibilidade" ou esquecer que corte muda S/E.</td>
        <td>"AUC compara testes; o corte é uma decisão clínica."</td>
      </tr>
      <tr>
        <td><span class="mod-pill --m4">M4</span></td>
        <td>Média · Mediana · Moda · Variância · DP</td>
        <td>Como descrevo essa amostra ou compara grupos?</td>
        <td>Usar média em distribuição assimétrica com outlier.</td>
        <td>"Centro descreve onde os dados estão; dispersão, o quanto se espalham."</td>
      </tr>
    </tbody>
  </table>
  </div>

  ${didaxBlock('banca','🎯','Como a banca tenta confundir os módulos','<ul class="tight"><li>Mistura Sens com VPP na mesma alternativa.</li><li>Pede "qual o teste mais sensível" mas dá AUC (resposta: AUC não responde isso sozinho — você precisa do corte).</li><li>Apresenta lista com outlier e pergunta a média, esperando que você não note a distorção.</li><li>Inverte SnNout/SpPin: "teste específico exclui" — falso.</li></ul>')}
  `;
  renderStandard(container, page, body);
};

/* ─────────────────────────────────────────
   SIMULADOR BAYESIANO
───────────────────────────────────────── */
GO_RENDER['simulador-bayesiano'] = function(container, page) {
  const body = `
  ${pageHero({ module: 'integ', moduleLabel: '★ Integração Global', title: 'Simulador Bayesiano — pré-teste × RV → pós-teste', lead: 'Treine o raciocínio clínico bayesiano: como diferentes razões de verossimilhança transformam sua probabilidade pré-teste em probabilidade pós-teste.', grad: 'var(--grad-prev-revisao)' })}

  ${conceptHero({
    question: 'Como decidir entre tratar, observar ou pedir outro teste?',
    title: 'Toda decisão diagnóstica é, no fundo, um cálculo bayesiano',
    lead: 'Sua hipótese pré-teste (baseada em prevalência e clínica) é multiplicada pela razão de verossimilhança do exame. O resultado é a sua probabilidade pós-teste — e é nela que você baseia conduta.'
  })}

  ${PrevInt.bayes({ prev: 0.10, rvp: 10, rvn: 0.10 })}

  ${didaxBlock('formula','🧮','A fórmula por trás do simulador',
    `<p>O cálculo é feito em <strong>odds</strong>, não em probabilidade direta:</p>
    <ol class="tight">
      <li><strong>odds pré</strong> = P / (1 − P)</li>
      <li><strong>odds pós</strong> = odds pré × RV (positiva se teste +, negativa se −)</li>
      <li><strong>P pós</strong> = odds pós / (1 + odds pós)</li>
    </ol>
    <p>Por isso a "probabilidade pós-teste" não é uma simples multiplicação — ela passa pela transformação em odds.</p>`)}

  ${didaxBlock('avancado','⚡','Pontos de referência para banca',
    `<ul class="tight">
      <li><strong>RV+ ≥ 10</strong> → mudança grande, geralmente confirma</li>
      <li><strong>RV+ 5–10</strong> → mudança moderada</li>
      <li><strong>RV+ 2–5</strong> → mudança pequena</li>
      <li><strong>RV+ &lt; 2</strong> → teste praticamente inútil</li>
      <li><strong>RV− ≤ 0,1</strong> → mudança grande para excluir</li>
      <li><strong>RV− 0,1–0,5</strong> → exclusão moderada</li>
      <li><strong>RV− &gt; 0,5</strong> → teste praticamente inútil para excluir</li>
    </ul>`)}

  ${revisaoAtiva([
    { q: 'Se a probabilidade pré-teste é 50% e a RV+ é 10, qual a pós-teste?', a: 'Odds pré = 1. Odds pós = 1×10 = 10. Prob pós = 10/11 ≈ 91%.' },
    { q: 'Por que rastrear doença rara com RV+ apenas moderada é problemático?', a: 'Probabilidade pré-teste muito baixa significa que mesmo multiplicando por RV+ moderada (3–5), a pós-teste continua baixa. Resultado: muitos falsos positivos.' },
    { q: 'Em paciente sintomático típico (pré-teste 40%) com RV− de 0,1, qual a probabilidade pós?', a: 'Odds pré = 0,67. Odds pós = 0,067. Prob ≈ 6%. Quase exclui a doença.' }
  ])}
  `;
  renderStandard(container, page, body);
};

/* ─────────────────────────────────────────
   REVISÃO FINAL
───────────────────────────────────────── */
GO_RENDER['revisao-final'] = function(container, page) {
  const cards = [
    { q: 'Quem muda com a prevalência: Sens/Esp ou VPP/VPN?', a: 'VPP/VPN. Sens e Esp são propriedades do teste, invariantes à prevalência.' },
    { q: 'SnNout significa?', a: 'Teste SENSÍVEL com resultado NEGATIVO descarta (rules OUT) a doença.' },
    { q: 'SpPin significa?', a: 'Teste ESPECÍFICO com resultado POSITIVO confirma (rules IN) a doença.' },
    { q: 'Testes em paralelo aumentam qual parâmetro?', a: 'Sensibilidade. Usados para excluir doença grave (qualquer + = positivo).' },
    { q: 'Testes em série aumentam qual parâmetro?', a: 'Especificidade. Usados para confirmar (ambos + = positivo).' },
    { q: 'O que é AUC?', a: 'Área sob a curva ROC. Mede capacidade diagnóstica geral do teste, independente do ponto de corte. 0,5 = acaso; 1,0 = perfeito.' },
    { q: 'Mover o corte para a direita (mais rígido) faz o quê com Sens e Esp?', a: 'Aumenta Esp, diminui Sens.' },
    { q: 'Quando a média é "pior" que a mediana?', a: 'Distribuições assimétricas com outliers — a média é puxada pelo extremo; a mediana resiste.' },
    { q: 'O que mede o desvio padrão?', a: 'O quanto, em média, os valores se afastam da média. Está na mesma unidade dos dados.' },
    { q: 'Variância × DP — qual a diferença?', a: 'DP = √variância. A variância está em unidades ao quadrado; o DP volta para a unidade original.' },
    { q: 'RV+ ≥ 10 significa o quê na prática?', a: 'Mudança forte na probabilidade pós-teste — quase sempre confirma a hipótese.' },
    { q: 'RV− ≤ 0,1 significa o quê?', a: 'Teste negativo praticamente exclui a doença.' },
  ];

  const body = `
  ${pageHero({ module: 'integ', moduleLabel: '★ Integração Global', title: 'Revisão final — os 24 conceitos não-negociáveis', lead: 'Vire cada cartão. Se você sabe responder os 24 sem hesitar, está pronto para a prova.', grad: 'var(--grad-prev-revisao)' })}

  ${PrevInt.flashdeck(cards)}

  ${sectionTitle('🎯','Quiz integrador final', 'var(--c-amber)')}
  ${PrevInt.quizBanca([
    {
      stem: 'Um novo teste para tuberculose tem sensibilidade de 95% e especificidade de 90%. Aplicado em comunidade com prevalência de 1%, o VPP esperado é cerca de:',
      options: ['8,7%', '47%', '90%', '95%'],
      correct: 0,
      explanation: 'VPP = (S × P) / (S × P + (1−E) × (1−P)) = (0,95 × 0,01) / (0,95 × 0,01 + 0,10 × 0,99) ≈ 0,0087 / 0,1085 ≈ 8,7%. Prevalência baixa derruba o VPP mesmo com excelente Sens.',
      tip: 'A "porquinha torce o rabo": Sens/Esp não mudam, mas VPP despenca em baixa prevalência.'
    },
    {
      stem: 'Um teste tem AUC = 0,72. Sobre ele, é CORRETO afirmar:',
      options: [
        'Sensibilidade = 72%',
        'Sua acurácia é 72%',
        'Discrimina doentes de sãos melhor do que o acaso, mas há sobreposição relevante das distribuições',
        'Especificidade = 28%'
      ],
      correct: 2,
      explanation: 'AUC mede a probabilidade do teste classificar corretamente um par doente-são aleatório. AUC 0,5 = acaso; 0,7–0,8 = bom; >0,9 = excelente. AUC não é Sens, Esp, nem acurácia.',
      tip: 'AUC compara testes; corte determina S/E específicos.'
    },
    {
      stem: 'Em série de glicemias: 80, 90, 95, 100, 105, 110, 800. A média e a mediana são, respectivamente:',
      options: ['154,3 e 100', '154,3 e 105', '100 e 100', '105 e 154'],
      correct: 0,
      explanation: 'Soma = 1280, n = 7 → média ≈ 154,3. Ordenando: 80, 90, 95, 100, 105, 110, 800 → mediana é o 4º = 100. Outlier (800) puxa a média drasticamente; a mediana resiste.',
      tip: 'Sempre suspeite de média quando há outlier — a mediana mostra o "verdadeiro" centro.'
    }
  ], 'Fechamento global — questões de banca')}

  ${didaxBlock('proxima','→','Próximo passo','<p>Aprofunde em qualquer fechamento de módulo (m1-13, m2-10, m3-07, m4-09) ou explore o simulador bayesiano para treinar o raciocínio integrado.</p>')}
  `;
  renderStandard(container, page, body);
};

/* ─────────────────────────────────────────
   INSTALAR APP (PWA)
───────────────────────────────────────── */
GO_RENDER['instalar-app'] = function(container, page) {
  const body = `
  ${pageHero({ module: 'integ', moduleLabel: '★ App PWA', title: 'Instale a plataforma no seu celular', lead: 'Estude offline, com ícone próprio, em tela cheia, no metrô, na fila, na sala de estudo.', grad: 'var(--grad-prev-revisao)' })}

  ${conceptHero({
    question: 'Por que instalar como PWA?',
    title: 'Velocidade, offline e foco — sem distração de navegador',
    lead: 'A plataforma funciona como um aplicativo nativo: cache inteligente, abre sem internet, fica no menu do seu celular como qualquer outro app.'
  })}

  <div class="split2">
    <div class="split-card --a">
      <h4><span class="dot"></span>📱 iPhone / iPad (Safari)</h4>
      <ol style="font-size:14px; color:var(--text-secondary); line-height:1.7; margin:0 0 0 18px;">
        <li>Abra esta plataforma no Safari.</li>
        <li>Toque no ícone <strong>Compartilhar</strong> (quadrado com seta).</li>
        <li>Selecione <strong>"Adicionar à Tela de Início"</strong>.</li>
        <li>Confirme o nome "Preventiva" e toque em Adicionar.</li>
      </ol>
    </div>
    <div class="split-card --b">
      <h4><span class="dot"></span>🤖 Android (Chrome)</h4>
      <ol style="font-size:14px; color:var(--text-secondary); line-height:1.7; margin:0 0 0 18px;">
        <li>Abra no Chrome.</li>
        <li>Toque no menu <strong>⋮</strong> (três pontos).</li>
        <li>Escolha <strong>"Instalar aplicativo"</strong> ou "Adicionar à tela inicial".</li>
        <li>Confirme. O app aparece no launcher.</li>
      </ol>
    </div>
  </div>

  ${didaxBlock('importa','💡','O que funciona offline',
    `<ul class="tight">
      <li>Todas as páginas que você já visitou ficam em cache.</li>
      <li>Componentes interativos (tabela 2x2, calculadora, ROC) rodam 100% no seu dispositivo.</li>
      <li>Progresso é salvo localmente — não precisa de conta.</li>
      <li>Quando voltar online, atualizações são baixadas em segundo plano.</li>
    </ul>`)}
  `;
  renderStandard(container, page, body);
};
