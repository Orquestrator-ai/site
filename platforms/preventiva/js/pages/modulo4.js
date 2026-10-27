/* =========================================
   MÓDULO 4 — TENDÊNCIA CENTRAL E DISPERSÃO
   9 páginas (m4-01 a m4-09).
   Personalidade didática: "parece Matemática, mas cai em prova".
   Aprendemos a resumir muitos números em poucos e a medir o quanto
   esses números se espalham — separar centro de espalhamento é o
   eixo da banca.
   ========================================= */

const M4_MOD = 'm4';
const M4_LABEL = 'Módulo 4 — Tendência Central e Dispersão';
const M4_GRAD = 'var(--grad-m4)';

/* ─────────────────────────────────────────
   M4-01 — Por que tendência central cai em Medicina?
───────────────────────────────────────── */
GO_RENDER['m4-01'] = function(c, p) {
  const body =
    pageHero({
      module: M4_MOD, moduleLabel: M4_LABEL, pageNum: '01',
      title: 'Por que tendência central cai em Medicina?',
      lead: 'Isso poderia estar em Matemática, Engenharia ou Arquitetura — mas está aqui. A residência exige que você resuma populações em um número e tome decisão clínica sobre ele.',
      grad: M4_GRAD
    }) +

    jornadaBar({
      from: { module: 'm3', label: 'Curva ROC — comparar testes pela área' },
      current: { module: 'm4', label: 'Tendência Central e Dispersão' },
      next: null
    }) +

    pontoDeCostura({
      fromModule: 'm3', toModule: 'm4',
      fromTitle: 'Módulo 3 — testes diagnósticos',
      toTitle: 'Módulo 4 — estatística descritiva',
      ponte: `<p>Nos Módulos 1, 2 e 3 você aprendeu a <strong>avaliar um teste</strong> diante de um paciente: sensibilidade, especificidade, valores preditivos e, por fim, a Curva ROC. Agora o foco muda — e por uma boa razão.</p>
      <p>Antes de qualquer teste, alguém precisou <strong>medir</strong>: medir HbA1c em diabéticos e não diabéticos, medir pressão sistólica em hipertensos e controles, medir tamanho de tumor em respondedores e não respondedores. E quando se mede muita gente, surgem <em>distribuições</em> — populações inteiras condensadas em duas perguntas: <strong>onde está o centro?</strong> e <strong>quão espalhado está o grupo?</strong></p>
      <p>É esse o terreno do Módulo 4. Sem ele, a ROC do Módulo 3 não existiria: as duas curvas normais que você viu (sãos × doentes) <em>são</em> média e desvio padrão em ação.</p>`,
      links: [
        { module: 'm3', pageId: 'm3-04', variant: 'recap',
          label: 'Onde a ROC nasce: as duas distribuições (HbA1c)',
          hint: 'Reveja como sãos e doentes têm <em>média e desvio padrão</em> diferentes — base do Módulo 4.' },
        { module: 'm3', pageId: 'm3-07', variant: 'recap',
          label: 'Fechamento do Módulo 3 — quatro reflexos automáticos',
          hint: 'Se ainda precisar do mapa visual da ROC antes de seguir.' }
      ]
    }) +

    conceptHero({
      question: 'O que o IBGE, a Seleção Brasileira e a nota da turma têm em comum?',
      title: 'Todos pedem um número que represente o grupo inteiro.',
      lead: 'Renda média de uma região, idade média do time, média da turma — em todos os casos buscamos <strong>um valor que sintetize muitos</strong>. Em Medicina, isso vira pressão sistólica média do ambulatório, idade média dos cardiopatas, glicemia média do estudo. Tendência central não é luxo estatístico: é a linguagem com que populações conversam com a clínica.',
      glow: 'rgba(37,99,235,.18)'
    }) +

    sectionTitle('🧭', 'Três cenas, uma mesma ferramenta', 'm4') +
    keyTerms(['tendência central','média','mediana','moda','representar o grupo','um número, muitas histórias'], 'blue') +

    didaxBlock('estrutura', '🏛️',
      'Cena 1 — IBGE divulga a renda da sua cidade',
      `<p>Você não vê a planilha com 200 mil pessoas. Você vê <strong>um número</strong>: a renda <em>média</em> ou <em>mediana</em>. Esse número é uma promessa: “se eu sortear um morador, ele estará por aqui”. A escolha entre média e mediana muda a história contada — e isso vai voltar na próxima página.</p>`
    ) +

    didaxBlock('paralelo', '⚽',
      'Cena 2 — A idade média da Seleção Brasileira',
      `<p>Convocação anunciada: idade média 27 anos. Você imagina um grupo equilibrado, nem cru, nem veterano. Não precisou saber a idade de cada jogador — bastou <strong>um número que representa o time</strong>. É exatamente o mesmo movimento que o estatístico médico faz com a pressão sistólica de um ambulatório.</p>`
    ) +

    didaxBlock('serie', '🎓',
      'Cena 3 — Média da turma na prova de Patologia',
      `<p>O professor fala: “a turma foi bem, média 7,8”. Você localiza-se: acima ou abaixo? A média ali serve para <strong>comparar</strong> (você versus o grupo) e para <strong>decidir</strong> (refaz prova ou não). Mesma lógica clínica: a média da sua glicemia comparada à média populacional define se você é “saudável” ou “alterado”.</p>`
    ) +

    sectionTitle('🩺', 'Por que cai em prova de residência?', 'm4') +

    didaxBlock('prevalencia', '📊',
      'Porque toda decisão epidemiológica começa em um resumo',
      `<p>Estudo clínico publicado: “pacientes com idade <strong>média</strong> 62 anos, glicemia <strong>mediana</strong> 138 mg/dL, IMC <strong>médio</strong> 28”. Você lê em segundos uma população inteira. Sem tendência central, cada artigo seria uma planilha indecifrável. A banca cobra porque é a primeira leitura de qualquer estudo clínico.</p>`
    ) +

    sectionTitle('🧮', 'Calculadora introdutória — experimente resumir um grupo', 'm4') +
    `<p class="mt-prose">Abaixo: glicemia de jejum (mg/dL) de 8 pacientes do ambulatório. Os campos de média, mediana, moda, amplitude, variância e desvio padrão atualizam em tempo real. <strong>Apague um valor</strong> ou <strong>adicione um extremo</strong> (ex.: 350) e veja como cada métrica reage diferente — esse é o cerne dos próximos capítulos.</p>` +
    PrevInt.calcEstat({
      values: [92, 98, 102, 105, 108, 112, 118, 125]
    }) +

    bancaCallout(
      `<strong>O que a banca quer testar nesta página:</strong> que você reconheça que <em>média, mediana e moda</em> têm o mesmo propósito (resumir um grupo) mas <strong>contam histórias diferentes</strong>. Quem confunde os três paga caro em questão de pressão arterial, glicemia, idade e renda — todas com perfis assimétricos.`
    ) +

    revisaoAtiva([
      { q: 'O que é uma medida de tendência central?', a: 'Um número que <strong>representa um conjunto inteiro de dados</strong>. Substitui a lista por um valor que “mora no centro” — média, mediana ou moda.' },
      { q: 'Por que IBGE, Seleção e prova de turma servem de analogia clínica?', a: 'Porque em todos os casos queremos um número que <strong>resuma o grupo</strong> sem precisar percorrer a lista inteira. Em Medicina, isso vira média de PA, mediana de glicemia, moda de idade — a mesma ferramenta.' },
      { q: 'A banca cobra qual ideia central deste bloco?', a: 'Que tendência central <strong>resume</strong>, mas não conta tudo — você ainda precisará da <em>dispersão</em> para saber se o grupo é homogêneo ou tem extremos. Centro sem espalhamento é meia verdade.' }
    ]) +

    pageFooterMeta({
      resumo: 'Tendência central = um número que representa o grupo. Três sabores: <strong>média, mediana, moda</strong>. Cada um conta uma história diferente da mesma planilha.',
      proximaConexao: 'A próxima página abre o primeiro sabor — a <strong>média</strong>: soma tudo e divide por todos. Simples no algoritmo, traiçoeira quando há extremos.',
      nextId: 'm4-02'
    });

  renderStandard(c, p, body);
};

