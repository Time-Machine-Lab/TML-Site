import { CARD_MANIFEST } from "./card-manifest.js";

const CONTENT_VERSION = "2026-07-23.preview.v2";

const RESULT_COPY = Object.freeze({
  "late-work.ordinary.01": Object.freeze({
    conclusion: "任务每加一层，你就给工位再添一件家具。",
    coreSkill: "把临时加班稳定经营成长期居住",
    sideEffect: "别人下班带包，你下班开始研究工位软装。",
    shareCopy: "别人加班攒首付，我先喜提一套工位别墅。",
  }),
  "late-work.ordinary.02": Object.freeze({
    conclusion: "你不是不干，你只是要求每个“都急”先领号码牌。",
    coreSkill: "把优先级、人手和回报重新交给派活的人决定",
    sideEffect: "口头画过的饼靠近你，会自动生成催收日期。",
    shareCopy: "活可以接，先让三个最高优先级排个队。",
  }),
  "late-work.ordinary.03": Object.freeze({
    conclusion: "工作可以晚点。不撤离，就亏三百万战损。",
    coreSkill: "先保住本局，再处理锁屏外的世界",
    sideEffect: "所有临时任务都会先收到一张战损拒赔单。",
    shareCopy: "工作可以晚点。不撤离，就亏三百万战损。",
  }),
  "late-work.ordinary.04": Object.freeze({
    conclusion: "只要没有点开，周末就仍然可能属于你。",
    coreSkill: "让工作请求长期停留在通知的量子态",
    sideEffect: "消息没有消失，只是在周一早会上完成坍缩。",
    shareCopy: "我没有拒绝，我只是还没让这条消息成为现实。",
  }),
  "late-work.ordinary.05": Object.freeze({
    conclusion: "你把完整数字分身交给了公司，最后被优化的是原装版本。",
    coreSkill: "把自己训练成一套可复制、可交接的生产系统",
    sideEffect: "交接完成以后，真人成了系统里最贵的兼容层。",
    shareCopy: "我成功把工作外包给了自己，也把自己外包了出去。",
  }),
  "late-work.hidden.01": Object.freeze({
    conclusion: "你把数字分身藏在电脑里上夜班，真人负责准点上线。",
    coreSkill: "隐藏调度另一个自己，同时保留关键审核权",
    sideEffect: "绩效写你的名字，真正值夜班的员工没有工号。",
    shareCopy: "白天我是员工，晚上电脑里的我也是员工。",
  }),
  "late-work.hidden.02": Object.freeze({
    conclusion: "你一直不回公司的消息。公司最后回了你一个 N+1。",
    coreSkill: "把全部工作请求维持在永久未读状态",
    sideEffect: "本局唯一按时兑现的承诺，是解除劳动关系。",
    shareCopy: "我没回复公司，公司最后用 N+1 回复了我。",
  }),

  "revived-friend.ordinary.01": Object.freeze({
    conclusion: "你愿意接住旧关系，但不会假装三年空白从没发生。",
    coreSkill: "在温度和真实距离之间留门",
    sideEffect: "旧朋友圈每次震动都像空气炸锅预热。",
    shareCopy: "旧友可以回锅，关系要先确认有没有过期。",
  }),
  "revived-friend.ordinary.02": Object.freeze({
    conclusion: "你把请帖、喜糖、转账和重新联系分成四件事处理。",
    coreSkill: "阻断人情义务的捆绑安装",
    sideEffect: "共同好友经过你时会自动退出中间人模式。",
    shareCopy: "祝福可以收，出席和关系恢复请分别确认。",
  }),
  "revived-friend.ordinary.03": Object.freeze({
    conclusion: "你查事实、问目的、看记录，但不被考古现场拖回过去。",
    coreSkill: "用上下文处理关系旧账",
    sideEffect: "人在现场，旧身份已经注销。",
    shareCopy: "我看了记录，但没有给旧关系自动续费。",
  }),
  "revived-friend.ordinary.04": Object.freeze({
    conclusion: "你用离谱但不伤人的动作，把尴尬从关系里搬到物件上。",
    coreSkill: "让边界有笑点，让对方不丢脸",
    sideEffect: "喜糖和请帖从此必须分托盘存放。",
    shareCopy: "我没有发疯，我只是给人情关系做了防串货。",
  }),
  "revived-friend.rare.01": Object.freeze({
    conclusion: "你一路按仪式物件办案，把复活的旧关系完整做了现场勘验。",
    coreSkill: "在不外泄隐私的前提下关系考古",
    sideEffect: "面馆一旦重新开张，你可能收到系统级通知。",
    shareCopy: "旧友复活成功，但先经过了奶蛙的关系考古许可。",
  }),

  "family-care.ordinary.01": Object.freeze({
    conclusion: "你接住家人的好意，也会说明自己真正吃得下多少。",
    coreSkill: "把关心翻译成可接收的份量",
    sideEffect: "冰箱默认给你预留七只饭盒位。",
    shareCopy: "亲情已签收，饭盒请按容量投递。",
  }),
  "family-care.ordinary.02": Object.freeze({
    conclusion: "饭桌问题靠近时，你会带着碗和话题一起转弯。",
    coreSkill: "不撕破关系的现场边界",
    sideEffect: "每只碗都可能被你发展成逃生路线。",
    shareCopy: "我没离席，只是把问题端到了别的桌面。",
  }),
  "family-care.ordinary.03": Object.freeze({
    conclusion: "你把模糊关心变成时间、对象和下一步都清楚的安排。",
    coreSkill: "让家人的担心有预约、有负责人",
    sideEffect: "家族群开始像一个温柔的项目看板。",
    shareCopy: "关心没有减少，只是终于有了时间表。",
  }),
  "family-care.ordinary.04": Object.freeze({
    conclusion: "你没有只接收照顾，而是把关心准确地弹回给家里人。",
    coreSkill: "把单向投喂改成双向照顾",
    sideEffect: "父母的短视频和你的外卖会一起接受核查。",
    shareCopy: "家里开始关心我以后，我顺手也关心了回去。",
  }),
  "family-care.rare.01": Object.freeze({
    conclusion: "你一路用生活物件主持秩序，最后像同时监护了全家的饭盒、手机和话题。",
    coreSkill: "把家庭混乱变成可见、可笑、可协商的现场",
    sideEffect: "所有饭盒都默认等你签发流转单。",
    shareCopy: "这顿饭没有谁被教育，只有全家接受了奶蛙监护。",
  }),

  "group-assignment.ordinary.01": Object.freeze({
    conclusion: "你愿意补位，但会先把每个人该做的部分叫回现场。",
    coreSkill: "让失联成员重新成为可见变量",
    sideEffect: "共享文档会把你的在线状态当生命体征。",
    shareCopy: "五人小组已确认：文档里至少有一个活人。",
  }),
  "group-assignment.ordinary.02": Object.freeze({
    conclusion: "你用分工、交付物和截止时间守住自己的任务边界。",
    coreSkill: "阻止整合工作无声寄生",
    sideEffect: "别人说“顺手”时，你会自动生成责任栏。",
    shareCopy: "我做我的页，最后整合请单独认领。",
  }),
  "group-assignment.ordinary.03": Object.freeze({
    conclusion: "你盯来源、版本和答辩理解度，让每页都找得到真正作者。",
    coreSkill: "让证据链经得起随机提问",
    sideEffect: "看到漂亮图表会先问它敢不敢上台。",
    shareCopy: "这页谁做的？请本人到答辩投影前认领。",
  }),
  "group-assignment.ordinary.04": Object.freeze({
    conclusion: "你能在 final_v9 的废墟里缝出一份可提交、可解释的总稿。",
    coreSkill: "版本缝合与错误隔离",
    sideEffect: "文件名里的 final 越多，你越清醒。",
    shareCopy: "final_v9 不是终点，只是修订记录的一个证人。",
  }),
  "group-assignment.rare.01": Object.freeze({
    conclusion: "你一路把数据、版本和发言权做成证据，完成了一次小组作业尸检。",
    coreSkill: "从修订痕迹还原真实贡献",
    sideEffect: "空白单元格看见你会主动交代来源。",
    shareCopy: "作业已经提交，真正的作者也已被法医确认。",
  }),
});

