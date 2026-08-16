'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Fires once, when the element is about to arrive rather than once it is
 * already sitting in the middle of the screen. Same reasoning as SectionFrame:
 * an enter animation that starts late is indistinguishable from a blank page.
 *
 * The observer disconnects on the first hit — nothing here re-plays on the way
 * back up, because a number that counts itself twice reads as a glitch.
 */
export function useInView<T extends HTMLElement>(rootMargin = '0px 0px 20% 0px') {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}
