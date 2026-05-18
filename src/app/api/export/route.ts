import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(req: Request) {
  try {
    const { resumeData } = await req.json();

    // Use a robust, static template string that replicates the resume layout
    // In a real production app, we would dynamically generate this HTML string
    // based on the resumeData object.
    const html = `
      <div style="font-family: sans-serif; padding: 40px;">
        <h1 style="text-align: center;">${resumeData.name}</h1>
        <p style="text-align: center;">${resumeData.role}</p>
        <hr />
        <h3>Professional Summary</h3>
        <p>${resumeData.summary}</p>
        <h3>Experience</h3>
        ${resumeData.experience.map((exp: any) => `
          <div>
            <h4>${exp.company}</h4>
            <p>${exp.title} (${exp.period})</p>
            <p>${exp.points}</p>
          </div>
        `).join('')}
      </div>
    `;

    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(html);
    const pdf = await page.pdf({ format: 'A4', printBackground: true });
    await browser.close();

    return new NextResponse(Buffer.from(pdf), {
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
