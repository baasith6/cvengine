import { marked } from "marked";

/**
 * Convert Markdown to an HTML fragment (body content only).
 * Used by the API to build a full document with ATS PDF styles.
 */
export function markdownToHtmlFragment(markdown: string): string {
  return marked(markdown, {
    async: false,
    gfm: true,
    breaks: true,
  }) as string;
}

/**
 * Wrap fragment in a full HTML document with a placeholder for CSS.
 * Caller should replace __ATS_CSS__ with the contents of ats-pdf.css.
 */
export function wrapInHtmlDocument(bodyHtml: string, cssContent: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CV</title>
  <style>${cssContent}</style>
</head>
<body>
${bodyHtml}
</body>
</html>`;
}
