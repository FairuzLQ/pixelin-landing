import { NextResponse } from "next/server";

export const dynamic = "force-static";
import { COOKIE } from "@/lib/auth";

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(COOKIE, "", { maxAge: 0, path: "/" });
  return res;
}
