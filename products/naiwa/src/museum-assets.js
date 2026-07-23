const ROOT = "./assets/cards/late-work-dual";

function museumPair(slug, identity, characterAlt, storyAlt) {
  return Object.freeze({
    identity,
    characterImage: `${ROOT}/${slug}-character.png`,
    characterWebp: `${ROOT}/${slug}-character.webp`,
    characterAlt,
    storyImage: `${ROOT}/${slug}-story.png`,
    storyThumbnail: `${ROOT}/${slug}-story-thumb.webp`,
    storyAlt,
  });
}

export const LATE_WORK_MUSEUM_ASSETS = Object.freeze({
  "late-work.ordinary.01": museumPair(
    "workstation-homeowner",
    "工位买房蛙",
    "工位买房蛙拿着工位房钥匙站在圆台上",
    "工位买房蛙站在已经装修成卧室的办公工位中",
  ),
  "late-work.ordinary.02": museumPair(
    "p0-yama",
    "P0阎王蛙",
    "P0阎王蛙举着P0判官印站在圆台上",
    "P0阎王蛙在判官台前给一排P0任务发号",
  ),
  "late-work.ordinary.03": museumPair(
    "weekend-goalkeeper",
    "周末守门员蛙",
    "周末守门员蛙穿黄色一号门将球衣站在圆台上",
    "周末守门员蛙扑出文档、日历和工作通知，守住整个周末",
  ),
  "late-work.ordinary.04": museumPair(
    "schrodinger",
    "薛定谔的蛙",
    "薛定谔的蛙处于已读与未读同时存在的状态",
    "薛定谔的蛙在消息已读与未读之间分裂",
  ),
  "late-work.ordinary.05": museumPair(
    "cyber-possession",
    "赛博夺舍蛙",
    "赛博夺舍蛙以蓝色数字员工形态拿着工牌站在圆台上",
    "数字员工坐上工位，赛博夺舍蛙的真人版本正在逐渐退出画面",
  ),
  "late-work.hidden.01": museumPair(
    "cyber-standin",
    "赛博替身蛙",
    "赛博替身蛙本人拿着手柄，身后站着蓝色数字替身",
    "赛博替身蛙本人正在打游戏，数字替身在深夜办公室工作",
  ),
  "late-work.hidden.02": museumPair(
    "n-plus-one",
    "“N+1”蛙",
    "“N+1”蛙抱着离职纸箱站在圆台上",
    "“N+1”蛙抱着纸箱站在已经失效的公司门禁前",
  ),
});

export function museumAssetsForCard(cardId) {
  return LATE_WORK_MUSEUM_ASSETS[cardId] ?? null;
}
