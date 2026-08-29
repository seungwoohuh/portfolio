import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { portfolioItems } from "@/drizzle/schema";
import { EditorClient } from "./editor-client";

export default async function AdminItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [item] = await db
    .select()
    .from(portfolioItems)
    .where(eq(portfolioItems.id, Number(id)));

  if (!item) {
    notFound();
  }

  return <EditorClient itemId={item.id} title={item.title} initialData={item.layout} />;
}
