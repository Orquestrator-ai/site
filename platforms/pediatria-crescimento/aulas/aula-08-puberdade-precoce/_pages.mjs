/* _pages.mjs — conteúdo autoral das 12 páginas da Aula 08 "Puberdade precoce" (núcleo, sequência
   direta da 07). Texto-aluno = canon do prompt-final (§6), renderizado VERBATIM. Tópicos visíveis
   = <h3 class="topic-h">. Anti-metalinguagem: voz de professor direto ao aluno; continuidade com
   a 07 vive como link-back conceitual (sem citar número de aula). Aberturas E1-E8 conforme o plano
   (anti-monotonia). SVGs de piso (S-*) e a Árvore (objeto persistente, embutida uma vez na P4 —
   widget single-instance navegável por abas) + 2 heróis (P3 curva-paradoxo, P12 Árvore completa +
   Bela) embutidos inline pelos helpers do _build. Imagens reais (radiologia/diagrama/esquema, sem
   foto de estadiamento de menor) em layout SPLIT. Quiz gold (explica TODAS as alternativas) fiel ao
   prompt-final. Eixo cromático: central/HHG (teal/sky) × periférico (índigo) × pegadinha (âmbar) ×
   alerta (coral) × benigno (verde). Posologia do análogo NÃO renderizada (decisão Bauer §3). */

