/* router.js — hash routing SPA (portado fiel do template antibioticoterapia)
   Hash: #/p1 … #/p12. Mantém histórico do navegador funcional. */

export class HashRouter {
  constructor({ pages, onChange }) {
    this.pages = pages;
    this.onChange = onChange;
    this.current = null;
    window.addEventListener('hashchange', () => this.resolve());
  }
  init() {
    if (!location.hash || !this.isValid(this.hashToId(location.hash))) {
      this.go(this.pages[0], { replace: true });
      this.resolve();
    } else {
      this.resolve();
    }
    // CORE-FIX nav: carga inicial e location.replace NÃO disparam 'hashchange',
    // então listeners de estado (botões prev/next via updateNavStates) ficavam presos
    // no estado de current=null (next "disabled"). Re-sincroniza uma vez agora que
    // this.current já está resolvido. Recursion-safe: resolve() é no-op (target===current)
    // e não redispara o evento.
    window.dispatchEvent(new Event('hashchange'));
  }
  hashToId(hash) { return (hash || '').replace(/^#\/?/, '').toLowerCase() || this.pages[0]; }
  isValid(id) { return this.pages.includes(id); }
  resolve() {
    const id = this.hashToId(location.hash);
    const target = this.isValid(id) ? id : this.pages[0];
    if (target !== this.current) { this.current = target; this.onChange(target); }
  }
  go(id, { replace = false } = {}) {
    if (!this.isValid(id)) return;
    const hash = `#/${id}`;
    if (replace) location.replace(hash); else location.hash = hash;
  }
  next() { const i = this.pages.indexOf(this.current); if (i >= 0 && i < this.pages.length - 1) this.go(this.pages[i + 1]); }
  prev() { const i = this.pages.indexOf(this.current); if (i > 0) this.go(this.pages[i - 1]); }
  hasNext() { const i = this.pages.indexOf(this.current); return i >= 0 && i < this.pages.length - 1; }
  hasPrev() { const i = this.pages.indexOf(this.current); return i > 0; }
}