/* ─────────────────────────────────────────
   M4-02 — Média: muitos números em um panorama
───────────────────────────────────────── */
GO_RENDER['m4-02'] = function(c, p) {
  const body =
    pageHero({
      module: M4_MOD, moduleLabel: M4_LABEL, pageNum: '02',
      title: 'Média: transformar muitos números em um panorama',
      lead: 'A média soma tudo e divide por todos. É a tradução matemática mais antiga da pergunta “quanto, em média, isso é?”.',
      grad: M4_GRAD
    }) +

    conceptHero({
      question: 'Como uma planilha de 9 alunos vira um número só?',
      title: 'Média = soma de todos os valores ÷ quantidade de valores.',
      lead: 'É a operação que você já fazia desde a escola fundamental para tirar “sua média”. Em estatística médica é a mesma coisa — só muda o conteúdo: notas viram glicemias, sódios, pressões.',
      glow: 'rgba(37,99,235,.18)'
    }) +

    svgIllus(PrevSVG.histogramaTendencia(), 'Três medidas em um só gráfico: moda (classe mais alta), mediana (centro de massa), média (centro de gravidade). Quando há cauda, elas se separam.') +

    sectionTitle('➗', 'A fórmula que cabe num post-it', 'm4') +
    keyTerms(['média aritmética','x̄','soma','divide por n','panorama','primeira leitura'], 'violet') +

    formulaBox(
      'Média (x̄)',
      `<div class="formula-inline">
        <span>x̄ =</span>
        ${frac('Σx<sub>i</sub>', 'n')}
        <span class="formula-note">= soma dos valores ÷ quantidade</span>
      </div>`,
      'Σ é só o "somatório" — apertar uma calculadora soma tudo e divide por <em>n</em>.'
    ) +

    sectionTitle('🧪', 'Caso didático — média de uma sequência de 9 valores', 'm4') +

    didaxBlock('estrutura', '📋',
      'Sequência adaptada (didática)',
      `<p>Trabalharemos com a sequência <strong>2, 3, 6, 6, 6, 9, 20, 40, 46</strong> — uma adaptação que reproduz a média de referência <strong>15,3</strong> e a moda <strong>6</strong> usadas em material didático clássico. Use a calculadora abaixo para confirmar.</p>
      <p class="editorial-note">Nota editorial: a sequência literal do roteiro original não foi preservada; usamos uma versão didaticamente equivalente para manter média 15,3 e moda 6.</p>`
    ) +

    PrevInt.calcEstat({
      values: [2, 3, 6, 6, 6, 9, 20, 40, 46],
      title: 'Calculadora — média, mediana e moda'
    }) +

    didaxBlock('hit', '✅',
      'O que a calculadora confirma',
      `<ul class="tight">
        <li><strong>Soma</strong> dos 9 valores = 138</li>
        <li><strong>Média</strong> = 138 ÷ 9 ≈ <strong>15,3</strong></li>
        <li><strong>Moda</strong> = 6 (aparece três vezes)</li>
        <li>Repare: a média <em>não</em> coincide com nenhum valor da lista — ela é uma síntese, não uma observação real.</li>
      </ul>`
    ) +

    sectionTitle('⚠️', 'A média é simpática, mas tem um defeito', 'm3') +

    didaxBlock('pegadinha', '🪤',
      'Um único valor extremo "puxa" a média',
      `<p>Olhe a sequência: a maioria está entre 2 e 9, mas <strong>40 e 46 puxam a média para cima</strong>. Se o estudo investigasse "renda do bairro", esses dois valores extremos sozinhos elevariam a renda média acima do que a maioria realmente recebe.</p>
      <p>Isso tem nome em prova: a média é <strong>sensível a outliers</strong> (valores extremos). E é exatamente por isso que existe a <em>mediana</em>, próxima página.</p>`
    ) +

    bancaCallout(
      `<strong>O que a banca quer testar:</strong> que você saiba calcular a média (soma/n) e <em>identifique</em> quando ela está sendo distorcida por extremos. Sempre que aparecer salário, renda, tempo de internação, custo hospitalar — desconfie da média sozinha. Procure a mediana para a verdade do meio.`
    ) +

    revisaoAtiva([
      { q: 'Qual a fórmula da média aritmética?', a: '<strong>x̄ = Σx<sub>i</sub> / n</strong> — soma de todos os valores dividida pela quantidade de valores.' },
      { q: 'Por que a média da sequência 2,3,6,6,6,9,20,40,46 é 15,3 e não 6?', a: 'Porque <strong>40 e 46 puxam a soma para cima</strong>. A média sente o peso de cada extremo — sete valores baixos não compensam dois muito altos.' },
      { q: 'Qual é o ponto fraco da média que abre a próxima página?', a: '<strong>Ela é sensível a outliers</strong>. Em distribuições assimétricas (renda, tempo de internação), a média não representa a maioria — entra a mediana.' }
    ]) +

    pageFooterMeta({
      resumo: 'Média = Σx / n. Resume bem quando os valores estão equilibrados; distorce quando há extremos. <strong>Soma tudo e divide por todos.</strong>',
      proximaConexao: 'Próxima página: a <strong>mediana</strong>, o centro que <em>resiste</em> aos extremos. Vamos ver duas listas com o mesmo centro mas médias absurdamente diferentes.',
      nextId: 'm4-03'
    });

  renderStandard(c, p, body);
};

/* ─────────────────────────────────────────
   M4-03 — Mediana: o centro que resiste aos extremos
───────────────────────────────────────── */
GO_RENDER['m4-03'] = function(c, p) {
  const body =
    pageHero({
      module: M4_MOD, moduleLabel: M4_LABEL, pageNum: '03',
      title: 'Mediana: o centro que resiste aos extremos',
      lead: 'A mediana mora no meio. Não importa se o último valor é 7 ou dez milhões — o meio é o mesmo. Essa é a virtude que a média não tem.',
      grad: M4_GRAD
    }) +

    conceptHero({
      question: 'Por que estudos com renda, tempo de internação ou custo hospitalar quase sempre relatam mediana?',
      title: 'Porque a mediana é <em>pouco influenciada por valores extremos</em>.',
      lead: 'Em distribuições assimétricas, ela representa a maioria melhor do que a média. Esta página prova isso com duas sequências quase idênticas — exceto pelo último número.',
      glow: 'rgba(124,58,237,.18)'
    }) +

    sectionTitle('🎯', 'A definição que cabe em uma frase', 'm4') +
    keyTerms(['mediana','centro','ordenar primeiro','robustez','assimetria','outliers'], 'violet') +

    svgIllus(PrevSVG.assimetrias(), 'Em distribuição simétrica: média = mediana. Em cauda à direita: média > mediana. Em cauda à esquerda: média < mediana. A mediana resiste; a média segue a cauda.') +

    didaxBlock('estrutura', '📏',
      'Mediana = valor central de uma lista <em>ordenada</em>',
      `<p>É o valor que divide a amostra em duas metades iguais: metade abaixo, metade acima. Para encontrá-la você sempre faz dois movimentos, sempre nessa ordem:</p>
      <ol class="tight">
        <li><strong>Ordena</strong> os valores do menor para o maior.</li>
        <li><strong>Pega o do meio</strong> (se a quantidade for ímpar) ou a <strong>média dos dois centrais</strong> (se for par).</li>
      </ol>`
    ) +

    sectionTitle('🔬', 'Demonstração clássica — a mediana resiste', 'm4') +

    didaxBlock('paralelo', '🅰️',
      'Lista A — 1, 3, 7',
      `<p>Três valores, ímpar. Já ordenados. <strong>O valor do meio é 3</strong>. <br><strong>Mediana = 3.</strong></p>
      <p class="editorial-note">Média dessa lista = (1+3+7)/3 ≈ 3,67. Ainda razoavelmente parecidas.</p>`
    ) +

    didaxBlock('paralelo', '🅱️',
      'Lista B — 1, 3, 10.000.000',
      `<p>Mudamos <strong>apenas o último valor</strong> (de 7 para dez milhões). Lista ordenada. <strong>O valor do meio continua 3</strong>. <br><strong>Mediana = 3.</strong></p>
      <p class="editorial-note">Média dessa lista = (1+3+10.000.000)/3 ≈ 3.333.334,7. <strong>A média explodiu</strong>, a mediana não se mexeu.</p>`
    ) +

    didaxBlock('hit', '💡',
      'O que essa cena ensina em uma frase',
      `<p class="answer-text --violet">Mediana é pouco influenciada por valores extremos.</p>
      <p>Por isso ela é a medida-favorita para variáveis assimétricas: renda, salário, tempo de internação, custo hospitalar, tamanho de tumor, contagem viral. Sempre que houver risco de outlier puxar a média, a banca espera que você cite a mediana.</p>`
    ) +

    sectionTitle('🧮', 'Sinta na calculadora', 'm4') +
    PrevInt.calcEstat({
      values: [1, 3, 7],
      title: 'Lista A — calcule e veja: mediana 3'
    }) +
    PrevInt.calcEstat({
      values: [1, 3, 10000000],
      title: 'Lista B — calcule e veja: mediana ainda 3 (e média absurda)'
    }) +

    bancaCallout(
      `<strong>O que a banca quer testar:</strong> que você reconheça a <em>robustez</em> da mediana. Frase clássica em questão: "em variáveis com distribuição assimétrica, a medida de tendência central mais adequada é a mediana". Marque sem hesitar.`
    ) +

    revisaoAtiva([
      { q: 'Qual o passo zero antes de calcular qualquer mediana?', a: '<strong>Ordenar os valores</strong>. Sem ordenação, qualquer "valor do meio" é fictício.' },
      { q: 'Por que mediana = 3 em ambas as listas (1,3,7) e (1,3,10.000.000)?', a: 'Porque o <strong>valor do meio</strong> em uma lista ordenada de 3 elementos é sempre o segundo. O extremo só desloca a média — a mediana não se mexe.' },
      { q: 'Em que tipo de variável a mediana é preferida sobre a média?', a: 'Em <strong>variáveis assimétricas</strong> (renda, tempo de internação, custo hospitalar, tamanho de tumor). Sempre que houver outliers que distorcem a média.' }
    ]) +

    pageFooterMeta({
      resumo: '<strong>Mediana mora no meio.</strong> É pouco influenciada por valores extremos — robustez é a sua marca. Ordena primeiro, pega o do meio.',
      proximaConexao: 'Próxima página: a <strong>moda</strong>, o valor que mais aparece. Diferente de média e mediana, ela não calcula — apenas conta. E pode haver mais de uma.',
      nextId: 'm4-04'
    });

  renderStandard(c, p, body);
};

