import { renderToStream } from "@react-pdf/renderer";
import { NextResponse } from "next/server";
import React from "react";
import { templates, pdfTemplates } from "@/lib/templates";
import { ModernPDFTemplate } from "@/templates/pdf/modern";
import type { CVDocument } from "@/types/cv";

export async function POST(req: Request) {
  try {
    const { resumeData } = await req.json();
    const doc = resumeData as CVDocument;

    // Use pdfTemplates correctly
    const TemplateComponent = (pdfTemplates as any)[doc.settings.templateId] || ModernPDFTemplate;

    // Render to stream
    const stream = await renderToStream(
      React.createElement(TemplateComponent as any, { doc: doc }) as any
    );

    // Convert stream to Buffer
    const chunks: Uint8Array[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk as Uint8Array);
    }
    const pdfBuffer = Buffer.concat(chunks);

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${doc.title || "resume"}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF Generation failed:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 },
    );
  }
}
