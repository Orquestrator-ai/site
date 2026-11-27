import {getStore} from "@netlify/blobs";
import {expurgarVencidos} from "../../servidor/retencao.mjs";

// O agendador da Netlify invoca somente o deploy publicado. A limpeza depende de armazenamento forte
// na mesma região da coleta. Se atingir o orçamento de trabalho, retoma pelos blocos restantes.
export default async function retencao() {
  const store = getStore({name:"trafego-v1",region:"us-east-2",consistency:"strong"});
  const resultado = await expurgarVencidos(store);
  console.log("Contagem · retenção", JSON.stringify(resultado));
}
export const config = {schedule:"13 6 * * *"};
