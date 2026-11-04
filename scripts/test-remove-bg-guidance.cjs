const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function setupShell() {
  function element() {
    const attrs = {}, classes = new Set();
    return {
      style: {}, hidden: true, handlers: {}, children: [],
      classList: { add: n => classes.add(n), remove: n => classes.delete(n),
        toggle(n, on) { if (on) classes.add(n); else classes.delete(n); } },
      addEventListener(n, fn) { this.handlers[n] = fn; },
      setAttribute(n, v) { attrs[n] = v; }, getAttribute: n => attrs[n],
      appendChild(e) { this.children.push(e); },
      querySelectorAll() { return this.children; },
      querySelector() { return {focus() {}}; }
    };
  }
  const elements = new Map();
  const get = id => { if (!elements.has(id)) elements.set(id, element()); return elements.get(id); };
  const engines = ['ai', 'color'].map(id => ({id, mode:id === 'ai' ? 'oneshot' : 'realtime',
    init() {}, destroy() {}, process: () => Promise.resolve(null)}));
  const html = fs.readFileSync('products/tools/remove-bg/index.html', 'utf8');
  const script = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].at(-1)[1];
  vm.runInNewContext(script, {
    window: {RBEngines: engines}, document: {getElementById:get, createElement:element, addEventListener() {}},
    URL: {createObjectURL: () => 'blob:test', revokeObjectURL() {}},
    setTimeout: () => 1, clearTimeout() {}
  });
  return { get, upload() {
    const input = get('rb-file-input'); input.files = [{type:'image/png', size:10}];
    input.handlers.change(); get('rb-source-img').onload();
  }, switchTo(id) {
    get('rb-engine-tabs').children.find(e => e.getAttribute('data-engine-id') === id).handlers.click();
  }};
}

test('guidance appears only after processing and resets for a newly uploaded image', async () => {
  const s = setupShell(); s.upload();
  const hint = s.get('rb-color-nudge');
  assert.equal(hint.hidden, true, 'hidden on first upload');
  s.switchTo('color'); s.switchTo('ai');
  assert.equal(hint.hidden, true, 'switching modes does not count as processing');
  s.get('rb-process-btn').handlers.click();
  assert.equal(hint.hidden, false, 'shown after clicking process');
  await Promise.resolve();
  s.switchTo('color'); assert.equal(hint.hidden, true);
  s.switchTo('ai'); assert.equal(hint.hidden, false);
  s.get('rb-reupload-btn').handlers.click();
  assert.equal(hint.hidden, true, 'reset when returning to upload');
  s.upload(); assert.equal(hint.hidden, true, 'new image starts with guidance hidden');
});
