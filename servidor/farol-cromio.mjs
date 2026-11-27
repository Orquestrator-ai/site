import lambda from "@sparticuz/chromium";
import lock from "../ferramentas/chromium-lambda.lock.json" with {type:"json"};
import {createHash} from "node:crypto";
import {createReadStream} from "node:fs";
import {access,stat,writeFile} from "node:fs/promises";
import {dirname,join} from "node:path";
import {tmpdir} from "node:os";
import {fileURLToPath} from "node:url";
const existe=async p=>{try{await access(p);return true;}catch{return false;}};
export async function obterCromio({signal}){
 if(process.platform!=="linux"||process.arch!==lock.arquitetura)throw Error("Plataforma do navegador incompatível.");
 const executavel=join(tmpdir(),"chromium"),marca=join(tmpdir(),"farol-validado-"+lock.arquivos["chromium.br"].sha256);
 if(await existe(marca)&&await existe(executavel))return {bin:executavel,frio:false,bytes:0};
 // Usa o layout instalado do próprio pacote oficial, inclusive quando a plataforma o guarda fora de /var/task.
 const modulo=fileURLToPath(import.meta.resolve("@sparticuz/chromium"));
 const dir=join(dirname(modulo),"..","bin");
 for(const [nome,alvo] of Object.entries(lock.arquivos)){
  signal?.throwIfAborted();const f=join(dir,nome);
  if((await stat(f)).size!==alvo.bytes)throw Error("Tamanho do arquivo Chromium divergente.");
  const h=createHash("sha256");for await(const b of createReadStream(f))h.update(b);
  if(h.digest("hex")!==alvo.sha256)throw Error("Integridade do arquivo Chromium divergente.");
 }
 signal?.throwIfAborted();lambda.setGraphicsMode=false;
 const bin=await lambda.executablePath();await writeFile(marca,"153.0.0",{mode:0o600});return {bin,frio:true,bytes:0};
}