/* ─────────────────────────────────────────
   M4-04 — Moda: o valor que mais aparece
───────────────────────────────────────── */
GO_RENDER['m4-04'] = function(c, p) {
  const body =
    pageHero({
      module: M4_MOD, moduleLabel: M4_LABEL, pageNum: '04',
      title: 'Moda: o valor que mais aparece',
      lead: 'A moda não soma, não divide, não ordena: apenas conta repetições. Por isso é a única tendência central que serve para variáveis qualitativas — e a única que pode ser dupla, tripla ou inexistente.',
      grad: M4_GRAD
    }) +

    conceptHero({
      question: 'Por que a moda é diferente das outras duas?',
      title: 'Porque ela responde à pergunta "qual o valor mais comum?", não "qual o valor do meio?".',
      lead: 'É a única medida que faz sentido para variáveis categóricas: cor dos olhos, tipo sanguíneo, sexo, classe social. Onde não há "somar" nem "ordenar", ainda dá para "contar".',
      glow: 'rgba(16,185,129,.18)'
    }) +

    sectionTitle('🔁', 'Definição operacional', 'm4') +
    keyTerms(['moda','valor mais frequente','unimodal','bimodal','trimodal','amodal','qualitativa'], 'green') +

    didaxBlock('estrutura', '📋',
      'Moda = o valor com maior frequência absoluta',
      `<p>Você olha a lista, conta quantas vezes cada valor aparece, e premia o que aparece mais. <strong>Não importa se é o maior, o menor ou o do meio</strong> — importa quantas vezes ele se repete.</p>`
    ) +

    sectionTitle('🔢', 'Três casos canônicos', 'm4') +

    didaxBlock('paralelo', '1️⃣',
      'Unimodal — uma única moda',
      `<p>Lista: <strong>1, 2, 2, 3</strong>. O 2 aparece duas vezes; os outros, uma. <strong>Moda = 2.</strong> Uma só moda → distribuição <em>unimodal</em>.</p>`
    ) +
    PrevInt.calcEstat({
      values: [1, 2, 2, 3],
      title: 'Caso unimodal — 1, 2, 2, 3'
    }) +

    didaxBlock('paralelo', '2️⃣',
      'Bimodal — duas modas',
      `<p>Lista: <strong>1, 2, 2, 3, 4, 4</strong>. Agora <strong>2 e 4 aparecem duas vezes cada</strong>, e nenhum outro aparece mais. <strong>Modas = 2 e 4.</strong> Duas modas → distribuição <em>bimodal</em>. Em prova é sinal de que <em>existem dois "picos"</em> na população — pode indicar dois subgrupos.</p>`
    ) +
    PrevInt.calcEstat({
      values: [1, 2, 2, 3, 4, 4],
      title: 'Caso bimodal — 1, 2, 2, 3, 4, 4'
    }) +

    didaxBlock('paralelo', '3️⃣',
      'Trimodal e amodal — extremos do conceito',
      `<p><strong>Trimodal:</strong> três valores empatados com a maior frequência (raro mas possível em prova de Bioestatística básica).</p>
      <p><strong>Amodal:</strong> todos os valores aparecem o mesmo número de vezes — não há "vencedor". Exemplo: <em>1, 2, 3, 4</em> (todos uma vez) → <strong>amodal</strong>. Não existe moda quando ninguém se destaca.</p>`
    ) +

    didaxBlock('hit', '💡',
      'Por que a moda é a única "qualitativa-friendly"',
      `<p>Para <strong>tipo sanguíneo</strong> de um ambulatório (A, B, AB, O), você não soma A com B nem pega "o do meio" — não faz sentido. Mas você <em>pode contar</em> e dizer "a moda dessa amostra é O". Por isso média e mediana exigem variável quantitativa; <strong>a moda funciona em qualquer escala</strong>.</p>`
    ) +

    bancaCallout(
      `<strong>O que a banca quer testar:</strong> (1) que a moda é o valor <em>mais frequente</em>; (2) que pode haver <em>mais de uma</em> moda (bimodal, trimodal); (3) que é a única medida de tendência central <em>aplicável a variáveis qualitativas</em>. Esses três fatos respondem 80% das questões sobre moda.`
    ) +

    revisaoAtiva([
      { q: 'A moda da lista 1, 2, 2, 3 é qual valor e por quê?', a: '<strong>Moda = 2.</strong> Porque o valor 2 aparece duas vezes e todos os outros, apenas uma — ele é o mais frequente.' },
      { q: 'A lista 1, 2, 2, 3, 4, 4 é unimodal, bimodal ou amodal?', a: '<strong>Bimodal.</strong> Modas: 2 e 4 (cada um aparece duas vezes; nenhum outro aparece mais). Pode indicar dois subgrupos na população.' },
      { q: 'Por que a moda é a única medida útil para variáveis qualitativas?', a: 'Porque tipo sanguíneo, sexo, cor dos olhos <strong>não se somam nem se ordenam</strong>. Só podem ser <em>contados</em> — e a moda é a categoria mais contada.' }
    ]) +

    pageFooterMeta({
      resumo: '<strong>Moda = o que mais aparece.</strong> Pode haver uma (unimodal), duas (bimodal), três (trimodal) ou nenhuma (amodal). Única tendência central aceita em variável qualitativa.',
      proximaConexao: 'Próxima página: <strong>mediana em prova</strong>. Vamos resolver uma questão clássica de pressão sistólica em que esquecer de <em>ordenar primeiro</em> já elimina três alternativas.',
      nextId: 'm4-05'
    });

  renderStandard(c, p, body);
};

