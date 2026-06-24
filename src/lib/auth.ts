import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE = "pxl_admin";
const secret = () => new TextEncoder().encode(process.env.JWT_SECRET ?? "fallback-secret-change-me");

export async function signToken(payload: Record<string, unknown>): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, secret());
  return payload;
}

export async function getAdminSession(): Promise<boolean> {
  try {
    const store = await cookies();
    const token = store.get(COOKIE)?.value;
    if (!token) return false;
    await verifyToken(token);
    return true;
  } catch {
    return false;
  }
}

export { COOKIE };
