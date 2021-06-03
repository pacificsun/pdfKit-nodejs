const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateBillingTable(doc, invoice);
  generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
  doc
    .image(path.join(__dirname, "/logo.png"), 50, 45, { width: 179 })
    .fillColor("#444444")
    .fontSize(10)
    .fillColor("#8F939C")
    .text("Home Health Education Service", 200, 50, {
      align: "right",
    })
    .text("P.O.BOX 2399", 10, 65, { align: "right" })
    .text("Dalton, GA 30722-2399", 200, 80, {
      align: "right",
    })
    .text("(404)299-1621", 200, 95, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  // doc.fillColor("#444444").fontSize(20).text("Invoice", 50, 160);

  generateHr(doc, 145);

  const customerInformationTop = 160;

  doc.fontSize(10).text("Invoice#", 50, customerInformationTop);
  generateVerticalHr(doc, 140, 145, 200);
  doc
    .font("Helvetica-Bold")
    .fillColor("#333")
    .text(invoice.invoice_nr, 50, customerInformationTop + 15)
    .font("Helvetica")
    .fillColor("#8F939C")
    .text("Order Date:", 180, customerInformationTop)
    .font("Helvetica-Bold")
    .fillColor("#333")
    .text(formatDate(new Date()), 180, customerInformationTop + 15)
    .font("Helvetica")
    .fillColor("#8F939C")
    .text("Down Payment:", 320, customerInformationTop)
    .font("Helvetica-Bold")
    .fillColor("#333")
    .text(
      formatCurrency(invoice.subtotal - invoice.paid),
      320,
      customerInformationTop + 15
    )
    .font("Helvetica")
    .fillColor("#8F939C")
    .text("Payment Date", 480, customerInformationTop)
    .font("Helvetica-Bold")
    .fillColor("#333")
    .text("11/30/2020", 480, customerInformationTop + 15)

    // .font("Helvetica-Bold")
    // .text(invoice.shipping.name, 200, customerInformationTop)
    // .font("Helvetica")
    // .text(invoice.shipping.address, 200, customerInformationTop + 15)
    // .text(
    //   invoice.shipping.city +
    //     ", " +
    //     invoice.shipping.state +
    //     ", " +
    //     invoice.shipping.country,
    //   350,
    //   customerInformationTop + 30
    // )
    .moveDown();

  generateHr(doc, 200);
}
let paymentDetailsPosition;
function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 260;

  doc
    .font("Helvetica-Bold")
    .fontSize(14)
    .fillColor("#333")
    .text("Order Details", 50, 230);

  doc.font("Helvetica-Bold");
  generateTableRow(doc, invoiceTableTop, "Products", "", "", "", "Quantity");
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(doc, position, item.item, "", "", "", item.quantity);

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

  const shippingPosition = subtotalPosition + 25;
  const taxesPosition = shippingPosition + 25;
  const duePosition = taxesPosition + 25;
  paymentDetailsPosition = duePosition + 40;
  doc.font("Helvetica");
  generateTableRow(
    doc,
    taxesPosition,
    "",
    "",
    "Taxes",
    "",
    formatCurrency(invoice.subtotal - invoice.paid)
  );
  generateTableRow(
    doc,
    shippingPosition,
    "",
    "",
    "Shipping",
    "",
    formatCurrency(invoice.subtotal - invoice.paid)
  );
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

let footerPosition;

const generateBillingTable = (doc, invoice) => {
  generateHr(doc, paymentDetailsPosition);

  generateVerticalHr(
    doc,
    50,
    paymentDetailsPosition,
    paymentDetailsPosition + 125
  );

  doc
    .fontSize(10)
    .fillColor("#8F939C")
    .font("Helvetica-Bold")
    .text("Billing Address", 65, paymentDetailsPosition + 15)
    .font("Helvetica")
    .fontSize(11)
    .fillColor("#333")
    .text(invoice.shipping.name, 65, paymentDetailsPosition + 35)
    .text(invoice.shipping.address, 65, paymentDetailsPosition + 50)
    .text(
      invoice.shipping.city +
        ", " +
        invoice.shipping.state +
        ", " +
        invoice.shipping.country,
      65,
      paymentDetailsPosition + 65
    );

  generateVerticalHr(
    doc,
    215,
    paymentDetailsPosition,
    paymentDetailsPosition + 125
  );

  doc
    .fontSize(10)
    .fillColor("#8F939C")
    .font("Helvetica-Bold")
    .text("Method", 230, paymentDetailsPosition + 15)
    .font("Helvetica")
    .fontSize(11)
    .fillColor("#333")
    .text("Credit/Debit", 230, paymentDetailsPosition + 30)
    .fontSize(10)
    .fillColor("#8F939C")
    .font("Helvetica-Bold")
    .text("Recurring Payment", 230, paymentDetailsPosition + 50)
    .font("Helvetica")
    .fontSize(11)
    .fillColor("#333")
    .text("$30.00", 230, paymentDetailsPosition + 65)
    .fontSize(10)
    .fillColor("#8F939C")
    .font("Helvetica-Bold")
    .text("Number of Payments", 230, paymentDetailsPosition + 85)
    .font("Helvetica")
    .fontSize(11)
    .fillColor("#333")
    .text("12", 230, paymentDetailsPosition + 100);

  generateVerticalHr(
    doc,
    385,
    paymentDetailsPosition,
    paymentDetailsPosition + 125
  );

  doc
    .fontSize(10)
    .fillColor("#8F939C")
    .font("Helvetica-Bold")
    .text("Payment", 400, paymentDetailsPosition + 15)
    .font("Helvetica")
    .fontSize(11)
    .fillColor("#333")
    .text(invoice.subtotal, 400, paymentDetailsPosition + 30)
    .fontSize(10)
    .fillColor("#8F939C")
    .font("Helvetica-Bold")
    .text("First Payment Date", 400, paymentDetailsPosition + 50)
    .font("Helvetica")
    .fontSize(11)
    .fillColor("#333")
    .text("7/15/2021", 400, paymentDetailsPosition + 65)
    .fontSize(10)
    .fillColor("#8F939C")
    .font("Helvetica-Bold")
    .text("Representative", 400, paymentDetailsPosition + 85)
    .font("Helvetica")
    .fontSize(11)
    .fillColor("#333")
    .text("2344 Tad Stauffer", 400, paymentDetailsPosition + 100);

  generateVerticalHr(
    doc,
    550,
    paymentDetailsPosition,
    paymentDetailsPosition + 125
  );
  generateHr(doc, paymentDetailsPosition + 125);

  footerPosition = paymentDetailsPosition + 165;
};

