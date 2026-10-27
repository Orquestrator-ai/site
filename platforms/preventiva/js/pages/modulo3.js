/* =========================================
   MÓDULO 3 — CURVA ROC, PONTOS DE CORTE E ÁREA SOB A CURVA
   7 páginas (m3-01 a m3-07).
   Eixo pedagógico: hemoglobina glicada (ponto B = 5,7) +
   comparação entre testes via AUC ("A com A").
   Identidade visual: laranja (corte/limiar) + violeta (AUC).
   ========================================= */

/* ─────────────────────────────────────────
   PÁGINA 1 — Da razão de verossimilhança à Curva ROC
───────────────────────────────────────── */
GO_RENDER['m3-01'] = function(container, page) {
  const body = `
  ${pageHero({
    module: 'm3', moduleLabel: 'Módulo 3 — Curva ROC', pageNum: 1,
    title: 'Da razão de verossimilhança à Curva ROC',
    lead: 'Razão de verossimilhança é matemática. Curva ROC é gráfico. As duas conversam com sensibilidade e especificidade — mas respondem perguntas diferentes.',
    grad: 'var(--grad-m3)'
  })}

  ${jornadaBar({
    from: { module: 'm2', label: 'Valores Preditivos — VPP/VPN' },
    current: { module: 'm3', label: 'Curva ROC' },
    next: { module: 'm4', label: 'Tendência Central e Dispersão' }
  })}

  ${conceptHero({
    question: 'Pergunta central',
    title: 'Se a razão de verossimilhança já ajuda a interpretar testes, por que existe a Curva ROC?',
    lead: 'Porque a primeira responde "quanto esse resultado muda minha confiança?" — e a segunda responde "como sensibilidade e especificidade se comportam quando eu mexo o ponto de corte?".',
    glow: 'rgba(249,115,22,.22)'
  })}

  <div class="split2" style="margin: 14px 0;">
    ${crossLink({
      module: 'm1', pageId: 'm1-12', variant: 'recap',
      label: 'Revisar Razão de Verossimilhança (M1)',
      hint: 'A ponte matemática que abre esta página.'
    })}
    ${crossLink({
      module: 'm2', pageId: 'm2-10', variant: 'recap',
      label: 'Revisar fechamento do M2 — Sens/Esp × VPP/VPN',
      hint: 'A relação que será destrinchada visualmente pela ROC.'
    })}
  </div>

  ${keyTerms(['razão de verossimilhança','Curva ROC','sensibilidade','especificidade','resultado positivo','resultado negativo','raciocínio matemático','raciocínio visual'], 'orange')}

  ${svgIllus(PrevSVG.rocDidatica(), 'A Curva ROC: cada ponto é um corte. O canto superior-esquerdo é o melhor corte. A diagonal é o teste-acaso. AUC = área sob a curva.')}

  <div class="prose">
    <p>Antes de entrar na Curva ROC, é preciso separar duas ideias que costumam se misturar: <strong>razão de verossimilhança</strong> e <strong>representação gráfica do desempenho de um teste</strong>. As duas conversam com sensibilidade e especificidade, mas não são a mesma ferramenta.</p>

    <p>A <span class="keyword">razão de verossimilhança</span> é uma forma <strong>matemática</strong> de responder uma pergunta clínica: <em>"quanto esse resultado muda a minha confiança?"</em>. Quando o teste vem positivo, interessa saber se esse positivo é realmente forte — por isso, quanto maior a <strong>RV+</strong>, mais o resultado positivo aumenta a chance de doença. Quando o teste vem negativo, a pergunta muda: <em>"posso confiar nesse negativo?"</em>. Por isso, quanto <strong>menor a RV−</strong>, mais o teste ajuda a afastar doença.</p>

    <p>A <span class="keyword">Curva ROC</span> entra por outra porta. Ela não nasce para substituir o raciocínio da razão de verossimilhança — nasce para permitir que o desempenho do teste seja enxergado em um <strong>gráfico</strong>. Em vez de pensar só em fórmula, o aluno passa a ver como sensibilidade e especificidade se comportam <em>quando o ponto de corte muda</em>.</p>

    <p class="pulled">Essa distinção é fundamental para prova: se a questão fala em confiar mais no positivo ou no negativo com <strong>números de RV</strong>, é raciocínio matemático. Se a questão mostra um <strong>gráfico</strong> com sensibilidade no eixo Y e 1 − especificidade no eixo X, é raciocínio visual: é Curva ROC.</p>

    <p>A Curva ROC, portanto, deve ser apresentada como um <strong>mapa visual</strong> da disputa entre dois desejos clínicos: detectar o máximo de doentes possível e, ao mesmo tempo, evitar classificar saudáveis como doentes. Essa tensão é o coração de todos os pontos de corte.</p>
  </div>

  ${sectionTitle('🧮','Duas ferramentas, duas perguntas — separe na cabeça', 'm3')}
  <div class="split2">
    <div class="case-card --violet">
      <div class="case-card-head">RAZÃO DE VEROSSIMILHANÇA — matemática</div>
      <p>Responde com <strong>números</strong>: quanto esse resultado <em>positivo</em> ou <em>negativo</em> muda a chance da doença?</p>
      <ul class="tight">
        <li><strong>RV+ alta</strong> → confiar mais no positivo.</li>
        <li><strong>RV− baixa</strong> → confiar mais no negativo.</li>
        <li>RV+ = Sens ÷ (1 − Esp)</li>
        <li>RV− = (1 − Sens) ÷ Esp</li>
      </ul>
    </div>
    <div class="case-card --orange">
      <div class="case-card-head">CURVA ROC — gráfico</div>
      <p>Responde com <strong>posição no plano</strong>: como Sens e Esp se comportam ao longo dos pontos de corte?</p>
      <ul class="tight">
        <li>Eixo Y = sensibilidade.</li>
        <li>Eixo X = 1 − especificidade (taxa de falso positivo).</li>
        <li>Cada ponto da curva = um ponto de corte diferente.</li>
        <li>É a ferramenta para <strong>comparar testes</strong> e <strong>escolher corte</strong>.</li>
      </ul>
    </div>
  </div>

  ${didaxBlock('caso','🩺','Caso-guia: dois estudantes, duas questões',
    `<p>Estudante 1 abre uma questão com: <em>"RV+ = 12 e RV− = 0,08. Qual o impacto desses valores na interpretação do exame?"</em></p>
     <p>Estudante 2 abre outra questão com um <em>gráfico</em>: eixo Y "sensibilidade", eixo X "1 − especificidade", três pontos A, B, C marcados sobre uma curva.</p>
     <p><strong>Reconhecimento:</strong> a primeira é razão de verossimilhança (cálculo). A segunda é Curva ROC (gráfico). Antes de qualquer conta, identifique <em>qual ferramenta</em> a questão está pedindo.</p>`)}

  ${formulaBox('Fórmulas que conectam as duas ferramentas',
    `RV+ = Sensibilidade ÷ (1 − Especificidade)<br>RV− = (1 − Sensibilidade) ÷ Especificidade`,
    'Note que "(1 − Especificidade)" aparece nas duas — é exatamente o eixo X da Curva ROC. Não é coincidência: ROC e RV são duas linguagens para a mesma trade-off.')}

  ${didaxBlock('importa','💡','Por que isso importa na prática?',
    `<p>Na vida real, o médico precisa de duas perguntas diferentes em momentos diferentes. <em>"Esse resultado positivo muda muito minha conduta?"</em> — pergunta de razão de verossimilhança. <em>"Qual ponto de corte equilibra melhor sensibilidade e especificidade no rastreamento?"</em> — pergunta de Curva ROC. Confundir as duas ferramentas é confundir as duas perguntas.</p>`)}

  ${bancaCallout(`<p>A banca quer que o aluno <strong>não confunda ferramentas</strong>:</p>
    <ul class="tight">
      <li>Razão de verossimilhança = cálculo aplicado ao <strong>impacto do resultado</strong>.</li>
      <li>Curva ROC = gráfico de <strong>desempenho diagnóstico em diferentes cortes</strong>.</li>
      <li>Se há gráfico XY com Sens no eixo Y, é ROC — e o eixo X provavelmente é 1 − especificidade.</li>
    </ul>`)}

  ${didaxBlock('pegadinha','⚠️','Pegadinha de prova',
    `<p>A questão pode mencionar sensibilidade, especificidade e razão de verossimilhança na <em>mesma alternativa</em> para confundir. Se há gráfico ROC explícito, o eixo X provavelmente será <strong>1 − especificidade</strong>, não a especificidade diretamente.</p>`)}

  ${didaxBlock('naoconfunda','🔀','Não confunda',
    `<ul class="tight">
      <li><strong>RV+ alta:</strong> fortalece o resultado positivo.</li>
      <li><strong>RV− baixa:</strong> fortalece o resultado negativo.</li>
      <li><strong>Curva ROC:</strong> mostra <em>visualmente</em> a relação Sens/Esp em vários cortes.</li>
    </ul>`)}

  ${didaxBlock('errocomum','❌','Erro comum',
    `<p>Achar que "Curva ROC é a fórmula da razão de verossimilhança desenhada". <strong>Não é.</strong> Ela é uma ferramenta gráfica para avaliar e comparar desempenho de testes ao longo de diferentes cortes.</p>`)}

  ${didaxBlock('avancado','⚡','O que diferencia o aluno avançado',
    `<p>O aluno avançado percebe que a Curva ROC é útil <strong>antes</strong> mesmo de decorar qualquer ponto: ela mostra o <em>custo</em> de deslocar um corte. Ganhar sensibilidade geralmente custa especificidade. Ganhar especificidade geralmente custa sensibilidade. A ROC é a foto desse trade-off.</p>`)}

  ${sectionTitle('🔁','Vire o cartão — separe ferramenta e pergunta', 'm3')}
  ${PrevInt.flashdeck([
    { q: 'A questão me dá RV+ = 12 e RV− = 0,08. É RV ou ROC?', a: 'É razão de verossimilhança (cálculo). RV+ alta fortalece o positivo; RV− baixa fortalece o negativo. Não há gráfico envolvido.' },
    { q: 'A questão me mostra um gráfico XY com Sens no eixo Y. É RV ou ROC?', a: 'É Curva ROC (raciocínio visual). Eixo X = 1 − Especificidade. Cada ponto da curva = um ponto de corte diferente.' },
    { q: 'Como ler "RV+ alta" em uma frase clínica?', a: 'Significa "confiar mais no positivo". Quanto maior a RV+, mais o teste positivo eleva a probabilidade pós-teste de doença.' },
    { q: 'Como ler "RV− baixa" em uma frase clínica?', a: 'Significa "confiar mais no negativo". Quanto menor a RV−, mais o teste negativo afasta doença.' },
    { q: 'O que a Curva ROC mostra que a RV sozinha não mostra?', a: 'O trade-off ao longo de TODOS os pontos de corte simultaneamente. RV avalia um corte fixo; ROC compara cortes (e testes inteiros).' }
  ])}

  ${revisaoAtiva([
    { q: 'Qual ferramenta é mais diretamente matemática: razão de verossimilhança ou Curva ROC?', a: 'A razão de verossimilhança — é cálculo (RV+ = Sens/(1−Esp); RV− = (1−Sens)/Esp). A Curva ROC é gráfica.' },
    { q: 'Se quero confiar mais no resultado positivo, procuro RV+ alta ou baixa?', a: 'RV+ alta. Quanto maior a RV+, mais o positivo eleva a chance de doença.' },
    { q: 'Se quero confiar mais no resultado negativo, procuro RV− alta ou baixa?', a: 'RV− baixa. Quanto menor a RV−, mais o negativo reduz a chance de doença.' },
    { q: 'A Curva ROC representa visualmente quais duas propriedades?', a: 'Sensibilidade (eixo Y) e 1 − especificidade (eixo X). É um gráfico do trade-off ao longo dos pontos de corte.' }
  ])}

  ${pageFooterMeta({
    resumo: 'Razão de verossimilhança é cálculo; Curva ROC é gráfico. Ambas conversam com desempenho diagnóstico, mas a ROC será usada para enxergar pontos de corte e comparar testes.',
    proximaConexao: 'Agora que sabemos que a ROC é gráfico, vamos aprender a LER seus eixos — especialmente o eixo X, que é onde as questões mais confundem.',
    nextId: 'm3-02'
  })}
  `;
  renderStandard(container, page, body);
};

