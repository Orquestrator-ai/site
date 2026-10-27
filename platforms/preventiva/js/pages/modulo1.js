/* =========================================
   MÓDULO 1 — VALIDAÇÃO DE TESTES DIAGNÓSTICOS
   13 páginas (m1-01 a m1-13). Conteúdo textual íntegro,
   interativos contextualizados, SVGs próprios.
   ========================================= */

/* ─────────────────────────────────────────
   PÁGINA 1 — Por que validar testes diagnósticos?
───────────────────────────────────────── */
GO_RENDER['m1-01'] = function(container, page) {
  const body = `
  ${pageHero({
    module: 'm1', moduleLabel: 'Módulo 1 — Validação de Testes', pageNum: 1,
    title: 'Por que validar um novo teste, se já existe padrão-ouro?',
    lead: 'Antes de qualquer fórmula: a pergunta que dá sentido a tudo que vem depois.',
    grad: 'var(--grad-m1)'
  })}

  ${conceptHero({
    question: 'Pergunta central',
    title: 'Se já temos um exame de referência, por que continuamos criando e testando novos exames?',
    lead: 'Esta pergunta separa o aluno que decora a tabela 2x2 do médico que entende epidemiologia clínica.',
    glow: 'rgba(37,99,235,.22)'
  })}

  ${keyTerms(['padrão-ouro','custo','aceitabilidade','execução','rastreamento','colonoscopia','sangue oculto','saúde pública'])}

  <div class="prose">
    <p>O <span class="keyword">padrão-ouro</span> é o exame que melhor identifica quem realmente tem ou não tem a condição. Em alguns cenários, é uma biópsia; em outros, uma cultura; em outros, um exame de imagem específico. Ele é a <strong>referência</strong> contra a qual comparamos todos os outros testes.</p>

    <p>Mas "melhor" no sentido técnico não significa <strong>"melhor para toda a população"</strong>. Um exame pode ser excelente em capacidade diagnóstica e, ainda assim, ser caro, invasivo, pouco disponível, mal aceito, ou simplesmente impossível de realizar em muitos pacientes.</p>

    <p class="pulled">A validação de testes nasce justamente daí: comparar um novo exame com o padrão-ouro para descobrir se ele consegue cumprir uma função clínica — rastrear, selecionar, excluir, priorizar ou ampliar acesso — sem prejudicar a decisão final.</p>

    <p>Pense no <strong>rastreamento de câncer colorretal</strong>. A colonoscopia é tecnicamente muito superior ao sangue oculto nas fezes: visualiza diretamente a mucosa, permite biópsia e até polipectomia. Mas ela custa centenas de reais por exame, exige preparo intenso, profissional habilitado, estrutura de centro cirúrgico, agenda, e, em muitos casos, sedação. Em um paciente idoso com distúrbio de coagulação, ela é arriscada. Em uma região sem endoscopista, ela é impossível.</p>

    <p>O <strong>sangue oculto nas fezes</strong>, por outro lado, é barato, simples, aceito, e aplicável em escala populacional. Ele não substitui a colonoscopia para confirmação, mas <em>seleciona</em> quem precisa fazer a colonoscopia. Sem ele, o sistema de saúde precisaria oferecer colonoscopia para milhões de pessoas — algo impossível em qualquer lugar do mundo.</p>

    <p>Portanto, validar um teste não é abandonar o padrão-ouro. É perguntar: <em>qual exame funciona melhor para este objetivo, neste paciente, neste sistema de saúde, neste momento da decisão clínica?</em></p>
  </div>

  ${sectionTitle('📊','Comparação visual: padrão-ouro × teste alternativo', 'var(--c-amber)')}
  <div class="dist-wrap">${PrevSVG.padraoOuroVsTeste()}</div>

  ${didaxBlock('caso','🩺','Situação-problema: o gestor de saúde pública',
    `<p>Um gestor municipal precisa organizar o rastreamento de câncer colorretal para 200.000 pessoas. Ele sabe que a colonoscopia é tecnicamente superior — mas só dispõe de 4 colonoscopistas no município e orçamento limitado. Oferecer colonoscopia para todos é matemática impossível: levaria décadas, com filas crescendo mais rápido do que o serviço resolve.</p>
    <p><strong>Pergunta clínica:</strong> qual raciocínio justifica oferecer um teste tecnicamente inferior (sangue oculto) como porta de entrada do rastreamento?</p>
    <p><strong>Resposta:</strong> sangue oculto é barato, aceitável e escalável. Ele identifica os candidatos com maior probabilidade pré-teste de doença, que então recebem a colonoscopia. O sistema fica viável e a sensibilidade global do programa permanece alta.</p>`)}

  ${didaxBlock('importa','💡','Por que isso importa na prática?',
    `<p>A melhor decisão médica nunca depende apenas do exame mais bonito no livro. Ela depende de <strong>custo, disponibilidade, risco do procedimento, aceitabilidade do paciente e impacto populacional</strong>. Esses são os critérios pelos quais a Medicina Preventiva avalia qualquer teste novo.</p>`)}

  ${bancaCallout(`<p>A banca quer que você perceba que padrão-ouro é apenas uma <strong>referência de comparação</strong>. Novos testes podem ser necessários por custo, aceitabilidade, possibilidade de execução e aplicabilidade populacional. <strong>Validar não é trocar o padrão-ouro — é decidir quando substituí-lo, quando complementá-lo e quando precedê-lo.</strong></p>`)}

  ${didaxBlock('pegadinha','⚠️','Pegadinha de prova',
    `<p>A banca pode sugerir que, se já existe padrão-ouro, não há motivo para validar outro teste. <strong>Isso é falso.</strong> Mesmo com padrão-ouro estabelecido, novos testes são validados por questões de custo, acesso, aceitabilidade, invasividade ou aplicabilidade populacional.</p>`)}

  ${didaxBlock('naoconfunda','🔀','Não confunda',
    `<p>"Teste melhor tecnicamente" <strong>não</strong> é a mesma coisa que "teste mais adequado para rastreamento populacional". Um pode ser perfeito em sensibilidade e ainda assim ser inviável em larga escala.</p>`)}

  ${didaxBlock('errocomum','❌','Erro comum',
    `<p>Achar que validar teste é apenas calcular sensibilidade e especificidade. Isso é <em>parte</em> do processo. A validação também avalia custo, acessibilidade, aceitabilidade, possibilidade de execução, risco e aplicabilidade populacional.</p>`)}

  ${didaxBlock('avancado','⚡','O que diferencia o aluno avançado',
    `<p>O aluno avançado entende que um teste pode ser <strong>inferior ao padrão-ouro</strong> em desempenho diagnóstico e, ao mesmo tempo, <strong>superior em utilidade pública</strong>. Esse aluno também sabe responder: "para quê?", "para quem?", "em que ponto da cascata diagnóstica?".</p>`)}

  ${didaxBlock('numerico','🔢','Exemplo numérico de referência',
    `<ul class="tight">
      <li>Colonoscopia: custo aproximado de <strong>R$ 600–1.500</strong> por exame; exige sedação em ~30% dos casos.</li>
      <li>Sangue oculto (FIT): custo aproximado de <strong>R$ 5–15</strong> por exame; sem preparo, sem sedação.</li>
      <li>Em um programa para 200 mil pessoas, oferecer colonoscopia direta custaria centenas de milhões. Triagem com sangue oculto torna o programa viável.</li>
    </ul>`)}

  ${revisaoAtiva([
    { q: 'Por que um novo teste pode ser útil mesmo existindo padrão-ouro?', a: 'Por custo, acessibilidade, aceitabilidade, possibilidade de execução, invasividade ou escalabilidade. O novo teste pode ocupar um espaço diferente na cascata diagnóstica (rastreamento, triagem, exclusão preliminar).' },
    { q: 'Cite dois motivos além de custo.', a: 'Aceitabilidade pelo paciente (ex.: preparo extenso, jejum, sedação) e possibilidade de execução em ambientes com baixa estrutura.' },
    { q: 'Em rastreamento populacional, por que aceitabilidade importa?', a: 'Porque um teste tecnicamente excelente que ninguém aceita fazer simplesmente não detecta doença. A taxa de adesão é parte do desempenho real do programa.' }
  ])}

  ${pageFooterMeta({
    resumo: 'Validar testes é estudar quando um exame novo, ainda que inferior ao padrão-ouro, é útil, viável e socialmente aceitável. Custo, aceitabilidade, execução e impacto populacional são critérios tão importantes quanto sensibilidade.',
    proximaConexao: 'Depois de entender por que testes são validados, a próxima página mostra que exame diagnóstico não é decisão isolada: ele se encaixa na Medicina Baseada em Evidências e na decisão compartilhada com o paciente.',
    nextId: 'm1-02'
  })}
  `;
  renderStandard(container, page, body);
};

