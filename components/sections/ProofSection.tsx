import { content } from '@/content';
import { sectionId, sectionIndex, sectionVisibility } from '@/content/sections';
import { SectionFrame } from '@/components/layout/SectionFrame';
import { CountUp } from '@/components/ui/CountUp';
import styles from './sections.module.css';

/**
 * 07 — Proof / Previous edition.
 *
 * Numbers, short lines, curated images — no long history paragraph. A metric
 * without a value is not rendered, and no figure is ever estimated.
 */
export function ProofSection() {
  if (!sectionVisibility.proof) return null;

  const { intro, metrics, achievements, gallery } = content.proof;

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
            {metrics.map((metric, position) => (
              <div key={position} className={styles.metric}>
                <dd className={styles.metricValue}>
                  <CountUp value={metric.value} />
                </dd>
                {metric.label && <dt className={`${styles.metricLabel} u-kr`}>{metric.label}</dt>}
                {metric.source && <p className={styles.metricSource}>{metric.source}</p>}
              </div>
            ))}
          </dl>
        )}

        {achievements.length > 0 && (
          <ul className={styles.achievements}>
            {achievements.map((achievement, position) => (
              <li key={position} className={`${styles.achievement} u-kr`}>
                {achievement}
              </li>
            ))}
          </ul>
        )}

        {gallery.length > 0 && (
          <ul className={styles.gallery}>
            {gallery.map((image, position) => (
              <li key={position} className={styles.galleryItem}>
                {/* eslint-disable-next-line @next/next/no-img-element -- gallery sources are arbitrary external assets */}
                <img src={image.src} alt={image.alt} loading="lazy" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </SectionFrame>
  );
}
