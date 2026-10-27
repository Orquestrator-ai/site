/* =========================================
   MÓDULO 2 — VALORES PREDITIVOS, PREVALÊNCIA E PROBABILIDADE PRÉ-TESTE
   10 páginas (m2-01 a m2-10). Conteúdo textual íntegro,
   interativos contextualizados, SVGs próprios.
   ========================================= */

/* ─────────────────────────────────────────
   PÁGINA 1 — O segundo tempo do exame: valores preditivos como probabilidade pós-teste
───────────────────────────────────────── */
GO_RENDER['m2-01'] = function(container, page) {
  const body = `
  ${pageHero({
    module: 'm2', moduleLabel: 'Módulo 2 — Valores Preditivos', pageNum: 1,
    title: 'O segundo tempo do exame: valores preditivos como probabilidade pós-teste',
    lead: 'Depois que o exame voltou positivo ou negativo, qual é a chance de esse resultado estar certo?',
    grad: 'var(--grad-m2)'
  })}

  ${jornadaBar({
    from: { module: 'm1', label: 'Validação de testes — Se, Esp, RV' },
    current: { module: 'm2', label: 'Valores Preditivos' },
    next: { module: 'm3', label: 'Curva ROC' }
  })}

  ${conceptHero({
    question: 'Pergunta central',
    title: 'O paciente voltou com o exame em mãos. A pergunta deixou de ser "qual teste eu peço?" — e virou "quanto eu acredito nesse resultado?"',
    lead: 'Valores preditivos são, antes de qualquer fórmula, a tradução de uma pergunta humana em uma probabilidade clínica.',
    glow: 'rgba(20,184,166,.22)'
  })}

  ${crossLink({
    module: 'm1', pageId: 'm1-12', variant: 'recap',
    label: 'Revisar Razão de Verossimilhança (M1)',
    hint: 'RV+ e RV− são a ponte natural para VPP e VPN — vale revisar antes de seguir.'
  })}

  ${keyTerms(['valores preditivos','probabilidade pós-teste','VPP','VPN','resultado positivo','resultado negativo','confiança no exame','paciente voltou'])}

  <div class="prose">
    <p>Valores preditivos entram em cena quando o exame já foi feito. Antes, o médico estava no <strong>primeiro tempo</strong>: avaliava a suspeita clínica, decidia se valia a pena pedir um exame, escolhia um teste mais sensível para excluir ou mais específico para confirmar. Agora o jogo mudou. O paciente voltou com o resultado em mãos, e a pergunta deixou de ser "qual teste eu peço?" para virar <em>"quanto eu acredito nesse resultado?"</em>.</p>

    <p class="pulled">Por isso, valores preditivos são sinônimo de <strong>probabilidade pós-teste</strong>. Eles dizem a probabilidade de o resultado do exame representar a realidade do paciente.</p>

    <p>O <span class="keyword">valor preditivo positivo</span>, ou VPP, responde à pergunta que o paciente faz com ansiedade: <em>"Doutor, aquele exame que você me pediu veio alterado. Qual é a possibilidade de eu realmente ter a doença?"</em>. Essa é uma pergunta de VPP. Não é mais sensibilidade. Não é mais especificidade. É a confiança no positivo depois que o positivo aconteceu.</p>

    <p>O <span class="keyword">valor preditivo negativo</span>, ou VPN, responde a outra pergunta muito comum: <em>"Doutora, meu exame veio normal, mas eu continuo me sentindo mal. Qual é a probabilidade desse exame normal estar certo?"</em>. Essa é uma pergunta de VPN. O foco agora não é detectar doentes em uma população nem separar não doentes. O foco é interpretar <strong>aquele resultado específico</strong> que voltou para aquele paciente.</p>

    <p>A primeira virada didática desta página é esta: <strong>valores preditivos não começam na fórmula; começam na pergunta humana.</strong> Quando o paciente pergunta "meu resultado positivo quer dizer que eu tenho a doença?", ele está pedindo VPP. Quando pergunta "meu resultado negativo realmente me tranquiliza?", ele está pedindo VPN.</p>
  </div>

  ${sectionTitle('🩺','Dois tempos do exame — antes × depois', 'var(--c-teal)')}
  <div class="split2">
    <div class="case-card" style="border-left:6px solid var(--c-blue);">
      <strong style="color:var(--c-blue);">PRIMEIRO TEMPO — pré-teste</strong>
      <p>Médico avalia história, sintomas, fatores de risco. Escolhe o exame. Aqui valem <strong>sensibilidade</strong> e <strong>especificidade</strong> (propriedades do teste).</p>
    </div>
    <div class="case-card" style="border-left:6px solid var(--c-teal);">
      <strong style="color:var(--c-teal);">SEGUNDO TEMPO — pós-teste</strong>
      <p>Paciente volta com o resultado. Médico precisa explicar o que aquele resultado significa. Aqui entram <strong>VPP</strong> e <strong>VPN</strong> (probabilidade pós-teste).</p>
    </div>
  </div>

  ${didaxBlock('caso','🩺','Situação-problema: duas perguntas em um dia de consultório',
    `<p>Manhã: paciente retorna com exame alterado. <em>"Doutor, esse exame positivo quer dizer que eu realmente tenho a doença?"</em></p>
    <p>Tarde: outra paciente retorna com exame normal, ainda sintomática. <em>"Meu exame veio normal, mas eu continuo mal. Posso confiar nesse resultado?"</em></p>
    <p><strong>Lição:</strong> a primeira pergunta é VPP, a segunda é VPN. Reconhecer a pergunta antes de pensar em fórmula é o que separa o aluno avançado.</p>`)}

  ${didaxBlock('importa','💡','Por que isso importa na prática?',
    `<p>O médico não interpreta exames no vazio. Ele precisa explicar ao paciente o que um resultado significa. Um exame positivo não é automaticamente doença; um exame negativo não é automaticamente tranquilidade. <strong>Valor preditivo ensina a transformar resultado laboratorial em probabilidade clínica.</strong></p>`)}

  ${bancaCallout(`<p>A banca quer que o aluno reconheça a pergunta escondida:</p>
    <ul class="tight">
      <li>"probabilidade de estar doente <strong>dado que</strong> o teste foi positivo" = <strong>VPP</strong>;</li>
      <li>"probabilidade de não estar doente <strong>dado que</strong> o teste foi negativo" = <strong>VPN</strong>;</li>
      <li>"probabilidade pós-teste" = valores preditivos.</li>
    </ul>`)}

  ${didaxBlock('pegadinha','⚠️','Pegadinha de prova',
    `<p>A banca troca VPP por sensibilidade e VPN por especificidade. O aluno lê "teste positivo" e acha que é especificidade; ou lê "teste negativo" e acha que é sensibilidade. <strong>Se a pergunta começa depois do resultado, é valor preditivo.</strong></p>`)}

  ${didaxBlock('naoconfunda','🔀','Não confunda',
    `<ul class="tight">
      <li><strong>Sensibilidade:</strong> antes ou durante a avaliação do teste, entre os doentes.</li>
      <li><strong>Especificidade:</strong> antes ou durante a avaliação do teste, entre os não doentes.</li>
      <li><strong>VPP:</strong> depois do teste positivo.</li>
      <li><strong>VPN:</strong> depois do teste negativo.</li>
    </ul>`)}

  ${didaxBlock('errocomum','❌','Erro comum',
    `<p>Decorar fórmulas sem entender a pergunta do paciente. Isso leva o aluno a usar a coluna errada da tabela.</p>`)}

  ${didaxBlock('avancado','⚡','O que diferencia o aluno avançado',
    `<p>O avançado identifica a frase "<em>dado que</em> o exame veio positivo" ou "<em>dado que</em> o exame veio negativo" <strong>antes</strong> de calcular qualquer coisa. Ele entende a pergunta antes de montar a conta.</p>`)}

  ${didaxBlock('numerico','🔢','Preparação para a fórmula',
    `<p>Nesta página, ainda não calculamos. Apenas fixamos o terreno: <strong>se VPP é confiança no positivo, a fórmula olhará para todos os positivos. Se VPN é confiança no negativo, a fórmula olhará para todos os negativos.</strong></p>`)}

  ${sectionTitle('🔬','Tabela 2x2 — onde VPP e VPN nascem (prévia visual)', 'm2')}
  <p class="mt-prose">Antes de qualquer fórmula, observe os painéis VPP/VPN na lateral direita da tabela abaixo. Eles aparecem prontos — exatamente o que a próxima página irá destrinchar matematicamente. Mexa nos valores, veja como o positivo e o negativo respondem.</p>
  ${PrevInt.tabela2x2({
    vp: 90, fp: 30, fn: 10, vn: 870,
    lockPrev: false,
    title: 'Tabela 2x2 — Sens, Esp e os dois valores preditivos lado a lado'
  })}

  ${revisaoAtiva([
    { q: 'Valores preditivos são sinônimo de quê?', a: 'Probabilidade pós-teste — a chance de o resultado obtido representar a realidade do paciente.' },
    { q: 'VPP interpreta qual tipo de resultado?', a: 'O resultado positivo. VPP responde: "dado um teste positivo, qual a chance de o paciente realmente ter a doença?".' },
    { q: 'VPN interpreta qual tipo de resultado?', a: 'O resultado negativo. VPN responde: "dado um teste negativo, qual a chance de o paciente realmente não ter a doença?".' },
    { q: 'A pergunta "meu exame positivo quer dizer que sou doente?" é sensibilidade, especificidade ou VPP?', a: 'VPP. A pergunta começa depois do resultado positivo — portanto, é probabilidade pós-teste.' }
  ])}

  ${pageFooterMeta({
    resumo: 'Valores preditivos = probabilidade pós-teste. VPP é confiança no positivo; VPN é confiança no negativo. A pergunta humana vem antes da fórmula.',
    proximaConexao: 'Agora que entendemos a pergunta, vamos à tabela 2x2 — onde a fórmula nasce do conceito, não da decoreba.',
    nextId: 'm2-02'
  })}
  `;
  renderStandard(container, page, body);
};

