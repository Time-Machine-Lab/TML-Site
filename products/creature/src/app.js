import { PACKS } from "./game-content.js";
import { DEFAULT_BRAND, BRAND, applyBrandToDocument } from "./brand-config.js";
import {
  createPackSelectorState,
  selectPack,
  chooseOption,
  settleReaction,
  advanceFlow,
  resetCreature,
  currentToken,
} from "./creature-state.js";
import { calculateResult } from "./result-engine.js";
import {
  createResultViewState,
  renameResultView,
  setHistoryHighlight,
  clearHistoryHighlight,
  resetResultViewState,
  setPreviewMedia,
} from "./result-view-state.js";
import {
  renderResultPoster,
  shareResult,
  copyResultText,
  downloadResultPoster,
  buildSharePayload,
  buildPosterFilename,
} from "./share.js";

const appliedBrand = applyBrandToDocument(document, BRAND);
const brandTagline = document.querySelector("#brand-tagline");
if (brandTagline) {
  brandTagline.hidden = appliedBrand.tagline === DEFAULT_BRAND.tagline;
}

const demo = document.querySelector("#demo");
const experiment = document.querySelector(".experiment");
const mount = document.querySelector("#creature-mount");
const packSelector = document.querySelector("#pack-selector");
const selectorTitle = document.querySelector("#selector-title");
const packButtons = [...document.querySelectorAll("[data-pack-id]")];
const assetStatus = document.querySelector("#asset-status");
const mutationProgress = document.querySelector("#mutation-progress");
let progressSteps = [];
const questionPanel = document.querySelector("#question-panel");
const questionNumber = document.querySelector("#question-number");
const question = document.querySelector("#question");
const answerButtons = [...document.querySelectorAll("[data-answer-slot]")];
const mutationCallout = document.querySelector("#mutation-callout");
const mutationName = document.querySelector("#mutation-name");
const reaction = document.querySelector("#reaction");
const resultPanel = document.querySelector("#result-panel");
const resultTitle = document.querySelector("#result-title");
const resultName = resultTitle;
const resultSpeciesForm = document.querySelector("#result-species-form");
const resultDiagnosis = document.querySelector("#result-diagnosis");
const resultPreview = document.querySelector("#result-preview");
const resultPreviewStatus = document.querySelector("#result-preview-status");
const resultHistory = document.querySelector("#result-history");
const renameToggleButton = document.querySelector("#rename-toggle-button");
const renameControls = document.querySelector("#rename-controls");
const resultNameInput = document.querySelector("#result-name-input");
const renameSaveButton = document.querySelector("#rename-save-button");
const renameError = document.querySelector("#rename-error");
const resultSpecies = document.querySelector("#result-species");
const resultObservation = document.querySelector("#result-observation");
const resultWarning = document.querySelector("#result-warning");
const resultOrgans = document.querySelector("#result-organs");
const resultEvidence = document.querySelector("#result-evidence");
const shareButton = document.querySelector("#share-button");
const copyButton = document.querySelector("#copy-button");
const saveButton = document.querySelector("#save-button");
const replayButton = document.querySelector("#replay-button");
const shareStatus = document.querySelector("#share-status");
const manualCopy = document.querySelector("#manual-copy");
const manualCopyText = document.querySelector("#manual-copy-text");
const muteButton = document.querySelector("#mute-button");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

const SPECIAL_MUTATION_GROUPS = Object.freeze({
  "offline-camo": ["pet-camo"],
  "instant-reply-rig": ["pet-antenna", "pet-phone", "pet-sparks"],
});
const resultOperationButtons = Object.freeze({
  share: shareButton,
  copy: copyButton,
  save: saveButton,
});
const operationBusy = { share: false, copy: false, save: false };

let state = createPackSelectorState();
let mutationTimer = null;
let holdTimer = null;
let currentResult = null;
let resultView = resetResultViewState().state;
let historyRows = [];
let posterCache = null;
let posterPromise = null;
let posterPromiseContext = null;
let operationEpoch = 0;
let audioContext = null;
let muted = false;
let creatureReady = false;
let creatureLoadFailed = false;

function getCurrentQuestion() {
  return getSelectedQuestions()[state.questionIndex] ?? null;
}

