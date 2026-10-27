/* =========================================
   INTENSIVÃO PREVENTIVA — COMPONENTES INTERATIVOS
   Biblioteca de componentes especializados:
   - Tabela 2x2 interativa com cálculos em tempo real
   - Slider de prevalência / probabilidade pré-teste
   - Curva ROC interativa (ponto de corte arrastável)
   - Calculadora de média/mediana/moda/variância/DP
   - Casos clínicos com feedback
   - Flashcards de revisão ativa
   ========================================= */

window.PrevInt = {};

/* ─────────────────────────────────────────
   Util: escapar HTML e gerar id único
───────────────────────────────────────── */
let _uid = 0;
function uid(prefix='pi') { return prefix + '-' + (++_uid) + '-' + Date.now().toString(36); }
function esc(s) {
  return String(s)
    .replaceAll('&','&amp;').replaceAll('<','&lt;')
    .replaceAll('>','&gt;').replaceAll('"','&quot;');
}
function pct(x, d=1) { return (x*100).toFixed(d) + '%'; }
function round(x, d=2) { return Math.round(x * Math.pow(10,d)) / Math.pow(10,d); }

/* ─────────────────────────────────────────
   1. TABELA 2X2 INTERATIVA
   Aceita preset {vp, fp, fn, vn} e calcula em tempo real:
   Sens, Esp, Acurácia, VPP, VPN, Prevalência, RV+, RV−.
───────────────────────────────────────── */
PrevInt.tabela2x2 = function(opts = {}) {
  const id = uid('t2');
  const init = opts.preset || { vp: 90, fp: 30, fn: 10, vn: 870 };
  const presets = opts.presets || [
    { name: 'Padrão',          vp: 90,  fp: 30,  fn: 10,  vn: 870 },
    { name: 'Alta prevalência', vp: 180, fp: 30,  fn: 20,  vn: 770 },
    { name: 'Baixa prevalência', vp: 10, fp: 90,  fn: 1,   vn: 899 },
    { name: 'Teste sensível',   vp: 99,  fp: 200, fn: 1,   vn: 700 },
    { name: 'Teste específico', vp: 70,  fp: 5,   fn: 30,  vn: 895 },
  ];
  const labels = opts.labels || { vp: 'VP', fp: 'FP', fn: 'FN', vn: 'VN', d: 'Doente', s: 'Sadio', tpos: 'Teste +', tneg: 'Teste −' };

  setTimeout(() => PrevInt._wireT2(id), 0);

  return `
  <div class="tbl2x2-wrap" id="${id}">
    <div class="tbl2x2" role="grid" aria-label="Tabela 2x2 interativa">
      <div class="tcell tcorner">Teste / Padrão-ouro</div>
      <div class="tcell thead">${labels.d}</div>
      <div class="tcell thead">${labels.s}</div>
      <div class="tcell thead">Total</div>

      <div class="tcell trow-label">${labels.tpos}</div>
      <div class="tcell vp"><span class="tlbl">${labels.vp}</span><input class="tinput" data-k="vp" type="number" min="0" value="${init.vp}"></div>
      <div class="tcell fp"><span class="tlbl">${labels.fp}</span><input class="tinput" data-k="fp" type="number" min="0" value="${init.fp}"></div>
      <div class="tcell total"><span class="tlbl">VP+FP</span><span class="tval" data-out="tp">0</span></div>

      <div class="tcell trow-label">${labels.tneg}</div>
      <div class="tcell fn"><span class="tlbl">${labels.fn}</span><input class="tinput" data-k="fn" type="number" min="0" value="${init.fn}"></div>
      <div class="tcell vn"><span class="tlbl">${labels.vn}</span><input class="tinput" data-k="vn" type="number" min="0" value="${init.vn}"></div>
      <div class="tcell total"><span class="tlbl">FN+VN</span><span class="tval" data-out="tn">0</span></div>

      <div class="tcell trow-label">Total</div>
      <div class="tcell total"><span class="tlbl">Doentes</span><span class="tval" data-out="td">0</span></div>
      <div class="tcell total"><span class="tlbl">Sadios</span><span class="tval" data-out="ts">0</span></div>
      <div class="tcell total"><span class="tlbl">N</span><span class="tval" data-out="n">0</span></div>
    </div>

    <div class="tbl2x2-out">
      <h4>Cálculos automáticos</h4>
      <div class="row"><span class="lbl">Prevalência</span><span class="val --b" data-out="prev">—</span></div>
      <div class="row"><span class="lbl">Sensibilidade (S)</span><span class="val --g" data-out="sens">—</span></div>
      <div class="row"><span class="lbl">Especificidade (E)</span><span class="val --g" data-out="esp">—</span></div>
      <div class="row"><span class="lbl">Acurácia</span><span class="val --b" data-out="acu">—</span></div>
      <div class="row"><span class="lbl">VPP</span><span class="val --v" data-out="vpp">—</span></div>
      <div class="row"><span class="lbl">VPN</span><span class="val --v" data-out="vpn">—</span></div>
      <div class="row"><span class="lbl">RV+</span><span class="val --r" data-out="rvp">—</span></div>
      <div class="row"><span class="lbl">RV−</span><span class="val --r" data-out="rvn">—</span></div>

      <div class="tbl2x2-presets" data-presets>
        ${presets.map((p,i) => `<button type="button" data-preset='${i}' data-pv='${JSON.stringify(p)}'>${esc(p.name)}</button>`).join('')}
      </div>
    </div>
  </div>`;
};

