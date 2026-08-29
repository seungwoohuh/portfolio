import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { portfolioItems } from "@/drizzle/schema";

// Body: { ids: number[] } in the new display order. Small table (personal
// portfolio scale) so a plain sequential update loop is fine.
export async function PATCH(request: Request) {
  const { ids } = (await request.json()) as { ids?: number[] };
  if (!Array.isArray(ids)) {
    return NextResponse.json({ error: "ids must be an array" }, { status: 400 });
  }

  for (let position = 0; position < ids.length; position++) {
    await db
      .update(portfolioItems)
      .set({ position, updatedAt: new Date() })
      .where(eq(portfolioItems.id, ids[position]));
  }

  return NextResponse.json({ ok: true });
}
