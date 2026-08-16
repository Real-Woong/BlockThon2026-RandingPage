/**
 * Deterministic PRNG.
 *
 * The hero field is generated on the server and on the client, so it must not
 * use Math.random — the two passes have to agree or React hydration breaks and
 * the cubes visibly jump.
 */
export function createRng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