const TENDENCY_BY_SLOT = Object.freeze({
  "01": "normal",
  "02": "boundary",
  "03": "strategy",
  "04": "absurd",
});

const RESULT_PROFILE_BY_CARD = Object.freeze({
  "late-work.ordinary.01": Object.freeze({
    tendency: null,
    signatures: Object.freeze([
      "work-all",
      "friend-cancelled",
      "accept-three",
      "responsibility-owned",
      "long-accept",
    ]),
    finalAffinities: Object.freeze(["normal"]),
  }),
  "late-work.ordinary.02": Object.freeze({
    tendency: null,
    signatures: Object.freeze([
      "priority-control",
      "pay-negotiation",
      "hire-team",
      "looks-complete",
      "time-boundary",
    ]),
    finalAffinities: Object.freeze(["strategy"]),
  }),
  "late-work.ordinary.03": Object.freeze({
    tendency: null,
    signatures: Object.freeze([
      "game-first",
      "formal-boundary",
      "late-reply",
      "gear-claim",
      "share-cancelled",
      "system-protected",
    ]),
    finalAffinities: Object.freeze(["boundary", "absurd"]),
  }),
  "late-work.ordinary.04": Object.freeze({
    tendency: null,
    signatures: Object.freeze([
      "unread",
      "no-response",
      "no-service-yet",
      "hard-refusal",
    ]),
    finalAffinities: Object.freeze(["boundary", "absurd"]),
  }),
  "late-work.ordinary.05": Object.freeze({
    tendency: null,
    signatures: Object.freeze(["ai-disclosed", "ai-handed-over"]),
    finalAffinities: Object.freeze(["normal"]),
    resolutionMode: "self-outsourced",
  }),
  "late-work.hidden.01": Object.freeze({
    tendency: null,
    signatures: Object.freeze(["ai-hidden"]),
    minimumSignatureMatches: 3,
    requiredOptionIds: Object.freeze(["late-work.q.three-projects.option.hidden-ai"]),
    forbiddenSignatureFlags: Object.freeze(["ai-error", "ai-disclosed", "ai-handed-over"]),
    finalAffinities: Object.freeze([]),
    resolutionMode: "cyber-employee",
    hiddenPriority: 20,
  }),
  "late-work.hidden.02": Object.freeze({
    tendency: null,
    signatures: Object.freeze([]),
    minimumSignatureMatches: 0,
    requiredOptionIds: Object.freeze([
      "late-work.q.friday-request.option.refuse-overtime",
      "late-work.q.at-1958-game.option.unread",
      "late-work.q.saturday-0906-unread.option.schrodinger-unread",
      "late-work.q.weekend-accountability.option.refuse-weekend",
      "late-work.q.support-request.option.refuse",
      "late-work.q.three-projects.option.refuse-three",
    ]),
    forbiddenSignatureFlags: Object.freeze(["service-provided", "ai-output"]),
    seedProbability: 70,
    seedSalt: "late-work.nplus1",
    finalAffinities: Object.freeze([]),
    resolutionMode: "n-plus-one",
    hiddenPriority: 10,
  }),
});

