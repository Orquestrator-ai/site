# Serviço do Contagem

O painel administrativo do Orquestrator e o aplicativo de iPhone consultam o serviço desta branch. O coletor recebe medições autorizadas nos sites cadastrados. A API exige autenticação administrativa para leitura.

Use Node 24 e execute `npm ci` e `node --test testes/*.test.mjs`. O projeto Netlify é `orquestrator-contagem` e a configuração está em `netlify.toml`. A branch `contagem/servico` pode ser vinculada diretamente à Netlify. A publicação pelo GitHub Actions usa a credencial de implantação autorizada no repositório. Configure uma das duas formas de publicação para evitar deploys duplicados.

O teste de produção em `ferramentas/conferir-producao.mjs` verifica a disponibilidade do armazenamento e a restrição administrativa.
