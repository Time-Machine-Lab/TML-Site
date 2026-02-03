(() => {
  const sceneId = 'home_01';
  const stage = document.getElementById('homeSceneStage');
  const frame = document.getElementById('homeSceneFrame');
  const baseImg = document.getElementById('homeSceneBase');
  const warp = document.getElementById('homeSceneWarp');
  const screen = document.getElementById('homeSceneScreen');
  const wallpaper = document.getElementById('homeSceneWallpaper');
  const border = document.getElementById('homeSceneBorder');
  const ui = document.getElementById('homeSceneUI');
  const titleEl = document.getElementById('homeSceneTitle');
  const nowPlayingEl = document.getElementById('homeSceneNowPlaying');
  const ambientFront = document.querySelector('.scene-hero-ambient-layer.is-front');
  const ambientBack = document.querySelector('.scene-hero-ambient-layer.is-back');

  if (!stage || !baseImg || !warp || !screen || !wallpaper) return;

  const PRESETS = {
    mac: { w: 1600, h: 1000, r: 12 },
    iphone: { w: 1179, h: 2556, r: 170 },
    ipad: { w: 2048, h: 2732, r: 35 }
  };

  const state = {
    scene: null,
    wallpapers: [],
    index: 0,
    timer: null,
    renderW: 0,
    renderH: 0,
    isActive: true
  };

  const solveHomography = (w, h, p) => {
    const s = [0, 0, w, 0, w, h, 0, h];
    const d = [p[0].x, p[0].y, p[1].x, p[1].y, p[2].x, p[2].y, p[3].x, p[3].y];
    const A = [];
    const b = [];
    for (let i = 0; i < 4; i++) {
      const sx = s[i * 2];
      const sy = s[i * 2 + 1];
      const dx = d[i * 2];
      const dy = d[i * 2 + 1];
      A.push([sx, sy, 1, 0, 0, 0, -sx * dx, -sy * dx]);
      b.push(dx);
      A.push([0, 0, 0, sx, sy, 1, -sx * dy, -sy * dy]);
      b.push(dy);
    }
    const n = 8;
    for (let i = 0; i < n; i++) {
      let m = i;
      for (let j = i + 1; j < n; j++) {
        if (Math.abs(A[j][i]) > Math.abs(A[m][i])) m = j;
      }
      [A[i], A[m]] = [A[m], A[i]];
      [b[i], b[m]] = [b[m], b[i]];
      for (let j = i + 1; j < n; j++) {
        const c = -A[j][i] / A[i][i];
        for (let k = i; k < n; k++) A[j][k] += c * A[i][k];
        b[j] += c * b[i];
      }
    }
    const x = [];
    for (let i = n - 1; i >= 0; i--) {
      let t = 0;
      for (let j = i + 1; j < n; j++) t += A[i][j] * x[j];
      x[i] = (b[i] - t) / A[i][i];
    }
    return [x[0], x[3], 0, x[6], x[1], x[4], 0, x[7], 0, 0, 1, 0, x[2], x[5], 0, 1].join(',');
  };

  const renderUI = () => {
    if (!ui) return;
    const icons = {
      flash:
        "<svg viewBox=\"0 0 24 24\"><path d=\"M12 2C11.17 2 10.5 2.67 10.5 3.5V10H9.5C8.12 10 7 11.12 7 12.5V20.5C7 21.33 7.67 22 8.5 22H15.5C16.33 22 17 21.33 17 20.5V12.5C17 11.12 15.88 10 14.5 10H13.5V3.5C13.5 2.67 12.83 2 12 2ZM12 4C12.28 4 12.5 4.22 12.5 4.5V9H11.5V4.5C11.5 4.22 11.72 4 12 4Z\" fill=\"currentColor\"/></svg>",
      cam:
        "<svg viewBox=\"0 0 24 24\"><path d=\"M12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7ZM12 15.5C10.07 15.5 8.5 13.93 8.5 12C8.5 10.07 10.07 8.5 12 8.5C13.93 8.5 15.5 10.07 15.5 12C15.5 13.93 13.93 15.5 12 15.5ZM20 6H16.83L15.41 4.59C15.03 4.21 14.52 4 14 4H10C9.48 4 8.97 4.21 8.59 4.59L7.17 6H4C2.9 6 2 6.9 2 8V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6ZM20 18H4V8H7.59L9 6.59H15L16.41 8H20V18Z\" fill=\"currentColor\"/></svg>",
      sig:
        "<svg viewBox=\"0 0 26 16\" width=\"58\" height=\"38\"><path d=\"M3 11.5C3 11.22 3.22 11 3.5 11H5.5C5.78 11 6 11.22 6 11.5V15.5C6 15.78 5.78 16 5.5 16H3.5C3.22 16 3 15.78 3 15.5V11.5ZM9 7.5C9 7.22 9.22 7 9.5 7H11.5C11.78 7 12 7.22 12 7.5V15.5C12 15.78 11.78 16 11.5 16H9.5C9.22 16 9 15.78 9 15.5V7.5ZM15 3.5C15 3.22 15.22 3 15.5 3H17.5C17.78 3 18 3.22 18 3.5V15.5C18 15.78 17.78 16 17.5 16H15.5C15.22 16 15 15.78 15 15.5V3.5ZM21 0.5C21 0.22 21.22 0 21.5 0H23.5C23.78 0 24 0.22 24 0.5V15.5C24 15.78 23.78 16 23.5 16H21.5C21.22 16 21 15.78 21 15.5V0.5Z\" fill=\"currentColor\"/></svg>",
      bat:
        "<svg viewBox=\"0 0 30 14\" width=\"72\" height=\"34\"><rect x=\"0\" y=\"0\" width=\"26\" height=\"14\" rx=\"4.5\" ry=\"4.5\" fill=\"currentColor\" opacity=\"0.35\"/><rect x=\"2\" y=\"2\" width=\"22\" height=\"10\" rx=\"2.5\" ry=\"2.5\" fill=\"currentColor\"/><path d=\"M27 5.5C27 4.67 27.67 4 28.5 4H29C29.55 4 30 4.45 30 5V9C30 9.55 29.55 10 29 10H28.5C27.67 10 27 9.33 27 8.5V5.5Z\" fill=\"currentColor\" opacity=\"0.4\"/></svg>",
      bell:
        "<svg viewBox=\"0 0 24 24\" width=\"36\" height=\"36\"><path d=\"M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z\" fill=\"currentColor\"/></svg>",
      loc:
        "<svg viewBox=\"0 0 24 24\" width=\"32\" height=\"32\"><path d=\"M11.1 2.7L3.45 19.34C3.17 19.95 3.79 20.57 4.4 20.29L12 16.92L19.6 20.29C20.21 20.57 20.83 19.95 20.55 19.34L12.9 2.7C12.63 2.13 11.37 2.13 11.1 2.7Z\" fill=\"currentColor\"/></svg>",
      bt:
        "<svg viewBox=\"0 0 24 24\"><path d=\"M17.71 7.71L12 2H11V9.58L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L11 14.41V22H12L17.71 16.29L13.41 12L17.71 7.71ZM13 5.83L14.88 7.71L13 9.58V5.83ZM13 18.17V14.41L14.88 16.29L13 18.17Z\" fill=\"currentColor\"/></svg>",
      chat:
        "<svg viewBox=\"0 0 24 24\"><path d=\"M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H6V22.5C6 22.88 6.43 23.11 6.74 22.88L10.5 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z\" fill=\"currentColor\"/></svg>",
      scan:
        "<svg viewBox=\"0 0 24 24\"><path d=\"M4 8V5C4 4.45 4.45 4 5 4H8V2H5C3.34 2 2 3.34 2 5V8H4ZM4 16V19C4 19.55 4.45 20 5 20H8V22H5C3.34 22 2 20.66 2 19V16H4ZM20 16V19C20 20.66 18.66 22 17 22H14V20H17C17.55 20 18 19.55 18 19V16H20ZM20 8V5C20 3.34 18.66 2 17 2H14V4H17C17.55 4 18 4.45 18 5V8H20ZM7 11H9V13H7V11ZM11 11H13V13H11V11ZM15 11H17V13H15V11ZM7 7H11V11H7V7ZM13 7H17V11H13V7ZM7 13H11V17H7V13ZM13 13H17V17H13V13Z\" fill=\"currentColor\"/></svg>",
      user:
        "<svg viewBox=\"0 0 24 24\"><path d=\"M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z\" fill=\"currentColor\"/></svg>"
    };

    ui.innerHTML = `
      <div class="iphone-ui">
        <div class="iphone-status-left">中国联通 ${icons.bell} ${icons.loc}</div>
        <div class="iphone-status-right">${icons.sig} <span>5G</span> ${icons.bat}</div>
        <div class="island"></div>
        <div class="iphone-center">
          <div class="iphone-date" id="homeSceneDate"></div>
          <div class="iphone-time" id="homeSceneTime"></div>
          <div class="iphone-widgets">
            <div class="iphone-widget-circle">${icons.bt}</div>
            <div class="iphone-widget-circle">${icons.chat}</div>
            <div class="iphone-widget-circle">${icons.scan}</div>
            <div class="iphone-widget-circle">${icons.user}</div>
          </div>
        </div>
        <div class="iphone-bottom">
          <div class="icon-btn-os">${icons.flash}</div>
          <div class="icon-btn-os">${icons.cam}</div>
        </div>
        <div class="home-bar"></div>
      </div>
    `;
    updateTime();
  };

  const updateTime = () => {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const t = `${h}<span class="time-colon">:</span>${m}`;
    const d = `${now.getMonth() + 1}月${now.getDate()}日`;
    const timeEl = document.getElementById('homeSceneTime');
    const dateEl = document.getElementById('homeSceneDate');
    if (timeEl) timeEl.innerHTML = t;
    if (dateEl) dateEl.textContent = d;
  };

  const fitImageCover = () => {
    if (!state.scene || !baseImg) return;
    const box = stage.getBoundingClientRect();
    const imgW = baseImg.naturalWidth || 1000;
    const imgH = baseImg.naturalHeight || 1000;
    const boxRatio = box.width / box.height;
    const imgRatio = imgW / imgH;

    let renderW;
    let renderH;

    if (boxRatio > imgRatio) {
      renderW = box.width;
      renderH = box.width / imgRatio;
    } else {
      renderH = box.height;
      renderW = box.height * imgRatio;
    }

    if (frame) {
      frame.style.width = `${renderW}px`;
      frame.style.height = `${renderH}px`;
    }

    state.renderW = renderW;
    state.renderH = renderH;
    applyWarp();
  };

  const applyWarp = () => {
    const scene = state.scene;
    if (!scene || !scene.anchors || !warp || !screen) return;
    const preset = PRESETS[scene.device] || PRESETS.iphone;

    const config = scene.config || {};
    const screenW = config.w || preset.w;
    const screenH = config.h || preset.h;
    const radius = config.r || config.radius || preset.r;

    screen.style.width = `${screenW}px`;
    screen.style.height = `${screenH}px`;
    screen.style.borderRadius = `${radius}px`;
    if (border) border.style.borderRadius = `${radius}px`;

    const p = scene.anchors.map((a) => ({
      x: a.x * state.renderW,
      y: a.y * state.renderH
    }));

    const m = solveHomography(screenW, screenH, p);
    warp.style.transform = `matrix3d(${m})`;
  };

  const setWallpaper = (item) => {
    if (!item) return;
    const url = item.src;
    wallpaper.style.backgroundImage = `url(${url})`;
    if (ambientFront) ambientFront.style.setProperty('--scene-hero-image', `url(\"${url}\")`);
    if (ambientBack) ambientBack.style.setProperty('--scene-hero-image', `url(\"${url}\")`);
    if (nowPlayingEl) nowPlayingEl.textContent = `Now playing · ${item.title || 'Wallpaper'} — ${item.artist || 'Artist'}`;
  };

  const startAutoplay = () => {
    stopAutoplay();
    state.timer = setInterval(() => {
      if (!state.isActive || state.wallpapers.length === 0) return;
      state.index = (state.index + 1) % state.wallpapers.length;
      setWallpaper(state.wallpapers[state.index]);
    }, 4500);
  };

  const stopAutoplay = () => {
    if (state.timer) clearInterval(state.timer);
  };

  const loadScene = async () => {
    try {
      const res = await fetch(`/scenes/${sceneId}/config.json`);
      if (!res.ok) throw new Error('Failed to load scene config');
      const data = await res.json();
      const deviceType = (data.device || 'iphone').toLowerCase();
      state.scene = {
        id: sceneId,
        device: deviceType,
        scene: data.scene || 'base.jpg',
        anchors: data.anchors || [],
        config: data.config || {}
      };
      baseImg.src = `/scenes/${sceneId}/${state.scene.scene}`;
      if (titleEl) titleEl.textContent = sceneId.toUpperCase();
      baseImg.onload = () => {
        fitImageCover();
        renderUI();
      };
    } catch (e) {
      console.error(e);
    }
  };

  const loadWallpapers = async () => {
    try {
      const res = await fetch('/data/gallery.json');
      if (!res.ok) throw new Error('Failed to load gallery');
      const data = await res.json();
      if (Array.isArray(data)) {
        state.wallpapers = data.map((item) => ({
          src: item.src,
          title: item.title || item.infoTitle,
          artist: item.artist || item.infoArtist
        }));
      }
    } catch (e) {
      console.error(e);
    }

    if (state.wallpapers.length > 0) {
      state.index = 0;
      setWallpaper(state.wallpapers[0]);
      startAutoplay();
    }
  };

  const initVisibility = () => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        state.isActive = entry.isIntersecting;
        if (!state.isActive) stopAutoplay();
        else startAutoplay();
      },
      { threshold: 0.2 }
    );
    observer.observe(stage);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopAutoplay();
      else startAutoplay();
    });
  };

  window.addEventListener('resize', () => {
    if (baseImg.complete) fitImageCover();
  });

  setInterval(updateTime, 60000);

  loadScene();
  loadWallpapers();
  initVisibility();
})();
