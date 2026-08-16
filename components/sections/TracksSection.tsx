'use client';

import { useId, useState } from 'react';
import { content, line, list } from '@/content';
import { sectionId, sectionIndex, sectionVisibility } from '@/content/sections';
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
 * and the criteria, support and FAQ sections were all reading as the same
 * list module, and the track titles are the one place on the page where the
 * subject matter itself deserves to be the largest thing on screen.
 */
export function TracksSection() {
  const tracks = list(content.tracks);
  const [activeId, setActiveId] = useState(tracks[0]?.id ?? '');
  const baseId = useId();

  if (!sectionVisibility.tracks || tracks.length === 0) return null;

  const active = tracks.find((track) => track.id === activeId) ?? tracks[0];

  return (
    <SectionFrame id={sectionId('tracks')} index={sectionIndex('tracks')} density="dense" reveal="crop">
      <div className={styles.tracks}>
        <h2 className={styles.tracksTitle}>tracks</h2>

        <div className={styles.trackLayout}>
          <div className={styles.trackList} role="tablist" aria-label="트랙 목록">
            {tracks.map((track) => {
              const selected = track.id === active?.id;
              return (
                <button
                  key={track.id}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${track.id}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel-${track.id}`}
                  tabIndex={selected ? 0 : -1}
                  className={styles.trackTab}
                  onClick={() => setActiveId(track.id)}
                  onFocus={() => setActiveId(track.id)}
                >
                  <span className={styles.trackNode} aria-hidden="true" />
                  <span className={styles.trackIndex}>{line(track.index) ?? ''}</span>
                  <span className={`${styles.trackName} u-kr`}>{line(track.title)}</span>
                </button>
              );
            })}
          </div>

          {active && (
            <div
              role="tabpanel"
              id={`${baseId}-panel-${active.id}`}
              aria-labelledby={`${baseId}-tab-${active.id}`}
              className={styles.trackPanel}
            >
              {line(active.summary) && (
                <p className={`${styles.trackSummary} u-kr`}>{line(active.summary)}</p>
              )}
              {line(active.description) && (
                <p className={`${styles.trackBody} u-kr u-measure`}>{line(active.description)}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </SectionFrame>
  );
}
