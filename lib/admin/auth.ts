import { NextResponse } from "next/server";

export function requireAdmin(request: Request): NextResponse | null {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "ADMIN_TOKEN_not_configured" },
      { status: 500 }
    );
  }

  const provided =
    request.headers.get("x-admin-token") ??
    new URL(request.url).searchParams.get("token");

  if (!provided || provided !== expected) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  return null;
}

