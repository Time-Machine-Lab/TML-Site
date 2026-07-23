export const MUSEUM_CARD_TOTAL = 22;

const COMMON_SERIES = Object.freeze([
  Object.freeze({ id: "work", title: "临时加活", totalCount: 4 }),
  Object.freeze({ id: "message", title: "不想点开的消息", totalCount: 4 }),
]);
const SPECIAL_EXHIBITION = Object.freeze({ id: "special", title: "特别展出", totalCount: 2 });
const FORBIDDEN_EXHIBIT = Object.freeze({ id: "forbidden", title: "禁止出境展室", totalCount: 1 });
const CATALOG_NUMBERS = Object.freeze({
  "work.ignore": "01",
  "work.overtime": "02",
  "work.later": "03",
  "work.weekend": "04",
  "message.agree": "05",
  "message.one-night": "06",
  "message.path": "07",
  "message.quiet": "08",
  "special.work": "09",
  "special.message": "10",
  "forbidden.v1": "11",
});
const COMMON_LOCKED_HINTS = Object.freeze({
  work: "在「临时加活」里尝试另一种回应。",
  message: "在「不想点开的消息」里尝试另一种回应。",
});
const LOCKED_ENTITY_SILHOUETTE = "./assets/life-swap/characters-v3/locked-silhouette.png";
const ICONS = Object.freeze({
  lock: "./assets/icons/phosphor/lock-key.svg",
  previous: "./assets/icons/phosphor/caret-circle-left.svg",
  next: "./assets/icons/phosphor/caret-circle-right.svg",
});

function freezeRecord(record) {
  return Object.freeze(record);
}

function freezeList(values) {
  return Object.freeze(values);
}

function requireCatalog(catalog) {
  if (!catalog || typeof catalog !== "object" || Array.isArray(catalog)) {
    throw new RangeError("museum requires a card catalog");
  }
  return catalog;
}

function catalogCards(catalog) {
  return Object.keys(requireCatalog(catalog))
    .sort()
    .flatMap((cardId) => {
      const card = catalog[cardId];
      return card && typeof card === "object" && card.id === cardId ? [card] : [];
    });
}

function normalizeStorageStatus(status) {
  if (!status || typeof status !== "object") return freezeRecord({ ok: true, reason: "loaded" });
  return freezeRecord({ ok: status.ok === true, reason: typeof status.reason === "string" ? status.reason : "unavailable" });
}

function museumNotice(storageStatus, unlockedCount) {
  if (!storageStatus.ok) {
    return "本机馆藏暂时无法读取；这里先显示空馆，不会写入或清除任何本地结果。";
  }
  if (unlockedCount === 0) {
    return "这里还是空馆。完成一次事故后，结局卡会自动进入馆藏。";
  }
  return "";
}

function shareExhibitId(cardId, firstUnlockedAt) {
  if (typeof cardId !== "string" || !Number.isSafeInteger(firstUnlockedAt) || firstUnlockedAt < 0) return null;
  const compactCardId = cardId.replace(/[^a-z0-9]/giu, "").toLowerCase().slice(0, 11);
  if (!compactCardId) return null;

  let left = 0x811c9dc5;
  let right = 0x9e3779b9;
  for (const character of `${cardId}:${firstUnlockedAt}`) {
    const code = character.codePointAt(0) ?? 0;
    left = Math.imul(left ^ code, 0x01000193) >>> 0;
    right = Math.imul(right ^ code, 0x85ebca6b) >>> 0;
  }
  return `NFW-${compactCardId}-${left.toString(16).padStart(8, "0")}${right.toString(16).padStart(8, "0")}`;
}

export function isCollectionCardShareable(card, entry) {
  return Boolean(
    card
      && entry
      && card.productionRenderable === true
      && Number.isSafeInteger(entry.firstUnlockedAt)
      && entry.firstUnlockedAt >= 0
      && Number.isSafeInteger(entry.editionCount)
      && entry.editionCount >= 1
      && entry.editionCount <= 999,
  );
}

export function createCollectionShareModel({ cardId, collectionState, baseUrl } = {}) {
  try {
    ownedCardIds(collectionState);
    const card = CARD_CATALOG[cardId];
    const entry = collectionState.entries[cardId];
    if (!isCollectionCardShareable(card, entry)) return null;

    const exhibitId = shareExhibitId(cardId, entry.firstUnlockedAt);
    if (!exhibitId) return null;
    const payload = createSharePayload({
      v: 1,
      cardId,
      exhibitId,
      editionCount: entry.editionCount,
    });
    const canonicalLink = encodeShareLink({ baseUrl, payload });
    return freezeRecord({
      payload,
      viewModel: buildShareCardViewModel({ payload, canonicalLink }),
    });
  } catch {
    return null;
  }
}

