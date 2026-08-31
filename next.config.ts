import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  /*
   * The dev server runs on the Mac mini and is viewed from another machine over
   * Tailscale. Next blocks cross-origin requests to `/_next/*` in development by
   * default, so without this the HTML arrives but every client chunk 403s: the
   * hero text renders, the pixel field never draws, and each section stays at
   * the opacity 0 its enter pattern starts from — a page that looks empty while
   * the server reports 200 for everything.
   *
   * Development only; it has no effect on `next build` or on the deployed site.
   * Add an address here when a new machine needs to open the dev server.
   */
  allowedDevOrigins: [
    '100.96.86.10', // Tailscale
    'jinwoong-kims-mac-mini.tail7bc26c.ts.net', // Tailscale MagicDNS
    '192.168.124.100', // LAN
    '192.168.219.152', // LAN
  ],
  // CLAUDE.md is the hand-written project brief; keep the generator out of it.
  agentRules: false,
  /*
   * The whole page is prerendered — no route handlers, no middleware, no
   * revalidation — so it ships as plain files. `out/` is uploaded to the
   * `blockthon-landing` S3 bucket and served from there through CloudFront,
   * which means no server runtime and no adapter in the way.
   */
  output: 'export',
  // Static export has no image optimiser; the brand mark is a plain asset.
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
