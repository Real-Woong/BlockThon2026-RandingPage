/**
 * Brand and creative-direction constants.
 *
 * These are NOT event content. They come from the confirmed direction documents
 * (CLAUDE.md §1, DESIGN_SYSTEM.md §1–2, INTERACTIONS.md §1, §4) and describe the
 * visual system itself, not the hackathon's schedule, prizes, tracks or partners.
 *
 * Keep event facts in `landing-content.ts` only.
 */

export const brand = {
  organizer: 'blockblock',
  creativeName: 'block_block pixel',
  concept: 'Living Protocol Field',
  /** CLAUDE.md §1 — the narrative the whole page is built on. */
  narrative: ['pixel', 'block', 'connection', 'protocol', 'product'] as const,
} as const;

/**
 * Temporary logo asset.
 *
 * The provided PNG is a reference asset, not the final mark. It is referenced
 * from exactly one place (components/brand/BrandMark.tsx) and nothing else in
 * the layout, grid, field geometry or interaction model derives from its shape.
 *
 * Set `src` to null (or delete the file) and the page falls back to the
 * `blockblock` wordmark with no other change.
 */
export const brandMarkAsset: { src: string | null; width: number; height: number } = {
  src: null,
  width: 96,
  height: 96,
};

/**
 * Protocol labels shown on cubes inside the hero field.
 *
 * No official Sui / Walrus logo assets were provided, so these render as text.
 * When official assets arrive, drop the file into /public/protocol/ and set
 * `assetSrc` — ProtocolLabel switches to the image with no other change.
 * Do not recreate or download unofficial marks (INTERACTIONS.md §1).
 */
export type ProtocolKind = 'block' | 'sui' | 'walrus' | 'signal';

/**
 * The words the cube field spells out, in scroll order.
 *
 * The pixel art is decorative (`aria-hidden`), so every word is also present as
 * real text in the panel caption beside it. `meaning` is only filled in where a
 * documented one exists (INTERACTIONS.md §4) — nothing is written here to fill
 * a gap.
 */
export type FieldWord = {
  id: string;
  /** Rendered as text in the caption. */
  text: string;
  /** Wide screens. */
  lines: string[];
  /** Narrow screens — long words break so the cubes stay large enough to read. */
  compactLines: string[];
  kind: ProtocolKind;
  meaning?: string;
};

export const fieldWords: FieldWord[] = [
  {
    id: 'blockblock',
    text: 'blockblock',
    lines: ['BLOCKBLOCK'],
    compactLines: ['BLOCK', 'BLOCK'],
    kind: 'block',
  },
  {
    id: 'sui',
    text: 'SUI',
    lines: ['SUI'],
    compactLines: ['SUI'],
    kind: 'sui',
    meaning: 'ownership · execution · transaction',
  },
  {
    id: 'walrus',
    text: 'WALRUS',
    lines: ['WALRUS'],
    compactLines: ['WALRUS'],
    kind: 'walrus',
    meaning: 'data · storage · memory',
  },
  {
    id: 'blockthon',
    text: 'BLOCKTHON',
    lines: ['BLOCKTHON'],
    compactLines: ['BLOCK', 'THON'],
    kind: 'block',
  },
];

export const protocolLabels: Record<
  Exclude<ProtocolKind, 'block'>,
  { text: string; assetSrc: string | null; meaning: string }
> = {
  sui: {
    text: 'SUI',
    assetSrc: null,
    // INTERACTIONS.md §4
    meaning: 'ownership · execution · transaction',
  },
  walrus: {
    text: 'WALRUS',
    assetSrc: null,
    meaning: 'data · storage · memory',
  },
  signal: {
    text: 'SIGNAL',
    assetSrc: null,
    meaning: 'connection',
  },
};
