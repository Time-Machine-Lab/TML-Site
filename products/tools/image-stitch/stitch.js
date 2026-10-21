(function () {
  'use strict';
  var byId = function (id) { return document.getElementById(id); };
  var input = byId('file-input');
  var list = byId('image-list');
  var preview = byId('preview');
  var download = byId('download');
  var addButton = byId('add-images');
  var clearButton = byId('clear-images');
  var dropZone = byId('drop-zone');
  var sizeInput = byId('output-size');
  var gapInput = byId('gap');
  var paddingInput = byId('padding');
  var background = byId('background');
  var transparent = byId('transparent');
  var format = byId('format');
  var images = [];
  var layout = null;
  var importing = false;
  var exporting = false;
  var draggedId = null;
  var nextId = 0;
  var revision = 0;
  var importPixels = 0;

  function message(text) { byId('message').textContent = text; }
  function syncButtons() {
    input.disabled = importing;
    addButton.disabled = importing;
    clearButton.disabled = importing || !images.length;
    download.disabled = importing || exporting || images.length < 2 || !layout;
    list.querySelectorAll('button').forEach(function (button) {
      var index = images.findIndex(function (item) { return item.id === Number(button.dataset.id); });
      button.disabled = importing || (button.dataset.action === 'up' && index === 0) ||
        (button.dataset.action === 'down' && index === images.length - 1);
    });
  }

  function renderList() {
    list.replaceChildren();
    images.forEach(function (item, index) {
      var row = document.createElement('li');
      row.className = 'st-item';
      row.draggable = true;
      row.dataset.id = item.id;
      var thumb = document.createElement('img');
      thumb.className = 'st-thumb';
      thumb.src = item.url;
      thumb.alt = '';
      var info = document.createElement('div');
      info.className = 'st-item-info';
      var name = document.createElement('span');
      name.className = 'st-item-name';
      name.textContent = (index + 1) + '. ' + item.name;
      name.title = item.name;
      var meta = document.createElement('span');
      meta.className = 'st-item-meta';
      meta.textContent = item.width + ' × ' + item.height + ' px';
      info.append(name, meta);
      var actions = document.createElement('div');
      actions.className = 'st-item-actions';
      [['up', '↑', '前移'], ['down', '↓', '后移'], ['remove', '移除', '移除']].forEach(function (action) {
        var button = document.createElement('button');
        button.type = 'button';
        button.textContent = action[1];
        button.dataset.action = action[0];
        button.dataset.id = item.id;
        button.setAttribute('aria-label', action[2] + '第 ' + (index + 1) + ' 张图片：' + item.name);
        actions.appendChild(button);
      });
      row.append(thumb, info, actions);
      list.appendChild(row);
    });
    byId('image-count').textContent = images.length + ' 张';
    byId('list-empty').hidden = images.length > 0;
    syncButtons();
  }

  function options() {
    return {
      direction: document.querySelector('input[name="direction"]:checked').value,
      size: sizeInput.value === '' ? NaN : Number(sizeInput.value),
      gap: gapInput.value === '' ? NaN : Number(gapInput.value),
      padding: paddingInput.value === '' ? NaN : Number(paddingInput.value)
    };
  }

  function paint(canvas, geometry, scale, mime, useTransparency, color) {
    canvas.width = Math.max(1, Math.round(geometry.width * scale));
    canvas.height = Math.max(1, Math.round(geometry.height * scale));
    var ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('浏览器无法创建画布，请减小尺寸或更换浏览器重试。');
    ctx.scale(canvas.width / geometry.width, canvas.height / geometry.height);
    if (!useTransparency || mime !== 'image/png') {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, geometry.width, geometry.height);
    }
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    geometry.placements.forEach(function (rect, index) {
      ctx.drawImage(images[index].image, rect.x, rect.y, rect.width, rect.height);
    });
  }

  function updatePreview() {
    revision++;
    layout = null;
    var opts = options();
    var axis = opts.direction === 'vertical' ? '宽度' : '高度';
    byId('size-label').textContent = '统一' + axis + '（px）';
    byId('size-axis').textContent = axis;
    transparent.disabled = format.value !== 'image/png';
    background.disabled = transparent.checked && !transparent.disabled;
    byId('format-hint').textContent = format.value === 'image/png' ?
      'PNG 支持透明背景，适合文字截图。' : 'JPG 使用所选背景色填充透明区域，以 92% 质量导出。';
    byId('layout-error').hidden = true;
    byId('output-dimensions').textContent = '—';
    preview.hidden = true;
    byId('preview-empty').hidden = false;
    byId('preview-empty').textContent = '拼接效果会显示在这里';
    byId('preview-size').textContent = '等待添加图片';
    try {
      if (images.length) {
        var geometry = window.ImageStitchLayout.calculateLayout(images, opts);
        // Keep the preview light even when the full export is a long image.
        var scale = Math.min(1, 1800 / Math.max(geometry.width, geometry.height));
        paint(preview, geometry, scale, format.value, transparent.checked, background.value);
        layout = geometry;
        var dimensions = geometry.width + ' × ' + geometry.height + ' px';
        byId('output-dimensions').textContent = dimensions;
        byId('preview-size').textContent = dimensions;
        byId('preview-empty').hidden = true;
        preview.hidden = false;
      } else {
        preview.width = preview.height = 1;
      }
    } catch (err) {
      byId('layout-error').textContent = err.message;
      byId('layout-error').hidden = false;
      byId('preview-size').textContent = '请调整拼接设置';
      byId('preview-empty').textContent = '调整右侧设置后即可恢复预览';
    }
    syncButtons();
  }

  function decodeFile(file) {
    return new Promise(function (resolve, reject) {
      var url = URL.createObjectURL(file);
      var image = new Image();
      var timer = setTimeout(function () { finish(new Error('读取超时')); }, 20000);
      function finish(error) {
        clearTimeout(timer);
        image.onload = image.onerror = null;
        if (error) {
          URL.revokeObjectURL(url);
          image.src = '';
          reject(error);
        } else {
          resolve({ id: ++nextId, name: file.name, url: url, image: image,
            width: image.naturalWidth, height: image.naturalHeight });
        }
      }
      image.onload = function () {
        var pixels = image.naturalWidth * image.naturalHeight;
        if (!pixels || pixels > 40000000 || importPixels + pixels > 80000000) {
          finish(new Error('图片像素过大（单张最多 4000 万，总计最多 8000 万像素）'));
        } else finish();
      };
      image.onerror = function () { finish(new Error('格式不支持或文件已损坏')); };
      image.src = url;
    });
  }

  async function addFiles(files) {
    if (importing) { message('正在读取图片，请稍候再添加。'); return; }
    if (!files.length) return;
    importing = true;
    syncButtons();
    var added = 0;
    var errors = [];
    var batch = Array.from(files);
    try {
      for (var i = 0; i < batch.length; i++) {
        if (images.length >= 30) { errors.push('最多添加 30 张图片，剩余文件已跳过'); break; }
        var file = batch[i];
        message('正在读取 ' + (i + 1) + ' / ' + batch.length + '…');
        if ((file.type && !file.type.startsWith('image/')) || file.size > 25 * 1024 * 1024) {
          errors.push(file.name + '：不是图片或超过 25 MB');
          continue;
        }
        try {
          var item = await decodeFile(file);
          images.push(item);
          importPixels += item.width * item.height;
          added++;
        } catch (err) { errors.push(file.name + '：' + err.message); }
      }
    } finally {
      importing = false;
      input.value = '';
      renderList();
      updatePreview();
      message('已添加 ' + added + ' 张图片。' + (images.length < 2 ? '添加至少两张图片即可导出。' : '可继续添加或调整顺序。') +
        (errors.length ? ' 跳过 ' + errors.length + ' 项：' + errors.slice(0, 3).join('；') : ''));
    }
  }

  function release(item) { URL.revokeObjectURL(item.url); item.image.src = ''; }
  function moveImage(from, to) {
    if (importing || from < 0 || to < 0 || to >= images.length || from === to) return;
    var item = images.splice(from, 1)[0];
    images.splice(to, 0, item);
    renderList();
    updatePreview();
    message('已调整图片顺序。');
  }

  addButton.addEventListener('click', function () { input.click(); });
  input.addEventListener('change', function () { addFiles(input.files); });
  dropZone.addEventListener('dragover', function (event) {
    if (!Array.from(event.dataTransfer.types).includes('Files')) return;
    event.preventDefault();
    dropZone.classList.add('st-drag-over');
  });
  dropZone.addEventListener('dragleave', function (event) {
    if (!dropZone.contains(event.relatedTarget)) dropZone.classList.remove('st-drag-over');
  });
  dropZone.addEventListener('drop', function (event) {
    event.preventDefault();
    dropZone.classList.remove('st-drag-over');
    addFiles(event.dataTransfer.files);
  });
  // Prevent dropping a file outside the upload area from navigating away.
  window.addEventListener('dragover', function (event) {
    if (Array.from(event.dataTransfer.types).includes('Files')) event.preventDefault();
  });
  window.addEventListener('drop', function (event) {
    if (Array.from(event.dataTransfer.types).includes('Files')) event.preventDefault();
  });
  clearButton.addEventListener('click', function () {
    if (importing) return;
    images.forEach(release);
    images = [];
    importPixels = 0;
    renderList();
    updatePreview();
    message('已清空图片。添加至少两张图片即可导出。');
  });
  list.addEventListener('click', function (event) {
    var button = event.target.closest('button[data-action]');
    if (!button || importing) return;
    var index = images.findIndex(function (item) { return item.id === Number(button.dataset.id); });
    if (index < 0) return;
    var action = button.dataset.action;
    if (action === 'remove') {
      importPixels -= images[index].width * images[index].height;
      release(images.splice(index, 1)[0]);
      renderList();
      updatePreview();
      message('已移除图片。' + (images.length < 2 ? '添加至少两张图片即可导出。' : ''));
      var nextButton = list.querySelectorAll('[data-action="remove"]')[Math.min(index, images.length - 1)];
      (nextButton || addButton).focus();
    } else {
      moveImage(index, index + (action === 'up' ? -1 : 1));
      var movedButton = list.querySelector('[data-id="' + button.dataset.id + '"][data-action="' + action + '"]');
      // Keep keyboard focus on the moved card even when its move button reaches a boundary.
      if (movedButton && movedButton.disabled) movedButton = movedButton.parentNode.querySelector('[data-action="remove"]');
      if (movedButton) movedButton.focus();
    }
  });
  list.addEventListener('dragstart', function (event) {
    var row = event.target.closest('.st-item');
    if (!row || importing || event.target.closest('button')) { event.preventDefault(); return; }
    draggedId = Number(row.dataset.id);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', row.dataset.id);
  });
  list.addEventListener('dragover', function (event) {
    var row = event.target.closest('.st-item');
    if (!row || draggedId === null || importing) return;
    event.preventDefault();
    list.querySelectorAll('.st-drop-target').forEach(function (item) { item.classList.remove('st-drop-target'); });
    row.classList.add('st-drop-target');
  });
  list.addEventListener('drop', function (event) {
    var row = event.target.closest('.st-item');
    if (!row || draggedId === null) return;
    event.preventDefault();
    var from = images.findIndex(function (item) { return item.id === draggedId; });
    var to = images.findIndex(function (item) { return item.id === Number(row.dataset.id); });
    moveImage(from, to);
    draggedId = null;
  });
  list.addEventListener('dragend', function () {
    draggedId = null;
    list.querySelectorAll('.st-drop-target').forEach(function (item) { item.classList.remove('st-drop-target'); });
  });
  document.querySelectorAll('input[name="direction"], #format, #transparent').forEach(function (control) {
    control.addEventListener('change', updatePreview);
  });
  [sizeInput, gapInput, paddingInput, background].forEach(function (control) {
    control.addEventListener('input', updatePreview);
  });
  download.addEventListener('click', async function () {
    if (download.disabled || !layout) return;
    exporting = true;
    syncButtons();
    download.textContent = '正在生成图片…';
    message('正在生成完整尺寸的拼接图片…');
    var generation = revision;
    var mime = format.value;
    var canvas = document.createElement('canvas');
    try {
      paint(canvas, layout, 1, mime, transparent.checked, background.value);
      var blob = await new Promise(function (resolve) { canvas.toBlob(resolve, mime, .92); });
      if (generation !== revision) { message('图片或设置已改变，请重新下载最新结果。'); return; }
      if (!blob || blob.type !== mime) throw new Error('无法导出该格式，请减小输出尺寸或选择 PNG 重试。');
      var url = URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = url;
      link.download = 'stitched-' + layout.width + 'x' + layout.height + (mime === 'image/png' ? '.png' : '.jpg');
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 60000);
      message('拼接图片已生成（' + (blob.size / 1024 / 1024).toFixed(2) + ' MB），已开始下载。');
    } catch (err) { message('导出失败：' + err.message); }
    finally {
      canvas.width = canvas.height = 1;
      exporting = false;
      download.textContent = '下载拼接图片';
      syncButtons();
    }
  });
  window.addEventListener('beforeunload', function () { images.forEach(release); });
  renderList();
  updatePreview();
})();
