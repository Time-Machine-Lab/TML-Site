import { createPreviewController } from "./app-controller.js";
import { ROUTES } from "./content.js";
import { PREVIEW_RESULT_CARDS } from "./result-cards.js";
import {
  buildConsequenceModel,
  buildQuestionModel,
  buildResultModel,
  buildRouteSelectorModel,
} from "./renderer.js";

const root = document.querySelector("[data-app]");
if (!root) throw new Error("preview app root is missing");

const controller = createPreviewController({
  routes: ROUTES,
  manifest: PREVIEW_RESULT_CARDS,
  sessionStorage: window.sessionStorage,
  collectionStorage: window.localStorage,
});
const restoredOnLoad = controller.snapshot().activeRouteId !== null;

function element(selector) {
  const found = root.querySelector(selector);
  if (!found) throw new Error(`preview element is missing: ${selector}`);
  return found;
}

function setText(selector, value) {
  element(selector).textContent = value ?? "";
}

function showOnly(screenName) {
  for (const screen of root.querySelectorAll("[data-screen]")) {
    screen.hidden = screen.dataset.screen !== screenName;
  }
}

function routeButton(model) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "route-card";
  button.dataset.routeId = model.id;
  const title = document.createElement("strong");
  title.textContent = model.title;
  const subtitle = document.createElement("span");
  subtitle.textContent = model.subtitle;
  button.append(title, subtitle);
  return button;
}

function renderRouteSelector() {
  showOnly("route-select");
  element("[data-route-list]").replaceChildren(
    ...buildRouteSelectorModel(ROUTES).map(routeButton),
  );
}

function renderQuestion(snapshot) {
  showOnly("question");
  const model = buildQuestionModel(snapshot.playState, snapshot.route);
  setText("[data-progress]", model.progressLabel);
  setText("[data-route-title]", model.routeTitle);
  setText("[data-question-prompt]", model.prompt);
  setText("[data-question-context]", model.context);

  element("[data-scene-objects]").replaceChildren(...model.sceneObjects.map((name) => {
    const item = document.createElement("li");
    item.textContent = name;
    return item;
  }));
  element("[data-option-list]").replaceChildren(...model.options.map((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-card";
    button.dataset.optionId = option.id;
    button.dataset.intent = option.intent;
    button.textContent = option.label;
    return button;
  }));
}

function renderConsequence(snapshot) {
  showOnly("consequence");
  const model = buildConsequenceModel(snapshot.playState);
  setText("[data-consequence-heading]", model.heading);
  setText("[data-consequence-action]", model.action);
  setText("[data-consequence-reaction]", model.reaction);
  setText("[data-consequence-change]", model.visibleStateChange);
}

function renderResult(snapshot) {
  showOnly("result");
  const model = buildResultModel(snapshot.result);
  setText("[data-result-tier]", model.tier === "rare" ? "稀有结果" : "本局结果");
  setText("[data-result-title]", model.title);
  setText("[data-result-conclusion]", model.conclusion);
  setText("[data-result-skill]", model.coreSkill);
  setText("[data-result-side-effect]", model.sideEffect);
  setText("[data-result-share]", model.shareCopy);
  setText("[data-result-key]", model.resultKey);
  const slot = element("[data-asset-slot]");
  slot.dataset.slotKey = model.assetSlot.slotKey;
  slot.dataset.contractVersion = String(model.assetSlot.contractVersion);
  slot.setAttribute("aria-label", model.assetSlotLabel);
  element("[data-result-evidence]").replaceChildren(...model.evidenceItems.map((text) => {
    const item = document.createElement("li");
    item.textContent = text;
    return item;
  }));
}

function render(status = "") {
  const snapshot = controller.snapshot();
  if (snapshot.screen === "route-select") renderRouteSelector();
  if (snapshot.screen === "question") renderQuestion(snapshot);
  if (snapshot.screen === "consequence") renderConsequence(snapshot);
  if (snapshot.screen === "result") renderResult(snapshot);
  setText("[data-status]", status);
}

root.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button || !root.contains(button)) return;
  try {
    if (button.dataset.routeId) {
      controller.selectRoute(button.dataset.routeId);
      render("路线已载入；每个选择都会先展示可见后果。");
      return;
    }
    if (button.dataset.optionId) {
      controller.choose(button.dataset.optionId);
      render("选择已确认，先看现场变化。");
      return;
    }
    if (button.dataset.action === "continue") {
      controller.continue();
      render(controller.snapshot().screen === "result" ? "本局结果已按选择轨迹确定。" : "后果已记录。");
      return;
    }
    if (button.dataset.action === "back") {
      controller.back();
      render("已返回到玩家可重新选择的节点。");
      return;
    }
    if (button.dataset.action === "replay") {
      controller.replay();
      render("已重开同一路线，旧的完成实例仍保留。" );
      return;
    }
    if (button.dataset.action === "routes") {
      controller.showRoutes();
      render("已返回路线选择。");
    }
  } catch (error) {
    setText("[data-status]", `预览状态未改变：${error.message}`);
  }
});

render(restoredOnLoad ? "已从本机恢复上一次隔离预览进度。" : "隔离预览不会改动生产入口。");

window.__NAIWA_LIFE_SWAP_V2_PREVIEW__ = Object.freeze({
  snapshot: () => controller.snapshot(),
});
