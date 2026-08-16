import { brand } from '@/content/brand';
import { action, content, line, value } from '@/content';
import { heroFacts } from '@/content/sections';
import { ActionLink } from '@/components/ui/ActionLink';
import { StatusLabel } from '@/components/ui/StatusLabel';
import { SignalLine } from '@/components/ui/SignalLine';
import styles from './Hero.module.css';

/**
 * Panel 00 — the hero copy.
 *
 * The cube field spells BLOCKBLOCK above this, so the type here stays at
 * caption scale rather than competing with it. Only the two confirmed brand
 * names and the creative direction are set; descriptor, headline, date,
 * location, format and CTA appear the moment they are confirmed and stay
 * absent until then (CONTENT.md §16).
 */
export function HeroContent() {
  const hero = value(content.hero);
  const descriptor = line(hero?.descriptor);
  const facts = heroFacts();
  const lead = line(hero?.headline) ?? descriptor;
  const primary = action(hero?.primaryCtaLabel, hero?.primaryCtaUrl);
  const secondary = action(hero?.secondaryCtaLabel, hero?.secondaryCtaUrl);

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
          {lead.split('\n').map((row) => (
            <span key={row} className={styles.headlineRow}>
              {row}{' '}
            </span>
          ))}
        </p>
      )}

      {(primary || secondary) && (
        <div className={styles.actions}>
          <ActionLink label={primary?.label ?? null} url={primary?.url ?? null} variant="primary" />
          <ActionLink
            label={secondary?.label ?? null}
            url={secondary?.url ?? null}
            variant="secondary"
          />
        </div>
      )}

      {facts.length > 0 && (
        <dl className={styles.facts}>
          {facts.map((fact) => (
            <div key={fact} className={styles.fact}>
              <dd>{fact}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