function catalogNumberFor(cardId) {
  return CATALOG_NUMBERS[cardId] ?? "待编";
}

export function museumCatalogNumber(cardId) {
  return catalogNumberFor(cardId);
}

function lockedMuseumCard({ id, catalogNumber, hint, image = null, isEligible = false, route = null }) {
  return freezeRecord({
    id,
    catalogNumber,
    isUnlocked: false,
    isEligible,
    route,
    displayLevel: isEligible ? "eligible" : "locked",
    canShare: false,
    front: freezeRecord({
      catalogNumber,
      hint,
      ...(typeof image === "string" && image ? { image } : {}),
    }),
    back: null,
  });
}

function museumCard(card, entries, {
  catalogNumber = catalogNumberFor(card.id),
  lockedHint,
  isEligible = false,
  route = null,
} = {}) {
  const entry = Object.hasOwn(entries, card.id) ? entries[card.id] : null;
  if (entry === null) {
    return lockedMuseumCard({
      id: card.id,
      catalogNumber,
      hint: lockedHint ?? "继续探索本系列，馆藏会在合适的时候现身。",
      image: LOCKED_ENTITY_SILHOUETTE,
      isEligible,
      route,
    });
  }
  const view = buildEndingCardViewModel(card, entry);
  return freezeRecord({
    id: card.id,
    catalogNumber,
    isUnlocked: view.isUnlocked,
    isEligible: false,
    displayLevel: entry?.displayLevel ?? "locked",
    canShare: isCollectionCardShareable(card, entry),
    front: freezeRecord({ ...view.front, identity: card.identity, catalogNumber }),
    back: view.back,
  });
}

function displayLevelForEdition(editionCount) {
  if (editionCount === 1) return "frame";
  if (editionCount === 2) return "lit";
  return "plaque";
}

function visitorMuseumCard(publicCard, catalog) {
  const card = catalog[publicCard.cardId];
  if (!card || card.id !== publicCard.cardId) return null;
  const view = buildEndingCardViewModel(card, {
    cardId: publicCard.cardId,
    firstUnlockedAt: publicCard.firstUnlockedAt,
    editionCount: publicCard.editionCount,
  });
  return freezeRecord({
    id: publicCard.cardId,
    publishedId: publicCard.publishedId,
    catalogNumber: catalogNumberFor(publicCard.cardId),
    isUnlocked: true,
    isEligible: false,
    displayLevel: displayLevelForEdition(publicCard.editionCount),
    canShare: false,
    front: freezeRecord({ ...view.front, identity: card.identity, catalogNumber: catalogNumberFor(publicCard.cardId) }),
    back: view.back,
    community: freezeRecord({
      frogId: publicCard.frogId,
      publishedAt: publicCard.publishedAt,
      likeCount: publicCard.likeCount,
    }),
  });
}

function buildSection({ id, title, totalCount, cards, roomType = "gallery" }) {
  const views = cards;
  const unlockedCount = views.filter((card) => card.isUnlocked).length;
  return freezeRecord({
    id,
    title,
    roomType,
    totalCount,
    knownCount: views.length,
    unlockedCount,
    lockedCount: Math.max(totalCount - unlockedCount, 0),
    undocumentedLockedCount: Math.max(totalCount - views.length, 0),
    cards: freezeList(views),
  });
}

function cardsForCommonSeries(cards, seriesId) {
  return cards
    .filter((card) => card.seriesId === seriesId && card.exhibitLevel === "常设馆藏")
    .sort((left, right) => catalogNumberFor(left.id).localeCompare(catalogNumberFor(right.id)));
}

function cardsForExhibitLevel(cards, exhibitLevel) {
  return cards.filter((card) => card.exhibitLevel === exhibitLevel);
}

function exhibitSlot(catalog, entries, hint) {
  const card = catalog[hint.id];
  if (card && typeof card === "object" && card.id === hint.id) {
    return museumCard(card, entries, {
      catalogNumber: hint.catalogNumber,
      lockedHint: hint.hint,
      isEligible: hint.isEligible,
      route: hint.isEligible ? `./life-swap.html?hidden=${encodeURIComponent(hint.id)}` : null,
    });
  }
  return lockedMuseumCard(hint);
}