PrevInt._wireT2 = function(id) {
  const root = document.getElementById(id);
  if (!root) return;
  const inputs = root.querySelectorAll('.tinput');
  const outs = {};
  root.querySelectorAll('[data-out]').forEach(el => outs[el.dataset.out] = el);

  function read() {
    const v = {};
    inputs.forEach(i => v[i.dataset.k] = Math.max(0, parseFloat(i.value) || 0));
    return v;
  }
  function calc() {
    const {vp,fp,fn,vn} = read();
    const tp = vp+fp, tn = fn+vn, td = vp+fn, ts = fp+vn, n = vp+fp+fn+vn;
    outs.tp.textContent = tp;
    outs.tn.textContent = tn;
    outs.td.textContent = td;
    outs.ts.textContent = ts;
    outs.n.textContent  = n;

    const sens = td ? vp/td : NaN;
    const esp  = ts ? vn/ts : NaN;
    const acu  = n  ? (vp+vn)/n : NaN;
    const vpp  = tp ? vp/tp : NaN;
    const vpn  = tn ? vn/tn : NaN;
    const prev = n ? td/n : NaN;
    const rvp  = (1-esp) ? sens/(1-esp) : NaN;
    const rvn  = esp ? (1-sens)/esp : NaN;

    outs.prev.textContent = isFinite(prev) ? pct(prev,1) : '—';
    outs.sens.textContent = isFinite(sens) ? pct(sens,1) : '—';
    outs.esp.textContent  = isFinite(esp)  ? pct(esp,1)  : '—';
    outs.acu.textContent  = isFinite(acu)  ? pct(acu,1)  : '—';
    outs.vpp.textContent  = isFinite(vpp)  ? pct(vpp,1)  : '—';
    outs.vpn.textContent  = isFinite(vpn)  ? pct(vpn,1)  : '—';
    outs.rvp.textContent  = isFinite(rvp) && rvp!==Infinity ? rvp.toFixed(2) : '—';
    outs.rvn.textContent  = isFinite(rvn) ? rvn.toFixed(2) : '—';
  }

  inputs.forEach(i => i.addEventListener('input', calc));
  root.querySelectorAll('[data-preset]').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = JSON.parse(btn.dataset.pv);
      inputs.forEach(i => { if (p[i.dataset.k] !== undefined) i.value = p[i.dataset.k]; });
      calc();
    });
  });
  calc();
};

/* ─────────────────────────────────────────
   2. SIMULADOR DE PREVALÊNCIA
   Fixa Sens/Esp; varia prevalência; mostra VPP e VPN evoluindo.
───────────────────────────────────────── */
PrevInt.simPrevalencia = function(opts = {}) {
  const id = uid('sp');
  const sens = opts.sens ?? 0.95;
  const esp  = opts.esp  ?? 0.90;
  const initPrev = opts.prev ?? 0.10;

  setTimeout(() => PrevInt._wireSP(id, sens, esp), 0);

  return `
  <div class="dist-wrap" id="${id}">
    <div style="display:flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 8px;">
      <h4 style="margin:0; font-size:14px; text-transform:uppercase; letter-spacing:.05em; color: var(--text-muted)">Simulador: prevalência muda VPP/VPN</h4>
      <span class="didax-chip --teal"><span class="ico">⚙</span>S=${pct(sens,0)} · E=${pct(esp,0)}</span>
    </div>
    <div class="prev-slider" style="--accent-color: var(--c-teal)">
      <label>Prevalência da doença na população <span class="val" data-out="prev">${pct(initPrev,1)}</span></label>
      <input type="range" min="0.1" max="80" step="0.1" value="${initPrev*100}" data-prev>
    </div>
    <div class="kpi-grid" style="margin-top: 14px;">
      <div class="kpi --violet"><span class="k-lbl">VPP</span><span class="k-val" data-out="vpp">—</span><span class="k-sub">Prob. de estar doente se teste +</span></div>
      <div class="kpi --violet"><span class="k-lbl">VPN</span><span class="k-val" data-out="vpn">—</span><span class="k-sub">Prob. de estar sadio se teste −</span></div>
      <div class="kpi --green"><span class="k-lbl">Sens</span><span class="k-val">${pct(sens,1)}</span><span class="k-sub">Invariante por prevalência</span></div>
      <div class="kpi --green"><span class="k-lbl">Esp</span><span class="k-val">${pct(esp,1)}</span><span class="k-sub">Invariante por prevalência</span></div>
    </div>
    <div data-narrativa style="margin-top: 10px; font-size: 14px; color: var(--text-secondary); line-height: 1.6;"></div>
  </div>`;
};

