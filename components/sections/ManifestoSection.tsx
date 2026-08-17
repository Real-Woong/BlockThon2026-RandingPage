import { content } from '@/content';
import { ordinal, sectionId, sectionIndex, sectionVisibility } from '@/content/sections';
import { SectionFrame } from '@/components/layout/SectionFrame';
import styles from './sections.module.css';

/**
 * 01 — Manifesto.
 *
 * One oversized statement, a few supporting lines, and numbered principles set
 * as rules rather than icon cards (DESIGN_SYSTEM.md §7).
 */
export function ManifestoSection() {
  if (!sectionVisibility.manifesto) return null;

  const { statement, body, principles } = content.about;

  return (
    <SectionFrame id={sectionId('manifesto')} index={sectionIndex('manifesto')} density="quiet" reveal="mask">
      <div className={styles.manifesto}>
        {statement && (
          <h2 className={`${styles.statement} u-kr`}>
            {/* Keyed by position, not by text: two lines of a statement are
                allowed to read the same, and a repeated string key would
                collide. */}
            {statement.split('\n').map((row, position) => (
              <span key={position} className={styles.statementRow}>
                {row}{' '}
              </span>
            ))}
          </h2>
        )}

        {body && <p className={`${styles.manifestoBody} u-kr`}>{body}</p>}

        {principles.length > 0 && (
          <ol className={styles.principles}>
            {principles.map((principle, position) => (
              <li key={position} className={styles.principle}>
                <span className={styles.principleIndex}>{ordinal(position)}</span>
                <span className="u-kr">{principle}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </SectionFrame>
  );
}