/* ─────────────────────────────────────────
   PÁGINA 2 — Da tabela à fórmula: VPP e VPN sem decoreba
───────────────────────────────────────── */
GO_RENDER['m2-02'] = function(container, page) {
  const body = `
  ${pageHero({
    module: 'm2', moduleLabel: 'Módulo 2 — Valores Preditivos', pageNum: 2,
    title: 'Da tabela à fórmula: VPP e VPN sem decoreba',
    lead: 'VPP olha a linha dos positivos. VPN olha a linha dos negativos. Frase única que resolve a maior parte das questões.',
    grad: 'var(--grad-m2)'
  })}

  ${conceptHero({
    question: 'Pergunta central',
    title: 'Para calcular VPP e VPN, eu olho para qual parte da tabela 2x2?',
    lead: 'Não para as colunas (essas são o território de Sens/Esp). Para as LINHAS — porque a pergunta começa pelo resultado do teste, não pelo status da doença.',
    glow: 'rgba(20,184,166,.22)'
  })}

  ${keyTerms(['linha dos positivos','linha dos negativos','A','B','C','D','verdadeiro positivo','falso positivo','falso negativo','verdadeiro negativo','vai do conceito para a fórmula'])}

  <div class="prose">
    <p>A tabela 2x2 é o mapa que impede o aluno de se perder. Quando o teste é positivo, a resposta está na <strong>linha dos positivos</strong>. Nessa linha existem dois tipos de pessoas: aquelas em que o teste positivo <em>acertou</em> (verdadeiros positivos, A) e aquelas em que o teste positivo <em>errou</em> (falsos positivos, B).</p>

    <p>Por isso, o VPP não olha para todos os doentes; ele olha para todos os <strong>testes positivos</strong>. A pergunta é: <em>"entre todos que tiveram teste positivo, quantos realmente estavam doentes?"</em>. O numerador é o verdadeiro positivo (A). O denominador é o total de positivos (A + B).</p>

    <p class="pulled">A fórmula nasce da pergunta, não da decoreba: <strong>VPP = A / (A + B)</strong>.</p>

    <p>O VPN funciona da mesma forma, mas na linha dos negativos. Quando o teste é negativo, existem dois grupos: aqueles em que o teste negativo <em>acertou</em> (verdadeiros negativos, D) e aqueles em que o teste negativo <em>errou</em> (falsos negativos, C). A pergunta é: <em>"entre todos que tiveram teste negativo, quantos realmente não tinham doença?"</em>. O numerador é D. O denominador é C + D.</p>

    <p>O aluno deve sair desta página com uma frase operacional: <strong>VPP olha a linha dos positivos; VPN olha a linha dos negativos.</strong> Essa frase resolve a maior parte das questões antes de qualquer cálculo.</p>
  </div>

  ${sectionTitle('🧮','Calculadora interativa — descubra as linhas', 'var(--c-teal)')}
  <p style="color:var(--text-muted); margin-bottom: 12px;">Use o exemplo clássico da aula: 182 VP, 24 FP, 18 FN, 176 VN. Veja VPP e VPN serem deduzidos pelas linhas em tempo real.</p>
  ${PrevInt.tabela2x2({ vp: 182, fp: 24, fn: 18, vn: 176, lockPrev: false, title: 'Exemplo clássico — infertilidade (200 doentes / 200 sadios)' })}

  ${sectionTitle('🎯','Visual conceitual da tabela 2x2', 'var(--c-amber)')}
  <div class="dist-wrap">${PrevSVG.tabela2x2Concept()}</div>

  ${didaxBlock('caso','🩺','Situação-problema: clique mental na tabela',
    `<p>Um exame veio positivo. Onde está o denominador do VPP? <strong>Resposta:</strong> na linha dos positivos — A + B.</p>
    <p>Outro exame veio negativo. Onde está o denominador do VPN? <strong>Resposta:</strong> na linha dos negativos — C + D.</p>
    <p>Esse é o gesto mental que o aluno precisa automatizar: <em>resultado do teste → linha da tabela</em>.</p>`)}

  ${didaxBlock('importa','💡','Por que isso importa na prática?',
    `<p>A tabela transforma uma pergunta subjetiva em uma conta clara. O paciente pergunta em linguagem humana; a tabela responde em linguagem probabilística.</p>`)}

  ${bancaCallout(`<p>A banca quer que o aluno monte a razão correta:</p>
    <ul class="tight">
      <li><strong>VPP = A / (A + B)</strong></li>
      <li><strong>VPN = D / (C + D)</strong></li>
    </ul>
    <p>Ou pode dar os valores na tabela e pedir o resultado diretamente. Em ambos os casos, vence quem identifica a <em>linha</em> antes da fórmula.</p>`)}

  ${didaxBlock('pegadinha','⚠️','Pegadinha de prova',
    `<p>A banca coloca um número chamativo na coluna dos doentes para induzir o aluno a calcular sensibilidade em vez de VPP. <strong>Filtro mental:</strong> a pergunta começou pelo "teste positivo"? Então não é coluna — é linha.</p>`)}

  ${didaxBlock('naoconfunda','🔀','Não confunda',
    `<ul class="tight">
      <li>VPP <strong>não</strong> é A / (A + C) — isso seria sensibilidade.</li>
      <li>VPN <strong>não</strong> é D / (B + D) — isso seria especificidade.</li>
      <li>VPP usa <strong>linha</strong> dos positivos.</li>
      <li>VPN usa <strong>linha</strong> dos negativos.</li>
    </ul>`)}

  ${didaxBlock('errocomum','❌','Erro comum',
    `<p>Usar a coluna da doença quando a pergunta é sobre resultado do teste. Em valores preditivos, o ponto de partida é o resultado do exame, não o status da doença.</p>`)}

  ${didaxBlock('avancado','⚡','O que diferencia o aluno avançado',
    `<p>O avançado não pergunta "qual fórmula eu decorei?". Ele pergunta: <em>"a questão me deu um resultado positivo ou negativo?"</em>. Isso define a linha da tabela — e o cálculo se monta sozinho.</p>`)}

  ${formulaBox('Valor Preditivo Positivo (VPP)',
    `${frac('A','A + B')} = ${frac('verdadeiros positivos','total de testes positivos')}`,
    'Entre todos os testes positivos, qual fração realmente é doença?')}

  ${formulaBox('Valor Preditivo Negativo (VPN)',
    `${frac('D','C + D')} = ${frac('verdadeiros negativos','total de testes negativos')}`,
    'Entre todos os testes negativos, qual fração realmente é ausência de doença?')}

  ${didaxBlock('numerico','🔢','Exemplo numérico preservado — 182 / 206 ≈ 88%',
    `<ul class="tight">
      <li>Se <strong>206 pessoas</strong> tiveram teste positivo, e <strong>182 delas</strong> eram verdadeiros positivos, então:</li>
      <li>VPP = 182 / 206 ≈ <strong>88%</strong>.</li>
      <li>Interpretação clínica: a cada 100 testes positivos nesse cenário, cerca de 88 representam doença real. Os outros 12 são falsos positivos.</li>
    </ul>`)}

  ${revisaoAtiva([
    { q: 'O VPP usa linha ou coluna?', a: 'Linha — especificamente a linha dos testes positivos (A + B).' },
    { q: 'O denominador do VPP é qual?', a: 'A + B (verdadeiros positivos + falsos positivos = total de testes positivos).' },
    { q: 'O numerador do VPN é qual?', a: 'D — os verdadeiros negativos (testes negativos que acertaram).' },
    { q: 'Se 182 de 206 positivos estão certos, qual é o VPP?', a: '182 / 206 ≈ 88%.' }
  ])}

  ${pageFooterMeta({
    resumo: 'VPP = A/(A+B) — linha dos positivos. VPN = D/(C+D) — linha dos negativos. Fórmulas deduzidas do conceito.',
    proximaConexao: 'Agora vem a virada que muda tudo: diferentemente de Sens/Esp, valores preditivos MUDAM com a prevalência. É hora da porquinha torcer o rabo.',
    nextId: 'm2-03'
  })}
  `;
  renderStandard(container, page, body);
};

/* ─────────────────────────────────────────
   PÁGINA 3 — A porquinha torce o rabo: por que valores preditivos mudam com prevalência
───────────────────────────────────────── */
GO_RENDER['m2-03'] = function(container, page) {
  const body = `
  ${pageHero({
    module: 'm2', moduleLabel: 'Módulo 2 — Valores Preditivos', pageNum: 3,
    title: 'A porquinha torce o rabo: por que valores preditivos mudam com prevalência',
    lead: 'Sensibilidade e especificidade não mudam com prevalência. Valores preditivos sim. É aqui que o raciocínio se complica — e fica bonito.',
    grad: 'var(--grad-m2)'
  })}

  ${conceptHero({
    question: 'Pergunta central',
    title: 'Por que o mesmo teste pode ter significados clínicos diferentes em populações diferentes?',
    lead: 'Porque um exame não cai do céu — ele aterrissa em um território epidemiológico. A prevalência local define se um positivo combina ou surpreende.',
    glow: 'rgba(245,158,11,.22)'
  })}

  ${keyTerms(['prevalência','VPP acompanha prevalência','VPN inverso','tuberculose','Rio de Janeiro','Complexo da Maré','Complexo do Alemão','Londres didática','teste do escarro','porquinha torce o rabo'], 'teal')}

  ${svgIllus(PrevSVG.vppFunil(), 'Duas populações, mesma Sens/Esp (90% / 90%): o funil do VPP se aperta quando a prevalência cai.')}

  <div class="prose">
    <p>Até agora, VPP e VPN pareciam apenas fórmulas. Mas aqui a aula muda de nível. A frase central é: <strong>sensibilidade e especificidade não mudam com a prevalência; valores preditivos mudam.</strong> É nesse ponto que <em>"a porquinha torce o rabo"</em>.</p>

    <p>Imagine tuberculose em um cenário de <strong>alta prevalência</strong>. Em várias regiões do Brasil, especialmente em grandes capitais e áreas periféricas, a tuberculose é uma doença que o médico realmente encontra. O exemplo da aula usa o Rio de Janeiro, incluindo vivências em comunidades como Complexo da Maré e Complexo do Alemão, para fixar a ideia de um ambiente em que a probabilidade de tuberculose <em>antes</em> do exame já é alta.</p>

    <p>Nesse cenário, se um paciente sintomático — com tosse, emagrecimento e febre vespertina — faz um teste do escarro e o resultado vem <strong>positivo</strong>, o médico não fica surpreso. O positivo <em>combina</em> com o contexto. A prevalência é alta, a suspeita clínica é alta, e a confiança no positivo aumenta.</p>

    <p>Mas se esse mesmo paciente, no mesmo cenário de alta prevalência, recebe um teste <strong>negativo</strong>, o médico se incomoda. O negativo <em>não conversa</em> com o contexto. A confiança no negativo diminui, e o médico começa a pensar em falso negativo.</p>

    <p class="pulled">Agora vire a câmera para Londres como cenário didático de <strong>baixa prevalência</strong>. Aqui, o positivo já não é tão intuitivo. Se uma doença é muito rara naquele contexto, um teste positivo gera desconfiança: <em>será falso positivo?</em> Em contrapartida, um teste negativo em ambiente de baixa prevalência é mais tranquilizador.</p>

    <p>A mensagem não é sobre decorar Rio e Londres. A mensagem é entender que o resultado do exame não cai do céu. Ele aterrissa em um território epidemiológico. Quando a doença é comum, o positivo ganha força e o negativo perde força. Quando a doença é rara, o positivo perde força e o negativo ganha força.</p>
  </div>

  ${sectionTitle('🌍','Simulador interativo — veja a porquinha torcer o rabo', 'var(--c-amber)')}
  <p style="color:var(--text-muted); margin-bottom: 12px;">Sensibilidade fixa em 90%, especificidade fixa em 90%. Mova o slider de prevalência: <strong>Sens/Esp não se movem</strong> — mas VPP e VPN dançam em direções opostas.</p>
  ${PrevInt.simPrevalencia({ sens: 0.90, esp: 0.90, prev: 0.50 })}

  ${didaxBlock('caso','🩺','Situação-problema: dois médicos, mesmo resultado',
    `<p>Médico A atua em cenário de <strong>alta prevalência</strong> (Rio didático). Médico B atua em cenário de <strong>baixa prevalência</strong> (Londres didática). Ambos recebem um teste do escarro <em>positivo</em> para tuberculose.</p>
    <p><strong>Quem deve confiar mais no positivo?</strong> Médico A — o positivo combina com o cenário de alta prevalência, VPP é alto.</p>
    <p><strong>Quem deve desconfiar mais?</strong> Médico B — em baixa prevalência, mesmo um teste bom gera muitos FP em números absolutos, e o VPP cai.</p>`)}

  ${didaxBlock('importa','💡','Por que isso importa na prática?',
    `<p>O mesmo resultado tem peso diferente dependendo do lugar, do paciente e da suspeita clínica. <strong>O exame não substitui o julgamento médico — ele entra dentro dele.</strong></p>`)}

  ${bancaCallout(`<p>A banca quer a frase de fixação completa:</p>
    <ul class="tight">
      <li><strong>maior prevalência → maior VPP</strong> (VPP acompanha prevalência);</li>
      <li><strong>maior prevalência → menor VPN</strong>;</li>
      <li><strong>menor prevalência → menor VPP</strong>;</li>
      <li><strong>menor prevalência → maior VPN</strong> (VPN anda em sentido oposto).</li>
    </ul>`)}

  ${didaxBlock('pegadinha','⚠️','Pegadinha de prova',
    `<p>A questão pergunta: "em população de maior prevalência, o que acontece com sensibilidade e especificidade?". A resposta correta é <strong>não mudam</strong> — quem muda é VPP/VPN. Esta é uma das pegadinhas mais repetidas em residência.</p>`)}

  ${didaxBlock('naoconfunda','🔀','Não confunda',
    `<ul class="tight">
      <li><strong>Sensibilidade/Especificidade:</strong> propriedades do teste (fixas).</li>
      <li><strong>VPP/VPN:</strong> propriedades do teste <em>+</em> população (variáveis com prevalência).</li>
    </ul>`)}

  ${didaxBlock('errocomum','❌','Erro comum',
    `<p>Achar que um teste positivo tem sempre o mesmo significado, independentemente da população. <strong>Falso.</strong> O significado clínico do positivo depende de onde o teste foi aplicado.</p>`)}

  ${didaxBlock('avancado','⚡','O que diferencia o aluno avançado',
    `<p>O avançado lê a prevalência <em>antes</em> de interpretar VPP e VPN. Ele sabe que a questão frequentemente entrega a resposta quando informa a prevalência — basta puxar a seta.</p>`)}

  ${didaxBlock('numerico','🔢','Preparação para a próxima página',
    `<p>Esta página construiu a intuição. A próxima transforma "Rio versus Londres" em números: duas tabelas 2x2 lado a lado, 1000 pessoas em cada, sensibilidade e especificidade idênticas — apenas a prevalência muda.</p>`)}

  ${fraseAutoral({
    tag: 'Voz Preventiva',
    body: `Aprendi na ponta da urgência: <strong>o exame nunca aterrissa no vácuo</strong>. Ele cai numa população, numa clínica, numa história. Se o aluno entende isso aqui, no Módulo 2, ele para de pedir teste por reflexo — e começa a <em>raciocinar</em> antes de pedir. É essa virada que separa o residente que decora do residente que decide.`,
    assinatura: 'Intensivão Preventiva · M2-03'
  })}

  ${revisaoAtiva([
    { q: 'O que muda com prevalência: sensibilidade, especificidade, VPP ou VPN?', a: 'Apenas VPP e VPN. Sensibilidade e especificidade são propriedades intrínsecas do teste.' },
    { q: 'Em alta prevalência, o positivo fica mais ou menos confiável?', a: 'Mais confiável — o VPP é alto. Há mais doentes, então um positivo tem alta probabilidade de ser verdadeiro positivo.' },
    { q: 'Em baixa prevalência, o negativo fica mais ou menos confiável?', a: 'Mais confiável — o VPN é alto. Há muitos não doentes, então um negativo provavelmente está certo.' },
    { q: 'O que significa "VPP acompanha prevalência"?', a: 'Que VPP cresce quando a prevalência cresce, e cai quando ela cai — andam na mesma direção.' }
  ])}

  ${pageFooterMeta({
    resumo: 'VPP acompanha prevalência; VPN anda em sentido oposto. Sens/Esp não mudam. A porquinha torce o rabo porque o resultado aterrissa em um território epidemiológico.',
    proximaConexao: 'Hora de transformar a intuição em conta: duas tabelas 2x2 lado a lado, mesma Sens, mesma Esp, prevalência diferente. O resultado vai te surpreender.',
    nextId: 'm2-04'
  })}
  `;
  renderStandard(container, page, body);
};