/* ─────────────────────────────────────────
   PÁGINA 2 — Como ler os eixos da Curva ROC
───────────────────────────────────────── */
GO_RENDER['m3-02'] = function(container, page) {
  const body = `
  ${pageHero({
    module: 'm3', moduleLabel: 'Módulo 3 — Curva ROC', pageNum: 2,
    title: 'Como ler os eixos da Curva ROC',
    lead: 'Quanto mais superior, mais sensível. Especificidade aumenta para a esquerda. Falso positivo aumenta para a direita. Três frases que resolvem metade das questões de banca.',
    grad: 'var(--grad-m3)'
  })}

  ${conceptHero({
    question: 'Pergunta central',
    title: 'Por que o eixo Y é sensibilidade, mas o eixo X NÃO é especificidade diretamente?',
    lead: 'Porque a ROC clássica usa o COMPLEMENTO da especificidade: 1 − Esp. E esse complemento tem um nome clínico — taxa de falso positivo.',
    glow: 'rgba(249,115,22,.22)'
  })}

  ${keyTerms(['eixo Y','sensibilidade','eixo X','1 − especificidade','falso positivo','especificidade à esquerda','falso positivo à direita','taxa de FP'])}

  <div class="prose">
    <p>A Curva ROC é um gráfico XY comum, mas com uma armadilha importante. O eixo Y é direto: representa a <strong>sensibilidade</strong>. Portanto, quanto mais alto está um ponto, maior é a sensibilidade daquele corte. A primeira frase de fixação é: <strong>quanto mais superior, mais sensível</strong>.</p>

    <p>A confusão começa no eixo X. Seria intuitivo imaginar que o eixo X mostra a especificidade. Mas a Curva ROC clássica <strong>não usa a especificidade diretamente</strong>. Ela usa o <em>complemento</em> da especificidade: <strong>1 − especificidade</strong>.</p>

    <p>Esse complemento tem significado clínico forte. Se a especificidade é a capacidade do teste dar negativo nos não doentes, então <strong>1 − especificidade representa o oposto</strong>: a chance de o teste dar positivo em pessoas que <em>não</em> têm a doença. Em outras palavras, o eixo X representa a <span class="keyword">taxa de falso positivo</span>.</p>

    <p class="pulled">Frase que precisa entrar para a prova: <strong>a especificidade aumenta para a esquerda e o falso positivo aumenta para a direita</strong>. O lado esquerdo é o território de maior especificidade. O lado direito é o território de mais falsos positivos.</p>

    <p>Por isso uma questão pode parecer simples e ainda assim derrubar gente. Quando ela pergunta <em>"qual ponto tem maior falso positivo?"</em>, o aluno não deve procurar o ponto mais específico — deve procurar o ponto <strong>mais à direita</strong>. Quando pergunta <em>"qual ponto é mais específico?"</em>, deve procurar o ponto <strong>mais à esquerda</strong>.</p>
  </div>

  ${sectionTitle('🧭','Explorador interativo dos eixos — mexa o corte e veja o ponto andar', 'm3')}
  <p class="mt-prose">Use o slider abaixo: ao <strong>baixar o corte</strong>, o ponto sobe na ROC (mais sensível) e vai à direita (mais falso positivo). Ao <strong>subir o corte</strong>, o ponto desce e vai à esquerda (mais específico). É o mapa físico das três frases-chave.</p>
  ${PrevInt.rocCurva({ mu0: 4.8, sd0: 0.55, mu1: 7.5, sd1: 1.05, cut: 6.5, label: 'HbA1c (%)', range: [3, 12] })}

  ${didaxBlock('caso','🩺','Caso-guia: três pontos na curva',
    `<p>Um teste é representado em uma ROC com três pontos: <strong>A</strong> (mais à esquerda, intermediário), <strong>B</strong> (ponto central, equilíbrio) e <strong>C</strong> (mais alto e mais à direita).</p>
    <p><strong>Pergunta-guia:</strong></p>
    <ul class="tight">
      <li>Qual é mais sensível? — <strong>C</strong> (mais alto).</li>
      <li>Qual é mais específico? — <strong>A</strong> (mais à esquerda).</li>
      <li>Qual tem mais falso positivo? — <strong>C</strong> (mais à direita).</li>
    </ul>
    <p><strong>Lição:</strong> a posição no plano ROC traduz automaticamente as três propriedades. Treine a leitura antes da matemática.</p>`)}

  ${formulaBox('Eixo X deduzido a partir do conceito',
    `Especificidade = VN ÷ (VN + FP)<br>1 − Especificidade = FP ÷ (VN + FP)<br>= TAXA DE FALSO POSITIVO`,
    'Entre os não doentes (VN + FP), 1 − Esp é a fração classificada erroneamente como positiva. Isso transforma o eixo X em uma medida do CUSTO de errar classificando saudáveis como doentes.')}

  ${didaxBlock('numerico','🔢','Exemplo numérico simples',
    `<p>Suponha que, entre 100 não doentes, 90 testam negativo e 10 testam positivo:</p>
    <ul class="tight">
      <li><strong>Especificidade</strong> = 90 ÷ 100 = <strong>90%</strong>.</li>
      <li><strong>1 − Especificidade</strong> = 10 ÷ 100 = <strong>10%</strong>.</li>
      <li><strong>Taxa de falso positivo</strong> = <strong>10%</strong>.</li>
    </ul>
    <p>Esse 10% é o valor que apareceria no eixo X para esse ponto da curva.</p>`)}

  ${didaxBlock('importa','💡','Por que isso importa na prática?',
    `<p>Quando um corte é alterado, ele muda quem será classificado como positivo ou negativo. Isso pode <strong>aumentar a detecção</strong> de casos — mas também aumentar <strong>alarmes falsos</strong>. A leitura correta dos eixos evita interpretações erradas de rastreamento, diagnóstico e comparação de testes.</p>`)}

  ${bancaCallout(`<p>A banca quer que o aluno lembre que <strong>o eixo X NÃO é especificidade</strong>: é <strong>1 − especificidade</strong>. Logo:</p>
    <ul class="tight">
      <li>Ir para a direita <strong>não</strong> significa ficar mais específico.</li>
      <li>Ir para a direita significa <strong>aumentar falso positivo</strong>.</li>
      <li>Para mais especificidade, o ponto deve ir para a <strong>esquerda</strong>.</li>
    </ul>`)}

  ${didaxBlock('pegadinha','⚠️','Pegadinha de prova — atenção redobrada',
    `<p>Algumas bancas rotulam o eixo X de forma <em>incompleta</em> ou <strong>errada</strong> (ex.: escrevem apenas "especificidade" quando deveria ser "1 − especificidade"). Mesmo assim, se o gráfico é uma Curva ROC, a leitura correta é: <strong>eixo Y = sensibilidade; eixo X = 1 − especificidade</strong>. Reconheça o padrão e não brigue com a banca na hora da prova.</p>`)}

  ${didaxBlock('naoconfunda','🔀','Não confunda — quatro direções',
    `<ul class="tight">
      <li><strong>Para cima:</strong> mais sensibilidade.</li>
      <li><strong>Para a esquerda:</strong> mais especificidade.</li>
      <li><strong>Para a direita:</strong> mais falso positivo.</li>
      <li><strong>Melhor ponto:</strong> alto E à esquerda.</li>
    </ul>`)}

  ${didaxBlock('errocomum','❌','Erro comum',
    `<p>Dizer que o ponto mais à direita é o mais específico. <strong>Na ROC, isso está invertido:</strong> mais à direita significa maior 1 − especificidade, ou seja, <em>mais falso positivo</em>.</p>`)}

  ${didaxBlock('avancado','⚡','O que diferencia o aluno avançado',
    `<p>O aluno avançado entende que "1 − especificidade" <strong>não é uma escolha aleatória</strong>: é a taxa de falso positivo. Isso transforma o eixo X em uma <em>medida do custo</em> de errar classificando saudáveis como doentes. É por isso que a ROC é uma ferramenta de <strong>decisão de corte</strong>, não só de descrição.</p>`)}

  ${revisaoAtiva([
    { q: 'O eixo Y da Curva ROC representa o quê?', a: 'Sensibilidade. Quanto mais superior o ponto, maior a sensibilidade daquele corte.' },
    { q: 'O eixo X representa especificidade ou 1 − especificidade?', a: '1 − especificidade — também chamado de taxa de falso positivo. NÃO é a especificidade direta.' },
    { q: 'Para onde aumenta a especificidade?', a: 'Para a esquerda. À esquerda, o valor de 1 − Esp é menor, então a Esp é maior.' },
    { q: 'Para onde aumenta a taxa de falso positivo?', a: 'Para a direita. Quanto mais à direita, maior 1 − Esp e maior a fração de FP entre os não doentes.' },
    { q: 'Qual ponto é mais sensível: o mais alto ou o mais à direita?', a: 'O mais ALTO. A sensibilidade está no eixo Y — andar para a direita altera o falso positivo, não a sensibilidade.' }
  ])}

  ${pageFooterMeta({
    resumo: 'Na Curva ROC: subir = ganhar sensibilidade; ir à esquerda = ganhar especificidade; ir à direita = aumentar falso positivo. Eixo X é 1 − Esp = taxa de FP.',
    proximaConexao: 'Com as direções dominadas, fica fácil identificar o ponto mais importante de qualquer ROC — o ponto superior esquerdo.',
    nextId: 'm3-03'
  })}
  `;
  renderStandard(container, page, body);
};

