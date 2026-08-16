'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './SectionFrame.module.css';

type Density = 'dense' | 'quiet' | 'technical' | 'compact' | 'open' | 'focus';
type Reveal = 'mask' | 'line' | 'index' | 'depth' | 'crop';
type Tone = 'canvas' | 'surface' | 'field';

type SectionFrameProps = {
  id: string;
  index: string;
  /** Vertical rhythm. Sections deliberately do not share one padding value. */
  density: Density;
  /** One enter pattern per section — never the same fade-up everywhere. */
  reveal: Reveal;
  /**
   * Ground for the section. The palette defines three surface steps and using
   * only the darkest one is what makes a dark page read as a default theme
   * rather than a decision — `field` additionally exposes the protocol grid.
   */
  tone?: Tone;
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
  tone = 'canvas',
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
    //
    // The bottom margin is positive on purpose: it grows the root box downwards
    // so a section starts revealing while it is still a third of a screen below
    // the fold. With a negative margin and a threshold — which is what this used
    // to do — a tall section only qualified once it was already well inside the
    // viewport, so a normal-speed scroll landed on content still at opacity 0
    // and the page read as blank. Reveals must finish before you look at them.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px 33% 0px', threshold: 0 },
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
      data-tone={tone}
      data-inview={inView}
    >
      <span className={styles.index} aria-hidden="true">
        {index}
      </span>
      <div className={styles.shell}>{children}</div>
    </section>
  );
}
