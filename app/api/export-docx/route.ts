import { NextResponse } from "next/server";
import { markdownToDocxBuffer } from "@/lib/md-to-docx";

const MAX_MARKDOWN_LENGTH = 50_000;

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

    const buffer = await markdownToDocxBuffer(markdown);
    const filename =
      typeof body?.filename === "string" && body.filename
        ? body.filename
        : "cv-ats.docx";

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": String(buffer.length),
      },
    });
  } catch (err) {
    console.error("Export DOCX error:", err);
    const message =
      err instanceof Error ? err.message : "Word export failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
