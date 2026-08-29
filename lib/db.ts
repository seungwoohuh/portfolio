import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/drizzle/schema";

// Deliberately not throwing here if DATABASE_URL is missing: this module
// gets imported by force-dynamic pages/routes, and Next's build step can
// end up evaluating it outside of an actual request. A bad connection
// string only fails when a query actually runs, which is the right time
// to surface it.
export const db = drizzle(
  process.env.DATABASE_URL ?? "postgres://unset:unset@localhost:5432/unset",
  { schema },
);
