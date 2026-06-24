import { NextResponse } from "next/server";

export const dynamic = "force-static";
import { getAdminSession } from "@/lib/auth";
import { readContent, writeContent } from "@/lib/content";
import type { SiteContent } from "@/types/content";

export async function GET() {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(readContent());
}

export async function PUT(req: Request) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await req.json()) as SiteContent;
    writeContent(body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Gagal menyimpan" }, { status: 500 });
  }
}
