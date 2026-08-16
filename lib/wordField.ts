import { createRng } from './rng';
import { renderWord, type PixelWord } from './pixelFont';
import { fieldWords, type FieldWord, type ProtocolKind } from '@/content/brand';

export type WordLayout = {
  id: string;
  kind: ProtocolKind;
  wide: PixelWord;
  compact: PixelWord;
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
};

/** Extra cubes so even the widest word keeps some field around it. */
const AMBIENT_SURPLUS = 30;
const ACCENT_EVERY = 19;

/**
 * Builds the cube pool once, deterministically.
 *
 * One pool serves every word: cubes travel between letterforms instead of being
 * created and destroyed, which is what makes the morph read as the same field
 * rearranging itself (INTERACTIONS.md §2).
 */
export function buildWordField(seed = 20260817): WordField {
  const layouts: WordLayout[] = fieldWords.map((word) => ({
    id: word.id,
    kind: word.kind,
    wide: renderWord(word.lines),
    compact: renderWord(word.compactLines),
  }));

  const largest = layouts.reduce(
    (max, layout) => Math.max(max, layout.wide.pixels.length, layout.compact.pixels.length),
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

  return { words: fieldWords, layouts, poolSize, ambient, accents };
}
