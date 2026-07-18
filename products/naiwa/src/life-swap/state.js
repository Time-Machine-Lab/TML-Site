import { OUTCOMES } from "./content.js";

export function createLifeSwapState() {
  return { screen: "home", selectedChoice: null };
}

export function startLifeSwap(state) {
  if (state.screen !== "home") {
    throw new Error("life-swap can only start from the home screen");
  }

  return { screen: "question", selectedChoice: null };
}

export function chooseLifeSwap(state, choiceId) {
  if (state.screen !== "question") {
    throw new Error("life-swap choices are only available on the question screen");
  }

  if (!Object.hasOwn(OUTCOMES, choiceId)) {
    throw new RangeError(`unknown life-swap choice: ${choiceId}`);
  }

  return { screen: "outcome", selectedChoice: choiceId };
}

export function resetLifeSwap() {
  return { screen: "question", selectedChoice: null };
}
