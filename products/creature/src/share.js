import { BRAND, normalizeBrand } from "./brand-config.js";

const POSTER_WIDTH = 1080;
const POSTER_HEIGHT = 1440;
const DEFAULT_POSTER_FILENAME = `${BRAND.downloadPrefix}-${BRAND.posterSubtitle}.png`;
const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
const XMLNS_NAMESPACE = "http://www.w3.org/2000/xmlns/";
const XLINK_NAMESPACE = "http://www.w3.org/1999/xlink";
const CREATURE_FRAME = Object.freeze({ x: 96, y: 365, width: 888, height: 405 });
const POSTER_TEXT_RIGHT = 992;
const POSTER_FOOTER_RIGHT = 700;
const SAFE_SVG_ELEMENTS = new Set([
  "svg", "g", "defs", "title", "desc", "symbol", "use",
  "path", "rect", "circle", "ellipse", "line", "polyline", "polygon",
  "lineargradient", "radialgradient", "stop", "clippath", "mask",
  "filter", "fegaussianblur", "femerge", "femergenode", "fecolormatrix",
  "feoffset", "feblend", "fecomposite", "feflood", "fedropshadow",
  "pattern", "marker", "text", "tspan",
]);
const SAFE_SVG_ATTRIBUTES = new Set([
  "id", "class", "role", "aria-hidden", "aria-label", "aria-labelledby", "aria-describedby",
  "viewbox", "preserveaspectratio", "x", "y", "width", "height",
  "x1", "x2", "y1", "y2", "cx", "cy", "r", "rx", "ry", "fx", "fy", "fr",
  "d", "points", "pathlength", "transform", "opacity", "visibility", "display",
  "fill", "fill-rule", "fill-opacity", "stroke", "stroke-width", "stroke-linecap",
  "stroke-linejoin", "stroke-miterlimit", "stroke-dasharray", "stroke-dashoffset",
  "vector-effect", "shape-rendering", "paint-order",
  "gradientunits", "gradienttransform", "spreadmethod", "offset", "stop-color", "stop-opacity",
  "filter", "filterunits", "primitiveunits", "color-interpolation-filters",
  "clippathunits", "clip-path", "mask", "maskunits", "maskcontentunits",
  "marker-start", "marker-mid", "marker-end", "markerwidth", "markerheight",
  "markerunits", "refx", "refy", "orient",
  "result", "in", "in2", "stddeviation", "dx", "dy", "values", "type", "operator",
  "k1", "k2", "k3", "k4", "flood-color", "flood-opacity", "mode",
  "patternunits", "patterncontentunits", "patterntransform",
  "font-family", "font-size", "font-weight", "text-anchor", "dominant-baseline",
]);

function readCapability(object, key) {
  try {
    return object?.[key] ?? null;
  } catch {
    return null;
  }
}

function unavailable(reason) {
  return {
    status: "image-unavailable",
    mode: "none",
    blob: null,
    width: POSTER_WIDTH,
    height: POSTER_HEIGHT,
    reason,
  };
}

function asText(value, fallback = "未记录") {
  const text = String(value ?? "").trim();
  return text || fallback;
}

function selectedOrgans(result, decisions) {
  const candidates = Array.isArray(result?.organs) && result.organs.length
    ? result.organs
    : Array.isArray(decisions)
      ? decisions
      : [];
  const names = candidates
    .map((item) => asText(item?.organName ?? item?.name, ""))
    .filter(Boolean);

  return names.length ? names : ["尚未长出可登记器官"];
}

function wrapText(context, text, x, y, maxWidth, lineHeight, maxLines = Infinity) {
  const source = asText(text);
  const characters = [...source];
  const lines = [];
  let line = "";

  for (const character of characters) {
    const candidate = `${line}${character}`;
    if (line && context.measureText(candidate).width > maxWidth) {
      lines.push(line);
      line = character;
      if (lines.length === maxLines) break;
    } else {
      line = candidate;
    }
  }
  if (line && lines.length < maxLines) lines.push(line);

  lines.forEach((value, index) => context.fillText(value, x, y + index * lineHeight));
  return y + lines.length * lineHeight;
}

function replaceFontSize(font, size) {
  return String(font).replace(/\d+(?:\.\d+)?px/, `${size}px`);
}

