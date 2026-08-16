'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useEnvironment } from '@/lib/useEnvironment';
import { useInView } from '@/lib/useInView';

type CountUpProps = {
  /**
   * The confirmed value exactly as CONTENT.md holds it — `30,000,000`, `180`,
   * `40%`. Formatting is read off this string, never invented here, so a value
   * this parser does not recognise is rendered untouched instead of guessed at.
   */
  value: string;
  className?: string;
  durationMs?: number;
};

/** `useLayoutEffect` warns during SSR; the export is static, so swap on client. */
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

type Parsed = {
  prefix: string;
  suffix: string;
  target: number;
  decimals: number;
  grouped: boolean;
};

/** Splits `₩30,000,000+` into a prefix, an animatable number, and a suffix. */
function parse(raw: string): Parsed | null {
  const match = /^(\D*?)(\d[\d,]*(?:\.\d+)?)(\D*)$/.exec(raw.trim());
  if (!match) return null;

  const [, prefix = '', digits = '', suffix = ''] = match;
  const plain = digits.replace(/,/g, '');
  const target = Number(plain);
  if (!Number.isFinite(target)) return null;

  return {
    prefix,
    suffix,
    target,
    decimals: plain.split('.')[1]?.length ?? 0,
    grouped: digits.includes(','),
  };
}

function format(n: number, { decimals, grouped }: Parsed): string {
  return n.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: grouped,
  });
}

/**
 * Counts a confirmed figure up when it arrives. The point is not the motion —
 * it is that the number reads as measured rather than typed.
 *
 * The final value is what renders on the server and on the first client paint,
 * so no-JS and reduced-motion visitors never see a zero, and the count only
 * ever starts if motion is actually allowed.
 */
export function CountUp({ value, className, durationMs = 1100 }: CountUpProps) {
  // Stable identity: the animation effect keys off this, and a fresh object per
  // render would restart the count on every frame it schedules.
  const parsed = useMemo(() => parse(value), [value]);
  const { reducedMotion, ready } = useEnvironment();
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [display, setDisplay] = useState(value);
  const armed = useRef(false);

  // Drop to zero before the browser paints, but only once we know motion is
  // allowed and only while the figure is still off screen.
  useIsomorphicLayoutEffect(() => {
    if (!parsed || !ready || reducedMotion || inView || armed.current) return;
    armed.current = true;
    setDisplay(`${parsed.prefix}${format(0, parsed)}${parsed.suffix}`);
  }, [parsed, ready, reducedMotion, inView]);

  useEffect(() => {
    if (!parsed || !inView || !armed.current) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      // easeOutExpo: fast commitment, long settle — reads as a counter landing.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setDisplay(`${parsed.prefix}${format(parsed.target * eased, parsed)}${parsed.suffix}`);
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [parsed, inView, durationMs]);

  if (!parsed) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {display}
    </span>
  );
}
