import { NextResponse } from "next/server";
import { asc, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { portfolioItems } from "@/drizzle/schema";

function slugify(title: string) {
  const base = title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || `item-${Date.now()}`;
}

async function uniqueSlug(title: string) {
  const baseSlug = slugify(title);
  let slug = baseSlug;
  let suffix = 1;
  // Small table, simple loop is fine — avoids a DB-level uniqueness retry dance.
  for (;;) {
    const existing = await db
      .select({ id: portfolioItems.id })
      .from(portfolioItems)
      .where(eq(portfolioItems.slug, slug))
      .limit(1);
    if (existing.length === 0) return slug;
    suffix += 1;
    slug = `${baseSlug}-${suffix}`;
  }
}

// Admin-only listing (includes unpublished items) — the admin dashboard is
// the only caller, and this whole route only exists in dev/preview
// (see proxy.ts). Public pages read the DB directly, not through this API.
export async function GET() {
  const items = await db
    .select()
    .from(portfolioItems)
    .orderBy(asc(portfolioItems.position));
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const { title } = (await request.json()) as { title?: string };
  if (!title?.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const [top] = await db
    .select({ position: portfolioItems.position })
    .from(portfolioItems)
    .orderBy(desc(portfolioItems.position))
    .limit(1);

  const slug = await uniqueSlug(title);

  const [created] = await db
    .insert(portfolioItems)
    .values({
      title,
      slug,
      position: (top?.position ?? 0) + 1,
    })
    .returning();

  return NextResponse.json(created, { status: 201 });
}