function ellipsizeText(context, text, maxWidth) {
  const value = String(text ?? "");
  if (context.measureText(value).width <= maxWidth) return value;

  const ellipsis = "…";
  if (context.measureText(ellipsis).width > maxWidth) return "";
  const characters = [...value];
  let low = 0;
  let high = characters.length;
  while (low < high) {
    const middle = Math.ceil((low + high) / 2);
    if (context.measureText(`${characters.slice(0, middle).join("")}${ellipsis}`).width <= maxWidth) {
      low = middle;
    } else {
      high = middle - 1;
    }
  }
  return `${characters.slice(0, low).join("")}${ellipsis}`;
}

function fitSingleLine(context, text, maxWidth, minFontSize = null) {
  const value = String(text ?? "");
  const fontSize = Number.parseFloat(String(context.font).match(/(\d+(?:\.\d+)?)px/)?.[1] ?? "");
  if (Number.isFinite(fontSize) && Number.isFinite(minFontSize)) {
    for (let size = Math.floor(fontSize); size >= minFontSize; size -= 1) {
      context.font = replaceFontSize(context.font, size);
      if (context.measureText(value).width <= maxWidth) return value;
    }
  }
  return ellipsizeText(context, value, maxWidth);
}

function posterUrlLabel(siteUrl) {
  if (!siteUrl) return "";
  try {
    const url = new URL(siteUrl);
    const firstPathSegment = url.pathname.split("/").find(Boolean);
    if (!firstPathSegment) return url.hostname;
    let pathLabel = firstPathSegment;
    try {
      pathLabel = decodeURIComponent(firstPathSegment)
        .replace(/[\u0000-\u001f\u007f-\u009f]/g, "");
    } catch {
      // Keep the URL-encoded segment when it cannot be decoded safely.
    }
    return pathLabel ? `${url.hostname}/${pathLabel}` : url.hostname;
  } catch {
    return "";
  }
}

function drawReport(context, result, decisions, brand) {
  const organs = selectedOrgans(result, decisions);
  const { colors } = brand;

  context.fillStyle = colors.paper;
  context.fillRect(0, 0, POSTER_WIDTH, POSTER_HEIGHT);
  context.strokeStyle = colors.ink;
  context.lineWidth = 8;
  context.strokeRect(42, 42, POSTER_WIDTH - 84, POSTER_HEIGHT - 84);

  context.textAlign = "left";
  context.textBaseline = "alphabetic";
  context.fillStyle = colors.ink;
  context.font = "900 64px sans-serif";
  context.fillText(
    fitSingleLine(context, brand.posterTitle, POSTER_TEXT_RIGHT - 88, 36),
    88,
    128,
  );
  context.font = "800 29px sans-serif";
  context.fillStyle = colors.inkSoft;
  context.fillText(
    fitSingleLine(context, `${brand.name} · ${brand.posterSubtitle}`, POSTER_TEXT_RIGHT - 90),
    90,
    178,
  );

  context.fillStyle = colors.lime;
  context.fillRect(88, 210, 904, 78);
  context.fillStyle = colors.ink;
  context.font = "900 42px sans-serif";
  context.fillText(`鉴定物种：${asText(result?.species)}`, 112, 263);

  // The creature image is attempted later inside this intentionally empty frame.
  context.strokeStyle = colors.inkSoft;
  context.lineWidth = 3;
  context.strokeRect(90, 320, 900, 460);
  context.font = "700 22px sans-serif";
  context.fillStyle = colors.inkSoft;
  context.fillText("事故现场影像", 112, 355);

  context.fillStyle = colors.ink;
  context.font = "900 28px sans-serif";
  context.fillText("异常观察", 90, 835);
  context.font = "500 27px sans-serif";
  let nextY = wrapText(context, result?.observation, 90, 878, 900, 39, 3);

  context.font = "900 28px sans-serif";
  context.fillText("饲养警告", 90, nextY + 20);
  context.font = "500 27px sans-serif";
  nextY = wrapText(context, result?.careWarning, 90, nextY + 62, 900, 39, 2);

  context.font = "900 28px sans-serif";
  context.fillText("非法器官清单", 90, nextY + 24);
  context.font = "700 24px sans-serif";
  organs.slice(0, 6).forEach((name, index) => {
    const column = index % 2;
    const row = Math.floor(index / 2);
    context.fillText(`${String(index + 1).padStart(2, "0")}  ${name}`, 90 + column * 450, nextY + 67 + row * 43);
  });

  context.fillStyle = colors.coral;
  context.fillRect(724, 1300, 268, 74);
  context.fillStyle = colors.ink;
  context.font = "900 40px sans-serif";
  context.textAlign = "center";
  context.fillText("禁止放生", 858, 1351);

  context.fillStyle = colors.inkSoft;
  context.font = "700 19px sans-serif";
  context.textAlign = "left";
  [brand.hashtag, posterUrlLabel(brand.siteUrl), brand.posterCredit]
    .filter(Boolean)
    .forEach((text, index) => context.fillText(
      fitSingleLine(context, text, POSTER_FOOTER_RIGHT - 90),
      90,
      1318 + index * 25,
    ));
}