PrevInt._wireSP = function(id, sens, esp) {
  const root = document.getElementById(id);
  if (!root) return;
  const rng = root.querySelector('[data-prev]');
  const ov  = root.querySelector('[data-out=prev]');
  const ovp = root.querySelector('[data-out=vpp]');
  const ovn = root.querySelector('[data-out=vpn]');
  const narr = root.querySelector('[data-narrativa]');

  function calc() {
    const prev = parseFloat(rng.value) / 100;
    const pct = prev * 100;
    // pull color via fill var
    rng.style.setProperty('--fill', pct + '%');
    ov.textContent = (pct).toFixed(1) + '%';

    const num_vpp = sens * prev;
    const den_vpp = sens * prev + (1 - esp) * (1 - prev);
    const num_vpn = esp * (1 - prev);
    const den_vpn = esp * (1 - prev) + (1 - sens) * prev;
    const vpp = den_vpp ? num_vpp / den_vpp : 0;
    const vpn = den_vpn ? num_vpn / den_vpn : 0;
    ovp.textContent = (vpp*100).toFixed(1) + '%';
    ovn.textContent = (vpn*100).toFixed(1) + '%';

    let narrativa;
    if (prev < 0.02) narrativa = `Prevalência muito baixa: <strong>VPP despenca</strong> (${(vpp*100).toFixed(0)}%) — a maioria dos positivos é falso. VPN beira 100%.`;
    else if (prev < 0.10) narrativa = `Prevalência baixa: VPP modesto (${(vpp*100).toFixed(0)}%). Mais falsos positivos do que verdadeiros em situações de rastreio.`;
    else if (prev < 0.30) narrativa = `Prevalência intermediária: VPP razoável (${(vpp*100).toFixed(0)}%) e VPN ainda alto. Zona típica de população sintomática.`;
    else narrativa = `Prevalência alta: VPP sobe (${(vpp*100).toFixed(0)}%), mas VPN começa a cair — mais doentes "escapam" no teste negativo.`;
    narr.innerHTML = narrativa;
  }
  rng.addEventListener('input', calc);
  calc();
};

/* ─────────────────────────────────────────
   3. SLIDER PRÉ → PÓS (BAYES / RV)
   Inputs: probabilidade pré-teste e RV+ e RV-.
───────────────────────────────────────── */
PrevInt.bayes = function(opts={}) {
  const id = uid('by');
  const prev = opts.prev ?? 0.10;
  const rvp = opts.rvp ?? 10;
  const rvn = opts.rvn ?? 0.10;

  setTimeout(() => PrevInt._wireBy(id), 0);

  return `
  <div class="dist-wrap" id="${id}">
    <h4 style="margin:0 0 8px; font-size:14px; text-transform:uppercase; letter-spacing:.05em; color:var(--text-muted)">Calculadora Bayesiana — pré-teste × RV → pós-teste</h4>
    <div style="display:grid; grid-template-columns: 1fr; gap: 10px;">
      <div class="prev-slider" style="--accent-color: var(--c-teal)">
        <label>Probabilidade pré-teste <span class="val" data-out="prevv">${pct(prev,0)}</span></label>
        <input type="range" min="1" max="95" step="1" value="${prev*100}" data-prev>
      </div>
      <div class="prev-slider" style="--accent-color: var(--c-violet)">
        <label>RV+ (razão de verossimilhança positiva) <span class="val" data-out="rvpv">${rvp}</span></label>
        <input type="range" min="1" max="50" step="0.5" value="${rvp}" data-rvp>
      </div>
      <div class="prev-slider" style="--accent-color: var(--c-orange)">
        <label>RV− (razão de verossimilhança negativa) <span class="val" data-out="rvnv">${rvn}</span></label>
        <input type="range" min="0.01" max="1" step="0.01" value="${rvn}" data-rvn>
      </div>
    </div>
    <div class="kpi-grid" style="margin-top: 12px;">
      <div class="kpi --green"><span class="k-lbl">Pós-teste se +</span><span class="k-val" data-out="post+">—</span><span class="k-sub">prob. de doença após teste positivo</span></div>
      <div class="kpi --red"><span class="k-lbl">Pós-teste se −</span><span class="k-val" data-out="post-">—</span><span class="k-sub">prob. de doença mesmo com teste negativo</span></div>
    </div>
    <div data-bnarr style="margin-top: 10px; font-size: 14px; color: var(--text-secondary); line-height:1.6;"></div>
  </div>`;
};

