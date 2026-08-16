import type { LandingContent } from './types';

/**
 * Single source of event content — mirrors CONTENT.md.
 *
 * Rules (CONTENT.md §16):
 * - Never invent a value. An unconfirmed field stays `state: 'draft'` with no value.
 * - Never substitute "TBD" / "미정" / "Coming soon" / "$0" for a missing value.
 * - Components hide themselves when the fields they need are missing.
 *
 * Everything except the two brand names is still unconfirmed, so the public
 * page currently renders the hero and nothing else. That is the intended state.
 */
export const landingContent: LandingContent = {
  // 2. 기본 정보
  organizer: { state: 'confirmed', value: 'blockblock' },
  creativeName: { state: 'confirmed', value: 'block_block pixel' },
  officialEventName: { state: 'draft' },
  descriptor: { state: 'draft' },
  valueProposition: { state: 'draft' },
  date: { state: 'draft' },
  applicationPeriod: { state: 'draft' },
  location: { state: 'draft' },
  format: { state: 'draft' },
  applyUrl: { state: 'draft' },
  contact: { state: 'draft' },

  // 3. Navigation
  navigation: { state: 'draft', value: [] },

  // 4. Hero
  hero: { state: 'draft', value: {} },

  // 5. Manifesto / About
  about: { state: 'draft', value: { principles: [] } },

  // 6. Ecosystem / Stack
  stack: { state: 'draft', value: { modules: [] } },

  // 7. Program / Build Path
  program: { state: 'draft', value: { phases: [] } },

  // 8. Tracks
  tracks: { state: 'draft', value: [] },

  // 9. Support / Rewards
  support: { state: 'draft', value: { items: [], followUpBenefits: [] } },

  // 10. Criteria
  criteria: { state: 'draft', value: [] },

  // 11. Proof / Previous Edition
  proof: { state: 'draft', value: { metrics: [], achievements: [], gallery: [] } },

  // 12. Partners
  partners: {
    state: 'draft',
    value: { hosts: [], mainPartners: [], techPartners: [], communityPartners: [] },
  },

  // 13. FAQ
  faqs: { state: 'draft', value: [] },

  // 14. Final CTA
  finalCta: { state: 'draft', value: {} },

  // 15. Metadata / SEO
  // Event structured data is intentionally absent until date and location exist.
  metadata: { state: 'draft', value: { locale: 'ko_KR' } },
};