/* ─────────────────────────────────────────
   PÁGINA 2 — MBE: por que IA não substitui o médico
───────────────────────────────────────── */
GO_RENDER['m1-02'] = function(container, page) {
  const body = `
  ${pageHero({ module:'m1', moduleLabel:'Módulo 1 — Validação de Testes', pageNum: 2, title:'Medicina baseada em evidências: por que IA não substitui o médico', lead:'A tripla aliança que dá sustentação a toda decisão diagnóstica.', grad:'var(--grad-m1)' })}

  ${conceptHero({
    question: 'O que sustenta uma decisão clínica realmente boa?',
    title: 'MBE não é "seguir o livro" — é integrar evidência, experiência e paciente',
    lead: 'Validação de testes só faz sentido dentro de uma estrutura mais ampla: a Medicina Baseada em Evidências (MBE), construída sobre três pilares que se atravessam.',
    glow: 'rgba(139,92,246,.20)'
  })}

  ${keyTerms(['MBE','melhor evidência','experiência clínica','decisão compartilhada','quatro És','IA na medicina','arterite temporal','método clínico centrado na pessoa'], 'violet')}

  <div class="prose">
    <p>Medicina baseada em evidências <strong>não é o mesmo que medicina baseada em estudos</strong>. Ela é a integração ativa de três fontes de informação: a melhor evidência disponível, a experiência clínica do médico e os valores e preferências do paciente. Quando alguém diz "MBE", e pensa apenas em ler artigos, está enxergando um terço do conceito.</p>

    <p>O <strong>primeiro pilar</strong> é a <em>melhor evidência disponível</em>. Significa ensaios clínicos bem feitos, revisões sistemáticas, meta-análises, diretrizes de boa qualidade. Mas evidência sem contexto vira protocolo cego. Diretriz desenhada para 1000 pacientes europeus não se aplica de forma idêntica a um paciente do interior do Brasil sem que você module.</p>

    <p>O <strong>segundo pilar</strong> é a <em>experiência clínica</em>. É aqui que o aluno se confunde. Experiência não é decoreba de tabela. Experiência é a memória sensorial-cognitiva acumulada de já ter visto, examinado, conversado, errado e acertado. É a primeira vez que você palpou uma artéria temporal endurecida em uma paciente idosa com cefaleia nova e PCR alta — e nunca mais esqueceu o quadro de <strong>arterite temporal</strong>. Isso não está no livro com a mesma força com que está na sua memória corporal.</p>

    <p>O <strong>terceiro pilar</strong> é o <em>paciente</em>: seus valores, suas crenças, seu contexto socioeconômico, suas preferências, seu medo, sua espiritualidade. O médico tecnicamente excelente que despreza isso oferece péssima medicina, ainda que assertiva. O médico que entende isso pratica <strong>decisão compartilhada</strong>: explica as opções, expõe trade-offs, e constrói a decisão com o paciente.</p>

    <p class="pulled">É por isso que IA não substitui o médico. Algoritmos podem reproduzir o primeiro pilar com brilho. Podem até auxiliar no segundo. Mas o terceiro — o encontro humano, a leitura emocional, a captação de demandas ocultas, a explicação modulada — exige presença.</p>

    <p>Aquele tio que diz no jantar que "logo IA vai substituir médico" geralmente nunca foi atendido por um. Quem já dependeu de um médico em momento difícil sabe: o exame correto sem o cuidado certo é tratamento incompleto.</p>

    <p>O <strong>método clínico centrado na pessoa</strong> sistematiza essa habilidade. Ele propõe os "quatro És": Explorar a doença e a experiência da doença; Entender a pessoa como um todo; Encontrar um terreno comum para o tratamento; e Estabelecer e fortalecer a relação médico-paciente. Perguntas abertas, escuta ativa, atenção às demandas ocultas (o paciente que vem por "dor de cabeça" mas o que quer mesmo é falar sobre o medo de demência) — isso é tão diagnóstico quanto qualquer exame.</p>

    <p>Ser tecnicamente brilhante e desrespeitoso não é "ser bom médico com mau humor". É <strong>ser mau médico em uma dimensão central</strong> da profissão. A Preventiva insiste nisso porque entende: validar testes, calcular sensibilidade, montar tabelas 2x2, tudo isso é instrumental — instrumento de uma medicina que, no fim, é encontro humano.</p>
  </div>

  ${sectionTitle('🌿','O tripé da MBE', 'var(--c-violet)')}
  <div class="flowchart">${PrevSVG.tripeMBE()}</div>

  ${didaxBlock('caso','🩺','Cena clínica: a primeira arterite temporal',
    `<p>Você está no 4º ano. Atende uma senhora de 72 anos com cefaleia nova, dor ao mastigar, claudicação de mandíbula e VHS muito alta. O atendente sênior palpa a artéria temporal e mostra que ela está endurecida e dolorosa. Você nunca mais esquece. Anos depois, em uma emergência cheia, identifica em segundos o quadro — não por ler de novo, mas porque sua mão lembra. <strong>Isso é o segundo pilar da MBE em ação.</strong></p>`)}

  ${didaxBlock('importa','💡','Por que isso importa na prática?',
    `<ul class="tight">
      <li>Diretriz sozinha vira protocolo. Experiência sozinha vira ego. Paciente sozinho vira procura por validação.</li>
      <li>Os três pilares juntos viram <strong>medicina decente</strong>.</li>
      <li>A escolha de qual exame pedir é exatamente isso: evidência (qual teste tem boa Sens/Esp), experiência (qual paciente eu tenho na frente) e paciente (o que ele aceita).</li>
    </ul>`)}

  ${bancaCallout(`<p>A banca pode oferecer alternativas como "MBE = sempre seguir a melhor evidência disponível", como se fosse pilar único. <strong>Errado.</strong> MBE é a integração ativa dos três pilares. Banca também adora questões sobre comunicação centrada na pessoa, perguntas abertas e demanda oculta.</p>`)}

  ${didaxBlock('pegadinha','⚠️','Pegadinha de prova',
    `<p>"O médico mais experiente que segue a melhor evidência é o melhor médico." Falso enquanto enunciado, porque ignora o terceiro pilar (paciente). Esse é o tipo de armadilha que separa quem decora MBE de quem entende.</p>`)}

  ${didaxBlock('naoconfunda','🔀','Não confunda',
    `<p>Decisão compartilhada não é "deixar o paciente decidir sozinho". É <strong>construir a decisão junto</strong>, com explicação clara das opções e dos trade-offs. Você continua sendo o médico — agora com uma escuta ativa.</p>`)}

  ${didaxBlock('errocomum','❌','Erro comum',
    `<p>Identificar MBE com "leitura de artigos". MBE é prática integrada de evidência + experiência + paciente.</p>`)}

  ${didaxBlock('avancado','⚡','O que diferencia o aluno avançado',
    `<p>O aluno avançado conhece os "quatro És" do método clínico centrado na pessoa e sabe que demanda oculta é tão diagnóstica quanto sinal vital. Sabe também que IA tem um papel — mas no nível do auxílio, não da substituição.</p>`)}

  ${sectionTitle('🔁','Vire o cartão — fixe os reflexos da MBE', 'm1')}
  ${PrevInt.flashdeck([
    { q: 'Os três pilares da MBE são…', a: 'Melhor evidência disponível, experiência clínica do médico e valores/preferências do paciente — integrados ativamente.' },
    { q: 'Onde a IA atua melhor dentro da MBE?', a: 'No primeiro pilar (recuperar e sintetizar evidência) e como apoio ao segundo. Não substitui o terceiro (encontro humano e decisão compartilhada).' },
    { q: 'O que são os "quatro És" do método clínico centrado na pessoa?', a: 'Explorar a doença e a experiência da doença · Entender a pessoa como um todo · Encontrar terreno comum · Estabelecer e fortalecer a relação médico-paciente.' },
    { q: 'Demanda oculta — definição prática.', a: 'A motivação real do paciente por trás da queixa explicitada. Ex.: vem por "dor de cabeça", mas pesa o medo de demência. Identificá-la é tão diagnóstico quanto medir pressão.' }
  ])}

  ${revisaoAtiva([
    { q: 'Quais são os três pilares da MBE?', a: 'Melhor evidência disponível, experiência clínica do médico e valores/preferências do paciente.' },
    { q: 'Por que IA não substitui médico?', a: 'Pode reproduzir o primeiro pilar (evidência) e auxiliar no segundo, mas não substitui o encontro humano que sustenta o terceiro (decisão compartilhada).' },
    { q: 'O que é demanda oculta?', a: 'A motivação real do paciente por trás da queixa explicitada. Ex.: vem por dor de cabeça, mas o que pesa é o medo de demência. Captá-la é parte do método clínico centrado na pessoa.' }
  ])}

  ${pageFooterMeta({
    resumo: 'MBE é decisão integrada — evidência + experiência + paciente. Validar testes é o instrumental; o exercício é humano, escuta, decisão compartilhada.',
    proximaConexao: 'Com a MBE definida, partimos para a epidemiologia clínica: a ciência de pedir e interpretar exames em casos reais.',
    nextId: 'm1-03'
  })}
  `;
  renderStandard(container, page, body);
};

/* ─────────────────────────────────────────
   PÁGINA 3 — Epidemiologia clínica
───────────────────────────────────────── */
GO_RENDER['m1-03'] = function(container, page) {
  const body = `
  ${pageHero({ module:'m1', moduleLabel:'Módulo 1 — Validação de Testes', pageNum: 3, title:'Epidemiologia clínica: escolher e interpretar exames', lead:'O exame não é o teste — o exame começa na pergunta clínica.', grad:'var(--grad-m1)' })}

  ${conceptHero({
    question: 'Quando pedir, e como interpretar, um exame?',
    title: 'Pedir exame sem hipótese é gerar dado sem decisão',
    lead: 'Epidemiologia clínica é a aplicação da estatística e do raciocínio populacional na decisão individual. Ela responde quando pedir, qual pedir, como interpretar — e quando não pedir.',
    glow: 'rgba(20,184,166,.20)'
  })}

  ${keyTerms(['hipótese pré-teste','probabilidade pré-teste','sensibilidade','especificidade','VPP','VPN','raciocínio populacional','decisão individual'], 'teal')}

  <div class="prose">
    <p>Há médicos que pedem exames por reflexo — "vou pedir tudo, depois vejo". Esses médicos geram colunas e colunas de números que, sem hipótese clínica organizada, não traduzem decisão. Mais grave: geram <strong>achados incidentais</strong> que viram cascata diagnóstica sem fim.</p>

    <p>Epidemiologia clínica propõe o contrário: <strong>todo exame começa com uma pergunta</strong>. Você tem uma hipótese clínica, com uma probabilidade pré-teste estimada (baixa, intermediária ou alta), e o exame entra como uma ferramenta para confirmar ou refutar essa hipótese.</p>

    <p class="pulled">Quanto você espera de um exame depende de quem é o seu paciente, qual a sua hipótese e o que a literatura diz sobre o desempenho do teste naquele cenário.</p>

    <p>Quando uma <strong>jovem de 20 anos sem fatores de risco</strong> tem dor torácica atípica, sua probabilidade pré-teste de doença coronariana é muito baixa. Pedir uma cintilografia miocárdica nessa situação produz, em sua maioria, falsos positivos — porque o pool de candidatos verdadeiramente doentes é pequeno. Um exame positivo aqui não confirma quase nada.</p>

    <p>Já um <strong>homem de 65 anos, hipertenso, diabético, fumante</strong>, com dor torácica típica, tem probabilidade pré-teste alta. Um exame negativo, mesmo num teste sensível, não exclui completamente — pode ser falso negativo. E um positivo simplesmente confirma o que a clínica já sugeria.</p>

    <p>Esse raciocínio é a base da epidemiologia clínica. Ele exige que você saiba duas coisas sobre o exame que está pedindo: <strong>sensibilidade</strong> (capacidade de detectar doentes) e <strong>especificidade</strong> (capacidade de reconhecer sadios). Sem isso, você está jogando moeda com o resultado.</p>

    <p>Outro princípio: epidemiologia clínica reconhece que <em>a mesma sensibilidade e especificidade</em> produzem resultados diferentes em populações com prevalência diferente. Esse é o coração do Módulo 2. Por enquanto, basta entender: o resultado de um exame nunca é "positivo" ou "negativo" no vácuo. Ele é sempre um <strong>pedaço de informação</strong> que se soma à sua hipótese clínica para gerar uma probabilidade pós-teste.</p>
  </div>

  ${sectionTitle('🧠','Fluxo da decisão diagnóstica', 'var(--c-teal)')}
  <div class="flowchart">${PrevSVG.bayesFluxo()}</div>

  ${didaxBlock('caso','🩺','Cenário comparativo: mesmo exame, contextos opostos',
    `<p><strong>Caso A.</strong> Mulher 22 anos, sem fatores de risco, dor torácica atípica em jovem ansiosa. Probabilidade pré-teste de doença coronariana: ~2%.</p>
    <p><strong>Caso B.</strong> Homem 68 anos, HAS, DM, tabagismo 30 anos/maço, dor opressiva. Probabilidade pré-teste de doença coronariana: ~80%.</p>
    <p>Mesmo cintilografia miocárdica positiva (Sens 85%, Esp 75%): no <strong>caso A</strong>, o VPP é baixo — muitos falsos positivos. No <strong>caso B</strong>, o VPP é alto, mas o resultado quase não acrescenta porque a clínica já era forte. Conclusão: o exame "vale" diferente em cada um.</p>`)}

  ${didaxBlock('importa','💡','Por que isso importa na prática?',
    `<ul class="tight">
      <li>O exame mais útil é aquele pedido em paciente com probabilidade pré-teste intermediária — onde o resultado realmente muda a decisão.</li>
      <li>Em probabilidade pré-teste muito baixa ou muito alta, o exame frequentemente não muda conduta.</li>
      <li>Pedir exame "para confirmar" o que você já tem certeza é fonte clássica de iatrogenia.</li>
    </ul>`)}

  ${bancaCallout(`<p>A banca testa esse raciocínio pedindo: "qual a melhor conduta?" em paciente com clínica muito forte. A resposta certa muitas vezes não envolve pedir exame, e sim tratar empiricamente ou observar — porque o exame não vai mudar nada.</p>`)}

  ${didaxBlock('pegadinha','⚠️','Pegadinha de prova',
    `<p>Pedir muito exame parece "ser cuidadoso". É, na verdade, sinal de raciocínio clínico mal estruturado. Banca explora isso com pacientes assintomáticos onde marcador tumoral elevado vira cascata desnecessária.</p>`)}

  ${didaxBlock('naoconfunda','🔀','Não confunda',
    `<p>"Probabilidade pré-teste" não é "prevalência". Prevalência é uma medida populacional. Probabilidade pré-teste é a sua estimativa <strong>individual</strong>, modulada por idade, sexo, fatores de risco, clínica e prevalência local.</p>`)}

  ${didaxBlock('errocomum','❌','Erro comum',
    `<p>Pedir bateria de exames antes de organizar hipótese. Resultado: dados incidentais, cascata diagnóstica, ansiedade do paciente, custo desnecessário.</p>`)}

  ${didaxBlock('avancado','⚡','O que diferencia o aluno avançado',
    `<p>O avançado pergunta, antes de pedir qualquer exame: "se o resultado for positivo, o que eu faço? e se for negativo, o que eu faço?". Se as respostas forem iguais, o exame não deveria ter sido pedido.</p>`)}

  ${sectionTitle('🩺','Caso guiado — você é o médico de plantão', 'm1')}
  ${PrevInt.casoClinico({
    tag: 'Pedir ou não pedir?',
    title: 'Mulher de 22 anos com dor torácica atípica',
    scenario: `<p>Estudante de 22 anos chega ao pronto-socorro com episódio de dor torácica atípica durante semana de provas. Sem fatores de risco cardiovascular. Exame físico normal. ECG normal. Hemodinâmica estável.</p>
    <p>Probabilidade pré-teste de doença coronariana estimada: <strong>~2%</strong>.</p>`,
    question: 'Qual a melhor conduta diagnóstica neste momento?',
    options: [
      'Solicitar cintilografia miocárdica para descartar doença coronariana.',
      'Solicitar angio-TC de coronárias por garantia, dada a queixa torácica.',
      'Tranquilizar, orientar retorno se piora, e investigar causa funcional/ansiedade (sem teste cardíaco de imagem).',
      'Internar para troponinas seriadas e prova de esforço.'
    ],
    correctIndex: 2,
    explain: `Probabilidade pré-teste muito baixa (~2%) — solicitar um teste com Sens 85% e Esp 75% nessa população produzirá, em sua maioria, <strong>falsos positivos</strong> (VPP despenca em prevalência baixa). O exame não muda a conduta e ainda gera cascata diagnóstica. A boa medicina aqui é clínica + tranquilização + orientação de retorno.`,
    tip: 'Filtro pré-exame: "se positivo, o que faço? se negativo, o que faço?". Se as respostas são iguais, o exame não deveria ser pedido.'
  })}

  ${revisaoAtiva([
    { q: 'O que é probabilidade pré-teste?', a: 'Sua estimativa individual da probabilidade de doença antes do exame, baseada em idade, sexo, fatores de risco, clínica e prevalência local.' },
    { q: 'Por que pedir exame em paciente com clínica muito forte pode ser inútil?', a: 'Porque a probabilidade pré-teste já é tão alta que o resultado raramente muda a conduta — exceto por confirmação documental.' },
    { q: 'Qual a pergunta-filtro antes de pedir qualquer exame?', a: '"Se for positivo, faço o quê? Se for negativo, faço o quê?". Se as ações forem idênticas, o exame é desnecessário.' }
  ])}

  ${pageFooterMeta({
    resumo: 'Pedir exame é gesto clínico, não reflexo. Cada teste tem desempenho próprio (Sens, Esp) e deve ser solicitado para mudar uma decisão, não para confirmar o óbvio.',
    proximaConexao: 'Para falar de sensibilidade, especificidade e seus derivados, precisamos da ferramenta-mãe: a tabela 2x2. É ela que organiza o raciocínio.',
    nextId: 'm1-04'
  })}
  `;
  renderStandard(container, page, body);
};

