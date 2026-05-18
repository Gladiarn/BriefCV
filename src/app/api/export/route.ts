import { NextResponse } from 'next/server';
import React from 'react';
import { renderToStream } from '@react-pdf/renderer';
import { pdfTemplates } from '@/lib/templates';
import { ModernPDFTemplate } from '@/templates/pdf/modern';

export async function POST(req: Request) {
  try {
    const { resumeData } = await req.json();
    
    // Choose the PDF template
    const TemplateComponent = (pdfTemplates as any)[resumeData.templateId] || ModernPDFTemplate;

    // Render to stream
    const stream = await renderToStream(React.createElement(TemplateComponent, { data: resumeData }) as any);

    // Convert stream to Buffer
    const chunks: Uint8Array[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk as Uint8Array);
    }
    const pdfBuffer = Buffer.concat(chunks);

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${resumeData.name || 'resume'}.pdf"`,
      },
    });
  } catch (error) {
    console.error('PDF Generation Error:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
