// servidor/banco.mjs — o armazenamento: SQLite nativo do Node (node:sqlite), um arquivo, WAL.
// Guarda eventos brutos já classificados (sem IP, sem UA) e os sites. As agregações vêm em E2.
import * as sqlite from "node:sqlite";

const Database = sqlite.Database || sqlite.DatabaseSync;   // Node 26.11+ chama Database; 22/24 LTS, DatabaseSync

const ESQUEMA = `
CREATE TABLE IF NOT EXISTS sites (
  id        INTEGER PRIMARY KEY,
  dominio   TEXT NOT NULL UNIQUE,
  criado_em TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
) STRICT;
-- um evento por page view, fim de visita ou meta; nunca IP, nunca user-agent
CREATE TABLE IF NOT EXISTS eventos (
  id         INTEGER PRIMARY KEY,
  site_id    INTEGER NOT NULL REFERENCES sites(id),
  instante   INTEGER NOT NULL,            -- ms desde a época, UTC
  tipo       TEXT NOT NULL,               -- pv | fim | ev
  visitante  TEXT NOT NULL,               -- hash do dia (32 hex)
  caminho    TEXT NOT NULL,
  titulo     TEXT,
  origem     TEXT NOT NULL,               -- google | instagram | direto | <host> …
  campanha   TEXT,
  pais       TEXT,                        -- ISO-2
  uf         TEXT,                        -- sigla, só quando pais = BR
  cidade     TEXT,
  aparelho   TEXT NOT NULL,               -- celular | computador | tablet
  navegador  TEXT NOT NULL,
  sistema    TEXT NOT NULL,
  largura    INTEGER,                     -- largura da janela em px (para o aviso "confira em 390 px")
  duracao_s  INTEGER,                     -- só em fim
  rolagem    INTEGER,                     -- 0–100, só em fim
  meta       TEXT,                        -- nome da meta, só em ev
  meta_props TEXT                         -- JSON curto, só em ev
) STRICT;
CREATE INDEX IF NOT EXISTS eventos_site_instante ON eventos(site_id, instante);
CREATE INDEX IF NOT EXISTS eventos_site_visitante ON eventos(site_id, visitante, instante);
-- anotações manuais no gráfico: uma por site e dia (AAAA-MM-DD local)
CREATE TABLE IF NOT EXISTS anotacoes (
  site_id   INTEGER NOT NULL REFERENCES sites(id),
  dia       TEXT NOT NULL,
  texto     TEXT NOT NULL,
  criado_em INTEGER NOT NULL,
  PRIMARY KEY (site_id, dia)
) STRICT;
`;

export function abrirBanco(caminho = ":memory:") {
  const db = new Database(caminho);
  if (caminho !== ":memory:") { db.exec("PRAGMA journal_mode = WAL"); db.exec("PRAGMA synchronous = NORMAL"); }
  db.exec("PRAGMA foreign_keys = ON");
  db.exec(ESQUEMA);
  const q = {
    siteId: db.prepare("SELECT id FROM sites WHERE dominio = ?"),
    novoSite: db.prepare("INSERT INTO sites (dominio) VALUES (?)"),
    sites: db.prepare("SELECT id, dominio, criado_em FROM sites ORDER BY id"),
    inserir: db.prepare(`INSERT INTO eventos (site_id, instante, tipo, visitante, caminho, titulo, origem, campanha, pais, uf, cidade, aparelho, navegador, sistema, largura, duracao_s, rolagem, meta, meta_props)
      VALUES (@site_id, @instante, @tipo, @visitante, @caminho, @titulo, @origem, @campanha, @pais, @uf, @cidade, @aparelho, @navegador, @sistema, @largura, @duracao_s, @rolagem, @meta, @meta_props)`),
    expurgar: db.prepare("DELETE FROM eventos WHERE instante < ?"),
    temPv: db.prepare("SELECT 1 FROM eventos WHERE site_id = ? AND visitante = ? AND tipo = 'pv' LIMIT 1"),
    anotar: db.prepare("INSERT INTO anotacoes (site_id, dia, texto, criado_em) VALUES (?, ?, ?, ?) ON CONFLICT(site_id, dia) DO UPDATE SET texto = excluded.texto, criado_em = excluded.criado_em"),
    desanotar: db.prepare("DELETE FROM anotacoes WHERE site_id = ? AND dia = ?"),
    anotacoes: db.prepare("SELECT dia, texto FROM anotacoes WHERE site_id = ? AND dia >= ? AND dia <= ? ORDER BY dia")
  };
  return {
    db,
    // sites só nascem por cadastro (E4); em E1 o teste cadastra à mão
    cadastrarSite(dominio) { const d = String(dominio).toLowerCase().replace(/^www\./, ""); const r = q.siteId.get(d); if (r) return r.id; return Number(q.novoSite.run(d).lastInsertRowid); },
    siteId(dominio) { const r = q.siteId.get(String(dominio).toLowerCase().replace(/^www\./, "")); return r ? r.id : null; },
    sites: () => q.sites.all(),
    temPageView(site_id, visitante) { return !!q.temPv.get(site_id, visitante); },
    inserirEvento(e) {
      q.inserir.run({site_id: e.site_id, instante: e.instante, tipo: e.tipo, visitante: e.visitante, caminho: e.caminho, titulo: e.titulo ?? null, origem: e.origem, campanha: e.campanha ?? null,
        pais: e.pais ?? null, uf: e.uf ?? null, cidade: e.cidade ?? null, aparelho: e.aparelho, navegador: e.navegador, sistema: e.sistema, largura: e.largura ?? null,
        duracao_s: e.duracao_s ?? null, rolagem: e.rolagem ?? null, meta: e.meta ?? null, meta_props: e.meta_props ?? null});
    },
    // anotações manuais do gráfico (texto curto por dia); texto vazio apaga
    anotar(site_id, dia, texto, agora = Date.now()) {
      const t = String(texto || "").replace(/\s+/g, " ").trim().slice(0, 80);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(dia)) throw new Error("dia inválido");
      if (t) q.anotar.run(site_id, dia, t, agora); else q.desanotar.run(site_id, dia);
      return t || null;
    },
    anotacoes(site_id, de, ate) { return q.anotacoes.all(site_id, de, ate); },
    // retenção do bruto: apaga o que é mais velho que `dias` (os rollups de E2 preservam o histórico)
    expurgar(dias = 90, agora = Date.now()) { return Number(q.expurgar.run(agora - dias * 864e5).changes); },
    // auditoria de privacidade: devolve o texto de todas as células de todas as tabelas (para o teste provar ausência)
    despejo() {
      const tabelas = db.prepare("SELECT name FROM sqlite_master WHERE type = 'table'").all().map(r => r.name);
      return tabelas.map(t => db.prepare(`SELECT * FROM "${t}"`).all().map(l => Object.values(l).join("\u0001")).join("\n")).join("\n");
    },
    fechar() { db.close(); }
  };
}
