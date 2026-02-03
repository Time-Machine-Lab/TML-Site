const initGalleryCards = () => {
  const cards = document.querySelectorAll(".gallery-card");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => card.classList.add("is-hovered"));
    card.addEventListener("mouseleave", () => card.classList.remove("is-hovered"));
  });
};

const randomizeGalleryLayout = () => {
  const cards = document.querySelectorAll(".gallery-card");
  if (cards.length === 0) return;

  // Clear existing generated layout (keep manual ones if any)
  // Since we are regenerating, we might as well clear all to ensure a fresh random layout
  // unless they were hardcoded in HTML.
  // For now, assume we want a fresh layout every time or on reload.
  cards.forEach(card => card.classList.remove("span-2x2"));

  const totalColumns = 8;
  
  // Optimization:
  // 1. Increased minDistance to 26 per user request to reduce frequency of large cards.
  // 2. randomRange stays at 10 to provide good variety.
  // 3. Logic to avoid placing 2x2 cards on the last column to prevent awkward gaps.
  const minDistance = 26; 
  const randomRange = 10;
  
  // Start earlier to give immediate visual impact
  let nextTargetIndex = Math.floor(Math.random() * 4) + 1;

  for (let i = 0; i < cards.length; i++) {
    // Safety check: Don't process if we are too close to the end
    if (i > cards.length - 8) break;

    // Check if we reached the target index
    if (i >= nextTargetIndex) {
      const colIndex = i % totalColumns;
      
      // Constraint: Don't place on the last column (index 7 in 0-7)
      // A 2x2 card at col 7 would wrap to next row col 1, leaving col 7 empty.
      // While dense flow handles it, it looks cleaner if we avoid it.
      if (colIndex === totalColumns - 1) {
        // Skip this slot, try the very next one
        nextTargetIndex = i + 1;
        continue;
      }

      // Apply the class
      cards[i].classList.add("span-2x2");
      
      // Calculate next target
      // Add randomness to the gap
      const gap = minDistance + Math.floor(Math.random() * randomRange);
      nextTargetIndex = i + gap;
    }
  }
};

const initGallery = () => {
  // Initialize hover effects
  initGalleryCards();
  // Apply random layout
  randomizeGalleryLayout();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGallery);
} else {
  initGallery();
}