function getSelectedQuestions() {
  if (
    !state.packId
    || !Object.hasOwn(PACKS, state.packId)
    || state.questionIds.length !== PACKS[state.packId].questions.length
    || state.questionIds.some((id, index) => id !== PACKS[state.packId].questions[index].id)
  ) {
    return [];
  }
  return PACKS[state.packId].questions;
}

function findOption(questionData, optionId) {
  return questionData?.options.find(({ id }) => id === optionId) ?? null;
}

function getTurnOption() {
  const questionData = getCurrentQuestion();
  if (!questionData) return null;

  const pendingId = state.pending?.optionId;
  if (pendingId) return findOption(questionData, pendingId);

  if (state.stage === "holding") {
    return findOption(questionData, state.decisions[state.questionIndex]?.optionId);
  }
  return null;
}

function visualState(option) {
  const isAcceptedQ1 = state.questionIndex === 0;
  let phase = state.stage === "question" && isAcceptedQ1 ? "idle" : "neutral";
  let branch = "none";
  let effect = "none";

  if (state.stage === "reacting" && option) {
    effect = option.effect;
    if (isAcceptedQ1) {
      phase = `mutating-${option.id}`;
      branch = option.id;
    }
  } else if (state.stage === "holding" && option && isAcceptedQ1) {
    phase = "mutated";
    branch = option.id;
  }

  return { phase, branch, effect };
}

function renderQuestion(questionData, selectedOption) {
  if (!questionData) {
    answerButtons.forEach((button) => {
      delete button.dataset.optionId;
      button.disabled = true;
      button.setAttribute("aria-pressed", "false");
    });
    return;
  }

  questionNumber.textContent = `第 ${state.questionIndex + 1} 题 / ${state.questionIds.length}`;
  question.textContent = questionData.prompt;

  answerButtons.forEach((button, index) => {
    const option = questionData.options[index];
    button.dataset.optionId = option.id;
    button.querySelector("span").textContent = option.label;
    button.querySelector("small").textContent = option.note;
    button.querySelector("i").textContent = String.fromCharCode(65 + index);
    button.setAttribute("aria-label", `${String.fromCharCode(65 + index)}：${option.label}。${option.note}`);
    button.disabled = !creatureReady || state.stage !== "question";
    button.setAttribute("aria-pressed", String(option.id === selectedOption?.id));
  });
}

function syncProgressSteps() {
  const questionIds = state.questionIds;
  const isCurrent = progressSteps.length === questionIds.length
    && progressSteps.every((step, index) => step.dataset.questionId === questionIds[index]);
  if (isCurrent) return;

  progressSteps = questionIds.map((questionId, index) => {
    const step = document.createElement("li");
    step.dataset.progressStep = String(index + 1);
    step.dataset.questionId = questionId;
    return step;
  });
  mutationProgress.style.setProperty("--progress-count", String(questionIds.length || 7));
  mutationProgress.replaceChildren(...progressSteps);
}

function renderProgress() {
  syncProgressSteps();
  mutationProgress.hidden = state.stage === "selecting-pack";
  progressSteps.forEach((step, index) => {
    const complete = index < state.mutations.length;
    step.classList.toggle("is-complete", complete);
    step.setAttribute(
      "aria-label",
      `第 ${index + 1} 次错误进化，${complete ? "已完成" : "未完成"}`,
    );
  });
  mutationProgress.setAttribute(
    "aria-label",
    `错误进化进度，已完成 ${state.mutations.length} / ${state.questionIds.length}`,
  );
}

function renderPackSelector() {
  const selectingPack = state.stage === "selecting-pack";
  packSelector.hidden = !selectingPack;
  packButtons.forEach((button) => {
    button.disabled = !creatureReady || state.stage !== "selecting-pack";
  });
  assetStatus.classList.toggle("is-error", creatureLoadFailed);
  assetStatus.textContent = creatureLoadFailed
    ? "本地角色加载失败，暂时不能开始。请刷新页面再试。"
    : creatureReady
      ? "角色已就位，选一条就开养。"
      : "正在检查本地角色…";
}

function syncResultHighlight() {
  demo.dataset.highlightOrgan = resultView.highlightOrgan ?? "";
  historyRows.forEach((historyRow) => {
    historyRow.classList.toggle(
      "is-highlighted",
      historyRow.dataset.organId === resultView.highlightOrgan,
    );
  });
}

function updateResultHighlight(nextView) {
  if (!nextView || nextView === resultView) return;
  resultView = nextView;
  syncResultHighlight();
}

