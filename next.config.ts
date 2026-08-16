import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // CLAUDE.md is the hand-written project brief; keep the generator out of it.
  agentRules: false,
};

export default nextConfig;
