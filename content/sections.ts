import { content } from './index';

/**
 * Which sections may exist at all.
 *
 * A section is visible only when the content it is made of exists. Nothing is
 * padded, no placeholder copy is substituted, and a hidden section leaves no
 * wrapper and no vertical gap behind.
 *
 * The section index rail and the header navigation both read from here, so a
 * hidden section can never leave a dangling link.
 */
const { about, stack, program, support, proof, partners, faqs, finalCta, tracks, criteria } =
  content;

export const sectionVisibility = {
  // The hero always exists: the two brand names are confirmed.
  hero: true,
  manifesto: Boolean(about.statement || about.body || about.principles.length),
  stack: Boolean(
    stack.intro || stack.suiRole || stack.walrusRole || stack.output || stack.modules.length,
  ),
  program: program.phases.length > 0,
  tracks: tracks.length > 0,
  support: Boolean(support.totalPrize || support.items.length || support.followUpBenefits.length),
  criteria: criteria.length > 0,
  proof: Boolean(proof.metrics.length || proof.achievements.length || proof.gallery.length),
  partners: Boolean(
    partners.hosts.length ||
      partners.mainPartners.length ||
      partners.techPartners.length ||
      partners.communityPartners.length,
  ),
  faq: faqs.length > 0,
  finalCta: Boolean(finalCta.message || finalCta.body || (finalCta.label && finalCta.url)),
} as const;

export type SectionKey = keyof typeof sectionVisibility;

const SECTION_ORDER: { key: SectionKey; id: string; index: string }[] = [
  { key: 'hero', id: 'top', index: '00' },
  { key: 'manifesto', id: 'about', index: '01' },
  { key: 'stack', id: 'stack', index: '02' },
  { key: 'program', id: 'program', index: '03' },
  { key: 'tracks', id: 'tracks', index: '04' },
  { key: 'support', id: 'support', index: '05' },
  { key: 'criteria', id: 'criteria', index: '06' },
  { key: 'proof', id: 'proof', index: '07' },
  { key: 'partners', id: 'partners', index: '08' },
  { key: 'faq', id: 'faq', index: '09' },
  { key: 'finalCta', id: 'apply', index: '10' },
];

export const visibleSections = SECTION_ORDER.filter((section) => sectionVisibility[section.key]);

/** Index label for a section, so numbering follows the document, not the array. */
export function sectionIndex(key: SectionKey): string {
  return SECTION_ORDER.find((section) => section.key === key)?.index ?? '';
}

export function sectionId(key: SectionKey): string {
  return SECTION_ORDER.find((section) => section.key === key)?.id ?? key;
}

/** Hero meta line: only the parts that are confirmed. */
export function heroFacts(): string[] {
  return [content.hero.date, content.hero.location, content.hero.format].filter(Boolean);
}

/** Position-derived label, so authors never hand-number a list. */
export const ordinal = (position: number): string => String(position + 1).padStart(2, '0');
