export function buildRouteSelectorModel(routes) {
  return Object.freeze(Object.values(routes).map((route) => Object.freeze({
    id: route.id,
    title: route.title,
    subtitle: route.subtitle,
  })));
}

export function buildQuestionModel(state, route) {
  if (state.screen !== "question") throw new RangeError("question model requires question state");
  const question = route.questions[state.currentQuestionId];
  if (!question) throw new RangeError("question model cannot find the active question");
  return Object.freeze({
    id: question.id,
    routeId: route.id,
    routeTitle: route.title,
    prompt: question.prompt,
    context: question.context ?? "",
    sceneObjects: Object.freeze([...question.sceneObjects]),
    progressLabel: `第 ${state.progress.current} / ${state.progress.target} 个决定`,
    options: Object.freeze(question.options.map((option) => Object.freeze({
      id: option.id,
      label: option.label,
      intent: option.intent,
      requiresConfirmation: option.requiresConfirmation === true,
    }))),
  });
}

export function buildConsequenceModel(state) {
  if (state.screen !== "consequence" || !state.pendingConsequence) {
    throw new RangeError("consequence model requires a pending visible consequence");
  }
  const consequence = state.pendingConsequence;
  return Object.freeze({
    id: consequence.id,
    heading: "选择已经长进现场",
    action: consequence.action,
    reaction: consequence.npcReaction,
    visibleStateChange: consequence.visibleStateChange,
    body: `${consequence.action} ${consequence.npcReaction} ${consequence.visibleStateChange}`,
  });
}

export function buildResultModel(result) {
  if (!result?.copy || !result.assetSlot || !Array.isArray(result.evidence)) {
    throw new RangeError("result model requires the structured result contract");
  }
  return Object.freeze({
    cardId: result.cardId,
    resultKey: result.resultKey,
    tier: result.tier,
    title: result.copy.title,
    conclusion: result.copy.conclusion,
    coreSkill: result.copy.coreSkill,
    sideEffect: result.copy.sideEffect,
    shareCopy: result.copy.shareCopy,
    evidenceItems: Object.freeze(result.evidence.map((item) => (
      `${item.choice} → ${item.observedConsequence}`
    ))),
    assetSlot: result.assetSlot,
    assetSlotLabel: result.assetSlot.status === "awaiting-user-artwork"
      ? "角色卡素材待用户补充"
      : "角色卡素材",
  });
}
