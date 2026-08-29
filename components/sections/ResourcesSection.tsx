import { content } from '@/content';
import { sectionId, sectionIndex, sectionVisibility } from '@/content/sections';
import { SectionFrame } from '@/components/layout/SectionFrame';
import styles from './sections.module.css';

/**
 * 03 — Developer resources.
 *
 * A documentation index, not a card set: each tool is one row of the page, its
 * name set in mono on the left and the pages it opens listed as a ruled column
 * on the right. Nothing here is event content — these are the official docs a
 * team needs during the preliminary, so the section carries no dates, no
 * numbers and no claims about the event.
 *
 * A link without a URL was already dropped in `content/index.ts`, and a group
 * left with no links went with it, so everything reaching this component opens
 * something.
 */
export function ResourcesSection() {
  if (!sectionVisibility.resources) return null;

  const { intro, groups } = content.resources;

  return (
    <SectionFrame
      id={sectionId('resources')}
      index={sectionIndex('resources')}
      density="dense"
      reveal="depth"
    >
      <div className={styles.resources}>
        <header className={styles.resourcesHead}>
          <h2 className={styles.resourcesTitle}>developer resources</h2>
          {intro && <p className={`${styles.resourcesIntro} u-kr`}>{intro}</p>}
        </header>

        <div className={styles.resourceGroups}>
          {groups.map((group, position) => (
            <section key={position} className={styles.resourceGroup}>
              <div>
                <h3 className={styles.resourceGroupTitle}>{group.title}</h3>
                {group.summary && (
                  <p className={`${styles.resourceGroupSummary} u-kr`}>{group.summary}</p>
                )}
              </div>

              <ul className={styles.resourceLinks}>
                {group.links.map((link, index) => (
                  <li key={index} className={styles.resourceItem}>
                    <a
                      className={styles.resourceLink}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <span className={styles.resourceLabel}>{link.label}</span>
                      {link.note && (
                        <span className={`${styles.resourceNote} u-kr`}>{link.note}</span>
                      )}
                      {/* The link text already says where it goes; this only
                          marks that it leaves the page. */}
                      <span className={styles.resourceMark} aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
