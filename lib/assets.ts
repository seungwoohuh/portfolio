import type { Data } from "@puckeditor/core";

// Vercel Blob public URLs always live on this hostname suffix, regardless
// of which Puck component/field embedded them. Walking the raw JSON for
// string values matching it is simpler and more robust than modeling
// Puck's exact Slot/DropZone tree shape, which can change across versions.
const BLOB_HOST_SUFFIX = ".public.blob.vercel-storage.com";

function isBlobUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    return new URL(value).hostname.endsWith(BLOB_HOST_SUFFIX);
  } catch {
    return false;
  }
}

function walk(node: unknown, found: Set<string>) {
  if (isBlobUrl(node)) {
    found.add(node);
    return;
  }
  if (Array.isArray(node)) {
    for (const item of node) walk(item, found);
    return;
  }
  if (node && typeof node === "object") {
    for (const value of Object.values(node)) walk(value, found);
  }
}

export function extractAssetUrls(layout: Data): string[] {
  const found = new Set<string>();
  walk(layout, found);
  return Array.from(found);
}