/* ─────────────────────────────────────────
   M4-05 — Mediana em prova: ordenar primeiro, calcular depois
───────────────────────────────────────── */
GO_RENDER['m4-05'] = function(c, p) {
  const body =
    pageHero({
      module: M4_MOD, moduleLabel: M4_LABEL, pageNum: '05',
      title: 'Mediana em prova: ordenar primeiro, calcular depois',
      lead: 'Questão de banca não dá lista ordenada — dá um amontoado. Quem ordena, acerta; quem chuta o "do meio" pela ordem de leitura, erra.',
      grad: M4_GRAD
    }) +

    conceptHero({
      question: 'Como a banca cobra mediana em prova de Bioestatística?',
      title: 'Dando uma lista <em>fora de ordem</em> e contando que você esqueça o passo zero.',
      lead: 'Aqui você vai dissecar uma questão estilo Unifesp — pressão sistólica de um homem de 70 anos — e descobrir como cada erro de ordenação custa a alternativa correta.',
      glow: 'rgba(124,58,237,.18)'
    }) +

    sectionTitle('📜', 'O enunciado típico', 'm4') +

    didaxBlock('estrutura', '🩺',
      'Caso clínico (estilo Unifesp)',
      `<p>Homem de 70 anos, com história clínica prévia, é avaliado em consulta ambulatorial. Foram aferidas <strong>seis medidas</strong> de pressão arterial sistólica, em mmHg, ao longo da consulta:</p>
      <div class="center-display --blue">110, 80, 75, 90, 110, 75</div>
      <p>Pergunta-se: qual a <strong>mediana</strong>, a <strong>moda</strong> e a <strong>média</strong> dessas medidas?</p>
      <p class="editorial-note">Nota editorial: o enunciado original do material trazia uma sigla de transcrição duvidosa ("AEM"); usamos "homem de 70 anos com história clínica prévia" para preservar o sentido sem inventar dado clínico.</p>`
    ) +

    sectionTitle('1️⃣', 'Passo zero — ordenar', 'm4') +

    didaxBlock('hit', '📏',
      'Reordenando do menor para o maior',
      `<p>Lista bruta: 110, 80, 75, 90, 110, 75.</p>
      <p>Lista ordenada: <strong>75, 75, 80, 90, 110, 110</strong>.</p>
      <p class="answer-text --violet">Pediu mediana? <em>Ordena primeiro.</em></p>`
    ) +

    sectionTitle('2️⃣', 'Calculando a mediana (n par → dois centros)', 'var(--c-violet)') +

    didaxBlock('estrutura', '🎯',
      'Sequência par tem dois centros',
      `<p>São 6 valores (par). Os dois centrais são <strong>o 3.º e o 4.º</strong> elementos: 80 e 90. <strong>A mediana é a média desses dois</strong>.</p>`
    ) +

    formulaBox(
      'Mediana (n par)',
      `<div class="formula-inline">
        <span>Mediana =</span>
        ${frac('x<sub>n/2</sub> + x<sub>(n/2)+1</sub>', '2')}
        <span>=</span>
        ${frac('80 + 90', '2')}
        <span>= <strong>85 mmHg</strong></span>
      </div>`,
      'Para <em>n</em> ímpar a mediana é o valor único central; para <em>n</em> par é a <strong>média dos dois centrais</strong>.'
    ) +

    sectionTitle('3️⃣', 'Calculando a moda e a média da mesma lista', 'm4') +

    didaxBlock('paralelo', '🔁',
      'Moda — quem mais aparece',
      `<p>Na lista ordenada (75, 75, 80, 90, 110, 110), <strong>75 aparece duas vezes</strong> e <strong>110 aparece duas vezes</strong>. Empatados, com frequência maior que todos os outros.</p>
      <p class="answer-text --green">Moda = 75 e 110 (distribuição bimodal).</p>`
    ) +

    didaxBlock('paralelo', '➗',
      'Média — soma tudo, divide por 6',
      `<p>Soma: 75 + 75 + 80 + 90 + 110 + 110 = <strong>540</strong>. Média: 540 ÷ 6 = <strong>90 mmHg</strong>.</p>
      <p class="editorial-note">Observe: <em>média (90) ≠ mediana (85)</em>. Pequena diferença porque os extremos altos (110, 110) puxam a média para cima.</p>`
    ) +

    PrevInt.calcEstat({
      values: [75, 75, 80, 90, 110, 110],
      title: 'Confirme na calculadora — 75, 75, 80, 90, 110, 110'
    }) +

    didaxBlock('pegadinha', '🪤',
      'Como a banca elimina o aluno apressado',
      `<ul class="tight">
        <li>Alternativa "Mediana = 90" → quem pegou o <strong>quarto da lista bruta</strong> (110, 80, 75, <em>90</em>, 110, 75) sem ordenar.</li>
        <li>Alternativa "Mediana = 95" → quem ordenou, mas pegou <strong>só o 4.º elemento</strong> (90) esquecendo que par tem dois centros.</li>
        <li>Alternativa "Moda = 75" (só) → quem parou de contar antes de chegar ao final.</li>
        <li>Alternativa correta — <strong>Mediana 85 · Moda 75 e 110 · Média 90</strong>.</li>
      </ul>`
    ) +

    bancaCallout(
      `<strong>O que a banca quer testar:</strong> o algoritmo completo. (1) <em>Ordenou</em>? (2) <em>n é par ou ímpar</em>? (3) Se par, <em>média dos dois centrais</em>? (4) Moda pode ser <em>bimodal</em>. Quem responde "sim" às quatro perguntas marca a alternativa certa em &lt; 30 segundos.`
    ) +

    revisaoAtiva([
      { q: 'Qual o passo zero ao ver uma lista de pressões sistólicas em prova?', a: '<strong>Ordenar do menor para o maior.</strong> Sem ordenar, qualquer "valor do meio" será o errado.' },
      { q: 'Em uma sequência com 6 valores (n par), como se calcula a mediana?', a: 'Mediana é a <strong>média do 3.º e 4.º valores</strong> da lista ordenada — porque sequência par tem dois centros.' },
      { q: 'No caso 75, 75, 80, 90, 110, 110, qual a média, mediana e moda?', a: '<strong>Média = 90 mmHg</strong>, <strong>Mediana = 85 mmHg</strong>, <strong>Moda = 75 e 110 (bimodal)</strong>.' }
    ]) +

    pageFooterMeta({
      resumo: '<strong>Pediu mediana? Ordena primeiro.</strong> Se <em>n</em> é par, mediana = média dos dois centrais. Moda pode vir dupla. Faça o olho com calma.',
      proximaConexao: 'Próxima página: e quando dois grupos têm a <em>mesma média</em> mas comportamentos clínicos opostos? Aí entra a <strong>dispersão</strong> — o conceito que separa quem decora de quem entende.',
      nextId: 'm4-06'
    });

  renderStandard(c, p, body);
};

