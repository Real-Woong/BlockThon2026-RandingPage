'use client';

import { useEffect, useMemo, useRef, type RefObject } from 'react';
import { buildWordField } from '@/lib/wordField';
import { createFieldEngine } from '@/lib/fieldEngine';
import { useEnvironment } from '@/lib/useEnvironment';
import { SceneFallback } from './SceneFallback';
import { SplineScene } from './SplineScene';
import styles from './ProtocolField.module.css';

const LINE_POOL = 12;

type ProtocolFieldProps = {
  /** The band the word is set in — kept clear of the copy. */
  stageRef: RefObject<HTMLElement | null>;
  /** Which word to spell. The hero owns the clock; the field just follows. */
  activeWord: number;
};

/**
 * Living Protocol Field — pixel art built from cubes.
 *
 * One pool of blocks spells BLOCKBLOCK, SUI, WALRUS and BLOCKTHON in a 7×9
 * pixel font. The same cubes travel from one word into the next, and blocks a
 * word does not need drift out into the surrounding field.
 *
 * The layer is decorative: aria-hidden, `pointer-events: none`, and every word
 * is also set as real text in the caption beside it.
 *
 * The pool is only mounted once `useEnvironment` has measured, because its size
 * depends on the answer: the logo lockup is 1,719 cubes wide and 632 narrow, and
 * mounting before the media query resolves means a phone builds the wide pool
 * and immediately discards two thirds of it. Nothing is visible before that
 * point anyway — the fallback layer is what holds the frame.
 *
 * The pool is split across two planes. Most cubes sit behind the copy; a handful
 * of the nearest ones paint in front of it, so the wordmark is inside the field
 * rather than stacked below a banner of it. Nothing in the front plane is ever
 * part of a letterform, and it never takes pointer events.
 */
export function ProtocolField({ stageRef, activeWord }: ProtocolFieldProps) {
  const { ready, reducedMotion, coarsePointer, compact } = useEnvironment();
  const field = useMemo(() => buildWordField(compact), [compact]);
  const fieldRef = useRef<HTMLDivElement>(null);
  const cubeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const engineRef = useRef<ReturnType<typeof createFieldEngine> | null>(null);

  const planes = useMemo(() => {
    const back: number[] = [];
    const front: number[] = [];
    for (let index = 0; index < field.poolSize; index += 1) {
      (field.foreground.has(index) ? front : back).push(index);
    }
    return { back, front };
  }, [field]);

  useEffect(() => {
    const stage = stageRef.current;
    const fieldEl = fieldRef.current;
    if (!ready || !stage || !fieldEl) return;

    const cubes = cubeRefs.current.filter((node): node is HTMLDivElement => node !== null);
    const lines = lineRefs.current.filter((node): node is SVGLineElement => node !== null);
    if (cubes.length !== field.poolSize) return;

    const engine = createFieldEngine({
      stage,
      fieldEl,
      cubes,
      lines,
      field,
      compact,
      coarsePointer,
      reducedMotion,
    });
    engineRef.current = engine;

    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, [ready, reducedMotion, coarsePointer, compact, field, stageRef]);

  useEffect(() => {
    engineRef.current?.setWord(activeWord);
  }, [activeWord]);

  /* Rendered per plane, but the ref always lands on the cube's pool index —
     the engine addresses cubes by index and knows nothing about the planes. */
  const renderPlane = (indices: number[]) =>
    indices.map((index) => (
      <div
        key={index}
        ref={(node) => {
          cubeRefs.current[index] = node;
        }}
        className={styles.cube}
        data-kind="block"
        data-on="false"
        data-facet="base"
      >
        <span className={styles.fx} />
      </div>
    ));

  return (
    <div
      ref={fieldRef}
      className={styles.field}
      data-static={reducedMotion ? 'true' : undefined}
      data-ready={ready ? 'true' : undefined}
      aria-hidden="true"
    >
      <SceneFallback />

      <div className={styles.cubes}>{ready && renderPlane(planes.back)}</div>

      <svg className={styles.lines} width="100%" height="100%" focusable="false">
        {Array.from({ length: LINE_POOL }, (_, index) => (
          <line
            key={index}
            ref={(node) => {
              lineRefs.current[index] = node;
            }}
            className={styles.line}
            x1="0"
            y1="0"
            x2="0"
            y2="0"
          />
        ))}
      </svg>

      <SplineScene />

      {/* Above the copy. Last in the DOM and z-indexed past the hero shell. */}
      <div className={styles.cubesFront}>{ready && renderPlane(planes.front)}</div>
    </div>
  );
}