function moveHistoryFocus(currentIndex, key) {
  if (!historyRows.length) return;
  let nextIndex = currentIndex;
  if (key === "ArrowDown") nextIndex = (currentIndex + 1) % historyRows.length;
  if (key === "ArrowUp") nextIndex = (currentIndex - 1 + historyRows.length) % historyRows.length;
  if (key === "Home") nextIndex = 0;
  if (key === "End") nextIndex = historyRows.length - 1;

  historyRows.forEach((historyRow) => {
    historyRow.tabIndex = -1;
  });
  historyRows[nextIndex].tabIndex = 0;
  historyRows[nextIndex].focus({ preventScroll: true });
}

function renderResultHistory() {
  historyRows = resultView.history.map((row, index) => {
    const historyRow = document.createElement("li");
    historyRow.className = "result-history__row";
    historyRow.dataset.organId = row.organId;
    historyRow.tabIndex = index === 0 ? 0 : -1;
    historyRow.setAttribute("aria-label", row.accessibleLabel);

    const choice = document.createElement("span");
    choice.className = "result-history__choice";
    choice.textContent = row.choiceContext;
    const outcome = document.createElement("span");
    outcome.className = "result-history__outcome";
    outcome.textContent = row.outcome;
    historyRow.replaceChildren(choice, outcome);

    historyRow.addEventListener("pointerenter", () => {
      updateResultHighlight(setHistoryHighlight(resultView, row.organId));
    });
    historyRow.addEventListener("pointerleave", () => {
      updateResultHighlight(clearHistoryHighlight(resultView));
    });
    historyRow.addEventListener("focusin", () => {
      updateResultHighlight(setHistoryHighlight(resultView, row.organId));
    });
    historyRow.addEventListener("focusout", (event) => {
      if (!resultHistory.contains(event.relatedTarget)) {
        updateResultHighlight(clearHistoryHighlight(resultView));
      }
    });
    historyRow.addEventListener("keydown", (event) => {
      if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      moveHistoryFocus(index, event.key);
    });
    return historyRow;
  });

  resultHistory.replaceChildren(...historyRows);
  syncResultHighlight();
}

function renderResultMediaState() {
  const messages = {
    pending: `正在准备「${resultView.name}」的结果卡…`,
    ready: `「${resultView.name}」的结果卡已准备好。`,
    "text-only": `「${resultView.name}」的文字结果卡已准备好。`,
    unavailable: "结果卡暂时不可用，仍可复制文案或打开文字分享。",
    idle: "",
  };
  resultPreview.dataset.previewStatus = resultView.preview.status;
  resultPreview.setAttribute(
    "aria-label",
    messages[resultView.preview.status] || "结果卡状态未知",
  );
  resultPreviewStatus.textContent = messages[resultView.preview.status] || "";

  shareButton.disabled = operationBusy.share || !resultView.eligibility.systemShare;
  copyButton.disabled = operationBusy.copy || !resultView.eligibility.copyText;
  saveButton.disabled = operationBusy.save || !resultView.eligibility.saveImage;
  replayButton.disabled = !resultView.eligibility.replay;
}

function renderResultReport() {
  if (!currentResult || !resultView.result) return;

  resultName.textContent = resultView.name;
  resultSpeciesForm.textContent = resultView.speciesForm;
  resultDiagnosis.textContent = resultView.diagnosis;
  resultSpecies.textContent = currentResult.species;
  resultObservation.textContent = currentResult.observation;
  resultWarning.textContent = currentResult.careWarning;
  resultOrgans.textContent = currentResult.organs.map(({ organName }) => organName).join("、");
  resultEvidence.textContent = currentResult.evidence.join("；");
  resultNameInput.value = resultView.name;
  renderResultMediaState();
  renderResultHistory();
}

function render() {
  const questionData = getCurrentQuestion();
  const selectedOption = getTurnOption();
  const visual = visualState(selectedOption);
  const showingSelector = state.stage === "selecting-pack";
  const showingResult = state.stage === "result";

  demo.dataset.stage = state.stage;
  demo.dataset.phase = visual.phase;
  demo.dataset.branch = visual.branch;
  demo.dataset.effect = visual.effect;
  demo.dataset.mutations = state.mutations.join(" ");
  demo.dataset.ending = showingResult ? currentResult?.id ?? "" : "";
  demo.dataset.highlightOrgan = showingResult ? resultView.highlightOrgan ?? "" : "";
  questionPanel.hidden = showingSelector || showingResult;
  resultPanel.hidden = !showingResult;
  experiment.setAttribute(
    "aria-labelledby",
    showingSelector ? "selector-title" : showingResult ? "result-title" : "question",
  );
  reaction.textContent = state.reaction ?? "";

  const showMutation = state.stage === "holding" && Boolean(selectedOption);
  mutationCallout.hidden = !showMutation;
  mutationName.textContent = showMutation ? selectedOption.organName : "";

  renderPackSelector();
  renderProgress();
  renderQuestion(questionData, selectedOption);
  if (showingResult) renderResultReport();
}

