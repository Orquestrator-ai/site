/* aula-11.js — componentes e motor touch/teclado da Aula 11. */
(function () {
  'use strict';
  var NS = 'go-a11-';
  function save(key, value) { try { localStorage.setItem(NS + key, JSON.stringify(value)); } catch (_) {} }
  function load(key) { try { var raw = localStorage.getItem(NS + key); return raw === null ? null : JSON.parse(raw); } catch (_) { return null; } }

  document.querySelectorAll('svg.a11-inline-svg').forEach(function (root) {
    var controls = Array.prototype.slice.call(root.querySelectorAll('[role="button"]'));
    if (!controls.length) return;
    if (!root.hasAttribute('data-active-target')) root.setAttribute('data-active-target', 'none');
    function ensureTouchTarget(control) {
      var previous = control.querySelector('.a11-hit-area');
      if (previous) previous.remove();
      var matrix = control.getScreenCTM();
      if (!matrix) return;
      var scaleX = Math.hypot(matrix.a, matrix.b);
      var scaleY = Math.hypot(matrix.c, matrix.d);
      if (!scaleX || !scaleY) return;
      var box = control.getBBox();
      var minWidth = 25 / scaleX;
      var minHeight = 25 / scaleY;
      if (box.width >= minWidth && box.height >= minHeight) return;
      var width = Math.max(box.width, minWidth);
      var height = Math.max(box.height, minHeight);
      var hit = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      hit.setAttribute('class', 'a11-hit-area');
      hit.setAttribute('x', String(box.x - (width - box.width) / 2));
      hit.setAttribute('y', String(box.y - (height - box.height) / 2));
      hit.setAttribute('width', String(width));
      hit.setAttribute('height', String(height));
      hit.setAttribute('fill', '#000000');
      hit.setAttribute('fill-opacity', '0.001');
      hit.setAttribute('pointer-events', 'all');
      hit.setAttribute('aria-hidden', 'true');
      hit.setAttribute('focusable', 'false');
      control.insertBefore(hit, control.firstChild);
    }
    function sizeTouchTargets() {
      controls.forEach(ensureTouchTarget);
    }
    sizeTouchTargets();
    if ('ResizeObserver' in window) {
      new ResizeObserver(sizeTouchTargets).observe(root);
    }
    function idFor(control, index) {
      return control.getAttribute('data-target') || control.getAttribute('data-id') ||
        control.getAttribute('data-target-chain') || control.id || ('territorio-' + index);
    }
    function setActive(control, index) {
      var id = idFor(control, index);
      var next = root.getAttribute('data-active-target') === id ? 'none' : id;
      root.setAttribute('data-active-target', next);
      controls.forEach(function (node, nodeIndex) {
        var active = next !== 'none' && idFor(node, nodeIndex) === next;
        node.classList.toggle('is-a11-active', active);
        node.setAttribute('aria-pressed', String(active));
      });
    }
    controls.forEach(function (control, index) {
      control.addEventListener('click', function (event) {
        event.stopPropagation();
        setActive(control, index);
      });
      control.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          event.stopPropagation();
          setActive(control, index);
        }
      });
    });
  });

  document.querySelectorAll('[data-a11-timeline]').forEach(function (box) {
    var buttons = Array.prototype.slice.call(box.querySelectorAll('.a11-timeline button'));
    var output = box.querySelector('.a11-live');
    if (!buttons.length || !output) return;
    var base = output.textContent;
    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        buttons.forEach(function (node) { node.classList.toggle('is-active', node === button); });
        output.textContent = button.getAttribute('data-note') || base;
      });
    });
  });

  document.querySelectorAll('[data-a11-sequence]').forEach(function (box) {
    var steps = Array.prototype.slice.call(box.querySelectorAll('[data-step]'));
    var branches = box.querySelector('[data-branches]');
    var status = box.querySelector('[data-sequence-status]');
    var reset = box.querySelector('[data-reset]');
    var KEY = 'sequence-p4';
    function apply(count) {
      steps.forEach(function (step, index) {
        step.classList.toggle('is-active', index < count);
        step.setAttribute('aria-pressed', String(index < count));
      });
      if (branches) branches.hidden = count < steps.length;
      if (status) status.textContent = count >= steps.length ?
        'Leia o resultado: corou confirma origem vesical; molhou sem corar aponta provavelmente para o ureter.' :
        'Passo ' + (count + 1) + ' de ' + steps.length + '.';
      save(KEY, count);
    }
    steps.forEach(function (step, index) {
      step.addEventListener('click', function () { apply(index + 1); });
    });
    if (reset) reset.addEventListener('click', function () { apply(0); });
    var previous = load(KEY);
    apply(typeof previous === 'number' ? Math.max(0, Math.min(previous, steps.length)) : 0);
  });

  document.querySelectorAll('[data-a11-zoomable]').forEach(function (figure) {
    var button = figure.querySelector('.a11-zoom');
    if (!button) return;
    button.addEventListener('click', function () {
      var expanded = figure.classList.toggle('is-expanded');
      button.setAttribute('aria-expanded', String(expanded));
      button.textContent = expanded ? 'Reduzir algoritmo' : 'Ampliar algoritmo';
    });
  });
})();
