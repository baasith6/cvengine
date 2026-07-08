import { NextResponse } from "next/server";
import { markdownToDocxBuffer } from "@/lib/md-to-docx";
import { incEventCount, rememberPathSeen } from "@/lib/event-store/kv";

const MAX_MARKDOWN_LENGTH = 50_000;

export async function POST(request: Request) {
  const referer = request.headers.get("referer");
  const path =
    typeof referer === "string"
      ? (() => {
          try {
            return new URL(referer).pathname || "/api/export-docx";
          } catch {
            return "/api/export-docx";
          }
        })()
      : "/api/export-docx";

  await rememberPathSeen({ path }).catch(() => {});
  await incEventCount({ name: "export:docx:request", path }).catch(() => {});

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

    await incEventCount({ name: "export:docx:success", path }).catch(() => {});
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
    await incEventCount({ name: "export:docx:error", path }).catch(() => {});
    const message =
      err instanceof Error ? err.message : "Word export failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
