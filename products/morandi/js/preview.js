// 详情页 - 预览逻辑

const wallpaperData = {
  1: { name: "晨曦微光", tags: ["灰粉", "柔和"], image: "https://picsum.photos/seed/morandi1/400/600" },
  2: { name: "静谧湖畔", tags: ["灰蓝", "宁静"], image: "https://picsum.photos/seed/morandi2/400/600" },
  3: { name: "春日新绿", tags: ["灰绿", "清新"], image: "https://picsum.photos/seed/morandi3/400/600" },
  4: { name: "暖阳午后", tags: ["米灰", "温暖"], image: "https://picsum.photos/seed/morandi4/400/600" },
  5: { name: "玫瑰轻语", tags: ["灰粉", "浪漫"], image: "https://picsum.photos/seed/morandi5/400/600" },
  6: { name: "海天一色", tags: ["灰蓝", "辽阔"], image: "https://picsum.photos/seed/morandi6/400/600" },
  7: { name: "竹林深处", tags: ["灰绿", "幽静"], image: "https://picsum.photos/seed/morandi7/400/600" },
  8: { name: "沙漠黄昏", tags: ["米灰", "苍茫"], image: "https://picsum.photos/seed/morandi8/400/600" }
};

function loadWallpaper() {
  const id = new URLSearchParams(location.search).get('id') || 1;
  const w = wallpaperData[id] || wallpaperData[1];

  document.getElementById('wallpaper-name').textContent = w.name;
  document.getElementById('wallpaper-image').src = w.image;
  document.getElementById('preview-phone').src = w.image;
  document.getElementById('preview-tablet').src = w.image;

  const tagsHtml = w.tags.map(t => `<span class="tag">${t}</span>`).join('');
  document.getElementById('wallpaper-tags').innerHTML = tagsHtml;
}

document.addEventListener('DOMContentLoaded', loadWallpaper);
