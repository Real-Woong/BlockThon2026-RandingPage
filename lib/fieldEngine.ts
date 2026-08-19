import type { WordField } from './wordField';
import type { PixelWord } from './pixelFont';

type EngineOptions = {
  /**
   * The band the word is set in. Separate from `fieldEl` on purpose: the word
   * has to stay clear of the copy, while the loose field spreads across the
   * whole hero so the type sits inside the field rather than under a banner.
   */
  stage: HTMLElement;
  /** The full-bleed box the cubes are positioned inside. */
  fieldEl: HTMLElement;
  cubes: HTMLElement[];
  lines: SVGLineElement[];
  field: WordField;
  compact: boolean;
  coarsePointer: boolean;
  reducedMotion: boolean;
};

type Reaction = 'pulse' | 'ripple' | 'signal' | 'lift';

const NEAR_RADIUS = 190;
/** Direct contact scales with the pixel grid, so hovering a block always lands. */
const DIRECT_MIN = 14;
const REACTION_COOLDOWN = 700;
const NEIGHBOURS = 6;
/**
 * Loose blocks kept around the word; the rest of the pool parks invisible.
 *
 * Far fewer on a phone. Every visible ambient cube is an independently animated
 * composited layer, and a narrow screen has neither the room to show them apart
 * nor the GPU budget to run them — the parked ones cost nothing (`opacity: 0`,
 * `animation: none`), so the cheapest optimisation here is simply showing less.
 */
const AMBIENT_VISIBLE_WIDE = 58;
const AMBIENT_VISIBLE_COMPACT = 24;

const REACTION_CLASS: Record<Reaction, string> = {
  pulse: 'is-pulse',
  ripple: 'is-ripple',
  signal: 'is-signal',
  lift: 'is-lift',
};

const REACTION_MS: Record<Reaction, number> = {
  pulse: 620,
  ripple: 760,
  signal: 700,
  lift: 460,
};

/** Cube edge as a share of one pixel cell, leaving the grid visible between blocks. */
const CUBE_RATIO = 0.72;
/** The cube box in CSS is 10px; --scale sizes it, so nothing touches layout. */
const CUBE_BASE = 10;
const MAX_CELL_WIDE = 22;
const MAX_CELL_COMPACT = 13;

const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));

/**
 * Drives the cube field.
 *
 * Two jobs: arrange the pool into a word, and run the protocol reactions under
 * the pointer. Both write CSS custom properties straight to the elements —
 * React never re-renders for either (INTERACTIONS.md §3, §11).
 *
 * Which word shows is decided by the caller, not by scroll position: the field
 * runs on its own clock so the page scrolls normally past it.
 */
