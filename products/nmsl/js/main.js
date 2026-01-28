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
  const cards = $$(".hero-card");
  if (!cards.length) return;

  let index = 0;
  const setActive = (next) => {
    cards.forEach((card) => card.classList.remove("is-active"));
    cards[next].classList.add("is-active");
    index = next;
  };

  cards.forEach((card, i) => {
    card.addEventListener("click", () => setActive(i));
  });

  const nextBtn = $("[data-hero-next]");
  if (nextBtn) {
    nextBtn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      setActive((index + 1) % cards.length);
    });
  }

  setActive(0);

  setInterval(() => {
    setActive((index + 1) % cards.length);
  }, 6000);
};

const initChannels = () => {
  const pills = $$("[data-channel]");
  if (!pills.length) return;
  const title = $("#channel-heading");

  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      activate(pills, pill);
      if (title) title.textContent = pill.dataset.channel;
    });
  });
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

initNav();
initHero();
initChannels();
initDock();
