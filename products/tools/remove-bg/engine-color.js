/* engine-color.js — 颜色抠图引擎 (ProcessEngine, mode: realtime)
 * 使用 HSL 色彩距离对背景色像素执行 alpha 置零，实时预览。
 */
(function () {
  'use strict';

  /* ── 工具函数：RGB → HSL ── */
  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        default: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return [h * 360, s * 100, l * 100];
  }

  /* ── 工具函数：Hex → RGB ── */
  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16)
    ];
  }

  /* ── 工具函数：HSL 色彩距离（加权） ── */
  function hslDistance(h1, s1, l1, h2, s2, l2) {
    var dh = Math.min(Math.abs(h1 - h2), 360 - Math.abs(h1 - h2)) / 180;
    var ds = Math.abs(s1 - s2) / 100;
    var dl = Math.abs(l1 - l2) / 100;
    return Math.sqrt(dh * dh * 2 + ds * ds + dl * dl * 2);
  }

  /* ── 引擎状态 ── */
  var _controlsEl = null;
  var _onResult = null;
  var _imgEl = null;       /* 原图：用于 Canvas 像素处理 */
  var _pickEl = null;      /* 可见元素：用于点击取色事件 */
  var _color = '#ffffff';
  var _tolerance = 30;
  var _smooth = 1;
  var _offscreenCanvas = null;
  var _pickClickHandler = null;
  var _pendingFilter = null;
  var _preview = null, _sample = null, _sampleSrc = null;
  var _moveHandler = null, _leaveHandler = null, _loadHandler = null;
  var _frame = null, _point = null, _enabled = true;

  function clearPreview() {
    if (_frame !== null) cancelAnimationFrame(_frame);
    _frame = null;
    _point = null;
    if (_preview) _preview.hidden = true;
  }

  /* Same distance and feathering for preview and exported pixels. */
  function removalAmount(r, g, b, base) {
    var hsl = rgbToHsl(r, g, b);
    var dist = hslDistance(hsl[0], hsl[1], hsl[2], base[0], base[1], base[2]);
    var tolerance = _tolerance / 100 * 1.2;
    if (dist < tolerance) return 1;
    var edge = _smooth / 100 * 0.3;
    return edge > 0 ? Math.max(0, 1 - (dist - tolerance) / edge) : 0;
  }

  function previewAtPoint() {
    _frame = null;
    if (!_enabled || !_point || !_imgEl || !_imgEl.complete || !_imgEl.naturalWidth) return;
    var rect = _pickEl.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    var src = _imgEl.currentSrc || _imgEl.src;
    if (!_sample || _sampleSrc !== src) {
      var scale = Math.min(1, 640 / Math.max(_imgEl.naturalWidth, _imgEl.naturalHeight));
      var canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(_imgEl.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(_imgEl.naturalHeight * scale));
      var ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(_imgEl, 0, 0, canvas.width, canvas.height);
      _sample = ctx.getImageData(0, 0, canvas.width, canvas.height);
      _sampleSrc = src;
    }
    var x = Math.max(0, Math.min(_sample.width - 1, Math.floor((_point.clientX - rect.left) / rect.width * _sample.width)));
    var y = Math.max(0, Math.min(_sample.height - 1, Math.floor((_point.clientY - rect.top) / rect.height * _sample.height)));
    var data = _sample.data, idx = (y * _sample.width + x) * 4;
    if (data[idx + 3] < 10) { clearPreview(); return; }
    var base = rgbToHsl(data[idx], data[idx + 1], data[idx + 2]);
    _preview.width = _sample.width; _preview.height = _sample.height;
    var pctx = _preview.getContext('2d');
    var mask = pctx.createImageData(_sample.width, _sample.height);
    for (var i = 0; i < data.length; i += 4) {
      mask.data[i] = 244; mask.data[i + 1] = 114; mask.data[i + 2] = 182;
      mask.data[i + 3] = Math.round(removalAmount(data[i], data[i + 1], data[i + 2], base) * data[i + 3] * 0.58);
    }
    pctx.putImageData(mask, 0, 0);
    var parent = _pickEl.parentElement.getBoundingClientRect();
    _preview.style.left = (rect.left - parent.left) + 'px';
    _preview.style.top = (rect.top - parent.top) + 'px';
    _preview.style.width = rect.width + 'px'; _preview.style.height = rect.height + 'px';
    _preview.hidden = false;
  }

  /* ── 渲染控制面板 ── */
  function renderControls() {
    _controlsEl.innerHTML = [
      '<div class="rb-ctrl-row">',
        '<label class="rb-ctrl-label">背景颜色</label>',
        '<div class="rb-color-row">',
          '<input type="color" id="rb-color-picker" value="' + _color + '" class="rb-color-input">',
        '</div>',
      '</div>',
      '<div class="rb-ctrl-row">',
        '<label class="rb-ctrl-label">容差 <span id="rb-tol-val">' + _tolerance + '</span></label>',
        '<input type="range" id="rb-tolerance" min="1" max="100" value="' + _tolerance + '" class="rb-slider">',
      '</div>',
      '<div class="rb-ctrl-row">',
        '<label class="rb-ctrl-label">边缘平滑 <span id="rb-sm-val">' + _smooth + '</span>px</label>',
        '<input type="range" id="rb-smooth" min="0" max="8" value="' + _smooth + '" class="rb-slider">',
      '</div>',
      '<div class="rb-color-guide"><strong>先预览，再去色</strong><p>鼠标移到背景上，查看将去除的颜色；满意后点击确认。</p><span><i></i> 淡粉色 = 将变透明的区域</span></div>',
      '<p class="rb-ctrl-hint">作用于整张图中的相近颜色。触屏设备可直接点击取色，可随时撤销。</p>',
    ].join('');

    /* 绑定颜色选择器：仅更新参数，不触发过滤 */
    _controlsEl.querySelector('#rb-color-picker').addEventListener('input', function (e) {
      _color = e.target.value;
    });

    /* 绑定容差滑块：仅更新参数，不触发过滤 */
    var tolSlider = _controlsEl.querySelector('#rb-tolerance');
    tolSlider.addEventListener('input', function (e) {
      _tolerance = parseInt(e.target.value, 10);
      _controlsEl.querySelector('#rb-tol-val').textContent = _tolerance;
      if (_point) previewAtPoint();
    });

    /* 绑定平滑滑块：仅更新参数，不触发过滤 */
    var smSlider = _controlsEl.querySelector('#rb-smooth');
    smSlider.addEventListener('input', function (e) {
      _smooth = parseInt(e.target.value, 10);
      _controlsEl.querySelector('#rb-sm-val').textContent = _smooth;
      if (_point) previewAtPoint();
    });

  }

  /* ── 从图片取色（点击即执行）── */
  function pickColor(e) {
    clearPreview();
    if (!_enabled || !_imgEl || !_imgEl.complete || !_imgEl.naturalWidth) { if (_onResult) _onResult(null); return; }

    var rect = (_pickEl || _imgEl).getBoundingClientRect();
    var sx = (e.clientX - rect.left) / rect.width;
    var sy = (e.clientY - rect.top) / rect.height;

    var tmp = document.createElement('canvas');
    tmp.width = _imgEl.naturalWidth;
    tmp.height = _imgEl.naturalHeight;
    var tctx = tmp.getContext('2d');
    tctx.drawImage(_imgEl, 0, 0);

    var px = Math.round(sx * _imgEl.naturalWidth);
    var py = Math.round(sy * _imgEl.naturalHeight);
    px = Math.max(0, Math.min(tmp.width - 1, px));
    py = Math.max(0, Math.min(tmp.height - 1, py));
    var d = tctx.getImageData(px, py, 1, 1).data;

    /* 点击在已透明区域则忽略（避免取到无效黑色）*/
    if (d[3] < 10) { if (_onResult) _onResult(null); return; }

    _color = '#' + [d[0], d[1], d[2]].map(function (v) {
      return ('0' + v.toString(16)).slice(-2);
    }).join('');

    var picker = _controlsEl.querySelector('#rb-color-picker');
    if (picker) picker.value = _color;
    /* 异步执行，让浏览器先渲染加载动画 */
    if (_pendingFilter) clearTimeout(_pendingFilter);
    _pendingFilter = setTimeout(runFilter, 0);
  }

  /* ── 核心像素过滤逻辑 ── */
  function runFilter() {
    if (!_imgEl) {
      if (_onResult) _onResult(null);
      return;
    }

    var w = _imgEl.naturalWidth;
    var h = _imgEl.naturalHeight;
    if (!w || !h) {
      if (_onResult) _onResult(null);
      return;
    }

    if (!_offscreenCanvas) {
      _offscreenCanvas = document.createElement('canvas');
    }
    _offscreenCanvas.width = w;
    _offscreenCanvas.height = h;
    var ctx = _offscreenCanvas.getContext('2d');
    ctx.drawImage(_imgEl, 0, 0);

    var imageData = ctx.getImageData(0, 0, w, h);
    var data = imageData.data;
    var rgb = hexToRgb(_color);
    var baseHsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);

    for (var i = 0; i < data.length; i += 4) {
      var amount = removalAmount(data[i], data[i + 1], data[i + 2], baseHsl);
      data[i + 3] = Math.round(data[i + 3] * (1 - amount));
    }

    ctx.putImageData(imageData, 0, 0);
    var callback = _onResult;
    _offscreenCanvas.toBlob(function (blob) {
      /* blob 为 null 表示失败，仍须通知 shell 隐藏 spinner */
      if (_onResult === callback && callback) callback(blob);
    }, 'image/png');
  }

  /* ── ProcessEngine 接口实现 ── */
  var ColorEngine = {
    id: 'color',
    name: '颜色抠图',
    icon: '🎨',
    description: '适合纯色背景（白底、绿幕），实时预览',
    mode: 'realtime',

    init: function (controlsEl, onResult, imgEl, pickTargetEl) {
      _controlsEl = controlsEl;
      _onResult = onResult;
      _imgEl = imgEl || null;               /* 原图，供 Canvas 处理 */
      _pickEl = pickTargetEl || imgEl;      /* 吸管点击目标（可见元素）*/
      _offscreenCanvas = null;
      _enabled = true;
      renderControls();

      /* 注册点击取色事件，并设置十字光标 */
      if (_pickEl) {
        _preview = document.createElement('canvas');
        _preview.className = 'rb-color-preview';
        _preview.setAttribute('aria-hidden', 'true');
        _preview.hidden = true;
        _pickEl.parentElement.appendChild(_preview);
        _moveHandler = function (e) {
          if (e.pointerType === 'touch' || !_enabled) return;
          _point = { clientX: e.clientX, clientY: e.clientY };
          if (_frame === null) _frame = requestAnimationFrame(previewAtPoint);
        };
        _leaveHandler = clearPreview;
        _loadHandler = function () { _sample = null; clearPreview(); };
        _pickEl.addEventListener('pointermove', _moveHandler);
        _pickEl.addEventListener('pointerleave', _leaveHandler);
        _imgEl.addEventListener('load', _loadHandler);
        _pickClickHandler = function (e) { pickColor(e); };
        _pickEl.addEventListener('click', _pickClickHandler);
        _pickEl.style.cursor = 'crosshair';
      }
      /* 不自动执行过滤，等待用户点击图片取色后再处理 */
    },

    clearPreview: clearPreview,
    setPreviewEnabled: function (enabled) { _enabled = enabled; clearPreview(); },

    process: function (imgEl) {
      /* realtime 模式下 Shell 不调用此方法，仅作兜底 */
      _imgEl = imgEl;
      return new Promise(function (resolve, reject) {
        try { runFilter(); resolve(null); } catch (e) { reject(e); }
      });
    },

    destroy: function () {
      clearPreview();
      if (_preview) _preview.remove();
      _preview = null; _sample = null; _sampleSrc = null;
      if (_pickEl) {
        _pickEl.removeEventListener('pointermove', _moveHandler);
        _pickEl.removeEventListener('pointerleave', _leaveHandler);
      }
      if (_imgEl) _imgEl.removeEventListener('load', _loadHandler);
      if (_pickEl && _pickClickHandler) {
        _pickEl.removeEventListener('click', _pickClickHandler);
      }
      if (_pickEl) _pickEl.style.cursor = '';
      clearTimeout(_pendingFilter);
      _pendingFilter = null;
      _pickClickHandler = null;
      _imgEl = null;
      _pickEl = null;
      _onResult = null;
      _offscreenCanvas = null;
      if (_controlsEl) _controlsEl.innerHTML = '';
      _controlsEl = null;
    }
  };

  /* ── 注册到全局注册表 ── */
  window.RBEngines = window.RBEngines || [];
  window.RBEngines.push(ColorEngine);

}());
