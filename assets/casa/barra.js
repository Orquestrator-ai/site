/* GERADO por scripts/casas-2/parada.mjs (orquestrator-site). Não editar à mão: mude a fonte lá e gere de novo. Fonte: src/views/casas-2/ligar-barra.ts. */
(() => {
const GUARDADO = "c2-saiu-pela-chave";
const ligarBarra = (barra) => {
    const desfazer = [];
    const ouvir = (alvo, evento, f) => {
        alvo.addEventListener(evento, f);
        desfazer.push(() => alvo.removeEventListener(evento, f));
    };
    const botao = barra.querySelector(".sanduiche");
    const gaveta = barra.querySelector(".gaveta");
    let fecharGaveta = () => { };
    if (botao && gaveta) {
        const mover = (abre) => {
            gaveta.hidden = !abre;
            botao.setAttribute("aria-expanded", String(abre));
        };
        fecharGaveta = () => mover(false);
        ouvir(botao, "click", () => mover(gaveta.hidden));
        ouvir(gaveta, "click", (e) => {
            if (e.target instanceof Element && e.target.closest("a"))
                mover(false);
        });
        ouvir(window, "keydown", (e) => {
            if (e instanceof KeyboardEvent && e.key === "Escape" && !gaveta.hidden) {
                mover(false);
                botao.focus();
            }
        });
        ouvir(document, "pointerdown", (e) => {
            if (!gaveta.hidden && e.target instanceof Node && !barra.contains(e.target))
                mover(false);
        });
        ouvir(window, "pagehide", () => mover(false));
        const larga = matchMedia("(min-width: 1180.02px)");
        ouvir(larga, "change", () => {
            if (larga.matches)
                mover(false);
        });
    }
    const meio = barra.querySelector(".menu.do-produto");
    if (meio) {
        let vivo = true;
        const conferir = () => {
            if (!vivo)
                return;
            const estava = barra.hasAttribute("data-apertada");
            barra.removeAttribute("data-apertada");
            const ultimo = meio.lastElementChild;
            const quebrou = ultimo instanceof HTMLElement && meio.getClientRects().length > 0 && ultimo.offsetTop - meio.offsetTop > 17;
            if (quebrou)
                barra.setAttribute("data-apertada", "");
            else if (estava && matchMedia("(min-width: 1180.02px)").matches)
                fecharGaveta();
        };
        conferir();
        ouvir(window, "resize", conferir);
        void document.fonts.ready.then(conferir);
        desfazer.push(() => {
            vivo = false;
        });
    }
    const chave = barra.hasAttribute("data-sem-memoria") ? null : barra.querySelector(".chave");
    if (chave) {
        const lado = chave.dataset.lado ?? "";
        let veio = "";
        try {
            const guardado = JSON.parse(sessionStorage.getItem(GUARDADO) ?? "null");
            sessionStorage.removeItem(GUARDADO);
            if (guardado && typeof guardado === "object" && "de" in guardado && "em" in guardado) {
                const { de, em } = guardado;
                if (typeof de === "string" && /^[a-z]+$/.test(de) && typeof em === "number" && Date.now() - em < 8000)
                    veio = de;
            }
        }
        catch {
        }
        const agora = chave.querySelector("a[aria-current]");
        const antes = veio ? chave.querySelector(`a[data-lado="${veio}"]`) : null;
        const navegadorFunde = "CSSViewTransitionRule" in window;
        const calmo = matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (agora && antes && antes !== agora && !navegadorFunde && !calmo) {
            const a = antes.getBoundingClientRect();
            const b = agora.getBoundingClientRect();
            try {
                agora.animate([
                    { left: `${a.left - b.left}px`, right: `${b.right - a.right}px` },
                    { left: "0px", right: "0px" },
                ], { duration: 400, easing: "cubic-bezier(0.3, 0.7, 0.2, 1)", pseudoElement: "::before" });
            }
            catch {
            }
        }
        ouvir(barra, "click", (e) => {
            if (!(e.target instanceof Element) || !e.target.closest(".chave a, .loja-botao, .marca"))
                return;
            try {
                sessionStorage.setItem(GUARDADO, JSON.stringify({ de: lado, em: Date.now() }));
            }
            catch {
            }
        });
    }
    return () => desfazer.forEach((f) => f());
};

const ligar = () => document.querySelectorAll('.c2-barra .barra').forEach((barra) => ligarBarra(barra));
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ligar, { once: true }); else ligar();
})();
