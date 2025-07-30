import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { generateGammaHTML } from '../../../lib/templates/niche-templates';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename') || 'ebook-grana-pdf.pdf';
    const content = searchParams.get('content');
    const title = searchParams.get('title') || 'Ebook Grana PDF';
    const niche = searchParams.get('niche') || 'business';
    const subtitle = searchParams.get('subtitle') || undefined;

    // Se não há conteúdo, retornar PDF básico
    if (!content) {
      const basicHTML = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Grana PDF - Ebook Gerado</title>
            <style>
                body {
                    font-family: 'Inter', sans-serif;
                    line-height: 1.6;
                    color: #1a1a1a;
                    background: #ffffff;
                    padding: 2rem;
                    text-align: center;
                }
                h1 { color: #667eea; font-size: 2rem; margin-bottom: 1rem; }
                p { color: #4a5568; margin-bottom: 1rem; }
            </style>
        </head>
        <body>
            <h1>Grana PDF - Ebook Gerado</h1>
            <p>Conteúdo personalizado por IA</p>
            <p>Este ebook foi gerado automaticamente pela inteligência artificial.</p>
            <p>Para mais informações, visite: granapdf.com</p>
        </body>
        </html>
      `;

      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      const page = await browser.newPage();
      await page.setContent(basicHTML, { waitUntil: 'networkidle0' });
      
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '1cm',
          right: '1cm',
          bottom: '1cm',
          left: '1cm'
        }
      });

      await browser.close();

      return new NextResponse(pdfBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${filename}"`,
          'Content-Length': pdfBuffer.length.toString(),
        },
      });
    }

    // Gerar HTML com template Gamma
    const htmlContent = generateGammaHTML(title, content, niche, subtitle);

    // Inicializar Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();
    
    // Configurar viewport
    await page.setViewport({
      width: 1200,
      height: 800,
      deviceScaleFactor: 2
    });

    // Definir user agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    // Carregar HTML
    await page.setContent(htmlContent, { 
      waitUntil: ['networkidle0', 'domcontentloaded'] 
    });

    // Aguardar carregamento das fontes
    await page.evaluateHandle('document.fonts.ready');

    // Gerar PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: '1.5cm',
        right: '1.5cm',
        bottom: '1.5cm',
        left: '1.5cm'
      },
      displayHeaderFooter: false
    });

    await browser.close();

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });

  } catch (error) {
    console.error('Erro na geração do PDF com Puppeteer:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao gerar PDF' 
      },
      { status: 500 }
    );
  }
} 