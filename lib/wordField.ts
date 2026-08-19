import { createRng } from './rng';
import { renderWord, type PixelWord } from './pixelFont';
import { renderLockup, renderLockupCompact } from './logoLockup';
import { fieldWords, type FieldWord, type ProtocolKind } from '@/content/brand';

export type WordLayout = {
  id: string;
  kind: ProtocolKind;
  wide: PixelWord;
  compact: PixelWord;
  /** Traced artwork rather than type. Only motion cares; sizing does not. */
  art?: boolean;
};

export type AmbientPoint = {
  /** 0–1 of the stage box. */
  x: number;
  y: number;
  /** 0–1. Drives size and opacity so the leftover cubes read as depth. */
  depth: number;
  phase: number;
};

export type WordField = {
  words: FieldWord[];
  layouts: WordLayout[];
  /** One cube per pool slot; the largest word decides the size. */
  poolSize: number;
  /** Where a cube parks when the current word does not need it. */
  ambient: AmbientPoint[];
  /** Pool indices that render as signal accents (~5%, INTERACTIONS.md §1). */
  accents: Set<number>;
  /**
   * Pool indices that paint in front of the hero copy instead of behind it.
   *
   * Drawn only from the surplus tail — those slots are never part of a
   * letterform for any word, so a promoted cube can never end up covering the
   * word it is supposed to sit beside.
   */
  foreground: Set<number>;
};

/**
 * Extra cubes so even the widest word keeps some field around it. Raised when
 * the field went full-bleed: the same count spread over a whole screen instead
 * of a band read as a handful of stray dots rather than a field.
 */
const AMBIENT_SURPLUS = 54;
const ACCENT_EVERY = 19;
/** How many of the surplus cubes cross in front of the type. */
const FOREGROUND_COUNT = 12;

/**
 * Builds the cube pool once, deterministically.
 *
 * One pool serves every word: cubes travel between letterforms instead of being
 * created and destroyed, which is what makes the morph read as the same field
 * rearranging itself (INTERACTIONS.md §2).
 *
 * `compact` is not just which artwork to draw — it sizes the pool. The logo
 * lockup needs 1,719 cubes at the wide resolution and 632 at the narrow one,
 * and every cube is a mounted element whether it is lit or parked. Sizing the
 * pool from the variant actually in use is what keeps a phone from mounting a
 * thousand elements it will never show.
 */
export function buildWordField(compact: boolean, seed = 20260817): WordField {
  const layouts: WordLayout[] = fieldWords.map((word) => {
    if (word.shape === 'lockup') {
      return {
        id: word.id,
        kind: word.kind,
        wide: renderLockup(),
        compact: renderLockupCompact(),
        art: true,
      };
    }
    return {
      id: word.id,
      kind: word.kind,
      wide: renderWord(word.lines ?? []),
      compact: renderWord(word.compactLines ?? word.lines ?? []),
    };
  });

  const largest = layouts.reduce(
    (max, layout) => Math.max(max, (compact ? layout.compact : layout.wide).pixels.length),
    0,
  );
  const poolSize = largest + AMBIENT_SURPLUS;

  const rng = createRng(seed);
  const ambient: AmbientPoint[] = Array.from({ length: poolSize }, () => ({
    x: rng(),
    y: 0.08 + rng() * 0.84,
    depth: rng(),
    phase: Number((rng() * 14).toFixed(2)),
  }));

  const accents = new Set<number>();
  for (let i = 0; i < poolSize; i += 1) {
    if (i % ACCENT_EVERY === 7) accents.add(i);
  }

  // The nearest surplus cubes go in front. Depth already drives size and
  // opacity, so promoting the closest ones is the reading the layout implies:
  // what is nearest the viewer occludes what is behind it.
  const promoted = Array.from({ length: poolSize - largest }, (_, offset) => largest + offset)
    .sort((a, b) => (ambient[b]?.depth ?? 0) - (ambient[a]?.depth ?? 0))
    .slice(0, FOREGROUND_COUNT);

  // Held in the band the wordmark occupies rather than left to scatter. Nine
  // cubes spread over a whole screen almost never cross a single line of type,
  // and a front plane that misses the type is just noise. Spread across the
  // width with jitter so the spacing does not read as a row of ticks.
  promoted.forEach((index, n) => {
    const spot = ambient[index];
    if (!spot) return;
    spot.x = (n + 0.15 + rng() * 0.7) / promoted.length;
    spot.y = 0.4 + rng() * 0.17;
    spot.depth = 0.72 + rng() * 0.28;
  });

  return {
    words: fieldWords,
    layouts,
    poolSize,
    ambient,
    accents,
    foreground: new Set(promoted),
  };
}
