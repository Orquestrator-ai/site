# Operação do Contagem nos sites Orquestrator

O painel web fica em `https://orquestrator.ai/admin/contagem/`. O app para iPhone e o painel usam `https://orquestrator-contagem.netlify.app`. O catálogo de domínios e páginas públicas está em `servidor/rotas-publicas.json`. O painel exige a sessão administrativa do projeto Firebase `orquestrator-61836` e a concessão habilitada em `admins/{uid}`. O serviço verifica o token com as regras do próprio Firestore. A verificação fica em cache por até dez segundos.

## Fluxo de uma visita

O coletor em `coletor/orquestrator/visitas.js` registra uma visualização depois que o visitante aceita a medição nas preferências do site. A recusa, a falta de escolha, a opção de exclusão local e os sinais GPC/DNT impedem o envio. Apenas rotas do catálogo podem ser medidas. Cada export recebe uma cópia estática do coletor com o seu domínio, as suas rotas e o endereço do serviço. O registro contém a página pública e, quando disponíveis, origem reduzida ao domínio, tipo de dispositivo, navegador, país e estado. A saída da página permite calcular duração e rolagem. O servidor usa o endereço IP e o agente de usuário para derivar um identificador diário por site e persiste apenas o identificador e as categorias.

O armazenamento fica em Netlify Blobs, região `us-east-2` (Estados Unidos). As consultas usam SQLite em memória para calcular os totais com o mesmo SQL do servidor local. Às 06h13 UTC uma função examina os diretórios mensais e remove em lotes os blocos e anotações anteriores a 24 meses civis completos mais o mês corrente. Os lotes pendentes seguem na execução diária seguinte. A retenção permite comparar 12 meses com o ano anterior.

## Ativação central

Os oito coletores consultam `https://orquestrator.ai/assets/contagem/config.json` somente em uma página pública visível, depois do consentimento para medição. A leitura usa CORS, sem credenciais ou referenciador. A configuração precisa trazer `coletaAtiva: true` e `apiBase: "https://orquestrator-contagem.netlify.app"`. Os navegadores reavaliam essa decisão a cada cinco minutos enquanto a página está visível. A configuração desligada, indisponível ou incompatível impede o envio de eventos. Ao ativar, o painel passa a receber as visitas daquele instante em diante. Publique o valor verdadeiro somente depois de validar o serviço e a autorização administrativa.

## Vínculo permanente do iPhone

No pareamento v2, o administrador confirma o código de seis dígitos e autoriza explicitamente o aparelho a continuar lendo as métricas. A chave privada de assinatura P-256 e a concessão `ctg2` de 256 bits ficam no Keychain do iPhone. O serviço guarda a chave pública, o hash da concessão, o nome do dispositivo e o seu registro revogável. O formulário web devolve a concessão cifrada para a chave temporária de entrega do aparelho.

A cada renovação, o app assina um nonce, o horário e o ID do vínculo. O serviço emite um passe `ctg2s` de 15 minutos para os quatro GETs de métricas. Tanto a renovação quanto cada leitura consultam se o dispositivo ainda está ativo e se o administrador conserva a permissão no Firestore. Essa verificação usa o marcador privativo `admins/{uid}/contagemLeituras/{endereço-aleatório-de-256-bits}`, que contém somente a versão inteira `1` e não aceita listagem. O navegador nunca recebe o endereço. A indisponibilidade do Firestore suspende a leitura até o serviço voltar. A gestão de dispositivos exige nova verificação do ID token administrativo do portal.

A concessão v2 sobrevive à expiração do login inicial, ao fechamento do app e à publicação de versões novas do servidor. O dono pode revogá-la no painel ou no aparelho. A falta de permissão administrativa impede as leituras. Se o Keychain perder a chave privada ou a concessão, será necessário autorizar o aparelho novamente. As rotas para gestão são `GET /api/iphone/dispositivos` e `POST /api/iphone/revogar`. O iPhone usa `POST /api/iphone/renovar` e `POST /api/iphone/desvincular`. Para uma suspensão emergencial do acesso móvel configure `CONTAGEM_IPHONE_DESATIVADO=1` nas funções e publique a configuração. Os clientes v1 continuam com seu passe temporário até o vencimento.

