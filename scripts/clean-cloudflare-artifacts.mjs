import { rmSync } from 'node:fs';

/**
 * Removes OpenNext adapter artifacts before every build.
 *
 * Why this exists: `wrangler deploy` decides how to ship the project by looking
 * at what is on disk. If it finds `open-next.config.ts` it takes the OpenNext
 * path — building a server Worker with a WORKER_SELF_REFERENCE service binding
 * named after package.json (`block-block-pixel`) rather than after the Worker
 * (`blockthon2026-randingpage`). That binding points at a Worker that does not
 * exist, and the deploy fails with API error 10143.
 *
 * None of these files are tracked in git: they are written by
 * `@opennextjs/cloudflare migrate` inside the build container and can come back
 * through Cloudflare's build output cache on a later run. Clearing them makes
 * every build take the same path — `output: 'export'` to `out/`, served as
 * static assets per wrangler.jsonc.
 *
 * If the project ever does need a server runtime, delete this script and the
 * `prebuild` hook, then commit the adapter config properly instead.
 */
const ARTIFACTS = ['.open-next', 'open-next.config.ts', '.dev.vars', 'public/_headers'];

for (const path of ARTIFACTS) {
  try {
    rmSync(path, { recursive: true, force: true });
  } catch (error) {
    // Never fail the build over cleanup.
    console.warn(`[clean] could not remove ${path}:`, error.message);
  }
}
