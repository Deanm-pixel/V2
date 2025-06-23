const PDFDocument = require('pdfkit');
const fs = require('fs');

const exportCardsToPDF = (cards, filePath = 'export.pdf') => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  cards.forEach(card => {
    doc.addPage()
      .fontSize(16).text(card.title, { underline: true })
      .moveDown()
      .fontSize(12).text(card.content)
      .moveDown()
      .fontSize(10).text(`Tags: ${card.tags.join(', ')}`);
  });

  doc.end();
};

module.exports = { exportCardsToPDF };
