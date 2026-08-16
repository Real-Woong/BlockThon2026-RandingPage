import { isStructurePreview } from '@/content';
import styles from './ui.module.css';

type ActionLinkProps = {
  label: string | null;
  url: string | null;
  variant?: 'primary' | 'secondary' | 'quiet';
  className?: string;
};

/**
 * A call to action, or nothing.
 *
 * Without both a label and a URL this renders null — no empty button, no
 * invented alternative action (CONTENT.md §16). In structure preview the
 * control renders as a focusable, explicitly disabled placeholder so the
 * layout can be checked without shipping a dead link.
 */
export function ActionLink({ label, url, variant = 'secondary', className }: ActionLinkProps) {
  if (!label || !url) return null;

  const classNames = [styles.action, className].filter(Boolean).join(' ');

  if (isStructurePreview) {
    return (
      <button type="button" className={classNames} data-variant={variant} aria-disabled="true">
        {label}
      </button>
    );
  }

  const external = /^https?:/i.test(url);

  return (
    <a
      href={url}
      className={classNames}
      data-variant={variant}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
    >
      {label}
    </a>
  );
}
