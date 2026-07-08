import { getEventCount, listPathsSeen } from "@/lib/event-store/kv";
import type { TelemetryEventName } from "@/lib/event-store/types";
import type { SelfEvalRecommendations } from "@/lib/self-eval/recommendations";

function yyyyMmDd(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function lastNDates(days: number): string[] {
  const n = Math.max(1, Math.floor(days));
  const out: string[] = [];
  const now = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date(now);
    d.setUTCDate(now.getUTCDate() - i);
    out.push(yyyyMmDd(d));
  }
  return out;
}

type MetricTriple = {
  requests: number;
  success: number;
  error: number;
};

async function sumForDates(params: {
  dates: string[];
  name: TelemetryEventName;
  path: string;
}): Promise<number> {
  let total = 0;
  for (const date of params.dates) {
    total += await getEventCount({ date, name: params.name, path: params.path });
  }
  return total;
}

async function exportMetrics(params: {
  dates: string[];
  path: string;
  kind: "pdf" | "docx";
}): Promise<MetricTriple> {
  const prefix = params.kind === "pdf" ? "export:pdf" : "export:docx";
  const requests = await sumForDates({
    dates: params.dates,
    name: `${prefix}:request` as TelemetryEventName,
    path: params.path,
  });
  const success = await sumForDates({
    dates: params.dates,
    name: `${prefix}:success` as TelemetryEventName,
    path: params.path,
  });
  const error = await sumForDates({
    dates: params.dates,
    name: `${prefix}:error` as TelemetryEventName,
    path: params.path,
  });
  return { requests, success, error };
}

function pct(n: number, d: number): string {
  if (!d) return "0%";
  return `${Math.round((n / d) * 1000) / 10}%`;
}

export type SelfEvalResult = {
  recommendations: SelfEvalRecommendations;
  reportMarkdown: string;
  summary: {
    days: number;
    generatedAt: string;
    pagesEvaluated: number;
  };
};

export async function runSelfEval(params?: {
  days?: number;
  minExportRequests?: number;
}): Promise<SelfEvalResult> {
  const days = params?.days ?? 7;
  const minExportRequests = params?.minExportRequests ?? 20;
  const dates = lastNDates(days);

  // Candidate paths: union of paths seen over the window, capped for safety.
  const pathSet = new Set<string>();
  for (const date of dates) {
    const paths = await listPathsSeen({ date });
    for (const p of paths) pathSet.add(p);
    if (pathSet.size > 50) break;
  }
  const paths = Array.from(pathSet).slice(0, 50);

  const banners: SelfEvalRecommendations["banners"] = [];
  const lines: string[] = [];

  const generatedAt = new Date().toISOString();
  lines.push(`# Self-evaluation report`);
  lines.push("");
  lines.push(`- Window: last **${days}** day(s)`);
  lines.push(`- Generated: **${generatedAt}**`);
  lines.push(`- Pages evaluated: **${paths.length}**`);
  lines.push("");
  lines.push(`## Export reliability`);
  lines.push("");
  lines.push(`| Path | PDF requests | PDF errors | PDF error rate | DOCX requests | DOCX errors | DOCX error rate |`);
  lines.push(`|---|---:|---:|---:|---:|---:|---:|`);

  for (const path of paths) {
    const pdf = await exportMetrics({ dates, path, kind: "pdf" });
    const docx = await exportMetrics({ dates, path, kind: "docx" });

    const pdfRate = pdf.requests ? pdf.error / pdf.requests : 0;
    const docxRate = docx.requests ? docx.error / docx.requests : 0;

    lines.push(
      `| \`${path}\` | ${pdf.requests} | ${pdf.error} | ${pct(pdf.error, pdf.requests)} | ${docx.requests} | ${docx.error} | ${pct(docx.error, docx.requests)} |`
    );

    // Rules → app updates (recommendations.json)
    if (pdf.requests >= minExportRequests && pdfRate >= 0.03) {
      banners.push({
        id: `export_pdf_reliability_${path.replaceAll("/", "_")}`,
        matchPaths: [path],
        severity: "warning",
        title: "PDF download issues detected",
        body: "If your PDF download fails, try the “Minimal” template or reduce Markdown size. We’re working on improving reliability.",
      });
    }
    if (docx.requests >= minExportRequests && docxRate >= 0.03) {
      banners.push({
        id: `export_docx_reliability_${path.replaceAll("/", "_")}`,
        matchPaths: [path],
        severity: "warning",
        title: "Word download issues detected",
        body: "If your Word download fails, try again in a few seconds or simplify your Markdown. We’re working on improving reliability.",
      });
    }
  }

  lines.push("");
  lines.push(`## Recommendations to apply`);
  lines.push("");
  if (!banners.length) {
    lines.push(`No user-facing recommendations triggered by current rules.`);
  } else {
    for (const b of banners) {
      lines.push(`- **${b.severity.toUpperCase()}** \`${b.id}\` on ${b.matchPaths.map((p) => `\`${p}\``).join(", ")}: ${b.title}`);
    }
  }

  const recommendations: SelfEvalRecommendations = {
    version: 1,
    generatedAt,
    banners,
  };

  return {
    recommendations,
    reportMarkdown: lines.join("\n"),
    summary: { days, generatedAt, pagesEvaluated: paths.length },
  };
}

