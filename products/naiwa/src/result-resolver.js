import { seededPercent } from "./seeded-choice.js";

const ASSET_SLOT_VERSION = 1;

function requireText(value, label) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new RangeError(`${label} must be non-empty text`);
  }
}

function scoreHistory(history) {
  const scores = new Map();
  for (const entry of history) {
    for (const [key, value] of Object.entries(entry.scoreEffects ?? {})) {
      if (!Number.isFinite(value)) throw new RangeError(`invalid score effect ${key}`);
      scores.set(key, (scores.get(key) ?? 0) + value);
    }
  }
  return scores;
}

function signatureMatchCount(history, signatures) {
  return history.reduce((count, entry) => (
    count + ([...(entry.signatureFlags ?? []), ...(entry.stateTags ?? [])]
      .some((flag) => signatures.includes(flag)) ? 1 : 0)
  ), 0);
}

function matchesRare(card, history, optionIds) {
  if (card.tier !== "rare") return false;
  const signatures = card.signatures ?? [];
  const minimum = card.minimumSignatureMatches ?? signatures.length;
  const required = card.requiredOptionIds ?? [];
  return signatureMatchCount(history, signatures) >= minimum
    && required.every((optionId) => optionIds.includes(optionId));
}

function historyFlags(history) {
  return new Set(history.flatMap((entry) => [
    ...(entry.signatureFlags ?? []),
    ...(entry.stateTags ?? []),
  ]));
}

function matchesHidden(card, history, optionIds, resolutionSeed) {
  if (card.tier !== "hidden") return false;
  const signatures = card.signatures ?? [];
  const minimum = card.minimumSignatureMatches ?? signatures.length;
  const required = card.requiredOptionIds ?? [];
  const flags = historyFlags(history);
  if (!required.every((optionId) => optionIds.includes(optionId))) return false;
  if ((card.forbiddenSignatureFlags ?? []).some((flag) => flags.has(flag))) return false;
  if (signatureMatchCount(history, signatures) < minimum) return false;
  if (card.seedProbability !== null && card.seedProbability !== undefined) {
    return seededPercent(resolutionSeed, card.seedSalt ?? card.id) < card.seedProbability;
  }
  return true;
}

function matchesSelfOutsourced(card, optionIds) {
  return card.resolutionMode === "self-outsourced"
    && optionIds.includes("late-work.q.monday-share.option.full-disclose")
    && optionIds.includes("late-work.q.method-request.option.full-handover");
}

function resolveOrdinary(cards, history) {
  const scores = scoreHistory(history);
  const finalIntent = history.at(-1)?.intent;
  const ranked = cards
    .filter((card) => card.tier === "ordinary")
    .map((card) => ({
      card,
      primary: scores.get(card.tendency) ?? 0,
      signatureMatches: signatureMatchCount(history, card.signatures ?? []),
      finalAffinity: card.finalAffinities?.includes(finalIntent) ? 1 : 0,
      resolverPriority: card.resolverPriority,
    }))
    .sort((left, right) => (
      right.primary - left.primary
      || right.signatureMatches - left.signatureMatches
      || right.finalAffinity - left.finalAffinity
      || left.resolverPriority - right.resolverPriority
    ));

  if (ranked.length === 0) throw new RangeError("normal path resolved zero cards");
  if (ranked.length > 1) {
    const [first, second] = ranked;
    if (
      first.primary === second.primary
      && first.signatureMatches === second.signatureMatches
      && first.finalAffinity === second.finalAffinity
      && first.resolverPriority === second.resolverPriority
    ) {
      throw new RangeError("normal path resolved multiple final cards");
    }
  }
  return ranked[0].card;
}

