import { INTRO_PROMPT, INTRO_REVEAL_CUES, INTRO_ROUTES, INTRO_SHOW_COPY } from "./merged-intro-content.js";
import {
  buildScenarioHref,
  chooseIntroRoute,
  createIntroState,
  enterIntroChoices,
  PLAYABLE_SCENARIO_IDS,
  readyIntroReveal,
  replayIntro,
  revealIntroGuests,
  skipIntroReveal,
} from "./merged-intro-state.js";

const screens = new Map(
  [...document.querySelectorAll("[data-screen]")].map((element) => [element.dataset.screen, element]),
);
const shell = document.querySelector(".intro-shell");
const showScreen = screens.get("show");
const revealButton = document.querySelector("[data-action='reveal']");
const enterButton = document.querySelector("[data-action='enter']");
const skipButton = document.querySelector("[data-action='skip']");
const punchline = document.querySelector("[data-punchline]");
const openingCue = document.querySelector("[data-opening-cue]");
const guestReveals = [...document.querySelectorAll("[data-guest-reveal]")];
const guestVisuals = [...document.querySelectorAll("[data-guest-visual]")];
const openingImages = [...document.querySelectorAll("[data-opening-image]")];
const choosingScreen = screens.get("choosing");
const routeButtons = [...document.querySelectorAll("[data-route]")];
const flashbackImages = [...document.querySelectorAll("[data-flashback-image]")];
const liveRegion = document.querySelector("[data-live-region]");
const routeImage = document.querySelector("[data-route-image]");
const routeCopy = document.querySelector("[data-route-copy]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealReadyDelayMs = 780;
const openingAssetTimeoutMs = 1800;

let state = createIntroState();
let revealReadyRun = 0;
let routeCopyTimer = null;
let activePreviewId = "late-work";

for (const target of document.querySelectorAll("[data-intro-copy]")) {
  const copy = INTRO_SHOW_COPY[target.dataset.introCopy];
  if (typeof copy === "string") target.textContent = copy;
}

function screenKeyForState() {
  return ["welcome", "reveal-ready", "revealed"].includes(state.screen) ? "show" : state.screen;
}

function clearRevealReadyTimer() {
  revealReadyRun += 1;
}

function clearRouteCopyTimer() {
  if (routeCopyTimer === null) return;
  window.clearTimeout(routeCopyTimer);
  routeCopyTimer = null;
}

function focusElement(element) {
  if (!element) return;
  if (!(element instanceof HTMLButtonElement)) element.tabIndex = -1;
  element.focus({ preventScroll: true });
}

function activateDeferredImage(image) {
  if (!image || image.getAttribute("src")) return;
  const source = image.dataset.src;
  if (source) image.src = source;
}

function waitForImageDecode(image) {
  const waitForLoad = image.complete
    ? Promise.resolve()
    : new Promise((resolve, reject) => {
      image.addEventListener("load", resolve, { once: true });
      image.addEventListener("error", () => reject(new Error(`Image failed to load: ${image.currentSrc || image.src}`)), { once: true });
    });

  return waitForLoad.then(async () => {
    if (image.naturalWidth <= 0) throw new Error(`Image is incomplete: ${image.currentSrc || image.src}`);
    await image.decode();
    if (image.naturalWidth <= 0) throw new Error(`Image failed to decode: ${image.currentSrc || image.src}`);
  });
}

function wait(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

function renderShow() {
  const isReady = state.screen === "reveal-ready";
  const isRevealed = state.screen === "revealed";
  showScreen.dataset.showPhase = state.screen;
  revealButton.disabled = !isReady;
  revealButton.hidden = isRevealed;
  enterButton.hidden = !isRevealed;
  punchline.hidden = !isRevealed;
  openingCue.hidden = isRevealed;
  for (const reveal of guestReveals) reveal.setAttribute("aria-hidden", String(!isRevealed));
  for (const visual of guestVisuals) visual.setAttribute("aria-hidden", String(!isRevealed));
}

function setOpeningAssetState(assetState) {
  const isLoading = assetState === "loading";
  showScreen.dataset.openingAssetState = assetState;
  showScreen.setAttribute("aria-busy", String(isLoading));
  openingCue.textContent = assetState === "ready"
    ? INTRO_REVEAL_CUES.ready
    : isLoading
      ? INTRO_REVEAL_CUES.loading
      : INTRO_REVEAL_CUES.failed;
}

function renderRoute() {
  const route = INTRO_ROUTES[state.routeId];
  if (!route) return;
  clearRouteCopyTimer();
  routeImage.src = route.hero;
  routeImage.alt = route.alt;
  liveRegion.textContent = route.directorResponse;

  if (reducedMotion) {
    routeCopy.textContent = route.firstSceneTitle;
    routeCopy.classList.remove("is-director-beat");
    liveRegion.textContent = route.firstSceneTitle;
    return;
  }

  routeCopy.textContent = route.directorResponse;
  routeCopy.classList.add("is-director-beat");
  const routeId = route.id;
  routeCopyTimer = window.setTimeout(() => {
    if (state.screen !== "route" || state.routeId !== routeId) return;
    routeCopy.textContent = route.firstSceneTitle;
    routeCopy.classList.remove("is-director-beat");
    liveRegion.textContent = route.firstSceneTitle;
  }, 500);
}

function routeButton(routeId) {
  return routeButtons.find((button) => button.dataset.route === routeId) ?? null;
}

function setActivePreview(routeId, { announce = false, scroll = false } = {}) {
  const route = INTRO_ROUTES[routeId];
  const button = routeButton(routeId);
  if (!route || !button) return;

  activePreviewId = routeId;
  choosingScreen.dataset.activePreview = routeId;
  if (announce) liveRegion.textContent = `${route.previewTime}。${route.previewLine}。${route.previewNote}`;
  if (scroll && window.matchMedia("(max-width: 760px)").matches) {
    button.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "nearest", inline: "center" });
  }
}