PrevInt._wireBy = function(id) {
  const root = document.getElementById(id);
  if (!root) return;
  const $ = sel => root.querySelector(sel);
  const rp = $('[data-prev]'), rvp = $('[data-rvp]'), rvn = $('[data-rvn]');
  const prevv = $('[data-out=prevv]'), rvpv = $('[data-out=rvpv]'), rvnv = $('[data-out=rvnv]');
  const op = root.querySelector('[data-out="post+"]'), on_ = root.querySelector('[data-out="post-"]');
  const narr = $('[data-bnarr]');

  function calc() {
    const p = parseFloat(rp.value) / 100;
    const Rp = parseFloat(rvp.value);
    const Rn = parseFloat(rvn.value);
    prevv.textContent = (p*100).toFixed(0) + '%';
    rvpv.textContent  = Rp.toFixed(1);
    rvnv.textContent  = Rn.toFixed(2);
    rp.style.setProperty('--fill', (p*100) + '%');
    rvp.style.setProperty('--fill', (Rp/50*100) + '%');
    rvn.style.setProperty('--fill', (Rn*100) + '%');

    // odds = p/(1-p) ; post-odds+ = odds * RV+ ; prob = odds/(1+odds)
    const odds = p/(1-p);
    const postOddsPlus  = odds * Rp;
    const postOddsMinus = odds * Rn;
    const postPlus  = postOddsPlus  / (1 + postOddsPlus);
    const postMinus = postOddsMinus / (1 + postOddsMinus);
    op.textContent = (postPlus*100).toFixed(1) + '%';
    on_.textContent = (postMinus*100).toFixed(1) + '%';

    let n;
    if (Rp >= 10) n = `RV+ ≥ 10 puxa a probabilidade <strong>fortemente para cima</strong>. Esse teste positivo confirma muito.`;
    else if (Rp >= 5) n = `RV+ entre 5 e 10: mudança importante. Confiança razoável no positivo.`;
    else if (Rp >= 2) n = `RV+ entre 2 e 5: efeito leve a moderado.`;
    else n = `RV+ < 2: teste positivo quase não muda sua hipótese.`;
    if (Rn <= 0.1) n += ` RV− ≤ 0,1 puxa para baixo: teste negativo <strong>exclui</strong> com força.`;
    else if (Rn <= 0.5) n += ` RV− entre 0,1 e 0,5: efeito moderado de exclusão.`;
    else n += ` RV− > 0,5: teste negativo pouco contribui para excluir.`;
    narr.innerHTML = n;
  }
  [rp, rvp, rvn].forEach(r => r.addEventListener('input', calc));
  calc();
};

/* ─────────────────────────────────────────
   4. CALCULADORA TENDÊNCIA CENTRAL / DISPERSÃO
   Entrada: lista de números (vírgula ou espaço).
───────────────────────────────────────── */
PrevInt.calcEstat = function(opts={}) {
  const id = uid('ce');
  const init = opts.values || [4, 5, 5, 6, 7, 8, 9];

  setTimeout(() => PrevInt._wireCe(id), 0);

  return `
  <div class="dist-wrap" id="${id}">
    <h4 style="margin:0 0 8px; font-size:14px; text-transform:uppercase; letter-spacing:.05em; color:var(--text-muted)">Calculadora — Tendência central e dispersão</h4>
    <label style="display:block; font-size:13px; color: var(--text-secondary); margin-bottom: 4px; font-weight: 600;">Dados (separados por vírgula ou espaço)</label>
    <textarea data-vals rows="2" style="width:100%; padding:10px 12px; border:1px solid var(--border-color); border-radius:10px; background:var(--bg-elevated); font-family: 'JetBrains Mono', monospace; font-size:15px; color:var(--text-primary)">${init.join(', ')}</textarea>

    <div class="kpi-grid" style="margin-top:12px;">
      <div class="kpi --blue"><span class="k-lbl">N</span><span class="k-val" data-out="n">—</span></div>
      <div class="kpi --blue"><span class="k-lbl">Soma (Σx)</span><span class="k-val" data-out="sum">—</span></div>
      <div class="kpi --orange"><span class="k-lbl">Média (x̄)</span><span class="k-val" data-out="mean">—</span></div>
      <div class="kpi --violet"><span class="k-lbl">Mediana</span><span class="k-val" data-out="med">—</span></div>
      <div class="kpi --green"><span class="k-lbl">Moda</span><span class="k-val" data-out="mode">—</span></div>
      <div class="kpi --teal"><span class="k-lbl">Amplitude</span><span class="k-val" data-out="amp">—</span></div>
      <div class="kpi --teal"><span class="k-lbl">Variância (s²)</span><span class="k-val" data-out="var">—</span></div>
      <div class="kpi --orange"><span class="k-lbl">Desvio padrão (s)</span><span class="k-val" data-out="dp">—</span></div>
    </div>

    <div class="dot-strip" data-dots aria-label="Visualização dos valores"></div>
    <div data-cenarr style="font-size:14px; color: var(--text-secondary); line-height:1.6;"></div>
  </div>`;
};

