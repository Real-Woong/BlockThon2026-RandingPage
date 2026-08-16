'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { fieldWords } from '@/content/brand';
import { useEnvironment } from '@/lib/useEnvironment';
import { ProtocolField } from './ProtocolField';
import { HeroContent } from './HeroContent';
import styles from './Hero.module.css';

/** How long one word holds before the field rearranges itself. */
const HOLD_MS = 5200;

/**
 * 00 — Hero / Signal.
 *
 * One screen. The cube field spells a word, holds, then rearranges into the
 * next one on its own clock — scrolling is not hijacked to drive it, so the
 * page below scrolls normally. The rail lets you pick a word directly, and
 * reduced motion stops the cycle entirely.
 */
export function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeWord, setActiveWord] = useState(0);
  const [paused, setPaused] = useState(false);
  const { reducedMotion } = useEnvironment();

  useEffect(() => {
    if (reducedMotion || paused) return;
    const timer = window.setInterval(
      () => setActiveWord((index) => (index + 1) % fieldWords.length),
      HOLD_MS,
    );
    return () => window.clearInterval(timer);
  }, [reducedMotion, paused]);

  // Picking a word by hand stops the carousel; it does not fight the visitor.
  const pick = useCallback((index: number) => {
    setActiveWord(index);
    setPaused(true);
  }, []);

  const word = fieldWords[activeWord] ?? fieldWords[0]!;

  return (
    <section id="top" className={styles.hero}>
      <div ref={stageRef} className={styles.stage}>
        <ProtocolField stageRef={stageRef} activeWord={activeWord} />
        <div className={styles.readability} aria-hidden="true" />
      </div>

      <div className={styles.shell}>
        <HeroContent />

        <div className={styles.wordbar}>
          <p className={styles.wordNow} aria-live="polite">
            <span className={styles.wordText} data-kind={word.kind}>
              {word.text}
            </span>
            {word.meaning && <span className={styles.wordMeaning}>{word.meaning}</span>}
          </p>

          <div className={styles.rail} role="group" aria-label="필드 단어 선택">
            {fieldWords.map((entry, index) => (
              <button
                key={entry.id}
                type="button"
                className={styles.railItem}
                data-current={index === activeWord}
                aria-pressed={index === activeWord}
                onClick={() => pick(index)}
              >
                <span className={styles.railIndex}>{String(index).padStart(2, '0')}</span>
                <span className={styles.railDot} aria-hidden="true" />
                <span className="u-visually-hidden">{entry.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.cue} aria-hidden="true">
        <span className={styles.cueRule} />
        <span className={styles.cueLabel}>scroll</span>
      </div>
    </section>
  );
}
