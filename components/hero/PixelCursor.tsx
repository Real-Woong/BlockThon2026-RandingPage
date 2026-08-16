'use client';

import { useEffect, useRef } from 'react';
import { useEnvironment } from '@/lib/useEnvironment';
import styles from './PixelCursor.module.css';

/**
 * Small square follower with a coordinate readout.
 *
 * The OS cursor is never hidden, the follower never covers text (it trails at
 * low opacity and sits behind nothing), and it is removed entirely on touch and
 * under reduced motion (INTERACTIONS.md §5).
 */
export function PixelCursor() {
  const markerRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);
  const { ready, reducedMotion, coarsePointer } = useEnvironment();

  useEffect(() => {
    if (!ready || reducedMotion || coarsePointer) return;
    const marker = markerRef.current;
    const readout = readoutRef.current;
    if (!marker || !readout) return;

    let x = 0;
    let y = 0;
    let frame = 0;
    let queued = false;
    let visible = false;

    const draw = () => {
      queued = false;
      marker.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      readout.textContent = `${String(Math.round(x)).padStart(4, '0')} ${String(Math.round(y)).padStart(4, '0')}`;
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      x = event.clientX;
      y = event.clientY;
      if (!visible) {
        visible = true;
        marker.dataset.visible = 'true';
      }
      if (!queued) {
        queued = true;
        frame = window.requestAnimationFrame(draw);
      }
    };

    const onLeave = () => {
      visible = false;
      marker.dataset.visible = 'false';
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.cancelAnimationFrame(frame);
    };
  }, [ready, reducedMotion, coarsePointer]);

  if (!ready || reducedMotion || coarsePointer) return null;

  return (
    <div ref={markerRef} className={styles.marker} data-visible="false" aria-hidden="true">
      <span className={styles.square} />
      <span ref={readoutRef} className={styles.readout} />
    </div>
  );
}
