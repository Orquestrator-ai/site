// Exclusivo de prévia. Só são registrados metadados do runtime e arquivos conhecidos no deploy.
import {stat} from "node:fs/promises";
import {join,dirname} from "node:path";
import {fileURLToPath} from "node:url";
const segura=s=>typeof s==="string"&&/^\/(?:var\/task|opt|tmp)(?:\/[A-Za-z0-9_@.-]{1,72})*$/.test(s)?s:"[externo]";
export async function ambienteDePrevia(pacote){
 const tamanho=async path=>{try{return (await stat(path)).size;}catch{return null;}};
 const resolver=n=>{try{return fileURLToPath(import.meta.resolve(n));}catch{return null;}};
 const chrome=resolver("@sparticuz/chromium"),playwright=resolver("playwright-core");
 const nativo=chrome?join(dirname(chrome),"..","bin","chromium.br"):null;
 return {arquivoDoModulo:segura(fileURLToPath(import.meta.url)),chromiumModulo:segura(chrome),playwrightModulo:segura(playwright),
  binarioDoPacoteBytes:nativo?await tamanho(nativo):null,plataforma:process.platform,arquitetura:process.arch,node:process.versions.node,cwd:segura(process.cwd()),
  raizTarefa:segura(process.env.LAMBDA_TASK_ROOT),pastaDoPack:segura(pacote),
  manifestoBytes:await tamanho(join(pacote,"manifest.json")),chromiumBrBytes:await tamanho(join(pacote,"chromium.br")),
  playwrightIncluido:await tamanho(join(process.env.LAMBDA_TASK_ROOT||process.cwd(),"node_modules/playwright-core/package.json"))!==null,
  runnerIncluido:await tamanho(join(process.env.LAMBDA_TASK_ROOT||process.cwd(),"sonda/checar.cjs"))!==null};
}
export function erroDePrevia(e){
 const bruto=String(e?.message??"Falha"), linhas=bruto.split("\n");
 const detalhe=linhas.find(x=>/error while loading shared libraries|not found|Exec format error|GLIBC_|libnss|cannot find|permission denied/i.test(x))||linhas[0];
 const ocultar=s=>s.replace(/https?:\/\/\S+/gi,"[url]").replace(/(?:Bearer\s+)?[A-Za-z0-9_\/-]{32,}={0,2}/g,"[dado]").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,260);
 return {categoria:ocultar(e?.name||"Error"),codigo:ocultar(e?.code||""),mensagem:ocultar(linhas[0]),detalhe:ocultar(detalhe)};
}
