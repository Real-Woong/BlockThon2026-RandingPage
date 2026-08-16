import { protocolLabels } from '@/content/brand';
import { content, line, lines, value } from '@/content';
import { sectionId, sectionIndex, sectionVisibility } from '@/content/sections';
import { SectionFrame } from '@/components/layout/SectionFrame';
import styles from './sections.module.css';

/**
 * 02 — Ecosystem / Stack.
 *
 * A node diagram, not a card set: the SUI layer and the WALRUS layer converge
 * on a single output (DESIGN_SYSTEM.md §7). Each layer renders only if its
 * role text is confirmed, and the connectors collapse with it.
 */
export function StackSection() {
  if (!sectionVisibility.stack) return null;

  const stack = value(content.stack);
  const intro = line(stack?.intro);
  const suiRole = line(stack?.suiRole);
  const walrusRole = line(stack?.walrusRole);
  const modules = lines(stack?.modules);
  const output = line(stack?.output);

  return (
    <SectionFrame id={sectionId('stack')} index={sectionIndex('stack')} density="technical" reveal="line">
      <div className={styles.stack}>
        <header className={styles.stackHead}>
          <h2 className={styles.stackTitle}>stack</h2>
          {intro && <p className={`${styles.stackIntro} u-kr`}>{intro}</p>}
        </header>

        {(suiRole || walrusRole || output) && (
          <div className={styles.diagram} data-has-output={Boolean(output)}>
            <div className={styles.layers}>
              {suiRole && (
                <article className={styles.layer} data-layer="sui">
                  <span className={styles.layerKey}>{protocolLabels.sui.text}</span>
                  <p className={`${styles.layerRole} u-kr`}>{suiRole}</p>
                </article>
              )}
              {walrusRole && (
                <article className={styles.layer} data-layer="walrus">
                  <span className={styles.layerKey}>{protocolLabels.walrus.text}</span>
                  <p className={`${styles.layerRole} u-kr`}>{walrusRole}</p>
                </article>
              )}
            </div>

            {output && (
              <div className={styles.output}>
                <span className={styles.outputKey}>output</span>
                <p className={`${styles.outputValue} u-kr`}>{output}</p>
              </div>
            )}
          </div>
        )}

        {modules.length > 0 && (
          <ul className={styles.modules}>
            {modules.map((module) => (
              <li key={module} className={styles.module}>
                <span className={styles.moduleNode} aria-hidden="true" />
                <span className="u-kr">{module}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </SectionFrame>
  );
}