/* ─────────────────────────────────────────
   PÁGINA 3 — O melhor ponto: superior e à esquerda
───────────────────────────────────────── */
GO_RENDER['m3-03'] = function(container, page) {
  const body = `
  ${pageHero({
    module: 'm3', moduleLabel: 'Módulo 3 — Curva ROC', pageNum: 3,
    title: 'O melhor ponto da Curva ROC: superior e à esquerda',
    lead: 'Alto porque é sensível. À esquerda porque é específico. O canto superior esquerdo é o ideal diagnóstico — e o ponto mais próximo dele é o melhor equilíbrio.',
    grad: 'var(--grad-m3)'
  })}

  ${conceptHero({
    question: 'Pergunta central',
    title: 'Como identificar rapidamente o melhor ponto de corte em uma Curva ROC?',
    lead: 'Procurar o ponto que esteja simultaneamente o MAIS ALTO POSSÍVEL (sensibilidade) e o MAIS À ESQUERDA POSSÍVEL (especificidade). É o ponto mais próximo do canto superior esquerdo.',
    glow: 'rgba(249,115,22,.22)'
  })}

  ${keyTerms(['ponto superior esquerdo','melhor ponto','alta sensibilidade','alta especificidade','equilíbrio diagnóstico','ponto de corte','ideal diagnóstico'])}

  <div class="prose">
    <p>Depois que o aluno entende os eixos, a leitura do melhor ponto fica quase automática. O melhor ponto da Curva ROC é aquele que fica <strong>mais perto do canto superior esquerdo</strong>. Ele é <em>superior</em> porque tem alta sensibilidade. Ele é <em>à esquerda</em> porque tem alta especificidade.</p>

    <p>Esse ponto é desejável porque junta dois objetivos que frequentemente entram em conflito: detectar a maior quantidade possível de doentes e, ao mesmo tempo, evitar classificar muitos não doentes como positivos. Em linguagem prática, ele tenta <strong>reduzir tanto falsos negativos quanto falsos positivos</strong>.</p>

    <p>A prova costuma perguntar isso de forma direta: <em>"qual é o melhor ponto na Curva ROC?"</em>. A resposta não deve virar uma discussão longa. O aluno olha para o gráfico e procura o ponto que esteja mais alto E mais à esquerda.</p>

    <p class="pulled">O canto superior esquerdo é uma espécie de <strong>ideal diagnóstico</strong>. Um teste perfeito teria sensibilidade de 100% e falso positivo de 0% — exatamente o canto (0, 1). Na prática, os testes não são perfeitos, mas quanto mais a curva e seus pontos se aproximam dessa região, melhor tende a ser o desempenho.</p>

    <p>Esta página deve ensinar o aluno a <strong>transformar posição espacial em raciocínio clínico</strong>: alto significa <em>não deixar doentes passarem</em>; esquerdo significa <em>não acusar saudáveis indevidamente</em>.</p>
  </div>

  ${sectionTitle('⭐','Identificando o ponto ideal — interativo', 'm3')}
  <p class="mt-prose">Brinque com o slider: posicione o ponto de corte de modo que o marcador na ROC chegue o mais próximo possível do <strong>canto superior esquerdo</strong>. Esse é o ponto que combina alta Sens E alta Esp ao mesmo tempo.</p>
  ${PrevInt.rocCurva({ mu0: 4.9, sd0: 0.45, mu1: 7.8, sd1: 0.85, cut: 6.2, label: 'Marcador (un.)', range: [3, 12] })}

  ${didaxBlock('caso','🩺','Caso-guia: três pontos competindo',
    `<p>Em uma Curva ROC aparecem três candidatos a corte:</p>
    <ul class="tight">
      <li><strong>Ponto X</strong> — muito alto, mas muito à direita. Sens 95%, Esp 50%.</li>
      <li><strong>Ponto Y</strong> — muito à esquerda, mas muito baixo. Sens 55%, Esp 95%.</li>
      <li><strong>Ponto Z</strong> — alto E à esquerda. Sens 88%, Esp 87%.</li>
    </ul>
    <p><strong>Pergunta-guia:</strong> qual é o melhor ponto geral? <strong>Resposta: Z</strong>. X é sensível demais ao custo de explosão de falso positivo. Y é específico demais ao custo de perder doentes. Z combina as duas dimensões.</p>`)}

  ${formulaBox('Lógica do melhor ponto — sem cálculo pesado',
    `Sensibilidade alta = poucos falsos negativos<br>Especificidade alta = poucos falsos positivos<br>MELHOR PONTO GERAL = alta Sens + alta Esp simultaneamente`,
    'O canto (0, 1) representaria 100% Sens e 0% FP — o ideal teórico. Curvas reais não chegam lá, mas o ponto MAIS PRÓXIMO dele costuma ser o melhor equilíbrio.')}

  ${didaxBlock('importa','💡','Por que isso importa na prática?',
    `<p>Escolher um ponto de corte não é escolher um número qualquer. É decidir <strong>quantas pessoas serão investigadas, tratadas, tranquilizadas ou acompanhadas</strong>. O ponto superior esquerdo representa o melhor compromisso global entre detectar doença e evitar excesso de falso positivo. Toda diretriz clínica acaba escolhendo um ponto dessa região — explícita ou implicitamente.</p>`)}

  ${bancaCallout(`<p>A banca quer reconhecimento visual rápido:</p>
    <ul class="tight">
      <li><strong>Melhor ponto = mais superior E mais à esquerda.</strong></li>
      <li>Não é só o mais alto. Não é só o mais à esquerda. É a <strong>combinação</strong>.</li>
      <li>Mais próximo do canto (0, 1) = melhor desempenho.</li>
    </ul>`)}

  ${didaxBlock('pegadinha','⚠️','Pegadinha de prova',
    `<p>A questão pode oferecer um ponto <strong>muito alto, mas muito à direita</strong>. Ele é sensível, mas gera muitos falsos positivos. Também pode oferecer um ponto <strong>muito à esquerda, mas baixo</strong>. Ele é específico, mas perde sensibilidade. <strong>O melhor equilíbrio está no ponto que combina as duas direções</strong> — não em extremos isolados.</p>`)}

  ${didaxBlock('naoconfunda','🔀','Não confunda',
    `<ul class="tight">
      <li>Mais alto <em>isoladamente</em> não é necessariamente melhor — pode estar muito à direita.</li>
      <li>Mais à esquerda <em>isoladamente</em> não é necessariamente melhor — pode estar muito baixo.</li>
      <li><strong>Melhor ponto = altura E esquerda, juntas.</strong></li>
    </ul>`)}

  ${didaxBlock('errocomum','❌','Erro comum',
    `<p>Escolher o ponto mais alto sem perceber que ele aumentou muito o falso positivo. Esse erro vem de ler apenas o eixo Y e ignorar o X — clássico em quem decorou "ROC = subir" sem entender a dimensão horizontal.</p>`)}

  ${didaxBlock('avancado','⚡','O que diferencia o aluno avançado',
    `<p>O aluno avançado sabe que "melhor" <strong>depende do objetivo clínico</strong>. Em <em>rastreamento</em>, pode-se aceitar mais sensibilidade (deslocar à direita). Em <em>confirmação diagnóstica</em>, pode-se privilegiar especificidade (deslocar à esquerda). Mas quando a questão pede o melhor ponto <strong>geral</strong> da ROC, o padrão é o superior esquerdo. Domine o caso geral antes de ajustar para contextos.</p>`)}

  ${revisaoAtiva([
    { q: 'Qual é o melhor ponto geral na ROC?', a: 'O mais próximo do canto superior esquerdo — combina alta sensibilidade (cima) com alta especificidade (esquerda).' },
    { q: 'Por que o ponto superior esquerdo é desejável?', a: 'Porque reduz simultaneamente falsos negativos (alta Sens) e falsos positivos (alta Esp) — os dois principais erros diagnósticos.' },
    { q: 'O ponto mais alto sempre é o melhor?', a: 'Não. Pode estar muito à direita (alto falso positivo). Altura isolada não basta — precisa estar também à esquerda.' },
    { q: 'O ponto mais à esquerda sempre é o melhor?', a: 'Não. Pode estar muito baixo (baixa sensibilidade). Posição esquerda isolada não basta — precisa também estar alto.' }
  ])}

  ${pageFooterMeta({
    resumo: 'O melhor ponto geral da Curva ROC é o mais próximo do canto superior esquerdo: alta Sens + alta Esp simultaneamente. Não é altura isolada nem esquerda isolada — é a combinação.',
    proximaConexao: 'Agora que sabemos identificar o melhor ponto, vamos ver como ele VIRA, na prática, um valor de referência de exame — com a hemoglobina glicada como exemplo.',
    nextId: 'm3-04'
  })}
  `;
  renderStandard(container, page, body);
};

