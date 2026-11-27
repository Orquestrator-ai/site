// O passe de leitura é cifrado no servidor (AES-256-GCM). Só o aparelho recebe o passe, por ECDH P-256.
import {createCipheriv,createDecipheriv,createECDH,createHash,hkdfSync,pbkdf2,randomBytes,timingSafeEqual} from "node:crypto";
import {promisify} from "node:util";

const derivar = promisify(pbkdf2);
const INFO = Buffer.from("orquestrator.ai/contagem/ios/v1","utf8");
const PROJETO = "orquestrator-61836";
const DIA = 86400;
const MAX_SEGUNDOS = 3600;

export class FalhaPasse extends Error {
  constructor(status, mensagem) { super(mensagem); this.status = status; }
}
const codigoInvalido = () => new FalhaPasse(400,"Confira o código de seis dígitos no app e tente novamente.");
const passeInvalido = () => new FalhaPasse(401,"Autorize o iPhone novamente no painel.");

function decodificar(valor, tamanho, erro) {
  if (typeof valor !== "string" || !/^[A-Za-z0-9_-]+$/.test(valor)) throw erro();
  const bytes = Buffer.from(valor,"base64url");
  if (bytes.toString("base64url") !== valor || (tamanho !== undefined && bytes.length !== tamanho)) throw erro();
  return bytes;
}
function cifrar(chave,texto,aad) {
  const iv = randomBytes(12), cifra = createCipheriv("aes-256-gcm",chave,iv);
  cifra.setAAD(Buffer.from(aad,"utf8"));
  return Buffer.concat([iv,cifra.update(JSON.stringify(texto),"utf8"),cifra.final(),cifra.getAuthTag()]);
}
function decifrar(chave,bytes,aad) {
  try {
    if (bytes.length < 29) throw passeInvalido();
    const cifra = createDecipheriv("aes-256-gcm",chave,bytes.subarray(0,12));
    cifra.setAAD(Buffer.from(aad,"utf8")); cifra.setAuthTag(bytes.subarray(-16));
    const texto = Buffer.concat([cifra.update(bytes.subarray(12,-16)),cifra.final()]);
    return JSON.parse(texto.toString("utf8"));
  } catch { throw passeInvalido(); }
}

// A assinatura e a concessão administrativa já foram conferidas pelo Firestore. Lemos o vencimento
// da credencial assinada para impedir que o passe viva além dela.
function vencimentoFirebase(token,instante) {
  try {
    const dados = JSON.parse(Buffer.from(token.split(".")[1],"base64url").toString("utf8"));
    if (dados.aud === PROJETO && dados.iss === "https://securetoken.google.com/" + PROJETO && typeof dados.sub === "string" &&
        dados.sub && Number.isSafeInteger(dados.exp) && dados.exp > instante)
      return Math.min(dados.exp, instante+MAX_SEGUNDOS);
  } catch {}
  throw passeInvalido();
}

