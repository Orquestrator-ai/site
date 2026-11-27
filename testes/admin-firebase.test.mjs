import test from "node:test";
import assert from "node:assert/strict";
import {verificarAdministrador} from "../servidor/admin-firebase.mjs";

const projeto = "orquestrator-61836";
const dados = {sub: "pessoa", aud: projeto, iss: "https://securetoken.google.com/" + projeto};
const cabecalho = claims => "Bearer e30." + Buffer.from(JSON.stringify(claims)).toString("base64url") + ".teste";

test("rejeita sessão ausente ou que pertence a outro projeto sem encaminhar credencial", async () => {
  const requisitar = () => { throw new Error("consulta indevida"); };
  for (const header of [null, "Bearer foo", cabecalho({...dados, sub:".."}), cabecalho({...dados, aud:"outro"})]) {
    assert.equal(await verificarAdministrador(header, {requisitar}), 401);
  }
});
test("exige que o Firebase aceite o próprio ID token e a concessão habilitada", async () => {
  const header = cabecalho(dados);
  const avaliar = (status, enabled) => verificarAdministrador(header, {requisitar: async (url, init) => {
    assert.equal(new URL(url).origin, "https://firestore.googleapis.com");
    assert.ok(url.endsWith("/documents/admins/pessoa"));
    assert.equal(init.headers.Authorization, header);
    return Response.json({fields: {enabled: {booleanValue: enabled}}}, {status});
  }});
  assert.equal(await avaliar(200, true), 200);
  assert.equal(await avaliar(200, false), 403);
  assert.equal(await avaliar(401, true), 401);
  assert.equal(await avaliar(403, true), 403);
  assert.equal(await avaliar(404, true), 403);
  assert.equal(await avaliar(500, true), 503);
});
