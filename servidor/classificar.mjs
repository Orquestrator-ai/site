// servidor/classificar.mjs — funções puras que transformam o que o coletor manda no que o painel mostra.
// Nenhuma delas guarda estado nem toca disco: tudo testável com entradas e saídas.

// ── origem: o referenciador vira um id conhecido (os mesmos ids da maquete) ou o host limpo ──────────
const ORIGENS = [
  [/(^|\.)google\./, "google", "Google"], [/(^|\.)bing\.com$/, "bing", "Bing"], [/(^|\.)duckduckgo\.com$/, "duckduckgo", "DuckDuckGo"],
  [/(^|\.)yahoo\./, "yahoo", "Yahoo"], [/(^|\.)instagram\.com$|^l\.instagram\.com$/, "instagram", "Instagram"], [/(^|\.)facebook\.com$|^l\.facebook\.com$|^lm\.facebook\.com$|^m\.facebook\.com$/, "facebook", "Facebook"],
  [/(^|\.)pinterest\./, "pinterest", "Pinterest"], [/(^|\.)whatsapp\.com$|^wa\.me$/, "whatsapp", "WhatsApp"], [/(^|\.)t\.co$|(^|\.)twitter\.com$|(^|\.)x\.com$/, "x", "X (Twitter)"],
  [/(^|\.)linkedin\.com$|^lnkd\.in$/, "linkedin", "LinkedIn"], [/(^|\.)youtube\.com$|^youtu\.be$/, "youtube", "YouTube"], [/(^|\.)tiktok\.com$/, "tiktok", "TikTok"],
  [/(^|\.)telegram\.(org|me)$|^t\.me$/, "telegram", "Telegram"], [/(^|\.)reddit\.com$/, "reddit", "Reddit"], [/(^|\.)mercadolivre\.com\.br$/, "mercadolivre", "Mercado Livre"]
];
export const ROTULO_ORIGEM = Object.fromEntries(ORIGENS.map(o => [o[1], o[2]]));
ROTULO_ORIGEM.direto = "Direto / sem origem"; ROTULO_ORIGEM.newsletter = "Newsletter"; ROTULO_ORIGEM.email = "E-mail";

function hostDe(url) {
  try { return new URL(url).hostname.toLowerCase().replace(/^www\./, ""); } catch { return ""; }
}
// referenciador + utm_source/utm_medium + host da própria página → {origem, rotulo, campanha}
export function classificarOrigem({referenciador = "", busca = "", hostProprio = ""}) {
  const q = new URLSearchParams(busca || "");
  const utmSource = (q.get("utm_source") || "").toLowerCase().trim(), utmMedium = (q.get("utm_medium") || "").toLowerCase().trim();
  const campanha = (q.get("utm_campaign") || "").trim().slice(0, 80) || null;
  if (utmMedium === "email" || utmMedium === "newsletter" || /newsletter|mailchimp|sendinblue|brevo|rdstation|mailerlite|substack/.test(utmSource)) return {origem: "newsletter", campanha};
  if (utmSource) {
    const conhecido = ORIGENS.find(o => o[0].test(utmSource + (utmSource.includes(".") ? "" : ".com")));
    return {origem: conhecido ? conhecido[1] : utmSource.replace(/[^a-z0-9.-]/g, "").slice(0, 40) || "direto", campanha};
  }
  const host = hostDe(referenciador);
  if (!host || host === hostProprio.toLowerCase().replace(/^www\./, "")) return {origem: "direto", campanha};
  const conhecido = ORIGENS.find(o => o[0].test(host));
  if (conhecido) return {origem: conhecido[1], campanha};
  // navegador que esconde o referenciador em pesquisa (Chrome manda só o host): google.com cai acima; aqui é outro site
  return {origem: host.slice(0, 80), campanha};
}
export function rotuloOrigem(id) { return ROTULO_ORIGEM[id] || id; }

// ── aparelho / navegador / sistema a partir do User-Agent (só para classificar; o UA nunca é gravado) ──
export function classificarUA(ua = "") {
  const u = String(ua);
  const bot = /bot|crawl|spider|slurp|curl\/|wget\/|python-requests|httpclient|headless|phantom|lighthouse|pingdom|uptime|monitor|facebookexternalhit|whatsapp\/|telegrambot|preview|scrapy|java\/|go-http-client|axios\/|node-fetch|okhttp|dataprovider|validator|archive\.org|semrush|ahrefs|mj12|dotbot|petalbot|bytespider|gptbot|claudebot|ccbot|applebot|yandex|baidu|sogou|duckduckbot|bingpreview/i.test(u) || !u.trim();
  const sistema = /iPhone|iPad|iPod/.test(u) ? "iOS" : /Android/.test(u) ? "Android" : /Windows/.test(u) ? "Windows" : /Mac OS X|Macintosh/.test(u) ? "macOS" : /CrOS/.test(u) ? "ChromeOS" : /Linux/.test(u) ? "Linux" : "Outro";
  const aparelho = /iPad|Tablet|PlayBook|Silk|Kindle/.test(u) || (/Android/.test(u) && !/Mobile/.test(u)) ? "tablet" : /Mobi|iPhone|iPod|Android.*Mobile|Windows Phone|webOS|BlackBerry|Opera Mini/.test(u) ? "celular" : "computador";
  let navegador = "Outro";
  if (/Edg(e|A|iOS)?\//.test(u)) navegador = "Edge";
  else if (/OPR\/|Opera/.test(u)) navegador = "Opera";
  else if (/SamsungBrowser\//.test(u)) navegador = "Samsung Internet";
  else if (/Brave/.test(u)) navegador = "Brave";
  else if (/Vivaldi/.test(u)) navegador = "Vivaldi";
  else if (/Firefox\/|FxiOS\//.test(u)) navegador = "Firefox";
  else if (/CriOS\//.test(u)) navegador = "Chrome";
  else if (/Chrome\/|Chromium\//.test(u)) navegador = "Chrome";
  else if (/Safari\//.test(u) && /Version\//.test(u)) navegador = "Safari";
  else if (/MSIE|Trident\//.test(u)) navegador = "Internet Explorer";
  return {bot, aparelho, navegador, sistema};
}

// ── caminho e título limpos ───────────────────────────────────────────────────────────────────────────
export function limparCaminho(p = "") {
  let c = String(p).split("#")[0].split("?")[0] || "/";
  if (!c.startsWith("/")) c = "/" + c;
  if (c.length > 1 && c.endsWith("/")) c = c.slice(0, -1);
  try { c = decodeURIComponent(c); } catch {}
  return c.slice(0, 200);
}
export function limparTitulo(t = "") { return String(t).replace(/\s+/g, " ").trim().slice(0, 120) || null; }
