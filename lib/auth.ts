import { SignJWT, jwtVerify } from "jose";

// This file is imported from proxy.ts, which runs on the Edge runtime by
// default — keep it free of node:crypto / other Node-only APIs. The
// password comparison (which needs node:crypto.timingSafeEqual) lives in
// lib/password.ts instead, imported only from the Node-runtime login route.

export const SESSION_COOKIE = "admin_session";

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not set");
  }
  return new TextEncoder().encode(secret);
}

export async function signSession() {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("14d")
    .sign(getSecret());
}

export async function verifySession(token: string | undefined) {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload.role === "admin";
  } catch {
    return false;
  }
}

// prod builds strip /admin + write APIs entirely (see proxy.ts) — this is
// the single source of truth for "are we in an environment where editing
// is allowed at all" (dev/preview/local), separate from the per-request
// session cookie check.
export function isAdminEnvironment() {
  return process.env.VERCEL_ENV !== "production";
}