/* ─────────────────────────────────────────
   M4-06 — Dispersão: quando a média esconde histórias
───────────────────────────────────────── */
GO_RENDER['m4-06'] = function(c, p) {
  const body =
    pageHero({
      module: M4_MOD, moduleLabel: M4_LABEL, pageNum: '06',
      title: 'Dispersão: quando a média esconde histórias diferentes',
      lead: 'Dois pacientes com a mesma glicemia média podem ter vidas clínicas opostas. A média sozinha não conta — precisamos do espalhamento ao redor dela.',
      grad: M4_GRAD
    }) +

    conceptHero({
      question: 'Como dois grupos com a mesma média podem ter destinos clínicos completamente diferentes?',
      title: 'Quando o <em>espalhamento</em> ao redor da média é diferente.',
      lead: 'Centro não é espalhamento. Dois pacientes podem ter média 100 mg/dL de glicemia, mas um oscila entre 95 e 105 (estável) e outro entre 50 e 180 (caótico). Só a dispersão diferencia.',
      glow: 'rgba(20,184,166,.18)'
    }) +

    sectionTitle('👥', 'Felipe e Rafael — a comparação que abre o conceito', 'm4') +
    keyTerms(['dispersão','espalhamento','mesma média, vidas diferentes','homogêneo','heterogêneo'], 'violet') +

    svgIllus(PrevSVG.dispersaoDP(), 'Três amostras, mesma média (μ=50): a dispersão (s) cresce de cima para baixo. É a foto numérica do "centro não é espalhamento".') +

    `<div class="split-grid">
      <div class="didax-block --paralelo">
        <div class="didax-block-title"><span class="ico">🟦</span>Felipe — quatro provas</div>
        <div class="didax-block-body">
          <p>Notas: <strong>0, 2, 8, 10</strong>.</p>
          <p>Soma: 20. Média: <strong>5</strong>.</p>
          <p class="emphasis --red">Mas tirou zero! E também tirou dez. Notas oscilam violentamente.</p>
        </div>
      </div>
      <div class="didax-block --paralelo">
        <div class="didax-block-title"><span class="ico">🟪</span>Rafael — quatro provas</div>
        <div class="didax-block-body">
          <p>Notas: <strong>4, 5, 5, 6</strong>.</p>
          <p>Soma: 20. Média: <strong>5</strong>.</p>
          <p class="emphasis --green">Mesma média do Felipe, mas notas todas perto de 5 — desempenho estável.</p>
          <p class="editorial-note">Nota editorial: sequência didática compatível para preservar média 5, amplitude 2 e baixa dispersão.</p>
        </div>
      </div>
    </div>` +

    sectionTitle('🧮', 'Confirme você mesmo — duas calculadoras lado a lado', 'm4') +
    `<p class="mt-prose">Não acredite no texto: confirme. As duas calculadoras abaixo carregam exatamente as notas de Felipe e Rafael. Compare <strong>Média</strong> (igual nas duas), depois <strong>Amplitude</strong>, <strong>Variância</strong> e <strong>Desvio Padrão</strong> — todas radicalmente diferentes. É o conceito de dispersão nascendo numericamente diante dos seus olhos.</p>` +
    `<div class="split-grid">
      <div>
        <h4 style="margin:0 0 8px; font-size:13px; text-transform:uppercase; letter-spacing:.05em; color:var(--c-red); font-weight:700;">🟦 Felipe — instável (0, 2, 8, 10)</h4>
        ${PrevInt.calcEstat({ values: [0, 2, 8, 10] })}
      </div>
      <div>
        <h4 style="margin:0 0 8px; font-size:13px; text-transform:uppercase; letter-spacing:.05em; color:var(--c-green); font-weight:700;">🟪 Rafael — estável (4, 5, 5, 6)</h4>
        ${PrevInt.calcEstat({ values: [4, 5, 5, 6] })}
      </div>
    </div>` +

    didaxBlock('hit', '💡',
      'A pergunta inevitável',
      `<p class="lead-text">Se os dois têm a mesma média, eles tiveram o mesmo desempenho?</p>
      <p class="answer-text --teal">Não. Felipe é instável; Rafael é constante. A média esconde isso.</p>
      <p>Em clínica, mesma cena: dois pacientes hipertensos com pressão sistólica <strong>média 140 mmHg</strong>. Um oscila entre 135 e 145 (controle razoável). O outro oscila entre 90 e 190 (risco iminente). <strong>Centro idêntico, espalhamento opostos, decisões opostas</strong>.</p>`
    ) +

    fraseAutoral({
      tag: 'Voz Preventiva',
      body: `Quando eu olho um relatório clínico e vejo só a média da glicemia ou da pressão, eu sei que estou olhando metade da história. <strong>Centro não é espalhamento.</strong> Um residente experiente aprende a desconfiar de qualquer média que venha sozinha — porque por trás dela pode estar tanto o paciente estável quanto aquele que oscila entre o normal e a UTI. É essa desconfiança disciplinada que esse módulo está construindo em você.`,
      assinatura: 'Intensivão Preventiva · M4-06'
    }) +

    sectionTitle('🩺', 'Tradução clínica — por que isso é vital em Medicina', 'm3') +

    didaxBlock('serie', '📈',
      'Glicemia 95 a 105 mg/dL — paciente sob controle',
      `<p>Diabético com automonitorização semanal mostrando glicemia entre 95 e 105. Média 100. <strong>Pequeno espalhamento</strong> → conduta clínica: manter esquema atual, reforçar adesão.</p>`
    ) +
    didaxBlock('serie', '📉',
      'Glicemia 50 a 180 mg/dL — mesmo paciente, vida em risco',
      `<p>Outro diabético com média também 100, mas oscilando entre 50 (hipoglicemia) e 180 (hiperglicemia). <strong>Grande espalhamento</strong> → conduta clínica: ajustar insulina, internar se necessário, considerar bomba.</p>
      <p>A média não mudou. A dispersão sim. <strong>A decisão clínica muda toda por causa da dispersão</strong>.</p>`
    ) +

    bancaCallout(
      `<strong>O que a banca quer testar:</strong> que você reconheça que <em>medidas de tendência central</em> e <em>medidas de dispersão</em> respondem perguntas diferentes. Centro responde "onde fica a maioria?". Dispersão responde "quão homogêneo é o grupo?". <strong>Centro não é espalhamento</strong> — confundir é erro clássico de prova.`
    ) +

    revisaoAtiva([
      { q: 'Felipe (0,2,8,10) e Rafael (4,5,5,6) têm a mesma média. Eles têm o mesmo desempenho?', a: '<strong>Não.</strong> Felipe é instável (notas espalhadas de 0 a 10); Rafael é constante (todas perto de 5). A média esconde o espalhamento.' },
      { q: 'Por que dois pacientes com glicemia média 100 podem ter condutas opostas?', a: 'Porque um pode oscilar entre 95-105 (estável) e outro entre 50-180 (caótico). A <strong>dispersão</strong> muda toda a conduta clínica — não a média.' },
      { q: 'Qual a frase-resumo que abre o estudo de dispersão?', a: '<strong>Centro não é espalhamento.</strong> Tendência central e dispersão são complementares — toda análise descritiva precisa das duas.' }
    ]) +

    pageFooterMeta({
      resumo: 'Mesmo centro, espalhamentos diferentes → histórias clínicas opostas. A média sozinha mente; precisamos medir a <strong>dispersão</strong> ao redor dela.',
      proximaConexao: 'Próxima página: <strong>amplitude e desvio</strong>. As duas primeiras formas — uma grosseira, outra mais fina — de quantificar o quão espalhados os valores estão.',
      nextId: 'm4-07'
    });

  renderStandard(c, p, body);
};