/* ─────────────────────────────────────────
   PÁGINA 4 — Rio × Londres em números
───────────────────────────────────────── */
GO_RENDER['m2-04'] = function(container, page) {
  const body = `
  ${pageHero({
    module: 'm2', moduleLabel: 'Módulo 2 — Valores Preditivos', pageNum: 4,
    title: 'Rio × Londres em números: a mesma sensibilidade, outro significado clínico',
    lead: 'Duas tabelas 2x2 lado a lado, 1000 pessoas em cada, Sens = Esp = 90%. Só muda a prevalência. E o significado do positivo se inverte.',
    grad: 'var(--grad-m2)'
  })}

  ${conceptHero({
    question: 'Pergunta central',
    title: 'Como a prevalência muda VPP e VPN mesmo quando sensibilidade e especificidade são iguais?',
    lead: 'Veja a matemática provar a intuição: em 1000 pessoas com prevalência 90%, o VPP é 98,8%. Com prevalência 10%, o VPP cai para 50%. Mesmo teste, mesma Sens, mesma Esp.',
    glow: 'rgba(20,184,166,.22)'
  })}

  ${keyTerms(['1000 pessoas','sensibilidade 90%','especificidade 90%','prevalência 90%','prevalência 10%','Rio alta prevalência','Londres baixa prevalência','VPP 98,8%','VPN 50%','inversão de papéis'])}

  <div class="prose">
    <p>Agora a intuição vira número. O teste será o mesmo nos dois cenários: <strong>sensibilidade de 90% e especificidade de 90%</strong>. A população também terá o mesmo tamanho: <strong>1000 pessoas</strong>. A única coisa que muda é a prevalência da doença.</p>

    <p>No cenário de <strong>alta prevalência</strong> (Rio didático), a prevalência será 90%. Em 1000 pessoas, isso significa <strong>900 doentes e 100 não doentes</strong>. Como a sensibilidade é 90%, o teste detecta 90% dos doentes: A = 810 verdadeiros positivos. Os outros 90 doentes ficam como falsos negativos: C = 90.</p>

    <p>A especificidade também é 90%. Entre os 100 não doentes, 90 terão teste negativo verdadeiro: D = 90. Os 10 restantes terão teste positivo falso: B = 10. Agora some a linha dos positivos: A + B = 820. O <strong>VPP é 810 / 820 ≈ 98,8%</strong>. O positivo é muito confiável. Já o total de negativos é C + D = 180. O <strong>VPN é 90 / 180 = 50%</strong>. O negativo é bem menos tranquilizador.</p>

    <p>No cenário de <strong>baixa prevalência</strong> (Londres didática), a prevalência será 10%. Em 1000 pessoas, há <strong>100 doentes e 900 não doentes</strong>. Com sensibilidade de 90%, A = 90 e C = 10. Com especificidade de 90%, entre os 900 não doentes, D = 810 e B = 90.</p>

    <p>Agora o VPP cai: positivos totais = 90 + 90 = 180; <strong>VPP = 90 / 180 = 50%</strong>. O positivo já não é tão confiável. O VPN sobe: negativos totais = 10 + 810 = 820; <strong>VPN = 810 / 820 ≈ 98,8%</strong>. O negativo se torna muito confiável.</p>

    <p class="pulled">A moral: <strong>o teste é o mesmo, mas o significado do resultado muda porque a população mudou.</strong> É por isso que valores preditivos não podem ser interpretados isoladamente.</p>
  </div>

  ${sectionTitle('🏙️','Tabela Rio — alta prevalência (90%)', 'var(--c-blue)')}
  <p style="color:var(--text-muted); margin-bottom: 12px;">1000 pessoas, prevalência 90%, Sens = Esp = 90%. Veja VPP altíssimo, VPN baixo.</p>
  ${PrevInt.tabela2x2({ vp: 810, fp: 10, fn: 90, vn: 90, lockPrev: false, title: 'Rio didático — prevalência 90%' })}

  ${sectionTitle('🇬🇧','Tabela Londres — baixa prevalência (10%)', 'var(--c-teal)')}
  <p style="color:var(--text-muted); margin-bottom: 12px;">1000 pessoas, prevalência 10%, Sens = Esp = 90%. VPP cai, VPN dispara.</p>
  ${PrevInt.tabela2x2({ vp: 90, fp: 90, fn: 10, vn: 810, lockPrev: false, title: 'Londres didática — prevalência 10%' })}

  ${didaxBlock('caso','🩺','Situação-problema: o teste viajou — e o resultado também',
    `<p>O mesmo teste do escarro, com Sens 90% e Esp 90%, é aplicado em duas cidades. A questão fictícia da banca pergunta: <em>"em qual cidade um positivo confirma melhor a doença?"</em>.</p>
    <p><strong>Resposta:</strong> Rio (alta prevalência), porque o VPP é 98,8%. Em Londres, o mesmo positivo significa apenas 50% de chance de doença — praticamente um cara ou coroa.</p>
    <p>A questão poderia ser invertida: <em>"em qual cidade um negativo tranquiliza mais?"</em>. <strong>Resposta:</strong> Londres, porque o VPN é 98,8%.</p>`)}

  ${didaxBlock('importa','💡','Por que isso importa na prática?',
    `<p>A conta prova o que a intuição já sugeria: em uma população com muitos doentes, o positivo tende a estar certo. Em uma população com poucos doentes, o positivo carrega mais risco de ser falso positivo.</p>`)}

  ${bancaCallout(`<p>A banca quer que o aluno saiba <strong>prever o comportamento</strong> antes da conta:</p>
    <ul class="tight">
      <li>prevalência 90% → VPP muito alto, VPN menor;</li>
      <li>prevalência 10% → VPP menor, VPN muito alto.</li>
    </ul>
    <p>E que o aluno saiba <strong>inventar 1000</strong> quando a questão não dá total.</p>`)}

  ${didaxBlock('pegadinha','⚠️','Pegadinha de prova',
    `<p>A banca mantém Sens e Esp iguais e troca apenas a prevalência. O aluno que decora "teste bom = VPP alto" cai. <strong>VPP depende da prevalência tanto quanto do teste.</strong></p>`)}

  ${didaxBlock('naoconfunda','🔀','Não confunda',
    `<p>Baixo VPP em baixa prevalência <strong>não</strong> significa que o teste é "ruim". Significa que, naquele contexto populacional, há muitos não doentes disponíveis para gerar falsos positivos — em números absolutos.</p>`)}

  ${didaxBlock('errocomum','❌','Erro comum',
    `<p>Achar que especificidade 90% sempre garante VPP alto. Em baixa prevalência, mesmo uma boa especificidade produz muitos FP em <strong>números absolutos</strong>, e isso derruba o VPP.</p>`)}

  ${didaxBlock('avancado','⚡','O que diferencia o aluno avançado',
    `<p>O avançado calcula com uma população fictícia de <strong>1000</strong> quando a questão não dá total. Isso organiza a tabela e acelera a prova. É o "truque de inventar mil".</p>`)}

  ${formulaBox('Roteiro de cálculo — população 1000',
    `1) Doentes = 1000 × prevalência<br>2) Não doentes = 1000 − doentes<br>3) A = doentes × sensibilidade<br>4) C = doentes − A<br>5) D = não doentes × especificidade<br>6) B = não doentes − D<br>7) VPP = A/(A+B) &nbsp;&nbsp; VPN = D/(C+D)`,
    'Sequência mecânica que resolve qualquer questão sem total dado.')}

  ${didaxBlock('numerico','🔢','Exemplo numérico completo preservado',
    `<p><strong>Alta prevalência — Rio didático (90%)</strong></p>
    <ul class="tight">
      <li>Doentes 900 / Não doentes 100 / Sens 90% / Esp 90%</li>
      <li>A = 810 &nbsp; B = 10 &nbsp; C = 90 &nbsp; D = 90</li>
      <li>VPP = 810/820 ≈ <strong>98,8%</strong> &nbsp; VPN = 90/180 = <strong>50%</strong></li>
    </ul>
    <p style="margin-top:10px;"><strong>Baixa prevalência — Londres didática (10%)</strong></p>
    <ul class="tight">
      <li>Doentes 100 / Não doentes 900 / Sens 90% / Esp 90%</li>
      <li>A = 90 &nbsp; B = 90 &nbsp; C = 10 &nbsp; D = 810</li>
      <li>VPP = 90/180 = <strong>50%</strong> &nbsp; VPN = 810/820 ≈ <strong>98,8%</strong></li>
    </ul>`)}

  ${revisaoAtiva([
    { q: 'Em 1000 pessoas com prevalência de 90%, quantos doentes existem?', a: '900 doentes (e 100 não doentes).' },
    { q: 'Se a sensibilidade é 90%, qual é A?', a: 'A = 90% × 900 = 810.' },
    { q: 'Se a especificidade é 90% entre 100 não doentes, qual é D?', a: 'D = 90% × 100 = 90.' },
    { q: 'Por que o VPP ficou alto no cenário de alta prevalência?', a: 'Porque há muitos verdadeiros positivos (810) e poucos falsos positivos (10), então a fração A/(A+B) é muito próxima de 1.' },
    { q: 'Por que o VPN ficou alto no cenário de baixa prevalência?', a: 'Porque há muitos verdadeiros negativos (810) e poucos falsos negativos (10), então D/(C+D) é altíssimo.' }
  ])}

  ${pageFooterMeta({
    resumo: 'Mesmo teste, mesma Sens, mesma Esp. Só a prevalência mudou — e o significado do positivo se inverteu. Rio: VPP 98,8%, VPN 50%. Londres: VPP 50%, VPN 98,8%.',
    proximaConexao: 'A prevalência é populacional. No consultório, ela vira algo mais íntimo: a probabilidade pré-teste do paciente concreto à sua frente.',
    nextId: 'm2-05'
  })}
  `;
  renderStandard(container, page, body);
};

