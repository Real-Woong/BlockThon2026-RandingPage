import type { LandingContent } from './types';

/**
 * Development-only structure tokens (CLAUDE.md §3.1, CONTENT.md §17).
 *
 * These exist so the layout can be reviewed with every section populated. They
 * are deliberately written as bracketed tokens so they can never be mistaken
 * for real event copy, and they are only merged when
 * NEXT_PUBLIC_CONTENT_PREVIEW=structure outside production.
 */
export const layoutFixtures = {
  short: '[SHORT_CONTENT]',
  medium: '[MEDIUM_LENGTH_CONTENT_FOR_LAYOUT_TEST]',
  long: '[LONG_KOREAN_CONTENT_FOR_RESPONSIVE_AND_LINE_BREAK_TEST_ONLY]',
} as const;

const draftedItem = <T extends object>(item: T): T & { state: 'draft' } => ({
  ...item,
  state: 'draft',
});

export const previewContent: LandingContent = {
  organizer: { state: 'confirmed', value: 'blockblock' },
  creativeName: { state: 'confirmed', value: 'block_block pixel' },
  officialEventName: { state: 'draft', value: '[OFFICIAL_EVENT_NAME]' },
  descriptor: { state: 'draft', value: '[EVENT_DESCRIPTOR]' },
  valueProposition: { state: 'draft', value: '[ONE_LINE_VALUE_PROPOSITION]' },
  date: { state: 'draft', value: '[DATE]' },
  applicationPeriod: { state: 'draft', value: '[APPLICATION_PERIOD]' },
  location: { state: 'draft', value: '[LOCATION]' },
  format: { state: 'draft', value: '[FORMAT]' },
  applyUrl: { state: 'draft', value: '#apply-preview' },
  contact: { state: 'draft', value: '[CONTACT]' },

  navigation: {
    state: 'draft',
    value: [
      draftedItem({ id: 'about', label: '[ABOUT]', href: '#about' }),
      draftedItem({ id: 'stack', label: '[STACK]', href: '#stack' }),
      draftedItem({ id: 'program', label: '[PROGRAM]', href: '#program' }),
      draftedItem({ id: 'faq', label: '[FAQ]', href: '#faq' }),
    ],
  },

  hero: {
    state: 'draft',
    value: {
      presentedBy: '[PRESENTED_BY]',
      eventName: 'block_block pixel',
      descriptor: '[EVENT_DESCRIPTOR]',
      headline: '[HERO_HEADLINE_LINE_01]\n[HERO_HEADLINE_LINE_02]',
      body: '[ONE_LINE_VALUE_PROPOSITION]',
      primaryCtaLabel: '[PRIMARY_CTA]',
      primaryCtaUrl: '#apply-preview',
      secondaryCtaLabel: '[SECONDARY_CTA]',
      secondaryCtaUrl: '#about',
      date: '[DATE]',
      location: '[LOCATION]',
      format: '[FORMAT]',
    },
  },

  about: {
    state: 'draft',
    value: {
      statement: '[MANIFESTO_STATEMENT_LINE_01]\n[MANIFESTO_STATEMENT_LINE_02]',
      body: layoutFixtures.long,
      principles: ['[PRINCIPLE_01]', '[PRINCIPLE_02]', '[PRINCIPLE_03]'],
    },
  },

  stack: {
    state: 'draft',
    value: {
      intro: '[STACK_INTRO]',
      suiRole: '[SUI_ROLE]',
      walrusRole: '[WALRUS_ROLE]',
      modules: ['[MODULE_01]', '[MODULE_02]', '[MODULE_03]', '[MODULE_04]'],
      output: '[OUTPUT]',
    },
  },

  program: {
    state: 'draft',
    value: {
      intro: '[PROGRAM_INTRO]',
      phases: [
        draftedItem({ id: 'p1', label: '[PHASE_01]', date: '[DATE]', title: '[PHASE_TITLE_01]', description: layoutFixtures.medium }),
        draftedItem({ id: 'p2', label: '[PHASE_02]', date: '[DATE]', title: '[PHASE_TITLE_02]', description: layoutFixtures.medium }),
        draftedItem({ id: 'p3', label: '[PHASE_03]', date: '[DATE]', title: '[PHASE_TITLE_03]', description: layoutFixtures.long }),
        draftedItem({ id: 'p4', label: '[PHASE_04]', date: '[DATE]', title: '[PHASE_TITLE_04]', description: layoutFixtures.short }),
      ],
    },
  },

  tracks: {
    state: 'draft',
    value: [
      draftedItem({ id: 't1', index: '01', title: '[TRACK_01]', summary: layoutFixtures.short, description: layoutFixtures.long }),
      draftedItem({ id: 't2', index: '02', title: '[TRACK_02]', summary: layoutFixtures.short, description: layoutFixtures.medium }),
      draftedItem({ id: 't3', index: '03', title: '[TRACK_03]', summary: layoutFixtures.short, description: layoutFixtures.medium }),
    ],
  },

  support: {
    state: 'draft',
    value: {
      totalPrize: '[TOTAL_PRIZE]',
      currency: '',
      items: [
        draftedItem({ id: 's1', label: '[SUPPORT_ITEM_01]', detail: layoutFixtures.short }),
        draftedItem({ id: 's2', label: '[SUPPORT_ITEM_02]', detail: layoutFixtures.medium }),
      ],
      followUpBenefits: ['[FOLLOW_UP_01]', '[FOLLOW_UP_02]'],
    },
  },

  criteria: {
    state: 'draft',
    value: [
      draftedItem({ id: 'c1', index: '01', title: '[CRITERION_01]', description: layoutFixtures.medium, weight: '[WEIGHT]' }),
      draftedItem({ id: 'c2', index: '02', title: '[CRITERION_02]', description: layoutFixtures.medium, weight: '[WEIGHT]' }),
      draftedItem({ id: 'c3', index: '03', title: '[CRITERION_03]', description: layoutFixtures.long, weight: '[WEIGHT]' }),
      draftedItem({ id: 'c4', index: '04', title: '[CRITERION_04]', description: layoutFixtures.short, weight: '[WEIGHT]' }),
    ],
  },

  proof: {
    state: 'draft',
    value: {
      intro: '[PROOF_INTRO]',
      metrics: [
        draftedItem({ id: 'm1', label: '[METRIC_LABEL_01]', value: '[N]', source: '[SOURCE]' }),
        draftedItem({ id: 'm2', label: '[METRIC_LABEL_02]', value: '[N]', source: '[SOURCE]' }),
        draftedItem({ id: 'm3', label: '[METRIC_LABEL_03]', value: '[N]', source: '[SOURCE]' }),
      ],
      achievements: ['[ACHIEVEMENT_01]', '[ACHIEVEMENT_02]'],
      gallery: [],
    },
  },

  partners: {
    state: 'draft',
    value: {
      hosts: [draftedItem({ id: 'h1', name: '[HOST_01]' })],
      mainPartners: [draftedItem({ id: 'mp1', name: '[MAIN_PARTNER_01]' }), draftedItem({ id: 'mp2', name: '[MAIN_PARTNER_02]' })],
      techPartners: [
        draftedItem({ id: 'tp1', name: '[TECH_PARTNER_01]' }),
        draftedItem({ id: 'tp2', name: '[TECH_PARTNER_02]' }),
        draftedItem({ id: 'tp3', name: '[TECH_PARTNER_03]' }),
      ],
      communityPartners: [
        draftedItem({ id: 'cp1', name: '[COMMUNITY_PARTNER_01]' }),
        draftedItem({ id: 'cp2', name: '[COMMUNITY_PARTNER_02]' }),
        draftedItem({ id: 'cp3', name: '[COMMUNITY_PARTNER_03]' }),
        draftedItem({ id: 'cp4', name: '[COMMUNITY_PARTNER_04]' }),
      ],
    },
  },

  faqs: {
    state: 'draft',
    value: [
      draftedItem({ id: 'f1', question: '[FAQ_QUESTION_01]', answer: layoutFixtures.long }),
      draftedItem({ id: 'f2', question: '[FAQ_QUESTION_02]', answer: layoutFixtures.medium }),
      draftedItem({ id: 'f3', question: '[FAQ_QUESTION_03]', answer: layoutFixtures.short }),
    ],
  },

  finalCta: {
    state: 'draft',
    value: {
      message: '[FINAL_MESSAGE_LINE_01]\n[FINAL_MESSAGE_LINE_02]',
      body: layoutFixtures.medium,
      label: '[PRIMARY_CTA]',
      url: '#apply-preview',
      contact: '[CONTACT]',
    },
  },

  metadata: {
    state: 'draft',
    value: { title: '[META_TITLE]', description: '[META_DESCRIPTION]', locale: 'ko_KR' },
  },
};
