(function (root) {
  'use strict';
  function calculateLayout(images, options) {
    var direction = options.direction;
    var size = options.size;
    var gap = options.gap;
    var padding = options.padding;
    if (!['vertical', 'horizontal'].includes(direction) ||
        !Number.isInteger(size) || size < 100 || size > 6000 ||
        !Number.isInteger(gap) || gap < 0 || gap > 200 ||
        !Number.isInteger(padding) || padding < 0 || padding > 200) {
      throw new Error('请输入有效设置：统一尺寸 100–6000 px，间距和边距 0–200 px，均为整数。');
    }
    if (!Array.isArray(images) || !images.length || images.some(function (img) {
      return !Number.isFinite(img.width) || !Number.isFinite(img.height) || img.width <= 0 || img.height <= 0;
    })) throw new Error('请先添加可读取的图片。');

    var vertical = direction === 'vertical';
    var cursor = padding;
    var placements = images.map(function (img) {
      var width = vertical ? size : Math.max(1, Math.round(img.width * size / img.height));
      var height = vertical ? Math.max(1, Math.round(img.height * size / img.width)) : size;
      var placement = { x: vertical ? padding : cursor, y: vertical ? cursor : padding, width: width, height: height };
      cursor += (vertical ? height : width) + gap;
      return placement;
    });
    var length = cursor - gap + padding;
    var width = vertical ? size + padding * 2 : length;
    var height = vertical ? length : size + padding * 2;
    if (Math.max(width, height) > 16384) throw new Error('拼接尺寸超过 16384 px，请减小统一尺寸或减少图片。');
    if (width * height > 32000000) throw new Error('拼接结果超过 3200 万像素，请减小统一尺寸或减少图片。');
    return { width: width, height: height, placements: placements };
  }
  if (typeof module === 'object' && module.exports) module.exports = { calculateLayout: calculateLayout };
  else root.ImageStitchLayout = { calculateLayout: calculateLayout };
})(typeof window === 'object' ? window : globalThis);