/* ─────────────────────────────────────────
   PÁGINA 4 — De onde vêm os valores de referência? HbA1c
───────────────────────────────────────── */
GO_RENDER['m3-04'] = function(container, page) {
  const body = `
  ${pageHero({
    module: 'm3', moduleLabel: 'Módulo 3 — Curva ROC', pageNum: 4,
    title: 'De onde vêm os valores de referência? O exemplo da hemoglobina glicada',
    lead: 'O valor de referência não desceu de um anjo do céu. Ele nasceu de uma Curva ROC, de um ponto B que ficou mais perto do canto superior esquerdo — e virou 5,7.',
    grad: 'var(--grad-m3)'
  })}

  ${conceptHero({
    question: 'Pergunta central',
    title: 'Por que o ponto B, em 5,7, vira referência para a hemoglobina glicada?',
    lead: 'Porque, na Curva ROC do teste, é o ponto que oferece o melhor equilíbrio entre detectar risco glicêmico e evitar excesso de falsos positivos. O número 5,7 é a TRADUÇÃO numérica do ponto superior esquerdo.',
    glow: 'rgba(249,115,22,.22)'
  })}

  ${keyTerms(['valor de referência','valor de normalidade','hemoglobina glicada','HbA1c','5,7','ponto B','ponto de corte','equilíbrio diagnóstico'])}

  <div class="prose">
    <p>Todo estudante de Medicina está acostumado a olhar um exame laboratorial e ver, ao lado do resultado, um <strong>"valor de referência"</strong>. Essa informação parece tão natural que muitas vezes passa despercebida. Mas ela não apareceu por acaso.</p>

    <p class="pulled">A pergunta que precisa ser provocada é: <em>de onde veio esse número?</em> Ele <strong>não desceu de um anjo do céu</strong> trazendo os valores normais da humanidade. Ele foi construído a partir de estudos populacionais, comparação entre doentes e não doentes, análise de desempenho diagnóstico — e escolha de pontos de corte.</p>

    <p>A Curva ROC ajuda justamente nesse processo. Ao testar diferentes pontos de corte, ela mostra como sensibilidade e especificidade mudam. O <strong>melhor ponto geral</strong> — aquele mais superior e à esquerda — pode se transformar em um <em>valor de referência</em> ou em um limite usado para interpretação clínica.</p>

    <p>O exemplo didático central é a <span class="keyword">hemoglobina glicada</span>. Na aula, o <strong>ponto B</strong> é apresentado como o melhor ponto da curva e associado ao valor <strong>5,7</strong>. Esse número aparece como ponto de corte porque representa uma região de equilíbrio: <em>sensibilidade suficiente</em> para detectar risco/doença e <em>especificidade suficiente</em> para evitar excesso de falsos positivos.</p>

    <p>Esse raciocínio não vale só para HbA1c. Ele se aplica, com adaptações, a muitos exames laboratoriais, imagens, escalas clínicas e testes de rastreamento. <strong>Sempre que há um "normal" e um "alterado", existe por trás uma decisão sobre ponto de corte</strong> — uma escolha feita a partir de desempenho diagnóstico em uma população estudada.</p>
  </div>

  ${sectionTitle('🩸','Simulador HbA1c — de onde veio o 5,7?', 'm3')}
  <p class="mt-prose">Mova o slider e observe: no corte <strong>5,7</strong>, o ponto da ROC chega o mais próximo possível do canto superior esquerdo — é o <em>ponto B</em>. Para cortes <strong>abaixo de 5,7</strong>, ganhamos sensibilidade mas explodimos o falso positivo (ponto C). Para cortes <strong>acima de 5,7</strong>, ganhamos especificidade mas perdemos doentes (ponto A).</p>
  ${PrevInt.rocCurva({ mu0: 5.1, sd0: 0.40, mu1: 6.6, sd1: 0.70, cut: 5.7, label: 'HbA1c (%)', range: [4, 8] })}

  ${didaxBlock('caso','🩺','Caso-guia: por que não 5,4 ou 6,1?',
    `<p>Um aluno olha o exame e pergunta: <em>"se o ponto de referência da HbA1c é 5,7, por que não 5,4? Por que não 6,1?"</em>.</p>
    <p><strong>Resposta com a Curva ROC:</strong></p>
    <ul class="tight">
      <li><strong>5,4</strong> — ponto C: mais sensível, mas mais falsos positivos (pessoas pré-diabéticas seriam superestimadas).</li>
      <li><strong>5,7</strong> — ponto B: melhor equilíbrio. Sens e Esp suficientes.</li>
      <li><strong>6,1</strong> — ponto A: mais específico, mas mais falsos negativos (pessoas em risco seriam perdidas).</li>
    </ul>
    <p>O 5,7 não é arbitrário — é o ponto que <strong>maximiza</strong> sensibilidade <em>e</em> especificidade simultaneamente, dentro do estudo que originou a referência.</p>`)}

  ${formulaBox('Reforço — direções e medidas',
    `Eixo Y = Sensibilidade<br>Eixo X = 1 − Especificidade (taxa de FP)<br>Melhor ponto geral = mais Sens possível com mais Esp possível`,
    'O valor de referência (ex.: 5,7) é a TRADUÇÃO NUMÉRICA do melhor ponto. A Curva ROC fornece a posição; o eixo do exame fornece o número.')}

  ${didaxBlock('importa','💡','Por que isso importa na prática?',
    `<p>Valores de referência orientam <strong>rastreamento, diagnóstico, acompanhamento e conduta</strong>. Entender que eles derivam de desempenho diagnóstico impede que o aluno trate números como verdades mágicas, desconectadas da população estudada. Um valor de referência é uma <em>decisão informada</em> — não uma lei natural.</p>`)}

  ${bancaCallout(`<p>A banca quer que o aluno saiba que <strong>pontos de corte são escolhas baseadas em desempenho</strong>. No exemplo:</p>
    <ul class="tight">
      <li>O ponto B em <strong>5,7</strong> representa o melhor equilíbrio da curva apresentada.</li>
      <li>O número não é arbitrário — é a posição do ponto superior esquerdo traduzida para HbA1c.</li>
      <li>O valor de referência não "caiu do céu": é resultado de Curva ROC + estudo populacional.</li>
    </ul>`)}

  ${didaxBlock('pegadinha','⚠️','Pegadinha de prova',
    `<p>A banca pode perguntar se o "melhor ponto" é sempre o <em>maior valor</em>. <strong>NÃO É.</strong> O melhor ponto é o melhor <em>equilíbrio</em> entre Sens e Esp — não simplesmente o maior ou menor número. Subir o corte aumenta Esp mas perde Sens; baixar aumenta Sens mas explode FP.</p>`)}

  ${didaxBlock('naoconfunda','🔀','Não confunda',
    `<ul class="tight">
      <li>Valor de referência <strong>não é número mágico</strong>.</li>
      <li>Ponto de corte <strong>não é apenas convenção arbitrária</strong>.</li>
      <li>Curva ROC <strong>não define conduta isoladamente</strong> — ela ajuda a avaliar desempenho do teste.</li>
      <li>5,7 é exemplo didático, não recomendação clínica isolada.</li>
    </ul>`)}

  ${didaxBlock('errocomum','❌','Erro comum',
    `<p>Decorar "5,7" sem entender que <strong>deslocar o ponto de corte muda a Sens, a Esp e os erros do teste</strong>. O número sozinho não diz nada — o conceito atrás dele diz tudo.</p>`)}

  ${didaxBlock('avancado','⚡','O que diferencia o aluno avançado',
    `<p>O aluno avançado entende que <strong>valores de referência são dependentes de contexto</strong>: população, objetivo do teste (rastreamento × diagnóstico × confirmação) e consequências dos erros (custo de falso positivo × custo de falso negativo). Um ponto ótimo para rastrear pode <em>não ser</em> o mesmo ponto ótimo para confirmar diagnóstico. A ROC oferece o mapa; a decisão clínica escolhe o ponto.</p>`)}

  ${fraseAutoral({
    tag: 'Voz Preventiva',
    body: `O 5,7 da HbA1c não veio de uma revelação divina — ele veio de uma <strong>escolha humana</strong> feita em cima de uma curva. Quando eu mostro isso para o aluno, vejo o clique acontecer: <em>"então o valor de referência é uma decisão, não um dogma"</em>. É exatamente o tipo de pensamento que distingue quem só decora exame de quem entende como o exame foi construído. Toda vez que você ler um valor de referência, lembre: <strong>tem uma ROC por trás dele</strong>.`,
    assinatura: 'Intensivão Preventiva · M3-04'
  })}

  ${revisaoAtiva([
    { q: 'De onde vêm os valores de referência de exames?', a: 'De estudos com Curvas ROC: o melhor ponto da curva (superior esquerdo) vira o número de referência. Comparam-se doentes e não doentes, testam-se cortes, escolhe-se o de melhor desempenho.' },
    { q: 'Por que 5,7 aparece como ponto de corte no exemplo da HbA1c?', a: 'Porque, na curva apresentada, é o ponto B — o ponto mais próximo do canto superior esquerdo. Combina sensibilidade suficiente com especificidade suficiente.' },
    { q: 'Um ponto de corte é escolhido apenas por ser fácil de decorar?', a: 'Não. É escolhido com base no DESEMPENHO DIAGNÓSTICO em uma população — sensibilidade, especificidade, e o objetivo do teste.' },
    { q: 'O que acontece quando o corte muda?', a: 'Mudam simultaneamente Sens, Esp, FP e FN. Baixar o corte aumenta Sens e FP; subir aumenta Esp e FN.' }
  ])}

  ${pageFooterMeta({
    resumo: 'Valores de referência são pontos de corte construídos a partir do desempenho diagnóstico. A Curva ROC ajuda a visualizar esse processo. No exemplo, o ponto B em 5,7 representa o melhor equilíbrio geral.',
    proximaConexao: 'Agora que sabemos de onde vem o 5,7, vamos ver o que acontece quando saímos do ponto B e vamos para C (mais sensível) ou A (mais específico).',
    nextId: 'm3-05'
  })}
  `;
  renderStandard(container, page, body);
};

