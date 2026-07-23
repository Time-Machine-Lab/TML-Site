import { createPreviewController } from "./app-controller.js";
import { ROUTES } from "./content.js";
import { PREVIEW_RESULT_CARDS } from "./result-cards.js";
import { buildConsequenceModel, buildQuestionModel, buildResultModel } from "./renderer.js?v=20260723-cinematic-5";
import { museumAssetsForCard } from "./museum-assets.js";
import { buildChoiceLayout, buildScenePresentation } from "./scene-presentation.js?v=20260723-cinematic-5";

const ROUTE_HERO = Object.freeze({
  "late-work": "./assets/life-swap/hero-office-v2.png",
  "revived-friend": "./assets/life-swap/intro/flashbacks/message-midnight.png",
  "family-care": "./assets/life-swap/intro/flashbacks/family-dinner-question-v2.png",
  "group-assignment": "./assets/life-swap/intro/backstage-choices.png",
});

const APPROVED_CARD_ART = new Set([
  "revived-friend.ordinary.03",
  "revived-friend.ordinary.04",
]);

const controller = createPreviewController({
  routes: ROUTES,
  manifest: PREVIEW_RESULT_CARDS,
  sessionStorage: window.sessionStorage,
  collectionStorage: window.localStorage,
});

const screens = new Map(
  [...document.querySelectorAll("[data-screen]")].map((screen) => [screen.dataset.screen, screen]),
);
const routeId = new URL(window.location.href).searchParams.get("route");
let cardRevealed = false;

function showOnly(name) {
  for (const [screenName, screen] of screens) screen.hidden = screenName !== name;
  document.body.dataset.activeScreen = name;
}

function text(selector, value) {
  const target = document.querySelector(selector);
  if (target) target.textContent = value ?? "";
}

function renderQuestion(snapshot) {
  showOnly("question");
  const model = buildQuestionModel(snapshot.playState, snapshot.route);
  const scene = buildScenePresentation(model, {
    routeId: model.routeId,
    progress: snapshot.playState.progress,
  });
  text("[data-scenario-status]", `${model.routeTitle} · ${model.progressLabel}`);
  text("[data-scene-time]", scene.timeLabel);
  text("[data-scenario-title]", scene.headline);
  text("[data-decision-prompt]", scene.decisionPrompt);
  const storyBeats = document.querySelector("[data-story-beats]");
  storyBeats.replaceChildren(...scene.storyBeats.map((beat) => {
    const row = document.createElement("div");
    row.className = "story-beat";
    const label = document.createElement("p");
    label.className = "story-beat__label";
    label.textContent = beat.label;
    const body = document.createElement("p");
    body.className = "story-beat__body";
    body.textContent = beat.body;
    row.append(label, body);
    return row;
  }));
  const hero = document.querySelector("[data-scenario-hero]");
  hero.src = ROUTE_HERO[snapshot.route.id];
  hero.alt = `${snapshot.route.title}的奶蛙交换现场`;
  const stack = document.querySelector("[data-choice-stack]");
  const layout = buildChoiceLayout(model.options.length);
  stack.dataset.choiceLayout = layout.name;
  stack.dataset.choiceColumns = String(layout.columns);
  stack.replaceChildren(...model.options.map((option, index) => {
    const itemLayout = layout.items[index];
    const button = document.createElement("button");
    button.className = "choice-row";
    button.type = "button";
    button.dataset.optionId = option.id;
    button.dataset.choiceSpan = String(itemLayout.span);
    if (itemLayout.endsRow) button.dataset.rowEnd = "true";
    const key = document.createElement("span");
    key.className = "choice-key";
    key.textContent = String.fromCharCode(65 + index);
    const copy = document.createElement("span");
    copy.className = "choice-copy";
    const headline = scene.choiceHeadlines[option.id];
    if (headline) {
      const title = document.createElement("span");
      title.className = "choice-title";
      title.textContent = headline;
      copy.append(title);
    }
    const label = document.createElement("span");
    label.className = headline ? "choice-label" : "choice-label choice-label--solo";
    label.textContent = option.label;
    copy.append(label);
    button.append(key, copy);
    return button;
  }));
}

