import styles from './SceneFallback.module.css';

/**
 * The layer that is always there.
 *
 * Rendering order (INTERACTIONS.md §10): canvas colour → this fallback → HTML
 * hero content → optional Spline scene. It is pure CSS, so there is never a
 * black frame, a spinner, or a broken hero while something else loads or fails.
 */
export function SceneFallback() {
  return (
    <div className={styles.fallback} aria-hidden="true">
      <div className={styles.wash} />
      <div className={styles.lattice} />
      <div className={styles.horizon} />
    </div>
  );
}
