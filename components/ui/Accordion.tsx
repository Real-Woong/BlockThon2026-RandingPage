'use client';

import { useId, useState } from 'react';
import styles from './ui.module.css';

export type AccordionEntry = {
  id: string;
  question: string;
  answer: string;
};

/**
 * Keyboard-operable disclosure list. Answers stay in the DOM as hidden regions
 * so nothing important depends on hover (INTERACTIONS.md §12).
 */
export function Accordion({ entries }: { entries: AccordionEntry[] }) {
  const baseId = useId();
  const [open, setOpen] = useState<string | null>(entries[0]?.id ?? null);

  if (entries.length === 0) return null;

  return (
    <div className={styles.accordion}>
      {entries.map((entry) => {
        const expanded = open === entry.id;
        const panelId = `${baseId}-${entry.id}`;

        return (
          <div key={entry.id} className={styles.accordionItem}>
            <h3>
              <button
                type="button"
                className={styles.accordionTrigger}
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : entry.id)}
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
