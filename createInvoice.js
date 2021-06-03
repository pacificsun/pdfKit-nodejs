const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
  doc
    .image(path.join(__dirname, "/logo.png"), 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("Home Health Education Service", 110, 57)
    .fontSize(10)
    .text("P.O.BOX 2399", 200, 50, { align: "right" })
    .text("Dalton, GA 30722-2399", 200, 65, { align: "right" })
    .text("(404)299-1621", 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  // doc.fillColor("#444444").fontSize(20).text("Invoice", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Invoice Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice.invoice_nr, 150, customerInformationTop)
    .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text("Balance Due:", 50, customerInformationTop + 30)
    .text(
      formatCurrency(invoice.subtotal - invoice.paid),
      150,
      customerInformationTop + 30
    )

    .font("Helvetica-Bold")
    .text(invoice.shipping.name, 300, customerInformationTop)
    .font("Helvetica")
    .text(invoice.shipping.address, 300, customerInformationTop + 15)
    .text(
      invoice.shipping.city +
        ", " +
        invoice.shipping.state +
        ", " +
        invoice.shipping.country,
      300,
      customerInformationTop + 30
    )
    .moveDown();

  generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Item",
    "Description",
    "Unit Cost",
    "Quantity",
    "Line Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.item,
      item.description,
      formatCurrency(item.amount / item.quantity),
      item.quantity,
      formatCurrency(item.amount)
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    "",
    formatCurrency(invoice.subtotal)
  );

  const paidToDatePosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    paidToDatePosition,
    "",
    "",
    "Paid To Date",
    "",
    formatCurrency(invoice.paid)
  );

  const duePosition = paidToDatePosition + 25;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    duePosition,
    "",
    "",
    "Balance Due",
    "",
    formatCurrency(invoice.subtotal - invoice.paid)
  );
  doc.font("Helvetica");
}

function generateFooter(doc) {
  doc.image(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA7CAYAAAA5MNl5AAAD/klEQVRoQ9WaS8iOQRTHf18JC+xckkKuYSNyS6FkIZeN2xZFuUWUlXtCIZcoNiz1sXBZWCik3EJZoFzCghSRshGK/jWjaXre93meeW7znnr7Lu+cmf9/zpyZM+dMF3HIbkCfYOkK1ixHcS2wApgN3AbmhHbbJJGrwEIHeMcR0eyfA4Y5JC4Cy0KtIb26LXIPmO4A/gKsAh4C+j1Y6iKyGVhsfMGCfQJsM74RTMAqVk1kNHDGI6CxTwPrC6N3OqiSyFbgcALYlcD5MklU6SNXgEUe2OfAhrKWkj8RVVjkATDVG0hb6xbgadmWqMpHXgMjE0gEH3RZiZdlkUnAZWCIN/BZ4ADwPiug0HZlEFkKdCcA2FM0fspDqgwiN4C53qA6pXVa1yZFiWwETnhoa7VEGc6+A9jrkajkjMhi1lCL6O6wyxngKyBLnMwyaBVtQoiIxGpnh/oNKJZS2NGY5CWiHeoU0N9B3IhPFDnZdY+41fTu1MrkWS0iS8gnxpuOtLXaT2PLyR04KxH/rJgB3I+CgQGRhcgFYLkDuvbDLsuEpRHRxegOMNB0thPYl6XjutukEdkEHDegfgAjit6tqyKYRuQRMNkMHuWSyhKiyC/kH5K3wLRYrSGA7SyiM0NnhySKQ6/dsmxFRCf3Z0dxLPCyqvVdRr+tiKwzoYjGuAvMLGOwKvtoRaSjllU7H/nrzJ4SB8qCRC1JFvGDw7QtOgqCSSDdS1P0u1W7c+QVMMo0ULT7IoopTwHhW8RdVkpxTugEEknO/sy5cyhb3uj1Nc8kuhZR0lnJZ4mKLlpWhYoveYAUbesS0cGnC5Ok9PpFUaBp+paIQhIFhn2MwnzgeppyTN9bIguAaw6wwcCnmICmYbFEVB5b4/jHgDTF2L63RN455eKO8w+7/c7yYilVlo7FNuNpeGQR3z9UMj6Sphjb9yIi35CPWGkso15kckTkqClU2n6G11EqKwI6SVdE3LBEbaK/1rYi4t4GC73QKXuW8/QnizwGVJW1MgZQKN9RIiJvTAbRAldmUYWbjhIR0XsRvRuxopq4HL4J0X1oIrAE+GMeH/wyh7WWfU+gn1lF9r2X8HaLiPK5soordVxxFajqqcc8k5YdCijGC5FvNkRJegRzCNgPKHltRTOmGbAvGezfrjWTgNhSnQpG0tHPMuU/kV7Az4Se9QjmO9ADmGJMmwZAJFXl1QaiSeibpuB9L/3eBo9NQ2kZ6f8qc7RcWrYfv+Scc/zg5h8BVYb1ZkW7ZVAOzU8+HAS2B0PKp6gapCLtIOD+UEl5LZnxkne25IGoJeC+IJWuwGqZ6nGmao8f8nSYpW27LKLWuH2Xq8z8TWBQRmcfB+hy5m4MWfAEt/kHn7SnqO3agosAAAAASUVORK5CYII=",
    50,
    580,
    { width: 20 }
  );
  // .fontSize(10)
  // .text(
  //   "Payment is due within 15 days. Thank you for your business.",
  //   50,
  //   780,
  //   { align: "center", width: 500 }
  // );
}

function generateTableRow(
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatCurrency(cents) {
  return "$" + (cents / 100).toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

module.exports = {
  createInvoice,
};