export function createFieldEngine(options: EngineOptions) {
  const { stage, fieldEl, cubes, lines, field, compact, coarsePointer, reducedMotion } = options;

  const poolSize = field.poolSize;

  /* The field box: ambient scatter, pointer hit-testing, cube coordinate space. */
  let width = 0;
  let height = 0;
  /* Cached field offset: reading it per pointermove forces a reflow. */
  let stageLeft = 0;
  let stageTop = 0;
  /* The word band, expressed in the field's coordinate space. */
  let wordWidth = 0;
  let wordHeight = 0;
  let wordOffsetX = 0;
  let wordOffsetY = 0;
  let activeWord = -1;
  let directRadius = DIRECT_MIN;

  const px = new Float32Array(poolSize);
  const py = new Float32Array(poolSize);
  const lit = new Uint8Array(poolSize);
  const nearState = new Float32Array(poolSize);
  const neighbours: number[][] = [];

  const cooldown = new Map<number, number>();
  const timers = new Set<number>();

  let pointerX = -9999;
  let pointerY = -9999;
  let pointerInside = false;
  let frame = 0;
  let needsFrame = false;
  let activeCube = -1;
  let linePointer = 0;

  const setVar = (element: HTMLElement, name: string, value: string) =>
    element.style.setProperty(name, value);

  const layoutFor = (index: number): PixelWord => {
    const layout = field.layouts[index];
    if (!layout) return { cols: 1, rows: 1, pixels: [] };
    return compact ? layout.compact : layout.wide;
  };

  /**
   * Where the word sits inside the word band, and how big one pixel is.
   *
   * Everything the band holds is a wide ribbon — type and the logo lockup alike
   * — so width binds first and the art is the same height whatever resolution
   * it was traced at. Nothing here needs a special case for artwork.
   */
  function metricsFor(word: PixelWord) {
    const maxCell = compact ? MAX_CELL_COMPACT : MAX_CELL_WIDE;
    const maxWidth = wordWidth * (compact ? 0.88 : 0.74);
    const maxHeight = wordHeight * (compact ? 0.72 : 0.84);
    const cell = Math.max(
      2,
      Math.min(maxWidth / Math.max(word.cols, 1), maxHeight / Math.max(word.rows, 1), maxCell),
    );
    const artWidth = word.cols * cell;
    const artHeight = word.rows * cell;

    return {
      cell,
      // Centred in the band, then shifted into the field's coordinate space —
      // the cubes are positioned inside the field, not inside the band.
      originX: wordOffsetX + (wordWidth - artWidth) / 2,
      originY: wordOffsetY + wordHeight * 0.5 - artHeight / 2,
      artWidth,
    };
  }

  function readStage() {
    const rect = fieldEl.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    stageLeft = rect.left;
    stageTop = rect.top;

    const band = stage.getBoundingClientRect();
    wordWidth = band.width;
    wordHeight = band.height;
    wordOffsetX = band.left - rect.left;
    wordOffsetY = band.top - rect.top;
  }

  /**
   * Nearest cubes among the lit ones, for signal propagation.
   *
   * Bucketed rather than compared pairwise. A word of type lights a couple of
   * hundred cubes and all-pairs was fine; the logo lockup lights ~1,700, where
   * all-pairs is three million distance tests plus a full sort per cube and
   * locks the main thread for seconds on every word change. A neighbour is
   * always within a cube or two on the lattice, so bucketing by cell and
   * reading a small patch around each cube finds the same six in linear time.
   */
  function computeNeighbours(cell: number) {
    neighbours.length = 0;

    const size = Math.max(cell, 8);
    // Buckets are keyed by grid coordinate. The offset keeps the key positive
    // and unique for any coordinate the field can produce.
    const key = (gx: number, gy: number) => (gx + 4096) * 8192 + (gy + 4096);
    const buckets = new Map<number, number[]>();

    for (let i = 0; i < poolSize; i += 1) {
      if (!lit[i]) continue;
      const k = key(Math.floor((px[i] as number) / size), Math.floor((py[i] as number) / size));
      const bucket = buckets.get(k);
      if (bucket) bucket.push(i);
      else buckets.set(k, [i]);
    }

    // Six best by insertion. Sorting every candidate was the other half of the
    // old cost, and six is small enough that shifting beats comparing.
    const bestId = new Int32Array(NEIGHBOURS);
    const bestD = new Float64Array(NEIGHBOURS);

    for (let i = 0; i < poolSize; i += 1) {
      if (!lit[i]) {
        neighbours.push([]);
        continue;
      }

      const cx = Math.floor((px[i] as number) / size);
      const cy = Math.floor((py[i] as number) / size);
      let seen = 0;

      // Widen until the patch holds enough. One ring covers the lattice; the
      // rest is only reached by a cube that ended up on its own.
      for (let ring = 1; ring <= 3; ring += 1) {
        seen = 0;
        bestD.fill(Infinity);

        for (let gx = cx - ring; gx <= cx + ring; gx += 1) {
          for (let gy = cy - ring; gy <= cy + ring; gy += 1) {
            const bucket = buckets.get(key(gx, gy));
            if (!bucket) continue;

            for (const id of bucket) {
              if (id === i) continue;
              seen += 1;

              const dx = (px[id] as number) - (px[i] as number);
              const dy = (py[id] as number) - (py[i] as number);
              const d = dx * dx + dy * dy;
              if (d >= (bestD[NEIGHBOURS - 1] as number)) continue;

              let slot = NEIGHBOURS - 1;
              while (slot > 0 && (bestD[slot - 1] as number) > d) {
                bestD[slot] = bestD[slot - 1] as number;
                bestId[slot] = bestId[slot - 1] as number;
                slot -= 1;
              }
              bestD[slot] = d;
              bestId[slot] = id;
            }
          }
        }

        if (seen >= NEIGHBOURS) break;
      }

      const nearest: number[] = [];
      for (let n = 0; n < NEIGHBOURS && bestD[n] !== Infinity; n += 1) {
        nearest.push(bestId[n] as number);
      }
      neighbours.push(nearest);
    }
  }

  function applyWord(index: number, force = false) {
    if (index === activeWord && !force) return;
    activeWord = index;

    const layout = field.layouts[index];
    const word = layoutFor(index);
    const { cell, originX, originY, artWidth } = metricsFor(word);
    const cubeSize = Math.max(3, cell * CUBE_RATIO);
    directRadius = Math.max(DIRECT_MIN, cell * 0.75);
    const kind = layout?.kind ?? 'block';
    // Motion, not metrics: the swell is per-element main-thread work and the
    // lockup lights an order of magnitude more cubes than a word does.
    fieldEl.dataset.art = layout?.art ? 'true' : 'false';

    for (let i = 0; i < cubes.length; i += 1) {
      const element = cubes[i];
      if (!element) continue;
      const pixel = word.pixels[i];

      if (pixel) {
        const x = originX + pixel.x * cell + (cell - cubeSize) / 2;
        const y = originY + pixel.y * cell + (cell - cubeSize) / 2;
        px[i] = x + cubeSize / 2;
        py[i] = y + cubeSize / 2;
        lit[i] = 1;

        // Letters resolve left to right rather than all at once.
        const delay = artWidth > 0 ? Math.round(((x - originX) / artWidth) * 320) : 0;
        // A slow swell crosses the word on the diagonal. The phase is per pixel,
        // so the surface undulates instead of every block rising together.
        const phase =
          (pixel.x / Math.max(word.cols, 1)) * 0.7 + (pixel.y / Math.max(word.rows, 1)) * 0.3;

        setVar(element, '--x', `${x.toFixed(1)}px`);
        setVar(element, '--y', `${y.toFixed(1)}px`);
        setVar(element, '--scale', (cubeSize / CUBE_BASE).toFixed(3));
        setVar(element, '--delay', `${delay}ms`);
        setVar(element, '--wave-delay', `${-Math.round(phase * 5200)}ms`);
        setVar(element, '--amp', `${(cubeSize * 0.4).toFixed(1)}px`);
        setVar(element, '--depth', '1');
        element.dataset.on = 'true';
        element.dataset.kind = kind;
        // Some blocks in the letterform sit a shade lighter, so the surface has
        // grain instead of reading as one flat fill.
        element.dataset.facet = field.accents.has(i) ? 'high' : 'base';
      } else {
        const spot = field.ambient[i];
        if (!spot) continue;
        // Only a thin halo of loose blocks stays visible. Without this cap a
        // short word leaves most of the pool drifting and the letters get lost
        // in the noise.
        const surplus = i - word.pixels.length;
        const visible = surplus < (compact ? AMBIENT_VISIBLE_COMPACT : AMBIENT_VISIBLE_WIDE);
        const size = Math.max(3, cell * 0.44 * (0.45 + spot.depth * 0.75));
        const x = spot.x * (width - size);
        const y = spot.y * (height - size);
        px[i] = x + size / 2;
        py[i] = y + size / 2;
        lit[i] = 0;

        setVar(element, '--x', `${x.toFixed(1)}px`);
        setVar(element, '--y', `${y.toFixed(1)}px`);
        setVar(element, '--scale', (size / CUBE_BASE).toFixed(3));
        setVar(element, '--delay', `${Math.round(spot.phase * 14)}ms`);
        setVar(element, '--wave-delay', `${-Math.round(spot.phase * 380)}ms`);
        setVar(element, '--amp', `${(size * 0.55).toFixed(1)}px`);
        setVar(element, '--depth', spot.depth.toFixed(2));
        element.dataset.on = visible ? 'false' : 'hidden';
        // Green stays out of the letterforms; it only accents the drifting field.
        element.dataset.kind = field.accents.has(i) ? 'signal' : 'block';
        element.dataset.facet = 'base';
      }

      if (nearState[i] !== 0) {
        nearState[i] = 0;
        setVar(element, '--near', '0');
      }
    }

    computeNeighbours(cell);
  }

  function connect(from: number, tone: 'sui' | 'signal') {
    const pool = neighbours[from] ?? [];
    const wanted = 3 + Math.floor(Math.random() * 4); // 3–6 (INTERACTIONS.md §4)
    let drawn = 0;

    for (const target of pool) {
      if (drawn >= wanted) break;
      const line = lines[linePointer % lines.length];
      linePointer += 1;
      if (!line) continue;

      line.setAttribute('x1', String(px[from]));
      line.setAttribute('y1', String(py[from]));
      line.setAttribute('x2', String(px[target]));
      line.setAttribute('y2', String(py[target]));
      line.dataset.tone = tone;
      line.classList.remove('is-live');
      void line.getBoundingClientRect();
      line.classList.add('is-live');

      const neighbour = cubes[target];
      if (neighbour) {
        neighbour.classList.add('is-connected');
        const timer = window.setTimeout(() => {
          neighbour.classList.remove('is-connected');
          timers.delete(timer);
        }, 520);
        timers.add(timer);
      }
      drawn += 1;
    }
  }

  /** One primary reaction, at most one secondary (INTERACTIONS.md §4). */
  function react(index: number) {
    if (!lit[index]) return;
    const now = performance.now();
    if (now - (cooldown.get(index) ?? 0) < REACTION_COOLDOWN) return;
    cooldown.set(index, now);

    const element = cubes[index];
    if (!element) return;

    const kind = element.dataset.kind;
    const reaction: Reaction =
      kind === 'sui' ? 'pulse' : kind === 'walrus' ? 'ripple' : kind === 'signal' ? 'signal' : 'lift';

    element.classList.add(REACTION_CLASS[reaction]);
    const timer = window.setTimeout(() => {
      element.classList.remove(REACTION_CLASS[reaction]);
      timers.delete(timer);
      if (reaction === 'pulse' || reaction === 'ripple') {
        const settled = reaction === 'pulse' ? 'is-resolved' : 'is-stored';
        element.classList.add(settled);
        const settleTimer = window.setTimeout(() => {
          element.classList.remove(settled);
          timers.delete(settleTimer);
        }, 420);
        timers.add(settleTimer);
      }
    }, REACTION_MS[reaction]);
    timers.add(timer);

    if (reaction === 'pulse') connect(index, 'sui');
    if (reaction === 'signal') connect(index, 'signal');
  }

  function requestFrame() {
    if (needsFrame) return;
    needsFrame = true;
    frame = window.requestAnimationFrame(tick);
  }

  function tick() {
    needsFrame = false;
    if (!pointerInside || coarsePointer) return;

    let nearestId = -1;
    let nearestDistance = Number.POSITIVE_INFINITY;

    for (let i = 0; i < poolSize; i += 1) {
      const distance = Math.hypot(pointerX - (px[i] as number), pointerY - (py[i] as number));
      const near = distance > NEAR_RADIUS ? 0 : clamp(1 - distance / NEAR_RADIUS) ** 1.6;
      const quantized = Math.round(near * 20) / 20;

      if (quantized !== nearState[i]) {
        nearState[i] = quantized;
        const element = cubes[i];
        if (element) setVar(element, '--near', String(quantized));
      }

      if (lit[i] && distance < nearestDistance) {
        nearestDistance = distance;
        nearestId = i;
      }
    }

    if (nearestId >= 0 && nearestDistance < directRadius) {
      if (nearestId !== activeCube) {
        activeCube = nearestId;
        react(nearestId);
      }
    } else {
      activeCube = -1;
    }

    requestFrame();
  }

  /**
   * Pointer is tracked on window while the field keeps `pointer-events: none`,
   * so it can never swallow a click or a scroll gesture.
   */
  function onPointerMove(event: PointerEvent) {
    if (event.pointerType === 'touch' || coarsePointer) return;
    const x = event.clientX - stageLeft;
    const y = event.clientY - stageTop;

    if (x < 0 || y < 0 || x > width || y > height) {
      if (pointerInside) onPointerLeave();
      return;
    }

    pointerX = x;
    pointerY = y;
    pointerInside = true;
    requestFrame();
  }

  function onPointerLeave() {
    pointerInside = false;
    activeCube = -1;
    for (let i = 0; i < poolSize; i += 1) {
      if (nearState[i] === 0) continue;
      nearState[i] = 0;
      const element = cubes[i];
      if (element) setVar(element, '--near', '0');
    }
  }

  /** Touch: one reaction, two neighbours, nothing that blocks the scroll. */
  function onPointerDown(event: PointerEvent) {
    if (event.pointerType !== 'touch') return;
    readStage();
    const x = event.clientX - stageLeft;
    const y = event.clientY - stageTop;

    let nearestId = -1;
    let nearestDistance = Number.POSITIVE_INFINITY;
    for (let i = 0; i < poolSize; i += 1) {
      if (!lit[i]) continue;
      const distance = Math.hypot(x - (px[i] as number), y - (py[i] as number));
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestId = i;
      }
    }
    if (nearestId < 0 || nearestDistance > 120) return;

    [nearestId, ...(neighbours[nearestId] ?? []).slice(0, 2)].forEach((id, position) => {
      const element = cubes[id];
      if (!element) return;
      setVar(element, '--near', position === 0 ? '1' : '0.5');
      const timer = window.setTimeout(() => {
        setVar(element, '--near', '0');
        timers.delete(timer);
      }, 900);
      timers.add(timer);
    });

    react(nearestId);
  }

  /** The stage scrolls with the page, so the cached offset follows it. */
  let scrollQueued = false;
  function onScroll() {
    if (scrollQueued) return;
    scrollQueued = true;
    window.requestAnimationFrame(() => {
      scrollQueued = false;
      readStage();
    });
  }

  let resizeTimer = 0;
  function onResize() {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      readStage();
      applyWord(activeWord < 0 ? 0 : activeWord, true);
    }, 160);
  }

  readStage();
  applyWord(0, true);

  if (!coarsePointer && !reducedMotion) {
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('blur', onPointerLeave);
  }
  if (!reducedMotion) {
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });

  return {
    /** Called by the hero when its own clock — or the rail — picks a word. */
    setWord(index: number) {
      readStage();
      applyWord(index);
    },
    destroy() {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('blur', onPointerLeave);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.cancelAnimationFrame(frame);
      window.clearTimeout(resizeTimer);
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
    },
  };
}
