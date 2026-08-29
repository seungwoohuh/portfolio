import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession, isAdminEnvironment } from "@/lib/auth";

// Next.js 16 renamed Middleware -> Proxy (same runtime/behavior, new file
// name/export). This gates the entire editing surface (/admin, the
// items/upload write APIs, and login) so it exists only in dev/preview —
// production is a read-only consumer of whatever was published from dev.
export async function proxy(request: NextRequest) {
  // next.config.ts sets trailingSlash:true (needed for the /forge proxy),
  // so exact-match checks here must tolerate both "/admin/login" and
  // "/admin/login/" — otherwise the login page redirect loop-trips against
  // Next's own trailing-slash redirect (each form fails the other's check).
  const pathname = request.nextUrl.pathname.replace(/\/$/, "") || "/";

  if (!isAdminEnvironment()) {
    return new NextResponse("Not Found", { status: 404 });
  }

  // The login page/API establish the session, so they can't require one.
  if (pathname === "/admin/login" || pathname.startsWith("/api/auth/")) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const valid = await verifySession(token);
  if (valid) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.redirect(new URL("/admin/login", request.url));
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/items/:path*",
    "/api/upload/:path*",
    "/api/auth/:path*",
  ],
};
