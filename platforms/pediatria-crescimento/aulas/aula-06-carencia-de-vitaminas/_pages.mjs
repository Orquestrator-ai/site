/* _pages.mjs — conteúdo autoral das 13 páginas da Aula 06 "Carência de vitaminas" (bônus).
   Texto-aluno = canon do prompt-final (§6), renderizado verbatim. Tópicos visíveis = <h3 class="topic-h">.
   Anti-metalinguagem: voz de professor direto ao aluno; o texto É o conteúdo.
   Aberturas E1-E8 conforme o plano (anti-monotonia). SVGs de piso (S-01..S-13) e 2 figuras-herói
   (P3 eixo PTH, P13 Tabelão) embutidos inline pelos helpers do _build (script self-contained roda só).
   Quiz gold (explica TODAS as alternativas) fiel ao prompt-final. Eixo cromático:
   lipo ADEK (sky/teal) × hidro B+C (coral) × pegadinha (âmbar) × conduta/profilaxia (verde). */

export function buildPages({ med, svgPiso, svgHero, notaBanca, notaValor, cmp, collapsible, recall, synthCases, quiz, tag, chips, page }) {
  const P = [];

  /* ===================== PÁGINA 1 — E1 Pergunta central ===================== */
  // Página 1 — Estratégia: E1 — Pergunta central
  P.push(page('p1', 1, `
    ${tag('meta', 'Enquadramento · o padrão de prova')}
    ${chips(['clínica ↔ deficiência', 'micronutriente = cofator', 'ADEK lipossolúveis', 'B + C hidrossolúveis'])}

    <section class="opener opener--question" aria-label="Pergunta de abertura">
      <span class="opener__question-mark" aria-hidden="true">?</span>
      <p class="opener__text">Se existem dezenas de micronutrientes essenciais à vida, por que dá pra acertar quase toda questão de prova decorando só um punhado de associações entre quadro clínico e vitamina?</p>
    </section>

    <h1 class="page-title">Decore pouco, acerte muito: o padrão de prova é a chave</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">O padrão único de questão</h3>
        <p>Carência de micronutrientes é, em prova, um dos temas <span class="hl-good">mais previsíveis</span> que existem — e isso é uma boa notícia. A questão chega quase sempre de uma de duas formas. Na primeira, um <span class="term">caso clínico</span> descreve um paciente e pergunta, no final, <strong>qual a provável deficiência vitamínica</strong>. Na segunda, um enunciado curto pergunta o contrário: <strong>quais as manifestações esperadas</strong> para a falta de determinada vitamina. Repare que os dois formatos cobram a <strong>mesma associação</strong> — apenas trocam o lado por onde se entra. Por isso o foco do estudo não é esgotar a função bioquímica detalhada de cada vitamina (isso quase nunca cai), e sim cravar a ligação <span class="term">quadro clínico ↔ deficiência</span>. É uma associação por vitamina, e são poucas vitaminas que importam. Dominado esse núcleo, resolve-se a imensa maioria do que se cobra.</p>

        <h3 class="topic-h">O que é micronutriente e por que falta</h3>
        <p>Antes das associações, dois conceitos que sustentam tudo. <span class="term">Micronutriente</span> é uma vitamina ou um sal mineral que funciona como <strong>cofator</strong> de reações bioquímicas — peças sem as quais reações essenciais à vida simplesmente não acontecem. É por isso que a falta de um micronutriente vira doença: não é "fraqueza" genérica, é uma reação que travou. E por que um paciente chega a faltar? Há <strong>quatro caminhos</strong>, e vale conhecê-los porque o enunciado costuma plantar a causa no contexto: <span class="term">dieta deficiente</span> (a via mais comum — a maioria dos micronutrientes vem da alimentação), <span class="term">estado catabólico intenso</span> (paciente oncológico, grande queimado — o corpo consome mais do que repõe), <span class="term">má-absorção intestinal</span> (a comida tem, mas o intestino não absorve) e <span class="term">erro inato do metabolismo</span>. Na vida real, a carência costuma ser <strong>de mais de um micronutriente ao mesmo tempo</strong>, e aí fica difícil apontar o culpado isolado. A prova sabe disso — e por isso faz o oposto.</p>

        <h3 class="topic-h">A divisão-mãe: lipossolúveis × hidrossolúveis</h3>
        <p>A primeira organização que você precisa ter na cabeça divide as vitaminas pela forma como são absorvidas. As <span class="hl-good">lipossolúveis</span> são absorvidas junto com a gordura — dependem de gordura para entrar. São <strong>quatro: A, D, E e K</strong> (o mnemônico <span class="term">ADEK</span> resolve). As <span class="hl-bad">hidrossolúveis</span> são absorvidas na luz intestinal junto com a água, e são as <strong>vitaminas do complexo B</strong> (várias) <strong>e a vitamina C</strong>. Essa divisão não é decoração: ela já antecipa pegadinhas (quem tem má-absorção de gordura falta lipossolúvel, não hidrossolúvel) e organiza o mapa que será construído achado por achado. Guarde a moldura: <strong>ADEK lipossolúveis · complexo B + C hidrossolúveis</strong>.</p>
      </div>
    </div>

    <aside class="op-summary">
      <p class="op-summary__label">Regra de ouro</p>
      <p>Na prova, a deficiência <strong>múltipla</strong> quase nunca aparece — o enunciado traz uma clínica <strong>bem específica de um único micronutriente</strong>, senão seria impossível acertar. Quando o caso é "limpo demais", é de propósito: ele está te entregando a associação.</p>
    </aside>

    ${svgPiso('S-01', { caption: 'o mapa-índice das vitaminas — índice vivo do tema: clique em cada vitamina (A, D, E, K, C, B1, B3, B6, B9/B12) para revelar o órgão-alvo e o achado-âncora que ela esconde. Aqui ele nasce como <strong>esqueleto/índice</strong> — é o mesmo Tabelão que fecha cheio na síntese final, hidratando linha a linha conforme cada vitamina for construída.', hint: 'Clique em cada nó do mapa, ou Tab + Enter; cada nó revela órgão-alvo + achado-âncora.' })}

    ${svgPiso('S-02', { caption: 'as quatro causas da carência — dieta deficiente, estado catabólico, má-absorção intestinal e erro inato do metabolismo convergem para o mesmo destino: a falta do micronutriente. O enunciado costuma plantar a causa no contexto do caso.', hint: 'Passe o mouse / Tab por cada seta: a causa que o enunciado plantou é a pista.' })}

    ${med({
      file: 'p1-marasmo-desnutricao.jpg',
      alt: 'Fotografia de 1972 na Índia: criança com marasmo (desnutrição energético-proteica grave), acentuadamente abaixo do peso, com emaciação e desproporção cabeça/corpo, no colo do pai também desnutrido. Os olhos de ambos estão tarjados para preservar a identidade.',
      achado: 'criança com <strong>marasmo</strong> — desnutrição energético-proteica grave: emaciação extrema, perda de massa muscular e subcutânea, desproporção cabeça/corpo, no colo do pai também desnutrido (Índia, 1972). <strong>Reforço:</strong> é o rosto da "carência de micronutriente" — o resultado clínico quando o aporte falha (causa nº 1: dieta deficiente). É o ponto de partida do raciocínio da prova: criança carente → caçar a deficiência específica.',
      fonte: 'Image courtesy of CDC Public Health Image Library #1702 (CDC/Don Eddins, 1972)',
      licenca: 'Domínio público'
    })}

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>A postura certa diante de um caso de carência não é caçar a vitamina rara de cabeça, e sim <strong>ler o contexto</strong> (dieta, prematuridade, má-absorção, medicação materna) e <strong>casar a clínica específica com a vitamina</strong>. O resto do estudo é construir, uma a uma, essas associações.</p>
    </aside>

    ${quiz('p1', 'Enquadramento: o padrão único de questão e a divisão-mãe lipo × hidro.', [
      {
        stem: 'Um enunciado descreve uma criança com má-absorção intestinal de gorduras e pergunta qual grupo de vitaminas está mais sob risco de deficiência. Qual a resposta?',
        alts: [
          { t: 'As hidrossolúveis (complexo B e C)', correct: false, why: 'Inverte exatamente o mecanismo — as hidrossolúveis entram com a água, e a má-absorção de <em>gordura</em> as poupa relativamente; cair nela é não ter ligado "lipo" a "gordura".' },
          { t: 'As lipossolúveis (A, D, E e K)', correct: true, why: 'Certa. A virada está na própria definição da divisão-mãe: as lipossolúveis (<strong>ADEK</strong>) são absorvidas <strong>junto com a gordura</strong>, então quem não absorve gordura é quem mais falta lipossolúvel.' },
          { t: 'Apenas a vitamina C', correct: false, why: 'Armadilha de subconjunto: a vitamina C é hidrossolúvel, e ainda que faltasse, não seria a <em>mais</em> sob risco nesse contexto — quem associa "deficiência" a "vitamina C" no automático cai aqui.' },
          { t: 'Nenhuma — má-absorção não causa carência vitamínica', correct: false, why: 'Nega o conceito-raiz: a má-absorção é uma das quatro causas clássicas de carência — quem marca isso confunde "comida presente" com "nutriente absorvido".' },
        ]
      },
      {
        stem: 'Por que as questões de carência de micronutrientes quase sempre trazem um caso clínico com clínica de uma única vitamina, se na vida real a deficiência costuma ser múltipla?',
        alts: [
          { t: 'Porque a deficiência múltipla não existe de fato', correct: false, why: 'Falso clinicamente — a deficiência múltipla é a regra na vida real, justamente o que torna o caso de prova artificialmente limpo; quem marca aqui troca "raro na prova" por "inexistente".' },
          { t: 'Porque a prova prefere casos raros', correct: false, why: 'Inverte o motivo: o caso não é raro, é <em>específico</em> — são coisas diferentes.' },
          { t: 'Porque um caso de deficiência específica é o que torna a questão respondível', correct: true, why: 'Certa. O enunciado "limpo" é escolha deliberada da banca: como na prática a carência é frequentemente de vários micronutrientes ao mesmo tempo (e aí seria impossível apontar um culpado), a questão isola <strong>uma</strong> clínica específica para que exista resposta única.' },
          { t: 'Porque a função detalhada de cada vitamina é o que se cobra', correct: false, why: 'Erra o alvo do estudo: o que cai é a <strong>associação clínica ↔ deficiência</strong>, não a função bioquímica detalhada — quem marca isto vai estudar o que menos rende.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 2 — E6 Mnemônico-âncora ===================== */
  // Página 2 — Estratégia: E6 — Mnemônico-âncora primeiro
  P.push(page('p2', 2, `
    ${tag('lipo', 'Lipossolúvel A · a vitamina da visão')}
    ${chips(['retinol = visão', 'manchas de Bitot', 'nictalopia', 'megadose por faixa', 'profilaxia N/NE'])}

    <aside class="opener opener--mnemonic" aria-label="Mnemônico de abertura">
      <p class="opener__mnemonic-tag">Mnemônico-âncora</p>
      <p class="opener__mnemonic-quote">Vitamina A = a vitamina da <strong>VISÃO</strong>. Faltou retinol → a clínica é ocular. Faça esse vínculo mental e a questão se resolve sozinha.</p>
    </aside>

    <h1 class="page-title">Vitamina A (retinol): quando o olho denuncia a deficiência</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">A = visão: a clínica ocular que fecha o diagnóstico</h3>
        <p>Vitamina A também se chama <span class="term">retinol</span>, e o melhor atalho de prova é tratá-la como a <strong>vitamina da visão</strong>: sua deficiência produz uma clínica essencialmente <strong>oftalmológica</strong>. Quatro achados formam o conjunto que você precisa reconhecer. A <span class="term">xeroftalmia</span> é o olho seco, a ressequidão ocular — o termo já carrega o "xero" de seco. As <span class="hl-warn">manchas de Bitot</span> são placas esbranquiçadas e espumosas na conjuntiva, fruto de <strong>hiperqueratinização</strong> do epitélio ocular — é o achado mais característico e o que a banca adora mostrar em foto. A <span class="term">nictalopia</span>, ou <strong>cegueira noturna</strong>, é a dificuldade de enxergar no escuro, e costuma ser o sintoma mais precoce — o retinol é matéria-prima da rodopsina, o pigmento da visão em baixa luz. E, nos casos avançados, surgem as <span class="hl-bad">úlceras de córnea</span>, que podem evoluir para a ceratomalácia (amolecimento da córnea) e cegueira irreversível. Reconheça o conjunto: <strong>olho seco + manchas de Bitot + cegueira noturna + úlcera de córnea = falta de vitamina A</strong>.</p>

        <h3 class="topic-h">A hiperqueratinização que não vale a pena decorar</h3>
        <p>A deficiência de vitamina A também causa hiperqueratinização de outros epitélios — trato respiratório, urinário, digestivo e pele. Mas guarde isto com leveza: essas manifestações são <span class="hl-warn">inespecíficas</span> e não fecham diagnóstico sozinhas. O que importa, o que a questão cobra, é o <strong>conjunto ocular</strong>. Se você gastar energia decorando a hiperqueratinização sistêmica, estará estudando o que não rende. Uma única ressalva útil para diferencial: <span class="hl-bad">ceratocone NÃO é deficiência de vitamina A</span> — é uma armadilha clássica de alternativa, porque o nome lembra córnea, mas não tem relação com retinol.</p>

        <h3 class="topic-h">Tratamento: a megadose por faixa etária</h3>
        <p>Tratar a deficiência clínica de vitamina A é repor em <span class="term">megadose</span>, com a dose variando conforme a faixa etária: a ordem de grandeza vai de <strong>50.000 a 200.000 unidades por dose</strong>. Em termos práticos, a régua da OMS/MS para a xeroftalmia usa <strong>200.000 UI para crianças de 12 a 59 meses</strong>, <strong>metade disso (≈100.000 UI) para menores de 1 ano</strong> e doses ainda menores para lactentes pequenos — a dose acompanha a idade. Não é um número que cai com precisão cirúrgica, mas a <strong>ordem de grandeza</strong> (dezenas a centenas de milhares de UI) e a estrutura "dose maior em criança maior" são o que se espera que você reconheça.</p>

        <h3 class="topic-h">Profilaxia: repor antes de faltar, no N/NE</h3>
        <p>Aqui entra a parte que mais cai. Em regiões do país onde a hipovitaminose A é endêmica, existe <span class="hl-good">profilaxia</span> — repor vitamina A <strong>antes</strong> de o paciente desenvolver deficiência. O Programa Nacional de Suplementação de Vitamina A (MS) define a dose por faixa: <strong>crianças de 6 a 11 meses → 100.000 UI</strong> (a cápsula de frasco amarelo) e <strong>crianças de 12 a 59 meses → 200.000 UI</strong> (frasco vermelho). A reposição é em <strong>megadose, com cadência semestral</strong> — respeitando o <span class="term">intervalo mínimo de 4 meses</span> entre doses (essa é a régua canônica do MS; "trimestral ou semestral" descreve a ordem de grandeza, mas o número que crava na prova é <strong>semestral / intervalo mínimo 4 meses</strong>). As regiões endêmicas são os estados do <strong>Norte e Nordeste</strong>, com bolsões em Minas Gerais, São Paulo e áreas específicas. A prova raramente detalha onde o paciente mora, mas se o enunciado planta "morador de área de risco", está sinalizando candidato a profilaxia.</p>
      </div>
    </div>

    ${med({
      file: 'p2-mancha-bitot-xeroftalmia.jpg',
      alt: 'Olho com mancha de Bitot — placa esbranquiçada e espumosa na conjuntiva temporal por hipovitaminose A.',
      achado: '<strong>Mancha de Bitot</strong> — placa esbranquiçada e espumosa na conjuntiva (hiperqueratinização do epitélio ocular), o achado mais característico da hipovitaminose A e o que a banca mostra em foto. A seta marca a placa espumosa temporal.',
      fonte: 'Image courtesy of CDC PHIL (CDC/Nutrition Program), accession 77-0418',
      licenca: 'Domínio público',
      cues: [{ x: 30, y: 50, r: 18, label: 'mancha de Bitot', lx: 30, ly: 74 }]
    })}

    ${svgPiso('S-03', { caption: 'o olho da hipovitaminose A — olho esquemático com os quatro achados: clique em cada um (xeroftalmia, mancha de Bitot, nictalopia, úlcera de córnea) para ver onde fica e o que significa. Ancora o mnemônico "A = visão" na topografia ocular.', hint: 'Clique em cada achado do olho, ou Tab + Enter; cada um revela uma linha.' })}

    ${cmp(
      'Vitamina A — profilaxia e tratamento por faixa (PNSVA / MS · OMS)',
      ['Faixa / cenário', 'Dose', 'Frequência', 'Onde'],
      [
        { cells: [{ t: 'Profilaxia 6–11 meses' }, { t: '<strong>100.000 UI</strong> (frasco amarelo)' }, { t: 'megadose semestral' }, { t: 'área endêmica (N/NE)' }] },
        { cells: [{ t: 'Profilaxia 12–59 meses' }, { t: '<strong>200.000 UI</strong> (frasco vermelho)', cls: 'cell-good' }, { t: 'megadose semestral (intervalo mín. 4 meses)' }, { t: 'área endêmica (N/NE)' }] },
        { cells: [{ t: 'Tratamento da xeroftalmia' }, { t: '50.000–200.000 UI/dose (dose ↑ com a idade)' }, { t: 'megadose terapêutica' }, { t: 'na deficiência clínica' }] },
      ]
    )}

    <aside class="trap">
      <p class="trap__tag">Pegadinha de prova</p>
      <p class="trap__text"><strong>Ceratocone não entra</strong> na lista da deficiência de vitamina A. Os achados que SÃO da deficiência: nictalopia/cegueira noturna, xerose corneal e conjuntival, manchas de Bitot, úlcera de córnea/ceratomalácia. A alternativa que cita ceratocone como "manifestação da hipovitaminose A" é a incorreta.</p>
    </aside>

    ${notaBanca('Para cravar na prova, a cadência da megadose profilática de vitamina A pelo MS é <strong>semestral, com intervalo mínimo de 4 meses</strong> — a fala "trimestral ou semestral" está certa na ordem de grandeza, mas o número canônico é semestral.')}

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>Diante de uma criança com cegueira noturna ou manchas conjuntivais espumosas, o reflexo correto é pensar em <strong>retinol</strong> e, se ela mora em área endêmica, lembrar que a profilaxia em megadose existe e tem dose definida por idade. É um dos poucos temas em que a conduta (dose) cai tanto quanto a clínica.</p>
    </aside>

    ${quiz('p2', 'A clínica ocular âncora e os números de profilaxia/tratamento.', [
      {
        stem: 'Sobre as manifestações oftalmológicas da hipovitaminose A, qual alternativa NÃO corresponde à deficiência de vitamina A?',
        alts: [
          { t: 'Nictalopia (cegueira noturna)', correct: false, why: 'A nictalopia é o sintoma ocular mais precoce da deficiência — pertence; quem a marca confundiu o comando da questão.' },
          { t: 'Xerose corneal e conjuntival', correct: false, why: 'A xerose (ressecamento) corneal/conjuntival é a própria xeroftalmia — pertence.' },
          { t: 'Ceratocone', correct: true, why: 'É a incorreta (resposta certa): o ceratocone é uma ectasia corneana sem relação com retinol. A virada é não se deixar levar pelo nome — "cerato" remete a córnea, e a deficiência de A afeta a córnea (úlcera, ceratomalácia), mas <strong>ceratocone é outra doença</strong>.' },
          { t: 'Manchas de Bitot', correct: false, why: 'As manchas de Bitot são o achado mais característico — pertencem.' },
        ]
      },
      {
        stem: 'Uma criança de 18 meses moradora de área endêmica do Nordeste comparece para puericultura, sem sinais de deficiência. Qual a conduta de suplementação de vitamina A correta?',
        alts: [
          { t: 'Não suplementar — só se houver clínica de deficiência', correct: false, why: 'Ignora a existência da profilaxia: em área endêmica repõe-se preventivamente — quem marca trata "deficiência" e "profilaxia" como se fossem a mesma decisão.' },
          { t: 'Megadose profilática de 200.000 UI, em esquema semestral', correct: true, why: 'Certa. Aos 18 meses a criança está na faixa <strong>12–59 meses</strong>, cuja dose profilática pelo PNSVA é <strong>200.000 UI</strong>, em megadose semestral (intervalo mínimo de 4 meses) — e a profilaxia se faz <strong>antes</strong> da deficiência, em área de risco.' },
          { t: 'Megadose profilática de 100.000 UI', correct: false, why: 'Dose certa para a <strong>faixa errada</strong>: 100.000 UI é a cápsula de 6–11 meses; cair aqui é não fixar o corte etário das duas cápsulas (amarela 6–11m / vermelha 12–59m).' },
          { t: 'Dose diária baixa, contínua, por via oral', correct: false, why: 'Não é o esquema do programa — a vitamina A profilática é <strong>megadose intermitente</strong>, não dose diária; quem marca mistura o modelo da vit. D (diária) com o da vit. A (megadose).' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 3 — E1 Pergunta central + HERÓI eixo PTH ===================== */
  // Página 3 — Estratégia: E1 — Pergunta central (paradoxo do eixo PTH)
  P.push(page('p3', 3, `
    ${tag('lipo', 'Lipossolúvel D · a que mais cai')}
    ${chips(['calciferol', '90% sol / 10% dieta', 'fígado + rim ativam', 'eixo PTH', '↑ fosfatase alcalina'])}

    <section class="opener opener--question" aria-label="Pergunta de abertura">
      <span class="opener__question-mark" aria-hidden="true">?</span>
      <p class="opener__text">Se a função da vitamina D é <strong>absorver cálcio</strong>, por que faltar vitamina D acaba <strong>desmineralizando o osso</strong> — exatamente o contrário do que se esperaria?</p>
    </section>

    <h1 class="page-title">Vitamina D (parte 1): o eixo que explica cada exame</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">Por que a vitamina D domina a prova</h3>
        <p>A vitamina D, também chamada <span class="term">calciferol</span>, é a deficiência que mais aparece em prova — e por bons motivos. É uma vitamina muito estudada, com funções que vão muito além do osso, e está "na moda": muita gente repõe, às vezes sem indicação, e a cada ano saem publicações novas. Mais que isso, há um <span class="hl-good">documento recente da Sociedade Brasileira de Pediatria, de 2024</span>, sobre rastreio, profilaxia e tratamento da hipovitaminose D — e atualização recente é ímã de questão. Resultado: enquanto as outras vitaminas caem como associação simples, a D cobra <strong>mecanismo, laboratório, diagnóstico e profilaxia</strong>. É a única que justifica estudar a fundo.</p>

        <h3 class="topic-h">Função e fontes: 90% sol, 10% dieta</h3>
        <p>As funções centrais e bem estabelecidas da vitamina D são duas: aumentar a <strong>absorção intestinal de cálcio e fósforo</strong> e aumentar a <strong>reabsorção de cálcio nos rins</strong>. Em uma frase: a vitamina D existe para <strong>manter o cálcio do corpo</strong>, e é por isso que está intimamente ligada à <span class="term">mineralização óssea</span>. De onde ela vem? Aqui está a primeira pegadinha, e ela é planta de alternativa errada: <span class="hl-warn">90% da vitamina D circulante vem da síntese cutânea</span> (a pele produz a partir da exposição solar) e apenas <strong>10% vem da dieta</strong> (óleo de peixe, gema de ovo, alguns vegetais). A banca <strong>inverte</strong> essa proporção — escreve "10% vem do sol" ou "60% vem do sol" — para te pegar. Grave o número certo: <strong>90% pele, 10% dieta</strong>. A fonte ainda define a forma: síntese cutânea e fontes animais geram <span class="term">vitamina D3 (colecalciferol)</span>; fontes vegetais geram <span class="term">vitamina D2 (ergocalciferol)</span>.</p>

        <h3 class="topic-h">A ativação depende de fígado E rim</h3>
        <p>Tanto a D3 quanto a D2 chegam ao corpo <strong>inativas</strong>. Para virarem hormônio ativo, precisam de duas hidroxilações em sequência: uma no <span class="term">fígado</span> e outra no <span class="term">rim</span>. Essa dependência tem consequência clínica direta: o <strong>hepatopata</strong> e o <strong>nefropata</strong> são pacientes de risco para hipovitaminose D, porque mesmo com vitamina disponível eles não conseguem ativá-la. Some a isso quem <strong>não se expõe ao sol</strong> e você já tem três grandes grupos de risco antes mesmo de falar de dieta.</p>

        <h3 class="topic-h">Banho de sol: por que NÃO se recomenda</h3>
        <p>Esta é a conduta-pegadinha mais importante da página, e o documento da SBP reforça com força: <span class="hl-bad">apesar de a síntese cutânea ser a principal fonte, NÃO se recomenda exposição solar proposital para obter vitamina D</span>. Nem no adulto, nem — e isso é o que mais cai — <strong>no bebê pequeno</strong>. A família não deve "pôr o bebê no sol" para prevenir hipovitaminose D. O motivo é uma conta de risco-benefício: o ganho de sintetizar um pouco mais de vitamina <strong>não supera</strong> o risco de câncer de pele associado à exposição solar. Então a fonte principal é o sol, mas a recomendação é <span class="hl-good">suplementar</span>, não tomar sol. Quem inverte isso na conduta erra a questão de consultório.</p>

        <h3 class="topic-h">O eixo PTH: a cadeia que explica toda a laboratorial</h3>
        <p>Agora o paradoxo da abertura se resolve, e com ele toda a laboratorial da vit. D fica <span class="hl-good">dedutível</span> — você nunca mais precisa decorar exame. Acompanhe a cadeia: faltando vitamina D, cai a <strong>absorção de cálcio e fósforo</strong> → <strong>cálcio e fósforo séricos reduzem</strong>. Quando o cálcio sérico cai, a <span class="term">paratireoide reage</span> e libera <span class="term">PTH</span> (uma das funções do PTH é manter o cálcio do sangue normal). E como o PTH consegue elevar o cálcio do sangue? <strong>Reabsorvendo cálcio do osso</strong> — tirando cálcio de onde ele está estocado. É exatamente essa reabsorção óssea, comandada pelo PTH, que <span class="hl-bad">desmineraliza o osso</span>. Eis o paradoxo desfeito: o osso não enfraquece pela falta direta de vitamina D, e sim pela <strong>ação do PTH</strong> que ela desencadeou. E há um marcador desse processo: a reabsorção óssea <strong>eleva a fosfatase alcalina</strong>, detectável no laboratório. A cadeia completa, que você deduz em vez de decorar, é:</p>
        <p class="callout-chain"><strong>↓ 25-hidroxivitamina D → ↓ cálcio e ↓ fósforo → ↑ PTH → reabsorção óssea (desmineralização) → ↑ fosfatase alcalina.</strong></p>
        <p>Entendido o eixo, cada valor de exame deixa de ser decoreba e vira consequência lógica.</p>
      </div>
    </div>

    ${med({
      file: 'p3-metabolismo-vitamina-d.jpg',
      plate: true,
      alt: 'Diagrama do metabolismo da vitamina D: luz solar gera vitamina D na pele; vitamina D da dieta vai ao fígado, onde vira 25(OH)D (calcidiol); nos rins vira 1,25(OH)2D (calcitriol) ativo, que facilita absorção intestinal de cálcio, reabsorção renal e reconstrução óssea.',
      achado: 'o <strong>metabolismo da vitamina D</strong> — síntese cutânea pelo sol, <strong>25-hidroxilação no fígado</strong> (calcidiol) e <strong>1-hidroxilação no rim</strong> (calcitriol, a forma ativa). <strong>Reforço:</strong> é o calcitriol que aumenta a absorção intestinal de cálcio e a reabsorção renal — sem ele, falta cálcio e o osso desmineraliza. Repare por que hepatopata e nefropata são grupos de risco: a ativação depende de fígado <em>e</em> rim. É o panorama que o eixo PTH abaixo aprofunda.',
      fonte: 'By OpenStax College, Anatomy &amp; Physiology, via Wikimedia Commons',
      licenca: 'CC BY 3.0'
    })}

    ${svgHero('p3', { caption: 'o eixo PTH da vitamina D — siga a cadeia passo a passo: ↓25-OH-D no intestino derruba cálcio e fósforo no sangue, a paratireoide responde com PTH, o PTH reabsorve cálcio do osso (desmineraliza) e a fosfatase alcalina sobe como marcador. Cada etapa acende em sequência; o tooltip explica o que acontece em cada órgão. É o que torna a página inteira dedutível.' })}

    ${collapsible('Quer ver o eixo passo a passo?', `
      <ol style="margin:0;padding-left:1.2em;display:grid;gap:.5em;">
        <li><strong>Intestino:</strong> sem vitamina D ativa, o intestino absorve menos cálcio e menos fósforo da dieta.</li>
        <li><strong>Sangue:</strong> com menos absorção, o cálcio e o fósforo séricos caem.</li>
        <li><strong>Paratireoide:</strong> o sensor de cálcio detecta a calemia baixa e a glândula libera PTH para corrigir.</li>
        <li><strong>Osso:</strong> o PTH eleva o cálcio do sangue do único jeito rápido possível — reabsorvendo-o do osso, o estoque; é essa retirada que desmineraliza.</li>
        <li><strong>Laboratório:</strong> a reabsorção óssea ativa os osteoblastos/osteoclastos e eleva a fosfatase alcalina, que vira o marcador do processo. Resultado lido no exame: ↓25-OH-D · ↓Ca · ↓P · ↑PTH · ↑FA.</li>
      </ol>`)}

    ${svgPiso('S-04', { caption: 'as fontes da vitamina D — dois ramos: sol e fontes animais geram <strong>D3 (colecalciferol)</strong>; fontes vegetais geram <strong>D2 (ergocalciferol)</strong>. A proporção 90/10 (sol/dieta) em destaque reforça a pegadinha que a banca inverte.', hint: 'Passe o mouse / Tab pelos ramos; o número 90/10 é o que a banca troca.' })}

    <aside class="trap">
      <p class="trap__tag">Pegadinha de prova</p>
      <p class="trap__text"><strong>90% síntese cutânea / 10% dieta.</strong> A prova inverte (planta "10% do sol" ou "60% do sol") como alternativa errada. E <strong>fototerapia da icterícia NÃO altera vitamina D</strong> — as lâmpadas de fototerapia não emitem UVB, então não sintetizam vitamina D (outra armadilha clássica).</p>
    </aside>

    <aside class="finding">
      <p class="finding__label">Fator de risco</p>
      <p>Risco de hipovitaminose D: pouca exposição solar / região com pouca incidência de sol · pele escura · prematuridade · dieta vegetariana · aleitamento materno exclusivo · síndromes desabsortivas · hepatopata · nefropata · obeso · uso de certos medicamentos. <strong>O leite materno, apesar de ideal, não supre a vitamina D</strong> — por isso há recomendação de profilaxia para todo bebê em aleitamento materno — com dose por faixa (400 UI/dia no 1º ano).</p>
    </aside>

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>Saber o eixo PTH é o que diferencia o aluno que <strong>deduz</strong> "↓Ca, ↓P, ↑PTH, ↑FA" de quem decora uma lista de exames sem entender — e por isso erra quando a banca muda um valor. E a conduta-chave do consultório é não mandar tomar sol: suplementa-se.</p>
    </aside>

    ${quiz('p3', 'O mecanismo que torna toda a laboratorial da vitamina D dedutível.', [
      {
        stem: 'Por que a deficiência de vitamina D, cuja função é absorver cálcio, leva à desmineralização óssea?',
        alts: [
          { t: 'Porque a falta de vitamina D dissolve diretamente o cálcio do osso', correct: false, why: 'Atribui ação direta à vitamina, pulando o PTH — é o erro de quem não montou o eixo; sem o PTH no meio, a laboratorial (↑PTH, ↑FA) fica inexplicável.' },
          { t: 'Porque o cálcio baixo estimula o PTH, que reabsorve cálcio do osso', correct: true, why: 'Certa. O osso não é desmineralizado pela falta <em>direta</em> de vitamina D, e sim pela resposta hormonal que ela desencadeia: cálcio sérico baixo → PTH → reabsorção de cálcio <strong>do osso</strong> para normalizar a calemia → desmineralização.' },
          { t: 'Porque a vitamina D em falta deposita fósforo no osso em excesso', correct: false, why: 'Inverte a direção do fósforo — na deficiência o fósforo sérico <strong>cai</strong>, não sobra; quem marca confunde a queda de P com depósito.' },
          { t: 'Porque a fosfatase alcalina baixa enfraquece o osso', correct: false, why: 'Inverte a fosfatase alcalina — ela <strong>sobe</strong> (marcador da reabsorção óssea), não cai; associar "baixa" a "fraqueza" é intuição enganosa sem o mecanismo.' },
        ]
      },
      {
        stem: 'Qual afirmação sobre a hipovitaminose D está ERRADA?',
        alts: [
          { t: 'Aproximadamente 10% da vitamina D vem da síntese cutânea', correct: true, why: 'É a errada (resposta certa): está <strong>invertida</strong> — são <strong>90%</strong> da síntese cutânea e 10% da dieta. É a pegadinha-rainha da vit. D; a banca troca a proporção e premia quem decorou o número certo.' },
          { t: 'O tratamento de todo paciente com deficiência, sintomático ou não, é com colecalciferol (D3)', correct: false, why: 'Correta — colecalciferol/D3 é o tratamento padrão da deficiência, sintomática ou não.' },
          { t: 'A fototerapia da icterícia não altera a vitamina D, pois as lâmpadas não emitem UVB', correct: false, why: 'Correta e sutil: as lâmpadas de fototerapia emitem na faixa azul, <strong>não UVB</strong>, então não produzem vitamina D — quem acha que "luz forte = vitamina D" cai.' },
          { t: 'A hipovitaminose D pode evoluir para raquitismo com rosário raquítico e crânio tabes', correct: false, why: 'Correta — raquitismo, rosário e crânio tabes são desfechos da deficiência.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 4 — E4 Achado típico / pegadinha ===================== */
  // Página 4 — Estratégia: E4 — Achado típico / pegadinha (rosário)
  P.push(page('p4', 4, `
    ${tag('lipo', 'Lipossolúvel D · clínica + laboratório + dose')}
    ${chips(['raquitismo', 'crânio tabes', 'geno varo/valgo', '↓Ca ↓P ↑PTH ↑FA', '400 / 600 UI'])}

    <aside class="opener opener--trap" aria-label="Achado-armadilha de abertura">
      <span class="opener__trap-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>
      </span>
      <div class="opener__trap-body">
        <p class="opener__trap-tag">Achado que engana</p>
        <p class="opener__trap-text">Uma criança com nodulações em fileira nas costelas — o <strong>rosário raquítico</strong>. Parece patognomônico de vitamina D. Mas há outra deficiência que produz um rosário <strong>visualmente idêntico</strong>. Como não cair?</p>
      </div>
    </aside>

    <h1 class="page-title">Vitamina D (parte 2): o que se vê, o que o laboratório mostra, e a dose que cai</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">Raquitismo: os achados que a prova mostra</h3>
        <p>A criança com deficiência de vitamina D desenvolve <span class="term">raquitismo</span> — um distúrbio da mineralização óssea. Os achados se dividem em inespecíficos e específicos. Os <strong>inespecíficos</strong> abrem o quadro: irritabilidade, criança muito chorosa, sudorese. Os <strong>específicos</strong> são os que fecham o raciocínio: <span class="hl-warn">crânio tabes</span> (amolecimento da calota craniana, que cede à pressão dos dedos como uma bolinha de pingue-pongue), <span class="hl-warn">rosário raquítico</span> (nodulações em fileira na junção costocondral, palpáveis e por vezes visíveis), <strong>alargamento das metáfises</strong> (punhos e tornozelos alargados) e <strong>alteração do eixo dos membros</strong> — <span class="term">geno varo</span> (pernas arqueadas para fora, "de cowboy") ou <span class="term">geno valgo</span> (joelhos para dentro, "em X"). Pode haver ainda alterações dentárias e atraso de erupção. Não tratado, o raquitismo deixa sequela: artrose e problemas de marcha no futuro. E uma equivalência importante: o que no <strong>adulto</strong> seria a manifestação específica da deficiência de vitamina D é a <span class="term">osteomalácia</span> — enfraquecimento ósseo com predisposição a osteoporose e fraturas. Raquitismo (criança) e osteomalácia (adulto) são as duas faces do mesmo problema.</p>

        <h3 class="topic-h">A laboratorial inteira deduzida do eixo</h3>
        <p>Aqui você colhe o que plantou. A forma de vitamina D que o <strong>laboratório dosa</strong> é a <span class="term">25-hidroxivitamina D</span> — existem várias formas (D3, D2, calcidiol, calcitriol), mas a 25-OH-D é a dosável, e é ela que indica a deficiência quando reduzida. O resto do painel você <span class="hl-good">deduz pelo eixo</span>, sem decorar: <strong>↓ 25-OH-vitamina D · ↓ cálcio · ↓ fósforo · ↑ PTH · ↑ fosfatase alcalina</strong>. Cada valor é consequência direta da cadeia PTH — o cálcio e o fósforo caem porque a absorção caiu, o PTH sobe para compensar, e a fosfatase alcalina sobe como marcador da reabsorção óssea que o PTH comanda. Se a banca te der um painel, você o reconstrói de cabeça.</p>

        <h3 class="topic-h">Os cortes que divergem entre sociedades</h3>
        <p>Agora a pegadinha de diagnóstico, e ela é honesta: <span class="hl-warn">o corte de 25-OH-vitamina D que define deficiência diverge entre sociedades</span> — não é dúvida sua, é incerteza viva da literatura. Guarde as três réguas:</p>
      </div>
    </div>

    ${svgPiso('S-14', { caption: 'a constelação do raquitismo — silhueta da criança com os cinco achados ósseos da página marcados, cada um no seu sítio anatômico real: clique em cada ponto (bossing frontal / crânio tabes, rosário raquítico, sulco de Harrison, alargamento de metáfises, geno varo/valgo) para ver onde mora e o que significa. O esquema mapeia onde procurar; a foto real do geno varo, logo abaixo, confirma o mesmo achado no corpo.', hint: 'Clique em cada achado da silhueta, ou Tab + Enter; cada ponto revela sítio + significado.' })}

    ${cmp(
      'Corte de 25-OH-vitamina D — três réguas lado a lado',
      ['Sociedade / referência', 'Deficiência', 'Insuficiência', 'Suficiência / alvo'],
      [
        { __cls: 'row-canon', cells: [{ t: '<strong>SBP 2024</strong> — canon BR (vigente)' }, { t: '<strong>&lt; 20 ng/mL</strong>', cls: 'cell-good' }, { t: '20–30 ng/mL' }, { t: '30–60 ng/mL (grupos de risco)' }] },
        { cells: [{ t: 'Endocrine Society' }, { t: '&lt; 20 ng/mL' }, { t: '21–29 ng/mL' }, { t: '≥ 30 ng/mL' }] },
        { cells: [{ t: 'IOM / AAP' }, { t: '<strong>&lt; 12 ng/mL</strong> — pegadinha clássica', cls: 'cell-warn' }, { t: '12–20 ng/mL' }, { t: '≥ 20 ng/mL' }] },
      ]
    )}

    <div class="lesson-card">
      <div class="prose">
        <p>O corte <strong>BR-pediátrico vigente é &lt; 20 ng/mL</strong> (SBP 2024) — é o que vale para responder no Brasil. O <span class="hl-warn">&lt; 12 ng/mL é o corte IOM/AAP</span>, e é a <strong>pegadinha clássica de prova</strong>: a banca pergunta "qual o corte de deficiência" e a resposta certa depende de <strong>qual sociedade</strong> ela cita. As duas estão corretas dentro da própria régua — o erro é tratar uma como universal.</p>

        <h3 class="topic-h">Tratamento: quando somar cálcio</h3>
        <p>O tratamento da deficiência é reposição de <span class="term">vitamina D3 (colecalciferol)</span> — para todo paciente com deficiência, sintomático ou não. A pegadinha de conduta está no cálcio: <span class="hl-bad">só se soma cálcio quando já há raquitismo</span> (deficiência com manifestação clínica, não apenas laboratorial). Na deficiência <strong>laboratorial isolada</strong>, repõe-se <strong>só D3</strong> — não se dá cálcio para todos. Sobre o tempo, a própria literatura avisa que o esquema é pouco padronizado: aproximadamente <strong>2 a 4 semanas de cálcio</strong> no raquitismo e <strong>4 a 6 semanas de D3 isolada</strong>, com nova dosagem de 25-OH-D depois para ajuste (algumas sociedades estendem o D3 a 6–12 semanas — por isso a regra é individualizar por causa, manifestação e aceitação da reposição). Diagnóstico e tratamento finos não costumam cair em detalhe; a <strong>dose de profilaxia, sim</strong> — e é o que vem agora.</p>

        <h3 class="topic-h">Profilaxia: a dose-rei da prova</h3>
        <p>Esta é a informação que <span class="hl-good">mais cai</span> de todo o tema, então crave os números pela SBP 2024. <strong>Toda criança</strong>, independentemente da dieta, recebe profilaxia: <strong>da 1ª semana de vida até 1 ano → 400 UI/dia</strong>; <strong>de 1 a 18 anos → 600 UI/dia</strong> (sem fator de risco). Pacientes <strong>com fator de risco</strong>, mesmo acima dos 18 anos, recebem <strong>1.200 a 1.800 UI/dia</strong>, individualizado. A grande novidade do documento de 2024 foi <span class="hl-good">estender a profilaxia até os 18 anos</span> — antes ia só até cerca dos 2 anos com ~600 UI. O motivo é fisiológico e cai como questão: há <strong>maior vulnerabilidade nos períodos de crescimento acelerado</strong> (1º ano de vida e dos 9 aos 18 anos), porque mais crescimento ósseo consome mais cálcio, que consome mais vitamina D. O que mais cai, literalmente, é a <strong>dose do 1º ano (400 UI/dia)</strong> e a <strong>dose após o 1º ano (600 UI/dia)</strong>. Por fim, uma pegadinha de rastreio: <span class="hl-warn">não se faz triagem (dosagem) universal de vitamina D</span> — só em grupos de risco. Na prática "todo mundo dosa", mas sem fator de risco não há indicação formal.</p>
      </div>
    </div>

    ${med({
      file: 'p4-raquitismo-geno-varo.jpg',
      alt: 'Criança com raquitismo carencial e arqueamento varo (geno varo) dos membros inferiores.',
      achado: '<strong>Raquitismo carencial</strong> — arqueamento varo (geno varo) dos membros inferiores por mineralização óssea deficiente; o eixo das pernas se curva para fora. A linha marca o eixo arqueado. (Face tarjada por privacidade.)',
      fonte: 'Image courtesy of CDC PHIL, ID #2435',
      licenca: 'Domínio público',
      tarja: 'orbital',
      cues: [{ x: 50, y: 70, r: 22, label: 'eixo varo (arqueado)', lx: 50, ly: 92 }]
    })}

    ${cmp(
      'Vitamina D — profilaxia por faixa (SBP 2024)',
      ['Faixa / cenário', 'Dose diária', 'Observação'],
      [
        { cells: [{ t: '1ª semana de vida até 1 ano' }, { t: '<strong>400 UI/dia</strong>', cls: 'cell-good' }, { t: 'toda criança, independe da dieta' }] },
        { cells: [{ t: '1 a 18 anos (sem fator de risco)' }, { t: '<strong>600 UI/dia</strong>', cls: 'cell-good' }, { t: 'novidade 2024: estendida até 18 anos' }] },
        { cells: [{ t: 'Com fator de risco (mesmo &gt; 18 anos)' }, { t: '1.200–1.800 UI/dia' }, { t: 'individualizado' }] },
      ]
    )}

    <aside class="dont-confuse">
      <p class="dont-confuse__label">Não confunda (planta o callback)</p>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side">
          <p class="dont-confuse__tag">Rosário raquítico (vit. D)</p>
          <p>Nodulações na junção costocondral. Entorno: geno varo/valgo, crânio tabes, ↓Ca/↓P/↑PTH/↑FA.</p>
        </div>
        <div class="dont-confuse__side">
          <p class="dont-confuse__tag">Rosário escorbútico (vit. C)</p>
          <p><strong>Visualmente idêntico</strong> — não dá para diferenciar só pelo aspecto. A distinção vem do contexto, das outras manifestações e dos fatores de risco. Guarde essa semente; ela volta na página da vitamina C.</p>
        </div>
      </div>
    </aside>

    ${notaBanca('A SBP 2024 lista o <strong>600 UI/dia</strong> como dose padrão de 1–18 anos <strong>sem risco</strong>; o <strong>1.200–1.800 UI/dia</strong> é do <strong>grupo de risco</strong>. São duas réguas separadas (padrão × risco), não uma faixa única. E o range de tratamento pode ir a 6–12 semanas conforme a sociedade.')}

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>Na puericultura, prescrever os <strong>400 UI/dia no 1º ano</strong> é rotina, e saber que a profilaxia agora vai até os 18 anos é atualização recente. No diagnóstico, o aluno avançado <strong>não cai</strong> no corte de vit. D porque sabe que a resposta depende da sociedade citada.</p>
    </aside>

    ${quiz('p4', 'A clínica, a laboratorial deduzida, os cortes que divergem e a dose-rei.', [
      {
        stem: 'Sobre a hipovitaminose D em pediatria, qual afirmação está CORRETA?',
        alts: [
          { t: '60% da vitamina D vem da síntese cutânea', correct: false, why: 'Erra a proporção — é <strong>90%</strong>, não 60%; é a pegadinha do número.' },
          { t: 'O leite materno tem concentração adequada de vitamina D, sendo a insuficiência incomum em aleitamento exclusivo', correct: false, why: 'Falsa e perigosa: o leite materno <strong>não</strong> supre a vitamina D, e por isso há profilaxia <strong>mesmo em aleitamento exclusivo</strong> — quem marca acha que "leite materno é completo para tudo", o que não vale para a vit. D.' },
          { t: 'Há maior vulnerabilidade à hipovitaminose D nos períodos de crescimento acelerado (1º ano e 9–18 anos)', correct: true, why: 'Certa. Crescimento ósseo acelerado puxa mais cálcio, logo mais vitamina D — e é por isso que a SBP 2024 <strong>estendeu a profilaxia até os 18 anos</strong>.' },
          { t: 'A triagem universal de vitamina D é recomendada para todas as crianças', correct: false, why: 'Inverte a regra de rastreio — <strong>não</strong> se faz triagem universal, só em grupo de risco; quem marca confunde a prática informal ("todo mundo dosa") com a recomendação formal.' },
        ]
      },
      {
        stem: 'Lactente de 8 meses, em aleitamento materno exclusivo, com deficiência laboratorial isolada de vitamina D (sem raquitismo). Qual a conduta?',
        alts: [
          { t: 'Repor vitamina D3 e cálcio para todos os casos de deficiência', correct: false, why: 'Generaliza o cálcio para todos — erro clássico; o cálcio é adjuvante do raquitismo, não da deficiência sem clínica.' },
          { t: 'Repor apenas vitamina D3 (colecalciferol)', correct: true, why: 'Certa. A pegadinha de conduta é o cálcio: ele só entra <strong>quando há raquitismo</strong> (manifestação clínica); na deficiência <strong>laboratorial isolada</strong>, repõe-se <strong>só D3</strong>.' },
          { t: 'Não tratar, pois não há manifestação clínica', correct: false, why: 'Confunde "sem sintoma" com "sem tratamento" — trata-se todo paciente com deficiência, sintomático ou não, justamente para evitar o raquitismo.' },
          { t: 'Suspender o aleitamento materno como medida principal', correct: false, why: 'Ataca o aleitamento, que é benéfico e deve ser mantido — a resposta é <strong>suplementar</strong>, não suspender o peito; quem marca culpa o leite em vez de complementá-lo.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 5 — E2 Dado impactante ===================== */
  // Página 5 — Estratégia: E2 — Dado impactante (a que menos cai)
  P.push(page('p5', 5, `
    ${tag('lipo', 'Lipossolúvel E · um gatilho, e acabou')}
    ${chips(['tocoferol', 'prematuro + hemólise + edema', 'o resto é inespecífico'])}

    <figure class="opener opener--stat" aria-label="Dado de abertura">
      <span class="opener__number">↓</span>
      <p class="opener__context">A vitamina que <strong>MENOS cai</strong>. Quando aparece, é quase sempre o <strong>mesmo</strong> gatilho — e é só esse que você precisa guardar: prematuro com anemia hemolítica e edema.</p>
    </figure>

    <h1 class="page-title">Vitamina E (tocoferol): um gatilho, e acabou</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">O gatilho único: prematuro + hemólise + edema</h3>
        <p>Vitamina E, ou <span class="term">tocoferol</span>, tem pouco detalhe a discutir, e isso é uma boa notícia para o estudo. A manifestação mais frequente e específica da sua deficiência é uma tríade que aparece no <strong>bebê prematuro</strong>: <span class="hl-bad">anemia hemolítica + edema</span>. Esse é o gatilho. Quando uma questão descreve um prematuro com anemia hemolítica e edema, o reflexo é <strong>vitamina E</strong>. Não é uma associação exclusiva — outras coisas causam hemólise no prematuro — mas é a âncora de prova, e é o que a banca cobra. Fixe o trio: <strong>prematuro + anemia hemolítica + edema = tocoferol</strong>.</p>

        <h3 class="topic-h">O resto é inespecífico (e não cai)</h3>
        <p>A deficiência de vitamina E tem outras manifestações, todas <span class="hl-warn">inespecíficas</span> e de baixo rendimento: diminuição ou perda de reflexos, ataxia, neuropatia periférica — achados neurológicos que aparecem em dezenas de outras condições e por isso não fecham diagnóstico sozinhos. Cite-os para completude, mas não invista neles. O que importa, repetindo porque é só isso que cai, é o <strong>prematuro que hemolisa com edema</strong>.</p>
      </div>
    </div>

    ${med({
      file: 'p5-esfregaco-picnocitos.jpg',
      alt: 'Esfregaço de sangue periférico em microscopia óptica mostrando picnócitos — eritrócitos pequenos, densos e irregularmente contraídos indicados por setas azuis — ao lado de burr cells e hemácias fragmentadas, na picnocitose infantil associada à deficiência de vitamina E.',
      achado: 'esfregaço de sangue periférico com <strong>picnócitos</strong> (setas azuis) — hemácias pequenas, densas e irregularmente contraídas, junto a hemácias fragmentadas (burr cells). <strong>Reforço:</strong> é assim que a hemólise oxidativa do prematuro aparece no sangue — a membrana sem antioxidante (vitamina E) se rompe, e o resultado é a picnocitose infantil. É o mecanismo da página visto no microscópio, distinto do esquizócito de microangiopatia (TTP), que tem outra causa.',
      fonte: 'Mohammed Nowfal FA, Ahmed S, Radaideh MA (2025), Cureus, via PubMed Central',
      licenca: 'CC BY 4.0'
    })}

    ${svgPiso('S-05', { caption: 'o par-âncora da vitamina E — o ícone do prematuro ligado por seta a "anemia hemolítica + edema". É a única associação que a prova cobra; a página é enxuta por mérito, porque a vitamina E quase não aparece.', hint: 'Siga a seta: prematuro → hemólise + edema = tocoferol.' })}

    <aside class="op-summary">
      <p class="op-summary__label">Regra de ouro</p>
      <p>É a vitamina que <strong>menos aparece</strong> em prova; quando aparece, é a associação <strong>prematuro + anemia hemolítica + edema</strong>. Saber só isso já resolve a deficiência de vitamina E.</p>
    </aside>

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>No prematuro, anemia hemolítica tem vários diferenciais; lembrar da vitamina E como uma das causas evita esquecer uma deficiência reponível. Mas, para a prova, basta o reconhecimento do gatilho.</p>
    </aside>

    ${quiz('p5', 'O único gatilho de prova da vitamina E.', [
      {
        stem: 'Em qual cenário a deficiência de vitamina E é a principal hipótese?',
        alts: [
          { t: 'Adulto alcoolista com confusão mental e ataxia', correct: false, why: 'É a tríade de <strong>Wernicke</strong> (tiamina/B1) — alcoolismo, confusão, ataxia; quem marca confunde a ataxia inespecífica da vit. E com a encefalopatia da B1.' },
          { t: 'Recém-nascido prematuro com anemia hemolítica e edema', correct: true, why: 'Certa. O gatilho de prova da vit. E é único: <strong>prematuro + anemia hemolítica + edema</strong>.' },
          { t: 'Lactente com pernas arqueadas e rosário costal', correct: false, why: 'É <strong>raquitismo</strong> (vit. D) — geno varo + rosário raquítico; cair aqui é trocar a vitamina lipossolúvel do osso pela do prematuro.' },
          { t: 'Criança com dermatite, diarreia e demência', correct: false, why: 'São os <strong>3 Ds da pelagra</strong> (niacina/B3); quem marca pula de uma associação para outra sem ler o cenário.' },
        ]
      },
      {
        stem: '(Verdadeiro ou Falso) "As manifestações neurológicas inespecíficas (ataxia, neuropatia, perda de reflexos) são o principal achado de prova da deficiência de vitamina E."',
        tf: true,
        alts: [
          { t: 'Verdadeiro', correct: false, why: 'Quem marca "Verdadeiro" cai porque os sintomas neurológicos soam "mais graves/específicos", quando na verdade aparecem em inúmeras condições e não discriminam a vit. E.' },
          { t: 'Falso', correct: true, why: 'Certa. Essas manifestações <strong>existem</strong>, mas são <strong>inespecíficas</strong> e de baixo rendimento — não são o achado de prova. O achado-âncora é o <strong>prematuro com anemia hemolítica e edema</strong>.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 6 — E7 Comparação chocante ===================== */
  // Página 6 — Estratégia: E7 — Comparação chocante (3 formas DHRN)
  P.push(page('p6', 6, `
    ${tag('lipo', 'Lipossolúvel K · coagulação')}
    ${chips(['naftoquinona', 'fatores 2-7-9-10', '3 formas de DHRN', 'plasma fresco', 'vit. K ao nascer'])}

    <section class="opener opener--vs" aria-label="Comparação de abertura">
      <div class="opener__vs-grid">
        <div class="opener__vs-side">
          <p>Três recém-nascidos sangram. <strong>Um nas primeiras 24 horas</strong>, outro no <strong>4º dia</strong>, outro <strong>depois da 1ª semana</strong>.</p>
        </div>
        <span class="opener__vs-divider" aria-hidden="true"><span class="opener__vs-asterisk">vs</span></span>
        <div class="opener__vs-side">
          <p><strong>Mesma vitamina faltando, três motivos diferentes.</strong> Confundir os três é exatamente o que a banca quer.</p>
        </div>
      </div>
    </section>

    <h1 class="page-title">Vitamina K (naftoquinona): a coagulação que falta no recém-nascido</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">Por que faltar vitamina K vira hemorragia</h3>
        <p>Vitamina K, ou <span class="term">naftoquinona</span> (na verdade um grupo de vitaminas), tem uma função que você precisa amarrar de imediato: ela participa da <strong>síntese de alguns fatores da cascata de coagulação</strong>. Quais? Os <span class="hl-bad">fatores 2, 7, 9 e 10</span> — decoreba clássico de prova, e vale guardar exatamente assim, <strong>2-7-9-10</strong>. A lógica é direta: sem vitamina K, esses fatores não são sintetizados adequadamente → a coagulação falha → <strong>manifestação hemorrágica</strong>. Pode haver hipovitaminose K com sangramento no adulto, mas em pediatria a condição que reina é a <span class="term">doença hemorrágica do recém-nascido</span> — e é o que mais cai.</p>

        <h3 class="topic-h">As três formas da doença hemorrágica do RN</h3>
        <p>Aqui está o coração da página, e o ponto que a prova mais explora trocando uma coisa pela outra. A doença hemorrágica do RN tem <strong>três formas</strong>, e o que as separa é o <span class="term">timing</span> e a <span class="term">causa</span>:</p>
      </div>
    </div>

    ${cmp(
      'Doença hemorrágica do RN — as 3 formas (timing × causa)',
      ['Forma', 'Quando', 'Causa', 'Detalhe'],
      [
        { cells: [{ t: '<strong>Precoce</strong>', cls: 'cell-bad' }, { t: 'primeiras <strong>24 horas</strong>' }, { t: 'uso materno de medicamento na gestação — principalmente <strong>anticonvulsivantes</strong> (fenitoína, fenobarbital); menos comum: varfarina, rifampicina, isoniazida' }, { t: 'a medicação materna interfere na passagem de vit. K; sangramento mais comum é GI, mas pode ser cutâneo/mucoso' }] },
        { cells: [{ t: '<strong>Clássica</strong>', cls: 'cell-warn' }, { t: '<strong>2º ao 7º dia</strong>' }, { t: '<strong>ausência</strong> da reposição de vitamina K ao nascer' }, { t: 'ocorre em RN saudável que não recebeu a profilaxia; sangramento cutâneo ou GI' }] },
        { cells: [{ t: '<strong>Tardia</strong>', cls: 'cell-good' }, { t: '<strong>após a 1ª semana</strong>' }, { t: '<strong>doença desabsortiva</strong>' }, { t: 'recebe leite/fórmula mas não absorve a vit. K; <strong>NÃO depende do tipo de alimentação</strong>, e sim da má-absorção' }] },
      ]
    )}

    <div class="lesson-card">
      <div class="prose">
        <p>Repare nas pegadinhas embutidas: a <strong>precoce</strong> é por <strong>medicação materna</strong>, não por dieta; a <strong>clássica</strong> é por <strong>falta de profilaxia</strong>, não por prematuridade; a <strong>tardia</strong> é por <strong>má-absorção</strong>, não porque a fórmula "tem menos vit. K". A banca embaralha exatamente esses três pares.</p>

        <h3 class="topic-h">Tratamento: vitamina K, e quando o plasma fresco entra</h3>
        <p>O tratamento da hipovitaminose K com sangramento é repor <strong>vitamina K por via intramuscular ou endovenosa</strong>. Mas há uma sutileza de raciocínio importante: a vitamina K <span class="hl-warn">não age na hora</span>. Ela precisa que o paciente <strong>sintetize</strong> os fatores 2-7-9-10 para então estancar o sangramento — e isso leva tempo. No <strong>sangramento muito grave</strong>, esse tempo não existe. Por isso, no sangramento grave, administra-se <span class="hl-good">plasma fresco</span>, que já contém os <strong>fatores de coagulação prontos</strong>, agindo <strong>imediatamente</strong> até a reposição de vitamina K fazer efeito. Resumindo a lógica: vitamina K resolve a causa, mas devagar; plasma fresco compra tempo no sangramento que não pode esperar.</p>

        <h3 class="topic-h">Profilaxia ao nascer e o gatilho do parto domiciliar</h3>
        <p>A profilaxia da doença hemorrágica é simples e universal: <span class="hl-good">todo recém-nascido recebe vitamina K ao nascer</span> (intramuscular ou oral), <strong>independentemente da via de parto</strong>. Junto, todo bebê recebe a vacina contra hepatite B. Sem essa reposição, sobe o risco da forma <strong>clássica</strong>. E aqui está um gatilho de prova elegante: quando a questão menciona <span class="term">parto domiciliar sem assistência</span>, ela está sinalizando um bebê que nasceu e <strong>não recebeu vitamina K</strong> — candidato a hemorragia por deficiência. O cenário do parto fora do hospital é a forma de a banca dizer "esse bebê pulou a profilaxia".</p>
      </div>
    </div>

    ${svgPiso('S-06', { caption: 'a cascata da vitamina K — os fatores <strong>2, 7, 9 e 10</strong> acesos como K-dependentes (os demais apagados): clique em cada um para ver seu papel na coagulação. Sem vitamina K, esses quatro não são sintetizados e a coagulação falha.', hint: 'Clique em cada fator aceso (2-7-9-10), ou Tab + Enter.' })}

    ${med({
      file: 'p6-injecao-im-vasto-lateral.png',
      plate: true,
      alt: 'Diagrama do músculo vasto lateral na coxa, indicando o sítio antero-lateral de injeção intramuscular, com os reparos ósseos (trocânter maior, côndilo lateral, patela) — rota usada na profilaxia de vitamina K do recém-nascido.',
      achado: 'o <strong>sítio e a técnica da injeção IM no vasto lateral</strong> da coxa — terço médio antero-lateral (ponto marcado "injection site"), com os reparos anatômicos: trocânter maior em cima, côndilo lateral e patela embaixo. É a rota usada na <strong>profilaxia de vitamina K do RN</strong>. <strong>Reforço:</strong> a cascata acima explica o <em>porquê</em> (fatores 2-7-9-10 que precisam de vitamina K); esta prancha mostra o <em>onde</em> da dose única ao nascer que previne a forma clássica da doença hemorrágica.',
      fonte: 'Diagrama anatômico do vasto lateral (recorte/render local · domínio público)',
      licenca: 'Domínio público'
    })}

    <aside class="mnemonic">
      <p class="mnemonic__label">Mnemônico</p>
      <p class="mnemonic__text">Fatores K-dependentes: <strong>2, 7, 9, 10</strong>. Guarde a sequência nua — é decoreba puro e cai do jeito que está.</p>
    </aside>

    <aside class="trap">
      <p class="trap__tag">Pegadinha de prova</p>
      <p class="trap__text">A forma <strong>precoce</strong> (&lt;24h) é por <strong>medicação materna</strong> (anticonvulsivante), NÃO por baixo aporte no aleitamento. A <strong>tardia</strong> é por <strong>doença desabsortiva</strong>, NÃO por "a fórmula ter menos vitamina K". A <strong>clássica</strong> ocorre em RN a termo e prematuro que não recebeu profilaxia, NÃO é exclusiva de prematuro por jejum. E "entre 12 e 72 horas" descreve a <strong>precoce/limite</strong>, não a clássica (que é 2º–7º dia).</p>
    </aside>

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>Na sala de parto, a vitamina K IM é rotina inegociável — e saber que ela não estanca sangramento agudo (precisa de plasma fresco no grave) é o que separa a conduta correta da incompleta. Na prova, separar as três formas é o que garante o ponto.</p>
    </aside>

    ${quiz('p6', 'Os fatores 2-7-9-10, as 3 formas e o papel do plasma fresco.', [
      {
        stem: 'Sobre a doença hemorrágica do recém-nascido por deficiência de vitamina K, qual afirmação está CORRETA?',
        alts: [
          { t: 'A forma tardia é mais comum em RN alimentado com fórmula, por menor teor de vitamina K na fórmula', correct: false, why: 'Erra a causa da tardia — ela depende de <strong>doença desabsortiva</strong>, não do tipo de leite; o erro mental é atribuir à dieta o que é má-absorção.' },
          { t: 'A forma clássica ocorre em RN saudáveis que não receberam reposição de vitamina K, manifestando-se por sangramento cutâneo ou gastrointestinal', correct: true, why: 'Certa. A forma <strong>clássica</strong> é, por definição, a do RN <strong>saudável</strong> que <strong>não recebeu a profilaxia</strong> ao nascer, entre o 2º e o 7º dia, com sangramento cutâneo ou GI.' },
          { t: 'A forma clássica surge entre 12 e 72 horas de vida', correct: false, why: 'Timing errado — 12–72h aponta para a <strong>precoce</strong>, não a clássica (2º–7º dia); quem marca embaralha as janelas.' },
          { t: 'A forma precoce decorre de baixo aporte no aleitamento materno exclusivo, sendo comum a hemorragia intracraniana', correct: false, why: 'Inverte a causa da precoce — ela é por <strong>medicação materna</strong> (anticonvulsivante), não por aporte no AME; associar "precoce" a "amamentação insuficiente" é a armadilha.' },
        ]
      },
      {
        stem: 'RN com sangramento gastrointestinal volumoso e instabilidade hemodinâmica por suspeita de deficiência de vitamina K. Além de repor vitamina K, qual a conduta para conter o sangramento grave imediatamente?',
        alts: [
          { t: 'Aguardar o efeito da vitamina K, que é imediato', correct: false, why: 'Premissa falsa — o efeito da vit. K <strong>não</strong> é imediato; quem marca não entendeu por que o plasma é necessário.' },
          { t: 'Administrar plasma fresco, que contém os fatores de coagulação prontos', correct: true, why: 'Certa. A vitamina K <strong>não age na hora</strong> — depende de o organismo <strong>sintetizar</strong> os fatores 2-7-9-10, o que leva tempo; no sangramento grave esse tempo não existe, então entra o <strong>plasma fresco</strong>, com os fatores prontos.' },
          { t: 'Repetir a dose de vitamina K em dobro', correct: false, why: 'Dobrar a vit. K não acelera a síntese dos fatores — o gargalo é tempo de produção, não dose; é o erro de "mais do mesmo" sem entender o mecanismo.' },
          { t: 'Suspender o aleitamento materno', correct: false, why: 'Irrelevante para a hemorragia aguda e prejudica o bebê — não tem relação com conter o sangramento.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 7 — E3 Caso clínico ===================== */
  // Página 7 — Estratégia: E3 — Caso clínico em abertura
  P.push(page('p7', 7, `
    ${tag('caso', 'Caso USP · de quem é esse sangue?')}
    ${chips(['teste de APT', 'hemoglobina fetal', 'NaOH', 'DHRN precoce', 'fenitoína materna'])}

    <article class="opener opener--case" aria-label="Caso clínico de abertura">
      <div class="opener__case-header">Caso USP — vinheta sem desfecho</div>
      <blockquote class="opener__case-quote">Gestante de 40 anos, 36 semanas, epiléptica em uso de <strong>fenitoína</strong>. Teve crise convulsiva com queda, entrou em trabalho de parto, cesárea. O bebê nasce prematuro mas bem — Apgar 8/9, contato pele a pele, mama na 1ª hora, vai para o alojamento conjunto. Com <strong>13 horas de vida</strong>, começa a vomitar conteúdo acastanhado com <strong>laivos de sangue vivo</strong>. Pedem teste de APT e lavagem gástrica. <strong>O APT vem positivo.</strong> De onde vem esse sangue?</blockquote>
    </article>

    <h1 class="page-title">Caso USP: o teste de APT e a origem do sangramento</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">O caso, sem desfecho</h3>
        <p>Esse é um caso pronto de banca, do tipo que fica fácil depois de estudado e impossível para quem nunca ouviu falar. Vale destrinchá-lo passo a passo, porque ele integra tudo da vitamina K. Temos um <strong>prematuro</strong> (36 semanas), de mãe <strong>epiléptica em anticonvulsivante</strong> (fenitoína), que com <strong>13 horas de vida</strong> apresenta <strong>vômito com sangue</strong>. Antes de cravar a deficiência, a pergunta correta é mais básica: esse sangue é <span class="term">do bebê</span> ou é <span class="term">sangue da mãe</span> que o bebê deglutiu (no canal de parto ou na amamentação)? É essa dúvida que o teste de APT responde.</p>

        <h3 class="topic-h">O teste de APT: a química que separa o sangue</h3>
        <p>O <span class="term">teste de APT</span> é simples e elegante. Pega-se a secreção/conteúdo expelido pelo paciente e acrescenta-se <strong>hidróxido de sódio (NaOH)</strong>. A chave é uma diferença bioquímica: a <span class="hl-good">hemoglobina fetal (HbF)</span> é <strong>resistente</strong> à desnaturação alcalina, enquanto a hemoglobina adulta (materna) <strong>não é</strong>. Então, se o teste é <strong>positivo</strong> (há HbF reagindo/resistindo ao NaOH), o sangue contém <strong>hemoglobina fetal</strong> — ou seja, é <strong>sangue do próprio bebê</strong>. Se fosse só sangue materno deglutido, a hemoglobina adulta se desnaturaria e o teste seria negativo. <strong>APT positivo = sangue fetal = sangramento próprio do RN.</strong></p>

        <h3 class="topic-h">Do APT positivo à doença hemorrágica</h3>
        <p>Com o APT positivo, o raciocínio avança automaticamente: descarta-se a hipótese de <strong>sangue materno deglutido</strong> → o bebê está com <strong>sangramento próprio</strong> → em um RN, sangramento próprio por falha de coagulação aponta para <span class="term">doença hemorrágica do recém-nascido</span> (deficiência de vitamina K). O teste de APT, portanto, não diagnostica a vitamina K diretamente — ele <strong>abre a porta</strong> ao confirmar que o sangue é do bebê.</p>

        <h3 class="topic-h">Por que é a forma precoce</h3>
        <p>Falta classificar a forma. O bebê tem <strong>13 horas de vida</strong> — dentro das <strong>primeiras 24 horas</strong> → isso aponta a forma <span class="hl-bad">precoce</span>. E a precoce, lembrando, é a relacionada ao <strong>uso materno de medicamento</strong> — aqui, a mãe epiléptica em <strong>fenitoína</strong> (anticonvulsivante), o principal fator de risco da forma precoce, que interfere na passagem de vitamina K para o bebê. Tudo fecha: <strong>doença hemorrágica do recém-nascido, forma precoce</strong>. O caso amarra timing (24h), fator de risco (anticonvulsivante materno) e a confirmação de origem (APT+).</p>
      </div>
    </div>

    ${med({
      file: 'p7-melena-sangue-mecanio.jpg',
      alt: 'Fralda de recém-nascido com mecônio volumoso e sangue vivo abundante — achado de melena neonatorum que motiva o teste de Apt-Downey para diferenciar sangue fetal de sangue materno deglutido.',
      achado: '<strong>sangramento gastrointestinal neonatal</strong> — mecônio volumoso com sangue vivo na fralda do RN, logo após o nascimento. <strong>Reforço:</strong> esta é a foto do <em>gatilho</em>, não do resultado — é o achado clínico que dispara a pergunta "de quem é esse sangue?". O <strong>teste de Apt é o passo seguinte</strong>: pega-se essa secreção, acrescenta-se NaOH, e a resistência (ou não) à desnaturação alcalina dirá se a hemoglobina é fetal (do bebê) ou materna deglutida.',
      fonte: 'Shehab N et al. (2021), SAGE Open Medical Case Reports, via PubMed Central',
      licenca: 'CC BY-NC 4.0 · uso educacional não-comercial'
    })}

    ${svgPiso('S-07', { caption: 'o fluxograma do teste de APT — avance passo a passo: vômito com sangue → teste de APT → (positivo: HbF resiste ao NaOH = sangue fetal / negativo: sangue materno deglutido) → DHRN → 13h de vida + anticonvulsivante materno → <strong>forma precoce</strong>. Um sub-painel mostra a química do tubo (secreção + NaOH).', hint: 'Clique para avançar cada nó do raciocínio (step-through).' })}

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>Diante de um RN com sangramento, a primeira bifurcação real é "sangue do bebê ou da mãe?" — e o APT a resolve com química de bancada. Saber esse passo evita tratar como hemorragia o que pode ser sangue materno deglutido, e vice-versa.</p>
    </aside>

    ${quiz('p7', 'O teste de APT e o encadeamento até a DHRN forma precoce.', [
      {
        stem: 'No caso, o teste de APT positivo permite concluir que:',
        alts: [
          { t: 'O sangue é materno, deglutido pelo bebê', correct: false, why: 'É exatamente o que o teste positivo <strong>descarta</strong> — sangue materno (Hb adulta) se desnaturaria e daria negativo; quem marca inverte a leitura do resultado.' },
          { t: 'O sangue é do próprio bebê, pois contém hemoglobina fetal resistente ao NaOH', correct: true, why: 'Certa. A <strong>hemoglobina fetal</strong> resiste à desnaturação alcalina: positivo no APT significa HbF presente → sangue do <strong>próprio bebê</strong>.' },
          { t: 'O bebê tem anemia hemolítica autoimune', correct: false, why: 'Viaja para outro diagnóstico — o APT fala de <strong>origem</strong> do sangue, não de mecanismo hemolítico; é um salto sem base no teste.' },
          { t: 'O teste não distingue a origem do sangue', correct: false, why: 'Nega a função do teste — ele existe justamente <strong>para</strong> distinguir a origem; quem marca não conhece o princípio do APT.' },
        ]
      },
      {
        stem: 'Considerando o tempo de vida e o fator de risco, qual a forma de doença hemorrágica do RN deste caso?',
        alts: [
          { t: 'Clássica', correct: false, why: 'A clássica é do 2º–7º dia por falta de profilaxia — o timing de 13h já a exclui; quem marca ignora a janela das 24h.' },
          { t: 'Tardia', correct: false, why: 'A tardia é após a 1ª semana, por má-absorção — fora do tempo e da causa aqui.' },
          { t: 'Precoce', correct: true, why: 'Certa. Duas pistas cravam a precoce: <strong>13 horas de vida</strong> (dentro das primeiras 24h) e <strong>mãe em anticonvulsivante</strong> (fenitoína), o fator de risco típico dessa forma.' },
          { t: 'Não é doença hemorrágica do RN', correct: false, why: 'O APT positivo (sangue fetal) + a coagulopatia do RN confirmam a DHRN; quem marca não amarrou o APT ao quadro.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 8 — E4 Achado típico / pegadinha ===================== */
  // Página 8 — Estratégia: E4 — Achado típico / pegadinha (rosário, resolve callback da P4)
  P.push(page('p8', 8, `
    ${tag('hidro', 'Hidrossolúvel C · escorbuto')}
    ${chips(['ácido ascórbico', 'escorbuto', 'petéquias perifoliculares', 'posição de RAM', 'rosário que engana'])}

    <aside class="opener opener--trap" aria-label="Achado-armadilha de abertura">
      <span class="opener__trap-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>
      </span>
      <div class="opener__trap-body">
        <p class="opener__trap-tag">O achado que mente</p>
        <p class="opener__trap-text">Você acabou de aprender o rosário raquítico da vitamina D. Agora aparece um bebê com nodulações costais idênticas — mas a deficiência é <strong>outra</strong>. O rosário, sozinho, mente. O que o desmente?</p>
      </div>
    </aside>

    <h1 class="page-title">Vitamina C (ácido ascórbico): o escorbuto e a armadilha do rosário</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">Escorbuto: o quadro da falta de vitamina C</h3>
        <p>Vitamina C, ou <span class="term">ácido ascórbico</span>, segue a mesma lógica das demais: o que importa é a manifestação clínica, e o quadro clássico da hipovitaminose C é o <span class="hl-bad">escorbuto</span>. A vitamina C é essencial para a síntese de colágeno, e é a fragilidade de vasos e tecidos por colágeno defeituoso que explica boa parte do quadro — sobretudo o componente <strong>hemorrágico</strong>.</p>

        <h3 class="topic-h">Os achados que só fecham juntos</h3>
        <p>O escorbuto não tem um achado único patognomônico — ele se reconhece pela <span class="term">combinação</span>. Os elementos são: <span class="hl-bad">hemorragia gengival</span> (gengivas que sangram, edemaciadas), <strong>hemorragia cutânea</strong> e <span class="hl-bad">petéquias perifoliculares</span> (pontos hemorrágicos ao redor dos folículos pilosos, um achado bem sugestivo), e <strong>dor importante</strong>, com a criança chorando ao ser manipulada. Isoladamente cada achado é inespecífico; é o <strong>conjunto</strong> — mais os fatores de risco (dieta muito pobre em frutas e vegetais) — que faz pensar em escorbuto. A regra é a mesma do tema inteiro: a combinação fecha, o achado solto não.</p>

        <h3 class="topic-h">O rosário que engana: escorbútico × raquítico</h3>
        <p>Aqui está a pegadinha que a abertura prometeu. O escorbuto pode cursar com <span class="hl-warn">rosário escorbútico</span> — nodulações na junção costocondral <strong>clinicamente e visualmente indistinguíveis</strong> do <strong>rosário raquítico</strong> da vitamina D. Olhando só a foto, <strong>não dá</strong> para diferenciar. O que separa um do outro é o <span class="term">contexto</span>, as <strong>outras manifestações</strong> e os <strong>fatores de risco</strong>: se há hemorragia gengival, petéquias perifoliculares e dor à manipulação, o rosário é <strong>escorbútico</strong> (vit. C); se há geno varo/valgo, crânio tabes e a laboratorial do eixo PTH, o rosário é <strong>raquítico</strong> (vit. D). Mesmo achado, duas vitaminas — e a diferença está em tudo que vem ao redor.</p>

        <h3 class="topic-h">Por que dói: a hemorragia e a posição de RAM</h3>
        <p>A dor do escorbuto tem explicação anatômica que vale entender. Ela vem da <strong>hemorragia</strong> — incluindo <span class="term">hemorragia subperiosteal (periosteal)</span> nos membros inferiores. O sangue acumulado sob o periósteo dói intensamente, e por isso a criança adota a chamada <span class="hl-warn">posição de RAM</span>: membros inferiores <strong>flexionados/arqueados</strong>, numa postura antálgica de quem evita mexer as pernas. Quando a questão descreve um bebê que chora ao ser manipulado e fica com as perninhas flexionadas, está pintando a posição de RAM do escorbuto.</p>
      </div>
    </div>

    ${med({
      file: 'p8-escorbuto-gengiva.jpg',
      alt: 'Gengivas edemaciadas e sangrantes do escorbuto por deficiência de vitamina C.',
      achado: '<strong>Gengiva escorbútica</strong> — gengivas edemaciadas, hiperplásicas e sangrantes pela fragilidade vascular do colágeno defeituoso; é um dos elementos hemorrágicos que, somado a petéquias perifoliculares e dor, fecha o escorbuto. A seta marca o sangramento gengival.',
      fonte: 'Image courtesy of the U.S. CDC, via Wikimedia Commons',
      licenca: 'Domínio público',
      cues: [{ x: 50, y: 44, r: 26, label: 'gengiva edemaciada / sangrante', lx: 50, ly: 72 }]
    })}

    ${svgPiso('S-08', { caption: 'os dois rosários, lado a lado — o escorbútico (vit. C) e o raquítico (vit. D) são <strong>idênticos ao olho</strong>; clique em cada lado para revelar o que decide: hemorragia gengival/petéquias/posição de RAM puxam para o escorbuto; geno varo/valgo, crânio tabes e ↓Ca/↓P/↑PTH/↑FA puxam para o raquitismo. O ponto é "iguais por fora, diferentes no entorno".', hint: 'Clique em cada rosário para revelar o discriminador de contexto.' })}

    <aside class="dont-confuse">
      <p class="dont-confuse__label">Não confunda (resolve o callback da vitamina D)</p>
      <div class="dont-confuse__grid">
        <div class="dont-confuse__side">
          <p class="dont-confuse__tag">Rosário escorbútico (vit. C)</p>
          <p>Decide o entorno: <strong>hemorragia gengival + petéquias perifoliculares + posição de RAM</strong> → escorbuto.</p>
        </div>
        <div class="dont-confuse__side">
          <p class="dont-confuse__tag">Rosário raquítico (vit. D)</p>
          <p>Decide o entorno: <strong>geno varo/valgo + crânio tabes + ↓Ca/↓P/↑PTH/↑FA</strong> → raquitismo. Idênticos ao olho.</p>
        </div>
      </div>
    </aside>

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>Diante de nodulações costais, o reflexo do iniciante é "vitamina D". O aluno maduro <strong>suspende o julgamento</strong> e procura o entorno: gengiva, petéquias, dor, dieta — porque o rosário sozinho não decide. É um exercício direto de diferencial.</p>
    </aside>

    ${quiz('p8', 'O escorbuto pela combinação e o diferencial dos rosários.', [
      {
        stem: 'Uma criança com escorbuto chora intensamente ao ser manipulada e mantém os membros inferiores flexionados (posição de RAM). A que se deve esse quadro doloroso?',
        alts: [
          { t: 'À deposição de cálcio nas articulações', correct: false, why: 'Inventa um mecanismo de depósito de cálcio que não existe no escorbuto — quem marca mistura com doenças de depósito.' },
          { t: 'À hemorragia, incluindo hemorragia subperiosteal em membros inferiores', correct: true, why: 'Certa. A dor do escorbuto é <strong>hemorrágica</strong> — o sangramento, inclusive <strong>subperiosteal</strong> nos membros inferiores, torna a manipulação insuportável e leva à postura antálgica (posição de RAM).' },
          { t: 'À inflamação infecciosa das articulações', correct: false, why: 'Não há artrite séptica aqui; o erro é ler "dor + criança chorosa" como infecção.' },
          { t: 'À fraqueza muscular generalizada', correct: false, why: 'Troca dor por fraqueza — a criança não está fraca, está <strong>com dor</strong>; a posição de RAM é antálgica, não por hipotonia.' },
        ]
      },
      {
        stem: 'Um lactente apresenta rosário costal idêntico ao de um caso de raquitismo, mas com hemorragia gengival e petéquias perifoliculares. Qual a deficiência mais provável e por quê?',
        alts: [
          { t: 'Vitamina D, pois o rosário é patognomônico de raquitismo', correct: false, why: 'Trata o rosário como patognomônico de raquitismo, que é justamente a pegadinha desmontada — ele <strong>não</strong> é exclusivo da vit. D.' },
          { t: 'Vitamina C, porque o entorno (hemorragia gengival e petéquias) aponta escorbuto', correct: true, why: 'Certa. O <strong>rosário não decide sozinho</strong> — escorbútico e raquítico são idênticos ao olho; quem decide é o <strong>entorno</strong>, e aqui hemorragia gengival + petéquias perifoliculares são marca do escorbuto (vit. C).' },
          { t: 'Vitamina K, pela presença de sangramento', correct: false, why: 'Prende-se a "sangramento = vitamina K", mas a DHRN não cursa com rosário costal nem petéquias perifoliculares; é associação reflexa sem o quadro completo.' },
          { t: 'Vitamina A, pela manifestação mucosa', correct: false, why: 'Puxa para mucosa/vit. A sem a clínica ocular — não há xeroftalmia nem cegueira noturna no enunciado.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 9 — E8 Erro comum desmontado ===================== */
  // Página 9 — Estratégia: E8 — Erro comum desmontado (poda do complexo B)
  P.push(page('p9', 9, `
    ${tag('hidro', 'Hidrossolúvel · complexo B')}
    ${chips(['poda da lista', 'B2/B5/B7 saem', 'B9/B12 = hematologia', 'B6 = convulsão neonatal', 'sobram B1 e B3'])}

    <section class="opener opener--bust" aria-label="Erro comum desmontado">
      <p class="opener__bust-tag">O erro que a página desmonta</p>
      <p class="opener__bust-wrong">Muitos alunos olham a lista do complexo B — B1, B2, B3, B5, B6, B7, B9, B12 — e tentam decorar tudo.</p>
      <p class="opener__bust-right"><strong>Esse é o erro.</strong> A maior parte dessa lista não cai, e a que cai resume-se a poucos vínculos. Vamos podar.</p>
    </section>

    <h1 class="page-title">Complexo B: a lista gigante que vira duas vitaminas</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">As que saem por serem inespecíficas (B2/B5/B7)</h3>
        <p>A lista do complexo B é grande e dá desespero — ainda mais depois das quatro lipossolúveis e da vitamina C. Mas ela encolhe muito, e o primeiro corte é o maior. A <span class="term">B2 (riboflavina)</span>, a <span class="term">B5 (ácido pantotênico)</span> e a <span class="term">B7 (biotina)</span> <strong>não têm manifestação clínica específica</strong> de deficiência — só se diagnostica a falta delas por <strong>dosagem laboratorial</strong>. E o que não tem dado clínico característico <span class="hl-warn">não cai em prova</span>, porque seria óbvio demais (a questão teria que entregar a dosagem baixa, o que já é o diagnóstico). Então <strong>B2, B5 e B7 saem da lista de estudo</strong>. Já cortamos três.</p>

        <h3 class="topic-h">As que saem por já terem casa (B9/B12)</h3>
        <p>O segundo corte tira mais duas, não por serem irrelevantes, mas porque pertencem a outro território. O <span class="term">ácido fólico (B9)</span> e a <span class="term">cianocobalamina (B12)</span> causam, em deficiência, <span class="hl-bad">anemia megaloblástica</span> — conteúdo que se estuda em <strong>hematologia</strong>, onde mora. Aqui não se reexplica: basta reter a associação <strong>B9/B12 → anemia megaloblástica</strong> e remeter ao raciocínio hematológico. Saem da poda do complexo B por já terem casa própria.</p>

        <h3 class="topic-h">A que fica por um vínculo curto (B6)</h3>
        <p>A <span class="term">B6 (piridoxina)</span> fica na lista, mas por um único vínculo — curto e de alto rendimento. O dado a guardar é a <span class="hl-bad">convulsão no período neonatal</span>. O cenário típico: um <strong>bebê com convulsão</strong> que já recebeu <strong>fenobarbital</strong> (a medicação de escolha da convulsão neonatal), eventualmente uma segunda medicação, e <strong>não cessa</strong> a crise — uma <span class="term">convulsão neonatal refratária</span>. Repõe-se <strong>B6 (piridoxina)</strong> e o bebê <strong>para de convulsionar</strong>. É o gancho inteiro de B6: convulsão neonatal que não responde aos anticonvulsivantes habituais e cede com piridoxina.</p>

        <h3 class="topic-h">As duas que sobram para detalhar (B1/B3)</h3>
        <p>Feita a poda, a lista do complexo B que <strong>realmente</strong> precisa de detalhe resume-se a <span class="hl-good">duas vitaminas: B1 (tiamina) e B3 (niacina)</span>. Todas as outras ou não caem (B2/B5/B7), ou moram em hematologia (B9/B12), ou se resumem a um vínculo (B6). É por isso que o desespero da lista é falso: o que sobra para estudar de verdade são dois nomes — e são os próximos.</p>
      </div>
    </div>

    ${svgPiso('S-09', { caption: 'a poda do complexo B — acione o filtro e veja a lista encolher: B2/B5/B7 caem (inespecíficas → não caem), B9/B12 saem (anemia megaloblástica → hematologia), B6 fica destacada pelo vínculo curto (convulsão neonatal), e restam acesas <strong>B1 e B3</strong>. O desespero da lista é falso.', hint: 'Acione o filtro/colapso para ver a lista virar duas vitaminas.' })}

    <aside class="trap">
      <p class="trap__tag">Pegadinha de prova</p>
      <p class="trap__text"><strong>B6 = convulsão neonatal refratária a fenobarbital que cede com piridoxina.</strong> É o único dado de B6 e some fácil na poda — não perca. Se a questão traz convulsão neonatal que não responde ao anticonvulsivante e melhora com uma vitamina, é B6.</p>
    </aside>

    <aside class="board-wants">
      <p class="board-wants__label">Cross-ref de conteúdo</p>
      <p><strong>B9 (ácido fólico) e B12 (cianocobalamina) → anemia megaloblástica</strong> — raciocínio detalhado no estudo de hematologia; aqui basta a associação e a remissão ao tema do sangue.</p>
    </aside>

    ${med({
      file: 'p9-neutrofilo-hipersegmentado.png',
      inset: true,
      alt: 'Esfregaço de sangue periférico de paciente com anemia megaloblástica; seta vermelha aponta neutrófilo com núcleo hipersegmentado de cinco ou mais lóbulos.',
      achado: 'esfregaço de sangue periférico em <strong>anemia megaloblástica</strong>. A seta marca o <strong>neutrófilo hipersegmentado</strong> — núcleo com <strong>5 ou mais lóbulos</strong> ligados por finos filamentos de cromatina (o normal é 3 a 4). É o sinal mais <strong>precoce, sensível e específico</strong> da megaloblastose: aparece antes mesmo da anemia se instalar. <strong>Reforço:</strong> é exatamente o ramo que a poda agrupa — <strong>B9 (folato) e B12</strong> travam a síntese de DNA, o núcleo amadurece atrás do citoplasma, e bate aqui (neutrófilo hipersegmentado) e nas hemácias grandes e ovais (macro-ovalócitos). Diferente de B1/B3/B6, que têm síndrome própria.',
      fonte: 'Peripheral blood smear (Paul Weisz Carrington, MD, US Dept. of Veterans Affairs), via Wikimedia Commons',
      licenca: 'Domínio público'
    })}

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>Saber podar é o que evita o aluno se afogar em listas. E o vínculo B6 ↔ convulsão neonatal refratária é genuinamente útil no berçário: uma convulsão que não cede aos anticonvulsivantes pode responder à piridoxina.</p>
    </aside>

    ${quiz('p9', 'O método de podar a lista e o único vínculo de B6.', [
      {
        stem: 'Por que B2 (riboflavina), B5 (pantotênico) e B7 (biotina) praticamente não são cobradas em prova de deficiência?',
        alts: [
          { t: 'Porque não existem em humanos', correct: false, why: 'Falso — existem e têm função; quem marca confunde "não cai" com "não existe".' },
          { t: 'Porque não têm manifestação clínica específica — só se diagnosticam por dosagem', correct: true, why: 'Certa. Sem <strong>achado clínico característico</strong>, a banca não consegue montar um caso sem entregar a resposta (teria que dar a dosagem baixa, que já é o diagnóstico).' },
          { t: 'Porque suas deficiências causam anemia megaloblástica', correct: false, why: 'É a associação de <strong>B9/B12</strong>, não dessas três; cair aqui é embaralhar quem causa megaloblástica.' },
          { t: 'Porque são tóxicas em excesso, não em falta', correct: false, why: 'Inventa toxicidade — a questão é a <strong>ausência de clínica específica na deficiência</strong>, não excesso; é um desvio do raciocínio.' },
        ]
      },
      {
        stem: 'Recém-nascido com convulsão que persiste apesar de fenobarbital e de uma segunda droga, cessando após reposição de uma vitamina. Qual a deficiência?',
        alts: [
          { t: 'B1 (tiamina)', correct: false, why: 'A tiamina dá beri-béri e Wernicke, não convulsão neonatal refratária; quem marca não fixou o gancho específico.' },
          { t: 'B3 (niacina)', correct: false, why: 'A niacina dá pelagra (3 Ds) — nada a ver com convulsão.' },
          { t: 'B6 (piridoxina)', correct: true, why: 'Certa. O cenário é a assinatura da B6: <strong>convulsão neonatal refratária</strong> aos anticonvulsivantes habituais que <strong>cede com piridoxina</strong>.' },
          { t: 'B12 (cianocobalamina)', correct: false, why: 'A B12 dá anemia megaloblástica, não a convulsão neonatal que responde à reposição — associar "neuro + B12" sem o cenário neonatal é a armadilha.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 10 — E6 Mnemônico-âncora ===================== */
  // Página 10 — Estratégia: E6 — Mnemônico-âncora primeiro (três caras da B1)
  P.push(page('p10', 10, `
    ${tag('hidro', 'Hidrossolúvel B1 · tiamina')}
    ${chips(['beri-béri seco = neuro', 'beri-béri úmido = coração/edema', 'Wernicke', 'álcool + glicose sem tiamina'])}

    <aside class="opener opener--mnemonic" aria-label="Mnemônico de abertura">
      <p class="opener__mnemonic-tag">Mnemônico-âncora</p>
      <p class="opener__mnemonic-quote">Tiamina (B1) tem três caras: <strong>Beri-béri SECO</strong> = neuro · <strong>Beri-béri ÚMIDO</strong> = coração/edema · <strong>Wernicke</strong> = álcool + glicose sem tiamina.</p>
    </aside>

    <h1 class="page-title">Vitamina B1 (tiamina): as duas faces do beri-béri e a cilada de Wernicke</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">Beri-béri seco × úmido</h3>
        <p>A deficiência de <span class="term">tiamina (B1)</span> cursa com <span class="hl-bad">beri-béri</span>, e a primeira coisa a guardar é que ele tem <strong>duas formas de apresentação</strong>. O <span class="term">beri-béri seco</span> é o <strong>neurológico</strong>: irritabilidade, <strong>neuropatia periférica</strong> e <strong>ataxia</strong> — o quadro "seco" não tem o componente de retenção de líquido. O <span class="term">beri-béri úmido (molhado)</span> é o <strong>cardiovascular/congestivo</strong>: sinais de congestão como <strong>insuficiência cardíaca</strong>, insuficiência renal, <strong>edema</strong> e <strong>cardiomegalia</strong> — daí "molhado", pela retenção. Um detalhe que tira o peso do estudo: <span class="hl-warn">não é bem estabelecido</span> por que um paciente desenvolve a forma seca e outro a úmida, e isso <strong>não se cobra</strong>. Basta saber que <strong>existem as duas</strong> e reconhecer cada uma pelo conjunto de achados — neuro de um lado, coração/edema do outro.</p>

        <h3 class="topic-h">Wernicke: o gatilho álcool + glicose sem tiamina</h3>
        <p>A segunda cara da tiamina é a <span class="hl-bad">encefalopatia de Wernicke</span>, e ela tem um <strong>gatilho de prova clássico</strong>. Wernicke está associada ao <strong>alcoolismo</strong>: o etilista crônico tem reservas baixas de tiamina, e há uma armadilha iatrogênica perigosa — <span class="hl-warn">administrar glicose sem repor tiamina</span> em um paciente alcoolista pode <strong>desencadear</strong> o quadro (a glicose consome a tiamina residual nas vias metabólicas). A tríade de Wernicke é <strong>ataxia + alteração oculomotora (nistagmo/oftalmoplegia) + confusão mental</strong>. O gatilho de prova, então, é direto: <strong>paciente alcoolista que recebe glicose sem reposição de tiamina</strong> → pensar em Wernicke. É um erro de conduta que a banca usa como pista.</p>

        <h3 class="topic-h">Reconhecer as duas faces na questão</h3>
        <p>Na hora da prova, a B1 aparece de duas maneiras. Se o enunciado traz <strong>neuropatia/ataxia</strong> ou <strong>insuficiência cardíaca/edema</strong> em contexto de desnutrição, pense em <strong>beri-béri</strong> (seco ou úmido conforme o predomínio). Se traz <strong>alcoolista + confusão + alteração oculomotora</strong>, sobretudo após <strong>glicose</strong>, pense em <strong>Wernicke</strong>. As duas faces compartilham a tiamina como raiz; o que muda é o cenário que a banca pinta.</p>
      </div>
    </div>

    ${svgPiso('S-10', { caption: 'beri-béri seco × úmido — silhueta dividida: de um lado os achados do <strong>seco</strong> (neuro — cérebro/nervos: neuropatia, ataxia), do outro os do <strong>úmido</strong> (coração, edema, congestão). Clique em cada achado para confirmar de que lado ele mora.', hint: 'Clique nos achados; neuro de um lado, coração/edema do outro.' })}

    ${med({
      file: 'p10-beriberi-umido.jpg',
      inset: true,
      tarjas: [
        { left: 45, top: 8.5, w: 19, h: 5, label: 'privacidade' },
        { left: 42.5, top: 51.5, w: 15, h: 8 },
      ],
      alt: 'Fotografia clínica de paciente com beri-béri úmido, exibindo edema generalizado de membros inferiores abaixo da cintura e fácies de fome de ar por insuficiência cardíaca de alto débito secundária à deficiência de tiamina (vitamina B1). Olhos e região genital tarjados para preservar a identidade e a dignidade do paciente.',
      achado: '<strong>beri-béri úmido</strong> — edema dependente generalizado abaixo da cintura, tradução da retenção hidrossalina pela <strong>insuficiência cardíaca de alto débito</strong> que a deficiência crônica de tiamina (B1) provoca. A fácies de fome de ar (air hunger) denuncia a descompensação cardíaca. <strong>Reforço:</strong> é a face clínica extrema do eixo <em>úmido</em> (coração/edema), em contraste direto com o eixo <em>seco</em> (neuropatia, ataxia). Fotografia de 1910, registrada uma semana antes do óbito por falência cardíaca.',
      fonte: 'W. Hamilton Jefferys (1910), via Wikimedia Commons',
      licenca: 'Domínio público'
    })}

    ${svgPiso('S-11', { caption: 'o gatilho de Wernicke — a trilha causal: <strong>álcool → glicose sem tiamina → tríade (ataxia / alteração oculomotora / confusão)</strong>. É a cilada iatrogênica que a banca planta como "recebeu soro glicosado e piorou".', hint: 'Avance a trilha: álcool → glicose sem tiamina → Wernicke.' })}

    <aside class="case-card">
      <p class="case-card__meta">Caso · paciente-síntese (reaparece no fechamento)</p>
      <p>Paciente com <strong>nistagmo, oftalmoplegia, ataxia e confusão mental</strong> → deficiência de <strong>tiamina (B1)</strong>, quadro de <strong>encefalopatia de Wernicke</strong> — o alcoolista que recebeu glicose sem reposição de tiamina.</p>
    </aside>

    <aside class="trap">
      <p class="trap__tag">Pegadinha de prova</p>
      <p class="trap__text"><strong>Glicose antes da tiamina no alcoolista precipita Wernicke.</strong> Por isso, na prática, repõe-se <strong>tiamina antes ou junto</strong> com a glicose no etilista. A banca planta "paciente recebeu soro glicosado e piorou neurologicamente" como pista.</p>
    </aside>

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>A regra "tiamina antes da glicose no alcoolista" é conduta de pronto-socorro de verdade, não só de prova — ignorá-la pode precipitar Wernicke. E separar seco (neuro) de úmido (coração/edema) organiza o reconhecimento.</p>
    </aside>

    ${quiz('p10', 'As duas formas do beri-béri e o gatilho de Wernicke.', [
      {
        stem: 'Paciente alcoolista crônico chega ao pronto-socorro e recebe soro glicosado; horas depois evolui com nistagmo, ataxia e confusão mental. Qual a explicação?',
        alts: [
          { t: 'Intoxicação alcoólica aguda', correct: false, why: 'Não explica a tríade oculomotora típica nem a relação temporal com a glicose; é o reflexo de "alcoolista = bêbado".' },
          { t: 'Encefalopatia de Wernicke precipitada por glicose sem reposição de tiamina', correct: true, why: 'Certa. O etilista tem tiamina baixa, e a <strong>glicose sem tiamina</strong> a consome nas vias metabólicas, <strong>precipitando Wernicke</strong> — cuja tríade é ataxia + alteração oculomotora + confusão.' },
          { t: 'Deficiência de niacina (pelagra)', correct: false, why: 'A pelagra é niacina (3 Ds: dermatite, diarreia, demência) — não há dermatite nem diarreia aqui; quem marca troca a vitamina B.' },
          { t: 'Hipoglicemia pela insulina endógena', correct: false, why: 'Hipoglicemia seria por <strong>excesso</strong> de insulina, mas o paciente <strong>recebeu glicose</strong> — o mecanismo é oposto; é uma leitura invertida do soro.' },
        ]
      },
      {
        stem: 'Sobre as formas do beri-béri, qual associação está correta?',
        alts: [
          { t: 'Seco = insuficiência cardíaca e edema; úmido = neuropatia', correct: false, why: '<strong>Inverte</strong> os dois — é o erro mais comum; "úmido" remete a líquido/edema, então o úmido é o cardíaco, não o seco.' },
          { t: 'Seco = neuropatia periférica e ataxia; úmido = congestão, IC e edema', correct: true, why: 'Certa. A separação é por sistema: <strong>seco = neurológico</strong> (neuropatia, ataxia, irritabilidade); <strong>úmido/molhado = cardiovascular</strong> (congestão, IC, edema, cardiomegalia).' },
          { t: 'Ambas as formas cursam apenas com sintomas neurológicos', correct: false, why: 'Apaga a distinção que é o ponto da página — só o seco é puramente neuro.' },
          { t: 'A forma que cada paciente desenvolve é totalmente previsível pela dieta', correct: false, why: 'Afirma previsibilidade que <strong>não existe</strong> — a própria literatura diz que não se sabe por que um vira seco e outro úmido, e isso não se cobra.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 11 — E6 Mnemônico-âncora ===================== */
  // Página 11 — Estratégia: E6 — Mnemônico-âncora primeiro (3 Ds)
  P.push(page('p11', 11, `
    ${tag('hidro', 'Hidrossolúvel B3 · niacina')}
    ${chips(['pelagra = 3 Ds', 'dermatite · diarreia · demência', 'colar de Casal', 'dermatite nunca isolada'])}

    <aside class="opener opener--mnemonic" aria-label="Mnemônico de abertura">
      <p class="opener__mnemonic-tag">Mnemônico-âncora</p>
      <p class="opener__mnemonic-quote">Pelagra = a doença dos 3 Ds: <strong>DERMATITE · DIARREIA · DEMÊNCIA</strong>. Faltou niacina (B3) → os 3 Ds. E a dermatite nunca vem sozinha.</p>
    </aside>

    <h1 class="page-title">Vitamina B3 (niacina): a pelagra e a regra dos três Ds</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">Pelagra = os 3 Ds</h3>
        <p>Vitamina <span class="term">B3</span> é a <span class="term">niacina</span>, e sua deficiência tem um nome e um mnemônico que resolvem a questão: <span class="hl-bad">pelagra</span>, a <strong>"doença dos três Ds" — dermatite, diarreia e demência</strong>. É um dos mnemônicos mais redondos da medicina, e a banca cobra exatamente essa tríade. Quando um enunciado alinha alteração de pele + alteração intestinal + alteração cognitiva, o nome a escrever é pelagra, e a vitamina é a B3.</p>

        <h3 class="topic-h">A dermatite que nunca vem sozinha</h3>
        <p>A <strong>dermatite</strong> da pelagra tem características próprias: é <span class="hl-warn">fotossensível</span>, aparece em áreas expostas — <strong>pescoço</strong> (formando o clássico <span class="term">colar de Casal</span>, uma faixa de dermatite ao redor do pescoço), <strong>tórax</strong> e <strong>membros</strong>. Mas há uma regra que a página inteira quer fixar: <span class="hl-bad">a dermatite nunca aparece de forma isolada</span>. Pensa-se em pelagra quando, <strong>junto</strong> da dermatite, há <strong>diarreia ou demência</strong> — é a coexistência que fecha. Dermatite sozinha tem mil causas; dermatite + um segundo D aponta niacina. Por isso o mnemônico é "três Ds", e não "um D".</p>

        <h3 class="topic-h">O perfil de questão da niacina</h3>
        <p>O perfil de prova da B3 é dos mais diretos: associação <strong>"pelagra ↔ niacina (B3) / 3 Ds"</strong>, perguntando a clínica esperada ou a vitamina culpada. Raramente há mais nuance — fixados os 3 Ds e a regra da dermatite acompanhada, a questão de niacina está resolvida.</p>
      </div>
    </div>

    ${med({
      file: 'p11-pelagra-colar-casal.jpg',
      alt: 'Dermatite pelagrosa fotossensível com distribuição em áreas expostas (colar de Casal).',
      achado: '<strong>Dermatite pelagrosa</strong> — lesão fotossensível com demarcação nítida nas áreas expostas ao sol (a faixa segue o limite da roupa). O contorno marca a <strong>demarcação fotossensível</strong>, que é o achado localizante — não o colar de Casal isolado.',
      fonte: 'By Herbert L. Fred, MD, and Hendrik A. van Dijk, via Wikimedia Commons',
      licenca: 'CC BY-SA 3.0',
      cues: [{ x: 50, y: 30, r: 30, label: 'demarcação fotossensível (linha da roupa)', lx: 50, ly: 60 }]
    })}

    ${svgPiso('S-12', { caption: 'os três Ds da pelagra — três cartões (<strong>Dermatite · Diarreia · Demência</strong>) com a regra destacada: "dermatite nunca isolada". Passe por cada D para fixar a tríade que fecha o diagnóstico de niacina.', hint: 'Passe / Tab por cada D; a dermatite só fecha pelagra acompanhada de um segundo D.' })}

    <aside class="mnemonic">
      <p class="mnemonic__label">Mnemônico</p>
      <p class="mnemonic__text">Os 3 Ds da pelagra: <strong>Dermatite · Diarreia · Demência</strong>. Dermatite <strong>fotossensível</strong> (colar de Casal no pescoço), <strong>nunca isolada</strong> — sempre com diarreia ou demência. Niacina = B3.</p>
    </aside>

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>A pelagra reapareceu em populações vulneráveis e em contextos de desnutrição/alcoolismo. Reconhecer o colar de Casal + diarreia + alteração cognitiva como niacina evita perder uma deficiência tratável — e na prova é ponto quase garantido.</p>
    </aside>

    ${quiz('p11', 'A pelagra pelos 3 Ds e a regra da dermatite acompanhada.', [
      {
        stem: 'Quais as deficiências responsáveis, respectivamente, por beri-béri e pelagra?',
        alts: [
          { t: 'B3 (niacina) e B1 (tiamina)', correct: false, why: '<strong>Inverte</strong> a ordem pedida — é a troca clássica entre as duas; quem lê rápido casa o primeiro nome com a primeira doença sem conferir.' },
          { t: 'B1 (tiamina) e B3 (niacina)', correct: true, why: 'Certa. As duas que sobraram da poda: <strong>B1 (tiamina) → beri-béri</strong> e <strong>B3 (niacina) → pelagra (3 Ds)</strong>.' },
          { t: 'B6 (piridoxina) e B12 (cianocobalamina)', correct: false, why: 'Traz vitaminas de outros vínculos — B6 é convulsão neonatal, B12 é megaloblástica; nenhuma faz beri-béri ou pelagra.' },
          { t: 'B1 (tiamina) e B6 (piridoxina)', correct: false, why: 'Acerta a tiamina mas erra a segunda — B6 não causa pelagra; o segundo D é niacina, não piridoxina.' },
        ]
      },
      {
        stem: 'Sobre a dermatite da pelagra, qual afirmação está correta?',
        alts: [
          { t: 'Aparece isolada e é suficiente para o diagnóstico', correct: false, why: 'Viola justamente a regra — dermatite isolada tem mil causas e não fecha pelagra; é a pegadinha central.' },
          { t: 'É fotossensível, surge em áreas expostas (colar de Casal) e nunca vem isolada — acompanha diarreia ou demência', correct: true, why: 'Certa. A dermatite pelagrosa é <strong>fotossensível</strong>, em áreas expostas (colar de Casal no pescoço), e a regra de ouro é que <strong>nunca aparece sozinha</strong> — pensa-se em pelagra com um segundo D.' },
          { t: 'Poupa as áreas expostas ao sol', correct: false, why: 'Inverte a fotossensibilidade — a lesão <strong>prefere</strong> as áreas expostas ao sol, não as poupa.' },
          { t: 'É idêntica à dermatite atópica, sem padrão próprio', correct: false, why: 'Nega o padrão próprio — o colar de Casal e a fotossensibilidade <strong>são</strong> o padrão característico; quem marca acha que "dermatite é tudo igual".' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 12 — E7 Comparação chocante (interleaving) ===================== */
  // Página 12 — Estratégia: E7 — Comparação chocante (reativação distribuída)
  P.push(page('p12', 12, `
    ${tag('trap', 'Não confunda · os pares que a banca troca')}
    ${chips(['lipo × hidro', 'rosário escorbútico × raquítico', '<12 × <20 ng/mL', '3 formas DHRN', 'beri-béri seco × úmido'])}

    <section class="opener opener--vs" aria-label="Comparação de abertura">
      <div class="opener__vs-grid">
        <div class="opener__vs-side">
          <p>Três pares que parecem o mesmo e <strong>não são</strong>: dois rosários idênticos, três bebês que sangram, dois beri-béris com nomes molhado e seco.</p>
        </div>
        <span class="opener__vs-divider" aria-hidden="true"><span class="opener__vs-asterisk">vs</span></span>
        <div class="opener__vs-side">
          <p>A banca vive de <strong>trocar um pelo outro</strong>. Aqui você os separa de uma vez.</p>
        </div>
      </div>
    </section>

    <h1 class="page-title">Não confunda: os pares que decidem a questão</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">Lipossolúvel × hidrossolúvel: a divisão que muda a pegadinha</h3>
        <p>Antes dos pares clínicos, a divisão-mãe ainda rende pegadinha. <strong>Lipossolúveis (A, D, E, K)</strong> dependem de <span class="term">gordura</span> para serem absorvidas; <strong>hidrossolúveis (complexo B + C)</strong> entram com a <span class="term">água</span>. A consequência de prova: paciente com <strong>má-absorção de gordura</strong> (colestase, fibrose cística, doença disabsortiva) falta <strong>lipossolúvel</strong>, não hidrossolúvel. E lembre o número que a banca inverte: na vit. D, <span class="hl-warn">90% vem do sol, 10% da dieta</span> — se a alternativa disser o contrário, está errada. A divisão não é decoração: ela prevê quem falta o quê.</p>

        <h3 class="topic-h">Rosário escorbútico × raquítico, e os números invertidos da vit. D</h3>
        <p>O par visual mais traiçoeiro: <strong>rosário escorbútico (vit. C) × rosário raquítico (vit. D)</strong> — <span class="hl-warn">idênticos ao olho</span>. A decisão é pelo <strong>entorno</strong>: hemorragia gengival + petéquias perifoliculares + posição de RAM → <strong>escorbuto</strong>; geno varo/valgo + crânio tabes + ↓Ca/↓P/↑PTH/↑FA → <strong>raquitismo</strong>. E, já que estamos na vit. D, o outro par de pegadinha é numérico: o <strong>corte de deficiência</strong> depende da sociedade — <strong>&lt;20 ng/mL pela SBP 2024 (vigente-BR)</strong> e <strong>&lt;12 ng/mL pelo IOM/AAP</strong>. A banca pergunta "qual o corte" e a resposta certa depende de <strong>qual régua</strong> ela cita. E o cálcio no tratamento: <strong>só se soma cálcio quando há raquitismo</strong> — na deficiência laboratorial isolada, repõe-se só D3.</p>

        <h3 class="topic-h">As três formas de DHRN que a banca embaralha</h3>
        <p>O par que na verdade é um trio: as <strong>três formas da doença hemorrágica do RN</strong>. <strong>Precoce</strong> = primeiras <strong>24h</strong>, por <strong>medicação materna</strong> (anticonvulsivante). <strong>Clássica</strong> = <strong>2º–7º dia</strong>, por <strong>ausência de profilaxia</strong> ao nascer. <strong>Tardia</strong> = <strong>após a 1ª semana</strong>, por <strong>doença desabsortiva</strong>. A banca troca timing por causa: dá o timing da precoce mas a causa da clássica, ou diz que a tardia é "por causa da fórmula" (é por má-absorção, não por dieta). Ancore cada forma ao <strong>par timing+causa</strong> e a troca não te pega.</p>

        <h3 class="topic-h">Beri-béri seco × úmido, e os gatilhos parecidos</h3>
        <p>Último par: <strong>beri-béri seco × úmido</strong> (B1). <strong>Seco = neuro</strong> (neuropatia, ataxia); <strong>úmido = coração/edema</strong> (IC, congestão). O nome ajuda — "úmido" é o que retém líquido, logo o cardíaco. E não confunda a <strong>ataxia do beri-béri seco</strong> com a <strong>ataxia de Wernicke</strong>: ambas são tiamina, mas Wernicke traz <strong>alteração oculomotora + confusão + contexto de álcool/glicose</strong>. Mesma vitamina, cenários distintos.</p>
      </div>
    </div>

    ${cmp(
      'Tabela-confronto — os pares que decidem a questão',
      ['Par confundível', 'A', 'B', 'O que decide'],
      [
        { cells: [{ t: '<strong>Rosário</strong>' }, { t: 'escorbútico (vit. C)' }, { t: 'raquítico (vit. D)' }, { t: 'entorno: hemorragia/petéquias × geno/crânio tabes' }] },
        { cells: [{ t: '<strong>Corte vit. D</strong>' }, { t: '&lt; 20 ng/mL (SBP/Endocrine)', cls: 'cell-good' }, { t: '&lt; 12 ng/mL (IOM/AAP)', cls: 'cell-warn' }, { t: 'qual sociedade a questão cita' }] },
        { cells: [{ t: '<strong>DHRN</strong>' }, { t: 'precoce 24h / med. materna' }, { t: 'clássica 2–7d / sem profilaxia' }, { t: 'timing + causa (tardia = &gt;1 sem / desabsorção)' }] },
        { cells: [{ t: '<strong>Beri-béri</strong>' }, { t: 'seco = neuro' }, { t: 'úmido = coração/edema' }, { t: 'predomínio de sistema' }] },
      ]
    )}

    ${svgPiso('S-13', { caption: 'os pares confundíveis — painel de reativação: rosário × rosário, as 3 formas de DHRN em linha do tempo, seco × úmido. Cada par revela o discriminador ao clicar; é o retorno espaçado dos pares, juntos, para serem separados de propósito.', hint: 'Clique em cada par para revelar o que o decide.' })}

    ${med({
      file: 'p12-queilite-angular.jpg',
      alt: 'Fotografia clínica de queilite angular bilateral — fissuras e eritema avermelhado nas duas comissuras labiais, achado mucocutâneo inespecífico associado a várias carências vitamínicas e à deficiência de ferro.',
      achado: '<strong>queilite angular (perlèche)</strong> — fissuras e eritema nas comissuras labiais. É um sinal <strong>inespecífico</strong>: aparece na carência de riboflavina (B2), niacina (B3), piridoxina (B6), B12/folato e ferro — e em causas não-nutricionais (prótese, candidíase). <strong>Reforço (a lição da página):</strong> o sinal isolado <strong>não nomeia a carência</strong>. O mesmo achado pertence a vários "rótulos" — quem discrimina é o conjunto (dieta, hemograma, sinais associados), não a comissura sozinha. É por isso que rosário, glossite e queilite "viajam" entre diagnósticos: olhe o padrão, não o rótulo.',
      fonte: 'By Matthew Ferguson 57, via Wikimedia Commons',
      licenca: 'CC BY-SA 3.0'
    })}

    ${recall([
      'Sem reler: qual o número que a banca inverte na vitamina D, e para qual valor ela o troca?',
      'Você vê um rosário costal numa foto. Que <strong>três coisas</strong> procura no enunciado antes de decidir entre vit. C e vit. D?',
      'Um RN sangra com 30 horas de vida, mãe sem medicação, sem profilaxia ao nascer — qual forma de DHRN, e por quê?',
    ])}

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>A maioria dos erros em prova de carência não é por não saber a vitamina — é por <strong>trocar</strong> um confundível pelo seu par. Treinar a discriminação lado a lado, depois de ter visto cada um no seu contexto, é o que blinda contra a troca. Esse retorno espaçado dos pares fixa mais do que revê-los no momento em que foram ensinados.</p>
    </aside>

    ${quiz('p12', 'Discriminar, lado a lado, os confundíveis de maior risco de prova.', [
      {
        stem: 'A banca apresenta um RN que sangrou nas primeiras 24 horas de vida e afirma que a causa foi "ausência de profilaxia de vitamina K ao nascer". Onde está o erro?',
        alts: [
          { t: 'Não há erro — 24h com falta de profilaxia é a forma clássica', correct: false, why: 'Aceita a mistura — quem marca não separou timing de causa, exatamente o que a página treina.' },
          { t: 'O timing (24h) é da forma precoce, cuja causa é medicação materna, não falta de profilaxia', correct: true, why: 'Certa. A banca fez a troca clássica: deu o <strong>timing da precoce</strong> (24h) com a <strong>causa da clássica</strong> (falta de profilaxia). A precoce é por medicação materna; a clássica (2º–7º dia) é a da falta de profilaxia.' },
          { t: 'O erro é que 24h corresponde à forma tardia', correct: false, why: 'Erra a janela — a tardia é <strong>após a 1ª semana</strong>, não 24h.' },
          { t: 'O erro é que vitamina K não causa doença hemorrágica', correct: false, why: 'Nega o conceito-base — a deficiência de vit. K <strong>é</strong> a causa da DHRN; é um distrator grosseiro para quem se perdeu.' },
        ]
      },
      {
        stem: 'Uma questão pergunta "qual o corte de 25-OH-vitamina D para deficiência?" e, na alternativa, cita explicitamente a régua do IOM/AAP. Qual valor responde corretamente?',
        alts: [
          { t: '< 20 ng/mL, sempre', correct: false, why: 'É o corte da <strong>SBP 2024 / Endocrine Society</strong> (&lt;20) — correto no Brasil, mas a questão <strong>citou o IOM/AAP</strong>; quem marca não leu qual régua foi pedida.' },
          { t: '< 12 ng/mL, conforme o IOM/AAP', correct: true, why: 'Certa. O corte <strong>depende da sociedade citada</strong> — e o IOM/AAP define deficiência como <strong>&lt; 12 ng/mL</strong> (com ≥20 já suficiente para a saúde óssea populacional).' },
          { t: '< 30 ng/mL', correct: false, why: '&lt;30 é alvo de <strong>suficiência</strong> em grupos de risco, não corte de deficiência — confunde alvo com diagnóstico.' },
          { t: 'Não existe corte definido', correct: false, why: 'Nega a existência do corte, mas ele existe em cada régua — o ponto é que <strong>diverge</strong>, não que inexiste; é o erro de quem ouviu "diverge" e concluiu "não há".' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 13 — E5 Meta + checklist + HERÓI Tabelão ===================== */
  // Página 13 — Estratégia: E5 — Meta da página + checklist (síntese)
  P.push(page('p13', 13, `
    ${tag('meta', 'Síntese · o Tabelão das vitaminas')}
    ${chips(['ADEK num golpe', 'B + C num golpe', 'clínica ↔ deficiência', 'só a D pede mais'])}

    <section class="opener opener--checklist" aria-label="Meta e checklist de abertura">
      <p class="opener__checklist-title">Ao final desta página, você crava no automático:</p>
      <ul class="opener__checklist">
        <li class="opener__checklist-item"><span class="opener__check" aria-hidden="true"></span>A = visão</li>
        <li class="opener__checklist-item"><span class="opener__check" aria-hidden="true"></span>D = osso / raquitismo</li>
        <li class="opener__checklist-item"><span class="opener__check" aria-hidden="true"></span>E = prematuro + hemólise / edema</li>
        <li class="opener__checklist-item"><span class="opener__check" aria-hidden="true"></span>K = coagulação / DHRN</li>
        <li class="opener__checklist-item"><span class="opener__check" aria-hidden="true"></span>C = escorbuto</li>
        <li class="opener__checklist-item"><span class="opener__check" aria-hidden="true"></span>B1 = beri-béri</li>
        <li class="opener__checklist-item"><span class="opener__check" aria-hidden="true"></span>B3 = pelagra (3 Ds)</li>
        <li class="opener__checklist-item"><span class="opener__check" aria-hidden="true"></span>B6 = convulsão neonatal</li>
        <li class="opener__checklist-item"><span class="opener__check" aria-hidden="true"></span>B9/B12 = anemia megaloblástica</li>
      </ul>
    </section>

    <h1 class="page-title">O Tabelão das vitaminas: o tema inteiro num quadro</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">Lipossolúveis num golpe de vista</h3>
        <p>Este é o quadro que abre e fecha o tema — o produto que você leva para a prova. As <span class="hl-good">lipossolúveis (ADEK)</span>, cada uma com seu achado-âncora: <strong>vitamina A (retinol) → visão</strong> (acuidade visual, cegueira noturna, manchas de Bitot); <strong>vitamina D (calciferol) → osso</strong> (dureza óssea, raquitismo na criança, desmineralização); <strong>vitamina E (tocoferol) → prematuro com edema e hemólise</strong>; <strong>vitamina K (naftoquinona) → coagulação</strong> (doença hemorrágica do recém-nascido). Quatro vitaminas, quatro órgãos-alvo: olho, osso, sangue-do-prematuro, coagulação. Só com isso, a metade lipossolúvel das questões já se resolve.</p>

        <h3 class="topic-h">Hidrossolúveis num golpe de vista</h3>
        <p>As <span class="hl-bad">hidrossolúveis (complexo B + C)</span>: <strong>vitamina C → escorbuto</strong> (hemorragia gengival, petéquias, posição de RAM); <strong>B1 (tiamina) → beri-béri</strong> (e Wernicke no alcoolista); <strong>B3 (niacina) → pelagra</strong>, a doença dos <strong>3 Ds</strong> (dermatite, diarreia, demência); <strong>B6 (piridoxina) → convulsão neonatal</strong> refratária; <strong>B9 e B12 → anemia megaloblástica</strong> (território da hematologia). Esse quadro de associações é o que mais resolve questão de prova sobre o tema — e o padrão é sempre o mesmo: <strong>clínica ↔ deficiência</strong>, sem entrar em função ou dose detalhada, com a única exceção da vitamina D, que tem o detalhamento maior.</p>
      </div>
    </div>

    ${svgHero('p13', { caption: 'o Tabelão das vitaminas, completo — o mesmo mapa que nasceu vazio na abertura, agora cheio: dois painéis (lipossolúveis ADEK · hidrossolúveis B+C), cada vitamina como nó clicável que revela achado-âncora, órgão-alvo e a página de origem. É o índice-vivo fechado — o produto que você leva para a prova.' })}

    ${med({
      file: 'p13-fontes-alimentares.jpg',
      alt: 'Composição de frutas e hortaliças frescas — cenoura, kiwi, limão, tomate, caqui, laranja, abacate, maçã, banana, manga e pitaia — sobre engradado de madeira, ilustrando alimentos-fonte das vitaminas.',
      achado: 'espectro real de frutas e hortaliças — a cenoura carrega β-caroteno (pró-vitamina <strong>A</strong>); kiwi, limão, tomate, caqui e laranja concentram <strong>vitamina C</strong>; o abacate é uma das frutas mais ricas em <strong>vitamina E</strong>; folhas e vegetais verdes entram com <strong>vitamina K</strong> e <strong>folato</strong>. <strong>Reforço:</strong> é o lado preventivo do Tabelão — a maioria das hipovitaminoses da infância se previne com <strong>diversidade alimentar</strong>, não com suplemento isolado. Repare no que NÃO aparece aqui: <strong>vitamina D</strong> (peixe gordo, gema, fígado + síntese cutânea) e <strong>vitamina B12</strong> (exclusivamente fonte animal) — por isso dieta vegetariana estrita na criança exige atenção a B12, e a D depende de sol/suplementação.',
      fonte: 'By PattayaPatrol, via Wikimedia Commons',
      licenca: 'CC BY-SA 4.0'
    })}

    ${synthCases([
      '<strong>Paciente 1:</strong> nistagmo + oftalmoplegia + ataxia + confusão mental → <strong>tiamina (B1)</strong>, encefalopatia de Wernicke.',
      '<strong>Paciente 2:</strong> dermatite + diarreia + demência (os 3 Ds) → <strong>niacina (B3)</strong>, pelagra.',
      '<strong>Paciente 3:</strong> hiperqueratose perifolicular + equimoses + hemorragias foliculares e gengivais → <strong>vitamina C</strong> (ácido ascórbico), escorbuto.',
    ])}

    <aside class="op-summary">
      <p class="op-summary__label">Resumo operacional</p>
      <p>Carência de vitamina, em prova, é <strong>uma associação clínica ↔ deficiência por vitamina</strong> — domine o tabelão das 10 e resolva quase tudo; só a vitamina D pede mais (eixo PTH, cortes, profilaxia 400/600 UI).</p>
    </aside>

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>O tabelão é o que o aluno leva para a prova: um mapa de recuperação rápida que, diante de qualquer caso, devolve a vitamina em segundos. É também o que organiza o raciocínio no consultório — clínica primeiro, vitamina depois.</p>
    </aside>

    ${quiz('p13', 'Fechamento do tema: as associações do tabelão e a exceção da vitamina D.', [
      {
        stem: 'Três pacientes: (1) nistagmo, oftalmoplegia, ataxia e confusão; (2) dermatite, diarreia e demência; (3) hiperqueratose perifolicular, equimoses e hemorragias gengivais. As deficiências são, respectivamente:',
        alts: [
          { t: 'Niacina, tiamina, vitamina C', correct: false, why: 'Inverte os dois primeiros — troca tiamina e niacina, a confusão clássica entre as B que sobraram.' },
          { t: 'Tiamina, niacina, vitamina C', correct: true, why: 'Certa. (1) tríade de Wernicke = <strong>tiamina (B1)</strong>; (2) os 3 Ds = <strong>niacina (B3)</strong>, pelagra; (3) hemorragias perifoliculares e gengivais = <strong>vitamina C</strong>, escorbuto.' },
          { t: 'Tiamina, vitamina C, niacina', correct: false, why: 'Embaralha 2 e 3 — coloca vit. C nos 3 Ds, que são niacina.' },
          { t: 'Vitamina A, niacina, tiamina', correct: false, why: 'Erra o primeiro — vit. A é visão, não a tríade neurológica de Wernicke; quem marca não reconheceu o padrão oculomotor + confusão.' },
        ]
      },
      {
        stem: 'Qual associação está INCORRETA?',
        alts: [
          { t: 'Raquitismo ↔ rosário costal', correct: false, why: 'Correta — achado clínico e radiológico da vit. D.' },
          { t: 'Crânio tabes ↔ deficiência de vitamina D', correct: false, why: 'Correta — amolecimento craniano do raquitismo.' },
          { t: 'Vitamina A ↔ ceratomalácia', correct: false, why: 'Correta — o amolecimento de córnea avançado da deficiência de retinol.' },
          { t: 'Vitamina E ↔ anemia megaloblástica', correct: true, why: 'É a incorreta (resposta certa): a megaloblástica é de <strong>B9/B12</strong>; a vit. E é <strong>prematuro com hemólise e edema</strong>. "Anemia" puxa para a vit. E, mas <strong>megaloblástica</strong> é assinatura de folato/B12.' },
        ]
      },
      {
        stem: 'Qual é a única vitamina deste tema em que a prova cobra, além da associação clínica, o mecanismo, o laboratório, os cortes diagnósticos e a dose de profilaxia?',
        alts: [
          { t: 'Vitamina A', correct: false, why: 'Cobra clínica ocular + doses de profilaxia, mas não o aprofundamento mecanístico-laboratorial da D.' },
          { t: 'Vitamina K', correct: false, why: 'Cobra fatores e as 3 formas de DHRN, sem eixo metabólico-laboratorial.' },
          { t: 'Vitamina D', correct: true, why: 'Certa. A D concentra o eixo PTH (mecanismo), a laboratorial (↓Ca/↓P/↑PTH/↑FA), os cortes que divergem (&lt;12/&lt;20) e as doses de profilaxia (400/600 UI) — por isso domina a prova.' },
          { t: 'Vitamina C', correct: false, why: 'É associação clínica (escorbuto) pura. A D é a única que pede o pacote completo.' },
        ]
      },
    ])}
  `));

  return P;
}
