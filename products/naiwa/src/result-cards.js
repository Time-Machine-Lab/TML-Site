import { CARD_MANIFEST } from "./card-manifest.js";

const CONTENT_VERSION = "2026-07-22.preview.v1";

const RESULT_COPY = Object.freeze({
  "late-work.ordinary.01": Object.freeze({
    conclusion: "任务每加一层，你就把工位装修得更像家。",
    coreSkill: "在连续加码中保持全盘承接",
    sideEffect: "同事下班带包，你下班开始考虑工位软装。",
    shareCopy: "别人加班攒首付，我加班直接喜提工位独栋。",
  }),
  "late-work.ordinary.02": Object.freeze({
    conclusion: "领导刚问周末有没有空，你已经背着露营包走出公司。",
    coreSkill: "持续保护已经排好的周末",
    sideEffect: "“有空”两个字一出现，行程会自动加载。",
    shareCopy: "周末有空吗？不好意思，蛙已经在去没信号的地方了。",
  }),
  "late-work.ordinary.03": Object.freeze({
    conclusion: "你不替所有“都急”背锅，先让派活的人决定先后。",
    coreSkill: "把隐形冲突摆到同一张桌上",
    sideEffect: "任何待办靠近你都会自动长出优先级。",
    shareCopy: "我的超能力：让两个“最急”当面排队。",
  }),
  "late-work.ordinary.04": Object.freeze({
    conclusion: "你愿意限时救场，但不会替公司打一整个周末的怪兽。",
    coreSkill: "接受有限任务，并在加码后重新封顶",
    sideEffect: "任务每多长一页，胸前计时器就红一格。",
    shareCopy: "这场可以救，新增怪兽请留到下一集。",
  }),
  "late-work.rare.01": Object.freeze({
    conclusion: "你连续把职场黑话掏成实物，直到矛盾再也藏不住。",
    coreSkill: "把抽象冲突物化成会推动剧情的道具",
    sideEffect: "第二个工位已经到货，第二个你仍在配送。",
    shareCopy: "两个都急？我先从口袋里掏出第二个工位。",
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
      "respectful-acceptance",
      "weekend-possible",
      "client-baseline",
      "template-preserved",
      "scope-expanded",
      "version-diff-shown",
    ]),
    finalAffinities: Object.freeze(["normal"]),
  }),
  "late-work.ordinary.02": Object.freeze({
    tendency: null,
    signatures: Object.freeze([
      "hard-boundary",
      "weekend-unavailable",
      "no-extra-work",
      "unsupported-scope-refused",
      "deadline-reset",
      "page-withdrawn",
    ]),
    finalAffinities: Object.freeze(["boundary"]),
  }),
  "late-work.ordinary.03": Object.freeze({
    tendency: null,
    signatures: Object.freeze([
      "priority-coordination",
      "owner-decides",
      "decision-escalated",
      "scope-tradeoff",
      "priority-rule-created",
      "scope-and-priority-visible",
    ]),
    finalAffinities: Object.freeze(["strategy", "normal"]),
  }),
  "late-work.ordinary.04": Object.freeze({
    tendency: null,
    signatures: Object.freeze([
      "limited-commitment",
      "bounded-handoff",
      "time-compensation",
      "time-cap",
      "scope-split",
      "layout-frozen",
      "range-shown",
      "definition-pending",
      "no-final-commitment",
    ]),
    finalAffinities: Object.freeze(["normal", "boundary"]),
  }),
  "late-work.rare.01": Object.freeze({
    tendency: null,
    signatures: Object.freeze(["consistent-absurd", "object-logic"]),
    minimumSignatureMatches: 5,
    finalAffinities: Object.freeze([]),
  }),
});

function makePreviewCard(cardId, copy) {
  const canonical = CARD_MANIFEST[cardId];
  if (!canonical?.name) throw new RangeError(`preview card ${cardId} lacks an approved name anchor`);
  const rare = canonical.tier === "rare";
  const profile = RESULT_PROFILE_BY_CARD[cardId];
  const tendency = profile ? profile.tendency : (rare ? null : TENDENCY_BY_SLOT[canonical.slot]);
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
    requiredOptionIds: Object.freeze([]),
    finalAffinities: profile?.finalAffinities ?? (rare ? Object.freeze([]) : Object.freeze([tendency])),
    resolverPriority: rare ? 0 : Number(canonical.slot),
  });
}

export const PREVIEW_RESULT_CARDS = Object.freeze(Object.fromEntries(
  Object.entries(RESULT_COPY).map(([cardId, copy]) => [cardId, makePreviewCard(cardId, copy)]),
));
