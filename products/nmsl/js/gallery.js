const initGalleryCards = () => {
  const cards = document.querySelectorAll(".gallery-card");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => card.classList.add("is-hovered"));
    card.addEventListener("mouseleave", () => card.classList.remove("is-hovered"));
  });
};

initGalleryCards();
