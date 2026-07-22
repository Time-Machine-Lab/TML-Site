import { loadCollectionBundle } from "./collection-store.js";
import { PREVIEW_RESULT_CARDS } from "./result-cards.js";
import { renderMuseumView } from "./merged-museum-view.js";

const root = document.querySelector("#museum-root");
if (!root) throw new Error("museum root is missing");

const ROUTE_ORDER = Object.freeze(["late-work", "revived-friend", "family-care", "group-assignment"]);
const ROUTE_LABELS = Object.freeze({
  "late-work": "临近下班突然加活",
  "revived-friend": "熟人突然复活",
  "family-care": "家里人开始关心你",
  "group-assignment": "作业到底是谁做的",
});
const APPROVED_CARD_ART = new Set([
  "late-work.ordinary.01",
  "late-work.ordinary.02",
  "late-work.ordinary.03",
  "late-work.ordinary.04",
  "late-work.rare.01",
  "revived-friend.ordinary.03",
  "revived-friend.ordinary.04",
]);

function cardImage(cardId, unlocked) {
  if (unlocked && APPROVED_CARD_ART.has(cardId)) return `./assets/cards/${cardId}.png`;
  return "./assets/life-swap/characters-v3/locked-silhouette.png";
}

function cardView(card, entry, catalogNumber) {
  if (!entry) {
    return Object.freeze({
      id: card.id,
      catalogNumber,
      isUnlocked: false,
      isEligible: false,
      displayLevel: "locked",
      canShare: false,
      front: Object.freeze({
        catalogNumber,
        hint: `在「${ROUTE_LABELS[card.routeId]}」中走出另一种结果。`,
        image: cardImage(card.id, false),
      }),
      back: null,
    });
  }
  return Object.freeze({
    id: card.id,
    catalogNumber,
    isUnlocked: true,
    isEligible: false,
    displayLevel: entry.displayLevel,
    canShare: false,
    front: Object.freeze({
      catalogNumber,
      image: cardImage(card.id, true),
      alt: card.title,
      exhibitLevel: card.tier === "rare" ? "稀有馆藏" : "常设馆藏",
      identity: card.title,
      title: ROUTE_LABELS[card.routeId],
      shortConclusion: card.conclusion,
      acquisitionLabel: entry.editionCount === 1 ? "首次入馆" : `再版 ×${entry.editionCount}`,
    }),
    back: Object.freeze({
      incident: ROUTE_LABELS[card.routeId],
      choice: "由本局连续选择轨迹确定",
      actionSummary: card.coreSkill,
      exhibitId: card.id,
      firstUnlockedLabel: entry.firstAcquiredAt,
    }),
  });
}

function buildSection(routeId, cards) {
  return Object.freeze({
    id: routeId,
    title: ROUTE_LABELS[routeId],
    roomType: "gallery",
    totalCount: cards.length,
    knownCount: cards.length,
    unlockedCount: cards.filter((card) => card.isUnlocked).length,
    lockedCount: cards.filter((card) => !card.isUnlocked).length,
    undocumentedLockedCount: 0,
    cards: Object.freeze(cards),
  });
}

function emptySection(id, title, roomType) {
  return Object.freeze({
    id, title, roomType, totalCount: 0, knownCount: 0, unlockedCount: 0,
    lockedCount: 0, undocumentedLockedCount: 0, cards: Object.freeze([]),
  });
}

function buildModel(collection) {
  let catalogIndex = 0;
  const commonSeries = ROUTE_ORDER.map((routeId) => {
    const cards = Object.values(PREVIEW_RESULT_CARDS)
      .filter((card) => card.routeId === routeId)
      .map((card) => {
        catalogIndex += 1;
        return cardView(card, collection.cards[card.id] ?? null, String(catalogIndex).padStart(2, "0"));
      });
    return buildSection(routeId, cards);
  });
  const unlockedCount = Object.keys(collection.cards).filter((id) => PREVIEW_RESULT_CARDS[id]).length;
  return Object.freeze({
    isReadOnly: true,
    isVisitor: false,
    communityHref: "./index.html",
    communityLabel: "继续交换人生",
    storageStatus: Object.freeze({ ok: true, reason: "loaded" }),
    summary: Object.freeze({
      unlockedCount,
      knownCount: 20,
      totalCount: 20,
      label: `已解锁 ${unlockedCount} / 20`,
      catalogLabel: "常设馆藏",
    }),
    emptyNotice: unlockedCount === 0 ? "这里还是空馆。完成一次事故后，结局卡会自动进入馆藏。" : "",
    commonSeries: Object.freeze(commonSeries),
    specialExhibition: emptySection("special", "特别展出", "special"),
    forbiddenExhibit: emptySection("forbidden", "独立展室", "forbidden"),
    featured: Object.freeze([]),
  });
}

const collection = loadCollectionBundle(window.localStorage).v2.state;
const initialCardId = new URL(window.location.href).searchParams.get("new");
renderMuseumView(root, buildModel(collection), { initialCardId });
window.__NAIWA_MERGED_MUSEUM__ = Object.freeze({ collection });
