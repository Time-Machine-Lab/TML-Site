import { loadCollectionBundle } from "./collection-store.js";
import { PREVIEW_RESULT_CARDS } from "./result-cards.js";
import { renderMuseumView } from "./merged-museum-view.js";
import { museumAssetsForCard } from "./museum-assets.js";

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
  "revived-friend.ordinary.03",
  "revived-friend.ordinary.04",
]);

function cardArt(cardId, unlocked) {
  if (!unlocked) {
    return Object.freeze({ image: "./assets/life-swap/characters-v3/locked-silhouette.png" });
  }
  const museumAssets = museumAssetsForCard(cardId);
  if (museumAssets) {
    return Object.freeze({
      image: museumAssets.storyImage,
      thumbnailImage: museumAssets.storyThumbnail,
      alt: museumAssets.storyAlt,
      characterImage: museumAssets.characterImage,
      characterWebp: museumAssets.characterWebp,
      characterAlt: museumAssets.characterAlt,
    });
  }
  if (APPROVED_CARD_ART.has(cardId)) {
    return Object.freeze({ image: `./assets/cards/${cardId}.png` });
  }
  return Object.freeze({ image: "./assets/life-swap/characters-v3/locked-silhouette.png" });
}

function cardView(card, entry, catalogNumber) {
  if (!entry) {
    const art = cardArt(card.id, false);
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
        ...art,
      }),
      back: null,
    });
  }
  const art = cardArt(card.id, true);
  return Object.freeze({
    id: card.id,
    catalogNumber,
    isUnlocked: true,
    isEligible: false,
    displayLevel: entry.displayLevel,
    canShare: false,
    front: Object.freeze({
      catalogNumber,
      ...art,
      alt: art.alt ?? card.title,
      exhibitLevel: card.tier === "hidden" ? "隐藏身份" : card.tier === "rare" ? "稀有馆藏" : "常设馆藏",
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
  const catalogTotal = Object.keys(PREVIEW_RESULT_CARDS).length;
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
      knownCount: catalogTotal,
      totalCount: catalogTotal,
      label: `已解锁 ${unlockedCount} / ${catalogTotal}`,
      catalogLabel: "常设馆藏",
    }),
    emptyNotice: unlockedCount === 0 ? "这里还是空馆。完成一次事故后，结局卡会自动进入馆藏。" : "",
    commonSeries: Object.freeze(commonSeries),
    specialExhibition: emptySection("special", "特别展出", "special"),
    forbiddenExhibit: emptySection("forbidden", "独立展室", "forbidden"),
    featured: Object.freeze([]),
  });
}

function withPreviewCard(collection, cardId) {
  if (!museumAssetsForCard(cardId) || !PREVIEW_RESULT_CARDS[cardId]) return collection;
  if (collection.cards[cardId]) return collection;
  const acquiredAt = "隔离预览";
  return Object.freeze({
    ...collection,
    cards: Object.freeze({
      ...collection.cards,
      [cardId]: Object.freeze({
        cardId,
        firstAcquiredAt: acquiredAt,
        lastAcquiredAt: acquiredAt,
        editionCount: 1,
        displayLevel: "frame",
        latestRevisionId: `${cardId}@preview`,
      }),
    }),
  });
}

const searchParams = new URL(window.location.href).searchParams;
const previewCardId = searchParams.get("preview");
const storedCollection = loadCollectionBundle(window.localStorage).v2.state;
const collection = withPreviewCard(storedCollection, previewCardId);
const initialCardId = previewCardId ?? searchParams.get("new");
renderMuseumView(root, buildModel(collection), { initialCardId });
window.__NAIWA_MERGED_MUSEUM__ = Object.freeze({ collection, previewCardId });