function getAudioContext() {
  if (!audioContext) {
    const AudioEngine = window.AudioContext || window.webkitAudioContext;
    if (AudioEngine) audioContext = new AudioEngine();
  }
  return audioContext;
}

function warmAudioContext() {
  if (muted) return;
  try {
    const context = getAudioContext();
    if (!context || context.state !== "suspended") return;
    const resume = context.resume();
    if (resume && typeof resume.catch === "function") resume.catch(() => {});
  } catch {
    audioContext = null;
  }
}

function playMutationSound(option) {
  if (muted) return;
  const context = getAudioContext();
  if (!context) return;
  if (context.state === "suspended") context.resume().catch(() => {});

  const now = context.currentTime;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const movesOutward = option.axes.output > 0;
  oscillator.type = movesOutward ? "square" : "triangle";
  oscillator.frequency.setValueAtTime(movesOutward ? 310 : 190, now);
  oscillator.frequency.exponentialRampToValueAtTime(movesOutward ? 680 : 96, now + 0.22);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.06, now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.3);
}

function playResetSound() {
  if (muted) return;
  const context = getAudioContext();
  if (!context) return;
  const now = context.currentTime;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(270, now);
  oscillator.frequency.exponentialRampToValueAtTime(430, now + 0.1);
  gain.gain.setValueAtTime(0.04, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + 0.15);
}

function mutationGroupIds(organId) {
  return SPECIAL_MUTATION_GROUPS[organId] ?? [`pet-${organId}`];
}

const requiredCreatureGroups = Object.freeze([
  ...new Set([
    "pet-character",
    "pet-species-shell",
    "pet-species-tentacle-ink",
    "pet-species-intake",
    "pet-species-horn-broadcast",
    "pet-form-slow",
    "pet-form-fast",
    ...Object.values(PACKS).flatMap(({ questions }) =>
      questions.flatMap(({ options }) =>
        options.flatMap(({ organId }) => mutationGroupIds(organId)),
      ),
    ),
  ]),
]);

function serializeCurrentCreature() {
  try {
    const source = mount.querySelector("svg");
    if (!source) return "";

    const clone = source.cloneNode(true);
    state.mutations.forEach((organId) => {
      mutationGroupIds(organId).forEach((groupId) => {
        const group = clone.querySelector(`#${groupId}`);
        if (!group) return;
        group.setAttribute("opacity", "1");
        group.setAttribute("visibility", "visible");
      });
    });
    return new XMLSerializer().serializeToString(clone);
  } catch {
    return "";
  }
}

function createPosterContext(operation = null) {
  return {
    runId: operation?.runId ?? state.runId,
    resultSnapshot: operation?.resultSnapshot ?? currentResult,
    decisionsSnapshot: operation?.decisionsSnapshot ?? state.decisions,
    epoch: operation?.epoch ?? operationEpoch,
    revision: operation?.revision ?? resultView.revision,
  };
}

function posterContextIsCurrent(context) {
  return Boolean(
    context
      && state.stage === "result"
      && context.runId === state.runId
      && context.resultSnapshot === currentResult
      && context.epoch === operationEpoch
      && context.revision === resultView.revision,
  );
}

function samePosterContext(left, right) {
  return Boolean(
    left
      && right
      && left.runId === right.runId
      && left.resultSnapshot === right.resultSnapshot
      && left.epoch === right.epoch
      && left.revision === right.revision,
  );
}

