import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { resumeData } = await req.json();

    // Use a static template approach to avoid React SSR dependency
    const html = `
      <div style="padding: 40px; font-family: sans-serif;">
        <h1 style="text-align: center;">${resumeData.name}</h1>
        <h2 style="text-align: center;">${resumeData.role}</h2>
        <p style="text-align: center;">${resumeData.email} | ${resumeData.phone} | ${resumeData.location}</p>
        <hr />
        <h3>Summary</h3>
        <p>${resumeData.summary}</p>
        <h3>Experience</h3>
        ${resumeData.experience.map((exp: any) => `
          <div style="margin-bottom: 15px;">
            <div style="display: flex; justify-content: space-between;">
              <strong>${exp.company}</strong>
              <span>${exp.period}</span>
            </div>
            <i>${exp.title}</i>
            <ul>${exp.points.split('\n').map((p: string) => `<li>${p}</li>`).join('')}</ul>
          </div>
        `).join('')}
      </div>
    `;
    
    const cssPath = path.join(process.cwd(), 'src/app/globals.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');

    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    
    await page.setContent(`
      <html>
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>${cssContent}</style>
        </head>
        <body class="p-8 bg-white">${html}</body>
      </html>
    `);

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