/* ─────────────────────────────────────────
   PÁGINA 4 — A tabela 2x2
───────────────────────────────────────── */
GO_RENDER['m1-04'] = function(container, page) {
  const body = `
  ${pageHero({ module:'m1', moduleLabel:'Módulo 1 — Validação de Testes', pageNum: 4, title:'A tabela 2x2: a cruz que organiza o raciocínio', lead:'Sem ela, nada de Sens, Esp, VPP, VPN, acurácia, RV. Com ela, tudo se encaixa.', grad:'var(--grad-m1)' })}

  ${conceptHero({
    question: 'Qual a estrutura mental que sustenta toda a epidemiologia clínica?',
    title: 'A tabela 2x2 cruza o que o teste disse com o que é a verdade (padrão-ouro)',
    lead: 'Quatro caselas. Quatro resultados possíveis. Toda fórmula que você vai usar daqui em diante sai daqui.',
    glow: 'rgba(37,99,235,.22)'
  })}

  ${keyTerms(['tabela 2x2','padrão-ouro','VP','FP','FN','VN','teste positivo','teste negativo','doente','sadio'])}

  <div class="prose">
    <p>Toda análise de teste diagnóstico começa cruzando duas dimensões:</p>
    <ol>
      <li><strong>O que o padrão-ouro diz</strong> — quem realmente é doente, quem realmente é sadio.</li>
      <li><strong>O que o nosso teste diz</strong> — quem testou positivo, quem testou negativo.</li>
    </ol>
    <p>Esse cruzamento gera <strong>quatro caselas</strong> — quatro possibilidades de resultado:</p>
  </div>

  ${sectionTitle('🧩','A estrutura conceitual', 'm1')}
  <div class="dist-wrap">${PrevSVG.tabela2x2Concept()}</div>

  <div class="prose">
    <p>Memorize a posição das caselas — ela vai aparecer em centenas de questões. <strong>Doentes ficam à esquerda</strong> (no padrão-ouro), <strong>sadios à direita</strong>. <strong>Teste positivo em cima</strong>, <strong>teste negativo embaixo</strong>. Os <em>verdadeiros</em> (VP e VN) ficam na diagonal: doente que testou positivo (acerto) e sadio que testou negativo (acerto). Os <em>falsos</em> (FP e FN) ficam na antidiagonal: sadio que testou positivo (FP, erro) e doente que testou negativo (FN, erro).</p>
    <p class="pulled">VP e VN são os <strong>acertos</strong>. FP e FN são os <strong>erros</strong>. Toda métrica de teste diagnóstico vai contar acertos e erros — só muda qual eixo (linha ou coluna) você usa como denominador.</p>
    <p>Agora vem o salto. Você pode treinar isso lendo, mas só vai dominar mexendo. Use a tabela interativa abaixo. <strong>Mude os valores</strong>. Veja em tempo real a sensibilidade, a especificidade, a acurácia, o VPP, o VPN e as razões de verossimilhança se moverem.</p>
  </div>

  ${sectionTitle('⚙','Laboratório interativo — tabela 2x2 mãe', 'm1')}
  ${PrevInt.tabela2x2()}

  ${didaxBlock('caso','🩺','Cenário aplicado',
    `<p>Você está validando um novo teste para detecção de tuberculose pulmonar. Aplica em 1.000 pacientes com hipótese clínica, todos depois confirmados (ou descartados) por baciloscopia + cultura (padrão-ouro). Resultados:</p>
    <ul class="tight"><li><strong>Doentes:</strong> 100 (90 testaram +, 10 testaram −)</li><li><strong>Sadios:</strong> 900 (30 testaram +, 870 testaram −)</li></ul>
    <p>Monte a 2x2 mentalmente. <strong>Sensibilidade = 90/100 = 90%. Especificidade = 870/900 = 96,7%. Acurácia = 960/1000 = 96%.</strong> Já pode brincar com os números no quadro acima.</p>`)}

  ${didaxBlock('importa','💡','Por que isso importa na prática?',
    `<p>A 2x2 não é só ferramenta de prova. É a estrutura mental que sustenta qualquer análise diagnóstica que você fizer na vida — bancada, ensaio clínico, decisão de diretriz, escolha entre dois exames. Quem desenha a 2x2 sem hesitar tem 70% do raciocínio resolvido.</p>`)}

  ${bancaCallout(`<p>A banca adora dar uma 2x2 com células embaralhadas, ou inverter eixos (teste no padrão-ouro, padrão-ouro no teste), ou pedir métrica calculada a partir de coluna errada. <strong>Verifique sempre quem está no eixo do padrão-ouro</strong> antes de aplicar fórmula.</p>`)}

  ${didaxBlock('pegadinha','⚠️','Pegadinha de prova',
    `<p>Trocar o eixo. Se você calcular Sens usando o denominador da linha (positivos totais) em vez da coluna (doentes totais), o resultado é VPP, não Sens. Confusão clássica.</p>`)}

  ${didaxBlock('naoconfunda','🔀','Não confunda',
    `<p>VP+FN ≠ VP+FP. O primeiro são <strong>todos os doentes</strong> (denominador da Sens). O segundo são <strong>todos os teste-positivos</strong> (denominador do VPP). São conceitos diferentes que ocupam linhas e colunas diferentes.</p>`)}

  ${didaxBlock('errocomum','❌','Erro comum',
    `<p>Decorar fórmulas sem saber de qual casela e de qual eixo elas vêm. Quando a banca embaralha a tabela, você se perde.</p>`)}

  ${didaxBlock('avancado','⚡','O que diferencia o aluno avançado',
    `<p>O avançado <strong>refaz a 2x2 do zero</strong> em qualquer questão. Em 30 segundos. Não tenta decorar fórmulas, monta a estrutura e calcula. Isso protege contra qualquer pegadinha de eixos invertidos.</p>`)}

  ${fraseAutoral({
    tag: 'Voz Preventiva',
    body: `A tabela 2×2 é a ferramenta mais subestimada de toda a residência. Eu já vi candidato perder ponto que valia ouro porque entrou na questão tentando lembrar fórmula, em vez de desenhar a cruz. <strong>Quem desenha a 2×2 manda na questão</strong>; quem decora fórmula é mandado por ela. Esse módulo inteiro nasce daqui — todo o resto, do Bayes à curva ROC, é diálogo entre estas quatro caselas.`,
    assinatura: 'Intensivão Preventiva · M1-04'
  })}

  ${revisaoAtiva([
    { q: 'Quem fica na coluna esquerda da tabela 2x2?', a: 'Os doentes verdadeiros, segundo o padrão-ouro.' },
    { q: 'Quem fica na linha superior?', a: 'Os teste-positivos.' },
    { q: 'Onde estão VP e VN?', a: 'Na diagonal principal — são os acertos do teste.' },
    { q: 'Onde estão FP e FN?', a: 'Na antidiagonal — são os erros do teste.' }
  ])}

  ${pageFooterMeta({
    resumo: 'A tabela 2x2 cruza padrão-ouro (colunas) com teste (linhas). VP e VN na diagonal; FP e FN na antidiagonal. Toda fórmula sai dali.',
    proximaConexao: 'Próxima página: aprofundar o significado dos quatro resultados — VP, FP, FN, VN — e seus impactos clínicos.',
    nextId: 'm1-05'
  })}
  `;
  renderStandard(container, page, body);
};

/* ─────────────────────────────────────────
   PÁGINA 5 — Quatro resultados possíveis
───────────────────────────────────────── */
GO_RENDER['m1-05'] = function(container, page) {
  const body = `
  ${pageHero({ module:'m1', moduleLabel:'Módulo 1 — Validação de Testes', pageNum: 5, title:'Quatro resultados possíveis: VP, FP, FN e VN', lead:'Cada um tem peso clínico diferente. Confundir não é detalhe técnico — é erro de conduta.', grad:'var(--grad-m1)' })}

  ${conceptHero({
    question: 'O resultado do teste foi positivo — e agora?',
    title: 'Os quatro destinos possíveis de qualquer paciente que faz um exame diagnóstico',
    lead: 'VP, FP, FN e VN não são apenas siglas. Cada um representa uma decisão clínica diferente, um risco diferente, uma cascata diferente.'
  })}

  ${keyTerms(['VP','FP','FN','VN','iatrogenia','falsa segurança','dano por sobrediagnóstico','rastreamento'])}

  <div class="prose">
    <p>Cada paciente que faz um exame entra, no fim, em uma de quatro caixas. E o impacto clínico de cair em cada uma é diferente — às vezes drasticamente.</p>

    <p><strong>VP (Verdadeiro Positivo):</strong> doente que testou positivo. É o cenário-alvo. O exame fez o que devia. O paciente é encaminhado para tratamento. <em>Acerto.</em></p>

    <p><strong>VN (Verdadeiro Negativo):</strong> sadio que testou negativo. Também acerto. O paciente é tranquilizado e dispensado de cuidado adicional. Boa medicina, sem dano.</p>

    <p><strong>FP (Falso Positivo):</strong> sadio que testou positivo. <em>Erro com cara de acerto.</em> O paciente sadio agora carrega um diagnóstico falso. Vai fazer outros exames, talvez invasivos. Vai ter ansiedade. Talvez vá receber tratamento de uma doença que não tem. Em rastreamento populacional de doença rara, o FP é o erro mais frequente — e tem custo real.</p>

    <p><strong>FN (Falso Negativo):</strong> doente que testou negativo. <em>Erro com cara de tranquilidade.</em> O paciente real e doente é dispensado como se estivesse bem. A doença progride. Quando ele volta com sintomas, o tempo de tratamento ideal já passou. Em câncer ou doenças infecciosas transmissíveis, o FN tem dano clínico e populacional.</p>

    <p class="pulled">VP e VN são acertos. FP é "diagnosticar quem não tem". FN é "deixar de diagnosticar quem tem". Os dois erros têm pesos diferentes em contextos diferentes — e isso vai definir se um teste deve ser mais sensível ou mais específico.</p>

    <p>Quando você é o médico que recebe o resultado do exame, é preciso lembrar: nenhum exame é perfeito. <strong>Cada resultado positivo pode ser FP. Cada resultado negativo pode ser FN.</strong> O que muda essa probabilidade é a combinação do desempenho do teste com a clínica do paciente. Esse é o motivo de existirem dois pares de métricas — Sens/Esp (sobre o teste) e VPP/VPN (sobre o resultado naquele paciente).</p>
  </div>

  ${sectionTitle('🎯','Aterre o conceito: encaixe os quatro destinos', 'm1')}
  ${PrevInt.tabela2x2({ preset: { vp: 90, fp: 30, fn: 10, vn: 870 } })}

  ${didaxBlock('caso','🩺','Cenário-impacto: o que dói em cada erro',
    `<p><strong>FP em rastreamento de câncer de mama:</strong> paciente sadia recebe mamografia "BIRADS 4", é encaminhada para biópsia desnecessária, com hematoma, ansiedade, custo, e às vezes cicatriz. Esse erro tem dano real.</p>
    <p><strong>FN em rastreamento de HIV:</strong> paciente infectado é dispensado como "soronegativo". Continua expondo parceiros. Demora meses para receber TARV. Dano individual e populacional.</p>
    <p><strong>FP em troponina:</strong> paciente sem SCA é internado em CTI por 24h. Custo, exposição, ansiedade, mas geralmente sem dano permanente.</p>
    <p><strong>FN em troponina:</strong> paciente com SCA real recebe alta. Pode morrer. O dano é catastrófico.</p>
    <p>É por isso que troponina é um teste <strong>sensível</strong> — preferimos errar com FP (overinvestigação) a errar com FN (morte). A escolha entre Sens e Esp depende do peso clínico do erro.</p>`)}

  ${didaxBlock('importa','💡','Por que isso importa na prática?',
    `<ul class="tight"><li>Saber o desempenho do teste te diz a frequência relativa dos quatro destinos.</li><li>Saber o contexto clínico te diz qual erro você pode tolerar.</li><li>Pedir o teste sem saber as duas coisas = jogar moeda.</li></ul>`)}

  ${bancaCallout(`<p>Banca adora questões em que pedem o "pior erro possível" em um contexto e oferecem alternativas misturando FP e FN. Sempre pergunte: <strong>"em qual contexto eu prefiro errar para mais e em qual prefiro errar para menos?"</strong></p>`)}

  ${didaxBlock('pegadinha','⚠️','Pegadinha de prova',
    `<p>"Falso negativo é sempre pior que falso positivo." <strong>Falso.</strong> Em rastreamento de doença grave e tratável (HIV, sífilis, câncer detectável), sim. Em rastreamento de achado incidental sem impacto (microcalcificação benigna), o FP pode causar mais dano que o FN.</p>`)}

  ${didaxBlock('naoconfunda','🔀','Não confunda',
    `<p>FP é "diagnóstico errado de doença". FN é "rotular como sadio quem está doente". Os dois são erros — mas com impactos clínicos opostos.</p>`)}

  ${didaxBlock('errocomum','❌','Erro comum',
    `<p>Esquecer que todo teste positivo na população assintomática de doença rara é, na maioria, FP. Esse é o coração do Módulo 2 — espera-se que você não caia nessa nas próximas páginas.</p>`)}

  ${didaxBlock('avancado','⚡','O que diferencia o aluno avançado',
    `<p>O avançado <strong>pensa nos quatro destinos antes de pedir o exame</strong>. Pergunta: "se for VP, beneficio? se for FP, prejudico? se for FN, perco doente que poderia tratar? se for VN, tranquilizo verdadeiramente?". É a maturidade que distingue conduta de protocolo.</p>`)}

  ${revisaoAtiva([
    { q: 'O que define um VP?', a: 'Paciente doente (no padrão-ouro) que testou positivo. Acerto.' },
    { q: 'Qual o impacto clínico típico de um FP em rastreamento?', a: 'Sadio recebe diagnóstico falso. Cascata de exames adicionais, ansiedade, custo, eventual procedimento desnecessário.' },
    { q: 'Por que troponina é teste sensível?', a: 'Porque, em SCA, FN tem dano catastrófico (morte). Preferimos FP (CTI desnecessário) a FN (perder infarto).' }
  ])}

  ${pageFooterMeta({
    resumo: 'VP e VN são acertos; FP e FN, erros. O peso clínico de cada erro depende do contexto — define se um teste deve ser sensível ou específico.',
    proximaConexao: 'Com os quatro destinos definidos, partimos para a primeira métrica global do teste: acurácia.',
    nextId: 'm1-06'
  })}
  `;
  renderStandard(container, page, body);
};

