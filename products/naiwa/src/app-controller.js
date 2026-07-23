import {
  loadCollectionBundle,
  registerResult,
  saveV2Collection,
} from "./collection-store.js";
import {
  acknowledgeConsequence,
  chooseOption,
  createPlayState,
  restorePlayState,
  rewindOneDecision,
} from "./play-state.js";
import { resolvePlayResult } from "./result-resolver.js";

export const PREVIEW_SESSION_KEY = "naiwa-life-swap:preview-session:v2";
const SESSION_SCHEMA_VERSION = 1;

function readSession(storage) {
  try {
    const raw = storage?.getItem?.(PREVIEW_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      parsed?.schemaVersion !== SESSION_SCHEMA_VERSION
      || typeof parsed.checkpoints !== "object"
      || parsed.checkpoints === null
    ) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeSession(storage, envelope) {
  try {
    storage?.setItem?.(PREVIEW_SESSION_KEY, JSON.stringify(envelope));
    return true;
  } catch {
    return false;
  }
}

function validStoredResult(result, route, playState) {
  return Boolean(
    result
    && result.routeId === route.id
    && result.contentVersion === route.contentVersion
    && result.optionPath?.length === playState.history.length
    && result.optionPath.every((optionId, index) => optionId === playState.history[index]?.optionId),
  );
}

export function createPreviewController({
  routes,
  manifest,
  sessionStorage,
  collectionStorage,
  now = () => new Date().toISOString(),
  createPlayInstanceId,
}) {
  if (!routes || !manifest) throw new RangeError("routes and result manifest are required");
  let sequence = 0;
  const makePlayId = createPlayInstanceId ?? ((routeId) => {
    sequence += 1;
    return `preview.${routeId}.${Date.now().toString(36)}.${sequence}`;
  });

  const loadedSession = readSession(sessionStorage);
  const checkpoints = { ...(loadedSession?.checkpoints ?? {}) };
  const bundle = loadCollectionBundle(collectionStorage);
  let collection = bundle.v2.state;
  let activeRouteId = routes[loadedSession?.activeRouteId] ? loadedSession.activeRouteId : null;
  let playState = null;
  let result = null;

  function route() {
    return activeRouteId ? routes[activeRouteId] : null;
  }

  function checkpointCurrent() {
    if (!activeRouteId || !playState) return;
    checkpoints[activeRouteId] = {
      playState,
      result,
    };
  }

  function persist() {
    checkpointCurrent();
    writeSession(sessionStorage, {
      schemaVersion: SESSION_SCHEMA_VERSION,
      activeRouteId,
      checkpoints,
    });
  }

  function storeResult(nextResult) {
    if (!collection.plays.some(({ playInstanceId }) => playInstanceId === nextResult.playInstanceId)) {
      collection = registerResult(collection, nextResult);
      collection = saveV2Collection(collectionStorage, collection).state;
    }
  }

  function finalizeIfReady() {
    if (playState?.screen !== "result-ready") return;
    if (!validStoredResult(result, route(), playState)) {
      result = resolvePlayResult({
        route: route(),
        history: playState.history,
        manifest,
        playInstanceId: playState.runSeed,
        resolutionSeed: playState.runSeed,
        acquiredAt: now(),
      });
    }
    storeResult(result);
  }

  function restoreRoute(routeId) {
    const selected = routes[routeId];
    const checkpoint = checkpoints[routeId];
    playState = checkpoint?.playState
      ? restorePlayState(JSON.stringify(checkpoint.playState), selected)
      : createPlayState(selected, { runSeed: makePlayId(routeId) });
    result = validStoredResult(checkpoint?.result, selected, playState)
      ? checkpoint.result
      : null;
    finalizeIfReady();
  }

  if (activeRouteId) {
    restoreRoute(activeRouteId);
    persist();
  }

  return Object.freeze({
    snapshot() {
      return Object.freeze({
        screen: !activeRouteId
          ? "route-select"
          : playState.screen === "result-ready" ? "result" : playState.screen,
        activeRouteId,
        route: route(),
        playState,
        result,
        collection,
        recoveryAvailable: Boolean(activeRouteId && checkpoints[activeRouteId]),
      });
    },

    selectRoute(routeId) {
      if (!routes[routeId]) throw new RangeError(`unknown preview route ${routeId}`);
      activeRouteId = routeId;
      restoreRoute(routeId);
      persist();
    },

    choose(optionId) {
      if (!activeRouteId) throw new Error("select a route before choosing");
      playState = chooseOption(playState, route(), optionId);
      result = null;
      persist();
    },

    continue() {
      if (!activeRouteId) throw new Error("select a route before continuing");
      playState = acknowledgeConsequence(playState, route());
      finalizeIfReady();
      persist();
    },

    back() {
      if (!activeRouteId) return;
      if (playState.history.length === 0) {
        activeRouteId = null;
        playState = null;
        result = null;
      } else {
        playState = rewindOneDecision(playState, route());
        result = null;
      }
      persist();
    },

    replay() {
      if (!activeRouteId) throw new Error("select a route before replaying");
      playState = createPlayState(route(), { runSeed: makePlayId(activeRouteId) });
      result = null;
      persist();
    },

    showRoutes() {
      checkpointCurrent();
      activeRouteId = null;
      playState = null;
      result = null;
      persist();
    },

  });
}
