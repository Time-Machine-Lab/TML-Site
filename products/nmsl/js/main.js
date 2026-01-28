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
  const prevBtn = $("[data-channel-prev]");

  // wrapping handled by CSS

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

  if (row && prevBtn) {
    prevBtn.addEventListener("click", () => {
      row.scrollBy({ left: -240, behavior: "smooth" });
    });
  }

  const updateArrows = () => {
    if (!row || !prevBtn || !nextBtn) return;
    const { scrollLeft, scrollWidth, clientWidth } = row;
    
    // Check start
    if (scrollLeft <= 5) { // minimal buffer
      prevBtn.classList.add("is-disabled");
    } else {
      prevBtn.classList.remove("is-disabled");
    }

    // Check end
    // Use Math.ceil or minimal buffer for float precision
    if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 1) {
      nextBtn.classList.add("is-disabled");
    } else {
      nextBtn.classList.remove("is-disabled");
    }
  };

  if (row) {
    row.addEventListener("scroll", updateArrows);
    // Initial check
    setTimeout(updateArrows, 100);
    // Re-check on window resize
    window.addEventListener("resize", updateArrows);
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

const initDrawer = () => {
  const toggle = $("[data-menu-toggle]");
  const drawer = $("#channel-drawer");
  const list = $("#drawer-list");
  
  if (!toggle || !drawer) return;

  const header = $("#drawer-channels-header");
  const arrow = header?.querySelector(".arrow-icon");

  if (header) {
    header.addEventListener("click", () => {
      list.classList.toggle("is-collapsed");
      if (arrow) arrow.classList.toggle("is-collapsed");
    });
  }

  // Populate drawer list from pills
  if (list && list.children.length === 0) {
    const pills = $$("[data-channel]");
    pills.forEach(pill => {
      const channel = pill.dataset.channel;
      if (channel === "All Channels") return;
      
      const img = pill.querySelector("img");
      const imgSrc = img ? img.src : "";
      
      const btn = document.createElement("button");
      btn.className = "drawer-item has-bg";
      btn.innerHTML = `
        <img src="${imgSrc}" class="drawer-item-bg" alt="">
        <span class="drawer-item-text">${channel}</span>
      `;
      
      btn.addEventListener("click", () => {
        // Trigger the original pill click
        pill.click();
        close();
      });
      
      list.appendChild(btn);
    });
  }

  const close = () => drawer.classList.add("is-hidden");
  const open = () => drawer.classList.remove("is-hidden");

  toggle.addEventListener("click", () => {
    if (drawer.classList.contains("is-hidden")) open();
    else close();
  });

  document.addEventListener("click", (event) => {
    if (drawer.classList.contains("is-hidden")) return;
    if (drawer.contains(event.target) || toggle.contains(event.target)) return;
    close();
  });
};

initNav();
initHero();
initChannels();
initDock();
initFilters();
initDrawer();
