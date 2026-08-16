'use client';

import { useEffect, useState } from 'react';
import { visibleSections } from '@/content/sections';
import styles from './ui.module.css';

/**
 * Section index rail.
 *
 * Lists only sections that actually rendered, so a hidden section can never
 * leave a dangling link. With just the hero on the page there is nothing to
 * navigate between, and the rail stays out of the way entirely.
 */
export function SectionIndex() {
  const [current, setCurrent] = useState(visibleSections[0]?.id ?? '');

  useEffect(() => {
    if (visibleSections.length < 2) return;

    const targets = visibleSections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => node !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setCurrent(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.6] },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  if (visibleSections.length < 2) return null;

  return (
    <nav className={styles.rail} aria-label="섹션 인덱스">
      {visibleSections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={styles.railItem}
          data-current={section.id === current}
        >
          {section.index}
          <span className={styles.railDot} aria-hidden="true" />
        </a>
      ))}
    </nav>
  );
}
