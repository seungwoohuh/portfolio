import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { portfolioItems } from "@/drizzle/schema";
import { PuckRender } from "@/puck/PuckRender";

export const dynamic = "force-dynamic";

export default async function PortfolioItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [item] = await db
    .select()
    .from(portfolioItems)
    .where(and(eq(portfolioItems.slug, slug), eq(portfolioItems.published, true)));

  if (!item) {
    notFound();
  }

  return <PuckRender data={item.layout} />;
}