/* ─────────────────────────────────────────
   PÁGINA 5 — Prevalência vira probabilidade pré-teste
───────────────────────────────────────── */
GO_RENDER['m2-05'] = function(container, page) {
  const body = `
  ${pageHero({
    module: 'm2', moduleLabel: 'Módulo 2 — Valores Preditivos', pageNum: 5,
    title: 'Prevalência vira probabilidade pré-teste: o exame começa antes do exame',
    lead: 'No consultório, prevalência deixa de ser número da cidade — e vira probabilidade pré-teste daquele paciente concreto à sua frente.',
    grad: 'var(--grad-m2)'
  })}

  ${conceptHero({
    question: 'Pergunta central',
    title: 'Na prática clínica, como eu uso prevalência se não sei a prevalência exata da cidade?',
    lead: 'Você transforma anamnese, fatores de risco, sintomas e exame físico em uma estimativa individualizada — a probabilidade pré-teste.',
    glow: 'rgba(20,184,166,.22)'
  })}

  ${keyTerms(['probabilidade pré-teste','prevalência individualizada','alto risco','dor torácica típica','ECG','supra-ST','falso negativo','homem 68 anos','Fortaleza','infarto'])}

  <div class="prose">
    <p>A prevalência parece um conceito populacional distante: tuberculose no Rio, tuberculose em Londres, hipertensão em Goiânia. Mas, na prática médica, o médico nem sempre sabe a prevalência exata da doença naquela cidade ou naquele bairro. O que ele tem diante de si é um paciente concreto.</p>

    <p class="pulled">É aqui que a aula faz uma virada fundamental: <strong>prevalência, na prática clínica, é probabilidade pré-teste.</strong> Antes de pedir ou interpretar o exame, o médico já tem uma estimativa de chance da doença com base em história, fatores de risco, sintomas, exame físico e contexto.</p>

    <p>Imagine um <strong>homem de 68 anos</strong>, com sobrepeso ou obesidade aparente, tabagista, hipertenso, dislipidêmico e sedentário. Ele resolve correr 10 km no calor de Fortaleza depois de seguir um discurso motivacional de que "basta querer". Durante a corrida, desenvolve precordialgia típica e chega à UPA.</p>

    <p>Antes de qualquer ECG, a <strong>probabilidade pré-teste de infarto já é alta</strong>. Se você pegasse 100 homens iguais a ele, com os mesmos fatores de risco e a mesma dor torácica típica, a prevalência de infarto nesse grupo seria alta. É assim que prevalência vira raciocínio clínico individualizado.</p>

    <p>Nesse paciente, se o ECG mostra <strong>supra de ST</strong>, o médico confia. O positivo combina com o cenário. Alta probabilidade pré-teste aumenta a confiança no positivo (VPP individualizado alto). Mas se o ECG vem normal, o médico <strong>não deve relaxar automaticamente</strong>. Em cenário de alta probabilidade pré-teste, um negativo pode ser falso negativo.</p>

    <p>A plataforma deve deixar claro: <strong>não é o exame que começa o raciocínio; é o paciente.</strong> O exame entra em uma história que já começou antes dele.</p>
  </div>

  ${sectionTitle('🩺','Simulador interativo — homem 68 anos, alto risco', 'var(--c-red)')}
  <p style="color:var(--text-muted); margin-bottom: 12px;">Use a calculadora bayesiana: probabilidade pré-teste alta (cenário do homem com múltiplos FR) cruzada com RV+ do ECG. Veja o pós-teste subir.</p>
  ${PrevInt.bayes({ prev: 0.80, rvp: 8, rvn: 0.15 })}

  ${didaxBlock('caso','🩺','Situação-problema preservada — o homem que correu no calor',
    `<p><strong>Paciente:</strong> 68 anos, sobrepeso/obesidade, tabagista 30 maços-ano, hipertenso descompensado, dislipidêmico, sedentário. Após "coach motivacional", corre 10 km no calor de Fortaleza. Durante a corrida: <strong>precordialgia típica</strong> em aperto, irradiando para braço esquerdo, sudorese fria. Chega à UPA.</p>
    <p><strong>Pergunta 1:</strong> A probabilidade pré-teste de infarto é alta ou baixa? <em>Alta — múltiplos FR + dor típica + esforço.</em></p>
    <p><strong>Pergunta 2:</strong> Se o ECG vier com supra de ST, você confia? <em>Sim — alta pré-teste + positivo = pós-teste altíssimo. Acione hemodinâmica.</em></p>
    <p><strong>Pergunta 3:</strong> Se o ECG vier normal, você descarta infarto? <em>NÃO. Solicite troponina seriada, ECG seriado, considere até cateterismo. ECG normal em alta probabilidade pré-teste pode ser falso negativo.</em></p>`)}

  ${didaxBlock('importa','💡','Por que isso importa na prática?',
    `<p>A interpretação de um exame depende da probabilidade pré-teste. <strong>Um exame normal em paciente de altíssimo risco pode não encerrar a investigação.</strong> Esse é o coração do raciocínio clínico — e da diferença entre médico e algoritmo.</p>`)}

  ${bancaCallout(`<p>A banca quer que o aluno entenda:</p>
    <ul class="tight">
      <li>alta probabilidade pré-teste → maior VPP individualizado;</li>
      <li>alta probabilidade pré-teste → menor confiança no negativo (risco de FN);</li>
      <li>exame negativo NÃO exclui automaticamente doença em paciente muito suspeito.</li>
    </ul>`)}

  ${didaxBlock('pegadinha','⚠️','Pegadinha de prova',
    `<p>A banca descreve um paciente com quadro clássico e dá um exame negativo. O aluno apressado descarta a doença. <strong>O aluno avançado reconhece falso negativo possível.</strong></p>`)}

  ${didaxBlock('naoconfunda','🔀','Não confunda',
    `<p>Probabilidade pré-teste <strong>não é chute</strong>. Ela nasce de anamnese, exame físico, epidemiologia, fatores de risco e padrão dos sintomas. É raciocínio bayesiano, não intuição.</p>`)}

  ${didaxBlock('errocomum','❌','Erro comum',
    `<p>Interpretar ECG, troponina, imagem ou laboratório <strong>sem olhar o paciente</strong>. O exame não fala sozinho.</p>`)}

  ${didaxBlock('avancado','⚡','O que diferencia o aluno avançado',
    `<p>O avançado sabe que o exame não substitui o raciocínio clínico. Ele usa o exame para <strong>atualizar uma probabilidade</strong>, não para começar do zero. É a ponte direta para o simulador bayesiano global da plataforma.</p>`)}

  ${formulaBox('Linguagem bayesiana simplificada',
    `Probabilidade pós-teste = probabilidade pré-teste &times; ajuste pelo resultado do exame (via razão de verossimilhança)`,
    'Não é uma fórmula nova — é uma forma de pensar. O exame atualiza, não substitui.')}

  ${didaxBlock('numerico','🔢','Exemplo numérico mental',
    `<p>Se 100 homens iguais a esse — múltiplos FR, dor típica, esforço — chegassem com o mesmo quadro, <strong>muitos teriam infarto</strong>. Talvez 70-80 deles. Portanto, a probabilidade pré-teste é em torno de 70-80%. Agora aplique a calculadora bayesiana acima e veja: mesmo um ECG <em>normal</em> (RV− baixo) não derruba o pós-teste para zero. Sobra dúvida — e a investigação continua.</p>`)}

  ${revisaoAtiva([
    { q: 'O que é probabilidade pré-teste?', a: 'A estimativa de chance de doença que o médico tem antes do resultado do exame, baseada em anamnese, exame físico, fatores de risco e epidemiologia.' },
    { q: 'Por que o ECG normal não descarta infarto nesse caso?', a: 'Porque a probabilidade pré-teste é tão alta que mesmo um negativo (com RV− baixa, mas não zero) deixa uma probabilidade pós-teste residual relevante — é o falso negativo possível.' },
    { q: 'O que acontece com o VPP quando a probabilidade pré-teste é alta?', a: 'O VPP individualizado sobe — o positivo, naquele paciente, combina com o contexto.' }
  ])}

  ${pageFooterMeta({
    resumo: 'No consultório, prevalência vira probabilidade pré-teste. A anamnese e o exame físico dizem quanto você deve acreditar no resultado. O exame entra em uma história que já começou antes dele.',
    proximaConexao: 'Vamos agora ao cenário oposto: a professora Júlia com dor torácica atípica, baixa probabilidade pré-teste e o risco de tratar falso positivo.',
    nextId: 'm2-06'
  })}
  `;
  renderStandard(container, page, body);
};

