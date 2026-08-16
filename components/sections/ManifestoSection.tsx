import { content, line, lines, value } from '@/content';
import { sectionId, sectionIndex, sectionVisibility } from '@/content/sections';
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

  const about = value(content.about);
  const statement = line(about?.statement);
  const body = line(about?.body);
  const principles = lines(about?.principles);

  return (
    <SectionFrame id={sectionId('manifesto')} index={sectionIndex('manifesto')} density="quiet" reveal="mask">
      <div className={styles.manifesto}>
        {statement && (
          <h2 className={`${styles.statement} u-kr`}>
            {statement.split('\n').map((row) => (
              <span key={row} className={styles.statementRow}>
                {row}{' '}
              </span>
            ))}
          </h2>
        )}

        {body && <p className={`${styles.manifestoBody} u-kr`}>{body}</p>}

        {principles.length > 0 && (
          <ol className={styles.principles}>
            {principles.map((principle, position) => (
              <li key={principle} className={styles.principle}>
                <span className={styles.principleIndex}>
                  {String(position + 1).padStart(2, '0')}
                </span>
                <span className="u-kr">{principle}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </SectionFrame>
  );
}