/* ─────────────────────────────────────────
   PÁGINA 6 — Acurácia
───────────────────────────────────────── */
GO_RENDER['m1-06'] = function(container, page) {
  const body = `
  ${pageHero({ module:'m1', moduleLabel:'Módulo 1 — Validação de Testes', pageNum: 6, title:'Acurácia: a proporção de acertos do teste', lead:'Simples de calcular. Traiçoeira de interpretar.', grad:'var(--grad-m1)' })}

  ${conceptHero({
    question: 'O que significa um teste com 95% de acurácia?',
    title: 'Acurácia = fração de acertos no total. Mas isso pode esconder catástrofes.',
    lead: 'A métrica mais intuitiva é também a mais perigosa quando aplicada em populações desequilibradas (com prevalência muito alta ou muito baixa).'
  })}

  ${keyTerms(['acurácia','VP+VN','prevalência','desequilíbrio','métrica global'])}

  <div class="prose">
    <p>A <strong>acurácia</strong> é a fração de acertos do teste sobre o total de testados. Em linguagem de tabela 2x2:</p>
  </div>

  ${formulaBox('Acurácia',
    `<strong>Acurácia</strong> = ${frac('VP + VN', 'VP + FP + FN + VN')} = <em>acertos / total</em>`,
    'Vai de 0 (nunca acerta) a 1 (sempre acerta). Costuma ser expressa em %.')}

  <div class="prose">
    <p>Parece a métrica mais óbvia. E é simples mesmo. Mas há uma armadilha. Considere um teste com <strong>acurácia de 99%</strong> para uma doença rara, com prevalência de 1%.</p>

    <p>Imagine 10.000 pessoas. Doença verdadeira: 100 (1%). Sadios: 9.900. Se o teste tem Sens 99% e Esp 99%:</p>
    <ul>
      <li>VP = 99 (entre os 100 doentes)</li>
      <li>FN = 1</li>
      <li>VN = 9.801 (entre os 9.900 sadios)</li>
      <li>FP = 99</li>
      <li><strong>Acurácia = (99+9801)/10000 = 99%</strong> ✓</li>
    </ul>

    <p>Acurácia altíssima. Mas quantos dos <em>positivos</em> são realmente doentes? <strong>99 / (99+99) = 50%</strong>. Metade dos teste-positivos é falso positivo. Acurácia de 99% — e mesmo assim você não pode acreditar em metade dos positivos. Esse é o "<strong>paradoxo da acurácia</strong>".</p>

    <p class="pulled">Acurácia é uma métrica global. Ela camufla desequilíbrios entre as caselas quando a prevalência é extrema. Por isso, em epidemiologia clínica, raramente se usa acurácia isolada. Preferimos o par Sens/Esp, ou, para o paciente individual, VPP/VPN.</p>

    <p>Onde acurácia ainda é útil? Em <strong>comparação direta entre testes</strong> aplicados na mesma população. Se o teste A tem acurácia 92% e o B, 87%, em condições iguais, o A vence em desempenho global. Mas se você quer saber qual exame pedir em paciente específico, acurácia não responde.</p>
  </div>

  ${sectionTitle('⚙','Veja a acurácia se mover', 'm1')}
  ${PrevInt.tabela2x2({ preset: { vp: 99, fp: 99, fn: 1, vn: 9801 }, presets: [
    { name: 'Doença rara (1%)', vp: 99, fp: 99, fn: 1, vn: 9801 },
    { name: 'Doença comum (50%)', vp: 99, fp: 1, fn: 1, vn: 99 },
    { name: 'Equilíbrio (10%)', vp: 99, fp: 9, fn: 1, vn: 891 },
  ]})}

  ${didaxBlock('caso','🩺','Cenário: o "teste perfeito" da prova',
    `<p>A banca apresenta: "novo teste com 99% de acurácia para diagnóstico de feocromocitoma". Você sente que está tudo certo. Erra a questão.</p>
    <p>Por quê? Porque feocromocitoma é raro. Com prevalência de 0,1% e Sens/Esp 99/99, a maioria dos positivos é falso positivo. Acurácia escondeu a tragédia diagnóstica.</p>`)}

  ${didaxBlock('importa','💡','Por que isso importa na prática?',
    `<ul class="tight"><li>Use acurácia para comparar testes na mesma população — ela funciona como métrica de eficiência global.</li><li>Não use para decidir individualmente — use Sens/Esp e VPP/VPN.</li><li>Desconfie de testes apresentados apenas com acurácia em rastreamento de doença rara.</li></ul>`)}

  ${bancaCallout(`<p>Banca testa o "paradoxo da acurácia" com frequência. Esteja atento: questão dá <strong>apenas acurácia alta</strong> e pede para você confiar no teste em doença rara. A resposta correta geralmente envolve dizer que <strong>VPP estaria baixo apesar da acurácia alta</strong>.</p>`)}

  ${didaxBlock('pegadinha','⚠️','Pegadinha de prova',
    `<p>"Teste com acurácia 99% é confiável em qualquer cenário." <strong>Falso.</strong> Em prevalência baixa, mesmo acurácia altíssima pode esconder VPP baixo.</p>`)}

  ${didaxBlock('naoconfunda','🔀','Não confunda',
    `<p>Acurácia ≠ Sensibilidade ≠ VPP. Acurácia conta acertos sobre total. Sens conta acertos entre doentes. VPP conta acertos entre teste-positivos. Três denominadores diferentes.</p>`)}

  ${didaxBlock('errocomum','❌','Erro comum',
    `<p>Reportar acurácia como "qualidade do teste" e parar por aí. É apenas o começo.</p>`)}

  ${didaxBlock('avancado','⚡','O que diferencia o aluno avançado',
    `<p>O avançado <strong>nunca confia em acurácia isolada</strong>. Pede Sens, Esp e contexto de prevalência antes de opinar sobre o teste.</p>`)}

  ${revisaoAtiva([
    { q: 'Qual a fórmula da acurácia?', a: '(VP + VN) / (VP + FP + FN + VN). Soma dos acertos sobre total testados.' },
    { q: 'Por que acurácia pode enganar em doença rara?', a: 'Porque uma quantidade enorme de VN puxa a acurácia para cima, escondendo um número desproporcional de FP em relação aos VP.' },
    { q: 'Em que situação acurácia é útil?', a: 'Em comparação direta entre testes aplicados na mesma população — funciona como métrica de eficiência global.' }
  ])}

  ${pageFooterMeta({
    resumo: 'Acurácia é a fração de acertos sobre o total. Útil para comparar testes na mesma população, perigosa para julgar testes em prevalência baixa.',
    proximaConexao: 'Para entender as duas métricas que realmente sustentam validação, vamos olhar a coluna dos doentes: sensibilidade.',
    nextId: 'm1-07'
  })}
  `;
  renderStandard(container, page, body);
};

/* ─────────────────────────────────────────
   PÁGINA 7 — Sensibilidade
───────────────────────────────────────── */
GO_RENDER['m1-07'] = function(container, page) {
  const body = `
  ${pageHero({
    module: 'm1', moduleLabel: 'Módulo 1 — Validação de Testes', pageNum: 7,
    title: 'Sensibilidade: detectar doentes e confiar no negativo',
    lead: 'A coluna dos doentes em ação — onde nasce a frase "SnNout: teste sensível, negativo exclui".',
    grad: 'var(--grad-m1)'
  })}

  ${conceptHero({
    question: 'Pergunta central',
    title: 'Se sensibilidade fala de teste positivo nos doentes, por que dizemos que um teste sensível serve para excluir doença?',
    lead: 'O paradoxo só se resolve quando entendemos que sensibilidade alta implica falso negativo baixo — e é isso que dá confiança ao resultado negativo.',
    glow: 'rgba(34,197,94,.22)'
  })}

  ${keyTerms(['sensibilidade','verdadeiro positivo','falso negativo','rastreamento','banco de sangue','SnNout','anti-HCV','infertilidade'])}

  <div class="prose">
    <p>A <span class="keyword">sensibilidade</span> é a probabilidade de o teste dar positivo entre as pessoas que <strong>realmente têm a doença</strong>. Em outras palavras, ela mora <em>na coluna dos doentes</em> da tabela 2x2: olha apenas para VP e FN.</p>

    <p>Quando a sensibilidade é alta, significa que pouquíssimos doentes recebem resultado negativo (FN baixo). Por isso, se um teste muito sensível der negativo, você pode <strong>confiar nesse negativo</strong> — porque é improvável que ele esteja errado entre quem tem a doença.</p>

    <p class="pulled">Por isso a frase de fixação clássica: <strong>"teste sensível, negativo exclui"</strong> — em inglês, <em>SnNout</em> (Sensitive, Negative, rules out).</p>

    <p>Pense em um <strong>banco de sangue</strong> rastreando hepatite C. O custo de um falso negativo é catastrófico: uma bolsa contaminada chega a múltiplos receptores. O banco precisa de um teste com sensibilidade altíssima — mesmo que isso aumente falsos positivos (bolsas descartadas indevidamente). Entre os dois erros, descartar uma bolsa saudável é muito menos grave do que transfundir uma bolsa contaminada.</p>

    <p>Esse é o coração do uso clínico da sensibilidade: <strong>doenças graves, contagiosas, ou que exigem rastreamento amplo</strong> — câncer, HIV, hepatites, infarto agudo — pedem testes com sensibilidade alta na linha de frente.</p>
  </div>

  ${sectionTitle('🧪','Calculadora interativa — coluna dos doentes', 'var(--c-green)')}
  <p style="color:var(--text-muted); margin-bottom: 12px;">Tabela ajustada para um cenário tipo banco de sangue (alta sensibilidade). Mude VP/FN e veja a sensibilidade reagir em tempo real.</p>
  ${PrevInt.tabela2x2({ vp: 99, fp: 50, fn: 1, vn: 950, lockPrev: true, title: 'Cenário banco de sangue — hepatite C' })}

  ${sectionTitle('🎯','Visual SnNout × SpPin', 'var(--c-amber)')}
  <div class="dist-wrap">${PrevSVG.snnoutSpinDual()}</div>

  ${didaxBlock('caso','🩺','Situação-problema: o doador de sangue',
    `<p>Um banco de sangue testa 1.000 bolsas em uma região com prevalência baixa de hepatite C. Surge um lote de 50 testes positivos. Antes de descartar, o serviço repete os exames com um teste confirmatório (mais específico). Por que esse fluxo existe?</p>
    <p><strong>Resposta:</strong> o teste inicial é <em>altamente sensível</em> — sua função é não deixar passar nenhum caso. Por isso ele aceita falsos positivos. O confirmatório, mais específico, separa quem realmente tem do que foi positivo apenas por reação cruzada.</p>`)}

  ${didaxBlock('importa','💡','Por que isso importa na prática?',
    `<p>Em <strong>rastreamento de doença grave</strong>, errar para mais (FP) custa um susto e exames adicionais. Errar para menos (FN) pode custar vidas. Por isso sensibilidade alta é critério de entrada — não de saída — da cascata diagnóstica.</p>`)}

  ${bancaCallout(`<p>A banca quer que você associe <strong>sensibilidade → exclusão</strong> e que reconheça os cenários que pedem sensibilidade alta: rastreamento, banco de sangue, câncer, infarto, COVID, doenças contagiosas. A frase-âncora é <strong>"teste sensível, negativo exclui"</strong>.</p>`)}

  ${didaxBlock('pegadinha','⚠️','Pegadinha de prova',
    `<p>A banca pode dizer que "teste sensível serve para confirmar doença". <strong>Errado.</strong> Teste sensível serve para <em>excluir</em> doença quando dá negativo. Para confirmar, precisamos de especificidade.</p>`)}

  ${didaxBlock('naoconfunda','🔀','Não confunda',
    `<p>Sensibilidade ≠ valor preditivo negativo. Sensibilidade é propriedade do teste (não muda com prevalência); VPN depende de prevalência. Veremos isso em detalhe no Módulo 2.</p>`)}

  ${didaxBlock('errocomum','❌','Erro comum',
    `<p>Dividir VP pelo total da população (VP + FP + FN + VN). <strong>Errado.</strong> O denominador da sensibilidade é apenas a coluna dos doentes: <strong>VP + FN</strong>.</p>`)}

  ${didaxBlock('avancado','⚡','O que diferencia o aluno avançado',
    `<p>O avançado nunca lê "teste sensível" sem perguntar: <em>qual a especificidade?</em> Sensibilidade alta isolada pode esconder uma especificidade catastrófica — um teste com sensibilidade 100% e especificidade 0% dá positivo em todo mundo e não vale nada.</p>`)}

  ${formulaBox('Sensibilidade',
    `${frac('VP','VP + FN')} = ${frac('verdadeiros positivos','total de doentes')}`,
    'O denominador é apenas a coluna dos doentes.')}

  ${didaxBlock('numerico','🔢','Exemplo numérico preservado — infertilidade masculina',
    `<ul class="tight">
      <li>Estudo com <strong>200 doentes</strong> e 200 sadios.</li>
      <li>VP = <strong>182</strong>, FN = <strong>18</strong>.</li>
      <li>Sensibilidade = 182 / 200 = <strong>91%</strong>.</li>
      <li>Interpretação: o teste detecta 91% dos homens com infertilidade. Em 9 a cada 100 doentes, ele falha — é o falso negativo que precisamos vigiar.</li>
    </ul>`)}

  ${revisaoAtiva([
    { q: 'Qual a fórmula da sensibilidade?', a: 'VP / (VP + FN). Apenas a coluna dos doentes entra no cálculo.' },
    { q: 'Por que sensibilidade alta dá confiança no resultado negativo?', a: 'Porque sensibilidade alta significa FN baixo. Se quase nenhum doente sai negativo, um negativo é, com alta probabilidade, um sadio.' },
    { q: 'Cite três cenários que pedem teste sensível.', a: 'Rastreamento populacional (ex.: sangue oculto, mamografia), triagem em banco de sangue (HCV, HIV), exclusão de doenças graves de evolução rápida (infarto, sepse).' }
  ])}

  ${pageFooterMeta({
    resumo: 'Sensibilidade = VP / (VP + FN). Mora na coluna dos doentes, não muda com prevalência e dá confiança ao resultado negativo. SnNout: teste sensível, negativo exclui.',
    proximaConexao: 'Se um teste sensível é bom para excluir, podemos somar testes sensíveis em paralelo e ficar ainda mais seguros — é o que veremos agora.',
    nextId: 'm1-08'
  })}
  `;
  renderStandard(container, page, body);
};

