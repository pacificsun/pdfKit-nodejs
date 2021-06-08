const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const privacyPolicy = require("./privacy-policy");

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ autoFirstPage: false });
  doc.addPage();
  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateBillingTable(doc, invoice);
  generateFooter(doc);
  generatePrivacyPolicy(doc, privacyPolicy);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
  doc
    .image(path.join(__dirname, "/logo.png"), 50, 45, { width: 179 })
    .fillColor("#444444")
    .fontSize(8)
    .fillColor("#8F939C")
    .text("Home Health Education Service", 200, 50, {
      align: "right",
    })
    .text("P.O.BOX 2399", 8, 65, { align: "right" })
    .text("Dalton, GA 30722-2399", 200, 80, {
      align: "right",
    })
    .text("(404)299-1621", 200, 95, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  generateHr(doc, 130);

  const customerInformationTop = 145;

  doc.fontSize(8).text("Invoice#", 50, customerInformationTop);
  generateVerticalHr(doc, 140, 130, 185);
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
    .text("Payment Date", 460, customerInformationTop)
    .font("Helvetica-Bold")
    .fillColor("#333")
    .text("11/30/2020", 460, customerInformationTop + 15);

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
  generateHr(doc, 185);
}

function getTotalInfo(doc, key, value) {
  doc
    .fontSize(8)
    .text(key, 420, doc.y)
    .text(value, 500, doc.y - 11, { align: "right" });

  doc.moveDown(1);
}

function generateInvoiceTable(doc, invoice) {
  let i;
  doc
    .font("Helvetica-Bold")
    .fontSize(14)
    .fillColor("#333")
    .text("Order Details", 50, 210);

  doc.moveDown(1);
  doc.font("Helvetica-Bold");

  doc.fontSize(10).text("Products", 50, doc.y);
  doc.fontSize(10).text("Quantity", 50, doc.y - 13, { align: "right" });
  doc.moveDown(2);

  generateHr(doc, doc.y - 15);
  doc.font("Helvetica");

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    if (doc.y > 650) {
      doc.addPage();
    }
    generateTableRow(doc, item.item, item.quantity);
    doc.moveDown();

    generateHr(doc, doc.y - 15);
  }

  if (doc.y > 650) {
    doc.addPage();
  }
  doc.moveDown();

  if (doc.y > 650) {
    doc.addPage();
  }

  getTotalInfo(doc, "Subtotal", "$445");
  getTotalInfo(doc, "Shipping", "$44");
  getTotalInfo(doc, "Taxes", "$48");
  getTotalInfo(doc, "Total", "538");

  doc.moveDown(2);
  doc.font("Helvetica");
}

const generateBillingTable = (doc, invoice) => {
  if (doc.y > 650) {
    doc.addPage();
  }
  generateHr(doc, doc.y - 15);

  generateVerticalHr(doc, 50, doc.y - 15, doc.y + 84);

  doc
    .fontSize(8)
    .fillColor("#8F939C")
    .font("Helvetica-Bold")
    .text("Billing Address", 65);

  doc
    .font("Helvetica")
    .fontSize(9)
    .fillColor("#333")
    .text(invoice.shipping.name, 65)
    .text(invoice.shipping.address, 65)
    .text(
      invoice.shipping.city +
        ", " +
        invoice.shipping.state +
        ", " +
        invoice.shipping.country,
      65
    )
    .fontSize(8)
    .fillColor("#8F939C")
    .font("Helvetica-Bold")
    .moveUp(4)
    .text("Method", 230)
    .font("Helvetica")
    .fontSize(9)
    .fillColor("#333")
    .text("Credit/Debit", 230)
    .fontSize(8)
    .fillColor("#8F939C")
    .font("Helvetica-Bold")
    .text("Recurring Payment", 230)
    .font("Helvetica")
    .fontSize(9)
    .fillColor("#333")
    .text("$30.00", 230)
    .fontSize(8)
    .fillColor("#8F939C")
    .font("Helvetica-Bold")
    .text("Number of Payments", 230)
    .font("Helvetica")
    .fontSize(9)
    .fillColor("#333")
    .text("12", 230);

  doc
    .fontSize(8)
    .fillColor("#8F939C")
    .font("Helvetica-Bold")
    .moveUp(6)
    .text("Payment", 400)
    .font("Helvetica")
    .fontSize(9)
    .fillColor("#333")
    .text(invoice.subtotal, 400)
    .fontSize(8)
    .fillColor("#8F939C")
    .font("Helvetica-Bold")
    .text("First Payment Date", 400)
    .font("Helvetica")
    .fontSize(9)
    .fillColor("#333")
    .text("7/15/2021", 400)
    .fontSize(8)
    .fillColor("#8F939C")
    .font("Helvetica-Bold")
    .text("Representative", 400)
    .font("Helvetica")
    .fontSize(9)
    .fillColor("#333")
    .text("2344 Tad Stauffer", 400);

  generateVerticalHr(doc, 550, doc.y - 81, doc.y + 20);

  generateHr(doc, doc.y + 20);
};

