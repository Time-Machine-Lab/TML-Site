import { ENDING_TEMPLATES, PACKS, QUESTIONS, RESULTS } from "./game-content.js";
import { BRAND, normalizeBrand } from "./brand-config.js";

const DISCLOSURE = "纯属娱乐观察，不是心理测评。";

function deepFreeze(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  for (const nested of Object.values(value)) deepFreeze(nested);
  return Object.freeze(value);
}

function readOptionId(decision) {
  if (typeof decision === "string") return decision;
  if (!decision || typeof decision !== "object") return null;
  return decision.optionId ?? decision.id ?? null;
}

function validateQuestionSnapshot(questionSnapshot) {
  if (questionSnapshot === QUESTIONS) {
    return { isLegacyRuntime: true, packId: null };
  }

  const pack = Object.values(PACKS).find(({ questions }) => questions === questionSnapshot);
  if (!pack) {
    throw new RangeError("必须使用官方冻结题包快照才能鉴定物种");
  }
  return { isLegacyRuntime: false, packId: pack.id };
}

function resolveDecisions(decisions, questionSnapshot) {
  const { isLegacyRuntime, packId } = validateQuestionSnapshot(questionSnapshot);
  if (!Array.isArray(decisions) || decisions.length !== questionSnapshot.length) {
    throw new RangeError(`必须完成${questionSnapshot.length}个选择后才能鉴定物种`);
  }

  const resolved = decisions.map((decision, index) => {
    const question = questionSnapshot[index];
    const optionId = readOptionId(decision);
    const option = question.options.find(({ id }) => id === optionId);

    if (!option) {
      throw new RangeError(`未知或顺序错误的第 ${index + 1} 题选择`);
    }
    if (typeof decision === "object" && decision) {
      if (decision.questionId && decision.questionId !== question.id) {
        throw new RangeError(`顺序错误的第 ${index + 1} 题选择`);
      }
      if (!isLegacyRuntime && decision.slotId && decision.slotId !== question.slotId) {
        throw new RangeError(`槽位错误的第 ${index + 1} 题选择`);
      }
      if (!isLegacyRuntime && decision.packId && decision.packId !== packId) {
        throw new RangeError(`题包错误的第 ${index + 1} 题选择`);
      }
    }

    return { question, option };
  });

  return { isLegacyRuntime, packId, resolved };
}

function getAxisSigns(axisTotals) {
  const signs = Object.fromEntries(
    Object.entries(axisTotals).map(([axis, total]) => [axis, Math.sign(total)]),
  );
  if (Object.values(signs).includes(0)) {
    throw new RangeError("三轴结果不能出现 0");
  }
  return signs;
}

function getEndingKey(signs) {
  const approach = signs.approach < 0 ? "hide" : "chase";
  const output = signs.output < 0 ? "consume" : "broadcast";
  const tempo = signs.tempo < 0 ? "slow" : "fast";
  return `${approach}-${output}-${tempo}`;
}

function getLegacyResultKey(axisTotals) {
  const approach = axisTotals.approach < 0 ? "hide" : "chase";
  const output = axisTotals.output < 0 ? "consume" : "broadcast";
  return `${approach}-${output}`;
}

function buildPathCode(resolved) {
  return resolved.reduce((code, { question, option }) => {
    const optionIndex = question.options.findIndex(({ id }) => id === option.id);
    return (code * 2) + optionIndex;
  }, 0);
}

export function buildDefaultName(ending, organs, pathCode) {
  if (!ending || !Array.isArray(organs) || organs.length === 0) {
    throw new RangeError("自动命名需要结局和至少一个器官");
  }
  if (!Number.isSafeInteger(pathCode) || pathCode < 0) {
    throw new RangeError("自动命名需要有效的路径编码");
  }

  const winner = organs[pathCode % organs.length];
  const withAlias = `${ending.namePrefix}${winner.nameAlias}${ending.nameSuffix}`;

  return [...withAlias].length > 12
    ? `${ending.namePrefix}${ending.nameSuffix}`
    : withAlias;
}

export function buildShareText(result, rawBrand = BRAND) {
  const brand = normalizeBrand(rawBrand);
  const organs = result.organs.map(({ organName }) => organName).join("、");
  const distribution = [brand.hashtag, brand.siteUrl].filter(Boolean).join(" ");
  if (!Object.hasOwn(result, "form")) {
    return `我亲手养坏了一只「${result.species}」。非法器官：${organs}。${result.shareLead} ${distribution}`;
  }
  return `我养坏了「${result.name}」：${result.species} · ${result.form}。${result.shareLead} 身上长着${organs}。${distribution}`;
}

function calculateLegacyResult(resolved, brand) {
  const axisTotals = resolved.reduce(
    (totals, { option }) => ({
      approach: totals.approach + option.axes.approach,
      output: totals.output + option.axes.output,
    }),
    { approach: 0, output: 0 },
  );
  const speciesResult = RESULTS[getLegacyResultKey(axisTotals)];
  const organs = resolved.map(({ question, option }) => ({
    questionId: question.id,
    optionId: option.id,
    organId: option.organId,
    organName: option.organName,
    evidence: option.evidence,
  }));
  const result = {
    ...speciesResult,
    axisTotals,
    organs,
    evidence: organs.map(({ evidence }) => evidence),
  };

  result.shareText = buildShareText(result, brand);
  return deepFreeze(result);
}

export function calculateResult(
  decisions,
  questionSnapshot = PACKS.general.questions,
  brand = BRAND,
) {
  const { isLegacyRuntime, packId, resolved } = resolveDecisions(decisions, questionSnapshot);
  if (isLegacyRuntime) return calculateLegacyResult(resolved, brand);

  const axisTotals = resolved.reduce(
    (totals, { option }) => ({
      approach: totals.approach + option.axes.approach,
      output: totals.output + option.axes.output,
      tempo: totals.tempo + option.axes.tempo,
    }),
    { approach: 0, output: 0, tempo: 0 },
  );
  const axisSigns = getAxisSigns(axisTotals);
  const ending = ENDING_TEMPLATES[getEndingKey(axisSigns)];
  const pathCode = buildPathCode(resolved);
  const organs = resolved.map(({ question, option }) => ({
    questionId: question.id,
    slotId: question.slotId,
    packId: question.packId,
    variantId: question.variantId,
    optionId: option.id,
    choiceLabel: option.label,
    effect: option.effect,
    organId: option.organId,
    organName: option.organName,
    nameAlias: option.nameAlias,
    axes: { ...option.axes },
    reaction: option.reaction,
    evidence: option.evidence,
  }));
  const evolution = resolved.map(({ question, option }, index) => ({
    step: index + 1,
    questionId: question.id,
    slotId: question.slotId,
    prompt: question.prompt,
    optionId: option.id,
    choiceLabel: option.label,
    organId: option.organId,
    organName: option.organName,
    reaction: option.reaction,
    evidence: option.evidence,
  }));
  const result = {
    ...ending,
    packId,
    pathCode,
    signatureIndex: pathCode % organs.length,
    axisTotals,
    axisSigns,
    organs,
    evidence: organs.map(({ evidence }) => evidence),
    evolution,
    disclosure: DISCLOSURE,
  };

  result.name = buildDefaultName(ending, organs, pathCode);
  result.shareText = buildShareText(result, brand);
  return deepFreeze(result);
}
