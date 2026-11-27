# Farol

O Farol verifica os oito sites do Orquestrator. A tela administrativa e o iPhone leem o mesmo estado em `GET /api/farol`. A API aceita o administrador Firebase e a sessão de leitura do aparelho `ctg2s`. As operações de inscrição, remoção e teste de avisos exigem o administrador autenticado no portal. O recibo de exibição usa a prova de entrega gerada para aquela assinatura e aquele teste.

## O que é medido

A cada cinco minutos, a função agendada `farol-monitor` acessa as oito páginas iniciais por HTTPS. Confere o código HTTP, o tipo HTML, o título e um elemento específico de cada produto. Redirecionamentos, páginas ausentes, conteúdo inesperado, erro de conexão e timeout produzem uma nova tentativa. A recuperação de uma falha HTTP também é conferida duas vezes. Resultados divergentes nessa recuperação mantêm o incidente aberto. A latência é o tempo da checagem HTTP nessa origem de monitoramento. O motor aceita apenas os oito endereços do catálogo fixo.

A sonda funcional usa navegador em uma infraestrutura separada. Envia as oito jornadas na mesma execução a `POST /api/farol/sonda`. A API valida o OIDC do GitHub, a identidade do workflow e os campos do relatório. Uma falha funcional precisa de duas tentativas. Uma página pode responder com HTTP 200 e continuar com incidente funcional aberto. O tempo máximo para considerar uma medição recente é 11 minutos para HTTP e 45 minutos para a sonda de navegador. O horário agendado representa uma cadência prevista, e filas ou indisponibilidade da plataforma podem atrasar uma execução. `GET /api/farol/saude` responde com 503 quando ainda não há uma rodada HTTP completa ou quando ela está atrasada.

## Estado e histórico

O painel só mostra um site como operacional quando HTTP e funcional têm medições recentes e saudáveis. A falta de uma das medições aparece como desconhecida. Uma falha confirmada continua identificada como o último estado observado até uma recuperação, com aviso de atraso se a coleta deixar de chegar.

Os históricos por componente usam dias civis de São Paulo e exibem até 90 dias. Dias anteriores ao início das verificações não têm disponibilidade calculada. A porcentagem representa a fração das amostras conclusivas em que as verificações estavam plenamente operacionais. Amostras desconhecidas ficam fora do denominador. Os últimos 48 tempos de resposta HTTP compõem a série curta de latência. Os incidentes registram a detecção, a mudança de impacto e a recuperação. Seus horários são os horários das observações, sem estimativa retroativa do início da falha.

O estado fica no Netlify Blobs privado do serviço. A mesma gravação condicional acrescenta a medição, altera o incidente e registra o aviso pendente. Repetições da mesma rodada e execuções mais antigas não alteram as contagens. Na fila de avisos, uma reserva temporária impede que dois executores façam a mesma entrega ao mesmo tempo. Falhas transitórias são retomadas com intervalos progressivos; o canal usa o identificador estável da transição para reconhecer destinatários já atendidos.

## Verificação local

```sh
npm ci
node --test testes/farol.test.mjs testes/farol-blobs.test.mjs testes/farol-push.test.mjs
```

Os testes simulam a falha e a recuperação sem desativar sites nem enviar notificações reais. A prova com o emulador HTTP oficial de Blobs usa diretório temporário e descarta os dados do teste ao terminar.
