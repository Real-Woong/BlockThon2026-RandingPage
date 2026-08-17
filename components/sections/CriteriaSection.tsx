import { content } from '@/content';
import { ordinal, sectionId, sectionIndex, sectionVisibility } from '@/content/sections';
import { SectionFrame } from '@/components/layout/SectionFrame';
import styles from './sections.module.css';

/** Reads `40%` as 40 so the weight can be drawn, not just printed. */
function weightFraction(weight: string): number | null {
  const match = /(\d+(?:\.\d+)?)\s*%/.exec(weight);
  const parsed = match ? Number(match[1]) : NaN;
  return Number.isFinite(parsed) && parsed > 0 && parsed <= 100 ? parsed / 100 : null;
}

/**
 * 06 — Criteria. Large numbers, thin dividers, short titles (DESIGN_SYSTEM.md §7).
 *
 * The weights are the section's actual content, so they are drawn as bars
 * rather than set as trailing labels — a judged percentage that you can compare
 * at a glance says more about how the event is run than the number alone does.
 * A criterion without a parseable percentage keeps the plain label.
 */
export function CriteriaSection() {
  if (!sectionVisibility.criteria) return null;

  return (
    <SectionFrame
      id={sectionId('criteria')}
      index={sectionIndex('criteria')}
      density="technical"
      reveal="line"
      tone="field"
    >
      <div className={styles.criteria}>
        <h2 className={styles.criteriaTitle}>criteria</h2>

        <ol className={styles.criteriaList}>
          {content.criteria.map((criterion, position) => {
            const fraction = weightFraction(criterion.weight);

            return (
              <li
                key={position}
                className={styles.criterion}
                style={{ '--i': position, '--weight': fraction ?? 0 } as React.CSSProperties}
              >
                <span className={styles.criterionIndex}>{ordinal(position)}</span>
                <div className={styles.criterionBody}>
                  <h3 className={`${styles.criterionTitle} u-kr`}>{criterion.title}</h3>
                  {criterion.description && (
                    <p className={`${styles.criterionText} u-kr`}>{criterion.description}</p>
                  )}
                </div>
                {criterion.weight && (
                  <span className={styles.criterionWeight}>
                    {fraction !== null && (
                      <span className={styles.criterionBar} aria-hidden="true">
                        <span className={styles.criterionBarFill} />
                      </span>
                    )}
                    <span className={styles.criterionWeightValue}>{criterion.weight}</span>
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </SectionFrame>
  );
}
