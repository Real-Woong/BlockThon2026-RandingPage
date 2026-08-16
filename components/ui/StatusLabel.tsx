import styles from './ui.module.css';

/** Small system label with a pixel dot. Used for indices and states, not copy. */
export function StatusLabel({
  children,
  tone = 'signal',
  className,
}: {
  children: React.ReactNode;
  tone?: 'signal' | 'quiet';
  className?: string;
}) {
  return (
    <span className={[styles.status, className].filter(Boolean).join(' ')} data-tone={tone}>
      <span className={styles.statusDot} aria-hidden="true" />
      {children}
    </span>
  );
}
