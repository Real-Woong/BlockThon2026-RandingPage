'use client';

import { useId, useState } from 'react';
import type { Faq } from '@/content/types';
import styles from './ui.module.css';

/**
 * Keyboard-operable disclosure list. Answers stay in the DOM as hidden regions
 * so nothing important depends on hover (INTERACTIONS.md §12).
 */
export function Accordion({ entries }: { entries: Faq[] }) {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(0);

  if (entries.length === 0) return null;

  return (
    <div className={styles.accordion}>
      {entries.map((entry, position) => {
        const expanded = open === position;
        const panelId = `${baseId}-${position}`;

        return (
          <div key={position} className={styles.accordionItem}>
            <h3>
              <button
                type="button"
                className={styles.accordionTrigger}
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : position)}
              >
                <span className="u-kr">{entry.question}</span>
                <span className={styles.accordionSign} aria-hidden="true" />
              </button>
            </h3>
            <div id={panelId} className={styles.accordionPanel} hidden={!expanded}>
              <p className="u-kr">{entry.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
