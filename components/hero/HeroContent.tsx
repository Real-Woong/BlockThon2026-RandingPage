import { brand } from '@/content/brand';
import { applyUrl, content } from '@/content';
import { heroFacts } from '@/content/sections';
import { ActionLink } from '@/components/ui/ActionLink';
import { StatusLabel } from '@/components/ui/StatusLabel';
import { SignalLine } from '@/components/ui/SignalLine';
import styles from './Hero.module.css';

/**
 * Panel 00 — the hero copy.
 *
 * The cube field spells BLOCKBLOCK above this, so the type here stays at
 * caption scale rather than competing with it. Only the two brand names are
 * guaranteed; descriptor, headline, date, location, format and CTA appear the
 * moment they are filled in and stay absent until then.
 */
export function HeroContent() {
  const { hero } = content;
  const facts = heroFacts();
  const lead = hero.headline || hero.descriptor;

  // Tested on the data, not on the elements: ActionLink returns null on its own,
  // but the JSX for it is always truthy, so the wrapper has to ask the content.
  const primaryUrl = applyUrl(hero.primaryCtaUrl);
  const hasPrimary = Boolean(hero.primaryCtaLabel && primaryUrl);
  const hasSecondary = Boolean(hero.secondaryCtaLabel && hero.secondaryCtaUrl);

  return (
    <div className={styles.content}>
      <div className={styles.opening}>
        <StatusLabel className={styles.index}>00</StatusLabel>
        <SignalLine className={styles.openingRule} />
        <span className={styles.organizer}>{brand.organizer}</span>
      </div>

      {/* Two hand-set lines. The space keeps the accessible name intact:
          "block_block pixel", not "block_blockpixel". */}
      <h1 className={styles.title}>
        <span className={styles.titleWord}>block_block</span>{' '}
        <span className={styles.titleWord}>pixel</span>
      </h1>

      {/* pixel → block → connection → protocol → product (CLAUDE.md §1) */}
      <ol className={styles.narrative}>
        {brand.narrative.map((step) => (
          <li key={step} className={styles.narrativeStep}>
            {step}
          </li>
        ))}
      </ol>

      {/* One lead line only. The headline wins when both exist; the longer
          body copy belongs to the manifesto, not to the first screen. */}
      {lead && (
        <p className={`${styles.headline} u-kr`}>
          {lead.split('\n').map((row, position) => (
            <span key={position} className={styles.headlineRow}>
              {row}{' '}
            </span>
          ))}
        </p>
      )}

      {/* The wrapper carries a top margin, so it has to disappear with the
          buttons — an empty flex row still pushes everything below it down. */}
      {(hasPrimary || hasSecondary) && (
        <div className={styles.actions}>
          <ActionLink label={hero.primaryCtaLabel} url={primaryUrl} variant="primary" />
          <ActionLink
            label={hero.secondaryCtaLabel}
            url={hero.secondaryCtaUrl}
            variant="secondary"
          />
        </div>
      )}

      {facts.length > 0 && (
        <dl className={styles.facts}>
          {facts.map((fact, position) => (
            <div key={position} className={styles.fact}>
              <dd>{fact}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
