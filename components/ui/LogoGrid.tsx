import type { Partner } from '@/content/types';
import { line } from '@/content';
import { StatusLabel } from './StatusLabel';
import styles from './ui.module.css';

type LogoGridProps = {
  title: string;
  partners: Partner[];
  tier: 'lead' | 'support';
};

/**
 * Partner group.
 *
 * Tiers differ in cell size rather than in decoration, logos are not boxed in
 * white plates, and there is no marquee (DESIGN_SYSTEM.md §7). A partner with
 * no logo file shows its name as type instead of an empty frame.
 */
export function LogoGrid({ title, partners, tier }: LogoGridProps) {
  const entries = partners.filter((partner) => line(partner.name) ?? line(partner.logoUrl));
  if (entries.length === 0) return null;

  return (
    <section className={styles.logoGroup}>
      <header className={styles.logoGroupHead}>
        <StatusLabel tone="quiet">{title}</StatusLabel>
      </header>
      <div className={styles.logoGrid} data-tier={tier}>
        {entries.map((partner) => {
          const name = line(partner.name);
          const logo = line(partner.logoUrl);
          const href = line(partner.websiteUrl);

          const inner = logo ? (
            // eslint-disable-next-line @next/next/no-img-element -- partner artwork is supplied as an arbitrary external asset
            <img src={logo} alt={line(partner.alt) ?? name ?? ''} loading="lazy" />
          ) : (
            <span>{name}</span>
          );

          return href ? (
            <a key={partner.id} className={styles.logoCell} href={href} target="_blank" rel="noreferrer noopener">
              {inner}
            </a>
          ) : (
            <div key={partner.id} className={styles.logoCell}>
              {inner}
            </div>
          );
        })}
      </div>
    </section>
  );
}
