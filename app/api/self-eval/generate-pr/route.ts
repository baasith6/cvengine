import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { runSelfEval } from "@/lib/self-eval/evaluator";
import { getInstallationToken } from "@/lib/github/github-app";
import { createSelfEvalPr } from "@/lib/github/pr";

export async function POST(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  try {
    const body = await request.json().catch(() => ({}));
    const days = typeof body?.days === "number" && Number.isFinite(body.days) ? body.days : 7;

    const result = await runSelfEval({ days });
    const token = await getInstallationToken();

    const reportPath = `self-eval/reports/${result.summary.generatedAt.slice(0, 10)}.md`;
    const pr = await createSelfEvalPr({
      token,
      title: `self-eval: apply recommendations (${result.summary.generatedAt.slice(0, 10)})`,
      body: [
        "## Summary",
        "- Update `self-eval/recommendations.json` based on recent friction metrics",
        `- Add self-evaluation report: \`${reportPath}\``,
        "",
        "## Notes",
        "- This PR is generated automatically and **requires developer review**.",
        "",
        "## Report",
        "```",
        result.reportMarkdown,
        "```",
        "",
      ].join("\n"),
      files: [
        {
          path: "self-eval/recommendations.json",
          contentUtf8: JSON.stringify(
            { ...result.recommendations, generatedAt: result.summary.generatedAt },
            null,
            2
          ) + "\n",
        },
        { path: reportPath, contentUtf8: result.reportMarkdown + "\n" },
      ],
    });

    return NextResponse.json({ ok: true, pr }, { status: 200 });
  } catch (err) {
    console.error("Self-eval PR error:", err);
    const message = err instanceof Error ? err.message : "pr_failed";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

