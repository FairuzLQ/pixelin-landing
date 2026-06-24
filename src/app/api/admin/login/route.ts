import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signToken, COOKIE } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (
      email !== process.env.ADMIN_EMAIL ||
      !process.env.ADMIN_PASSWORD_HASH ||
      !(await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH))
    ) {
      await new Promise((r) => setTimeout(r, 800)); // slow down brute force
      return NextResponse.json({ error: "Email atau password salah" }, { status: 401 });
    }

    const token = await signToken({ email, role: "admin" });
    const res = NextResponse.json({ success: true });

    res.cookies.set(COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return res;
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
