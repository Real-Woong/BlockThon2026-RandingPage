'use client';

import { Component, type ReactNode } from 'react';

/**
 * A failing scene must never take the page with it (INTERACTIONS.md §10).
 * On error the boundary renders nothing and the CSS field stays exactly as it
 * was — no black frame, no error UI, no lost content.
 */
export class SceneErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[block_block pixel] hero scene disabled:', error);
    }
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
