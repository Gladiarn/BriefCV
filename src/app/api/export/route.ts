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

    // Set the HTML content
    await page.setContent(htmlContent, { waitUntil: "networkidle0" as any });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "10mm", bottom: "10mm", left: "10mm", right: "10mm" },
    });

    await browser.close();

    return new NextResponse(pdfBuffer as any, {
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
