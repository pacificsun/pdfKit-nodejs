const { createInvoice } = require("./createInvoice.js");

const invoice = {
  shipping: {
    name: "John Doe",
    address: "1234 Main Street",
    city: "San Francisco",
    state: "CA",
    country: "US",
    postal_code: 94111,
  },
  items: [
    {
      item: "TC 100",
      description: "Toner Cartridge",
      quantity: 2,
      amount: 6000,
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000,
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000,
    },
  ],
  subtotal: 8000,
  paid: 0,
  invoice_nr: 1234,
};

const payment = {
  id: "60",
  downpayment_method: "Cash",
  dp_date: "2021-06-02T18:15:00.000Z",
  invoice: "TT-IYM108Q",
  payment_type: "Installment",
  dp_amount: 96.0,
  pay_deposit_later: null,
  cash_contract: true,
  arb_payment_method: null,
  arb_start: null,
  card_holdername: "",
  processing_date: "2021-07-13T18:15:00.000Z",
  order_total_after_dp: null,
  cc_dp: true,
  credit_card_purpose: "",
  dp_control: false,
  overide_dp: false,
  financed_amount: 543,
  installments: 43,
  installment_control: true,
  number_ofpayment: 13,
  arb: false,
  cash_recieved: false,
  prefered_customer: false,
  sub_total: 545,
  tax_exempt: false,
  tx_ex_value: 0,
  taxable_sales: null,
  sales_tax_rate: 0.08,
  sales_tax: 49,
  shipping_rate: 0,
  shipping: 45,
  adjustment: 0,
  adjusted_order_total: null,
  grand_total: 639,
  hhes_paid: "Unpaid",
  sent_to_hhes: null,
  for_pipe: null,
};

const contract = {
  id: "47",
  date_submitted: "2021-06-03T06:03:13.000Z",
  le_id: 5092,
  order_id: null,
  ship_to_billing: true,
  bill_first: "Test",
  bill_last: "Test",
  bill_name: "Test Test",
  bill_home_phone: "(898) 989-8989",
  bill_cell_phone: "",
  bill_address_search: null,
  bill_street_number: null,
  bill_apt: null,
  bill_addone: "3790 South Las Vegas Boulevard",
  bill_addtwo: "",
  bill_city: "Las Vegas",
  bill_state: "NV",
  bill_zip: "89109",
  email: "",
  email_control: null,
  no_email: true,
  e_statement: false,
  ship_first: "Test",
  ship_last: "Test",
  ship_full_name: "Test Test",
  ship_phone: "(898) 989-8989",
  ship_address_search: null,
  ship_apt: null,
  ship_street_number: null,
  ship_street_name: null,
  ship_addone: "3790 South Las Vegas Boulevard",
  ship_addtwo: "",
  ship_city: "Las Vegas",
  ship_state: "NV",
  ship_zip: "89109",
  addinstruction_control: false,
  addinstruction_note: "",
  customer_signature: "/image.png",
  customer_signdate: "2021-06-02T18:15:00.000Z",
  le_signature: "/image2.png",
  le_signdate: "2021-06-02T18:15:00.000Z",
  customer_contract: null,
  invoice_url: null,
  accept_fincharge: true,
  accept_noticebuyer: true,
  accept_noticecancel: true,
  agree_terms: true,
  emp_id: "60",
  payment_id: "60",
  for_pipe: null,
};

const orderes = [
  {
    id: "219",
    lfuuid: "5b9be717-0657-411e-ab59-80b4c7e69689",
    invid: "0210",
    library_id: "8002",
    item_qty: 1,
    book_title: "Children's Century Classics - 7 vols",
    rs: false,
    repl: false,
    no_repl: false,
    unit_price: 230,
    library_price: 0,
    row_id: 1,
    ship_type: "SHIPTOCUSTOMER",
    seventy_five: 0,
    seventyfive_min_control: false,
    other: false,
    econtract_id: "47",
    ship_to_other: false,
  },
  {
    id: "220",
    lfuuid: "08a138d0-af53-4ab9-ab9e-6bbc480cf08f",
    invid: "0215",
    library_id: "8002",
    item_qty: 1,
    book_title: "Bible Reference Classics - 5 vols (hardcover)",
    rs: false,
    repl: false,
    no_repl: false,
    unit_price: 150,
    library_price: 0,
    row_id: 2,
    ship_type: "SHIPTOCUSTOMER",
    seventy_five: 0,
    seventyfive_min_control: false,
    other: false,
    econtract_id: "47",
    ship_to_other: false,
  },
  {
    id: "221",
    lfuuid: "b0643147-1f01-4078-86a9-16b9c056aff2",
    invid: "0310",
    library_id: "8002",
    item_qty: 1,
    book_title: "Miss Brenda's Bedtime Stories - 5 vols",
    rs: false,
    repl: false,
    no_repl: false,
    unit_price: 100,
    library_price: 0,
    row_id: 3,
    ship_type: "SHIPTOCUSTOMER",
    seventy_five: 0,
    seventyfive_min_control: false,
    other: false,
    econtract_id: "47",
    ship_to_other: false,
  },
];

// createInvoice(payment,contract,orderes, "invoice.pdf");
createInvoice(invoice, "invoice.pdf");
