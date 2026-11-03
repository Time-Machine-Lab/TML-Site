const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');

function setup() {
  const pixels = new Uint8ClampedArray([255,255,255,255, 0,0,0,255, 255,255,255,0]);
  const elements = [];
  function el() {
    const handlers = {};
    const e = { style: {}, handlers, width: 3, height: 1, hidden: false,
      addEventListener: (n,f) => { handlers[n] = f; },
      removeEventListener: n => { delete handlers[n]; },
      getBoundingClientRect: () => ({left:0,top:0,width:300,height:100}),
      remove() { this.removed = true; }, setAttribute() {},
      getContext: () => ({drawImage() {}, clearRect() {},
        getImageData: () => ({ data: pixels.slice(), width:3, height:1 }),
        createImageData: () => ({data: new Uint8ClampedArray(12)}),
        putImageData(d) { e.output = d.data; }}),
      toBlob(f) { f({data:e.output}); }
    };
    elements.push(e); return e;
  }
  const parent = el(); parent.appendChild = e => { e.parentElement = parent; };
  const image = el(); image.naturalWidth = 3; image.naturalHeight = 1; image.src = 'image'; image.complete = true;
  const target = el(); target.parentElement = parent;
  const inputs = {};
  const controls = {querySelector: s => inputs[s] ||= el()};
  let resultCount = 0, frames = new Map(), seq = 0;
  const context = {window:{}, document:{createElement:el}, Uint8ClampedArray,
    requestAnimationFrame:f => {frames.set(++seq,f); return seq;}, cancelAnimationFrame:id => frames.delete(id),
    setTimeout:f => {f();return 1;}, clearTimeout() {}};
  vm.runInNewContext(fs.readFileSync('products/tools/remove-bg/engine-color.js','utf8'),context);
  const engine = context.window.RBEngines[0]; engine.init(controls, () => resultCount++,image,target);
  return {engine,target,image,elements,inputs,results:()=>resultCount,
    move() { target.handlers.pointermove?.({clientX:10,clientY:10,pointerType:'mouse'}); for(const f of frames.values()) f(); frames.clear(); }};
}

test('hover marks removable pixels without committing and clears on leave/destroy', () => {
  const s = setup(); s.move();
  const overlay = s.elements.find(e => e.className === 'rb-color-preview');
  assert.ok(overlay, 'hover preview canvas exists');
  assert.equal(overlay.hidden,false);
  assert.ok(overlay.output[3] > 0, 'white background highlighted');
  assert.equal(overlay.output[7],0, 'black subject untouched');
  assert.equal(overlay.output[11],0, 'transparent pixel untouched');
  assert.equal(s.results(),0, 'hover never commits');
  s.target.handlers.pointerleave(); assert.equal(overlay.hidden,true);
  s.engine.destroy(); assert.equal(overlay.removed,true);
  assert.equal(s.target.handlers.pointermove,undefined);
});

test('click commits removal', () => {
  const s = setup();
  s.target.handlers.click({clientX:10,clientY:10});
  assert.equal(s.results(),1);
});

test('original comparison disables edits, and re-enabling restores hover', () => {
  const s = setup(); s.move();
  const overlay = s.elements.find(e => e.className === 'rb-color-preview');
  s.engine.setPreviewEnabled(false);
  s.move(); assert.equal(overlay.hidden,true);
  s.engine.setPreviewEnabled(true);
  s.move(); assert.equal(overlay.hidden,false);
  s.image.handlers.load(); assert.equal(overlay.hidden,true);
  assert.equal(s.results(),0);
});

test('touch movement does not create a hover mask', () => {
  const s = setup();
  s.target.handlers.pointermove({clientX:10,clientY:10,pointerType:'touch'});
  const overlay = s.elements.find(e => e.className === 'rb-color-preview');
  assert.equal(overlay.hidden,true);
  s.engine.destroy();
});