PrevInt._wireCe = function(id) {
  const root = document.getElementById(id);
  if (!root) return;
  const ta = root.querySelector('[data-vals]');
  const dots = root.querySelector('[data-dots]');
  const narr = root.querySelector('[data-cenarr]');
  const o = {};
  root.querySelectorAll('[data-out]').forEach(el => o[el.dataset.out] = el);

  function parse(s) {
    return s.split(/[\s,;]+/).map(x => parseFloat(x)).filter(x => !isNaN(x));
  }
  function mediana(arr) {
    const a = [...arr].sort((x,y) => x-y);
    const n = a.length;
    if (!n) return NaN;
    return n % 2 ? a[(n-1)/2] : (a[n/2-1] + a[n/2]) / 2;
  }
  function moda(arr) {
    const f = {};
    arr.forEach(x => f[x] = (f[x]||0)+1);
    const max = Math.max(...Object.values(f));
    if (max <= 1) return null; // amodal
    const ms = Object.keys(f).filter(k => f[k] === max).map(Number).sort((a,b)=>a-b);
    return ms;
  }
  function calc() {
    const v = parse(ta.value);
    if (!v.length) {
      Object.values(o).forEach(el => el.textContent = '—');
      dots.innerHTML = ''; narr.innerHTML = '';
      return;
    }
    const n = v.length;
    const sum = v.reduce((a,b)=>a+b,0);
    const mean = sum / n;
    const med = mediana(v);
    const md = moda(v);
    const amp = Math.max(...v) - Math.min(...v);
    // variância amostral (n-1)
    const ssd = v.reduce((s,x) => s + (x-mean)**2, 0);
    const variance = n > 1 ? ssd / (n-1) : 0;
    const dp = Math.sqrt(variance);

    o.n.textContent = n;
    o.sum.textContent = round(sum, 2);
    o.mean.textContent = round(mean, 2);
    o.med.textContent = round(med, 2);
    o.mode.textContent = md ? (md.length > 3 ? 'Amodal' : md.join(' · ')) : 'Amodal';
    o.amp.textContent = round(amp, 2);
    o.var.textContent = round(variance, 2);
    o.dp.textContent  = round(dp, 2);

    // Dot strip: cada valor um ponto
    const min = Math.min(...v), max = Math.max(...v);
    const range = max - min || 1;
    dots.innerHTML = v.map(x => {
      const left = ((x - min) / range) * 100;
      const isOut = (x - mean) > 2*dp || (mean - x) > 2*dp;
      const isMode = md && md.includes(x);
      const cls = isOut ? '--outlier' : (isMode ? '--mode' : '');
      return `<span class="dot ${cls}" title="x = ${x}" style="margin-left: ${left*0.6}px"></span>`;
    }).join('');

    let n2;
    if (Math.abs(mean - med) < dp*0.3) n2 = `Média ≈ mediana ⇒ distribuição <strong>simétrica</strong>. Use média sem medo.`;
    else if (mean > med) n2 = `Média (${round(mean,1)}) > mediana (${round(med,1)}) ⇒ <strong>assimetria à direita</strong>. Outliers altos puxam a média. <em>Mediana é mais robusta.</em>`;
    else n2 = `Média (${round(mean,1)}) < mediana (${round(med,1)}) ⇒ <strong>assimetria à esquerda</strong>. Outliers baixos puxam a média.`;
    narr.innerHTML = n2;
  }
  ta.addEventListener('input', calc);
  calc();
};

/* ─────────────────────────────────────────
   5. CURVA ROC INTERATIVA
   Distribuições sãos/doentes + slider de corte
───────────────────────────────────────── */
PrevInt.rocCurva = function(opts={}) {
  const id = uid('rc');
  // distribuições normais aproximadas: doentes média μ1, sãos μ0, sd1, sd0
  const params = {
    mu0: opts.mu0 ?? 4.8,    sd0: opts.sd0 ?? 0.55,  // sãos
    mu1: opts.mu1 ?? 7.5,    sd1: opts.sd1 ?? 1.05,  // doentes
    cut: opts.cut ?? 6.5,
    label: opts.label || 'HbA1c (%)',
    range: opts.range || [3, 12]
  };
  setTimeout(() => PrevInt._wireRoc(id, params), 0);

  return `
  <div class="roc-wrap" id="${id}">
    <div>
      <h4 style="margin:0 0 6px; font-size:14px; text-transform:uppercase; letter-spacing:.05em; color:var(--text-muted)">Distribuições e ponto de corte</h4>
      <div data-dist></div>
      <div class="prev-slider" style="--accent-color: var(--c-orange); margin-top: 8px;">
        <label>Ponto de corte <span class="val" data-out="cutv">${params.cut.toFixed(2)} ${params.label.split(' ')[1] || ''}</span></label>
        <input type="range" min="${params.range[0]}" max="${params.range[1]}" step="0.05" value="${params.cut}" data-cut>
      </div>
    </div>
    <div class="roc-side">
      <h4 style="margin:0; font-size:14px; text-transform:uppercase; letter-spacing:.05em; color:var(--text-muted)">Curva ROC</h4>
      <div data-roc></div>
      <div class="kpi-grid" style="grid-template-columns: 1fr 1fr;">
        <div class="kpi --green"><span class="k-lbl">Sens</span><span class="k-val" data-out="sens">—</span></div>
        <div class="kpi --green"><span class="k-lbl">Esp</span><span class="k-val" data-out="esp">—</span></div>
        <div class="kpi --violet"><span class="k-lbl">AUC</span><span class="k-val" data-out="auc">—</span></div>
        <div class="kpi --orange"><span class="k-lbl">FPR</span><span class="k-val" data-out="fpr">—</span></div>
      </div>
      <div data-rocnarr style="font-size:13px; color: var(--text-secondary); line-height:1.55;"></div>
    </div>
  </div>`;
};