function preparePoster(context = createPosterContext()) {
  if (!posterContextIsCurrent(context)) return Promise.resolve(null);
  if (posterPromise && samePosterContext(posterPromiseContext, context)) {
    return posterPromise;
  }

  const svg = serializeCurrentCreature();
  let request;
  request = (async () => {
    try {
      const poster = await renderResultPoster({
        svg,
        result: context.resultSnapshot,
        decisions: context.decisionsSnapshot,
        brand: BRAND,
      });
      if (!posterContextIsCurrent(context)) return null;
      posterCache = poster;
      resultView = poster?.blob
        ? setPreviewMedia(resultView, {
          status: poster.mode === "text-only" ? "text-only" : "ready",
          blob: poster.blob,
        })
        : setPreviewMedia(resultView, { status: "unavailable" });
      renderResultMediaState();
      return poster;
    } catch {
      if (posterContextIsCurrent(context)) {
        resultView = setPreviewMedia(resultView, { status: "unavailable" });
        renderResultMediaState();
      }
      return null;
    } finally {
      if (posterPromise === request) {
        posterPromise = null;
        posterPromiseContext = null;
      }
    }
  })();
  posterPromiseContext = context;
  posterPromise = request;
  return request;
}

async function posterForCurrentRun(operation) {
  if (!operationIsCurrent(operation)) return null;
  if (posterCache) return posterCache;
  const context = createPosterContext(operation);
  const pending = posterPromise && samePosterContext(posterPromiseContext, context)
    ? posterPromise
    : preparePoster(context);
  const poster = await pending;
  if (!operationIsCurrent(operation)) return null;
  return poster;
}

function settleCurrentMutation(token, option) {
  const next = settleReaction(state, token);
  if (next === state) return;

  state = next;
  mutationTimer = null;
  render();
  holdTimer = window.setTimeout(() => advanceCurrentFlow(token), option.holdMs);
}

function advanceCurrentFlow(token) {
  const next = advanceFlow(state, token);
  if (next === state) return;

  state = next;
  holdTimer = null;
  if (state.stage === "result") {
    const selectedQuestions = getSelectedQuestions();
    currentResult = calculateResult(state.decisions, selectedQuestions);
    resultView = createResultViewState(currentResult, { brand: BRAND });
  }
  render();

  if (state.stage === "result") {
    resultTitle.focus({ preventScroll: true });
    void preparePoster(createPosterContext()).catch(() => {});
  } else {
    question.focus({ preventScroll: true });
  }
}

function choosePack(button) {
  if (!creatureReady) return;
  warmAudioContext();
  const next = selectPack(state, button.dataset.packId);
  if (next === state) return;

  state = next;
  render();
  question.focus({ preventScroll: true });
}

function choose(button) {
  const next = chooseOption(state, button.dataset.optionId);
  if (next === state) return;

  state = next;
  const token = currentToken(state);
  const option = getTurnOption();
  render();

  if (prefersReducedMotion.matches) {
    settleCurrentMutation(token, option);
    return;
  }

  try {
    if (navigator.vibrate) navigator.vibrate(option.axes.approach < 0 ? 35 : [22, 24, 38]);
  } catch {}

  try {
    playMutationSound(option);
  } catch (error) {
    audioContext = null;
  }

  mutationTimer = window.setTimeout(
    () => settleCurrentMutation(token, option),
    option.motionMs,
  );
}

function showManualCopy(text) {
  manualCopyText.value = String(text ?? "");
  manualCopy.hidden = false;
  manualCopyText.focus({ preventScroll: true });
  manualCopyText.select();
}

function hideManualCopy() {
  manualCopy.hidden = true;
  manualCopyText.value = "";
}

function setShareOutcome(outcome) {
  const messages = {
    "shared-file": "结果图和文案已送进分享面板。",
    "shared-text": "结果文案已送进分享面板。",
    copied: "结果文案已复制。",
    "manual-copy": "自动复制没成功，请手动选中下面的文案。",
    cancelled: "已取消分享。",
    downloaded: "结果图已保存。",
  };
  shareStatus.textContent = messages[outcome?.status] ?? "这次没分享出去，文案仍可手动复制。";
}

function resultPayload(resultSnapshot) {
  return buildSharePayload(resultSnapshot, BRAND);
}

function resultPosterFilename(resultSnapshot) {
  return buildPosterFilename(
    { species: resultSnapshot?.name ?? resultSnapshot?.species },
    BRAND,
  );
}

