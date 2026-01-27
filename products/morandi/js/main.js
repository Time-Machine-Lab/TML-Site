// 首页 - 精选壁纸展示

const featuredWallpapers = [
  { id: 1, name: "晨曦微光", tags: ["灰粉", "柔和"], image: "https://picsum.photos/seed/morandi1/400/600" },
  { id: 2, name: "静谧湖畔", tags: ["灰蓝", "宁静"], image: "https://picsum.photos/seed/morandi2/400/600" },
  { id: 3, name: "春日新绿", tags: ["灰绿", "清新"], image: "https://picsum.photos/seed/morandi3/400/600" },
  { id: 4, name: "暖阳午后", tags: ["米灰", "温暖"], image: "https://picsum.photos/seed/morandi4/400/600" }
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

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('featured-wallpapers');
  if (grid) {
    grid.innerHTML = featuredWallpapers.map(createCard).join('');
  }
});
