/**
 * Landing content shape.
 *
 * One rule, everywhere: **a value that has text renders, a value that is empty
 * does not.** There is no state flag and no `{ state, value }` wrapper — you
 * hide something by deleting its text, and you publish it by typing text.
 *
 * Every field is required so the shape is always visible in the editor: fill a
 * slot or leave it as `''`. Arrays start empty and grow; an item missing the
 * field it is identified by is dropped when the content is normalised.
 */

export type NavItem = {
  label: string;
  /** Section anchor, e.g. `#about`. Links to hidden sections are dropped. */
  href: string;
};

export type Phase = {
  /** e.g. `PRE`, `DAY 01` */
  label: string;
  date: string;
  title: string;
  description: string;
};

export type Track = {
  title: string;
  summary: string;
  description: string;
};

export type SupportItem = {
  label: string;
  detail: string;
};

export type Criterion = {
  title: string;
  description: string;
  /** `40%` — a percentage draws the weight bar; anything else prints as text. */
  weight: string;
};

export type ProofMetric = {
  /** Digits — `180` counts up. Anything else renders unanimated. */
  value: string;
  label: string;
  /** Where the figure comes from. Never publish a metric without one. */
  source: string;
};

export type ProofImage = {
  src: string;
  alt: string;
};

export type Partner = {
  name: string;
  /** With a logo the name is used as the alt text fallback. */
  logoUrl: string;
  websiteUrl: string;
  alt: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type HeroContent = {
  presentedBy: string;
  eventName: string;
  descriptor: string;
  /** Two lines via `\n`. The first sets bold, the rest set light. */
  headline: string;
  body: string;
  primaryCtaLabel: string;
  /** Empty falls back to the top-level `applyUrl`. */
  primaryCtaUrl: string;
  secondaryCtaLabel: string;
  secondaryCtaUrl: string;
  /** The hero meta line shows only the parts that have text. */
  date: string;
  location: string;
  format: string;
};

export type AboutContent = {
  /** Two lines via `\n`. The first sets bold, the rest set light. */
  statement: string;
  body: string;
  principles: string[];
};

export type StackContent = {
  intro: string;
  suiRole: string;
  walrusRole: string;
  modules: string[];
  output: string;
};

export type ProgramContent = {
  intro: string;
  phases: Phase[];
};

export type SupportContent = {
  /** Digits — `30,000,000` counts up. */
  totalPrize: string;
  currency: string;
  /** Array order is the ranking: the first item is the top tier. */
  items: SupportItem[];
  followUpBenefits: string[];
};

export type ProofContent = {
  intro: string;
  metrics: ProofMetric[];
  achievements: string[];
  gallery: ProofImage[];
};

export type PartnersContent = {
  hosts: Partner[];
  mainPartners: Partner[];
  techPartners: Partner[];
  communityPartners: Partner[];
};

export type FinalCtaContent = {
  /** Two lines via `\n`. The first sets bold, the rest set light. */
  message: string;
  body: string;
  label: string;
  /** Empty falls back to the top-level `applyUrl`. */
  url: string;
  /** Empty falls back to the top-level `contact`. */
  contact: string;
};

export type MetadataContent = {
  title: string;
  description: string;
  ogImage: string;
  canonicalUrl: string;
  locale: string;
};

export type EventContent = {
  organizer: string;
  creativeName: string;
  officialEventName: string;
  descriptor: string;
  valueProposition: string;
  date: string;
  applicationPeriod: string;
  location: string;
  format: string;
  /** Empty removes every apply button on the page. */
  applyUrl: string;
  contact: string;

  navigation: NavItem[];
  hero: HeroContent;
  about: AboutContent;
  stack: StackContent;
  program: ProgramContent;
  tracks: Track[];
  support: SupportContent;
  criteria: Criterion[];
  proof: ProofContent;
  partners: PartnersContent;
  faqs: Faq[];
  finalCta: FinalCtaContent;
  metadata: MetadataContent;
};
