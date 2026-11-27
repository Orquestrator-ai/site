import {ambienteDePrevia,erroDePrevia} from "./farol-diagnostico-reserva.mjs";
import jornadas from "../sonda/checar.cjs";
import {chromium} from "playwright-core";
import {join} from "node:path";
import {fileURLToPath} from "node:url";
import {mkdtemp,rm} from "node:fs/promises";
import {tmpdir} from "node:os";
import {criarFarol} from "./farol.mjs";
import {concluirReserva,reservarBytes,qualificarResultados} from "./farol-reserva.mjs";
import {assinaturaDoPasso} from "./farol-prova-comportamento.mjs";
import {obterCromio} from "./farol-cromio.mjs";
import {ALVOS_FAROL} from "./farol-http.mjs";


export async function navegarReserva(bin,signal,{lambda=true,onDiagnostico}={}){
  const {rodarJornadas}=jornadas;
  const abertos=new Set(), tentativaPorSite=new Map(), observacoes={};
  let primario,filaDeRetries=Promise.resolve();
  const fechar=async()=>Promise.allSettled([...abertos].map(p=>p.fechar()));
  const interromper=()=>{void fechar();};
  signal.addEventListener("abort",interromper,{once:true});
  // A Lambda usa um Chromium principal por rodada, com páginas distintas para todos os domínios.
  // A segunda tentativa sempre passa por outro processo e outro perfil, e só um retry pesado roda por vez.
  async function abrirPerfil(opcoes){
    signal.throwIfAborted();
    const env={HOME:tmpdir(),TMPDIR:tmpdir(),PATH:process.env.PATH||"/usr/bin:/bin"};
    for(const k of ["LD_LIBRARY_PATH","FONTCONFIG_PATH","LANG","LC_ALL","TZ"])if(process.env[k])env[k]=process.env[k];
    const dir=await mkdtemp(join(tmpdir(),"farol-rodada-"));
    let contexto;
    try{
      contexto=await chromium.launchPersistentContext(dir,{...opcoes,executablePath:bin,headless:true,env,timeout:11000,
        args:lambda?["--single-process","--no-zygote","--disable-gpu","--disable-dev-shm-usage","--disk-cache-size=8388608"]:[]});
    }catch(e){await rm(dir,{recursive:true,force:true}).catch(()=>{});throw e;}
    let encerramento,aberto=true;contexto.once("close",()=>{aberto=false;});
    const perfil={contexto,valido:()=>aberto && contexto.browser()?.isConnected()!==false && !signal.aborted,
      fechar:()=>encerramento??=(async()=>{try{await contexto.close();}finally{abertos.delete(perfil);await rm(dir,{recursive:true,force:true}).catch(()=>{});}})()};
    abertos.add(perfil);
    if(signal.aborted){await perfil.fechar();signal.throwIfAborted();}
    return perfil;
  }
  const adaptador={async contextoParaJornada(opcoes,{tentativa,dominio}){
    onDiagnostico?.(dominio,{fase:"iniciando",tentativa});
    signal.throwIfAborted();
    let dono=false,liberar=()=>{},perfil;
    if(tentativa===1){primario??=abrirPerfil(opcoes);perfil=await primario;}
    else {
      const anterior=filaDeRetries;filaDeRetries=new Promise(ok=>{liberar=ok;});await anterior;
      try{perfil=await abrirPerfil(opcoes);dono=true;}catch(e){liberar();throw e;}
    }
    let pagina,integra=true;onDiagnostico?.(dominio,{fase:"navegando",tentativa});
    return {saudavel:()=>integra && perfil.valido() && !pagina?.isClosed(),
      newPage:async()=>{pagina=await perfil.contexto.newPage();pagina.once("crash",()=>{integra=false;});return pagina;},
      close:async()=>{try{if(dono)await perfil.fechar();else await pagina?.close().catch(()=>{});}finally{liberar();}}};
  }};
  try{
    const resultados=await rodarJornadas(adaptador,2,d=>{
      const detalhe=erroDePrevia(d.erro);
      const net=/net::(ERR_[A-Z0-9_]+)/.exec(String(d.erro?.message))?.[1]??null;
      (observacoes[d.dominio]??=[]).push({tentativa:d.tentativa,http:d.http,carregou:d.carregou,saudavel:d.saudavel,net,...detalhe});
      onDiagnostico?.(d.dominio,{fase:"tentativa-falhou",tentativa:d.tentativa,http:d.http,carregou:d.carregou,net,mensagem:detalhe.mensagem});
      const assinaturas=tentativaPorSite.get(d.dominio)||[];
      assinaturas[d.tentativa-1]=assinaturaDoPasso(d);tentativaPorSite.set(d.dominio,assinaturas);
    },{acaoMs:11000,navegacaoMs:17000,esperarCarregamento:true,concluida:x=>onDiagnostico?.(x.dominio,{fase:"concluida",estado:x.estado,http:x.http,latenciaMs:x.latenciaMs,tentativas:x.tentativas})});
    const assinaturas={};
    for(const [dom,dupla] of tentativaPorSite)if(dupla.length===2 && dupla[0] && dupla[0]===dupla[1])assinaturas[dom]=dupla[0];
    return {resultados,assinaturas,observacoes};
  }
  finally{signal.removeEventListener("abort",interromper);await fechar();}
}

