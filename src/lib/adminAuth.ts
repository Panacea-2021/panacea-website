export const ADMIN_COOKIE = "panacea_admin_session";

/** Timing-safe string compare */
export function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

export async function createAdminToken(password: string, secret: string) {
  const data = new TextEncoder().encode(`admin:${password}:${secret}`);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function isValidAdminSession(token: string | undefined) {
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET || password;
  if (!password || !secret || !token) return false;
  const expected = await createAdminToken(password, secret);
  return safeEqual(token, expected);
}
