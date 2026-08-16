import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // CLAUDE.md is the hand-written project brief; keep the generator out of it.
  agentRules: false,
  /*
   * The whole page is prerendered — no route handlers, no middleware, no
   * revalidation — so it ships as plain files. Cloudflare serves `out/` as
   * static assets, which means no server runtime and no adapter in the way.
   */
  output: 'export',
  // Static export has no image optimiser; the brand mark is a plain asset.
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
