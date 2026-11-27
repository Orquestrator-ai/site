// O npm ci já validou a tarball contra o integrity do package-lock. Confere também os bytes do motor.
import lock from "./chromium-lambda.lock.json" with {type:"json"};
import {createHash} from "node:crypto";import {createReadStream} from "node:fs";
import {readFile,stat} from "node:fs/promises";import {dirname,join} from "node:path";import {fileURLToPath} from "node:url";
const npm=JSON.parse(await readFile(new URL("../package-lock.json",import.meta.url),"utf8")).packages["node_modules/@sparticuz/chromium"];
if(npm?.version!==lock.versao || npm.integrity!==lock.integridade || npm.resolved!==lock.tarball)throw Error("Lock do Chromium divergente.");
const dir=join(dirname(fileURLToPath(import.meta.resolve("@sparticuz/chromium"))),"..","bin");
for(const [nome,a] of Object.entries(lock.arquivos)){
 const f=join(dir,nome);if((await stat(f)).size!==a.bytes)throw Error("Tamanho divergente em "+nome);
 const h=createHash("sha256");for await(const b of createReadStream(f))h.update(b);
 if(h.digest("hex")!==a.sha256)throw Error("Hash divergente em "+nome);
}
console.log("Pacote npm Chromium "+lock.versao+" validado: tarball no lock e quatro arquivos assinados por hash.");
