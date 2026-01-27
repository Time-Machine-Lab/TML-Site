// 壁纸数据
const wallpapers = [
  {
    id: 1,
    name: "春日花语",
    category: "floral",
    tags: ["花卉", "春天"],
    image: "https://picsum.photos/seed/f1/400/600",
    story: "三月的清晨，樱花刚刚盛开，阳光透过花瓣洒下斑驳的光影..."
  },
  {
    id: 2,
    name: "山间晨雾",
    category: "landscape",
    tags: ["风景", "山川"],
    image: "https://picsum.photos/seed/l1/400/600",
    story: "站在山顶，看着云雾缓缓升起，仿佛置身仙境..."
  },
  {
    id: 3,
    name: "午后时光",
    category: "healing",
    tags: ["治愈", "温暖"],
    image: "https://picsum.photos/seed/h1/400/600",
    story: "阳光洒在窗台上，一杯热茶，一本好书，这就是幸福..."
  },
  {
    id: 4,
    name: "简单之美",
    category: "minimal",
    tags: ["简约", "几何"],
    image: "https://picsum.photos/seed/m1/400/600",
    story: "少即是多，简单的线条勾勒出纯粹的美..."
  },
  {
    id: 5,
    name: "夏日向日葵",
    category: "floral",
    tags: ["花卉", "夏天"],
    image: "https://picsum.photos/seed/f2/400/600",
    story: "向日葵总是追逐着太阳，就像我们追逐着梦想..."
  },
  {
    id: 6,
    name: "海边日落",
    category: "landscape",
    tags: ["风景", "海洋"],
    image: "https://picsum.photos/seed/l2/400/600",
    story: "夕阳西下，海面被染成金色，这一刻值得永远珍藏..."
  },
  {
    id: 7,
    name: "雨后彩虹",
    category: "healing",
    tags: ["治愈", "彩虹"],
    image: "https://picsum.photos/seed/h2/400/600",
    story: "每一场雨后都会有彩虹，就像每一次困难后都会有希望..."
  },
  {
    id: 8,
    name: "极简线条",
    category: "minimal",
    tags: ["简约", "线条"],
    image: "https://picsum.photos/seed/m2/400/600",
    story: "用最简单的线条，表达最纯粹的情感..."
  }
];

// 获取收藏列表
function getFavorites() {
  const favs = localStorage.getItem('wallpaper-favorites');
  return favs ? JSON.parse(favs) : [];
}

// 保存收藏
function saveFavorites(favs) {
  localStorage.setItem('wallpaper-favorites', JSON.stringify(favs));
}

// 切换收藏状态
function toggleFavorite(id) {
  const favs = getFavorites();
  const index = favs.indexOf(id);
  if (index > -1) {
    favs.splice(index, 1);
  } else {
    favs.push(id);
  }
  saveFavorites(favs);
  return favs.includes(id);
}

// 检查是否已收藏
function isFavorite(id) {
  return getFavorites().includes(id);
}

// 创建壁纸卡片 HTML
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

// 首页：渲染精选壁纸
function renderFeatured() {
  const grid = document.getElementById('featured-grid');
  if (!grid) return;
  const featured = wallpapers.slice(0, 4);
  grid.innerHTML = featured.map(createCard).join('');
}

// 收藏页：渲染收藏列表
function renderFavorites() {
  const grid = document.getElementById('favorites-grid');
  const empty = document.getElementById('empty-state');
  const count = document.getElementById('fav-count');
  if (!grid) return;

  const favIds = getFavorites();
  const favWallpapers = wallpapers.filter(w => favIds.includes(w.id));

  if (count) count.textContent = favWallpapers.length;

  if (favWallpapers.length === 0) {
    grid.style.display = 'none';
    if (empty) empty.style.display = 'block';
  } else {
    grid.style.display = 'grid';
    if (empty) empty.style.display = 'none';
    grid.innerHTML = favWallpapers.map(createCard).join('');
  }
}

// 页面加载完成
document.addEventListener('DOMContentLoaded', () => {
  renderFeatured();
  renderFavorites();
});
