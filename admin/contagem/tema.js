// painel/tema.js — define o tema antes da primeira pintura (sem piscar) e acompanha o sistema.
document.documentElement.dataset.tema = matchMedia("(prefers-color-scheme: dark)").matches ? "escuro" : "claro";
matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) { document.documentElement.dataset.tema = e.matches ? "escuro" : "claro"; });
