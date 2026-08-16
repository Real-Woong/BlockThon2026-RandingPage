import type { Metadata, Viewport } from 'next';
import { brand } from '@/content/brand';
import { content, line, value } from '@/content';
import '@/styles/globals.css';

const meta = value(content.metadata);

/**
 * Title and description fall back to the two confirmed brand names. No event
 * date, location or Event structured data is emitted until those are confirmed
 * (CONTENT.md §15).
 */
export const metadata: Metadata = {
  title: line(meta?.title) ?? `${brand.creativeName} — ${brand.organizer}`,
  description: line(meta?.description) ?? undefined,
  openGraph: {
    title: line(meta?.title) ?? `${brand.creativeName} — ${brand.organizer}`,
    description: line(meta?.description) ?? undefined,
    images: line(meta?.ogImage) ? [line(meta?.ogImage) as string] : undefined,
    locale: line(meta?.locale) ?? 'ko_KR',
    type: 'website',
  },
  alternates: line(meta?.canonicalUrl) ? { canonical: line(meta?.canonicalUrl) as string } : undefined,
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
