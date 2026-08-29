import {
  pgTable,
  serial,
  text,
  boolean,
  integer,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import type { Data } from "@puckeditor/core";

export const portfolioItems = pgTable("portfolio_items", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  position: integer("position").notNull().default(0),
  published: boolean("published").notNull().default(false),
  coverImageUrl: text("cover_image_url"),
  layout: jsonb("layout")
    .$type<Data>()
    .notNull()
    .default(sql`'{"content":[],"root":{"props":{}}}'::jsonb`),
  assetUrls: text("asset_urls")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type PortfolioItem = typeof portfolioItems.$inferSelect;
export type NewPortfolioItem = typeof portfolioItems.$inferInsert;