/* ─────────────────────────────────────────
   PÁGINA 6 — Baixa probabilidade pré-teste e a boa prática médica
───────────────────────────────────────── */
GO_RENDER['m2-06'] = function(container, page) {
  const body = `
  ${pageHero({
    module: 'm2', moduleLabel: 'Módulo 2 — Valores Preditivos', pageNum: 6,
    title: 'Baixa probabilidade pré-teste e a boa prática médica',
    lead: 'A professora Júlia, maratonista ansiosa, com dor atípica. Em baixa probabilidade pré-teste, um positivo desconfia — e exame sem indicação confunde mais do que ajuda.',
    grad: 'var(--grad-m2)'
  })}

  ${conceptHero({
    question: 'Pergunta central',
    title: 'Por que pedir exame sem suspeita clínica pode gerar confusão clínica e até dano?',
    lead: 'Porque em baixa probabilidade pré-teste, um resultado positivo tem alta chance de ser falso positivo. Exame complementar é, antes de tudo, complementar a uma hipótese.',
    glow: 'rgba(245,158,11,.22)'
  })}

  ${keyTerms(['professora Júlia','dor torácica atípica','baixa probabilidade pré-teste','falso positivo','anamnese','exame físico','indicação clínica','exame complementar','urodinâmica','rastreio','selênio','exames aleatórios'])}

  <div class="prose">
    <p>Agora troque o paciente. Em vez do homem de alto risco, imagine uma <strong>mulher de meia-idade, fisicamente ativa, maratonista, com percentual de gordura muito baixo</strong>, que está ansiosa, dormindo mal, sobrecarregada por prova, cronograma, mentoria e aulas. Ela chega à UPA com dor torácica completamente atípica, prolongada, em um contexto muito mais compatível com <strong>baixa probabilidade pré-teste de infarto</strong>.</p>

    <p>Nesse cenário, se o ECG vier alterado, a confiança no positivo <strong>não é a mesma</strong> do caso anterior. O resultado positivo não conversa tão bem com o contexto. A <strong>chance de falso positivo cresce</strong>. Já se o ECG vier normal, esse negativo é muito mais tranquilizador.</p>

    <p>A regra é a mesma da prevalência populacional: baixa probabilidade pré-teste <strong>diminui o VPP individualizado e aumenta o VPN</strong>. A diferença é que agora o raciocínio saiu da cidade e entrou no consultório. O médico constrói a probabilidade pré-teste a partir do paciente real.</p>

    <p class="pulled">É por isso que <strong>um bom médico não pede uma bateria igual de exames antes de sequer conversar com o paciente.</strong> Exame complementar é complementar porque <em>complementa uma hipótese</em>. Ele deve ser guiado por uma boa anamnese e um bom exame físico.</p>

    <p>A aula faz aqui uma defesa forte da boa prática médica. Quando o médico solicita um exame, ele deve fornecer uma indicação útil. Escrever apenas <em>"rastreio"</em> sem contexto, ou pedir um exame complexo com uma indicação pobre, trata o colega que vai interpretar como se o contexto não importasse. <strong>Mas contexto muda tudo.</strong></p>

    <p>O exemplo da <strong>urodinâmica</strong> é didático: escrever apenas "incontinência" não ajuda. É incontinência de esforço? Há quanto tempo? A paciente é nulípara ou multípara? Quais sintomas acompanham? Esses dados funcionam como insumos para estimar probabilidade pré-teste e interpretar o resultado.</p>

    <p>O fechamento ético é claro: quando se pede qualquer coisa, o que vier alterado pode não ter significado clínico claro. Pedir <strong>selênio</strong> ou exames aleatórios sem hipótese prévia cria resultados que o médico não sabe interpretar. O problema não é só custo; é dano cognitivo, ansiedade, falso positivo e medicina de baixa qualidade.</p>
  </div>

  ${sectionTitle('🩺','Simulador interativo — professora Júlia, baixa pré-teste', 'var(--c-teal)')}
  <p style="color:var(--text-muted); margin-bottom: 12px;">Probabilidade pré-teste baixa (mulher jovem, sem FR cardiovascular, dor atípica, ansiedade). Veja: mesmo com ECG "alterado" (RV+), o pós-teste fica modesto — o positivo precisa ser interpretado com cautela.</p>
  ${PrevInt.bayes({ prev: 0.05, rvp: 8, rvn: 0.15 })}

  ${didaxBlock('caso','🩺','Situação-problema preservada — a professora Júlia',
    `<p><strong>Paciente:</strong> professora de pediatria, maratonista, baixa gordura corporal, ansiosa, dormindo mal, com prova Enamed antecipada, mentoria e Personamed na agenda. Chega à UPA com dor torácica <strong>atípica</strong>, prolongada (preservar duração consistente: <em>"há cerca de 3 semanas"</em>), em pontada, sem irradiação, sem relação com esforço.</p>
    <p><strong>Pergunta 1:</strong> Se o ECG vier alterado, você confia automaticamente? <em>Não — baixa probabilidade pré-teste reduz VPP individualizado. Repita, contextualize, suspeite de FP.</em></p>
    <p><strong>Pergunta 2:</strong> Se o ECG vier normal, ele tranquiliza mais ou menos? <em>Muito mais — em baixa pré-teste, o VPN é altíssimo. Negativo é confiável.</em></p>
    <p><strong>Pergunta 3:</strong> Que informações clínicas deveriam acompanhar um pedido de exame? <em>Tipo da queixa, duração, fatores de melhora/piora, FR, hipótese diagnóstica, o que se quer confirmar/excluir.</em></p>`)}

  ${didaxBlock('importa','💡','Por que isso importa na prática?',
    `<p>Exames sem contexto geram interpretações ruins. <strong>A indicação clínica não é burocracia — é parte do raciocínio diagnóstico.</strong> Quem interpreta o exame (radiologista, patologista) precisa do contexto para dar valor ao achado.</p>`)}

  ${bancaCallout(`<p>A banca quer que o aluno entenda:</p>
    <ul class="tight">
      <li>baixa probabilidade pré-teste → menor VPP individualizado;</li>
      <li>baixa probabilidade pré-teste → maior VPN;</li>
      <li>exame positivo em baixa probabilidade <strong>pode</strong> ser falso positivo;</li>
      <li>anamnese e exame físico <strong>guiam</strong> a interpretação do exame.</li>
    </ul>`)}

  ${didaxBlock('pegadinha','⚠️','Pegadinha de prova',
    `<p>A banca descreve um paciente com baixa suspeita clínica e exame alterado. O aluno ansioso fecha diagnóstico. <strong>O correto é desconfiar de falso positivo</strong> e repetir/aprofundar antes de tratar.</p>`)}

  ${didaxBlock('naoconfunda','🔀','Não confunda',
    `<p>Rastreamento <strong>não</strong> é pedir tudo para todo mundo. Rastreamento tem critérios, população-alvo, benefício esperado e estratégia definida (ex.: mamografia em mulheres ≥50 anos, sangue oculto após 50, citologia em mulheres sexualmente ativas). Pedir todos os exames sem critério é o oposto de rastreamento — é dano por excesso.</p>`)}

  ${didaxBlock('errocomum','❌','Erro comum',
    `<ul class="tight">
      <li>Pedir exame <strong>antes</strong> de formular hipótese clínica.</li>
      <li>Escrever indicações pobres ("incontinência", "dor", "check-up").</li>
      <li>Pedir <strong>selênio</strong> e outros "exames malucos" sem rationale.</li>
      <li>Não saber o que fazer com o resultado antes de pedir.</li>
    </ul>`)}

  ${didaxBlock('avancado','⚡','O que diferencia o aluno avançado',
    `<p>O avançado escreve <strong>boas indicações de exame</strong> e entende que o colega que interpreta precisa de contexto clínico. Trata o pedido de exame como uma comunicação médica, não como um formulário.</p>`)}

  ${formulaBox('Relação conceitual',
    `Baixa probabilidade pré-teste → baixo VPP individualizado + alto VPN<br>→ desconfie do positivo, confie no negativo`,
    'Espelho exato do raciocínio populacional de Londres.')}

  ${didaxBlock('numerico','🔢','Cenário comparativo — homem 68a × professora Júlia',
    `<ul class="tight">
      <li>Mesmo ECG, mesmas Sens/Esp do exame.</li>
      <li>Homem 68a: pré-teste ~80% → ECG normal NÃO exclui (pós-teste ainda ~30%).</li>
      <li>Júlia: pré-teste ~5% → ECG normal exclui com tranquilidade (pós-teste ~1%).</li>
      <li>Júlia: pré-teste ~5% + ECG "positivo" → pós-teste ~30% (não suficiente para tratar — repita).</li>
    </ul>`)}

  ${revisaoAtiva([
    { q: 'Por que baixa probabilidade pré-teste aumenta risco de falso positivo?', a: 'Porque há proporcionalmente muitos não doentes — e mesmo uma taxa baixa de FP gera, em números absolutos, muitos positivos não reais. O VPP cai.' },
    { q: 'O que significa dizer que exame complementar é guiado pela clínica?', a: 'Que o pedido de exame deve nascer de uma hipótese formulada após anamnese e exame físico. Sem hipótese, não há critério para interpretar o resultado.' },
    { q: 'Por que "incontinência" é indicação insuficiente para urodinâmica?', a: 'Porque o tipo (esforço, urgência, mista), a duração, a paridade, os sintomas associados e o contexto mudam o que o urodinamista vai procurar e como vai interpretar — o pedido pobre amputa o raciocínio.' },
    { q: 'Qual o risco de pedir exames aleatórios?', a: 'Falsos positivos, ansiedade, condutas erradas, custo desnecessário e medicina de baixa qualidade. O que vier alterado pode não ter como ser interpretado clinicamente.' }
  ])}

  ${pageFooterMeta({
    resumo: 'Baixa probabilidade pré-teste reduz VPP e eleva VPN. Exame complementar exige hipótese, anamnese e indicação clínica. Pedir "qualquer coisa" produz resultados que o médico não sabe interpretar.',
    proximaConexao: 'Hora de testar tudo isso em questões de prova reais. Começamos com a tabela da hanseníase — e o truque clássico de inventar mil.',
    nextId: 'm2-07'
  })}
  `;
  renderStandard(container, page, body);
};

