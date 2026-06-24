const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    console.log("Iniciando Puppeteer...");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    const htmlPath = 'file:///' + path.join(__dirname, 'documentacion.html').replace(/\\/g, '/');
    console.log("Cargando página: ", htmlPath);
    await page.goto(htmlPath, { waitUntil: 'domcontentloaded', timeout: 60000 });
    
    // Dar un par de segundos para que Mermaid renderice los SVGs completamente
    console.log("Esperando renderizado de Mermaid...");
    await new Promise(resolve => setTimeout(resolve, 8000));
    
    const pdfPath = path.join(__dirname, 'Diagramas_CrystalCove.pdf');
    console.log("Generando PDF en: ", pdfPath);
    await page.pdf({ 
        path: pdfPath, 
        format: 'A4', 
        printBackground: true,
        margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' }
    });
    
    await browser.close();
    console.log("PDF generado exitosamente.");
})();
