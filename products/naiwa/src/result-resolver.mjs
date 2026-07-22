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

function evidenceFromHistory(history) {
  const indexes = [...new Set([0, Math.floor(history.length / 2), history.length - 1])];
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
  acquiredAt,
}) {
  requireText(playInstanceId, "play instance id");
  requireText(acquiredAt, "acquired time");
  if (!route || !Array.isArray(history) || history.length < 5 || history.length > 7) {
    throw new RangeError("result requires a valid 5–7 decision path");
  }
  if (!manifest || typeof manifest !== "object") throw new RangeError("card manifest is required");

  const cards = Object.values(manifest).filter((card) => (
    card.routeId === route.id && card.renderable === true
  ));
  const optionIds = history.map(({ optionId }) => optionId);
  const rareMatches = cards.filter((card) => matchesRare(card, history, optionIds));
  if (rareMatches.length > 1) throw new RangeError("multiple rare cards matched one path");
  const card = rareMatches[0] ?? resolveOrdinary(cards, history);
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
    evidence: evidenceFromHistory(history),
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
