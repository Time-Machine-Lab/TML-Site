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

// Add scroll listener for header transparency
const initHeaderScroll = () => {
  const header = document.querySelector(".header");
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll);
  // Initial check
  handleScroll();
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

// New: Lumière Switcher Logic (Stack Effect)
const initHeroSwitcher = () => {
  const navItems = $$(".l-nav-item");
  const cards = $$(".l-switcher-card");
  const bgImage = $(".l-hero-img"); // Main background image
  
  if (!navItems.length || !cards.length) return;

  let currentIndex = 0;
  let interval;
  const total = cards.length;

  const updateStackClasses = () => {
    cards.forEach((card, index) => {
      // Calculate distance from current index in a loop
      // We want:
      // index == currentIndex -> active (0)
      // index == (currentIndex + 1) % total -> next (1)
      // index == (currentIndex + 2) % total -> next-2 (2)
      // others -> hidden
      
      // Calculate visual position (0 = active, 1 = next, etc.)
      // (index - currentIndex + total) % total
      // But we need to handle the wrap around correctly for the "stack" logic.
      // Actually, simple circular distance is enough if we only show 3 cards.
      
      let dist = (index - currentIndex + total) % total;
      
      card.className = "l-switcher-card"; // reset
      
      if (dist === 0) {
        card.classList.add("active");
      } else if (dist === 1) {
        card.classList.add("next");
      } else if (dist === 2) {
        card.classList.add("next-2");
      } else {
        card.classList.add("hidden");
      }
    });
  };

  const switchImage = (index) => {
    currentIndex = index;
    
    // Update Nav
    navItems.forEach((item, i) => {
      if (i === index) item.classList.add("active");
      else item.classList.remove("active");
    });

    // Update Stack
    updateStackClasses();

    // Update Main Background
    // Get image source from the active card's img
    const activeCardImg = cards[index].querySelector("img");
    if (bgImage && activeCardImg) {
      bgImage.style.opacity = 0;
      setTimeout(() => {
        bgImage.src = activeCardImg.src;
        bgImage.onload = () => {
          bgImage.style.opacity = 1;
        };
      }, 200);
    }
  };

  const startAutoPlay = () => {
    interval = setInterval(() => {
      let next = (currentIndex + 1) % total;
      switchImage(next);
    }, 5000); // 5s interval
  };

  const stopAutoPlay = () => clearInterval(interval);

  // Event Listeners
  navItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      stopAutoPlay();
      switchImage(index);
      startAutoPlay();
    });
  });
  
  // Allow clicking on "next" cards to switch to them
  cards.forEach((card, index) => {
      card.addEventListener("click", () => {
          if (index !== currentIndex) {
             stopAutoPlay();
             switchImage(index);
             startAutoPlay();
          }
      });
  });

  // Start
  updateStackClasses(); // Initial state
  startAutoPlay();
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
  if (!dockBtns.length) return;
  const masonry = document.body; // or main wrapper

  dockBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      activate(dockBtns, btn);
      const sort = btn.dataset.sort;
      // Just demo effect:
      if (sort === "Trending") masonry.dataset.grid = "medium";
      else if (sort === "Latest") masonry.dataset.grid = "small";
      else masonry.dataset.grid = "large";
    });
  });
};

const initTheme = () => {
  const toggle = $("#theme-toggle");
  if (!toggle) return;

  const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
  toggle.checked = currentTheme === "light";

  toggle.addEventListener("change", () => {
    const theme = toggle.checked ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  });
};

const initDrawer = () => {
  const btn = $("[data-menu-toggle]");
  const drawer = $("#channel-drawer");
  const drawerList = $("#drawer-list");
  
  if (!btn || !drawer) return;

  // Toggle drawer visibility
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    drawer.classList.toggle("is-hidden");
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!drawer.contains(e.target) && !btn.contains(e.target)) {
      drawer.classList.add("is-hidden");
    }
  });

  // Populate drawer list from existing channel pills (source of truth)
  // We'll clone the data but use drawer-item styling
  if (drawerList) {
    const sourcePills = $$(".channel-pill").filter(p => !p.classList.contains("channel-pill--all"));
    // Clear initial
    drawerList.innerHTML = "";
    
    sourcePills.forEach(pill => {
      const channelName = pill.dataset.channel;
      // Create button
      const item = document.createElement("button");
      item.className = "drawer-item has-bg";
      item.type = "button";
      
      // Clone icon as background
      const pillIconImg = pill.querySelector(".pill-icon img");
      if (pillIconImg) {
        const bgImg = document.createElement("img");
        bgImg.className = "drawer-item-bg";
        bgImg.src = pillIconImg.src;
        bgImg.alt = channelName;
        item.appendChild(bgImg);
      }
      
      // Add text
      const textSpan = document.createElement("span");
      textSpan.className = "drawer-item-text";
      textSpan.textContent = channelName;
      item.appendChild(textSpan);
      
      // Add click handler to sync with main pills
      item.addEventListener("click", () => {
        // Trigger click on original pill
        pill.click();
        drawer.classList.add("is-hidden");
      });
      
      drawerList.appendChild(item);
    });
  }

  // Toggle channel list collapse
  const channelsHeader = $("#drawer-channels-header");
  if (channelsHeader && drawerList) {
    channelsHeader.addEventListener("click", () => {
      drawerList.classList.toggle("is-collapsed");
      const arrow = channelsHeader.querySelector(".arrow-icon");
      if (arrow) arrow.classList.toggle("is-collapsed");
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initHeaderScroll(); // Add this
  initHero();
  initHeroSwitcher(); // Add this
  initChannels();
  initDock();
  initTheme();
  initDrawer();
});
