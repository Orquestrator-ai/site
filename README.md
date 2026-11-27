# Serviço do Contagem

O painel administrativo do Orquestrator e o aplicativo de iPhone consultam o serviço desta branch. O coletor recebe medições autorizadas nos sites cadastrados. A API exige autenticação administrativa para leitura.

Use Node 24 e execute `npm ci` e `node --test testes/*.test.mjs`. O projeto Netlify é `orquestrator-contagem` e a configuração está em `netlify.toml`. A branch `contagem/servico` pode ser vinculada diretamente à Netlify. A publicação pelo GitHub Actions usa a credencial de implantação autorizada no repositório. Configure uma das duas formas de publicação para evitar deploys duplicados.

O teste de produção em `ferramentas/conferir-producao.mjs` verifica a disponibilidade do armazenamento e a restrição administrativa.

O vínculo do iPhone usa uma chave do aparelho, renovação automática e revogação no painel. A regra vigente do marcador de autorização está em `firebase-contagem/firestore.rules`. Os testes do marcador usam o Firestore Emulator.

O catálogo de leitura inclui os oito domínios e duas áreas do portal, orquestrator.ai/store e orquestrator.ai/medicina. As áreas consultam o histórico do domínio pai por prefixo de página.

O Farol registra a disponibilidade dos oito sites a cada cinco minutos e combina essas medições com jornadas em navegador vindas do GitHub Actions. Uma falha confirmada e a recuperação geram avisos via Web Push para as inscrições administrativas habilitadas. O cron, a API e as regras das transições estão em `netlify/functions/farol-monitor.mjs` e `servidor/farol*.mjs`. O navegador independente roda a partir de `.github/workflows/farol.yml` na branch main do site.
