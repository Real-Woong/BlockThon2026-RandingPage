'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './SectionFrame.module.css';

type Density = 'dense' | 'quiet' | 'technical' | 'compact' | 'open' | 'focus';
type Reveal = 'mask' | 'line' | 'index' | 'depth' | 'crop';

type SectionFrameProps = {
  id: string;
  index: string;
  /** Vertical rhythm. Sections deliberately do not share one padding value. */
  density: Density;
  /** One enter pattern per section — never the same fade-up everywhere. */
  reveal: Reveal;
  children: ReactNode;
  className?: string;
};

/**
 * Section shell: id, index, rhythm and a single enter pattern.
 *
 * Headings are not rendered here on purpose — each section places its own
 * heading at its own size and position (DESIGN_SYSTEM.md §4).
 */
export function SectionFrame({
  id,
  index,
  density,
  reveal,
  children,
  className,
}: SectionFrameProps) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Under reduced motion the enter patterns are neutralised in CSS, so the
    // observer can stay exactly as it is — content is visible either way.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={[styles.section, className].filter(Boolean).join(' ')}
      data-density={density}
      data-reveal={reveal}
      data-inview={inView}
    >
      <span className={styles.index} aria-hidden="true">
        {index}
      </span>
      <div className={styles.shell}>{children}</div>
    </section>
  );
}