function createElement(document, tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function renderIcon(document, source, className) {
  const icon = createElement(document, "img", className);
  icon.src = source;
  icon.alt = "";
  icon.setAttribute("aria-hidden", "true");
  return icon;
}

function applyResponsiveSources(image, source, sizes = "(max-width: 767px) 88vw, (max-width: 1023px) 62vw, 44vw") {
  image.src = source;
  if (typeof source !== "string" || !source.endsWith(".png") || source.startsWith("./assets/cards/")) return;
  const stem = source.slice(0, -4);
  image.srcset = `${stem}-720.webp 720w, ${stem}-1440.webp 1440w`;
  image.sizes = sizes;
}

function renderResponsiveCharacter(document, front, {
  pictureClass = "museum-card__character-media",
  imageClass = "museum-card__character",
  loading = "eager",
  alt = front.characterAlt,
} = {}) {
  const picture = createElement(document, "picture", pictureClass);
  picture.style.setProperty("--character-offset-x", `${front.characterOffsetX ?? 0}%`);
  picture.style.setProperty("--character-offset-y", `${front.characterOffsetY ?? 0}%`);
  const image = createElement(document, "img", imageClass);
  image.src = front.characterImage;
  image.alt = alt;
  image.loading = loading;
  image.decoding = "async";
  if (front.characterAvif) {
    const avif = createElement(document, "source");
    avif.srcset = front.characterAvif;
    avif.type = "image/avif";
    picture.append(avif);
  }
  if (front.characterWebp) {
    const source = createElement(document, "source");
    source.srcset = front.characterWebp;
    source.type = "image/webp";
    picture.append(source);
  }
  picture.append(image);
  return picture;
}

function renderCharacterMedia(document, front, loading) {
  return renderResponsiveCharacter(document, front, { loading });
}

function renderCard(document, card, { loading = "lazy" } = {}) {
  const article = createElement(document, "article", "museum-card");
  article.dataset.unlocked = String(card.isUnlocked);
  article.dataset.displayLevel = card.displayLevel;
  article.dataset.catalogNumber = card.catalogNumber;

  if (!card.isUnlocked) {
    if (card.front.image) {
      const image = createElement(document, "img", "museum-card__image museum-card__image--locked");
      applyResponsiveSources(image, card.front.image);
      image.alt = "";
      image.loading = "lazy";
      image.setAttribute("aria-hidden", "true");
      article.append(image);
    }
    const front = createElement(document, "div", "museum-card__front museum-card__front--locked");
    front.append(
      renderIcon(document, ICONS.lock, "museum-gallery__lock-icon"),
      createElement(document, "p", "museum-card__catalog-number", `目录 ${card.catalogNumber}`),
      createElement(document, "h3", "museum-card__title", "锁定馆藏"),
      createElement(document, "p", "museum-card__hint", card.front.hint),
      createElement(document, "p", "museum-gallery__lock-status", "尚未解锁 · 继续完成对应事故"),
    );
    const plaque = createElement(document, "button", "museum-card__plaque-trigger", `目录 ${card.catalogNumber} · 尚未解锁`);
    plaque.type = "button";
    plaque.disabled = true;
    plaque.setAttribute("aria-disabled", "true");
    front.append(plaque);
    if (card.route) {
      const action = createElement(document, "a", "museum-card__hidden-action", "进入隐藏事故");
      action.href = card.route;
      action.dataset.action = "open-hidden-incident";
      action.dataset.cardId = card.id;
      front.append(action);
    }
    article.append(front);
    return article;
  }

  if (card.front.characterImage) {
    article.append(renderCharacterMedia(document, card.front, loading));
  } else {
    const image = createElement(document, "img", "museum-card__image");
    applyResponsiveSources(image, card.front.image);
    image.alt = card.front.alt;
    image.loading = "lazy";
    article.append(image);
  }

  const front = createElement(document, "div", "museum-card__front");
  front.append(
    createElement(document, "p", "museum-card__catalog-number", `目录 ${card.catalogNumber}`),
    createElement(document, "p", "museum-card__level", card.front.exhibitLevel),
    createElement(document, "h3", "museum-card__title", card.front.identity),
    createElement(document, "p", "museum-card__case-title", card.front.title),
    createElement(document, "p", "museum-card__conclusion", card.front.shortConclusion),
    createElement(document, "p", "museum-card__edition", card.front.acquisitionLabel),
  );
  if (card.community) {
    front.append(
      createElement(document, "p", "museum-card__community-meta", `公开于 ${card.community.publishedAt} · ${card.community.likeCount} 个赞`),
    );
  }
  article.append(front);

  const plaque = createElement(
    document,
    "button",
    "museum-card__plaque-trigger",
    `${card.catalogNumber} · ${card.front.identity} · 查看馆藏详情`,
  );
  plaque.type = "button";
  plaque.dataset.action = "open-exhibit-dialog";
  plaque.dataset.cardId = card.id;
  front.append(plaque);
  if (card.canShare) {
    const sharing = createElement(document, "div", "museum-card__sharing");
    const action = createElement(document, "button", "museum-card__share-action", "分享这张结局卡");
    action.type = "button";
    action.dataset.action = "share-card";
    action.dataset.cardId = card.id;
    const status = createElement(document, "p", "museum-card__share-status");
    status.dataset.shareStatus = "";
    status.setAttribute("aria-live", "polite");
    status.hidden = true;
    const fallback = createElement(document, "textarea", "museum-card__share-fallback");
    fallback.dataset.shareFallback = "";
    fallback.readOnly = true;
    fallback.hidden = true;
    fallback.setAttribute("aria-label", "可复制的分享文字");
    sharing.append(action, status, fallback);
    front.append(sharing);
  }
  return article;
}

function galleryCards(model) {
  if (model.isVisitor === true) return model.publicCards;
  return [
    ...model.commonSeries.flatMap((section) => section.cards.map((card) => ({ ...card, roomType: section.roomType, seriesTitle: section.title }))),
    ...model.specialExhibition.cards.map((card) => ({ ...card, roomType: "special", seriesTitle: model.specialExhibition.title })),
    ...model.forbiddenExhibit.cards.map((card) => ({ ...card, roomType: "forbidden", seriesTitle: model.forbiddenExhibit.title })),
  ];
}

function selectedGalleryIndex(cards, initialCardId = null) {
  const requested = cards.findIndex((card) => card.id === initialCardId && card.isUnlocked);
  if (requested >= 0) return requested;
  const firstUnlocked = cards.findIndex((card) => card.isUnlocked);
  return firstUnlocked >= 0 ? firstUnlocked : 0;
}

function renderRailImage(document, card) {
  if (!card.front.image) return null;
  const source = card.front.thumbnailImage ?? card.front.image;
  const image = createElement(
    document,
    "img",
    `museum-gallery__rail-image${card.isUnlocked ? "" : " museum-gallery__rail-image--locked"}`,
  );
  applyResponsiveSources(image, source, "98px");
  image.alt = "";
  image.loading = "lazy";
  image.setAttribute("aria-hidden", "true");
  return image;
}

function renderGallery(document, model, { initialCardId = null } = {}) {
  const cards = galleryCards(model);
  const selectedIndex = selectedGalleryIndex(cards, initialCardId);
  const selectedId = cards[selectedIndex]?.id ?? "";
  const gallery = createElement(document, "section", "museum-gallery");
  gallery.dataset.gallery = "";

  const header = createElement(document, "header", "museum-header museum-gallery__masthead");
  const title = createElement(document, "h1", "museum-header__title");
  if (model.isVisitor) {
    title.textContent = `蛙民 ${model.frogId} 的夜间馆藏`;
  } else {
    title.append(
      createElement(document, "span", "museum-header__title-major", "夜间"),
      createElement(document, "span", "museum-header__title-minor", "珍藏馆"),
    );
  }
  header.append(
    createElement(document, "p", "museum-header__eyebrow", model.isVisitor ? "奶蛙交换博物馆 · 蛙民参观" : "奶蛙交换博物馆 · 私人夜场"),
    title,
    createElement(document, "p", "museum-header__summary", model.summary.label.replace("已解锁", "已收录")),
    createElement(
      document,
      "p",
      "museum-header__catalog",
      model.isVisitor ? model.summary.catalogLabel : "常设馆藏",
    ),
  );
  if (!model.isVisitor && model.communityHref) {
    const community = createElement(document, "a", "museum-header__community-link", model.communityLabel ?? "继续交换人生");
    community.href = model.communityHref;
    header.append(community);
  }
  gallery.append(header);

  const topProgress = createElement(
    document,
    "p",
    "museum-gallery__top-progress",
    model.isVisitor ? model.summary.label : `馆藏进度 ${model.summary.unlockedCount} / ${model.summary.totalCount}`,
  );
  gallery.append(topProgress);

  const scene = createElement(document, "div", "museum-gallery__scene");
  const sceneArt = createElement(document, "picture", "museum-gallery__scene-art");
  const sceneAvif = createElement(document, "source");
  sceneAvif.srcset = "./assets/life-swap/museum-v4/museum-desktop.avif";
  sceneAvif.type = "image/avif";
  const sceneWebp = createElement(document, "source");
  sceneWebp.srcset = "./assets/life-swap/museum-v4/museum-desktop.webp";
  sceneWebp.type = "image/webp";
  const sceneImage = createElement(document, "img", "museum-gallery__scene-image");
  sceneImage.src = "./assets/life-swap/museum-v4/museum-desktop.webp";
  sceneImage.alt = "";
  sceneImage.setAttribute("aria-hidden", "true");
  sceneImage.decoding = "async";
  sceneArt.append(sceneAvif, sceneWebp, sceneImage);

  const stage = createElement(document, "div", "museum-gallery__stage");
  stage.dataset.exhibitStage = "";
  stage.setAttribute("aria-live", "polite");
  for (const [index, card] of cards.entries()) {
    const panel = createElement(
      document,
      "div",
      `museum-gallery__panel museum-gallery__panel--${card.roomType ?? "gallery"}`,
    );
    panel.dataset.exhibitPanel = card.id;
    panel.dataset.room = card.roomType ?? "gallery";
    panel.hidden = index !== selectedIndex;
    panel.append(renderCard(document, card, { loading: index === selectedIndex ? "eager" : "lazy" }));
    stage.append(panel);
  }
  const plinth = createElement(document, "div", "museum-gallery__plinth");
  plinth.setAttribute("aria-hidden", "true");
  stage.append(plinth);

  const preview = createElement(document, "aside", "museum-gallery__preview");
  preview.setAttribute("aria-label", "本件馆藏剧情");
  for (const [index, card] of cards.entries()) {
    const storyCard = selectedStoryCard(cards, index);
    if (!storyCard) continue;
    const frame = createElement(document, "div", "museum-gallery__preview-frame");
    frame.dataset.exhibitPreview = card.id;
    frame.dataset.storyUnlocked = String(storyCard.isUnlocked);
    frame.hidden = index !== selectedIndex;
    if (storyCard.front.image) {
      const image = createElement(
        document,
        "img",
        `museum-gallery__preview-image${storyCard.isUnlocked ? "" : " museum-gallery__preview-image--locked"}`,
      );
      applyResponsiveSources(image, storyCard.front.image);
      image.alt = storyCard.isUnlocked ? `馆藏剧情：${storyCard.front.identity}` : "";
      image.loading = "lazy";
      if (!storyCard.isUnlocked) image.setAttribute("aria-hidden", "true");
      frame.append(image);
    }
    const previewPlaque = createElement(document, "div", "museum-gallery__preview-plaque");
    previewPlaque.append(
      createElement(document, "span", "museum-gallery__preview-number", `目录 ${storyCard.catalogNumber}`),
      createElement(
        document,
        "span",
        "museum-gallery__lock-status",
        storyCard.isUnlocked ? "本件剧情 · 已收录" : "本件剧情 · 尚未解锁",
      ),
    );
    frame.append(
      storyCard.isUnlocked
        ? createElement(document, "span", "museum-gallery__unlocked-mark", "已解锁")
        : renderIcon(document, ICONS.lock, "museum-gallery__lock-icon"),
      previewPlaque,
    );
    preview.append(frame);
  }
  scene.append(sceneArt, stage, preview);
  gallery.append(scene);

  if (!model.isVisitor && model.forbiddenExhibit.cards.length > 0) {
    const forbidden = model.forbiddenExhibit.cards[0];
    const door = createElement(document, "button", "museum-gallery__forbidden-door");
    door.type = "button";
    door.dataset.action = "select-exhibit";
    door.dataset.exhibitId = forbidden.id;
    door.dataset.unlocked = String(forbidden.isUnlocked);
    door.setAttribute(
      "aria-label",
      `禁止出境 · ${forbidden.isUnlocked ? "独立展室已开放" : forbidden.isEligible ? "入口已经显影" : "远端独立展室"}`,
    );
    door.append(
      createElement(document, "span", "museum-gallery__forbidden-label", "禁止出境"),
      createElement(
        document,
        "span",
        "museum-gallery__forbidden-status",
        forbidden.isUnlocked ? "独立展室已开放" : forbidden.isEligible ? "入口已经显影" : "远端独立展室",
      ),
    );
    scene.append(door);

  }

  const railShell = createElement(document, "div", "museum-gallery__rail-shell");
  const previous = createElement(document, "button", "museum-gallery__rail-arrow museum-gallery__rail-arrow--previous");
  previous.type = "button";
  previous.dataset.action = "step-rail";
  previous.dataset.direction = "previous";
  previous.setAttribute("aria-label", "向前浏览馆藏");
  previous.append(renderIcon(document, ICONS.previous, "museum-gallery__rail-arrow-icon"));

  const rail = createElement(document, "nav", "museum-gallery__rail");
  rail.dataset.exhibitRail = "";
  rail.setAttribute("aria-label", model.isVisitor ? "公开馆藏轨道" : "十一件馆藏轨道");
  for (const [index, card] of cards.entries()) {
    const button = createElement(document, "button", "museum-gallery__rail-item");
    button.type = "button";
    button.dataset.action = "select-exhibit";
    button.dataset.exhibitId = card.id;
    button.dataset.unlocked = String(card.isUnlocked);
    button.dataset.room = card.roomType ?? "gallery";
    button.setAttribute("aria-pressed", String(card.id === selectedId));
    button.setAttribute(
      "aria-label",
      card.isUnlocked ? `目录 ${card.catalogNumber}，${card.front.identity}` : `目录 ${card.catalogNumber}，锁定馆藏`,
    );
    const image = renderRailImage(document, card);
    if (image) button.append(image);
    button.append(
      createElement(document, "span", "museum-gallery__rail-number", card.catalogNumber),
      createElement(document, "span", "museum-gallery__rail-name", card.isUnlocked ? card.front.identity : "待解锁"),
    );
    if (!card.isUnlocked) button.append(createElement(document, "span", "museum-gallery__lock-status", "锁定"));
    rail.append(button);
  }
  const next = createElement(document, "button", "museum-gallery__rail-arrow museum-gallery__rail-arrow--next");
  next.type = "button";
  next.dataset.action = "step-rail";
  next.dataset.direction = "next";
  next.setAttribute("aria-label", "向后浏览馆藏");
  next.append(renderIcon(document, ICONS.next, "museum-gallery__rail-arrow-icon"));
  railShell.append(previous, rail, next);
  gallery.append(railShell);
  return gallery;
}

export function selectedStoryCard(cards, selectedIndex) {
  if (!Array.isArray(cards)) return null;
  return cards[selectedIndex] ?? null;
}

function bindGalleryInteractions(gallery, cards) {
  if (!gallery || typeof gallery.querySelectorAll !== "function" || typeof gallery.addEventListener !== "function") return;
  const panels = [...gallery.querySelectorAll("[data-exhibit-panel]")];
  const previews = [...gallery.querySelectorAll("[data-exhibit-preview]")];
  const controls = [...gallery.querySelectorAll("[data-action='select-exhibit']")];
  const railControls = controls.filter((control) => control.classList?.contains("museum-gallery__rail-item"));
  const rail = gallery.querySelector("[data-exhibit-rail]");
  let activeTransition = null;

  const select = (id, { focus = false } = {}) => {
    if (!id || !panels.some((panel) => panel.dataset.exhibitPanel === id)) return;
    const applySelection = () => {
      for (const panel of panels) panel.hidden = panel.dataset.exhibitPanel !== id;
      for (const preview of previews) preview.hidden = preview.dataset.exhibitPreview !== id;
      for (const control of controls) control.setAttribute("aria-pressed", String(control.dataset.exhibitId === id));
      gallery.dataset.activeExhibit = id;
    };
    activeTransition?.skipTransition?.();
    const transition = gallery.ownerDocument.startViewTransition?.(applySelection);
    if (!transition) {
      applySelection();
    } else {
      activeTransition = transition;
      transition.finished
        ?.catch?.(() => {})
        ?.finally?.(() => {
          if (activeTransition === transition) activeTransition = null;
        });
    }
    const target = railControls.find((control) => control.dataset.exhibitId === id);
    if (target && rail?.scrollTo) {
      rail.scrollTo({ left: Math.max(0, target.offsetLeft - (rail.clientWidth - target.offsetWidth) / 2), behavior: "smooth" });
    }
    if (focus) target?.focus?.();
  };

  const dialog = gallery.ownerDocument.querySelector?.("[data-exhibit-dialog]");
  const openDialog = (cardId) => {
    const card = cards.find((candidate) => candidate.id === cardId && candidate.isUnlocked);
    if (!card || !dialog) return;
    const setText = (selector, value) => {
      const target = dialog.querySelector(selector);
      if (target) target.textContent = value;
    };
    setText("[data-dialog-catalog]", `馆藏档案 · ${card.catalogNumber}`);
    setText("[data-dialog-title]", card.front.identity);
    setText("[data-dialog-conclusion]", card.front.shortConclusion);
    const facts = dialog.querySelector("[data-dialog-facts]");
    if (facts) {
      facts.replaceChildren();
      for (const [term, value] of [
        ["事故", card.back.incident],
        ["选择", card.back.choice],
        ["奶蛙行动", card.back.actionSummary],
        ["展品 ID", card.back.exhibitId],
        ["首次解锁", card.back.firstUnlockedLabel],
      ]) {
        facts.append(createElement(gallery.ownerDocument, "dt", "museum-dialog__term", term));
        facts.append(createElement(gallery.ownerDocument, "dd", "museum-dialog__value", value));
      }
    }
    dialog.showModal();
  };

  gallery.addEventListener("click", (event) => {
    const plaque = event.target.closest?.("[data-action='open-exhibit-dialog']");
    if (plaque && gallery.contains(plaque)) {
      openDialog(plaque.dataset.cardId);
      return;
    }
    const railStep = event.target.closest?.("[data-action='step-rail']");
    if (railStep && gallery.contains(railStep)) {
      const direction = railStep.dataset.direction === "previous" ? -1 : 1;
      rail?.scrollBy?.({ left: direction * Math.max(rail.clientWidth * 0.72, 280), behavior: "smooth" });
      return;
    }
    const control = event.target.closest?.("[data-action='select-exhibit']");
    if (control && gallery.contains(control)) select(control.dataset.exhibitId);
  });
  gallery.addEventListener("keydown", (event) => {
    const control = event.target.closest?.(".museum-gallery__rail-item");
    if (!control || !gallery.contains(control) || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    const index = railControls.indexOf(control);
    const step = event.key === "ArrowRight" ? 1 : -1;
    const next = railControls[(index + step + railControls.length) % railControls.length];
    select(next?.dataset.exhibitId, { focus: true });
  });
  dialog?.addEventListener?.("click", (event) => {
    if (event.target === dialog || event.target.closest?.("[data-action='close-exhibit-dialog']")) dialog.close();
  });

  const finePointer = gallery.ownerDocument.defaultView?.matchMedia?.("(pointer: fine)").matches;
  if (finePointer) {
    gallery.addEventListener("pointermove", (event) => {
      gallery.style.setProperty("--spot-x", `${(event.clientX / window.innerWidth) * 100}%`);
      gallery.style.setProperty("--spot-y", `${(event.clientY / window.innerHeight) * 100}%`);
    });
  }
  select(gallery.querySelector(".museum-gallery__rail-item[aria-pressed='true']")?.dataset.exhibitId);
}

function renderSection(document, section) {
  const container = createElement(
    document,
    "section",
    `museum-section${section.roomType === "forbidden" ? " museum-section--forbidden" : ""}`,
  );
  container.dataset.section = section.id;
  container.dataset.room = section.roomType;
  const heading = createElement(document, "div", "museum-section__heading");
  heading.append(
    createElement(document, "h2", "museum-section__title", section.title),
    createElement(document, "p", "museum-section__count", `${section.unlockedCount} / ${section.totalCount}`),
  );
  container.append(heading);

  if (section.cards.length) {
    const grid = createElement(document, "div", "museum-card-grid");
    for (const card of section.cards) grid.append(renderCard(document, card));
    container.append(grid);
  }
  if (section.undocumentedLockedCount) {
    container.append(
      createElement(
        document,
        "p",
        "museum-section__reserved",
        `尚有 ${section.undocumentedLockedCount} 个锁定名额，目录尚未公开详情。`,
      ),
    );
  }
  return container;
}

export function createMuseumViewModel(collectionState, { catalog = CARD_CATALOG, storageStatus } = {}) {
  const ids = ownedCardIds(collectionState);
  const cards = catalogCards(catalog);
  const cardsById = new Map(cards.map((card) => [card.id, card]));
  const entries = collectionState.entries;
  const knownOwnedIds = ids.filter((cardId) => cardsById.has(cardId));
  const lockedHints = new Map(nextLockedHints(collectionState).map((hint) => [hint.id, hint]));
  const commonSeries = COMMON_SERIES.map((series) => buildSection({
    ...series,
    cards: cardsForCommonSeries(cards, series.id).map((card) => museumCard(card, entries, {
      lockedHint: COMMON_LOCKED_HINTS[series.id],
    })),
  }));
  const specialExhibition = buildSection({
    ...SPECIAL_EXHIBITION,
    roomType: "special",
    cards: ["special.work", "special.message"].map((id) => exhibitSlot(catalog, entries, lockedHints.get(id))),
  });
  const forbiddenCards = [exhibitSlot(catalog, entries, lockedHints.get("forbidden.v1"))];
  const forbiddenExhibit = buildSection({
    ...FORBIDDEN_EXHIBIT,
    title: forbiddenCards[0].isUnlocked ? "禁止出境展室" : "独立展室",
    roomType: "forbidden",
    cards: forbiddenCards,
  });
  const featured = collectionState.featuredCardIds
    .filter((cardId) => cardsById.has(cardId) && Object.hasOwn(entries, cardId))
    .slice(0, 3)
    .map((cardId) => museumCard(cardsById.get(cardId), entries));
  const normalizedStorageStatus = normalizeStorageStatus(storageStatus);

  return freezeRecord({
    isReadOnly: true,
    storageStatus: normalizedStorageStatus,
    summary: freezeRecord({
      unlockedCount: knownOwnedIds.length,
      knownCount: cards.length,
      totalCount: MUSEUM_CARD_TOTAL,
      label: `已解锁 ${knownOwnedIds.length} / ${MUSEUM_CARD_TOTAL}`,
      catalogLabel: `目录编号 ${MUSEUM_CARD_TOTAL} / ${MUSEUM_CARD_TOTAL}`,
    }),
    emptyNotice: museumNotice(normalizedStorageStatus, knownOwnedIds.length),
    commonSeries: freezeList(commonSeries),
    specialExhibition,
    forbiddenExhibit,
    featured: freezeList(featured),
  });
}

export function loadMuseumViewModel(storage, options = {}) {
  const loaded = loadCollectionState(storage);
  return createMuseumViewModel(loaded.state, {
    ...options,
    storageStatus: { ok: loaded.ok, reason: loaded.reason },
  });
}

export function createVisitorMuseumViewModel(remoteMuseum, { catalog = CARD_CATALOG, expectedFrogId } = {}) {
  const projected = projectVisitorMuseum(remoteMuseum, { catalog, expectedFrogId });
  if (!projected) throw new RangeError("visitor museum is invalid");

  const cards = projected.cards
    .map((card) => visitorMuseumCard(card, catalog))
    .filter(Boolean);
  const cardsByPublishedId = new Map(cards.map((card) => [card.publishedId, card]));
  const featured = projected.featuredCards
    .map((card) => cardsByPublishedId.get(card.publishedId))
    .filter(Boolean)
    .slice(0, 3);

  return freezeRecord({
    isReadOnly: true,
    isVisitor: true,
    frogId: projected.frogId,
    storageStatus: freezeRecord({ ok: true, reason: "remote-publication" }),
    summary: freezeRecord({
      unlockedCount: cards.length,
      knownCount: cards.length,
      totalCount: cards.length,
      label: `公开 ${cards.length} 件馆藏`,
      catalogLabel: "仅展示蛙民主动公开的结局卡",
    }),
    emptyNotice: cards.length ? "" : "这位蛙民还没有公开馆藏。",
    featured: freezeList(featured),
    publicCards: freezeList(cards),
  });
}

export function renderMuseumView(root, model, { initialCardId = null } = {}) {
  if (!root || typeof root.replaceChildren !== "function" || !root.ownerDocument) {
    throw new RangeError("museum root is invalid");
  }
  if (!model || typeof model !== "object") throw new RangeError("museum view model is invalid");

  const { ownerDocument: document } = root;
  const fragment = document.createDocumentFragment();
  const cards = galleryCards(model);
  const gallery = renderGallery(document, model, { initialCardId });
  fragment.append(gallery);

  if (model.emptyNotice) fragment.append(createElement(document, "p", "museum-empty-notice", model.emptyNotice));

  root.replaceChildren(fragment);
  bindGalleryInteractions(gallery, cards);
}
