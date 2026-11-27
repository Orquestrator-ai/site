import assert from 'node:assert/strict';
import { setTimeout as esperar } from 'node:timers/promises';

const base = 'https://orquestrator-contagem.netlify.app';
for (let tentativa = 1; ; tentativa++) {
  try {
    const saude = await fetch(base + '/api/saude', { signal: AbortSignal.timeout(8000) });
    assert.equal(saude.status, 200);
    assert.equal((await saude.json()).ok, true);
    const sites = await fetch(base + '/api/sites', { signal: AbortSignal.timeout(8000) });
    assert.equal(sites.status, 401);
    console.log('Armazenamento acessível e leitura administrativa protegida.');
    break;
  } catch (erro) {
    if (tentativa === 6) throw erro;
    await esperar(5000);
  }
}
