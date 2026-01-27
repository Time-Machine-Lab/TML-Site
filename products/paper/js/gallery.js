// 壁纸数据（与 main.js 共享）
const wallpapers = [
  {
    id: 1,
    name: "春日花语",
    category: "floral",
    tags: ["花卉", "春天"],
    image: "https://picsum.photos/seed/f1/400/600",
    story: "三月的清晨，樱花刚刚盛开..."
  },
  {
    id: 2,
    name: "山间晨雾",
    category: "landscape",
    tags: ["风景", "山川"],
    image: "https://picsum.photos/seed/l1/400/600",
    story: "站在山顶，看着云雾缓缓升起..."
  },
  {
    id: 3,
    name: "午后时光",
    category: "healing",
    tags: ["治愈", "温暖"],
    image: "https://picsum.photos/seed/h1/400/600",
    story: "阳光洒在窗台上，一杯热茶..."
  },
  {
    id: 4,
    name: "简单之美",
    category: "minimal",
    tags: ["简约", "几何"],
    image: "https://picsum.photos/seed/m1/400/600",
    story: "少即是多，简单的线条..."
  },
  {
    id: 5,
    name: "夏日向日葵",
    category: "floral",
    tags: ["花卉", "夏天"],
    image: "https://picsum.photos/seed/f2/400/600",
    story: "向日葵总是追逐着太阳..."
  },
  {
    id: 6,
    name: "海边日落",
    category: "landscape",
    tags: ["风景", "海洋"],
    image: "https://picsum.photos/seed/l2/400/600",
    story: "夕阳西下，海面被染成金色..."
  },
  {
    id: 7,
    name: "雨后彩虹",
    category: "healing",
    tags: ["治愈", "彩虹"],
    image: "https://picsum.photos/seed/h2/400/600",
    story: "每一场雨后都会有彩虹..."
  },
  {
    id: 8,
    name: "极简线条",
    category: "minimal",
    tags: ["简约", "线条"],
    image: "https://picsum.photos/seed/m2/400/600",
    story: "用最简单的线条表达情感..."
  }
];

// 创建卡片
function createCard(w) {
  const tags = w.tags.map(t => `<span class="tag">${t}</span>`).join('');
  return `
    <a href="detail.html?id=${w.id}" class="wallpaper-card">
      <img src="${w.image}" alt="${w.name}">
      <div class="card-info">
        <h3 class="card-title">${w.name}</h3>
        <div class="card-tags">${tags}</div>
      </div>
    </a>
  `;
}

// 渲染壁纸
function renderWallpapers(category) {
  const grid = document.getElementById('wallpaper-grid');
  if (!grid) return;

  const filtered = category === 'all'
    ? wallpapers
    : wallpapers.filter(w => w.category === category);

  grid.innerHTML = filtered.map(createCard).join('');
}

// 初始化筛选
function initFilters() {
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderWallpapers(btn.dataset.cat);
    });
  });

  // 检查 URL 参数
  const params = new URLSearchParams(location.search);
  const cat = params.get('cat');
  if (cat) {
    const btn = document.querySelector(`[data-cat="${cat}"]`);
    if (btn) {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderWallpapers(cat);
      return;
    }
  }
  renderWallpapers('all');
}

// 页面加载
document.addEventListener('DOMContentLoaded', initFilters);
