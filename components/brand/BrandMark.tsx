import Image from 'next/image';
import { brand, brandMarkAsset } from '@/content/brand';
import styles from './BrandMark.module.css';

type BrandMarkProps = {
  /** `wordmark` sets the name in type; `symbol` uses the asset when one exists. */
  variant?: 'wordmark' | 'symbol' | 'lockup';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

/**
 * The only place the blockblock mark is used.
 *
 * The supplied PNG is a temporary reference asset, so it is isolated here:
 * set `brandMarkAsset.src` to a file to use it, or leave it null and the page
 * falls back to the `blockblock` wordmark. Nothing in the layout, the grid, the
 * hero field geometry or the interaction model derives from its shape, so the
 * mark can be replaced or removed without touching anything else.
 *
 * Safe margin is 20% of the mark's width (DESIGN_SYSTEM.md §2); the original
 * aspect ratio is preserved and no blur, bevel, outline or glow is applied.
 */
export function BrandMark({ variant = 'wordmark', size = 'md', className }: BrandMarkProps) {
  const asset = brandMarkAsset.src;
  const showSymbol = (variant === 'symbol' || variant === 'lockup') && Boolean(asset);

  return (
    <span className={[styles.mark, styles[size], className].filter(Boolean).join(' ')}>
      {showSymbol && asset && (
        <span className={styles.symbol}>
          <Image
            src={asset}
            alt={variant === 'symbol' ? brand.organizer : ''}
            width={brandMarkAsset.width}
            height={brandMarkAsset.height}
            priority
          />
        </span>
      )}
      {(variant !== 'symbol' || !showSymbol) && (
        <span className={styles.wordmark}>{brand.organizer}</span>
      )}
    </span>
  );
}