/* ─────────────────────────────────────────
   M4-07 — Amplitude e desvio: o espalhamento começa simples
───────────────────────────────────────── */
GO_RENDER['m4-07'] = function(c, p) {
  const body =
    pageHero({
      module: M4_MOD, moduleLabel: M4_LABEL, pageNum: '07',
      title: 'Amplitude e desvio: o espalhamento começa simples',
      lead: 'Antes da variância e do desvio padrão, dois conceitos elementares: amplitude (maior menos menor) e desvio (distância até a média). Cada um tem virtude e defeito.',
      grad: M4_GRAD
    }) +

    conceptHero({
      question: 'Qual a forma mais simples de medir o quanto um grupo está espalhado?',
      title: 'Pegar o maior valor e subtrair o menor — isso é a <em>amplitude</em>.',
      lead: 'Cabe em uma linha de cálculo mental, mas tem um defeito enorme. Para refinar, criamos o <em>desvio</em>: a distância de cada valor até a média. Essa será a base da variância.',
      glow: 'rgba(20,184,166,.18)'
    }) +

    sectionTitle('📏', 'Amplitude — a medida mais grosseira', 'm4') +
    keyTerms(['amplitude','range','maior - menor','desvio','distância até a média'], 'teal') +

    formulaBox(
      'Amplitude',
      `<div class="formula-inline">
        <span>Amplitude = </span>
        <span>x<sub>máx</sub></span>
        <span>−</span>
        <span>x<sub>mín</sub></span>
      </div>`,
      '"<strong>Amplitude é maior menos menor.</strong>" Mais simples impossível.'
    ) +

    `<div class="split-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin: 16px 0;">
      <div class="didax-block --paralelo">
        <div class="didax-block-title"><span class="ico">🟦</span>Felipe — 0, 2, 8, 10</div>
        <div class="didax-block-body">
          <p>Maior: 10. Menor: 0.</p>
          <p class="answer-text --teal">Amplitude = 10 − 0 = <strong>10</strong></p>
          <p>Grande espalhamento detectado já na conta mais simples.</p>
        </div>
      </div>
      <div class="didax-block --paralelo">
        <div class="didax-block-title"><span class="ico">🟪</span>Rafael — 4, 5, 5, 6</div>
        <div class="didax-block-body">
          <p>Maior: 6. Menor: 4.</p>
          <p class="answer-text --teal">Amplitude = 6 − 4 = <strong>2</strong></p>
          <p>Pequeno espalhamento, coerente com a sensação de "notas estáveis".</p>
        </div>
      </div>
    </div>` +

    didaxBlock('pegadinha', '⚠️',
      'O defeito da amplitude',
      `<p>Ela <strong>usa só dois valores</strong> da lista — o maior e o menor. <em>Tudo que está no meio é ignorado</em>. Em uma lista de 1.000 pacientes, basta um único outlier no topo ou no rodapé para inflar a amplitude sem que ela represente a realidade da maioria.</p>
      <p class="answer-text --orange">Por isso a amplitude é a medida de dispersão <em>mais grosseira</em>. Útil para uma primeira leitura — insuficiente para análise séria.</p>`
    ) +

    sectionTitle('🎯', 'Desvio — a distância de cada valor até a média', 'm4') +

    didaxBlock('estrutura', '📐',
      'Definição operacional',
      `<p>Desvio de um valor = <strong>quão longe ele está da média</strong>. Pode ser positivo (acima) ou negativo (abaixo).</p>`
    ) +

    formulaBox(
      'Desvio de um valor',
      `<div class="formula-inline">
        <span>d<sub>i</sub> = x<sub>i</sub> − x̄</span>
      </div>`,
      'Lê-se: "desvio do valor <em>i</em> = valor menos média". Note o sinal — quem está abaixo da média tem desvio negativo.'
    ) +

    didaxBlock('hit', '🟦',
      'Desvios de Felipe (média = 5)',
      `<ul class="tight">
        <li>x = 0 → desvio = 0 − 5 = <strong>−5</strong></li>
        <li>x = 2 → desvio = 2 − 5 = <strong>−3</strong></li>
        <li>x = 8 → desvio = 8 − 5 = <strong>+3</strong></li>
        <li>x = 10 → desvio = 10 − 5 = <strong>+5</strong></li>
      </ul>
      <p style="margin-top:8px; font-size:13px; color:var(--text-muted);">Soma dos desvios = (−5) + (−3) + (+3) + (+5) = <strong>0</strong>. Isso não é coincidência — a soma dos desvios em relação à média sempre dá zero, por definição da média.</p>`
    ) +

    didaxBlock('hit', '🟪',
      'Desvios de Rafael (média = 5)',
      `<ul class="tight">
        <li>x = 4 → desvio = 4 − 5 = <strong>−1</strong></li>
        <li>x = 5 → desvio = 5 − 5 = <strong>0</strong></li>
        <li>x = 5 → desvio = 5 − 5 = <strong>0</strong></li>
        <li>x = 6 → desvio = 6 − 5 = <strong>+1</strong></li>
      </ul>
      <p style="margin-top:8px;">Os desvios de Rafael são <strong>menores em módulo</strong> que os de Felipe — coerente com a percepção de espalhamento menor. Mas a soma também dá zero. Para "salvar" essa informação, precisamos do próximo truque: quadratizar os desvios.</p>`
    ) +

    PrevInt.calcEstat({
      values: [0, 2, 8, 10],
      title: 'Felipe — confirme amplitude e veja o desvio padrão (DP) preview'
    }) +
    PrevInt.calcEstat({
      values: [4, 5, 5, 6],
      title: 'Rafael — mesma média, mas dispersão muito menor'
    }) +

    bancaCallout(
      `<strong>O que a banca quer testar:</strong> (1) que <strong>amplitude = maior − menor</strong>; (2) que ela é a medida <em>mais grosseira</em> porque ignora os valores intermediários; (3) que <strong>desvio = valor − média</strong> e que a <em>soma dos desvios é sempre zero</em>. Esse zero é o motivo de inventarmos a variância na próxima página.`
    ) +

    revisaoAtiva([
      { q: 'Qual a fórmula da amplitude?', a: '<strong>Amplitude = maior valor − menor valor.</strong> Só dois valores entram na conta.' },
      { q: 'Por que a amplitude é considerada a medida de dispersão mais grosseira?', a: 'Porque <strong>usa apenas o máximo e o mínimo</strong> — ignora os intermediários. Um único outlier infla a amplitude sem refletir a realidade da maioria.' },
      { q: 'Por que a soma dos desvios em relação à média é sempre zero?', a: 'Porque a <strong>média é o ponto de equilíbrio</strong> da distribuição — desvios positivos cancelam os negativos. Por isso precisamos quadratizar os desvios para extrair informação de espalhamento.' }
    ]) +

    pageFooterMeta({
      resumo: '<strong>Amplitude</strong> = maior − menor (grosseira, dois valores só). <strong>Desvio</strong> = cada valor − média (carrega sinal, soma sempre dá zero). Para sair desse zero, próxima página: variância.',
      proximaConexao: 'Próxima página: <strong>variância e desvio padrão</strong>. Vamos elevar cada desvio ao quadrado, somar, dividir por (n−1), e tirar a raiz — chegando à medida-rainha da dispersão.',
      nextId: 'm4-08'
    });

  renderStandard(c, p, body);
};