/* ─────────────────────────────────────────
   PÁGINA 8 — Testes em paralelo
───────────────────────────────────────── */
GO_RENDER['m1-08'] = function(container, page) {
  const body = `
  ${pageHero({
    module: 'm1', moduleLabel: 'Módulo 1 — Validação de Testes', pageNum: 8,
    title: 'Testes em paralelo: somando sensibilidade para excluir doença',
    lead: 'Quando dois ou mais testes correm juntos — basta um positivo para seguir investigando.',
    grad: 'var(--grad-m1)'
  })}

  ${conceptHero({
    question: 'Pergunta central',
    title: 'Como combinar testes para reduzir ainda mais a chance de deixar um doente passar?',
    lead: 'Em situações de alto risco, não basta ter um teste sensível — colocamos vários em paralelo e exigimos que TODOS sejam negativos para excluir.',
    glow: 'rgba(34,197,94,.22)'
  })}

  ${keyTerms(['testes em paralelo','sensibilidade somada','ECG seriado','troponina','precordialgia','infarto','dor torácica atípica'])}

  <div class="prose">
    <p>Testes em paralelo são feitos <strong>ao mesmo tempo</strong> (ou em janela curta), e o resultado da combinação é considerado positivo se <em>qualquer um</em> dos testes for positivo. A regra é simples: <strong>basta um positivo para que o conjunto seja positivo</strong>.</p>

    <p>Por isso, paralelo <strong>aumenta a sensibilidade</strong> do conjunto — porque é mais difícil que <em>todos</em> os testes deixem o doente passar. Cada teste adicional cobre uma fração do "buraco" deixado pelo anterior.</p>

    <p class="pulled">A consequência: paralelo <strong>aumenta também os falsos positivos</strong>, e por isso é estratégia de <em>exclusão</em>, não de confirmação. O preço de não perder doente é aceitar mais alarmes falsos.</p>

    <p>Caso clínico clássico: um homem de 60 anos chega ao pronto-socorro com <strong>precordialgia atípica</strong>. O médico não pode arriscar deixar um infarto passar. Faz <strong>ECG seriado + troponina seriada</strong> em paralelo. Se ambos vierem negativos em janela adequada, a confiança para descartar síndrome coronariana aguda aumenta muito.</p>

    <p>Em rastreamento de câncer de colo, podemos combinar <strong>citologia + teste de HPV</strong> em paralelo — basta um positivo para indicar colposcopia. O custo da combinação é mais colposcopias, mas o ganho é detectar lesões que cada teste, isoladamente, poderia perder.</p>
  </div>

  ${sectionTitle('🔀','Paralelo × Série — comparação visual', 'var(--c-amber)')}
  <div class="dist-wrap">${PrevSVG.paraleloSerie()}</div>

  ${sectionTitle('🧪','Simulador interativo — paralelo aumenta sensibilidade', 'var(--c-green)')}
  <p style="color:var(--text-muted); margin-bottom: 12px;">Aumente VP e reduza FN para simular a adição de um segundo teste em paralelo. Observe a sensibilidade subir.</p>
  ${PrevInt.tabela2x2({ vp: 195, fp: 80, fn: 5, vn: 720, lockPrev: true, title: 'Cenário ECG + troponina seriados (paralelo)' })}

  ${didaxBlock('caso','🩺','Situação-problema: homem 60 anos, precordialgia atípica',
    `<p>Paciente chega ao PS com dor torácica que pode ser cardíaca, esofágica ou musculoesquelética. ECG inicial normal, troponina inicial negativa. <strong>Não basta.</strong> O médico solicita ECG seriado a cada 30 minutos e troponina em 0h, 3h e 6h — em paralelo. Se todos vierem negativos, a probabilidade de infarto cai drasticamente; o paciente pode receber alta com plano de ambulatório.</p>
    <p><strong>Lição:</strong> em situação de alto risco e baixo custo de FP, somar testes em paralelo é proteção contra o erro grave de mandar embora um infarto.</p>`)}

  ${didaxBlock('importa','💡','Por que isso importa na prática?',
    `<p>Sempre que o custo do falso negativo é catastrófico (morte, contágio, perda de janela terapêutica), <strong>some testes em paralelo</strong>. O paciente fica investigando mais — vale a pena.</p>`)}

  ${bancaCallout(`<p>A banca cobra a associação <strong>paralelo → sensibilidade → exclusão</strong>. Frase âncora: <strong>"paralelo aumenta sensibilidade"</strong>. O contrário (paralelo aumenta especificidade) é a pegadinha clássica.</p>`)}

  ${didaxBlock('pegadinha','⚠️','Pegadinha de prova',
    `<p>Inverter o papel: dizer que paralelo aumenta especificidade. <strong>Errado.</strong> Paralelo aumenta sensibilidade e, como efeito colateral, também aumenta FP.</p>`)}

  ${didaxBlock('naoconfunda','🔀','Não confunda',
    `<p>Testes em paralelo ≠ testes simultâneos quaisquer. A definição operacional é: <strong>basta um positivo para considerar o conjunto positivo</strong>. Se a regra fosse "todos positivos para considerar positivo", já seria série.</p>`)}

  ${didaxBlock('errocomum','❌','Erro comum',
    `<p>Aplicar paralelo em rastreamento populacional barato. Em prevalência muito baixa, paralelo gera um exército de FP — gasto, ansiedade e exames confirmatórios desnecessários. Use paralelo em alto risco, não em qualquer triagem.</p>`)}

  ${didaxBlock('avancado','⚡','O que diferencia o aluno avançado',
    `<p>O avançado pondera: <em>qual o ganho marginal de sensibilidade do segundo teste? E o custo em FP?</em> Adicionar um teste em paralelo só faz sentido se o ganho de sensibilidade compensar o aumento de FP no contexto clínico.</p>`)}

  ${didaxBlock('numerico','🔢','Exemplo numérico — paralelo no PS',
    `<ul class="tight">
      <li>Teste A (ECG inicial): sensibilidade 60%.</li>
      <li>Teste B (troponina 6h): sensibilidade 85%.</li>
      <li>Em paralelo (basta um positivo), sensibilidade combinada ≈ 1 − (1 − 0,60)(1 − 0,85) = 1 − 0,06 = <strong>94%</strong>.</li>
      <li>Interpretação: a chance de um doente passar despercebido cai de 15–40% (testes isolados) para ~6% (paralelo).</li>
    </ul>`)}

  ${revisaoAtiva([
    { q: 'Testes em paralelo aumentam o quê?', a: 'Sensibilidade do conjunto. Como efeito colateral, também aumentam os falsos positivos.' },
    { q: 'Qual a regra operacional do paralelo?', a: 'Basta um teste positivo para considerar o conjunto positivo.' },
    { q: 'Em que cenário paralelo é justificado?', a: 'Quando o custo do falso negativo é muito alto: emergência (infarto, AVC), doença contagiosa grave, rastreamento de câncer de alto risco.' }
  ])}

  ${pageFooterMeta({
    resumo: 'Testes em paralelo aumentam a sensibilidade do conjunto: basta um positivo para que o conjunto seja positivo. Estratégia de exclusão em alto risco — paga o preço em FP.',
    proximaConexao: 'Se a coluna dos doentes nos dá sensibilidade, falta entender o outro lado da tabela — a coluna dos sadios, onde vive a especificidade.',
    nextId: 'm1-09'
  })}
  `;
  renderStandard(container, page, body);
};