/* ─────────────────────────────────────────
   PÁGINA 7 — Questão guiada 1: hanseníase
───────────────────────────────────────── */
GO_RENDER['m2-07'] = function(container, page) {
  const body = `
  ${pageHero({
    module: 'm2', moduleLabel: 'Módulo 2 — Valores Preditivos', pageNum: 7,
    title: 'Questão guiada 1: hanseníase, tabela 2x2 e o truque de inventar mil',
    lead: 'A questão não dá o total de pacientes. Sem problema — invente 1000 e a tabela monta sozinha.',
    grad: 'var(--grad-m2)'
  })}

  ${conceptHero({
    question: 'Pergunta central',
    title: 'Como resolver uma questão de VPP quando a prova não dá o total de pacientes?',
    lead: 'Truque clássico da aula: se não deram o total, invente mil. Com prevalência, sensibilidade e taxa de falso positivo na mão, a tabela 2x2 se monta em 30 segundos.',
    glow: 'rgba(20,184,166,.22)'
  })}

  ${keyTerms(['Mycobacterium leprae','hanseníase','sensibilidade 80%','falso positivo 20%','prevalência 10%','inventar mil','VPP 30,8%','puxar a seta','comunidade vulnerável'])}

  <div class="prose">
    <p>A questão apresenta um novo exame para detectar DNA do <em>Mycobacterium leprae</em> em pacientes com suspeita de hanseníase. O enunciado diz que o teste <strong>detecta 80% dos pacientes com doença</strong>. A primeira atitude do aluno deve ser <strong>puxar uma seta mental</strong>: detectar doentes é <em>sensibilidade</em>.</p>

    <p>Depois, a questão informa que o exame fornece resultado <strong>falso positivo em 20% das pessoas sem a doença</strong>. <em>Isso não é especificidade.</em> Especificidade é verdadeiro negativo entre os não doentes. Aqui a prova entregou diretamente a <strong>taxa de falso positivo</strong>. (Se quisermos a especificidade, seria 80%.)</p>

    <p>Em seguida, o enunciado informa que a prevalência na comunidade vulnerável é <strong>10%</strong> e pergunta: <em>"qual é a probabilidade de um resultado positivo ser de um indivíduo realmente doente?"</em>. Essa frase define <strong>VPP</strong>. A pergunta começa pelo positivo.</p>

    <p class="pulled">Se a prova não dá o total de pacientes, use o truque da aula: <strong>invente 1000</strong>.</p>

    <p>Com prevalência de 10%, em 1000 pessoas há <strong>100 doentes e 900 não doentes</strong>. Com sensibilidade de 80%, o teste detecta 80 dos 100 doentes: <strong>A = 80</strong>.</p>

    <p>Agora calcule os falsos positivos. A questão disse que 20% das pessoas sem a doença terão resultado falso positivo. Como há 900 não doentes, 20% de 900 = <strong>180</strong>. Logo, o total de testes positivos é 80 + 180 = <strong>260</strong>.</p>

    <p>O <strong>VPP = A / (A+B) = 80 / 260 ≈ 30,8%</strong>. A conclusão é poderosa: mesmo com sensibilidade de 80%, a baixa prevalência e a taxa de falso positivo fazem com que <strong>muitos positivos não sejam doença verdadeira</strong>. A cada 3 testes positivos, apenas 1 representa hanseníase real nesse cenário.</p>
  </div>

  ${sectionTitle('🧮','Calculadora guiada — monte a tabela da hanseníase', 'var(--c-teal)')}
  <p style="color:var(--text-muted); margin-bottom: 12px;">Tabela 2x2 pré-preenchida com os valores da questão: 80 VP, 180 FP, 20 FN, 720 VN. Veja VPP = 80/260 ≈ 30,8% calculado em tempo real.</p>
  ${PrevInt.tabela2x2({ vp: 80, fp: 180, fn: 20, vn: 720, lockPrev: false, title: 'Questão guiada — hanseníase em comunidade vulnerável' })}

  ${didaxBlock('caso','🩺','Situação-problema — questão preservada',
    `<p><em>"Um novo teste foi desenvolvido para detectar o DNA do Mycobacterium leprae em pacientes com suspeita de hanseníase. O teste detecta 80% dos pacientes com doença e fornece resultado falso positivo em 20% das pessoas sem a doença. Em uma comunidade vulnerável com prevalência de 10%, qual é a probabilidade de um resultado positivo ser de um indivíduo realmente doente?"</em></p>
    <p><strong>Resposta:</strong> ≈ 30,8% (corresponde à alternativa A do enunciado original).</p>`)}

  ${didaxBlock('importa','💡','Por que isso importa na prática?',
    `<p>Muitas questões de prova não dão a tabela pronta. <strong>O aluno precisa construir a tabela a partir do enunciado.</strong> Quem domina a técnica de "inventar mil" resolve em 30 segundos o que outros tentam resolver com regra de três e perdem tempo.</p>`)}

  ${bancaCallout(`<p>A banca quer que o aluno:</p>
    <ol class="tight">
      <li>Identifique sensibilidade ("detecta 80% dos doentes" → 80% sensibilidade);</li>
      <li>NÃO confunda falso positivo com especificidade ("FP 20%" → não é Esp 20%, é taxa de FP 20%);</li>
      <li>Use prevalência para separar doentes e não doentes (10% × 1000);</li>
      <li>Monte VPP pela linha dos positivos.</li>
    </ol>`)}

  ${didaxBlock('pegadinha','⚠️','Pegadinha de prova',
    `<p>"Falso positivo em 20%" <strong>não é</strong> especificidade de 20%. É taxa de falso positivo. A especificidade, se necessária, seria 80%. Quem confundir os dois calcula errado.</p>`)}

  ${didaxBlock('naoconfunda','🔀','Não confunda',
    `<ul class="tight">
      <li><strong>"Detecta 80% dos doentes"</strong> = sensibilidade 80%.</li>
      <li><strong>"Falso positivo em 20% dos sem doença"</strong> = FP rate 20% (Esp = 80%).</li>
      <li><strong>"Resultado positivo ser realmente doente"</strong> = VPP.</li>
    </ul>`)}

  ${didaxBlock('errocomum','❌','Erro comum',
    `<p>Calcular 80 / 100 e responder <strong>80%</strong>, confundindo sensibilidade com VPP. O 80 / 100 é a sensibilidade. O VPP é 80 / 260 ≈ 30,8%.</p>`)}

  ${didaxBlock('avancado','⚡','O que diferencia o aluno avançado',
    `<p>O avançado <strong>inventa 1000 sem medo</strong> quando o total não é fornecido. E reconhece instantaneamente: detecta doentes = Sens; FP rate = 1 − Esp; "positivo realmente doente" = VPP.</p>`)}

  ${formulaBox('Resolução passo a passo',
    `Pop = 1000 &nbsp; Prev = 10% → Doentes = 100, Não doentes = 900<br>Sens = 80% → A = 80, C = 20<br>FP rate = 20% → B = 0,20 × 900 = 180, D = 720<br>VPP = A/(A+B) = 80/260 ≈ <strong>30,8%</strong>`,
    'Sequência mecânica reproduzível em qualquer questão sem total.')}

  ${didaxBlock('numerico','🔢','Por que o VPP ficou tão baixo?',
    `<ul class="tight">
      <li>Há <strong>9 vezes mais</strong> não doentes (900) do que doentes (100).</li>
      <li>Mesmo com FP rate de "apenas" 20%, isso gera <strong>180 falsos positivos</strong> em números absolutos.</li>
      <li>Os 180 FP <em>esmagam</em> os 80 VP na linha dos positivos.</li>
      <li>Conclusão clínica: em baixa prevalência, testes com FP rate alto produzem VPP baixo — e o resultado positivo precisa ser confirmado.</li>
    </ul>`)}

  ${revisaoAtiva([
    { q: '"Detecta 80% dos pacientes com doença" é qual medida?', a: 'Sensibilidade = 80%.' },
    { q: '"Falso positivo em 20% dos sem doença" é especificidade?', a: 'Não. É taxa de FP. A especificidade seria 80% (1 − FP rate).' },
    { q: 'Por que inventar 1000 ajuda?', a: 'Porque com 1000 a prevalência vira número inteiro (100), os FP rate viram número inteiro (180), e a tabela se monta sem regra de três.' },
    { q: 'Qual é o VPP aproximado?', a: '80 / 260 ≈ 30,8%. Pouco mais de 3 em cada 10 positivos representam doença real.' }
  ])}

  ${pageFooterMeta({
    resumo: 'Truque de inventar mil. Prev 10% → 100 doentes / 900 não doentes. Sens 80% → A=80. FP rate 20% → B=180. VPP = 80/260 ≈ 30,8%.',
    proximaConexao: 'Agora vamos a duas questões mais — Enamed e SES-GO — onde o desafio é interpretar conceitualmente sem precisar calcular a tabela inteira.',
    nextId: 'm2-08'
  })}
  `;
  renderStandard(container, page, body);
};

/* ─────────────────────────────────────────
   PÁGINA 8 — Questões 2 e 3: baixa prevalência, FP, VPP baixo
───────────────────────────────────────── */
GO_RENDER['m2-08'] = function(container, page) {
  const body = `
  ${pageHero({
    module: 'm2', moduleLabel: 'Módulo 2 — Valores Preditivos', pageNum: 8,
    title: 'Questões guiadas 2 e 3: baixa prevalência, falso positivo e VPP baixo',
    lead: 'Enxergar a resposta antes da conta. Em doença rara, o falso positivo domina — mesmo com testes que parecem bons.',
    grad: 'var(--grad-m2)'
  })}

  ${conceptHero({
    question: 'Pergunta central',
    title: 'Por que baixa prevalência derruba o VPP mesmo quando o teste parece bom?',
    lead: 'Porque há muitos não doentes disponíveis para gerar falsos positivos em números absolutos. Em doença rara, o positivo precisa sempre ser interpretado com cautela.',
    glow: 'rgba(245,158,11,.22)'
  })}

  ${keyTerms(['Enamed 2025/26','SES-GO','tuberculose','sensibilidade 95%','especificidade 90%','prevalência 2%','VPP baixo','VPN alto','interpretação qualitativa','eliminação de alternativas'])}

  <div class="prose">
    <p>Depois de aprender a calcular, o aluno precisa aprender a <strong>enxergar a resposta antes da conta</strong>. Em questões de prova, muitas vezes a banca não quer apenas matemática; quer saber se o aluno entendeu a direção do raciocínio.</p>

    <h4 style="margin-top:1.2em; color:var(--c-teal);">Questão estilo Enamed 2025/26</h4>

    <p>O enunciado trabalha um exame em cenário de <strong>baixa prevalência e baixa especificidade</strong>. A alternativa A afirma que quase todos os testes positivos indicarão verdadeiros casos de hanseníase. <em>Isso está errado.</em> Se a prevalência é baixa, o VPP tende a ser baixo. E se a especificidade também é baixa, há mais falsos positivos. O VPP fica <strong>duplamente prejudicado</strong>.</p>

    <p>A alternativa correta é a que reconhece o <strong>número elevado de falsos positivos devido à baixa especificidade</strong>. A baixa prevalência ainda reforça essa conclusão. Esse é um ponto de prova muito importante: em doenças raras, mesmo poucos falsos positivos percentuais podem virar <strong>muitos falsos positivos absolutos</strong>.</p>

    <p>A alternativa que diz que haverá muitos falsos negativos está errada quando a sensibilidade é alta. Teste sensível detecta muitos doentes; portanto, tende a deixar poucos falsos negativos. <strong>Alta sensibilidade ajuda a excluir quando o teste vem negativo.</strong></p>

    <p>A alternativa que afirma que sensibilidade alta confirma diagnóstico também está errada. <strong>Confirmação é o território da especificidade alta.</strong> O teste muito específico é aquele que, quando dá positivo, convence mais, porque tem poucos falsos positivos.</p>

    <h4 style="margin-top:1.2em; color:var(--c-teal);">Questão SES-GO — tuberculose</h4>

    <p>Na questão SES-GO, o teste rápido para tuberculose tem <strong>sensibilidade de 95% e especificidade de 90%</strong>, ambas boas, mas a prevalência é de apenas <strong>2%</strong>. O principal desafio relacionado ao VPP é que ele <strong>será baixo</strong>, porque a baixa prevalência aumenta a proporção de falsos positivos entre todos os positivos. O VPN, ao contrário, tende a ser alto.</p>

    <p class="pulled">A moral das duas questões: <strong>em baixa prevalência, o problema central do positivo é o falso positivo.</strong> Mesmo testes excelentes em Sens/Esp podem ter VPP baixo se a doença for rara.</p>
  </div>

  ${sectionTitle('🧪','Simulador interativo — tuberculose SES-GO (Sens 95% / Esp 90% / Prev 2%)', 'var(--c-amber)')}
  <p style="color:var(--text-muted); margin-bottom: 12px;">Use a calculadora abaixo com os valores da questão. Em 10.000 pessoas: 200 doentes (190 VP) + 9800 não doentes (980 FP). VPP = 190/1170 ≈ 16%. VPN altíssimo.</p>
  ${PrevInt.tabela2x2({ vp: 190, fp: 980, fn: 10, vn: 8820, lockPrev: false, title: 'SES-GO — teste rápido para TB (Sens 95% / Esp 90% / Prev 2%)' })}

  ${didaxBlock('caso','🩺','Situação-problema — questão SES-GO preservada',
    `<p><em>"Um teste rápido para tuberculose tem sensibilidade de 95% e especificidade de 90%. Aplicado em uma comunidade com prevalência de 2%, qual o principal desafio relacionado aos seus valores preditivos?"</em></p>
    <p><strong>Resposta (alternativa B):</strong> o VPP será baixo, pois a baixa prevalência aumenta a proporção de falsos positivos entre todos os positivos. O VPN, em compensação, será alto.</p>
    <p><strong>Conta rápida:</strong> em 10.000 pessoas → 200 doentes (190 VP, 10 FN) + 9800 não doentes (8820 VN, 980 FP). VPP = 190/(190+980) = 190/1170 ≈ <strong>16,2%</strong>. Mesmo com sensibilidade de 95%, apenas 1 em cada 6 positivos representa TB real.</p>`)}

  ${didaxBlock('importa','💡','Por que isso importa na prática?',
    `<p>Exames em populações de baixa prevalência podem gerar <strong>muitos alarmes falsos</strong>. Isso é essencial para rastreamento, triagem e interpretação de testes em doenças raras (TB em região de baixa endemicidade, HIV em população geral assintomática, câncer em rastreamento populacional).</p>`)}

  ${bancaCallout(`<p>A banca quer que o aluno reconheça:</p>
    <ul class="tight">
      <li>baixa prevalência <strong>derruba VPP</strong>;</li>
      <li>baixa prevalência <strong>aumenta VPN</strong>;</li>
      <li>baixa especificidade <strong>aumenta falso positivo</strong>;</li>
      <li>alta sensibilidade <strong>reduz falso negativo</strong>;</li>
      <li>alta sensibilidade <strong>não confirma</strong>;</li>
      <li>alta especificidade <strong>confirma</strong>.</li>
    </ul>`)}

  ${didaxBlock('pegadinha','⚠️','Pegadinha de prova',
    `<p>A banca pode dizer que o teste tem "boa acurácia" ou boa Sens/Esp e ainda assim perguntar por que o VPP é baixo. <strong>A resposta geralmente está na prevalência baixa</strong> — ou na combinação prevalência baixa + Esp não-perfeita.</p>`)}

  ${didaxBlock('naoconfunda','🔀','Não confunda',
    `<p>VPP baixo em baixa prevalência <strong>não</strong> significa necessariamente que o teste é inútil. Significa que um positivo precisa ser <strong>interpretado com cautela</strong> e, muitas vezes, <strong>confirmado</strong> por testes em série (lembre-se: paralelo na entrada, série na saída).</p>`)}

  ${didaxBlock('errocomum','❌','Erro comum',
    `<p>Marcar que VPP é elevado apenas porque sensibilidade e especificidade parecem boas. <strong>VPP depende SEMPRE da prevalência</strong>, mesmo com testes excelentes.</p>`)}

  ${didaxBlock('avancado','⚡','O que diferencia o aluno avançado',
    `<p>O avançado percebe que, em baixa prevalência, o problema central do positivo é o falso positivo. E sabe que isso justifica o desenho clássico dos programas de rastreamento: triagem barata e sensível, seguida de confirmação específica em série.</p>`)}

  ${formulaBox('Relações conceituais — fechamento',
    `↑ Especificidade → ↑ VPP<br>↑ Sensibilidade → ↑ VPN<br>↓ Prevalência → ↓ VPP e ↑ VPN<br>↑ Prevalência → ↑ VPP e ↓ VPN`,
    'Quatro setas que resolvem a maior parte das questões conceituais sem cálculo.')}

  ${didaxBlock('numerico','🔢','Exemplo numérico preservado — SES-GO em 10.000 pessoas',
    `<ul class="tight">
      <li>Sens 95%, Esp 90%, Prev 2%.</li>
      <li>10.000 pessoas → 200 doentes / 9800 não doentes.</li>
      <li>A = 190 (95% de 200) &nbsp; B = 980 (10% de 9800) &nbsp; C = 10 &nbsp; D = 8820.</li>
      <li><strong>VPP = 190 / 1170 ≈ 16,2%</strong> &nbsp; <strong>VPN = 8820 / 8830 ≈ 99,9%</strong>.</li>
      <li>Conclusão: teste é excelente para excluir (VPN altíssimo), mas o positivo isolado significa pouco e exige confirmação.</li>
    </ul>`)}

  ${revisaoAtiva([
    { q: 'Por que o VPP cai em baixa prevalência?', a: 'Porque há proporcionalmente muito mais não doentes. Mesmo uma pequena taxa de FP gera, em números absolutos, muitos FP que esmagam os VP na linha dos positivos.' },
    { q: 'O que baixa especificidade causa?', a: 'Aumento de falsos positivos. Combinada com baixa prevalência, reduz drasticamente o VPP.' },
    { q: 'Alta sensibilidade aumenta VPP ou VPN?', a: 'VPN. Alta sensibilidade reduz FN, o que aumenta a confiança no negativo.' },
    { q: 'Alta especificidade aumenta VPP ou VPN?', a: 'VPP. Alta especificidade reduz FP, o que aumenta a confiança no positivo.' }
  ])}

  ${pageFooterMeta({
    resumo: 'Em baixa prevalência, o principal desafio do positivo é o falso positivo. Mesmo testes bons podem ter VPP baixo se a doença for rara. Use teste sensível para excluir e específico para confirmar.',
    proximaConexao: '"Teste positivo" não precisa ser exame de laboratório. Sintomas e sinais também podem ser teste — vamos ver isso na questão da cistite.',
    nextId: 'm2-09'
  })}
  `;
  renderStandard(container, page, body);
};

