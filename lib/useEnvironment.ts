'use client';

import { useEffect, useState } from 'react';

type MediaFlags = {
  /** True once the client has measured; keeps SSR output stable until then. */
  ready: boolean;
  reducedMotion: boolean;
  /** Coarse pointer (touch). No hover reactions, no cursor follower. */
  coarsePointer: boolean;
  /** Narrow viewport. Fewer cubes, information before 3D. */
  compact: boolean;
};

const initial: MediaFlags = {
  ready: false,
  reducedMotion: false,
  coarsePointer: false,
  compact: false,
};

/**
 * One place for the environment switches the interaction spec depends on
 * (INTERACTIONS.md §8, §9, §11). Returns SSR-safe defaults until mounted.
 */
export function useEnvironment(): MediaFlags {
  const [flags, setFlags] = useState<MediaFlags>(initial);

  useEffect(() => {
    const queries = {
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)'),
      coarsePointer: window.matchMedia('(hover: none), (pointer: coarse)'),
      compact: window.matchMedia('(max-width: 767px)'),
    };

    const read = () =>
      setFlags({
        ready: true,
        reducedMotion: queries.reducedMotion.matches,
        coarsePointer: queries.coarsePointer.matches,
        compact: queries.compact.matches,
      });

    read();

    const listeners = Object.values(queries).map((query) => {
      query.addEventListener('change', read);
      return () => query.removeEventListener('change', read);
    });

    return () => listeners.forEach((off) => off());
  }, []);

  return flags;
}

