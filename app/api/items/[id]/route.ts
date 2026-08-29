import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { del } from "@vercel/blob";
import { db } from "@/lib/db";
import { portfolioItems } from "@/drizzle/schema";
import { extractAssetUrls } from "@/lib/assets";
import type { Data } from "@puckeditor/core";

export async function GET(
  _request: Request,
  ctx: RouteContext<"/api/items/[id]">,
) {
  const { id } = await ctx.params;
  const [item] = await db
    .select()
    .from(portfolioItems)
    .where(eq(portfolioItems.id, Number(id)));
  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(item);
}

export async function PATCH(
  request: Request,
  ctx: RouteContext<"/api/items/[id]">,
) {
  const { id } = await ctx.params;
  const body = (await request.json()) as {
    title?: string;
    published?: boolean;
    coverImageUrl?: string | null;
    layout?: Data;
  };

  const update: Record<string, unknown> = { updatedAt: new Date() };
  if (typeof body.title === "string") update.title = body.title;
  if (typeof body.published === "boolean") update.published = body.published;
  if (body.coverImageUrl !== undefined)
    update.coverImageUrl = body.coverImageUrl;
  if (body.layout) {
    update.layout = body.layout;
    update.assetUrls = extractAssetUrls(body.layout);
  }

  const [updated] = await db
    .update(portfolioItems)
    .set(update)
    .where(eq(portfolioItems.id, Number(id)))
    .returning();

  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(updated);
}

export async function DELETE(
  _request: Request,
  ctx: RouteContext<"/api/items/[id]">,
) {
  const { id } = await ctx.params;
  const [deleted] = await db
    .delete(portfolioItems)
    .where(eq(portfolioItems.id, Number(id)))
    .returning();

  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (deleted.assetUrls.length > 0) {
    // Best-effort: an orphaned blob costs storage, not correctness — don't
    // fail the delete over it.
    await del(deleted.assetUrls).catch((err) => {
      console.error("Failed to delete blobs for item", deleted.id, err);
    });
  }

  return NextResponse.json({ ok: true });
}