function makePreviewCard(cardId, copy) {
  const canonical = CARD_MANIFEST[cardId];
  if (!canonical?.name) throw new RangeError(`preview card ${cardId} lacks an approved name anchor`);
  const rare = canonical.tier === "rare";
  const hidden = canonical.tier === "hidden";
  const profile = RESULT_PROFILE_BY_CARD[cardId];
  const tendency = profile ? profile.tendency : (rare || hidden ? null : TENDENCY_BY_SLOT[canonical.slot]);
  return Object.freeze({
    ...canonical,
    title: canonical.name,
    ...copy,
    contentVersion: CONTENT_VERSION,
    revisionId: `${cardId}@${CONTENT_VERSION}`,
    approvalStatus: "source-reviewed",
    renderable: true,
    previewRenderable: true,
    productionRenderable: false,
    tendency,
    signatures: profile?.signatures ?? (rare ? Object.freeze(["consistent-absurd"]) : Object.freeze([])),
    minimumSignatureMatches: profile?.minimumSignatureMatches ?? (rare ? 5 : 0),
    requiredOptionIds: profile?.requiredOptionIds ?? Object.freeze([]),
    forbiddenSignatureFlags: profile?.forbiddenSignatureFlags ?? Object.freeze([]),
    seedProbability: profile?.seedProbability ?? null,
    seedSalt: profile?.seedSalt ?? null,
    resolutionMode: profile?.resolutionMode ?? null,
    hiddenPriority: profile?.hiddenPriority ?? null,
    finalAffinities: profile?.finalAffinities ?? (rare || hidden ? Object.freeze([]) : Object.freeze([tendency])),
    resolverPriority: rare || hidden ? 0 : Number(canonical.slot),
  });
}

export const PREVIEW_RESULT_CARDS = Object.freeze(Object.fromEntries(
  Object.entries(RESULT_COPY).map(([cardId, copy]) => [cardId, makePreviewCard(cardId, copy)]),
));
