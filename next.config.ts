import type { NextConfig } from "next";

// The old creative-coding gallery archive (separate repo/Vercel project,
// fully self-contained static site) is proxied in under /forge — see the
// plan doc for why (Vercel domains attach to exactly one project).
// FORGE_ORIGIN must be that project's permanent *.vercel.app alias, not a
// per-deployment hashed URL.
const FORGE_ORIGIN = process.env.FORGE_ORIGIN;

const nextConfig: NextConfig = {
  // The old site's internal links/fetches are all relative, so they only
  // resolve correctly when the browser's current path already ends in a
  // slash (otherwise e.g. shared/style.css resolves one level too high).
  // trailingSlash:true makes Next canonicalize /forge -> /forge/ itself;
  // file-extension URLs (manifest.json, .ttf, etc.) are exempt per Next's
  // own docs, so they're untouched. Tried a manual redirects() rule for
  // just /forge instead of this — it infinite-loops against Next's default
  // (opposite-direction) trailing-slash redirect, which fires on *any*
  // path including ones with no matching page.
  trailingSlash: true,
  async rewrites() {
    if (!FORGE_ORIGIN) return [];
    return [{ source: "/forge/:path*", destination: `${FORGE_ORIGIN}/:path*` }];
  },
};

export default nextConfig;