function beginResultOperation(kind) {
  const button = resultOperationButtons[kind];
  const eligibilityKey = {
    share: "systemShare",
    copy: "copyText",
    save: "saveImage",
  }[kind];
  if (
    !button
    || !eligibilityKey
    || operationBusy[kind]
    || state.stage !== "result"
    || !currentResult
    || !resultView.eligibility[eligibilityKey]
  ) {
    return null;
  }

  operationBusy[kind] = true;
  button.disabled = true;
  return {
    kind,
    button,
    runId: state.runId,
    resultSnapshot: currentResult,
    decisionsSnapshot: state.decisions,
    epoch: operationEpoch,
    revision: resultView.revision,
  };
}

function operationIsCurrent(operation) {
  return Boolean(
    operation
      && state.stage === "result"
      && operation.runId === state.runId
      && operation.resultSnapshot === currentResult
      && operation.epoch === operationEpoch
      && operation.revision === resultView.revision,
  );
}

function finishResultOperation(operation) {
  if (!operationIsCurrent(operation)) return;
  operationBusy[operation.kind] = false;
  operation.button.disabled = false;
  renderResultMediaState();
}

function staleOperationError() {
  const error = new Error("result-operation-stale");
  error.name = "AbortError";
  return error;
}

function assertOperationCurrent(operation) {
  if (!operationIsCurrent(operation)) throw staleOperationError();
}

async function guardedCapabilityCall(operation, owner, capability, args) {
  assertOperationCurrent(operation);
  try {
    const value = await Reflect.apply(capability, owner, args);
    assertOperationCurrent(operation);
    return value;
  } catch (error) {
    assertOperationCurrent(operation);
    throw error;
  }
}

function guardedClipboard(operation) {
  let clipboard = null;
  let writeText = null;
  try {
    clipboard = navigator.clipboard;
    writeText = clipboard?.writeText;
  } catch {
    clipboard = null;
  }

  return {
    async writeText(text) {
      assertOperationCurrent(operation);
      if (!clipboard || typeof writeText !== "function") {
        throw new TypeError("clipboard-unavailable");
      }
      return guardedCapabilityCall(operation, clipboard, writeText, [text]);
    },
  };
}

function guardedNavigator(operation) {
  const navigatorApi = { clipboard: guardedClipboard(operation) };
  try {
    const nativeShare = navigator.share;
    if (typeof nativeShare === "function") {
      navigatorApi.share = (payload) =>
        guardedCapabilityCall(operation, navigator, nativeShare, [payload]);
    }
  } catch {}
  try {
    const nativeCanShare = navigator.canShare;
    if (typeof nativeCanShare === "function") {
      navigatorApi.canShare = (payload) =>
        guardedCapabilityCall(operation, navigator, nativeCanShare, [payload]);
    }
  } catch {}
  return navigatorApi;
}

async function handleShare() {
  const operation = beginResultOperation("share");
  if (!operation) return;
  shareStatus.textContent = "正在把怪东西塞进分享面板…";
  try {
    const poster = await posterForCurrentRun(operation);
    if (!operationIsCurrent(operation)) return;
    const outcome = await shareResult({
      blob: poster?.blob ?? null,
      ...resultPayload(operation.resultSnapshot),
      filename: resultPosterFilename(operation.resultSnapshot),
      navigatorApi: guardedNavigator(operation),
      fallback: (text) => {
        if (operationIsCurrent(operation)) showManualCopy(text);
      },
    });
    if (!operationIsCurrent(operation)) return;
    setShareOutcome(outcome);
  } catch {
    if (!operationIsCurrent(operation)) return;
    showManualCopy(operation.resultSnapshot.shareText);
    setShareOutcome({ status: "manual-copy" });
  } finally {
    finishResultOperation(operation);
  }
}

async function handleCopy() {
  const operation = beginResultOperation("copy");
  if (!operation) return;
  try {
    const outcome = await copyResultText({
      text: operation.resultSnapshot.shareText,
      clipboard: guardedClipboard(operation),
      fallback: (text) => {
        if (operationIsCurrent(operation)) showManualCopy(text);
      },
    });
    if (!operationIsCurrent(operation)) return;
    setShareOutcome(outcome);
  } catch {
    if (!operationIsCurrent(operation)) return;
    showManualCopy(operation.resultSnapshot.shareText);
    setShareOutcome({ status: "manual-copy" });
  } finally {
    finishResultOperation(operation);
  }
}