/* ─────────────────────────────────────────
   PÁGINA 9 — Sintomas como teste: cistite e VPP 90%
───────────────────────────────────────── */
GO_RENDER['m2-09'] = function(container, page) {
  const body = `
  ${pageHero({
    module: 'm2', moduleLabel: 'Módulo 2 — Valores Preditivos', pageNum: 9,
    title: 'Sintomas também podem ser teste: cistite e VPP de 90%',
    lead: 'Disúria + polaciúria + ausência de corrimento = "teste positivo" clínico. Quando o conjunto de sintomas tem VPP de 90%, ele orienta a conduta sem laboratório.',
    grad: 'var(--grad-m2)'
  })}

  ${conceptHero({
    question: 'Pergunta central',
    title: 'Valor preditivo positivo só vale para exame laboratorial?',
    lead: 'Não. Qualquer conjunto de achados clínicos pode funcionar como "teste". Sintomas, escores, sinais e combinações têm VPP — e orientam decisão clínica.',
    glow: 'rgba(20,184,166,.22)'
  })}

  ${keyTerms(['AMP 2026','cistite','disúria','polaciúria','sem corrimento','sintomas como teste','VPP 90%','Dr. Carlos','medicina de família','jovem em situação de rua','dado que'])}

  <div class="prose">
    <p>A aula amplia o conceito: <strong>"teste positivo" não precisa ser apenas exame laboratorial</strong>. Às vezes, o "teste" é uma <strong>combinação de achados clínicos</strong>.</p>

    <p>Na questão AMP 2026, uma <strong>jovem em situação de rua</strong> apresenta <strong>disúria e polaciúria, sem corrimento</strong>. O médico (Dr. Carlos, médico de família) considera essa combinação como indicativa de cistite.</p>

    <p>O enunciado informa que o <strong>VPP desses achados é de 90%</strong>. Isso significa que, entre as mulheres que apresentam essa combinação de sintomas, <strong>90% realmente têm cistite</strong>. Aqui, o "positivo" é a <em>presença do conjunto de sintomas</em>.</p>

    <p class="pulled">A alternativa correta deve expressar exatamente essa ideia: <strong>existe 90% de probabilidade de a paciente ter cistite, dado que seus sintomas foram considerados positivos para esse padrão clínico</strong>.</p>

    <p>As alternativas erradas confundem VPP com outras medidas:</p>
    <ul class="tight">
      <li><strong>"90% das mulheres com sintomas não têm a condição"</strong> — inverte o sentido.</li>
      <li><strong>"A combinação aparece em 90% das mulheres com cistite"</strong> — isso seria sensibilidade.</li>
      <li><strong>"A ausência dos sintomas exclui cistite"</strong> — isso seria VPN.</li>
      <li><strong>"Os sintomas têm 90% de especificidade"</strong> — troca VPP por especificidade.</li>
    </ul>

    <p>Essa página deve ensinar que valores preditivos são uma forma de raciocinar com <strong>qualquer "teste" no sentido amplo</strong>: exame, sinal, sintoma, escore clínico, combinação semiológica ou achado de imagem. Quando um cardiologista diz "reflexo abdominojugular tem RV+ alta para ICC", está usando exatamente essa lógica.</p>
  </div>

  ${sectionTitle('🩺','Classificador interativo — qual medida é essa frase?', 'var(--c-violet)')}
  ${PrevInt.quizBanca([
    {
      stem: '"Entre as mulheres com disúria + polaciúria sem corrimento, 90% têm cistite." Essa frase descreve qual medida?',
      options: ['Sensibilidade','Especificidade','VPP','VPN'],
      correct: 2,
      explain: 'VPP. A frase começa pelo "teste positivo" (sintomas presentes) e pergunta a chance de doença. É probabilidade pós-teste positiva.'
    },
    {
      stem: '"A combinação disúria+polaciúria sem corrimento aparece em 90% das mulheres com cistite." Essa frase descreve qual medida?',
      options: ['VPP','Sensibilidade','VPN','Especificidade'],
      correct: 1,
      explain: 'Sensibilidade. A frase começa pelos doentes ("mulheres com cistite") e pergunta a fração com teste positivo. Coluna dos doentes.'
    },
    {
      stem: '"A ausência da combinação afasta cistite com 90% de confiança." Essa frase descreve qual medida?',
      options: ['Especificidade','VPP','VPN','Sensibilidade'],
      correct: 2,
      explain: 'VPN. A frase começa pelo teste negativo (ausência dos sintomas) e pergunta a confiança no afastamento da doença.'
    },
    {
      stem: '"Em 90% das mulheres SEM cistite, a combinação não aparece." Essa frase descreve qual medida?',
      options: ['VPN','Sensibilidade','Especificidade','VPP'],
      correct: 2,
      explain: 'Especificidade. A frase começa pelos não doentes ("mulheres sem cistite") e pergunta a fração com teste negativo. Coluna dos sadios.'
    }
  ], 'Classificador VPP × Sens × Esp × VPN')}

  ${didaxBlock('caso','🩺','Situação-problema — questão AMP 2026 preservada',
    `<p><em>"Dr. Carlos, médico de família, atende uma jovem em situação de rua com disúria, polaciúria, sem corrimento vaginal. Estudo recente mostra que essa combinação de sintomas tem VPP de 90% para cistite. O que esse valor significa?"</em></p>
    <p><strong>Resposta correta:</strong> existe <strong>90% de probabilidade de que a paciente realmente tenha cistite</strong>, dado que apresenta essa combinação de sintomas. Operacionalmente: o Dr. Carlos pode iniciar tratamento empírico de cistite com tranquilidade — o achado clínico funciona como "teste positivo" de alta confiança.</p>`)}

  ${didaxBlock('importa','💡','Por que isso importa na prática?',
    `<p>A clínica também produz probabilidades. <strong>Um conjunto de sintomas pode ter valor preditivo</strong> e orientar decisão, tratamento e necessidade de exames adicionais. Em medicina de família, atenção primária e contextos com acesso limitado a laboratório, essa lógica é fundamental.</p>`)}

  ${bancaCallout(`<p>A banca quer que o aluno traduza:</p>
    <p style="margin:8px 0;"><strong>VPP 90% = "entre pacientes com esse achado positivo, 90% têm a condição"</strong></p>
    <p>E que reconheça que VPP <strong>sempre começa pelo positivo</strong> — mesmo quando o positivo é um conjunto de sintomas, não um exame.</p>`)}

  ${didaxBlock('pegadinha','⚠️','Pegadinha de prova',
    `<p>A banca troca a <strong>direção</strong> da frase:</p>
    <ul class="tight">
      <li>"entre doentes, quantos têm sintomas?" = <strong>sensibilidade</strong>;</li>
      <li>"entre sintomáticos, quantos têm doença?" = <strong>VPP</strong>.</li>
    </ul>
    <p>São perguntas espelhadas, mas com denominadores completamente diferentes.</p>`)}

  ${didaxBlock('naoconfunda','🔀','Não confunda',
    `<p>VPP sempre começa pelo <strong>positivo</strong>. Nesse caso, "positivo" = sintomas presentes. A pergunta é: <em>dado que os sintomas estão presentes, qual a chance de doença?</em></p>`)}

  ${didaxBlock('errocomum','❌','Erro comum',
    `<p>Achar que VPP só se aplica a exame laboratorial. <strong>Falso.</strong> Qualquer achado clínico — sintoma, sinal, escore, combinação — que classifique pacientes como "positivo" ou "negativo" tem VPP e VPN próprios.</p>`)}

  ${didaxBlock('avancado','⚡','O que diferencia o aluno avançado',
    `<p>O avançado entende que <strong>achado clínico também pode ser tratado como teste diagnóstico</strong>. Ele aplica a mesma lógica do exame laboratorial: identifica o "positivo", olha a linha dos positivos e calcula a probabilidade pós-teste.</p>`)}

  ${formulaBox('VPP em achados clínicos',
    `VPP = ${frac('pacientes com achado positivo E doença','total de pacientes com achado positivo')}`,
    'Mesma estrutura do VPP laboratorial — apenas trocando "exame positivo" por "conjunto de sintomas presente".')}

  ${didaxBlock('numerico','🔢','Exemplo numérico — VPP de 90% em sintomas',
    `<ul class="tight">
      <li>Se 100 mulheres apresentam disúria + polaciúria sem corrimento na atenção primária...</li>
      <li>...então aproximadamente <strong>90 dessas mulheres realmente têm cistite</strong>.</li>
      <li>Conduta clínica: tratamento empírico de cistite é seguro nessa apresentação, sem necessidade obrigatória de urocultura para iniciar.</li>
    </ul>`)}

  ${revisaoAtiva([
    { q: 'O que é o "teste positivo" nessa questão?', a: 'A presença da combinação de sintomas: disúria + polaciúria sem corrimento vaginal.' },
    { q: 'VPP de 90% significa 90% de quê?', a: 'De que a paciente realmente tenha cistite, dado que apresenta o conjunto de sintomas considerado positivo.' },
    { q: 'Qual alternativa confundiria VPP com sensibilidade?', a: 'Uma que dissesse: "A combinação aparece em 90% das mulheres com cistite" — começando pelos doentes e perguntando a fração com teste positivo.' },
    { q: 'Qual alternativa confundiria VPP com especificidade?', a: 'Uma que dissesse: "Os sintomas têm 90% de especificidade" — começando pelos não doentes em vez de pelos com teste positivo.' }
  ])}

  ${pageFooterMeta({
    resumo: 'VPP não é exclusivo de laboratório. Sintomas, sinais, escores e combinações clínicas têm VPP e VPN. Frase-chave: VPP começa pelo positivo, qualquer que seja a natureza desse positivo.',
    proximaConexao: 'Hora de fechar o módulo amarrando as quatro medidas — sensibilidade, especificidade, VPP, VPN — em uma única lógica.',
    nextId: 'm2-10'
  })}
  `;
  renderStandard(container, page, body);
};

