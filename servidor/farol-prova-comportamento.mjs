import {createHash} from "node:crypto";
// O erro bruto fica apenas em memória. Marcamos o ponto do teste (não HTML, URL ou dados da página).
export function assinaturaDoPasso({dominio,http,carregou,saudavel,erro}){
 if(!saudavel||!carregou||!Number.isInteger(http)||http<200||http>=300||!erro)return null;
 const msg=String(erro.message||""),stack=String(erro.stack||"");
 if(/target (?:page|closed)|browser (?:has been closed|closed|disconnected)|context .*closed|page crashed|connection closed|protocol error|execution context was destroyed|net::err_|out of memory|econn|socket|navigation interrupted|page\.goto:|page\.waitForLoadState:/i.test(msg))return null;
 const acao=/^(locator\.(?:click|check|uncheck|fill|pressSequentially|waitFor|inputValue|innerText)|page\.(?:waitForURL|waitForFunction)):/i.exec(msg)?.[1];
 const classe=erro.code==="ERR_ASSERTION"?"assert":erro.name==="TimeoutError"&&acao?acao:null;
 // Exige um frame no corpo da jornada, nunca na inicialização, no goto comum ou no controle do runner.
 const local=/at (?:async )?fazer \([^\n]*?(?:checar\.cjs|farol-reserva-background\.(?:mjs|js)):(\d+):(\d+)\)/.exec(stack);
 if(!classe||!local)return null;
 return createHash("sha256").update([dominio,classe,local[1],local[2]].join("|")).digest("hex").slice(0,24);
}
