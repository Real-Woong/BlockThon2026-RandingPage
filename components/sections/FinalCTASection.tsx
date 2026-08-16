import { action, content, line, text, value } from '@/content';
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

  const finalCta = value(content.finalCta);
  const message = line(finalCta?.message);
  const body = line(finalCta?.body);
  const cta = action(finalCta?.label, line(finalCta?.url) ?? text(content.applyUrl));
  const contact = line(finalCta?.contact) ?? text(content.contact);

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
            {message.split('\n').map((row) => (
              <span key={row} className={styles.finalRow}>
                {row}{' '}
              </span>
            ))}
          </h2>
        )}

        {body && <p className={`${styles.finalBody} u-kr u-measure`}>{body}</p>}

        {cta && (
          <div className={styles.finalAction}>
            <ActionLink label={cta.label} url={cta.url} variant="primary" />
          </div>
        )}

        {contact && (
          <a
            className={styles.finalContact}
            href={contact.includes('@') ? `mailto:${contact}` : contact}
          >
            {contact}
          </a>
        )}
      </div>
    </SectionFrame>
  );
}
