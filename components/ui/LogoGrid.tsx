import type { Partner } from '@/content/types';
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
  if (partners.length === 0) return null;

  return (
    <section className={styles.logoGroup}>
      <header className={styles.logoGroupHead}>
        <StatusLabel tone="quiet">{title}</StatusLabel>
      </header>
      <div className={styles.logoGrid} data-tier={tier}>
        {partners.map((partner, position) => {
          const inner = partner.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- partner artwork is supplied as an arbitrary external asset
            <img src={partner.logoUrl} alt={partner.alt || partner.name} loading="lazy" />
          ) : (
            <span>{partner.name}</span>
          );

          return partner.websiteUrl ? (
            <a
              key={position}
              className={styles.logoCell}
              href={partner.websiteUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              {inner}
            </a>
          ) : (
            <div key={position} className={styles.logoCell}>
              {inner}
            </div>
          );
        })}
      </div>
    </section>
  );
}
