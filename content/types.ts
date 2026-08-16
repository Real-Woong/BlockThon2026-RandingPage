/**
 * Content state model — CONTENT.md §1.
 *
 * Only `confirmed` fields are allowed on the public screen.
 * `draft` may render structure tokens in preview mode only.
 * `hidden` never renders.
 */
export type ContentState = 'draft' | 'confirmed' | 'hidden';

export type ContentField<T> = {
  state: ContentState;
  value?: T;
};

export type Phase = {
  id: string;
  label?: string;
  date?: string;
  title?: string;
  description?: string;
  state: ContentState;
};

export type Track = {
  id: string;
  index?: string;
  title?: string;
  summary?: string;
  description?: string;
  state: ContentState;
};

export type SupportItem = {
  id: string;
  label?: string;
  detail?: string;
  state: ContentState;
};

export type Criterion = {
  id: string;
  index?: string;
  title?: string;
  description?: string;
  weight?: string;
  state: ContentState;
};

export type ProofMetric = {
  id: string;
  label?: string;
  value?: string;
  source?: string;
  state: ContentState;
};

export type ProofImage = {
  id: string;
  src?: string;
  alt?: string;
  state: ContentState;
};

export type Partner = {
  id: string;
  name?: string;
  logoUrl?: string;
  websiteUrl?: string;
  alt?: string;
  state: ContentState;
};

export type Faq = {
  id: string;
  question?: string;
  answer?: string;
  state: ContentState;
};

export type NavItem = {
  id: string;
  label?: string;
  href?: string;
  state: ContentState;
};

export type HeroContentValue = {
  presentedBy?: string;
  eventName?: string;
  descriptor?: string;
  headline?: string;
  body?: string;
  primaryCtaLabel?: string;
  primaryCtaUrl?: string;
  secondaryCtaLabel?: string;
  secondaryCtaUrl?: string;
  date?: string;
  location?: string;
  format?: string;
};

export type AboutValue = {
  statement?: string;
  body?: string;
  principles?: string[];
};

export type StackValue = {
  intro?: string;
  suiRole?: string;
  walrusRole?: string;
  modules?: string[];
  output?: string;
};

export type ProgramValue = {
  intro?: string;
  phases?: Phase[];
};

export type SupportValue = {
  totalPrize?: string;
  currency?: string;
  items?: SupportItem[];
  followUpBenefits?: string[];
};

export type ProofValue = {
  intro?: string;
  metrics?: ProofMetric[];
  achievements?: string[];
  gallery?: ProofImage[];
};

export type PartnersValue = {
  hosts?: Partner[];
  mainPartners?: Partner[];
  techPartners?: Partner[];
  communityPartners?: Partner[];
};

export type FinalCtaValue = {
  message?: string;
  body?: string;
  label?: string;
  url?: string;
  contact?: string;
};

export type MetadataValue = {
  title?: string;
  description?: string;
  ogImage?: string;
  canonicalUrl?: string;
  locale?: string;
};

export type LandingContent = {
  organizer: ContentField<string>;
  creativeName: ContentField<string>;
  officialEventName: ContentField<string>;
  descriptor: ContentField<string>;
  valueProposition: ContentField<string>;
  date: ContentField<string>;
  applicationPeriod: ContentField<string>;
  location: ContentField<string>;
  format: ContentField<string>;
  applyUrl: ContentField<string>;
  contact: ContentField<string>;
  navigation: ContentField<NavItem[]>;
  hero: ContentField<HeroContentValue>;
  about: ContentField<AboutValue>;
  stack: ContentField<StackValue>;
  program: ContentField<ProgramValue>;
  tracks: ContentField<Track[]>;
  support: ContentField<SupportValue>;
  criteria: ContentField<Criterion[]>;
  proof: ContentField<ProofValue>;
  partners: ContentField<PartnersValue>;
  faqs: ContentField<Faq[]>;
  finalCta: ContentField<FinalCtaValue>;
  metadata: ContentField<MetadataValue>;
};
