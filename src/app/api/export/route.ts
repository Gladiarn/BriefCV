import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req: Request) {
  try {
    const { resumeData, htmlContent } = await req.json();

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Set viewport to match A4 aspect ratio at a reasonable resolution for high fidelity
    await page.setViewport({
      width: 794, // ~210mm at 96dpi
      height: 1123, // ~297mm at 96dpi
      deviceScaleFactor: 2, // High resolution
    });

    // Set the HTML content
    await page.setContent(htmlContent, {
      waitUntil: ["load", "networkidle0"] as any,
    });

    // Wait for all styles to be applied
    await page.evaluateHandle("document.fonts.ready");

    // Generate PDF with zero margins because the template now handles its own padding
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0", bottom: "0", left: "0", right: "0" },
      scale: 1,
      preferCSSPageSize: true,
    });
    await browser.close();

    return new NextResponse(pdfBuffer as unknown as BodyInit, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${resumeData.title || "resume"}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Puppeteer PDF Error:", error);
    return NextResponse.json(
      { error: "Failed to generate high-fidelity PDF" },
      { status: 500 },
    );
  }
}
