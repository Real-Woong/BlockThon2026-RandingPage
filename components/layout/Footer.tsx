import { brand } from '@/content/brand';
import { content, text } from '@/content';
import { BrandMark } from '@/components/brand/BrandMark';
import styles from './Footer.module.css';

/**
 * Closing signature. Carries the two confirmed names and nothing else —
 * contact appears only when it is confirmed.
 */
export function Footer() {
  const contact = text(content.contact);

  return (
    <footer className={styles.footer}>
      <div className={styles.shell}>
        <div className={styles.mark}>
          <BrandMark variant="lockup" size="md" />
          <span className={styles.creative}>{brand.creativeName}</span>
        </div>

        <div className={styles.meta}>
          <span className={styles.concept}>{brand.concept}</span>
          {contact && (
            <a className={styles.contact} href={contact.includes('@') ? `mailto:${contact}` : contact}>
              {contact}
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