/* ─────────────────────────────────────────
   PÁGINA 9 — Especificidade
───────────────────────────────────────── */
GO_RENDER['m1-09'] = function(container, page) {
  const body = `
  ${pageHero({
    module: 'm1', moduleLabel: 'Módulo 1 — Validação de Testes', pageNum: 9,
    title: 'Especificidade: confiar no positivo e proteger contra iatrogenia',
    lead: 'A coluna dos sadios em ação — SpPin: teste específico, positivo confirma.',
    grad: 'var(--grad-m1)'
  })}

  ${conceptHero({
    question: 'Pergunta central',
    title: 'Se especificidade fala de teste negativo nos sadios, por que ela serve para CONFIRMAR doença?',
    lead: 'Porque especificidade alta significa falso positivo baixo — e isso dá confiança ao positivo, não ao negativo.',
    glow: 'rgba(239,68,68,.22)'
  })}

  ${keyTerms(['especificidade','verdadeiro negativo','falso positivo','SpPin','histopatológico','adenocarcinoma','confirmação','cirurgia','quimioterapia'])}

  <div class="prose">
    <p>A <span class="keyword">especificidade</span> é a probabilidade de o teste dar negativo entre as pessoas que <strong>realmente não têm a doença</strong>. Ela mora na <em>coluna dos sadios</em> da tabela 2x2 — olha apenas FP e VN.</p>

    <p>Quando a especificidade é alta, significa que pouquíssimos sadios recebem resultado positivo (FP baixo). Por isso, se um teste muito específico der positivo, você pode <strong>confiar nesse positivo</strong>: é improvável que ele esteja errado, porque sadios quase nunca dão positivo nesse teste.</p>

    <p class="pulled">Por isso a frase-âncora: <strong>"teste específico, positivo confirma"</strong> — em inglês, <em>SpPin</em> (Specific, Positive, rules in).</p>

    <p>Pense em um <strong>exame histopatológico</strong> identificando adenocarcinoma. Antes de submeter o paciente a uma cirurgia oncológica, quimioterapia ou radioterapia — todos com alto custo emocional, físico e financeiro — o sistema clínico exige um teste com especificidade altíssima. O preço de tratar um falso positivo seria devastador: cirurgia desnecessária, efeitos colaterais, trauma psicológico, possível iatrogenia.</p>

    <p>É por isso que cirurgia oncológica não começa com um exame de imagem suspeito — começa com <strong>confirmação histopatológica</strong>. O histopatológico tem especificidade próxima de 100% porque visualiza diretamente o tecido sob microscopia.</p>
  </div>

  ${sectionTitle('🧪','Calculadora interativa — coluna dos sadios', 'var(--c-red)')}
  <p style="color:var(--text-muted); margin-bottom: 12px;">Cenário tipo histopatológico (alta especificidade). Veja como reduzir FP eleva a especificidade.</p>
  ${PrevInt.tabela2x2({ vp: 95, fp: 2, fn: 5, vn: 898, lockPrev: true, title: 'Cenário histopatológico — adenocarcinoma' })}

  ${sectionTitle('🎯','Visual SpPin × SnNout', 'var(--c-amber)')}
  <div class="dist-wrap">${PrevSVG.snnoutSpinDual()}</div>

  ${didaxBlock('caso','🩺','Situação-problema: o paciente com nódulo pulmonar',
    `<p>Paciente com nódulo pulmonar suspeito na TC. Antes de operar, exige-se <strong>biópsia com histopatológico</strong>. A imagem sozinha tem boa sensibilidade — encontra muitos nódulos — mas especificidade limitada (nem todo nódulo é câncer). Operar baseado só em imagem geraria toracotomias em pacientes com inflamação ou nódulo benigno.</p>
    <p><strong>Lição:</strong> antes de tratamento agressivo, sempre exija teste com alta especificidade. Confirmar > rastrear, nesse ponto da cascata.</p>`)}

  ${didaxBlock('importa','💡','Por que isso importa na prática?',
    `<p>Sempre que a conduta seguinte é <strong>cirúrgica, quimioterápica, ou potencialmente iatrogênica</strong>, a especificidade do teste-âncora precisa ser alta. Tratar falso positivo nesse contexto é dano grave.</p>`)}

  ${bancaCallout(`<p>A banca cobra a associação <strong>especificidade → confirmação</strong>. Frase âncora: <strong>"teste específico, positivo confirma"</strong>. Exemplos clássicos: histopatológico, cultura, biópsia. Cenários: cirurgia, oncologia, transplante.</p>`)}

  ${didaxBlock('pegadinha','⚠️','Pegadinha de prova',
    `<p>Dizer que "teste específico serve para excluir doença". <strong>Errado.</strong> Teste específico serve para <em>confirmar</em> doença quando dá positivo. Para excluir, precisamos de sensibilidade.</p>`)}

  ${didaxBlock('naoconfunda','🔀','Não confunda',
    `<p>Especificidade ≠ valor preditivo positivo. Especificidade é propriedade do teste; VPP depende de prevalência. Em doença rara, mesmo teste muito específico tem VPP baixo — veremos isso no Módulo 2.</p>`)}

  ${didaxBlock('errocomum','❌','Erro comum',
    `<p>Dividir VN pelo total geral. <strong>Errado.</strong> O denominador da especificidade é apenas a coluna dos sadios: <strong>FP + VN</strong>.</p>`)}

  ${didaxBlock('avancado','⚡','O que diferencia o aluno avançado',
    `<p>O avançado nunca propõe tratamento agressivo sem confirmar com teste de alta especificidade. E sabe que, mesmo com especificidade alta, doença rara reduz o VPP — uma armadilha que será desmontada no Módulo 2.</p>`)}

  ${formulaBox('Especificidade',
    `${frac('VN','FP + VN')} = ${frac('verdadeiros negativos','total de sadios')}`,
    'O denominador é apenas a coluna dos sadios.')}

  ${didaxBlock('numerico','🔢','Exemplo numérico preservado — infertilidade masculina',
    `<ul class="tight">
      <li>200 sadios no estudo.</li>
      <li>VN = <strong>176</strong>, FP = <strong>24</strong>.</li>
      <li>Especificidade = 176 / 200 = <strong>88%</strong>.</li>
      <li>Interpretação: o teste classifica corretamente como negativo 88 a cada 100 sadios. Em 12 a cada 100 ele erra para mais (FP).</li>
    </ul>`)}

  ${revisaoAtiva([
    { q: 'Qual a fórmula da especificidade?', a: 'VN / (FP + VN). Apenas a coluna dos sadios entra no cálculo.' },
    { q: 'Por que especificidade alta dá confiança no positivo?', a: 'Porque FP baixo: se quase nenhum sadio sai positivo, um positivo é, com alta probabilidade, um doente.' },
    { q: 'Cite cenários que pedem teste específico.', a: 'Confirmação antes de cirurgia oncológica, antes de quimioterapia, antes de transplante, e qualquer tratamento agressivo cujo dano da iatrogenia seja grande.' }
  ])}

  ${pageFooterMeta({
    resumo: 'Especificidade = VN / (FP + VN). Mora na coluna dos sadios, não muda com prevalência, dá confiança ao resultado positivo. SpPin: teste específico, positivo confirma.',
    proximaConexao: 'Se sensibilidade combinada em paralelo aumenta exclusão, especificidade combinada em série aumenta confirmação. Próxima parada.',
    nextId: 'm1-10'
  })}
  `;
  renderStandard(container, page, body);
};

/* ─────────────────────────────────────────
   PÁGINA 10 — Testes em série
───────────────────────────────────────── */
GO_RENDER['m1-10'] = function(container, page) {
  const body = `
  ${pageHero({
    module: 'm1', moduleLabel: 'Módulo 1 — Validação de Testes', pageNum: 10,
    title: 'Testes em série: somando especificidade para confirmar doença',
    lead: 'Quando os testes correm em sequência — só seguimos enquanto todos vêm positivos.',
    grad: 'var(--grad-m1)'
  })}

  ${conceptHero({
    question: 'Pergunta central',
    title: 'Como combinar testes para reduzir falsos positivos e ter confiança suficiente para tratar?',
    lead: 'Em série, o segundo teste só roda se o primeiro for positivo. Para confirmar, todos precisam ser positivos.',
    glow: 'rgba(139,92,246,.22)'
  })}

  ${keyTerms(['testes em série','especificidade somada','Seu Antônio','emagrecimento','anemia ferropriva','colonoscopia','histopatológico','confirmação'])}

  <div class="prose">
    <p>Testes em série são feitos <strong>em sequência</strong>: o segundo teste só é solicitado se o primeiro for positivo. Para considerar o conjunto positivo, <strong>todos</strong> os testes precisam ser positivos. Basta um negativo para encerrar a cadeia.</p>

    <p>Por isso, série <strong>aumenta a especificidade</strong> do conjunto — porque é mais difícil que um sadio dê positivo em <em>todos</em> os testes sequenciais. Os FP do primeiro teste são filtrados pelo segundo; os do segundo, pelo terceiro.</p>

    <p class="pulled">A consequência: série <strong>aumenta também os falsos negativos</strong>, e por isso é estratégia de <em>confirmação</em>, não de rastreamento. O preço de não tratar um sadio é aceitar que algum doente seja perdido pelo caminho.</p>

    <p>Caso clínico clássico: <strong>Seu Antônio, 71 anos</strong>, chega ao consultório com emagrecimento e anemia. O médico pede sangue oculto nas fezes (rastreamento, alta sensibilidade) — vem positivo. Indica <strong>colonoscopia</strong> — encontra lesão suspeita. Faz <strong>biópsia com histopatológico</strong> — confirma adenocarcinoma. Só agora é seguro indicar cirurgia.</p>

    <p>Essa cadeia em série existe porque ninguém leva um paciente ao centro cirúrgico baseado em sangue oculto positivo. Cada etapa filtra falsos positivos da anterior, e a especificidade do conjunto chega perto de 100%.</p>
  </div>

  ${sectionTitle('🔀','Paralelo × Série — comparação visual', 'var(--c-amber)')}
  <div class="dist-wrap">${PrevSVG.paraleloSerie()}</div>

  ${sectionTitle('🩺','Linha do tempo de Seu Antônio', 'var(--c-violet)')}
  <div class="case-card">
    <p><strong>Etapa 1 —</strong> Consulta inicial: anamnese revela emagrecimento + anemia microcítica. Probabilidade pré-teste de neoplasia colorretal sobe.</p>
    <p><strong>Etapa 2 —</strong> Sangue oculto nas fezes (alta sensibilidade): <span style="color:var(--c-green); font-weight:700;">positivo</span>. Não confirma nada, mas autoriza colonoscopia.</p>
    <p><strong>Etapa 3 —</strong> Colonoscopia (visualização direta): lesão vegetante em sigmoide. <span style="color:var(--c-green); font-weight:700;">positivo morfológico</span>. Ainda não tratamos.</p>
    <p><strong>Etapa 4 —</strong> Biópsia + histopatológico (alta especificidade): <span style="color:var(--c-red); font-weight:700;">adenocarcinoma confirmado</span>. Agora a cirurgia oncológica é segura.</p>
    <p style="margin-top: 12px; color: var(--text-muted);">Note que cada etapa <em>só roda se a anterior foi positiva</em>. Um único negativo em qualquer ponto encerra a cadeia — eis a série.</p>
  </div>

  ${didaxBlock('caso','🩺','Situação-problema: rastreamento de HIV em doador de sangue',
    `<p>Um doador tem teste rápido de HIV positivo. <strong>Ninguém comunica diagnóstico ainda.</strong> O sistema faz, em série: ELISA → Western blot → carga viral. Só após positivos em todos os testes específicos o diagnóstico é firmado.</p>
    <p><strong>Lição:</strong> diagnóstico de doença com forte impacto social/psicológico exige cadeia em série de testes cada vez mais específicos.</p>`)}

  ${didaxBlock('importa','💡','Por que isso importa na prática?',
    `<p>Sempre que a próxima conduta é agressiva (cirurgia, quimioterapia, anúncio de doença grave), <strong>some testes em série</strong>. Cada teste adicional aumenta a especificidade combinada e reduz o risco de tratar um sadio.</p>`)}

  ${bancaCallout(`<p>A banca cobra <strong>série → especificidade → confirmação</strong>. Frase âncora: <strong>"série aumenta especificidade"</strong>. Pegadinhas clássicas invertem com paralelo.</p>`)}

  ${didaxBlock('pegadinha','⚠️','Pegadinha de prova',
    `<p>Dizer que "testes em série aumentam sensibilidade". <strong>Errado.</strong> Série aumenta especificidade. Quem aumenta sensibilidade é paralelo.</p>`)}

  ${didaxBlock('naoconfunda','🔀','Não confunda',
    `<p>Repetição do mesmo teste ≠ testes em série. Série usa testes <em>diferentes e cada vez mais específicos</em>. Repetir o mesmo teste não filtra FP — apenas confirma o resultado do primeiro.</p>`)}

  ${didaxBlock('errocomum','❌','Erro comum',
    `<p>Aplicar série em rastreamento populacional. Em rastreamento, cada etapa adicional reduz adesão e aumenta FN — perdemos doentes que abandonam o caminho. Série é para confirmação, não para captura.</p>`)}

  ${didaxBlock('avancado','⚡','O que diferencia o aluno avançado',
    `<p>O avançado planeja a cascata: testes sensíveis na linha de frente (para não perder doente), testes específicos no fim (para não tratar sadio). Sabe que paralelo na entrada e série na saída é a arquitetura padrão dos programas bem desenhados.</p>`)}

  ${didaxBlock('numerico','🔢','Exemplo numérico — série em rastreamento de câncer colorretal',
    `<ul class="tight">
      <li>Sangue oculto: especificidade 70%.</li>
      <li>Colonoscopia: especificidade 95%.</li>
      <li>Histopatológico: especificidade 99%.</li>
      <li>Em série (todos positivos), especificidade combinada ≈ 0,70 × 0,95 × 0,99 = <strong>~99,8%</strong>.</li>
      <li>O preço: alguns doentes abandonam a cadeia ou caem em FN em alguma etapa.</li>
    </ul>`)}

  ${revisaoAtiva([
    { q: 'Testes em série aumentam o quê?', a: 'Especificidade do conjunto. Como efeito colateral, aumentam falsos negativos.' },
    { q: 'Qual a regra operacional da série?', a: 'Os testes correm em sequência. O próximo só é feito se o anterior foi positivo. Para considerar positivo, todos precisam ser positivos.' },
    { q: 'Em que cenário série é justificado?', a: 'Antes de cirurgia, quimioterapia, transplante, ou anúncio de doença com forte impacto social (HIV). Tudo o que tenha custo alto de iatrogenia.' }
  ])}

  ${pageFooterMeta({
    resumo: 'Testes em série aumentam a especificidade do conjunto: todos precisam ser positivos. Estratégia de confirmação, paga o preço em FN. Paralelo no rastreamento, série na confirmação.',
    proximaConexao: 'Falta entender por que sensibilidade e especificidade são chamadas de "propriedades do teste" — elas não mudam com a prevalência. Próxima parada.',
    nextId: 'm1-11'
  })}
  `;
  renderStandard(container, page, body);
};

