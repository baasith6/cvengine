import {
  Document,
  Paragraph,
  TextRun,
  HeadingLevel,
  Packer,
} from "docx";

function parseInlineMarkdown(line: string): TextRun[] {
  const runs: TextRun[] = [];
  let remaining = line;
  while (remaining.length > 0) {
    const boldStart = remaining.indexOf("**");
    if (boldStart === -1) {
      if (remaining.length > 0) {
        runs.push(new TextRun(remaining));
      }
      break;
    }
    if (boldStart > 0) {
      runs.push(new TextRun(remaining.slice(0, boldStart)));
    }
    remaining = remaining.slice(boldStart + 2);
    const boldEnd = remaining.indexOf("**");
    if (boldEnd === -1) {
      runs.push(new TextRun({ text: "**" + remaining, bold: true }));
      break;
    }
    runs.push(new TextRun({ text: remaining.slice(0, boldEnd), bold: true }));
    remaining = remaining.slice(boldEnd + 2);
  }
  return runs;
}

function buildParagraphs(markdown: string): Paragraph[] {
  const paragraphs: Paragraph[] = [];
  const lines = markdown.split(/\r?\n/);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed) {
      paragraphs.push(new Paragraph({ children: [new TextRun("")] }));
      continue;
    }
    if (trimmed.startsWith("### ")) {
      paragraphs.push(
        new Paragraph({
          text: trimmed.slice(4),
          heading: HeadingLevel.HEADING_3,
        })
      );
      continue;
    }
    if (trimmed.startsWith("## ")) {
      paragraphs.push(
        new Paragraph({
          text: trimmed.slice(3),
          heading: HeadingLevel.HEADING_2,
        })
      );
      continue;
    }
    if (trimmed.startsWith("# ")) {
      paragraphs.push(
        new Paragraph({
          text: trimmed.slice(2),
          heading: HeadingLevel.HEADING_1,
        })
      );
      continue;
    }
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const bulletText = trimmed.slice(2);
      paragraphs.push(
        new Paragraph({
          children: parseInlineMarkdown(bulletText),
          bullet: { level: 0 },
        })
      );
      continue;
    }
    paragraphs.push(
      new Paragraph({
        children: parseInlineMarkdown(trimmed),
      })
    );
  }

  return paragraphs;
}

export async function markdownToDocxBuffer(markdown: string): Promise<Buffer> {
  const children = buildParagraphs(markdown);
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: children.length > 0 ? children : [new Paragraph({ text: "" })],
      },
    ],
  });

  return Buffer.from(await Packer.toBuffer(doc));
}
