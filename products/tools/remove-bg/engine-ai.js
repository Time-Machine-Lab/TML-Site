/* engine-ai.js — AI 自动抠图引擎 (ProcessEngine, mode: oneshot)
 * 使用 @imgly/background-removal (WASM + WebGL) 纯浏览器端推理。
 * 模型懒加载：仅在用户点击"开始处理"时才触发下载，并缓存到 Cache API。
 */
(function () {
  'use strict';

  /* @imgly/background-removal v1.7.0 — ESM via jsDelivr */
  var ESM_CDN = 'https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.7.0/+esm';
  var _lib = null;          /* 已加载的 removeBackground 函数 */
  var _loading = false;
  var _controlsEl = null;
  var _onProgressCb = null;
  var _destroyed = false;

  /* ── 动态加载 ESM 模块 ── */
  function loadLib() {
    if (_lib) return Promise.resolve(_lib);
    if (_loading) {
      return new Promise(function (resolve, reject) {
        var check = setInterval(function () {
          if (_lib) { clearInterval(check); resolve(_lib); }
          if (_destroyed) { clearInterval(check); reject(new Error('destroyed')); }
        }, 100);
      });
    }
    _loading = true;
    return import(ESM_CDN).then(function (mod) {
      /* 默认导出即 removeBackground 函数 */
      var fn = mod.default || mod.removeBackground;
      if (typeof fn !== 'function') throw new Error('AI 库加载失败：未找到 removeBackground 函数');
      _lib = fn;
      _loading = false;
      return _lib;
    }).catch(function (err) {
      _loading = false;
      throw new Error('无法加载 AI 推理库，请检查网络后重试（' + (err.message || err) + '）');
    });
  }

  /* ── HTMLImageElement → Blob（通过 Canvas，避免 ObjectURL 已撤销的问题） ── */
  function imgToBlob(imgEl) {
    return new Promise(function (resolve, reject) {
      try {
        var canvas = document.createElement('canvas');
        canvas.width  = imgEl.naturalWidth;
        canvas.height = imgEl.naturalHeight;
        canvas.getContext('2d').drawImage(imgEl, 0, 0);
        canvas.toBlob(function (blob) {
          blob ? resolve(blob) : reject(new Error('图片数据转换失败'));
        }, 'image/png');
      } catch (e) {
        reject(e);
      }
    });
  }

  /* ── 更新控制面板状态文字 ── */
  function setStatus(text, isError) {
    if (!_controlsEl) return;
    var el = _controlsEl.querySelector('#rb-ai-status');
    if (!el) return;
    el.textContent = text;
    el.className = 'rb-ai-status' + (isError ? ' rb-ai-status--error' : '');
  }

  /* ── ProcessEngine 接口实现 ── */
  var AIEngine = {
    id: 'ai',
    name: 'AI 自动抠图',
    icon: '✨',
    description: '智能识别主体，适合人像、商品图，首次使用需下载模型约 15MB',
    mode: 'oneshot',

    init: function (controlsEl, onResult, imgEl) {
      _controlsEl = controlsEl;
      _destroyed = false;
      _controlsEl.innerHTML = [
        '<div class="rb-ctrl-row">',
          '<p id="rb-ai-status" class="rb-ai-status">点击「开始处理」启动 AI 推理</p>',
        '</div>',
        '<div class="rb-ctrl-row">',
          '<div id="rb-ai-progress-wrap" class="rb-progress-wrap" style="display:none">',
            '<div id="rb-ai-progress-bar" class="rb-progress-bar"></div>',
          '</div>',
          '<p id="rb-ai-progress-text" class="rb-ctrl-hint" style="display:none"></p>',
        '</div>',
        '<ul class="rb-ai-tips">',
          '<li>首次使用约需下载 15MB 模型，之后秒级加载</li>',
          '<li>图片不会上传至任何服务器，全程本地处理</li>',
        '</ul>',
      ].join('');
    },

    process: function (imgEl) {
      if (_destroyed) return Promise.reject(new Error('destroyed'));
      var self = this;

      setStatus('正在加载 AI 推理库…');
      showProgress(0);

      return loadLib().then(function (lib) {
        if (_destroyed) throw new Error('destroyed');
        setStatus('AI 推理中，请稍候…');

        var config = {
          output: { format: 'image/png', quality: 1 },
          /* publicPath 省略 → 默认使用 IMG.LY 官方 CDN 下载模型/WASM */
          progress: function (key, current, total) {
            if (_destroyed) return;
            var ratio = total > 0 ? current / total : 0;
            showProgress(ratio);
            var pct = Math.round(ratio * 100);
            if (key === 'fetch:model' || key.indexOf('fetch') === 0) {
              showProgressText('正在下载模型 ' + pct + '%（约 15MB，仅首次）');
            } else {
              showProgressText('推理中 ' + pct + '%');
            }
            if (_onProgressCb) _onProgressCb(ratio);
          }
        };

        /* 先将 imgEl 转为 Blob，避免 ObjectURL 已撤销的问题 */
        return imgToBlob(imgEl).then(function (blob) {
          if (_destroyed) throw new Error('destroyed');
          /* lib 即 removeBackground 函数本身 */
          return lib(blob, config);
        });
      }).then(function (blob) {
        if (_destroyed) throw new Error('destroyed');
        setStatus('处理完成 ✓');
        hideProgress();
        return blob;
      }).catch(function (err) {
        if (_destroyed) return;
        hideProgress();
        setStatus(err.message || '处理失败，请重试', true);
        throw err;
      });
    },

    destroy: function () {
      _destroyed = true;
      _onProgressCb = null;
      if (_controlsEl) _controlsEl.innerHTML = '';
      _controlsEl = null;
    }
  };

  /* ── 进度条辅助 ── */
  function showProgress(ratio) {
    if (!_controlsEl) return;
    var wrap = _controlsEl.querySelector('#rb-ai-progress-wrap');
    var bar  = _controlsEl.querySelector('#rb-ai-progress-bar');
    if (!wrap || !bar) return;
    wrap.style.display = '';
    bar.style.width = Math.round(ratio * 100) + '%';
  }

  function hideProgress() {
    if (!_controlsEl) return;
    var wrap = _controlsEl.querySelector('#rb-ai-progress-wrap');
    var text = _controlsEl.querySelector('#rb-ai-progress-text');
    if (wrap) wrap.style.display = 'none';
    if (text) text.style.display = 'none';
  }

  function showProgressText(msg) {
    if (!_controlsEl) return;
    var text = _controlsEl.querySelector('#rb-ai-progress-text');
    if (!text) return;
    text.style.display = '';
    text.textContent = msg;
  }

  /* ── 注册到全局注册表 ── */
  window.RBEngines = window.RBEngines || [];
  window.RBEngines.push(AIEngine);

}());
