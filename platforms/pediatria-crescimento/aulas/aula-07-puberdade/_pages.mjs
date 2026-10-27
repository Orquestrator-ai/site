/* _pages.mjs — conteúdo autoral das 13 páginas da Aula 07 "Puberdade fisiológica e distúrbios
   puberais" (núcleo). Texto-aluno = canon do prompt-final (§6), renderizado verbatim. Tópicos
   visíveis = <h3 class="topic-h">. Anti-metalinguagem: voz de professor direto ao aluno; o texto
   É o conteúdo. Aberturas E1-E8 conforme o plano (anti-monotonia). SVGs de piso (S-*) e 2
   figuras-herói (P5 curva de velocidade, P13 Mapa de Tanner completo) embutidos inline pelos
   helpers do _build (script self-contained roda só). Mapa de Tanner = objeto persistente em 4
   estados (vazio P7 / ♀ P8 / ♂ P10 / herói P13). Quiz gold (explica TODAS as alternativas) fiel
   ao prompt-final. Eixo cromático: gonadal/HHG (sky/teal) × adrenal/HHA (índigo) × crescimento
   (verde) × pegadinha/diferencial (âmbar). ZERO imagem real (§3.1, veto ético pediátrico). */

export function buildPages({ med, svgPiso, svgHero, notaBanca, notaValor, cmp, collapsible, recall, synthCases, quiz, tag, chips, page }) {
  const P = [];

  /* ===================== PÁGINA 1 — E3 Caso clínico em abertura ===================== */
  // Página 1 — Estratégia: E3 — Caso clínico em abertura
  P.push(page('p1', 1, `
    ${tag('caso', 'Caso-âncora · relógio ou doença?')}
    ${chips(['fisiológico × distúrbio', 'estadiar antes de classificar', 'Blair · Serena · Dan', 'idade não decide'])}

    <article class="opener opener--case" aria-label="Caso clínico de abertura">
      <span class="opener__case-header">Blair · 13 anos · a queixa que abre a aula</span>
      <p class="opener__case-quote">Blair tem 13 anos e chega ao consultório preocupada: é a única do grupo que ainda não menstruou, é a mais baixa da turma, e suas mamas só começaram a crescer há cerca de um ano. Para ela, algo está errado. Antes de concordar ou discordar, vale uma pergunta: o que exatamente faz uma puberdade ser <strong>normal</strong>?</p>
      <dl class="case-card__meta">
        <dt>Paciente</dt><dd>Blair, 13 anos — ainda sem menarca, baixa estatura, telarca há ~1 ano</dd>
        <dt>Contraste</dt><dd>Serena, 13 anos — mesma altura, já menstrua desde os 12</dd>
        <dt>O 2º caso (entra depois)</dt><dd>Dan, 15 anos, namorado de Serena</dd>
        <dt>A pergunta-fio</dt><dd>puberdade fisiológica ou distúrbio puberal?</dd>
      </dl>
    </article>

    <h1 class="page-title">Três adolescentes, três relógios: quem está doente?</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">A queixa de Blair</h3>
        <p>Blair, 13 anos, procura atendimento com uma queixa específica: acha que <strong>não está se desenvolvendo</strong>. O que a incomoda é ainda não ter menstruado, enquanto praticamente todas as amigas já menstruaram. Ela conta que sempre foi "atrasada" e que as mamas só começaram a aparecer há cerca de um ano — ou seja, a <span class="term">telarca</span> (o broto mamário) começou por volta dos 12 anos. Ao exame, encontra-se <strong>aumento da porção superior da glândula mamária</strong>, bilateral, e <strong>poucos pelos pubianos, finos, lisos e pouco pigmentados</strong>, ao redor dos grandes lábios. Guarde esses dois achados: esses dois achados é que dão a resposta, quando estadiados.</p>

        <h3 class="topic-h">Serena e Dan: os outros dois relógios</h3>
        <p>Blair é a mais baixa do grupo. A única amiga tão baixa quanto ela é a <span class="term">Serena</span>, também de 13 anos — mas aí está o contraste que vai render: Serena é <strong>muito mais desenvolvida</strong>, já menstrua desde os 12 anos e já tem namorado. Duas meninas, mesma idade, mesma altura, desenvolvimentos opostos. Essa comparação não é detalhe de novela — é uma pergunta de prognóstico que será respondida adiante. O namorado de Serena é <span class="term">Dan</span>, 15 anos, e ele carrega o segundo problema da aula: uma queixa que entra mais tarde, para fechar o arco. Por enquanto, fica a expectativa.</p>

        <h3 class="topic-h">A pergunta que organiza tudo</h3>
        <p>A pergunta central, a que tudo serve, é simples de enunciar e perigosa de responder no chute: <strong>Blair tem uma puberdade fisiológica ou um distúrbio puberal?</strong> Repare que a idade sozinha não responde — 13 anos pode ser normal ou tardio, depende de quando a puberdade <em>começou</em> e de onde ela está <em>agora</em>. Para decidir com segurança, é preciso primeiro dominar o que acontece numa puberdade que segue o roteiro certo: quais hormônios disparam, em que ordem os sinais aparecem, quando o crescimento acelera, e como medir tudo isso com uma régua objetiva. Construído esse mapa, Blair, Serena e Dan se resolvem sozinhos.</p>
      </div>
    </div>

    <aside class="op-summary">
      <p class="op-summary__label">Regra de ouro</p>
      <p>O caso não se resolve agora de propósito: ele <strong>carrega a pergunta</strong>. O valor está em fazer resistir ao reflexo de classificar pela idade e perceber que se precisa de um método — <strong>estadiar primeiro</strong> (Tanner), <strong>situar no tempo</strong> e só então decidir. O método é tudo o que vem a seguir.</p>
    </aside>

    <figure class="cast" aria-label="O elenco da aula: Blair, Serena e Dan">
      <div class="cast__grid">
        <article class="cast__card cast__card--c1" tabindex="0" aria-label="Blair, 13 anos">
          <span class="cast__avatar" aria-hidden="true">B</span>
          <p class="cast__name">Blair<span class="cast__age">13 anos</span></p>
          <p class="cast__queixa">Ainda não menstruou, é a mais baixa, mamas há ~1 ano.</p>
        </article>
        <article class="cast__card cast__card--c2" tabindex="0" aria-label="Serena, 13 anos">
          <span class="cast__avatar" aria-hidden="true">S</span>
          <p class="cast__name">Serena<span class="cast__age">13 anos</span></p>
          <p class="cast__queixa">Já menstrua desde os 12, mesma altura de Blair, namorada de Dan.</p>
        </article>
        <article class="cast__card cast__card--c3" tabindex="0" aria-label="Dan, 15 anos — entra depois">
          <span class="cast__avatar" aria-hidden="true">D</span>
          <p class="cast__name">Dan<span class="cast__age">15 anos</span></p>
          <p class="cast__tag">entra depois</p>
          <p class="cast__queixa">Namorado de Serena — o 2º caso da aula, ainda em aberto.</p>
        </article>
      </div>
      <figcaption class="cast__cap"><strong>O elenco</strong> — três adolescentes, mesmo período, relógios diferentes. Passe o mouse ou navegue por Tab; o card de Dan está rebaixado de propósito (a queixa dele entra mais tarde). Este mesmo trio volta carimbado com a resposta no fechamento.</figcaption>
    </figure>

    <figure class="fork" aria-label="A pergunta-fio: fisiológico ou distúrbio?">
      <div class="fork__diagram">
        <div class="fork__node">Blair · 13 anos</div>
        <div class="fork__stem" aria-hidden="true"></div>
        <div class="fork__branches">
          <div class="fork__branch">
            <span class="fork__q" aria-hidden="true">?</span>
            <span class="fork__branch-label">puberdade fisiológica</span>
          </div>
          <div class="fork__branch">
            <span class="fork__q" aria-hidden="true">?</span>
            <span class="fork__branch-label">distúrbio puberal</span>
          </div>
        </div>
      </div>
      <figcaption class="fork__cap"><strong>A pergunta-fio</strong> — os dois ramos têm peso visual idêntico e os dois "?" são iguais de propósito: a idade isolada não fecha nenhum deles. A resolução fica reservada para o fechamento da aula.</figcaption>
    </figure>

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>No consultório, a queixa "minha filha não se desenvolve" chega o tempo todo, e a maioria é puberdade fisiológica de uma criança ansiosa (ou de pais ansiosos). O reflexo errado é tranquilizar sem estadiar ou investigar sem estadiar. O reflexo certo é <strong>estadiar primeiro</strong> (Tanner), <strong>situar no tempo</strong> (quando começou, onde está) e só então decidir. Treinar esse reflexo é o que resolve a maioria das queixas puberais.</p>
    </aside>

    ${quiz('p1', 'Enquadramento: o caso-âncora e por que a idade isolada não classifica.', [
      {
        stem: 'Diante de Blair (13 anos, telarca iniciada há ~1 ano, baixa estatura, ainda sem menarca), qual é a conduta de raciocínio mais correta antes de classificar o caso?',
        alts: [
          { t: 'Classificar como distúrbio puberal, pois aos 13 anos já deveria ter menstruado', correct: false, why: 'Classifica pela idade nua, ignorando que a telarca já começou (puberdade em curso) — é o erro que a própria paciente comete, e a banca pune.' },
          { t: 'Tranquilizar de imediato, pois 13 anos é idade normal para tudo', correct: false, why: 'Tranquiliza sem estadiar: pode estar certo no fim, mas pular o exame é sorte, não método — e 13 anos não é "normal para tudo" (menarca aos 13 sem nenhum sinal prévio seria diferente).' },
          { t: 'Estadiar o desenvolvimento (Tanner) e situar no tempo antes de decidir', correct: true, why: 'Certa. A virada da aula inteira é que a idade isolada não classifica — o que classifica é o estágio de desenvolvimento (Tanner) cruzado com o momento em que a puberdade começou. Estadiar e situar no tempo vem antes de qualquer rótulo ou exame.' },
          { t: 'Solicitar dosagens hormonais e idade óssea como primeiro passo', correct: false, why: 'Parte para exame caro antes do exame físico que resolve a maioria dos casos — inverte a ordem clínica, pedindo laboratório onde o estadiamento basta.' },
        ]
      },
      {
        stem: 'Serena e Blair têm a mesma idade (13a) e a mesma altura, mas Serena já menstruou e Blair não. O que esse contraste, sozinho, permite afirmar?',
        alts: [
          { t: 'Blair tem um distúrbio puberal e Serena é normal', correct: false, why: 'Diagnostica no escuro: menstruar mais cedo ou mais tarde, dentro da faixa, é variação de relógio, não doença.' },
          { t: 'Nada ainda — é preciso estadiar as duas; o contraste levanta uma pergunta de prognóstico, não um diagnóstico', correct: true, why: 'Certa. No caso, o contraste gera uma pergunta (quem crescerá mais? quem está onde na puberdade?), mas não entrega resposta — isso é o que faz dele um bom caso.' },
          { t: 'Serena terá maior estatura final que Blair', correct: false, why: 'Inverte o prognóstico correto — quem ainda não menstruou (Blair) tende a ter mais crescimento pela frente; o palpite apressado erra justamente o sentido.' },
          { t: 'As duas estão fora da faixa normal por serem as mais baixas', correct: false, why: 'Confunde "ser a mais baixa do grupo" com "estar fora da curva" — baixa estatura se define por percentil/curva, não por comparação com amigas; troca anedota por dado.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 2 — E1 Pergunta central ===================== */
  // Página 2 — Estratégia: E1 — Pergunta central
  P.push(page('p2', 2, `
    ${tag('hhg', 'Fisiologia · os dois motores hormonais')}
    ${chips(['gonadarca = início', 'adrenarca', 'eixo HHG × HHA', 'reativação ≠ ativação', 'minipuberdade'])}

    <section class="opener opener--question" aria-label="Pergunta de abertura">
      <span class="opener__question-mark" aria-hidden="true">?</span>
      <p class="opener__text">Se a puberdade é a transição do corpo infantil para o adulto, que <strong>dois interruptores hormonais</strong> precisam ser ligados para ela começar — e qual dos dois é o que verdadeiramente "dá a largada"?</p>
    </section>

    <h1 class="page-title">Puberdade é hormônio: dois eventos, dois eixos</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">O que é puberdade, e por que é tudo hormônio</h3>
        <p><span class="term">Puberdade</span> é o período de transformações físicas e biológicas durante o qual o corpo <strong>infantil</strong> se torna o corpo <strong>adulto</strong>. E a chave para entender tudo o que vem depois é simples: <strong>tudo o que acontece na puberdade é resultado da ação de hormônios</strong>. Não há mudança puberal — mama, pelo, estirão, voz, composição corporal — que não seja consequência direta de um hormônio agindo num tecido. Por isso, dominar a puberdade é, no fundo, dominar <strong>de onde vêm esses hormônios</strong>. E eles vêm de <strong>dois</strong> grandes eventos hormonais, não de um.</p>

        <h3 class="topic-h">Os dois grandes eventos: gonadarca e adrenarca</h3>
        <p>Os hormônios da puberdade resultam de <strong>dois grandes eventos: a gonadarca e a adrenarca</strong>. A <span class="hl-good">gonadarca</span> é o evento que <strong>de fato marca o início da puberdade</strong> — guarde essa primazia. O nome entrega o conceito: gonadarca é o <strong>"nascimento da gônada"</strong> — não no sentido de a gônada surgir (já se nasce com testículos e ovários), mas no sentido de <strong>início da atividade hormonal</strong> dos testículos e dos ovários. A gonadarca é resultado da <span class="term">reativação do eixo hipotálamo-hipófise-gonadal (HHG)</span>, que ficou adormecido durante os primeiros anos de vida. A <span class="term">adrenarca</span>, o segundo motor, será detalhada na sua própria página — por ora, basta saber que existe e que é <strong>distinta</strong> da gonadarca.</p>

        <h3 class="topic-h">Reativação, não ativação: a pegadinha da minipuberdade</h3>
        <p>Aqui mora uma pegadinha de prova fina. O termo correto é <span class="hl-warn">reativação</span>, não ativação — e o motivo tem nome: a <span class="term">minipuberdade</span>. Logo após o nascimento, nos primeiros meses de vida, o eixo HHG pode estar <strong>parcialmente ativado</strong> (fenômeno fisiológico que o endocrinologista chama de minipuberdade). Passados esses primeiros meses, o eixo entra em <strong>latência</strong> durante a infância, e só num determinado momento volta a ser ativado — por isso <strong>re</strong>ativação. O eixo não liga pela primeira vez na puberdade; ele <strong>religa</strong>. Quem escreve "ativação do eixo HHG" como se fosse um evento inédito perde a sutileza que a banca planta.</p>
      </div>
    </div>

    <aside class="op-summary">
      <p class="op-summary__label">Regra de ouro</p>
      <p>Dois eventos hormonais movem a puberdade — <strong>gonadarca</strong> (gônadas) e <strong>adrenarca</strong> (adrenal) —, mas é a <strong>gonadarca que marca o início</strong>. Quando a prova perguntar "o que deflagra a puberdade?", a resposta-âncora é a gonadarca / reativação do eixo HHG.</p>
    </aside>

    <aside class="trap">
      <span class="trap__icon" aria-hidden="true">!</span>
      <div class="trap__body">
        <p class="trap__label">Pegadinha de prova</p>
        <p class="trap__text"><strong>Reativação, não ativação.</strong> O eixo HHG já funcionou na <strong>minipuberdade</strong> (primeiros meses de vida), entrou em latência na infância e <strong>re</strong>ativa na puberdade. A alternativa que fala em "ativação inédita do eixo gonadal" ignora a minipuberdade.</p>
      </div>
    </aside>

    <figure class="motors" aria-label="Os dois motores hormonais da puberdade">
      <div class="motors__pair">
        <div class="motors__col motors__col--hhg" data-toggle="start" aria-pressed="false" aria-label="Gonadarca — clique para marcar o início da puberdade">
          <p class="motors__title">Gonadarca <small>eixo HHG</small></p>
          <ul class="motors__chain">
            <li>reativação do eixo HHG</li>
            <li>esteroides sexuais</li>
            <li>testosterona / estrogênio</li>
          </ul>
          <span class="motors__start-flag" hidden>✓ marca o início da puberdade</span>
        </div>
        <div class="motors__col motors__col--hha" aria-label="Adrenarca — eixo HHA">
          <p class="motors__title">Adrenarca <small>eixo HHA</small></p>
          <ul class="motors__chain">
            <li>maturação da adrenal</li>
            <li>androgênios adrenais</li>
            <li>(detalhada na própria página)</li>
          </ul>
        </div>
      </div>
      <div class="motors__converge"><span>os dois convergem para</span>PUBERDADE</div>
      <figcaption class="motors__cap"><strong>Os dois motores</strong> — painel espelhado: gonadarca (HHG) e adrenarca (HHA), distintos, mesmo destino. Clique (ou Enter) na coluna da gonadarca: é ela que <strong>marca o início</strong>. As páginas seguintes desdobram cada motor.</figcaption>
    </figure>

    ${svgPiso('S-minipuberdade', { caption: 'a linha do eixo HHG no tempo — minipuberdade (primeiros meses, parcialmente ligado) → latência (infância) → reativação (puberdade). O marco "minipuberdade" aceso primeiro prova o "re-" de reativação: o eixo já esteve ligado antes.', hint: 'Passe o mouse pelos três marcos; o primeiro aceso é a prova da pegadinha.' })}

    ${med({
      file: 'p2-eixo-hormonal-puberdade-hhg.png',
      alt: 'Fluxograma do controle hormonal da puberdade: hipotálamo secreta GnRH, que estimula a hipófise a liberar LH e FSH, que agem nas gônadas, produzindo os esteroides sexuais.',
      light: true,
      titulo: 'Referência de livro —',
      achado: 'fluxograma do <strong>controle hormonal da puberdade</strong>: hipotálamo → <strong>GnRH</strong> → hipófise → <strong>LH/FSH</strong> → gônadas → esteroides sexuais. É o mesmo eixo HHG da cascata interativa acima, num diagrama clássico de referência.',
      fonte: 'Sciencia58, via Wikimedia Commons',
      licenca: 'Domínio público (CC0 1.0)'
    })}

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>Separar gonadarca de adrenarca desde já evita o erro mais comum do tema: tratar todo sinal puberal como vindo do mesmo lugar. Telarca e aumento testicular são gonadarca (HHG); pubarca é adrenarca (HHA). Quem amarra cada sinal ao seu eixo lê o caso clínico em camadas, não como uma sopa hormonal.</p>
    </aside>

    ${quiz('p2', 'A dupla gonadarca/adrenarca e a pegadinha "reativação ≠ ativação".', [
      {
        stem: 'Qual evento hormonal marca o início da puberdade, e de que mecanismo ele resulta?',
        alts: [
          { t: 'A adrenarca, por ativação inédita do eixo hipotálamo-hipófise-adrenal', correct: false, why: 'Erra duas vezes: troca o evento de início (é gonadarca, não adrenarca) e usa "ativação inédita" — o eixo adrenal, aliás, existe desde a vida fetal.' },
          { t: 'A gonadarca, por reativação do eixo hipotálamo-hipófise-gonadal', correct: true, why: 'Certa. A gonadarca marca o início, e vem da reativação do eixo HHG — "re" porque o eixo já funcionou na minipuberdade dos primeiros meses de vida e entrou em latência depois.' },
          { t: 'A gonadarca, por ativação inédita do eixo gonadal nunca antes funcionante', correct: false, why: 'Acerta o evento (gonadarca) mas erra o mecanismo: não é "ativação inédita de eixo nunca funcionante" — a minipuberdade prova que ele já funcionou; é a pegadinha exata da página.' },
          { t: 'A adrenarca, por reativação do eixo gonadal', correct: false, why: 'Embaralha tudo — atribui à adrenarca a reativação de um eixo (gonadal) que não é o dela.' },
        ]
      },
      {
        stem: '(Verdadeiro ou Falso) "Antes da puberdade, o eixo hipotálamo-hipófise-gonadal nunca havia funcionado; a puberdade representa sua primeira ativação."',
        tf: true,
        alts: [
          { t: 'Verdadeiro', correct: false, why: 'Cai na intuição de que a puberdade é o "primeiro evento" do eixo, ignorando o fenômeno neonatal da minipuberdade — exatamente o detalhe que separa quem decorou "ativação" de quem entendeu "reativação".' },
          { t: 'Falso', correct: true, why: 'Certa. O eixo HHG já funcionou na minipuberdade — nos primeiros meses de vida pode estar parcialmente ativado — e só depois entra em latência na infância, religando na puberdade. Por isso o termo correto é reativação.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 3 — E1 Pergunta central ===================== */
  // Página 3 — Estratégia: E1 — Pergunta central
  P.push(page('p3', 3, `
    ${tag('hhg', 'Eixo HHG · do GnRH pulsátil à gônada')}
    ${chips(['GnRH pulsátil', 'LH + FSH', 'volume gonadal', 'esteroides sexuais', 'gonadarca deflagra'])}

    <section class="opener opener--question" aria-label="Pergunta de abertura">
      <span class="opener__question-mark" aria-hidden="true">?</span>
      <p class="opener__text">O que precisa começar a <strong>pulsar</strong> no hipotálamo para que ovário e testículo despertem e produzam seus hormônios — e por que, se esse estímulo fosse contínuo em vez de pulsátil, a puberdade simplesmente não aconteceria?</p>
    </section>

    <h1 class="page-title">O eixo gonadal: pulso a pulso até a gônada acordar</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">Começa no hipotálamo: o GnRH pulsátil</h3>
        <p>A reativação do eixo HHG começa no <span class="term">hipotálamo</span>. Num determinado momento da infância, por mecanismos ainda não completamente esclarecidos, o hipotálamo inicia a secreção do <span class="term">GnRH</span> (hormônio liberador de gonadotrofinas). E aqui está o conceito-chave, o que a prova adora: a secreção do GnRH é <span class="hl-good">pulsátil</span>, não contínua. Os pulsos vão <strong>aumentando em frequência e em amplitude</strong> ao longo do tempo, e é justamente esse padrão pulsátil — não a mera presença do hormônio — que é capaz de estimular a resposta da hipófise. Fixe: <strong>GnRH pulsátil, com pulsos crescentes</strong>. (Essa exigência de pulsatilidade tem até consequência terapêutica, mas o que cai é o conceito: pulsátil estimula, contínuo não.)</p>

        <h3 class="topic-h">A hipófise responde: LH e FSH</h3>
        <p>A hipófise, recebendo os pulsos crescentes de GnRH, responde produzindo suas <span class="term">gonadotrofinas</span>. O nome diz o que elas fazem: <strong>gonado-trofina</strong> = hormônio que promove o <strong>crescimento/trofismo das gônadas</strong>. São duas — <span class="term">LH</span> (hormônio luteinizante) e <span class="term">FSH</span> (hormônio folículo-estimulante). LH e FSH caem na corrente e vão agir nas gônadas, femininas e masculinas: agem nos <strong>ovários</strong> e nos <strong>testículos</strong>. Esse estímulo gonadotrófico é o elo que liga o cérebro à gônada.</p>

        <h3 class="topic-h">As gônadas respondem: volume + esteroides sexuais</h3>
        <p>A gônada responde ao estímulo de LH/FSH de <strong>duas formas</strong>, e as duas importam. Primeira: <span class="hl-good">aumento do volume gonadal</span> — as gônadas proliferam suas estruturas internas e <strong>aumentam de tamanho</strong> (esse aumento, no testículo, será o primeiro sinal clínico mensurável da puberdade masculina — volta adiante). Segunda: produção dos <span class="term">esteroides sexuais</span> — nos testículos inicia-se a produção de <strong>testosterona</strong>; nos ovários, a de <strong>estrogênios</strong>. Esses esteroides então agem em diversos tecidos periféricos e são responsáveis por boa parte das modificações do desenvolvimento puberal (mamas, pelos, voz, estirão). Em resumo da cascata: GnRH pulsátil → LH/FSH → gônada cresce <strong>e</strong> produz esteroide → esteroide transforma o corpo.</p>

        <h3 class="topic-h">Fechando o eixo: a gonadarca deflagra a puberdade</h3>
        <p>Amarrando: a <span class="hl-good">gonadarca</span> é, de fato, o grande evento hormonal que <strong>deflagra o início da puberdade</strong>. Toda a clínica que vem depois — telarca, aumento testicular, estirão — é a manifestação periférica dessa cascata que começou com um punhado de pulsos de GnRH no hipotálamo. Entender o eixo é o que permite, mais à frente, ler cada sinal de volta até sua origem: viu telarca, pense estrogênio ovariano, pense gonadarca, pense eixo HHG religado.</p>
      </div>
    </div>

    ${svgPiso('S-cascataHHG', { caption: 'a cascata do eixo HHG — clique em cada andar e ele acende o próximo: Hipotálamo (GnRH pulsátil, pulsos crescendo) → Hipófise (LH + FSH) → Gônadas (ovário e testículo, mesmo tamanho de quadro) → duas saídas: ↑ volume gonadal e esteroides sexuais (estrogênio / testosterona). O step-through é o próprio raciocínio.', hint: 'Clique em cada órgão, ou Tab + Enter; cada nível acende a etapa seguinte.' })}

    ${svgPiso('S-pulsos', { caption: 'os pulsos de GnRH — traçado ao longo do tempo, com amplitude e frequência crescendo da esquerda para a direita. A própria forma fixa o conceito-âncora: pulsátil estimula, contínuo não. Alinha-se ao nó "GnRH" da cascata acima.', hint: 'A curva crescente é a pista visual da pulsatilidade.', doc: true })}

    ${med({
      file: 'p3-eixo-hhg-gonadal-controle-hormonal.jpg',
      alt: 'Diagrama do eixo hipotálamo-hipófise-gonadal nos dois sexos, mostrando o hipotálamo (GnRH), a hipófise (LH e FSH), as gônadas e as alças de retroalimentação (feedback).',
      light: true,
      titulo: 'Referência de livro —',
      achado: 'o <strong>eixo hipotálamo-hipófise-gonadal (HHG)</strong> com as alças de <strong>feedback</strong> nos dois sexos — GnRH → LH/FSH → gônada → esteroide, e o retorno regulatório que a cascata interativa não detalha. Confronte com o passo a passo acima.',
      fonte: 'Rajendra Prabhune, via Wikimedia Commons',
      licenca: 'CC BY-SA 4.0'
    })}

    ${collapsible('Quer ver a cascata HHG passo a passo?', `
      <div class="prose">
        <p>Aprofundamento opcional — quem já domina não precisa abrir.</p>
        <ul>
          <li><strong>Hipotálamo</strong> — inicia a secreção de <span class="term">GnRH</span> em <strong>pulsos</strong>, cuja <strong>frequência e amplitude crescem</strong> ao longo do tempo. É o padrão pulsátil (não a presença do hormônio) que sinaliza adiante.</li>
          <li><strong>Hipófise (adeno-hipófise)</strong> — recebe os pulsos crescentes e responde liberando as <strong>gonadotrofinas LH e FSH</strong> na circulação.</li>
          <li><strong>Gônada</strong> — LH e FSH chegam a <strong>ovários e testículos</strong> e produzem duas respostas: (1) <strong>↑ volume gonadal</strong> (proliferação das estruturas internas) e (2) produção de <strong>esteroides sexuais</strong> — testosterona no testículo, estrogênios no ovário.</li>
          <li><strong>Periferia</strong> — os esteroides sexuais agem nos tecidos-alvo e produzem as modificações puberais (mama, pelo, estirão, voz, composição corporal).</li>
        </ul>
      </div>
    `)}

    <aside class="op-summary">
      <p class="op-summary__label">Regra de ouro</p>
      <p><strong>Pulsátil estimula; contínuo, não.</strong> A pulsatilidade crescente do GnRH é o gatilho que liga toda a cascata — é o conceito-âncora do eixo HHG.</p>
    </aside>

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>Ler o eixo de trás para frente é o que transforma um achado isolado em raciocínio: aumento testicular → estímulo gonadotrófico (LH/FSH) → eixo HHG ativo → puberdade começou. Esse encadeamento é o que vai justificar, no menino, por que o testículo ≥ 4 mL "prova" o início da puberdade.</p>
    </aside>

    ${quiz('p3', 'A cascata HHG e o conceito-âncora da pulsatilidade.', [
      {
        stem: 'Por que a secreção de GnRH precisa ser pulsátil para deflagrar a puberdade?',
        alts: [
          { t: 'Porque o padrão pulsátil crescente é o que estimula a resposta da hipófise; estímulo contínuo não a desencadeia', correct: true, why: 'Certa. É o padrão pulsátil, com frequência e amplitude crescentes, que estimula a hipófise a liberar gonadotrofinas — um estímulo contínuo, paradoxalmente, não desencadeia (e até dessensibiliza) a resposta.' },
          { t: 'Porque o GnRH só é produzido em pulsos por limitação anatômica do hipotálamo', correct: false, why: 'Inventa uma "limitação anatômica" — a pulsatilidade é um mecanismo de sinalização, não uma falha estrutural.' },
          { t: 'Porque os pulsos evitam que o LH e o FSH sejam destruídos no sangue', correct: false, why: 'Cria uma proteção contra degradação que não existe nesse contexto — o ponto é o estímulo da hipófise, não a meia-vida do LH/FSH.' },
          { t: 'Porque a pulsatilidade aumenta diretamente o volume gonadal, sem passar pela hipófise', correct: false, why: 'Pula a hipófise, que é justamente o alvo do GnRH — sem LH/FSH não há resposta gonadal; quebra a cascata no meio.' },
        ]
      },
      {
        stem: 'Quando LH e FSH atingem as gônadas na puberdade, qual é a dupla de respostas esperada?',
        alts: [
          { t: 'Apenas produção de esteroides sexuais, sem mudança de volume', correct: false, why: 'Fica com metade da resposta — e perder o "↑ volume" custa caro, porque é ele que vira o marcador clínico do início da puberdade masculina (testículo ≥ 4 mL).' },
          { t: 'Apenas aumento de volume gonadal, sem produção hormonal', correct: false, why: 'A outra metade incompleta — a gônada também produz esteroide (testosterona/estrogênio), que transforma o corpo.' },
          { t: 'Aumento do volume gonadal e produção de esteroides sexuais (testosterona/estrogênio)', correct: true, why: 'Certa. A gônada responde de duas formas simultâneas: cresce (↑ volume) e produz esteroide (testosterona no testículo, estrogênio no ovário).' },
          { t: 'Redução do volume gonadal com aumento da produção de cortisol', correct: false, why: 'Erra tudo: o volume aumenta (não reduz) e o cortisol é produto do eixo adrenal (HHA), não do gonadal; confunde os dois eixos.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 4 — E7 Comparação chocante ===================== */
  // Página 4 — Estratégia: E7 — Comparação chocante
  P.push(page('p4', 4, `
    ${tag('hha', 'Eixo HHA · a adrenal que muda de assunto')}
    ${chips(['adrenarca = modificação', 'zona reticular', 'DHEA · S-DHEA · androstenediona', 'pubarca', 'gonadarca ≠ adrenarca'])}

    <section class="opener opener--vs" aria-label="Comparação de abertura">
      <div class="opener__vs-grid">
        <div class="opener__vs-side">
          <h3>O que parece</h3>
          <p>"A adrenal <strong>liga</strong> na puberdade, como o eixo gonadal — um eixo novo que ativa."</p>
        </div>
        <div class="opener__vs-divider" aria-hidden="true">vs</div>
        <div class="opener__vs-side">
          <h3>O que é</h3>
          <p>A adrenal já produz hormônio <strong>desde a vida fetal</strong> (cortisol). Na puberdade ela só <strong>muda o padrão</strong> — passa a secretar androgênio.</p>
        </div>
      </div>
      <p class="opener__vs-asterisk">A adrenal já produz hormônio desde antes de nascer. Então o que muda nela, a ponto de virar um dos dois grandes eventos? E por que, apesar de andar junto da gonadarca no tempo, ela é um evento completamente distinto?</p>
    </section>

    <h1 class="page-title">Adrenarca: não é o eixo que liga, é a adrenal que muda de assunto</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">O eixo já existia: o que muda é o padrão</h3>
        <p>A <span class="term">adrenarca</span> resulta da <span class="hl-warn">modificação do padrão de resposta</span> do eixo <span class="term">hipotálamo-hipófise-adrenal (HHA)</span>. E aqui repete-se a pegadinha do "ativação", agora do outro lado: cuidado para <strong>não</strong> dizer que o eixo HHA "ativa" na puberdade. O eixo HHA <strong>existe e funciona desde a vida fetal</strong> — desde sempre há produção de cortisol em resposta a ele. O que ocorre na puberdade <strong>não é o surgimento do eixo</strong>, e sim uma <strong>modificação do seu padrão de resposta</strong>. Durante os primeiros anos de vida, o córtex da adrenal secreta essencialmente <strong>cortisol e mineralocorticoide</strong>. A adrenarca é a adrenal passando a fazer algo <strong>a mais</strong>, não algo do zero.</p>

        <h3 class="topic-h">A zona reticular amadurece e secreta androgênio</h3>
        <p>O "algo a mais" tem endereço. Num determinado momento ocorre a <span class="hl-good">maturação de uma zona específica do córtex adrenal — a zona reticular</span>. Quando a zona reticular amadurece, o córtex passa a responder ao estímulo central secretando <strong>androgênios</strong> — e <strong>essa é a essência da adrenarca</strong>. Os grandes androgênios secretados são três: <span class="term">DHEA (deidroepiandrosterona), sulfato de DHEA (S-DHEA, a forma sulfatada) e androstenediona</span>, com destaque clínico para <strong>DHEA e S-DHEA</strong>. Clinicamente, esses androgênios da adrenal são os responsáveis pela <span class="term">penificação (pubarca)</span> — informação que será o elo da página da menina: na menina, o pelo pubiano vem da adrenal, não do ovário.</p>

        <h3 class="topic-h">Dois eventos distintos, mesmo momento</h3>
        <p>Agora a diferenciação entre os dois eixos. <strong>Adrenarca e gonadarca são dois eventos distintos, com eixos distintos</strong>: a adrenarca é secreção de <strong>androgênio pela adrenal</strong> (eixo HHA); a gonadarca é secreção dos <strong>esteroides sexuais gonadais</strong> (eixo HHG). São motores diferentes, em órgãos diferentes, comandados por eixos diferentes. <strong>Apesar disso</strong>, há inter-relação: do ponto de vista <strong>temporal</strong>, acontecem <strong>no mesmo momento da vida</strong> e, juntos, deflagram o início da puberdade. A armadilha de prova é exatamente essa coincidência temporal — ela seduz o aluno a fundir os dois num só. Não funda: mesmo tempo, eixos distintos.</p>
      </div>
    </div>

    <aside class="op-summary">
      <p class="op-summary__label">Regra de ouro</p>
      <p><strong>Gonadarca ≠ adrenarca.</strong> Eixos distintos (HHG × HHA), órgãos distintos (gônada × adrenal), hormônios distintos (esteroides sexuais × androgênios adrenais) — coincidem só no <strong>tempo</strong>. Quem funde os dois erra a questão que separa "marcador da gonadarca" de "marcador da adrenarca".</p>
    </aside>

    <aside class="trap">
      <span class="trap__icon" aria-hidden="true">!</span>
      <div class="trap__body">
        <p class="trap__label">Pegadinha de prova</p>
        <p class="trap__text"><strong>"Ativação" é palavra perigosa nos dois eixos.</strong> No HHG, o correto é <strong>re</strong>ativação (minipuberdade). No HHA, não é ativação nenhuma — é <strong>modificação do padrão</strong>, porque o eixo adrenal funciona <strong>desde a vida fetal</strong> (já produzia cortisol). A alternativa que diz "ativação do eixo adrenal na puberdade" ignora a história fetal do eixo.</p>
      </div>
    </aside>

    ${svgPiso('S-cascataHHA', { caption: 'a cascata do eixo HHA — mesmo estilo e largura da cascata HHG (página anterior) para comparação direta: Hipotálamo/Hipófise → Adrenal (corte das zonas, com a zona reticular acesa) → androgênios (DHEA, S-DHEA, androstenediona). O paralelismo visual é o recurso didático: dois eixos lado a lado.', hint: 'Hotspot na zona reticular: é onde amadurece e secreta androgênio — a essência da adrenarca.' })}

    ${svgPiso('S-tabelaGonAdr', { caption: 'a tabela comparativa Gonadarca × Adrenarca — duas colunas espelhadas, linha a linha: Eixo (HHG / HHA), Órgão-alvo (gônada / adrenal–zona reticular), Hormônios (estrogênio·testosterona / DHEA·S-DHEA·androstenediona), Marcador clínico (telarca·aumento testicular / pubarca). Os dois eixos lado a lado reforçam "distintos, mesmo tempo".', hint: 'As colunas espelhadas isolam o que muda entre os dois eixos.', doc: true })}

    ${med({
      file: 'p4-histologia-adrenal-zona-reticular.jpg',
      alt: 'Corte histológico do córtex adrenal corado por hematoxilina-eosina, mostrando, da cápsula para a medula, as zonas glomerulosa, fasciculada e reticular.',
      titulo: 'Histologia real —',
      achado: '<strong>córtex adrenal ao microscópio (H&amp;E)</strong>. Da cápsula à medula: <strong>glomerulosa, fasciculada e reticular</strong> — é a <span class="hl-good">reticular</span> (faixa profunda junto à medula) que amadurece na adrenarca e secreta androgênios (DHEA, S-DHEA, androstenediona). É o tecido por trás do hotspot "zona reticular" do esquema acima.',
      fonte: 'Veeresh/AmonNonza, via Wikimedia Commons',
      licenca: 'CC BY-SA 4.0'
    })}

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>Saber que a pubarca é marcador da <strong>adrenarca</strong> (androgênio adrenal) e a telarca/aumento testicular são marcadores da <strong>gonadarca</strong> (esteroide gonadal) é o que permite ler um exame físico em camadas. Uma menina com pubarca isolada e sem telarca, por exemplo, fala mais de adrenal do que de ovário — leitura que só existe se os dois eixos estiverem separados na cabeça.</p>
    </aside>

    ${quiz('p4', 'O mecanismo da adrenarca e a separação dos dois eixos.', [
      {
        stem: 'Qual afirmação sobre a adrenarca está CORRETA?',
        alts: [
          { t: 'Resulta da ativação inédita do eixo hipotálamo-hipófise-adrenal na puberdade', correct: false, why: 'Usa "ativação inédita" — erro: o eixo HHA funciona desde a vida fetal (produzindo cortisol); o que muda é o padrão de resposta, não o surgimento do eixo.' },
          { t: 'Resulta da maturação da zona reticular adrenal, que passa a secretar androgênios', correct: true, why: 'Certa. A essência da adrenarca é a maturação da zona reticular do córtex adrenal, que então passa a secretar androgênios (DHEA, S-DHEA, androstenediona).' },
          { t: 'É o mesmo evento que a gonadarca, apenas com outro nome', correct: false, why: 'Funde os dois eventos pela coincidência temporal — é a armadilha-mãe da página: são eixos, órgãos e hormônios distintos.' },
          { t: 'Resulta da secreção de estrogênio e testosterona pela adrenal', correct: false, why: 'Troca os hormônios — estrogênio/testosterona são esteroides sexuais gonadais (gonadarca); a adrenal secreta androgênios adrenais; embaralha os produtos dos dois eixos.' },
        ]
      },
      {
        stem: 'Numa menina, o surgimento de pelos pubianos (pubarca) é o marcador clínico de qual evento, e de onde vêm os androgênios responsáveis?',
        alts: [
          { t: 'Da gonadarca; androgênios produzidos pelos ovários', correct: false, why: 'Acerta a fonte errada: o ovário produz estrogênio (telarca), não os androgênios da pubarca; e o evento da pubarca é adrenarca, não gonadarca.' },
          { t: 'Da adrenarca; androgênios produzidos pela adrenal (zona reticular)', correct: true, why: 'Certa. A penificação depende de androgênios, e na menina esses androgênios vêm da adrenal (zona reticular) — por isso a pubarca é o marcador clínico da adrenarca.' },
          { t: 'Da gonadarca; estrogênios produzidos pelos ovários', correct: false, why: 'Erra evento e hormônio — estrogênio ovariano marca a telarca, não a pubarca.' },
          { t: 'Da adrenarca; estrogênios produzidos pela adrenal', correct: false, why: 'Acerta o evento (adrenarca) mas erra o hormônio — a adrenal secreta androgênio, não estrogênio.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 5 — E4 Achado típico / pegadinha · HERÓI H2 ===================== */
  // Página 5 — Estratégia: E4 — Achado típico / pegadinha
  P.push(page('p5', 5, `
    ${tag('grow', 'Crescimento · 3 fases e o número 8/9')}
    ${chips(['3 fases', 'desaceleração peripuberal', 'pico ♀ M3 8-9', 'pico ♂ G4 9-10', 'número mágico 8/9'])}

    <aside class="opener opener--trap" aria-label="Achado de abertura">
      <svg class="opener__trap-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>
      <div class="opener__trap-body">
        <p class="opener__trap-tag">A freada que assusta</p>
        <p class="opener__trap-text">O crescimento dá uma <strong>freada</strong> logo antes de disparar — uma criança que vinha crescendo bem desacelera, e isso assusta. Mas pode ser o sinal de que a puberdade está chegando. Como saber se aquela freada é a normal pré-puberal ou o começo de um problema? E qual é o número que separa o estirão da menina do estirão do menino?</p>
      </div>
    </aside>

    <h1 class="page-title">O crescimento em três tempos, e o número que decide o sexo do estirão</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">As três fases do crescimento puberal</h3>
        <p>Na puberdade, além dos caracteres sexuais secundários, o <strong>crescimento</strong> muda — ganha-se grande parte da estatura adulta e há grande aumento de massa muscular. Esse crescimento se separa em <strong>três fases</strong>, e entender as três é o que permite ler uma curva de velocidade de crescimento sem se assustar à toa. São elas: a <span class="term">peripuberal</span> (antes da puberdade, com desaceleração), o <span class="term">estirão puberal</span> (aceleração até o pico) e a <span class="term">fase pós-pico</span> (desaceleração até o fechamento). Uma a uma:</p>

        <h3 class="topic-h">A fase ignorada: a desaceleração peripuberal</h3>
        <p>A primeira fase é a mais esquecida — e por isso a mais cobrada: o <span class="term">crescimento peripuberal</span>, que ocorre <strong>logo ANTES</strong> do início da puberdade, não depois. Nela há uma <span class="hl-warn">discreta desaceleração</span> do crescimento, como se o organismo tomasse fôlego antes de acelerar. Para situar os números: o <strong>escolar</strong> cresce, no mínimo, cerca de <strong>5 cm/ano</strong> para ser considerado normal (faixa de 5-7 cm/ano por fonte); na fase <strong>peripuberal</strong>, a velocidade pode cair um pouco — para <strong>~4-5 cm/ano</strong>, às vezes um pouco menos. Agora a pegadinha de ouro: <span class="hl-bad">se na prova a velocidade de crescimento está diminuindo, sempre se preocupe e investigue</span>. Só dá para ter certeza de que aquilo foi a desaceleração pré-puberal <strong>de forma retrospectiva</strong> — isto é, você viu a velocidade cair e, <strong>depois</strong>, viu a puberdade começar. Antes disso, desaceleração é sinal de alerta, não de tranquilização.</p>

        <h3 class="topic-h">O estirão e o pico: por que M3 na menina, G4 no menino</h3>
        <p>A segunda fase é o <span class="term">estirão puberal</span>: a velocidade de crescimento vai <strong>aumentando</strong> até atingir um máximo — o <strong>pico de crescimento</strong>. E os números do pico são o coração da página: no <strong>sexo feminino</strong>, o pico cursa com velocidade de <span class="hl-good">8 a 9 cm/ano</span> e acontece no estágio mamário <strong>M3</strong>; no <strong>sexo masculino</strong>, o pico é um pouco maior — <span class="hl-good">9 a 10 cm/ano</span> — e acontece no estágio genital <strong>G4</strong>. Repare o <strong>descompasso</strong>: a menina atinge o pico <strong>mais cedo</strong> (em M3, relativamente no começo da puberdade dela) e o menino <strong>mais tarde</strong> (em G4, mais adiante na puberdade dele) e com <strong>velocidade maior</strong>. A terceira fase vem depois do pico: o crescimento <strong>segue, mas desacelerado</strong> — não se passa de 9 cm/ano para zero de uma hora para outra. A criança continua crescendo de forma desacelerada até a <span class="term">substituição de todas as cartilagens de crescimento e o fechamento epifisário</span>, quando para de crescer.</p>

        <h3 class="topic-h">O número mágico 8/9 e por que o homem fica mais alto</h3>
        <p>Para amarrar tudo, a casa tem um mnemônico: <strong>o número mágico da puberdade feminina é o 8; o da masculina é o 9</strong>. A menina <strong>começa</strong> a puberdade aos <strong>8 anos</strong> e o pico do estirão dela fica em torno de <strong>8</strong> (8-9 cm/ano); o menino <strong>começa</strong> aos <strong>9 anos</strong> e o pico dele em torno de <strong>9</strong> (9-10 cm/ano). E é justamente esse arranjo que explica uma das razões pelas quais os homens, em média, ficam <strong>~13 cm mais altos</strong> que as mulheres: o pico masculino é <strong>mais tardio</strong> (mais tempo crescendo antes dele) <strong>e</strong> com <strong>velocidade maior</strong>. Mais tempo + mais velocidade = mais centímetros.</p>
      </div>
    </div>

    <aside class="opener opener--mnemonic" aria-label="Mnemônico de fixação">
      <p class="opener__mnemonic-tag">Mnemônico-âncora</p>
      <p class="opener__mnemonic-quote"><strong>♀ = 8 · ♂ = 9.</strong> Começa aos 8/9 · pico 8-9 / 9-10 cm/ano · pico em <strong>M3</strong> (♀) / <strong>G4</strong> (♂).</p>
    </aside>

    ${svgHero('p5', { caption: 'a curva dupla de velocidade de crescimento — dois painéis: macro (a curva inteira, cm/ano × idade, com as três fases — vale peripuberal ~4-5 cm/ano → subida → pico → desaceleração até o fechamento epifisário) e zoom (o descompasso dos dois picos). Duas curvas sobrepostas: feminina (pico 8-9 cm/ano em M3, mais cedo) e masculina (pico 9-10 cm/ano em G4, mais tarde e mais alto). Dialoga com a curva de velocidade da aula 01 (coerência da plataforma). É o que torna a dimensão crescimento visualmente dedutível: quem só olha a figura lê o 8/9 e o descompasso dos picos.' })}

    ${svgPiso('S-selos89', { caption: 'os dois selos do número mágico — ♀ = 8 e ♂ = 9, com a frase "começa aos 8/9 · pico 8-9 / 9-10 cm/ano". Reaparecem como marca-d\'água do conceito nas páginas de Tanner e no mapa final.', hint: 'Os dois selos pareados fixam o número mágico — abrem a janela de cada sexo.' })}

    ${med({
      file: 'p5-curva-velocidade-crescimento-feminina.jpg',
      alt: 'Curva de velocidade de crescimento em cm por ano ao longo da idade, mostrando o vale peripuberal, o pico do estirão e a desaceleração posterior.',
      light: true,
      titulo: 'Gráfico de referência —',
      achado: 'curva real de <strong>velocidade de crescimento</strong> (cm/ano × idade): o <strong>vale peripuberal</strong> → o <strong>pico</strong> do estirão → a <strong>desaceleração</strong> — as três fases que o herói interativo desenha lado a lado para os dois sexos.',
      fonte: 'Papadimitriou et al., Children 2022;9:790 (MDPI)',
      licenca: 'CC BY 4.0'
    })}

    ${notaBanca('Para a prova brasileira, <strong>mantenha o pico ♂ em G4 e 9-10 cm/ano</strong> (gabarito BR). Algumas fontes ampliam a velocidade a 10-12 cm/ano e situam o pico entre G3-G5 — citação opcional, mas a resposta-padrão é <strong>G4 / 9-10</strong>. A velocidade peripuberal "~4-5 cm/ano" é <strong>representação</strong>, não cutoff rígido (diferente do ≥ 4 mL testicular, que é cutoff de verdade).')}

    <aside class="op-summary">
      <p class="op-summary__label">Regra de ouro</p>
      <p><strong>Velocidade de crescimento caindo = investigar, sempre.</strong> Só se chama "desaceleração pré-puberal normal" <strong>retrospectivamente</strong> — depois de ver a puberdade começar. Prospectivamente, a freada é alerta.</p>
    </aside>

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>A queixa que mais aparece em ambulatório de crescimento é "minha filha parou de crescer" — e muitas vezes é a desaceleração peripuberal normal. Mas o aluno avançado <strong>não tranquiliza prospectivamente</strong>: investiga a desaceleração, e só a chama de normal quando a puberdade aparece em seguida. É a diferença entre acertar por método e por sorte.</p>
    </aside>

    ${quiz('p5', 'Os picos por sexo e a regra da desaceleração.', [
      {
        stem: 'Sobre o pico de velocidade de crescimento na puberdade, qual afirmação está CORRETA?',
        alts: [
          { t: 'Ocorre em M3 na menina (8-9 cm/ano) e em G4 no menino (9-10 cm/ano)', correct: true, why: 'Certa. Os números-âncora: pico ♀ em M3, 8-9 cm/ano (o "8"); pico ♂ em G4, 9-10 cm/ano (o "9").' },
          { t: 'Ocorre em M4 na menina e em G2 no menino', correct: false, why: 'Erra os dois estágios — M4 na menina é quando ocorre a menarca (já desacelerando), e G2 no menino é só o início (sem aceleração ainda); troca o pico pelos marcos vizinhos.' },
          { t: 'Ocorre simultaneamente nos dois sexos, no mesmo estágio', correct: false, why: 'Ignora o descompasso entre os sexos, que é o ponto central.' },
          { t: 'É mais precoce e mais intenso no menino que na menina', correct: false, why: 'Inverte: o pico masculino é mais tardio (não mais precoce) — embora mais intenso; é justamente a inversão que explica o homem ficar ~13 cm mais alto (mais tempo crescendo + mais velocidade).' },
        ]
      },
      {
        stem: 'Uma criança em acompanhamento apresenta queda na velocidade de crescimento (de ~6 para ~4,5 cm/ano). Qual a conduta de raciocínio mais correta?',
        alts: [
          { t: 'Tranquilizar: é certamente a desaceleração pré-puberal normal', correct: false, why: 'Tranquiliza no escuro: pode até ser o peripuberal normal, mas afirmar isso antes de ver a puberdade chegar é assumir o melhor cenário sem confirmá-lo — o erro que a banca pune.' },
          { t: 'Investigar a desaceleração; só se confirma como pré-puberal retrospectivamente', correct: true, why: 'Certa. A regra de ouro: velocidade caindo = investigar. A desaceleração peripuberal é real, mas só se confirma retrospectivamente — depois de ver a puberdade começar.' },
          { t: 'Iniciar hormônio de crescimento imediatamente', correct: false, why: 'Salta para tratamento sem investigação nem diagnóstico — conduta desproporcional e prematura.' },
          { t: 'Repetir a medida em 5 anos', correct: false, why: 'Abandona o paciente por tempo demais — a velocidade de crescimento se reavalia em meses, não anos; não monitora a curva.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 6 — E4 Achado típico / pegadinha ===================== */
  // Página 6 — Estratégia: E4 — Achado típico / pegadinha
  P.push(page('p6', 6, `
    ${tag('grow', 'Crescimento · dos pés para o centro')}
    ${chips(['centrípeto', 'distal → proximal', 'o sapato aperta', 'massa magra ♂', 'gordura ginecoide ♀'])}

    <aside class="opener opener--trap" aria-label="Achado de abertura">
      <svg class="opener__trap-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>
      <div class="opener__trap-body">
        <p class="opener__trap-tag">O sinal que parece banal</p>
        <p class="opener__trap-text">Uma adolescente reclama que o sapato, que servia mês passado, agora aperta — e os pais acham que comprou o número errado. Pode ser o <strong>primeiro sinal palpável</strong> de que a puberdade chegou. Por que o pé denuncia a puberdade antes de tudo?</p>
      </div>
    </aside>

    <h1 class="page-title">O crescimento desproporcional: dos pés para o centro</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">Crescimento centrípeto: membros antes do tronco</h3>
        <p>A primeira característica do crescimento puberal é que ele é <span class="term">centrípeto</span> — traduzindo: primeiro crescem os <strong>membros</strong>, depois cresce o <strong>tronco</strong>. É por isso que o adolescente passa por aquela fase de aparência <strong>desproporcional</strong>, "todo perna e braço": os membros crescem desproporcionalmente em relação ao tronco, e só depois a proporção se ajusta. Não é defeito nem doença — é a ordem normal do crescimento puberal. Quem não sabe disso interpreta a desproporção transitória como problema.</p>

        <h3 class="topic-h">Dentro do membro, distal antes de proximal (o sapato)</h3>
        <p>E dentro dos próprios membros há uma segunda ordem: o crescimento tem sentido <span class="term">distal → proximal</span> — primeiro crescem <strong>mãos e pés</strong>, depois braços e pernas. Daí o marcador prático mais simpático da puberdade: <span class="hl-good">o sapato começa a ficar apertado</span> porque o <strong>pé cresce primeiro</strong>. É um sinal precoce, palpável, que não depende de exame especializado — e que a prova adora como pista contextual ("a mãe nota que precisou trocar o número do calçado"). Some as duas direções: o crescimento vai <strong>de fora para dentro</strong> (membros → tronco) e, dentro do membro, <strong>de baixo para cima</strong> (mão/pé → braço/perna).</p>

        <h3 class="topic-h">Composição corporal: por que os corpos divergem</h3>
        <p>A segunda característica é a mudança na <span class="term">composição corporal</span>, e ela diverge entre os sexos — é o que transforma duas crianças parecidas em dois adultos visivelmente diferentes. No <strong>sexo masculino</strong>, pela ação dos <strong>androgênios/testosterona</strong>, há aumento de <strong>massa magra / massa muscular</strong>. No <strong>sexo feminino</strong>, há aumento do <strong>percentual de gordura</strong>, com <strong>deposição em formato ginecoide</strong> (quadris, coxas). A ilustração clássica: <strong>antes da puberdade, duas crianças de costas têm a mesma curvatura corporal</strong> — sem olhar a genitália, não dá para distinguir menino de menina. <strong>Depois da puberdade</strong>, há diferença nítida de composição corporal entre os sexos, ligada ao percentual e à distribuição da gordura. A divergência é hormonal: testosterona puxa para músculo, estrogênio puxa para gordura ginecoide.</p>
      </div>
    </div>

    ${svgPiso('S-vetores', { caption: 'o vetor do crescimento puberal — silhueta neutra com setas grandes nos membros e menores no tronco (centrípeto), e dentro dos membros um gradiente distal→proximal (mãos/pés acendem primeiro). O ícone do sapato apertado marca o primeiro sinal palpável.', hint: 'Hotspot no ícone do sapato: "primeiro sinal palpável" — o pé cresce primeiro.' })}

    ${svgPiso('S-composicao', { caption: 'a divergência de composição corporal — duas silhuetas neutras de mesma escala: ♂ com massa magra/muscular destacada (androgênios → músculo), ♀ com deposição ginecoide de gordura destacada (estrogênios → gordura). Antes da puberdade, indistinguíveis; depois, a diferença é nítida.', hint: 'Passe o mouse por cada lado: o realce de massa vs gordura é a pista.' })}

    ${med({
      file: 'p6-proporcoes-corporais-idade-crescimento.png',
      alt: 'Sequência de silhuetas humanas mostrando a mudança das proporções corporais com a idade: a cabeça encolhe proporcionalmente e os membros se alongam do recém-nascido ao adulto.',
      light: true,
      titulo: 'Esquema de referência —',
      achado: 'a mudança das <strong>proporções corporais com a idade</strong> — a cabeça encolhe proporcionalmente e os <strong>membros alongam</strong>. É a base do crescimento <strong>centrípeto</strong> e da desproporção transitória "todo perna e braço" do vetor interativo acima.',
      fonte: 'Ephert / Clusternote, via Wikimedia Commons',
      licenca: 'CC BY-SA 4.0'
    })}

    <aside class="op-summary">
      <p class="op-summary__label">Regra de ouro</p>
      <p>O crescimento puberal é <strong>centrípeto</strong> (membros → tronco) e, dentro do membro, <strong>distal → proximal</strong> (pé/mão primeiro). Por isso <strong>o sapato apertando</strong> pode ser o primeiro sinal — e a desproporção "braço e perna grandes" é normal e transitória.</p>
    </aside>

    <aside class="trap">
      <span class="trap__icon" aria-hidden="true">!</span>
      <div class="trap__body">
        <p class="trap__label">Pegadinha de prova</p>
        <p class="trap__text">A fase <strong>desproporcional</strong> do adolescente (membros longos em relação ao tronco) é <strong>fisiológica e transitória</strong> — não é marfanoide nem patológica por si só. A alternativa que rotula a desproporção puberal normal como sinal de doença é a incorreta. O contexto (idade, estágio de Tanner, ausência de outros sinais) é que decide.</p>
      </div>
    </aside>

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>Reconhecer que a desproporção e o sapato apertando são <strong>normais</strong> evita encaminhamentos desnecessários e tranquiliza com base em fisiologia, não em achismo. E saber que a composição corporal diverge por hormônio ajuda a entender por que o mesmo treino e a mesma dieta produzem corpos diferentes em meninos e meninas na adolescência.</p>
    </aside>

    ${quiz('p6', 'A direção do crescimento e a divergência de composição corporal.', [
      {
        stem: 'Qual sequência descreve corretamente a direção do crescimento puberal?',
        alts: [
          { t: 'Tronco antes dos membros; dentro do membro, proximal antes de distal', correct: false, why: 'Inverte as duas direções de uma vez.' },
          { t: 'Membros antes do tronco; dentro do membro, distal antes de proximal', correct: true, why: 'Certa. São duas direções sobrepostas: centrípeto (membros → tronco) e, dentro do membro, distal → proximal (pé/mão → perna/braço) — por isso o pé/sapato denuncia primeiro.' },
          { t: 'Tudo cresce simultaneamente e proporcionalmente', correct: false, why: 'Nega a desproporção transitória, que é justamente o achado característico.' },
          { t: 'Membros antes do tronco; dentro do membro, proximal antes de distal', correct: false, why: 'Acerta a primeira direção (membros antes) mas erra a segunda (proximal antes de distal) — e essa metade errada apaga o sinal do sapato.' },
        ]
      },
      {
        stem: 'Sobre a composição corporal na puberdade, qual associação está CORRETA?',
        alts: [
          { t: 'Testosterona → aumento de gordura ginecoide; estrogênio → massa magra', correct: false, why: 'Inverte os dois hormônios — é a pegadinha exata; "gineco" do ginecoide associa-se ao feminino/estrogênio, não à testosterona.' },
          { t: 'Testosterona → massa magra; estrogênio → gordura em deposição ginecoide', correct: true, why: 'Certa. A divergência é hormonal: testosterona puxa para massa magra/muscular (♂); estrogênio puxa para gordura ginecoide (♀).' },
          { t: 'Ambos os sexos ganham predominantemente massa magra', correct: false, why: 'Apaga a divergência, que é o ponto.' },
          { t: 'Antes da puberdade os corpos já diferem nitidamente em composição entre os sexos', correct: false, why: 'Erra o "antes": antes da puberdade os corpos são indistinguíveis de costas — a diferença nítida surge depois.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 7 — E1 Pergunta central · Mapa de Tanner estreia VAZIO ===================== */
  // Página 7 — Estratégia: E1 — Pergunta central
  P.push(page('p7', 7, `
    ${tag('hhg', 'Sequência ♀ · telarca, pubarca, menarca')}
    ${chips(['janela 8-13', 'telarca = M2', 'pubarca = adrenarca', 'menarca tardia (M4)', 'telarca→menarca 2-2,5a'])}

    <section class="opener opener--question" aria-label="Pergunta de abertura">
      <span class="opener__question-mark" aria-hidden="true">?</span>
      <p class="opener__text">Em que ordem o corpo feminino entrega seus sinais — e por que o mais aguardado de todos, a <strong>menstruação</strong>, é justamente o <strong>último</strong> a chegar, quase no fim da puberdade?</p>
    </section>

    <h1 class="page-title">A ordem feminina: broto, pelo, menstruação — nessa sequência</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">A janela fisiológica: 8 a 13 anos</h3>
        <p>Primeiro, a régua que define o normal: a puberdade feminina é considerada <span class="hl-good">fisiológica quando começa entre 8 e 13 anos</span>. Dela saem duas deduções diretas, que a prova cobra como classificação: puberdade que começa <strong>antes dos 8 anos</strong> é <span class="hl-bad">precoce</span>; puberdade que <strong>não começou aos 13 anos</strong> é <span class="hl-bad">atrasada</span>. (Repare o 8 do número mágico feminino abrindo a janela.) Essa faixa é o pano de fundo de toda a sequência que vem a seguir — cada sinal precisa cair dentro dela para ser fisiológico.</p>

        <h3 class="topic-h">Telarca: o primeiro sinal (com uma pegadinha)</h3>
        <p>O primeiro sinal da puberdade feminina costuma ser a manifestação clínica da <span class="term">gonadarca</span>. Com a gonadarca, os ovários começam a produzir <strong>estrogênios</strong>, e o estrogênio provoca o desenvolvimento das mamas: o surgimento do <strong>broto mamário</strong> se chama <span class="term">telarca</span>, e ela marca o estágio <strong>M2</strong>. A telarca é, portanto, resultado do <strong>aumento dos estrogênios ovarianos</strong>. Mas aqui vem a pegadinha clássica: nas provas, afirma-se sempre que <strong>o primeiro sinal da puberdade feminina é a telarca</strong> — e essa é a resposta esperada. Na <strong>verdade</strong>, porém, <span class="hl-warn">antes da telarca já costuma estar ocorrendo uma aceleração do crescimento</span>; como essa aceleração é difícil de perceber clinicamente, <strong>convencionou-se</strong> dizer que o primeiro sinal é a telarca. Então: na prova, primeiro sinal = telarca; na fisiologia fina, o crescimento já acelerou antes (e ninguém viu).</p>

        <h3 class="topic-h">Pubarca: o marcador da adrenarca</h3>
        <p>O segundo evento é a <span class="term">pubarca</span> — o início da <strong>penificação</strong> genital. A penificação resulta do aumento dos <strong>androgênios</strong> circulantes e, na menina, <strong>esses androgênios vêm da adrenal</strong> (não do ovário). Por isso, a regra que amarra com a página da adrenarca: <strong>quando se identifica pubarca na menina, ela é o marcador clínico da adrenarca</strong> — a adrenal já está produzindo androgênios. Telarca aponta para o ovário (gonadarca/estrogênio); pubarca aponta para a adrenal (adrenarca/androgênio). Dois sinais, dois eixos.</p>

        <h3 class="topic-h">Menarca: o evento tardio</h3>
        <p>O terceiro evento, exclusivo da puberdade feminina e o mais aguardado, é a <span class="term">menarca</span> — a primeira menstruação. E aqui está o ponto: a menarca é um evento <span class="hl-warn">tardio</span>. Logo após ela, a puberdade praticamente <strong>acaba</strong> (caminha-se para o fechamento de todas as epífises) e o corpo infantil já virou adulto. Em números: o intervalo típico entre <strong>telarca e menarca é de 2 a 2,5 anos</strong>, e a menarca em geral ocorre com as mamas já em <strong>M4</strong>. Ou seja, quando a menina menstrua, ela já percorreu a maior parte da puberdade e está na fase de desaceleração do crescimento. A menstruação não é o começo — é quase o fim.</p>
      </div>
    </div>

    ${svgPiso('S-timelineF', { caption: 'a sequência feminina no tempo — TELARCA (M2, estrogênio ovariano; "o crescimento já acelerou antes") → PUBARCA (androgênio da adrenal = marcador da adrenarca) → MENARCA (tardia, M4, "fim próximo da puberdade"). O intervalo telarca→menarca está rotulado em 2-2,5 anos.', hint: 'Hotspot por marco: cada um revela o hormônio responsável; a menarca posicionada no fim fixa "evento tardio".' })}

    ${svgPiso('S-mapaTanner-p7', { caption: 'o Mapa de Tanner — nasce aqui, esqueleto vazio: Estágio (1→5) × achado físico × evento hormonal × marco de crescimento × idade, com apenas a linha M2 = telarca começando a ser preenchida. Ele vai hidratar a cada etapa — linhas femininas, depois masculinas — e fechar completo ao final.', hint: 'As células vazias são "construção em andamento"; o objeto avança a cada etapa.' })}

    ${med({
      file: 'p7-estrogenio-por-estagio-tanner-feminino.png',
      alt: 'Gráfico dos níveis de estrogênio por estágio de Tanner, de TS1 a TS5, mostrando a elevação progressiva do estrogênio com o avanço dos estágios.',
      light: true,
      titulo: 'Gráfico de referência —',
      achado: 'níveis de <strong>estrogênio por estágio de Tanner</strong> (TS1 → TS5) — a subida do estrogênio acompanha o avanço dos estágios. Ancora a leitura: <strong>telarca = estrogênio ovariano (gonadarca)</strong>, o primeiro sinal da sequência feminina.',
      fonte: 'Medgirl131, via Wikimedia Commons',
      licenca: 'CC BY-SA 4.0'
    })}

    <aside class="op-summary">
      <p class="op-summary__label">Regra de ouro</p>
      <p>A sequência feminina é <strong>telarca (M2, estrogênio/gonadarca) → pubarca (androgênio adrenal/adrenarca) → menarca (M4, tardia)</strong>. A menarca <strong>fecha</strong> a puberdade, não a abre — ~2-2,5 anos depois da telarca.</p>
    </aside>

    <aside class="trap">
      <span class="trap__icon" aria-hidden="true">!</span>
      <div class="trap__body">
        <p class="trap__label">Pegadinha de prova</p>
        <p class="trap__text"><strong>"Primeiro sinal = telarca"</strong> é a resposta de prova, mas a <strong>aceleração do crescimento</strong> já ocorria antes dela (só não é perceptível). E <strong>menarca é evento TARDIO</strong> (M4): a menina que acabou de menstruar já está quase no fim do crescimento. A alternativa que coloca a menarca como sinal precoce/inicial é a incorreta.</p>
      </div>
    </aside>

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>Ordenar os sinais permite responder a queixa real "ela já tem pelo mas não tem mama, está errado?" — não necessariamente: pubarca (adrenarca) e telarca (gonadarca) são eixos distintos e podem dessincronizar um pouco. E saber que a menarca é tardia muda o aconselhamento: quem acabou de menstruar tem pouca estatura a ganhar.</p>
    </aside>

    ${quiz('p7', 'A ordem feminina e o marcador da pubarca.', [
      {
        stem: 'Qual é a ordem correta dos eventos da puberdade feminina, e o que marca a menarca quanto ao crescimento?',
        alts: [
          { t: 'Menarca → telarca → pubarca; menarca marca o início do estirão', correct: false, why: 'Coloca a menarca em primeiro, contra a regra de que ela é o evento mais tardio — inverte exatamente o que a página combate.' },
          { t: 'Telarca → pubarca → menarca; menarca é tardia, já na desaceleração do crescimento', correct: true, why: 'Certa. A sequência é telarca → pubarca → menarca, e a menarca é tardia (M4), já na fase de desaceleração — logo após ela a puberdade praticamente fecha.' },
          { t: 'Pubarca → telarca → menarca; menarca marca o pico de crescimento', correct: false, why: 'Põe a pubarca antes da telarca (na prova, o primeiro sinal é a telarca) e atribui à menarca o pico, quando o pico é em M3, antes da menarca.' },
          { t: 'Telarca → menarca → pubarca; menarca é o primeiro evento perceptível', correct: false, why: 'Troca menarca e pubarca de lugar e ainda chama a menarca de "primeiro evento perceptível" — é o oposto: ela é o último.' },
        ]
      },
      {
        stem: 'Numa menina, a pubarca (surgimento de pelos pubianos) é o marcador clínico de qual evento hormonal?',
        alts: [
          { t: 'Da gonadarca, por estrogênio ovariano', correct: false, why: 'Atribui a pubarca à gonadarca/estrogênio — mas estrogênio faz mama (telarca), não pelo; é a confusão telarca×pubarca.' },
          { t: 'Da adrenarca, por androgênios da adrenal', correct: true, why: 'Certa. Pubarca = penificação = androgênio, e na menina o androgênio vem da adrenal → marcador da adrenarca.' },
          { t: 'Da menarca iminente', correct: false, why: 'Não tem relação causal — pubarca não prediz menarca iminente; são eventos de eixos diferentes em tempos diferentes.' },
          { t: 'Da gonadarca, por androgênios ovarianos', correct: false, why: 'Acerta "androgênio" mas erra a fonte — na menina o androgênio da pubarca é adrenal, não ovariano; não ligou a pubarca à adrenarca.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 8 — E6 Mnemônico-âncora · Mapa hidrata ♀ ===================== */
  // Página 8 — Estratégia: E6 — Mnemônico-âncora primeiro
  P.push(page('p8', 8, `
    ${tag('hhg', 'Tanner ♀ · a régua de 1 a 5')}
    ${chips(['1 = infantil · 5 = adulto', 'M2 telarca', 'M3 pico', 'M4 duplo contorno + menarca', 'Tanner ≠ Turner'])}

    <aside class="opener opener--mnemonic" aria-label="Mnemônico de abertura">
      <p class="opener__mnemonic-tag">Mnemônico-âncora</p>
      <p class="opener__mnemonic-quote"><strong>Tanner vai sempre de 1 a 5. Não existe estágio 0.</strong> <strong>1 = infantil/pré-puberal · 5 = adulto.</strong> O que você precisa caracterizar de verdade é o <strong>meio: 2, 3 e 4</strong> — é aí que a puberdade acontece.</p>
    </aside>

    <h1 class="page-title">Tanner feminino: cinco estágios, e o que muda em cada um</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">Tanner: o que é, e o cuidado com Turner</h3>
        <p>A forma clássica de estudar a sequência do desenvolvimento puberal é o <span class="term">estadiamento de Tanner</span>. Antes de qualquer coisa, um cuidado que a banca explora: <span class="hl-warn">não confunda Tanner com Turner</span>. <strong>Tanner</strong> é o <strong>autor</strong> do estadiamento puberal (mamas, genital, pelos, de 1 a 5). <strong>Turner</strong> é uma <strong>síndrome</strong> — a do cariótipo 45,X, com <strong>baixa estatura e atraso puberal</strong>. São coisas completamente diferentes: o estadiamento é de <strong>Tanner</strong>. (A confusão é tão comum que vira pegadinha; e a síndrome de Turner é justamente um diagnóstico de baixa estatura/atraso puberal — exatamente o universo de diferencial que se discutiu em aulas anteriores.) Tanner estudou os <strong>dois sexos</strong>: na menina, <strong>cinco estágios</strong> pelo desenvolvimento das <strong>mamas (M)</strong> e da <strong>penificação (P)</strong>; no menino, cinco estágios pelo desenvolvimento <strong>genital (G)</strong> e penificação.</p>

        <h3 class="topic-h">As mamas, M1 a M5 (e o duplo contorno de M4)</h3>
        <p>A escala mamária, estágio por estágio:</p>
        <ul>
          <li><strong>M1</strong>: mama <strong>infantil</strong>, pré-puberal — não desenvolveu.</li>
          <li><strong>M2</strong>: <span class="hl-good">primeiro sinal</span> da puberdade feminina — surgimento do <strong>broto mamário (telarca)</strong>; a aréola aumenta de diâmetro e há tecido glandular apenas <strong>subareolar</strong> (ainda não se formou uma mama propriamente dita).</li>
          <li><strong>M3</strong>: o tecido glandular vai <strong>além dos limites da aréola</strong> — cresce a mama e a aréola juntas; a mama de M3 parece a de uma mulher adulta, <strong>porém menor</strong>.</li>
          <li><strong>M4</strong>: o estágio mais característico, porque ocorre <strong>elevação da aréola</strong> formando um <span class="hl-warn">"duplo contorno"</span> — a aréola faz uma <strong>projeção acima</strong> do resto da mama (de perfil, vê-se o contorno da mama e, sobre ele, o contorno separado da aréola).</li>
          <li><strong>M5</strong>: estágio <strong>adulto</strong>. O contorno de M5 lembra o de M3 (contorno único); o que muda em relação a M4 é que a aréola <strong>já não faz</strong> a projeção isolada — ela "volta" para o plano da mama, agora em tamanho adulto.</li>
        </ul>
        <p>A transição que mais cai é a de <strong>M4 (duplo contorno) → M5 (contorno único maior)</strong>. Reconhecer o duplo contorno = M4.</p>

        <h3 class="topic-h">Os pelos, P1 a P5</h3>
        <p>A escala de penificação:</p>
        <ul>
          <li><strong>P1</strong>: ausência de pelos — infantil/pré-puberal (lanugem).</li>
          <li><strong>P2</strong>: ocorre a <strong>pubarca</strong>; o pelo ainda <strong>não</strong> é adulto — é <strong>fino, liso, pouco pigmentado</strong>, localizado nos <strong>grandes lábios</strong>.</li>
          <li><strong>P3</strong>: o pelo fica <strong>mais escuro, mais grosso e mais curvo</strong> (ainda não adulto) e alcança a <strong>sínfise púbica</strong>.</li>
          <li><strong>P4</strong>: pelo <strong>adulto</strong>, em grande quantidade.</li>
          <li><strong>P5</strong>: a diferença para P4 é que o pelo adulto alcança a <strong>raiz das coxas</strong> (em P4, "de biquíni", não se vê o pelo; em P5, ele já alcança a raiz das coxas).</li>
        </ul>

        <h3 class="topic-h">Correlação crescimento × Tanner mamário</h3>
        <p>Agora o cruzamento que torna o Tanner útil para além do exame — a correlação com o crescimento (e com o número mágico 8):</p>
        <ul>
          <li><strong>M1</strong>: não há puberdade, sem aceleração.</li>
          <li><strong>M2</strong> (telarca): a velocidade de crescimento <strong>já está aumentando</strong>.</li>
          <li><strong>M3</strong>: ocorre o <span class="hl-good">pico</span> do crescimento (<strong>8-9 cm/ano</strong> — o "8", porque a puberdade feminina começa aos 8).</li>
          <li><strong>M4</strong>: ocorre a <strong>menarca</strong>, já na fase de <strong>desaceleração</strong> do crescimento.</li>
          <li>Após a menarca: a menina <strong>não para de crescer de imediato</strong> — ainda cresce alguns centímetros (varia muito), mas pouco e desacelerado, pois já está muito perto da estatura adulta.</li>
        </ul>
      </div>
    </div>

    ${svgPiso('S-painelM', { caption: 'painel Tanner mamário M1-M5 (esquema de linha) — cinco perfis de mesma escala apontando a transição-chave de cada estágio: broto subareolar (M2), tecido ultrapassando a aréola (M3), duplo contorno / projeção da aréola (M4), contorno único maior (M5). A competência é reconhecer o contorno, então a pista entra na figura.', hint: 'Hotspot por quadro: cada um aponta a transição que define o estágio.' })}

    ${svgPiso('S-painelP', { caption: 'painel de penificação P1-P5 (esquema por área hachurada) — distribuição/densidade do pelo: P2 grandes lábios, fino/liso; P3 até a sínfise púbica, mais escuro/curvo; P4 grande quantidade; P5 alcança a raiz das coxas. Representação por área sombreada, nunca imagem realista.', hint: 'Hotspot por quadro: a área hachurada de cada estágio é a pista.' })}

    ${svgPiso('S-mapaTanner-p8', { caption: 'o Mapa de Tanner — agora hidratando as linhas femininas (M1-M5, P1-P5) com achado + correlação de crescimento: M2 telarca/acelera; M3 pico/8-9; M4 menarca/desacelera. As linhas masculinas seguem vazias (entram na página do menino). O objeto avança.', hint: 'Linhas ♀ preenchidas vs ♂ vazias mostram a construção em andamento.' })}

    ${med({
      file: 'p8-tanner-feminino-esquema-M1-5-P1-5.png',
      alt: 'Diagrama esquemático dos estágios de Tanner femininos: mamas de M1 a M5 e pelos de P1 a P5, com o duplo contorno destacado em M4.',
      light: true,
      titulo: 'Esquema de referência —',
      achado: 'os <strong>estágios de Tanner femininos</strong> (mama <strong>M1-5</strong>, pelos <strong>P1-5</strong>) num diagrama clássico — repare o <span class="hl-warn">duplo contorno em M4</span> (projeção da aréola). Ilustração de livro ao lado do painel interativo, para fixar o contorno que define cada estágio.',
      fonte: 'Michał Komorniczak, via Wikimedia Commons',
      licenca: 'CC BY-SA 3.0'
    })}

    <aside class="practice">
      <p class="practice__label">Não cai na prova (caixa-curiosa)</p>
      <p>Mnemônico informal para o <strong>duplo contorno de M4</strong> — "não escreva isso na prova": a mama de M4 lembra um <strong>cupcake com a cerejinha em cima</strong> (ou um briochinho com saliência). É só para fixar o "duplo contorno"; o termo técnico é <strong>elevação/projeção da aréola</strong>.</p>
    </aside>

    <aside class="op-summary">
      <p class="op-summary__label">Regra de ouro</p>
      <p><strong>1 = infantil, 5 = adulto; caracterize o meio (2-3-4).</strong> Na mama, as âncoras são: <strong>M2 = telarca (broto subareolar)</strong>, <strong>M3 = pico de crescimento</strong>, <strong>M4 = duplo contorno + menarca</strong>.</p>
    </aside>

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>Estadiar Tanner é o que transforma a queixa subjetiva ("acho que minha filha está desenvolvida demais/de menos") em dado objetivo. E cruzar o estágio com o crescimento permite prognóstico imediato no consultório: viu M4/menarca → pouca estatura a ganhar; viu M2 → ainda há muito crescimento pela frente.</p>
    </aside>

    ${quiz('p8', 'O estágio M4 e a correlação Tanner × crescimento.', [
      {
        stem: 'Qual achado caracteriza o estágio M4 de Tanner mamário?',
        alts: [
          { t: 'Broto mamário com tecido glandular apenas subareolar', correct: false, why: 'Descreve M2 (telarca, broto subareolar) — o início, não o M4.' },
          { t: 'Mama que parece adulta porém menor, tecido além da aréola', correct: false, why: 'Descreve M3 (adulta porém menor, tecido ultrapassa a aréola) — o estágio anterior.' },
          { t: 'Elevação da aréola formando um "duplo contorno" (projeção da aréola sobre a mama)', correct: true, why: 'Certa. A assinatura de M4 é o duplo contorno — a aréola se eleva e projeta acima do plano da mama (o "cupcake com cereja").' },
          { t: 'Contorno único de tamanho adulto, sem projeção isolada da aréola', correct: false, why: 'Descreve M5 (contorno único adulto, sem a projeção) — o estágio seguinte; confunde M4 com M5, a transição mais cobrada: M4 tem o duplo contorno, M5 já o perdeu.' },
        ]
      },
      {
        stem: 'Em qual estágio de Tanner mamário ocorre o pico de velocidade de crescimento na menina, e em qual ocorre a menarca?',
        alts: [
          { t: 'Pico em M2; menarca em M3', correct: false, why: 'Antecipa os dois — em M2 o crescimento só começou a acelerar, e a menarca não é tão precoce.' },
          { t: 'Pico em M3; menarca em M4', correct: true, why: 'Certa. As âncoras de correlação: pico em M3 (8-9 cm/ano, o número mágico 8) e menarca em M4 (já na desaceleração).' },
          { t: 'Pico em M4; menarca em M5', correct: false, why: 'Atrasa os dois — em M4 já se está desacelerando (não no pico), e a menarca é em M4, não M5.' },
          { t: 'Pico em M5; menarca em M3', correct: false, why: 'Coloca o pico no fim (M5, quando já parou de acelerar) — incoerente; não fixou que o pico feminino é precoce (M3) e a menarca tardia (M4).' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 9 — E1 Pergunta central · split simétrico ===================== */
  // Página 9 — Estratégia: E1 — Pergunta central
  P.push(page('p9', 9, `
    ${tag('grow', 'Menarca · fertilidade imatura e estatura')}
    ${chips(['ciclos anovulatórios', 'irregularidade fisiológica', 'quem não menstruou cresce mais', 'raciocínio probabilístico'])}

    <section class="opener opener--question" aria-label="Pergunta de abertura">
      <span class="opener__question-mark" aria-hidden="true">?</span>
      <p class="opener__text">Se a menstruação já chegou, a fertilidade está pronta? E entre duas meninas igualmente baixas e da mesma idade, por que a que <strong>ainda não menstruou</strong> pode acabar <strong>mais alta</strong>?</p>
    </section>

    <h1 class="page-title">O que a menarca promete — e o que ela ainda não entrega</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">Menarca e fertilidade: por que os primeiros ciclos enganam</h3>
        <p>Além dos caracteres sexuais secundários e do crescimento, a puberdade traz o desenvolvimento da <span class="term">função reprodutora</span>, e é a <strong>menarca</strong> que marca esse desenvolvimento. Mas atenção à pegadinha: <span class="hl-warn">nos primeiros ciclos após a menarca, em geral NÃO ocorre ovulação</span>. Eventualmente, por <strong>mais de um ano</strong> após a menarca, a menina segue com ciclos <strong>anovulatórios</strong> — e, por serem anovulatórios, esses ciclos costumam ser <strong>irregulares</strong>. Isso explica por que irregularidade menstrual nos primeiros anos pós-menarca é, na maioria das vezes, <span class="hl-good">fisiológica</span>, não doença. Uma ressalva honesta: <strong>nada impede</strong> ovulação desde a primeira menstruação (e, portanto, gravidez é possível desde cedo), mas <strong>não é o mais comum</strong> — o mais comum é ciclo anovulatório e irregular logo após a menarca.</p>

        <h3 class="topic-h">Quem cresce mais: Blair ou Serena?</h3>
        <p>Hora de devolver o caso. Blair e Serena têm a <strong>mesma idade</strong> (13a) e são <strong>igualmente baixas</strong> — mas Serena <strong>já menstruou</strong> (já teve a menarca) e Blair <strong>ainda não</strong>. Pergunta de prognóstico: quem tem <strong>maior potencial de estatura</strong> na vida adulta? <span class="hl-good">Possivelmente Blair</span>. O raciocínio: a menarca é evento <strong>tardio</strong>, que marca a entrada na fase de <strong>desaceleração</strong>; Serena, que já menstruou, <strong>já está</strong> nessa fase de desaceleração, com pouca estatura a ganhar. Blair, que <strong>ainda não</strong> menstruou, está <strong>antes</strong> desse platô — ainda tem <strong>mais crescimento pela frente</strong>. Mesma altura agora, trajetórias diferentes daqui em diante.</p>

        <h3 class="topic-h">O raciocínio é probabilístico, não certeza</h3>
        <p>Um cuidado que separa o aluno avançado: isso é um <strong>raciocínio probabilístico, não uma certeza</strong>. "Possivelmente Blair" — não "com certeza Blair". O potencial de estatura depende de muitos fatores (genética/alvo parental, idade óssea, estágio exato de cada uma), e a comparação telarca-vs-menarca é apenas <strong>um</strong> desses fatores, ainda que um bom indicador. A banca premia quem responde "provavelmente a que não menstruou" <strong>e</strong> reconhece que é probabilidade, não decreto. Resposta certa com a humildade certa.</p>
      </div>
    </div>

    ${svgPiso('S-trajetorias', { caption: 'as duas trajetórias na mesma escala — Serena (já menstruou: M4, desacelerando) × Blair (ainda não menstruou: antes do platô, mais a crescer), com a seta indicando maior estatura potencial em Blair. Mesma altura agora, destinos diferentes: a que não menstruou tende a crescer mais.', hint: 'Revele a seta de prognóstico: as duas curvas na mesma escala fazem a comparação.' })}

    ${svgPiso('S-menarcaOvul', { caption: 'o selo da anti-pegadinha — "menarca ≠ ovulação garantida": os primeiros ciclos costumam ser anovulatórios/irregulares (fisiológico), mas a ovulação pode ocorrer desde a 1ª menstruação (gravidez possível). O "≠" é a própria pista.', hint: 'O "≠" comunica: menstruar não é garantia de ovulação regular.', doc: true })}

    ${med({
      file: 'p9-hormonios-menarca-anovulacao-progesterona.png',
      alt: 'Gráfico dos níveis de estrogênio e progesterona por idade na menina, evidenciando que a progesterona lútea só se eleva após a menarca.',
      light: true,
      titulo: 'Gráfico de referência —',
      achado: '<strong>estrogênio e progesterona por idade</strong> na menina: a <strong>progesterona lútea</strong> só sobe <span class="hl-warn">depois da menarca</span> — base fisiológica da <strong>anovulação dos primeiros ciclos</strong> (sem corpo lúteo, sem progesterona, ciclos irregulares).',
      fonte: 'Medgirl131, via Wikimedia Commons',
      licenca: 'CC BY-SA 4.0'
    })}

    <aside class="op-summary">
      <p class="op-summary__label">Regra de ouro</p>
      <p><strong>Menarca marca o fim, não o começo.</strong> Entre duas meninas iguais, a que <strong>ainda não menstruou</strong> tende a ter <strong>mais estatura a ganhar</strong> — porque está antes da desaceleração que a menarca sinaliza. Raciocínio probabilístico.</p>
    </aside>

    <aside class="trap">
      <span class="trap__icon" aria-hidden="true">!</span>
      <div class="trap__body">
        <p class="trap__label">Pegadinha de prova</p>
        <p class="trap__text"><strong>Menarca ≠ ovulação garantida.</strong> Os primeiros ciclos (por até mais de um ano) costumam ser <strong>anovulatórios e irregulares</strong> — irregularidade pós-menarca precoce é fisiológica. Mas <strong>pode</strong> haver ovulação desde a 1ª menstruação (gravidez é possível). A alternativa que diz "menstruou, logo está ovulando regularmente" é a incorreta.</p>
      </div>
    </aside>

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>No consultório, a mãe que pergunta "ela menstruou, vai parar de crescer?" merece a resposta certa: vai crescer pouco mais, sim. E a adolescente com ciclos irregulares no primeiro ano pós-menarca, sem outros sinais, em geral <strong>não</strong> precisa de investigação — é a anovulação fisiológica. Saber disso evita exame e ansiedade desnecessários.</p>
    </aside>

    ${quiz('p9', 'Os ciclos pós-menarca e o prognóstico de estatura.', [
      {
        stem: 'Sobre os ciclos menstruais no primeiro ano após a menarca, qual afirmação está CORRETA?',
        alts: [
          { t: 'São sempre ovulatórios e regulares desde o início', correct: false, why: 'Afirma regularidade desde o início — falso e perigoso, ignora a anovulação fisiológica.' },
          { t: 'Costumam ser anovulatórios e, por isso, irregulares; a gravidez, porém, é possível', correct: true, why: 'Certa. O padrão é anovulatório → irregular nos primeiros ciclos (por até mais de um ano), e isso é fisiológico — mas a ovulação pode ocorrer desde a primeira menstruação, então a gravidez é possível.' },
          { t: 'São anovulatórios, e portanto a gravidez é impossível nesse período', correct: false, why: 'Comete o erro oposto e mais grave: concluir que "anovulatório = gravidez impossível" — não é; a ovulação ocasional existe, e essa falsa segurança tem consequência clínica real.' },
          { t: 'A irregularidade nesse período indica sempre doença e exige investigação', correct: false, why: 'Patologiza o normal — irregularidade nos primeiros anos pós-menarca, isolada, é esperada; vai investigar fisiologia.' },
        ]
      },
      {
        stem: 'Blair e Serena têm 13 anos e a mesma altura; Serena já teve a menarca, Blair não. Quem provavelmente terá maior estatura adulta, e com que grau de certeza?',
        alts: [
          { t: 'Serena, com certeza, por ter amadurecido antes', correct: false, why: 'Inverte o prognóstico: amadurecer antes significa fechar antes, não crescer mais.' },
          { t: 'Blair, provavelmente, por ainda estar antes da desaceleração que a menarca marca', correct: true, why: 'Certa. A menarca marca a entrada na desaceleração; Serena já está nela (pouca estatura a ganhar), Blair ainda não (mais crescimento pela frente) — logo provavelmente Blair.' },
          { t: 'São necessariamente iguais, já que têm a mesma altura agora', correct: false, why: 'Confunde "mesma altura agora" com "mesmo destino" — a trajetória futura é o que difere.' },
          { t: 'Blair, com certeza absoluta, independentemente de outros fatores', correct: false, why: 'Acerta a paciente mas erra a força da afirmação: é raciocínio probabilístico (genética, idade óssea, estágio exato também pesam), não certeza absoluta — a banca pune tanto o prognóstico errado quanto a certeza indevida.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 10 — E1 Pergunta central · Mapa hidrata ♂ ===================== */
  // Página 10 — Estratégia: E1 — Pergunta central
  P.push(page('p10', 10, `
    ${tag('hhg', 'Tanner ♂ · o que dá pra medir')}
    ${chips(['janela 9-14', 'testículo ≥ 4 mL = G2', 'orquidômetro de Prader', 'G3 comprimento · G4 glande', 'G2 não acelera'])}

    <section class="opener opener--question" aria-label="Pergunta de abertura">
      <span class="opener__question-mark" aria-hidden="true">?</span>
      <p class="opener__text">Por que, no menino, dá para <strong>medir</strong> o início da puberdade no exame físico, mas na menina não — e qual é o número de corte que <strong>prova</strong> que a puberdade masculina começou?</p>
    </section>

    <h1 class="page-title">No menino, a puberdade tem número: ≥ 4 mL</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">A janela masculina (9-14) e o primeiro sinal mensurável</h3>
        <p>A puberdade masculina é <span class="hl-good">fisiológica quando começa entre 9 e 14 anos</span> — o <strong>9</strong> é o número mágico masculino, e ele abre a janela uma faixa <strong>mais tarde</strong> que a feminina (os meninos entram na puberdade <strong>depois</strong> das meninas). E o <strong>primeiro sinal</strong> da puberdade masculina é o <span class="term">aumento do volume testicular</span>, que marca o estágio <strong>G2</strong>. O que faz o testículo aumentar é o <strong>estímulo gonadotrófico (LH/FSH)</strong> — exatamente a cascata do eixo HHG, agora com desfecho clínico mensurável.</p>

        <h3 class="topic-h">Por que o testículo se mede e o ovário não</h3>
        <p>Aqui está a assimetria entre os sexos, e ela cai. O <strong>ovário também aumenta</strong> — antes mesmo da telarca, o volume ovariano já cresceu sob o mesmo estímulo gonadotrófico —, <strong>mas não dá para identificar isso no exame físico</strong> (o ovário é intra-abdominal). Por isso o <span class="hl-bad">volume ovariano NÃO serve</span> como marcador clínico de início da puberdade na menina. No menino, ao contrário, o estímulo gonadotrófico é <strong>clinicamente detectável</strong>, porque o testículo é palpável e mensurável — <strong>essa é a diferença prática entre os sexos</strong>. Na menina, o primeiro sinal clínico é a telarca (consequência tardia do estrogênio); no menino, é o aumento testicular (consequência direta e mensurável do estímulo gonadotrófico).</p>

        <h3 class="topic-h">O orquidômetro de Prader e o corte ≥ 4 mL</h3>
        <p>Como se mede o testículo? Com o <span class="term">orquidômetro de Prader</span>: um conjunto de <strong>elipsoides</strong> de volumes crescentes (cerca de 1 a 25 mL); compara-se cada peça com o testículo do paciente e estima-se o volume em <strong>mililitros</strong>. E o número que crava a prova: considera-se que o testículo <strong>aumentou de volume quando é ≥ 4 mL</strong>. A peça de <strong>4 mL</strong> costuma ser a primeira de <strong>cor diferente</strong> no orquidômetro — um marco visual. <span class="hl-good">Testículo ≥ 4 mL significa que a puberdade começou</span> (= G2). Esse é um <strong>cutoff de verdade</strong>, alto rendimento, diferente das faixas aproximadas de velocidade de crescimento: grave o <strong>≥ 4 mL</strong>.</p>

        <h3 class="topic-h">Os estágios G1-G5 e a correlação com o crescimento</h3>
        <p>A escala genital, estágio por estágio:</p>
        <ul>
          <li><strong>G1</strong>: <strong>infantil</strong> — nada acontecendo.</li>
          <li><strong>G2</strong>: entrou na puberdade — <strong>aumento do volume testicular (≥ 4 mL)</strong>.</li>
          <li><strong>G3</strong>: começa a alteração no <strong>pênis</strong> — aumento em <strong>comprimento</strong>.</li>
          <li><strong>G4</strong>: o pênis aumenta em <strong>diâmetro</strong>; e o <strong>contorno da glande se destaca</strong> do contorno do corpo do pênis (no infantil o pênis é "todo reto"; na genitália madura há <strong>projeção da glande</strong>). <em>Analogia útil</em>: esse novo contorno da glande em G4 é o <strong>paralelo masculino do "duplo contorno" da aréola em M4</strong>.</li>
          <li><strong>G5</strong>: genitália <strong>adulta/madura</strong>.</li>
        </ul>
        <p>De G2 a G5 o testículo segue aumentando e a bolsa escrotal fica cada vez mais escura e pregueada, mas isso <strong>não é a marca principal</strong> de cada estágio — a marca de <strong>G3</strong> é o pênis em <strong>comprimento</strong> e a de <strong>G4</strong>, o pênis em <strong>diâmetro + contorno da glande</strong>. E a correlação com o crescimento, que contrasta com a menina: <span class="hl-warn">na menina o crescimento já está acelerado em M2; no menino, em G2 ainda NÃO há aceleração</span>. O estirão masculino só <strong>inicia</strong> de fato em <strong>G3</strong>; o <strong>pico</strong> (velocidade máxima) é em <strong>G4</strong> (9-10 cm/ano); e só em <strong>G5</strong> começa a desacelerar. A penificação masculina segue a <strong>mesma escala P1-P5</strong> da feminina (P1 ausência; P2 fino; P3 mais escuro; P4 grande quantidade; P5 raiz das coxas), com <strong>uma diferença</strong>: o P2 não é nos grandes lábios — é na <strong>base do pênis</strong>.</p>
      </div>
    </div>

    ${svgPiso('S-painelG', { caption: 'painel Tanner genital G1-G5 (esquema de linha neutro) — a mudança-chave de cada estágio: aumento testicular (G2), pênis em comprimento (G3), pênis em diâmetro + contorno da glande (G4, paralelo do duplo contorno M4), maduro (G5). A competência é reconhecer a sequência de mudanças.', hint: 'Hotspot por quadro: cada um aponta a mudança que define o estágio.' })}

    ${svgPiso('S-orquidometro', { caption: 'o orquidômetro de Prader — fileira dos elipsoides em escala crescente (~1-25 mL), com a peça de 4 mL realçada em cor diferente: "≥ 4 mL = puberdade começou (G2)". Deslize/selecione o volume e o sistema marca pré-púbere vs púbere no corte de 4 mL.', hint: 'Arraste ou selecione o volume: o corte de 4 mL separa pré-púbere de púbere.' })}

    ${svgPiso('S-mapaTanner-p10', { caption: 'o Mapa de Tanner — agora hidratando as linhas masculinas G1-G5: G2 testículo ≥ 4 mL / sem aceleração; G3 pênis comprimento / início do estirão; G4 pênis diâmetro + glande / pico 9-10; G5 maduro / desacelera. Falta só a camada de casos plotados, que entra no fechamento.', hint: 'Hotspot por célula: ♀ e ♂ agora preenchidas; só os casos ainda ausentes.' })}

    ${med({
      file: 'p10-tanner-masculino-esquema-G1-5-volumes.png',
      alt: 'Diagrama esquemático dos estágios genitais masculinos de G1 a G5, com os volumes testiculares correspondentes, destacando a peça de 4 mL no estágio II.',
      light: true,
      titulo: 'Esquema de referência —',
      achado: 'os <strong>estágios genitais masculinos G1-5</strong> com os <strong>volumes testiculares</strong> de cada estágio — a peça de <strong>4 mL = estágio II (G2)</strong>. Reforça o cutoff de verdade do tema: <span class="hl-good">≥ 4 mL = puberdade começou</span>.',
      fonte: 'Michał Komorniczak, via Wikimedia Commons',
      licenca: 'CC BY-SA 3.0'
    })}

    ${med({
      file: 'p10-orquidometro-prader-esquema.png',
      alt: 'Esquema do orquidômetro de Prader isolado: o conjunto de elipsoides de volumes crescentes usados para estimar o volume testicular em mililitros.',
      light: true,
      titulo: 'Instrumento (esquema) —',
      achado: 'o <strong>orquidômetro de Prader</strong> isolado — o conjunto de elipsoides de volumes crescentes (~1-25 mL) com que se estima o volume testicular comparando cada peça ao testículo do paciente. É o instrumento por trás do controle interativo acima.',
      fonte: 'Filip em, via Wikimedia Commons',
      licenca: 'CC BY-SA 3.0 / GFDL'
    })}

    <aside class="practice">
      <p class="practice__label">Não cai na prova (caixa-curiosa)</p>
      <p>Algumas referências descrevem um <strong>"P6"</strong> — penificação que sobe em direção à cicatriz umbilical. <strong>Não é estágio padrão</strong> (é descrito como uma variação masculina mais exuberante). Citação de completude, não de prova.</p>
    </aside>

    <aside class="op-summary">
      <p class="op-summary__label">Regra de ouro</p>
      <p><strong>Testículo ≥ 4 mL = G2 = puberdade começou.</strong> É o cutoff de verdade do tema, alto rendimento. E o descompasso de crescimento: <strong>♀ acelera em M2; ♂ ainda não acelera em G2</strong> — o estirão masculino inicia em G3 e pica em G4.</p>
    </aside>

    <aside class="trap">
      <span class="trap__icon" aria-hidden="true">!</span>
      <div class="trap__body">
        <p class="trap__label">Pegadinha de prova</p>
        <p class="trap__text"><strong>O volume ovariano também aumenta, mas NÃO serve de marcador</strong> (não é palpável). O marcador feminino clínico é a <strong>telarca</strong>; o masculino é o <strong>aumento testicular (≥ 4 mL)</strong>. A alternativa que usa "aumento do volume ovariano" como sinal de início da puberdade feminina é a incorreta. E cuidado: <strong>G2 ainda não tem aceleração de crescimento</strong> (diferente de M2, que já acelera).</p>
      </div>
    </aside>

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>O orquidômetro é o que permite responder, no exame de um menino, <strong>a pergunta exata</strong> "ele entrou na puberdade?" — sem chute, com número. E saber que G2 ainda não acelera o crescimento (enquanto M2 já acelera) evita o erro de esperar estirão precoce no menino. A medida do testículo é uma das poucas em que a clínica entrega um cutoff binário e confiável.</p>
    </aside>

    ${quiz('p10', 'O corte testicular e a assimetria entre os sexos.', [
      {
        stem: 'Qual achado marca o início da puberdade masculina (estágio G2), e qual o seu corte objetivo?',
        alts: [
          { t: 'Aumento do pênis em comprimento; sem corte de volume definido', correct: false, why: 'Descreve G3 (pênis em comprimento), que vem depois do início — e ainda nega o corte, que existe e é alto rendimento.' },
          { t: 'Aumento do volume testicular, com corte de ≥ 4 mL', correct: true, why: 'Certa. O primeiro sinal é o aumento testicular, e o corte canônico de início é ≥ 4 mL (= G2), medido pelo orquidômetro de Prader (a peça de 4 mL, a primeira de cor diferente).' },
          { t: 'Surgimento de pelos na base do pênis; corte de ≥ 4 mL de pelo', correct: false, why: 'Confunde marco genital com penificação e inventa um corte de "pelo em mL" — sem sentido.' },
          { t: 'Aumento do volume testicular, com corte de ≥ 12 mL', correct: false, why: 'Acerta o achado mas erra o número: ≥ 12 mL já corresponde a estágios mais avançados (G4), não ao início; troca o cutoff de começo (4 mL) pelo de estágio adiantado.' },
        ]
      },
      {
        stem: 'Por que o aumento do volume testicular serve como marcador de início da puberdade no menino, mas o aumento do volume ovariano não serve na menina?',
        alts: [
          { t: 'Porque o ovário não aumenta de volume na puberdade', correct: false, why: 'Factualmente errado — o ovário cresce, e essa é justamente a sutileza.' },
          { t: 'Porque o ovário aumenta, mas não é clinicamente palpável/mensurável no exame físico', correct: true, why: 'Certa. O ovário aumenta sim (sob o mesmo estímulo de LH/FSH, antes mesmo da telarca), mas é intra-abdominal — não dá para medi-lo no exame físico; o testículo, palpável, sim.' },
          { t: 'Porque o aumento ovariano só ocorre após a menarca', correct: false, why: 'Inverte o tempo — o aumento ovariano é precoce (antes da telarca), não pós-menarca.' },
          { t: 'Porque o estímulo gonadotrófico não age sobre o ovário', correct: false, why: 'Contradiz a fisiologia do eixo HHG: o estímulo gonadotrófico age sim no ovário (faz volume + estrogênio); esquece que LH/FSH agem em ambas as gônadas.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 11 — E8 Erro comum desmontado ===================== */
  // Página 11 — Estratégia: E8 — Erro comum desmontado
  P.push(page('p11', 11, `
    ${tag('trap', 'Ginecomastia · normal ou Klinefelter?')}
    ${chips(['gineco = tecido mamário no ♂', '3 janelas fisiológicas', 'involui ~2-3a', 'só puberal se houver puberdade', 'Klinefelter'])}

    <section class="opener opener--bust" aria-label="Erro comum desmontado">
      <p class="opener__bust-tag">Erro comum</p>
      <p class="opener__bust-wrong">"Tecido mamário num menino adolescente é, por si só, sinal de doença."</p>
      <p class="opener__bust-right">Não é. Na maioria dos casos é absolutamente <strong>normal</strong>. O que poucos sabem é a condição <strong>exata</strong> em que esse mesmo achado vira sinal de uma doença genética — e é essa fronteira que decide a questão.</p>
    </section>

    <h1 class="page-title">Ginecomastia: por que quase sempre é normal — e quando não é</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">O que é ginecomastia (e o erro do nome)</h3>
        <p>Durante a puberdade masculina é <strong>muito comum</strong> (embora não obrigatório) a ocorrência de <span class="term">ginecomastia puberal</span>. Primeiro, o termo, que confunde: apesar de "gineco" remeter a feminino, <strong>ginecomastia é a presença de tecido glandular mamário no sexo masculino</strong>. Dito de forma direta para não errar nunca: <span class="hl-warn">meninos não têm telarca; meninas não têm ginecomastia</span> — são palavras de sexos diferentes para o desenvolvimento mamário. A ginecomastia pode ocorrer em <strong>qualquer momento da vida</strong> de um homem; e, em <strong>certas idades</strong>, pode ser manifestação de doença subjacente (no homem adulto que desenvolve ginecomastia subitamente, por exemplo, pensa-se em doença ou em uso de substância).</p>

        <h3 class="topic-h">Os três momentos fisiológicos</h3>
        <p>Há <strong>três momentos</strong> da vida em que a ginecomastia pode ser <span class="hl-good">fisiológica</span>: o <strong>período neonatal</strong> (por passagem transplacentária de hormônios maternos), a <strong>puberdade</strong>, e o <strong>idoso</strong> (ginecomastia senil). O <strong>mecanismo comum</strong> aos três é o mesmo: sempre que há <span class="term">desequilíbrio entre as quantidades de androgênios e estrogênios</span> circulantes, pode surgir ginecomastia — e esse desequilíbrio acontece <strong>fisiologicamente</strong> nesses três momentos. Reconhecer os três contextos é o que evita investigar uma ginecomastia que é só fisiologia.</p>

        <h3 class="topic-h">Prognóstico e o paradoxo do tratamento</h3>
        <p>A ginecomastia puberal pode ser <strong>uni ou bilateral</strong> e tem <span class="hl-good">prognóstico excelente</span>: na maior parte das vezes há <strong>involução espontânea</strong>, com o tecido regredindo em geral <strong>até ~2 a 3 anos</strong>. Se <strong>não</strong> regredir e causar <strong>sofrimento psíquico</strong>, pode-se indicar a <strong>remoção cirúrgica</strong>. E aqui mora um paradoxo elegante de conduta: o tratamento <strong>farmacológico</strong> só é eficaz se iniciado <strong>muito precocemente</strong> (assim que a ginecomastia começa) — <strong>mas</strong> justamente nesse momento <strong>não há justificativa para tratar</strong>, porque na maioria das vezes vai regredir sozinha. Depois de 2-3 anos, o farmacológico <strong>perde eficácia</strong>, sobrando a <strong>cirurgia</strong> como grande alternativa. Resultado prático: o farmacológico fica espremido entre "cedo demais para indicar" e "tarde demais para funcionar".</p>

        <h3 class="topic-h">A regra que decide: só é puberal se houver puberdade</h3>
        <p>Agora a regra de ouro decisiva, a que fecha a questão: <span class="hl-bad">ginecomastia só é PUBERAL se vier acompanhada de PUBERDADE</span> — <strong>não basta a idade</strong>. É preciso <strong>confirmar que o menino já entrou na puberdade</strong> (testículo ≥ 4 mL / G2+). E a consequência diagnóstica: se um paciente de ~15 anos tem ginecomastia e <strong>não entrou na puberdade</strong> (testículo ainda pré-púbere), isso <strong>não</strong> é ginecomastia puberal — pode haver <span class="hl-bad">síndrome genética</span>, como a <span class="term">síndrome de Klinefelter</span> (47,XXY, hipogonadismo). É o mesmo achado (tecido mamário) com significados opostos, e o que decide entre eles <strong>não é a idade, é o estadiamento puberal</strong>.</p>
      </div>
    </div>

    ${svgPiso('S-fluxoGineco', { caption: 'o fluxograma da decisão — "Menino com ginecomastia" → pergunta única "Entrou na puberdade? (testículo ≥ 4 mL / G2+)": ramo SIM → ginecomastia puberal fisiológica, involui em ~2-3 anos (verde); ramo NÃO (aos ~15a) → investigar, atenção Klinefelter (âmbar). O mesmo achado, dois desfechos.', hint: 'Hotspot na regra de ouro: "ginecomastia puberal exige puberdade".' })}

    ${svgPiso('S-3janelas', { caption: 'as três janelas fisiológicas — na linha da vida, ginecomastia normal no neonato (transplacentário), na puberdade (~50-70%) e no idoso (senil). Mecanismo comum aos três: desequilíbrio androgênio/estrogênio.', hint: 'Passe o mouse: cada janela acende; o mecanismo é o mesmo nas três.' })}

    ${svgPiso('S-paradoxo', { caption: 'o paradoxo terapêutico — eixo do tempo: a janela de eficácia do farmacológico fica cedo (mas aí não se indica, porque costuma regredir sozinha); tarde (~2-3a), o farmacológico é ineficaz e sobra a cirurgia. A janela "espremida" comunica o paradoxo.', hint: 'A janela estreita do farmacológico é a própria pista do paradoxo.', doc: true })}

    ${med({
      file: 'p11-ginecomastia-bilateral-adulto.jpg',
      alt: 'Tórax masculino adulto com ginecomastia bilateral: tecido glandular mamário visível dos dois lados, sem exposição de identidade (rosto fora do enquadramento).',
      titulo: 'Achado clínico real —',
      achado: '<strong>ginecomastia bilateral</strong> (homem adulto): tecido glandular mamário no sexo masculino. Na puberdade fisiológica ocorre em ~50-70% <span class="hl-good">desde que haja puberdade</span> (testículo ≥ 4 mL); o mesmo achado <span class="hl-bad">sem puberdade aos ~15a</span> → investigar Klinefelter. O achado é o mesmo; o estadiamento decide.',
      fonte: 'ProloSozz, via Wikimedia Commons',
      licenca: 'CC BY-SA 4.0'
    })}

    ${notaBanca('Para a prova: a prevalência da ginecomastia puberal é <strong>em torno de 50-70% (até ~2/3 dos meninos)</strong> — a faixa cobre os gabaritos (SECAD 50-60%; Nelson até 65-70%). A involução espontânea ocorre <strong>em geral até ~2-3 anos</strong> (a maioria das fontes dá 6 meses a 2 anos; a borda alta é 3 anos). Renderizar como faixa, não como número único.')}

    <aside class="op-summary">
      <p class="op-summary__label">Regra de ouro</p>
      <p><strong>Ginecomastia só é puberal se houver puberdade.</strong> Confirme o início (testículo ≥ 4 mL / G2+) antes de tranquilizar. Achado mamário aos ~15a <strong>sem</strong> puberdade → investigar (<strong>Klinefelter</strong>). A idade não decide; o estadiamento decide.</p>
    </aside>

    <aside class="trap">
      <span class="trap__icon" aria-hidden="true">!</span>
      <div class="trap__body">
        <p class="trap__label">Pegadinha de prova</p>
        <p class="trap__text"><strong>Não basta a idade.</strong> Ginecomastia "na idade da puberdade" não é automaticamente puberal — exige <strong>confirmação de que a puberdade começou</strong>. A alternativa que conclui "15 anos com ginecomastia = fisiológico puberal" <strong>sem checar o estadiamento</strong> é a incorreta — pode ser Klinefelter (link com a aula de síndromes genéticas).</p>
      </div>
    </aside>

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>A ginecomastia puberal é uma das queixas que mais geram angústia no adolescente e nos pais — e a conduta certa, na imensa maioria, é <strong>tranquilizar e acompanhar</strong>, não tratar nem investigar. Mas o reflexo de <strong>checar o estadiamento puberal antes de tranquilizar</strong> é o que captura o caso raro e grave (Klinefelter) sem submeter todos os outros a investigação. Um exame físico (orquidômetro) decide.</p>
    </aside>

    ${quiz('p11', 'A regra decisiva da ginecomastia e seu prognóstico.', [
      {
        stem: 'Um adolescente de 15 anos apresenta ginecomastia bilateral. Qual conduta de raciocínio define se ela é fisiológica puberal?',
        alts: [
          { t: 'É fisiológica, pois 15 anos está na idade da puberdade', correct: false, why: 'Classifica pela idade nua — o erro exato que a página desmonta; idade não é estadiamento.' },
          { t: 'Verificar se ele já entrou na puberdade (testículo ≥ 4 mL / G2+) antes de classificar', correct: true, why: 'Certa. A regra decisiva: ginecomastia só é puberal se houver puberdade — não basta a idade. Confirma-se o início (testículo ≥ 4 mL) antes de classificar; se não houver puberdade aos 15a, pensa-se em Klinefelter.' },
          { t: 'É patológica, pois ginecomastia em homem é sempre doença', correct: false, why: 'Generaliza "doença" — a ginecomastia é fisiológica em três contextos (neonato, puberdade, idoso); ignora a fisiologia.' },
          { t: 'Iniciar tratamento farmacológico imediatamente', correct: false, why: 'Trata sem indicação e no momento errado — o farmacológico só serviria muito cedo (quando não se indica) e, além disso, a maioria regride sozinha; cai no paradoxo terapêutico.' },
        ]
      },
      {
        stem: 'Sobre a ginecomastia puberal fisiológica, qual afirmação está CORRETA?',
        alts: [
          { t: 'É rara, ocorrendo em menos de 10% dos meninos', correct: false, why: 'Subestima grosseiramente a prevalência — é a regra, não a exceção.' },
          { t: 'Ocorre em torno de 50-70% dos meninos e costuma involuir em geral até ~2-3 anos', correct: true, why: 'Certa. É comum — em torno de 50-70% (até ~2/3) dos meninos — e tem prognóstico excelente, com involução espontânea em geral até ~2-3 anos.' },
          { t: 'Nunca regride espontaneamente, exigindo sempre cirurgia', correct: false, why: 'Nega a involução espontânea, que é o desfecho mais comum; a cirurgia é exceção (não regrediu + sofrimento psíquico).' },
          { t: 'O tratamento farmacológico é eficaz mesmo quando iniciado tardiamente', correct: false, why: 'Inverte o paradoxo terapêutico: o farmacológico só funciona se muito precoce — iniciado tarde, perde eficácia (sobra a cirurgia).' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 12 — E7 Comparação chocante · interleaving ===================== */
  // Página 12 — Estratégia: E7 — Comparação chocante
  P.push(page('p12', 12, `
    ${tag('trap', 'Não confunda · os pares que a banca troca')}
    ${chips(['gonadarca × adrenarca', 'reativação × modificação', 'M3 × G4', 'telarca × menarca', 'Tanner × Turner'])}

    <section class="opener opener--vs" aria-label="Comparação de abertura">
      <div class="opener__vs-grid">
        <div class="opener__vs-side">
          <h3>Iguais na aparência</h3>
          <p>Dois achados podem ser visualmente idênticos e significar coisas opostas (M4 × G4, ginecomastia ±puberdade).</p>
        </div>
        <div class="opener__vs-divider" aria-hidden="true">vs</div>
        <div class="opener__vs-side">
          <h3>Iguais no tempo</h3>
          <p>Dois eventos podem acontecer no mesmo dia e ter eixos diferentes (gonadarca × adrenarca).</p>
        </div>
      </div>
      <p class="opener__vs-asterisk">A banca vive de trocar um pelo outro. Aqui estão os pares que ela embaralha — e o detalhe exato que separa cada um.</p>
    </section>

    <h1 class="page-title">Os pares confundíveis: o que decide cada um</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">Pares de fisiologia: os dois eixos e os dois "ativar"</h3>
        <ul>
          <li><strong>Gonadarca × Adrenarca</strong> — coincidem no <strong>tempo</strong>, mas são <strong>eixos distintos</strong>: gonadarca = esteroides sexuais <strong>gonadais</strong> (HHG; marca o início; telarca/aumento testicular); adrenarca = <strong>androgênios adrenais</strong> (HHA; zona reticular; pubarca). <em>O que decide</em>: qual hormônio e qual órgão — não o momento, que é o mesmo.</li>
          <li><strong>"Reativação" × "Modificação do padrão"</strong> — o eixo <strong>gonadal (HHG)</strong> sofre <strong>reativação</strong> (já funcionou na minipuberdade dos primeiros meses); o eixo <strong>adrenal (HHA)</strong> sofre <strong>modificação do padrão</strong> (funciona desde a vida fetal, produzindo cortisol). <em>O que decide</em>: nenhum dos dois "ativa pela primeira vez" — e o termo certo difere entre eles.</li>
        </ul>

        <h3 class="topic-h">Pares de estadiamento e crescimento</h3>
        <ul>
          <li><strong>M3 × G4 (os picos)</strong> — o pico de crescimento é em <strong>M3</strong> na menina (8-9 cm/ano) e em <strong>G4</strong> no menino (9-10 cm/ano). <em>O que decide</em>: o pico feminino é <strong>precoce</strong> (M3), o masculino <strong>tardio</strong> (G4) — e em <strong>M2 a menina já acelera</strong>, enquanto em <strong>G2 o menino ainda não</strong>.</li>
          <li><strong>M4 (duplo contorno) × G4 (contorno da glande)</strong> — são os <strong>paralelos</strong> entre os sexos: a projeção/elevação da aréola (M4) corresponde ao destaque do contorno da glande (G4). <em>O que decide</em>: é uma analogia útil, não um erro — mas não troque o estágio (M4 ≠ M3/M5; G4 ≠ G3/G5).</li>
          <li><strong>Telarca × Menarca</strong> — telarca é o <strong>primeiro</strong> sinal (M2, estrogênio/gonadarca); menarca é o <strong>último</strong> evento (M4, tardio, perto do fim). <em>O que decide</em>: telarca abre, menarca quase fecha — ~2-2,5 anos as separam.</li>
        </ul>

        <h3 class="topic-h">Pares de pegadinha clínica</h3>
        <ul>
          <li><strong>Tanner × Turner</strong> — <strong>Tanner</strong> é o <strong>autor</strong> do estadiamento; <strong>Turner</strong> é a <strong>síndrome</strong> (45,X, baixa estatura + atraso puberal). <em>O que decide</em>: um é escala, o outro é doença — homófonos perigosos.</li>
          <li><strong>Volume testicular × Volume ovariano</strong> — ambos aumentam ao estímulo gonadotrófico, mas só o <strong>testicular</strong> é <strong>mensurável</strong> (≥ 4 mL = G2 = puberdade começou); o <strong>ovariano</strong> aumenta mas <strong>não é palpável</strong>, logo não serve de marcador. <em>O que decide</em>: a acessibilidade ao exame físico.</li>
          <li><strong>Ginecomastia COM × SEM puberdade</strong> — com puberdade (testículo ≥ 4 mL / G2+) = <strong>fisiológica</strong> (tranquilizar); sem puberdade aos ~15a = <strong>investigar Klinefelter</strong>. <em>O que decide</em>: o estadiamento, <strong>não</strong> a idade.</li>
        </ul>
      </div>
    </div>

    ${svgPiso('S-pares', { caption: 'os pares confundíveis (reativação) — cada cartão mostra o par (ex.: "M3 ♀" | "G4 ♂") e, ao virar/revelar, expõe o discriminador que os separa. Cobre os pares dos três tópicos, reaproveitando os ícones já vistos nas páginas de origem.', hint: 'Vire cada cartão (clique / Tab + Enter): o discriminador escondido é a recompensa — active recall.' })}

    ${med({
      file: 'p12-cariotipo-turner-45-X.jpg',
      alt: 'Cariótipo humano 45,X (síndrome de Turner): falta um cromossomo sexual, restando um único X.',
      titulo: 'Cariótipo real —',
      achado: '<strong>cariótipo 45,X (síndrome de Turner)</strong> — falta um X. Fecha o par que a banca troca: <strong>Tanner</strong> (autor do estadiamento) × <strong>Turner</strong> (a síndrome 45,X, baixa estatura + atraso puberal). <em>Turner = 45,X (falta um X) · Klinefelter = 47,XXY (sobra um X).</em>',
      fonte: 'The cat~commonswiki, via Wikimedia Commons',
      licenca: 'CC BY-SA 3.0'
    })}

    <aside class="op-summary">
      <p class="op-summary__label">Regra de ouro</p>
      <p>Em todos os pares, <strong>o que decide nunca é a aparência nem a idade isoladas</strong> — é o <strong>discriminador específico</strong>: qual hormônio, qual órgão, qual estágio, qual eixo, ou se a puberdade começou. Achar o discriminador é acertar a questão.</p>
    </aside>

    ${recall([
      'Gonadarca e adrenarca acontecem no mesmo momento — então o que, exatamente, separa uma da outra?',
      'Qual é o pico de crescimento da menina e o do menino, e em que estágio cada um cai? E em M2 vs G2, quem já está acelerando?',
      'Mesmo achado mamário num menino de 15 anos: o que decide entre ginecomastia puberal fisiológica e Klinefelter?',
    ])}

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>A prova de pediatria adora a questão que parece testar conhecimento e na verdade testa <strong>discriminação</strong> — duas alternativas quase iguais, e o ponto é qual detalhe as separa. Treinar os pares isoladamente, fora da página em que cada um foi ensinado, é o que fixa o discriminador na memória de longo prazo (não só o conceito solto).</p>
    </aside>

    ${quiz('p12', 'Discriminação ativa dos pares confundíveis.', [
      {
        stem: 'Dois achados podem ser confundidos. Qual par está corretamente discriminado?',
        alts: [
          { t: 'Gonadarca e adrenarca são o mesmo evento, pois ocorrem juntas', correct: false, why: 'Funde gonadarca e adrenarca pela coincidência temporal — são eixos/órgãos/hormônios distintos.' },
          { t: 'O pico de crescimento é em M3 (♀) e G4 (♂); em M2 a menina já acelera, em G2 o menino não', correct: true, why: 'Certa. Os picos e o descompasso: M3 ♀ / G4 ♂, com a menina já acelerando em M2 e o menino ainda não em G2.' },
          { t: 'Telarca é o evento mais tardio da puberdade feminina; menarca é o primeiro sinal', correct: false, why: 'Inverte telarca e menarca — telarca é o primeiro sinal, menarca o último.' },
          { t: 'Tanner é a síndrome de baixa estatura; Turner é o estadiamento puberal', correct: false, why: 'Inverte Tanner e Turner — Tanner é o autor da escala, Turner é a síndrome (45,X); cai na homofonia exata que a página combate.' },
        ]
      },
      {
        stem: 'Por que o aumento do volume testicular serve como marcador de início puberal, mas o ovariano não, ainda que ambos aumentem?',
        alts: [
          { t: 'Porque o ovário não responde a LH/FSH', correct: false, why: 'Nega a fisiologia do eixo — o ovário responde a LH/FSH (faz volume + estrogênio).' },
          { t: 'Porque só o testículo é palpável/mensurável no exame físico', correct: true, why: 'Certa. Ambos crescem ao estímulo gonadotrófico, mas só o testículo é acessível ao exame (palpável, mensurável pelo orquidômetro — ≥ 4 mL); o ovário, intra-abdominal, aumenta mas não se mede na rotina.' },
          { t: 'Porque o ovário só aumenta após a menarca', correct: false, why: 'Erra o tempo — o aumento ovariano é precoce (antes da telarca), não pós-menarca.' },
          { t: 'Porque o aumento testicular ocorre antes do estímulo gonadotrófico', correct: false, why: 'Inverte a causalidade — o aumento testicular é consequência do estímulo gonadotrófico, não anterior a ele.' },
        ]
      },
    ])}
  `));

  /* ===================== PÁGINA 13 — E5 Meta + checklist · HERÓI H1 síntese ===================== */
  // Página 13 — Estratégia: E5 — Meta da página + checklist
  P.push(page('p13', 13, `
    ${tag('meta', 'Síntese · o Mapa de Tanner completo')}
    ${chips(['Blair = M2P2', 'Serena = M4+', 'Dan = G3P3', 'estadiar resolve', 'gineco ±puberdade'])}

    <section class="opener opener--checklist" aria-label="Checklist de domínio da síntese">
      <p class="opener__checklist-title">Com o Mapa de Tanner fechado, dá para:</p>
      <ul class="opener__checklist">
        <li class="opener__checklist-item"><span class="opener__check" data-checked="true" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7l3.5 3.5L12 3.5"/></svg></span><span>Estadiar Blair e dizer se é <strong>fisiológico ou distúrbio</strong></span></li>
        <li class="opener__checklist-item"><span class="opener__check" data-checked="true" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7l3.5 3.5L12 3.5"/></svg></span><span>Estadiar Dan e decidir se a <strong>ginecomastia</strong> dele preocupa</span></li>
        <li class="opener__checklist-item"><span class="opener__check" data-checked="true" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7l3.5 3.5L12 3.5"/></svg></span><span>Ler o <strong>Mapa de Tanner completo</strong> (M/G/P × achado × hormônio × crescimento × idade)</span></li>
        <li class="opener__checklist-item"><span class="opener__check" data-checked="true" aria-hidden="true"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7l3.5 3.5L12 3.5"/></svg></span><span>Diferenciar ginecomastia fisiológica de <strong>Klinefelter</strong> pelo estadiamento</span></li>
      </ul>
    </section>

    <h1 class="page-title">Voltando ao começo: o que Blair, Serena e Dan têm</h1>

    <div class="lesson-card">
      <div class="prose">
        <h3 class="topic-h">Resolvendo Blair (M2P2) e Serena</h3>
        <p>Hora de estadiar Blair com o Mapa de Tanner. Ao exame: <strong>tecido glandular subareolar</strong> = <strong>M2</strong>; <strong>pelos apenas nos grandes lábios</strong> (finos, lisos, pouco pigmentados) = <strong>P2</strong>. Blair é <span class="hl-good">M2 P2</span> — e <strong>M2 P2 é absolutamente normal para uma menina de 13 anos</strong>. Um detalhe do caso que a banca planta: o enunciado descreveu desenvolvimento mamário <strong>bilateral</strong>, mas atenção — muitas meninas têm desenvolvimento inicial <strong>unilateral</strong>, e pode haver <span class="hl-warn">assimetria mamária importante</span> durante a puberdade, que se ajusta ao final dela (as mamas tornam-se mais simétricas). <strong>Conclusão de Blair</strong>: ela <strong>não tem problema</strong> — tem <span class="hl-good">puberdade fisiológica</span>; aos 13 anos já entrou na puberdade (telarca em curso desde os 12, M2P2). A preocupação dela — não ter menstruado, ser baixa como a amiga — <strong>não configura distúrbio</strong>. E Serena, que já menstruou aos 12, está apenas <strong>mais adiantada no tempo, dentro do normal</strong> — e, pelo raciocínio de prognóstico, possivelmente terá <strong>menos</strong> estatura a ganhar que Blair, justamente por já ter passado a menarca. A pergunta-fio do caso está respondida: <strong>relógio, não doença</strong>.</p>

        <h3 class="topic-h">Resolvendo Dan (G3P3) e o contraste com Klinefelter</h3>
        <p>Agora o segundo caso. <strong>Dan</strong>, 15 anos, namorado de Serena: aumento <strong>bilateral</strong> da glândula mamária com ~2 cm de diâmetro (ginecomastia), que ele tenta disfarçar. A pergunta-armadilha: ginecomastia aos 15 anos <strong>preocupa ou é fisiológica puberal?</strong> Pela regra da ginecomastia, <strong>não se responde pela idade</strong> — é preciso verificar se ele <strong>já entrou na puberdade</strong>. Exame de Dan: pênis com aumento do <strong>comprimento</strong>, sem diferenciação nítida entre glande e corpo = <strong>G3</strong>; pelos escuros, grossos e encaracolados em pequena quantidade na região pubiana = <strong>P3</strong>. Dan é <span class="hl-good">G3 P3</span> — ou seja, <strong>já está na puberdade</strong>. <strong>Conclusão de Dan</strong>: como a ginecomastia <strong>acompanha a puberdade</strong> (G3P3 confirma o início), trata-se de <span class="hl-good">ginecomastia puberal fisiológica</span> — basta <strong>tranquilizar</strong>, pois deve regredir em ~2-3 anos. O contraste que fecha o raciocínio: <strong>se</strong> Dan tivesse a mesma ginecomastia aos 15 anos <strong>mas com testículo pré-púbere</strong> (sem ter entrado na puberdade), a história seria outra — investigar <span class="hl-bad">síndrome de Klinefelter</span>. Mesmo achado, dois desfechos, e o que decide é o <strong>estadiamento</strong>.</p>

        <h3 class="topic-h">O Mapa de Tanner completo</h3>
        <p>Tudo o que se desenvolveu até aqui cabe num único mapa. O <span class="term">Mapa de Tanner completo</span> cruza, para os dois sexos: <strong>estágio (1→5) × achado físico × evento hormonal × marco de crescimento × idade</strong>. Lendo-o de uma vez: a telarca (M2) e o aumento testicular (G2, ≥4 mL) são gonadarca/esteroides sexuais; a pubarca (P2) é adrenarca/androgênio adrenal; o crescimento acelera em M2 (♀) e pica em M3 (♀, 8-9 cm/ano), enquanto no menino o estirão inicia em G3 e pica em G4 (9-10 cm/ano); a menarca é tardia (M4); e os números mágicos 8/9 abrem cada janela. Plotados no mapa, os três personagens param de ser novela e viram coordenadas: <strong>Blair em M2P2</strong> (início, normal), <strong>Serena em M4+</strong> (já menstruou, adiantada normal), <strong>Dan em G3P3</strong> (puberal, ginecomastia fisiológica). O mapa é todo o raciocínio puberal numa imagem.</p>
      </div>
    </div>

    ${svgHero('p13', { caption: 'o Mapa de Tanner completo — fechamento do objeto persistente que nasceu vazio: estágio (1→5) × achado × hormônio × crescimento × idade, para os dois sexos (M1-5, G1-5, P1-5), com a coluna de hormônio (telarca = estrogênio/gonadarca; pubarca = androgênio adrenal/adrenarca; aumento testicular = gonadarca), a de crescimento (♀ acelera M2 / pico M3 8-9 / menarca M4 desacelera; ♂ estirão G3 / pico G4 9-10 / desacelera G5), o corte ≥ 4 mL em G2 e os números mágicos 8/9. Sobre ele, três pins: Blair (M2P2, normal), Serena (M4+, adiantada normal) e Dan (G3P3, ginecomastia puberal). O aluno lê o mapa inteiro numa olhada — os personagens viram coordenadas.' })}

    ${svgPiso('S-ddxFinal', { caption: 'o diferencial final — duas colunas espelhadas: ginecomastia COM puberdade (Dan, G3P3) = fisiológica, tranquiliza (verde) × ginecomastia SEM puberdade (~15a, testículo pré-púbere) = investigar Klinefelter, link com a aula de síndromes genéticas (âmbar). O mesmo achado, dois desfechos: o estadiamento decide.', hint: 'Revele cada coluna: verde × âmbar são os desfechos opostos do mesmo achado.' })}

    ${svgPiso('S-cardResolucao', { caption: 'o elenco resolvido — os três cards iniciais voltam carimbados: Blair "puberdade fisiológica ✔", Serena "adiantada no tempo, normal ✔", Dan "ginecomastia puberal, regride ✔". O card de Dan deixa de ser semitransparente: o arco narrativo fecha — relógio, não doença.', hint: 'Revele o carimbo de cada card: o arco aberto na P1 se fecha aqui.' })}

    ${med({
      file: 'p13-cariotipo-klinefelter-47-xxy.jpg',
      alt: 'Cariótipo humano 47,XXY (síndrome de Klinefelter): um cromossomo X extra entre os cromossomos sexuais.',
      titulo: 'Cariótipo real —',
      achado: '<strong>cariótipo 47,XXY (síndrome de Klinefelter)</strong> — um X a mais. É o desfecho do "Dan sem puberdade": <span class="hl-bad">ginecomastia SEM puberdade</span> aos ~15a → investigar Klinefelter (elo de volta com a aula de síndromes genéticas). <em>Klinefelter = 47,XXY · Turner = 45,X.</em>',
      fonte: 'The cat~commonswiki, via Wikimedia Commons',
      licenca: 'CC BY-SA 3.0 / GFDL'
    })}

    ${synthCases([
      '<strong>Blair · 13a · M2 P2.</strong> Telarca há ~1 ano, baixa estatura, ainda sem menarca. M2P2 é normal aos 13 — <strong>puberdade fisiológica</strong>; tranquilizar. Sem menstruar e baixa como a amiga não configura distúrbio.',
      '<strong>Serena · 13a · M4+.</strong> Menarca aos 12, mesma altura de Blair. Apenas <strong>mais adiantada no tempo, dentro do normal</strong> — e, por já ter passado a menarca, possivelmente terá menos estatura a ganhar que Blair.',
      '<strong>Dan · 15a · G3 P3 + ginecomastia bilateral.</strong> G3P3 confirma que já entrou na puberdade → <strong>ginecomastia puberal fisiológica</strong>, tranquilizar (regride em ~2-3 anos). Mesmo achado SEM puberdade (testículo pré-púbere) → investigar Klinefelter.',
    ])}

    <aside class="op-summary">
      <p class="op-summary__label">Regra de ouro</p>
      <p><strong>Estadiar resolve.</strong> Blair (M2P2) e Dan (G3P3) só se classificam depois de estadiados — e os dois são <strong>fisiológicos</strong>. A idade nunca decidiu nada sozinha; o <strong>Tanner</strong> decidiu tudo.</p>
    </aside>

    <aside class="trap">
      <span class="trap__icon" aria-hidden="true">!</span>
      <div class="trap__body">
        <p class="trap__label">Pegadinha de prova</p>
        <p class="trap__text"><strong>Assimetria/unilateralidade mamária na puberdade é comum e fisiológica</strong> — não confundir desenvolvimento inicial unilateral com doença. E, em Dan, <strong>não cair na idade</strong>: G3P3 é o que torna a ginecomastia puberal; sem puberdade, seria Klinefelter.</p>
      </div>
    </aside>

    <aside class="practice">
      <p class="practice__label">Por que importa na prática</p>
      <p>Todo o raciocínio puberal converge num único reflexo de consultório: diante de qualquer queixa, <strong>estadiar antes de classificar</strong>. Blair e Dan são fisiológicos não porque "13 e 15 anos são idades normais", mas porque <strong>M2P2 e G3P3 são achados normais para essas idades</strong> — e o mesmo método captura o caso grave (Klinefelter) quando o estadiamento não bate com a idade. O Mapa de Tanner é a ferramenta que torna esse reflexo automático.</p>
    </aside>

    ${quiz('p13', 'A síntese aplicada: Blair e Dan resolvidos.', [
      {
        stem: 'Blair, 13 anos: tecido glandular subareolar (M2) e pelos finos só nos grandes lábios (P2). Qual a classificação e a conduta?',
        alts: [
          { t: 'Distúrbio puberal — atraso, pois aos 13 anos deveria ter menstruado', correct: false, why: 'Classifica pela idade/menarca ausente, ignorando que a puberdade já começou (M2) e que a menarca é tardia (não obrigatória aos 13).' },
          { t: 'Puberdade fisiológica (M2P2 é normal aos 13 anos) — tranquilizar', correct: true, why: 'Certa. Estadiada, Blair é M2P2 — achado normal para 13 anos (entrou na puberdade, telarca em curso); conduta = tranquilizar.' },
          { t: 'Puberdade precoce, pela telarca presente', correct: false, why: 'Chama de precoce — o oposto: precoce seria início antes dos 8; aos 12-13 está dentro da janela 8-13.' },
          { t: 'Indicação de dosagens hormonais e idade óssea antes de qualquer conduta', correct: false, why: 'Parte para exame caro onde o estadiamento já resolveu — inverte a ordem clínica correta (exame físico antes de laboratório).' },
        ]
      },
      {
        stem: 'Dan, 15 anos, com ginecomastia bilateral, ao exame G3P3. Qual a conduta e o raciocínio?',
        alts: [
          { t: 'Investigar Klinefelter, pois ginecomastia aos 15 anos é sempre suspeita', correct: false, why: 'Klinefelter é o cenário do menino com ginecomastia SEM puberdade (testículo pré-púbere); Dan tem puberdade (G3P3), então não se aplica; não usou o estadiamento que a regra exige.' },
          { t: 'Ginecomastia puberal fisiológica (já está na puberdade, G3P3) — tranquilizar', correct: true, why: 'Certa. Dan é G3P3 = já entrou na puberdade; como a ginecomastia acompanha a puberdade, é fisiológica → tranquilizar (regride em ~2-3 anos).' },
          { t: 'Indicar cirurgia imediata pela ginecomastia bilateral', correct: false, why: 'Salta para cirurgia, reservada a casos que não regridem + sofrimento psíquico — não é a conduta inicial.' },
          { t: 'Iniciar tratamento farmacológico, pois é tardio', correct: false, why: 'Contradiz o paradoxo: o farmacológico só serviria cedo, e mesmo assim sem indicação na maioria; tardio, é ineficaz.' },
        ]
      },
    ])}
  `));

  return P;
}
