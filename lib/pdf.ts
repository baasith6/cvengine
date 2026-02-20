import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

/**
 * Generate a PDF buffer from a full HTML document string.
 * - On Vercel: uses puppeteer-core + @sparticuz/chromium (serverless).
 * - Locally: uses full puppeteer which ships Chromium for your OS (e.g. Windows).
 */
export async function htmlToPdf(html: string): Promise<Buffer> {
  const isVercel = !!process.env.VERCEL;
  const browser = isVercel
    ? await puppeteer.launch({
        executablePath: await chromium.executablePath(),
        args: chromium.args,
        headless: true,
      })
    : await (
        await import("puppeteer")
      ).default.launch({
        headless: true,
      });

  try {
    const page = await browser.newPage();
    await page.setContent(html, {
      waitUntil: "networkidle0",
    });
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0.6in", right: "0.6in", bottom: "0.6in", left: "0.6in" },
    });
    return Buffer.from(pdfBuffer);
  } finally {
    await browser.close();
  }
}