export function criarPassesIphone({store, agora=Date.now, namespace}) {
  const espaco = createHash("sha256").update(String(namespace || "desenvolvimento-local")).digest("hex");
  const memoria = new Map();
  const nome = dia => "auth/iphone-v1/" + String(dia) + "/" + espaco;
  const aad = dia => "orquestrator.ai/contagem/leitura/v1/" + espaco + "/" + dia;
  async function chaveDiaria(dia,criar) {
    if (memoria.has(dia)) return memoria.get(dia);
    const chaveBlob = nome(dia);
    let texto = await store.get(chaveBlob);
    if (texto === null && criar) {
      const nova = randomBytes(32).toString("base64url");
      const resultado = await store.set(chaveBlob,nova,{onlyIfNew:true});
      texto = resultado.modified ? nova : await store.get(chaveBlob);
      if (!texto) throw new Error("chave do serviço momentaneamente indisponível");
    }
    if (texto === null) throw passeInvalido();
    const bits = decodificar(texto,32,()=>new Error("chave do serviço indisponível"));
    if (memoria.size >= 2) memoria.delete(memoria.keys().next().value);
    memoria.set(dia,bits);
    return bits;
  }

  async function emitir(dados,token,parear) {
    const duravel=dados.versao===2;
    const campos=duravel?"codigo,deviceKey,key,nome,proof,state,versao":"codigo,key,proof,state";
    if (Object.keys(dados).sort().join(",") !== campos || typeof dados.codigo !== "string" || !/^\d{6}$/.test(dados.codigo))
      throw codigoInvalido();
    const estado = decodificar(dados.state,32,codigoInvalido);
    const publica = decodificar(dados.key,65,codigoInvalido);
    const compromisso = decodificar(dados.proof,32,codigoInvalido);
    if (publica[0] !== 4) throw codigoInvalido();
    const efemera = createECDH("prime256v1"); efemera.generateKeys();
    let segredo;
    try { segredo = efemera.computeSecret(publica); } catch { throw codigoInvalido(); }
    const sal = duravel ? Buffer.concat([estado,publica,decodificar(dados.deviceKey,65,codigoInvalido)]) : Buffer.concat([estado,publica]);
    const prova = await derivar(dados.codigo,sal,100000,32,"sha256");
    if (!timingSafeEqual(prova,compromisso)) throw codigoInvalido();
    const emitido = Math.floor(agora()/1000), expiraEm = vencimentoFirebase(token,emitido);
    const entrega = hkdfSync("sha256",segredo,estado,INFO,32);
    const entregar = valor => ({state:dados.state,key:efemera.getPublicKey().toString("base64url"),box:cifrar(entrega,valor,dados.state).toString("base64url")});
    if (duravel) return parear({token,deviceKey:dados.deviceKey,nome:dados.nome,state:dados.state,key:dados.key,entregar});
    const dia = Math.floor(emitido/DIA);
    const chave = await chaveDiaria(dia,true);
    const caixaPasse = cifrar(chave,{emitido,expiraEm,token},aad(dia));
    const passe = "ctg1." + dia.toString(36) + "." + caixaPasse.toString("base64url");
    return entregar({passe,expiraEm});
  }

  async function abrirCaixa(passe,historica) {
    if (passe.length > 16*1024) throw passeInvalido();
    const partes = /^ctg1\.([0-9a-z]{1,8})\.([A-Za-z0-9_-]+)$/.exec(passe);
    if (!partes) throw passeInvalido();
    const instante = Math.floor(agora()/1000), hoje = Math.floor(instante/DIA), dia = Number.parseInt(partes[1],36);
    if (dia.toString(36) !== partes[1] || dia > hoje || dia < hoje-(historica?2:1)) throw passeInvalido();
    const bytes = decodificar(partes[2],undefined,passeInvalido);
    if (bytes.length < 29) throw passeInvalido();
    const caixa = decifrar(await chaveDiaria(dia,false),bytes,aad(dia));
    if (!Number.isSafeInteger(caixa?.emitido) || !Number.isSafeInteger(caixa.expiraEm) ||
        caixa.emitido > instante || Math.floor(caixa.emitido/DIA) !== dia || caixa.expiraEm + (historica?86400:0) <= instante ||
        caixa.expiraEm > caixa.emitido + MAX_SEGUNDOS || typeof caixa.token !== "string") throw passeInvalido();
    if(vencimentoFirebase(caixa.token,caixa.emitido)!==caixa.expiraEm) throw passeInvalido();
    return caixa.token;
  }
  async function uidHistorica(passe) {
    // A migração com ticket USB + marcador IAM pode provar somente a UID histórica. O ID vencido nunca sai por este método.
    const t=await abrirCaixa(passe,true);
    return JSON.parse(Buffer.from(t.split(".")[1],"base64url").toString("utf8")).sub;
  }
  return {emitir,abrir:p=>abrirCaixa(p,false),uidHistorica};
}