/* ─────────────────────────────────────────
   M4-08 — Variância e desvio padrão: formalizando o espalhamento
───────────────────────────────────────── */
GO_RENDER['m4-08'] = function(c, p) {
  const body =
    pageHero({
      module: M4_MOD, moduleLabel: M4_LABEL, pageNum: '08',
      title: 'Variância e desvio padrão: formalizando o espalhamento',
      lead: 'Para escapar do zero da soma dos desvios, elevamos cada desvio ao quadrado. Soma, divide por (n−1), e temos a variância. Tira a raiz e temos o desvio padrão — a medida mais usada em Medicina.',
      grad: M4_GRAD
    }) +

    conceptHero({
      question: 'Como medir o espalhamento sem que os desvios se cancelem?',
      title: 'Elevando cada desvio ao quadrado antes de somar.',
      lead: '"Menos vezes menos dá mais" — qualquer desvio elevado ao quadrado vira positivo. Aí a soma deixa de ser zero e começa a contar a história do espalhamento.',
      glow: 'rgba(124,58,237,.18)'
    }) +

    sectionTitle('🧮', 'A receita em 4 passos', 'm4') +
    keyTerms(['variância','desvio padrão','quadrado dos desvios','n − 1','medida-rainha','formalização'], 'violet') +

    didaxBlock('estrutura', '📋',
      'Como se chega à variância',
      `<ol class="tight">
        <li>Calcule a <strong>média (x̄)</strong>.</li>
        <li>Para cada valor, calcule o <strong>desvio</strong> (x<sub>i</sub> − x̄).</li>
        <li><strong>Eleve cada desvio ao quadrado</strong> — agora todos são positivos.</li>
        <li><strong>Some</strong> os quadrados e divida por <strong>(n − 1)</strong>. Isso é a variância amostral.</li>
      </ol>`
    ) +

    formulaBox(
      'Variância amostral (s²)',
      `<div class="formula-inline">
        <span>s² = </span>
        ${frac('Σ (x<sub>i</sub> − x̄)²', 'n − 1')}
      </div>`,
      'Divide-se por <em>n − 1</em> (não por <em>n</em>) em amostras — o famoso ajuste de Bessel. Não vamos aprofundar a teoria; basta lembrar que <strong>amostra → dividir por (n − 1)</strong>.'
    ) +

    formulaBox(
      'Desvio padrão (s)',
      `<div class="formula-inline">
        <span>s = √s² = </span>
        <span>√(variância)</span>
      </div>`,
      'O desvio padrão é <strong>a raiz quadrada da variância</strong>. A raiz "desfaz" o quadrado dos desvios e devolve o resultado <em>na unidade original</em> (mg/dL, mmHg, anos…).'
    ) +

    sectionTitle('🟦', 'Aplicação 1 — Felipe (0, 2, 8, 10), média = 5', 'var(--c-blue)') +

    didaxBlock('hit', '🧾',
      'Passo a passo dos quadrados',
      `<table style="width:100%; border-collapse: collapse; margin: 8px 0; font-family: 'JetBrains Mono', monospace; font-size: 14px;">
        <thead>
          <tr style="background: var(--bg-elevated);">
            <th style="text-align: left; padding: 8px; border-bottom: 1px solid var(--border-color);">x<sub>i</sub></th>
            <th style="text-align: left; padding: 8px; border-bottom: 1px solid var(--border-color);">d<sub>i</sub> = x<sub>i</sub> − 5</th>
            <th style="text-align: left; padding: 8px; border-bottom: 1px solid var(--border-color);">d<sub>i</sub>²</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding: 6px 8px;">0</td><td>−5</td><td><strong>25</strong></td></tr>
          <tr><td style="padding: 6px 8px;">2</td><td>−3</td><td><strong>9</strong></td></tr>
          <tr><td style="padding: 6px 8px;">8</td><td>+3</td><td><strong>9</strong></td></tr>
          <tr><td style="padding: 6px 8px;">10</td><td>+5</td><td><strong>25</strong></td></tr>
          <tr style="border-top: 2px solid var(--c-blue);"><td colspan="2" style="padding: 6px 8px; font-weight: 700;">Σ d<sub>i</sub>²</td><td><strong style="color: var(--c-blue); font-size: 16px;">68</strong></td></tr>
        </tbody>
      </table>
      <p style="margin-top:10px;">Variância: s² = 68 ÷ (4 − 1) = 68 ÷ 3 ≈ <strong>22,6</strong>.</p>
      <p>Desvio padrão: s = √22,6 ≈ <strong>4,75</strong>.</p>`
    ) +

    PrevInt.calcEstat({
      values: [0, 2, 8, 10],
      title: 'Felipe — confirme: variância ≈ 22,6 · desvio padrão ≈ 4,75'
    }) +

    sectionTitle('🟪', 'Aplicação 2 — Rafael (4, 5, 5, 6), média = 5', 'var(--c-violet)') +

    didaxBlock('hit', '🧾',
      'Passo a passo dos quadrados',
      `<table style="width:100%; border-collapse: collapse; margin: 8px 0; font-family: 'JetBrains Mono', monospace; font-size: 14px;">
        <thead>
          <tr style="background: var(--bg-elevated);">
            <th style="text-align: left; padding: 8px; border-bottom: 1px solid var(--border-color);">x<sub>i</sub></th>
            <th style="text-align: left; padding: 8px; border-bottom: 1px solid var(--border-color);">d<sub>i</sub> = x<sub>i</sub> − 5</th>
            <th style="text-align: left; padding: 8px; border-bottom: 1px solid var(--border-color);">d<sub>i</sub>²</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding: 6px 8px;">4</td><td>−1</td><td><strong>1</strong></td></tr>
          <tr><td style="padding: 6px 8px;">5</td><td>0</td><td><strong>0</strong></td></tr>
          <tr><td style="padding: 6px 8px;">5</td><td>0</td><td><strong>0</strong></td></tr>
          <tr><td style="padding: 6px 8px;">6</td><td>+1</td><td><strong>1</strong></td></tr>
          <tr style="border-top: 2px solid var(--c-violet);"><td colspan="2" style="padding: 6px 8px; font-weight: 700;">Σ d<sub>i</sub>²</td><td><strong style="color: var(--c-violet); font-size: 16px;">2</strong></td></tr>
        </tbody>
      </table>
      <p style="margin-top:10px;">Variância: s² = 2 ÷ (4 − 1) = 2 ÷ 3 ≈ <strong>0,67</strong>.</p>
      <p>Desvio padrão: s = √0,67 ≈ <strong>0,82</strong>.</p>`
    ) +

    PrevInt.calcEstat({
      values: [4, 5, 5, 6],
      title: 'Rafael — confirme: variância ≈ 0,67 · desvio padrão ≈ 0,82'
    }) +

    didaxBlock('hit', '🆚',
      'Comparação final — quem se espalha mais?',
      `<table style="width:100%; border-collapse: collapse; margin: 8px 0; font-size: 14px;">
        <thead>
          <tr style="background: var(--bg-elevated);">
            <th style="text-align: left; padding: 8px;">Métrica</th>
            <th style="text-align: left; padding: 8px;">Felipe</th>
            <th style="text-align: left; padding: 8px;">Rafael</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding: 6px 8px;">Média</td><td>5</td><td>5</td></tr>
          <tr><td style="padding: 6px 8px;">Amplitude</td><td>10</td><td>2</td></tr>
          <tr><td style="padding: 6px 8px;">Variância</td><td><strong>22,6</strong></td><td>0,67</td></tr>
          <tr><td style="padding: 6px 8px;">Desvio padrão</td><td><strong>4,75</strong></td><td>0,82</td></tr>
        </tbody>
      </table>
      <p style="margin-top:8px; font-size:15px; font-weight: 700; color: var(--c-violet);">Mesma média (5), espalhamentos completamente diferentes — agora <em>quantificados</em>.</p>`
    ) +

    didaxBlock('paralelo', '💡',
      'Por que o desvio padrão é a medida-rainha',
      `<ul style="margin: 6px 0 0 18px; line-height: 1.7;">
        <li><strong>Usa todos os valores</strong> da amostra — diferente da amplitude.</li>
        <li>Volta à <strong>unidade original</strong> dos dados (mmHg, mg/dL, anos) — diferente da variância, que fica em "unidade²".</li>
        <li>É a <strong>medida natural de espalhamento</strong> em distribuições normais (curva gaussiana) — base de intervalos de confiança.</li>
      </ul>`
    ) +

    bancaCallout(
      `<strong>O que a banca quer testar:</strong> (1) que variância é a <em>média dos quadrados dos desvios</em>, dividida por (n−1) em amostras; (2) que <em>desvio padrão é a raiz quadrada da variância</em>; (3) que <strong>o desvio padrão é a medida de dispersão mais usada</strong> em estudos clínicos. Não cobra a conta — cobra o conceito.`
    ) +

    revisaoAtiva([
      { q: 'Por que elevamos os desvios ao quadrado antes de somar?', a: 'Porque a <strong>soma dos desvios em relação à média sempre dá zero</strong>. Quadratizando, todos viram positivos ("menos vezes menos dá mais"), e a soma deixa de ser zero.' },
      { q: 'Qual a fórmula da variância amostral?', a: '<strong>s² = Σ(x<sub>i</sub> − x̄)² / (n − 1)</strong>. Soma dos quadrados dos desvios dividida por <em>n − 1</em>.' },
      { q: 'Como obter o desvio padrão a partir da variância?', a: 'Tirando a <strong>raiz quadrada</strong>: s = √s². A raiz desfaz o quadrado e devolve a medida na <em>unidade original</em> dos dados.' }
    ]) +

    pageFooterMeta({
      resumo: '<strong>Variância = média dos quadrados dos desvios (÷ n−1).</strong> <strong>Desvio padrão = raiz da variância.</strong> Quadratizamos para escapar do zero; tiramos a raiz para voltar à unidade original.',
      proximaConexao: 'Página final do módulo: <strong>como a banca cobra centro × dispersão</strong>. Vamos treinar a separação conceitual no quiz e fechar o mapa mental.',
      nextId: 'm4-09'
    });

  renderStandard(c, p, body);
};

