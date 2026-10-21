const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const source = path.join(__dirname, '../products/tools/image-stitch/layout.js');

test('image stitching layout is available', () => {
  assert.ok(fs.existsSync(source), 'The image stitching layout has not been implemented');
});

// Geometry is tested independently of the DOM so export and preview share verified dimensions.
if (fs.existsSync(source)) {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(source, 'utf8'), context);
  const calculateLayout = (...args) => JSON.parse(JSON.stringify(context.window.ImageStitchLayout.calculateLayout(...args)));
  const images = [{ width: 400, height: 200 }, { width: 100, height: 300 }];
  test('vertical stitching preserves proportions and includes spacing and margins', () => {
    const result = calculateLayout(images, { direction: 'vertical', size: 200, gap: 10, padding: 20 });
    assert.equal(result.width, 240);
    assert.equal(result.height, 750);
    assert.deepEqual(result.placements, [
      { x: 20, y: 20, width: 200, height: 100 },
      { x: 20, y: 130, width: 200, height: 600 }
    ]);
  });
  test('horizontal stitching uses a common height and follows the supplied order', () => {
    const result = calculateLayout([...images].reverse(), { direction: 'horizontal', size: 300, gap: 8, padding: 0 });
    assert.equal(result.width, 708);
    assert.equal(result.height, 300);
    assert.deepEqual(result.placements, [
      { x: 0, y: 0, width: 100, height: 300 },
      { x: 108, y: 0, width: 600, height: 300 }
    ]);
  });
  test('rounds image dimensions to positive whole pixels', () => {
    const result = calculateLayout([{ width: 6000, height: 1 }], { direction: 'vertical', size: 100, gap: 0, padding: 0 });
    assert.equal(result.height, 1);
  });
  test('rejects invalid settings and empty or malformed images', () => {
    const valid = { direction: 'vertical', size: 200, gap: 0, padding: 0 };
    for (const opts of [{ size: NaN }, { size: 0 }, { size: 200.5 }, { gap: -1 }, { gap: 201 }, { padding: Infinity }, { direction: 'diagonal' }]) {
      assert.throws(() => calculateLayout(images, { ...valid, ...opts }));
    }
    for (const input of [[], [{ width: 0, height: 10 }], [{ width: 20, height: Infinity }]]) {
      assert.throws(() => calculateLayout(input, valid));
    }
  });
  test('rejects oversized exports by both canvas side and total pixel area', () => {
    const opts = { direction: 'vertical', size: 6000, gap: 0, padding: 0 };
    assert.throws(() => calculateLayout([{ width: 1, height: 10 }], opts), /尺寸/);
    assert.throws(() => calculateLayout([{ width: 1, height: 1 }], opts), /像素/);
  });
}
