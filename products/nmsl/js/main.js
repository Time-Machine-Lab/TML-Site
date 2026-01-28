const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const activate = (items, target) => {
  items.forEach((item) => item.classList.remove("active"));
  if (target) target.classList.add("active");
};

const initNav = () => {
  const page = document.body.dataset.page;
  if (!page) return;
  $$(".nav a").forEach((link) => {
    if (link.dataset.page === page) link.classList.add("active");
  });
};

const initHero = () => {
  const track = $("#hero-track");
  if (!track) return;

  const scrollByCard = (dir) => {
    const card = track.querySelector(".hero-card");
    const gap = parseInt(getComputedStyle(track).columnGap || 14, 10);
    const amount = (card?.getBoundingClientRect().width || 320) + gap;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  const prevBtn = $("[data-hero-prev]");
  const nextBtn = $("[data-hero-next]");
  if (prevBtn) prevBtn.addEventListener("click", () => scrollByCard(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => scrollByCard(1));
};

const initChannels = () => {
  const pills = $$("[data-channel]");
  if (!pills.length) return;
  const title = $("#channel-heading");
  const cards = $$(".gallery-card");
  const row = $(".channel-row");
  const nextBtn = $("[data-channel-next]");

  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      activate(pills, pill);
      const channel = pill.dataset.channel;
      if (title) title.textContent = channel;
      const isAll = channel === "All Channels";
      cards.forEach((card) => {
        const match = isAll || card.dataset.category === channel;
        card.style.display = match ? "" : "none";
      });
    });
  });

  if (row && nextBtn) {
    nextBtn.addEventListener("click", () => {
      row.scrollBy({ left: 240, behavior: "smooth" });
    });
  }
};

const initDock = () => {
  const dockBtns = $$(".dock-btn");
  const badge = $("#sort-badge");
  dockBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      activate(dockBtns, btn);
      if (badge) badge.textContent = btn.dataset.sort;
    });
  });
};

const initFilters = () => {
  const tabs = $$(".filter-tab");
  const sizeBtns = $$(".size-btn");
  const sortBadge = $("#sort-badge");

  if (tabs.length) {
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        activate(tabs, tab);
        if (sortBadge && tab.dataset.sort) sortBadge.textContent = tab.dataset.sort;
      });
    });
  }

  if (sizeBtns.length) {
    sizeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        activate(sizeBtns, btn);
        const size = btn.dataset.size || "medium";
        document.body.dataset.grid = size;
      });
    });
  }
};

initNav();
initHero();
initChannels();
initDock();
initFilters();
