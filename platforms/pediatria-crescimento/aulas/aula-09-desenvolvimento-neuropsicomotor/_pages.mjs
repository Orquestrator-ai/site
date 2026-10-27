/* _pages.mjs — conteúdo autoral das 13 páginas da Aula 09 "Desenvolvimento neuropsicomotor"
   (Pediatria Bauer · NÚCLEO · domínio NOVO/independente — sem link-back cross-aula com a 08).
   Texto-aluno = canon do prompt-final (§6), renderizado VERBATIM. Tópicos visíveis =
   <h3 class="topic-h">. Anti-metalinguagem: voz de professor direto ao aluno (Caderneta/MS e Nelson
   são referências bibliográficas/instrumentos citáveis — o eixo do conteúdo é a divergência MS×Nelson,
   NÃO metalinguagem de aula; "Júlia" não vaza). Aberturas E1-E8 conforme o plano (anti-monotonia).
   SVGs de piso (S-*, silhueta neutra sem rosto) + 1 herói (P13 mapa-mestre) embutidos inline.
   Imagens reais (Caderneta/MS + pranchas de atlas — zero foto de menor) em layout SPLIT; onde a
   busca ficou inconclusiva, pendingReal() planta marcador honesto e visível (P1, P2, P4, P5, P10).
   INSTRUMENTO DOS MARCOS = objeto persistente (tabela viva, componente-Executor): nasce vazio na P3,
   hidrata faixa a faixa (P4-P8) e recebe os 3 casos plotados na P11. Quiz gold (explica TODAS as
   alternativas) fiel ao prompt-final. Eixo cromático: adequado=verde · alerta=âmbar · provável
   atraso=coral · MS=teal (primária) × Nelson=índigo (contraponto). */

