/* Preferências por origem. As páginas React têm seu próprio aviso e usam a mesma escolha. */
(() => {
  "use strict";
  const chave = "cookie-consent-v1";
  const endereco = "/preferencias-de-visitas/";
  const script = document.currentScript;
  const estilo = script?.dataset.estilo;
  function escolha() {
    try {
      const dados = JSON.parse(localStorage.getItem(chave));
      return typeof dados?.analytics === "boolean" ? dados.analytics : null;
    } catch { return null; }
  }
  function protegido() {
    try { return navigator.globalPrivacyControl === true || navigator.doNotTrack === "1" || !!localStorage.getItem("contagem_ignorar"); }
    catch { return true; }
  }
  function guardar(valor) {
    try {
      localStorage.setItem(chave, JSON.stringify({necessary:true,analytics:valor,marketing:false}));
      window.dispatchEvent(new Event("contagem:consentimento"));
      return true;
    } catch { return false; }
  }
  function criar(tag, texto) {
    const elemento = document.createElement(tag);
    elemento.textContent = texto; return elemento;
  }
  function controles(raiz, pagina) {
    const status = criar("p", "");
    status.setAttribute("role", "status");
    const grupo = criar("div", ""); grupo.className = "botoes";
    function descrever() {
      const valor = escolha();
      status.textContent = protegido()
        ? "A proteção de privacidade do navegador ou a opção de ignorar este dispositivo mantém a medição desligada."
        : valor === true ? "Medição permitida neste site." : valor === false ? "Medição recusada neste site." : "A medição está desligada até você escolher.";
    }
    for (const [texto, valor] of [["Permitir medição",true],["Recusar medição",false]]) {
      const botao = criar("button",texto); botao.type = "button";
      botao.addEventListener("click", () => {
        if (!guardar(valor)) { status.textContent = "O navegador não conseguiu guardar sua escolha. A medição continua desligada."; return; }
        if (pagina) descrever(); else { const link = raiz.getRootNode().querySelector(".rodape a"); raiz.remove(); link?.focus(); }
      });
      grupo.append(botao);
    }
    raiz.append(status,grupo); descrever();
    if (pagina) addEventListener("storage", descrever);
  }
  if (location.pathname === endereco || location.pathname === endereco + "index.html") {
    const raiz = document.getElementById("escolha-contagem");
    if (raiz) controles(raiz, true);
    return;
  }
  function montar() {
    if (document.querySelector("orq-preferencias-visitas")) return;
    const host = document.createElement("orq-preferencias-visitas");
    const sombra = host.attachShadow({mode:"open"});
    const css = document.createElement("link"); css.rel = "stylesheet"; css.href = estilo;
    const rodape = criar("div",""); rodape.className = "rodape";
    const link = criar("a","Preferências de visitas"); link.href = endereco; rodape.append(link);
    sombra.append(css,rodape);
    if (script?.dataset.estatica === "1" && escolha() === null && !protegido()) {
      const aviso = criar("aside",""); aviso.className = "aviso";
      aviso.setAttribute("aria-label","Medição de visitas");
      aviso.append(criar("strong","Permitir a contagem de visitas?"),criar("p","O Contagem mede as páginas visitadas neste site sem cookies de rastreamento. Sua escolha pode ser alterada a qualquer momento."));
      const detalhes = criar("a","Como funciona a medição"); detalhes.href = endereco; aviso.append(detalhes);
      controles(aviso,false); sombra.append(aviso);
    }
    document.body.append(host);
    addEventListener("storage", event => { if (event.key === chave && escolha() !== null) sombra.querySelector(".aviso")?.remove(); });
  }
  if (document.readyState === "complete") montar(); else window.addEventListener("load",montar,{once:true});
})();