function safeArray(value) {
  try {
    return Array.from(value ?? []);
  } catch {
    return [];
  }
}

function removeSvgNode(node) {
  try {
    const remove = readCapability(node, "remove");
    if (typeof remove === "function") {
      Reflect.apply(remove, node, []);
      return;
    }
  } catch {
    // Fall through to parent removal.
  }
  try {
    const parent = readCapability(node, "parentNode");
    const removeChild = readCapability(parent, "removeChild");
    if (typeof removeChild === "function") Reflect.apply(removeChild, parent, [node]);
  } catch {
    // A node that cannot be removed makes the entire SVG unsafe at serialization.
  }
}

function removeSvgAttribute(element, attribute) {
  try {
    const removeAttributeNode = readCapability(element, "removeAttributeNode");
    if (typeof removeAttributeNode === "function") {
      Reflect.apply(removeAttributeNode, element, [attribute]);
      return true;
    }
    const removeAttributeNS = readCapability(element, "removeAttributeNS");
    if (typeof removeAttributeNS === "function") {
      Reflect.apply(removeAttributeNS, element, [
        readCapability(attribute, "namespaceURI"),
        readCapability(attribute, "localName"),
      ]);
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

function isAllowedSvgAttribute(attribute) {
  const name = String(readCapability(attribute, "name") ?? "").toLowerCase();
  const localName = String(readCapability(attribute, "localName") ?? name).toLowerCase();
  const namespace = readCapability(attribute, "namespaceURI");
  const value = String(readCapability(attribute, "value") ?? "").trim();

  if (!name || localName.startsWith("on") || name === "style" || localName === "base") return false;
  if (namespace === XMLNS_NAMESPACE || name === "xmlns" || name.startsWith("xmlns:")) {
    return (name === "xmlns" && value === SVG_NAMESPACE)
      || (name === "xmlns:xlink" && value === XLINK_NAMESPACE);
  }
  if (localName === "href") {
    const allowedNamespace = !namespace || namespace === XLINK_NAMESPACE;
    return allowedNamespace && /^#[A-Za-z_][\w:.-]*$/.test(value);
  }
  if (namespace) return false;
  if (!SAFE_SVG_ATTRIBUTES.has(localName)) return false;
  if (/url\s*\(/i.test(value) && !/^url\(\s*#[A-Za-z_][\w:.-]*\s*\)$/.test(value)) return false;
  if (/(?:javascript:|data:|https?:|\/\/)/i.test(value)) return false;
  return true;
}

function cleanSvgElement(element) {
  const localName = String(readCapability(element, "localName") ?? "").toLowerCase();
  if (readCapability(element, "namespaceURI") !== SVG_NAMESPACE || !SAFE_SVG_ELEMENTS.has(localName)) {
    removeSvgNode(element);
    return false;
  }

  for (const attribute of safeArray(readCapability(element, "attributes"))) {
    if (!isAllowedSvgAttribute(attribute)) {
      if (!removeSvgAttribute(element, attribute)) return false;
      if (safeArray(readCapability(element, "attributes")).includes(attribute)) return false;
    }
  }
  for (const child of safeArray(readCapability(element, "childNodes"))) {
    const nodeType = readCapability(child, "nodeType");
    if (nodeType === 1) {
      if (!cleanSvgElement(child) && safeArray(readCapability(element, "childNodes")).includes(child)) return false;
    } else if (nodeType !== 3) {
      removeSvgNode(child);
      if (safeArray(readCapability(element, "childNodes")).includes(child)) return false;
    }
  }
  return true;
}

function readSvgAttribute(element, expectedName) {
  const expected = expectedName.toLowerCase();
  for (const attribute of safeArray(readCapability(element, "attributes"))) {
    const localName = String(readCapability(attribute, "localName") ?? "").toLowerCase();
    if (localName === expected && !readCapability(attribute, "namespaceURI")) {
      return String(readCapability(attribute, "value") ?? "");
    }
  }
  return "";
}

function parsePositiveDimension(value) {
  const match = String(value).trim().match(/^(\d+(?:\.\d+)?)(?:px)?$/i);
  const number = match ? Number(match[1]) : NaN;
  return Number.isFinite(number) && number > 0 ? number : null;
}

function readSvgDimensions(root) {
  const viewBox = readSvgAttribute(root, "viewBox")
    .trim()
    .split(/[\s,]+/)
    .map(Number);
  if (viewBox.length === 4 && viewBox.every(Number.isFinite) && viewBox[2] > 0 && viewBox[3] > 0) {
    return { width: viewBox[2], height: viewBox[3] };
  }

  const width = parsePositiveDimension(readSvgAttribute(root, "width"));
  const height = parsePositiveDimension(readSvgAttribute(root, "height"));
  return width && height
    ? { width, height }
    : { width: CREATURE_FRAME.width, height: CREATURE_FRAME.height };
}

function sanitizeSvg(source, DOMParserCtor, XMLSerializerCtor) {
  if (typeof source !== "string" || !source.trim()) return null;
  if (/<!doctype|<!entity/i.test(source)) return null;
  if (typeof DOMParserCtor !== "function" || typeof XMLSerializerCtor !== "function") return null;

  try {
    const parser = new DOMParserCtor();
    const parseFromString = readCapability(parser, "parseFromString");
    if (typeof parseFromString !== "function") return null;
    const document = Reflect.apply(parseFromString, parser, [source, "image/svg+xml"]);
    const querySelector = readCapability(document, "querySelector");
    if (typeof querySelector === "function" && Reflect.apply(querySelector, document, ["parsererror"])) return null;

    const root = readCapability(document, "documentElement");
    if (!root || String(readCapability(root, "localName") ?? "").toLowerCase() !== "svg") return null;
    if (!cleanSvgElement(root)) return null;

    const dimensions = readSvgDimensions(root);
    const serializer = new XMLSerializerCtor();
    const serializeToString = readCapability(serializer, "serializeToString");
    if (typeof serializeToString !== "function") return null;
    const sanitized = Reflect.apply(serializeToString, serializer, [root]);
    if (typeof sanitized !== "string" || !/<svg\b/i.test(sanitized)) return null;
    return { source: sanitized, ...dimensions };
  } catch {
    return null;
  }
}

function defaultCanvasFactory() {
  const documentApi = readCapability(globalThis, "document");
  const createElement = readCapability(documentApi, "createElement");
  return typeof createElement === "function"
    ? Reflect.apply(createElement, documentApi, ["canvas"])
    : null;
}

function defaultImageFactory() {
  const ImageCtor = readCapability(globalThis, "Image");
  return typeof ImageCtor === "function" ? new ImageCtor() : null;
}

function normalizeTimeout(timeoutMs, fallback = 2500) {
  const value = Number(timeoutMs);
  return Number.isFinite(value) && value >= 0 ? value : fallback;
}

function scheduleTimer(callback, delay) {
  const setTimeoutFn = readCapability(globalThis, "setTimeout");
  if (typeof setTimeoutFn !== "function") throw new TypeError("timer-unavailable");
  return Reflect.apply(setTimeoutFn, globalThis, [callback, delay]);
}

function cancelTimer(timer) {
  const clearTimeoutFn = readCapability(globalThis, "clearTimeout");
  if (typeof clearTimeoutFn === "function") {
    Reflect.apply(clearTimeoutFn, globalThis, [timer]);
  }
}

function waitForCapability(register, timeoutMs) {
  return new Promise((resolve) => {
    let settled = false;
    let timeout = null;
    const finish = (value) => {
      if (settled) return;
      settled = true;
      try {
        cancelTimer(timeout);
      } catch {
        // Timer cleanup is best effort.
      }
      resolve(value ?? null);
    };

    try {
      timeout = scheduleTimer(() => finish(null), normalizeTimeout(timeoutMs));
    } catch {
      finish(null);
      return;
    }
    try {
      register(finish);
    } catch {
      finish(null);
    }
  });
}

async function drawSvg({
  context,
  svg,
  imageFactory,
  urlApi,
  BlobCtor,
  imageTimeoutMs,
  DOMParserCtor,
  XMLSerializerCtor,
}) {
  let objectUrl = null;
  try {
    const safeSvg = sanitizeSvg(svg, DOMParserCtor, XMLSerializerCtor);
    const createObjectURL = readCapability(urlApi, "createObjectURL");
    if (!safeSvg || typeof imageFactory !== "function" || typeof createObjectURL !== "function") return false;
    if (typeof BlobCtor !== "function") return false;

    const svgBlob = new BlobCtor([safeSvg.source], { type: "image/svg+xml;charset=utf-8" });
    objectUrl = Reflect.apply(createObjectURL, urlApi, [svgBlob]);
    const image = imageFactory();
    if (!image) return false;

    const loaded = await waitForCapability((finish) => {
      image.onload = () => finish(true);
      image.onerror = () => finish(false);
      image.src = objectUrl;
    }, imageTimeoutMs);
    if (!loaded) return false;

    const scale = Math.min(
      CREATURE_FRAME.width / safeSvg.width,
      CREATURE_FRAME.height / safeSvg.height,
    );
    const width = safeSvg.width * scale;
    const height = safeSvg.height * scale;
    const x = CREATURE_FRAME.x + (CREATURE_FRAME.width - width) / 2;
    const y = CREATURE_FRAME.y + (CREATURE_FRAME.height - height) / 2;
    const save = readCapability(context, "save");
    const beginPath = readCapability(context, "beginPath");
    const rect = readCapability(context, "rect");
    const clip = readCapability(context, "clip");
    const drawImage = readCapability(context, "drawImage");
    const restore = readCapability(context, "restore");
    if (![save, beginPath, rect, clip, drawImage, restore].every((method) => typeof method === "function")) {
      return false;
    }

    Reflect.apply(save, context, []);
    try {
      Reflect.apply(beginPath, context, []);
      Reflect.apply(rect, context, [CREATURE_FRAME.x, CREATURE_FRAME.y, CREATURE_FRAME.width, CREATURE_FRAME.height]);
      Reflect.apply(clip, context, []);
      Reflect.apply(drawImage, context, [image, x, y, width, height]);
    } finally {
      Reflect.apply(restore, context, []);
    }
    return true;
  } catch {
    return false;
  } finally {
    const revokeObjectURL = readCapability(urlApi, "revokeObjectURL");
    if (objectUrl && typeof revokeObjectURL === "function") {
      try {
        Reflect.apply(revokeObjectURL, urlApi, [objectUrl]);
      } catch {
        // Revocation is cleanup only; it must not invalidate a completed poster.
      }
    }
  }
}

async function exportPng(canvas, exportTimeoutMs) {
  try {
    const toBlob = readCapability(canvas, "toBlob");
    if (typeof toBlob === "function") {
      return await waitForCapability((finish) => {
        Reflect.apply(toBlob, canvas, [(blob) => finish(blob), "image/png"]);
      }, exportTimeoutMs);
    }
    const convertToBlob = readCapability(canvas, "convertToBlob");
    if (typeof convertToBlob === "function") {
      return await waitForCapability((finish) => {
        Promise.resolve(Reflect.apply(convertToBlob, canvas, [{ type: "image/png" }]))
          .then(finish, () => finish(null));
      }, exportTimeoutMs);
    }
  } catch {
    return null;
  }
  return null;
}

export async function renderResultPoster({
  svg,
  result,
  decisions,
  brand = BRAND,
  canvasFactory = defaultCanvasFactory,
  imageFactory = defaultImageFactory,
  urlApi = readCapability(globalThis, "URL"),
  BlobCtor = readCapability(globalThis, "Blob"),
  imageTimeoutMs = 2500,
  exportTimeoutMs = 2500,
  DOMParserCtor = readCapability(globalThis, "DOMParser"),
  XMLSerializerCtor = readCapability(globalThis, "XMLSerializer"),
} = {}) {
  const normalizedBrand = normalizeBrand(brand);
  let canvas;
  try {
    canvas = typeof canvasFactory === "function" ? Reflect.apply(canvasFactory, null, []) : null;
  } catch {
    return unavailable("canvas-creation-failed");
  }
  if (!canvas) return unavailable("canvas-unavailable");

  try {
    canvas.width = POSTER_WIDTH;
    canvas.height = POSTER_HEIGHT;
  } catch {
    return unavailable("canvas-sizing-failed");
  }

  let context;
  try {
    const getContext = readCapability(canvas, "getContext");
    context = typeof getContext === "function" ? Reflect.apply(getContext, canvas, ["2d"]) : null;
  } catch {
    return unavailable("context-creation-failed");
  }
  if (!context) return unavailable("context-unavailable");

  try {
    drawReport(context, result, decisions, normalizedBrand);
  } catch {
    return unavailable("report-drawing-failed");
  }

  // Preserve a valid report before decoding untrusted image data. If the image
  // later taints the canvas or export fails, sharing can still use this PNG.
  const textOnlyBlob = await exportPng(canvas, exportTimeoutMs);
  if (!textOnlyBlob) return unavailable("png-export-failed");

  let hasSvg = false;
  try {
    hasSvg = await drawSvg({
      context,
      svg,
      imageFactory,
      urlApi,
      BlobCtor,
      imageTimeoutMs,
      DOMParserCtor,
      XMLSerializerCtor,
    });
  } catch {
    hasSvg = false;
  }
  const illustratedBlob = hasSvg ? await exportPng(canvas, exportTimeoutMs) : null;

  return {
    status: "ready",
    mode: illustratedBlob ? "full" : "text-only",
    blob: illustratedBlob ?? textOnlyBlob,
    width: POSTER_WIDTH,
    height: POSTER_HEIGHT,
  };
}

function isCancellation(error) {
  return readCapability(error, "name") === "AbortError";
}

function textSharePayload({ title, text, url }) {
  const payload = {
    title: String(title ?? ""),
    text: String(text ?? ""),
  };
  const normalizedUrl = String(url ?? "").trim();
  if (normalizedUrl) payload.url = normalizedUrl;
  return payload;
}

export async function copyResultText({ text, clipboard, fallback } = {}) {
  const safeText = String(text ?? "");
  try {
    const writeText = readCapability(clipboard, "writeText");
    if (typeof writeText === "function") {
      await Reflect.apply(writeText, clipboard, [safeText]);
      return { status: "copied", text: safeText };
    }
  } catch {
    // Continue to the visible, selectable manual-copy fallback.
  }

  let fallbackFailed = false;
  try {
    if (typeof fallback === "function") await fallback(safeText);
  } catch {
    fallbackFailed = true;
  }

  return {
    status: "manual-copy",
    text: safeText,
    ...(fallbackFailed ? { fallbackFailed: true } : {}),
  };
}

export async function shareResult({
  blob,
  text,
  title,
  url,
  filename = DEFAULT_POSTER_FILENAME,
  navigatorApi = readCapability(globalThis, "navigator"),
  FileCtor = readCapability(globalThis, "File"),
  fallback,
} = {}) {
  const payload = textSharePayload({ title, text, url });
  const nativeShare = readCapability(navigatorApi, "share");
  const share = typeof nativeShare === "function"
    ? (sharePayload) => Reflect.apply(nativeShare, navigatorApi, [sharePayload])
    : null;

  if (share && blob && typeof FileCtor === "function") {
    try {
      const file = new FileCtor([blob], normalizePngFilename(filename), {
        type: "image/png",
        lastModified: 0,
      });
      const filePayload = { ...payload, files: [file] };
      let canShareFile = false;
      try {
        const canShare = readCapability(navigatorApi, "canShare");
        canShareFile = typeof canShare === "function"
          && await Reflect.apply(canShare, navigatorApi, [filePayload]);
      } catch {
        canShareFile = false;
      }

      if (canShareFile) {
        try {
          await share(filePayload);
          return { status: "shared-file" };
        } catch (error) {
          if (isCancellation(error)) return { status: "cancelled" };
          // A browser may advertise file sharing and still reject at invocation.
        }
      }
    } catch {
      // File construction is optional; text sharing remains available.
    }
  }

  if (share) {
    try {
      await share(payload);
      return { status: "shared-text" };
    } catch (error) {
      if (isCancellation(error)) return { status: "cancelled" };
      // Clipboard and manual copy are independent of native sharing.
    }
  }

  return copyResultText({
    text: payload.text,
    clipboard: readCapability(navigatorApi, "clipboard"),
    fallback,
  });
}

function normalizePngFilename(filename) {
  const raw = asText(filename, DEFAULT_POSTER_FILENAME)
    .replace(/[\\/:*?"<>|\u0000-\u001f]/g, "-")
    .replace(/\.png$/i, "")
    .trim();
  const base = raw || DEFAULT_POSTER_FILENAME.replace(/\.png$/i, "");
  return `${base}.png`;
}

export function buildSharePayload(result, rawBrand = BRAND) {
  const brand = normalizeBrand(rawBrand);
  return textSharePayload({
    title: brand.shareTitle,
    text: result?.shareText,
    url: brand.siteUrl,
  });
}

export function buildPosterFilename(result, rawBrand = BRAND) {
  const brand = normalizeBrand(rawBrand);
  const species = asText(result?.species, "怪东西");
  return normalizePngFilename(
    `${brand.downloadPrefix}-${species}-${brand.posterSubtitle}.png`,
  );
}

export function downloadResultPoster({
  blob,
  filename = DEFAULT_POSTER_FILENAME,
  documentApi = readCapability(globalThis, "document"),
  urlApi = readCapability(globalThis, "URL"),
  scheduleCleanup = (callback) => scheduleTimer(callback, 0),
} = {}) {
  if (!blob) return { status: "download-unavailable", reason: "blob-unavailable" };
  const createElement = readCapability(documentApi, "createElement");
  if (typeof createElement !== "function") {
    return { status: "download-unavailable", reason: "document-unavailable" };
  }
  const createObjectURL = readCapability(urlApi, "createObjectURL");
  if (typeof createObjectURL !== "function") {
    return { status: "download-unavailable", reason: "url-api-unavailable" };
  }

  const safeFilename = normalizePngFilename(filename);
  let objectUrl = null;
  let anchor = null;
  let body = null;
  let appended = false;
  let outcome;
  try {
    objectUrl = Reflect.apply(createObjectURL, urlApi, [blob]);
    anchor = Reflect.apply(createElement, documentApi, ["a"]);
    anchor.href = objectUrl;
    anchor.download = safeFilename;
    const style = readCapability(anchor, "style");
    if (style) {
      try {
        style.display = "none";
      } catch {
        // Hiding the temporary control is cosmetic.
      }
    }

    body = readCapability(documentApi, "body");
    const append = readCapability(body, "append") ?? readCapability(body, "appendChild");
    const click = readCapability(anchor, "click");
    if (typeof append !== "function" || typeof click !== "function") {
      outcome = { status: "download-unavailable", reason: "download-control-unavailable" };
    } else {
      Reflect.apply(append, body, [anchor]);
      appended = true;
      Reflect.apply(click, anchor, []);
      outcome = { status: "downloaded", filename: safeFilename };
    }
  } catch {
    outcome = { status: "download-unavailable", reason: "download-failed" };
  }

  if (objectUrl) {
    const cleanup = () => {
      let removed = false;
      const remove = readCapability(anchor, "remove");
      if (typeof remove === "function") {
        try {
          Reflect.apply(remove, anchor, []);
          removed = true;
        } catch {
          removed = false;
        }
      }
      if (!removed && appended) {
        const removeChild = readCapability(body, "removeChild");
        if (typeof removeChild === "function") {
          try {
            Reflect.apply(removeChild, body, [anchor]);
          } catch {
            // DOM cleanup is independent from URL cleanup.
          }
        }
      }
      const revokeObjectURL = readCapability(urlApi, "revokeObjectURL");
      if (typeof revokeObjectURL === "function") {
        try {
          Reflect.apply(revokeObjectURL, urlApi, [objectUrl]);
        } catch {
          // Cleanup failures never alter an already initiated download.
        }
      }
    };
    try {
      if (typeof scheduleCleanup === "function") scheduleCleanup(cleanup);
      else scheduleTimer(cleanup, 0);
    } catch {
      try {
        scheduleTimer(cleanup, 0);
      } catch {
        // Scheduling failure is isolated; the initiated download remains valid.
      }
    }
  }

  return outcome ?? { status: "download-unavailable", reason: "download-failed" };
}
