import { BRAND } from "./brand-config.js";
import { buildShareText } from "./result-engine.js";

export const MAX_CREATURE_NAME_CODE_POINTS = 12;

const UNSAFE_NAME_CODE_POINTS = /[\u0000-\u001f\u007f-\u009f\u061c\u200e\u200f\u202a-\u202e\u2066-\u2069]/gu;
const PREVIEW_STATUSES = new Set(["idle", "pending", "ready", "text-only", "unavailable"]);

function freezeObject(value) {
  return Object.freeze(value);
}

function createPreview(status, media = {}) {
  return freezeObject({
    status,
    blob: status === "ready" || status === "text-only" ? media.blob ?? null : null,
    posterPromise: status === "ready" || status === "text-only" ? media.posterPromise ?? null : null,
    objectUrl: status === "ready" || status === "text-only" ? media.objectUrl ?? null : null,
  });
}

function getEligibility(status, hasBlob = false) {
  if (status === "idle") {
    return freezeObject({
      copyText: false,
      replay: false,
      saveImage: false,
      fileShare: false,
      systemShare: false,
    });
  }

  const mediaReady = (status === "ready" || status === "text-only") && hasBlob;
  return freezeObject({
    copyText: true,
    replay: true,
    saveImage: mediaReady,
    fileShare: mediaReady,
    systemShare: mediaReady || status === "unavailable",
  });
}

function freezeView(state) {
  return freezeObject({
    ...state,
    preview: freezeObject({ ...state.preview }),
    eligibility: freezeObject({ ...state.eligibility }),
    history: freezeObject(state.history.map((row) => freezeObject({ ...row }))),
  });
}

function makeHistoryRow(record) {
  const choiceContext = `${record.prompt} → 选了「${record.choiceLabel}」`;
  const outcome = `${record.organName} · ${record.evidence}`;
  return {
    ...record,
    choiceContext,
    outcome,
    accessibleLabel: `第 ${record.step} 步：${record.prompt}；选择「${record.choiceLabel}」；长出${record.organName}。${record.evidence}`,
  };
}

function assertCompleteResult(result) {
  if (
    !result
    || typeof result !== "object"
    || typeof result.name !== "string"
    || !result.name
    || typeof result.species !== "string"
    || typeof result.form !== "string"
    || typeof result.diagnosis !== "string"
    || !Array.isArray(result.evolution)
    || result.evolution.length !== 7
  ) {
    throw new RangeError("结果视图需要一个完整的七步结局");
  }
}

export function normalizeCreatureName(rawName) {
  if (typeof rawName !== "string") {
    return freezeObject({ ok: false, value: "", error: "名字不能为空。" });
  }

  const value = rawName
    .replace(UNSAFE_NAME_CODE_POINTS, "")
    .replace(/\s+/gu, " ")
    .trim();

  if (!value) {
    return freezeObject({ ok: false, value: "", error: "名字不能为空。" });
  }
  if ([...value].length > MAX_CREATURE_NAME_CODE_POINTS) {
    return freezeObject({
      ok: false,
      value: "",
      error: `名字最多 ${MAX_CREATURE_NAME_CODE_POINTS} 个字符。`,
    });
  }

  return freezeObject({ ok: true, value, error: "" });
}

export function createResultViewState(result, { brand = BRAND } = {}) {
  assertCompleteResult(result);
  const preview = createPreview("pending");
  return freezeView({
    result,
    brand,
    name: result.name,
    filenameSource: result.name,
    shareText: result.shareText ?? buildShareText(result, brand),
    revision: 0,
    endingId: result.id,
    species: result.species,
    form: result.form,
    speciesForm: `${result.species} · ${result.form}`,
    diagnosis: result.diagnosis,
    axisTotals: result.axisTotals,
    organs: result.organs,
    evidence: result.evidence,
    history: result.evolution.map(makeHistoryRow),
    highlightOrgan: null,
    preview,
    eligibility: getEligibility(preview.status),
  });
}

export function setHistoryHighlight(state, organId) {
  if (!state || !state.history.some((row) => row.organId === organId)) return state;
  if (state.highlightOrgan === organId) return state;
  return freezeView({ ...state, highlightOrgan: organId });
}

export function clearHistoryHighlight(state) {
  if (!state || state.highlightOrgan === null) return state;
  return freezeView({ ...state, highlightOrgan: null });
}

export function setPreviewMedia(state, media) {
  if (!state || !media || !PREVIEW_STATUSES.has(media.status) || media.status === "idle") {
    throw new RangeError("未知的结果预览状态");
  }
  if ((media.status === "ready" || media.status === "text-only") && !media.blob) {
    throw new RangeError("可用的结果预览必须带有图片 Blob");
  }

  const preview = createPreview(media.status, media);
  return freezeView({
    ...state,
    preview,
    eligibility: getEligibility(preview.status, Boolean(preview.blob)),
  });
}

export function renameResultView(state, rawName) {
  if (!state?.result) {
    return freezeObject({
      accepted: false,
      error: "当前没有可以改名的结果。",
      revokedObjectUrl: null,
      state,
    });
  }

  const normalized = normalizeCreatureName(rawName);
  if (!normalized.ok) {
    return freezeObject({
      accepted: false,
      error: normalized.error,
      revokedObjectUrl: null,
      state,
    });
  }
  if (normalized.value === state.name) {
    return freezeObject({
      accepted: false,
      error: "名字没有变化。",
      revokedObjectUrl: null,
      state,
    });
  }

  const namedResult = { ...state.result, name: normalized.value };
  namedResult.shareText = buildShareText(namedResult, state.brand);
  freezeObject(namedResult);
  const preview = createPreview("pending");
  const nextState = freezeView({
    ...state,
    result: namedResult,
    name: normalized.value,
    filenameSource: normalized.value,
    shareText: namedResult.shareText,
    revision: state.revision + 1,
    preview,
    eligibility: getEligibility(preview.status),
  });

  return freezeObject({
    accepted: true,
    error: "",
    revokedObjectUrl: state.preview.objectUrl,
    state: nextState,
  });
}

const EMPTY_RESULT_VIEW_STATE = freezeView({
  result: null,
  brand: null,
  name: "",
  filenameSource: "",
  shareText: "",
  revision: 0,
  endingId: null,
  species: "",
  form: "",
  speciesForm: "",
  diagnosis: "",
  axisTotals: null,
  organs: freezeObject([]),
  evidence: freezeObject([]),
  history: freezeObject([]),
  highlightOrgan: null,
  preview: createPreview("idle"),
  eligibility: getEligibility("idle"),
});

export function resetResultViewState(state) {
  return freezeObject({
    revokedObjectUrl: state?.preview?.objectUrl ?? null,
    state: EMPTY_RESULT_VIEW_STATE,
  });
}
