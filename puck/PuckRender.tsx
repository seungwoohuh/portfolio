"use client";

import { Render, type Data } from "@puckeditor/core";
import { config } from "./config";

// Puck's Render pulls in client-only internals — wrap it in its own client
// boundary so server pages (app/page.tsx, app/[slug]/page.tsx) can render
// it without tripping the RSC client/server split.
export function PuckRender({ data }: { data: Data }) {
  return <Render config={config} data={data} />;
}
