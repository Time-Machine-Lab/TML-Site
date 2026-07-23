export function stableHash(value) {
  let hash = 2166136261;
  for (const character of String(value)) {
    hash ^= character.codePointAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function seededPercent(seed, salt) {
  if (typeof seed !== "string" || seed.trim() === "") {
    throw new RangeError("a non-empty resolution seed is required");
  }
  return stableHash(`${salt}:${seed}`) % 100;
}

