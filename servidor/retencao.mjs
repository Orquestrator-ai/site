import {diaLocalDe} from "./consultas.mjs";
import {lerParaAtualizar} from "./registro-nuvem.mjs";

// Preserva 24 meses civis completos mais o mês corrente para comparar 12 meses com os 12 anteriores.
// A hora inicial do mês é a de São Paulo; os blocos usam UTC. Conservar a margem do mês limítrofe
// assegura que nenhuma consulta de comparação perca as primeiras horas desse mês.
export function inicioDaRetencao(agora) {
  const [ano,mes] = diaLocalDe(agora).split("-").map(Number);
  return new Date(Date.UTC(ano - 2, mes - 1, 1)).toISOString().slice(0,10);
}

async function diretorios(store, prefixo) {
  const saida = [];
  for await (const p of store.list({prefix:prefixo,directories:true,paginate:true})) {
    for (const d of p.directories) saida.push(d.replace(/\/$/,""));
  }
  return saida;
}

export async function expurgarVencidos(store, {data = Date.now(), maxBlocos = 400, prazo = Date.now() + 18_000} = {}) {
  const limite = inicioDaRetencao(data), mesLimite = limite.slice(0,7);
  let blocos = 0, notas = 0;
  // As pastas existem apenas nos meses com tráfego. Inclui domínios já removidos do catálogo.
  const sites = new Set((await diretorios(store,"eventos/")).filter(x=>/^eventos\/\d+$/.test(x)));
  for await (const pagina of store.list({prefix:"anotacoes/",paginate:true})) {
    for (const blob of pagina.blobs) {
      if (/^anotacoes\/\d+$/.test(blob.key)) sites.add(blob.key.replace("anotacoes/","eventos/"));
    }
  }
  for (const site of sites) {
    if (Date.now() >= prazo) return {blocos,notas,pendente:true};
    const id = site.slice("eventos/".length);
    const chaveNotas = "anotacoes/"+id;
    // Anotação administrativa criada durante a limpeza volta a ser lida na próxima execução.
    const anterior = await lerParaAtualizar(store,chaveNotas);
    if (anterior) {
      const entradas = Object.entries(anterior.data), vigentes = entradas.filter(([dia])=>dia >= limite);
      if (vigentes.length < entradas.length) {
        const r = await store.setJSON(chaveNotas,Object.fromEntries(vigentes),{onlyIfMatch:anterior.etag});
        if (r.modified) notas += entradas.length-vigentes.length;
      }
    }
    const dirMeses = (await diretorios(store,site+"/")).sort();
    for (const dir of dirMeses) {
      const mes = dir.slice(site.length + 1);
      if (!/^\d{4}-\d{2}$/.test(mes) || mes >= mesLimite) continue;
      for await (const pagina of store.list({prefix:dir+"/",paginate:true})) {
        const chaves = pagina.blobs.map(b=>b.key).filter(k=>k.startsWith(dir+"/"));
        for (let i=0; i<chaves.length;) {
          if (Date.now() >= prazo || blocos >= maxBlocos) return {blocos,notas,pendente:true};
          const lote = chaves.slice(i,i+Math.min(10,maxBlocos-blocos));
          await Promise.all(lote.map(k=>store.delete(k)));
          i += lote.length; blocos += lote.length;
        }
      }
    }
  }
  return {blocos,notas,pendente:false};
}