/* ─────────────────────────────────────────
   PÁGINA 10 — Fechamento do Módulo 2
───────────────────────────────────────── */
GO_RENDER['m2-10'] = function(container, page) {
  const body = `
  ${pageHero({
    module: 'm2', moduleLabel: 'Módulo 2 — Valores Preditivos', pageNum: 10,
    title: 'Fechamento: como sensibilidade, especificidade, VPP e VPN conversam',
    lead: 'Aumentar sensibilidade aumenta VPN. Aumentar especificidade aumenta VPP. E a próxima aula — Curva ROC — mostra como mexer o ponto de corte faz tudo isso girar.',
    grad: 'var(--grad-m2)'
  })}

  ${jornadaBar({
    from: { module: 'm1', label: 'Sens, Esp e RV' },
    current: { module: 'm2', label: 'Valores Preditivos (fechamento)' },
    next: { module: 'm3', label: 'Curva ROC' }
  })}

  ${conceptHero({
    question: 'Pergunta central',
    title: 'Se eu aumento sensibilidade ou especificidade, o que acontece com VPN e VPP?',
    lead: 'Sensibilidade alta reduz FN, eleva VPN. Especificidade alta reduz FP, eleva VPP. As quatro medidas conversam pela quantidade de erros que o teste comete.',
    glow: 'rgba(139,92,246,.22)'
  })}

  ${keyTerms(['↑ sensibilidade','↓ falso negativo','↑ VPN','↑ especificidade','↓ falso positivo','↑ VPP','exclusão','confirmação','Curva ROC','ponto de corte'])}

  <div class="prose">
    <p>A aula termina conectando as medidas. Quando a <strong>sensibilidade aumenta</strong>, o teste fica melhor para detectar doentes. Isso <strong>reduz falsos negativos</strong>. Se há menos falsos negativos, o resultado negativo fica mais confiável. Portanto, aumentar sensibilidade tende a <strong>aumentar o VPN</strong>.</p>

    <p>O teste muito sensível "pega muita coisa". Ele tende a dar positivo em muitos pacientes, inclusive em alguns que não têm a doença. Por isso, alta sensibilidade pode vir acompanhada de <strong>mais falsos positivos</strong>, dependendo do ponto de corte e do contexto.</p>

    <p>Quando a <strong>especificidade aumenta</strong>, o teste fica melhor para reconhecer quem não tem doença. Isso <strong>reduz falsos positivos</strong>. Se há menos falsos positivos, o resultado positivo fica mais confiável. Portanto, aumentar especificidade tende a <strong>aumentar o VPP</strong>.</p>

    <p>O teste muito específico é mais exigente para dar positivo. Quando ele dá positivo, convence mais. Mas essa exigência pode custar <strong>falsos negativos</strong>: alguns doentes podem não atingir o critério de positividade.</p>

    <p class="pulled">O fechamento consolida a frase clássica, mas agora com <strong>entendimento</strong>: teste sensível ajuda a excluir; teste específico ajuda a confirmar. E os valores preditivos mostram como essa lógica chega ao paciente <em>depois</em> que o resultado saiu.</p>

    <p>A ponte final anuncia a próxima aula: a <strong>Curva ROC</strong>. Ela mostrará como mudar o <strong>ponto de corte</strong> altera, simultaneamente, sensibilidade, especificidade, falsos positivos e falsos negativos. Se até aqui você teve a sensação de que Sens e Esp são valores fixos do teste, prepare-se: o ponto de corte é o que os mantém em equilíbrio — e ele pode ser escolhido.</p>
  </div>

  ${sectionTitle('🎛️','Painel interativo — sensibilidade × especificidade × valores preditivos', 'var(--c-violet)')}
  <p style="color:var(--text-muted); margin-bottom: 12px;">Use o simulador bayesiano abaixo: aumente RV+ (proxy de especificidade) e veja o VPP individualizado subir. Reduza RV− (proxy de sensibilidade) e veja o VPN subir.</p>
  ${PrevInt.bayes({ prev: 0.20, rvp: 5, rvn: 0.20 })}

  ${sectionTitle('🧮','Calculadora 2x2 livre — confirme as relações você mesmo', 'var(--c-teal)')}
  ${PrevInt.tabela2x2({ vp: 95, fp: 50, fn: 5, vn: 950, lockPrev: false, title: 'Confirme: alta Sens reduz FN e eleva VPN' })}

  ${didaxBlock('caso','🩺','Painel de perguntas-decisão',
    `<ol class="tight">
      <li>Se eu aumento sensibilidade, qual valor preditivo tende a melhorar? <strong>VPN.</strong></li>
      <li>Se eu aumento especificidade, qual valor preditivo tende a melhorar? <strong>VPP.</strong></li>
      <li>Qual erro aumenta quando um teste é sensível demais? <strong>Falso positivo</strong> (efeito colateral).</li>
      <li>Qual erro aumenta quando um teste é específico demais? <strong>Falso negativo</strong> (efeito colateral).</li>
    </ol>`)}

  ${didaxBlock('importa','💡','Por que isso importa na prática?',
    `<p>Escolher ponto de corte e interpretar testes envolve <strong>trade-offs</strong>. O médico precisa saber se quer evitar falso negativo (priorizar sensibilidade, paralelo, exclusão) ou falso positivo (priorizar especificidade, série, confirmação). Não existe almoço grátis — toda escolha custa algo no outro lado.</p>`)}

  ${bancaCallout(`<p>A banca quer:</p>
    <ul class="tight">
      <li>sensibilidade alta → poucos falsos negativos → VPN maior;</li>
      <li>especificidade alta → poucos falsos positivos → VPP maior;</li>
      <li>sensibilidade ajuda a <strong>excluir</strong>;</li>
      <li>especificidade ajuda a <strong>confirmar</strong>.</li>
    </ul>`)}

  ${didaxBlock('pegadinha','⚠️','Pegadinha de prova',
    `<p>A banca diz: <em>"alta sensibilidade torna o teste ideal para confirmação"</em>. <strong>Errado.</strong> Alta sensibilidade ajuda mais na <strong>exclusão</strong> quando o teste é negativo. Confirmação é território da especificidade.</p>`)}

  ${didaxBlock('naoconfunda','🔀','Não confunda',
    `<ul class="tight">
      <li>Sensibilidade alta NÃO é sinônimo de VPP alto.</li>
      <li>Especificidade alta NÃO é sinônimo de VPN alto.</li>
      <li><strong>Prevalência ainda influencia VPP e VPN</strong> — mesmo com testes excelentes.</li>
    </ul>`)}

  ${didaxBlock('errocomum','❌','Erro comum',
    `<p>Memorizar "sensível exclui, específico confirma" sem entender o porquê: <strong>poucos falsos negativos</strong> dão confiança ao negativo; <strong>poucos falsos positivos</strong> dão confiança ao positivo.</p>`)}

  ${didaxBlock('avancado','⚡','O que diferencia o aluno avançado',
    `<p>O avançado entende que essas medidas se conectam pela tabela 2x2 e pelo <strong>ponto de corte</strong>, preparando o terreno para Curva ROC. Ele sabe que Sens e Esp se trocam ao longo da curva, e que o VPP/VPN finais dependem da prevalência onde o teste é aplicado.</p>`)}

  ${formulaBox('Matriz de relações conceituais',
    `↑ sensibilidade → ↓ falsos negativos → ↑ VPN<br>↑ especificidade → ↓ falsos positivos → ↑ VPP<br>↑ prevalência → ↑ VPP &amp; ↓ VPN<br>↓ prevalência → ↓ VPP &amp; ↑ VPN`,
    'Quatro setas que organizam toda a interpretação clínica de exames.')}

  ${didaxBlock('numerico','🔢','Mini-exemplo numérico — antes / depois',
    `<ul class="tight">
      <li><strong>Antes:</strong> Sens 70%, Esp 90%, Prev 20% → A=140, B=80, C=60, D=720. VPP=64%, VPN=92%.</li>
      <li><strong>Depois (Sens sobe para 95%):</strong> A=190, B=80, C=10, D=720. VPP=70%, <strong>VPN=99%</strong>.</li>
      <li>Conclusão: aumentar Sens elevou VPN drasticamente (92% → 99%). VPP subiu modestamente porque a Esp não mudou.</li>
    </ul>`)}

  ${revisaoAtiva([
    { q: 'Alta sensibilidade reduz qual erro?', a: 'Falso negativo. Por isso eleva o VPN.' },
    { q: 'Alta especificidade reduz qual erro?', a: 'Falso positivo. Por isso eleva o VPP.' },
    { q: 'Qual medida aumenta quando há menos falso negativo?', a: 'VPN — a confiança no negativo cresce quando os erros do "lado negativo" diminuem.' },
    { q: 'Qual medida aumenta quando há menos falso positivo?', a: 'VPP — a confiança no positivo cresce quando os erros do "lado positivo" diminuem.' },
    { q: 'Por que a Curva ROC entra depois dessa aula?', a: 'Porque a ROC mostra como mover o ponto de corte troca Sens por Esp ao longo da curva — o passo natural depois de entender que ambas afetam VPP e VPN.' }
  ])}

  ${pontoDeCostura({
    fromModule: 'm2', toModule: 'm3',
    fromTitle: 'Módulo 2 — VPP/VPN e prevalência',
    toTitle: 'Módulo 3 — Curva ROC e ponto de corte',
    ponte: `<p>Até aqui você tratou sensibilidade e especificidade como <em>números fixos</em> do teste. Mas elas <strong>não são</strong>. Toda vez que se define um <em>ponto de corte</em> (HbA1c ≥ 6,5%? glicemia ≥ 126 mg/dL? troponina ≥ 0,04 ng/mL?), Sens e Esp se mexem juntas — em direções opostas.</p>
    <p>A <strong>Curva ROC</strong> é o gráfico que mostra esse balé. Cada ponto é um corte; mover o corte para baixo aumenta sensibilidade e diminui especificidade. A "área sob a curva" (AUC) resume a qualidade global do teste — e é a métrica-mestre da prova.</p>`,
    links: [
      { module: 'm3', pageId: 'm3-01', variant: 'bridge',
        label: 'Avançar para Módulo 3 — Da RV à Curva ROC',
        hint: 'Conecta RV (matemática) e ROC (gráfico) — duas linguagens para a mesma trade-off.' }
    ]
  })}

  ${pageFooterMeta({
    resumo: 'Sensibilidade melhora a confiança no negativo ao reduzir FN. Especificidade melhora a confiança no positivo ao reduzir FP. VPP e VPN traduzem isso para o paciente. A próxima aula — Curva ROC — mostrará que Sens e Esp não são fixas: o ponto de corte as define.',
    proximaConexao: 'Bem-vindo ao Módulo 3 — Curva ROC, pontos de corte e área sob a curva. Aqui a sensibilidade e a especificidade revelam que sempre estiveram em trade-off.',
    nextId: 'm3-01'
  })}
  `;
  renderStandard(container, page, body);
};
