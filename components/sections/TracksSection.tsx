'use client';

import { useId, useState } from 'react';
import { content } from '@/content';
import { ordinal, sectionId, sectionIndex, sectionVisibility } from '@/content/sections';
import { SectionFrame } from '@/components/layout/SectionFrame';
import styles from './sections.module.css';

/**
 * 04 — Tracks.
 *
 * Selecting a track activates the related node instead of blowing up a card
 * (DESIGN_SYSTEM.md §7). Implemented as a tab list so it works with a pointer,
 * a keyboard and a screen reader — never on hover alone.
 *
 * The names are set at display scale rather than as hairline rows: this section
 * and the criteria, support and FAQ sections were all reading as the same list
 * module, and the track titles are the one place on the page where the subject
 * matter itself deserves to be the largest thing on screen.
 */
export function TracksSection() {
  const tracks = content.tracks;
  const [active, setActive] = useState(0);
  const baseId = useId();

  if (!sectionVisibility.tracks) return null;

  const current = tracks[active] ?? tracks[0];

  return (
    <SectionFrame id={sectionId('tracks')} index={sectionIndex('tracks')} density="dense" reveal="crop">
      <div className={styles.tracks}>
        <h2 className={styles.tracksTitle}>tracks</h2>

        <div className={styles.trackLayout}>
          <div className={styles.trackList} role="tablist" aria-label="트랙 목록">
            {tracks.map((track, position) => {
              const selected = position === active;
              return (
                <button
                  key={position}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${position}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel-${position}`}
                  tabIndex={selected ? 0 : -1}
                  className={styles.trackTab}
                  onClick={() => setActive(position)}
                  onFocus={() => setActive(position)}
                >
                  <span className={styles.trackNode} aria-hidden="true" />
                  <span className={styles.trackIndex}>{ordinal(position)}</span>
                  <span className={`${styles.trackName} u-kr`}>{track.title}</span>
                </button>
              );
            })}
          </div>

          {current && (
            <div
              role="tabpanel"
              id={`${baseId}-panel-${active}`}
              aria-labelledby={`${baseId}-tab-${active}`}
              className={styles.trackPanel}
            >
              {current.summary && (
                <p className={`${styles.trackSummary} u-kr`}>{current.summary}</p>
              )}
              {current.description && (
                <p className={`${styles.trackBody} u-kr u-measure`}>{current.description}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </SectionFrame>
  );
}