export function buildPages({ med, medSplit, pendingReal, svgPiso, svgHero, notaBanca, notaValor, cmp,
  collapsible, recall, quiz, tag, chips, page, cardCluster, alertCard, flow, forkFlow, naoConfunda,
  divCard, checklistOpener, escada, trilhaReflexos, semaforo, tabelaViva }) {
  const P = [];

  /* ===================== PÁGINA 1 — E1 Pergunta central ===================== */
  // Página 1 — Estratégia: E1 — Pergunta central
  P.push(page('p1', 1, `
    ${tag('metodo', 'Moldura · qualitativo ≠ quantitativo')}
    ${chips(['medir × julgar', '3 frentes · a prova quer 2', 'marcos + reflexos', 'prova × vida real'])}

    <section class="opener opener--question" aria-label="Pergunta de abertura">
      <span class="opener__question-mark" aria-hidden="true">?</span>
      <p class="opener__text">Pôr uma criança na balança e na régua e dizer "está crescendo bem" é quase mecânico: tem número, tem percentil, tem curva. Mas olhar para a mesma criança e afirmar "está se desenvolvendo bem" é incomparavelmente mais difícil. <strong>Por quê?</strong> Porque não há régua. Avaliar desenvolvimento é uma avaliação <span class="term">qualitativa</span>, não quantitativa — e é justamente essa diferença que transforma um julgamento aparentemente simples no ponto mais sutil da consulta de puericultura.</p>
    </section>

    <h1 class="page-title">Crescer tem número. Desenvolver não — e é aí que mora a dificuldade.</h1>

    ${pendingReal({
      rid: 'R1',
      titulo: 'folha de rosto do Instrumento de Vigilância do Desenvolvimento (Caderneta de Saúde da Criança / Ministério da Saúde)',
      oque: 'Reprodução da folha oficial do Instrumento de Vigilância do Desenvolvimento (Caderneta MS) — o documento que estrutura o tema.',
      body: 'O instrumento que a banca cita literalmente vive <strong>dentro da Caderneta de Saúde da Criança</strong> (o "livrinho da criança") — não é "só o cartão de vacina". É a folha oficial com as tabelas de marcos por idade. Reconhecer esse documento é metade da resposta: muitas questões abrem citando "o instrumento que integra a caderneta".'
    })}

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">Medir é pôr na régua; julgar é outra coisa</h3>
        <p>Toda consulta de rotina da criança acompanha duas coisas em paralelo: o <span class="term">crescimento</span> (peso, estatura, perímetro cefálico — quantitativo, comparável a uma curva) e o <span class="term">desenvolvimento</span> (a aquisição progressiva de novas habilidades — qualitativo). A avaliação do desenvolvimento é <strong>infinitamente mais complexa</strong> que a do crescimento, e a razão é estrutural: crescimento se mede; desenvolvimento se <strong>interpreta</strong>. Não é só verificar "com quantos meses a criança senta ou anda" — é olhar vários aspectos em conjunto e decidir se uma habilidade ou um reflexo está <span class="hl-warn">presente ou ausente</span>, decisão que, na beira do leito, é genuinamente difícil. Decidir se um reflexo apareceu, se um movimento conta como o marco esperado, se aquele sorriso é o sorriso que importa — nada disso vem com um número na tela.</p>

        <h3 class="topic-h">Três frentes do acompanhamento — e as duas que a prova quer</h3>
        <p>O acompanhamento do desenvolvimento tem <span class="term">três frentes</span>. A primeira é o <span class="term">exame neurológico</span> da criança — avaliação de <strong>força, tônus e, dentro do possível, coordenação</strong> —, feito em qualquer fase, do recém-nascido ao lactente. A segunda é a verificação dos <span class="term">marcos do desenvolvimento</span>: ao longo dos primeiros anos, a criança vai progressivamente alcançando a capacidade de realizar novas funções, e cada faixa etária tem seus marcos esperados. A terceira é a avaliação dos <span class="term">reflexos primitivos</span>. Das três, a prova foca <strong>duas</strong>: os <span class="hl-good">marcos do desenvolvimento</span> — o mais importante, sem sombra de dúvida — e os <span class="hl-good">reflexos primitivos</span>. O exame neurológico detalhado não é aprofundado nas questões. Guarde esse recorte: é nos marcos e nos reflexos que a banca trabalha.</p>

        <h3 class="topic-h">Por que a prova é mais gentil que a vida real</h3>
        <p>Há uma boa notícia para quem estuda. Na vida real, surgem dúvidas o tempo todo — identificar alterações finas do exame neurológico, decidir entre presente e ausente num caso ambíguo. Na <strong>prova</strong>, a história é mais simples e objetiva: o enunciado costuma dizer com todas as letras o que a criança faz e o que não faz, e o trabalho passa a ser puramente o de <span class="term">classificar</span> — cruzar o que foi descrito com o que se espera para aquela idade. Isso muda a estratégia de estudo: o que se cobra não é a perícia clínica de reconhecer um marco titubeante, e sim <strong>saber o que é esperado em cada faixa etária</strong> e aplicar a regra. É um tema que se domina com método, não com sorte.</p>
      </div>
    </div>

    ${svgPiso('s-mapa3frentes', { caption: 'o mapa conceitual das três frentes do acompanhamento — exame neurológico (apagado, não cobrado a fundo) × marcos do desenvolvimento × reflexos primitivos (os dois realçados, porque é onde a banca trabalha). Sem figura de criança: é organização de conceito.', hint: 'Toque num ramo para realçar a frente; os dois ramos vivos são marcos e reflexos.' })}

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>A consulta de puericultura é onde o atraso do desenvolvimento é flagrado cedo — ou perdido. Saber que existem três frentes, que a prova mira duas, e que o instrumento oficial está dentro da Caderneta (não é "só o cartão de vacina") é o que transforma uma avaliação vaga ("a criança parece bem") numa avaliação estruturada e defensável.</p>
    </aside>

    ${quiz('p1', 'A moldura qualitativo × quantitativo e o recorte da prova (marcos + reflexos).', [
      {
        stem: 'Na consulta de puericultura, por que a avaliação do desenvolvimento é considerada mais difícil que a do crescimento?',
        alts: [
          { t: 'Porque o desenvolvimento exige exames laboratoriais que o crescimento dispensa', correct: false, why: 'O desenvolvimento NÃO se baseia em laboratório — baseia-se em observação de habilidades. Por que cair na A: confunde "difícil" com "precisa de exame caro"; aqui a dificuldade é interpretativa, não tecnológica.' },
          { t: 'Porque o crescimento é quantitativo (mede-se e compara-se à curva) e o desenvolvimento é qualitativo (interpreta-se presença/ausência de habilidades)', correct: true, why: 'Certa. A dificuldade não vem de mais tecnologia, e sim da natureza do dado: peso/estatura/PC caem numa régua e num percentil; "sentou? sorriu? localizou o som?" exige um julgamento de presente × ausente que a balança não dá. Por isso a banca cobra o método, não a perícia de beira de leito.' },
          { t: 'Porque o crescimento só é avaliado em recém-nascidos e o desenvolvimento ao longo da vida toda', correct: false, why: 'Ambos são avaliados ao longo da vida toda, e o exame de desenvolvimento se faz desde o recém-nascido. Por que cair na C: inverte os fatos — quem se avalia "a vida toda" é o desenvolvimento, não o oposto.' },
          { t: 'Porque o desenvolvimento não tem instrumento padronizado de avaliação', correct: false, why: 'Existe instrumento padronizado — o Instrumento de Vigilância da Caderneta (MS). Por que cair na D: a ausência de "régua" (qualitativo) é confundida com ausência de instrumento; o instrumento existe, ele só avalia qualitativamente.' },
        ]
      },
      {
        stem: 'Das três frentes do acompanhamento do desenvolvimento, quais são as duas que concentram o foco das provas?',
        alts: [
          { t: 'Exame neurológico detalhado e marcos do desenvolvimento', correct: false, why: 'Inclui o exame neurológico detalhado, justamente a frente NÃO aprofundada em prova. Por que cair: parece "mais completo/mais médico" incluir o exame neuro — mas a banca trabalha onde há critério objetivo (marco esperado por idade).' },
          { t: 'Marcos do desenvolvimento e reflexos primitivos', correct: true, why: 'Certa. As três frentes são exame neuro, marcos e reflexos; a prova prioriza marcos (o mais importante) e reflexos primitivos. O exame neurológico detalhado existe e é feito, mas não é o que se aprofunda nas questões.' },
          { t: 'Reflexos primitivos e exame neurológico detalhado', correct: false, why: 'Inclui o exame neurológico detalhado, que não é o foco. Por que cair: mesmo viés de achar que o exame neuro fino "conta" mais para a banca.' },
          { t: 'Crescimento pôndero-estatural e marcos do desenvolvimento', correct: false, why: 'Mistura crescimento (outra avaliação, quantitativa) com desenvolvimento. Por que cair na D: o enunciado fala das frentes do desenvolvimento; crescimento é o eixo paralelo, não uma frente do desenvolvimento.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 2 — E7 Comparação chocante ===================== */
  // Página 2 — Estratégia: E7 — Comparação chocante
  P.push(page('p2', 2, `
    ${tag('metodo', 'As 2 leis · crânio-caudal')}
    ${chips(['4 áreas', 'sequencial · não pula etapa', 'crânio-caudal', 'cabeça → tronco → pernas'])}

    <section class="opener opener--vs" aria-label="Comparação de abertura">
      <div class="opener__vs-grid">
        <div class="opener__vs-side">
          <p class="opener__vs-side-label">A criança SEMPRE</p>
          <p>sustenta a cabeça <strong>antes</strong> de sentar, e senta <strong>antes</strong> de andar</p>
        </div>
        <div class="opener__vs-divider" aria-hidden="true">vs</div>
        <div class="opener__vs-side">
          <p class="opener__vs-side-label">A criança NUNCA</p>
          <p>anda primeiro e segura a cabeça depois</p>
        </div>
      </div>
      <p class="opener__vs-asterisk">Isso não é coincidência nem "cada um no seu tempo": é uma <strong>lei</strong> do desenvolvimento, com nome e direção. Entender por que essa ordem é inviolável é entender o fio que organiza todo o primeiro ano de vida.</p>
    </section>

    <h1 class="page-title">A criança não escolhe a ordem — a cabeça vai na frente, sempre.</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">Do "não fazia nada" ao pequeno ser humano: as 4 áreas</h3>
        <p>No início, o recém-nascido essencialmente respira, chora, evacua e urina. Ao final do <span class="term">primeiro ano</span>, esse mesmo bebê virou um pequeno ser humano capaz de várias funções: já faz o <strong>movimento de pinça</strong> e já <strong>anda, ainda que com apoio</strong>. Para organizar esse salto, as habilidades são tradicionalmente separadas em <span class="term">quatro grandes áreas</span>. <strong>(1) Motor grosseiro</strong> — locomoção e grandes grupamentos musculares: ficar sentado, andar, andar de triciclo. <strong>(2) Fino ou adaptativo</strong> — habilidades manuais: usar as mãos, fazer desenhos. <strong>(3) Pessoal-social</strong> — como a criança interage com o que a cerca, primeiro com a família, depois com grupos sociais cada vez maiores. <strong>(4) Linguagem</strong> — área superimportante; avaliar na vida real não é simples, mas na prova dá para entender o que importa. Toda faixa etária é avaliada nessas quatro áreas em paralelo.</p>

        <h3 class="topic-h">A 1ª lei: sequencial, previsível, não pula etapa</h3>
        <p>O primeiro conceito a guardar: o desenvolvimento é um processo <span class="term">sequencial e previsível</span>. Desenvolver-se significa adquirir a capacidade de realizar funções cada vez <strong>mais complexas</strong> — a cada etapa, a criança consegue algo mais difícil que o da etapa anterior. Existe um nível de <strong>complexidade crescente</strong>, e é por isso que o processo é sequencial, previsível e <span class="term">não pula etapas</span>. A criança nunca leva um objeto à boca sem antes ter aprendido a agarrá-lo; nunca transfere de uma mão para a outra sem antes ter segurado. Essa previsibilidade é o que torna o tema "decorável com lógica": se você sabe a ordem, sabe o que vem antes e o que vem depois de qualquer marco. (Há <span class="hl-warn">uma única exceção</span> famosa a essa sequência fixa — e ela aparece mais adiante, no marco do <span class="hl-warn">engatinhar</span>.)</p>

        <h3 class="topic-h">A 2ª lei: crânio-caudal — a cabeça lidera</h3>
        <p>A segunda lei dá a <strong>direção</strong> do desenvolvimento motor: ele é <span class="term">crânio-caudal</span> (céfalo-caudal) — começa na cabeça e desce em direção aos membros inferiores. A criança primeiro desenvolve <strong>força, coordenação e tônus da cabeça</strong>, depois do <strong>tronco</strong>, depois dos <strong>membros inferiores</strong>. Daí a ordem inviolável: <span class="hl-good">sustenta a cabeça → senta → anda</span>. É exatamente por isso que a abertura desta página é uma lei, e não acaso: a perna só "funciona" depois que cabeça e tronco já estão prontos. Guardar o crânio-caudal é guardar a "historinha" que toda criança vive no primeiro ano — o fio que organiza, em ordem, cada um dos marcos que vêm a seguir.</p>
      </div>
    </div>

    ${notaValor('<strong>"Cabeça antes do tronco antes das pernas."</strong> Sustenta a cabeça → senta → anda. Toda a sequência motora do primeiro ano cabe nessa frase — e ela é a regra crânio-caudal em linguagem de bolso.')}

    ${cardCluster([
      { icon: '🦵', tone: 'central', title: 'Motor grosseiro', body: 'Locomoção e grandes grupos musculares: ficar sentado, andar, andar de triciclo.' },
      { icon: '✋', tone: 'central', title: 'Fino / adaptativo', body: 'Habilidades manuais: usar as mãos, fazer a pinça, desenhar.' },
      { icon: '🙂', tone: 'central', title: 'Pessoal-social', body: 'Como a criança interage com o que a cerca — família primeiro, depois grupos.' },
      { icon: '💬', tone: 'central', title: 'Linguagem', body: 'Área superimportante; do choro à primeira palavra com significado.' },
    ], '4')}

    ${svgPiso('s-4areas', { caption: 'as 4 áreas do desenvolvimento, uma por card-ícone, cada uma com um exemplo curto: motor (locomoção) · fino-adaptativo (a mão) · pessoal-social (a interação) · linguagem (a fala). Ícones esquemáticos, sem realismo de criança.', hint: 'Toque numa área para ver seu exemplo.' })}

    ${svgPiso('s-craniocaudal', { caption: 'o eixo crânio-caudal numa silhueta neutra de bebê (sem rosto): a seta desce da cabeça (zona 1, sustenta a cabeça) ao tronco (zona 2, senta) aos membros inferiores (zona 3, anda). A direção do desenvolvimento — geometria, não retrato.', hint: 'A numeração 1→2→3 acompanha a seta dominante: a cabeça lidera.' })}

    ${pendingReal({
      rid: 'R2',
      titulo: 'prancha de atlas/livro-texto de pediatria: progressão postural motora (decúbito → eleva a cabeça → senta → engatinha → anda)',
      oque: 'Prancha clássica de atlas pediátrico com a progressão postural motora em sequência ilustrada de referência.',
      body: 'A sequência postural ilustrada — <strong>decúbito → eleva a cabeça → senta → engatinha → anda</strong> — é o crânio-caudal em imagem: cada quadro só acontece depois que o anterior amadureceu. O esquema autoral ao lado já entrega a direção; a prancha de atlas (não foto de menor) reforçaria o reconhecimento da sequência.'
    })}

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>Saber as 4 áreas evita avaliar só o motor (erro comum) e esquecer linguagem e social, que são onde muitos atrasos aparecem primeiro. E o crânio-caudal não é decoreba: é o que permite <strong>prever</strong> e <strong>deduzir</strong> marcos — se a criança ainda não firmou o tronco, é fisiologicamente impossível que ande, e cobrar isso é cobrar a lei, não a tabela.</p>
    </aside>

    ${quiz('p2', 'As 4 áreas e as 2 leis (sequencial/não-pula × crânio-caudal).', [
      {
        stem: 'Uma mãe relata que o filho "já dá uns passos com apoio, mas ainda não firma bem a cabeça quando puxado para sentar". Por que esse relato deve gerar desconfiança imediata?',
        alts: [
          { t: 'Porque andar com apoio só é esperado após os 18 meses', correct: false, why: 'Andar com apoio é esperado por volta de 10-12m, não "após 18m". Por que cair na A: troca o foco da lei (ordem) por um número de idade decorado e errado.' },
          { t: 'Porque viola a lei crânio-caudal: a sustentação da cabeça precede o andar, nunca o contrário', correct: true, why: 'Certa. O desenvolvimento motor é crânio-caudal — cabeça → tronco → pernas. Uma criança que "anda com apoio" mas "não firma a cabeça" estaria com a perna pronta antes da cabeça, fisiologicamente impossível no desenvolvimento normal. É exatamente esse tipo de incoerência que a banca planta.' },
          { t: 'Porque firmar a cabeça é um reflexo primitivo, não um marco motor', correct: false, why: 'Sustentar a cabeça é marco motor (controle de tônus cervical), não reflexo primitivo. Por que cair na C: confunde os dois eixos da aula (marcos × reflexos), que são distintos.' },
          { t: 'Porque a criança deveria estar andando sem apoio nessa fase', correct: false, why: 'O problema não é "deveria andar mais" — é a ordem invertida. Por que cair na D: fixa-se no marco motor avançado e ignora que o pré-requisito (cabeça) está ausente.' },
        ]
      },
      {
        stem: 'Qual afirmação descreve corretamente a natureza do processo de desenvolvimento?',
        alts: [
          { t: 'É variável e imprevisível — cada criança segue uma ordem própria de aquisições', correct: false, why: 'O ponto central da aula é o oposto — a previsibilidade é o que torna o tema "decorável com lógica". Por que cair na A: a frase "cada um no seu tempo" do senso comum seduz, mas vale para o ritmo, não para a ordem.' },
          { t: 'É sequencial e previsível, de complexidade crescente, e não pula etapas — com a única exceção do engatinhar', correct: true, why: 'Certa. O desenvolvimento é sequencial, previsível e de complexidade crescente — nunca uma função mais difícil antes de outra mais simples. A ressalva honesta (e cobrada): o engatinhar é a única etapa que nem toda criança normal realiza.' },
          { t: 'É sequencial, mas pode pular etapas quando a criança é estimulada precocemente', correct: false, why: 'Estímulo não faz pular etapa; a sequência de complexidade se mantém. Por que cair na C: superestima o efeito do estímulo precoce, mito comum.' },
          { t: 'Segue sentido caudal-cranial: as pernas amadurecem antes da cabeça', correct: false, why: 'O sentido é crânio-caudal (cabeça primeiro), não o inverso. Por que cair na D: inverte a direção — pegadinha direta da lei.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 3 — E5 Meta + checklist · TABELA VIVA NASCE ===================== */
  // Página 3 — Estratégia: E5 — Meta da página + checklist
  P.push(page('p3', 3, `
    ${tag('metodo', 'A ferramenta-mestre · a tabela viva nasce')}
    ${chips(['mesma habilidade, idades diferentes', 'leitura em 5 passos', 'faltou? faixa anterior', 'faixas que alargam'])}

    ${checklistOpener('Ao final desta página você vai saber:', [
      'Por que a mesma habilidade ausente é inofensiva numa idade e grave em outra',
      'O gesto de leitura da tabela em 5 passos (idade → coluna → quadradinhos → P → faixa anterior)',
      'Quando parar de avaliar e quando "voltar uma faixa"',
      'Por que as faixas etárias começam estreitas (1 mês) e vão alargando (3 em 3 meses)',
    ])}

    <h1 class="page-title">Uma tabela, quatro quadradinhos e uma regra: o método que resolve quase toda questão.</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">A faixa etária muda tudo: o mesmo "não senta" inocente ou grave</h3>
        <p>Comece pelo raciocínio que dá sentido à tabela inteira. Um bebê de <strong>dois meses</strong> que ainda não senta — você se preocupa? <span class="hl-good">Não.</span> Uma criança de <strong>cinco anos</strong> que ainda não senta — você se preocupa? <span class="hl-bad">Evidentemente que sim.</span> A habilidade é a mesma ("não senta"); o que muda tudo é a <span class="term">faixa etária</span>. Uma habilidade pode estar ausente aos seis meses sem significado nenhum e, a <strong>mesma</strong> habilidade ausente em criança de um ano, sinalizar doença neurológica subjacente. Por isso não existe avaliar desenvolvimento "no geral" — existe avaliar <strong>contra a idade</strong>. A principal referência usada pelas bancas nos últimos anos é o <span class="term">Instrumento de Vigilância do Desenvolvimento</span>, presente na <span class="term">Caderneta de Saúde da Criança</span>. Vale uma correção de imagem: a Caderneta ("o livrinho da criança") é <strong>muito mais</strong> que cartão de vacina — a vacina é uma parte pequena dela; uma de suas funções centrais é fornecer o instrumento de avaliação do desenvolvimento, com tabelas de marcos ao longo dos primeiros anos.</p>

        <h3 class="topic-h">A mecânica de leitura em 5 passos</h3>
        <p>A tabela é dividida por faixas (do nascimento aos 6 meses; dos 6 meses ao fim do 2º ano; depois o 3º ano). A leitura é sempre a mesma:</p>
        <p><strong>Passo 1 —</strong> Busque <strong>no topo</strong> a idade da criança <strong>em meses</strong>.<br>
        <strong>Passo 2 —</strong> Desça pela coluna da idade até encontrar um <strong>conjunto de quadradinhos de cor diferente</strong>, posicionados <strong>imediatamente à esquerda</strong> da linha da idade.<br>
        <strong>Passo 3 —</strong> Esse conjunto representa as <strong>quatro grandes habilidades</strong> (os quatro marcos) a pesquisar naquela criança — um por área. (Em cada idade acontece muito mais do que está na tabela, mas o instrumento é representativo do <strong>mais importante</strong> de cada faixa.)<br>
        <strong>Passo 4 —</strong> Marco presente? Registra-se <span class="hl-good">"P" de presente</span> na caderneta. Se a criança tem <strong>todos</strong> os marcos da própria faixa presentes, <strong>encerra-se</strong> — não é necessário avaliar o que vem depois (pode-se, mas não precisa). Avalia-se o que está na faixa etária da criança.<br>
        <strong>Passo 5 (a regra-mestre) —</strong> Se a criança <strong>NÃO faz tudo</strong> o esperado para a idade dela, então se avalia a <span class="hl-warn">faixa etária anterior</span> — o conjunto de quadradinhos coloridos imediatamente à esquerda do conjunto do paciente. A presença/ausência dos marcos da faixa própria <strong>e/ou</strong> da anterior é o que permite classificar o desenvolvimento como adequado, alerta ou provável atraso (detalhado adiante).</p>

        <h3 class="topic-h">Por que as faixas vão ficando mais largas</h3>
        <p>No início da vida, cada faixa corresponde a <strong>apenas um mês</strong> (até 1 mês; até 2 meses). Depois, as faixas passam a abranger intervalos: existe uma faixa de <strong>3 a 4 meses</strong> — quem tem 3 avalia os mesmos marcos de quem tem 4. Avançando até o fim do 2º ano, os saltos passam a ser de <strong>três em três meses</strong> (7, 8 e 9 meses avaliam sempre os mesmos quatro marcos). Faz sentido o salto aumentar: o surgimento de novos marcos é <strong>mais intenso no primeiro ano</strong> e vai rareando depois. O que importa para a prova é simples de enunciar e difícil de dominar: <strong>saber o que é esperado em cada faixa etária</strong>. Tradicionalmente os marcos são mostrados até os 12 meses, mas aqui o conteúdo avança até <strong>15 meses</strong>, porque há questão aberta que cobra as habilidades da Caderneta até essa idade.</p>
      </div>
    </div>

    ${notaValor('<strong>Marco presente? Olhe a faixa atual. Faltou algum? Olhe a faixa anterior.</strong> Esse único movimento — atual primeiro, anterior só se algo falhou — é o motor de toda classificação do desenvolvimento. E a tabela é sua amiga: o tema se faz <strong>com ela aberta do lado</strong>, não de cabeça.')}

    ${flow('a mecânica de leitura do Instrumento, do topo à classificação.', [
      { kind: 'node', tone: 'central', label: 'Localize a idade (em meses) no topo' },
      { kind: 'node', tone: 'central', label: 'Desça a coluna até os quadradinhos coloridos à esquerda' },
      { kind: 'node', tone: 'central', label: 'Avalie os 4 marcos; presente = marca "P"' },
      { kind: 'decision', label: 'Todos os marcos presentes?' },
      { kind: 'node', tone: 'good', label: 'SIM → encerra (não precisa avaliar o que vem depois)' },
      { kind: 'node', tone: 'warn', label: 'NÃO → avalie a FAIXA ETÁRIA ANTERIOR → segue para a classificação' },
    ])}

    <p class="prose-lead">Aqui nasce o objeto que vai te acompanhar do começo ao fim — o <strong>Instrumento dos Marcos</strong>. Ele aparece com a faixa de 1-2 meses já visível, e vai sendo preenchido faixa a faixa à medida que cada idade é estudada. Toque numa idade para treinar a leitura: a coluna realça, e a faixa imediatamente à esquerda também — exatamente o gesto do Passo 5.</p>

    ${tabelaViva('p3', {
      faixaAtiva: '2m',
      filled: ['1m', '2m'],
      caption: 'a tabela viva dos marcos NASCE aqui — só a faixa 1-2 meses preenchida; as demais ficam "a preencher" até serem hidratadas faixa a faixa. Toque numa idade para realçar os 4 quadradinhos da faixa e a faixa imediatamente à esquerda.',
      hint: 'É o mesmo objeto reusado em todas as páginas de marcos — e que, no fim, recebe os 3 casos plotados.'
    })}

    ${medSplit({
      file: 'r3-tabela-instrumento-0-6m.png',
      alt: 'Tabela oficial da Caderneta da Criança (Ministério da Saúde) com os marcos do desenvolvimento do nascimento aos 6 meses, com a grade de idade no topo e os quadradinhos coloridos por faixa; setas de cueing apontam "idade no topo" e "quadradinhos à esquerda".',
      titulo: 'Tabela real do Instrumento (Caderneta MS, 0-6 meses)',
      achado: 'a folha oficial da Caderneta com a grade de idade no topo e os <strong>quadradinhos coloridos por faixa</strong> à esquerda — o documento que a banca cita literalmente.',
      fonte: 'Ministério da Saúde / BVS-MS, Caderneta da Criança: Menino — Passaporte da Cidadania, 7ª ed., 2024, p. 81 (recorte com cueing)',
      licenca: 'CC BY-NC-SA 4.0', light: true, side: 'right', lic: 'nc',
      body: 'Conecte a folha real à leitura em cinco passos: primeiro localize a <strong>idade em meses no topo</strong>; depois encontre os <strong>quadradinhos coloridos da faixa</strong>; leia o marco na coluna da esquerda; registre P, A ou NV. O achado pedagógico está na <strong>grade de idade e nos blocos coloridos</strong>, não apenas no nome do marco. Esta é a matriz de marcos por idade — não o instrumento de classificação/conduta da página seguinte.'
    })}

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>Quase toda questão de desenvolvimento se resolve por este algoritmo. Quem não tem a mecânica tenta decorar marcos soltos e erra; quem tem a mecânica lê o enunciado, localiza a idade, confere os quatro marcos e classifica. É a diferença entre "achar" e "saber".</p>
    </aside>

    ${quiz('p3', 'A mecânica de leitura e a regra-mestre (faltou → faixa anterior).', [
      {
        stem: 'Ao aplicar o Instrumento dos Marcos numa criança e constatar que ela não realiza uma das habilidades esperadas para a faixa etária atual, qual é o próximo passo correto na leitura da tabela?',
        alts: [
          { t: 'Encerrar a avaliação e classificar imediatamente como provável atraso', correct: false, why: 'Falhar na faixa atual ainda não é provável atraso — pode ser só alerta; o provável atraso exige falha na faixa anterior. Por que cair na A: salta direto para a conduta mais grave sem completar a leitura.' },
          { t: 'Avaliar as habilidades da faixa etária imediatamente anterior', correct: true, why: 'Certa. A regra-mestre: faz tudo da faixa atual → encerra; faltou algo → olha a faixa anterior. É a faixa anterior que separa "alerta" (faz a anterior) de "provável atraso" (falha também na anterior).' },
          { t: 'Avaliar as habilidades da próxima faixa etária para ver se ela "compensa"', correct: false, why: 'Nunca se "compensa" olhando a frente; a tabela só anda para trás quando há falha. Por que cair na C: aplica uma lógica de "média" que não existe no instrumento.' },
          { t: 'Repetir a avaliação dos mesmos marcos em 30 dias antes de qualquer conduta', correct: false, why: 'Reavaliar em 30 dias é a conduta do alerta, não o passo de leitura da tabela. Por que cair na D: mistura o passo de leitura com a conduta (que só se define depois de classificar).' },
        ]
      },
      {
        stem: 'Por que a mesma habilidade ausente pode ser irrelevante numa idade e sinal de doença em outra?',
        alts: [
          { t: 'Porque a tabela da Caderneta só vale até os 6 meses', correct: false, why: 'A tabela cobre vários anos (0-6m, 6m-2anos, 3º ano). Por que cair na A: confunde a estrutura por faixas com um limite de validade do instrumento.' },
          { t: 'Porque o que determina o significado da ausência é a faixa etária — cada marco tem uma idade-limite esperada', correct: true, why: 'Certa. Não senta aos 2 meses = normal; não senta aos 5 anos = grave. A habilidade é a mesma; a idade carrega o significado. Toda a lógica do instrumento é "esperado para esta faixa".' },
          { t: 'Porque habilidades motoras importam, mas habilidades de linguagem não', correct: false, why: 'As 4 áreas importam, inclusive a linguagem (área "superimportante"). Por que cair na C: viés de achar que só o motor "conta" como desenvolvimento.' },
          { t: 'Porque a ausência só é valorizada se houver, junto, alteração do exame neurológico', correct: false, why: 'A ausência de marco já classifica por si — não depende de exame neuro alterado (que nem é a frente aprofundada). Por que cair na D: tenta tornar o marco "menos confiável" do que ele é no instrumento.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 4 — E7 Comparação chocante · 1-2 meses ===================== */
  // Página 4 — Estratégia: E7 — Comparação chocante
  P.push(page('p4', 4, `
    ${tag('trap', '1-2 meses · a 1ª divergência MS×Nelson')}
    ${chips(['PTC (esgrimista deitado)', 'reage ≠ localiza o som', 'sorriso social 2m × espontâneo 1m', 'abre as mãos · vocaliza'])}

    <section class="opener opener--vs" aria-label="Comparação de abertura">
      <div class="opener__vs-grid">
        <div class="opener__vs-side">
          <p class="opener__vs-side-label">Caderneta (MS) · 2 meses</p>
          <p>sorriso <strong>social</strong> — quando estimulada, face a face</p>
        </div>
        <div class="opener__vs-divider" aria-hidden="true">vs</div>
        <div class="opener__vs-side">
          <p class="opener__vs-side-label">Nelson · 1 mês</p>
          <p>sorriso <strong>espontâneo</strong> — sozinho, do nada, sem ninguém estimulando</p>
        </div>
      </div>
      <p class="opener__vs-asterisk">Mesmo gesto, idades diferentes, referências diferentes — e confundir os dois é exatamente o que a prova quer. São, na verdade, <strong>dois marcos distintos</strong>, e a página inteira gira em torno de separá-los.</p>
    </section>

    <h1 class="page-title">Dois sorrisos, duas referências, dois meses diferentes — e a banca explora a confusão.</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">1 mês — postura tônico-cervical, fixa o rosto, reage (não localiza) o som</h3>
        <p><strong>Motor/postura (1m):</strong> o recém-nascido mantém <strong>pernas e braços fletidos</strong> e a <strong>cabeça lateralizada</strong> (para um lado ou outro). É o padrão de quem tem tônus e motor grosseiro adequados, e tem nome: <span class="term">postura tônico-cervical (PTC)</span> — presente durante <strong>todo o primeiro trimestre</strong> de vida. <strong>Motor (1m):</strong> em posição <strong>prona</strong> (de barriga para baixo), a criança já <strong>eleva a cabeça</strong> da superfície — coerente com o crânio-caudal: a cabeça vem primeiro, e por enquanto ela apenas <strong>eleva</strong> (ainda não sustenta plenamente). <strong>Pessoal-social/adaptativo (1m):</strong> o bebê <strong>fixa a visão</strong> e <strong>observa um rosto</strong>, com <strong>preferência pela face humana</strong>. <strong>Linguagem (1m):</strong> essencialmente <strong>chora</strong>, mas já <span class="term">reage a um som</span> — uma reação <strong>inespecífica</strong>. Testa-se posicionando-se atrás da cabeça e fazendo um barulho (palma, chocalho): a criança responde com <strong>mudança de expressão facial</strong> ou <strong>movimento inespecífico</strong>. Atenção à pegadinha: aos 1 mês a criança <span class="hl-warn">ainda NÃO localiza</span> o som — não se volta para a origem. Localizar vem mais adiante (5-6m).</p>

        <h3 class="topic-h">2 meses — o sorriso social que a banca adora</h3>
        <p><strong>Pessoal-social (2m):</strong> o marco-estrela — a criança <span class="term">sorri quando estimulada (sorriso social)</span>. E há regra de ouro contra a armadilha clássica: <span class="hl-warn">sorriso social ≠ cócegas</span>. Não vale fazer cosquinha nem apertar a bochecha. Tem que ficar <strong>de frente</strong> para a criança, <strong>falando e sorrindo</strong> para ela; ela devolve o <strong>sorriso social</strong> — a forma mais rica de interação social dessa idade. Se o examinador fez cócega, não testou o marco.</p>

        <h3 class="topic-h">A divergência-mestre: sorriso social (MS, 2m) × espontâneo (Nelson, 1m)</h3>
        <p>Aqui está a primeira divergência MS × Nelson, e ela <strong>é conteúdo de prova</strong>. A <span class="term">Caderneta (MS)</span> descreve o <strong>sorriso social aos 2 meses</strong> (quando estimulada). O <span class="term term--nelson">Nelson</span> descreve que, <strong>com 1 mês</strong>, a criança já tem <strong>sorriso espontâneo</strong> — o bebê quietinho, sozinho, do nada, sorri. Esse sorriso espontâneo <strong>nem aparece na Caderneta</strong>. Não são versões conflitantes do mesmo fato: são <strong>dois fenômenos diferentes</strong> em idades diferentes. Numa questão, se a referência for a Caderneta (o default das bancas), o sorriso é o <strong>social, dos 2 meses</strong>; se a alternativa falar em sorriso <strong>espontâneo aos 3 meses</strong>, está errada — o espontâneo é do <strong>1º mês</strong> (Nelson).</p>

        <h3 class="topic-h">2 meses — abre as mãos, vocaliza, movimenta os membros</h3>
        <p><strong>Fino/adaptativo (2m):</strong> a criança <strong>abre as mãos espontaneamente apenas em alguns momentos</strong>. Contexto: nos primeiros meses, por causa do <strong>reflexo de preensão palmar</strong> (apoia-se algo na palma e ela fecha a mão involuntariamente), o bebê passa grande parte do tempo com as mãozinhas fechadas. Em geral é a partir do <strong>fim do primeiro trimestre</strong> que ela abre as mãos voluntariamente — mas aos 2 meses <strong>já não pode estar com a mão fechada o tempo todo</strong>: em alguns momentos já abre. <strong>Linguagem (2m):</strong> surge um rudimento — a criança emite <strong>sons além do choro</strong> (com 1 mês era só choro); alguns chamam de <span class="term">vocalização</span> — sons principalmente <strong>vogais</strong>, um fonema diferente do choro. <strong>Motor (2m):</strong> está <strong>movimentando os membros</strong>. Vale registrar: a avaliação motora dos primeiros meses na Caderneta <strong>não é muito detalhada</strong> — mas é o que está caindo nas provas.</p>
      </div>
    </div>

    ${alertCard({ tone: 'warn', kicker: 'Pegadinha de prova', title: 'Reagir ao som (1m) NÃO é localizar o som (5-6m)', body: 'Aos 1 mês há só reação inespecífica (muda a expressão, se mexe); a criança <strong>não vira a cabeça</strong> para a fonte. Quem confunde marca como presente um marco que ainda nem existe. (Reativado em cheio mais à frente, na faixa 5-6m.)' })}

    ${divCard({
      titulo: 'o sorriso',
      ms: { label: 'Caderneta / MS', rows: [{ k: 'Sorriso', v: '<strong>Social — 2 meses</strong> (estimulado, face a face)' }, { k: 'Default de prova', v: 'é o que as bancas cobram' }] },
      nelson: { label: 'Nelson', rows: [{ k: 'Sorriso', v: '<strong>Espontâneo — 1 mês</strong> (do nada, não está na Caderneta)' }, { k: 'Papel', v: 'contraponto a reconhecer' }] },
      foot: 'Não são duas versões do mesmo fato: são <strong>dois marcos distintos</strong> em idades diferentes. Se a alternativa falar em "sorriso espontâneo aos 3 meses", está errada — o espontâneo é do 1º mês (Nelson).'
    })}

    ${notaValor('<strong>PTC = postura do esgrimista deitado, mas relaxado:</strong> membros fletidos, cabeça virada para um lado — "padrão de 1 mês, dura o 1º trimestre". (Não confundir com o RTCA/esgrimista dos reflexos — a PTC é a postura espontânea; o RTCA é o reflexo eliciado. Eles conversam, e a página dos reflexos fecha.)')}

    ${svgPiso('s-ptc', { caption: 'a postura tônico-cervical (PTC) numa silhueta neutra de RN (sem rosto): membros fletidos, cabeça lateralizada, rotulada PTC; ao lado, a miniatura "eleva a cabeça em prono". Geometria de postura, não foto.', hint: 'O realce está nos membros fletidos e na cabeça virada — o padrão do 1º trimestre.' })}

    ${pendingReal({
      rid: 'R4',
      titulo: 'prancha de atlas/livro-texto pediátrico: reflexo de preensão palmar / postura do lactente nos primeiros meses',
      oque: 'Prancha de atlas publicado ilustrando o reflexo de preensão palmar e/ou a postura do lactente de 1-2 meses.',
      body: 'O contexto da mão fechada vem do <strong>reflexo de preensão palmar</strong>: apoia-se algo na palma e a mão fecha involuntariamente — por isso o bebê passa os primeiros meses com as mãozinhas fechadas, abrindo só em alguns momentos aos 2 meses. A prancha de atlas (não foto de menor) ancoraria o ponto de apoio palmar e a flexão dos dedos; o texto já entrega o conceito.'
    })}

    <h3 class="topic-h" style="margin-top:var(--sp-6)">A tabela viva ganha a faixa 1-2 meses</h3>
    ${tabelaViva('p4', {
      faixaAtiva: '1m',
      filled: ['1m', '2m'],
      caption: 'o Instrumento dos Marcos hidratado até a faixa 1-2 meses (motor = PTC/eleva a cabeça · fino = mãos fechadas/abre às vezes · social = fixa o rosto e sorriso social · linguagem = reage ao som/vocaliza). As faixas seguintes ainda aparecem como "a preencher".',
      hint: 'Toque em "1 mês" e em "2 meses" para comparar as duas colunas que você acabou de aprender.'
    })}

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>O sorriso social é dos marcos mais cobrados de toda a pediatria, e a pegadinha do espontâneo × social separa quem decorou "sorriso = 2 meses" de quem entendeu que há duas referências. E a regra anti-cócega não é detalhe: examinar errado (fazer cosquinha) "produz" um sorriso que não testa o marco social.</p>
    </aside>

    ${quiz('p4', 'PTC, o sorriso social × espontâneo e reagir ≠ localizar o som.', [
      {
        stem: 'Numa prova que adota a Caderneta de Saúde da Criança (MS) como referência, qual é o marco pessoal-social esperado aos 2 meses — e o que o examinador deve fazer para testá-lo corretamente?',
        alts: [
          { t: 'Sorriso espontâneo; basta observar a criança em repouso, pois ele surge sem estímulo', correct: false, why: 'O sorriso espontâneo é descrição do Nelson, ao 1 mês, e nem está na Caderneta. Por que cair na A: mistura as duas referências — o alvo da pegadinha da página.' },
          { t: 'Sorriso social; ficar de frente, falando e sorrindo para a criança, que devolve o sorriso', correct: true, why: 'Certa. Pela Caderneta, o marco dos 2 meses é o sorriso social, eliciado por interação face a face (falar e sorrir). É o "sorriso recíproco".' },
          { t: 'Sorriso social; fazer cócegas ou apertar a bochecha para eliciar a resposta', correct: false, why: 'Cócega/apertar a bochecha NÃO testa o sorriso social (regra anti-cócega). Por que cair na C: acerta o marco mas erra a manobra — o examinador "produz" um sorriso que não é o social.' },
          { t: 'Gargalhada (riso alto); estimular socialmente até a criança rir alto', correct: false, why: 'O riso alto/gargalhada é marco dos 4 meses, não dos 2. Por que cair na D: avança um degrau na escada social.' },
        ]
      },
      {
        stem: 'Um lactente de 1 mês, ao ouvir um chocalho atrás de sua cabeça, muda a expressão facial e se move, mas não vira a cabeça em direção ao som. Como classificar esse achado?',
        alts: [
          { t: 'Anormal — aos 1 mês a criança já deveria localizar a fonte sonora', correct: false, why: 'Localizar aos 1 mês seria precoce demais. Por que cair na A: superestima a linguagem do RN, confundindo reagir com localizar.' },
          { t: 'Normal — aos 1 mês espera-se apenas reação inespecífica ao som; localizar vem por volta dos 5-6 meses', correct: true, why: 'Certa. Aos 1 mês, o esperado é reagir ao som (expressão/movimento inespecífico), não localizar. Virar-se para a fonte é marco de 5-6 meses.' },
          { t: 'Normal, mas só se a criança também já sustentar totalmente a cabeça', correct: false, why: 'Sustentação plena da cabeça não é pré-requisito para reagir ao som; aos 1 mês a criança só eleva a cabeça em prono. Por que cair na C: cria uma condição inexistente entre dois marcos independentes.' },
          { t: 'Anormal — indica déficit auditivo, pois a criança não orientou para o som', correct: false, why: 'Reação inespecífica é justamente o achado normal — não sugere surdez. Por que cair na D: lê a ausência de localização (não esperada ainda) como déficit auditivo.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 5 — E1 Pergunta central · 3-4 meses ===================== */
  // Página 5 — Estratégia: E1 — Pergunta central
  P.push(page('p5', 5, `
    ${tag('marco', '3-4 meses · perde a PTC · a 1ª pega')}
    ${chips(['cabeça na linha média', 'apoio nos antebraços', 'pega cubital (escada da mão)', 'ri alto'])}

    <section class="opener opener--question" aria-label="Pergunta de abertura">
      <span class="opener__question-mark" aria-hidden="true">?</span>
      <p class="opener__text">O que muda, exatamente, quando a cabeça do bebê finalmente para de ficar virada para um lado e se centraliza no meio — e por que a primeira vez que a mão "agarra" um objeto ela faz isso de um jeito tão desajeitado, usando a borda da mão em vez dos dedos?</p>
    </section>

    <h1 class="page-title">Aos 3-4 meses a criança vira simétrica e dá a primeira pegada — torta de propósito.</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">A PTC cai: a cabeça na linha média e o apoio nos antebraços</h3>
        <p>A partir daqui a faixa abrange dois meses: avaliam-se os mesmos quatro marcos na criança de <strong>3</strong> e na de <strong>4 meses</strong>. A grande mudança motora: a partir dos <strong>3 meses</strong> a criança <span class="term">perde a postura tônico-cervical</span>. A cabeça, antes lateralizada, <strong>centraliza-se na linha média</strong>; a criança fica <span class="hl-good">mais simétrica</span>. E ganha sustentação: já tem <strong>grande sustentação da cabeça</strong> e, em posição <strong>prona</strong>, eleva <strong>cabeça e tronco</strong>, apoiando-se nos <strong>antebraços</strong> (de bruços, ela se levanta nos antebraços). É a continuação direta do crânio-caudal — a cabeça, que aos 1 mês só elevava, agora sustenta e arrasta o tronco junto.</p>

        <h3 class="topic-h">A primeira pega é cubital (e a divergência da nomenclatura)</h3>
        <p><strong>Fino/adaptativo (até 4m):</strong> além de abrir as mãos em alguns momentos, a criança começa a <strong>agarrar um objeto de forma voluntária</strong>. A partir dos 3 meses ela já deve ter <strong>perdido o reflexo de preensão palmar</strong> e passa a segurar <strong>voluntariamente</strong>. Aqui entra a divergência MS × Nelson: a <span class="term">Caderneta</span> registra apenas que a criança <strong>segura o objeto</strong>; o <span class="term term--nelson">Nelson</span> caracteriza melhor — aos <strong>4 meses</strong> a pega é <span class="term">cubital</span>. <strong>Pega cubital:</strong> usa-se a palma da mão junto com a <strong>borda cubital</strong> (borda interna/ulnar). Coloca-se um objeto grande (um controle de ar-condicionado, por exemplo) apoiado na mão, e a criança o agarra com os dedos da <strong>borda interna</strong>. (Referência anatômica: cubital × radial; medial × lateral.) Essa pega abre a <span class="term">escada da preensão</span> que se percorre faixa a faixa: <strong>cubital (4m) → radial (6m) → pinça (10-12m)</strong> — sempre da borda de fora da mão em direção à precisão do polegar com o indicador.</p>

        <h3 class="topic-h">Social e linguagem: contato sustentado, fonemas e a gargalhada</h3>
        <p><strong>Pessoal-social (3-4m):</strong> a criança <strong>responde ativamente ao contato social</strong> — estabelece um contato <strong>mais prolongado e sustentado</strong>, mantendo-se mais tempo interagindo (emitindo sons, sorrindo). É a evolução lógica do sorriso social dos 2 meses. <strong>Linguagem (3-4m):</strong> os sons ficam um pouco mais complexos; aparecem <span class="term">fonemas</span> ("gugu", "ê", "gru gru gru") — não só uma vogal solta como aos 2 meses. <strong>Pessoal-social/linguagem (4m):</strong> a criança <strong>ri alto (gargalha)</strong> — marco mais pessoal-social do que de linguagem. Há uma analogia útil para fixar: depois de meses tentando, a criança finalmente <strong>consegue agarrar</strong> um objeto — e, na hora em que agarra, dá a gargalhada. Conquista motora e riso alto chegam juntos.</p>
      </div>
    </div>

    ${divCard({
      titulo: 'a pega (3-4m)',
      ms: { label: 'Caderneta / MS', rows: [{ k: 'Pega', v: '"<strong>segura/agarra</strong> o objeto" (genérico)' }] },
      nelson: { label: 'Nelson', rows: [{ k: 'Pega', v: 'aos 4m a pega é <strong>cubital</strong> (borda ulnar + palma)' }] },
      foot: 'A Caderneta só registra "segura"; o Nelson caracteriza a pega cubital, abrindo a escada da mão.'
    })}

    ${collapsible('Nota de nomenclatura (do laudo): cubital ↔ radial', `
      <p>Parte da literatura <strong>inverte</strong> a ordem cubital ↔ radial (algumas fontes descrevem a "radial-palmar" surgindo antes). A sequência adotada aqui — <strong>cubital 4m → radial 6m → pinça 10-12m</strong> — é a versão majoritária e a que o Nelson sustenta (preensão evoluindo "de fora para dentro", com participação progressiva do polegar). Não é erro: é variação de nomenclatura entre autores, e vale saber que ela existe.</p>
    `)}

    ${notaValor('<strong>Escada da mão: borda → polegar.</strong> Cubital (4m, agarra com a borda) → Radial (6m, o polegar entra) → Pinça (10-12m, polegar e indicador, precisão total). A mão amadurece da margem para o centro.')}

    ${svgPiso('s-pronoantebracos', { caption: 'a perda da PTC em duas silhuetas neutras lado a lado: "antes — PTC (cabeça lateral)" × "agora — simétrica, apoio nos antebraços (cabeça na linha média, tronco elevado em prono)".', hint: 'O realce está na posição da cabeça: de lateral para o centro.' })}

    ${svgPiso('s-pegacubital', { caption: 'a pega cubital numa mão esquemática: objeto grande apoiado na palma + a borda ulnar/cubital agarrando, com os eixos radial/cubital rotulados. Traço anatômico-funcional.', hint: 'A seta indica a borda cubital em ação — o primeiro degrau da escada da mão.' })}

    ${medSplit({
      file: 'r5-apoio-antebracos.jpg',
      alt: 'Foto real de um bebê saudável de bruços (prono), em tummy time, com um brinquedo macio ao lado.',
      titulo: 'Tummy time: o bebê em prono constrói o controle cervical (3-4m)',
      achado: 'o lactente <strong>de bruços</strong> — o exercício que constrói o <strong>apoio nos antebraços</strong> e a sustentação da cabeça na linha média, o marco motor desta faixa.',
      fonte: 'Foto: Dobromir Dobrev, via Pexels',
      licenca: 'Pexels License (uso livre, inclusive comercial)', light: false, side: 'right', lic: 'ok',
      body: 'O marco motor da faixa é o <strong>apoio nos antebraços em prono</strong> com a <strong>cabeça centralizada</strong> — o sinal grosseiro de que o controle cervical subiu a régua do crânio-caudal. O esquema autoral ao lado mostra o contraste com a PTC; a foto real traz o bebê na posição que constrói esse controle.'
    })}

    <h3 class="topic-h" style="margin-top:var(--sp-6)">A tabela viva ganha a faixa 3-4 meses</h3>
    ${tabelaViva('p5', {
      faixaAtiva: '3-4m',
      filled: ['1m', '2m', '3-4m'],
      caption: 'o Instrumento agora com a faixa 3-4 meses preenchida (motor = perde a PTC, simétrica, apoio nos antebraços · fino = pega cubital · social = contato sustentado · linguagem = fonemas, ri alto). Toque em "3-4 meses" e na faixa à esquerda (2 meses) para treinar a regra-mestre.',
      hint: 'Compare 2m × 3-4m: a cabeça que era lateral (PTC) agora centraliza.'
    })}

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>A perda da PTC e a chegada da simetria são o primeiro sinal grosseiro de que o controle motor está subindo a régua do crânio-caudal; sua ausência num bebê de 4 meses é bandeira. E a escada da preensão (cubital → radial → pinça) é cobrada como série — quem sabe a ordem deduz a idade pela pega descrita no enunciado.</p>
    </aside>

    ${quiz('p5', 'A perda da PTC, a simetria e a escada da preensão (cubital → radial → pinça).', [
      {
        stem: 'A perda da postura tônico-cervical, com a cabeça assumindo a linha média e a criança tornando-se simétrica, é esperada a partir de qual idade — e o que isso revela sobre o desenvolvimento motor?',
        alts: [
          { t: 'A partir de 1 mês; revela que a criança já sustenta totalmente a cabeça', correct: false, why: 'Ao 1 mês a criança ainda está em PTC e só eleva a cabeça em prono. Por que cair na A: antecipa a sustentação plena em dois meses.' },
          { t: 'A partir de 3 meses; revela o amadurecimento do controle cervical, coerente com o sentido crânio-caudal', correct: true, why: 'Certa. A PTC dura o 1º trimestre e cai a partir dos 3 meses, quando a cabeça centraliza e a criança fica simétrica — o controle cervical amadurecendo na ordem crânio-caudal (cabeça antes do tronco).' },
          { t: 'A partir de 6 meses; revela que a criança já está pronta para sentar sem apoio', correct: false, why: 'Sentar sem apoio é marco de 7-9m, muito além da perda da PTC. Por que cair na C: salta da simetria (3m) direto para o tronco maduro (7-9m).' },
          { t: 'A partir de 2 meses; coincide com o surgimento do sorriso social', correct: false, why: 'O sorriso social (2m) e a perda da PTC (3m) são marcos de áreas e idades diferentes. Por que cair na D: ancora a mudança motora num marco social próximo no tempo.' },
        ]
      },
      {
        stem: 'Sobre a evolução da preensão manual, qual sequência está correta segundo a caracterização adotada (Nelson)?',
        alts: [
          { t: 'Pinça (4m) → pega radial (6m) → pega cubital (10-12m)', correct: false, why: 'Inverte a ordem da escada — a pinça é a aquisição mais tardia (10-12m), nunca a primeira. Por que cair: decora a pinça como "a pega" sem perceber que ela coroa a série.' },
          { t: 'Pega cubital (4m) → pega radial (6m) → pinça (10-12m)', correct: true, why: 'Certa. A mão amadurece da borda para o polegar: cubital aos 4m (borda ulnar), radial aos 6m (o polegar entra) e pinça aos 10-12m (polegar + indicador, precisão).' },
          { t: 'Pega radial (4m) → pinça (6m) → pega cubital (10-12m)', correct: false, why: 'Inverte a ordem da escada e coloca a pinça cedo demais. Por que cair: mesmo erro de não perceber que a precisão fina é a última a chegar.' },
          { t: 'A preensão não tem ordem fixa — depende do estímulo manual oferecido', correct: false, why: 'O desenvolvimento é sequencial e previsível, e a preensão segue ordem fixa. Por que cair na D: aplica o falso "cada um no seu tempo" à ordem, que é invariável.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 6 — E4 Achado típico / pegadinha · 5-6 meses ===================== */
  // Página 6 — Estratégia: E4 — Achado típico / pegadinha
  P.push(page('p6', 6, `
    ${tag('trap', '5-6 meses · rola e cai · localiza o som')}
    ${chips(['rola (e começam os acidentes)', 'localiza ≠ reage', 'pega radial', 'sentar com apoio (Nelson)'])}

    <aside class="opener opener--trap" aria-label="Achado de abertura">
      <svg class="opener__trap-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>
      <div class="opener__trap-body">
        <p class="opener__trap-tag">A criança que rola é a criança que cai</p>
        <p class="opener__trap-text">Uma mãe traz o bebê de 6 meses radiante: "doutor, ele já está se virando sozinho na cama!". É um ótimo marco — o tronco amadureceu, a criança <strong>rola</strong>. E é, no mesmo instante, o começo dos acidentes: a criança que rola é a criança que <strong>cai da cama, do trocador, do sofá</strong>. O mesmo movimento que você comemora é o que exige a orientação mais importante da consulta.</p>
      </div>
    </aside>

    <h1 class="page-title">A criança rolou. Ótimo marco — e a partir de agora ela não pode ficar sozinha em superfície alta.</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">Rola — e por isso cai: o marco motor que vira alerta de segurança</h3>
        <p>Nova faixa de dois meses: <strong>5 e 6 meses</strong>. <strong>Motor (grande marco):</strong> a criança <span class="term">rola</span> — muda de posição. Consegue porque já desenvolveu cabeça e cinturão escapular e está desenvolvendo o <strong>tronco</strong>; com o tronco em desenvolvimento, executa o rolamento. A consequência prática é uma regra de ouro de puericultura: a criança pode <span class="hl-bad">cair</span> — <strong>começam os acidentes</strong>, e <strong>essa criança não pode ficar desassistida em nenhuma superfície</strong>. É o marco em que a orientação de segurança domiciliar deixa de ser teórica.</p>

        <h3 class="topic-h">Localiza o som (não só reage) e a pega radial</h3>
        <p>Aqui se fecha a pegadinha plantada lá na faixa de 1 mês. <span class="hl-warn">Localiza o som ≠ reage ao som:</span> o menorzinho (1 mês) apenas <strong>reagia</strong> ao som (expressão/movimento inespecífico, sem virar a cabeça). Aos <strong>5-6 meses</strong> a criança <span class="term">localiza</span> o som — esconde-se atrás dela, faz um barulho/chocalho e ela <strong>se volta exatamente para o local de origem</strong>. É a mesma manobra de teste, resposta amadurecida. <strong>Fino/adaptativo (5-6m):</strong> a criança <strong>leva o objeto à boca</strong> — aos 6 meses é a idade de pegar as coisas e colocá-las na boca. E a pega evolui: descreve-se aqui a <span class="term">pega radial</span> (divergência MS × Nelson) — a criança continua usando a palma (não só os dedos), mas com o <strong>polegar aperta o objeto contra a palma</strong> e leva à boca. É o degrau intermediário da escada da mão (cubital 4m → <strong>radial 6m</strong> → pinça 10-12m).</p>

        <h3 class="topic-h">Social e a divergência do sentar com apoio (Nelson)</h3>
        <p><strong>Pessoal-social (5-6m):</strong> a criança faz <strong>busca ativa de objetos</strong> — coloca-se um objeto à frente e ela <strong>projeta o tronco</strong> em direção a ele, demonstrando interesse pelo ambiente externo (esperado aos 6 meses). Há ainda uma divergência de faixa importante: a Caderneta, em 5-6m, traz apenas os marcos acima; o <span class="term term--nelson">Nelson</span> acrescenta que, aos <strong>6-7 meses</strong>, a criança fica <strong>sentada com apoio</strong> — coloca-se a criança sentada, ela não cai imediatamente, fica sentada alguns instantes, mas logo <strong>projeta o tronco para frente e se apoia sobre os braços</strong>. Na faixa seguinte já se espera que <strong>sente sem apoio</strong>. E isto é a raiz de toda a divergência entre as referências: as <strong>faixas etárias do Nelson diferem das da Caderneta</strong> (o Nelson usa cortes como 6-7m e 7m, que não coincidem com as faixas 5-6m e 7-9m da Caderneta). Por isso o mesmo marco "muda de idade" conforme a referência — e por isso a prova se faz com senso crítico.</p>
      </div>
    </div>

    ${alertCard({ tone: 'warn', kicker: 'Pegadinha de prova', title: 'Reage (1m) × Localiza (5-6m) — mesmo estímulo, resposta diferente', body: 'Se o enunciado diz "vira-se exatamente para a origem do som", é criança de <strong>5-6 meses</strong>, não de 1 mês. Marcar localização do som como esperado no RN é erro clássico.' })}

    ${divCard({
      titulo: 'sentar com apoio e as faixas',
      ms: { label: 'Caderneta / MS', rows: [{ k: 'Sentar com apoio', v: 'não destacado na faixa 5-6m' }, { k: 'Faixas etárias', v: '5-6m, 7-9m' }] },
      nelson: { label: 'Nelson', rows: [{ k: 'Sentar com apoio', v: '<strong>6-7 meses</strong> (senta com apoio, projeta o tronco)' }, { k: 'Faixas etárias', v: 'cortes próprios (6-7m, 7m) — <strong>não coincidem</strong>' }] },
      foot: 'A raiz de toda a divergência: as faixas do Nelson não batem com as da Caderneta — por isso o mesmo marco "muda de idade" conforme a referência.'
    })}

    ${svgPiso('s-rolamento', { caption: 'o rolamento em 3 quadros (decúbito dorsal → lateral → ventral) numa silhueta neutra, com o alerta gráfico "não deixar em superfície alta". Conteúdo geométrico-sequencial.', hint: 'A seta de progressão mostra o movimento — e o aviso lembra: a criança que rola, cai.' })}

    ${svgPiso('s-pegaradial', { caption: 'a pega radial numa mão esquemática (o polegar apertando o objeto contra a palma), em contraste lado a lado com a cubital da faixa anterior — a evolução cubital → radial.', hint: 'O realce está no polegar entrando em ação: o degrau intermediário da escada da mão.' })}

    ${medSplit({
      file: 'r6-rolar-sentar.png',
      alt: 'Sequência esquemática de posições do primeiro ano (prancha de artigo científico): rotação axial e apoio em membros superiores na passagem para sentar com apoio e sentar mais independente; não é foto de criança.',
      titulo: 'Transição rolar → sentar no primeiro ano',
      achado: 'a passagem dos painéis Stage 2 → Stage 3: rotação axial, apoio em membros superiores e dissociação entre cinturas, depois o sentar oblíquo/tripé com uma mão no solo.',
      fonte: 'Maciak M. et al., Children, 2024, Figure 1 (MDPI)',
      licenca: 'CC BY 4.0', light: true, side: 'right', lic: 'ok',
      body: 'A transição esperada entre 5-7 meses aparece sobretudo no controle ativo do tronco e na capacidade de manter o centro de massa sobre a base pélvica — não apenas na criança "ficar colocada" sentada. Diferencial: <strong>sentar ativo em transição</strong> não é o mesmo que <strong>sentar passivo</strong> com almofada/colo, em que o ambiente sustenta o tronco e pode mascarar hipotonia axial.'
    })}

    <h3 class="topic-h" style="margin-top:var(--sp-6)">A tabela viva ganha a faixa 5-6 meses</h3>
    ${tabelaViva('p6', {
      faixaAtiva: '5-6m',
      filled: ['1m', '2m', '3-4m', '5-6m'],
      caption: 'o Instrumento com a faixa 5-6 meses preenchida (motor = rola · fino = leva à boca / pega radial · social = busca ativa / senta com apoio [Nelson] · linguagem = localiza o som). Toque em "5-6 meses" e na faixa à esquerda (3-4 meses).',
      hint: 'Repare: "reage ao som" (1m) virou "localiza o som" (5-6m) — mesmo eixo, resposta amadurecida.'
    })}

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>O rolar é o marco que muda a orientação domiciliar — a queda de superfície alta é uma das causas mais comuns e mais evitáveis de trauma no lactente, e ela começa exatamente aqui. E reage × localiza é pegadinha de prova garantida: separa quem entendeu a maturação da linguagem auditiva de quem decorou "reage ao som" sem idade.</p>
    </aside>

    ${quiz('p6', 'O rolar (e a segurança), localizar × reagir o som e a pega radial.', [
      {
        stem: 'Mãe de lactente de 6 meses, orgulhosa, conta que o bebê "já se vira sozinho na cama". Qual é a orientação mais importante a dar nesse momento?',
        alts: [
          { t: 'Nenhuma — rolar aos 6 meses é tardio e merece investigação', correct: false, why: 'Rolar aos 6m é esperado, não tardio. Por que cair na A: lê um marco normal como atraso por desconhecer a faixa.' },
          { t: 'Orientar que a criança não pode ficar desassistida em nenhuma superfície alta, pois rolar inaugura o risco de quedas', correct: true, why: 'Certa. Rolar é marco motor normal de 5-6m E o início dos acidentes: a criança que rola cai de superfícies altas. A orientação de segurança domiciliar é a conduta-chave.' },
          { t: 'Orientar que a criança já pode ser deixada sentada sem apoio com segurança', correct: false, why: 'Sentar sem apoio é marco de 7-9m; aos 6m, no máximo, sentar com apoio (Nelson). Por que cair na C: avança um degrau do tronco.' },
          { t: 'Orientar treino de marcha, pois rolar antecede imediatamente o andar', correct: false, why: 'Entre rolar (5-6m) e andar (10-15m) há vários marcos (sentar, engatinhar opcional, ficar em pé); não há "imediatamente". Por que cair na D: comprime a sequência motora, ignorando o crânio-caudal.' },
        ]
      },
      {
        stem: 'Em que a resposta ao som de um lactente de 5-6 meses difere da de um lactente de 1 mês?',
        alts: [
          { t: 'Não difere — ambos apenas mudam a expressão facial diante do som', correct: false, why: 'Há diferença clara — localizar não existe ao 1 mês. Por que cair na A: iguala duas faixas distantes por não saber a evolução.' },
          { t: 'Aos 5-6 meses a criança localiza o som (vira-se para a origem); ao 1 mês apenas reage de forma inespecífica', correct: true, why: 'Certa. Maturação da linguagem auditiva: aos 1 mês, reação inespecífica; aos 5-6 meses, localização (vira-se exatamente para a fonte).' },
          { t: 'Ao 1 mês a criança localiza o som; aos 5-6 meses passa a apenas reagir', correct: false, why: 'Inverte as idades — quem localiza é o maior (5-6m). Por que cair na C: troca a direção da maturação.' },
          { t: 'A diferença está só no tipo de som usado, não na resposta da criança', correct: false, why: 'A diferença é na resposta (reagir × localizar), não no estímulo. Por que cair na D: desloca o foco do marco para o método de teste.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 7 — E4 Achado típico / pegadinha · 7-9 meses ===================== */
  // Página 7 — Estratégia: E4 — Achado típico / pegadinha
  P.push(page('p7', 7, `
    ${tag('trap', '7-9 meses · permanência do objeto · engatinhar opcional')}
    ${chips(['esconde-achou', 'lei da selva (agarra→solta→transfere)', 'senta sem apoio', 'engatinhar = exceção'])}

    <aside class="opener opener--trap" aria-label="Achado de abertura">
      <svg class="opener__trap-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>
      <div class="opener__trap-body">
        <p class="opener__trap-tag">A única etapa que a criança normal pula</p>
        <p class="opener__trap-text">Uma regra atravessou tudo até aqui: a sequência do desenvolvimento <strong>nunca pula etapas</strong>. Mas existe um marco famoso, que todo mundo associa a "bebê de 9 meses", que <strong>muitas crianças normais simplesmente não fazem</strong> — e isso <strong>não significa nenhum atraso</strong>. Qual é, e por que ele é a única exceção à sequência fixa?</p>
      </div>
    </aside>

    <h1 class="page-title">Tudo na sequência segue a ordem — menos o engatinhar, que muita criança normal pula direto.</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">Permanência do objeto: o esconde-achou que prova que ela entende</h3>
        <p>A partir daqui a avaliação passa a ser de <strong>três em três meses</strong>: a criança de <strong>7, 8 e 9 meses</strong> deve fazer os mesmos quatro marcos. <strong>Pessoal-social (7-9m):</strong> a criança <span class="term">brinca de esconde-achou</span> (o "cadê?") — você se esconde, faz "cadê a mamãe?", reaparece, e ela acha graça. Esse marco traduz uma conquista cognitiva profunda: o <span class="term">sentido de permanência do objeto</span> — saber que algo continua existindo mesmo fora do campo de visão. O contraste com os 6 meses é eloquente: o bebê de 6 meses que fazia busca ativa, ao ter o objeto escondido, <strong>perde o interesse na hora</strong> (para ele, o objeto "deixou de existir"). Até os 9 meses, a criança já tem permanência do objeto: quando você esconde, ela <strong>procura</strong> pelo objeto escondido, porque sabe que ele continua lá.</p>

        <h3 class="topic-h">A lei da selva da mão: agarra, depois solta, depois transfere</h3>
        <p><strong>Fino/adaptativo (até 9m):</strong> além de agarrar voluntariamente, a criança é capaz de <strong>soltar voluntariamente</strong> o objeto e de <span class="term">transferir</span> objetos de uma mão para a outra. A ordem tem nome — a <span class="term">"lei da selva":</span> primeiro a criança aprende a <strong>agarrar</strong>, só depois aprende a <strong>soltar</strong> — e quando aprende a soltar, transfere de uma mão para a outra. Não dá para transferir sem antes saber soltar. Aqui há divergência MS × Nelson: a <span class="term">Caderneta</span> coloca a transferência aparecendo <strong>até os 9 meses</strong>; o <span class="term term--nelson">Nelson</span> já a espera <strong>até 7 meses</strong>. <strong>Linguagem (7-9m):</strong> a linguagem fica mais rebuscada — até 9 meses a criança <strong>duplica sílabas</strong> ("mamá", "papá", "dadá"), cada vez mais perto de uma palavra com significado. Divergência: o <span class="term term--nelson">Nelson</span> diz que aos <strong>6-7 meses</strong> a criança já faz <strong>polissílabos vogais</strong> (repete o mesmo fonema ininterruptamente, "mamamama..."); a <strong>duplicação organizada</strong> de sílabas ("mamá", "papá") é o marco mais maduro, dos ~9 meses pela Caderneta.</p>

        <h3 class="topic-h">Senta sem apoio — e a grande pegadinha do engatinhar</h3>
        <p><strong>Motor (7-9m):</strong> espera-se que a criança <span class="term">sente-se sem apoio</span> — fica sentada, sem apoio nenhum, brincando com um objeto, costas eretas, sem perder o equilíbrio. E agora a <strong>grande pegadinha</strong>: com 9 meses a criança engatinha? O <span class="hl-warn">engatinhar</span> é uma etapa que <strong>nem todas as crianças realizam</strong> — há criança que não engatinha, e isso <strong>não significa nenhuma alteração</strong> do desenvolvimento. É a <strong>única exceção</strong> à regra da sequência fixa. Todas as demais etapas, toda criança normal realiza, e na ordem invariável: nunca leva à boca sem antes agarrar; nunca transfere sem antes ter segurado e levado à boca. A complexidade crescente se mantém — <strong>exceto o engatinhar</strong>. (Outra forma de avaliar força/tônus nessa fase: pôr a criança em pé apoiada numa mobília, e ela dá <strong>passinhos para trás e laterais</strong> apoiada, ex.: no sofá. Mas pela Caderneta, nessa faixa, basta avaliar se a criança fica <strong>sentada sem apoio</strong>.)</p>
      </div>
    </div>

    ${alertCard({ tone: 'warn', kicker: 'Pegadinha de prova', title: 'O engatinhar é a ÚNICA etapa que crianças normais pulam', body: 'Uma criança de 9 meses que senta sem apoio, transfere, duplica sílabas e brinca de esconde-achou, mas <strong>não engatinha</strong>, é <span class="hl-good">normal</span>. Cair em "não engatinha = atraso" é o erro plantado da página.' })}

    ${divCard({
      titulo: 'transferência e sons',
      ms: { label: 'Caderneta / MS', rows: [{ k: 'Transferência', v: 'até <strong>9 meses</strong>' }, { k: 'Sons', v: 'duplica sílabas organizadas (~9m)' }] },
      nelson: { label: 'Nelson', rows: [{ k: 'Transferência', v: 'até <strong>7 meses</strong>' }, { k: 'Sons', v: '<strong>polissílabos vogais</strong> (6-7m, "mamamama")' }] },
      foot: 'A duplicação organizada de sílabas ("mamá") é o marco mais maduro; os polissílabos vogais do Nelson são um degrau de balbucio mais precoce.'
    })}

    ${notaValor('<strong>Lei da selva: primeiro agarra, depois solta — e quem solta, transfere.</strong> A mão só passa o objeto de uma para a outra depois de aprender a abrir voluntariamente.')}

    ${svgPiso('s-pincalinha', { caption: 'a mini-linha-do-tempo da preensão em mãos esquemáticas: cubital (4m) → radial (6m) → pinça (10-12m), fechando a escada da mão (a pinça já aparece em destaque, antecipando a próxima faixa).', hint: 'A progressão vai da borda ao polegar+indicador: a mão amadurece de fora para dentro.' })}

    ${svgPiso('s-sentasemapoio', { caption: 'o "senta sem apoio" numa silhueta neutra (costas eretas, sem mãos no chão, 7-9m), em contraste com o "senta com apoio" (mãos no chão) da faixa anterior. Geometria postural.', hint: 'O realce está na ausência de apoio dos braços — o tronco já se sustenta sozinho.' })}

    ${medSplit({
      file: 'r7-marcos-7-12m.png',
      alt: 'Gráfico WHO de janelas dos marcos motores grossos (prancha de livro-texto): sentar sem apoio, ficar em pé com apoio, engatinhar de mãos e joelhos e andar com apoio se sobrepõem entre 7 e 12 meses; não é foto de criança.',
      titulo: 'Marcos motores 7-12 meses (janelas WHO)',
      achado: 'as faixas "sitting without support", "standing with assistance", "hands-&-knees crawling" e "walking with assistance" — o engatinhar entra como etapa possível, marcado como <strong>"opcional"</strong>.',
      fonte: 'WHO Motor Development Study, via LibreTexts (CC BY 4.0); fonte original WHO sob CC BY-NC-SA 3.0 IGO',
      licenca: 'CC BY 4.0 (página) · WHO NC-SA', light: true, side: 'right', lic: 'nc',
      body: 'Foque nas quatro faixas inferiores: a progressão de controle axial e transferência de carga. O texto da própria fonte explicita que <strong>4,3% das crianças não exibem o engatinhar de mãos e joelhos</strong> — a evidência numérica de que é etapa opcional. Não confundir ausência isolada de engatinhar com atraso motor se há sentar estável, cruising e marcha com apoio em progressão.'
    })}

    <h3 class="topic-h" style="margin-top:var(--sp-6)">A tabela viva ganha a faixa 7-9 meses</h3>
    ${tabelaViva('p7', {
      faixaAtiva: '7-9m',
      filled: ['1m', '2m', '3-4m', '5-6m', '7-9m'],
      caption: 'o Instrumento com a faixa 7-9 meses preenchida (motor = senta sem apoio / engatinhar opcional · fino = solta e transfere · social = esconde-achou / permanência do objeto · linguagem = duplica sílabas). Toque em "7-9 meses" e na faixa à esquerda (5-6 meses).',
      hint: 'O esconde-achou (9m) é o oposto da busca ativa (6m): aos 6m o objeto "some"; aos 9m a criança procura.'
    })}

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>A permanência do objeto é um marco cognitivo cuja ausência aos 9 meses preocupa. E o engatinhar é a pegadinha de prova mais repetida do tema: a banca descreve uma criança normal que não engatinha esperando que você marque atraso. Saber que é a única exceção é o que diferencia o aluno avançado.</p>
    </aside>

    ${quiz('p7', 'A permanência do objeto, a lei da selva e a exceção do engatinhar.', [
      {
        stem: 'Lactente de 9 meses senta sem apoio, transfere objetos de uma mão para a outra, duplica sílabas e brinca de esconde-achou, mas não engatinha. Como classificar o desenvolvimento?',
        alts: [
          { t: 'Provável atraso — engatinhar é marco obrigatório aos 9 meses', correct: false, why: 'Engatinhar não é obrigatório — é a única etapa pulável. Por que cair na A: aplica a regra "não pula etapa" justamente à exceção que a contradiz.' },
          { t: 'Adequado — engatinhar é a única etapa que crianças normais podem não realizar; todos os demais marcos da faixa estão presentes', correct: true, why: 'Certa. O engatinhar é a única exceção à sequência fixa: nem toda criança normal engatinha, e não engatinhar não é atraso. Com os outros marcos da faixa presentes, o desenvolvimento é adequado.' },
          { t: 'Alerta — a ausência de qualquer marco motor exige reavaliação em 30 dias', correct: false, why: 'O engatinhar não é um "marco ausente" que dispara alerta, porque não é exigido. Por que cair na C: trata o engatinhar como marco regular da faixa.' },
          { t: 'Provável atraso — falta um marco da faixa atual, logo deve-se encaminhar', correct: false, why: 'Não há marco ausente exigível, então não há encaminhamento. Por que cair na D: mistura a exceção com a lógica da faixa anterior (provável atraso).' },
        ]
      },
      {
        stem: 'O que a brincadeira de esconde-achou, esperada até os 9 meses, demonstra sobre o desenvolvimento da criança?',
        alts: [
          { t: 'Que a criança já domina a linguagem expressiva (fala palavras com significado)', correct: false, why: 'Palavra com significado é marco bem mais tardio (12-15m). Por que cair na A: confunde o ganho cognitivo (permanência) com linguagem expressiva.' },
          { t: 'Que a criança adquiriu a noção de permanência do objeto — sabe que algo existe mesmo fora do campo visual', correct: true, why: 'Certa. O esconde-achou traduz a permanência do objeto: a criança procura o que foi escondido porque entende que ele continua existindo — diferente do bebê de 6m, que perde o interesse imediatamente.' },
          { t: 'Que a criança já tem motricidade fina suficiente para a pinça', correct: false, why: 'A pinça é motora-fina e de 10-12m; o esconde-achou é social/cognitivo. Por que cair na C: troca a área avaliada (social → fino).' },
          { t: 'Que a criança superou o reflexo de Moro', correct: false, why: 'Moro é reflexo primitivo, eixo distinto, e some bem antes. Por que cair na D: mistura marcos com reflexos.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 8 — E2 Dado impactante · 10-15 meses ===================== */
  // Página 8 — Estratégia: E2 — Dado impactante
  P.push(page('p8', 8, `
    ${tag('marco', '10-15 meses · o par dos limites')}
    ${chips(['pinça', '12m = COM apoio (limite)', '15m = SEM apoio', 'palavra 15m (MS) × 12m'])}

    <figure class="opener opener--stat" aria-label="Dado de abertura">
      <div class="opener__vs-grid">
        <div class="opener__vs-side">
          <p class="opener__number">12 meses</p>
          <p>é o <strong>LIMITE</strong> para andar <strong>COM apoio</strong></p>
        </div>
        <div class="opener__vs-divider" aria-hidden="true">·</div>
        <div class="opener__vs-side">
          <p class="opener__number">15 meses</p>
          <p>é quando se exige andar <strong>SEM apoio</strong></p>
        </div>
      </div>
      <p class="opener__context">Repare na palavra: <strong>limite</strong>, não média. Aos 12 meses a criança não precisa andar sozinha — precisa andar <strong>com</strong> apoio; se aos 12m ela não anda nem com apoio, aí sim você se preocupa. E aos 15m a barra sobe: tem que andar <strong>sem</strong> apoio, com equilíbrio. Esses dois números, pareados, são uma das pegadinhas mais cobradas do tema.</p>
    </figure>

    <h1 class="page-title">Com apoio aos 12, sem apoio aos 15 — e 12 meses é limite, não média.</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">10-12 meses: pinça, imita gestos, jargão</h3>
        <p><strong>Fino/adaptativo (10-12m):</strong> a criança faz o <span class="term">movimento de pinça</span> — <strong>oposição perfeita entre polegar e indicador</strong>. É o topo da escada da mão (cubital 4m → radial 6m → <strong>pinça 10-12m</strong>): da borda grosseira à precisão fina. <strong>Pessoal-social (10-12m):</strong> a criança <strong>imita gestos</strong> — você bate palma, ela bate palma; você dá tchau, ela dá tchau ("vira um ser humaninho"). <strong>Linguagem (10-12m):</strong> a criança <strong>produz jargão</strong> (definido em detalhe na escada da linguagem — linguagem com a melodia de uma conversa, mas sem palavras com significado).</p>

        <h3 class="topic-h">O par dos limites: 12m anda COM apoio (limite, não média)</h3>
        <p><strong>Motor (10-12m):</strong> a criança <span class="term">anda com apoio</span>. E aqui mora o ponto fino: <span class="hl-warn">12 meses é a idade LIMITE para andar COM apoio</span> — não é a idade média, é o limite. Se aos 12 meses ela não anda com apoio, há motivo de preocupação. As crianças, em geral, desenvolvem as habilidades <strong>antes</strong> da idade limite: andar <strong>sem</strong> apoio aos 12 meses é ótimo, mas <strong>não é exigido</strong> aos 12m — o que se exige aos 12m é andar <strong>com</strong> apoio. Confundir "limite" com "média" faz o aluno cobrar mais (andar sozinho aos 12m) do que a régua pede, e errar.</p>

        <h3 class="topic-h">13-15 meses: mostra o que quer, blocos na caneca, diz uma palavra, anda SEM apoio</h3>
        <p><strong>Pessoal-social (13-15m):</strong> a criança deve <strong>mostrar o que quer</strong> (além do choro) — ela <strong>aponta</strong> e <strong>verbaliza</strong>, e, dentro do que já fala, você entende melhor o que ela pede. <strong>Fino/adaptativo (13-15m):</strong> <strong>coloca blocos na caneca</strong> (no consultório usa-se uma caneca que não quebre e pequenos blocos; estimula-se a criança a colocá-los) — traduz motricidade fina. <strong>Linguagem (13-15m):</strong> até 15 meses a criança deve <span class="term">dizer uma palavra</span> e <strong>nomear os principais membros da família</strong> (a própria Caderneta descreve <strong>como pesquisar</strong> cada habilidade). Divergência: em muitas referências (Nelson/Denver/CDC), até <strong>12 meses</strong> a criança já deveria dizer <strong>algumas palavras com significado</strong>; mas o que tem aparecido nas questões é o da <strong>Caderneta — palavra até 15m</strong>. <strong>Motor (15m):</strong> a criança deve <span class="term">andar sem apoio</span>, com equilíbrio e coordenação. Eis o par completo: <span class="hl-good">12m = anda COM apoio · 15m = anda SEM apoio.</span></p>
      </div>
    </div>

    ${alertCard({ tone: 'warn', kicker: 'Pegadinha de prova', title: '12m = LIMITE, não média', body: 'Aos 12 meses o exigido é andar <strong>com</strong> apoio; andar <strong>sem</strong> apoio é bônus, não requisito. E <strong>palavra com significado</strong>: a banca cobra o corte da <strong>Caderneta (15m)</strong>, mesmo que outras referências digam 12m. Na dúvida, vá pela Caderneta.' })}

    ${divCard({
      titulo: 'diz uma palavra (com significado)',
      ms: { label: 'Caderneta / MS', rows: [{ k: 'Primeira palavra', v: 'até <strong>15 meses</strong>' }] },
      nelson: { label: 'Outras referências (Nelson/Denver/CDC)', rows: [{ k: 'Primeira palavra', v: 'por volta de <strong>12 meses</strong>' }] },
      foot: 'O que tem aparecido nas questões é o corte da Caderneta (15m). Na dúvida, vá pela Caderneta.'
    })}

    ${notaValor('<strong>12 com, 15 sem.</strong> Aos 12 meses, anda <strong>com</strong> apoio (limite); aos 15 meses, anda <strong>sem</strong> apoio. Dois números, dois apoios — o par que a banca pareia.')}

    ${svgPiso('s-andacomsemapoio', { caption: 'o par-limite em duas silhuetas neutras: "12m — anda COM apoio (mão na mobília/sofá)" × "15m — anda SEM apoio (equilíbrio próprio)". Geometria postural.', hint: 'O realce está na presença × ausência do apoio — o par que a banca pareia.' })}

    ${svgPiso('s-pincadetalhe', { caption: 'a pinça em detalhe numa mão esquemática (oposição perfeita polegar-indicador), coroando a escada da preensão.', hint: 'O realce está no encontro polegar↔indicador — a precisão fina que fecha a coordenação manual do 1º ano.' })}

    ${medSplit({
      file: 'r8-andar-10-15m.png',
      alt: 'Gráfico WHO de janelas dos marcos motores grossos (prancha de livro-texto): ficar em pé com apoio, andar com apoio, ficar em pé sozinho e andar sozinho ao longo do eixo de idade; não é foto de criança.',
      titulo: 'Janelas da marcha: apoio → marcha independente (10-15m)',
      achado: 'as faixas "standing with assistance", "walking with assistance", "standing alone" e "walking alone": a progressão de controle postural antigravitário para locomoção independente.',
      fonte: 'WHO Multicentre Growth Reference Study, via LibreTexts',
      licenca: 'CC BY 4.0', light: true, side: 'right', lic: 'ok',
      body: 'Não confundir "standing alone" (equilíbrio estático) com marcha: "walking alone" exige <strong>passos independentes, alternância de apoio e deslocamento</strong>. E qualquer contato com móvel/pessoa ainda mantém o marco como <strong>marcha assistida</strong> (com apoio) — o que ancora o par-limite: 12m com apoio, 15m sem apoio.'
    })}

    <h3 class="topic-h" style="margin-top:var(--sp-6)">A tabela viva fecha os marcos — 10-15 meses</h3>
    ${tabelaViva('p8', {
      faixaAtiva: '10-12m',
      filled: ['1m', '2m', '3-4m', '5-6m', '7-9m', '10-12m', '13-15m'],
      caption: 'o Instrumento dos Marcos COMPLETO — agora com 10-12 meses (motor = anda COM apoio · fino = pinça · social = imita gestos · linguagem = jargão) e 13-15 meses (motor = anda SEM apoio · fino = blocos na caneca · social = mostra o que quer/aponta · linguagem = diz uma palavra/nomeia a família). Toque em "10-12 meses" e em "13-15 meses" para fechar o par.',
      hint: 'A tabela está cheia: daqui em diante ela só será reusada para classificar e plotar os casos.'
    })}

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>O par 12m-com/15m-sem é decisivo: liberar como normal uma criança que aos 12m não anda nem com apoio é perder um atraso; cobrar marcha independente aos 12m é gerar alarme falso. E a pinça é o marco fino que fecha a coordenação manual do primeiro ano — sua ausência aos 12m importa.</p>
    </aside>

    ${quiz('p8', 'A pinça, o par 12m-com/15m-sem (limite ≠ média) e a divergência da palavra.', [
      {
        stem: 'Criança de 12 meses na consulta de rotina. Qual é o marco motor que se exige nessa idade, segundo a Caderneta?',
        alts: [
          { t: 'Andar sem apoio, com equilíbrio', correct: false, why: 'Andar sem apoio aos 12m é ótimo, mas não exigido — o requisito é com apoio. Por que cair na A: confunde limite com média e cobra demais.' },
          { t: 'Andar com apoio — 12 meses é a idade-limite para andar com apoio, não para andar sozinho', correct: true, why: 'Certa. Aos 12 meses, o exigido é andar com apoio (12m é o limite para isso). Andar sem apoio é esperado só aos 15m.' },
          { t: 'Engatinhar de forma coordenada', correct: false, why: 'Engatinhar nem é obrigatório (exceção da sequência). Por que cair na C: trata a etapa pulável como exigência.' },
          { t: 'Correr e subir degraus', correct: false, why: 'Correr e subir degraus são marcos bem mais tardios (2º ano). Por que cair na D: avança vários meses na escada motora.' },
        ]
      },
      {
        stem: 'Numa prova que adota a Caderneta de Saúde da Criança como referência, até que idade se espera que a criança "diga uma palavra" (com significado)?',
        alts: [
          { t: 'Até 9 meses', correct: false, why: 'Aos 9m a linguagem está em duplicação de sílabas ("mamá"), sem palavra com significado. Por que cair na A: confunde balbucio com palavra.' },
          { t: 'Até 12 meses', correct: false, why: '12 meses é o corte de outras referências (Nelson/Denver/CDC), não da Caderneta. Por que cair na B: escolhe a referência internacional num enunciado que pede a Caderneta — a pegadinha exata da divergência.' },
          { t: 'Até 15 meses', correct: true, why: 'Certa. Pela Caderneta, "diz uma palavra" e "nomeia membros da família" são marcos de até 15 meses — e é esse o corte que as bancas cobram.' },
          { t: 'Até 18 meses', correct: false, why: '18m é faixa de consolidação (várias palavras), além do marco isolado de 15m. Por que cair na D: atrasa o corte.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 9 — E6 Mnemônico-âncora · linguagem ===================== */
  // Página 9 — Estratégia: E6 — Mnemônico-âncora primeiro
  P.push(page('p9', 9, `
    ${tag('ling', 'A escada da linguagem · síntese de uma área')}
    ${chips(['6 degraus de 1m a 15m', 'jargão = prosódia sem significado', 'polissílabos vogais (Nelson)', 'cada degrau pressupõe o anterior'])}

    <aside class="opener opener--mnemonic" aria-label="Mnemônico de abertura">
      <p class="opener__mnemonic-tag">A escada da linguagem, de cima a baixo</p>
      <p class="opener__mnemonic-quote"><strong>1m</strong> chora / reage ao som → <strong>2m</strong> vocaliza vogais → <strong>3-4m</strong> fonemas ("gugu") → <strong>até 9m</strong> duplica sílabas ("mamá") → <strong>10-12m</strong> jargão → <strong>até 15m</strong> diz uma palavra (com significado) e nomeia a família.</p>
      <p>Seis degraus. Cada um pressupõe o anterior. Agora, de onde vem cada um — e o que é, afinal, esse "jargão".</p>
    </aside>

    <h1 class="page-title">Como reconhecer que a criança "está conversando" antes de saber qualquer palavra.</h1>

    ${escada({
      caption: 'a escada da linguagem completa, do choro à primeira palavra — cada degrau é pré-requisito do seguinte.',
      hint: 'O Nelson acrescenta dois degraus mais precoces (polissílabos vogais 6-7m; palavra ~12m).',
      steps: [
        { age: '1m', label: 'chora / reage ao som', sub: 'reação inespecífica', tone: 'ms' },
        { age: '2m', label: 'vocaliza vogais', sub: 'som além do choro', tone: 'ms' },
        { age: '3-4m', label: 'fonemas ("gugu")', sub: 'mais que a vogal solta', tone: 'ms' },
        { age: 'até 9m', label: 'duplica sílabas ("mamá")', sub: 'organizada', tone: 'ms' },
        { age: '10-12m', label: 'jargão', sub: 'prosódia sem significado', tone: 'warn' },
        { age: 'até 15m', label: 'diz uma palavra', sub: '+ nomeia a família', tone: 'good' },
      ]
    })}

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">A escada completa: seis degraus de 1m a 15m</h3>
        <p>A linguagem, espalhada faixa a faixa ao longo de toda a avaliação, ganha aqui uma vista única. Ao <strong>1 mês</strong>, a criança essencialmente <strong>chora</strong> e <strong>reage a um som</strong> (reação inespecífica). Aos <strong>2 meses</strong>, surge a <span class="term">vocalização</span> — sons além do choro, principalmente <strong>vogais</strong>, um fonema diferente do choro. Dos <strong>3-4 meses</strong>, aparecem os <span class="term">fonemas</span> ("gugu", "ê", "gru gru"), mais complexos que a vogal solta. <strong>Até os 9 meses</strong>, a criança <strong>duplica sílabas</strong> ("mamá", "papá", "dadá") — cada vez mais perto de uma palavra com significado. Dos <strong>10-12 meses</strong>, vem o <span class="term">jargão</span>. E <strong>até os 15 meses</strong> (pela Caderneta), a criança <strong>diz uma palavra</strong> com significado e <strong>nomeia membros da família</strong>. Vale a divergência já vista: o <span class="term term--nelson">Nelson</span> descreve <strong>polissílabos vogais aos 6-7 meses</strong> (repetição ininterrupta do mesmo fonema, "mamamama") — um degrau de balbucio mais precoce que a duplicação organizada da Caderneta.</p>

        <h3 class="topic-h">Jargão: a conversa sem palavras</h3>
        <p><span class="term">Jargão</span> é uma <strong>linguagem incompreensível</strong>, mas que tem a <strong>prosódia de uma conversa</strong> — a melodia, o ritmo, as inflexões de quem está conversando. Percebe-se que a criança está "tentando contar uma história", com entonação de fala de verdade, mas <strong>sem usar nenhuma palavra com significado</strong>. É o degrau imediatamente anterior à primeira palavra: a criança já domina a <strong>música</strong> da língua (a prosódia) antes de dominar o <strong>conteúdo</strong> (o significado). Reconhecer jargão é reconhecer que a linguagem expressiva está a caminho, mesmo sem nenhuma palavra reconhecível ainda.</p>
      </div>
    </div>

    ${divCard({
      titulo: 'os degraus do balbucio e a 1ª palavra',
      ms: { label: 'Caderneta / MS', rows: [{ k: 'Balbucio / sílabas', v: 'duplica sílabas organizadas (~9m)' }, { k: 'Primeira palavra', v: 'até <strong>15m</strong>' }] },
      nelson: { label: 'Nelson', rows: [{ k: 'Balbucio / sílabas', v: '<strong>polissílabos vogais</strong> (6-7m)' }, { k: 'Primeira palavra', v: '~<strong>12m</strong>' }] },
    })}

    ${medSplit({
      file: 'r9-instrumento-linguagem.png',
      alt: 'Recorte da Caderneta da Criança (Ministério da Saúde) com a coluna "Como pesquisar" ao lado dos marcos de linguagem, diferenciando jargão de "diz uma palavra"; documento oficial, sem foto de criança.',
      titulo: 'Recorte do Instrumento (Caderneta MS): como pesquisar a linguagem',
      achado: 'a coluna <strong>"Como pesquisar"</strong> ao lado dos marcos de linguagem — o instrumento diferencia jargão ("conversação incompreensível") de "diz uma palavra" (palavra reconhecível, sem contar nomes de familiares/animais).',
      fonte: 'Brasil, Ministério da Saúde, Caderneta da Criança: Menino — Passaporte da Cidadania, 7ª ed. rev., 2025, recorte da p. 82',
      licenca: 'CC BY-NC-SA 4.0', light: true, side: 'right', lic: 'nc',
      body: 'A própria Caderneta descreve o método: <strong>jargão</strong> é conversação incompreensível observada/referida; <strong>"diz uma palavra"</strong> exige palavra reconhecível durante o atendimento ou no relato, sem contar nomes de familiares ou animais. Isso evita confundir a duplicação silábica simples ("papá/dadá") com aquisição lexical de verdade.'
    })}

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>Atrasos de linguagem estão entre os mais frequentes e mais negligenciados; reconhecer a escada permite situar a criança e separar o normal ("ainda em jargão aos 12m") do que preocupa. E o jargão é cobrado como conceito: a banca descreve "fala incompreensível com entonação de conversa" esperando que você o nomeie.</p>
    </aside>

    ${quiz('p9', 'A escada da linguagem e o conceito de jargão (prosódia sem significado).', [
      {
        stem: 'Uma criança de 11 meses emite uma "fala" incompreensível, mas com entonação, ritmo e melodia de uma conversa de verdade, sem nenhuma palavra com significado. Como se chama esse marco e em que faixa ele é esperado?',
        alts: [
          { t: 'Vocalização; esperada aos 2 meses', correct: false, why: 'Vocalização (2m) é só emissão de vogais, sem prosódia de conversa. Por que cair na A: iguala "emitir som" a "ter melodia de fala".' },
          { t: 'Jargão; esperado dos 10-12 meses', correct: true, why: 'Certa. Jargão = linguagem incompreensível com a prosódia de uma conversa, sem palavras com significado — marco de 10-12 meses, o degrau anterior à primeira palavra.' },
          { t: 'Duplicação de sílabas; esperada até os 9 meses', correct: false, why: 'Duplicar sílabas ("mamá") tem unidades silábicas repetidas, não a entonação de conversa do jargão. Por que cair na C: confunde dois degraus vizinhos da escada.' },
          { t: 'Primeira palavra com significado; esperada aos 12 meses', correct: false, why: 'Não há palavra com significado — é justamente a marca do jargão (música sem conteúdo). Por que cair na D: lê a entonação como se já houvesse palavra real.' },
        ]
      },
      {
        stem: 'Qual é a ordem correta dos marcos de linguagem, do mais precoce ao mais tardio (referência Caderneta)?',
        alts: [
          { t: 'Vocaliza vogais → choro → fonemas → jargão → duplica sílabas → palavra', correct: false, why: 'Embaralha a ordem (choro depois da vocalização; jargão antes da duplicação). Por que cair: decorar marcos soltos, sem a lógica de complexidade crescente, faz a ordem virar chute.' },
          { t: 'Choro/reage ao som → vocaliza vogais → fonemas → duplica sílabas → jargão → diz uma palavra', correct: true, why: 'Certa. A escada vai do choro/reação ao som (1m) à primeira palavra (15m), passando por vocalização (2m), fonemas (3-4m), duplicação de sílabas (até 9m) e jargão (10-12m).' },
          { t: 'Fonemas → choro → duplica sílabas → vocaliza vogais → palavra → jargão', correct: false, why: 'Coloca o choro depois de marcos mais complexos e inverte jargão/palavra. Por que cair: ordem decorada sem lógica de complexidade crescente.' },
          { t: 'Duplica sílabas → jargão → vocaliza vogais → fonemas → choro → palavra', correct: false, why: 'Inverte completamente a sequência. Por que cair: ignora que a sequência é fixa (só o engatinhar, no eixo motor, é exceção).' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 10 — E5 Meta + checklist · classificação ===================== */
  // Página 10 — Estratégia: E5 — Meta da página + checklist
  P.push(page('p10', 10, `
    ${tag('alert', 'A classificação que vira conduta')}
    ${chips(['adequado · alerta · provável atraso', 'atual × anterior', 'PC ±2 z · ≥3 fenótipos', 'não vá além do enunciado'])}

    ${checklistOpener('Ao final desta página você vai saber:', [
      'As 3 categorias do MS (adequado / alerta / provável atraso) e o que define cada uma',
      'A conduta de cada categoria (puericultura / 30 dias / encaminhar à equipe multidisciplinar)',
      'Os cortes exatos que viram provável atraso (PC, fenótipos, marcos da faixa anterior)',
      'Por que nunca se classifica "além do que o enunciado informa"',
    ])}

    <h1 class="page-title">Três cores, três condutas: o que vira retorno em 30 dias e o que vira encaminhamento.</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">Adequado: tudo da faixa atual presente</h3>
        <p>A tarefa-resumo: atender uma criança de qualquer idade, verificar se ela faz todas as habilidades esperadas para a idade e, a partir disso, <span class="term">classificar o desenvolvimento</span>. O Ministério da Saúde propõe <strong>três categorias</strong>. <span class="hl-good">Categoria 1 — Desenvolvimento adequado:</span> a criança tem <strong>todos</strong> os reflexos/habilidades esperados para a <strong>faixa etária atual</strong>. <strong>Conduta:</strong> segue o acompanhamento de puericultura — retorna na próxima consulta programada pelo MS (não necessariamente mensal; as consultas vão se espaçando à medida que a criança cresce).</p>

        <h3 class="topic-h">Alerta: falta na faixa atual OU há fator de risco</h3>
        <p><span class="hl-warn">Categoria 2 — Alerta para o desenvolvimento:</span> há dois caminhos para cá. (a) A criança tem <strong>ausência de uma ou mais habilidades</strong> para a <strong>faixa etária atual</strong> (o instrumento escreve "reflexos ou habilidades", mas na prática são as <strong>habilidades</strong>). (b) A criança faz <strong>tudo</strong> o esperado para a faixa, <strong>mas tem algum fator de risco</strong>. A lista de fatores de risco do MS é grande e inclui: <strong>prematuridade; peso ao nascer &lt; 2.500 g; ausência ou insuficiência de pré-natal; intercorrências na gestação, parto ou nascimento; icterícia grave; hospitalização neonatal; doenças graves; consanguinidade dos pais; riscos ambientais/sociais (violência doméstica, suspeita de abuso, depressão materna, drogas/etilismo)</strong>. Essas crianças são <strong>sempre</strong> consideradas de alerta, mesmo com todos os marcos presentes. <strong>Conduta no alerta:</strong> <span class="term">reavaliar em 30 dias</span>, na atenção básica. (Ex.: uma criança de 9 meses cuja próxima consulta de rotina seria só aos 12m precisa ser revista em 30 dias — não se espera o calendário.)</p>

        <h3 class="topic-h">Provável atraso: falha na faixa anterior, PC fora ou fenótipo</h3>
        <p><span class="hl-bad">Categoria 3 — Provável atraso no desenvolvimento:</span> a criança tem <strong>ausência de habilidades/reflexos para a faixa etária ANTERIOR</strong>. Implicação lógica: essa criança necessariamente também falha na faixa atual — porque, se fizesse tudo da atual, você nem teria ido olhar a anterior. Há três gatilhos adicionais de provável atraso, e aqui entram os <strong>cortes numéricos exatos</strong> (referência MS): a criança com <span class="term">perímetro cefálico (PC) &gt; +2 ou &lt; −2 escore-z</span> (macro ou microcefalia); a criança com <strong>alterações fenotípicas sugestivas de síndrome genética</strong> — a fonte oficial MS especifica <span class="term">≥ 3 alterações fenotípicas</span> como gatilho; e, quanto aos marcos da faixa anterior, a fonte MS usa <span class="term">≥ 2 marcos ausentes da faixa anterior</span> nas faixas <strong>após o 1º ano</strong>, e <strong>≥ 1 marco ausente</strong> no <strong>1º ano</strong> (a leitura mais sensível, "uma ou mais", vale para o primeiro ano de vida). Os dois cortes coexistem por faixa — não se resolvem num só; é o ponto de classificação mais fino do tema. <strong>Não é preciso "voltar para trás" indefinidamente:</strong> numa criança de 4 anos que já salta, não se avalia se rola ou senta — assume-se que isso já foi adquirido.</p>

        <h3 class="topic-h">A conduta de cada cor (e o limite "não vá além do enunciado")</h3>
        <p><strong>Conduta no provável atraso (a diferença que cai em prova):</strong> seguindo o Instrumento de Vigilância do MS, essa criança deve ser <span class="term">encaminhada/referenciada para avaliação por equipe multidisciplinar</span> — diferente do alerta, que é revisto em 30 dias na própria atenção básica. Resumindo o semáforo: <strong>adequado</strong> → puericultura/próxima consulta · <strong>alerta</strong> → 30 dias na atenção básica · <strong>provável atraso</strong> → encaminha à equipe multidisciplinar. E uma regra de ouro de prova: <span class="hl-warn">não se classifica além do que o enunciado informa.</span> Se a banca só diz que a criança falha num marco da faixa atual, é <strong>alerta</strong> — mesmo que você "suspeite" de algo mais; só se vira provável atraso se o enunciado <strong>disser</strong> que ela também falha na faixa anterior (ou trouxer PC fora da faixa / fenótipo).</p>
      </div>
    </div>

    ${semaforo([
      { tone: 'good', nome: 'Adequado', def: 'Todas as habilidades da faixa ATUAL presentes.', conduta: 'segue puericultura / próxima consulta programada pelo MS.' },
      { tone: 'warn', nome: 'Alerta para o desenvolvimento', def: 'Falta ≥1 habilidade da faixa ATUAL <strong>OU</strong> tudo presente porém com fator de risco (prematuro · PN &lt; 2.500 g · risco social · etc.).', conduta: 'reavaliar em <strong>30 dias</strong> na atenção básica.' },
      { tone: 'bad', nome: 'Provável atraso no desenvolvimento', def: 'Falta de marco da faixa ANTERIOR (≥2 pós-1º ano / ≥1 no 1º ano) <strong>OU</strong> PC &gt; +2 / &lt; −2 escore-z <strong>OU</strong> ≥3 alterações fenotípicas de síndrome genética.', conduta: '<strong>encaminhar à equipe multidisciplinar</strong>.' },
    ])}

    ${flow('a decisão de 3 saídas: atual × anterior, com o atalho do PC/fenótipo.', [
      { kind: 'decision', label: 'Faz tudo da faixa ATUAL?' },
      { kind: 'node', tone: 'warn', label: 'SIM → tem fator de risco? Sim = Alerta (30 dias) / Não = Adequado (puericultura)' },
      { kind: 'decision', label: 'NÃO → Faz tudo da faixa ANTERIOR?' },
      { kind: 'node', tone: 'warn', label: 'SIM → Alerta (30 dias)' },
      { kind: 'node', tone: 'bad', label: 'NÃO → Provável atraso (encaminhar à equipe multidisciplinar)' },
      { kind: 'note', tone: 'bad', label: 'Ramo lateral: PC > +2 / < −2 escore-z OU ≥3 alterações fenotípicas → Provável atraso direto.' },
    ])}

    ${alertCard({ tone: 'warn', kicker: 'Pegadinha de prova', title: 'Alerta × provável atraso = faixa ATUAL × faixa ANTERIOR', body: 'Falha só na atual → <strong>alerta (30 dias)</strong>. Falha também na anterior (ou PC ±2 escore-z, ou ≥3 fenótipos) → <strong>provável atraso (encaminhar)</strong>. E <strong>fator de risco</strong> (prematuro, risco social) torna <strong>alerta</strong> mesmo com todos os marcos presentes.' })}

    ${collapsible('A lista completa de fatores de risco do MS', `
      <p>Prematuridade · peso ao nascer &lt; 2.500 g · ausência ou insuficiência de pré-natal · intercorrências na gestação, parto ou nascimento · icterícia grave · hospitalização neonatal · doenças graves · consanguinidade dos pais · riscos ambientais/sociais (violência doméstica, suspeita de abuso, depressão materna, drogas/etilismo). <strong>Qualquer um deles torna a criança de alerta, mesmo com todos os marcos presentes.</strong></p>
    `)}

    ${notaBanca('O enquadre sensível do primeiro ano generaliza "ausência de <strong>uma ou mais</strong> habilidades" para provável atraso. A fonte oficial MS especifica, para as faixas <strong>após o 1º ano</strong>, <strong>≥ 2 marcos da faixa anterior</strong> (e <strong>≥ 1</strong> no 1º ano), além de <strong>≥ 3 alterações fenotípicas</strong> e <strong>PC &gt; +2 / &lt; −2 escore-z</strong>. Os dois enquadres convivem (o sensível para o 1º ano, o específico para depois) — ambos ancorados, nenhum descartado. É o corte mais cobrável da classificação.')}

    ${pendingReal({
      rid: 'R10',
      titulo: 'reprodução da legenda de classificação da Caderneta (MS): faixas adequado/alerta/provável atraso',
      oque: 'Página/legenda de classificação do desenvolvimento da Caderneta (MS) com as faixas coloridas verde/âmbar/vermelho e as condutas.',
      body: 'A própria Caderneta usa as três cores — <span class="hl-bad">vermelho = provável atraso</span>, <span class="hl-warn">amarelo = alerta</span>, <span class="hl-good">verde = adequado</span> — com a conduta na coluna da direita. O semáforo autoral acima reproduz fielmente essas cores e condutas; a folha oficial (busca documentada inconclusiva como imagem aberta) ancoraria o reconhecimento visual.'
    })}

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>Essa é a página que vira conduta real: classificar errado significa ou liberar um atraso (perigoso) ou encaminhar à força um alerta (sobrecarrega o serviço e alarma a família). Os cortes — 30 dias × encaminhamento, atual × anterior — são exatamente o que separa a atenção básica do encaminhamento, e o que a banca cobra com precisão cirúrgica.</p>
    </aside>

    ${quiz('p10', 'As 3 categorias, as duas portas do alerta e a regra "não ir além do enunciado".', [
      {
        stem: 'Criança de 9 meses, em puericultura, faz todos os marcos da faixa de 7-9m exceto um (não senta sem apoio). Não há relato sobre marcos da faixa anterior. Classificação e conduta?',
        alts: [
          { t: 'Provável atraso — encaminhar à equipe multidisciplinar', correct: false, why: 'Provável atraso exige falha na faixa anterior (ou PC/fenótipo), não informada. Por que cair: "ir além do enunciado", supondo um déficit que o caso não descreve.' },
          { t: 'Alerta para o desenvolvimento — reavaliar em 30 dias na atenção básica', correct: true, why: 'Certa. Falta de uma habilidade da faixa atual = alerta → 30 dias. Como o enunciado NÃO diz que ela falha na faixa anterior, não se pode classificar como provável atraso.' },
          { t: 'Adequado — falta um único marco, sem significado', correct: false, why: 'Falta de marco da faixa atual NÃO é adequado — adequado exige todos presentes. Por que cair na C: minimiza a ausência de um marco exigível.' },
          { t: 'Provável atraso — pois um marco motor ausente sempre indica encaminhamento', correct: false, why: 'Um marco da faixa atual ausente é alerta, não provável atraso. Por que cair na D: "ir além do enunciado", supondo falha na faixa anterior que não foi descrita.' },
        ]
      },
      {
        stem: 'Um lactente de 6 meses, nascido prematuro, apresenta todos os marcos esperados para a sua faixa etária. Como classificá-lo?',
        alts: [
          { t: 'Adequado — todos os marcos da faixa estão presentes', correct: false, why: 'Marcos presentes não bastam quando há fator de risco. Por que cair na A: esquece a 2ª porta do alerta (fator de risco).' },
          { t: 'Alerta para o desenvolvimento — a prematuridade é fator de risco e torna a criança de alerta mesmo com todos os marcos presentes', correct: true, why: 'Certa. Há duas portas para o alerta: faltar marco da faixa atual OU ter fator de risco. A prematuridade é fator de risco da lista MS — logo, alerta (30 dias), ainda que todos os marcos estejam presentes.' },
          { t: 'Provável atraso — prematuros sempre têm atraso', correct: false, why: 'Prematuro NÃO é automaticamente provável atraso — é alerta; provável atraso exige falha na faixa anterior, PC fora ou fenótipo. Por que cair na C: superdimensiona o risco do prematuro.' },
          { t: 'Adequado, desde que o perímetro cefálico esteja normal', correct: false, why: 'Mesmo com PC normal, o fator de risco já classifica como alerta. Por que cair na D: cria uma condição que não anula o fator de risco.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 11 — E3 Caso clínico · casos + tabela plotada ===================== */
  // Página 11 — Estratégia: E3 — Caso clínico em abertura
  P.push(page('p11', 11, `
    ${tag('caso', 'A tabela aberta do lado · Sofia, Paulo e Carlos')}
    ${chips(['Sofia 9m · alerta', 'Paulo 4m15d · adequado', 'Carlos 10m · provável atraso', 'não vá além do enunciado'])}

    <article class="opener opener--case" aria-label="Caso clínico de abertura">
      <span class="opener__case-header">Sofia · 9 meses · faz quase tudo</span>
      <p class="opener__case-quote">Sofia tem <strong>9 meses</strong> e está em puericultura na clínica da família. Ela brinca de esconde-achou, transfere objetos de uma mão para a outra, duplica sílabas — faz quase tudo o que se espera de uma criança de 9 meses. Quase: ela <strong>não senta sem apoio</strong>. A mãe pergunta se está tudo bem. Antes de responder, abra a tabela e pergunte: o que falta é da faixa dela ou de uma faixa anterior? A resposta muda a conduta inteira.</p>
      <dl class="case-card__meta">
        <dt>Paciente</dt><dd>Sofia, 9 meses — puericultura na clínica da família</dd>
        <dt>Faz</dt><dd>esconde-achou, transfere objetos, duplica sílabas</dd>
        <dt>Não faz</dt><dd>não senta sem apoio (marco da faixa atual, 7-9m)</dd>
        <dt>A pergunta-fio</dt><dd>o que falta é da faixa atual ou da anterior?</dd>
      </dl>
    </article>

    <h1 class="page-title">Três irmãos, três idades, três classificações — e a tabela decide cada uma.</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">O combinado-mestre: questão de desenvolvimento se faz com a tabela aberta</h3>
        <p>Um combinado de método antes dos casos: questão de desenvolvimento se faz <span class="term">com as tabelas abertas do lado</span>. É uma "decorebinha com lógica" — não se exige memória fotográfica dos marcos, exige-se saber <strong>ler</strong>. Para cada idade, olhe a tabela inteira: o que tem <strong>naquela</strong> idade, o que vem <strong>antes</strong>, o que vem <strong>depois</strong>. Com isso na mão, qualquer enunciado vira um exercício de localizar e comparar.</p>

        <h3 class="topic-h">Sofia (9m) e a menina-conceito: alerta, não atraso</h3>
        <p><strong>Sofia, 9 meses:</strong> faz esconde-achou (permanência do objeto, esperado até 9m), transfere objetos, duplica sílabas — <strong>mas não senta sem apoio</strong>. Sentar sem apoio é marco <strong>da faixa dela</strong> (7-9m). Logo, ela tem <strong>ausência de uma habilidade para a sua faixa etária</strong> → <span class="hl-warn">alerta para o desenvolvimento</span>. Cuidado com a tentação de ir além: o enunciado <strong>não diz</strong> se ela falha em habilidade da faixa anterior. Se a banca tivesse dito (ex.: também não rola), poderíamos pensar em provável atraso do motor — mas <strong>não se pode ir além do que a banca informa</strong>. <strong>Conduta de Sofia:</strong> como é alerta, <strong>reaplicar o instrumento em 30 dias</strong> (não esperar até os 12 meses). <strong>Variação-conceito (menina de 9 meses):</strong> trazida à UBS, ao aplicar o Instrumento constatou-se <strong>pela primeira vez</strong> que ela <strong>não desenvolveu duas habilidades</strong> para a faixa atual; até então vinha dando conta de tudo. Como "até então dava conta de tudo", entende-se que na faixa anterior (até 6m) ela tinha tudo; agora, aos 9m, falham 2 habilidades da faixa <strong>atual</strong> → <span class="hl-warn">alerta</span> (ainda não é provável atraso, pois faz a faixa anterior). <strong>Conduta:</strong> reaplicar em 30 dias.</p>

        <h3 class="topic-h">O bebê de 6 meses do casal: o que se espera aos 6m</h3>
        <p><strong>Casal de adolescentes, filho de 6 meses, na UBS</strong>, preocupados se o desenvolvimento está normal. Lactente nascido <strong>a termo</strong>, em <strong>aleitamento materno exclusivo</strong>. O que se espera de uma criança normal <strong>aos 6 meses</strong>? A resposta correta: <strong>segurar um objeto com as duas mãos, levá-lo à boca e rolar no leito.</strong> Sobre "segurar com as <strong>duas</strong> mãos": aos 6m a criança <strong>ainda não transfere</strong>; pode até segurar com uma só, mas é típica a imagem dela agarrando o objeto <strong>com as duas mãozinhas</strong> e levando à boca. Se um marco gerar dúvida, <strong>vá por eliminação</strong>.</p>

        <h3 class="topic-h">Paulo (4m15d) × Carlos (10m): adequado × provável atraso</h3>
        <p><strong>Paulo (irmão), 4 meses e 15 dias:</strong> localiza som, rola na mesa de exame, faz busca ativa de objetos e os leva à boca, <strong>porém não os transfere</strong> de uma mão para a outra. Como já completou 4 meses, avaliam-se diretamente os marcos de 5-6m, e ele faz tudo. <strong>Não transferir não é problema</strong> — a transferência é esperada só ao fim do nono mês. Paulo tem <span class="hl-good">desenvolvimento adequado</span> → segue puericultura. <strong>Carlos (irmão), 10 meses:</strong> senta-se sem apoio, busca e transfere objetos, <strong>mas não brinca de esconde-achou e não duplica sílaba</strong>. Aos 10 meses já se pesquisaria o esperado até 11 meses; mas ele <strong>não faz habilidades que já deveria ter aos 9 meses</strong> — esconde-achou (permanência do objeto) e duplicar sílabas são da faixa de <strong>7-9m</strong>, ou seja, da faixa <strong>anterior</strong>. Logo, <span class="hl-bad">provável atraso no desenvolvimento</span> → <strong>deve ser encaminhado</strong>. O contraste entre os irmãos é o resumo do tema: <strong>Paulo</strong> (falha só na transferência, que ainda nem é esperada) = adequado; <strong>Carlos</strong> (falha em marcos da faixa anterior) = provável atraso.</p>
      </div>
    </div>

    ${alertCard({ tone: 'warn', kicker: 'Pegadinha de prova', title: 'Não vá além do enunciado', body: '<strong>Sofia</strong> falha num marco da faixa atual e o caso não fala da anterior → <span class="hl-warn">alerta</span> (não provável atraso). <strong>Paulo</strong> "não transfere", mas a transferência ainda nem é esperada na faixa dele → <span class="hl-good">adequado</span> (a ausência de um marco que não é exigido <strong>não conta</strong>). <strong>Carlos</strong> falha em marcos da faixa <strong>anterior</strong> → <span class="hl-bad">provável atraso</span>.' })}

    <h3 class="topic-h" style="margin-top:var(--sp-6)">A tabela viva recebe os 3 casos plotados</h3>
    <p class="prose-lead">O mesmo Instrumento dos Marcos, agora com os três irmãos lançados. Repare na cor: o "não transfere" de Paulo entra em <strong>cinza neutro</strong> (ainda não esperado, não conta); os ausentes de Carlos entram em <strong>vermelho na faixa anterior</strong> (7-9m) — é esse contraste que decide a conduta de cada um.</p>

    ${tabelaViva('p11a', {
      faixaAtiva: '7-9m',
      caption: '<strong>Sofia (9 meses)</strong> — presentes: esconde-achou, transfere, duplica sílabas (P verde); ausente na faixa ATUAL (7-9m): senta sem apoio (A vermelho). Falha só na faixa atual → <span class="hl-warn">Alerta / reavaliar em 30 dias</span>.',
      casos: { '7-9m': ['A', 'P', 'P', 'P'] }
    })}
    <div class="tabviva__caso-tags"><span class="tabviva__caso-tag tabviva__caso-tag--warn">Sofia · Alerta · 30 dias na atenção básica</span></div>

    ${tabelaViva('p11b', {
      faixaAtiva: '5-6m',
      caption: '<strong>Paulo (4 meses e 15 dias)</strong> — faz tudo de 5-6m (localiza som, rola, busca ativa, leva à boca: P verde). O "não transfere" cai na faixa 7-9m, mas a transferência <strong>ainda nem é esperada</strong> na faixa dele — entra em cinza neutro (não conta).',
      casos: { '5-6m': ['P', 'P', 'P', 'P'], '7-9m': ['N', 'N', 'N', 'N'] }
    })}
    <div class="tabviva__caso-tags"><span class="tabviva__caso-tag tabviva__caso-tag--good">Paulo · Adequado · segue puericultura</span></div>

    ${tabelaViva('p11c', {
      faixaAtiva: '10-12m',
      caption: '<strong>Carlos (10 meses)</strong> — presentes: senta sem apoio, transfere (P verde); ausentes na faixa ANTERIOR (7-9m): esconde-achou/permanência do objeto e duplicar sílabas (A vermelho). Falha na faixa <strong>anterior</strong> → <span class="hl-bad">Provável atraso / encaminhar</span>.',
      casos: { '7-9m': ['P', 'P', 'A', 'A'] }
    })}
    <div class="tabviva__caso-tags"><span class="tabviva__caso-tag tabviva__caso-tag--bad">Carlos · Provável atraso · encaminhar à equipe multidisciplinar</span></div>

    ${medSplit({
      file: 'r11-tabela-6-9m.jpg',
      alt: 'Quadro longitudinal de marcos motores, de linguagem e pessoais-sociais por mês (figura de artigo científico), com a janela de 6 a 9 meses; é quadro/heatmap, não foto de criança.',
      titulo: 'Quadro de marcos 6-9 meses (para conferir com a tabela aberta)',
      achado: 'as linhas "transfers an object from one hand to the other", "makes repetitive syllables", "rolls over" e "crawls" concentradas na janela de 6 a 9 meses — a faixa onde se resolvem Sofia e Carlos.',
      fonte: 'Sudry T. et al., JAMA Network Open, 2022;5(3):e222184, Figura 2 (via PMC/NCBI)',
      licenca: 'CC BY 4.0', light: true, side: 'right', lic: 'ok',
      body: 'Use o quadro para conferir "com a tabela aberta" enquanto resolve os casos: transferência e duplicação de sílabas estão na janela de 6-9m. Diferencial: um marco isolado discretamente tardio pode ser só vigilância; combinação de ausências (como Carlos) é o que dispara a triagem formal.'
    })}

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>Os casos são exatamente o formato de prova: o enunciado descreve o que a criança faz, e o trabalho é classificar sem inventar. A armadilha de Paulo (penalizar um marco não exigido) e a de Carlos (reconhecer que a falha é na faixa anterior) são as duas decisões que separam aprovado de reprovado no tema.</p>
    </aside>

    ${quiz('p11', 'Os casos resolvidos (atual × anterior) e a regra de eliminação.', [
      {
        stem: 'Carlos, 10 meses, senta-se sem apoio e transfere objetos de uma mão para a outra, mas não brinca de esconde-achou e não duplica sílabas. Classificação e conduta?',
        alts: [
          { t: 'Adequado — ele faz marcos avançados (senta, transfere), então está bem', correct: false, why: 'Fazer marcos avançados não compensa falhar nos da faixa anterior. Por que cair na A: impressiona-se com o que ele faz e ignora o que falta atrás.' },
          { t: 'Alerta — falta marco, reavaliar em 30 dias na atenção básica', correct: false, why: 'Se a falha fosse só na faixa atual, seria alerta; mas é na anterior → atraso. Por que cair na B: não percebe que os marcos ausentes (esconde-achou, duplicar sílabas) são de 7-9m, faixa anterior aos 10m.' },
          { t: 'Provável atraso — falha em marcos da faixa anterior (7-9m: permanência do objeto e duplicação de sílabas), deve ser encaminhado à equipe multidisciplinar', correct: true, why: 'Certa. Aos 10 meses, esconde-achou e duplicar sílabas são marcos da faixa anterior (7-9m). Falhar na faixa anterior = provável atraso → encaminhar. (E ele necessariamente falha na atual também — senão não teríamos ido olhar a anterior.)' },
          { t: 'Adequado — esconde-achou e duplicar sílabas não são marcos avaliáveis', correct: false, why: 'Ambos são marcos válidos e centrais (social/cognitivo e linguagem). Por que cair na D: desqualifica marcos legítimos por desconhecê-los.' },
        ]
      },
      {
        stem: 'Sobre o desenvolvimento neurológico do lactente, qual afirmação está correta?',
        alts: [
          { t: 'No recém-nascido, a predominância postural é em extensão', correct: false, why: 'O RN tem predominância em flexão (membros fletidos, PTC), não extensão. Por que cair na A: inverte o tônus do recém-nascido.' },
          { t: 'A evolução do desenvolvimento motor é céfalo-caudal', correct: true, why: 'Certa. A evolução motora é céfalo-caudal (crânio-caudal): cabeça → tronco → membros inferiores. As demais invertem ou atrasam fatos conhecidos.' },
          { t: 'O sorriso espontâneo surge em torno dos 3 meses', correct: false, why: 'O sorriso espontâneo (Nelson) é do 1º mês e nem está na Caderneta; o social é dos 2 meses — nenhum aos 3m. Por que cair na C: mistura as referências e atrasa o marco.' },
          { t: 'A criança sustenta a cabeça em torno dos 5 meses', correct: false, why: 'A sustentação da cabeça acontece muito antes de 5 meses (eleva em prono ao 1m, sustenta bem aos 3-4m). Por que cair na D: atrasa grosseiramente um marco precoce.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 12 — E1 Pergunta central · reflexos primitivos ===================== */
  // Página 12 — Estratégia: E1 — Pergunta central
  P.push(page('p12', 12, `
    ${tag('reflexo', 'Reflexos primitivos · o tripé')}
    ${chips(['presente? simétrico? sumiu na hora?', 'Moro · RTCA (esgrimista)', 'preensão palmar/plantar', 'persistência = doença'])}

    <section class="opener opener--question" aria-label="Pergunta de abertura">
      <span class="opener__question-mark" aria-hidden="true">?</span>
      <p class="opener__text">Um reflexo "normal" do recém-nascido é, muitas vezes, exatamente o mesmo movimento que, meses depois, vira sinal de doença neurológica. O Moro do RN é fisiológico; o Moro persistente aos 8 meses é bandeira vermelha. Se o movimento é idêntico, <strong>o que faz a diferença</strong> entre o normal e o patológico?</p>
    </section>

    <h1 class="page-title">O reflexo certo, na criança certa, na idade errada — vira doença.</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">O que é um reflexo primitivo e o tripé de avaliação</h3>
        <p>Faz parte da avaliação do desenvolvimento o acompanhamento dos <span class="term">reflexos primitivos</span>: <strong>respostas motoras automáticas e estereotipadas</strong> a um estímulo externo. A criança já nasce com alguns deles. São <strong>involuntários</strong> — faz-se um estímulo, espera-se uma resposta motora determinada. Ao longo dos primeiros meses, esses reflexos vão <strong>desaparecendo</strong> e são substituídos por <strong>movimentos voluntários e reflexos posturais</strong>. A avaliação de qualquer reflexo primitivo segue um <span class="term">tripé</span>: (1) está <strong>presente</strong> na idade esperada? (2) é <strong>simétrico</strong> (igual dos dois lados, mesma intensidade)? (3) <strong>desapareceu</strong> no momento em que deveria desaparecer? Conforme o sistema nervoso amadurece, o reflexo <strong>tem que sumir</strong> — e a <span class="hl-bad">persistência</span> além do prazo costuma indicar <strong>doença neurológica</strong>. Na prova, os <strong>quatro reflexos primitivos</strong> principais são: <strong>Moro</strong>, <strong>reflexo tônico-cervical assimétrico (RTCA)</strong>, <strong>preensão palmar</strong> e <strong>preensão plantar</strong>.</p>

        <h3 class="topic-h">Moro e RTCA (esgrimista): as duas manobras icônicas</h3>
        <p><span class="term">Reflexo de Moro</span> ("o reflexo mais bonitinho da pediatria"): pode ser pesquisado de várias formas — por exemplo, eleva-se o tronco da criança e deixa-se cair, segurando logo depois; ela faz um movimento de <strong>abrir e depois fechar os braços, com as mãozinhas abertas</strong>. Alguns autores descrevem que vem acompanhado de <strong>choro</strong>, mas isso <strong>não é obrigatório</strong>. <strong>Desaparecimento do Moro:</strong> some <strong>na forma completa até 3 meses</strong> e <strong>por completo até 6 meses</strong> — aos 3 meses a criança "não abre e fecha mais, só abre"; aos 6 meses, desaparece de vez. <strong>Persistência após esse período pode indicar doença neurológica.</strong> <span class="term">RTCA — reflexo tônico-cervical assimétrico</span> (também chamado <strong>reflexo do esgrimista</strong> ou <strong>reflexo de Magnus-Klein</strong>): com a criança deitada, gira-se a cabeça para um lado; ela <strong>estica braço e perna do lado para onde a cabeça virou</strong> e <strong>flete os membros do lado oposto</strong> — a posição de esgrimista ("en garde"). Avalia-se para os dois lados. <strong>Desaparecimento do RTCA:</strong> em geral <strong>até 3-4 meses</strong>, coerente com a perda da postura tônico-cervical e a aquisição de postura simétrica. <strong>Persistência costuma indicar doença neurológica mais grave.</strong></p>

        <h3 class="topic-h">Preensão palmar e plantar — e a pegadinha do cutâneo-plantar</h3>
        <p><span class="term">Reflexo de preensão palmar:</span> apoia-se o próprio dedo na <strong>região palmar</strong> e a criança <strong>fecha a mão</strong> involuntariamente. <strong>Desaparecimento:</strong> em geral <strong>até 3-4 meses</strong> (a fonte SBP cita 4-6 meses; o momento de desaparecimento dos reflexos primitivos <strong>varia muito na literatura</strong> — registre a janela, não um ponto). A perda da preensão palmar conversa com a aquisição da pega voluntária (pega cubital aos 4m). <span class="term">Reflexo de preensão plantar:</span> apoia-se o dedo <strong>abaixo dos pododáctilos</strong> (abaixo do dedão) e a criança faz movimento de <strong>preensão</strong>. <span class="hl-warn">Pegadinha:</span> a preensão plantar <strong>NÃO é o reflexo cutâneo-plantar</strong> (Babinski fisiológico, extensão do hálux) — é um reflexo de <strong>preensão</strong> (flexão dos dedos). <strong>Desaparecimento:</strong> pode-se encontrar a descrição de que some <strong>até 15 meses</strong>, mas é um dos tempos <strong>mais controversos</strong> da literatura. (Distinção a guardar: a preensão plantar — flexão — some ~15m; o cutâneo-plantar persiste ~18m.)</p>
      </div>
    </div>

    ${alertCard({ tone: 'warn', kicker: 'Pegadinha de prova', title: 'Preensão plantar ≠ reflexo cutâneo-plantar', body: 'A preensão plantar é <strong>flexão</strong> dos dedos (apoio abaixo do dedão), some ~15m; o cutâneo-plantar (Babinski fisiológico) é <strong>extensão</strong> do hálux, persiste ~18m. A banca troca os dois.' })}

    ${notaBanca('Os tempos de desaparecimento variam na literatura. Moro: <strong>completa ~3m / total ~6m</strong> (algumas fontes 4-6m). RTCA: <strong>~3-4m</strong>. Preensão palmar: aula <strong>3-4m</strong> / SBP <strong>4-6m</strong> (sobrepõem aos 4m). Preensão plantar: <strong>~15m</strong> (o mais controverso). Em prova, valoriza-se a <strong>persistência além do prazo = sinal de doença</strong>, mais que o ponto exato.')}

    ${notaValor('<strong>Tripé do reflexo: Presente? Simétrico? Sumiu na hora?</strong> Três perguntas para qualquer reflexo primitivo. Falhar em qualquer uma — ausente quando devia estar, assimétrico, ou persistente além do prazo — é bandeira.')}

    ${collapsible('Curiosidade (não usar em prova): RTCA × lateralidade', `
      <p>Há quem associe o lado preferencial do reflexo tônico-cervical assimétrico a uma futura lateralidade (destro/canhoto). É curiosidade, sem valor de prova — não use como critério de classificação. O que cai é o tripé (presente/simétrico/some) e a regra de persistência.</p>
    `)}

    ${svgPiso('s-4manobras', { caption: 'os 4 reflexos primitivos em painéis-ícone, silhueta neutra de RN (sem rosto): Moro (abre/fecha os braços, mãos abertas) · RTCA/esgrimista (cabeça virada, braço e perna estendidos de um lado, fletidos do outro — "en garde") · preensão palmar (dedo na palma, mão fecha) · preensão plantar (dedo abaixo do dedão, dedos fletem). Cada painel com o nome e a posição característica.', hint: 'O realce está no movimento-chave de cada reflexo — a posição de esgrimista é a mais icônica.' })}

    ${trilhaReflexos({
      caption: 'os 4 reflexos primitivos na linha do tempo — todos somem nos primeiros meses; persistir além do prazo é bandeira vermelha.',
      hint: 'Esta trilha é estendida na síntese final com a marcha automática (some) e o paraquedista (surge e fica).',
      tracks: [
        { name: 'Moro', tone: 'moro', from: 0, to: 6, note: 'completa ~3m / total ~6m' },
        { name: 'RTCA (esgrimista)', tone: 'rtca', from: 0, to: 4, note: 'até ~3-4m' },
        { name: 'Preensão palmar', tone: 'palmar', from: 0, to: 4, note: 'até ~3-4m (SBP 4-6m)' },
        { name: 'Preensão plantar', tone: 'plantar', from: 0, to: 15, note: 'até ~15m (o mais controverso)' },
      ]
    })}

    ${medSplit({
      file: 'r12-reflexos-primitivos.jpg',
      alt: 'Prancha ilustrada de reflexos primitivos (figura de artigo open access): painel mostrando o reflexo de Moro (abertura/abdução dos braços) e o reflexo tônico-cervical assimétrico em postura de esgrimista; ilustração, não foto de menor.',
      titulo: 'Prancha de reflexos primitivos: Moro e RTCA/esgrimista',
      achado: 'o <strong>Moro</strong> na fase de abertura (abdução/extensão dos braços após estímulo súbito, "abraço" em seguida) e o <strong>RTCA</strong> na postura de esgrimista (extensão do membro do lado da face, flexão contralateral).',
      fonte: 'Tele-Heri B. et al., Children, 2025, Figure A1 (artwork: Noemi Balogh, via PMC/NCBI)',
      licenca: 'CC BY 4.0', light: true, side: 'right', lic: 'ok',
      body: 'No <strong>Moro</strong>, a fase inicial é a abertura (abdução/extensão), seguida do fechamento em "abraço" e, muitas vezes, choro (não obrigatório). No <strong>RTCA</strong>, a rotação da cabeça gera a postura de esgrimista. Diferencial: não confundir Moro com startle simples ou espasmo; e não confundir RTCA fisiológico transitório com assimetria fixa (hemiparesia, lesão de plexo).'
    })}

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>Os reflexos são a outra metade da avaliação neurológica do lactente. O conceito-chave de prova não é o tempo exato (que varia), e sim a <strong>regra de persistência</strong>: um reflexo que deveria ter sumido e não sumiu é sinal de comprometimento do SNC. E a confusão plantar × cutâneo-plantar é pegadinha clássica.</p>
    </aside>

    ${quiz('p12', 'O tripé do reflexo, a regra de persistência e a distinção plantar × cutâneo-plantar.', [
      {
        stem: 'Por que um reflexo de Moro encontrado de forma completa aos 8 meses de idade deve ser valorizado como sinal de alerta?',
        alts: [
          { t: 'Porque o Moro nunca é um reflexo fisiológico, em nenhuma idade', correct: false, why: 'O Moro é fisiológico no recém-nascido. Por que cair na A: generaliza "alerta tardio" para "sempre patológico", esquecendo a janela normal.' },
          { t: 'Porque a persistência de um reflexo primitivo além do prazo de desaparecimento costuma indicar doença neurológica — o Moro completo deveria ter sumido até ~3-6 meses', correct: true, why: 'Certa. O Moro é fisiológico no RN, mas tem que desaparecer (forma completa ~3m, total ~6m). Persistir além do prazo sinaliza comprometimento do SNC — a regra-mestre dos reflexos.' },
          { t: 'Porque aos 8 meses o Moro deveria estar presente apenas de forma assimétrica', correct: false, why: 'O esperado não é "Moro assimétrico aos 8m" — é Moro ausente aos 8m; assimetria é outro critério (do tripé) e em qualquer idade já seria anormal. Por que cair na C: mistura simetria com desaparecimento.' },
          { t: 'Porque o Moro só é normal se vier acompanhado de choro', correct: false, why: 'O choro não é obrigatório no Moro. Por que cair na D: eleva um detalhe opcional a critério de normalidade.' },
        ]
      },
      {
        stem: 'Qual afirmação sobre os reflexos do recém-nascido/lactente está correta?',
        alts: [
          { t: 'A preensão plantar é o mesmo que o reflexo cutâneo-plantar (Babinski)', correct: false, why: 'Preensão plantar (flexão dos dedos) ≠ cutâneo-plantar (extensão do hálux/Babinski). Por que cair na A: a pegadinha exata da página — confundir dois reflexos plantares distintos.' },
          { t: 'Os reflexos primitivos (Moro, preensão palmar/plantar) são sempre patológicos após o primeiro mês de vida', correct: false, why: 'Os reflexos primitivos são fisiológicos por meses (Moro até ~6m, palmar ~3-4m, plantar ~15m). Por que cair na B: antecipa demais a "patologia", ignorando as janelas normais.' },
          { t: 'A avaliação de um reflexo primitivo considera se ele está presente, simétrico e se desaparece no tempo esperado', correct: true, why: 'Certa. O tripé: presente na idade certa, simétrico, e desaparecido no momento esperado. É a estrutura de avaliação de qualquer reflexo primitivo.' },
          { t: 'A persistência de um reflexo primitivo além do prazo é um achado sem significado clínico', correct: false, why: 'A persistência além do prazo é sinal de doença neurológica — o oposto de "sem significado". Por que cair na D: inverte a regra-mestre dos reflexos.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 13 — E7 Comparação chocante · paraquedista + HERÓI ===================== */
  // Página 13 — Estratégia: E7 — Comparação chocante
  P.push(page('p13', 13, `
    ${tag('sintese', 'O paraquedista que fica + o mapa-mestre')}
    ${chips(['posturais surgem · primitivos somem', 'paraquedista ~12m, fica', 'marcha automática some', 'senso crítico (MS × Nelson)'])}

    <section class="opener opener--vs" aria-label="Comparação de abertura">
      <div class="opener__vs-grid">
        <div class="opener__vs-side">
          <p class="opener__vs-side-label">Todos os primitivos</p>
          <p>Moro, RTCA, preensões, marcha automática — todos <strong>somem</strong> nos primeiros meses</p>
        </div>
        <div class="opener__vs-divider" aria-hidden="true">vs</div>
        <div class="opener__vs-side">
          <p class="opener__vs-side-label">O paraquedista</p>
          <p><strong>aparece</strong> no fim do primeiro ano e <strong>fica para sempre</strong></p>
        </div>
      </div>
      <p class="opener__vs-asterisk">Por que existe um reflexo que, ao contrário de todos os outros, surge tarde e nunca mais sai?</p>
    </section>

    <h1 class="page-title">Tudo some — menos o paraquedista, que chega no fim do primeiro ano e te protege a vida inteira.</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">Reflexos posturais: os que surgem, não os que somem</h3>
        <p>Além dos primitivos (que somem), existem reflexos que <strong>surgem</strong> ao longo dos primeiros meses: os <span class="term">reflexos posturais</span> — movimentos automáticos que ajudam a manter a <strong>postura e o equilíbrio</strong>, em repouso e em movimento. Eles são o contraponto dos primitivos: enquanto os primitivos vão sendo substituídos, os posturais vão sendo <strong>adquiridos</strong>, à medida que o controle motor amadurece. Há uma questão-conceito clássica que explora isso: qual reflexo está presente numa <strong>criança normal aos 3 anos</strong>? Moro aos 3 anos? Não. Preensão plantar? Não. Tônico-cervical assimétrico? Não. Marcha automática? Não — a <span class="term">marcha automática</span> (pega-se o RN, apoia-se o pezinho e ele faz um <strong>movimento de marcha involuntária</strong>) é um reflexo <strong>primitivo</strong> que desaparece nos primeiros meses.</p>

        <h3 class="topic-h">O paraquedista: surge no fim do 1º ano e fica para sempre</h3>
        <p>A resposta da questão é o <span class="term">reflexo do paraquedista</span>: surge no <strong>final do primeiro ano</strong> e fica para a vida toda. Projeta-se o tronco da criança para frente e ela <strong>estica os braços</strong> — em vez de cair de cara no chão. É a <strong>proteção contra a queda</strong> "para o resto da existência" (uma providência que protege a gente de cair de cara no chão, da infância à velhice). É o exemplo perfeito do reflexo postural: aparece quando o sistema motor está maduro o bastante para precisar dele, e não some mais. Contraste-síntese: <strong>marcha automática</strong> = primitivo, some nos primeiros meses; <strong>paraquedista</strong> = postural, surge ~12m e fica para sempre.</p>

        <h3 class="topic-h">O recado-mestre: faça com a tabela aberta e senso crítico</h3>
        <p>Dois recados de estudo fecham o tema. Primeiro: nas semanas de questões, está liberada a "cola" — fazer os exercícios <strong>consultando as tabelas</strong> o tempo todo; é assim que se domina o tema. Mas atenção: <strong>uma ou outra questão não se baseará no instrumento do MS</strong> — existem também as tabelas do <span class="term term--nelson">Nelson</span> como referência paralela. Segundo, o recado-mestre: este é um tema para se resolver <span class="term">com senso crítico</span>, sem ir "cheio de certeza", porque <strong>a resposta varia conforme a referência</strong> (MS × Nelson). Tendo essa noção — qual referência o enunciado adota, e onde elas divergem —, dá para desenrolar qualquer questão. A divergência não é um defeito do tema: é a própria competência que se cobra.</p>
      </div>
    </div>

    ${alertCard({ tone: 'good', kicker: 'Pegadinha de prova', title: 'Marcha automática some; paraquedista fica', body: 'A marcha automática é reflexo <strong>primitivo</strong> (desaparece cedo); o paraquedista é <strong>postural</strong> (surge ~12m e persiste). Numa "criança normal aos 3 anos", o único da lista que pode estar presente é o <span class="hl-good">paraquedista</span> — todos os primitivos já sumiram.' })}

    ${notaValor('<strong>Primitivo some, postural fica.</strong> O paraquedista é o postural que chega no fim do 1º ano e te acompanha a vida toda — o único reflexo do tema que aparece em vez de desaparecer.')}

    ${svgPiso('s-paraquedista', { caption: 'o paraquedista numa silhueta neutra (tronco projetado para frente, braços esticados para proteger a queda), em contraste com a marcha automática (pezinho apoiado, passo involuntário). Painel "primitivo que some × postural que fica".', hint: 'O realce está nos braços esticados — a proteção que fica para a vida.' })}

    ${medSplit({
      file: 'r13-paraquedista-marcha.jpg',
      alt: 'Ilustração de lactente sustentado em pé com uma perna apoiada e outra em flexão, compatível com a marcha automática (stepping reflex); ilustração de livro-texto, não foto de menor identificável.',
      titulo: 'Marcha automática (stepping reflex): o primitivo que some',
      achado: 'o lactente sustentado em pé, os pés tocando a superfície e a perna elevada marcando o <strong>passo involuntário</strong> — resposta automática esperada no início da vida e integrada nas primeiras semanas.',
      fonte: 'OpenStax, Maternal Newborn Nursing, Figure 23.19 "Stepping Reflex" (Rice University)',
      licenca: 'CC BY-NC-SA 4.0', light: true, side: 'right', lic: 'nc',
      body: 'A imagem ancora o lado "primitivo-que-some" do contraste. Diferencie do <strong>paraquedista</strong>: nele, o achado fica nos <strong>membros superiores</strong> (extensão dos braços, abertura das mãos para proteção diante de queda anterior), surge mais tarde e persiste como reação postural protetora. Confundível clássico: não chamar marcha automática de "início de andar voluntário".'
    })}

    <h3 class="topic-h" style="margin-top:var(--sp-6)">O mapa-mestre: marcos + reflexos + condutas num só quadro</h3>
    <p class="prose-lead">A figura-herói da aula — o quadro de revisão final que ensina o tema quase sozinho. Em cima, a linha do tempo de 1m a 15m com os marcos das 4 áreas em trilhas paralelas; sobreposta, a faixa de reflexos (os primitivos que terminam × o paraquedista que começa ~12m e não termina); e o box das 3 condutas (adequado/verde · alerta/âmbar · provável atraso/coral) com a regra "atual × anterior". Toque nos marcos, reflexos e condutas para explorar.</p>

    ${svgHero('p13', { caption: 'o mapa-mestre do desenvolvimento neuropsicomotor — marcos das 4 áreas (1m→15m), os reflexos que somem × o paraquedista que fica, e as 3 condutas num único quadro de revisão. Pronto para ser consultado "com a tabela aberta" em qualquer questão.' })}

    ${recall([
      'Sem reler: qual a regra-mestre de leitura da tabela (o que se faz quando falta um marco da faixa atual)?',
      'Qual é a única etapa da sequência motora que crianças normais podem pular — e por quê não é atraso?',
      'O que separa "alerta" de "provável atraso" em uma frase (e a conduta de cada um)?',
      'Qual é o único reflexo do tema que surge em vez de desaparecer — e quando ele aparece?',
    ])}

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>O paraquedista é cobrado como "o reflexo que fica" — e a questão "qual reflexo numa criança normal de 3 anos" é clássica. Mas o recado mais valioso é metacognitivo: desenvolvimento é tema de <strong>senso crítico</strong>, em que saber qual referência o enunciado adota (MS ou Nelson) vale mais que decorar um número. É o que separa o aluno que erra "com certeza" do que acerta sabendo onde está a divergência.</p>
    </aside>

    ${quiz('p13', 'O paraquedista (postural que fica) × marcha automática (primitivo que some).', [
      {
        stem: 'Qual dos seguintes reflexos pode estar normalmente presente numa criança hígida de 3 anos de idade?',
        alts: [
          { t: 'Reflexo de Moro', correct: false, why: 'Moro some até ~6m; persistir aos 3 anos é grave. Por que cair na A: lembra do Moro como "o reflexo do bebê" e esquece que ele some.' },
          { t: 'Reflexo de preensão plantar', correct: false, why: 'A preensão plantar some ~15m. Por que cair na B: o tempo tardio (~15m) engana, mas ainda está muito longe dos 3 anos.' },
          { t: 'Reflexo tônico-cervical assimétrico (RTCA / esgrimista)', correct: false, why: 'O RTCA some até ~3-4m. Por que cair na C: confunde a postura do esgrimista (icônica) com algo duradouro.' },
          { t: 'Reflexo do paraquedista', correct: true, why: 'Certa. O paraquedista é um reflexo postural que surge no fim do 1º ano e fica para a vida toda — logo, está presente aos 3 anos (e no adulto). Todos os demais são primitivos que já deveriam ter sumido.' },
        ]
      },
      {
        stem: 'Qual é a diferença fundamental entre a marcha automática e o reflexo do paraquedista?',
        alts: [
          { t: 'Ambos são reflexos posturais que persistem por toda a vida', correct: false, why: 'Só o paraquedista é postural/duradouro; a marcha automática é primitiva e some. Por que cair na A: iguala dois reflexos que parecem "de andar/equilíbrio".' },
          { t: 'A marcha automática é um reflexo primitivo (desaparece nos primeiros meses); o paraquedista é postural (surge no fim do 1º ano e persiste)', correct: true, why: 'Certa. Marcha automática = primitivo, some cedo. Paraquedista = postural, surge ~12m e fica. É o contraste-síntese "primitivo some × postural fica".' },
          { t: 'A marcha automática surge no fim do 1º ano; o paraquedista está presente ao nascer', correct: false, why: 'Inverte os dois — quem surge no fim do 1º ano é o paraquedista, e a marcha automática está presente ao nascer. Por que cair na C: troca as cronologias.' },
          { t: 'Ambos desaparecem nos primeiros meses de vida', correct: false, why: 'O paraquedista NÃO desaparece — fica para a vida. Por que cair na D: aplica a regra dos primitivos (somem) ao postural (que fica).' },
        ]
      },
    ])}
  `));

  return P;
}