function render({ focusTarget = null } = {}) {
  const activeScreen = screenKeyForState();
  for (const [screenName, screen] of screens) screen.hidden = screenName !== activeScreen;
  shell.dataset.activeScreen = state.screen;
  if (activeScreen === "show") renderShow();
  if (state.screen === "choosing") {
    for (const image of flashbackImages) activateDeferredImage(image);
    setActivePreview(activePreviewId);
    liveRegion.textContent = INTRO_PROMPT;
  }
  if (state.screen !== "route") clearRouteCopyTimer();
  if (state.screen === "route") renderRoute();
  if (focusTarget) window.requestAnimationFrame(() => focusElement(focusTarget));
}

async function scheduleRevealReady() {
  clearRevealReadyTimer();
  const run = revealReadyRun;
  setOpeningAssetState("loading");
  const minimumBeat = wait(reducedMotion ? 0 : revealReadyDelayMs);
  const openingVisualReady = Promise.all(openingImages.map(waitForImageDecode));
  const outcome = await Promise.race([
    Promise.all([minimumBeat, openingVisualReady]).then(() => "ready", () => "failed"),
    wait(openingAssetTimeoutMs).then(() => "timeout"),
  ]);

  if (run !== revealReadyRun || state.screen !== "welcome") return;
  const imagesAreComplete = openingImages.every((image) => image.complete && image.naturalWidth > 0);
  if (outcome !== "ready" || !imagesAreComplete) {
    setOpeningAssetState(outcome);
    liveRegion.textContent = "嘉宾画面还没到位，可以跳过开场。";
    return;
  }

  setOpeningAssetState("ready");
  state = readyIntroReveal(state);
  liveRegion.textContent = "嘉宾就位，可以揭晓了。";
  render();
}

revealButton.addEventListener("click", () => {
  state = revealIntroGuests(state);
  liveRegion.textContent = `${INTRO_SHOW_COPY.humanName}，${INTRO_SHOW_COPY.humanStatus}。${INTRO_SHOW_COPY.naiwaName}，${INTRO_SHOW_COPY.naiwaStatus}。${INTRO_SHOW_COPY.punchline}`;
  render({ focusTarget: enterButton });
});

enterButton.addEventListener("click", () => {
  state = enterIntroChoices(state);
  render({ focusTarget: screens.get("choosing").querySelector("[data-screen-focus]") });
});

skipButton.addEventListener("click", () => {
  clearRevealReadyTimer();
  state = skipIntroReveal(state);
  render({ focusTarget: screens.get("choosing").querySelector("[data-screen-focus]") });
});

for (const button of routeButtons) {
  const route = INTRO_ROUTES[button.dataset.route];
  const image = button.querySelector("[data-flashback-image]");
  const time = button.querySelector("[data-route-time]");
  const line = button.querySelector("[data-route-line]");
  const note = button.querySelector("[data-route-note]");
  if (route) {
    if (image) {
      image.dataset.src = route.previewHero;
      image.alt = route.previewAlt;
    }
    if (time) time.textContent = route.previewTime;
    if (line) line.textContent = route.previewLine;
    if (note) note.textContent = route.previewNote;
    button.setAttribute("aria-label", `${route.previewTime}，${route.previewLine}，${route.previewNote}。交给奶蛙`);
  }
  button.addEventListener("pointerenter", () => setActivePreview(button.dataset.route));
  button.addEventListener("focus", () => setActivePreview(button.dataset.route, { announce: true, scroll: true }));
  button.addEventListener("click", () => {
    const routeId = button.dataset.route;
    if (PLAYABLE_SCENARIO_IDS.includes(routeId)) {
      window.location.assign(buildScenarioHref(routeId));
      return;
    }

    setActivePreview(routeId);
    state = chooseIntroRoute(state, routeId);
    render({ focusTarget: screens.get("route").querySelector("[data-screen-focus]") });
  });
}

document.querySelector("[data-action='backstage']").addEventListener("click", () => {
  clearRouteCopyTimer();
  state = replayIntro(state);
  render({ focusTarget: routeButton(activePreviewId) });
});

render();
scheduleRevealReady();
