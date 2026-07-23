import { seededPercent } from "./seeded-choice.js";

const AI_CHECK_ID = "late-work.q.ai-delivery-check";
const SHARE_AI_ID = "late-work.q.monday-share";
const SHARE_NO_AI_ID = "late-work.q.monday-share-no-ai";
const WEEKEND_ACCOUNTABILITY_ID = "late-work.q.weekend-accountability";

function optionIds(history) {
  return history.map(({ optionId }) => optionId);
}

function includesAny(ids, candidates) {
  return candidates.some((candidate) => ids.includes(candidate));
}

function lateWorkAfterSaturday(history, runSeed, includeBothSeedOutcomes) {
  const ids = optionIds(history);
  const q1Ai = ids.includes("late-work.q.friday-request.option.digital-twin");
  const q2Ai = includesAny(ids, [
    "late-work.q.at-1958-working.option.digital-twin",
    "late-work.q.at-1958-cutoff.option.digital-twin",
    "late-work.q.at-1958-game.option.digital-twin",
  ]);
  const q3Ai = includesAny(ids, [
    "late-work.q.saturday-0906.option.digital-twin-sleep",
    "late-work.q.saturday-0906-unread.option.digital-twin-sleep",
  ]);
  const exactNoService = ids.includes("late-work.q.friday-request.option.refuse-overtime")
    && ids.includes("late-work.q.at-1958-game.option.unread")
    && ids.includes("late-work.q.saturday-0906-unread.option.schrodinger-unread");
  const hasAiOutput = history.some(({ stateTags = [] }) => stateTags.includes("ai-output"));
  const fallback = exactNoService
    ? WEEKEND_ACCOUNTABILITY_ID
    : hasAiOutput ? SHARE_AI_ID : SHARE_NO_AI_ID;

  if (q1Ai && q2Ai && q3Ai) return [AI_CHECK_ID];
  if ((q1Ai && q2Ai) || (q2Ai && q3Ai)) {
    if (includeBothSeedOutcomes) return [AI_CHECK_ID, fallback];
    return seededPercent(runSeed, "late-work.ai-delivery-check") < 50
      ? [AI_CHECK_ID]
      : [fallback];
  }
  return [fallback];
}

function isLateWorkSaturdayQuestion(questionId) {
  return questionId === "late-work.q.saturday-0906"
    || questionId === "late-work.q.saturday-0906-unread";
}

export function possibleNextNodeIds(route, { history, defaultNextNodeId }) {
  const lastQuestionId = history.at(-1)?.questionId;
  if (route.transitionPolicy === "late-work-v2" && isLateWorkSaturdayQuestion(lastQuestionId)) {
    return Object.freeze(lateWorkAfterSaturday(
      history,
      `${route.id}:${route.contentVersion}:default`,
      false,
    ));
  }
  return Object.freeze([defaultNextNodeId]);
}

export function resolveNextNodeId(route, { history, defaultNextNodeId, runSeed }) {
  const lastQuestionId = history.at(-1)?.questionId;
  if (route.transitionPolicy === "late-work-v2" && isLateWorkSaturdayQuestion(lastQuestionId)) {
    return lateWorkAfterSaturday(history, runSeed, false)[0];
  }
  return defaultNextNodeId;
}
