
// --- Data Configuration ---
const SCENES = [
    {
        id: 's1', name: 'iPhone Handheld',
        src: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1200',
        device: 'iphone',
        config: { radius: 170, opacity: 0.1, bright: 100 }
    },
    {
        id: 's2', name: 'Dark Desk',
        src: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1200',
        device: 'mac',
        config: { radius: 12, opacity: 0.1 }
    },
    {
        id: 's3', name: 'iPad Pro',
        src: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=1200',
        device: 'ipad',
        config: { radius: 35, opacity: 0.1 }
    }
];

const PRESETS = {
    mac:    { w: 1600, h: 1000, r: 12 },
    iphone: { w: 1179, h: 2556, r: 170 },
    ipad:   { w: 2048, h: 2732, r: 35 }
};

// --- State Management ---
const state = {
    mode: 'wallpaper', // 'wallpaper' | 'scene'
    curScene: 0,
    curWpIndex: 0,
    wallpapers: [], // Will be populated from gallery
    imgW: 0, imgH: 0,
    autoPlayTimer: null,
    autoPlayInterval: 5000 // 5秒轮播
};

const els = {
    modal: document.getElementById("preview-modal"),
    base: document.getElementById('baseImg'),
    warp: document.getElementById('warpLayer'),
    screen: document.getElementById('screen'),
    wp: document.getElementById('wallpaper'),
    rail: document.getElementById('thumbsRail'),
    bg: document.getElementById('ambientBg'),
    switchBg: document.getElementById('switchBg'),
    os: document.getElementById('osUI')
};

// --- Core Logic ---

window.previewApp = {
    setMode: (mode) => {
        state.mode = mode;
        const opts = document.querySelectorAll('.switch-opt');
        opts.forEach(el => el.classList.remove('active'));
        if(mode === 'wallpaper') {
            opts[0].classList.add('active');
            if(els.switchBg) els.switchBg.style.transform = 'translateX(0)';
        } else {
            opts[1].classList.add('active');
            if(els.switchBg) els.switchBg.style.transform = 'translateX(100%)';
        }
        renderThumbs();
    }
};

const openModal = (src, title, artist) => {
    if (!els.modal) return;
    
    // Populate wallpapers from gallery if empty
    if (state.wallpapers.length === 0) {
        const images = document.querySelectorAll('.gallery-card img');
        state.wallpapers = Array.from(images).map(img => img.src);
    }
    
    // Find index of clicked image
    const idx = state.wallpapers.indexOf(src);
    state.curWpIndex = idx !== -1 ? idx : 0;
    
    els.modal.classList.remove("is-hidden");
    document.body.classList.add("no-scroll");
    
    // Initialize Scene
    loadScene(state.curScene);
    
    // Force re-render of thumbs
    window.previewApp.setMode('wallpaper');
    
    startAutoPlay();
};

const closeModal = () => {
    if (!els.modal) return;
    els.modal.classList.add("is-hidden");
    document.body.classList.remove("no-scroll");
    stopAutoPlay();
};

function startAutoPlay() {
    stopAutoPlay();
    state.autoPlayTimer = setInterval(() => {
        if(state.mode === 'scene') {
            let next = state.curScene + 1;
            if(next >= SCENES.length) next = 0;
            state.curScene = next;
            loadScene(next);
            renderThumbs();
        } else {
            // Optional: Auto rotate wallpapers too? User asked for "scene graph transformed"
            // If user meant "Scene" as in "Device Scene", we rotate scenes.
            // If user meant "Wallpaper" (the content), we rotate wallpapers.
            // Let's rotate whatever mode is active to show off.
             let next = state.curWpIndex + 1;
            if(next >= state.wallpapers.length) next = 0;
            state.curWpIndex = next;
            updateWallpaper();
            renderThumbs();
        }
    }, state.autoPlayInterval);
}

function stopAutoPlay() {
    if(state.autoPlayTimer) clearInterval(state.autoPlayTimer);
}

function renderThumbs() {
    if(!els.rail) return;
    els.rail.innerHTML = '';
    const items = state.mode === 'wallpaper' ? state.wallpapers : SCENES;
    
    items.forEach((item, i) => {
        const isActive = state.mode === 'wallpaper' ? (i === state.curWpIndex) : (i === state.curScene);
        const url = state.mode === 'wallpaper' ? item : item.src;
        
        const thumb = document.createElement('div');
        thumb.className = `thumb ${isActive ? 'active' : ''}`;
        thumb.style.backgroundImage = `url(${url})`;
        thumb.onclick = () => {
            handleThumbClick(i);
            // Reset timer on manual interaction
            startAutoPlay();
        };
        
        // Staggered animation
        thumb.style.animation = `fadeIn 0.4s ease backwards ${i * 0.05}s`;
        
        // Add progress bar for active item
        if(isActive) {
            const bar = document.createElement('div');
            bar.className = 'progress-bar';
            // Trigger reflow to restart animation
            requestAnimationFrame(() => {
                bar.style.width = '100%';
            });
            thumb.appendChild(bar);
        }
        
        els.rail.appendChild(thumb);
    });
}

function handleThumbClick(i) {
    if(state.mode === 'wallpaper') {
        state.curWpIndex = i;
        updateWallpaper();
    } else {
        state.curScene = i;
        loadScene(i);
    }
    renderThumbs();
}

