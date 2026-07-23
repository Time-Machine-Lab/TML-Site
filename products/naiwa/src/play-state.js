import { resolveNextNodeId } from "./route-transition.js";

const PLAY_STATE_SCHEMA_VERSION = 3;

function initialProgress() {
  return Object.freeze({ completed: 0, current: 1, target: 6 });
}

function progressFor(historyLength, screen, target = 6) {
  return Object.freeze({
    completed: historyLength,
    current: screen === "result-ready" ? historyLength : Math.min(historyLength + 1, target),
    target,
  });
}

function requireRoute(route) {
  if (!route || typeof route !== "object" || !route.questions?.[route.startNodeId]) {
    throw new RangeError("a valid route graph is required");
  }
}

function requireMatchingState(state, route) {
  requireRoute(route);
  if (
    !state
    || state.schemaVersion !== PLAY_STATE_SCHEMA_VERSION
    || state.routeId !== route.id
    || state.contentVersion !== route.contentVersion
  ) {
    throw new RangeError("play state does not match route content");
  }
}

export function createPlayState(route, { runSeed = `${route.id}:${route.contentVersion}:default` } = {}) {
  requireRoute(route);
  if (typeof runSeed !== "string" || runSeed.trim() === "") {
    throw new RangeError("play state requires a non-empty run seed");
  }
  return Object.freeze({
    schemaVersion: PLAY_STATE_SCHEMA_VERSION,
    routeId: route.id,
    contentVersion: route.contentVersion,
    runSeed,
    screen: "question",
    currentQuestionId: route.startNodeId,
    history: Object.freeze([]),
    pendingConsequence: null,
    progress: initialProgress(),
  });
}

export function chooseOption(state, route, optionId) {
  requireMatchingState(state, route);
  if (state.screen !== "question") {
    throw new Error("choices are only available on the question screen");
  }
  const question = route.questions[state.currentQuestionId];
  if (!question) throw new RangeError("current question is missing");
  const option = question.options.find((candidate) => candidate.id === optionId);
  if (!option) throw new RangeError(`unknown option ${optionId}`);
  if (option.requiresConfirmation !== true) throw new RangeError("option lacks player confirmation");

  const entry = Object.freeze({
    questionId: question.id,
    optionId: option.id,
    label: option.label,
    intent: option.intent,
    evidence: option.evidence,
    stateTags: Object.freeze([...(option.stateTags ?? [])]),
    scoreEffects: Object.freeze({ ...(option.scoreEffects ?? {}) }),
    signatureFlags: Object.freeze([...(option.signatureFlags ?? [])]),
    consequenceId: option.consequence.id,
    visibleStateChange: option.consequence.visibleStateChange,
  });
  const history = Object.freeze([...state.history, entry]);

  return Object.freeze({
    ...state,
    screen: "consequence",
    history,
    pendingConsequence: Object.freeze({ ...option.consequence }),
    progress: progressFor(history.length, "consequence", state.progress.target),
  });
}

export function acknowledgeConsequence(state, route) {
  requireMatchingState(state, route);
  if (state.screen !== "consequence" || !state.pendingConsequence) {
    throw new Error("there is no visible consequence to acknowledge");
  }

  const nextQuestionId = resolveNextNodeId(route, {
    history: state.history,
    defaultNextNodeId: state.pendingConsequence.nextNodeId,
    runSeed: state.runSeed,
  });
  const target = nextQuestionId === "late-work.q.ai-delivery-check"
    ? 7
    : state.progress.target;
  if (nextQuestionId === "result") {
    return Object.freeze({
      ...state,
      screen: "result-ready",
      currentQuestionId: null,
      pendingConsequence: null,
      progress: progressFor(state.history.length, "result-ready", target),
    });
  }
  if (!route.questions[nextQuestionId]) throw new RangeError(`dangling next question ${nextQuestionId}`);

  return Object.freeze({
    ...state,
    screen: "question",
    currentQuestionId: nextQuestionId,
    pendingConsequence: null,
    progress: progressFor(state.history.length, "question", target),
  });
}

export function rewindOneDecision(state, route) {
  requireMatchingState(state, route);
  if (state.history.length === 0) return createPlayState(route, { runSeed: state.runSeed });

  if (state.screen === "consequence") {
    const currentEntry = state.history.at(-1);
    const history = Object.freeze(state.history.slice(0, -1));
    return Object.freeze({
      ...state,
      screen: "question",
      currentQuestionId: currentEntry.questionId,
      history,
      pendingConsequence: null,
      progress: progressFor(history.length, "question", state.progress.target),
    });
  }

  const previousEntry = state.history.at(-1);
  const history = Object.freeze(state.history.slice(0, -1));
  return Object.freeze({
    ...state,
    screen: "question",
    currentQuestionId: previousEntry.questionId,
    history,
    pendingConsequence: null,
    progress: progressFor(history.length, "question", state.progress.target),
  });
}

export function serializePlayState(state) {
  return JSON.stringify(state);
}

export function restorePlayState(raw, route) {
  const fallback = createPlayState(route);
  if (typeof raw !== "string" || raw.length > 128 * 1024) return fallback;

  let candidate;
  try {
    candidate = JSON.parse(raw);
  } catch {
    return fallback;
  }
  if (
    !candidate
    || candidate.routeId !== route.id
    || candidate.contentVersion !== route.contentVersion
    || !Array.isArray(candidate.history)
    || !["question", "consequence", "result-ready"].includes(candidate.screen)
  ) {
    return fallback;
  }

  try {
    let rebuilt = createPlayState(route, { runSeed: candidate.runSeed });
    for (let index = 0; index < candidate.history.length; index += 1) {
      const storedEntry = candidate.history[index];
      rebuilt = chooseOption(rebuilt, route, storedEntry.optionId);
      const isLastPending = candidate.screen === "consequence" && index === candidate.history.length - 1;
      if (!isLastPending) rebuilt = acknowledgeConsequence(rebuilt, route);
    }
    if (rebuilt.screen !== candidate.screen) return fallback;
    if (rebuilt.currentQuestionId !== (candidate.currentQuestionId ?? null)) return fallback;
    return rebuilt;
  } catch {
    return fallback;
  }
}
