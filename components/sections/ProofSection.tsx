import { content, items, line, lines, value } from '@/content';
import { sectionId, sectionIndex, sectionVisibility } from '@/content/sections';
import { SectionFrame } from '@/components/layout/SectionFrame';
import { CountUp } from '@/components/ui/CountUp';
import styles from './sections.module.css';

/**
 * 07 — Proof / Previous edition.
 *
 * Numbers, short lines, curated images — no long history paragraph. A metric
 * without a confirmed value is not rendered, and no figure is ever estimated
 * (CONTENT.md §11).
 */
export function ProofSection() {
  if (!sectionVisibility.proof) return null;

  const proof = value(content.proof);
  const intro = line(proof?.intro);
  const metrics = items(proof?.metrics).filter((metric) => line(metric.value));
  const achievements = lines(proof?.achievements);
  const gallery = items(proof?.gallery).filter((image) => line(image.src));

  return (
    <SectionFrame
      id={sectionId('proof')}
      index={sectionIndex('proof')}
      density="open"
      reveal="crop"
      tone="surface"
    >
      <div className={styles.proof}>
        <header className={styles.proofHead}>
          <h2 className={styles.proofTitle}>proof</h2>
          {intro && <p className={`${styles.proofIntro} u-kr u-measure`}>{intro}</p>}
        </header>

        {metrics.length > 0 && (
          <dl className={styles.metrics}>
            {metrics.map((metric) => (
              <div key={metric.id} className={styles.metric}>
                <dd className={styles.metricValue}>
                  <CountUp value={line(metric.value) ?? ''} />
                </dd>
                {line(metric.label) && (
                  <dt className={`${styles.metricLabel} u-kr`}>{line(metric.label)}</dt>
                )}
                {line(metric.source) && (
                  <p className={styles.metricSource}>{line(metric.source)}</p>
                )}
              </div>
            ))}
          </dl>
        )}

        {achievements.length > 0 && (
          <ul className={styles.achievements}>
            {achievements.map((achievement) => (
              <li key={achievement} className={`${styles.achievement} u-kr`}>
                {achievement}
              </li>
            ))}
          </ul>
        )}

        {gallery.length > 0 && (
          <ul className={styles.gallery}>
            {gallery.map((image) => (
              <li key={image.id} className={styles.galleryItem}>
                {/* eslint-disable-next-line @next/next/no-img-element -- gallery sources are arbitrary external assets */}
                <img src={line(image.src) ?? ''} alt={line(image.alt) ?? ''} loading="lazy" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </SectionFrame>
  );
}
