'use client';

import { useEffect, useRef, useState } from 'react';
import { content, isStructurePreview, line, list, text, value } from '@/content';
import { visibleSections } from '@/content/sections';
import { BrandMark } from '@/components/brand/BrandMark';
import { ActionLink } from '@/components/ui/ActionLink';
import styles from './Header.module.css';

/**
 * Transparent at rest, then a quiet canvas wash once the page moves
 * (DESIGN_SYSTEM.md §7). No pill container, and no empty button: navigation
 * and CTA appear only when their content is confirmed.
 */
export function Header() {
  const [lifted, setLifted] = useState(false);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      setLifted(window.scrollY > 24);

      // Written straight to style rather than through state: this runs on every
      // scroll frame and has no business re-rendering the header.
      const node = progressRef.current;
      if (!node) return;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
      node.style.transform = `scaleX(${ratio})`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const hero = value(content.hero);
  const navItems = list(content.navigation).filter((item) => {
    const href = line(item.href);
    const label = line(item.label);
    if (!href || !label) return false;
    // A link may only point at a section that actually rendered.
    return !href.startsWith('#') || visibleSections.some((section) => `#${section.id}` === href);
  });

  const ctaLabel = line(hero?.primaryCtaLabel);
  const ctaUrl = text(content.applyUrl) ?? line(hero?.primaryCtaUrl);

  return (
    <header className={styles.header} data-lifted={lifted}>
      {isStructurePreview && (
        <p className={styles.preview}>
          structure preview — bracketed tokens are layout placeholders, not event content
        </p>
      )}
      <div className={styles.bar}>
        <a href="#top" className={styles.brand} aria-label="blockblock 홈">
          <BrandMark variant="lockup" size="sm" />
        </a>

        {navItems.length > 0 && (
          <nav className={styles.nav} aria-label="주요 메뉴">
            {navItems.map((item) => (
              <a key={item.id} href={item.href} className={styles.navLink}>
                {item.label}
              </a>
            ))}
          </nav>
        )}

        <ActionLink label={ctaLabel} url={ctaUrl} variant="primary" className={styles.cta} />
      </div>

      {/* Read position. Decorative — the section rail carries the same
          information in an accessible form. */}
      <span className={styles.progress} aria-hidden="true">
        <span ref={progressRef} className={styles.progressFill} />
      </span>
    </header>
  );
}
