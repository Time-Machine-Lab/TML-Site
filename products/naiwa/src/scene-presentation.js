const GENERIC_DECISION_QUESTIONS = new Set([
  "你怎么选？",
  "你现在怎么选？",
  "这次你怎么选？",
  "你怎么回？",
]);

const LATE_WORK_OPENING_CHOICE_HEADLINES = Object.freeze({
  "late-work.q.friday-request.option.until-eight": "先帮到八点，边界说清",
  "late-work.q.friday-request.option.refuse-overtime": "今晚不接，走加班流程",
  "late-work.q.friday-request.option.digital-twin": "交给数字分身，准时上号",
  "late-work.q.friday-request.option.accept-all": "全部接下，今晚不玩",
});

function choiceLayout(name, columns, spans, rowEnds) {
  return Object.freeze({
    name,
    columns,
    items: Object.freeze(spans.map((span, index) => Object.freeze({
      span,
      endsRow: rowEnds.includes(index),
    }))),
  });
}

const CHOICE_LAYOUTS = Object.freeze({
  2: choiceLayout("duo", 2, [1, 1], [1]),
  3: choiceLayout("trio", 3, [1, 1, 1], [2]),
  4: choiceLayout("quad", 2, [1, 1, 1, 1], [1, 3]),
  5: choiceLayout("quint", 6, [2, 2, 2, 3, 3], [2, 4]),
  6: choiceLayout("hex", 3, [1, 1, 1, 1, 1, 1], [2, 5]),
});

function normalize(value) {
  return String(value ?? "").replace(/\s+/gu, " ").trim();
}

function sentencesFrom(prompt) {
  return normalize(prompt)
    .match(/[^。！？!?]+[。！？!?]?/gu)
    ?.map((sentence) => sentence.trim())
    .filter(Boolean) ?? [];
}

function conciseHeadline(sentences) {
  const informativeQuestion = [...sentences]
    .reverse()
    .find((sentence) => sentence.endsWith("？") && !GENERIC_DECISION_QUESTIONS.has(sentence));
  const source = informativeQuestion ?? sentences[0] ?? "这一幕，你怎么接？";
  return source.length <= 24 ? source : `${source.slice(0, 23)}…`;
}

function splitNarrative(sentences) {
  const narrative = sentences.filter((sentence) => !GENERIC_DECISION_QUESTIONS.has(sentence));
  if (narrative.length <= 1) {
    return [{ label: "现场", body: narrative[0] ?? "新的情况已经发生。" }];
  }

  const midpoint = Math.max(1, Math.ceil(narrative.length / 2));
  return [
    { label: "现场", body: narrative.slice(0, midpoint).join("") },
    { label: "接着", body: narrative.slice(midpoint).join("") },
  ].filter(({ body }) => body);
}

function lateWorkOpening(question) {
  const prompt = normalize(question.prompt);
  const [friendsRaw, leaderRaw = ""] = prompt.split("组长走过来：");
  const friends = friendsRaw.replace(/^周五\s*17:36[，,]?/u, "").trim();
  const leader = leaderRaw.replace(/\s*你怎么选？$/u, "").trim();

  return Object.freeze({
    timeLabel: "周五 · 17:36",
    headline: "八点开黑，还是临时接活？",
    storyBeats: Object.freeze([
      Object.freeze({ label: "好友群", body: friends }),
      Object.freeze({ label: "组长", body: leader }),
    ]),
    decisionPrompt: "这一幕，你怎么接？",
    choiceHeadlines: LATE_WORK_OPENING_CHOICE_HEADLINES,
  });
}

export function buildChoiceLayout(optionCount) {
  const layout = CHOICE_LAYOUTS[optionCount];
  if (!layout) throw new RangeError("choice layout supports two through six options");
  return layout;
}

export function buildScenePresentation(question, { routeId, progress } = {}) {
  if (!question || typeof question !== "object" || !normalize(question.prompt)) {
    throw new RangeError("scene presentation requires a question prompt");
  }

  if (routeId === "late-work" && question.id === "late-work.q.friday-request") {
    return lateWorkOpening(question);
  }

  const sentences = sentencesFrom(question.prompt);
  const timestamp = normalize(question.prompt).match(/(周[一二三四五六日天])\s*(\d{1,2}:\d{2})/u);
  const storySource = normalize(question.context)
    ? [normalize(question.context), ...sentences]
    : sentences;

  return Object.freeze({
    timeLabel: timestamp
      ? `${timestamp[1]} · ${timestamp[2]}`
      : `第 ${progress?.current ?? 1} 幕`,
    headline: conciseHeadline(sentences),
    storyBeats: Object.freeze(splitNarrative(storySource).map((beat) => Object.freeze(beat))),
    decisionPrompt: "这一幕，你怎么接？",
    choiceHeadlines: Object.freeze({}),
  });
}
