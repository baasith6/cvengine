import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import { markdownToHtmlFragment, wrapInHtmlDocument } from "@/lib/md-to-html";
import { htmlToPdf } from "@/lib/pdf";

const MAX_MARKDOWN_LENGTH = 50_000;

export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const markdown =
      typeof body?.markdown === "string" ? body.markdown.trim() : "";

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
    const cssPath = join(process.cwd(), "styles", "ats-pdf.css");
    const cssContent = readFileSync(cssPath, "utf-8");
    const fullHtml = wrapInHtmlDocument(bodyHtml, cssContent);

    const pdfBuffer = await htmlToPdf(fullHtml);

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
    const message =
      err instanceof Error ? err.message : "PDF generation failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