async function handleSave() {
  const operation = beginResultOperation("save");
  if (!operation) return;
  try {
    const poster = await posterForCurrentRun(operation);
    if (!operationIsCurrent(operation)) return;
    if (!poster?.blob) {
      shareStatus.textContent = "结果图暂时没长好，分享文案和重玩仍可使用。";
      return;
    }
    const outcome = downloadResultPoster({
      blob: poster.blob,
      filename: resultPosterFilename(operation.resultSnapshot),
    });
    setShareOutcome(outcome);
  } catch {
    if (!operationIsCurrent(operation)) return;
    shareStatus.textContent = "结果图保存失败，分享文案和重玩仍可使用。";
  } finally {
    finishResultOperation(operation);
  }
}

function clearFlowTimers() {
  if (mutationTimer !== null) window.clearTimeout(mutationTimer);
  if (holdTimer !== null) window.clearTimeout(holdTimer);
  mutationTimer = null;
  holdTimer = null;
}

function revokePreviewObjectUrl(objectUrl) {
  if (!objectUrl) return;
  try {
    if (typeof URL.revokeObjectURL === "function") URL.revokeObjectURL(objectUrl);
  } catch {
    // Preview URL cleanup cannot block rename or replay.
  }
}

function clearResultOperationState() {
  operationBusy.share = false;
  operationBusy.copy = false;
  operationBusy.save = false;
}

function submitRename() {
  const transition = renameResultView(resultView, resultNameInput.value);
  if (!transition.accepted) {
    renameError.textContent = transition.error;
    resultNameInput.focus({ preventScroll: true });
    return;
  }

  operationEpoch += 1;
  revokePreviewObjectUrl(transition.revokedObjectUrl);
  resultView = transition.state;
  currentResult = resultView.result;
  posterCache = null;
  posterPromise = null;
  posterPromiseContext = null;
  clearResultOperationState();
  hideManualCopy();
  shareStatus.textContent = "名字已更新，正在重新准备结果卡。";
  renameError.textContent = `已保存为「${resultView.name}」。`;
  renderResultReport();
  void preparePoster(createPosterContext()).catch(() => {});
}

function replay() {
  clearFlowTimers();
  operationEpoch += 1;
  resultView = clearHistoryHighlight(resultView);
  const resetView = resetResultViewState(resultView);
  revokePreviewObjectUrl(resetView.revokedObjectUrl);
  resultView = resetView.state;
  state = resetCreature(state);
  currentResult = null;
  historyRows = [];
  resultHistory.replaceChildren();
  resultName.textContent = "";
  resultSpeciesForm.textContent = "";
  resultDiagnosis.textContent = "";
  resultPreview.dataset.previewStatus = "idle";
  resultPreview.removeAttribute("aria-label");
  resultPreviewStatus.textContent = "";
  resultSpecies.textContent = "";
  resultObservation.textContent = "";
  resultWarning.textContent = "";
  resultOrgans.textContent = "";
  resultEvidence.textContent = "";
  demo.dataset.highlightOrgan = "";
  posterCache = null;
  posterPromise = null;
  posterPromiseContext = null;
  clearResultOperationState();
  shareButton.disabled = false;
  copyButton.disabled = false;
  saveButton.disabled = false;
  shareStatus.textContent = "";
  renameControls.hidden = true;
  renameToggleButton.setAttribute("aria-expanded", "false");
  resultNameInput.value = "";
  renameError.textContent = "";
  hideManualCopy();
  mount.style.setProperty("--look-x", "0px");
  mount.style.setProperty("--look-y", "0px");
  render();

  try {
    playResetSound();
  } catch (error) {
    audioContext = null;
  }

  selectorTitle.focus({ preventScroll: true });
}

packButtons.forEach((button) => {
  button.addEventListener("click", () => choosePack(button));
});

answerButtons.forEach((button) => {
  button.addEventListener("click", () => choose(button));
});

shareButton.addEventListener("click", handleShare);
copyButton.addEventListener("click", handleCopy);
saveButton.addEventListener("click", handleSave);
replayButton.addEventListener("click", replay);
renameToggleButton.addEventListener("click", () => {
  const opening = renameControls.hidden;
  renameControls.hidden = !opening;
  renameToggleButton.setAttribute("aria-expanded", String(opening));
  renameError.textContent = "";
  if (opening) {
    resultNameInput.value = resultView.name;
    resultNameInput.focus({ preventScroll: true });
    resultNameInput.select();
  }
});
renameSaveButton.addEventListener("click", submitRename);
resultNameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    submitRename();
  }
});
resultHistory.addEventListener("pointerleave", () => {
  updateResultHighlight(clearHistoryHighlight(resultView));
});
resultHistory.addEventListener("focusout", (event) => {
  if (!resultHistory.contains(event.relatedTarget)) {
    updateResultHighlight(clearHistoryHighlight(resultView));
  }
});