function evidenceFromHistory(history, card) {
  const importantOptionIds = card.resolutionMode === "self-outsourced"
    ? [
      "late-work.q.monday-share.option.full-disclose",
      "late-work.q.method-request.option.full-handover",
    ]
    : card.requiredOptionIds ?? [];
  const importantIndexes = importantOptionIds
    .map((optionId) => history.findIndex((entry) => entry.optionId === optionId))
    .filter((index) => index >= 0);
  const indexes = [...new Set([
    ...importantIndexes,
    0,
    Math.floor(history.length / 2),
    history.length - 1,
  ])];
  return Object.freeze(indexes.slice(0, 4).map((index) => {
    const entry = history[index];
    return Object.freeze({
      questionId: entry.questionId,
      optionId: entry.optionId,
      choice: entry.label,
      observedConsequence: entry.visibleStateChange,
    });
  }));
}

function validateCardCopy(card) {
  for (const field of ["id", "revisionId", "title", "conclusion", "coreSkill", "sideEffect", "shareCopy"]) {
    requireText(card[field], `card ${card.id ?? "unknown"} ${field}`);
  }
}

export function resolvePlayResult({
  route,
  history,
  manifest,
  playInstanceId,
  resolutionSeed = playInstanceId,
  acquiredAt,
}) {
  requireText(playInstanceId, "play instance id");
  requireText(resolutionSeed, "resolution seed");
  requireText(acquiredAt, "acquired time");
  if (!route || !Array.isArray(history) || history.length < 5 || history.length > 7) {
    throw new RangeError("result requires a valid 5–7 decision path");
  }
  if (!manifest || typeof manifest !== "object") throw new RangeError("card manifest is required");

  const cards = Object.values(manifest).filter((card) => (
    card.routeId === route.id && card.renderable === true
  ));
  const optionIds = history.map(({ optionId }) => optionId);
  const nPlusOneMatches = cards.filter((card) => (
    card.resolutionMode === "n-plus-one"
    && matchesHidden(card, history, optionIds, resolutionSeed)
  ));
  if (nPlusOneMatches.length > 1) throw new RangeError("multiple N+1 hidden cards matched one path");

  const selfOutsourcedMatches = cards.filter((card) => matchesSelfOutsourced(card, optionIds));
  if (selfOutsourcedMatches.length > 1) {
    throw new RangeError("multiple self-outsourced cards matched one path");
  }

  const otherHiddenMatches = cards
    .filter((card) => card.resolutionMode !== "n-plus-one")
    .filter((card) => matchesHidden(card, history, optionIds, resolutionSeed))
    .sort((left, right) => left.hiddenPriority - right.hiddenPriority);
  if (otherHiddenMatches.length > 1) throw new RangeError("multiple hidden cards matched one path");

  const rareMatches = cards.filter((card) => matchesRare(card, history, optionIds));
  if (rareMatches.length > 1) throw new RangeError("multiple rare cards matched one path");
  const card = nPlusOneMatches[0]
    ?? selfOutsourcedMatches[0]
    ?? otherHiddenMatches[0]
    ?? rareMatches[0]
    ?? resolveOrdinary(cards, history);
  validateCardCopy(card);

  return Object.freeze({
    schemaVersion: 1,
    resultKey: card.revisionId,
    playInstanceId,
    routeId: route.id,
    contentVersion: route.contentVersion,
    optionPath: Object.freeze([...optionIds]),
    nodePath: Object.freeze(history.map(({ questionId }) => questionId)),
    cardId: card.id,
    cardRevisionId: card.revisionId,
    tier: card.tier,
    acquiredAt,
    evidence: evidenceFromHistory(history, card),
    copy: Object.freeze({
      title: card.title,
      conclusion: card.conclusion,
      coreSkill: card.coreSkill,
      sideEffect: card.sideEffect,
      shareCopy: card.shareCopy,
    }),
    assetSlot: Object.freeze({
      slotKey: `${card.id}.character-card`,
      contractVersion: ASSET_SLOT_VERSION,
      status: "awaiting-user-artwork",
      acceptedMimeTypes: Object.freeze(["image/png", "image/webp"]),
      recommendedAspectRatio: "4:5",
      requiredAltField: "artworkAlt",
    }),
  });
}
