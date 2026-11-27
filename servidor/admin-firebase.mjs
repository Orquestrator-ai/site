// O Firestore verifica assinatura, validade e UID do ID token antes de ler admins/{uid}.
// A regra de produção permite somente a leitura da concessão do próprio usuário.
const PROJETO = "orquestrator-61836";
const COLECAO = "https://firestore.googleapis.com/v1/projects/" + PROJETO + "/databases/(default)/documents/admins/";

export async function verificarAdministrador(cabecalho, {requisitar = fetch} = {}) {
  const correspondencia = /^Bearer ([A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+)$/i.exec(cabecalho || "");
  if (!correspondencia || cabecalho.length > 8192) return 401;
  const token = correspondencia[1];
  let dados;
  try {
    dados = JSON.parse(Buffer.from(token.split(".")[1], "base64url").toString("utf8"));
  } catch { return 401; }
  const uid = dados?.sub;
  if (dados?.aud !== PROJETO || dados.iss !== "https://securetoken.google.com/" + PROJETO ||
      typeof uid !== "string" || !uid || uid.length > 128 || /[\/\x00-\x1f]/.test(uid) || uid === "." || uid === "..") return 401;
  // O conteúdo decodificado serve só para escolher o documento. A decisão vem da resposta autenticada.
  try {
    const resposta = await requisitar(COLECAO + encodeURIComponent(uid), {
      headers: {Authorization: "Bearer " + token}, redirect: "error", cache: "no-store", signal: AbortSignal.timeout(6000)
    });
    if (resposta.status === 401) return 401;
    if (resposta.status === 403 || resposta.status === 404) return 403;
    if (!resposta.ok) return 503;
    const concessao = await resposta.json();
    return concessao?.fields?.enabled?.booleanValue === true ? 200 : 403;
  } catch { return 503; }
}
