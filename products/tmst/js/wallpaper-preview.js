/**
     * =============================================================================
     * CONFIGURATION & DATA
     * =============================================================================
     */

    // 场景列表容器 - 动态加载
    let SCENES = [];
    // Fallback for file:// usage (CORS blocks fetch)
    const INLINE_SCENES_DATA = [
        {
            id: 'scene_04',
            data: {"scene":"base.jpg","title":"Untitled Scene","device":"iphone","anchors":[{"x":0.0836,"y":0.2927},{"x":0.4472,"y":0.1337},{"x":0.9238,"y":0.672},{"x":0.5503,"y":0.843}],"config":{"radius":170,"bezel":50,"opacity":1,"bright":100,"glare":51,"noise":0,"edge":0}}
        },
        {
            id: 'scene_02',
            data: {"scene":"base.jpg","title":"Untitled Scene","device":"iphone","anchors":[{"x":0.2984,"y":0.1282},{"x":0.7,"y":0.1282},{"x":0.7016,"y":0.7605},{"x":0.3,"y":0.7628}],"config":{"radius":170,"bezel":50,"opacity":1,"bright":100,"glare":20,"noise":0,"edge":28}}
        },
        {
            id: 'scene_03',
            data: {"scene":"base.jpg","title":"Untitled Scene","device":"iphone","anchors":[{"x":0.2038,"y":0.3349},{"x":0.5992,"y":0.2822},{"x":0.7508,"y":0.9208},{"x":0.3583,"y":0.977}],"config":{"radius":170,"bezel":44,"opacity":0.9,"bright":100,"glare":20,"noise":0,"edge":12}}
        },
        {
            id: 'scene_01',
            data: {"scene":"base.jpg","title":"Untitled Scene","device":"iphone","anchors":[{"x":0.3766,"y":0.1989},{"x":0.6522,"y":0.2195},{"x":0.5968,"y":0.8161},{"x":0.2809,"y":0.7782}],"config":{"radius":169,"bezel":50,"opacity":1,"bright":100,"glare":44,"noise":0,"edge":18}}
        },
        {
            id: 'scene_05',
            data: {"scene":"base.jpg","title":"Untitled Scene","device":"iphone","anchors":[{"x":0.4435,"y":0.1648},{"x":0.87,"y":0.255},{"x":0.5639,"y":0.8612},{"x":0.1052,"y":0.7571}],"config":{"radius":170,"bezel":50,"opacity":1,"bright":100,"glare":20,"noise":0,"edge":20}}
        },
        {
            id: 'scene_06',
            data: {"scene":"base.jpg","title":"Untitled Scene","device":"iphone","anchors":[{"x":0.4174,"y":0.218},{"x":0.7689,"y":0.3005},{"x":0.4992,"y":0.8405},{"x":0.1205,"y":0.7385}],"config":{"radius":170,"bezel":50,"opacity":1.0,"bright":100,"glare":20,"noise":0,"edge":14}}
        }
    ];

    let WALLPAPERS = [
        '/assets/killian-prevost-caillou-final.jpg',
        '/assets/jacek-pilarski-citadel.webp',
        '/assets/yucong-tang-yucong-tang-2e.webp',
        '/assets/david-arno-schwaiger-david-arno-schwaiger-ldr-spiderrose-cover-2.webp',
        '/assets/sergey-semenovykh-sergey-semenovykh-chainsaw-man-1x1.jpg',
        '/assets/shurazhao-desert-skies-and-rusty-leviathans-2.webp',
        '/assets/geoffroy-thoorens-geoffroy-thoorens-sans-titre.webp',
        '/assets/julian-calle-city-master-class.jpg',
        '/assets/julien-long-forestroot2final.jpg',
        '/assets/thu-berchs-liberty-city-6.jpg',
        '/assets/vladimir-manyukhin-9-2.webp',
        '/assets/yura-kozhevnikov-rank-sprint-v2-wg-spb-wows-3840x2560.jpg',
        '/assets/040e51e28d1dd7aa5f1aec953e79ccc8.jpg',
        '/assets/2025-epic-megajam-register-now-header-2.jpg',
        '/assets/artstation-artblast-edgeoffate-01destiny-eof-890x500-notext.jpg'
    ];

    /**
     * =============================================================================
     * APPLICATION STATE & DOM ELEMENTS
     * =============================================================================
     */

    const state = {
        sceneIndex: 0,
        wallIndex: 0,
        bgFlip: false,
        isScrolling: false,
        viewMode: 'scene',
        currentBgUrl: ''
    };

    const els = {
        sceneTrack: document.getElementById('sceneTrack'),
        wallTrack: document.getElementById('wallTrack'),
        base: document.getElementById('baseImg'),
        warp: document.getElementById('warpLayer'),
        screen: document.getElementById('screen'),
        wp: document.getElementById('wallpaper'),
        wpFlat: document.getElementById('wallpaperFlat'),
        rawImg: document.getElementById('rawImg'),
        pivot: document.getElementById('scenePivot'),
        container: document.getElementById('sceneBox'),
        bg1: document.getElementById('bg1'),
        bg2: document.getElementById('bg2'),
        loader: document.getElementById('loader'),
        switchBtns: document.querySelectorAll('.switch-btn')
    };

    // 解析 URL 参数
    function getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            src: params.get('src'),
            title: params.get('title'),
            artist: params.get('artist')
        };
    }

    // Device Presets for resolution fallback
    const PRESETS = {
        mac:    { w: 1600, h: 1000, r: 12 },
        iphone: { w: 1179, h: 2556, r: 170 },
        ipad:   { w: 2048, h: 2732, r: 35 }
    };

    const normalizeScene = (id, data) => {
        const deviceType = (data.device || 'iphone').toLowerCase();
        const preset = PRESETS[deviceType] || PRESETS.iphone;

        const config = {
            ...preset,
            ...(data.config || {}),
            w: data.config?.w || preset.w,
            h: data.config?.h || preset.h,
            r: data.config?.r || data.config?.radius || preset.r
        };

        return {
            id: id,
            title: data.title || id.replace(/_/g, ' ').toUpperCase(),
            device: data.device || 'Unknown Device',
            src: `/scenes/${id}/base.jpg`,
            anchors: data.anchors,
            config: config
        };
    };

    // Load Scene Data
    async function loadScenes() {
        try {
            if (window.location.protocol === 'file:') {
                SCENES = INLINE_SCENES_DATA.map(({ id, data }) => normalizeScene(id, data));
                if (SCENES.length === 0) {
                    console.warn("No valid scenes loaded (inline fallback)");
                }
                return;
            }
            // 1. Fetch list of available scenes
            const listRes = await fetch('/scenes/list.json');
            if (!listRes.ok) throw new Error('Failed to load scene list');
            const sceneIds = await listRes.json();
            
            // 2. Fetch config for each scene
            const promises = sceneIds.map(async (id) => {
                const configRes = await fetch(`/scenes/${id}/config.json`);
                if (!configRes.ok) return null;
                const data = await configRes.json();
                return normalizeScene(id, data);
            });
            
            const loadedScenes = await Promise.all(promises);
            SCENES = loadedScenes.filter(s => s !== null);
            
            if (SCENES.length === 0) {
                console.warn("No valid scenes loaded");
            }
        } catch (err) {
            console.error("Error loading scenes:", err);
            SCENES = INLINE_SCENES_DATA.map(({ id, data }) => normalizeScene(id, data));
            if (SCENES.length === 0) {
                console.warn("No valid scenes loaded (inline fallback after error)");
            }
        }
    }

    /**
     * =============================================================================
     * INITIALIZATION
     * =============================================================================
     */

    async function init() {
        // Try to load wallpapers from sessionStorage first
        try {
            const storedWallpapers = sessionStorage.getItem('preview_wallpapers');
            if (storedWallpapers) {
                const parsed = JSON.parse(storedWallpapers);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    WALLPAPERS = parsed;
                }
            }
        } catch (e) {
            console.error("Failed to load wallpapers from session", e);
        }

        // Load Scenes
        try {
            await loadScenes();
        } catch (e) {
            console.error("Failed to load scenes:", e);
            // Fallback or alert if needed
        }

        const params = getUrlParams();
        let initialWallIndex = 0;

        // 如果 URL 提供了壁纸 src
        if (params.src) {
            // 检查壁纸是否已存在于列表中
            // Normalize URLs for comparison (handle absolute/relative)
            const normalize = (url) => {
                try {
                    return new URL(url, window.location.href).href;
                } catch(e) { return url; }
            };
            const targetSrc = normalize(params.src);
            
            let existingIndex = WALLPAPERS.findIndex(w => normalize(w) === targetSrc);
            
            // Fallback: simple string inclusion if normalization fails to match
            if (existingIndex === -1) {
                existingIndex = WALLPAPERS.findIndex(w => w.includes(params.src) || params.src.includes(w));
            }

            if (existingIndex !== -1) {
                initialWallIndex = existingIndex;
            } else {
                // 如果是新壁纸，添加到列表开头或结尾，这里我们添加到开头作为当前展示
                WALLPAPERS.unshift(params.src);
                initialWallIndex = 0;
            }
        }

        // 1. 构建左侧场景画廊
        SCENES.forEach((s, i) => {
            const card = document.createElement('div');
            card.className = 'card scene';
            // 结构分离：外层布局，内层动画
            card.innerHTML = `
                <div class="card-inner" style="background-image: url('${s.src}')"></div>
                <div class="card-info">
                    <div class="card-title">${s.title}</div>
                    <div class="card-sub">${s.device}</div>
                </div>
            `;
            // 点击直接滚动到该项
            card.onclick = () => scrollToCard(els.sceneTrack, i);
            els.sceneTrack.appendChild(card);
        });

        // 2. 构建右侧壁纸画廊
        WALLPAPERS.forEach((url, i) => {
            const card = document.createElement('div');
            card.className = 'card wall';
            
            // 简单处理标题
            let title = `Wallpaper #${i + 1}`;
            if (i === 0 && params.src && params.title) {
                title = params.title;
            }

            card.innerHTML = `
                <div class="card-inner" style="background-image: url('${url}')"></div>
                <div class="card-info">
                    <div class="card-title">${title}</div>
                    <div class="card-sub">4K UHD</div>
                </div>
            `;
            card.onclick = () => scrollToCard(els.wallTrack, i);
            els.wallTrack.appendChild(card);
        });

        // 3. 启动监听器
        // 绑定滚动事件到“光学对焦引擎”
        els.sceneTrack.addEventListener('scroll', () => requestAnimationFrame(() => focusEngine(els.sceneTrack, 'scene')));
        els.wallTrack.addEventListener('scroll', () => requestAnimationFrame(() => focusEngine(els.wallTrack, 'wall')));

        // 启动3D视差
        document.addEventListener('mousemove', handleParallax);

        // 4. 加载初始资源
        if (SCENES.length > 0) {
            loadScene(0);
        } else {
            console.warn("No scenes available; skipping scene initialization.");
        }
        updateWallpaper(initialWallIndex);

        // 5. 初始对齐
        // 延时执行以确保布局渲染完毕
        setTimeout(() => {
            // 临时禁用 CSS 平滑滚动
            els.sceneTrack.classList.add('no-smooth');
            els.wallTrack.classList.add('no-smooth');

            // 强制瞬间跳转
            scrollToCard(els.sceneTrack, 0, 'auto');
            scrollToCard(els.wallTrack, initialWallIndex, 'auto');

            // 恢复平滑滚动 (下一帧恢复，确保跳转已执行)
            requestAnimationFrame(() => {
                setTimeout(() => {
                    els.sceneTrack.classList.remove('no-smooth');
                    els.wallTrack.classList.remove('no-smooth');
                    
                    // Show tracks after position is stabilized
                    els.sceneTrack.classList.add('ready');
                    els.wallTrack.classList.add('ready');
                }, 50);
            });
        }, 100);

        // 6. Render iOS UI
        renderIOS_UI();
        setInterval(updateTime, 1000);

        // 7. Initialize View Mode (Ensure data-mode is set)
        setViewMode('scene');
    }

    /**
     * =============================================================================
     * iOS UI RENDERER
     * =============================================================================
     */
    function renderIOS_UI() {
        const icons = {
            flash: `<svg viewBox="0 0 24 24"><path d="M12 2C11.17 2 10.5 2.67 10.5 3.5V10H9.5C8.12 10 7 11.12 7 12.5V20.5C7 21.33 7.67 22 8.5 22H15.5C16.33 22 17 21.33 17 20.5V12.5C17 11.12 15.88 10 14.5 10H13.5V3.5C13.5 2.67 12.83 2 12 2ZM12 4C12.28 4 12.5 4.22 12.5 4.5V9H11.5V4.5C11.5 4.22 11.72 4 12 4Z" fill="currentColor"/></svg>`,
            cam: `<svg viewBox="0 0 24 24"><path d="M12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7ZM12 15.5C10.07 15.5 8.5 13.93 8.5 12C8.5 10.07 10.07 8.5 12 8.5C13.93 8.5 15.5 10.07 15.5 12C15.5 13.93 13.93 15.5 12 15.5ZM20 6H16.83L15.41 4.59C15.03 4.21 14.52 4 14 4H10C9.48 4 8.97 4.21 8.59 4.59L7.17 6H4C2.9 6 2 6.9 2 8V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6ZM20 18H4V8H7.59L9 6.59H15L16.41 8H20V18Z" fill="currentColor"/></svg>`,
            sig: `<svg viewBox="0 0 26 16" width="58" height="38"><path d="M3 11.5C3 11.22 3.22 11 3.5 11H5.5C5.78 11 6 11.22 6 11.5V15.5C6 15.78 5.78 16 5.5 16H3.5C3.22 16 3 15.78 3 15.5V11.5ZM9 7.5C9 7.22 9.22 7 9.5 7H11.5C11.78 7 12 7.22 12 7.5V15.5C12 15.78 11.78 16 11.5 16H9.5C9.22 16 9 15.78 9 15.5V7.5ZM15 3.5C15 3.22 15.22 3 15.5 3H17.5C17.78 3 18 3.22 18 3.5V15.5C18 15.78 17.78 16 17.5 16H15.5C15.22 16 15 15.78 15 15.5V3.5ZM21 0.5C21 0.22 21.22 0 21.5 0H23.5C23.78 0 24 0.22 24 0.5V15.5C24 15.78 23.78 16 23.5 16H21.5C21.22 16 21 15.78 21 15.5V0.5Z" fill="currentColor"/></svg>`,
            bat: `<svg viewBox="0 0 30 14" width="72" height="34"><rect x="0" y="0" width="26" height="14" rx="4.5" ry="4.5" fill="currentColor" opacity="0.35"/><rect x="2" y="2" width="22" height="10" rx="2.5" ry="2.5" fill="currentColor"/><path d="M27 5.5C27 4.67 27.67 4 28.5 4H29C29.55 4 30 4.45 30 5V9C30 9.55 29.55 10 29 10H28.5C27.67 10 27 9.33 27 8.5V5.5Z" fill="currentColor" opacity="0.4"/></svg>`,
            bell: `<svg viewBox="0 0 24 24" width="36" height="36"><path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" fill="currentColor"/></svg>`,
            loc: `<svg viewBox="0 0 24 24" width="32" height="32"><path d="M11.1 2.7L3.45 19.34C3.17 19.95 3.79 20.57 4.4 20.29L12 16.92L19.6 20.29C20.21 20.57 20.83 19.95 20.55 19.34L12.9 2.7C12.63 2.13 11.37 2.13 11.1 2.7Z" fill="currentColor"/></svg>`,
            bt: `<svg viewBox="0 0 24 24"><path d="M17.71 7.71L12 2H11V9.58L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L11 14.41V22H12L17.71 16.29L13.41 12L17.71 7.71ZM13 5.83L14.88 7.71L13 9.58V5.83ZM13 18.17V14.41L14.88 16.29L13 18.17Z" fill="currentColor"/></svg>`,
            chat: `<svg viewBox="0 0 24 24"><path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H6V22.5C6 22.88 6.43 23.11 6.74 22.88L10.5 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z" fill="currentColor"/></svg>`,
            scan: `<svg viewBox="0 0 24 24"><path d="M4 8V5C4 4.45 4.45 4 5 4H8V2H5C3.34 2 2 3.34 2 5V8H4ZM4 16V19C4 19.55 4.45 20 5 20H8V22H5C3.34 22 2 20.66 2 19V16H4ZM20 16V19C20 20.66 18.66 22 17 22H14V20H17C17.55 20 18 19.55 18 19V16H20ZM20 8V5C20 3.34 18.66 2 17 2H14V4H17C17.55 4 18 4.45 18 5V8H20ZM7 11H9V13H7V11ZM11 11H13V13H11V11ZM15 11H17V13H15V11ZM7 7H11V11H7V7ZM13 7H17V11H13V7ZM7 13H11V17H7V13ZM13 13H17V17H13V13Z" fill="currentColor"/></svg>`,
            user: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="currentColor"/></svg>`
        };

        const html = `
        <div class="ui-scale">
            <div class="iphone-ui">
                <div class="iphone-status-left">
                    中国联通 ${icons.bell} ${icons.loc}
                </div>
                <div class="iphone-status-right">
                    ${icons.sig} <span>5G</span> ${icons.bat}
                </div>
                <div class="island"></div>
                <div style="text-align:center; z-index:1; display:flex; flex-direction:column; align-items:center">
                    <div class="iphone-date" id="uiDate"></div>
                    <div class="iphone-time" id="uiTime"></div>
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
        </div>`;

        // Inject into both containers
        document.getElementById('os-ui-scene').innerHTML = html;
        document.getElementById('os-ui-flat').innerHTML = html;
        
        updateTime();
    }

    function updateTime() {
        const now = new Date();
        const h = String(now.getHours()).padStart(2,'0');
        const m = String(now.getMinutes()).padStart(2,'0');
        const t = `${h}<span class="time-colon">:</span>${m}`;
        const d = `${now.getMonth()+1}月${now.getDate()}日 星期${['日','一','二','三','四','五','六'][now.getDay()]}`;
        
        // Update all instances
        document.querySelectorAll('.iphone-time').forEach(el => el.innerHTML = t);
        document.querySelectorAll('.iphone-date').forEach(el => el.innerText = d);
    }

    /**
     * =============================================================================
     * FOCUS ENGINE (核心：光学对焦滚动算法)
     * =============================================================================
     */

    let sceneScrollTimeout, wallScrollTimeout;

    function focusEngine(container, type) {
        const centerY = container.scrollTop + container.clientHeight / 2;
        const cards = container.children;
        let minDist = Infinity;
        let centerIndex = -1;

        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            // 性能优化：如果不在视口附近的，直接跳过计算 (减少 Reflow)
            // 假设卡片高度最大 200，视口高度 800，上下各缓冲 400
            const cardTop = card.offsetTop; // 读取 offsetTop 仍有开销，但比后续样式操作好
            if (Math.abs(cardTop - centerY) > 600) {
                continue; 
            }

            const cardCenterY = cardTop + card.offsetHeight / 2;
            const dist = Math.abs(centerY - cardCenterY);

            // --- 视觉算法 (只操作 inner) ---
            const inner = card.querySelector('.card-inner');
            if (!inner) continue;

            // 衰减半径 (Sensitivity) - 配合加大后的间距调整
            const radius = 500;

            let scale = 0.85;
            let opacity = 0.3;
            // let blur = 5; // REMOVED: Blur is performance killer
            let grayscale = 1;

            if (dist < radius) {
                const ratio = 1 - (dist / radius); // 0 to 1
                scale = 0.85 + (0.2 * ratio);  // 0.85 -> 1.05
                opacity = 0.3 + (0.7 * ratio); // 0.3 -> 1.0
                // blur = 5 * (1 - ratio);     
                grayscale = 1 - ratio;         // 1 -> 0
            }

            // 样式应用 - 使用 inner，避免影响 Scroll Snap 的 layout
            inner.style.transform = `scale(${scale})`;
            inner.style.opacity = opacity;
            // inner.style.filter = `blur(${blur}px) ...`; // REMOVED

            // 只有最中心的卡片是全彩清晰的
            if (dist < 80) {
                card.classList.add('active');
                // inner.style.filter = `grayscale(0) brightness(1.1) blur(0)`;
                inner.style.filter = `grayscale(0) brightness(1.1)`;
                if (dist < minDist) {
                    minDist = dist;
                    centerIndex = i;
                }
            } else {
                card.classList.remove('active');
                // inner.style.filter = `grayscale(${grayscale}) brightness(${0.5 + opacity*0.3}) blur(${blur}px)`;
                inner.style.filter = `grayscale(${grayscale}) brightness(${0.6 + opacity*0.4})`;
            }
        }

        // --- 自动加载逻辑 (Debounced) ---
        // 只有当卡片停留在中心一段时间后才加载，避免快速滚动时频繁加载
        if (centerIndex !== -1) {
            if (type === 'scene' && centerIndex !== state.sceneIndex) {
                clearTimeout(sceneScrollTimeout);
                sceneScrollTimeout = setTimeout(() => {
                    state.sceneIndex = centerIndex;
                    loadScene(centerIndex);
                }, 200);
            }
            if (type === 'wall' && centerIndex !== state.wallIndex) {
                clearTimeout(wallScrollTimeout);
                wallScrollTimeout = setTimeout(() => {
                    state.wallIndex = centerIndex;
                    updateWallpaper(centerIndex);
                }, 100); // 壁纸切换可以快一点
            }
        }
    }

    // 辅助：平滑滚动到指定卡片
    function scrollToCard(container, index, behavior = 'smooth') {
        const card = container.children[index];
        if (!card) return;
        // 计算让卡片居中的滚动位置
        const scrollPos = card.offsetTop - (container.clientHeight / 2) + (card.offsetHeight / 2);
        container.scrollTo({
            top: scrollPos,
            behavior: behavior
        });
    }

    /**
     * =============================================================================
     * SCENE & WALLPAPER LOADERS
     * =============================================================================
     */

    function loadScene(idx) {
        const s = SCENES[idx];
        if (!s) {
            console.warn("Scene not found:", idx);
            return;
        }
        els.loader.classList.add('show');
        els.container.classList.remove('loaded');

        // Preload image object to check validity
        const img = new Image();
        img.src = s.src;

        // Use els.base.onload to ensure layout is updated before calculation
        els.base.onload = () => {
            // Update Scene Dimensions based on the rendered image
            // We must use the actual displayed size, not natural size, because anchors are relative to the displayed image
            const displayW = els.base.offsetWidth;
            const displayH = els.base.offsetHeight;

            if (!displayW || !displayH) {
                console.error("Image dimensions are zero, layout might be pending");
                // Fallback loop? Or just retry? 
                // Usually requestAnimationFrame helps
            }

            // 更新屏幕参数
            els.screen.style.width = s.config.w + 'px';
            els.screen.style.height = s.config.h + 'px';

            // 更新圆角 (包括反光层)
            const r = s.config.r + 'px';
            els.screen.style.borderRadius = r;
            document.querySelector('.fx-inner-shadow').style.borderRadius = r;
            // Update fx-outer radius as well
            if(document.getElementById('fxOuter')) document.getElementById('fxOuter').style.borderRadius = r;
            // Update edge-blend radius
            if(document.getElementById('edgeBlend')) document.getElementById('edgeBlend').style.setProperty('--edge-radius', r);

            // --- 视觉参数增强 (From Builder) ---
            if (s.config) {
                const c = s.config;
                // Bezel (模拟 Builder 的 bezel)
                if (c.bezel !== undefined) {
                    const base = 10;
                    const pct = Math.max(0, Math.min(100, parseFloat(c.bezel)));
                    const inward = pct < 50 ? ((50 - pct) / 50) * base : 0;
                    const outward = pct > 50 ? ((pct - 50) / 50) * base : 0;
                    const innerSize = base + inward;
                    const outerSize = outward;
                    
                    document.querySelector('.fx-inner-shadow').style.boxShadow = `inset 0 0 0 ${innerSize}px rgba(0,0,0,1)`;
                    
                    const outerEl = document.getElementById('fxOuter');
                    if (outerEl) {
                        outerEl.style.boxShadow = outerSize > 0 ? `0 0 0 ${outerSize}px #000` : 'none';
                    }
                }

                // Glare
                if (c.glare !== undefined) {
                    const glareEl = document.querySelector('.fx-glare');
                    if (glareEl) glareEl.style.opacity = c.glare / 100;
                }
                
                // Brightness
                if (c.bright !== undefined) {
                    els.wp.style.filter = `brightness(${c.bright}%)`;
                }

                // Noise (需添加 DOM)
                if (c.noise !== undefined) {
                    // Check if noise element exists, if not create it
                    let noiseEl = document.querySelector('.fx-noise');
                    if (!noiseEl) {
                        noiseEl = document.createElement('div');
                        noiseEl.className = 'fx-noise';
                        // Add SVG filter style
                        noiseEl.style.position = 'absolute';
                        noiseEl.style.inset = '0';
                        noiseEl.style.zIndex = '34';
                        noiseEl.style.mixBlendMode = 'overlay';
                        noiseEl.style.pointerEvents = 'none';
                        noiseEl.style.backgroundImage = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;
                        document.querySelector('.fx-layer').appendChild(noiseEl);
                    }
                    noiseEl.style.opacity = c.noise / 200;
                }
                
                // Edge Blend
                if (c.edge !== undefined) {
                    const edgeEl = document.getElementById('edgeBlend');
                    if (edgeEl) {
                        const max = 80;
                        const v = parseFloat(c.edge);
                        const eased = Math.pow(Math.min(Math.max(v, 0), max) / max, 1.6) * max;
                        const blur = Math.min(36, eased / 2.6);
                        const spread = eased / 2.2;
                        const opacity = Math.min(0.55, 0.18 + (eased / max) * 0.32);
                        
                        edgeEl.style.setProperty('--edge-blur', `${blur.toFixed(1)}px`);
                        edgeEl.style.setProperty('--edge-spread', `${spread.toFixed(1)}px`);
                        edgeEl.style.setProperty('--edge-opacity', `${opacity.toFixed(2)}`);
                    }
                }

                // Opacity (Screen Opacity)
                if (c.opacity !== undefined) {
                     // Only apply if we want semi-transparent screens (usually for AR/Holo)
                     // But Builder 'opacity' is usually for alignment helper. 
                     // If user set it to 1 in config, it means fully opaque.
                     els.screen.style.opacity = c.opacity;
                }
            }

            // 计算 Matrix 透视
            // 将百分比锚点转换为像素
            const points = s.anchors.map(p => ({ x: p.x * displayW, y: p.y * displayH }));
            const m = solveHomography(s.config.w, s.config.h, points);
            els.warp.style.transform = `matrix3d(${m})`;

            // 动画进场
            requestAnimationFrame(() => {
                els.loader.classList.remove('show');
                els.container.classList.add('loaded');
            });
        };
        
        // 触发 load
        els.base.src = s.src;
        
        // 更新背景 (如果是 Scene 模式，背景随场景变)
        updateAmbientBackground();
    }

    function updateWallpaper(idx) {
        const url = WALLPAPERS[idx];
        
        // 1. Scene Wallpaper
        els.wp.style.backgroundImage = `url(${url})`;

        // 2. Flat UI Wallpaper
        if(els.wpFlat) els.wpFlat.style.backgroundImage = `url(${url})`;

        // 3. Raw Image
        if(els.rawImg) els.rawImg.src = url;

        // 更新背景 (如果是 UI/Raw 模式，背景随壁纸变)
        updateAmbientBackground();
    }
    
    // 统一背景更新逻辑
    function updateAmbientBackground() {
        let bgUrl = '';
        
        if (state.viewMode === 'scene') {
            // Scene 模式：背景使用场景图
            if (SCENES[state.sceneIndex]) {
                bgUrl = SCENES[state.sceneIndex].src;
            }
        } else {
            // 其他模式：背景使用壁纸
            bgUrl = WALLPAPERS[state.wallIndex];
        }

        if (!bgUrl || state.currentBgUrl === bgUrl) return;
        state.currentBgUrl = bgUrl;

        // 环境光背景切换 (Cross-fade)
        state.bgFlip = !state.bgFlip;
        const activeBg = state.bgFlip ? els.bg2 : els.bg1;
        const inactiveBg = state.bgFlip ? els.bg1 : els.bg2;
        
        activeBg.style.backgroundImage = `url(${bgUrl})`;
        activeBg.classList.add('active');
        inactiveBg.classList.remove('active');
    }

    /**
     * =============================================================================
     * VIEW MODE SWITCHER
     * =============================================================================
     */
    
    window.setViewMode = function(mode) {
        state.viewMode = mode;
        document.body.setAttribute('data-mode', mode);
        
        // Update buttons state
        els.switchBtns.forEach(btn => {
            const onclick = btn.getAttribute('onclick');
            if(onclick && onclick.includes(`'${mode}'`)) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // 切换模式时，检查是否需要更新背景
        updateAmbientBackground();

        // Ensure current wallpaper is loaded for the new mode
        // (Usually handled by updateWallpaper, but strictly enforcing here for safety)
        const url = WALLPAPERS[state.wallIndex];
        if(mode === 'ui' && els.wpFlat) {
            els.wpFlat.style.backgroundImage = `url(${url})`;
        } else if (mode === 'raw' && els.rawImg) {
            els.rawImg.src = url;
        }
    };

    /**
     * =============================================================================
     * 3D PARALLAX & MATRIX MATH
     * =============================================================================
     */

    function handleParallax(e) {
        // 将鼠标位置映射到 -1 到 1 的范围
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        // 计算旋转角度 (非常细微，为了高级感)
        const rotateX = -y * 3;
        const rotateY = x * 3;
        const translateX = x * 10;
        const translateY = y * 5;

        // 应用到 Pivot 容器
        requestAnimationFrame(() => {
            els.pivot.style.transform = `
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translate3d(${translateX}px, ${translateY}px, 0)
                `;
        });
    }

    // 经典的 Matrix3D 求解算法
    function solveHomography(w,h,p){const s=[0,0,w,0,w,h,0,h],d=[p[0].x,p[0].y,p[1].x,p[1].y,p[2].x,p[2].y,p[3].x,p[3].y],A=[],b=[];for(let i=0;i<4;i++){let sx=s[i*2],sy=s[i*2+1],dx=d[i*2],dy=d[i*2+1];A.push([sx,sy,1,0,0,0,-sx*dx,-sy*dx]);b.push(dx);A.push([0,0,0,sx,sy,1,-sx*dy,-sy*dy]);b.push(dy);}let n=8;for(let i=0;i<n;i++){let m=i;for(let j=i+1;j<n;j++)if(Math.abs(A[j][i])>Math.abs(A[m][i]))m=j;[A[i],A[m]]=[A[m],A[i]];[b[i],b[m]]=[b[m],b[i]];for(let j=i+1;j<n;j++){let c=-A[j][i]/A[i][i];for(let k=i;k<n;k++)A[j][k]+=c*A[i][k];b[j]+=c*b[i];}}let x=[];for(let i=n-1;i>=0;i--){let t=0;for(let j=i+1;j<n;j++)t+=A[i][j]*x[j];x[i]=(b[i]-t)/A[i][i];}return [x[0],x[3],0,x[6],x[1],x[4],0,x[7],0,0,1,0,x[2],x[5],0,1].join(',');}

    function downloadScene() {
        // 这里可以对接 html2canvas 等截图库
        alert("正在生成 4K 预览图...");
    }

    function handleClose() {
        // 尝试发送消息给父窗口
        if (window.parent && window.parent !== window) {
            window.parent.postMessage('close-preview', '*');
        } else {
            // 如果是独立窗口打开，则关闭
            window.close();
        }
    }

    // Boot
    init();
