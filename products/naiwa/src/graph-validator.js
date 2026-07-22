const REQUIRED_INTENTS = Object.freeze(["normal", "boundary", "strategy", "absurd"]);
const TERMINAL_NODE_ID = "result";

function fail(message) {
  throw new RangeError(message);
}

function requireText(value, label) {
  if (typeof value !== "string" || value.trim() === "") fail(`${label} must be non-empty text`);
}

function requireTextList(value, label) {
  if (!Array.isArray(value) || value.length === 0) fail(`${label} requires at least one item`);
  for (const item of value) requireText(item, label);
}

function requirePlainObject(value, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    fail(`${label} must be an object`);
  }
}

function validateQuestion(route, question, consequenceIds) {
  requirePlainObject(question, "question");
  requireText(question.id, "question id");
  if (question.routeId !== route.id) fail(`question ${question.id} has the wrong route id`);
  if (!Number.isInteger(question.stage) || question.stage < 1) {
    fail(`question ${question.id} requires a positive stage`);
  }
  requireText(question.prompt, `question ${question.id} prompt`);
  requireText(question.contentVersion, `question ${question.id} content version`);
  requireText(question.approvalStatus, `question ${question.id} approval status`);
  requireTextList(question.sceneObjects, `question ${question.id} scene object`);
  requireTextList(question.sourceRefs, `question ${question.id} source reference`);

  if (!Array.isArray(question.options) || question.options.length !== 4) {
    fail(`question ${question.id} must have exactly four options`);
  }

  const optionIds = new Set();
  const successorIds = new Set();
  const intents = new Set();
  for (const option of question.options) {
    requirePlainObject(option, `option in ${question.id}`);
    requireText(option.id, `option id in ${question.id}`);
    requireText(option.label, `option ${option.id} label`);
    requireText(option.intent, `option ${option.id} intent`);
    requireText(option.evidence, `option ${option.id} evidence`);
    if (!option.id.startsWith(`${question.id}.option.`)) {
      fail(`option ${option.id} does not use the stable question option prefix`);
    }
    if (optionIds.has(option.id)) fail(`duplicate option id ${option.id}`);
    optionIds.add(option.id);
    intents.add(option.intent);
    if (option.requiresConfirmation !== true) {
      fail(`option ${option.id} requires player confirmation`);
    }

    const consequence = option.consequence;
    requirePlainObject(consequence, `option ${option.id} consequence`);
    requireText(consequence.id, `option ${option.id} consequence id`);
    requireText(consequence.action, `option ${option.id} visible consequence action`);
    requireText(consequence.npcReaction, `option ${option.id} visible consequence reaction`);
    requireText(
      consequence.visibleStateChange,
      `option ${option.id} visible consequence state change`,
    );
    requireText(consequence.nextNodeId, `option ${option.id} next node`);
    if (successorIds.has(consequence.id)) {
      fail(`question ${question.id} options need a distinct immediate successor`);
    }
    if (consequenceIds.has(consequence.id)) fail(`duplicate consequence id ${consequence.id}`);
    successorIds.add(consequence.id);
    consequenceIds.add(consequence.id);
  }

  if (
    intents.size !== REQUIRED_INTENTS.length
    || REQUIRED_INTENTS.some((intent) => !intents.has(intent))
  ) {
    fail(`question ${question.id} must cover every required intent`);
  }
}

function tracePaths(route) {
  const paths = [];
  const reachableQuestions = new Set();

  function visit(questionId, optionPath, nodePath, activeQuestions) {
    if (questionId === TERMINAL_NODE_ID) {
      paths.push(Object.freeze({
        optionIds: Object.freeze([...optionPath]),
        nodeIds: Object.freeze([...nodePath, TERMINAL_NODE_ID]),
        decisionCount: optionPath.length,
        terminal: TERMINAL_NODE_ID,
      }));
      return;
    }

    const question = route.questions[questionId];
    if (!question) fail(`dangling target ${questionId}`);
    if (activeQuestions.has(questionId)) fail(`loop detected at ${questionId}`);
    reachableQuestions.add(questionId);

    const nextActive = new Set(activeQuestions);
    nextActive.add(questionId);
    for (const option of question.options) {
      const consequence = option.consequence;
      visit(
        consequence.nextNodeId,
        [...optionPath, option.id],
        [...nodePath, questionId, consequence.id],
        nextActive,
      );
    }
  }

  visit(route.startNodeId, [], [], new Set());
  return { paths, reachableQuestions };
}

function validateCanonicalPath(route) {
  if (!Array.isArray(route.canonicalPath) || route.canonicalPath.length !== 6) {
    fail(`route ${route.id} requires a canonical 6-question path`);
  }

  let questionId = route.startNodeId;
  for (const optionId of route.canonicalPath) {
    const question = route.questions[questionId];
    if (!question) fail(`canonical path has dangling question ${questionId}`);
    const option = question.options.find((candidate) => candidate.id === optionId);
    if (!option) fail(`canonical path option ${optionId} is not reachable at ${questionId}`);
    questionId = option.consequence.nextNodeId;
  }
  if (questionId !== TERMINAL_NODE_ID) fail(`canonical 6-question path does not resolve`);
}

export function enumerateDecisionPaths(route) {
  requirePlainObject(route, "route");
  requirePlainObject(route.questions, "route questions");
  return Object.freeze(tracePaths(route).paths);
}

export function validateRouteGraph(route) {
  requirePlainObject(route, "route");
  requireText(route.id, "route id");
  requireText(route.title, "route title");
  requireText(route.subtitle, "route subtitle");
  requireText(route.contentVersion, "route content version");
  requireText(route.startNodeId, "route start node id");
  requireTextList(route.allowedSceneObjects, `route ${route.id} allowed scene objects`);
  requirePlainObject(route.questions, "route questions");

  const questions = Object.values(route.questions);
  if (questions.length === 0) fail(`route ${route.id} has no questions`);
  const consequenceIds = new Set();
  for (const question of questions) validateQuestion(route, question, consequenceIds);

  const { paths, reachableQuestions } = tracePaths(route);
  if (reachableQuestions.size !== questions.length) {
    const unreachable = questions
      .map(({ id }) => id)
      .filter((id) => !reachableQuestions.has(id));
    fail(`unreachable question nodes: ${unreachable.join(", ")}`);
  }
  if (paths.length === 0) fail(`route ${route.id} has a dead end`);
  for (const path of paths) {
    if (path.decisionCount < 5 || path.decisionCount > 7) {
      fail(`path decision count must stay within 5–7: ${path.optionIds.join(" -> ")}`);
    }
  }

  validateCanonicalPath(route);

  return Object.freeze({
    ok: true,
    routeId: route.id,
    questionCount: questions.length,
    consequenceCount: consequenceIds.size,
    pathCount: paths.length,
    decisionCounts: Object.freeze([...new Set(paths.map(({ decisionCount }) => decisionCount))]),
  });
}

export function validateAllRoutes(routes) {
  requirePlainObject(routes, "route catalog");
  const reports = Object.values(routes).map(validateRouteGraph);
  return Object.freeze({ ok: true, reports: Object.freeze(reports) });
}