// Helpers estatísticos (normal CDF via erf approx)
function erf(x) {
  // Abramowitz & Stegun
  const a1 =  0.254829592, a2 = -0.284496736, a3 =  1.421413741;
  const a4 = -1.453152027, a5 =  1.061405429, p  =  0.3275911;
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);
  const t = 1.0 / (1.0 + p*x);
  const y = 1.0 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t * Math.exp(-x*x);
  return sign*y;
}
function normCdf(x, mu, sd) { return 0.5 * (1 + erf((x - mu) / (sd*Math.SQRT2))); }
function normPdf(x, mu, sd) { return (1/(sd*Math.sqrt(2*Math.PI))) * Math.exp(-0.5*((x-mu)/sd)**2); }

PrevInt._wireRoc = function(id, params) {
  const root = document.getElementById(id);
  if (!root) return;
  const cutInp = root.querySelector('[data-cut]');
  const cutv = root.querySelector('[data-out=cutv]');
  const sensEl = root.querySelector('[data-out=sens]');
  const espEl  = root.querySelector('[data-out=esp]');
  const aucEl  = root.querySelector('[data-out=auc]');
  const fprEl  = root.querySelector('[data-out=fpr]');
  const distContainer = root.querySelector('[data-dist]');
  const rocContainer  = root.querySelector('[data-roc]');
  const narrEl = root.querySelector('[data-rocnarr]');

  // AUC numérico via integração trapezoidal
  function calcAuc() {
    let area = 0;
    let prevTpr = 1, prevFpr = 1;
    for (let t = params.range[1]; t >= params.range[0]; t -= 0.05) {
      const tpr = 1 - normCdf(t, params.mu1, params.sd1);
      const fpr = 1 - normCdf(t, params.mu0, params.sd0);
      area += (fpr - prevFpr) * (tpr + prevTpr) / 2;
      prevTpr = tpr; prevFpr = fpr;
    }
    return Math.abs(area);
  }
  const auc = calcAuc();

  // ROC SVG (estático)
  function buildRoc() {
    const W = 280, H = 240, pad = 30;
    let path = '';
    let pts = [];
    for (let t = params.range[1]; t >= params.range[0]; t -= 0.05) {
      const tpr = 1 - normCdf(t, params.mu1, params.sd1);
      const fpr = 1 - normCdf(t, params.mu0, params.sd0);
      const x = pad + fpr * (W - 2*pad);
      const y = H - pad - tpr * (H - 2*pad);
      pts.push([x,y, tpr, fpr, t]);
      path += (path ? ' L ' : 'M ') + x.toFixed(1) + ' ' + y.toFixed(1);
    }
    return { W, H, pad, path, pts };
  }
  const roc = buildRoc();

  function buildDist(cut) {
    const W = 460, H = 200, pad = 30;
    const [xmin, xmax] = params.range;
    const xToPx = x => pad + ((x - xmin) / (xmax - xmin)) * (W - 2*pad);
    // amostragem
    let p0 = '', p1 = '';
    const step = (xmax - xmin) / 120;
    const ymax = Math.max(normPdf(params.mu0, params.mu0, params.sd0), normPdf(params.mu1, params.mu1, params.sd1)) * 1.1;
    const yToPx = y => H - pad - (y / ymax) * (H - 2*pad);
    for (let x = xmin; x <= xmax; x += step) {
      const y0 = normPdf(x, params.mu0, params.sd0);
      const y1 = normPdf(x, params.mu1, params.sd1);
      const px = xToPx(x), py0 = yToPx(y0), py1 = yToPx(y1);
      p0 += (p0 ? ' L ' : 'M ') + px.toFixed(1) + ' ' + py0.toFixed(1);
      p1 += (p1 ? ' L ' : 'M ') + px.toFixed(1) + ' ' + py1.toFixed(1);
    }
    const cutX = xToPx(cut);
    // Fechar paths como áreas
    const baseY = H - pad;
    const p0Area = p0 + ` L ${xToPx(xmax).toFixed(1)} ${baseY} L ${xToPx(xmin).toFixed(1)} ${baseY} Z`;
    const p1Area = p1 + ` L ${xToPx(xmax).toFixed(1)} ${baseY} L ${xToPx(xmin).toFixed(1)} ${baseY} Z`;

    // ticks
    let ticks = '';
    for (let x = Math.ceil(xmin); x <= Math.floor(xmax); x++) {
      const px = xToPx(x);
      ticks += `<line x1="${px}" y1="${baseY}" x2="${px}" y2="${baseY+4}" stroke="currentColor" stroke-width="1" opacity=".5"/>`;
      ticks += `<text x="${px}" y="${baseY+16}" font-size="10" fill="currentColor" text-anchor="middle" opacity=".7">${x}</text>`;
    }

    return `
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Distribuições sãos × doentes com ponto de corte">
      <defs>
        <linearGradient id="g0-${id}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--c-green)" stop-opacity=".35"/>
          <stop offset="100%" stop-color="var(--c-green)" stop-opacity=".05"/>
        </linearGradient>
        <linearGradient id="g1-${id}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--c-red)" stop-opacity=".35"/>
          <stop offset="100%" stop-color="var(--c-red)" stop-opacity=".05"/>
        </linearGradient>
      </defs>
      <line x1="${pad}" y1="${baseY}" x2="${W-pad}" y2="${baseY}" stroke="currentColor" stroke-width="1" opacity=".4"/>
      ${ticks}
      <path d="${p0Area}" fill="url(#g0-${id})" stroke="var(--c-green)" stroke-width="1.5"/>
      <path d="${p1Area}" fill="url(#g1-${id})" stroke="var(--c-red)" stroke-width="1.5"/>
      <line x1="${cutX}" y1="${pad}" x2="${cutX}" y2="${baseY}" stroke="var(--c-orange)" stroke-width="2" stroke-dasharray="4 4"/>
      <text x="${cutX}" y="${pad-6}" fill="var(--c-orange)" font-size="11" font-weight="800" text-anchor="middle">corte = ${cut.toFixed(2)}</text>
      <text x="${xToPx(params.mu0)}" y="${pad+8}" fill="var(--c-green)" font-size="11" font-weight="700" text-anchor="middle">sãos</text>
      <text x="${xToPx(params.mu1)}" y="${pad+8}" fill="var(--c-red)"   font-size="11" font-weight="700" text-anchor="middle">doentes</text>
      <text x="${W/2}" y="${H-4}" fill="currentColor" font-size="11" text-anchor="middle" opacity=".7">${esc(params.label)}</text>
    </svg>`;
  }

  function buildRocSvg(cut) {
    const { W, H, pad, path, pts } = roc;
    // ponto atual
    const tprNow = 1 - normCdf(cut, params.mu1, params.sd1);
    const fprNow = 1 - normCdf(cut, params.mu0, params.sd0);
    const cx = pad + fprNow * (W - 2*pad);
    const cy = H - pad - tprNow * (H - 2*pad);

    // ticks
    let ticks = '';
    for (let v = 0; v <= 1; v += 0.25) {
      const x = pad + v*(W-2*pad);
      const y = H - pad - v*(H-2*pad);
      ticks += `<text x="${x}" y="${H-pad+14}" font-size="9" fill="currentColor" text-anchor="middle" opacity=".6">${v}</text>`;
      ticks += `<text x="${pad-6}" y="${y+3}" font-size="9" fill="currentColor" text-anchor="end" opacity=".6">${v}</text>`;
      ticks += `<line x1="${x}" y1="${H-pad}" x2="${x}" y2="${H-pad+3}" stroke="currentColor" opacity=".4"/>`;
      ticks += `<line x1="${pad-3}" y1="${y}" x2="${pad}" y2="${y}" stroke="currentColor" opacity=".4"/>`;
    }
    return `
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Curva ROC">
      <rect x="${pad}" y="${pad}" width="${W-2*pad}" height="${H-2*pad}" fill="none" stroke="currentColor" opacity=".25"/>
      ${ticks}
      <line x1="${pad}" y1="${H-pad}" x2="${W-pad}" y2="${pad}" stroke="currentColor" stroke-dasharray="3 3" opacity=".35"/>
      <path d="${path}" fill="none" stroke="var(--c-violet)" stroke-width="2.5"/>
      <circle cx="${cx}" cy="${cy}" r="6" fill="var(--c-orange)" stroke="#fff" stroke-width="2"/>
      <text x="${W/2}" y="${H-8}" font-size="10" text-anchor="middle" fill="currentColor" opacity=".7">1 − Especificidade (FPR)</text>
      <text transform="translate(12 ${H/2}) rotate(-90)" font-size="10" text-anchor="middle" fill="currentColor" opacity=".7">Sensibilidade (TPR)</text>
    </svg>`;
  }

  function update() {
    const cut = parseFloat(cutInp.value);
    const sens = 1 - normCdf(cut, params.mu1, params.sd1);
    const esp  = normCdf(cut, params.mu0, params.sd0);
    const fpr  = 1 - esp;
    cutv.textContent = cut.toFixed(2) + ' ' + (params.label.split(' ')[1] || '');
    sensEl.textContent = (sens*100).toFixed(1) + '%';
    espEl.textContent  = (esp*100).toFixed(1) + '%';
    fprEl.textContent  = (fpr*100).toFixed(1) + '%';
    aucEl.textContent  = auc.toFixed(3);
    cutInp.style.setProperty('--fill', (((cut - params.range[0])/(params.range[1]-params.range[0]))*100) + '%');

    distContainer.innerHTML = buildDist(cut);
    rocContainer.innerHTML = buildRocSvg(cut);

    let n;
    if (sens > 0.95 && esp < 0.5) n = `Corte muito permissivo: <strong>quase todos os doentes detectados</strong>, mas muitos sãos chamados de "positivos" (FP).`;
    else if (esp > 0.95 && sens < 0.6) n = `Corte muito rígido: <strong>poucos falsos positivos</strong>, mas muitos doentes escapam (FN).`;
    else n = `Corte equilibrado. AUC do teste = <strong>${auc.toFixed(3)}</strong> (independente do corte).`;
    narrEl.innerHTML = n;
  }
  cutInp.addEventListener('input', update);
  update();
};

