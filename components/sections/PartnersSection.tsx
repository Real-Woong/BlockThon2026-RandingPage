import { content } from '@/content';
import { sectionId, sectionIndex, sectionVisibility } from '@/content/sections';
import { SectionFrame } from '@/components/layout/SectionFrame';
import { LogoGrid } from '@/components/ui/LogoGrid';
import styles from './sections.module.css';

/**
 * 08 — Partners.
 *
 * Tiers, an editorial grid, no marquee. Organisations under discussion stay
 * out until they are filled in.
 */
export function PartnersSection() {
  if (!sectionVisibility.partners) return null;

  const { hosts, mainPartners, techPartners, communityPartners } = content.partners;

  const groups = [
    { title: 'host', partners: hosts, tier: 'lead' as const },
    { title: 'partners', partners: mainPartners, tier: 'lead' as const },
    { title: 'tech', partners: techPartners, tier: 'support' as const },
    { title: 'community', partners: communityPartners, tier: 'support' as const },
  ].filter((group) => group.partners.length > 0);

  return (
    <SectionFrame id={sectionId('partners')} index={sectionIndex('partners')} density="open" reveal="depth">
      <div className={styles.partners}>
        <h2 className={styles.partnersTitle}>partners</h2>
        <div className={styles.partnerGroups}>
          {groups.map((group) => (
            <LogoGrid key={group.title} title={group.title} partners={group.partners} tier={group.tier} />
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
