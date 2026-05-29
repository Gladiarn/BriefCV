import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { resumeData, htmlContent } = await req.json();

    const isProduction = process.env.NODE_ENV === "production";

    // Dynamic import based on environment
    const puppeteer = isProduction
      ? (await import("puppeteer-core")).default
      : (await import("puppeteer")).default;

    const chromium = isProduction ? (await import("@sparticuz/chromium")).default : null;

    const browser = await puppeteer.launch({
      ...(isProduction
        ? {
            args: chromium!.args,
            executablePath: await chromium!.executablePath(),
            headless: true,
          }
        : {
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
          }),
    });

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(60000); // Set timeout to 60s

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
    // Log more details if possible
    return NextResponse.json(
      { error: "Failed to generate high-fidelity PDF", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