/* ─────────────────────────────────────────
   PÁGINA 5 — Mexendo no ponto de corte: mais sensível ou mais específico?
───────────────────────────────────────── */
GO_RENDER['m3-05'] = function(container, page) {
  const body = `
  ${pageHero({
    module: 'm3', moduleLabel: 'Módulo 3 — Curva ROC', pageNum: 5,
    title: 'Mexendo no ponto de corte: mais sensível ou mais específico?',
    lead: 'Corte MENOR → mais sensibilidade, mais falso positivo. Corte MAIOR → mais especificidade, mais falso negativo. Essa é a lei física do ponto de corte.',
    grad: 'var(--grad-m3)'
  })}

  ${conceptHero({
    question: 'Pergunta central',
    title: 'Se eu deslocar o corte para C (mais sensível) ou para A (mais específico), o número da HbA1c fica menor ou maior que 5,7?',
    lead: 'Ponto C = mais sensível = corte MENOR que 5,7 (qualquer cheirinho fica positivo). Ponto A = mais específico = corte MAIOR que 5,7 (só positivos muito convincentes).',
    glow: 'rgba(249,115,22,.22)'
  })}

  ${keyTerms(['ponto C','mais sensível','valor menor','falso positivo','ponto A','mais específico','valor maior','falso negativo','hemoglobina glicada','5,7'])}

  <div class="prose">
    <p>Esta é a página mais importante para transformar Curva ROC em <strong>raciocínio real</strong>. O ponto de corte não é apenas um número — ele decide <em>quem será chamado de positivo</em> e <em>quem será chamado de negativo</em>. Quando esse número muda, os erros também mudam.</p>

    <p>Comece pelo <strong>ponto C</strong>. Ele está mais alto que o ponto B na ROC, portanto é <strong>mais sensível</strong>. Se um corte é mais sensível, ele tenta capturar qualquer sinal mínimo de doença. A imagem mental é direta: <em>"qualquer cheirinho de doença fica positivo"</em>. Isso reduz a chance de falso negativo — o teste fica mais difícil de deixar um doente passar.</p>

    <p>Mas há um custo: o ponto C está <strong>mais à direita</strong>. Na Curva ROC, direita significa maior 1 − especificidade, ou seja, <strong>maior falso positivo</strong>. Ao ganhar sensibilidade, o teste passa a acusar mais pessoas sem doença. No exemplo da HbA1c, isso significa que o ponto C deve ser um valor <strong>MENOR que 5,7</strong>.</p>

    <p>A lógica é intuitiva quando se pensa nos números. Se o corte fica menor, pessoas com valores como <strong>5,1, 5,2 ou 5,3</strong> passam a ser classificadas como positivas. Muitas delas podem <em>não</em> ter a doença — por isso aumenta o falso positivo. Por outro lado, valores bem baixos como <strong>4,9, 4,8 ou 4,7</strong> ficam negativos com mais segurança.</p>

    <p>Agora observe o <strong>ponto A</strong>. Ele é mais à esquerda na ROC, portanto <strong>mais específico</strong>. Um corte mais específico exige <em>mais evidência</em> para chamar alguém de positivo. No exemplo, A corresponde a um valor <strong>MAIOR que 5,7</strong>. Isso faz com que positivos como <strong>6,6, 6,7 ou 6,8</strong> sejam muito confiáveis. O problema é que valores como <strong>6,4 ou 6,3</strong> podem ser classificados como negativos mesmo estando próximos da zona de doença — aumentando falso negativo.</p>

    <p class="pulled">A troca cristalina: <strong>corte menor aumenta sensibilidade E falso positivo; corte maior aumenta especificidade E falso negativo</strong>. Essa é a essência do raciocínio de ponto de corte.</p>
  </div>

  ${sectionTitle('🎚️','Simulador completo — desloque o corte e veja tudo girar', 'm3')}
  <p class="mt-prose">Posicione o slider em <strong>5,7</strong> (ponto B — equilíbrio). Depois, <strong>baixe</strong> para 5,2 (ponto C — mais sensível, mais FP). Por fim, <strong>suba</strong> para 6,3 (ponto A — mais específico, mais FN). Observe os KPIs Sens/Esp/AUC/FPR mudando em tempo real.</p>
  ${PrevInt.rocCurva({ mu0: 5.1, sd0: 0.40, mu1: 6.6, sd1: 0.70, cut: 5.7, label: 'HbA1c (%)', range: [4, 8] })}

  ${sectionTitle('📏','Régua de HbA1c — três zonas, três pontos', 'm3')}
  <div class="split2">
    <div class="case-card --teal">
      <div class="case-card-head">PONTO C — corte MENOR que 5,7 (mais sensível)</div>
      <ul class="tight">
        <li>"Qualquer cheirinho de doença fica positivo".</li>
        <li>Reduz falso negativo. Aumenta falso positivo.</li>
        <li>Negativos seguros: <strong>4,9 / 4,8 / 4,7</strong>.</li>
        <li>Viram positivos suspeitos: <strong>5,1 / 5,2 / 5,3</strong>.</li>
        <li>Útil em <strong>rastreamento</strong> — perder doente é mais grave que assustar saudável.</li>
      </ul>
    </div>
    <div class="case-card --green">
      <div class="case-card-head">PONTO A — corte MAIOR que 5,7 (mais específico)</div>
      <ul class="tight">
        <li>"Só convence se for muito alto".</li>
        <li>Reduz falso positivo. Aumenta falso negativo.</li>
        <li>Positivos confiáveis: <strong>6,6 / 6,7 / 6,8</strong>.</li>
        <li>Viram falso negativo: <strong>6,4 / 6,3</strong>.</li>
        <li>Útil em <strong>confirmação</strong> — rotular saudável como doente é mais grave.</li>
      </ul>
    </div>
  </div>

  ${didaxBlock('caso','🩺','Caso-guia: dois pacientes na fronteira',
    `<p><strong>Paciente 1</strong> tem HbA1c = <strong>5,2</strong>. <strong>Paciente 2</strong> tem HbA1c = <strong>6,4</strong>.</p>
    <p><strong>Pergunta-guia:</strong> o que acontece com cada um quando deslocamos o corte?</p>
    <ul class="tight">
      <li><strong>Paciente 1 (5,2):</strong> com corte em 5,7 (B) — é negativo. Com corte em 5,1 (C — mais sensível) — <em>vira positivo (provavelmente falso positivo)</em>.</li>
      <li><strong>Paciente 2 (6,4):</strong> com corte em 5,7 (B) — é positivo. Com corte em 6,5 (A — mais específico) — <em>vira negativo (provavelmente falso negativo)</em>.</li>
    </ul>
    <p><strong>Lição:</strong> o mesmo paciente, com o mesmo número de exame, pode mudar de classificação só porque o corte mudou. O ponto de corte não é detalhe técnico — é decisão clínica.</p>`)}

  ${formulaBox('Causalidade do corte — deduzida do conceito',
    `Sensibilidade = VP ÷ (VP + FN) → corte mais sensível REDUZ FN<br>Especificidade = VN ÷ (VN + FP) → corte mais específico REDUZ FP<br><br>Corte ↓ ⇒ Sens ↑, FP ↑, Esp ↓<br>Corte ↑ ⇒ Esp ↑, FN ↑, Sens ↓`,
    'Note o trade-off: cada ganho em um lado custa algo no outro. NÃO EXISTE corte que melhore tudo simultaneamente — só existe o ponto que minimiza o desequilíbrio.')}

  ${didaxBlock('importa','💡','Por que isso importa na prática?',
    `<p>Em <strong>rastreamento populacional</strong>, pode ser aceitável aumentar sensibilidade e tolerar mais falso positivo para <em>não perder casos</em>. Em <strong>confirmação diagnóstica</strong>, pode ser preferível aumentar especificidade para <em>não rotular saudáveis como doentes</em>. O mesmo teste pode ter cortes diferentes em momentos diferentes da investigação. A ROC organiza essa escolha.</p>`)}

  ${bancaCallout(`<p>A banca quer que o aluno raciocine o sentido do deslocamento:</p>
    <ul class="tight">
      <li>Ponto mais superior = mais sensível.</li>
      <li>Ponto mais à esquerda = mais específico.</li>
      <li>Ponto mais à direita = mais falso positivo.</li>
      <li>Corte menor para ganhar sensibilidade.</li>
      <li>Corte maior para ganhar especificidade.</li>
    </ul>`)}

  ${didaxBlock('pegadinha','⚠️','Pegadinha de prova — clássica',
    `<p>A pergunta clássica é: <em>"o número escondido atrás do ponto C é maior ou menor que 5,7?"</em>. Muitos chutam <strong>maior</strong> porque o ponto C está "mais alto" no gráfico. Mas no exemplo da HbA1c, ponto C é mais sensível — portanto o corte deve ser <strong>MENOR</strong>. Posição vertical no gráfico ROC <em>não</em> corresponde a valor numérico maior do exame!</p>`)}

  ${didaxBlock('naoconfunda','🔀','Não confunda — posição no gráfico × valor numérico',
    `<ul class="tight">
      <li>Ponto mais alto na ROC <strong>NÃO</strong> significa número laboratorial maior.</li>
      <li>Ponto mais à esquerda na ROC <strong>NÃO</strong> significa corte menor.</li>
      <li>A posição no gráfico indica <strong>desempenho</strong>, não diretamente o valor numérico do exame.</li>
      <li>Para HbA1c no exemplo: <strong>C é menor que 5,7</strong>; <strong>A é maior que 5,7</strong>.</li>
    </ul>`)}

  ${didaxBlock('errocomum','❌','Erro comum',
    `<p>Achar que aumentar sensibilidade sempre significa <em>elevar</em> o ponto de corte. <strong>Em exames em que valores maiores sugerem doença</strong> (HbA1c, glicemia, troponina, PSA...), <em>aumentar sensibilidade exige BAIXAR o corte</em> — para capturar mais pessoas como positivas.</p>`)}

  ${didaxBlock('avancado','⚡','O que diferencia o aluno avançado',
    `<p>O aluno avançado entende o <strong>sentido clínico</strong> do corte: se eu baixo o limiar, mais pessoas entram como positivas — isso aumenta Sens E falso positivo. Se eu subo o limiar, só casos mais intensos entram como positivos — isso aumenta Esp E falso negativo. Ele lê a ROC como um mapa de DECISÃO, não como um gráfico decorativo.</p>`)}

  ${revisaoAtiva([
    { q: 'O ponto C é maior ou menor que 5,7?', a: 'MENOR. C é mais sensível, e para HbA1c isso exige baixar o corte (ex.: 5,1 / 5,2 / 5,3 podem virar positivos).' },
    { q: 'Por que o ponto C aumenta falso positivo?', a: 'Porque está mais à direita na ROC — direita = maior 1 − Esp = maior taxa de FP. Ao baixar o corte, mais saudáveis cruzam o limiar.' },
    { q: 'O ponto A é maior ou menor que 5,7?', a: 'MAIOR. A é mais específico — exige valores mais altos para considerar positivo (ex.: 6,6 / 6,7 / 6,8 viram positivos confiáveis).' },
    { q: 'Por que o ponto A aumenta falso negativo?', a: 'Porque ao subir o corte, valores como 6,3 / 6,4 — que podem indicar doença — caem abaixo do limiar e ficam classificados como negativos.' },
    { q: 'Qual ponto ajuda mais a EXCLUIR doença?', a: 'C — o mais sensível. Um negativo em teste sensível afasta doença com mais segurança (poucos FN).' },
    { q: 'Qual ponto ajuda mais a CONFIRMAR doença?', a: 'A — o mais específico. Um positivo em teste específico confirma doença com mais segurança (poucos FP).' }
  ])}

  ${pageFooterMeta({
    resumo: 'Baixar o corte aumenta sensibilidade e falso positivo. Subir o corte aumenta especificidade e falso negativo. No exemplo da HbA1c: C é menor que 5,7 (mais sensível); A é maior que 5,7 (mais específico). Ponto B = 5,7 é o equilíbrio.',
    proximaConexao: 'Dominado o mexer dentro de UMA curva, é hora de comparar CURVAS INTEIRAS. Entra a área sob a curva (AUC) — A com A.',
    nextId: 'm3-06'
  })}
  `;
  renderStandard(container, page, body);
};