function generateFooter(doc) {
  if (doc.y > 650) {
    doc.addPage();
  }
  doc.moveDown(3);
  doc
    .fontSize(12)
    .fillColor("#333")
    .font("Helvetica-Bold")
    .text("Finance Agreement", 50)
    .fontSize(8)
    .font("Helvetica")
    .moveDown(1)
    .text(
      "I agree to the cancellation policy included on the following pages.",
      50
    );

  doc.moveDown(2);
  doc.image(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA7CAYAAAA5MNl5AAAD/klEQVRoQ9WaS8iOQRTHf18JC+xckkKuYSNyS6FkIZeN2xZFuUWUlXtCIZcoNiz1sXBZWCik3EJZoFzCghSRshGK/jWjaXre93meeW7znnr7Lu+cmf9/zpyZM+dMF3HIbkCfYOkK1ixHcS2wApgN3AbmhHbbJJGrwEIHeMcR0eyfA4Y5JC4Cy0KtIb26LXIPmO4A/gKsAh4C+j1Y6iKyGVhsfMGCfQJsM74RTMAqVk1kNHDGI6CxTwPrC6N3OqiSyFbgcALYlcD5MklU6SNXgEUe2OfAhrKWkj8RVVjkATDVG0hb6xbgadmWqMpHXgMjE0gEH3RZiZdlkUnAZWCIN/BZ4ADwPiug0HZlEFkKdCcA2FM0fspDqgwiN4C53qA6pXVa1yZFiWwETnhoa7VEGc6+A9jrkajkjMhi1lCL6O6wyxngKyBLnMwyaBVtQoiIxGpnh/oNKJZS2NGY5CWiHeoU0N9B3IhPFDnZdY+41fTu1MrkWS0iS8gnxpuOtLXaT2PLyR04KxH/rJgB3I+CgQGRhcgFYLkDuvbDLsuEpRHRxegOMNB0thPYl6XjutukEdkEHDegfgAjit6tqyKYRuQRMNkMHuWSyhKiyC/kH5K3wLRYrSGA7SyiM0NnhySKQ6/dsmxFRCf3Z0dxLPCyqvVdRr+tiKwzoYjGuAvMLGOwKvtoRaSjllU7H/nrzJ4SB8qCRC1JFvGDw7QtOgqCSSDdS1P0u1W7c+QVMMo0ULT7IoopTwHhW8RdVkpxTugEEknO/sy5cyhb3uj1Nc8kuhZR0lnJZ4mKLlpWhYoveYAUbesS0cGnC5Ok9PpFUaBp+paIQhIFhn2MwnzgeppyTN9bIguAaw6wwcCnmICmYbFEVB5b4/jHgDTF2L63RN455eKO8w+7/c7yYilVlo7FNuNpeGQR3z9UMj6Sphjb9yIi35CPWGkso15kckTkqClU2n6G11EqKwI6SVdE3LBEbaK/1rYi4t4GC73QKXuW8/QnizwGVJW1MgZQKN9RIiJvTAbRAldmUYWbjhIR0XsRvRuxopq4HL4J0X1oIrAE+GMeH/wyh7WWfU+gn1lF9r2X8HaLiPK5soordVxxFajqqcc8k5YdCijGC5FvNkRJegRzCNgPKHltRTOmGbAvGezfrjWTgNhSnQpG0tHPMuU/kV7Az4Se9QjmO9ADmGJMmwZAJFXl1QaiSeibpuB9L/3eBo9NQ2kZ6f8qc7RcWrYfv+Scc/zg5h8BVYb1ZkW7ZVAOzU8+HAS2B0PKp6gapCLtIOD+UEl5LZnxkne25IGoJeC+IJWuwGqZ6nGmao8f8nSYpW27LKLWuH2Xq8z8TWBQRmcfB+hy5m4MWfAEt/kHn7SnqO3agosAAAAASUVORK5CYII=",
    50,
    doc.y,
    { width: 20 }
  );

  doc.moveDown(1);

  generateHr(doc, doc.y);

  doc
    .fontSize(8)
    .moveDown(1)
    .font("Helvetica")
    .text("Thank you for your order!", 50);
}

function getTermsContent(doc, data) {
  doc.font("Helvetica").fontSize(9).fillColor("#333").text(data, 50);
  doc.moveDown();
}

function getTermsHeading(doc, data) {
  doc.font("Helvetica-Bold").fontSize(9).fillColor("#333").text(data, 50);
  doc.moveDown();
}

function generatePrivacyPolicy(doc, { privacyPolicy }) {
  doc
    .addPage()
    .fontSize(18)
    .font("Helvetica-Bold")
    .fillColor("#333")
    .text(privacyPolicy.title, 0, 50, { align: "center" })
    .fontSize(9)
    .text(privacyPolicy.headingOne, 50, 85)
    .font("Helvetica")
    .fontSize(9)
    .text(privacyPolicy.contentOne, 50, 105);

  doc.moveDown();

  getTermsHeading(doc, privacyPolicy.headingTwo);

  for (let i = 0; i < privacyPolicy.contentTwo.length; i++) {
    getTermsContent(doc, privacyPolicy.contentTwo[i]);
  }

  getTermsHeading(doc, privacyPolicy.headingThree);

  for (let i = 0; i < privacyPolicy.contentThree.length; i++) {
    getTermsContent(doc, privacyPolicy.contentThree[i]);
  }

  doc.moveDown();

  for (let i = 0; i < privacyPolicy.contentFour.length; i++) {
    getTermsContent(doc, privacyPolicy.contentFour[i]);
  }

  doc.moveDown();

  for (let i = 0; i < privacyPolicy.contentFive.length; i++) {
    getTermsContent(doc, privacyPolicy.contentFive[i]);
  }

  getTermsHeading(doc, privacyPolicy.headingFour);

  for (let i = 0; i < privacyPolicy.contentSix.length; i++) {
    getTermsContent(doc, privacyPolicy.contentSix[i]);
  }
}

function generateTableRow(doc, item, middle, quantity) {
  doc.fontSize(8).text(item, 50);
  doc.fontSize(8).moveUp(1).text(middle, { align: "right" });
  doc.fontSize(8).moveUp(2).text(quantity, { align: "right" });
  doc.moveDown(3);
  // .text(quantity, 370,{ width: 90, align: "right" })
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

  return month + "/" + day + "/" + year;
}

module.exports = {
  createInvoice,
};
