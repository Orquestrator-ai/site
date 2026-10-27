/* =========================================================================
   GO PREMIUM · DOENÇAS CLÍNICAS NA GRAVIDEZ — PWA REGISTER
   -------------------------------------------------------------------------
   Registro discreto do service worker. Não cria UI, não exibe alertas,
   não recarrega a página, não interfere na lógica didática.
   Apenas registra `./sw.js` quando o ambiente é seguro
   (https: ou localhost) e o navegador suporta serviceWorker.
   ========================================================================= */

(function () {
  "use strict";

  if (!("serviceWorker" in navigator)) {
    console.info("[GO PWA] navigator.serviceWorker indisponível · registro pulado");
    return;
  }

  // Ambiente seguro · evita registrar via file:// ou http: em hosts não-locais
  var isLocalhost =
    location.hostname === "localhost" ||
    location.hostname === "127.0.0.1" ||
    location.hostname === "[::1]" ||
    /^localhost(:|$)/.test(location.host);
  var isSecure = location.protocol === "https:" || isLocalhost;

  if (!isSecure) {
    console.info("[GO PWA] ambiente não seguro (" + location.protocol + ") · registro pulado");
    return;
  }

  function register() {
    navigator.serviceWorker
      .register("./sw.js", { scope: "./" })
      .then(function (reg) {
        console.info("[GO PWA] service worker registrado · escopo:", reg.scope);

        // Detecta atualização disponível (apenas log · não força reload)
        if (reg.waiting) {
          console.info("[GO PWA] nova versão aguardando ativação (próxima visita)");
        }
        reg.addEventListener("updatefound", function () {
          var newSW = reg.installing;
          if (!newSW) return;
          newSW.addEventListener("statechange", function () {
            if (newSW.state === "installed" && navigator.serviceWorker.controller) {
              console.info("[GO PWA] nova versão pronta · será ativada na próxima visita");
            }
          });
        });
      })
      .catch(function (err) {
        console.warn("[GO PWA] falha ao registrar service worker:", err && err.message);
      });
  }

  // Aguarda window load para não competir com carregamento inicial dos scripts da plataforma
  if (document.readyState === "complete") {
    register();
  } else {
    window.addEventListener("load", register, { once: true });
  }
})();