function generateFooter(doc) {
  doc
    .fontSize(12)
    .fillColor("#333")
    .font("Helvetica-Bold")
    .text("Finance Agreement", 50, footerPosition)
    .fontSize(10)
    .font("Helvetica")
    .text(
      "I agree to the cancellation policy included on the following pages.",
      50,
      footerPosition + 16
    );

  doc.image(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA7CAYAAAA5MNl5AAAD/klEQVRoQ9WaS8iOQRTHf18JC+xckkKuYSNyS6FkIZeN2xZFuUWUlXtCIZcoNiz1sXBZWCik3EJZoFzCghSRshGK/jWjaXre93meeW7znnr7Lu+cmf9/zpyZM+dMF3HIbkCfYOkK1ixHcS2wApgN3AbmhHbbJJGrwEIHeMcR0eyfA4Y5JC4Cy0KtIb26LXIPmO4A/gKsAh4C+j1Y6iKyGVhsfMGCfQJsM74RTMAqVk1kNHDGI6CxTwPrC6N3OqiSyFbgcALYlcD5MklU6SNXgEUe2OfAhrKWkj8RVVjkATDVG0hb6xbgadmWqMpHXgMjE0gEH3RZiZdlkUnAZWCIN/BZ4ADwPiug0HZlEFkKdCcA2FM0fspDqgwiN4C53qA6pXVa1yZFiWwETnhoa7VEGc6+A9jrkajkjMhi1lCL6O6wyxngKyBLnMwyaBVtQoiIxGpnh/oNKJZS2NGY5CWiHeoU0N9B3IhPFDnZdY+41fTu1MrkWS0iS8gnxpuOtLXaT2PLyR04KxH/rJgB3I+CgQGRhcgFYLkDuvbDLsuEpRHRxegOMNB0thPYl6XjutukEdkEHDegfgAjit6tqyKYRuQRMNkMHuWSyhKiyC/kH5K3wLRYrSGA7SyiM0NnhySKQ6/dsmxFRCf3Z0dxLPCyqvVdRr+tiKwzoYjGuAvMLGOwKvtoRaSjllU7H/nrzJ4SB8qCRC1JFvGDw7QtOgqCSSDdS1P0u1W7c+QVMMo0ULT7IoopTwHhW8RdVkpxTugEEknO/sy5cyhb3uj1Nc8kuhZR0lnJZ4mKLlpWhYoveYAUbesS0cGnC5Ok9PpFUaBp+paIQhIFhn2MwnzgeppyTN9bIguAaw6wwcCnmICmYbFEVB5b4/jHgDTF2L63RN455eKO8w+7/c7yYilVlo7FNuNpeGQR3z9UMj6Sphjb9yIi35CPWGkso15kckTkqClU2n6G11EqKwI6SVdE3LBEbaK/1rYi4t4GC73QKXuW8/QnizwGVJW1MgZQKN9RIiJvTAbRAldmUYWbjhIR0XsRvRuxopq4HL4J0X1oIrAE+GMeH/wyh7WWfU+gn1lF9r2X8HaLiPK5soordVxxFajqqcc8k5YdCijGC5FvNkRJegRzCNgPKHltRTOmGbAvGezfrjWTgNhSnQpG0tHPMuU/kV7Az4Se9QjmO9ADmGJMmwZAJFXl1QaiSeibpuB9L/3eBo9NQ2kZ6f8qc7RcWrYfv+Scc/zg5h8BVYb1ZkW7ZVAOzU8+HAS2B0PKp6gapCLtIOD+UEl5LZnxkne25IGoJeC+IJWuwGqZ6nGmao8f8nSYpW27LKLWuH2Xq8z8TWBQRmcfB+hy5m4MWfAEt/kHn7SnqO3agosAAAAASUVORK5CYII=",
    50,
    footerPosition + 36,
    { width: 20 }
  );

  generateHr(doc, footerPosition + 80);

  doc
    .fontSize(10)
    .font("Helvetica")
    .text("Thank you for your order!", 50, footerPosition + 95);

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
  doc.strokeColor("#DFEBFF").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function generateVerticalHr(doc, x, y1, y2) {
  doc.strokeColor("#DFEBFF").lineWidth(1).moveTo(x, y1).lineTo(x, y2).stroke();
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
