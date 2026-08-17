import styles from './ui.module.css';

type ActionLinkProps = {
  label: string;
  url: string;
  variant?: 'primary' | 'secondary' | 'quiet';
  className?: string;
};

/**
 * A call to action, or nothing.
 *
 * Without both a label and a URL this renders null — no empty button, no
 * invented alternative action. That is what makes it safe to drop one of these
 * into a layout before the apply form exists.
 */
export function ActionLink({ label, url, variant = 'secondary', className }: ActionLinkProps) {
  if (!label || !url) return null;

  const external = /^https?:/i.test(url);

  return (
    <a
      href={url}
      className={[styles.action, className].filter(Boolean).join(' ')}
      data-variant={variant}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
    >
      {label}
    </a>
  );
}
