const modal = document.getElementById("preview-modal");
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalArtist = document.getElementById("modal-artist");

const openModal = (src, title, artist) => {
  if (!modal) return;
  modalImage.src = src;
  modalImage.alt = title || "Artwork";
  modalTitle.textContent = title || "Artwork";
  modalArtist.textContent = artist || "Artist";
  modal.classList.remove("is-hidden");
  document.body.classList.add("no-scroll");
};

const closeModal = () => {
  if (!modal) return;
  modal.classList.add("is-hidden");
  document.body.classList.remove("no-scroll");
};

const initPreview = () => {
  const cards = document.querySelectorAll(".gallery-card");
  cards.forEach((card) => {
    card.addEventListener("click", (event) => {
      event.preventDefault();
      const img = card.querySelector("img");
      const title = card.dataset.title || img?.alt;
      const artist = card.dataset.artist;
      openModal(img?.src || "", title, artist);
    });
  });

  document.querySelectorAll("[data-close='modal']").forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
};

initPreview();