export async function executarReserva({store,binarios,op,agora=Date.now,preparar=obterCromio,navegar=navegarReserva,
  pacote=join(process.env.LAMBDA_TASK_ROOT||process.cwd(),"browser-pack"),limiteMs=95_000,entregar,diagnosticoPrevia=false}){
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(Error("Prazo da reserva encerrado.")),limiteMs);
  const diagnostico=diagnosticoPrevia?await ambienteDePrevia(pacote):undefined;
  let situacao="infra-indisponivel", positivos=[],confirmadas=[],suspeitas=[], inicio=agora(),frio=false,bytes=0;
  const expirar=new Promise((_,rechacar)=>controller.signal.addEventListener("abort",()=>rechacar(controller.signal.reason),{once:true}));
  try{
    const preparado=await Promise.race([expirar,preparar({pacote,store:binarios,signal:controller.signal,reservarDownload:t=>reservarBytes(store,op.id,t)})]);
    frio=preparado.frio;bytes=preparado.bytes;controller.signal.throwIfAborted();
    if(diagnostico)diagnostico.progresso={};
    const onDiagnostico=diagnostico?((dominio,evento)=>{
      if(!ALVOS_FAROL.some(v=>v.dominio===dominio))return;
      const d=diagnostico.progresso[dominio]??={eventos:[]};
      d.eventos.push({...evento,decorridosMs:Math.max(0,agora()-inicio)});d.eventos=d.eventos.slice(-10);
    }):undefined;
    const rodada=await Promise.race([expirar,navegar(preparado.bin,controller.signal,{onDiagnostico})]);controller.signal.throwIfAborted();
    const resultados=Array.isArray(rodada)?rodada:rodada?.resultados, assinaturas=rodada?.assinaturas??{};
    if(diagnostico){
      diagnostico.rssNodeMiB=Math.round(process.memoryUsage().rss/1048576);
      diagnostico.memoriaDaFuncaoMiB=/^\d+$/.test(process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE||"")?Number(process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE):null;
      diagnostico.tentativas=rodada?.observacoes??{};
      diagnostico.sites=(resultados||[]).map(x=>({dominio:x.dominio,estado:x.estado,http:x.http,latenciaMs:x.latenciaMs,tentativas:x.tentativas}));
      diagnostico.httpDoRuntime=Object.fromEntries(await Promise.all((resultados||[]).filter(x=>x.estado!=="operacional"&&ALVOS_FAROL.some(a=>a.dominio===x.dominio)).map(async x=>{
        try{const r=await fetch("https://"+x.dominio+"/",{method:"HEAD",credentials:"omit",redirect:"manual",signal:AbortSignal.any([controller.signal,AbortSignal.timeout(1500)])});return [x.dominio,r.status];}
        catch{return [x.dominio,null];}
      })));
    }
    const esperados=new Set(ALVOS_FAROL.map(s=>s.dominio));
    if(!Array.isArray(resultados)||resultados.length!==esperados.size || resultados.some(r=>!esperados.delete(r.dominio)))throw Error("Rodada de navegador incompleta.");
    positivos=resultados.filter(r=>r.estado==="operacional");
    const q=await qualificarResultados(store,op,resultados,assinaturas,agora);
    confirmadas=q.confirmadas;suspeitas=q.suspeitas;
    if(q.aceitos.length){
      const farol=criarFarol({store,agora,entregar});
      await farol.aplicar("funcional",{id:op.id,em:agora(),resultados:q.aceitos},{origem:"netlify-reserva",confirmadas});
      situacao=positivos.length===ALVOS_FAROL.length?"operacional":"parcial";
    }else situacao="sem-evidencia";
  }catch(e){
    if(diagnostico)diagnostico.erro=erroDePrevia(e);
    situacao=controller.signal.aborted?"prazo-excedido":e?.message==="Franquia diária do pacote de navegador."?"limite-bytes":"infra-indisponivel";
    if(process.env.FAROL_RESERVA_DIAGNOSTICO==="1")console.error("Reserva de navegador:",String(e?.message??"Falha").split("\n")[0].replace(/https?:\/\/\S+/g,"[url]").slice(0,160));
  }finally{
    clearTimeout(timer);
    await concluirReserva(store,op.id,situacao,agora,{frio,bytes,ms:Math.max(0,agora()-inicio),operacionais:positivos.map(x=>x.dominio),suspeitas,confirmadas,...(diagnostico?{diagnostico}:{})});
  }
  return {situacao,positivos:positivos.length};
}