/* ─────────────────────────────────────────
   PÁGINA 11 — Sens/Esp não mudam com prevalência
───────────────────────────────────────── */
GO_RENDER['m1-11'] = function(container, page) {
  const body = `
  ${pageHero({
    module: 'm1', moduleLabel: 'Módulo 1 — Validação de Testes', pageNum: 11,
    title: 'Sensibilidade, especificidade e prevalência: o que muda e o que não muda',
    lead: 'Belém, Manaus, Orlando, Nova York, Lisboa — o teste é o mesmo. Suas propriedades também.',
    grad: 'var(--grad-m1)'
  })}

  ${conceptHero({
    question: 'Pergunta central',
    title: 'Se a prevalência de uma doença varia entre cidades, a sensibilidade do teste muda também?',
    lead: 'Não. Sensibilidade e especificidade são propriedades intrínsecas do teste. Quem muda com prevalência são os valores preditivos — assunto do Módulo 2.',
    glow: 'rgba(20,184,166,.22)'
  })}

  ${keyTerms(['prevalência','propriedade do teste','Belém','Manaus','Orlando','Nova York','Lisboa','hanseníase','INEP','invariância'])}

  <div class="prose">
    <p>Uma armadilha frequente em prova é sugerir que, quando uma doença é mais prevalente em uma região, o teste "fica mais sensível" ou "menos sensível" naquela região. <strong>Isso é falso.</strong></p>

    <p>Sensibilidade e especificidade são <strong>propriedades intrínsecas do teste</strong>: dependem da química, da física, da biologia do exame — e da definição do ponto de corte. Não dependem de quantas pessoas têm a doença na população.</p>

    <p class="pulled">Pense assim: um termômetro mede temperatura igual em Manaus e em Lisboa. O fato de Manaus ter mais pessoas com febre não muda a precisão do termômetro. O mesmo vale para qualquer teste diagnóstico.</p>

    <p>O que <strong>muda</strong> com a prevalência são os <strong>valores preditivos</strong>: VPP (probabilidade de doença dado teste positivo) e VPN (probabilidade de ausência de doença dado teste negativo). Esses são os personagens centrais do Módulo 2.</p>

    <p>Em hanseníase, por exemplo: a sensibilidade do teste é a mesma em Belém (alta prevalência) e em Lisboa (baixa prevalência). Mas o significado de um teste positivo é diferente: em Belém, a probabilidade pós-teste é alta; em Lisboa, é baixa — a maioria dos positivos será FP justamente porque a doença é rara.</p>
  </div>

  ${sectionTitle('🌍','Simulador interativo — prevalência muda, Se/Esp ficam fixas', 'var(--c-teal)')}
  <p style="color:var(--text-muted); margin-bottom: 12px;">Mova o slider. Sensibilidade fixa em 90%, especificidade fixa em 95%. Veja: nada muda nessas duas — mas espere até o Módulo 2 para ver o que muda nos valores preditivos.</p>
  ${PrevInt.simPrevalencia({ sens: 0.90, esp: 0.95, prev: 0.10 })}

  ${didaxBlock('caso','🩺','Situação-problema: questão INEP — hanseníase',
    `<p>Em uma UBS, aplicaram um teste para hanseníase em 200 pessoas: 100 sabidamente acometidas e 100 sabidamente não acometidas. Resultado: <strong>98 verdadeiros positivos</strong> entre os doentes e <strong>90 verdadeiros negativos</strong> entre os sadios.</p>
    <p><strong>Cálculo:</strong></p>
    <ul class="tight">
      <li>Sensibilidade = 98 / 100 = <strong>98%</strong>.</li>
      <li>Especificidade = 90 / 100 = <strong>90%</strong>.</li>
    </ul>
    <p>Esses valores valem em qualquer cidade onde o teste seja aplicado — Belém, Manaus, Orlando, Nova York ou Lisboa. Não importa a prevalência local.</p>`)}

  ${didaxBlock('importa','💡','Por que isso importa na prática?',
    `<p>Confundir "propriedade do teste" com "propriedade da população" é fonte de erro grave em prova. A banca explora isso o tempo todo. Fixe: <strong>Se/Esp/RV não mudam com prevalência.</strong></p>`)}

  ${bancaCallout(`<p>A banca quer que você marque, sem hesitar: <strong>em população de alta prevalência, sensibilidade e especificidade NÃO mudam.</strong> O que muda são os valores preditivos. Essa é uma das pegadinhas mais frequentes em provas de residência.</p>`)}

  ${didaxBlock('pegadinha','⚠️','Pegadinha de prova',
    `<p>Perguntar: "em região de alta prevalência, o que acontece com sensibilidade?" Resposta correta: <strong>não muda.</strong> Marque sem dúvida. Quem muda é VPP/VPN.</p>`)}

  ${didaxBlock('naoconfunda','🔀','Não confunda',
    `<p>Não confunda <strong>sensibilidade/especificidade</strong> (propriedades do teste, fixas) com <strong>valores preditivos</strong> (propriedades do teste + população, variáveis). VPP/VPN são tema do Módulo 2.</p>`)}

  ${didaxBlock('errocomum','❌','Erro comum',
    `<p>Achar que mais doentes na população "aumenta a sensibilidade". <strong>Errado.</strong> A sensibilidade é calculada apenas entre os doentes — não importa quantos doentes existam na população, a proporção VP/(VP+FN) não muda.</p>`)}

  ${didaxBlock('avancado','⚡','O que diferencia o aluno avançado',
    `<p>O avançado separa, mentalmente, dois mundos: <em>propriedades do teste</em> (Se/Esp/RV) versus <em>propriedades da população</em> (prevalência). Os valores preditivos são o cruzamento dos dois.</p>`)}

  ${didaxBlock('numerico','🔢','Exemplo numérico preservado — hanseníase INEP',
    `<ul class="tight">
      <li>100 acometidos, VP = 98 → Sensibilidade = <strong>98%</strong>.</li>
      <li>100 não acometidos, VN = 90 → Especificidade = <strong>90%</strong>.</li>
      <li>Esses valores se mantêm em Belém, Manaus, Orlando, Nova York e Lisboa.</li>
    </ul>`)}

  ${revisaoAtiva([
    { q: 'Sensibilidade muda com prevalência?', a: 'Não. É propriedade do teste.' },
    { q: 'Especificidade muda com prevalência?', a: 'Não. É propriedade do teste.' },
    { q: 'Para que servem sensibilidade e especificidade na escolha do exame?', a: 'Para escolher entre testes na mesma população (qual exclui melhor, qual confirma melhor) — sem depender da prevalência local.' }
  ])}

  ${pageFooterMeta({
    resumo: 'Sensibilidade e especificidade são propriedades intrínsecas do teste — não mudam com prevalência. Valores preditivos (VPP/VPN) sim mudam, e serão o coração do Módulo 2.',
    proximaConexao: 'Falta uma métrica que cruze sensibilidade e especificidade em uma única medida elegante: a razão de verossimilhança.',
    nextId: 'm1-12'
  })}
  `;
  renderStandard(container, page, body);
};

/* ─────────────────────────────────────────
   PÁGINA 12 — Razões de verossimilhança
───────────────────────────────────────── */
GO_RENDER['m1-12'] = function(container, page) {
  const body = `
  ${pageHero({
    module: 'm1', moduleLabel: 'Módulo 1 — Validação de Testes', pageNum: 12,
    title: 'Razões de verossimilhança: cruzando sensibilidade e especificidade',
    lead: 'A única métrica que mede o teste como um todo — útil quando vários testes competem.',
    grad: 'var(--grad-m1)'
  })}

  ${conceptHero({
    question: 'Pergunta central',
    title: 'Como avaliar um teste quando sensibilidade e especificidade precisam ser consideradas JUNTAS?',
    lead: 'Um teste com sensibilidade 100% e especificidade 0% dá positivo em todo mundo — inútil. A razão de verossimilhança nos protege dessa armadilha.',
    glow: 'rgba(139,92,246,.22)'
  })}

  ${keyTerms(['razão de verossimilhança','RV+','RV−','SE','probabilidade em doentes','probabilidade em não doentes','favorecer','afastar'])}

  <div class="prose">
    <p>Sensibilidade e especificidade não devem ser avaliadas sempre de forma isolada. Um teste pode impressionar com sensibilidade de 100%, mas ser inútil se sua especificidade for 0%. Nesse cenário, <strong>todos os testes seriam positivos</strong>: todos os doentes detectados, mas todos os sadios também transformados em falsos positivos.</p>

    <p>Para cruzar sensibilidade e especificidade em uma única medida, usamos as <span class="keyword">razões de verossimilhança</span>. A ideia é comparar a probabilidade de um resultado em doentes com a probabilidade do mesmo resultado em não doentes.</p>

    <p class="pulled">A razão de verossimilhança positiva (RV+) pergunta: <em>quanto mais provável é um teste positivo em quem tem doença do que em quem não tem?</em> Por isso, quanto maior a RV+, melhor para favorecer diagnóstico.</p>

    <p>A razão de verossimilhança negativa (RV−) pergunta: <em>quanto ainda aparece teste negativo em quem tem doença em comparação com quem não tem?</em> Por isso, quanto menor a RV−, melhor para afastar diagnóstico.</p>

    <p>A frase de fixação é: <strong>razão de verossimilhança SE</strong> — porque a <em>S</em>ensibilidade fica em cima e a <em>E</em>specificidade entra embaixo (diretamente ou por complemento).</p>
  </div>

  ${sectionTitle('🧮','Calculadora interativa de RV+ e RV−', 'var(--c-violet)')}
  <p style="color:var(--text-muted); margin-bottom: 12px;">Mova VP, FP, FN, VN. A tabela calcula sensibilidade, especificidade, RV+ e RV− em tempo real. Compare cenários e veja a RV+ se aproximar de 1 quando o teste perde utilidade.</p>
  ${PrevInt.tabela2x2({ vp: 90, fp: 10, fn: 10, vn: 90, lockPrev: false, title: 'Calculadora de razões de verossimilhança' })}

  ${didaxBlock('caso','🩺','Situação-problema: o teste milagroso',
    `<p>Um representante apresenta um teste novo: "sensibilidade de 100%, doutor!". Antes de comprar, o hospital pergunta: <strong>qual é a especificidade?</strong> O representante hesita: "5%". Você calcula: RV+ = 1,0 / (1 − 0,05) ≈ 1,05. <strong>Não ajuda em nada</strong> — a probabilidade de positivo é praticamente igual em doentes e em sadios.</p>
    <p><strong>Lição:</strong> nunca confie em sensibilidade isolada. RV+ próxima de 1 = teste inútil.</p>`)}

  ${didaxBlock('importa','💡','Por que isso importa na prática?',
    `<p>Quando vários testes competem por adoção em um serviço, a RV é o critério mais elegante de comparação. Ela resume sensibilidade e especificidade em um único número interpretável.</p>`)}

  ${bancaCallout(`<p>A banca cobra a <strong>direção ideal</strong>: RV+ alta para favorecer, RV− baixa (próxima de zero) para afastar. Pegadinha clássica: "RV− ideal é alta". <strong>Errado</strong> — RV− boa é baixa.</p>`)}

  ${didaxBlock('pegadinha','⚠️','Pegadinha de prova',
    `<p>Dar sensibilidade alta isolada e esconder especificidade muito baixa. Sempre cruze. <strong>Sensibilidade 100% + especificidade 0% = teste inútil.</strong></p>`)}

  ${didaxBlock('naoconfunda','🔀','Não confunda',
    `<p>RV+ alta favorece diagnóstico. RV− <strong>baixa</strong> afasta diagnóstico. Quem cair na pegadinha "RV− alta é bom" perde a questão.</p>`)}

  ${didaxBlock('errocomum','❌','Erro comum',
    `<p>Achar que RV− deve ser alta. <strong>Errado.</strong> RV− ideal é próxima de zero. RV− = 1 significa que o teste negativo é tão comum em doentes quanto em sadios — inútil para afastar.</p>`)}

  ${didaxBlock('avancado','⚡','O que diferencia o aluno avançado',
    `<p>O avançado percebe que RV mede o encontro entre sensibilidade e especificidade, sendo mais útil quando vários testes competem. E sabe que RV é a ponte para o raciocínio bayesiano: pré-teste × RV → pós-teste (próximo módulo).</p>`)}

  ${formulaBox('Razão de verossimilhança positiva (RV+)',
    `${frac('Sensibilidade','1 − Especificidade')} = ${frac('VP / (VP + FN)','FP / (FP + VN)')}`,
    'Quanto maior, melhor para favorecer diagnóstico. RV+ > 10 é forte; RV+ = 1 é inútil.')}

  ${formulaBox('Razão de verossimilhança negativa (RV−)',
    `${frac('1 − Sensibilidade','Especificidade')} = ${frac('FN / (VP + FN)','VN / (FP + VN)')}`,
    'Quanto menor (próxima de zero), melhor para afastar diagnóstico. RV− < 0,1 é forte; RV− = 1 é inútil.')}

  ${didaxBlock('numerico','🔢','Exemplo numérico — sensibilidade 90%, especificidade 10%',
    `<ul class="tight">
      <li>Sensibilidade = 90% (0,90).</li>
      <li>Especificidade = 10% (0,10).</li>
      <li>RV+ = 0,90 / (1 − 0,10) = 0,90 / 0,90 = <strong>1</strong>.</li>
      <li>Interpretação: RV+ = 1 não ajuda, porque a probabilidade de teste positivo em doentes é igual à probabilidade em não doentes. Apesar da sensibilidade parecer boa, o teste não distingue grupos.</li>
    </ul>`)}

  ${revisaoAtiva([
    { q: 'RV+ ideal é alta ou baixa?', a: 'Alta. Quanto maior, mais o teste positivo favorece o diagnóstico.' },
    { q: 'RV− ideal é alta ou baixa?', a: 'Baixa, próxima de zero. Quanto menor, mais o teste negativo afasta o diagnóstico.' },
    { q: 'Razões de verossimilhança mudam com prevalência?', a: 'Não. Como dependem apenas de Se/Esp (propriedades do teste), também são fixas em diferentes populações.' }
  ])}

  ${pageFooterMeta({
    resumo: 'RV+ alta favorece diagnóstico; RV− baixa afasta diagnóstico. Razão de verossimilhança SE: sensibilidade em cima, especificidade embaixo. Não muda com prevalência.',
    proximaConexao: 'Hora de consolidar tudo em um painel de prova: como reconhecer, em segundos, o que a questão está pedindo.',
    nextId: 'm1-13'
  })}
  `;
  renderStandard(container, page, body);
};

