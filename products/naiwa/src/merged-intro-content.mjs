export const INTRO_SHOW_COPY = Object.freeze({
  title: "欢迎来到《奶蛙交换计划》",
  premise: "两位嘉宾，交换一天。",
  revealAction: "揭晓本期嘉宾",
  humanName: "你",
  humanStatus: "最近有点连滚带爬",
  naiwaName: "奶蛙",
  naiwaStatus: "如何呢，又能怎",
  punchline: "对，说的就是屏幕前的你。",
  enterAction: "进入节目",
  skipAction: "跳过开场",
});

export const INTRO_REVEAL_CUES = Object.freeze({
  loading: "嘉宾正在入场…",
  ready: "轮到你了，点一下揭晓",
  failed: "画面没赶上，先跳过开场",
});

export const INTRO_PROMPT = "哪一幕，最近刚发生过？";

export const ROUTE_IDS = Object.freeze(["late-work", "revived-friend", "family-care", "group-assignment"]);

export const INTRO_ROUTES = Object.freeze({
  "late-work": Object.freeze({
    id: "late-work",
    label: "临近下班突然加活",
    previewTime: "周五 17:43",
    previewLine: "“周末有空把这份 PPT 弄一下。”",
    previewNote: "电脑已经准备关了",
    previewHero: "./assets/life-swap/intro/flashbacks/work-night.png",
    previewAlt: "深夜工位上摊着改了多次的方案和冷掉的外卖，手机在键盘旁亮起。",
    firstSceneTitle: "你的工位，正在被它重新理解。",
    directorResponse: "好，班味这一口，先让奶蛙替你尝尝。",
    hero: "./assets/life-swap/hero-office-v2.png",
    alt: "奶蛙坐在办公室工位前，拿着手机并穿着深色外套和红色领带。",
  }),
  "revived-friend": Object.freeze({
    id: "revived-friend",
    label: "熟人突然复活",
    previewTime: "三年没联系",
    previewLine: "“这家还开吗？”",
    previewNote: "旧朋友圈突然有了动静",
    previewHero: "./assets/life-swap/intro/flashbacks/message-midnight.png",
    previewAlt: "熄灯后的床边，手机照亮枕头和一只犹豫着是否点开的手。",
    firstSceneTitle: "这条消息，先由奶蛙来读。",
    directorResponse: "手机给它。尴尬先从已读开始。",
    hero: "./assets/life-swap/intro/route-message.png",
    alt: "奶蛙在生活化室内拿着亮起的手机，屏幕上出现一条让人犹豫的消息。",
  }),
  "family-care": Object.freeze({
    id: "family-care",
    label: "家里人开始关心你",
    previewTime: "周日家族群",
    previewLine: "“回来吃饭，你爸菜都买了。”",
    previewNote: "你姑也来",
    previewHero: "./assets/life-swap/intro/flashbacks/family-dinner-question-v2.png",
    previewAlt: "年夜饭桌前，几位亲戚停下筷子同时看向玩家的位置，等着玩家回答有没有对象。",
    firstSceneTitle: "它把你的嘉宾牌摆上了桌。",
    directorResponse: "对象没带回来。交换对象已经到场。",
    hero: "./assets/life-swap/intro/route-family-dinner-v2.png",
    alt: "奶蛙坐在年夜饭桌前，把节目嘉宾牌摆到桌上，亲戚们看向它和镜头。",
  }),
  "group-assignment": Object.freeze({
    id: "group-assignment",
    label: "作业到底是谁做的",
    previewTime: "周日 23:59 截止",
    previewLine: "“五人一组，15 页 PPT＋数据表。”",
    previewNote: "共享文档里到底有几个活人",
    previewHero: "./assets/life-swap/intro/backstage-choices.png",
    previewAlt: "节目后台摆着四张生活事故选择卡，等待玩家挑选。",
    firstSceneTitle: "共享文档已经打开，真正的作者还没上线。",
    directorResponse: "五个人的作业，先确认有几个活人。",
    hero: "./assets/life-swap/intro/backstage-choices.png",
    alt: "节目后台摆着等待选择的生活事故卡片。",
  }),
});