/* ─────────────────────────────────────────
   PÁGINA 6 — AUC: comparando testes pela área sob a curva
───────────────────────────────────────── */
GO_RENDER['m3-06'] = function(container, page) {
  const body = `
  ${pageHero({
    module: 'm3', moduleLabel: 'Módulo 3 — Curva ROC', pageNum: 6,
    title: 'AUC: comparando testes pela área sob a curva',
    lead: 'Curva mais próxima do canto superior esquerdo = maior área sob a curva = melhor desempenho global. A com A: Área sob a curva = Acurácia.',
    grad: 'var(--grad-m3)'
  })}

  ${conceptHero({
    question: 'Pergunta central',
    title: 'Por que uma curva mais próxima do canto superior esquerdo representa um teste melhor?',
    lead: 'Porque ao longo de TODOS os pontos de corte, ela mantém maior sensibilidade com menor falso positivo — ou seja, OCUPA mais espaço na região "boa" do gráfico. Esse "espaço ocupado" tem nome: AUC.',
    glow: 'rgba(139,92,246,.22)'
  })}

  ${keyTerms(['área sob a curva','AUC','acurácia','A com A','teste 1','teste 2','HbA1c','glicemia','padrão ouro','desempenho global'])}

  <div class="prose">
    <p>A Curva ROC não serve apenas para escolher pontos de corte <em>dentro</em> de um teste. Ela também funciona como uma <strong>arena onde testes diagnósticos podem ser comparados</strong>. Imagine dois exames tentando diagnosticar a mesma condição. Qual é melhor?</p>

    <p>A resposta visual vem da própria curva. O teste cuja curva fica <strong>mais próxima do canto superior esquerdo</strong> tem melhor desempenho global — porque consegue manter <em>maior sensibilidade com menor taxa de falso positivo</em> ao longo de diferentes pontos de corte.</p>

    <p>Na aula, o exemplo compara uma curva da <strong>hemoglobina glicada</strong> com outra curva para diagnóstico de diabetes, como a <strong>glicemia</strong>. A HbA1c é apresentada como melhor porque sua curva se aproxima mais do quadrante superior esquerdo — ela "ocupa" mais espaço na região boa.</p>

    <p class="pulled">A forma matemática de traduzir isso é a <span class="keyword">área sob a curva</span>, também chamada de <strong>AUC</strong>. A mensagem didática da aula deve ser preservada: <strong>área sob a curva = acurácia</strong>. Para fixação: <strong>A com A</strong>. Área com Acurácia.</p>

    <p>Uma nota técnica elegante: em linguagem estatística rigorosa, a AUC representa a <em>capacidade discriminativa global</em> do teste ao longo de todos os pontos de corte. Ela <strong>não é exatamente a mesma coisa</strong> que a acurácia calculada em um único ponto de corte de uma tabela 2×2. Porém, para a lógica de prova da aula, maior área sob a curva deve ser ensinada como maior desempenho/acurácia global. <em>"A com A"</em> é a regra de bolso — e ela funciona.</p>

    <p>Assim, quando a questão pergunta por que o <strong>teste 1 é superior ao teste 2</strong>, a resposta é: <strong>porque tem maior área sob a curva</strong>, isto é, maior desempenho global e maior acurácia no sentido cobrado pela prova.</p>
  </div>

  ${svgIllus(PrevSVG.distribuicoesROC(), 'A ROC nasce de duas distribuições — sãos e doentes — sobrepostas. Quanto menor a "área de confusão", maior a AUC e mais a curva colaba no canto superior-esquerdo.')}

  ${sectionTitle('📊','Comparando dois testes — AUC alta × AUC baixa', 'm3')}
  <p class="mt-prose">Abaixo, dois cenários lado a lado. Observe que distribuições mais <strong>separadas</strong> (doentes e sãos pouco sobrepostos) produzem AUC ALTA — curva colada no canto superior esquerdo. Distribuições <strong>sobrepostas</strong> produzem AUC BAIXA — curva próxima da diagonal (próximo do acaso).</p>

  <div class="split2">
    <div>
      <h4 class="card-head --violet">TESTE 1 — bom discriminador (AUC alta)</h4>
      ${PrevInt.rocCurva({ mu0: 4.8, sd0: 0.40, mu1: 7.8, sd1: 0.55, cut: 6.0, label: 'Marcador A (un.)', range: [3, 10] })}
    </div>
    <div>
      <h4 class="card-head --red">TESTE 2 — discriminador fraco (AUC baixa)</h4>
      ${PrevInt.rocCurva({ mu0: 5.5, sd0: 0.95, mu1: 6.8, sd1: 1.10, cut: 6.0, label: 'Marcador B (un.)', range: [3, 10] })}
    </div>
  </div>

  ${didaxBlock('caso','🩺','Caso-guia: HbA1c × glicemia',
    `<p>Duas curvas ROC aparecem no mesmo gráfico, comparando <strong>HbA1c</strong> e <strong>glicemia de jejum</strong> para diagnóstico de diabetes. A curva da HbA1c está <em>mais próxima</em> do canto superior esquerdo; a da glicemia, mais próxima da diagonal.</p>
    <p><strong>Pergunta-guia:</strong> qual teste tem maior acurácia global? <strong>Resposta: HbA1c</strong> — porque sua curva tem maior área sob ela (maior AUC). Em qualquer ponto de corte que você escolha, ela tende a oferecer melhor combinação Sens/Esp.</p>
    <p><strong>Lição:</strong> "A com A" — maior Área = maior Acurácia. Quando a questão pede o teste de maior acurácia, é o de maior AUC.</p>`)}

  ${formulaBox('AUC — interpretação didática',
    `AUC = área acumulada sob a Curva ROC<br>Faixa: 0,5 (teste = acaso, diagonal) → 1,0 (teste perfeito, canto superior esquerdo)<br>Quanto maior, mais a curva ocupa a região superior esquerda<br><br>Lógica de prova: MAIOR AUC = MAIOR ACURÁCIA GLOBAL ("A com A")`,
    'NOTA TÉCNICA: a AUC mede discriminação global ao longo de TODOS os cortes — não é idêntica à acurácia pontual de uma tabela 2×2 em um corte único. Mas para a banca, "A com A" funciona.')}

  ${didaxBlock('numerico','🔢','Exemplo numérico ilustrativo',
    `<ul class="tight">
      <li><strong>Teste 1:</strong> AUC = 0,92 → excelente desempenho global.</li>
      <li><strong>Teste 2:</strong> AUC = 0,74 → desempenho razoável, mas inferior.</li>
      <li><strong>Teste próximo da diagonal:</strong> AUC ≈ 0,55 → desempenho fraco, perto do acaso.</li>
      <li><strong>Teste perfeito (ideal):</strong> AUC = 1,00 → curva colada ao canto superior esquerdo.</li>
    </ul>`)}

  ${didaxBlock('importa','💡','Por que isso importa na prática?',
    `<p>Escolher um teste diagnóstico envolve <strong>custo, disponibilidade, aceitabilidade, execução E desempenho</strong>. A Curva ROC ajuda a comparar desempenho. Um teste com maior AUC tende a <em>separar melhor</em> doentes e não doentes — mas a escolha clínica final considera contexto: rastreamento, confirmação, custo, recursos disponíveis.</p>`)}

  ${bancaCallout(`<p>A banca quer que o aluno associe:</p>
    <ul class="tight">
      <li>Curva mais alta e à esquerda = <strong>melhor teste</strong>.</li>
      <li>Maior área sob a curva = <strong>maior acurácia/desempenho global</strong>.</li>
      <li><strong>"A com A"</strong>: Área sob a curva e Acurácia.</li>
      <li>Curva próxima da diagonal = <strong>teste fraco (próximo do acaso)</strong>.</li>
    </ul>`)}

  ${didaxBlock('pegadinha','⚠️','Pegadinha de prova',
    `<p>A questão pode perguntar <em>"a superioridade do teste 1 sobre o teste 2 se refere a quê?"</em>. Se o teste 1 tem maior AUC, a resposta é <strong>maior acurácia</strong> ou <strong>maior área sob a curva</strong>, dependendo das alternativas. Em alguns enunciados, "acurácia" e "AUC" podem coexistir como opções — ambas estão corretas no sentido cobrado.</p>`)}

  ${didaxBlock('naoconfunda','🔀','Não confunda — pontos × curvas',
    `<ul class="tight">
      <li>Ponto mais sensível é uma coisa (eixo Y mais alto).</li>
      <li>Ponto mais específico é outra coisa (eixo X mais à esquerda).</li>
      <li><strong>Melhor curva global</strong> é avaliada pela <strong>área sob a curva</strong>.</li>
      <li>Melhor ponto DENTRO de uma curva ≠ melhor TESTE entre curvas.</li>
    </ul>`)}

  ${didaxBlock('errocomum','❌','Erro comum',
    `<p>Olhar apenas <strong>um ponto isolado</strong> e ignorar que a pergunta pede <em>comparação global</em> entre testes. "Qual ponto é mais sensível?" tem resposta diferente de "qual teste é melhor globalmente?". Leia o que a banca quer.</p>`)}

  ${didaxBlock('avancado','⚡','O que diferencia o aluno avançado',
    `<p>O aluno avançado sabe que <strong>AUC avalia discriminação global</strong>. Ele também entende que um teste pode ter boa AUC, mas a escolha clínica ainda depende de contexto, custo, disponibilidade, risco do paciente e objetivo do exame. AUC é necessária, não suficiente — é base, não decisão final.</p>`)}

  ${revisaoAtiva([
    { q: 'Para comparar dois testes, olho apenas um ponto ou a curva como um todo?', a: 'A CURVA como um todo. Comparação de testes usa AUC (área sob a curva), não pontos isolados.' },
    { q: 'Qual curva é melhor: a mais próxima do canto superior esquerdo ou da diagonal?', a: 'Do canto superior esquerdo. A diagonal representa desempenho próximo do acaso (AUC ≈ 0,5).' },
    { q: 'O que significa maior área sob a curva?', a: 'Maior capacidade discriminativa global — o teste mantém boa Sens e baixa taxa de FP ao longo dos cortes. Na lógica de prova, maior AUC = maior acurácia.' },
    { q: 'O que quer dizer "A com A"?', a: 'Área (sob a curva) com Acurácia. É a regra de fixação da aula: maior AUC = maior acurácia global.' },
    { q: 'Por que a HbA1c pode ser apresentada como melhor que outro teste no exemplo?', a: 'Porque sua curva ROC está mais próxima do canto superior esquerdo — tem maior AUC, indicando melhor desempenho discriminativo global.' }
  ])}

  ${pageFooterMeta({
    resumo: 'Curvas com maior área sob a curva representam melhor desempenho global. Na lógica de prova, maior AUC = maior acurácia. Fixação: A com A. Nota técnica: AUC é discriminação global, não idêntica à acurácia pontual.',
    proximaConexao: 'Tudo pronto: eixos, melhor ponto, deslocamento do corte e comparação por AUC. Hora de transformar isso em RESPOSTAS DE BANCA — a página de fechamento.',
    nextId: 'm3-07'
  })}
  `;
  renderStandard(container, page, body);
};

