import Link from "next/link";
import { asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { portfolioItems } from "@/drizzle/schema";

// Always reflect the current published state from the DB (no static
// caching) — see the plan: dev publishes, prod should show it immediately.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const items = await db
    .select()
    .from(portfolioItems)
    .where(eq(portfolioItems.published, true))
    .orderBy(asc(portfolioItems.position));

  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "48px 24px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 32 }}>
        Portfolio
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 24,
        }}
      >
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/${item.slug}`}
            style={{ display: "block" }}
          >
            {item.coverImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.coverImageUrl}
                alt={item.title}
                style={{
                  width: "100%",
                  aspectRatio: "4 / 3",
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  aspectRatio: "4 / 3",
                  background: "#eee",
                  borderRadius: 8,
                }}
              />
            )}
            <p style={{ marginTop: 8, fontWeight: 500 }}>{item.title}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
