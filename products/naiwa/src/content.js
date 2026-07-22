import { GENERATED_ROUTE_DATA } from "./content.generated.js";

export const ROUTE_IDS = Object.freeze([
  "late-work",
  "revived-friend",
  "family-care",
  "group-assignment",
]);

function stableHash(value) {
  let hash = 2166136261;
  for (const character of value) {
    hash ^= character.codePointAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function variedOptionOrder(options, questionId) {
  const offset = stableHash(questionId) % options.length;
  const rotated = [...options.slice(offset), ...options.slice(0, offset)];
  return stableHash(`${questionId}.direction`) % 2 === 0 ? rotated : rotated.reverse();
}

function deepFreeze(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  for (const nested of Object.values(value)) deepFreeze(nested);
  return Object.freeze(value);
}

function normalizeRoutes() {
  const routes = {};
  for (const routeId of ROUTE_IDS) {
    const sourceRoute = GENERATED_ROUTE_DATA[routeId];
    if (!sourceRoute) throw new RangeError(`generated content is missing route ${routeId}`);
    const questions = {};
    for (const [questionId, question] of Object.entries(sourceRoute.questions)) {
      questions[questionId] = {
        ...question,
        options: variedOptionOrder(question.options, questionId),
      };
    }
    routes[routeId] = {
      ...sourceRoute,
      questions,
    };
  }
  return deepFreeze(routes);
}

export const ROUTES = normalizeRoutes();

export function getRoute(routeId) {
  const route = ROUTES[routeId];
  if (!route) throw new RangeError(`unknown life-swap route ${routeId}`);
  return route;
}
