import { content, items, line, lines, value } from '@/content';
import { sectionId, sectionIndex, sectionVisibility } from '@/content/sections';
import { SectionFrame } from '@/components/layout/SectionFrame';
import { CountUp } from '@/components/ui/CountUp';
import styles from './sections.module.css';

/**
 * 05 — Support / Rewards.
 *
 * The prize figure appears only when a real amount is confirmed: no `0`, no
 * `$0`, no currency symbol standing alone (CONTENT.md §9).
 *
 * Tiers are laid out as a stepped ladder rather than a bordered list. Rank is
 * carried by indent and signal strength, which is derived from array order —
 * no amount is ever parsed out of the copy to drive the layout.
 */
export function SupportSection() {
  if (!sectionVisibility.support) return null;

  const support = value(content.support);
  const totalPrize = line(support?.totalPrize);
  const currency = line(support?.currency);
  const supportItems = items(support?.items);
  const benefits = lines(support?.followUpBenefits);

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

        {supportItems.length > 0 && (
          <dl className={styles.supportList}>
            {supportItems.map((item, position) => {
              const label = line(item.label);
              const detail = line(item.detail);
              if (!label && !detail) return null;
              return (
                <div
                  key={item.id}
                  className={styles.supportRow}
                  style={{ '--i': position } as React.CSSProperties}
                >
                  {label && <dt className={`${styles.supportLabel} u-kr`}>{label}</dt>}
                  {detail && <dd className={`${styles.supportDetail} u-kr`}>{detail}</dd>}
                </div>
              );
            })}
          </dl>
        )}

        {benefits.length > 0 && (
          <ul className={styles.benefits}>
            {benefits.map((benefit) => (
              <li key={benefit} className={`${styles.benefit} u-kr`}>
                {benefit}
              </li>
            ))}
          </ul>
        )}
      </div>
    </SectionFrame>
  );
}