muteButton.addEventListener("click", () => {
  muted = !muted;
  muteButton.setAttribute("aria-pressed", String(muted));
  muteButton.querySelector(".sound-button__icon").textContent = muted ? "◖×" : "◖)))";
  muteButton.querySelector(".sound-button__text").textContent = muted ? "静音" : "有声";
});

function attachCreatureGaze() {
  mount.addEventListener("pointermove", (event) => {
    if (prefersReducedMotion.matches || state.stage !== "question" || !creatureReady) return;
    const rect = mount.getBoundingClientRect();
    const x = Math.max(-6, Math.min(6, ((event.clientX - rect.left) / rect.width - 0.5) * 12));
    const y = Math.max(-4, Math.min(4, ((event.clientY - rect.top) / rect.height - 0.5) * 8));
    mount.style.setProperty("--look-x", `${x}px`);
    mount.style.setProperty("--look-y", `${y}px`);
  });

  mount.addEventListener("pointerleave", () => {
    mount.style.setProperty("--look-x", "0px");
    mount.style.setProperty("--look-y", "0px");
  });
}

function parseCreatureSvg(source) {
  const parsed = new DOMParser().parseFromString(source, "image/svg+xml");
  if (parsed.querySelector("parsererror")) throw new TypeError("invalid-creature-svg");

  const root = parsed.documentElement;
  if (
    !root
    || root.namespaceURI !== SVG_NAMESPACE
    || root.localName !== "svg"
    || root.querySelector("script, foreignObject")
  ) {
    throw new TypeError("invalid-creature-svg-root");
  }

  const hasEveryRequiredGroup = requiredCreatureGroups.every((groupId) =>
    Boolean(root.querySelector(`#${groupId}`)),
  );
  if (!hasEveryRequiredGroup) throw new TypeError("incomplete-creature-svg");

  for (const element of [root, ...root.querySelectorAll("*")]) {
    for (const attribute of element.attributes) {
      if (attribute.name.toLowerCase().startsWith("on")) {
        throw new TypeError("active-creature-svg");
      }
      if (
        attribute.localName === "href"
        && attribute.value
        && !attribute.value.startsWith("#")
      ) {
        throw new TypeError("external-creature-svg-reference");
      }
    }
  }

  const imported = document.importNode(root, true);
  if (imported.namespaceURI !== SVG_NAMESPACE || imported.localName !== "svg") {
    throw new TypeError("creature-svg-import-failed");
  }
  return imported;
}

async function loadCreature() {
  try {
    const response = await fetch("./assets/creature-stage.svg");
    if (!response.ok) throw new Error(`SVG request failed: ${response.status}`);
    const svg = await response.text();
    const creature = parseCreatureSvg(svg);
    mount.replaceChildren(creature);
    mount.setAttribute("aria-busy", "false");
    attachCreatureGaze();
    creatureLoadFailed = false;
    creatureReady = true;
    render();
  } catch (error) {
    creatureReady = false;
    creatureLoadFailed = true;
    const message = document.createElement("p");
    message.className = "load-error";
    message.textContent = "怪东西加载失败，它可能躲到桌子底下了。";
    mount.replaceChildren(message);
    mount.setAttribute("aria-busy", "false");
    render();
    console.error(error);
  }
}

function teardownResultView() {
  operationEpoch += 1;
  resultView = clearHistoryHighlight(resultView);
  const resetView = resetResultViewState(resultView);
  revokePreviewObjectUrl(resetView.revokedObjectUrl);
  resultView = resetView.state;
  currentResult = null;
  posterCache = null;
  posterPromise = null;
  posterPromiseContext = null;
  clearResultOperationState();
  demo.dataset.highlightOrgan = "";
  resultName.textContent = "";
  resultSpeciesForm.textContent = "";
  resultDiagnosis.textContent = "";
  resultPreview.dataset.previewStatus = "idle";
  resultPreview.removeAttribute("aria-label");
  resultPreviewStatus.textContent = "";
  resultHistory.replaceChildren();
}

window.addEventListener("pagehide", teardownResultView, { once: true });

render();
loadCreature();
