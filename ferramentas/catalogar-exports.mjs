// node ferramentas/catalogar-exports.mjs checkout-ai checkout-app checkout-subdominio ...
// Cada checkout contém CNAME e os HTML estáticos publicados pelo GitHub Pages.
import {execFileSync} from "node:child_process";
import {readFileSync, writeFileSync} from "node:fs";
import {join} from "node:path";
import {listarSites} from "../servidor/nuvem.mjs";

const raizPrivada = new Set(["admin", "conta", "assets", "404", "404.html"]);
const catalogo = {};
for (const checkout of process.argv.slice(2)) {
  const dominio = readFileSync(join(checkout,"CNAME"),"utf8").trim().toLowerCase();
  if (Object.hasOwn(catalogo,dominio)) throw new Error("CNAME repetido: " + dominio);
  const lista = execFileSync("git", ["-C",checkout,"ls-files","-z","--","*.html"]).toString().split("\0").filter(Boolean);
  const rotas = new Set();
  for (const arquivo of lista) {
    const partes = arquivo.split("/");
    if (raizPrivada.has(partes[0]) || partes.some(p=>p.startsWith("_") || p.startsWith(".") || /[[\]]/.test(p))) continue;
    const caminho = new URL("/"+arquivo,"https://"+dominio).pathname;
    rotas.add(caminho);
    if (partes.at(-1) === "index.html") {
      const pasta = caminho.slice(0,-"index.html".length);
      rotas.add(pasta);
      rotas.add(pasta.replace(/\/$/,"") || "/");
    }
  }
  if (!rotas.has("/")) throw new Error("sem entrada pública em "+dominio);
  catalogo[dominio] = [...rotas].sort();
}
if (!Object.keys(catalogo).length) throw new Error("Informe os checkouts publicados");
const sites = listarSites(catalogo);
const ordenado = Object.fromEntries(sites.map(s=>[s.dom,catalogo[s.dom]]));
writeFileSync(new URL("../servidor/rotas-publicas.json", import.meta.url),JSON.stringify(ordenado,null,2)+"\n");
for (const site of sites) console.log(site.id,site.dom,ordenado[site.dom].length);
