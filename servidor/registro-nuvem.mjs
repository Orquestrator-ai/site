import {randomBytes, randomUUID, createHmac} from "node:crypto";
import {setTimeout as esperar} from "node:timers/promises";
import {pertence} from "./areas.mjs";
import {diaLocalDe} from "./consultas.mjs";

const HORA = 3_600_000;
const MAX_EVENTOS_POR_BLOCO = 800;
const MAX_EVENTOS_POR_CONSULTA = 200_000;
const MAX_BLOCOS_POR_CONSULTA = 3_000;

// A API do serviço retorna ETag no GET. Alguns emuladores só o fornecem na listagem.
// Nesse caso lemos a revisão antes de reler o conteúdo: uma escrita entre as leituras força novo CAS.
export async function lerParaAtualizar(store, chave) {
  const entrada = await store.getWithMetadata(chave, {type:"json"});
  if (!entrada || entrada.etag) return entrada;
  const {blobs} = await store.list({prefix:chave});
  const revisao = blobs.find(b => b.key === chave)?.etag;
  if (!revisao) throw new Error("leitura sem revisão de concorrência");
  const data = await store.get(chave, {type:"json"});
  if (data == null) throw new Error("registro mudou durante a leitura");
  return {data, etag:revisao};
}

export function criarRegistro(store) {
  // Uma chave diária do serviço. A troca em São Paulo substitui o sal anterior.
  let salLocal;
  async function identificar(site, instante, ip, agente) {
    const dia = diaLocalDe(instante);
    if (salLocal?.dia !== dia) {
      for (let tentativa = 0; tentativa < 5; tentativa++) {
        const entrada = await lerParaAtualizar(store, "chave-diaria");
        if (entrada?.data?.dia === dia) { salLocal = entrada.data; break; }
        if (entrada?.data?.dia > dia) throw new Error("dia da coleta ultrapassado");
        const valor = {dia, sal: randomBytes(32).toString("base64url")};
        const resultado = await store.setJSON("chave-diaria", valor, entrada ? {onlyIfMatch: entrada.etag} : {onlyIfNew: true});
        if (resultado.modified) { salLocal = valor; break; }
      }
    }
    if (salLocal?.dia !== dia) throw new Error("sal da coleta indisponível");
    return createHmac("sha256", Buffer.from(salLocal.sal, "base64url"))
      .update([site, ip, agente].join("\0")).digest("hex").slice(0, 32);
  }

  function chaveHora(site, instante) {
    const iso = new Date(instante).toISOString();
    return "eventos/" + site + "/" + iso.slice(0, 7) + "/" + iso.slice(8, 10) + "-" + iso.slice(11, 13);
  }

  async function gravar(evento, id) {
    const chaveBase = chaveHora(evento.site_id, evento.instante);
    const identificador = id || randomUUID();
    let parte = 0, conflitos = 0;
    while (conflitos < 7 && parte < 250) {
      const chave = chaveBase + "/" + String(parte).padStart(3, "0");
      const atual = await lerParaAtualizar(store, chave);
      const registros = atual?.data || [];
      if (registros.some(r => r.id === identificador && r.visitante === evento.visitante)) return;
      if (registros.length >= MAX_EVENTOS_POR_BLOCO) { parte++; continue; }
      const resultado = await store.setJSON(chave, [...registros, {...evento, id: identificador}],
        atual ? {onlyIfMatch: atual.etag} : {onlyIfNew: true});
      if (resultado.modified) { return; }
      conflitos++;
      await esperar(Math.floor(Math.random() * (10 + conflitos * 10)));
    }
    throw new Error("coleta ocupada");
  }

  const cache = new Map();
  let eventosEmCache = 0;
  async function lerBloco(blob) {
    const anterior = cache.get(blob.key);
    if (anterior && blob.etag && anterior.etag === blob.etag) return anterior.eventos;
    const entrada = await store.getWithMetadata(blob.key, {type: "json"});
    if (!entrada) throw new Error("bloco de tráfego indisponível");
    if (cache.has(blob.key)) {
      eventosEmCache -= cache.get(blob.key).eventos.length;
      cache.delete(blob.key);
    }
    const eventos = entrada.data;
    cache.set(blob.key, {etag: entrada.etag, eventos});
    eventosEmCache += eventos.length;
    while (eventosEmCache > 75_000 || cache.size > 2_000) {
      const maisAntigo = cache.keys().next().value;
      eventosEmCache -= cache.get(maisAntigo).eventos.length;
      cache.delete(maisAntigo);
    }
    return eventos;
  }

  const indices = new Map();
  function indice(prefixo) {
    const agora = Date.now(), existente = indices.get(prefixo);
    if (existente && existente.ate > agora) return existente.promessa;
    const promessa = (async () => {
      const itens = [];
      for await (const pagina of store.list({prefix:prefixo, paginate:true})) {
        itens.push(...pagina.blobs);
        if (itens.length > 10_000) throw new RangeError("intervalo excede a capacidade desta consulta");
      }
      return itens;
    })();
    if (indices.size >= 60) indices.delete(indices.keys().next().value);
    indices.set(prefixo,{ate:agora+1500,promessa});
    promessa.catch(() => { if (indices.get(prefixo)?.promessa === promessa) indices.delete(prefixo); });
    return promessa;
  }

  // A lista mensal encontra apenas horas com eventos. Cada leitura é restrita ao site e período pedidos.
  async function carregar(banco, site, inicio, ate, prefixo = null) {
    const inicioHora = Math.floor(inicio / HORA) * HORA;
    const primeiro = new Date(inicioHora), ultimo = new Date(ate);
    const meses = [];
    for (let m = Date.UTC(primeiro.getUTCFullYear(), primeiro.getUTCMonth(), 1);
      m <= ate; ) {
      const d = new Date(m);
      meses.push(d.toISOString().slice(0, 7));
      m = Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1);
    }
    const primeira = chaveHora(site, inicioHora), ultima = chaveHora(site, ultimo);
    let prefixos = meses.map(mes => "eventos/" + site + "/" + mes + "/");
    if (ate - inicio <= 2*HORA) {
      prefixos = [];
      for (let t = inicioHora; t <= ate; t += HORA) prefixos.push(chaveHora(site,t) + "/");
    } else if (ate - inicio < 3*24*HORA) {
      prefixos = [];
      for (let t = Math.floor(inicio/(24*HORA))*(24*HORA); t <= ate; t += 24*HORA) prefixos.push(chaveHora(site,t).slice(0,-2));
    }
    const chaves = [];
    for (let i=0; i<prefixos.length; i+=6) {
      const lotes = await Promise.all(prefixos.slice(i,i+6).map(indice));
      for (const blobs of lotes) for (const blob of blobs) {
        const hora = blob.key.slice(0, blob.key.lastIndexOf("/"));
        if (hora >= primeira && hora <= ultima) chaves.push(blob);
        if (chaves.length > MAX_BLOCOS_POR_CONSULTA) throw new RangeError("intervalo excede a capacidade desta consulta");
      }
    }
    let total = 0;
    for (let i = 0; i < chaves.length; i += 12) {
      const blocos = await Promise.all(chaves.slice(i, i + 12).map(lerBloco));
      for (const eventos of blocos) {
        total += eventos.length;
        if (total > MAX_EVENTOS_POR_CONSULTA) throw new RangeError("intervalo excede a capacidade desta consulta");
        for (const evento of eventos) if (!prefixo || pertence(evento.caminho,prefixo)) banco.inserirEvento(evento);
      }
    }
  }
  // O primeiro acesso da seção pode anteceder o período selecionado. O índice guarda apenas
  // o instante derivado dos Blobs do domínio pai ou o limite já examinado quando não havia acesso.
  async function inicioDaArea(area, desdePai, ate) {
    if (desdePai == null) return null;
    const chave = "indices/primeira-area/" + area.id;
    const anterior = await lerParaAtualizar(store,chave);
    if (anterior?.data?.desde != null) return anterior.data.desde;
    let inicio = anterior?.data?.verificadoAte ?? Math.floor(desdePai/HORA)*HORA;
    const fechado = Math.floor((ate-HORA)/HORA)*HORA;
    let primeiro = null, lidos = 0;
    async function registrar(valor) {
      await store.setJSON(chave,valor,anterior ? {onlyIfMatch:anterior.etag} : {onlyIfNew:true});
    }
    for (let data = new Date(inicio); data.getTime() <= ate; ) {
      const mes = data.toISOString().slice(0,7), prefixoMes = "eventos/" + area.origem + "/" + mes + "/";
      const chaves = (await indice(prefixoMes)).filter(b=>b.key >= chaveHora(area.origem,inicio)).sort((a,b)=>a.key.localeCompare(b.key));
      for (let i=0;i<chaves.length;) {
        const primeira = chaves[i].key;
        const hora = primeira.slice(0,primeira.lastIndexOf("/"));
        // Não supõe que a ordem de escrita seja a de chegada dentro da mesma hora.
        const lote = [];
        while(i<chaves.length && chaves[i].key.startsWith(hora+"/")) lote.push(chaves[i++]);
        if (lidos>=MAX_BLOCOS_POR_CONSULTA) {
          const ddhh=hora.slice(prefixoMes.length);
          const proxima=Date.parse(mes+"-"+ddhh.slice(0,2)+"T"+ddhh.slice(3,5)+":00:00Z");
          if (proxima>inicio && proxima<fechado) await registrar({verificadoAte:proxima});
          throw new Error("índice histórico de seção em atualização");
        }
        for (let j=0;j<lote.length;j+=12) {
          const blocos=await Promise.all(lote.slice(j,j+12).map(lerBloco));
          for (const eventos of blocos) for (const e of eventos) {
            if(e.tipo==="pv" && e.instante>=inicio && e.instante<ate && pertence(e.caminho,area.prefixo) &&
                (primeiro===null || e.instante<primeiro)) primeiro=e.instante;
          }
        }
        lidos+=lote.length;
        if (primeiro!==null) break;
      }
      if (primeiro!==null) break;
      data=new Date(Date.UTC(data.getUTCFullYear(),data.getUTCMonth()+1,1));
    }
    if(primeiro!==null && primeiro<fechado) await registrar({desde:primeiro});
    else if(fechado>inicio) await registrar({verificadoAte:fechado});
    return primeiro;
  }
  return {identificar, gravar, carregar, inicioDaArea};
}