/* ─────────────────────────────────────────
   M4-09 — Como a banca cobra: centro × dispersão
───────────────────────────────────────── */
GO_RENDER['m4-09'] = function(c, p) {
  const body =
    pageHero({
      module: M4_MOD, moduleLabel: M4_LABEL, pageNum: '09',
      title: 'Como a banca cobra: separar centro de dispersão',
      lead: 'Na prova, muitas vezes cai o conceito — não a conta. Quem distingue tendência central de medida de dispersão acerta em segundos. Vamos consolidar com um mapa mental e cinco questões padrão.',
      grad: M4_GRAD
    }) +

    conceptHero({
      question: 'Como evitar o erro clássico de confundir centro com espalhamento na hora da prova?',
      title: 'Memorize os dois mapas mentais — depois acerte cinco questões sem hesitação.',
      lead: 'Tendência central: média, mediana, moda. Dispersão: amplitude, variância, desvio padrão. <strong>Centro não é espalhamento.</strong>',
      glow: 'rgba(245,158,11,.18)'
    }) +

    sectionTitle('🗺️', 'Mapa mental — duas colunas, dois grupos', 'm4') +

    `<div class="split-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin: 16px 0;">
      <div class="didax-block --estrutura">
        <div class="didax-block-title"><span class="ico">🎯</span>Tendência central — "onde está o grupo?"</div>
        <div class="didax-block-body">
          <ul class="tight">
            <li><strong>Média</strong> = soma ÷ n. Sensível a extremos.</li>
            <li><strong>Mediana</strong> = valor central da lista ordenada. Robusta.</li>
            <li><strong>Moda</strong> = valor mais frequente. Única que serve para qualitativas.</li>
          </ul>
        </div>
      </div>
      <div class="didax-block --paralelo">
        <div class="didax-block-title"><span class="ico">📏</span>Dispersão — "quão espalhado está o grupo?"</div>
        <div class="didax-block-body">
          <ul class="tight">
            <li><strong>Amplitude</strong> = maior − menor. Grosseira.</li>
            <li><strong>Variância (s²)</strong> = Σ(x<sub>i</sub> − x̄)² / (n − 1). Em unidade².</li>
            <li><strong>Desvio padrão (s)</strong> = √s². Medida-rainha, em unidade original.</li>
          </ul>
        </div>
      </div>
    </div>` +

    didaxBlock('hit', '⚡',
      'Frase-chave para levar para a prova',
      `<p style="font-size:17px; font-weight:700; color: var(--c-violet); text-align: center; padding: 12px;">"Centro não é espalhamento."</p>
      <p>Em toda questão de Bioestatística descritiva, identifique primeiro <strong>qual pergunta o enunciado faz</strong>: ele quer saber onde está o grupo (centro) ou quão homogêneo ele é (dispersão)? Essa pergunta sozinha elimina metade das alternativas.</p>`
    ) +

    sectionTitle('🎯', 'Treino de banca — 5 questões padrão', 'm4') +

    PrevInt.quizBanca([
      {
        stem: 'Em um estudo, foram avaliadas as seguintes idades (anos) de 6 pacientes: 110, 80, 75, 90, 110, 75. Qual o valor da <strong>mediana</strong>?',
        options: ['75', '80', '85', '90', '95'],
        correct: 2,
        explanation: 'Passo zero: <strong>ordenar</strong> → 75, 75, 80, 90, 110, 110. Como <em>n</em> = 6 (par), a mediana é a média dos dois centrais: (80 + 90) / 2 = <strong>85</strong>. As alternativas 80 e 90 capturam quem esqueceu de fazer a média entre os dois centros.',
        tip: 'Pediu mediana? Ordena primeiro. Par tem dois centros — média dos dois.'
      },
      {
        stem: 'Na mesma amostra (75, 75, 80, 90, 110, 110), qual a <strong>moda</strong>?',
        options: ['75', '90', '110', '75 e 110 (bimodal)', 'Amodal'],
        correct: 3,
        explanation: 'O valor 75 aparece 2 vezes; o valor 110 aparece 2 vezes; nenhum outro aparece mais. Empate na maior frequência → distribuição <strong>bimodal</strong>, com modas 75 e 110.',
        tip: 'Moda pode ser dupla, tripla ou inexistente — e a banca adora explorar esse esquecimento.'
      },
      {
        stem: 'Qual das opções abaixo é uma <strong>medida de dispersão</strong>?',
        options: ['Média', 'Mediana', 'Moda', 'Amplitude', 'Percentil 50'],
        correct: 3,
        explanation: 'Amplitude = maior − menor é a única opção da lista que mede <strong>espalhamento</strong>. Média, mediana e moda são medidas de tendência central; percentil 50 é apenas outro nome para a mediana.',
        tip: 'Centro não é espalhamento. Em prova, antes de calcular, classifique cada termo nessas duas colunas.'
      },
      {
        stem: 'Dois alunos terminam o semestre com a mesma média 5,0. Aluno A teve notas 4, 5, 5, 6; Aluno B teve notas 0, 2, 8, 10. Qual a melhor maneira de descrever a diferença?',
        options: [
          'Eles tiveram desempenho idêntico, pois a média é igual.',
          'O aluno A teve maior desvio padrão.',
          'O aluno B teve maior desvio padrão, indicando maior dispersão.',
          'Ambos têm a mesma dispersão porque têm a mesma média.',
          'Sem mais dados, não dá para saber.'
        ],
        correct: 2,
        explanation: 'Mesma média não implica mesmo desempenho. Aluno A tem notas próximas (desvios −1, 0, 0, +1 → variância ≈ 0,67, DP ≈ 0,82). Aluno B tem notas dispersas (desvios −5, −3, +3, +5 → variância ≈ 22,6, DP ≈ 4,75). <strong>B tem maior desvio padrão → maior dispersão.</strong>',
        tip: 'Sempre que duas amostras tiverem a mesma média, a diferença mora na <em>dispersão</em>.'
      },
      {
        stem: 'Sobre a relação entre variância (s²) e desvio padrão (s), assinale a afirmativa CORRETA:',
        options: [
          'Desvio padrão é o quadrado da variância.',
          'Variância e desvio padrão têm sempre a mesma unidade.',
          'Desvio padrão é a raiz quadrada da variância e tem a mesma unidade dos dados originais.',
          'A variância é mais usada em estudos clínicos porque é mais intuitiva.',
          'Variância sempre vale zero quando a média vale zero.'
        ],
        correct: 2,
        explanation: 's = √s². Como s² fica em "unidade²" (mmHg², mg/dL²…), tirar a raiz devolve à unidade original — e por isso o <strong>desvio padrão</strong> é a medida mais usada em estudos clínicos para reportar dispersão.',
        tip: 'Variância para calcular, desvio padrão para relatar. A raiz é o que torna a métrica clinicamente legível.'
      }
    ], 'Como a banca cobra centro × dispersão') +

    bancaCallout(
      `<strong>Padrão de cobrança em residência:</strong> (1) lista <em>desordenada</em> + pergunta de mediana — testa o passo zero; (2) lista com empates → moda bimodal/trimodal; (3) "qual destas é medida de dispersão?" → separar centro de espalhamento; (4) duas amostras com mesma média → quem tem maior DP; (5) relação variância × desvio padrão (raiz e unidades). Domine esses cinco padrões e você ganha o módulo.`
    ) +

    revisaoAtiva([
      { q: 'Qual a frase-resumo que organiza todo o módulo?', a: '<strong>"Centro não é espalhamento."</strong> Tendência central responde "onde está o grupo?"; dispersão responde "quão espalhado ele está?". Toda análise descritiva exige as duas medidas.' },
      { q: 'No quiz, qual o padrão de erro mais comum em "qual é uma medida de dispersão?"', a: 'Marcar <strong>média, mediana ou moda</strong> — todas tendência central. A única medida de dispersão na lista típica é a <strong>amplitude</strong> (ou variância/DP, quando aparecem).' },
      { q: 'Por que duas amostras com a mesma média podem ter condutas clínicas opostas?', a: 'Porque a <strong>dispersão</strong> (variância/desvio padrão) pode ser muito diferente. Glicemia média 100 com DP 3 é estável; média 100 com DP 50 é caótica. <strong>Clínica decide pela dispersão, não pela média sozinha.</strong>' }
    ]) +

    sectionTitle('🔁', 'Fechando o anel — para onde voltar', 'm4') +

    `<p style="font-size:14px; color: var(--text-secondary); margin: 8px 0 12px;">Você completou os 4 módulos do Intensivão Preventiva. Antes da prova, vale revisitar as âncoras de cada módulo:</p>` +

    crossLink({
      module: 'm1', pageId: 'm1-13', variant: 'recap',
      label: 'Módulo 1 — Fechamento (gatilhos de prova)',
      hint: 'Painel de frases-âncora: SnNout, SpPin, paralelo×série, RV+ e RV−.'
    }) +
    crossLink({
      module: 'm2', pageId: 'm2-10', variant: 'recap',
      label: 'Módulo 2 — Fechamento (Sens/Esp × VPP/VPN)',
      hint: 'As quatro setas: ↑Sens → ↓FN → ↑VPN; ↑Esp → ↓FP → ↑VPP.'
    }) +
    crossLink({
      module: 'm3', pageId: 'm3-07', variant: 'recap',
      label: 'Módulo 3 — Fechamento (quatro reflexos da ROC)',
      hint: 'Maior AUC = maior acurácia; alto = sensível; esquerda = específico; direita = FP.'
    }) +

    pontoDeCostura({
      fromModule: 'm4', toModule: 'm4',
      fromTitle: 'Estatística descritiva (M4)',
      toTitle: 'Diagnóstico clínico (M1, M2, M3)',
      ponte: `<p>Repare como tudo conecta: a <strong>média e o desvio padrão</strong> que você acabou de formalizar são exatamente o que descreve as duas distribuições da ROC (sãos e doentes). A <strong>mediana</strong> resistente a outliers é a métrica que estudos clínicos com tempo de internação e custo hospitalar usam. A <strong>moda</strong> bimodal é o sinal de que existem dois subgrupos — exatamente como uma curva ROC com dois pontos ótimos.</p>
      <p>Estatística descritiva não é um capítulo separado: é o <em>chão</em> sobre o qual diagnóstico, prevalência e curvas são construídos.</p>`,
      links: []
    }) +

    pageFooterMeta({
      resumo: 'Tendência central (média, mediana, moda) responde <em>onde</em>; dispersão (amplitude, variância, desvio padrão) responde <em>quão espalhado</em>. <strong>Centro não é espalhamento</strong> — separe os dois e a banca não te alcança.',
      proximaConexao: 'Você concluiu o <strong>Módulo 4</strong> e o eixo descritivo do Intensivão Preventiva. A partir daqui, retomamos os módulos anteriores em revisão integrada — ou seguimos para os próximos blocos de Bioestatística (testes de hipóteses, intervalos de confiança), conforme o plano editorial.',
      nextId: null
    });

  renderStandard(c, p, body);
};
