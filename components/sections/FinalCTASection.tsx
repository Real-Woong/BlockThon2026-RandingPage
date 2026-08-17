import { applyUrl, content } from '@/content';
import { sectionId, sectionIndex, sectionVisibility } from '@/content/sections';
import { SectionFrame } from '@/components/layout/SectionFrame';
import { ActionLink } from '@/components/ui/ActionLink';
import styles from './sections.module.css';

/**
 * 10 — Final build / CTA.
 *
 * Wide margins, one action, and the same block motif as the hero — this time
 * resolved into a single aligned row (DESIGN_SYSTEM.md §7, INTERACTIONS.md §6).
 */
export function FinalCTASection() {
  if (!sectionVisibility.finalCta) return null;

  const { message, body, label, url, contact } = content.finalCta;
  const resolvedContact = contact || content.contact;
  const ctaUrl = applyUrl(url);

  return (
    <SectionFrame id={sectionId('finalCta')} index={sectionIndex('finalCta')} density="focus" reveal="mask">
      <div className={styles.final}>
        <div className={styles.finalBlocks} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>

        {message && (
          <h2 className={`${styles.finalMessage} u-kr`}>
            {message.split('\n').map((row, position) => (
              <span key={position} className={styles.finalRow}>
                {row}{' '}
              </span>
            ))}
          </h2>
        )}

        {body && <p className={`${styles.finalBody} u-kr u-measure`}>{body}</p>}

        {/* The wrapper carries a top margin, so it goes when the button goes. */}
        {label && ctaUrl && (
          <div className={styles.finalAction}>
            <ActionLink label={label} url={ctaUrl} variant="primary" />
          </div>
        )}

        {resolvedContact && (
          <a
            className={styles.finalContact}
            href={resolvedContact.includes('@') ? `mailto:${resolvedContact}` : resolvedContact}
          >
            {resolvedContact}
          </a>
        )}
      </div>
    </SectionFrame>
  );
}