/* ─────────────────────────────────────────
   6. CASOS CLÍNICOS PROGRESSIVOS
   Render: pergunta + opções + feedback explicativo
───────────────────────────────────────── */
PrevInt.casoClinico = function(opts) {
  const { tag = 'Caso clínico', title, scenario, question, options, correctIndex, explain, tip } = opts;
  const id = uid('cc');
  const optsHtml = options.map((o,i) => `<button type="button" data-i="${i}">${esc(o)}</button>`).join('');
  setTimeout(() => {
    const root = document.getElementById(id);
    if (!root) return;
    const fb = root.querySelector('.case-feedback');
    root.querySelectorAll('button[data-i]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (root.dataset.answered) return;
        root.dataset.answered = '1';
        const i = parseInt(btn.dataset.i);
        root.querySelectorAll('button[data-i]').forEach((b,bi) => {
          b.disabled = true;
          if (bi === correctIndex) b.classList.add('right');
          else if (bi === i) b.classList.add('wrong');
        });
        fb.classList.add('show', i === correctIndex ? '--g' : '--r');
        fb.innerHTML = `<strong>${i === correctIndex ? '✓ Correto.' : '✕ Incorreto.'}</strong> ${explain}${tip ? `<br><em style="font-size:13px; opacity:.85; display:inline-block; margin-top:6px;">💡 ${tip}</em>` : ''}`;
      });
    });
  }, 0);
  return `
  <div class="case-card" id="${id}">
    <span class="case-tag">🩺 ${esc(tag)}</span>
    ${title ? `<h4>${esc(title)}</h4>` : ''}
    <div style="font-size:15px; line-height:1.65; color: var(--text-secondary);">${scenario}</div>
    <div class="case-q">${esc(question)}</div>
    <div class="case-options">${optsHtml}</div>
    <div class="case-feedback"></div>
  </div>`;
};

