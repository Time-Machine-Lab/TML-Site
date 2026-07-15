const COLOR_PROPERTIES = Object.freeze({
  paper: "--paper",
  paperLight: "--paper-light",
  ink: "--ink",
  inkSoft: "--ink-soft",
  lime: "--lime",
  limeDeep: "--lime-deep",
  coral: "--coral",
});

const TEXT_RULES = Object.freeze({
  name: Object.freeze({ maxLength: 40 }),
  shortMark: Object.freeze({ maxLength: 4 }),
  tagline: Object.freeze({ maxLength: 80, optional: true }),
  pageTitle: Object.freeze({ maxLength: 100 }),
  metaDescription: Object.freeze({ maxLength: 240 }),
  shareTitle: Object.freeze({ maxLength: 100 }),
  posterTitle: Object.freeze({ maxLength: 80 }),
  posterSubtitle: Object.freeze({ maxLength: 80 }),
  hashtag: Object.freeze({ maxLength: 50, hashtag: true }),
  downloadPrefix: Object.freeze({ maxLength: 80, filename: true }),
  posterCredit: Object.freeze({ maxLength: 120, optional: true }),
});

const UNSAFE_TEXT = /[\u0000-\u001f\u007f-\u009f<>`]|\$\{|\b(?:javascript|vbscript|data)\s*:|(?:url|expression)\s*\(/i;
const SAFE_COLOR = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const SAFE_HASHTAG = /^#[\p{L}\p{N}_-]+$/u;
const UNSAFE_FILENAME = /[\\/:*?"<>|]/;
const MAX_SITE_URL_LENGTH = 2048;
const MAX_DOMAIN_LENGTH = 253;
const LOCAL_DOMAIN_SUFFIXES = Object.freeze([
  "localhost",
  "local",
  "home.arpa",
  "localdomain",
  "lan",
  "internal",
]);

function deepFreeze(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  for (const nested of Object.values(value)) deepFreeze(nested);
  return Object.freeze(value);
}

export const DEFAULT_BRAND = deepFreeze({
  name: "怪东西观察站",
  shortMark: "怪",
  tagline: "WRONG ORGAN LAB · 005",
  pageTitle: "怪东西观察站",
  metaDescription: "选一条生活路线，亲手把一只怪东西养出七个错误器官。",
  shareTitle: "怪东西观察站 · 饲养事故报告",
  posterTitle: "我亲手养坏的东西",
  posterSubtitle: "饲养事故报告",
  hashtag: "#怪东西观察站",
  downloadPrefix: "怪东西观察站",
  siteUrl: "",
  posterCredit: "",
  colors: {
    paper: "#f1ead8",
    paperLight: "#fffdf3",
    ink: "#20211d",
    inkSoft: "#5e5d54",
    lime: "#d9ff58",
    limeDeep: "#a6c72e",
    coral: "#ff6f61",
  },
});

function readOwn(object, key) {
  try {
    if (!object || typeof object !== "object" || !Object.hasOwn(object, key)) return undefined;
    return object[key];
  } catch {
    return undefined;
  }
}

function normalizeText(value, fallback, rule) {
  if (value === undefined) return fallback;
  if (typeof value !== "string") return fallback;
  const text = value.trim();
  if (!text) return rule.optional ? "" : fallback;
  if ([...text].length > rule.maxLength || UNSAFE_TEXT.test(text)) return fallback;
  if (rule.hashtag && !SAFE_HASHTAG.test(text)) return fallback;
  if (rule.filename && UNSAFE_FILENAME.test(text)) return fallback;
  return text;
}

function isPublicDomainHostname(hostname) {
  const host = hostname
    .toLowerCase()
    .replace(/\.$/, "");
  if (
    !host
    || host.length > MAX_DOMAIN_LENGTH
    || host.includes(":")
    || /^\d+(?:\.\d+){3}$/.test(host)
  ) return false;
  if (LOCAL_DOMAIN_SUFFIXES.some((suffix) => host === suffix || host.endsWith(`.${suffix}`))) {
    return false;
  }

  const labels = host.split(".");
  return labels.length >= 2
    && labels.every((label) => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(label));
}

function normalizeSiteUrl(value) {
  if (value === undefined || value === null) return DEFAULT_BRAND.siteUrl;
  if (typeof value !== "string") return DEFAULT_BRAND.siteUrl;
  const text = value.trim();
  if (!text || text.length > MAX_SITE_URL_LENGTH || UNSAFE_TEXT.test(text)) return "";

  try {
    const url = new URL(text);
    if (
      (url.protocol !== "https:" && url.protocol !== "http:")
      || url.username
      || url.password
      || !isPublicDomainHostname(url.hostname)
      || url.href.length > MAX_SITE_URL_LENGTH
    ) {
      return "";
    }
    return url.href;
  } catch {
    return "";
  }
}

function normalizeColor(value, fallback) {
  if (typeof value !== "string") return fallback;
  const color = value.trim();
  return SAFE_COLOR.test(color) ? color.toLowerCase() : fallback;
}

export function normalizeBrand(raw) {
  const colors = readOwn(raw, "colors");
  const normalizedColors = Object.fromEntries(
    Object.keys(COLOR_PROPERTIES).map((key) => [
      key,
      normalizeColor(readOwn(colors, key), DEFAULT_BRAND.colors[key]),
    ]),
  );
  const normalized = Object.fromEntries(
    Object.entries(TEXT_RULES).map(([key, rule]) => [
      key,
      normalizeText(readOwn(raw, key), DEFAULT_BRAND[key], rule),
    ]),
  );

  return deepFreeze({
    name: normalized.name,
    shortMark: normalized.shortMark,
    tagline: normalized.tagline,
    pageTitle: normalized.pageTitle,
    metaDescription: normalized.metaDescription,
    shareTitle: normalized.shareTitle,
    posterTitle: normalized.posterTitle,
    posterSubtitle: normalized.posterSubtitle,
    hashtag: normalized.hashtag,
    downloadPrefix: normalized.downloadPrefix,
    siteUrl: normalizeSiteUrl(readOwn(raw, "siteUrl")),
    posterCredit: normalized.posterCredit,
    colors: normalizedColors,
  });
}

function readBootOverride() {
  try {
    return globalThis.__CREATURE_DEMO_BRAND__;
  } catch {
    return undefined;
  }
}

export const BRAND = normalizeBrand(readBootOverride());

function findElement(documentApi, selector) {
  try {
    return documentApi?.querySelector(selector) ?? null;
  } catch {
    return null;
  }
}

function setText(element, value, optional = false) {
  if (!element) return;
  try {
    element.textContent = value;
    if (optional) element.hidden = !value;
  } catch {
    // Missing or read-only fallback nodes must not block the game.
  }
}

function setAttribute(element, name, value) {
  if (!element) return;
  try {
    element.setAttribute(name, value);
  } catch {
    // Metadata and accessibility labels are best-effort enhancements.
  }
}

export function applyBrandToDocument(documentApi, rawBrand = BRAND) {
  const brand = normalizeBrand(rawBrand);
  try {
    documentApi.title = brand.pageTitle;
  } catch {
    // A partial document harness may expose no writable title.
  }

  setAttribute(findElement(documentApi, 'meta[name="description"]'), "content", brand.metaDescription);
  setAttribute(findElement(documentApi, 'meta[name="theme-color"]'), "content", brand.colors.paper);
  setAttribute(findElement(documentApi, "#brand-home"), "aria-label", `${brand.name}，重新开始`);
  setText(findElement(documentApi, "#brand-mark"), brand.shortMark);
  setText(findElement(documentApi, "#brand-name"), brand.name);
  setText(findElement(documentApi, "#brand-tagline"), brand.tagline, true);
  setText(findElement(documentApi, "#result-kicker"), brand.posterSubtitle);
  setText(findElement(documentApi, "#result-title"), brand.posterTitle);
  setText(findElement(documentApi, "#brand-site-url"), brand.siteUrl, true);
  setText(findElement(documentApi, "#brand-credit"), brand.posterCredit, true);

  try {
    const root = documentApi.documentElement;
    for (const [key, property] of Object.entries(COLOR_PROPERTIES)) {
      root.style.setProperty(property, brand.colors[key]);
    }
  } catch {
    // Theme hooks are optional when the document has no style declaration.
  }

  return brand;
}
