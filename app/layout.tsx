import type { Metadata, Viewport } from 'next';
import { brand } from '@/content/brand';
import { content } from '@/content';
import '@/styles/globals.css';

const meta = content.metadata;

/**
 * Title and description fall back to the two confirmed brand names. No event
 * date, location or Event structured data is emitted until those are confirmed
 * (CONTENT.md §15).
 */
/**
 * A crawler reads og:image out of context and has nothing to resolve a path
 * against, so the URL has to be absolute. Next builds one from metadataBase,
 * which falls back to localhost during a build — an og:image pointing at
 * localhost is worse than none, because the card renders broken instead of
 * falling back to text. So the image ships with the site but is only announced
 * once the deployed origin is known, which is the same rule the rest of the
 * content follows: fill the value and it appears.
 */
const origin = meta.canonicalUrl ? new URL(meta.canonicalUrl) : undefined;

export const metadata: Metadata = {
  metadataBase: origin,
  title: meta.title || `${brand.creativeName} — ${brand.organizer}`,
  description: meta.description || undefined,
  openGraph: {
    title: meta.title || `${brand.creativeName} — ${brand.organizer}`,
    description: meta.description || undefined,
    images: origin && meta.ogImage ? [meta.ogImage] : undefined,
    locale: meta.locale || 'ko_KR',
    type: 'website',
  },
  alternates: meta.canonicalUrl ? { canonical: meta.canonicalUrl } : undefined,
};

export const viewport: Viewport = {
  themeColor: '#03050a',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /* suppressHydrationWarning: the inline script below stamps data-motion on
       <html> before React hydrates, which is an intended mismatch. */
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/*
          Marks the document as script-driven before first paint. Section enter
          patterns only hide their content when this flag is present, so with
          JavaScript unavailable or broken every section renders fully visible
          instead of staying at opacity 0.
        */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.dataset.motion='on'" }}
        />
      </head>
      <body>
        <a className="u-skip-link" href="#main">
          본문으로 건너뛰기
        </a>
        {children}
      </body>
    </html>
  );
}