/* ─────────────────────────────────────────
   7. FLASHCARDS (revisão ativa)
───────────────────────────────────────── */
PrevInt.flashdeck = function(cards) {
  const items = cards.map(c => {
    const id = uid('fc');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('click', () => el.classList.toggle('flipped'));
      el.addEventListener('keypress', e => { if (e.key === 'Enter' || e.key === ' ') el.classList.toggle('flipped'); });
    }, 0);
    return `<div class="flashcard" id="${id}" tabindex="0" role="button" aria-label="Flashcard: ${esc(c.q)}">
      <div class="flashcard-inner">
        <div class="flashcard-face front">${esc(c.q)}</div>
        <div class="flashcard-face back">${esc(c.a)}</div>
      </div></div>`;
  }).join('');
  return `<div class="flashdeck">${items}</div>`;
};

/* ─────────────────────────────────────────
   8. QUIZ DE BANCA (para fechamentos)
───────────────────────────────────────── */
PrevInt.quizBanca = function(questions, title = 'Como a banca cobra') {
  const id = uid('qb');
  setTimeout(() => {
    const root = document.getElementById(id);
    if (!root) return;
    questions.forEach((q, qi) => {
      const card = root.querySelector(`[data-qi="${qi}"]`);
      const fb = card.querySelector('.quiz-feedback');
      card.querySelectorAll('.quiz-option').forEach((btn, oi) => {
        btn.addEventListener('click', () => {
          if (card.dataset.answered) return;
          card.dataset.answered = '1';
          card.querySelectorAll('.quiz-option').forEach((b, bi) => {
            b.disabled = true;
            if (bi === q.correct) b.classList.add('correct');
            else if (bi === oi) b.classList.add('wrong');
          });
          fb.classList.add('show', oi === q.correct ? 'correct-feedback' : 'wrong-feedback');
          fb.innerHTML = `<div class="fb-title">${oi === q.correct ? '✅ Correto!' : '❌ Incorreto'}</div><div>${q.explanation}</div>${q.tip ? `<div style="margin-top:6px; opacity:.8; font-style:italic; font-size:13px">💡 ${q.tip}</div>` : ''}`;
        });
      });
    });
  }, 0);

  return `
  <div class="quiz-section" id="${id}">
    <div class="quiz-header">
      <span style="font-size:1.5rem">🎯</span>
      <h3>${esc(title)}</h3>
      <span class="quiz-tag --banca-prev">USP-RP · ENARE · Revalida</span>
    </div>
    ${questions.map((q, qi) => `
      <div class="quiz-card" data-qi="${qi}">
        <div class="quiz-number">Questão ${qi+1}</div>
        <div class="quiz-stem">${q.stem}</div>
        <div class="quiz-options">
          ${q.options.map((o, oi) => `
            <button class="quiz-option">
              <span class="opt-letter">${String.fromCharCode(65+oi)})</span>
              <span>${esc(o)}</span>
            </button>`).join('')}
        </div>
        <div class="quiz-feedback"></div>
      </div>
    `).join('')}
  </div>`;
};
