import { content } from '@/content';
import { sectionId, sectionIndex, sectionVisibility } from '@/content/sections';
import { SectionFrame } from '@/components/layout/SectionFrame';
import { CountUp } from '@/components/ui/CountUp';
import styles from './sections.module.css';

/**
 * 05 — Support / Rewards.
 *
 * The prize figure appears only when a real amount is filled in: no `0`, no
 * `$0`, no currency symbol standing alone.
 *
 * Tiers are laid out as a stepped ladder rather than a bordered list. Rank is
 * carried by indent and signal strength, which is derived from array order —
 * no amount is ever parsed out of the copy to drive the layout.
 */
export function SupportSection() {
  if (!sectionVisibility.support) return null;

  const { totalPrize, currency, items, followUpBenefits } = content.support;

  return (
    <SectionFrame
      id={sectionId('support')}
      index={sectionIndex('support')}
      density="compact"
      reveal="depth"
      tone="surface"
    >
      <div className={styles.support}>
        <h2 className={styles.supportTitle}>support</h2>

        {totalPrize && (
          <p className={styles.prize}>
            <CountUp value={totalPrize} className={styles.prizeValue} durationMs={1400} />
            {currency && <span className={styles.prizeCurrency}>{currency}</span>}
          </p>
        )}

        {items.length > 0 && (
          <dl className={styles.supportList}>
            {items.map((item, position) => (
              <div
                key={position}
                className={styles.supportRow}
                style={{ '--i': position } as React.CSSProperties}
              >
                {item.label && <dt className={`${styles.supportLabel} u-kr`}>{item.label}</dt>}
                {item.detail && <dd className={`${styles.supportDetail} u-kr`}>{item.detail}</dd>}
              </div>
            ))}
          </dl>
        )}

        {followUpBenefits.length > 0 && (
          <ul className={styles.benefits}>
            {followUpBenefits.map((benefit, position) => (
              <li key={position} className={`${styles.benefit} u-kr`}>
                {benefit}
              </li>
            ))}
          </ul>
        )}
      </div>
    </SectionFrame>
  );
}
