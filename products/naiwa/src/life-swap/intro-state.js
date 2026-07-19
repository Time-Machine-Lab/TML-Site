import { ROUTE_IDS } from "./intro-content.js";

export function createIntroState() {
  return { screen: "welcome", routeId: null };
}

export function readyIntroReveal(state) {
  if (state.screen !== "welcome") return state;
  return { screen: "reveal-ready", routeId: null };
}

export function revealIntroGuests(state) {
  if (state.screen !== "reveal-ready") return state;
  return { screen: "revealed", routeId: null };
}

export function enterIntroChoices(state) {
  if (state.screen !== "revealed") return state;
  return { screen: "choosing", routeId: null };
}

export function skipIntroReveal(state) {
  if (!["welcome", "reveal-ready", "revealed"].includes(state.screen)) return state;
  return { screen: "choosing", routeId: null };
}

export function chooseIntroRoute(state, routeId) {
  if (state.screen !== "choosing" || !ROUTE_IDS.includes(routeId)) {
    return state;
  }

  return { screen: "route", routeId };
}

export function replayIntro(state) {
  if (state.screen !== "route") {
    return state;
  }

  return { screen: "choosing", routeId: null };
}