export function buildPages({ med, medSplit, svgPiso, svgHero, svgArvore, flowSvg, notaBanca, notaValor, cmp, collapsible, recall, quiz, tag, chips, page, cardCluster, alertCard, flow, forkFlow, naoConfunda, belaCard }) {
  const P = [];

  /* ===================== PÁGINA 1 — E3 Caso clínico em abertura ===================== */
  // Página 1 — Estratégia: E3 — Caso clínico em abertura
  P.push(page('p1', 1, `
    ${tag('caso', 'Caso-âncora · relógio adiantado ou doença?')}
    ${chips(['Bela · 7 anos · M4 P3', 'a mais alta da turma', '"deixa rolar" estava errado', '< 8 = precoce'])}

    <article class="opener opener--case" aria-label="Caso clínico de abertura">
      <span class="opener__case-header">Bela · 7 anos · o caso que abre tudo</span>
      <p class="opener__case-quote">Bela tem 7 anos, é a mais alta da turma, já tem mama e pelos pubianos, e dois médicos diferentes olharam para ela e disseram à mãe a mesma coisa: "é assim mesmo, deixa rolar — daqui a pouco ela menstrua, vida que segue". A mãe está tranquila e orgulhosa da filha saudável. Antes de concordar com ela, vale uma pergunta: tudo o que você aprendeu sobre puberdade fisiológica encaixa numa menina de 7 anos M4 P3 — ou alguma coisa aqui está fora do lugar?</p>
      <dl class="case-card__meta">
        <dt>Paciente</dt><dd>Bela, 7 anos — mama M4, penificação P3, "a mais alta da turma"</dd>
        <dt>História</dt><dd>telarca há ~8 meses (por volta dos 6 anos), depois pelos pubianos</dd>
        <dt>O que tranquilizou</dt><dd>dois médicos liberaram como "é assim mesmo, deixa rolar"</dd>
        <dt>A pergunta-fio</dt><dd>puberdade fisiológica ou puberdade precoce?</dd>
      </dl>
    </article>

    <h1 class="page-title">Bela, 7 anos, "deixa rolar": o caso que abre tudo</h1>

    ${medSplit({
      file: 'p1-tanner-feminino.svg',
      alt: 'Escala de Tanner feminina (esquema): estágios I a V do desenvolvimento mamário (frente e perfil) e dos pelos pubianos, lidos como dois eixos independentes.',
      light: true,
      side: 'right',
      titulo: 'Esquema de referência',
      achado: 'a <strong>escala de Tanner feminina</strong> com os dois eixos que se pontuam separados — mama (M1-M5) e pelos pubianos (P1-P5). Bela está em <strong>M4 P3</strong>: o estágio do duplo contorno (M4) com penificação P3.',
      fonte: 'Michał Komorniczak, via Wikimedia Commons',
      licenca: 'CC BY-SA 3.0',
      body: 'Mama e pelos são <strong>eixos independentes</strong>: M4 marca o "duplo contorno" (aréola e papila projetadas acima do contorno da mama), P3 marca pelos escuros e espessos sobre a sínfise. Em Bela, os dois aparecem juntos e cedo — e é o cruzamento com a idade que muda tudo.'
    })}

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">A menina mais alta da turma</h3>
        <p>Bela é uma escolar de <span class="term">7 anos</span>, levada a uma consulta de rotina. A mãe está satisfeita: a filha é saudável e vem <strong>crescendo bastante</strong> — na última festa da escola, era a <strong>mais alta</strong> entre todas as colegas. Para a mãe, isso é uma boa notícia. Guarde essa frase, porque ela é uma armadilha: "a mais alta da turma" vai se revelar, mais adiante, exatamente o sinal que deveria preocupar. A mãe ainda relata a cronologia: o desenvolvimento das mamas começou há <strong>pouco mais de 8 meses</strong> (por volta dos 6 anos), seguido pelo aparecimento dos pelos pubianos. E acrescenta o que tranquilizou os dois médicos anteriores: "outro médico já pediu exames e disse que era assim mesmo".</p>

        <h3 class="topic-h">O que o exame e os exames mostraram</h3>
        <p>Ao exame físico, o que se encontra não é discreto. A mama apresenta <strong>tecido glandular estendendo-se além dos limites da aréola, com aréola e papila formando uma projeção acima do contorno da mama</strong> — isso é <span class="term">mama em estágio M4</span> (M4 é o estágio do "duplo contorno"). Há ainda <strong>pelos escuros e espessos sobre a sínfise púbica</strong> — <span class="term">penificação P3</span>. Some tudo: <strong>7 anos, M4 P3</strong>, com aceleração de crescimento. Os exames complementares de Bela: <span class="hl-good">LH e FSH aumentados</span>; <strong>ultrassonografia pélvica com útero de conformação puberal</strong> (durante a puberdade o formato do útero se altera e o volume uterino e ovariano aumentam — marca de impregnação estrogênica); e uma <strong>ressonância magnética de crânio, que veio normal</strong> (o motivo de ela ter sido feita fica reservado — voltaremos a Bela no fim, com todas as peças na mão).</p>

        <h3 class="topic-h">Por que "deixa rolar" estava errado</h3>
        <p>Agora cruze isso com a régua da puberdade fisiológica que você já domina: a janela normal de início da puberdade feminina é <span class="term">dos 8 aos 13 anos</span> — e iniciar <strong>antes dos 8 anos</strong> é o limite que define o "precoce". Bela tem <strong>7 anos</strong> e já está em <strong>M4 P3</strong>: ela está <span class="hl-bad">fora da janela fisiológica</span>, à esquerda do corte. À luz de tudo o que você já sabe, <strong>Bela não tem puberdade fisiológica — ela tem uma puberdade precoce</strong>. Os dois médicos que disseram "deixa rolar" trataram o desenvolvimento avançado como sinônimo de criança saudável. É o erro exato a desmontar: desenvolvimento puberal antes da hora não é "estar adiantada" — é um diagnóstico que pede causa e, muitas vezes, tratamento.</p>
      </div>
    </div>

    ${svgPiso('S-fichaBela', { caption: 'a ficha de Bela — avatar neutro, idade (7a), estadiamento (M4 P3) e a frase-gancho da mãe ("é assim mesmo, deixa rolar"). Tom calmo de propósito: é o touchpoint que volta carimbado com a resposta no fechamento.', hint: 'Toque para revelar; a ficha reaparece com o diagnóstico na última página.' })}

    ${svgPiso('S-tanner07', { caption: 'a régua etária da puberdade feminina (janela 8-13) com a zona "< 8 anos = precoce" destacada à esquerda e Bela (7a, M4 P3) caindo dentro dela. Em um olhar: Bela está à esquerda do corte. Reaproveita a régua que você já conhece — não recria o estadiamento.', hint: 'O pin de Bela na zona vermelha é a prova visual do "fora da janela".', doc: true })}

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>A queixa "minha filha está se desenvolvendo cedo" e o oposto ("não está se desenvolvendo") chegam o tempo todo. O erro que custa caro é o de Bela: liberar um desenvolvimento precoce como "adiantamento saudável" sem estadiar e sem cruzar com a idade. Estadiar (Tanner) + situar na janela (♀ < 8 · ♂ < 9) é o reflexo que separa o "deixa rolar" perigoso da tranquilização legítima.</p>
    </aside>

    ${quiz('p1', 'O caso-âncora e por que um desenvolvimento precoce não é "adiantamento saudável".', [
      {
        stem: 'Bela tem 7 anos, mama M4, penificação P3 e vem sendo a mais alta da turma; dois médicos liberaram como "é assim mesmo". À luz da puberdade fisiológica, qual a leitura correta?',
        alts: [
          { t: 'É variação normal — desenvolvimento avançado em criança saudável, deixa evoluir', correct: false, why: 'É o erro dos dois médicos: confunde "alta/avançada" com "saudável" — exatamente o reflexo a desmontar; criança que se desenvolve antes da janela não está "adiantada", está doente até prova em contrário.' },
          { t: 'É puberdade precoce — desenvolvimento puberal abaixo do corte etário (♀ < 8 anos)', correct: true, why: 'Certa. A virada já está aqui: desenvolvimento puberal (M4 P3) antes dos 8 anos, com aceleração de crescimento, é puberdade precoce — por definição, independentemente de exame.' },
          { t: 'Só se pode dizer algo após dosar LH e FSH', correct: false, why: 'Inverte a ordem: o diagnóstico de puberdade precoce é clínico (sinal + aceleração + idade), e os exames servem para achar a causa, não para dizer "se há" PP — quem marca aqui acha que precisa de laboratório para enxergar o óbvio clínico.' },
          { t: 'É puberdade precoce apenas se a ressonância de crânio estiver alterada', correct: false, why: 'Confunde diagnóstico com etiologia: a RM investiga a causa de uma PP central, não a existência da PP; Bela tem PP mesmo com RM normal (que, aliás, ela tem).' },
        ]
      },
      {
        stem: '(Verdadeiro ou Falso) "Por ser a mais alta da turma, Bela tem um bom prognóstico de estatura na vida adulta."',
        tf: true,
        alts: [
          { t: 'Verdadeiro', correct: false, why: 'Cai na mesma armadilha da mãe e dos dois médicos: ler altura atual como boa notícia. Em puberdade precoce, "alta agora" é o anúncio de "baixa depois".' },
          { t: 'Falso', correct: true, why: 'Certa. É o paradoxo que a próxima página vai abrir: a puberdade precoce deixa a criança mais alta agora (por isso Bela é a maior da turma), mas leva a baixa estatura na vida adulta — o estirão precoce vem junto com fechamento precoce das epífises.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 2 — E1 Pergunta central ===================== */
  // Página 2 — Estratégia: E1 — Pergunta central
  P.push(page('p2', 2, `
    ${tag('central', 'Definição operacional · a equação')}
    ${chips(['sinal + aceleração', 'isolado não basta', '♀ < 8 · ♂ < 9', 'prova = 8'])}

    <section class="opener opener--question" aria-label="Pergunta de abertura">
      <span class="opener__question-mark" aria-hidden="true">?</span>
      <p class="opener__text">Se uma menina de 7 anos desenvolve <strong>só</strong> a mama, isso já é doença — ou ainda falta uma segunda peça para você poder chamar de puberdade precoce? E qual é exatamente essa peça?</p>
    </section>

    <h1 class="page-title">Puberdade precoce é uma soma, não um sinal solto</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">A segunda peça obrigatória: aceleração</h3>
        <p>Aqui está a definição que separa doença de variante benigna, e ela é uma <strong>soma</strong>: puberdade precoce é o <span class="term">surgimento de caracteres sexuais secundários acompanhado de aceleração no crescimento</span>, em idade abaixo do corte fisiológico. A palavra que carrega o peso é <strong>acompanhado</strong>. Um <span class="hl-warn">sinal puberal isolado não basta</span> para diagnosticar puberdade precoce — uma menina que tem <strong>apenas</strong> a mama, ou <strong>apenas</strong> pelos, sem nada mais, pode estar apresentando só uma <span class="hl-good">variante benigna</span> do desenvolvimento (que tem página própria adiante). A criança que <strong>realmente</strong> tem puberdade precoce é a que apresenta os sinais puberais <strong>E</strong> aceleração do crescimento, <strong>com avanço da idade óssea</strong>. Fixe a equação: <span class="term">sinal puberal precoce + aceleração do crescimento (idade óssea avançada) = puberdade precoce</span>. Tire a aceleração, e você tem outra coisa.</p>

        <h3 class="topic-h">Os cortes por sexo: ♀ &lt; 8 · ♂ &lt; 9</h3>
        <p>Os cortes etários vêm da fisiologia da puberdade e são assimétricos — não os iguale. No <strong>sexo feminino</strong>, a puberdade precoce começa <span class="term">antes dos 8 anos</span> (a janela fisiológica feminina é 8-13). No <strong>sexo masculino</strong>, começa <span class="term">antes dos 9 anos</span> (a janela masculina é 9-14 — o corte do menino é <strong>&lt; 9, não &lt; 8</strong>). É o erro de prosa que mais escorrega: escrever "&lt; 8" para o menino. Para o menino, o número é <strong>9</strong>. Os dois números da casa, herdados da fisiologia da puberdade: <span class="hl-good">♀ = 8 · ♂ = 9</span>.</p>

        <h3 class="topic-h">A pegadinha do limite "em discussão"</h3>
        <p>Existe uma discussão real na literatura sobre <strong>baixar</strong> o limite etário inferior da definição (há quem proponha cortes menores em certas populações). Para a sua prova, isso é ruído controlado: <span class="term">mantém-se 8 anos como o limite inferior de referência</span> (abaixo dos 8, na menina, é puberdade precoce). Não troque esse número na hora da questão por causa do debate acadêmico — a banca quer o <strong>8</strong>.</p>
      </div>
    </div>

    ${svgPiso('S-equacao', { caption: 'a equação que separa doença de variante benigna — "sinal puberal precoce + aceleração do crescimento / idade óssea avançada = PUBERDADE PRECOCE", com o ramo discreto "sinal isolado SEM aceleração → variante benigna". A peça-peso é o operador "+".', hint: 'Toque no "+": a aceleração é a peça obrigatória.' })}

    ${medSplit({
      file: 'p2-idade-ossea-avancada.png',
      alt: 'Radiografia de mão e punho com idade óssea muito acima da idade cronológica, em contexto de puberdade precoce.',
      light: true,
      side: 'right',
      titulo: 'Radiografia (caso real)',
      achado: 'a <strong>idade óssea avançada</strong> — a "segunda peça" objetivada. RX de mão/punho de paciente com maturação óssea muito acima da idade cronológica (fises das falanges já fusionadas); é a confirmação radiográfica da aceleração que fecha a equação.',
      fonte: 'Desiree Rassa Eshraghi, Radiopaedia.org rID 160693',
      licenca: 'CC BY-NC-SA 3.0',
      body: 'A idade óssea é o que torna a "aceleração" mensurável: na puberdade precoce espera-se <strong>idade óssea maior que a cronológica</strong>. Mas guarde a pegadinha da página 7 — no primeiro exame ela pode ainda não ter batido +2 DP.'
    })}

    ${svgPiso('S-reguas', { caption: 'as duas réguas espelhadas de mesma largura — "♀ início < 8 anos = precoce" e "♂ início < 9 anos = precoce", cada uma com a zona precoce sombreada à esquerda do corte. Os cortes são assimétricos; o erro é igualá-los em "< 8".', hint: 'Passe o mouse em cada régua para ver a janela fisiológica correspondente.' })}

    <aside class="exec-alert exec-alert--good" role="note">
      <p class="exec-alert__kicker">Regra de ouro</p>
      <p class="exec-alert__title">Sinal puberal isolado não é puberdade precoce.</p>
      <p class="exec-alert__body">Puberdade precoce = <strong>sinal + aceleração do crescimento/idade óssea</strong>, abaixo do corte (♀ &lt; 8 · ♂ &lt; 9). Sem a segunda peça (aceleração), pense <strong>variante benigna</strong>, não doença.</p>
    </aside>

    <aside class="trap practice">
      <p class="practice__label">Pegadinha de prova</p>
      <p><strong>O corte do menino é &lt; 9, não &lt; 8</strong> — e o limite "em discussão" não muda a resposta de prova: <strong>use 8</strong> como referência inferior feminino. Quem iguala os dois sexos em "&lt; 8" ou quem baixa o corte por causa do debate erra a questão.</p>
    </aside>

    ${notaBanca('"Limite inferior em discussão" é verdade acadêmica, mas <strong>para prova = 8</strong>. A discussão existe; a resposta esperada, não muda.')}

    ${quiz('p2', 'A equação (sinal + aceleração) e os cortes assimétricos.', [
      {
        stem: 'Uma menina de 6 anos apresenta apenas broto mamário, sem qualquer outro sinal e com velocidade de crescimento normal. Qual a classificação mais correta?',
        alts: [
          { t: 'Puberdade precoce, pois há caractere sexual antes dos 8 anos', correct: false, why: 'Classifica pela metade da equação — caractere sexual antes dos 8 é necessário, mas não suficiente; sem aceleração, não é PP.' },
          { t: 'Provável variante benigna — falta a aceleração do crescimento para fechar puberdade precoce', correct: true, why: 'Certa. A definição é uma soma: sinal puberal + aceleração. Mama isolada com crescimento normal não tem a segunda peça → pensa-se variante benigna (telarca precoce), que se acompanha.' },
          { t: 'Puberdade precoce periférica, por ser isolada', correct: false, why: 'Inventa um subtipo: "isolada" não significa "periférica" — central × periférica é a divisão das PP de verdade (com aceleração); um sinal isolado nem chegou a ser PP.' },
          { t: 'Não classificável sem dosagem de LH', correct: false, why: 'Parte para laboratório onde a clínica resolve — o diagnóstico (e a exclusão) de PP é clínico; LH só entraria depois de confirmada a PP, para definir a causa.' },
        ]
      },
      {
        stem: 'Sobre os cortes etários da puberdade precoce, qual afirmação está CORRETA?',
        alts: [
          { t: 'É precoce abaixo dos 8 anos em ambos os sexos', correct: false, why: 'Iguala os sexos — o erro de prosa mais comum; o menino é < 9, a menina < 8.' },
          { t: 'É precoce abaixo dos 8 anos na menina e abaixo dos 9 anos no menino; para prova, usa-se o limite de 8 na menina mesmo com o debate', correct: true, why: 'Certa. Os cortes são assimétricos (♀ < 8 · ♂ < 9), herdados das janelas 8-13 e 9-14, e a resposta de prova mantém o 8 para a menina apesar da discussão acadêmica.' },
          { t: 'É precoce abaixo dos 9 anos em ambos os sexos', correct: false, why: 'Iguala os sexos de novo, agora no número errado para a menina — a menina é < 8.' },
          { t: 'Por causa do debate atual, o limite inferior deve ser baixado para 6 anos na prova', correct: false, why: 'Cai na armadilha do "limite em discussão": o debate existe, mas a banca quer o número de referência (8), não a proposta acadêmica de baixá-lo.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 3 — E7 Comparação chocante [HERÓI H2] ===================== */
  // Página 3 — Estratégia: E7 — Comparação chocante
  P.push(page('p3', 3, `
    ${tag('grow', 'Por que importa · o paradoxo da estatura')}
    ${chips(['3 motivos para tratar', 'alta agora, baixa depois', 'fechamento epifisário precoce', 'as curvas se cruzam'])}

    <section class="opener opener--vs" aria-label="Comparação de abertura">
      <div class="opener__vs-grid">
        <div class="opener__vs-side">
          <h3>Agora</h3>
          <p>A criança é a <strong>mais alta</strong> da turma — o estirão precoce a coloca à frente dos colegas.</p>
        </div>
        <div class="opener__vs-divider" aria-hidden="true">vs</div>
        <div class="opener__vs-side">
          <h3>Depois</h3>
          <p>Na vida adulta, será a <strong>mais baixa</strong> — o fechamento epifisário precoce cobra o preço.</p>
        </div>
      </div>
      <p class="opener__vs-asterisk">O mesmo processo produz os dois resultados opostos. Como é que adiantar o crescimento acaba em <strong>perder</strong> estatura?</p>
    </section>

    <h1 class="page-title">A criança mais alta da turma é a que vai ficar baixa</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">Por que tratar: os três motivos</h3>
        <p>A puberdade precoce importa — e exige tratamento — por <strong>três motivos</strong>. <strong>Primeiro</strong>: ela pode ser a <span class="hl-bad">manifestação de uma doença subjacente</span> passível de tratamento (um tumor, uma lesão do sistema nervoso central — as causas vêm nas próximas páginas). <strong>Segundo</strong>: a <span class="term">consequência psicossocial</span>. A criança passa a ter um <strong>corpo físico</strong> desenvolvido que <strong>não é acompanhado pelo desenvolvimento cognitivo</strong> correspondente — um corpo de adolescente com a mente de uma criança de 7 anos. Esse descompasso a torna <strong>mais vulnerável a situações de violência</strong> e interfere na forma como ela se relaciona, por ter um corpo diferente do das outras crianças do convívio. <strong>Terceiro</strong>, e grave a longo prazo: a puberdade precoce leva à <span class="hl-bad">baixa estatura na vida adulta</span>. É esse terceiro motivo que o paradoxo explica.</p>

        <h3 class="topic-h">O paradoxo: alta na infância, baixa na vida adulta</h3>
        <p>Aqui está o ponto mais cobrado e mais contraintuitivo do tema — <span class="term">o paradoxo da estatura</span>: a puberdade precoce causa <strong>ALTA estatura na infância</strong> (por isso a criança é a mais alta da turma, como Bela) <strong>mas BAIXA estatura na vida adulta</strong>. As duas coisas, no mesmo paciente, em momentos diferentes. Quem olha a criança hoje vê altura e se tranquiliza (o erro da mãe de Bela). Quem entende o mecanismo sabe que essa altura precoce é justamente o sinal de que estatura está sendo <strong>perdida</strong> lá na frente.</p>

        <h3 class="topic-h">O mecanismo: acelera o crescimento e o fechamento das epífises</h3>
        <p>O mecanismo tem dois efeitos simultâneos, e é a soma deles que produz o paradoxo. A criança tem <strong>aceleração do crescimento</strong> — fica mais alta, mais rápido, agora. <strong>Mas</strong> ela também tem <span class="hl-bad">aceleração do fechamento epifisário</span> — as cartilagens de crescimento se fecham <strong>antes da hora</strong>, e o osso <strong>para de crescer mais cedo</strong>. E aqui está o detalhe decisivo: a <strong>aceleração temporária do crescimento NÃO consegue repor o tempo de crescimento perdido</strong> pelo fechamento precoce das epífises. Ganha-se altura por um período curto e intenso, mas perde-se o longo período de crescimento que viria depois. O saldo, <strong>sem tratamento, é perda de estatura adulta</strong>. Visualmente: a curva da puberdade precoce <strong>dispara cedo</strong> (fica acima da normal na infância), mas faz <strong>platô precoce</strong> (o osso fecha) e <strong>termina abaixo</strong> da curva normal. As duas curvas se <span class="term">cruzam</span> — e esse cruzamento É o paradoxo.</p>
      </div>
    </div>

    ${svgHero('p3', { caption: 'o paradoxo da estatura — duas trajetórias de estatura × idade na mesma escala. A curva normal sobe mais devagar, cresce por mais tempo, termina mais alta. A curva da puberdade precoce dispara cedo, faz platô precoce (fechamento epifisário) e termina abaixo. As curvas se cruzam: aqui ela é a mais alta; depois, a mais baixa. Hotspots no cruzamento, no fechamento precoce e na distância das alturas adultas.' })}

    ${medSplit({
      file: 'p3-curva-estatura-meninos.png',
      alt: 'Curvas CDC/NCHS de estatura por idade para meninos de 2 a 20 anos, com canais de percentil P3 a P97.',
      light: true,
      side: 'left',
      titulo: 'Curva de referência (CDC/NCHS)',
      achado: 'a <strong>carta de estatura por idade</strong> com os canais de percentil — o pano de fundo real sobre o qual o paradoxo se desenha. Uma criança com PP fura para cima cedo e depois cruza para baixo o próprio canal, terminando abaixo do alvo.',
      fonte: 'CDC/NCHS Growth Charts, via Wikimedia Commons',
      licenca: 'Domínio público (US Gov)',
      body: 'A carta plota idade × estatura e localiza o canal de crescimento. Não confunda <strong>percentil</strong> (posição numa medida isolada) com <strong>velocidade</strong> (inclinação ao longo do tempo): é a mudança de canal — para cima cedo, para baixo depois — que conta a história da PP.'
    })}

    ${cardCluster([
      { icon: '⚕', tone: 'bad', title: 'Doença subjacente tratável', body: 'A PP pode ser a ponta de um tumor ou de uma lesão do SNC — investigar pode revelar causa removível.' },
      { icon: '◑', tone: 'warn', title: 'Consequência psicossocial', body: 'Corpo de adolescente com mente de criança → maior vulnerabilidade e dificuldade de convívio.' },
      { icon: '↓', tone: 'bad', title: 'Baixa estatura adulta', body: 'Fechamento epifisário precoce: o estirão curto não repõe o tempo de crescimento perdido.' },
    ])}

    <aside class="exec-alert exec-alert--good" role="note">
      <p class="exec-alert__kicker">Regra de ouro</p>
      <p class="exec-alert__title">Alta na infância, baixa na vida adulta.</p>
      <p class="exec-alert__body">O estirão precoce vem junto com o fechamento epifisário precoce, e o tempo de crescimento perdido não se repõe. Por isso se trata: para frear o eixo e <strong>comprar tempo de crescimento</strong>.</p>
    </aside>

    <aside class="trap practice">
      <p class="practice__label">Pegadinha de prova</p>
      <p><strong>"Criança alta = bom prognóstico" é falso na puberdade precoce.</strong> A altura atual é o anúncio da baixa estatura futura. A banca oferece "tranquilizar pela estatura" como distrator — é o erro.</p>
    </aside>

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>É o argumento que se dá à família para <strong>indicar tratamento</strong>. Pais veem altura e relutam em medicar uma criança "saudável e alta". Saber explicar — em uma frase — que a altura de hoje é a baixa estatura de amanhã, e que tratar é comprar tempo de crescimento, é o que transforma a recusa em adesão.</p>
    </aside>

    ${quiz('p3', 'O paradoxo da estatura e os três motivos para tratar.', [
      {
        stem: 'Por que a puberdade precoce, que torna a criança mais alta na infância, resulta em baixa estatura na vida adulta?',
        alts: [
          { t: 'Porque a aceleração do crescimento esgota precocemente a reserva nutricional do osso', correct: false, why: 'Inventa uma "reserva nutricional" — o mecanismo é o fechamento epifisário precoce, não esgotamento de nutriente.' },
          { t: 'Porque acelera o crescimento e o fechamento epifisário; o estirão temporário não repõe o tempo de crescimento perdido', correct: true, why: 'Certa. O paradoxo vem de dois efeitos simultâneos: a criança cresce mais rápido agora e fecha as epífises antes da hora; o ganho intenso e curto não compensa o longo período de crescimento perdido.' },
          { t: 'Porque a criança cresce demais na infância e o corpo compensa parando de crescer', correct: false, why: 'Descreve uma "compensação" homeostática que não existe — não é o corpo "compensando" o excesso; é a epífise fechando por estímulo hormonal.' },
          { t: 'Porque o excesso de hormônio sexual destrói diretamente a cartilagem de crescimento', correct: false, why: 'Erra o mecanismo: o hormônio sexual acelera a maturação e o fechamento da cartilagem (via maturação esquelética), não a "destrói" diretamente; acerta o vilão (hormônio) mas inventa a via.' },
        ]
      },
      {
        stem: 'Quais são os três motivos que justificam tratar a puberdade precoce?',
        alts: [
          { t: 'Risco de infertilidade, baixa estatura adulta e ginecomastia', correct: false, why: 'Troca dois motivos por complicações não centrais aqui (infertilidade e ginecomastia não são os eixos do "por que tratar" da PP).' },
          { t: 'Doença subjacente tratável, consequência psicossocial e baixa estatura adulta', correct: true, why: 'Certa. Os três motivos do roteiro: (1) pode ser manifestação de doença subjacente tratável; (2) psicossocial (corpo adulto / mente infantil → vulnerabilidade); (3) baixa estatura adulta.' },
          { t: 'Baixa estatura adulta, hipertensão e diabetes precoce', correct: false, why: 'Inventa comorbidades metabólicas que não pertencem a esta lista.' },
          { t: 'Apenas a baixa estatura adulta — os demais não justificam tratar', correct: false, why: 'Subestima — reduzir a indicação só à estatura ignora a doença subjacente (que pode ser um tumor) e o impacto psicossocial; perde a dimensão de que a PP pode ser a ponta de um iceberg etiológico.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 4 — E1 Pergunta central (Árvore nasce) ===================== */
  // Página 4 — Estratégia: E1 — Pergunta central
  P.push(page('p4', 4, `
    ${tag('central', 'A bifurcação · a Árvore nasce')}
    ${chips(['central × periférica', 'GnRH-dependente?', 'sempre isossexual × iso/hetero', 'virilização ≠ só pelo'])}

    <section class="opener opener--question" aria-label="Pergunta de abertura">
      <span class="opener__question-mark" aria-hidden="true">?</span>
      <p class="opener__text">Se uma menina com puberdade precoce e outra desenvolvem <strong>os mesmos sinais</strong> — mama, pelo, crescimento —, o que de fato separa as duas grandes formas da doença? E por que só <strong>uma</strong> delas é chamada de "verdadeira"?</p>
    </section>

    <h1 class="page-title">A pergunta de prova é "qual é a causa?" — e ela tem duas respostas</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">A grande pergunta: qual é a causa?</h3>
        <p>Confirmada a puberdade precoce, a <span class="term">grande pergunta de prova</span> é uma só: <strong>qual é a causa?</strong> E aqui vale o princípio de raciocínio que organiza o endócrino inteiro: <strong>não é decoreba — tudo é fisiologia</strong>. Entendendo o eixo (que você já domina da fisiologia da puberdade), a causa se deduz, não se memoriza. A puberdade precoce se separa em <strong>duas grandes síndromes</strong>, e a chave para distingui-las é uma pergunta sobre o eixo: <strong>o grande evento hormonal da puberdade — a ativação do eixo hipotálamo-hipófise-gonadal — aconteceu, ou não?</strong></p>

        <h3 class="topic-h">Central = "verdadeira" = eixo HHG ativado = sempre isossexual</h3>
        <p>A primeira forma é a <span class="term">puberdade precoce CENTRAL</span>, também chamada de <strong>puberdade precoce VERDADEIRA</strong>. Ela é <span class="hl-good">dependente do GnRH</span>. É chamada de "verdadeira" porque ocorre <strong>exatamente o evento da puberdade real</strong>: a ativação do eixo HHG — <strong>GnRH → hipófise → gonadotrofinas (LH/FSH) → ação nas gônadas</strong> (o eixo que você montou na fisiologia da puberdade). Como o eixo está ativado de verdade, o testículo secreta <strong>testosterona</strong> e o ovário secreta <strong>estrogênio</strong>, pelo estímulo gonadotrófico <strong>normal</strong>. Consequência direta: a puberdade central é <span class="hl-good">sempre ISOSSEXUAL</span> — desenvolvem-se os caracteres do <strong>próprio sexo genotípico</strong> (menina desenvolve mama, por ação estrogênica; menino vira-se viril). E a central é um diagnóstico <strong>sindrômico</strong>: há várias causas subjacentes a investigar (próxima página).</p>

        <h3 class="topic-h">Periférica = "pseudopuberdade" = independente do GnRH = iso ou heterossexual</h3>
        <p>A segunda forma é a <span class="term term--perif">puberdade precoce PERIFÉRICA</span>, também chamada de <strong>PSEUDOPUBERDADE</strong> — e o "pseudo" é literal: <strong>NÃO ocorre o grande evento hormonal da puberdade</strong> (a ativação do eixo HHG). Ela tem sinal puberal, aceleração do crescimento e perda de estatura — parece puberdade —, mas é um processo <strong>independente do GnRH</strong>: não há GnRH, não há gonadotrofina; os hormônios vêm de <strong>outra fonte</strong> (uma gônada autônoma, uma adrenal, uma fonte exógena). E aqui está a diferença-chave que a banca explora: a central é <strong>sempre isossexual</strong>; a periférica pode ser <span class="hl-warn">ISOSSEXUAL ou HETEROSSEXUAL</span>. <strong>Heterossexual</strong> significa surgimento de sinais do <strong>sexo oposto</strong> — mais fácil de enxergar na menina: uma menina com sinais de <strong>virilização</strong> (excesso de androgênio).</p>

        <h3 class="topic-h">O que é virilização (e por que não é só pelo)</h3>
        <p>Cuidado com a palavra <span class="term">virilização</span> no sexo feminino — é uma pegadinha clássica. Virilização <strong>NÃO é só o surgimento de pelos</strong>. É o conjunto: <span class="hl-bad">pelos + hipertrofia de clitóris + alteração da voz</span>. Esse conjunto é o que denota <strong>excesso de androgênio</strong>. Por que isso importa tanto? Porque pelo isolado, numa menina, pode ser só <strong>adrenarca</strong> (normal ou variante benigna — página 10); já <strong>hipertrofia de clitóris e voz</strong> gritam excesso de androgênio e apontam para <strong>doença da adrenal</strong>. Quem lê "pelos" e já escreve "virilização" perde a discriminação que a banca planta. Guarde o conjunto.</p>
      </div>
    </div>

    ${svgArvore('p4', 'P4', { caption: 'a Árvore Central × Periférica — o objeto-âncora do raciocínio diagnóstico, que nasce aqui e hidrata ramo a ramo até a síntese. Raiz "puberdade precoce (sinal + aceleração)" → dois ramos: CENTRAL (GnRH-dependente, "verdadeira", sempre isossexual) × PERIFÉRICA (GnRH-independente, "pseudopuberdade", iso ou heterossexual). As abas percorrem os estados de hidratação — causas, exames e conduta — até a Árvore completa.', hint: 'Abas P4→P10: clique num ramo para expandir; cada estado mostra o que aquele bloco constrói.' })}

    ${cmp('Central × Periférica — o que separa as duas', ['Característica', 'Central', 'Periférica'], [
      { cells: [{ t: 'Dependência do GnRH' }, { t: 'GnRH-dependente', cls: 'cell-central' }, { t: 'GnRH-independente', cls: 'cell-perif' }] },
      { cells: [{ t: 'Apelido' }, { t: '"verdadeira"', cls: 'cell-central' }, { t: '"pseudopuberdade"', cls: 'cell-perif' }] },
      { cells: [{ t: 'Tipo' }, { t: 'sempre isossexual', cls: 'cell-central' }, { t: 'iso OU heterossexual', cls: 'cell-perif' }] },
    ])}

    ${medSplit({
      file: 'p12-fluxograma-manejo.png',
      alt: 'Fluxograma publicado de avaliação da puberdade precoce, bifurcando central × periférica pelo LH.',
      light: true,
      side: 'left',
      titulo: 'Fluxograma publicado (caso real)',
      achado: 'a <strong>bifurcação central × periférica</strong> na forma como a literatura a desenha: a triagem ancora no <strong>LH</strong> — LH puberal → central (→ RM cerebral); LH pré-puberal → teste com GnRH; LH baixo sustenta periférica. É a Árvore desta aula, publicada.',
      fonte: 'Micangeli et al., Children 2023, via MDPI',
      licenca: 'CC BY 4.0',
      body: 'Confronte com a Árvore acima: a mesma pergunta-mestra ("o eixo HHG ativou?") organiza os dois. O fluxograma publicado prova que a bifurcação central × periférica não é um truque didático — é como o tema se estrutura na fonte.'
    })}

    <aside class="exec-alert exec-alert--central" role="note">
      <p class="exec-alert__kicker">Regra de ouro</p>
      <p class="exec-alert__title">A pergunta que separa as duas é uma só: o eixo HHG ativou?</p>
      <p class="exec-alert__body"><strong>Central</strong> = verdadeira = eixo HHG ativado = sempre isossexual. <strong>Periférica</strong> = pseudopuberdade = GnRH-independente = iso OU heterossexual. Se o eixo ativou, central; se não, periférica.</p>
    </aside>

    <aside class="trap practice">
      <p class="practice__label">Pegadinha de prova</p>
      <p><strong>Virilização ♀ ≠ só pelo.</strong> Virilização = pelo <strong>+ hipertrofia de clitóris + alteração de voz</strong>. Pelo isolado pode ser adrenarca benigna; o conjunto aponta excesso de androgênio (adrenal). E <strong>só a periférica</strong> pode ser heterossexual — central é sempre isossexual.</p>
    </aside>

    ${quiz('p4', 'A bifurcação central × periférica e o conjunto da virilização.', [
      {
        stem: 'Qual característica define a puberdade precoce central e a distingue da periférica?',
        alts: [
          { t: 'É sempre heterossexual, porque ativa o eixo HHG', correct: false, why: 'Inverte o tipo sexual — eixo HHG ativado age sobre a própria gônada, então o resultado é isossexual, nunca heterossexual; heterossexual só aparece na periférica.' },
          { t: 'É dependente do GnRH (eixo HHG ativado) e por isso sempre isossexual', correct: true, why: 'Certa. A central é a puberdade "verdadeira": o eixo HHG ativa de fato (GnRH-dependente), a gônada é estimulada de modo normal e os caracteres são sempre do próprio sexo (isossexual).' },
          { t: 'É independente do GnRH, com hormônios de fonte gonadal autônoma', correct: false, why: 'Descreve a periférica (GnRH-independente, fonte autônoma) — é o oposto da central.' },
          { t: 'Cursa com sinal puberal sem aceleração do crescimento', correct: false, why: 'Descreve um sinal isolado/variante benigna, não a central — toda PP (central ou periférica) tem aceleração por definição.' },
        ]
      },
      {
        stem: 'Numa menina, qual achado caracteriza virilização (e não apenas adrenarca)?',
        alts: [
          { t: 'Surgimento isolado de pelos pubianos', correct: false, why: 'É a armadilha-mãe: pelo isolado pode ser só adrenarca (normal/benigna), não virilização; quem marca aqui escreve "virilização" ao ver qualquer pelo e erra.' },
          { t: 'Pelos + hipertrofia de clitóris + alteração da voz', correct: true, why: 'Certa. Virilização é o conjunto que denota excesso de androgênio: pelo + hipertrofia de clitóris + alteração de voz — e aponta doença da adrenal.' },
          { t: 'Desenvolvimento de mama com aceleração do crescimento', correct: false, why: 'Descreve impregnação estrogênica (mama), que é isossexual — o oposto de virilização (androgênica).' },
          { t: 'Odor axilar e acne leve, sem outros sinais', correct: false, why: 'Descreve adrenarca precoce benigna (odor + acne, sem virilização) — justamente o que NÃO é virilização; é o contraste da página 10.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 5 — E7 Comparação chocante (ramo central) ===================== */
  // Página 5 — Estratégia: E7 — Comparação chocante
  P.push(page('p5', 5, `
    ${tag('central', 'Ramo central · a assimetria de gênero')}
    ${chips(['♀ ~90% idiopática', '♂ > 50% lesão do SNC', 'hamartoma, neoplasia, trauma, infecção', 'FAR = longe'])}

    <section class="opener opener--vs" aria-label="Comparação de abertura">
      <div class="opener__vs-grid">
        <div class="opener__vs-side">
          <h3>Diante de uma menina</h3>
          <p>A aposta tranquila é <strong>"idiopática"</strong> — preocupa-se com a consequência (a baixa estatura).</p>
        </div>
        <div class="opener__vs-divider" aria-hidden="true">vs</div>
        <div class="opener__vs-side">
          <h3>Diante de um menino</h3>
          <p>A conduta vira uma <strong>corrida atrás de uma lesão cerebral</strong> — RM sempre.</p>
        </div>
      </div>
      <p class="opener__vs-asterisk">A puberdade é "central" nos dois sexos — mesmo mecanismo, mesmo eixo ativado. A diferença não está no mecanismo — está na <strong>estatística</strong>, e ela inverte tudo.</p>
    </section>

    <h1 class="page-title">Mesma síndrome, dois sexos, condutas opostas</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">Na menina: ~90% idiopática</h3>
        <p>A puberdade precoce central é <strong>muito mais frequente no sexo feminino</strong> — e, na menina, a principal forma é, <strong>indiscutivelmente, a IDIOPÁTICA</strong>. Idiopática significa o que o nome diz: não se identifica a razão da ativação precoce do eixo, mas o fato é que ela <strong>ocorreu</strong>. Os números: a PP central é idiopática em <span class="hl-good">~90% das meninas</span>, especialmente nas <strong>meninas entre 6 e 8 anos</strong>. Por isso, diante de uma menina com puberdade central, a aposta de partida — pela frequência — é "idiopática", e a preocupação principal é com as <strong>consequências</strong> da puberdade (a baixa estatura adulta), não com uma causa oculta.</p>

        <h3 class="topic-h">No menino: &gt; 50% lesão do SNC — a conduta inverte</h3>
        <p>No <strong>sexo masculino</strong>, a estatística vira o jogo: em <span class="hl-bad">mais de 50% das vezes</span>, a puberdade precoce central é resultado de <strong>alguma LESÃO do sistema nervoso central</strong>. E essa assimetria <strong>inverte a conduta</strong>. Diante de uma <strong>menina</strong> com puberdade central, preocupa-se com as <strong>consequências</strong> da puberdade. Diante de um <strong>menino</strong> com puberdade central, preocupa-se <strong>ainda mais</strong> — com as consequências <strong>E</strong> com a <strong>investigação obrigatória da causa subjacente</strong>. No menino, "central" não tranquiliza; acende o alerta de procurar uma lesão no cérebro (é o que justifica a RM sempre, página 7).</p>

        <h3 class="topic-h">As causas no menino (hamartoma e companhia)</h3>
        <p>Quais lesões? A mais comum no menino é o <span class="term">HAMARTOMA hipotalâmico</span>: uma <strong>malformação congênita</strong> com tecido hipotalâmico que <strong>produz GnRH</strong> por conta própria, causando puberdade precoce <strong>muito cedo</strong>, ainda nos primeiros anos de vida. Depois, as <strong>neoplasias do sistema nervoso central</strong> — e aqui um conceito amplo: a <strong>maioria das neoplasias do SNC cursa com puberdade precoce</strong>. Completam a lista o <strong>trauma craniano</strong> (pode, posteriormente, levar a PP) e as <strong>infecções do SNC</strong> (idem). Síntese: num menino com puberdade central, <strong>muito possivelmente</strong> uma dessas — hamartoma, neoplasia, trauma, infecção — está acontecendo ou aconteceu na vida da criança.</p>

        <h3 class="topic-h">A exceção craniofaringioma: "FAR = longe"</h3>
        <p>Há <strong>uma exceção</strong> que a banca adora, e ela é o contrário de tudo o que foi dito: o <span class="hl-warn">craniofaringioma</span>. Ao contrário das demais neoplasias do SNC, o craniofaringioma em geral cursa com <strong>ATRASO puberal</strong>, <strong>não</strong> com puberdade precoce. O mnemônico da casa para não esquecer: em "cranio<strong>FAR</strong>ingioma", <strong>"far" é "longe" em inglês</strong> — a puberdade vai lá para <strong>LONGE</strong> (atrasa). O resto das neoplasias do SNC, em geral, é puberdade <strong>precoce</strong>; o craniofaringioma, <strong>longe/atraso</strong>.</p>
      </div>
    </div>

    ${medSplit({
      file: 'p5-hamartoma-hipotalamico-mri.png',
      alt: 'Ressonância magnética sagital de crânio mostrando massa ovalada na região hipotalâmica/túber cinéreo, compatível com hamartoma hipotalâmico.',
      side: 'right',
      titulo: 'RM (caso real)',
      achado: 'a <strong>massa hipotalâmica</strong> no assoalho do III ventrículo (túber cinéreo) — um <strong>hamartoma hipotalâmico</strong>, a causa central mais comum no menino: tecido que produz GnRH por conta própria e dispara a puberdade muito cedo.',
      fonte: 'Mehmet Yağtu, Radiopaedia.org rID 71281',
      licenca: 'CC BY-NC-SA 3.0',
      body: 'É a imagem que justifica a "corrida atrás do cérebro" no menino: lesões hipotalâmicas ativam precocemente o eixo GnRH → LH/FSH. O hamartoma costuma ser congênito, bem delimitado e <strong>sem realce</strong> — diferente do craniofaringioma ao lado.'
    })}

    ${medSplit({
      file: 'p5b-craniofaringioma-mri.jpg',
      alt: 'Ressonância magnética sagital T1 pós-contraste mostrando massa sólida-cística selar/suprasselar compatível com craniofaringioma.',
      side: 'left',
      titulo: 'RM (a exceção)',
      achado: 'o <strong>craniofaringioma</strong> — massa sólida-cística selar/suprasselar. É a neoplasia do SNC que foge à regra: <strong>atrasa</strong> a puberdade ("FAR = longe"), em vez de adiantá-la.',
      fonte: 'Hellerhoff, via Wikimedia Commons',
      licenca: 'CC BY 3.0',
      body: 'Enquanto a maioria das neoplasias do SNC cursa com puberdade <strong>precoce</strong>, o craniofaringioma manda a puberdade para <strong>longe</strong>. É a pegadinha que a banca cobra — guarde o "FAR = longe".'
    })}

    ${alertCard({ tone: 'warn', kicker: 'Pegadinha / exceção', title: 'Craniofaringioma = a exceção', body: 'Neoplasias do SNC, em geral → puberdade <strong>PRECOCE</strong>. MAS o <strong>craniofaringioma</strong> → <strong>ATRASO</strong> puberal. Mnemônico: <strong>cranioFARingioma — "FAR" = longe</strong> → a puberdade vai pra longe.' })}

    ${svgArvore('p5', 'P5', { caption: 'a Árvore hidrata o ramo CENTRAL: ♀ ("~90% idiopática", esp. 6-8 anos → foco na consequência) × ♂ ("> 50% lesão do SNC" → investigue o cérebro, RM sempre), com hamartoma, neoplasias, trauma e infecção, e o craniofaringioma marcado como exceção (atrasa). Mesmo objeto da bifurcação, agora com o ramo central aberto.', hint: 'Passe o mouse em cada causa; o craniofaringioma destaca-se como a exceção que atrasa.' })}

    <aside class="exec-alert exec-alert--bad" role="note">
      <p class="exec-alert__kicker">Regra de ouro</p>
      <p class="exec-alert__title">A assimetria de gênero inverte a conduta na mesma síndrome.</p>
      <p class="exec-alert__body"><strong>♀ central = ~90% idiopática</strong> (preocupe-se com a consequência). <strong>♂ central = &gt; 50% lesão do SNC</strong> (investigue a causa — RM sempre).</p>
    </aside>

    ${quiz('p5', 'A assimetria ♀/♂ na central e a exceção do craniofaringioma.', [
      {
        stem: 'Um menino de 7 anos apresenta puberdade precoce central confirmada. Qual a conduta e o racional?',
        alts: [
          { t: 'Tranquilizar e acompanhar — central no menino costuma ser idiopática', correct: false, why: 'Transporta a estatística feminina (~90% idiopática) para o menino — é exatamente a assimetria que a página existe para quebrar; no menino a aposta é o oposto.' },
          { t: 'Investigar o SNC (RM de crânio), pois > 50% dos meninos com PP central têm lesão do SNC', correct: true, why: 'Certa. No menino, "central" não tranquiliza: mais de metade tem lesão do SNC (hamartoma, neoplasia, trauma, infecção) → a investigação por imagem é obrigatória.' },
          { t: 'Solicitar androgênios da adrenal, pois aponta doença adrenal', correct: false, why: 'Confunde central com periférica/adrenal — androgênios da adrenal se pedem na virilização periférica, não numa puberdade central com eixo HHG ativado.' },
          { t: 'Iniciar análogo de GnRH sem investigação, pois a causa é irrelevante', correct: false, why: 'Trata mesmo (o análogo é correto para a central idiopática), mas pular a investigação num menino pode deixar passar um tumor tratável — a causa, no menino, é tudo menos irrelevante.' },
        ]
      },
      {
        stem: 'Qual neoplasia do SNC é a exceção que cursa com atraso puberal, e não com puberdade precoce?',
        alts: [
          { t: 'Hamartoma hipotalâmico', correct: false, why: 'O hamartoma é o oposto: causa PP central muito precoce (tecido que produz GnRH) — é a causa mais comum no menino, não a exceção.' },
          { t: 'Astrocitoma de baixo grau', correct: false, why: 'É neoplasia que segue a regra geral (tende a cursar com PP por efeito sobre o hipotálamo) — não é a exceção de nome próprio.' },
          { t: 'Craniofaringioma', correct: true, why: 'Certa. O craniofaringioma é a exceção clássica — ao contrário da maioria das neoplasias do SNC (que cursam com PP), ele em geral causa atraso puberal ("FAR = longe").' },
          { t: 'Germinoma da região pineal', correct: false, why: 'Segue a regra geral (tende a cursar com PP) — quem o marca não sabe que a exceção tem nome próprio: o craniofaringioma é o único que a banca cobra como "atrasa".' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 6 — E1 Pergunta central (ramo periférico) ===================== */
  // Página 6 — Estratégia: E1 — Pergunta central
  P.push(page('p6', 6, `
    ${tag('perif', 'Ramo periférico · gônada × adrenal')}
    ${chips(['cisto ovariano (primeiro ♀)', 'virilização + Cushing = tumor adrenal', 'HAC 21-hidroxilase', 'clássica × não-clássica'])}

    <section class="opener opener--question" aria-label="Pergunta de abertura">
      <span class="opener__question-mark" aria-hidden="true">?</span>
      <p class="opener__text">Se não foi o eixo central que disparou a puberdade, <strong>de onde vêm os hormônios</strong> — e qual <strong>sinal extra</strong>, além da virilização, entrega que o problema está na <strong>adrenal</strong>, e não na gônada?</p>
    </section>

    <h1 class="page-title">Eixo calado, hormônio vindo de outro lugar: gônada ou adrenal</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">A gônada: cisto ovariano em primeiro lugar</h3>
        <p>A puberdade precoce periférica acontece, essencialmente, por uma doença na <span class="term term--perif">GÔNADA</span> ou por uma doença na <span class="term term--perif">ADRENAL</span>. Comecemos pela gônada. <strong>Tumores ovarianos e testiculares</strong> produzem esteroides gonadais <strong>independentemente</strong> de qualquer estímulo gonadotrófico — a gônada fabrica hormônio por conta própria. Na menina, a causa periférica em que se pensa <strong>primeiro</strong> é o <span class="term">CISTO OVARIANO</span>: ele libera <strong>estrogênio</strong>, portanto cursa com puberdade <span class="hl-good">ISOSSEXUAL</span> (desenvolvimento de mama). Há ainda doenças gonadais com <strong>hiperfunção autônoma</strong> — a gônada produz hormônios sem nenhum estímulo —, como a <span class="term">síndrome de McCune-Albright</span>. A hierarquia prática na menina: pense <strong>principalmente em tumor/cisto ovariano</strong> (o cisto é o mais frequente); McCune-Albright e demais são menos comuns.</p>

        <h3 class="topic-h">A adrenal: virilização — e o sinal extra que entrega o tumor</h3>
        <p>A outra fonte é a <strong>adrenal</strong>. <strong>Tumores do córtex da adrenal</strong> podem produzir <strong>androgênio</strong>, causando <span class="hl-bad">VIRILIZAÇÃO</span> tanto na menina quanto no menino. E aqui está a <strong>dica clínica decisiva</strong> que a banca cobra: além da virilização, o tumor de córtex adrenal pode dar manifestações de <strong>excesso de CORTISOL</strong>. Então o que faz pensar em <strong>tumor adrenal</strong> é <span class="hl-bad">virilização + síndrome de Cushing</span> — obesidade <strong>centrípeta</strong>, <strong>estrias violáceas</strong>, <strong>hipertensão</strong>. Viu virilização <strong>com</strong> Cushing, pense tumor de córtex adrenal.</p>

        <h3 class="topic-h">HAC: clássica (neonatal) × não-clássica (vira causa de PP)</h3>
        <p>A outra doença da adrenal que causa puberdade precoce periférica é a <span class="term">HIPERPLASIA ADRENAL CONGÊNITA (HAC)</span>, rastreada pelo <strong>teste do pezinho</strong>. A forma mais frequente é por <strong>deficiência da enzima 21-HIDROXILASE</strong> — sem 21-hidroxilase, não se produz cortisol adequadamente. A HAC tem <strong>duas formas</strong>, e a distinção é de prova. A forma <strong>CLÁSSICA</strong> se manifesta no <strong>período NEONATAL</strong>: a clássica <strong>perdedora de sal</strong> (a mais frequente) cursa, no recém-nascido, com <strong>vômitos, desidratação, hiponatremia e hipercalemia</strong> — porque, além da falta de cortisol, falta <strong>aldosterona</strong>. Já a forma <strong>NÃO CLÁSSICA</strong> <strong>não</strong> se manifesta no período neonatal; ela aparece <strong>ao longo dos anos</strong>, com sinais precoces de <span class="hl-bad">VIRILIZAÇÃO</span> (♀ e ♂) — e é <strong>por isso</strong> que a não-clássica entra como <strong>causa de puberdade precoce periférica</strong>. Por fim, além de gônada e adrenal, há sempre a possibilidade de exposição hormonal <strong>EXÓGENA</strong> (creme/gel hormonal) — detalhada na investigação por sexo (página 8 e síntese).</p>
      </div>
    </div>

    ${medSplit({
      file: 'p6-usg-cisto-ovariano.png',
      alt: 'Ultrassonografia pélvica do ovário esquerdo mostrando cisto ovariano anecoico de aproximadamente 5 cm.',
      side: 'right',
      titulo: 'USG pélvica (caso real)',
      achado: 'o <strong>cisto ovariano</strong> — lesão grande, predominantemente anecoica (conteúdo negro, parede fina). É a causa periférica em que se pensa <strong>primeiro na menina</strong>: libera estrogênio → puberdade isossexual (mama).',
      fonte: 'James Heilman, MD, via Wikimedia Commons',
      licenca: 'CC BY-SA 4.0',
      body: 'O cisto fabrica hormônio por conta própria, sem estímulo do eixo. Por isso o quadro é isossexual (mama), mas com <strong>LH suprimido</strong> — diferente da central, onde o LH sobe. É o achado-chave que a USG pélvica busca no ramo periférico.'
    })}

    ${cmp('HAC por deficiência de 21-hidroxilase — clássica × não-clássica', ['Característica', 'Clássica perdedora de sal', 'Não clássica'], [
      { cells: [{ t: 'Quando se manifesta' }, { t: 'período neonatal', cls: 'cell-bad' }, { t: 'ao longo dos anos', cls: 'cell-warn' }] },
      { cells: [{ t: 'Quadro' }, { t: 'vômito, desidratação, hiponatremia e hipercalemia (falta cortisol E aldosterona)' }, { t: 'virilização precoce (♀ e ♂)' }] },
      { cells: [{ t: 'Relação com PP' }, { t: 'não é a causa típica de PP' }, { t: 'É causa de PP periférica', cls: 'cell-warn' }] },
    ])}

    ${alertCard({ tone: 'bad', kicker: 'Pegadinha de prova', title: 'Tumor de córtex adrenal = virilização + Cushing', body: 'O <strong>Cushing</strong> é o sinal extra que separa o tumor da HAC: obesidade <strong>centrípeta</strong>, <strong>estrias violáceas</strong>, <strong>hipertensão</strong>. Viu virilização COM Cushing → pense tumor de córtex adrenal.' })}

    ${svgArvore('p6', 'P6', { caption: 'a Árvore hidrata o ramo PERIFÉRICO: duas fontes espelhadas — GÔNADA (cisto ovariano = mais comum ♀, isossexual; McCune-Albright) × ADRENAL (tumor de córtex = virilização + Cushing; HAC 21-hidroxilase). Cada folha marca iso/hetero. Mesmo objeto, agora com o ramo periférico aberto.', hint: 'Passe o mouse em cada fonte; gônada (isossexual) × adrenal (virilização).' })}

    <aside class="exec-alert exec-alert--perif" role="note">
      <p class="exec-alert__kicker">Regra de ouro</p>
      <p class="exec-alert__title">Periférica = gônada OU adrenal.</p>
      <p class="exec-alert__body">Na menina, gônada → <strong>cisto ovariano</strong> (isossexual, primeira hipótese). Adrenal → <strong>virilização</strong>; se vier <strong>com Cushing</strong>, pense <strong>tumor de córtex adrenal</strong>. HAC <strong>não-clássica</strong> (virilização ao longo dos anos) é causa de PP periférica; a <strong>clássica</strong> se manifesta no <strong>neonato</strong> (perdedora de sal).</p>
    </aside>

    ${quiz('p6', 'As duas fontes periféricas e as formas da HAC.', [
      {
        stem: 'Uma menina de 6 anos apresenta virilização (pelo + clitoromegalia), obesidade centrípeta, estrias violáceas e hipertensão. Qual a principal hipótese?',
        alts: [
          { t: 'Hiperplasia adrenal congênita não-clássica', correct: false, why: 'A HAC não-clássica viriliza, mas não dá Cushing — pelo contrário, a 21-hidroxilase deficiente leva a falta de cortisol; quem marca aqui ignora que o Cushing aponta para tumor.' },
          { t: 'Tumor de córtex adrenal', correct: true, why: 'Certa. O sinal extra que entrega o tumor de córtex adrenal é o Cushing (obesidade centrípeta, estrias violáceas, hipertensão) somado à virilização — o tumor produz androgênio e cortisol.' },
          { t: 'Cisto ovariano', correct: false, why: 'O cisto ovariano dá isossexual (estrogênio/mama), não virilização — fonte e sinal errados.' },
          { t: 'Puberdade precoce central idiopática', correct: false, why: 'Central idiopática é isossexual e não cursa com virilização nem Cushing — eixo HHG ativado age sobre a própria gônada.' },
        ]
      },
      {
        stem: 'Sobre as formas de hiperplasia adrenal congênita por deficiência de 21-hidroxilase, qual afirmação está CORRETA?',
        alts: [
          { t: 'A forma clássica perdedora de sal é a que causa puberdade precoce típica, manifestando-se ao longo dos anos', correct: false, why: 'Inverte as formas: a clássica se manifesta no neonato (perdedora de sal), não "ao longo dos anos"; é a não-clássica que vira causa de PP.' },
          { t: 'A forma não-clássica manifesta-se ao longo dos anos com virilização e é a que entra como causa de puberdade precoce periférica', correct: true, why: 'Certa. A não-clássica aparece ao longo dos anos com virilização (♀ e ♂) → por isso é causa de PP periférica.' },
          { t: 'Ambas se manifestam exclusivamente no período neonatal', correct: false, why: 'Erra a não-clássica — só a clássica é neonatal; a não-clássica é tardia, justamente o ponto da página.' },
          { t: 'A forma clássica não causa alterações hidroeletrolíticas no recém-nascido', correct: false, why: 'Nega o quadro clássico: a perdedora de sal cursa com vômito, desidratação, hiponatremia e hipercalemia (falta de aldosterona) — é o oposto do que a alternativa afirma.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 7 — E5 Meta + checklist ===================== */
  // Página 7 — Estratégia: E5 — Meta da página + checklist
  P.push(page('p7', 7, `
    ${tag('meta', 'Método · investigação por imagem')}
    ${chips(['idade óssea comprova', 'RM = causa da central', 'USG pélvica (2 finalidades)', 'não se pede tudo'])}

    <section class="opener opener--checklist" aria-label="Checklist de domínio da página">
      <p class="opener__checklist-title">O diagnóstico de PP é <strong>clínico</strong> (sinal + aceleração) — os exames de imagem não dizem "se há PP", respondem a outras perguntas. Cada exame responde a uma pergunta:</p>
      <ul class="opener__checklist">
        <li class="opener__checklist-item"><span class="opener__check" data-checked="true" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7l3.5 3.5L12 3.5"/></svg></span><span><strong>Idade óssea (RX mão/punho)</strong> — comprova o avanço, e por que o 1º raio-X ainda pode não ter batido +2 DP</span></li>
        <li class="opener__checklist-item"><span class="opener__check" data-checked="true" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7l3.5 3.5L12 3.5"/></svg></span><span><strong>RM de crânio</strong> — investiga a causa da PP central (não "se há PP"): sempre no menino; ♀ &lt; 6a sempre; 6-8a questionável</span></li>
        <li class="opener__checklist-item"><span class="opener__check" data-checked="true" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7l3.5 3.5L12 3.5"/></svg></span><span><strong>USG pélvica (♀)</strong> — duas finalidades: confirmar puberdade verdadeira (útero) × achar cisto ovariano</span></li>
        <li class="opener__checklist-item"><span class="opener__check" data-checked="true" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7l3.5 3.5L12 3.5"/></svg></span><span><strong>USG abdominal</strong> — só na suspeita de adrenal; não avalia a HAC (diagnóstico laboratorial)</span></li>
      </ul>
    </section>

    <h1 class="page-title">Cada exame de imagem tem uma pergunta — não se pede tudo</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">Idade óssea: o exame que comprova o avanço</h3>
        <p>Diante de qualquer suspeita de puberdade precoce, um dos <strong>primeiros exames</strong> é a <span class="term">radiografia de mão e punho</span> para avaliar a <span class="term">IDADE ÓSSEA</span>. Na puberdade precoce, espera-se encontrar <strong>idade óssea MAIOR que a cronológica</strong> (idade óssea <strong>avançada</strong>) — é a confirmação objetiva da aceleração da segunda peça da equação. As definições, em desvio-padrão: idade óssea <strong>ATRASADA = 2 DP abaixo</strong> da cronológica; <strong>AVANÇADA = 2 DP acima</strong>. E uma pegadinha fina: numa avaliação <strong>inicial</strong>, o avanço pode ainda <strong>não estar bem definido</strong>. Se a criança começou com idade óssea <strong>1 DP abaixo</strong> da cronológica, ela pode estar <strong>avançando</strong> sem ainda ter atingido os 2 DP acima. A idade óssea <strong>tem</strong> que avançar — mas pode não ter chegado lá no primeiro exame. Não descarte PP só porque o primeiro raio-X ainda não bateu +2 DP.</p>

        <h3 class="topic-h">RM de crânio: investiga a causa da central, não "se há PP"</h3>
        <p>Aqui mora a confusão que a banca explora. A <span class="hl-warn">ressonância de crânio NÃO investiga "se há puberdade precoce"</span> — ela investiga a <strong>ETIOLOGIA de uma puberdade precoce CENTRAL</strong>. A sequência lógica é: confirma-se que a criança tem PP (clínica + idade óssea), confirma-se que é <strong>central</strong> (LH — próxima página), e <strong>então</strong> a RM entra na investigação da <strong>causa</strong>. Quando ela é obrigatória? A RM é <strong>SEMPRE</strong> indicada nos <strong>MENINOS</strong> com puberdade central — porque &gt; 50% têm alteração do SNC (página 5). Nas <strong>MENINAS</strong>, nem sempre: entre <strong>6 e 8 anos é questionável</strong> (não necessariamente); <strong>menores de 6 anos = SEMPRE</strong>, porque há maior risco de alteração do SNC. Pode-se ainda solicitar a RM quando se acredita que a puberdade está <strong>avançando muito rápido</strong> (definição pouco clara) — foi por isso que <strong>Bela, com 7 anos, fez a ressonância</strong>, que veio normal.</p>

        <h3 class="topic-h">Ultrassonografia: pélvica (♀) e abdominal (adrenal)</h3>
        <p>A <span class="term">USG pélvica</span> tem <strong>duas finalidades</strong> na menina: (1) <strong>avaliar a puberdade</strong> — volume uterino aumentado e conformação uterina alterada <strong>confirmam puberdade verdadeira</strong>, distinguindo de uma variante benigna; (2) <strong>avaliar a periférica</strong> — identificar alterações <strong>ovarianas</strong> (ex.: cisto). Detalhe diagnóstico de ouro: <strong>mama isolada</strong> pode ser variante benigna, <strong>mas mama + alteração do volume uterino aponta para puberdade precoce verdadeira</strong> — foi exatamente o caso de Bela (útero de conformação puberal). Já a <span class="term">USG abdominal</span> serve principalmente para avaliar a <strong>ADRENAL</strong> — para investigar <strong>tumores</strong> da adrenal (não é o melhor exame, mas costuma ser o primeiro). Duas ressalvas: a USG abdominal <strong>NÃO serve para avaliar a HAC</strong> (a HAC é diagnóstico <span class="hl-warn">LABORATORIAL</span>, não de imagem); e ela <strong>não é pedida para toda criança</strong> com PP — só para quem pode ter doença da adrenal. Uma menina com desenvolvimento de <strong>mama</strong> (ação estrogênica) não tem doença da adrenal → não precisa de USG abdominal.</p>
      </div>
    </div>

    ${medSplit({
      file: 'p7-rx-idade-ossea-sotos.jpeg',
      alt: 'Radiografia AP da mão e punho com maturação óssea incompatível com a idade cronológica.',
      light: true,
      side: 'right',
      titulo: 'Radiografia (caso real)',
      achado: 'a <strong>idade óssea</strong> lida no carpo — múltiplos centros de ossificação carpais e epífises digitais à frente da idade cronológica. É o exame que <strong>comprova</strong> a aceleração; compara-se com atlas de maturação (Greulich-Pyle).',
      fonte: 'Panda PK et al., Ann Indian Acad Neurol 2022, via NCBI/PMC',
      licenca: 'CC BY-NC-SA 4.0',
      body: 'A idade óssea não diz "se há PP" — ela <strong>comprova o avanço</strong>. Lembre a pegadinha: a idade óssea tem que avançar, mas no primeiro exame pode ainda não ter batido +2 DP (criança que partiu de −1 DP). Não descarte por isso.'
    })}

    ${flowSvg('pp08FluxoImagem', { caption: 'exames de imagem na PP — cada um responde a uma pergunta diferente. A idade óssea comprova o avanço (sempre); confirmada a PP, a RM caça a causa da central e a USG investiga a periférica.', hint: 'A USG abdominal NÃO avalia a HAC (diagnóstico laboratorial).', steps: [
      { tone: 'good', label: 'IDADE ÓSSEA (RX mão/punho) = sempre', sub: 'comprova o avanço (±2 DP); 1º exame pode não ter batido +2 DP' },
      { tone: 'decision', label: 'Confirmada PP → qual a pergunta seguinte?' },
      { tone: 'central', label: 'Se CENTRAL → RM de crânio', sub: 'sempre no menino · ♀ < 6a sempre · 6-8a questionável — investiga a ETIOLOGIA' },
      { tone: 'perif', label: 'Se suspeita PERIFÉRICA → USG', sub: 'pélvica (♀: útero/ovário) e/ou abdominal (adrenal/tumor, NÃO HAC)' },
    ]})}

    ${alertCard({ tone: 'warn', kicker: 'Pegadinhas de imagem', title: 'Dois cuidados que a banca cobra', body: '<strong>RM de crânio investiga a CAUSA da PP central, não "se há PP"</strong> (o diagnóstico de PP é clínico). E <strong>HAC = diagnóstico LABORATORIAL</strong>, não de imagem — USG abdominal não a avalia.' })}

    ${notaBanca('A idade óssea <strong>tem</strong> que avançar, mas no <strong>primeiro</strong> exame pode ainda não ter atingido +2 DP (criança que partiu de −1 DP em avanço). Não descartar PP por isso.')}

    ${quiz('p7', 'O método de imagem: cada exame, sua pergunta.', [
      {
        stem: 'Em qual situação a ressonância de crânio é sempre obrigatória na investigação de puberdade precoce central?',
        alts: [
          { t: 'Em toda menina entre 6 e 8 anos', correct: false, why: 'Erra a faixa feminina: entre 6 e 8 anos a RM é questionável/individualizada, não obrigatória — é onde a aposta idiopática pesa.' },
          { t: 'Em todo menino, e em toda menina menor de 6 anos', correct: true, why: 'Certa. A RM é sempre indicada no menino com PP central (> 50% têm lesão do SNC) e na menina < 6 anos (maior risco de alteração do SNC).' },
          { t: 'Apenas quando a idade óssea já ultrapassou 2 DP acima da cronológica', correct: false, why: 'Confunde a indicação da RM (etiologia) com o critério da idade óssea (comprovação) — são exames com perguntas diferentes; e a idade óssea pode nem ter batido +2 DP no início.' },
          { t: 'Em nenhum caso, pois a RM não investiga puberdade precoce', correct: false, why: 'Confunde "não diagnostica PP" com "não serve": a RM de fato não diz se há PP, mas é essencial para achar a causa da central — leva a regra ao extremo errado.' },
        ]
      },
      {
        stem: 'Por que a ultrassonografia abdominal não é solicitada para uma menina com puberdade precoce e desenvolvimento de mama (sem virilização)?',
        alts: [
          { t: 'Porque a USG abdominal não avalia o útero', correct: false, why: 'É verdade isolada mas irrelevante ao racional — o ponto não é o útero, é a ausência de suspeita adrenal.' },
          { t: 'Porque mama indica ação estrogênica (não adrenal); a USG abdominal serve para investigar adrenal, e ela não está em questão', correct: true, why: 'Certa. A USG abdominal investiga a adrenal (tumor); uma menina com mama tem impregnação estrogênica (gônada/central), não doença adrenal → não há o que a USG abdominal procure.' },
          { t: 'Porque a HAC só é vista na USG pélvica', correct: false, why: 'Erra duas vezes: HAC é laboratorial (não imagem), e não se vê em USG pélvica nem abdominal.' },
          { t: 'Porque a menina com mama já tem diagnóstico fechado de PP central', correct: false, why: 'Precipita o diagnóstico: mama + útero alterado aponta PP verdadeira, mas ainda falta o LH para dizer se é central ou periférica (cisto ovariano também dá mama/isossexual).' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 8 — E4 Achado típico / pegadinha ===================== */
  // Página 8 — Estratégia: E4 — Achado típico / pegadinha
  P.push(page('p8', 8, `
    ${tag('central', 'O juiz · LH e teste de estímulo')}
    ${chips(['LH↑ = central · LH suprimido = periférica', 'LH "normal" não afasta central', 'teste de estímulo (LHRH)', 'androgênios + 17-OHP na virilização'])}

    <aside class="opener opener--trap" aria-label="Achado de abertura">
      <svg class="opener__trap-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>
      <div class="opener__trap-body">
        <p class="opener__trap-tag">O juiz que se cala</p>
        <p class="opener__trap-text">Um LH <strong>"normal"</strong> numa criança com sinais puberais parece tranquilizador — mas pode estar <strong>escondendo</strong> uma puberdade precoce central. Como um valor "normal" engana, e que teste se faz para não cair nessa armadilha?</p>
      </div>
    </aside>

    <h1 class="page-title">O LH é o juiz da bifurcação — mas um juiz que às vezes se cala</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">O LH não diagnostica PP — ele diferencia central de periférica</h3>
        <p>Primeiro, o enquadramento que organiza tudo: <strong>nenhuma avaliação hormonal serve para DIAGNOSTICAR a puberdade precoce</strong>. Puberdade é diagnóstico <span class="term">CLÍNICO</span> (sinal puberal + aceleração do crescimento) — os exames servem para definir a <strong>CAUSA</strong>. E o hormônio que arbitra a bifurcação é o <span class="term">LH</span>: ele não diz "tem puberdade", ele diz <strong>central × periférica</strong>. Na puberdade precoce <strong>CENTRAL</strong>, o LH está <span class="hl-good">AUMENTADO</span> — porque é uma puberdade <strong>dependente de GnRH</strong>, e o GnRH estimula a liberação de gonadotrofina (LH e FSH). Avalia-se <strong>principalmente o LH</strong> (e não o FSH), porque o LH traz a informação mais fidedigna para distinguir central de periférica. Na puberdade precoce <strong>PERIFÉRICA</strong>, o LH está <span class="hl-warn">SUPRIMIDO</span>, em nível <strong>pré-puberal</strong> (não há GnRH disparando-o; os hormônios vêm de fora do eixo).</p>

        <h3 class="topic-h">A pegadinha do LH "normal" e o teste de estímulo</h3>
        <p>Agora a armadilha. Cuidado com o LH <span class="hl-warn">"NORMAL"</span>: aqui, "normal" significa <strong>PRÉ-PUBERAL</strong> — e um LH pré-puberal <strong>NÃO afasta puberdade precoce central</strong>, porque os níveis de LH <strong>flutuam</strong>. Um LH <strong>basal</strong> pode estar pré-puberal <strong>mesmo havendo</strong> puberdade central. O que fazer então? Quando o LH basal está pré-puberal/"normal", faz-se o <span class="term">TESTE DE ESTÍMULO</span>: administra-se <strong>LHRH (GnRH)</strong>, que estimula a liberação de LH, e dosa-se o LH. Se houver <strong>aumento significativo</strong>, isso indica <strong>ativação do eixo HHG</strong> → puberdade <strong>central</strong>. E a lógica fina, a que a banca cobra: <strong>o estímulo só provoca aumento significativo do LH se o eixo HHG JÁ estiver ativado</strong>. Se o eixo ainda estiver <strong>adormecido</strong>, o estímulo <strong>não</strong> produz resposta importante — o eixo precisa estar ativado para o estímulo funcionar. (Por isso o estímulo "positivo" = central, e o "negativo" = periférica/eixo calado.) Detalhe de economia: <strong>não se dosa estrogênio</strong> na investigação — sabe-se que há estrogênio porque já se <strong>vê</strong> a mama desenvolvida; dosar não acrescenta.</p>

        <h3 class="topic-h">Quando há virilização: os androgênios da adrenal e a 17-OHP</h3>
        <p>Muda o cenário: quando se investiga uma puberdade com <span class="hl-bad">VIRILIZAÇÃO</span>, o LH sai de cena e entram os <strong>androgênios da adrenal</strong> — <strong>sulfato de DHEA (S-DHEA), DHEA, androstenediona</strong> — e a <span class="term">17-HIDROXIPROGESTERONA</span>, que está <strong>muito aumentada na HAC</strong>. Solicita-se também a <strong>TESTOSTERONA</strong>. Como diferenciar <strong>tumor adrenal × HAC</strong> pelo laboratório: os androgênios da adrenal estão aumentados <strong>nos dois</strong> (aumento muito significativo no tumor; aumentados na HAC), <strong>mas</strong> a <strong>17-OHP muito aumentada é típica da HAC</strong>, e o <strong>tumor</strong> pode ainda cursar com manifestações de excesso de <strong>cortisol</strong> (Cushing). E o <strong>exógeno</strong> (testosterona): testosterona muito alta com androgênios da adrenal <strong>todos baixos</strong> → aponta fonte de fora.</p>
      </div>
    </div>

    ${medSplit({
      file: 'p8-curva-lh-estimulo.png',
      alt: 'Gráfico da resposta de LH após estímulo com GnRH: a curva puberal (central) sobe a pico alto; a curva pré-puberal permanece baixa e quase plana.',
      light: true,
      side: 'right',
      titulo: 'Resposta ao estímulo (caso real)',
      achado: 'a <strong>resposta de LH após GnRH</strong>: a curva da puberdade central (azul) dispara a pico alto em 15-45 min; a sem ativação central (vermelha) fica baixa e plana. É a tradução gráfica da pegadinha: o eixo só responde se já estiver ativado.',
      fonte: 'Pellegrin MC et al., Medicina 2024;60(1):24, via MDPI',
      licenca: 'CC BY 4.0',
      body: 'Por isso o teste discrimina: o eixo <strong>já ativado</strong> (central) sobe; o eixo <strong>adormecido</strong> (periférica/pré-puberal) não responde. Um LH basal pré-puberal não afasta central — é o estímulo que revela.'
    })}

    ${flowSvg('pp08FluxoLH', { caption: 'o LH como juiz + teste de estímulo. LH aumentado = central; LH pré-puberal não afasta central → teste de estímulo (LHRH): sobe = central, não sobe = periférica.', hint: 'O estímulo só responde se o eixo já está ativado — é isso que separa central de periférica.', steps: [
      { tone: 'decision', label: 'PP confirmada → dosar LH' },
      { tone: 'central', label: 'LH AUMENTADO → CENTRAL', sub: 'eixo HHG ativado (GnRH-dependente)' },
      { tone: 'warn', label: 'LH PRÉ-PUBERAL / "normal" → NÃO afasta central', sub: 'o LH flutua → fazer TESTE DE ESTÍMULO (LHRH/GnRH)' },
      { tone: 'central', label: 'LH SOBE ao estímulo = CENTRAL', sub: 'eixo já ativado responde com pico de LH' },
      { tone: 'perif', label: 'LH NÃO sobe = PERIFÉRICA', sub: 'eixo adormecido / LH suprimido' },
    ]})}

    ${cmp('Laboratório da virilização — tumor adrenal × HAC × exógeno', ['Achado', 'Tumor adrenal', 'HAC', 'Exógeno'], [
      { cells: [{ t: 'Androgênios da adrenal (S-DHEA/DHEA/androstenediona)' }, { t: 'muito ↑', cls: 'cell-bad' }, { t: '↑', cls: 'cell-warn' }, { t: 'normais', cls: 'cell-good' }] },
      { cells: [{ t: '17-OH-progesterona' }, { t: '—' }, { t: '↑↑ (típica)', cls: 'cell-warn' }, { t: '—' }] },
      { cells: [{ t: 'Cortisol / Cushing' }, { t: 'pode (entrega o tumor)', cls: 'cell-bad' }, { t: 'não', cls: 'cell-good' }, { t: 'não' }] },
      { cells: [{ t: 'Testosterona' }, { t: '↑' }, { t: '↑' }, { t: '↑ (isolada)', cls: 'cell-warn' }] },
    ])}

    ${collapsible('Quer ver a lógica do teste de estímulo passo a passo?', `
      <div class="prose">
        <p><strong>1.</strong> O LH basal está pré-puberal ("normal") — mas isso não exclui central, porque o LH flutua.</p>
        <p><strong>2.</strong> Administra-se <strong>LHRH (GnRH)</strong>, que estimula a hipófise a liberar LH.</p>
        <p><strong>3.</strong> Se o eixo HHG <strong>já está ativado</strong> (puberdade central), a hipófise responde com um <strong>pico de LH</strong> → <strong>central</strong>.</p>
        <p><strong>4.</strong> Se o eixo está <strong>adormecido</strong> (periférica/pré-puberal), <strong>não há resposta</strong> significativa → <strong>periférica</strong>.</p>
        <p>A chave: o estímulo só "acorda" um eixo que já está ligado. Eixo desligado não responde — e é exatamente por isso que o teste discrimina.</p>
      </div>
    `)}

    <aside class="exec-alert exec-alert--warn" role="note">
      <p class="exec-alert__kicker">Regra de ouro</p>
      <p class="exec-alert__title">LH "normal"/pré-puberal não afasta central → teste de estímulo.</p>
      <p class="exec-alert__body"><strong>LH↑ = central · LH suprimido (pré-puberal) = periférica.</strong> No estímulo (LHRH): sobe = central; não sobe = periférica. <strong>O estímulo só responde se o eixo já estiver ativado.</strong> Na virilização, troca-se LH por <strong>androgênios da adrenal + 17-OHP + testosterona</strong>.</p>
    </aside>

    ${quiz('p8', 'O LH como juiz e a lógica do teste de estímulo.', [
      {
        stem: 'Uma menina com puberdade precoce isossexual tem LH basal em nível pré-puberal ("normal"). Qual a interpretação e a conduta corretas?',
        alts: [
          { t: 'Está afastada a puberdade central; trata-se de causa periférica', correct: false, why: 'É a armadilha exata da página: tomar "LH normal" como prova de periférica — o LH basal pode estar pré-puberal mesmo na central.' },
          { t: 'O LH pré-puberal não afasta central; faz-se teste de estímulo com LHRH/GnRH', correct: true, why: 'Certa. O LH flutua: um basal pré-puberal não exclui central → o passo é o teste de estímulo (LHRH), que sobe o LH se o eixo estiver ativado.' },
          { t: 'Confirma-se puberdade central, pois LH normal indica eixo ativado', correct: false, why: 'Inverte o sentido: LH pré-puberal não indica eixo ativado; o estímulo é que vai revelar se está.' },
          { t: 'Deve-se dosar estrogênio para definir o tipo', correct: false, why: 'Cai no exame inútil — não se dosa estrogênio (a mama já prova a ação estrogênica); ele não diferencia central de periférica.' },
        ]
      },
      {
        stem: 'No teste de estímulo com LHRH (GnRH), por que um aumento significativo do LH indica puberdade central?',
        alts: [
          { t: 'Porque o LHRH só é absorvido quando há tumor gonadal', correct: false, why: 'Inventa uma relação com absorção e tumor gonadal que não existe.' },
          { t: 'Porque o estímulo só provoca aumento importante de LH se o eixo HHG já estiver ativado; eixo adormecido não responde', correct: true, why: 'Certa. A lógica fina: o eixo precisa já estar ativado (puberdade central) para responder ao estímulo com um pico de LH; um eixo adormecido (periférica/pré-puberal) não responde de forma significativa.' },
          { t: 'Porque o LHRH suprime a adrenal e desmascara o ovário', correct: false, why: 'Atribui ao LHRH um efeito sobre a adrenal que ele não tem — LHRH age no eixo gonadotrófico.' },
          { t: 'Porque o aumento de LH ocorre em qualquer criança que receba LHRH', correct: false, why: 'Nega a própria utilidade do teste: se toda criança respondesse, o teste não discriminaria nada — é justamente porque o eixo adormecido não responde que o estímulo separa central de periférica.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 9 — E4 Achado típico / pegadinha ===================== */
  // Página 9 — Estratégia: E4 — Achado típico / pegadinha
  P.push(page('p9', 9, `
    ${tag('central', 'O atalho do menino · volume testicular')}
    ${chips(['testículo = termômetro do eixo', '≥ 4 mL', 'grande × pequeno × assimétrico', 'palpe antes de pedir'])}

    <aside class="opener opener--trap" aria-label="Achado de abertura">
      <svg class="opener__trap-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>
      <div class="opener__trap-body">
        <p class="opener__trap-tag">Palpe antes de pedir</p>
        <p class="opener__trap-text">Antes de pedir um único exame, o <strong>tamanho dos testículos</strong> de um menino com sinais de virilização já diz se a causa está no <strong>cérebro</strong>, na <strong>adrenal</strong> ou no <strong>próprio testículo</strong>. Um achado de exame físico que vale mais que o laboratório — por quê, e como ler os três cenários?</p>
      </div>
    </aside>

    <h1 class="page-title">No menino, palpe antes de pedir: o testículo entrega a causa</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">Por que o volume testicular entrega tudo</h3>
        <p>No sexo masculino, há um dado do exame físico que, <strong>mesmo antes de qualquer exame</strong>, direciona para puberdade central ou periférica: o <span class="term">VOLUME TESTICULAR</span> (orquidômetro de Prader, corte <strong>≥ 4 mL</strong> = puberdade começou). A lógica é puramente fisiológica: <strong>o que faz o testículo (e o ovário) aumentar de volume é o estímulo gonadotrófico</strong> — e estímulo gonadotrófico <strong>só existe na puberdade precoce CENTRAL</strong> (eixo HHG ativado → LH/FSH → gônada cresce). Logo, se o testículo <strong>cresceu</strong>, o eixo está ativado → central. Se há virilização <strong>mas o testículo é infantil</strong>, o androgênio veio de <strong>outro lugar</strong> → periférica. O testículo é o termômetro do eixo.</p>

        <h3 class="topic-h">Os três padrões → três condutas</h3>
        <p>São <strong>três padrões</strong>, cada um com sua conduta:</p>
        <p><strong>Primeiro padrão — TESTÍCULOS AUMENTADOS</strong> (≥ 4 mL, simétricos) — <strong>ou LH aumentado</strong> → puberdade <span class="hl-good">CENTRAL</span> → <strong>obrigatório solicitar ressonância de crânio</strong> (&gt; 50% têm lesão do SNC).</p>
        <p><strong>Segundo padrão — sinais de virilização</strong> (pênis aumentado, ex.: G4) <strong>mas TESTÍCULOS INFANTIS/PEQUENOS</strong> (ex.: ~2 mL) → o androgênio <strong>não vem da gônada</strong> → puberdade <span class="term term--perif">PERIFÉRICA</span>: doença da adrenal (tumor de córtex, HAC) <strong>ou</strong> exposição <strong>exógena</strong>. No exógeno por testosterona, o laboratório mostra <strong>testosterona muito alta e androgênios da adrenal todos baixos</strong>.</p>
        <p><strong>Terceiro padrão — TESTÍCULOS ASSIMÉTRICOS</strong> → <span class="hl-bad">tumor TESTICULAR</span> (um testículo cresce por conta do tumor, o outro não).</p>

        <h3 class="topic-h">Como a banca arma a pegadinha</h3>
        <p>A banca explora isso de duas formas, e vale reconhecer o formato: (1) descreve <strong>testículos aumentados + virilização</strong> e pergunta a conduta → resposta: <strong>ressonância</strong> (é central). (2) Descreve <strong>virilização + testículo pequeno</strong> e oferece "solicitar <strong>LH</strong>" versus "solicitar <strong>androgênio da adrenal</strong>" → resposta: <strong>androgênio da adrenal</strong>, porque o testículo pequeno <strong>já aponta periférico</strong> (o LH ali seria redundante — você já sabe que o eixo não disparou). Quem palpou o testículo antes de pedir exame acerta as duas no automático.</p>
      </div>
    </div>

    ${svgPiso('S-3padroes', { caption: 'os três volumes testiculares esquemáticos (par de elipsoides neutros, sem realismo — §sensibilidade pediátrica): (1) aumentados simétricos (≥ 4 mL) → CENTRAL → "RM obrigatória"; (2) pequenos/infantis (~2 mL) + virilização → PERIFÉRICA → "adrenal/exógeno → androgênios da adrenal"; (3) assimétricos → "tumor testicular". O cueing é o contraste de tamanho.', hint: 'Clique num padrão: o destaque acende a conduta correspondente (orquidômetro de Prader, ≥ 4 mL).' })}

    ${medSplit({
      file: 'p9-orquidometro-prader.jpg',
      alt: 'Orquidômetro de Prader: colar de esferas elipsoides graduadas usado para estimar o volume testicular em mL.',
      light: true,
      side: 'right',
      titulo: 'Instrumento (referência)',
      achado: 'o <strong>orquidômetro de Prader</strong> — esferas elipsoides numeradas para estimar o volume testicular por palpação comparada. O corte <strong>≥ 4 mL</strong> marca o início puberal.',
      fonte: 'Krishna KB, Witchel SF, Normal and Abnormal Puberty (Endotext)',
      licenca: 'CC BY-NC-ND 2.0',
      body: 'É o instrumento por trás do "atalho": comparando o testículo com as esferas, o examinador situa o volume. Grande/simétrico (≥ 4 mL) → central; pequeno (~2 mL) com virilização → periférica; assimétrico → tumor testicular.'
    })}

    <aside class="exec-alert exec-alert--central" role="note">
      <p class="exec-alert__kicker">Regra de ouro</p>
      <p class="exec-alert__title">Volume testicular = termômetro do eixo.</p>
      <p class="exec-alert__body">Grande/simétrico (≥ 4 mL) → <strong>central</strong> → RM. Pequeno + virilização → <strong>periférica</strong> (adrenal/exógeno) → androgênios da adrenal. Assimétrico → <strong>tumor testicular</strong>. Só o estímulo gonadotrófico (central) aumenta a gônada — por isso o testículo entrega a causa antes do laboratório.</p>
    </aside>

    <aside class="trap practice">
      <p class="practice__label">Pegadinha de prova</p>
      <p><strong>Virilização + testículo PEQUENO → periférica</strong> (peça <strong>androgênio da adrenal</strong>, não LH — o testículo pequeno já disse que o eixo não disparou). <strong>Virilização + testículo GRANDE → central</strong> (peça <strong>RM</strong>). <strong>Assimétrico → tumor testicular.</strong></p>
    </aside>

    ${quiz('p9', 'O atalho do volume testicular e os três padrões.', [
      {
        stem: 'Um menino de 6 anos tem virilização (pênis aumentado, G4) e testículos infantis (~2 mL). Entre "dosar LH" e "dosar androgênios da adrenal", qual a melhor escolha e por quê?',
        alts: [
          { t: 'Dosar LH, para confirmar se a puberdade é central', correct: false, why: 'O LH ali é redundante: você já sabe, pelo testículo infantil, que o eixo está calado — dosar LH só confirmaria o óbvio e não acharia a fonte.' },
          { t: 'Dosar androgênios da adrenal, pois o testículo pequeno já aponta causa periférica', correct: true, why: 'Certa. O testículo pequeno com virilização já diz que o androgênio não veio da gônada (o eixo não disparou — senão o testículo teria crescido) → a fonte é periférica (adrenal/exógeno) → pedem-se androgênios da adrenal.' },
          { t: 'Solicitar ressonância de crânio imediatamente', correct: false, why: 'A RM serve à central (testículo grande); aqui o testículo pequeno afasta central → RM não é o passo.' },
          { t: 'Dosar testosterona apenas, pois é o único hormônio relevante', correct: false, why: 'A testosterona entra, mas sozinha não diferencia adrenal de exógeno — precisa do painel de androgênios da adrenal (que, se baixos com testosterona alta, apontam exógeno).' },
        ]
      },
      {
        stem: 'Um menino com puberdade precoce tem testículos assimétricos (um nitidamente maior). Qual a principal hipótese?',
        alts: [
          { t: 'Puberdade precoce central idiopática', correct: false, why: 'A central dá aumento simétrico (estímulo gonadotrófico age nos dois testículos igualmente) — não assimétrico.' },
          { t: 'Hiperplasia adrenal congênita', correct: false, why: 'A HAC é periférica/adrenal: dá virilização com testículos pequenos/infantis, não um aumentado isolado.' },
          { t: 'Tumor testicular', correct: true, why: 'Certa. A assimetria testicular é a assinatura do tumor testicular — um testículo cresce pelo tumor, o outro não.' },
          { t: 'Exposição exógena a testosterona', correct: false, why: 'O exógeno (gel de testosterona) viriliza sem aumentar testículo (e simetricamente, se houvesse efeito) — não produz assimetria; quem marca aqui ignora que a assimetria localiza a lesão num testículo.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 10 — E8 Erro comum desmontado ===================== */
  // Página 10 — Estratégia: E8 — Erro comum desmontado
  P.push(page('p10', 10, `
    ${tag('benign', 'Triagem · variantes benignas')}
    ${chips(['tem aceleração?', 'telarca (só mama) × adrenarca (só pelo + odor)', 'adrenarca NÃO viriliza', 'PIG · SOP'])}

    <section class="opener opener--bust" aria-label="Erro comum desmontado">
      <p class="opener__bust-tag">Erro comum</p>
      <p class="opener__bust-wrong">"Toda menina de 7 anos com <s>só a mama, ou só pelos e odor axilar</s>, precisa de investigação extensa."</p>
      <p class="opener__bust-right">Não precisa. Na maioria das vezes é um quadro <strong>benigno</strong> que só pedia acompanhamento. O erro está em pular a pergunta de triagem. Qual é ela, e o que separa o benigno do que precisa investigar?</p>
    </section>

    <h1 class="page-title">Sinal isolado, crescimento normal: nem todo sinal precoce é doença</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">A triagem: tem aceleração?</h3>
        <p>A <span class="term">grande triagem da prova</span>: diante de caracteres sexuais precoces, verifique se vêm acompanhados de <strong>aceleração do crescimento / avanço da idade óssea</strong>. Se <strong>SIM</strong> → puberdade precoce (descubra a causa — tudo o que veio até aqui). Se <strong>NÃO</strong> (sinal puberal <strong>isolado</strong>, com crescimento normal) → pode ser uma <span class="hl-good">variante benigna</span> do desenvolvimento puberal. É a mesma segunda peça da equação (página 2), agora usada como filtro: sem aceleração, troca-se a investigação extensa por <strong>acompanhamento</strong>.</p>

        <h3 class="topic-h">Telarca precoce (só mama) × adrenarca precoce (só pelo + odor)</h3>
        <p>São <strong>DUAS</strong> as variantes benignas a conhecer. A <span class="term">TELARCA precoce</span> (prematura): a menina tem <strong>APENAS mamas</strong>, nenhum outro sinal de puberdade, abaixo dos 8 anos. É especialmente comum em <strong>meninas menores de 2 anos</strong> — desenvolvem mama e, a partir dos 2 anos, essa mama <strong>involui</strong>, sem mais nada. Importante: a telarca precoce <strong>sempre PODE</strong> ser o início de uma puberdade precoce — por isso se faz <strong>acompanhamento</strong> —; mas, com <strong>apenas mama e crescimento NÃO acelerado</strong>, <strong>não</strong> se submete a menina a investigações extensas. A <span class="term">ADRENARCA precoce</span>: manifestações de adrenarca antes dos 8 anos (menina) / 9 anos (menino), especialmente entre 6 e 8/9 anos. Na adrenarca precoce, a criança tem <strong>PELOS</strong> (penificação genital, podendo ter axilar) e <strong>ODOR AXILAR</strong>; pode ter um pouco de <strong>acne</strong>. Essencialmente isso.</p>

        <h3 class="topic-h">O ponto crítico: adrenarca precoce NÃO viriliza</h3>
        <p>Aqui está o ponto que a banca cobra e que muita gente erra: na adrenarca precoce <span class="hl-bad">NÃO existem sinais de virilização</span> — <strong>não</strong> há hipertrofia de clitóris, <strong>não</strong> há aumento da genitália. É <strong>só pelo, odor axilar e talvez acne</strong>. A consequência é direta: <strong>se houver virilização, NÃO é variante benigna — é doença da adrenal</strong> (tumor ou HAC, página 6). Duas associações de prova da adrenarca precoce: é mais frequente em crianças que foram <strong>PIG</strong> (pequenas para a idade gestacional) e pode ter relação posterior com a <strong>síndrome dos ovários policísticos (SOP)</strong>. Síntese: <strong>só pelo + odor (adrenarca) ou só mama (telarca), com crescimento normal = variante benigna</strong>; se tem <strong>mais</strong> do que isso (virilização, aceleração do crescimento), <strong>não</strong> é variante benigna — investigue.</p>
      </div>
    </div>

    ${medSplit({
      file: 'p1-tanner-feminino.svg',
      alt: 'Escala de Tanner feminina (esquema): mama (B1-B5) e pelos pubianos (P1-P5) lidos como eixos independentes.',
      light: true,
      side: 'right',
      titulo: 'Esquema — eixos independentes',
      achado: 'a <strong>matriz de Tanner</strong> lida por eixos separados: <strong>telarca precoce isolada</strong> está no eixo mamário (B2, com P1 — só mama); <strong>adrenarca precoce isolada</strong> está no eixo pubiano (P2, com B1 — só pelo). Não é "uma criança", é uma matriz.',
      fonte: 'Michał Komorniczak, via Wikimedia Commons',
      licenca: 'CC BY-SA 3.0',
      body: 'Mama e pelos se pontuam <strong>separados</strong>: telarca (só mama, B2/P1) × adrenarca (só pelo, B1/P2). O que tira o "benigno" é a virilização (clitoromegalia, voz) ou a aceleração — qualquer das duas manda investigar.'
    })}

    ${svgPiso('S-bifurcacaoBenigna', { caption: 'a ponta benigna da Árvore — na raiz, o ramo "sinal isolado SEM aceleração" abre em telarca precoce (só mama) e adrenarca precoce (só pelo/odor) → "variante benigna, acompanhar", contrastando com "sinal + aceleração" → puberdade precoce. Liga a triagem inicial à Árvore já construída.', hint: 'Toque para revelar as duas variantes a partir da raiz; adrenarca NÃO viriliza.' })}

    ${cmp('Telarca × adrenarca × PP verdadeira', ['Característica', 'Telarca precoce', 'Adrenarca precoce', 'PP verdadeira'], [
      { cells: [{ t: 'O que aparece' }, { t: 'só mama' }, { t: 'só pelo + odor ± acne' }, { t: 'sinal + mais' }] },
      { cells: [{ t: 'Aceleração do crescimento' }, { t: 'não', cls: 'cell-good' }, { t: 'não', cls: 'cell-good' }, { t: 'SIM', cls: 'cell-bad' }] },
      { cells: [{ t: 'Virilização' }, { t: 'não', cls: 'cell-good' }, { t: 'NÃO — ponto crítico', cls: 'cell-good' }, { t: 'pode, se periférica', cls: 'cell-warn' }] },
      { cells: [{ t: 'Conduta' }, { t: 'acompanhar', cls: 'cell-good' }, { t: 'acompanhar', cls: 'cell-good' }, { t: 'investigar causa', cls: 'cell-bad' }] },
    ])}

    ${alertCard({ tone: 'good', kicker: 'Associações de prova', title: 'Adrenarca precoce: PIG e SOP', body: 'A adrenarca precoce é mais frequente em crianças que foram <strong>PIG</strong> (pequenas para a idade gestacional) e pode ter relação posterior com a <strong>síndrome dos ovários policísticos (SOP)</strong>.' })}

    <aside class="exec-alert exec-alert--good" role="note">
      <p class="exec-alert__kicker">Regra de ouro</p>
      <p class="exec-alert__title">Sinal isolado + crescimento normal = variante benigna (acompanhar).</p>
      <p class="exec-alert__body">Telarca precoce = só mama. Adrenarca precoce = só pelo + odor ± acne, <strong>SEM virilização</strong>. Apareceu aceleração <strong>ou</strong> virilização → não é benigno, investigue.</p>
    </aside>

    ${notaBanca('A <strong>síndrome dos ovários policísticos (SOP)</strong> está em processo de mudança de nome; por enquanto, ainda se usa SOP. (Atualização de nomenclatura — referência, não ponto de decoreba.)')}

    ${quiz('p10', 'A triagem das variantes benignas e o ponto crítico da adrenarca.', [
      {
        stem: 'Uma menina de 7 anos apresenta pelos pubianos, odor axilar e acne leve, com crescimento normal e sem hipertrofia de clitóris. Qual a classificação e a conduta?',
        alts: [
          { t: 'Puberdade precoce periférica — investigar adrenal', correct: false, why: 'Salta para doença da adrenal sem o gatilho que a justifica: não há virilização (clitoromegalia/aumento de genitália) nem aceleração — o ponto crítico é que adrenarca precoce não viriliza; investigar adrenal aqui é o erro.' },
          { t: 'Adrenarca precoce (variante benigna) — acompanhar', correct: true, why: 'Certa. Pelo + odor + acne, sem aceleração e sem virilização = adrenarca precoce, variante benigna → acompanhar, não investigar a fundo.' },
          { t: 'Puberdade precoce central — solicitar LH e RM', correct: false, why: 'Inventa central onde não há sinal de central (sem mama, sem aceleração, sem nada do eixo) — investiga um quadro benigno como se fosse PP.' },
          { t: 'Hiperplasia adrenal congênita não-clássica — dosar 17-OHP', correct: false, why: 'Salta para doença da adrenal sem o gatilho (virilização/aceleração) — o quadro é só pelo + odor + acne, sem virilização; é o erro que a página combate.' },
        ]
      },
      {
        stem: 'O que descaracteriza uma adrenarca precoce como variante benigna e obriga a investigar doença da adrenal?',
        alts: [
          { t: 'Presença de odor axilar', correct: false, why: 'É parte do quadro benigno da adrenarca precoce (odor e acne leve são esperados) — não descaracteriza nada.' },
          { t: 'Presença de acne', correct: false, why: 'Também é parte do quadro benigno esperado — não tira o "benigno".' },
          { t: 'Presença de virilização (hipertrofia de clitóris, aumento de genitália) ou aceleração do crescimento', correct: true, why: 'Certa. O que tira o "benigno" é a virilização (clitoromegalia, aumento de genitália — excesso de androgênio) ou a aceleração do crescimento — qualquer dos dois transforma "acompanhar" em "investigar".' },
          { t: 'Idade inferior a 8 anos', correct: false, why: 'É justamente a definição da adrenarca precoce (antes dos 8 anos) — a idade baixa é o que a torna "precoce", não o que a torna patológica; confunde "precoce" com "doente".' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 11 — E1 Pergunta central ===================== */
  // Página 11 — Estratégia: E1 — Pergunta central
  P.push(page('p11', 11, `
    ${tag('tto', 'Tratamento · o agonista que freia')}
    ${chips(['tratar a causa quando há', 'leuprorrelina (análogo de GnRH)', 'pulsátil ativa × constante bloqueia', 'dessensibilização'])}

    <section class="opener opener--question" aria-label="Pergunta de abertura">
      <span class="opener__question-mark" aria-hidden="true">?</span>
      <p class="opener__text">Se o medicamento <strong>ESTIMULA</strong> o receptor do GnRH — o mesmo receptor que dispara a puberdade —, como é que ele <strong>FREIA</strong> a puberdade em vez de acelerá-la? A resposta está num detalhe que você já conhece da fisiologia: não basta estimular o receptor; importa <strong>como</strong> se estimula.</p>
    </section>

    <h1 class="page-title">Um agonista que bloqueia: o paradoxo do tratamento</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">Tratar a causa quando há causa</h3>
        <p>O tratamento da puberdade precoce pode envolver, primeiro, <strong>tratar a CAUSA BASE</strong> quando ela é passível de tratamento: <strong>tumor de córtex adrenal, tumor testicular, alteração do sistema nervoso central</strong>. Achou a causa tratável (foi para isso toda a investigação), trata-se a causa. O que segue vale especialmente para a forma sem causa removível.</p>

        <h3 class="topic-h">Para a central idiopática: o análogo do GnRH</h3>
        <p>Para a puberdade precoce <strong>CENTRAL</strong>, especialmente a <strong>idiopática</strong> (a mais comum na menina — Bela), a base do tratamento é o <span class="term">ANÁLOGO (agonista) do GnRH</span>. O análogo mais famoso é a <span class="term">LEUPRORRELINA</span>. A medicação é administrada por <strong>vários anos</strong>, acompanhando-se o crescimento da criança; num determinado momento ela é <strong>interrompida</strong>, e a puberdade segue seu curso normal. O objetivo, lembrando o paradoxo da estatura (página 3): <strong>frear o eixo para comprar tempo de crescimento</strong> e proteger a estatura adulta.</p>

        <h3 class="topic-h">O paradoxo: pulsátil ativa, constante dessensibiliza</h3>
        <p>Agora o paradoxo aparente: o agonista <strong>estimula</strong> o receptor do GnRH — então <strong>deveria</strong> estimular a puberdade. Mas faz o <strong>contrário</strong>. A explicação está no <span class="term">padrão de secreção</span>: o que mantém o eixo <span class="hl-good">ATIVO</span> é a secreção <strong>PULSÁTIL</strong> do GnRH — pulsos intermitentes. O agonista, administrado como <strong>depósito</strong>, mantém um estímulo <strong>CONSTANTE</strong> (não pulsátil) sobre o receptor. E o estímulo constante leva à <span class="term">DESSENSIBILIZAÇÃO</span> dos receptores de GnRH. Ao dessensibilizar os receptores, a medicação <span class="hl-warn">BLOQUEIA</span> o eixo — é assim que um agonista freia a puberdade. Em uma frase: <strong>pulsátil ativa; constante dessensibiliza e bloqueia</strong>. O mesmo receptor, o mesmo agonista — o que muda é o <strong>ritmo</strong> do estímulo.</p>
      </div>
    </div>

    ${svgPiso('S-mecanismoGnRH', { caption: 'o paradoxo do mecanismo — dois traçados de estímulo ao receptor de GnRH na mesma escala: ESQUERDA "pulsátil (fisiológico) → eixo ATIVO" (picos intermitentes) × DIREITA "agonista depósito = constante → DESSENSIBILIZAÇÃO → eixo BLOQUEADO" (linha alta e contínua). O que muda é o ritmo do estímulo, não o receptor.', hint: 'Toque na leuprorrelina: o mecanismo é "constante → dessensibiliza → freia".' })}

    ${medSplit({
      file: 'p11-leuprorrelina.svg',
      alt: 'Fórmula estrutural 2D da leuprorrelina, análogo agonista de GnRH usado na puberdade precoce central.',
      light: true,
      side: 'right',
      titulo: 'Estrutura (referência)',
      achado: 'a <strong>leuprorrelina</strong> em fórmula estrutural — análogo peptídico sintético do GnRH, usado em formulação depot para a PP central. O traço transparente exige frame claro (modo escuro não engole a molécula).',
      fonte: 'Fvasconcellos, via Wikimedia Commons',
      licenca: 'Domínio público (PD-chem)',
      body: 'É o agonista que, em exposição <strong>sustentada/constante</strong>, reduz gonadotrofinas — diferente de um antagonista, ele tem uma fase agonista inicial, mas o uso contínuo dessensibiliza e bloqueia. A <strong>posologia depot não entra aqui</strong> — fica o nome e o mecanismo.'
    })}

    ${svgPiso('S-timelineTto', { caption: 'a timeline do tratamento — vários anos de medicação acompanhando o crescimento → interrupção → a puberdade segue o curso normal. Marca a natureza temporária e reversível do bloqueio.', hint: 'O bloqueio é reversível: trata-se, suspende-se, a puberdade retoma.', doc: true })}

    <aside class="exec-alert exec-alert--warn" role="note">
      <p class="exec-alert__kicker">Regra de ouro</p>
      <p class="exec-alert__title">Análogo do GnRH (leuprorrelina) = base da PP central idiopática.</p>
      <p class="exec-alert__body">O paradoxo: agonista que <strong>freia</strong> porque o estímulo <strong>constante</strong> (depósito) <strong>dessensibiliza</strong> o receptor e <strong>bloqueia</strong> o eixo — ao contrário do GnRH <strong>pulsátil</strong> fisiológico, que o ativa. E sempre: tratar a <strong>causa base</strong> quando tratável (tumor, lesão do SNC).</p>
    </aside>

    <aside class="trap practice">
      <p class="practice__label">Pegadinha de prova</p>
      <p><strong>O agonista do GnRH freia, não acelera</strong> — porque o estímulo <strong>contínuo/constante</strong> dessensibiliza o receptor (≠ pulsátil, que ativa). Quem responde "agonista estimula → acelera a puberdade" cai exatamente na armadilha.</p>
    </aside>

    ${quiz('p11', 'O paradoxo do agonista que freia.', [
      {
        stem: 'Por que um agonista do receptor de GnRH (como a leuprorrelina), que estimula o receptor, acaba bloqueando a puberdade?',
        alts: [
          { t: 'Porque, em altas doses, o agonista vira antagonista do receptor', correct: false, why: 'Inventa uma conversão farmacológica que não ocorre — não é dose-dependente virar antagonista; é o padrão (constante vs pulsátil) que muda o efeito.' },
          { t: 'Porque o estímulo constante (depósito) dessensibiliza os receptores; o eixo só se mantém ativo com estímulo pulsátil', correct: true, why: 'Certa. O eixo precisa de estímulo pulsátil para se manter ativo; o agonista depot dá estímulo constante, que dessensibiliza o receptor e bloqueia o eixo — o paradoxo do "agonista que freia".' },
          { t: 'Porque o agonista destrói as células produtoras de GnRH no hipotálamo', correct: false, why: 'Atribui um efeito citotóxico inexistente — o receptor é dessensibilizado, não as células destruídas (e o efeito é reversível na suspensão).' },
          { t: 'Porque ele bloqueia diretamente a produção de testosterona e estrogênio na gônada', correct: false, why: 'Erra o nível de ação: o bloqueio é central (receptor de GnRH na hipófise), não periférico na gônada; põe o freio no lugar errado.' },
        ]
      },
      {
        stem: 'Sobre o tratamento da puberdade precoce central idiopática com análogo de GnRH, qual afirmação está CORRETA?',
        alts: [
          { t: 'É administrado em pulsos intermitentes para imitar a fisiologia', correct: false, why: 'Inverte o mecanismo terapêutico: dar em pulsos ativaria o eixo (é o fisiológico); o tratamento usa o constante justamente para dessensibilizar.' },
          { t: 'É administrado de forma contínua (depósito) por vários anos e depois interrompido, com retomada da puberdade', correct: true, why: 'Certa. O análogo depot é constante (não pulsátil), mantido por vários anos acompanhando o crescimento, e interrompido num momento certo — aí a puberdade segue o curso normal.' },
          { t: 'Acelera o fechamento epifisário para encurtar a puberdade', correct: false, why: 'Inverte o objetivo: o tratamento protege a estatura (freia o eixo para comprar tempo de crescimento), não acelera o fechamento — esse é o problema, não o tratamento.' },
          { t: 'Substitui a necessidade de investigar a causa da puberdade central', correct: false, why: 'Dissocia tratamento de investigação: tratar a central não dispensa achar a causa (especialmente no menino, > 50% lesão do SNC).' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 12 — E5 Meta + checklist [HERÓI H1] ===================== */
  // Página 12 — Estratégia: E5 — Meta da página + checklist
  P.push(page('p12', 12, `
    ${tag('meta', 'Síntese · a Árvore inteira e Bela resolvida')}
    ${chips(['algoritmo em 2 passos', 'não confunda (7 pares)', 'Bela = central idiopática', 'economia de exames'])}

    <section class="opener opener--checklist" aria-label="Checklist de domínio da síntese">
      <p class="opener__checklist-title">O fechamento amarra tudo num caminho de decisão:</p>
      <ul class="opener__checklist">
        <li class="opener__checklist-item"><span class="opener__check" data-checked="true" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7l3.5 3.5L12 3.5"/></svg></span><span>transformar <strong>qualquer</strong> questão de puberdade precoce num caminho de decisão (a Árvore)</span></li>
        <li class="opener__checklist-item"><span class="opener__check" data-checked="true" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7l3.5 3.5L12 3.5"/></svg></span><span>decidir, em dois passos, se um caso é variante benigna, central ou periférica</span></li>
        <li class="opener__checklist-item"><span class="opener__check" data-checked="true" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7l3.5 3.5L12 3.5"/></svg></span><span>não cair nos pares que a banca troca (LH↑×suprimido, iso×hetero, virilização×só-pelo)</span></li>
        <li class="opener__checklist-item"><span class="opener__check" data-checked="true" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7l3.5 3.5L12 3.5"/></svg></span><span>resolver Bela do começo ao fim, sabendo por que ela é <strong>central idiopática</strong></span></li>
      </ul>
    </section>

    <h1 class="page-title">A Árvore inteira na mão — e Bela, finalmente, resolvida</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">O algoritmo-mestre em 2 passos</h3>
        <p>O algoritmo-mestre, aplicável a qualquer questão: a banca apresenta <strong>surgimento precoce de caracteres sexuais</strong> (menina &lt; 8 anos, menino &lt; 9 anos) — penificação, mama, aumento de genitália.</p>
        <p><strong>Passo 1</strong> — verifique se há <strong>aceleração do crescimento / avanço da idade óssea</strong>. Com aceleração → <span class="hl-bad">puberdade precoce</span> (descubra a causa). Sem aceleração (sinal isolado) → <span class="hl-good">variante benigna</span> (telarca ou adrenarca precoce).</p>
        <p><strong>Passo 2 (♀)</strong> — <em>situação A</em>: mama + aceleração = puberdade <strong>ISOSSEXUAL</strong> (há estrogênio); pode ser central <strong>ou</strong> periférica (cisto ovariano). O que diferencia é o <strong>LH</strong>: <strong>LH aumentado</strong> (basal ou pós-estímulo) = <strong>CENTRAL</strong> (até prova em contrário, idiopática); <strong>LH pré-puberal</strong> = doença <strong>OVARIANA</strong> (periférica). <em>Situação B</em>: <strong>virilização</strong> (pelo, hipertrofia de clitóris) = pense <strong>ADRENAL</strong> → androgênios da adrenal + 17-OHP + testosterona; se exógeno, androgênios da adrenal normais e só testosterona alta.</p>
        <p><strong>Passo 2 (♂)</strong> — o diferencial é da puberdade isossexual com virilização, central ou periférica; o que diferencia é o <strong>LH</strong>, mas o <strong>VOLUME TESTICULAR</strong> já aponta antes: aumentado/simétrico → <strong>central</strong> (RM); pequeno + virilização → <strong>periférica</strong> (adrenal/exógeno); assimétrico → <strong>tumor testicular</strong>.</p>
        <p>E em <strong>ambos os sexos</strong>, sempre lembrar da exposição <strong>EXÓGENA</strong> (creme/comprimido de estrogênio; gel de testosterona, hoje muito disponível). <strong>Economia de exames</strong>: menina com virilização <strong>não</strong> avalia LH; menina isossexual <strong>não</strong> pede androgênios da adrenal — não se pede "tudo de uma vez".</p>

        <h3 class="topic-h">Não confunda: os pares que a banca troca</h3>
        <p>Antes de aplicar a Bela, reative os confundíveis que aparecem trocados nas questões:</p>

        <h3 class="topic-h">Bela resolvida, passo a passo</h3>
        <p><strong>Passo 1</strong>: Bela, 7 anos, M4 P3, <strong>com aceleração do crescimento</strong> → tem <strong>puberdade precoce</strong> (está abaixo do corte ♀ &lt; 8). <strong>Passo 2</strong>: ela tem mama <strong>E</strong> penificação (P3); mas <strong>não</strong> se investiga adrenal pela penificação — o que <strong>comanda</strong> é o desenvolvimento da <strong>MAMA</strong> (ação estrogênica) → puberdade <strong>ISOSSEXUAL</strong>. (Detalhe fisiológico: sempre que há puberdade central, isso <strong>favorece</strong> a adrenarca — por isso Bela teve primeiro a mama e depois o pelo; é como se a central <strong>deflagrasse</strong> a adrenarca. Valoriza-se a <strong>mama</strong>.) Diferenciação pelo LH: Bela tem <span class="hl-good">LH aumentado + mama</span> → puberdade precoce <strong>CENTRAL</strong>, certamente <strong>IDIOPÁTICA</strong> — coerente com a ressonância normal. E mesmo <strong>sem</strong> os exames, a aposta seria a mesma: numa menina entre 6 e 8 anos com PP, a aposta pela frequência é <strong>central idiopática</strong> (investigando assim mesmo). Bela fez vários exames, <strong>mas não fez a radiografia de mão/punho</strong> — se fizesse, certamente mostraria <strong>idade óssea avançada</strong>. Por isso, <strong>sem tratamento, a principal complicação de longo prazo de Bela será a BAIXA ESTATURA na vida adulta</strong> — daí a indicação de tratar com o <strong>análogo do GnRH</strong>.</p>

        <h3 class="topic-h">O gancho para o próximo tema</h3>
        <p>Dominado o raciocínio puberal — fisiológico e precoce —, o próximo passo na avaliação da criança que cresce é olhar como ela <strong>se desenvolve</strong>: o desenvolvimento neuropsicomotor, com seus marcos e reflexos. É outro tipo de relógio.</p>
      </div>
    </div>

    ${naoConfunda([
      { left: 'Central (LH↑)', right: 'Periférica (LH suprimido)', decide: 'O LH: aumentado = central; suprimido/pré-puberal = periférica. E LH "normal" não afasta central → teste de estímulo.' },
      { left: 'Isossexual (próprio sexo)', right: 'Heterossexual (sexo oposto)', decide: 'Só a periférica pode ser heterossexual; a central é sempre isossexual.' },
      { left: 'Virilização (pelo + clitoromegalia + voz)', right: 'Só-pelo (adrenarca benigna)', decide: 'Só-pelo sem aceleração é benigno; o conjunto (clitoromegalia + voz) é doença da adrenal.' },
      { left: 'Tumor adrenal (Cushing)', right: 'HAC (17-OHP↑↑)', decide: 'O Cushing entrega o tumor; a 17-OHP muito aumentada entrega a HAC.' },
      { left: 'Craniofaringioma (ATRASO)', right: 'Demais neoplasias do SNC (precoce)', decide: '"FAR = longe" → o craniofaringioma atrasa; as outras neoplasias do SNC, em geral, adiantam.' },
      { left: '♀ central ~90% idiopática', right: '♂ central > 50% lesão do SNC', decide: 'Na menina, preocupe-se com a consequência; no menino, investigue a causa — RM sempre.' },
      { left: 'Testículo grande/simétrico (central)', right: 'Pequeno (periférica) × assimétrico (tumor)', decide: 'Só o estímulo gonadotrófico (central) aumenta a gônada simetricamente; pequeno = periférica; assimétrico = tumor testicular.' },
    ])}

    ${medSplit({
      file: 'p12-fluxograma-manejo.png',
      alt: 'Fluxograma publicado de avaliação e manejo da puberdade precoce, separando central, periférica, familiar e orgânica.',
      light: true,
      side: 'left',
      titulo: 'Fluxograma publicado (caso real)',
      achado: 'um <strong>algoritmo de manejo</strong> da literatura — a mesma lógica da Árvore, validada em publicação: triagem por LH/GnRH → central (familiar × esporádica → RM) × periférica. Confronte com a Árvore autoral ao lado.',
      fonte: 'Micangeli et al., Children 2023, via MDPI',
      licenca: 'CC BY 4.0',
      body: 'O fluxograma ancora a conduta no <strong>LH</strong>: LH puberal → central (esporádica → RM cerebral); LH pré-puberal → teste com GnRH (resposta puberal reclassifica como central; LH baixo sustenta periférica). É a Árvore desta aula, na forma como a banca a encontra publicada.'
    })}

    ${svgHero('p12', { caption: 'a Árvore Central × Periférica completa — o objeto persistente fechado, totalmente hidratado: raiz "caracteres sexuais precoces" → "tem aceleração?" (não → variantes benignas; sim → PP) → CENTRAL (GnRH-dep, isossexual, LH↑; ♀ ~90% idiopática / ♂ > 50% SNC → RM; tratamento agonista de GnRH) × PERIFÉRICA (GnRH-indep, iso/hetero; gônada/cisto, adrenal/tumor+Cushing/HAC, exógeno; LH pré-puberal), com o atalho ♂ (volume testicular) no ramo masculino. Sobre ela, a trilha de Bela: aceleração SIM → PP → mama → isossexual → LH↑ → CENTRAL IDIOPÁTICA.' })}

    ${belaCard({
      front: 'Bela, 7 anos, M4 P3 — "deixa rolar"? Toque para cravar a resposta.',
      trail: 'Bela, 7a, M4 P3, <strong>aceleração</strong> → puberdade precoce → mama comanda → <strong>isossexual</strong> → <strong>LH↑</strong> → <strong>CENTRAL IDIOPÁTICA</strong> → tratar com análogo do GnRH (senão: <strong>baixa estatura adulta</strong>). Os dois "deixa rolar" estavam errados.'
    })}

    <aside class="exec-alert exec-alert--central" role="note">
      <p class="exec-alert__kicker">Regra de ouro</p>
      <p class="exec-alert__title">Passo 1: tem aceleração? Passo 2: que sinal comanda?</p>
      <p class="exec-alert__body">Não → variante benigna; Sim → PP. Mama/isossexual → LH decide central×periférica; virilização → adrenal (androgênios + 17-OHP). No menino, o volume testicular adianta a resposta. Bela: aceleração SIM → PP → mama comanda → isossexual → LH↑ → <strong>central idiopática</strong> → tratar (senão, baixa estatura).</p>
    </aside>

    ${quiz('p12', 'O algoritmo-mestre aplicado e Bela resolvida.', [
      {
        stem: 'Bela: 7 anos, mama M4 + penificação P3, com aceleração do crescimento e LH aumentado. Qual o diagnóstico, e que sinal comanda a classificação isossexual?',
        alts: [
          { t: 'Puberdade precoce periférica; comanda a penificação (adrenal)', correct: false, why: 'Deixa a penificação comandar e investiga adrenal — erro: com mama e LH↑, a central comanda; a penificação é satélite.' },
          { t: 'Puberdade precoce central idiopática; comanda a mama (ação estrogênica)', correct: true, why: 'Certa. Aceleração → PP; mama + LH↑ → central (eixo HHG ativado), e pela frequência (♀ 6-8 anos) idiopática. O sinal que comanda é a mama (estrogênio/isossexual): na central, a própria puberdade deflagra a adrenarca.' },
          { t: 'Adrenarca precoce; comanda a penificação isolada', correct: false, why: 'Ignora a aceleração e a mama — não é variante benigna, é PP de verdade.' },
          { t: 'Puberdade precoce heterossexual; comanda a virilização', correct: false, why: 'Chama de heterossexual um quadro de mama (próprio sexo = isossexual); não há virilização em Bela.' },
        ]
      },
      {
        stem: 'No algoritmo da puberdade precoce, qual é a sequência correta de raciocínio?',
        alts: [
          { t: 'Dosar LH primeiro; se alterado, verificar aceleração do crescimento', correct: false, why: 'Inverte a ordem: o LH só faz sentido depois de confirmada a PP e definida a isossexualidade; dosar LH numa virilização, por exemplo, é exame errado.' },
          { t: 'Verificar aceleração (Passo 1); se houver PP, deixar o sinal que comanda guiar o Passo 2 (LH na isossexual, androgênios na virilização)', correct: true, why: 'Certa. Primeiro a triagem (tem aceleração? → PP × variante benigna); depois o sinal que comanda define o Passo 2 — isossexual (mama) → o LH decide central×periférica; virilização → androgênios da adrenal + 17-OHP.' },
          { t: 'Solicitar RM de crânio em todos os casos antes de classificar', correct: false, why: 'Generaliza a RM, que é da central e nem sempre (♀ 6-8 anos é questionável) — não se faz em "todos".' },
          { t: 'Pedir todos os exames (LH, androgênios, RM, USG) simultaneamente para ganhar tempo', correct: false, why: 'Viola a economia de exames explícita: virilização não pede LH, isossexual não pede androgênios da adrenal — pedir tudo é o erro que a página combate.' },
        ]
      },
    ])}
  `));

  return P;
}
