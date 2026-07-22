export const COLLECTION_STORAGE_KEY_V2 = "naiwa-life-swap:collection:v2";
export const LEGACY_STORAGE_KEY_V1 = "naiwa-life-swap:collection:v1";

export const LEGACY_CARD_IDS = new Set([
  "work.ignore",
  "work.overtime",
  "work.later",
  "work.weekend",
  "message.agree",
  "message.one-night",
  "message.path",
  "message.quiet",
  "special.work",
  "special.message",
  "forbidden.v1",
]);

const MAX_PLAYS = 500;

function displayLevel(editionCount) {
  if (editionCount === 1) return "frame";
  if (editionCount === 2) return "lit";
  return "plaque";
}

function requireText(value, label) {
  if (typeof value !== "string" || value.trim() === "") throw new RangeError(`${label} is required`);
}

function normalizeV2(state) {
  if (!state || state.version !== 2 || !state.cards || !Array.isArray(state.plays)) {
    throw new RangeError("invalid V2 collection");
  }
  const cards = {};
  for (const [cardId, entry] of Object.entries(state.cards)) {
    requireText(cardId, "card id");
    if (
      !entry
      || entry.cardId !== cardId
      || !Number.isSafeInteger(entry.editionCount)
      || entry.editionCount < 1
      || entry.displayLevel !== displayLevel(entry.editionCount)
    ) {
      throw new RangeError(`invalid V2 card entry ${cardId}`);
    }
    cards[cardId] = Object.freeze({ ...entry });
  }
  const seen = new Set();
  const plays = state.plays.map((play) => {
    requireText(play.playInstanceId, "play instance id");
    requireText(play.cardId, "play card id");
    if (seen.has(play.playInstanceId)) throw new RangeError("duplicate play instance");
    seen.add(play.playInstanceId);
    return Object.freeze({ ...play, optionPath: Object.freeze([...(play.optionPath ?? [])]) });
  });
  if (plays.length > MAX_PLAYS) throw new RangeError("too many stored play instances");
  return Object.freeze({ version: 2, cards: Object.freeze(cards), plays: Object.freeze(plays) });
}

export function createV2Collection() {
  return normalizeV2({ version: 2, cards: {}, plays: [] });
}

export function registerResult(state, result) {
  const current = normalizeV2(state);
  for (const field of [
    "playInstanceId",
    "routeId",
    "contentVersion",
    "cardId",
    "cardRevisionId",
    "acquiredAt",
  ]) {
    requireText(result?.[field], `result ${field}`);
  }
  if (!Array.isArray(result.optionPath)) throw new RangeError("result option path is required");
  if (current.plays.some(({ playInstanceId }) => playInstanceId === result.playInstanceId)) {
    throw new RangeError("duplicate play instance");
  }

  const previous = current.cards[result.cardId];
  const editionCount = (previous?.editionCount ?? 0) + 1;
  const cardEntry = Object.freeze({
    cardId: result.cardId,
    firstAcquiredAt: previous?.firstAcquiredAt ?? result.acquiredAt,
    lastAcquiredAt: result.acquiredAt,
    editionCount,
    displayLevel: displayLevel(editionCount),
    latestRevisionId: result.cardRevisionId,
  });
  const play = Object.freeze({
    playInstanceId: result.playInstanceId,
    routeId: result.routeId,
    contentVersion: result.contentVersion,
    optionPath: Object.freeze([...result.optionPath]),
    cardId: result.cardId,
    cardRevisionId: result.cardRevisionId,
    acquiredAt: result.acquiredAt,
  });

  return normalizeV2({
    version: 2,
    cards: { ...current.cards, [result.cardId]: cardEntry },
    plays: [...current.plays, play],
  });
}

function loadV2(storage) {
  let raw;
  try {
    raw = storage?.getItem?.(COLLECTION_STORAGE_KEY_V2) ?? null;
  } catch {
    return Object.freeze({ status: "unavailable", state: createV2Collection() });
  }
  if (raw === null) return Object.freeze({ status: "empty", state: createV2Collection() });
  try {
    return Object.freeze({ status: "loaded", state: normalizeV2(JSON.parse(raw)) });
  } catch {
    return Object.freeze({ status: "corrupt", state: createV2Collection() });
  }
}

function loadLegacy(storage) {
  let raw;
  try {
    raw = storage?.getItem?.(LEGACY_STORAGE_KEY_V1) ?? null;
  } catch {
    return Object.freeze({ status: "unavailable", readOnly: true, rawPreserved: true, cardIds: [] });
  }
  if (raw === null) {
    return Object.freeze({ status: "empty", readOnly: true, rawPreserved: true, cardIds: [] });
  }
  try {
    const parsed = JSON.parse(raw);
    const entryIds = parsed?.entries && typeof parsed.entries === "object"
      ? Object.keys(parsed.entries)
      : [];
    const cardIds = entryIds.filter((cardId) => LEGACY_CARD_IDS.has(cardId)).sort();
    return Object.freeze({
      status: "loaded",
      readOnly: true,
      rawPreserved: true,
      cardIds: Object.freeze(cardIds),
    });
  } catch {
    return Object.freeze({ status: "corrupt", readOnly: true, rawPreserved: true, cardIds: [] });
  }
}

export function loadCollectionBundle(storage) {
  return Object.freeze({ v2: loadV2(storage), legacy: loadLegacy(storage) });
}

export function saveV2Collection(storage, state) {
  const normalized = normalizeV2(state);
  try {
    if (!storage || typeof storage.setItem !== "function") {
      return Object.freeze({ ok: false, state: normalized });
    }
    storage.setItem(COLLECTION_STORAGE_KEY_V2, JSON.stringify(normalized));
    return Object.freeze({ ok: true, state: normalized });
  } catch {
    return Object.freeze({ ok: false, state: normalized });
  }
}
