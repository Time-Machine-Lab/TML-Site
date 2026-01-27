// 壁纸数据
const wallpapers = [
  {
    id: 1,
    name: "春日花语",
    category: "floral",
    tags: ["花卉", "春天"],
    image: "https://picsum.photos/seed/f1/400/600",
    story: "三月的清晨，樱花刚刚盛开，阳光透过花瓣洒下斑驳的光影，微风轻拂，花瓣如雪般飘落。这一刻的美好，值得被永远珍藏在你的屏幕上。"
  },
  {
    id: 2,
    name: "山间晨雾",
    category: "landscape",
    tags: ["风景", "山川"],
    image: "https://picsum.photos/seed/l1/400/600",
    story: "站在山顶，看着云雾缓缓升起，仿佛置身仙境。远处的山峦若隐若现，这份宁静与壮美，让人忘却尘世的烦恼。"
  },
  {
    id: 3,
    name: "午后时光",
    category: "healing",
    tags: ["治愈", "温暖"],
    image: "https://picsum.photos/seed/h1/400/600",
    story: "阳光洒在窗台上，一杯热茶，一本好书，这就是幸福。愿这份温暖能陪伴你度过每一个平凡而美好的日子。"
  },
  {
    id: 4,
    name: "简单之美",
    category: "minimal",
    tags: ["简约", "几何"],
    image: "https://picsum.photos/seed/m1/400/600",
    story: "少即是多，简单的线条勾勒出纯粹的美。在繁忙的生活中，给眼睛一片宁静的栖息地。"
  },
  {
    id: 5,
    name: "夏日向日葵",
    category: "floral",
    tags: ["花卉", "夏天"],
    image: "https://picsum.photos/seed/f2/400/600",
    story: "向日葵总是追逐着太阳，就像我们追逐着梦想。愿你也能像向日葵一样，永远向着阳光生长。"
  },
  {
    id: 6,
    name: "海边日落",
    category: "landscape",
    tags: ["风景", "海洋"],
    image: "https://picsum.photos/seed/l2/400/600",
    story: "夕阳西下，海面被染成金色，这一刻值得永远珍藏。愿每一个日落都能带给你内心的平静。"
  },
  {
    id: 7,
    name: "雨后彩虹",
    category: "healing",
    tags: ["治愈", "彩虹"],
    image: "https://picsum.photos/seed/h2/400/600",
    story: "每一场雨后都会有彩虹，就像每一次困难后都会有希望。愿这道彩虹能为你带来好运。"
  },
  {
    id: 8,
    name: "极简线条",
    category: "minimal",
    tags: ["简约", "线条"],
    image: "https://picsum.photos/seed/m2/400/600",
    story: "用最简单的线条，表达最纯粹的情感。简约而不简单，这就是设计的魅力。"
  }
];

// 获取收藏
function getFavorites() {
  const favs = localStorage.getItem('wallpaper-favorites');
  return favs ? JSON.parse(favs) : [];
}

// 保存收藏
function saveFavorites(favs) {
  localStorage.setItem('wallpaper-favorites', JSON.stringify(favs));
}

// 页面加载
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  const id = parseInt(params.get('id')) || 1;
  const w = wallpapers.find(item => item.id === id) || wallpapers[0];

  // 填充内容
  document.getElementById('wallpaper-image').src = w.image;
  document.getElementById('wallpaper-name').textContent = w.name;
  document.getElementById('detail-title').textContent = w.name;
  document.getElementById('breadcrumb-name').textContent = w.name;
  document.getElementById('wallpaper-story').textContent = w.story;

  // 标签
  const tagsEl = document.getElementById('detail-tags');
  tagsEl.innerHTML = w.tags.map(t => `<span class="tag">${t}</span>`).join('');

  // 收藏按钮
  const favBtn = document.getElementById('btn-favorite');
  const favs = getFavorites();
  if (favs.includes(w.id)) {
    favBtn.textContent = '♥ 已收藏';
    favBtn.classList.add('active');
  }

  favBtn.addEventListener('click', () => {
    const currentFavs = getFavorites();
    const index = currentFavs.indexOf(w.id);
    if (index > -1) {
      currentFavs.splice(index, 1);
      favBtn.textContent = '♡ 收藏';
      favBtn.classList.remove('active');
    } else {
      currentFavs.push(w.id);
      favBtn.textContent = '♥ 已收藏';
      favBtn.classList.add('active');
    }
    saveFavorites(currentFavs);
  });

  // 下载按钮
  document.getElementById('btn-download').addEventListener('click', () => {
    window.open(w.image, '_blank');
  });
});