/* ─────────────────────────────────────────
   PÁGINA 7 — Como a banca cobra Curva ROC (fechamento + Unicamp)
───────────────────────────────────────── */
GO_RENDER['m3-07'] = function(container, page) {
  const body = `
  ${pageHero({
    module: 'm3', moduleLabel: 'Módulo 3 — Curva ROC', pageNum: 7,
    title: 'Como a banca cobra Curva ROC — quatro respostas automáticas',
    lead: 'Maior acurácia = maior AUC. Mais específico = mais à esquerda. Mais sensível = mais superior. Mais falso positivo = mais à direita. Quatro reflexos que resolvem o módulo inteiro.',
    grad: 'var(--grad-m3)'
  })}

  ${conceptHero({
    question: 'Pergunta central',
    title: 'Como resolver questões que misturam AUC, acurácia, ponto mais sensível, ponto mais específico e falso positivo?',
    lead: 'Convertendo posição na ROC em propriedade clínica AUTOMATICAMENTE: alto = sensível, esquerda = específico, direita = falso positivo, área = acurácia. Sem hesitar.',
    glow: 'rgba(139,92,246,.22)'
  })}

  ${keyTerms(['Unicamp','maior acurácia','maior AUC','ponto A','ponto C','falso positivo','erro de banca','estratégia de prova','reflexo visual'])}

  <div class="prose">
    <p>A Curva ROC cai em prova porque permite perguntas visuais rápidas com alto potencial de confusão. A banca <strong>não precisa pedir cálculo pesado</strong>. Basta mostrar uma curva com pontos e perguntar qual é mais sensível, mais específico, tem mais falso positivo ou representa maior acurácia. O aluno preparado responde em segundos. O despreparado se enrosca por minutos.</p>

    <p>A <strong>primeira pergunta clássica</strong> é: <em>qual teste tem maior acurácia?</em> A resposta vem da <strong>área sob a curva</strong>. Se o teste 1 tem curva mais próxima do canto superior esquerdo e maior AUC, é o teste de maior acurácia global. "A com A".</p>

    <p>A <strong>segunda pergunta</strong> é: <em>qual ponto é mais específico?</em> O aluno procura o ponto <strong>mais à esquerda</strong>. No exemplo da aula, é o <strong>ponto A</strong>. Por que? Porque especificidade aumenta para a esquerda.</p>

    <p>A <strong>terceira pergunta</strong> é: <em>qual ponto é mais sensível?</em> O aluno procura o ponto <strong>mais superior</strong>. No exemplo, é o <strong>ponto C</strong>. Subir no eixo Y significa aumentar sensibilidade.</p>

    <p>A <strong>quarta pergunta</strong> é a mais traiçoeira: <em>qual ponto tem maior taxa de falso positivo?</em> Como o eixo X é 1 − Esp, o falso positivo aumenta <strong>para a direita</strong>. No exemplo, o ponto C também é o de maior FP — ele é sensível <em>e</em> tem muito falso positivo ao mesmo tempo. Parece contraditório para quem esquece o eixo X.</p>

    <p class="pulled">A aula menciona uma questão da <strong>Unicamp</strong> em que a superioridade do teste 1 sobre o teste 2 se referia à <strong>maior acurácia</strong>. Posteriormente, também se aceitou <strong>maior área sob a curva</strong> — porque uma é a tradução da outra. Preserve esse alerta: se a banca cometer um erro pequeno no rótulo do eixo, <em>reconheça o padrão da Curva ROC e responda pela lógica cobrada</em>. Não brigue com a banca na hora da prova.</p>
  </div>

  ${sectionTitle('📋','As quatro perguntas automáticas — quadro de prova', 'm3')}
  <div class="split2">
    <div class="case-card --violet">
      <div class="case-card-head">Maior ACURÁCIA?</div>
      <p>Procure a curva mais <strong>próxima do canto superior esquerdo</strong>. Maior <strong>AUC</strong> = maior acurácia. "A com A".</p>
    </div>
    <div class="case-card --green">
      <div class="case-card-head">Mais ESPECÍFICO?</div>
      <p>Procure o ponto <strong>mais à esquerda</strong>. Especificidade aumenta para a esquerda. No exemplo: <strong>ponto A</strong>.</p>
    </div>
    <div class="case-card --teal">
      <div class="case-card-head">Mais SENSÍVEL?</div>
      <p>Procure o ponto <strong>mais superior</strong>. Sensibilidade está no eixo Y. No exemplo: <strong>ponto C</strong>.</p>
    </div>
    <div class="case-card --red">
      <div class="case-card-head">Maior FALSO POSITIVO?</div>
      <p>Procure o ponto <strong>mais à direita</strong>. Eixo X = 1 − Esp = taxa de FP. No exemplo: <strong>ponto C</strong> (sim, mesmo ponto sensível).</p>
    </div>
  </div>

  ${sectionTitle('🎯','Modo prova ROC — pratique reconhecimento', 'm3')}
  ${PrevInt.quizBanca([
    {
      stem: '<strong>UNICAMP — adaptado.</strong> Duas curvas ROC comparam testes para diagnóstico de diabetes. A curva do TESTE 1 está mais próxima do canto superior esquerdo; a do TESTE 2 está mais próxima da diagonal. A superioridade do teste 1 sobre o teste 2 se refere a:',
      options: [
        'Teste 1 tem maior acurácia (maior área sob a curva).',
        'Teste 1 tem menor área sob a curva.',
        'Teste 2 é mais próximo do canto superior esquerdo.',
        'Teste 1 tem maior taxa global de falso positivo.'
      ],
      correct: 0,
      explanation: 'Curva mais próxima do canto superior esquerdo = maior AUC = maior acurácia global. "A com A". É exatamente o que a Unicamp cobrou — a aula aceita tanto "maior acurácia" quanto "maior AUC" como respostas equivalentes.',
      tip: 'Quando ver duas curvas e a pergunta for sobre superioridade global, é AUC. Não confunda com pontos isolados.'
    },
    {
      stem: 'Em uma Curva ROC com pontos A, B e C, <strong>A</strong> é mais à esquerda, <strong>B</strong> é central e <strong>C</strong> é mais superior e à direita. Qual ponto representa o teste mais <strong>ESPECÍFICO</strong>?',
      options: [
        'Ponto A — mais à esquerda.',
        'Ponto C — mais alto.',
        'Ponto B — porque está no centro.',
        'Ponto C — porque está à direita.'
      ],
      correct: 0,
      explanation: 'Especificidade aumenta para a esquerda no plano ROC. O ponto mais à esquerda é o mais específico. Mais alto seria SENSÍVEL; à direita seria FALSO POSITIVO.',
      tip: 'Eixo X = 1 − Esp. À esquerda, 1 − Esp é menor → Esp é maior.'
    },
    {
      stem: 'Nos mesmos pontos A, B, C (A à esquerda, B central, C superior e à direita), qual tem maior <strong>TAXA DE FALSO POSITIVO</strong>?',
      options: [
        'Ponto C — mais à direita.',
        'Ponto A — mais à esquerda.',
        'Ponto B — central.',
        'Nenhum — falso positivo não aparece na ROC.'
      ],
      correct: 0,
      explanation: 'Eixo X = 1 − Esp = taxa de falso positivo. Mais à direita = mais FP. Note: C pode ser SIMULTANEAMENTE o mais sensível E o de maior FP — não é contradição, é trade-off.',
      tip: 'Falso positivo está LITERALMENTE no eixo X — é a definição do eixo, não algo separado.'
    },
    {
      stem: 'No exemplo da <strong>hemoglobina glicada</strong> com ponto B = 5,7, ponto C mais sensível e ponto A mais específico, qual afirmativa é VERDADEIRA?',
      options: [
        'Ponto C corresponde a valor MENOR que 5,7; ponto A a valor MAIOR que 5,7.',
        'Ponto C corresponde a valor MAIOR que 5,7 porque está mais alto na ROC.',
        'Pontos A e C correspondem ao mesmo valor numérico (5,7).',
        'A relação entre posição e valor numérico depende exclusivamente da banca.'
      ],
      correct: 0,
      explanation: 'Correto. C é mais sensível → corte menor (mais pessoas viram positivas: 5,1/5,2/5,3). A é mais específico → corte maior (só positivos muito altos: 6,6/6,7/6,8). Não confunda posição vertical na ROC com valor numérico do exame.',
      tip: 'Para exames em que valor maior = mais doença (HbA1c, glicemia, troponina, PSA): aumentar Sens exige BAIXAR o corte.'
    },
    {
      stem: 'Se uma banca rotular o eixo X de uma ROC simplesmente como "especificidade" (em vez de "1 − especificidade"), o que o aluno bem preparado deve fazer?',
      options: [
        'Reconhecer o padrão da Curva ROC e responder pela lógica correta (eixo X = 1 − Esp = FP), sem brigar com a banca durante a prova.',
        'Anular a questão mentalmente e não responder.',
        'Inverter todas as direções porque o eixo está "errado".',
        'Considerar que agora a questão pede o oposto do esperado.'
      ],
      correct: 0,
      explanation: 'Atitude pragmática. A aula é explícita: "não vá brigar com a banca na hora da prova". Reconheça o gráfico como ROC e aplique as regras automáticas (alto = sensível, esquerda = específico, direita = FP, área = acurácia). Discussão de recurso fica para depois.',
      tip: 'Erro de rótulo não muda a essência do gráfico. Responda primeiro, recorra depois.'
    }
  ], 'Modo prova ROC — questões no estilo banca')}

  ${formulaBox('Reforço final — as três identidades de prova',
    `Eixo X = 1 − Especificidade = Taxa de Falso Positivo<br>AUC maior = Melhor desempenho global<br>"A com A": Área sob a curva ↔ Acurácia`,
    'Domine essas três e qualquer questão de ROC vira leitura visual de 10 segundos. As pegadinhas estão em quem ainda hesita no eixo X.')}

  ${didaxBlock('caso','🩺','Caso-guia: questão modelo Unicamp',
    `<p><strong>Enunciado:</strong> "Duas curvas ROC comparam testes para diabetes. A superioridade do teste 1 sobre o teste 2 se refere a:"</p>
    <ul class="tight">
      <li>A) Teste 1 tem maior acurácia. ✅</li>
      <li>B) Teste 1 tem menor área sob a curva. ❌</li>
      <li>C) Teste 2 é mais próximo do canto superior esquerdo. ❌</li>
      <li>D) Teste 1 tem maior falso positivo global. ❌</li>
    </ul>
    <p><strong>Resposta:</strong> A, porque maior área = maior acurácia ("A com A"). Em algumas versões da questão, "maior AUC" também é aceito — é a mesma resposta com nome diferente.</p>`)}

  ${didaxBlock('importa','💡','Por que isso importa na prática?',
    `<p>A prova avalia se o aluno consegue <strong>transformar gráfico em decisão</strong>. Na prática médica, o mesmo raciocínio ajuda a entender qual exame <em>discrimina melhor</em> a condição e como alterações no corte impactam os erros diagnósticos. ROC é ferramenta de prova E de decisão clínica.</p>`)}

  ${bancaCallout(`<p>A banca quer <strong>quatro respostas automáticas</strong>:</p>
    <ul class="tight">
      <li>Maior acurácia = <strong>maior área sob a curva</strong>.</li>
      <li>Mais específico = <strong>mais à esquerda</strong>.</li>
      <li>Mais sensível = <strong>mais superior</strong>.</li>
      <li>Mais falso positivo = <strong>mais à direita</strong>.</li>
    </ul>`)}

  ${didaxBlock('pegadinha','⚠️','Pegadinha de prova — paradoxo C',
    `<p>O ponto C pode ser, <strong>ao mesmo tempo</strong>, o mais sensível E o de maior falso positivo. Isso parece contraditório para quem esquece que o eixo X é 1 − especificidade. Mas faz sentido: corte mais sensível captura todo mundo — inclusive saudáveis (FP). Não é paradoxo, é trade-off.</p>`)}

  ${didaxBlock('naoconfunda','🔀','Não confunda — checklist final',
    `<ul class="tight">
      <li>O ponto C pode ganhar em sensibilidade e <em>perder</em> em especificidade.</li>
      <li>O ponto A pode ganhar em especificidade e <em>perder</em> em sensibilidade.</li>
      <li>O teste 1 pode ser melhor globalmente (AUC) mesmo que a pergunta também mostre pontos isolados.</li>
      <li><strong>Erro de rótulo no eixo X não muda a essência da Curva ROC.</strong></li>
    </ul>`)}

  ${didaxBlock('errocomum','❌','Erro comum',
    `<p>Travar diante de um erro menor de banca no rótulo do eixo X — perder a questão por indignação técnica. <strong>Reconheça o gráfico, aplique as regras, marque a alternativa.</strong> Discussão de recurso é depois da prova.</p>`)}

  ${didaxBlock('avancado','⚡','O que diferencia o aluno avançado',
    `<p>O aluno avançado é <strong>técnico mas pragmático</strong>. Ele sabe que o eixo X correto é 1 − especificidade, identifica erro de banca quando aparece, mas não deixa isso impedir a resolução da questão. Ele <em>diferencia rigor estatístico de linguagem de prova</em> — e usa cada um no momento certo.</p>`)}

  ${revisaoAtiva([
    { q: 'Qual ponto é mais específico: A, B ou C (no exemplo padrão)?', a: 'A — o ponto mais à esquerda. Especificidade aumenta para a esquerda.' },
    { q: 'Qual ponto é mais sensível?', a: 'C — o ponto mais alto. Sensibilidade está no eixo Y; subir = ganhar Sens.' },
    { q: 'Qual ponto tem maior falso positivo?', a: 'C — o ponto mais à direita. Eixo X = 1 − Esp = taxa de FP. Note que C pode ser SIMULTANEAMENTE o mais sensível E o de maior FP.' },
    { q: 'Se o teste 1 tem maior área sob a curva, o que isso significa?', a: 'Maior acurácia/desempenho global ("A com A"). É a resposta da Unicamp: o teste é superior porque tem maior AUC.' },
    { q: 'O que fazer se a banca rotular mal o eixo X?', a: 'Reconhecer o padrão da Curva ROC e responder pela lógica correta. Não brigar com a banca durante a prova — recurso é depois.' }
  ])}

  ${pontoDeCostura({
    fromModule: 'm3', toModule: 'm4',
    fromTitle: 'Módulo 3 — Curva ROC',
    toTitle: 'Módulo 4 — Tendência Central e Dispersão',
    ponte: `<p>Note algo que ficou implícito durante todo o Módulo 3: as duas distribuições (sãos × doentes) que geram a ROC <strong>são caracterizadas por média e desvio padrão</strong>. Quando dissemos "doentes têm HbA1c em torno de 7,5%", estávamos descrevendo o <em>centro</em>. Quando dissemos "essa nuvem tem largura de quase 2 pontos", estávamos descrevendo a <em>dispersão</em>.</p>
    <p>O Módulo 4 destrincha esses dois conceitos — média, mediana, moda, amplitude, variância, desvio padrão — que sustentam toda a estatística médica daqui em diante. Não é mudança de assunto; é descer um nível para sustentar o que já vimos.</p>`,
    links: [
      { module: 'm4', pageId: 'm4-01', variant: 'bridge',
        label: 'Avançar para Módulo 4 — Por que tendência central cai em Medicina?',
        hint: 'Começa pela analogia: IBGE, Seleção Brasileira, nota da turma.' },
      { module: 'm4', pageId: 'm4-06', variant: 'bridge',
        label: 'Visualizar a aplicação clínica — glicemia 95-105 vs 50-180',
        hint: 'A página em que centro e dispersão decidem condutas opostas.' }
    ]
  })}

  ${pageFooterMeta({
    resumo: 'Quatro reflexos automáticos para Curva ROC: maior AUC = maior acurácia; mais à esquerda = mais específico; mais alto = mais sensível; mais à direita = maior FP. Não brigue com a banca — reconheça o padrão e responda.',
    proximaConexao: 'Curva ROC fechada. No Módulo 4, descemos um nível: as duas distribuições que geram qualquer ROC são feitas de <em>média</em> e <em>desvio padrão</em>. Vamos formalizar centro e espalhamento.',
    nextId: 'm4-01'
  })}
  `;
  renderStandard(container, page, body);
};