### Migração USB de uma autorização v1

Para atualizar o próprio telefone pareado pelo build 2, o operador lê via USB apenas `migracao-pedido.json` do novo app. Esse arquivo contém a chave pública de assinatura e o SHA-256 do passe legado. O arquivo é destinado ao operador e não contém o passe nem a chave privada. A ferramenta `ferramentas/provisionar-migracao-iphone.mjs` vincula um ticket aleatório àquela chave, àquele hash, à UID e ao deploy que emitiu o passe antigo. A saída de uso único deve ser copiada somente ao contêiner do mesmo iPhone, em `Library/Application Support/Contagem/migracao.json`. Uma retransmissão pela mesma chave durante o prazo recupera a mesma concessão. O serviço nunca faz upgrade pela mera apresentação do token antigo.

No modo ordinário, o ticket dura até 20 minutos e o token anterior precisa estar válido. Com autorização IAM explícita do operador para criar o marcador da UID administrativa ativa, o ticket pode durar até 24 horas. Essa rota verifica exclusivamente a identidade histórica do `ctg1` e permite no máximo 24 horas após seu vencimento; o token de leitura vencido continua inválido em todos os GETs. A política do Firestore volta a conferir o marcador em cada acesso. A ponte temporária de leitura aceita apenas a revisão anterior identificada de produção, até o vencimento do próprio passe e no máximo até 27/11/2026 às 02h30 de Brasília.

## Preparar e testar

Use Node 24 e a raiz do projeto.

```sh
npm ci
node --test testes/admin-firebase.test.mjs testes/nuvem.test.mjs testes/retencao.test.mjs testes/passe-iphone.test.mjs testes/dispositivos-iphone.test.mjs testes/netlify-blobs.test.mjs
node --test coletor/orquestrator/testar-coletor.mjs
```

O teste de Blobs usa o emulador HTTP local da biblioteca Netlify e descarta os dados temporários ao terminar. O serviço SQLite de desenvolvimento continua disponível pelo comando de `servidor/app.mjs` documentado no README.

Para incluir novas páginas, rode `node ferramentas/catalogar-exports.mjs` com os caminhos de **todos** os checkouts publicados, cada um com seu `CNAME`. Em cópias próprias desses exports, rode `python3 coletor/orquestrator/materializar.py --catalogo servidor/rotas-publicas.json` seguido dos mesmos caminhos. Faça a conferência de consentimento, CSP e carregamento de cada página antes de promover os exports produzidos.

## Publicação e conferência

O projeto Netlify de destino é `orquestrator-contagem`. Com a CLI autenticada pelo operador e o site de destino confirmado, o comando da raiz é `netlify deploy --prod --site orquestrator-contagem --dir publico --functions netlify/functions`. O arquivo `netlify.toml` define o diretório estático e as funções. O diretório `publico` inclui o arquivo Apple de associação do domínio, a rota de retorno do login `/iphone/retorno/` e seus cabeçalhos.

Confirme HTTP 200 no `GET /api/saude`, que consulta os metadados do armazenamento. Um `GET /api/sites` sem sessão deve retornar 401. A prova de escrita e leitura exige uma visita consentida em uma página pública e a conferência do resultado sob a conta administrativa no painel ou no iPhone. O endpoint de saúde verifica apenas a disponibilidade de leitura do armazenamento.

A coleta usa `POST /api/evento`. As consultas administrativas são `GET /api/sites`, `GET /api/visao`, `GET /api/tabela`, `GET /api/vivo` e `GET /api/exportar`. A gravação de notas usa `POST /api/anotacao`. O cabeçalho das rotas administrativas é `Authorization: Bearer <ID token Firebase>`. Períodos que excedem 200 mil eventos ou 3 mil blocos numa única consulta retornam HTTP 422 para que o administrador possa escolher um período menor. Ao vivo considera ativos nos últimos cinco minutos.
