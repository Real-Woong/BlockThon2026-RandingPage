import { event } from './event';
import { mock } from './mock';
import type { EventContent } from './types';

/**
 * Where the page gets its copy.
 *
 *   real — only what is filled in `content/event.ts` (the default). The event
 *          is confirmed, so this is what every deploy renders.
 *   mock — placeholder copy so the full layout is visible, including the
 *          sections `event.ts` currently leaves empty.
 *          ⚠️ Not real event information. See content/mock.ts.
 *
 * Set with NEXT_PUBLIC_CONTENT_SOURCE. Defaulting to `real` is deliberate:
 * an unset variable on the build container used to publish invented dates and
 * prizes, and the safe failure is now a missing section, not a false one.
 */
export type ContentSource = 'real' | 'mock';

export const contentSource: ContentSource =
  process.env.NEXT_PUBLIC_CONTENT_SOURCE === 'mock' ? 'mock' : 'real';

/** True whenever the visible copy is placeholder rather than confirmed. */
export const isPlaceholderContent = contentSource !== 'real';

const clean = (input: string): string => input.trim();

/**
 * Normalises the tree once, at module load, so components can use plain values.
 *
 * Two jobs: trim every string, and drop list items that have nothing to show.
 * Doing it here is what lets a section read `content.about.body && …` instead of
 * threading a helper through every field — whitespace-only copy pasted out of a
 * meeting doc still counts as empty, and an item whose identifying field is
 * blank never reaches the DOM.
 */
function normalise(source: EventContent): EventContent {
  const strings = <T extends Record<string, string>>(input: T): T =>
    Object.fromEntries(Object.entries(input).map(([key, val]) => [key, clean(val)])) as T;

  const partners = (list: EventContent['partners']['hosts']) =>
    list.map(strings).filter((entry) => entry.name || entry.logoUrl);

  return {
    ...strings({
      organizer: source.organizer,
      creativeName: source.creativeName,
      officialEventName: source.officialEventName,
      descriptor: source.descriptor,
      valueProposition: source.valueProposition,
      date: source.date,
      applicationPeriod: source.applicationPeriod,
      location: source.location,
      format: source.format,
      applyUrl: source.applyUrl,
      contact: source.contact,
    }),

    navigation: source.navigation.map(strings).filter((item) => item.label && item.href),
    hero: strings(source.hero),

    about: {
      ...strings({ statement: source.about.statement, body: source.about.body }),
      principles: source.about.principles.map(clean).filter(Boolean),
    },

    stack: {
      ...strings({
        intro: source.stack.intro,
        suiRole: source.stack.suiRole,
        walrusRole: source.stack.walrusRole,
        output: source.stack.output,
      }),
      modules: source.stack.modules.map(clean).filter(Boolean),
    },

    // A group with nothing to open is not a resource list: a link without a URL
    // goes first, and a group left with no links goes with it.
    resources: {
      intro: clean(source.resources.intro),
      groups: source.resources.groups
        .map((group) => ({
          ...strings({ title: group.title, summary: group.summary }),
          links: group.links.map(strings).filter((link) => link.label && link.url),
        }))
        .filter((group) => group.links.length > 0),
    },

    program: {
      intro: clean(source.program.intro),
      phases: source.program.phases.map(strings).filter((phase) => phase.title || phase.label),
    },

    tracks: source.tracks.map(strings).filter((track) => track.title),

    support: {
      ...strings({ totalPrize: source.support.totalPrize, currency: source.support.currency }),
      items: source.support.items.map(strings).filter((item) => item.label || item.detail),
      followUpBenefits: source.support.followUpBenefits.map(clean).filter(Boolean),
    },

    criteria: source.criteria.map(strings).filter((entry) => entry.title),

    partners: {
      hosts: partners(source.partners.hosts),
      mainPartners: partners(source.partners.mainPartners),
      techPartners: partners(source.partners.techPartners),
      communityPartners: partners(source.partners.communityPartners),
    },

    // Half an entry is not publishable: a question with no answer opens onto
    // nothing, so both have to be present.
    faqs: source.faqs.map(strings).filter((faq) => faq.question && faq.answer),

    finalCta: strings(source.finalCta),
    metadata: strings(source.metadata),
  };
}

export const content: EventContent = normalise(contentSource === 'real' ? event : mock);

/** The apply URL a CTA should use: its own, else the page-wide one. */
export const applyUrl = (own: string): string => own || content.applyUrl;

export type * from './types';
