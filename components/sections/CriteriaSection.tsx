import { content, line, list } from '@/content';
import { sectionId, sectionIndex, sectionVisibility } from '@/content/sections';
import { SectionFrame } from '@/components/layout/SectionFrame';
import styles from './sections.module.css';

/**
 * 06 — Criteria. Large numbers, thin dividers, short titles (DESIGN_SYSTEM.md §7).
 */
export function CriteriaSection() {
  if (!sectionVisibility.criteria) return null;

  const criteria = list(content.criteria);

  return (
    <SectionFrame id={sectionId('criteria')} index={sectionIndex('criteria')} density="technical" reveal="line">
      <div className={styles.criteria}>
        <h2 className={styles.criteriaTitle}>criteria</h2>

        <ol className={styles.criteriaList}>
          {criteria.map((criterion, position) => {
            const title = line(criterion.title);
            const description = line(criterion.description);
            const weight = line(criterion.weight);
            const index = line(criterion.index) ?? String(position + 1).padStart(2, '0');

            return (
              <li key={criterion.id} className={styles.criterion}>
                <span className={styles.criterionIndex}>{index}</span>
                <div className={styles.criterionBody}>
                  {title && <h3 className={`${styles.criterionTitle} u-kr`}>{title}</h3>}
                  {description && <p className={`${styles.criterionText} u-kr`}>{description}</p>}
                </div>
                {weight && <span className={styles.criterionWeight}>{weight}</span>}
              </li>
            );
          })}
        </ol>
      </div>
    </SectionFrame>
  );
}
