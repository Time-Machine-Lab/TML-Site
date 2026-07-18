import { CHOICES, LIFE_SWAP_SLICE, OUTCOMES } from "./content.js";
import { chooseLifeSwap, createLifeSwapState, resetLifeSwap, startLifeSwap } from "./state.js";

const screens = new Map(
  [...document.querySelectorAll("[data-screen]")].map((element) => [element.dataset.screen, element]),
);
const choiceById = new Map(CHOICES.map((choice) => [choice.id, choice]));
const fallbackImage = "./assets/naiwa-original.png";
let state = createLifeSwapState();

const copyBindings = {
  "show-name": LIFE_SWAP_SLICE.showName,
  "home-title": LIFE_SWAP_SLICE.homeTitle,
  "home-intro": LIFE_SWAP_SLICE.homeIntro,
  "question-eyebrow": LIFE_SWAP_SLICE.questionEyebrow,
  question: LIFE_SWAP_SLICE.question,
};

for (const [binding, value] of Object.entries(copyBindings)) {
  const element = document.querySelector(`[data-copy="${binding}"]`);
  if (element) element.textContent = value;
}

function focusScreen(screen) {
  const heading = screen.querySelector("h1");
  if (!heading) return;
  heading.tabIndex = -1;
  heading.focus({ preventScroll: true });
}

function renderOutcome(choiceId) {
  const outcome = OUTCOMES[choiceId];
  const choice = choiceById.get(choiceId);
  const image = document.querySelector("[data-outcome-image]");

  image.src = outcome.image;
  image.alt = outcome.alt;
  image.onerror = () => {
    image.onerror = null;
    image.src = fallbackImage;
  };

  document.querySelector("[data-outcome-choice]").textContent = `${choice.key} · ${choice.label}`;
  document.querySelector("[data-outcome-title]").textContent = outcome.title;
  document.querySelector("[data-outcome-punchline]").textContent = outcome.punchline;
  document.querySelector("[data-outcome-consequence]").textContent = outcome.consequence;
  document.querySelector("[data-outcome-route]").textContent = outcome.route;
}

function render({ shouldFocus = true } = {}) {
  for (const [name, screen] of screens) {
    screen.hidden = name !== state.screen;
  }

  if (state.screen === "outcome") renderOutcome(state.selectedChoice);
  document.body.dataset.activeScreen = state.screen;

  if (shouldFocus) focusScreen(screens.get(state.screen));
}

for (const button of document.querySelectorAll("[data-choice]")) {
  button.addEventListener("click", () => {
    state = chooseLifeSwap(state, button.dataset.choice);
    render();
  });
}

document.querySelector("[data-action='start']").addEventListener("click", () => {
  state = startLifeSwap(state);
  render();
});

document.querySelector("[data-action='replay']").addEventListener("click", () => {
  state = resetLifeSwap(state);
  render();
});

render({ shouldFocus: false });
