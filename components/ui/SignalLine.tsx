import styles from './ui.module.css';

/**
 * A hairline with a block node on one end — the page's connection language
 * carried out of the hero field into flat layout (DESIGN_SYSTEM.md §6).
 */
export function SignalLine({
  align = 'start',
  className,
}: {
  align?: 'start' | 'end';
  className?: string;
}) {
  return (
    <span
      className={[styles.signal, className].filter(Boolean).join(' ')}
      data-align={align}
      aria-hidden="true"
    >
      {align === 'start' && <span className={styles.signalNode} />}
      <span className={styles.signalRule} />
      {align === 'end' && <span className={styles.signalNode} />}
    </span>
  );
}
