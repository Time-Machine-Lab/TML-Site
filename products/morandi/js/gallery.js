// 分类页面 - 壁纸展示逻辑

const allWallpapers = [
  { id: 1, name: "晨曦微光", style: "pink", tags: ["灰粉", "柔和"], image: "https://picsum.photos/seed/morandi1/400/600" },
  { id: 2, name: "静谧湖畔", style: "blue", tags: ["灰蓝", "宁静"], image: "https://picsum.photos/seed/morandi2/400/600" },
  { id: 3, name: "春日新绿", style: "green", tags: ["灰绿", "清新"], image: "https://picsum.photos/seed/morandi3/400/600" },
  { id: 4, name: "暖阳午后", style: "beige", tags: ["米灰", "温暖"], image: "https://picsum.photos/seed/morandi4/400/600" },
  { id: 5, name: "玫瑰轻语", style: "pink", tags: ["灰粉", "浪漫"], image: "https://picsum.photos/seed/morandi5/400/600" },
  { id: 6, name: "海天一色", style: "blue", tags: ["灰蓝", "辽阔"], image: "https://picsum.photos/seed/morandi6/400/600" },
  { id: 7, name: "竹林深处", style: "green", tags: ["灰绿", "幽静"], image: "https://picsum.photos/seed/morandi7/400/600" },
  { id: 8, name: "沙漠黄昏", style: "beige", tags: ["米灰", "苍茫"], image: "https://picsum.photos/seed/morandi8/400/600" }
];

function createCard(w) {
  const tags = w.tags.map(t => `<span class="tag">${t}</span>`).join('');
  return `
    <a href="detail.html?id=${w.id}" class="card">
      <div class="card-image">
        <img src="${w.image}" alt="${w.name}" loading="lazy">
      </div>
      <div class="card-body">
        <div class="card-title">${w.name}</div>
        <div class="card-tags">${tags}</div>
      </div>
    </a>
  `;
}

function renderWallpapers(filter) {
  const grid = document.getElementById('wallpaper-grid');
  const filtered = filter === 'all'
    ? allWallpapers
    : allWallpapers.filter(w => w.style === filter);
  grid.innerHTML = filtered.map(createCard).join('');
}

function initFilters() {
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderWallpapers(btn.dataset.style);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderWallpapers('all');
  initFilters();
});