/* ─────────────────────────────────────────
   PÁGINA 13 — Fechamento de prova
───────────────────────────────────────── */
GO_RENDER['m1-13'] = function(container, page) {
  const body = `
  ${pageHero({
    module: 'm1', moduleLabel: 'Módulo 1 — Validação de Testes', pageNum: 13,
    title: 'Fechamento de prova: como escolher o raciocínio certo em segundos',
    lead: 'O painel final do Módulo 1 — gatilhos de enunciado, frases-âncora e o quiz que treina reconhecimento.',
    grad: 'var(--grad-m1)'
  })}

  ${jornadaBar({
    from: null,
    current: { module: 'm1', label: 'Validação de Testes (fechamento)' },
    next: { module: 'm2', label: 'Valores Preditivos' }
  })}

  ${conceptHero({
    question: 'Pergunta central',
    title: 'Como reconhecer rapidamente o que a questão está pedindo — sem perder tempo montando tabela quando o enunciado já entrega o cálculo?',
    lead: 'O aluno avançado lê dois sinais: a palavra-gatilho do enunciado e a finalidade clínica do raciocínio (excluir, confirmar, calcular, comparar).',
    glow: 'rgba(245,158,11,.22)'
  })}

  ${keyTerms(['gatilhos de prova','INEP','UFCSPA','UNIFESP','USP-SP','palavras-âncora','reflexo abdominojugular','insuficiência cardíaca','raciocínio rápido'])}

  <div class="prose">
    <p>Na prova, o primeiro passo é <strong>reconhecer o tipo de pergunta</strong>. Se o enunciado fala "dentre os doentes, quantos testaram positivo?", ele está praticamente gritando <strong>sensibilidade</strong>. Se fala "dentre os não doentes, quantos testaram negativo?", está gritando <strong>especificidade</strong>.</p>

    <p>Se a questão fala em <strong>rastreamento</strong>, banco de sangue, câncer, epidemia ou alta letalidade, o raciocínio é <em>evitar falso negativo</em>. Pense em sensibilidade ou testes em paralelo. Se tudo vier negativo, a confiança para excluir aumenta.</p>

    <p>Se a questão fala em <strong>confirmação</strong>, câncer, histopatológico, cirurgia, quimioterapia, trauma psicológico ou iatrogenia, o raciocínio é <em>evitar falso positivo</em>. Pense em especificidade ou testes em série.</p>

    <p class="pulled">Se a questão fala em um <strong>achado clínico que favorece a possibilidade de uma doença</strong>, compare a probabilidade desse achado em doentes versus não doentes. Isso aponta para <em>razão de verossimilhança positiva</em>.</p>

    <p>Exemplo citado: a questão da USP-SP sobre insuficiência cardíaca, em que o achado com maior RV+ era o <strong>reflexo abdominojugular</strong>. Não era o sinal mais sensível — era o que mais distinguia doentes de sadios.</p>
  </div>

  ${sectionTitle('📋','Painel de frases-âncora — fixe antes da prova', 'var(--c-amber)')}
  <div class="case-card">
    <ul class="tight">
      <li><strong>Acurácia:</strong> quanto o teste acerta no total.</li>
      <li><strong>Sensibilidade:</strong> positivo entre doentes; confio no negativo (SnNout).</li>
      <li><strong>Especificidade:</strong> negativo entre sadios; confio no positivo (SpPin).</li>
      <li><strong>Paralelo:</strong> aumenta sensibilidade → exclusão.</li>
      <li><strong>Série:</strong> aumenta especificidade → confirmação.</li>
      <li><strong>RV+:</strong> quanto maior, melhor para favorecer diagnóstico.</li>
      <li><strong>RV−:</strong> quanto menor, melhor para afastar diagnóstico.</li>
      <li><strong>Se/Esp/RV:</strong> NÃO mudam com prevalência.</li>
    </ul>
  </div>

  ${sectionTitle('🎯','Quiz banca-style — qual raciocínio a banca quer?', 'var(--c-violet)')}
  ${PrevInt.quizBanca([
    {
      stem: 'Em banco de sangue, qual característica do teste é prioritária?',
      options: ['Sensibilidade alta','Especificidade alta','Acurácia alta','RV+ próxima de 1'],
      correct: 0,
      explain: 'Banco de sangue exige sensibilidade altíssima — falso negativo (bolsa contaminada transfundida) é catastrófico. Aceita-se FP em troca.'
    },
    {
      stem: 'Antes de cirurgia oncológica, qual exame é a âncora?',
      options: ['Imagem com alta sensibilidade','Histopatológico com alta especificidade','Teste rápido em série','Marcador tumoral isolado'],
      correct: 1,
      explain: 'Antes de cirurgia, tratamento agressivo, exige-se especificidade alta. O histopatológico confirma. SpPin: teste específico, positivo confirma.'
    },
    {
      stem: 'Testes em paralelo aumentam:',
      options: ['Especificidade','Sensibilidade','Acurácia somente','VPP'],
      correct: 1,
      explain: 'Paralelo aumenta sensibilidade do conjunto (basta um positivo). Estratégia de exclusão. Quem aumenta especificidade é série.'
    },
    {
      stem: 'Um achado clínico que favorece a possibilidade de uma doença aponta para qual métrica?',
      options: ['VPN alto','RV+ alta','Sensibilidade isolada','Acurácia'],
      correct: 1,
      explain: 'Quando o achado favorece o diagnóstico, queremos RV+ alta (probabilidade do achado em doentes muito maior que em sadios). Exemplo: reflexo abdominojugular em ICC.'
    },
    {
      stem: 'Em região de alta prevalência, a sensibilidade do teste:',
      options: ['Aumenta','Diminui','Não muda','Depende do ponto de corte local'],
      correct: 2,
      explain: 'Sensibilidade não muda com prevalência. É propriedade do teste. Quem muda com prevalência são VPP e VPN — assunto do Módulo 2.'
    }
  ], 'Quiz integrador — Módulo 1')}

  ${didaxBlock('caso','🩺','Questão de prova preservada — paralelo × série',
    `<p>A questão apresenta três afirmações:</p>
    <ol class="tight">
      <li>"Testes em paralelo aumentam especificidade."</li>
      <li>"Testes em paralelo aumentam falso negativo."</li>
      <li>"Testes em série maximizam especificidade e valor preditivo positivo."</li>
    </ol>
    <p><strong>Correta: apenas a 3.</strong> Paralelo aumenta sensibilidade (não especificidade); paralelo reduz FN (porque aumenta sensibilidade); série maximiza especificidade e, em populações com prevalência adequada, eleva VPP.</p>`)}

  ${didaxBlock('importa','💡','Por que isso importa na prática?',
    `<p>Prova de residência cobra tanto cálculo quanto leitura rápida de intenção do enunciado. Quem reconhece o objetivo em 5 segundos ganha tempo para as questões pesadas.</p>`)}

  ${bancaCallout(`<p>A banca quer que o aluno identifique o alvo: <strong>excluir, confirmar, calcular ou comparar</strong>. Cada alvo aponta para uma métrica. Decorar fórmulas sem reconhecer o alvo é receita para perder a questão.</p>`)}

  ${didaxBlock('pegadinha','⚠️','Pegadinhas finais do Módulo 1',
    `<ul class="tight">
      <li>Inverter paralelo e série.</li>
      <li>Inverter sensibilidade e especificidade.</li>
      <li>Achar que prevalência muda Se/Esp.</li>
      <li>Achar que RV− deve ser alta.</li>
      <li>Confundir RV+ com VPP (este é o ponto de entrada do Módulo 2).</li>
    </ul>`)}

  ${didaxBlock('naoconfunda','🔀','Não confunda',
    `<p>Paralelo ≠ série. Sensível ≠ específico. RV+ alta ≠ RV− alta. Sensibilidade ≠ VPP. Especificidade ≠ VPN.</p>`)}

  ${didaxBlock('errocomum','❌','Erro comum',
    `<p>Tentar resolver todas as questões montando tabela completa, mesmo quando o enunciado já entrega o numerador e denominador. <strong>Pare, leia, identifique a métrica pedida.</strong> Só monte tabela quando os dados estão dispersos.</p>`)}

  ${didaxBlock('avancado','⚡','O que diferencia o aluno avançado',
    `<p>O aluno avançado sabe quando montar a tabela inteira e quando usar apenas a coluna necessária. Reconhece palavras-gatilho. Cruza Se/Esp para tirar RV. E nunca confunde propriedade do teste com propriedade da população.</p>`)}

  ${didaxBlock('numerico','🔢','Painel de fórmulas finais — Módulo 1',
    `<ul class="tight">
      <li><strong>Acurácia</strong> = (VP + VN) / total</li>
      <li><strong>Sensibilidade</strong> = VP / (VP + FN)</li>
      <li><strong>Especificidade</strong> = VN / (FP + VN)</li>
      <li><strong>RV+</strong> = Sensibilidade / (1 − Especificidade)</li>
      <li><strong>RV−</strong> = (1 − Sensibilidade) / Especificidade</li>
    </ul>
    <p style="margin-top: 10px;"><strong>Exemplo numérico preservado — Hanseníase:</strong> 98 VP em 100 doentes → Se = 98%. 90 VN em 100 sadios → Esp = 90%.</p>
    <p><strong>Exemplo numérico preservado — infertilidade:</strong> 182/200 → Se = 91%; 176/200 → Esp = 88%; (182+176)/400 = 89,5% ≈ <strong>90% de acurácia</strong>.</p>`)}

  ${revisaoAtiva([
    { q: 'Rastreamento lembra qual característica?', a: 'Sensibilidade. Em rastreamento, queremos não perder doente — sensibilidade alta, testes em paralelo, SnNout.' },
    { q: 'Histopatológico antes de cirurgia lembra qual característica?', a: 'Especificidade. Antes de tratamento agressivo, queremos não tratar sadio — especificidade alta, testes em série, SpPin.' },
    { q: 'Achado clínico que favorece doença aponta para RV+ ou RV−?', a: 'RV+. Probabilidade do achado em doentes muito maior que em sadios. Exemplo: reflexo abdominojugular em insuficiência cardíaca.' }
  ])}

  ${pontoDeCostura({
    fromModule: 'm1', toModule: 'm2',
    fromTitle: 'Módulo 1 — Validação de testes',
    toTitle: 'Módulo 2 — Valores Preditivos',
    ponte: `<p>Você fechou o Módulo 1 sabendo escolher um teste. Mas há um momento que ainda não enfrentamos: <strong>o paciente volta com o resultado em mãos</strong>. A pergunta deixa de ser "qual teste eu peço?" e vira <em>"quanto eu acredito nesse resultado?"</em>.</p>
    <p>Esse é o território dos <strong>valores preditivos</strong> — e a prevalência da população onde o teste é aplicado vai mudar tudo. Sens, Esp e RV são propriedades do teste; VPP e VPN são propriedades do <em>paciente em seu contexto</em>.</p>`,
    links: [
      { module: 'm2', pageId: 'm2-01', variant: 'bridge',
        label: 'Avançar para Módulo 2 — O segundo tempo do exame',
        hint: 'Começa pela diferença entre "antes do teste" e "depois do teste".' }
    ]
  })}

  ${pageFooterMeta({
    resumo: 'Reconheça o alvo (excluir/confirmar/calcular/comparar), identifique a palavra-gatilho do enunciado, escolha a métrica e o desenho (paralelo/série). Se/Esp/RV não mudam com prevalência — VPP/VPN sim, e isso abre o Módulo 2.',
    proximaConexao: 'Encerramos o Módulo 1. O próximo passo natural é entender o que a prevalência faz com a interpretação clínica de um resultado — bem-vindo aos valores preditivos.',
    nextId: 'm2-01'
  })}
  `;
  renderStandard(container, page, body);
};