function updateWallpaper() {
    const url = state.wallpapers[state.curWpIndex];
    if(els.wp) els.wp.style.backgroundImage = `url(${url})`;
    if(els.bg) els.bg.style.backgroundImage = `url(${url})`;
}

function loadScene(index) {
    const s = SCENES[index];
    if(els.base) {
        els.base.src = s.src;
        els.base.onload = () => {
            fitImageCover(); // Calculate cover dimensions
            renderOS();
        };
    }
    
    // Update Screen Dimensions
    const preset = PRESETS[s.device];
    if(els.screen) {
        els.screen.style.width = preset.w + 'px';
        els.screen.style.height = preset.h + 'px';
        els.screen.style.borderRadius = preset.r + 'px';
        const fxBorder = document.getElementById('fxBorder');
        if(fxBorder) fxBorder.style.borderRadius = preset.r + 'px';
    }
    
    updateWallpaper();
}

// Calculate dimensions to simulate object-fit: cover and update Homography
function fitImageCover() {
    if(!els.base || !SCENES[state.curScene]) return;
    
    const winW = window.innerWidth;
    const winH = window.innerHeight;
    const imgNW = els.base.naturalWidth || 1000;
    const imgNH = els.base.naturalHeight || 1000;
    
    const winRatio = winW / winH;
    const imgRatio = imgNW / imgNH;
    
    let renderW, renderH;
    
    if (winRatio > imgRatio) {
        // Window is wider than image -> Fit Width
        renderW = winW;
        renderH = winW / imgRatio;
    } else {
        // Window is taller than image -> Fit Height
        renderH = winH;
        renderW = winH * imgRatio;
    }
    
    // Set size to wrapper
    const wrapper = document.getElementById('sceneWrapper');
    if(wrapper) {
        wrapper.style.width = `${renderW}px`;
        wrapper.style.height = `${renderH}px`;
    }
    
    state.imgW = renderW;
    state.imgH = renderH;
    
    autoFitAnchors();
}

function autoFitAnchors() {
    if(!SCENES[state.curScene]) return;
    const d = PRESETS[SCENES[state.curScene].device];
    
    // Coordinates relative to the RENDERED image size
    const cx = state.imgW / 2;
    const cy = state.imgH / 2;
    
    // Assume screen takes 45% of image width (SCALED)
    let w = state.imgW * 0.45;
    let h = w * (d.h / d.w);
    
    // Simple perspective simulation
    const p = [
        {x: cx - w/2, y: cy - h/2},
        {x: cx + w/2, y: cy - h/2},
        {x: cx + w/2, y: cy + h/2},
        {x: cx - w/2, y: cy + h/2}
    ];
    
    const m = solveHomography(d.w, d.h, p);
    if(els.warp) els.warp.style.transform = `matrix3d(${m})`;
}

// Re-calculate on resize
window.addEventListener('resize', () => {
    if(!els.modal.classList.contains('is-hidden')) {
        fitImageCover();
    }
});

function renderOS() {
    // Simplified OS UI placeholder
    if(els.os) els.os.innerHTML = ''; 
}

// Matrix Math
function solveHomography(w,h,p){const s=[0,0,w,0,w,h,0,h],d=[p[0].x,p[0].y,p[1].x,p[1].y,p[2].x,p[2].y,p[3].x,p[3].y],A=[],b=[];for(let i=0;i<4;i++){let sx=s[i*2],sy=s[i*2+1],dx=d[i*2],dy=d[i*2+1];A.push([sx,sy,1,0,0,0,-sx*dx,-sy*dx]);b.push(dx);A.push([0,0,0,sx,sy,1,-sx*dy,-sy*dy]);b.push(dy);}let n=8;for(let i=0;i<n;i++){let m=i;for(let j=i+1;j<n;j++)if(Math.abs(A[j][i])>Math.abs(A[m][i]))m=j;[A[i],A[m]]=[A[m],A[i]];[b[i],b[m]]=[b[m],b[i]];for(let j=i+1;j<n;j++){let c=-A[j][i]/A[i][i];for(let k=i;k<n;k++)A[j][k]+=c*A[i][k];b[j]+=c*b[i];}}let x=[];for(let i=n-1;i>=0;i--){let t=0;for(let j=i+1;j<n;j++)t+=A[i][j]*x[j];x[i]=(b[i]-t)/A[i][i];}return [x[0],x[3],0,x[6],x[1],x[4],0,x[7],0,0,1,0,x[2],x[5],0,1].join(',');}

const initPreview = () => {
  // Re-bind elements in case DOM loaded late
  els.modal = document.getElementById("preview-modal");
  els.base = document.getElementById('baseImg');
  els.warp = document.getElementById('warpLayer');
  els.screen = document.getElementById('screen');
  els.wp = document.getElementById('wallpaper');
  els.rail = document.getElementById('thumbsRail');
  els.bg = document.getElementById('ambientBg');
  els.switchBg = document.getElementById('switchBg');
  els.os = document.getElementById('osUI');

  const cards = document.querySelectorAll(".gallery-card");
  cards.forEach((card) => {
    card.addEventListener("click", (event) => {
      event.preventDefault();
      const img = card.querySelector("img");
      const title = card.dataset.title || img?.alt;
      const artist = card.dataset.artist;
      openModal(img?.src || "", title, artist);
    });
  });

  document.querySelectorAll("[data-close='modal']").forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
};

// Init on load
document.addEventListener('DOMContentLoaded', initPreview);
