import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import { markdownToHtmlFragment, wrapInHtmlDocument } from "@/lib/md-to-html";
import { htmlToPdf } from "@/lib/pdf";
import { incEventCount, rememberPathSeen } from "@/lib/event-store/kv";

const MAX_MARKDOWN_LENGTH = 50_000;
const TEMPLATE_CSS: Record<string, string> = {
  classic: "ats-pdf.css",
  modern: "ats-pdf-modern.css",
  minimal: "ats-pdf-minimal.css",
};

export const maxDuration = 60;

export async function POST(request: Request) {
  const referer = request.headers.get("referer");
  const path =
    typeof referer === "string"
      ? (() => {
          try {
            return new URL(referer).pathname || "/api/export";
          } catch {
            return "/api/export";
          }
        })()
      : "/api/export";

  await rememberPathSeen({ path }).catch(() => {});
  await incEventCount({ name: "export:pdf:request", path }).catch(() => {});

  try {
    const body = await request.json();
    const markdown =
      typeof body?.markdown === "string" ? body.markdown.trim() : "";
    const templateId =
      typeof body?.template === "string" && body.template in TEMPLATE_CSS
        ? body.template
        : "classic";

    if (!markdown) {
      return NextResponse.json(
        { error: "Missing or empty markdown in request body." },
        { status: 400 }
      );
    }

    if (markdown.length > MAX_MARKDOWN_LENGTH) {
      return NextResponse.json(
        { error: `Markdown exceeds maximum length (${MAX_MARKDOWN_LENGTH} characters).` },
        { status: 400 }
      );
    }

    const bodyHtml = markdownToHtmlFragment(markdown);
    const cssPath = join(process.cwd(), "styles", TEMPLATE_CSS[templateId]);
    const cssContent = readFileSync(cssPath, "utf-8");
    const fullHtml = wrapInHtmlDocument(bodyHtml, cssContent);

    const pdfBuffer = await htmlToPdf(fullHtml);

    await incEventCount({ name: "export:pdf:success", path }).catch(() => {});
    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="cv-ats.pdf"',
        "Content-Length": String(pdfBuffer.length),
      },
    });
  } catch (err) {
    console.error("Export error:", err);
    await incEventCount({ name: "export:pdf:error", path }).catch(() => {});
    const message =
      err instanceof Error ? err.message : "PDF generation failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
