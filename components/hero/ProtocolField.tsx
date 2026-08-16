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
  /** The box the cubes are laid out in. */
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
 */
export function ProtocolField({ stageRef, activeWord }: ProtocolFieldProps) {
  const field = useMemo(() => buildWordField(), []);
  const cubeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const engineRef = useRef<ReturnType<typeof createFieldEngine> | null>(null);
  const { ready, reducedMotion, coarsePointer, compact } = useEnvironment();

  useEffect(() => {
    const stage = stageRef.current;
    if (!ready || !stage) return;

    const cubes = cubeRefs.current.filter((node): node is HTMLDivElement => node !== null);
    const lines = lineRefs.current.filter((node): node is SVGLineElement => node !== null);
    if (cubes.length !== field.poolSize) return;

    const engine = createFieldEngine({
      stage,
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

  return (
    <div
      className={styles.field}
      data-static={reducedMotion ? 'true' : undefined}
      data-ready={ready ? 'true' : undefined}
      aria-hidden="true"
    >
      <SceneFallback />

      <div className={styles.cubes}>
        {Array.from({ length: field.poolSize }, (_, index) => (
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
        ))}
      </div>

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
    </div>
  );
}
