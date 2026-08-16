'use client';

import { createElement, useEffect, useState } from 'react';
import { useEnvironment } from '@/lib/useEnvironment';
import { SceneErrorBoundary } from './SceneErrorBoundary';
import styles from './SplineScene.module.css';

const SCENE_URL = (process.env.NEXT_PUBLIC_SPLINE_SCENE_URL ?? '').trim();
const VIEWER_SRC =
  (process.env.NEXT_PUBLIC_SPLINE_VIEWER_SRC ?? '').trim() ||
  'https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js';

const LOAD_TIMEOUT = 12000;

type SceneStatus = 'absent' | 'loading' | 'ready' | 'failed';

let viewerPromise: Promise<void> | null = null;

function loadViewer(): Promise<void> {
  if (viewerPromise) return viewerPromise;

  viewerPromise = new Promise<void>((resolve, reject) => {
    if (customElements.get('spline-viewer')) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.type = 'module';
    script.src = VIEWER_SRC;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('spline viewer failed to load'));
    document.head.appendChild(script);
  });

  return viewerPromise;
}

/**
 * Optional Spline layer — the only WebGL scene on the page.
 *
 * With no NEXT_PUBLIC_SPLINE_SCENE_URL this renders nothing at all and the CSS
 * protocol field remains the hero. When a URL does exist the scene loads after
 * the HTML hero, then crossfades in; loading, timeout and error all resolve to
 * the same safe state — the fallback stays visible (INTERACTIONS.md §10).
 *
 * Swapping this for @splinetool/react-spline is a change to this file only.
 */
function SplineSceneInner() {
  const { ready, reducedMotion, compact } = useEnvironment();
  const [status, setStatus] = useState<SceneStatus>(SCENE_URL ? 'loading' : 'absent');

  // Reduced motion and small screens keep the low-motion fallback instead.
  const enabled = Boolean(SCENE_URL) && ready && !reducedMotion && !compact;

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    const timeout = window.setTimeout(() => {
      if (!cancelled) setStatus('failed');
    }, LOAD_TIMEOUT);

    loadViewer()
      .then(() => {
        if (!cancelled) setStatus('ready');
      })
      .catch(() => {
        if (!cancelled) setStatus('failed');
      })
      .finally(() => window.clearTimeout(timeout));

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [enabled]);

  if (!enabled || status !== 'ready') return null;

  return (
    <div className={styles.scene} data-state="ready">
      {createElement('spline-viewer', {
        url: SCENE_URL,
        'events-target': 'global',
        loading: 'lazy',
      })}
    </div>
  );
}

export function SplineScene() {
  if (!SCENE_URL) return null;

  return (
    <SceneErrorBoundary>
      <SplineSceneInner />
    </SceneErrorBoundary>
  );
}
