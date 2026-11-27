// IDs exclusivos de leitura. Sites físicos novos usam IDs calculados acima de 99.
export const AREAS = [
  {id:9, origem:1, dominio:"orquestrator.ai", prefixo:"/store", dom:"orquestrator.ai/store", ini:"S", cor:"#4965b4"},
  {id:10, origem:1, dominio:"orquestrator.ai", prefixo:"/medicina", dom:"orquestrator.ai/medicina", ini:"M", cor:"#007564"}
];
export function pertence(caminho,prefixo) {
  return caminho === prefixo || caminho.startsWith(prefixo + "/");
}
