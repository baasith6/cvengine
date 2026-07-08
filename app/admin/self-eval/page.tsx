"use client";

import { useMemo, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import FooterNav from "@/components/FooterNav";

type JsonObject = Record<string, unknown>;

type PreviewResponse =
  | { ok: true; summary: JsonObject; recommendations: JsonObject; reportMarkdown: string }
  | { ok: false; error: string };

type GeneratePrResponse =
  | { ok: true; pr: { url: string; number: number; branch: string } }
  | { ok: false; error: string };

function readError(v: unknown): string | null {
  if (!v || typeof v !== "object") return null;
  const maybe = v as Record<string, unknown>;
  return typeof maybe.error === "string" ? maybe.error : null;
}

export default function SelfEvalAdminPage() {
  const [token, setToken] = useState("");
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState<"preview" | "pr" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<PreviewResponse | null>(null);
  const [prResult, setPrResult] = useState<GeneratePrResponse | null>(null);

  const headers = useMemo(
    () => ({
      "Content-Type": "application/json",
      "x-admin-token": token,
    }),
    [token]
  );

  async function runPreview() {
    setError(null);
    setPrResult(null);
    setLoading("preview");
    try {
      const res = await fetch(`/api/self-eval/preview?days=${encodeURIComponent(days)}`, {
        method: "GET",
        headers: { "x-admin-token": token },
      });
      const data = (await res.json().catch(() => ({}))) as PreviewResponse;
      if (!res.ok || !data || data.ok !== true) {
        throw new Error(readError(data) || `Preview failed (${res.status})`);
      }
      setPreview(data);
    } catch (e) {
      setPreview(null);
      setError(e instanceof Error ? e.message : "Preview failed.");
    } finally {
      setLoading(null);
    }
  }

  async function generatePr() {
    setError(null);
    setLoading("pr");
    try {
      const res = await fetch(`/api/self-eval/generate-pr`, {
        method: "POST",
        headers,
        body: JSON.stringify({ days }),
      });
      const data = (await res.json().catch(() => ({}))) as GeneratePrResponse;
      if (!res.ok || !data || data.ok !== true) {
        throw new Error(readError(data) || `PR failed (${res.status})`);
      }
      setPrResult(data);
    } catch (e) {
      setPrResult(null);
      setError(e instanceof Error ? e.message : "PR generation failed.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <SiteHeader />
      <main id="main-content" className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Self-eval admin</h1>
          <p className="text-sm text-[var(--muted)] mt-1">
            Preview friction metrics and generate a GitHub PR with recommendations. Requires <code className="font-mono text-xs">ADMIN_TOKEN</code>.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <label className="block sm:col-span-2">
              <div className="text-xs font-semibold text-[var(--muted)] mb-1">Admin token</div>
              <input
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="ADMIN_TOKEN"
                className="w-full rounded-xl border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
            </label>
            <label className="block">
              <div className="text-xs font-semibold text-[var(--muted)] mb-1">Days</div>
              <input
                type="number"
                min={1}
                max={30}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full rounded-xl border border-[var(--card-border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
            </label>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={runPreview}
              disabled={!token || loading !== null}
              className="px-4 py-2 rounded-xl bg-[var(--accent)] text-white font-semibold disabled:opacity-50"
            >
              {loading === "preview" ? "Previewing…" : "Preview"}
            </button>
            <button
              type="button"
              onClick={generatePr}
              disabled={!token || loading !== null}
              className="px-4 py-2 rounded-xl border border-[var(--card-border)] text-[var(--foreground)] font-semibold hover:border-[var(--accent)]/40 disabled:opacity-50"
            >
              {loading === "pr" ? "Generating PR…" : "Generate PR"}
            </button>
          </div>

          {error ? (
            <p className="mt-4 text-sm text-red-500">{error}</p>
          ) : null}

          {prResult && prResult.ok ? (
            <div className="mt-4 rounded-xl border border-[var(--card-border)] bg-[var(--background)] p-4 text-sm">
              <div className="font-semibold text-[var(--foreground)]">PR created</div>
              <div className="mt-1">
                <a className="underline text-[var(--accent)]" href={prResult.pr.url} target="_blank" rel="noreferrer">
                  {prResult.pr.url}
                </a>
              </div>
              <div className="text-xs text-[var(--muted)] mt-1">
                Branch: <code className="font-mono">{prResult.pr.branch}</code> · PR #{prResult.pr.number}
              </div>
            </div>
          ) : null}
        </div>

        {preview && preview.ok ? (
          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6 space-y-4">
            <div>
              <div className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">Summary</div>
              <pre className="mt-2 text-xs rounded-xl border border-[var(--card-border)] bg-[var(--background)] p-3 overflow-auto">
                {JSON.stringify(preview.summary, null, 2)}
              </pre>
            </div>
            <div>
              <div className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">Recommendations</div>
              <pre className="mt-2 text-xs rounded-xl border border-[var(--card-border)] bg-[var(--background)] p-3 overflow-auto">
                {JSON.stringify(preview.recommendations, null, 2)}
              </pre>
            </div>
            <div>
              <div className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">Report (markdown)</div>
              <pre className="mt-2 text-xs rounded-xl border border-[var(--card-border)] bg-[var(--background)] p-3 overflow-auto whitespace-pre-wrap">
                {preview.reportMarkdown}
              </pre>
            </div>
          </div>
        ) : null}

        <FooterNav />
      </main>
    </div>
  );
}

