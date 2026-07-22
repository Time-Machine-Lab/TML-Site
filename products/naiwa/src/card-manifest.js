const ROUTE_IDS = Object.freeze([
  "late-work",
  "revived-friend",
  "family-care",
  "group-assignment",
]);

const APPROVED_NAME_ANCHORS = Object.freeze({
  "late-work.ordinary.01": "喜提工位别墅蛙",
  "late-work.ordinary.02": "「有空」过敏蛙",
  "late-work.ordinary.03": "优先级阎王蛙",
  "late-work.ordinary.04": "三分钟奥特蛙",
  "late-work.rare.01": "哆啦「工」梦蛙",
  "revived-friend.ordinary.01": "旧友回锅肉蛙",
  "revived-friend.ordinary.02": "人情防火墙蛙",
  "revived-friend.ordinary.03": "在场但已注销蛙",
  "revived-friend.ordinary.04": "礼貌发疯蛙",
  "revived-friend.rare.01": "赛博掘墓赶尸蛙",
  "family-care.ordinary.01": "家庭投喂接收器蛙",
  "family-care.ordinary.02": "端碗战略转移蛙",
  "family-care.ordinary.03": "亲情预约制蛙",
  "family-care.ordinary.04": "关心回旋镖蛙",
  "family-care.rare.01": "全家唯一监护蛙",
  "group-assignment.ordinary.01": "全组唯一活体蛙",
  "group-assignment.ordinary.02": "分工结界守门蛙",
  "group-assignment.ordinary.03": "PPT 口播寄生蛙",
  "group-assignment.ordinary.04": "final_v9 缝合蛙",
  "group-assignment.rare.01": "小组作业法医蛙",
});

export const CARD_STATUS_TRANSITIONS = Object.freeze({
  draft: Object.freeze(["source-reviewed"]),
  "source-reviewed": Object.freeze(["content-review-approved"]),
  "content-review-approved": Object.freeze(["production-approved"]),
  "production-approved": Object.freeze(["published"]),
  published: Object.freeze(["retired"]),
  retired: Object.freeze([]),
});

function makeCard(id, routeId, tier, slot) {
  const anchoredName = APPROVED_NAME_ANCHORS[id];
  return Object.freeze({
    id,
    routeId,
    tier,
    slot,
    name: anchoredName ?? null,
    contentSlotStatus: anchoredName ? "approved-name-anchor" : "reserved-content-candidate",
    contentVersion: anchoredName ? "name-anchor.v1" : null,
    approvalStatus: "draft",
    previewRenderable: false,
    productionRenderable: false,
    assetSlotKey: `${id}.character-card`,
  });
}

function createManifest() {
  const manifest = {};
  for (const routeId of ROUTE_IDS) {
    for (let index = 1; index <= 4; index += 1) {
      const slot = String(index).padStart(2, "0");
      const id = `${routeId}.ordinary.${slot}`;
      manifest[id] = makeCard(id, routeId, "ordinary", slot);
    }
    const rareId = `${routeId}.rare.01`;
    manifest[rareId] = makeCard(rareId, routeId, "rare", "01");
  }
  return Object.freeze(manifest);
}

export const CARD_MANIFEST = createManifest();

export function cardIdsForRoute(routeId) {
  if (!ROUTE_IDS.includes(routeId)) throw new RangeError(`unknown route ${routeId}`);
  return Object.freeze(
    Object.keys(CARD_MANIFEST).filter((cardId) => CARD_MANIFEST[cardId].routeId === routeId),
  );
}
