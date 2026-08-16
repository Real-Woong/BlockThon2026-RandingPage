import { content, items, line, value } from '@/content';
import { sectionId, sectionIndex, sectionVisibility } from '@/content/sections';
import { SectionFrame } from '@/components/layout/SectionFrame';
import styles from './sections.module.css';

/**
 * 03 — Program / Build Path.
 *
 * The connection line from the stack becomes the timeline spine, and each cube
 * becomes a marker (INTERACTIONS.md §6). Horizontal on desktop, vertical on
 * mobile, with no fixed phase count.
 */
export function BuildPathSection() {
  if (!sectionVisibility.program) return null;

  const program = value(content.program);
  const intro = line(program?.intro);
  const phases = items(program?.phases);

  return (
    <SectionFrame
      id={sectionId('program')}
      index={sectionIndex('program')}
      density="compact"
      reveal="index"
      tone="surface"
    >
      <div className={styles.program}>
        <header className={styles.programHead}>
          <h2 className={styles.programTitle}>build path</h2>
          {intro && <p className={`${styles.programIntro} u-kr u-measure`}>{intro}</p>}
        </header>

        <ol className={styles.timeline} style={{ '--phase-count': phases.length } as React.CSSProperties}>
          {/* The spine draws across before the markers land, so the path reads
              as one run rather than four separate columns. */}
          <span className={styles.timelineSpine} aria-hidden="true" />
          {phases.map((phase, position) => {
            const label = line(phase.label);
            const date = line(phase.date);
            const title = line(phase.title);
            const description = line(phase.description);

            return (
              <li
                key={phase.id}
                className={styles.phase}
                style={{ '--i': position } as React.CSSProperties}
              >
                <span className={styles.phaseMarker} aria-hidden="true" />
                {label && <span className={styles.phaseLabel}>{label}</span>}
                {date && <span className={styles.phaseDate}>{date}</span>}
                {title && <h3 className={`${styles.phaseTitle} u-kr`}>{title}</h3>}
                {description && <p className={`${styles.phaseBody} u-kr`}>{description}</p>}
              </li>
            );
          })}
        </ol>
      </div>
    </SectionFrame>
  );
}
