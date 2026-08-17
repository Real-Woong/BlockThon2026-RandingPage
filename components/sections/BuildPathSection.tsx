import { content } from '@/content';
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

  const { intro, phases } = content.program;

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
          {phases.map((phase, position) => (
            <li key={position} className={styles.phase} style={{ '--i': position } as React.CSSProperties}>
              <span className={styles.phaseMarker} aria-hidden="true" />
              {phase.label && <span className={styles.phaseLabel}>{phase.label}</span>}
              {phase.date && <span className={styles.phaseDate}>{phase.date}</span>}
              {phase.title && <h3 className={`${styles.phaseTitle} u-kr`}>{phase.title}</h3>}
              {phase.description && <p className={`${styles.phaseBody} u-kr`}>{phase.description}</p>}
            </li>
          ))}
        </ol>
      </div>
    </SectionFrame>
  );
}
