import { content, items, line, lines, list, value } from './index';

/**
 * Which sections may exist at all.
 *
 * A section is visible only when the content it is made of exists. Nothing is
 * padded, no placeholder copy is substituted, and a hidden section leaves no
 * wrapper and no vertical gap behind (CONTENT.md §16).
 *
 * The section index rail and the header navigation both read from here, so a
 * hidden section can never leave a dangling link.
 */
const about = value(content.about);
const stack = value(content.stack);
const program = value(content.program);
const support = value(content.support);
const proof = value(content.proof);
const partners = value(content.partners);
const finalCta = value(content.finalCta);
const hero = value(content.hero);

export const sectionVisibility = {
  // The hero always exists: the two brand names are confirmed.
  hero: true,
  manifesto: Boolean(line(about?.statement) ?? line(about?.body)) || lines(about?.principles).length > 0,
  stack: Boolean(
    line(stack?.intro) ?? line(stack?.suiRole) ?? line(stack?.walrusRole) ?? line(stack?.output),
  ) || lines(stack?.modules).length > 0,
  program: items(program?.phases).length > 0,
  tracks: list(content.tracks).length > 0,
  support: Boolean(line(support?.totalPrize)) || items(support?.items).length > 0 || lines(support?.followUpBenefits).length > 0,
  criteria: list(content.criteria).length > 0,
  proof: items(proof?.metrics).length > 0 || lines(proof?.achievements).length > 0 || items(proof?.gallery).length > 0,
  partners:
    items(partners?.hosts).length > 0 ||
    items(partners?.mainPartners).length > 0 ||
    items(partners?.techPartners).length > 0 ||
    items(partners?.communityPartners).length > 0,
  faq: list(content.faqs).length > 0,
  finalCta: Boolean(line(finalCta?.message) ?? line(finalCta?.body)) || Boolean(line(finalCta?.url) && line(finalCta?.label)),
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
  return [line(hero?.date), line(hero?.location), line(hero?.format)].filter(
    (fact): fact is string => Boolean(fact),
  );
}
