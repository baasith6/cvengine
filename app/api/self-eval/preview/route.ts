import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { runSelfEval } from "@/lib/self-eval/evaluator";

export async function GET(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  try {
    const url = new URL(request.url);
    const days = Number(url.searchParams.get("days") ?? "7");
    const result = await runSelfEval({ days: Number.isFinite(days) ? days : 7 });
    return NextResponse.json(
      { ok: true, summary: result.summary, recommendations: result.recommendations, reportMarkdown: result.reportMarkdown },
      { status: 200 }
    );
  } catch (err) {
    console.error("Self-eval preview error:", err);
    return NextResponse.json({ ok: false, error: "preview_failed" }, { status: 500 });
  }
}

