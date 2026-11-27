# Farol

O GitHub Actions abre um Chrome descartável e testa uma jornada pública em cada um dos oito domínios. Quando uma jornada falha, ele repete a verificação em outro contexto de navegador. As páginas são lidas sem conta e o monitor não registra visitas no Contagem.

O resultado segue para a API do Farol usando a identidade temporária emitida pelo GitHub para o workflow em main. A função Netlify faz uma checagem complementar de HTTPS e conteúdo a cada cinco minutos. O painel indica a hora de cada camada e acusa medições vencidas. Incidentes confirmados geram avisos, e a recuperação exige que as duas camadas estejam operacionais e recentes.

O agendamento do navegador é de 15 minutos e depende da fila do GitHub. Na execução manual ou em um push, as jornadas e o endpoint são os mesmos. Para testar o navegador localmente: npm ci, definir CHROME_BIN para uma instalação do Chrome e executar node checar.cjs resultado.json. O envio exige a identidade do workflow.
