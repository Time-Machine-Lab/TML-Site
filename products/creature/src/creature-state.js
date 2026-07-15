import { CONTENT_VERSION, PACKS, QUESTIONS } from "./game-content.js";

const LEGACY_VALID_STAGES = new Set(["question", "reacting", "holding", "result"]);
const PACK_VALID_STAGES = new Set([
  "selecting-pack",
  "question",
  "reacting",
  "holding",
  "result",
]);
const PACK_STATE_KEYS = new Set([
  "runId",
  "turn",
  "questionIndex",
  "stage",
  "contentVersion",
  "packId",
  "questionIds",
  "decisions",
  "mutations",
  "reaction",
  "pending",
  "result",
]);
const DECISION_KEYS = new Set(["questionId", "optionId"]);

function deepFreeze(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  for (const nested of Object.values(value)) deepFreeze(nested);
  return Object.freeze(value);
}

function isRecord(value) {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function isRunId(value) {
  return Number.isSafeInteger(value) && value >= 0;
}

function hasExactKeys(value, expectedKeys) {
  if (!isRecord(value)) return false;
  const actualKeys = Object.keys(value);
  return actualKeys.length === expectedKeys.size
    && actualKeys.every((key) => expectedKeys.has(key));
}

function isPackStateCandidate(state) {
  return isRecord(state) && ["contentVersion", "packId", "questionIds"].some(
    (key) => Object.hasOwn(state, key),
  );
}

function resolvePack(state) {
  if (
    state.contentVersion !== CONTENT_VERSION
    || typeof state.packId !== "string"
    || !Object.hasOwn(PACKS, state.packId)
    || !Array.isArray(state.questionIds)
  ) {
    return null;
  }

  const pack = PACKS[state.packId];
  if (
    state.questionIds.length !== pack.questions.length
    || state.questionIds.some((id, index) => id !== pack.questions[index].id)
  ) {
    return null;
  }

  return pack;
}

function resolveDecision(decision, index, questions, strictShape = false) {
  if (
    !isRecord(decision)
    || (strictShape && !hasExactKeys(decision, DECISION_KEYS))
  ) {
    return null;
  }

  const question = questions[index];
  if (!question || decision.questionId !== question.id) return null;

  const option = question.options.find(({ id }) => id === decision.optionId);
  return option ? { question, option } : null;
}

function hasValidBase(state, validStages, questionCount) {
  return isRecord(state)
    && isRunId(state.runId)
    && Number.isInteger(state.turn)
    && state.turn >= 0
    && Number.isInteger(state.questionIndex)
    && state.questionIndex >= 0
    && state.turn === state.questionIndex
    && state.turn <= questionCount
    && validStages.has(state.stage)
    && Array.isArray(state.decisions)
    && Array.isArray(state.mutations)
    && state.decisions.length === state.mutations.length
    && state.result === null;
}

function hasValidFlow(state, questions, strictShape = false) {
  const resolvedHistory = state.decisions.map((decision, index) =>
    resolveDecision(decision, index, questions, strictShape),
  );
  if (resolvedHistory.some((entry) => entry === null)) return false;
  if (
    resolvedHistory.some(({ option }, index) =>
      state.mutations[index] !== option.organId,
    )
  ) {
    return false;
  }

  const historyLength = state.decisions.length;
  const isActiveQuestion = state.questionIndex < questions.length;

  if (state.stage === "question") {
    return isActiveQuestion
      && historyLength === state.questionIndex
      && state.pending === null
      && state.reaction === null;
  }

  if (state.stage === "reacting") {
    if (
      !isActiveQuestion
      || historyLength !== state.questionIndex
      || state.reaction !== null
      || !isRecord(state.pending)
      || (strictShape && !hasExactKeys(state.pending, DECISION_KEYS))
    ) {
      return false;
    }

    const question = questions[state.questionIndex];
    return state.pending.questionId === question.id
      && question.options.some(({ id }) => id === state.pending.optionId);
  }

  if (state.stage === "holding") {
    if (
      !isActiveQuestion
      || historyLength !== state.questionIndex + 1
      || state.pending !== null
    ) {
      return false;
    }

    return state.reaction === resolvedHistory[state.questionIndex].option.reaction;
  }

  return state.stage === "result"
    && state.questionIndex === questions.length
    && historyLength === questions.length
    && state.pending === null
    && state.reaction === null;
}

function isValidLegacyState(state) {
  return hasValidBase(state, LEGACY_VALID_STAGES, QUESTIONS.length)
    && hasValidFlow(state, QUESTIONS);
}

function isValidPackState(state) {
  if (!hasExactKeys(state, PACK_STATE_KEYS)) return false;

  if (state.stage === "selecting-pack") {
    return hasValidBase(state, PACK_VALID_STAGES, 0)
      && state.contentVersion === null
      && state.packId === null
      && Array.isArray(state.questionIds)
      && state.questionIds.length === 0
      && state.decisions.length === 0
      && state.mutations.length === 0
      && state.reaction === null
      && state.pending === null;
  }

  const pack = resolvePack(state);
  return Boolean(
    pack
    && hasValidBase(state, PACK_VALID_STAGES, pack.questions.length)
    && hasValidFlow(state, pack.questions, true),
  );
}

function isValidState(state) {
  try {
    return isPackStateCandidate(state)
      ? isValidPackState(state)
      : isValidLegacyState(state);
  } catch {
    return false;
  }
}

function frozenLegacyState(state) {
  return deepFreeze({
    runId: state.runId,
    turn: state.turn,
    questionIndex: state.questionIndex,
    stage: state.stage,
    decisions: state.decisions.map(({ questionId, optionId }) => ({
      questionId,
      optionId,
    })),
    mutations: [...state.mutations],
    reaction: state.reaction,
    pending: state.pending
      ? {
          questionId: state.pending.questionId,
          optionId: state.pending.optionId,
        }
      : null,
    result: null,
  });
}

function frozenPackState(state) {
  return deepFreeze({
    runId: state.runId,
    turn: state.turn,
    questionIndex: state.questionIndex,
    stage: state.stage,
    contentVersion: state.contentVersion,
    packId: state.packId,
    questionIds: [...state.questionIds],
    decisions: state.decisions.map(({ questionId, optionId }) => ({
      questionId,
      optionId,
    })),
    mutations: [...state.mutations],
    reaction: state.reaction,
    pending: state.pending
      ? {
          questionId: state.pending.questionId,
          optionId: state.pending.optionId,
        }
      : null,
    result: null,
  });
}

function frozenState(state) {
  return isPackStateCandidate(state)
    ? frozenPackState(state)
    : frozenLegacyState(state);
}

function tokenMatches(state, token) {
  return Boolean(
    token
      && typeof token === "object"
      && Object.hasOwn(token, "runId")
      && Object.hasOwn(token, "turn")
      && token.runId === state.runId
      && token.turn === state.turn,
  );
}

function currentQuestion(state) {
  if (isPackStateCandidate(state)) {
    return resolvePack(state)?.questions[state.questionIndex] ?? null;
  }
  return QUESTIONS[state.questionIndex] ?? null;
}

export function createInitialState(runId = 0) {
  if (!isRunId(runId)) {
    throw new RangeError("runId must be a non-negative safe integer");
  }

  return frozenLegacyState({
    runId,
    turn: 0,
    questionIndex: 0,
    stage: "question",
    decisions: [],
    mutations: [],
    reaction: null,
    pending: null,
  });
}

export function createPackSelectorState(runId = 0) {
  if (!isRunId(runId)) {
    throw new RangeError("runId must be a non-negative safe integer");
  }

  return frozenPackState({
    runId,
    turn: 0,
    questionIndex: 0,
    stage: "selecting-pack",
    contentVersion: null,
    packId: null,
    questionIds: [],
    decisions: [],
    mutations: [],
    reaction: null,
    pending: null,
  });
}

export function selectPack(state, packId) {
  if (
    !isValidState(state)
    || state.stage !== "selecting-pack"
    || typeof packId !== "string"
    || !Object.hasOwn(PACKS, packId)
  ) {
    return state;
  }

  const pack = PACKS[packId];
  return frozenPackState({
    ...state,
    stage: "question",
    contentVersion: CONTENT_VERSION,
    packId: pack.id,
    questionIds: pack.questions.map(({ id }) => id),
  });
}

export function currentToken(state) {
  if (!isValidState(state)) return null;
  return deepFreeze({ runId: state.runId, turn: state.turn });
}

export function chooseOption(state, optionId) {
  if (!isValidState(state) || state.stage !== "question") return state;

  const question = currentQuestion(state);
  const option = question.options.find(({ id }) => id === optionId);
  if (!option) return state;

  return frozenState({
    ...state,
    stage: "reacting",
    pending: {
      questionId: question.id,
      optionId: option.id,
    },
  });
}

export function settleReaction(state, token) {
  if (
    !isValidState(state)
    || state.stage !== "reacting"
    || !tokenMatches(state, token)
  ) {
    return state;
  }

  const question = currentQuestion(state);
  const option = question.options.find(({ id }) => id === state.pending.optionId);

  return frozenState({
    ...state,
    stage: "holding",
    decisions: [
      ...state.decisions,
      { questionId: question.id, optionId: option.id },
    ],
    mutations: [...state.mutations, option.organId],
    reaction: option.reaction,
    pending: null,
  });
}

export function advanceFlow(state, token) {
  if (
    !isValidState(state)
    || state.stage !== "holding"
    || !tokenMatches(state, token)
  ) {
    return state;
  }

  const questionCount = isPackStateCandidate(state)
    ? resolvePack(state).questions.length
    : QUESTIONS.length;
  const nextQuestionIndex = state.questionIndex + 1;
  const isComplete = nextQuestionIndex >= questionCount;

  return frozenState({
    ...state,
    turn: state.turn + 1,
    questionIndex: nextQuestionIndex,
    stage: isComplete ? "result" : "question",
    reaction: null,
    pending: null,
  });
}

export function resetCreature(state) {
  if (!isValidState(state) || state.runId === Number.MAX_SAFE_INTEGER) return state;
  return isPackStateCandidate(state)
    ? createPackSelectorState(state.runId + 1)
    : createInitialState(state.runId + 1);
}
