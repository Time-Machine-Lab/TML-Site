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

export const ROUTE_IDS = Object.freeze(["work", "message", "spotlight", "absurd"]);

export const INTRO_ROUTES = Object.freeze({
  work: Object.freeze({
    id: "work",
    label: "“这个不急，明早给我就行。”",
    previewTime: "22:48",
    previewLine: "“这个不急，明早给我就行。”",
    previewNote: "班味突然加重",
    previewHero: "./assets/life-swap/intro/flashbacks/work-night.png",
    previewAlt: "深夜工位上摊着改了多次的方案和冷掉的外卖，手机在键盘旁亮起。",
    firstSceneTitle: "你的工位，正在被它重新理解。",
    directorResponse: "好，班味这一口，先让奶蛙替你尝尝。",
    hero: "./assets/life-swap/hero-office-v2.png",
    alt: "奶蛙坐在办公室工位前，拿着手机并穿着深色外套和红色领带。",
  }),
  message: Object.freeze({
    id: "message",
    label: "“在吗？有件事想跟你说。”",
    previewTime: "00:17",
    previewLine: "“在吗？有件事想跟你说。”",
    previewNote: "已读之前，世界还算和平",
    previewHero: "./assets/life-swap/intro/flashbacks/message-midnight.png",
    previewAlt: "熄灯后的床边，手机照亮枕头和一只犹豫着是否点开的手。",
    firstSceneTitle: "这条消息，先由奶蛙来读。",
    directorResponse: "手机给它。尴尬先从已读开始。",
    hero: "./assets/life-swap/intro/route-message.png",
    alt: "奶蛙在生活化室内拿着亮起的手机，屏幕上出现一条让人犹豫的消息。",
  }),
  spotlight: Object.freeze({
    id: "spotlight",
    label: "“来都来了，你上去说两句。”",
    previewTime: "饭桌突然安静",
    previewLine: "“来都来了，你上去说两句。”",
    previewNote: "活人感正在被迫加载",
    previewHero: "./assets/life-swap/intro/flashbacks/spotlight-dinner.png",
    previewAlt: "聚餐现场突然安静，麦克风从画外递来，周围的人同时看向镜头。",
    firstSceneTitle: "全场等它说句话。",
    directorResponse: "行，麦克风给它，看看谁先开始替它紧张。",
    hero: "./assets/life-swap/intro/route-spotlight.png",
    alt: "奶蛙在社交现场接过麦克风，周围的人都把注意力投向它。",
  }),
  absurd: Object.freeze({
    id: "absurd",
    label: "本来想从从容容，睁眼已经连滚带爬。",
    previewTime: "周一 07:59",
    previewLine: "本来想从从容容，睁眼已经连滚带爬。",
    previewNote: "今天不宜做人",
    previewHero: "./assets/life-swap/intro/flashbacks/absurd-monday.png",
    previewAlt: "周一早晨的房间一片忙乱，闹钟、钥匙、早餐和分散的两只鞋让人来不及收拾。",
    firstSceneTitle: "它已经出门了，你的另一只鞋还没有。",
    directorResponse: "周一交给它。人类先撤离现场。",
    hero: "./assets/life-swap/intro/route-absurd-monday-v2.png",
    alt: "奶蛙站在混乱的周一早晨房间里，一只鞋穿反，另一只鞋还在床下。",
  }),
});
