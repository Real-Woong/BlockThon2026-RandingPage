import type { FieldWord } from '@/content/brand';
import { StatusLabel } from '@/components/ui/StatusLabel';
import { SignalLine } from '@/components/ui/SignalLine';
import styles from './Hero.module.css';

/**
 * Caption for one word in the field sequence.
 *
 * The cubes are decorative, so the word itself is set here as real text. The
 * meaning line only appears where a documented one exists (INTERACTIONS.md §4);
 * nothing is written to fill the gap for the others.
 */
export function WordPanel({ word, index }: { word: FieldWord; index: number }) {
  return (
    <div className={styles.wordPanel}>
      <div className={styles.opening}>
        <StatusLabel className={styles.index}>{String(index).padStart(2, '0')}</StatusLabel>
        <SignalLine className={styles.openingRule} />
      </div>

      <p className={styles.wordText} data-kind={word.kind}>
        {word.text}
      </p>

      {word.meaning && <p className={styles.wordMeaning}>{word.meaning}</p>}
    </div>
  );
}