function renderConsequence(snapshot) {
  showOnly("outcome");
  const model = buildConsequenceModel(snapshot.playState);
  const image = document.querySelector("[data-outcome-image]");
  image.src = ROUTE_HERO[snapshot.route.id];
  image.alt = `${snapshot.route.title}选择后发生的现场变化`;
  const caption = document.querySelector(".outcome-caption");
  const consequenceBeat = document.querySelector(".outcome-beat--consequence");
  const hasDistinctResponse = Boolean(model.summary);
  caption.dataset.outcomeMode = hasDistinctResponse ? "action-and-response" : "single-beat";
  consequenceBeat.hidden = !hasDistinctResponse;
  text("[data-outcome-action-label]", hasDistinctResponse ? "你做了" : "现场变化");
  text("[data-outcome-action]", model.action);
  text("[data-outcome-consequence]", model.summary);
  const action = document.querySelector("[data-action='seal-outcome'] span:first-child");
  if (action) action.textContent = "继续下一幕";
}

function resultImage(cardId) {
  const museumAssets = museumAssetsForCard(cardId);
  if (museumAssets) return museumAssets.storyImage;
  return APPROVED_CARD_ART.has(cardId)
    ? `./assets/cards/${cardId}.png`
    : "./assets/life-swap/characters-v3/locked-silhouette.png";
}

function renderResult(snapshot) {
  showOnly("card-reveal");
  const model = buildResultModel(snapshot.result);
  const sealed = document.querySelector("[data-card-stage='sealed']");
  const revealed = document.querySelector("[data-card-stage='revealed']");
  sealed.hidden = cardRevealed;
  revealed.hidden = !cardRevealed;
  text("[data-ending-card-title]", cardRevealed ? model.title : "密封结局卡");
  if (!cardRevealed) return;
  const image = document.querySelector("[data-ending-card-image]");
  image.src = resultImage(model.cardId);
  image.alt = model.title;
  text("[data-ending-card-level]", model.tier === "hidden" ? "隐藏身份" : model.tier === "rare" ? "稀有馆藏" : "常设馆藏");
  text("[data-ending-card-conclusion]", model.conclusion);
  const entry = snapshot.collection.cards[model.cardId];
  text("[data-ending-card-acquisition]", entry?.editionCount === 1 ? "NEW · 首次入馆" : `再版 ×${entry?.editionCount ?? 1}`);
  const museum = document.querySelector("[data-action='open-museum']");
  museum.hidden = false;
  museum.href = `./museum.html?new=${encodeURIComponent(model.cardId)}`;
}

function render() {
  const snapshot = controller.snapshot();
  if (snapshot.screen === "question") renderQuestion(snapshot);
  else if (snapshot.screen === "consequence") renderConsequence(snapshot);
  else if (snapshot.screen === "result") renderResult(snapshot);
  else showOnly("invalid-scenario");
}

if (routeId && ROUTES[routeId]) {
  controller.selectRoute(routeId);
  if (controller.snapshot().screen === "result") controller.replay();
  render();
} else {
  showOnly("invalid-scenario");
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.dataset.optionId) {
    controller.choose(button.dataset.optionId);
    render();
    return;
  }
  if (button.dataset.action === "seal-outcome") {
    controller.continue();
    cardRevealed = false;
    render();
    return;
  }
  if (button.dataset.action === "reveal-ending-card") {
    cardRevealed = true;
    render();
    return;
  }
  if (button.dataset.action === "replay") {
    controller.replay();
    cardRevealed = false;
    render();
  }
});

window.__NAIWA_MERGED_PREVIEW__ = Object.freeze({ snapshot: () => controller.snapshot() });
