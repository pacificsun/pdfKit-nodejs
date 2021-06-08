Date.prototype.addDays = function (days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date.toString().slice(0, 15);
};

let date = new Date();

const privacyPolicy = {
  title: "Terms and Conditions",
  headingOne: "FINANCE CHARGE",
  contentOne:
    "This contract is subject to credit approval and to a monthly FINANCE CHARGE. FINANCE CHARGES are computed on the previousbalance shown on the statement after deducting credits plus purchases and debits since the last billing date. PERIODIC FINANCERATE used is 1 1/2% per month on the unpaid balance. This constitutes an ANNUAL PERCENTAGE RATE of 18%. The minimummonthly finance charge is 50¢. If the total balance financed is paid within 90 days of the contract date, all FINANCE CHARGES canbe DEDUCTED before sending final payment.",
  headingTwo: "NOTICE TO BUYER",
  contentTwo: [
    "If I default by failing to pay the Minimum Amount Due when due on two occasions within any twelve-month period, and I do notcure the default within 15 days of written notice of default in accordance with applicable law, my entire balance may, at your option, become due and payable. Your waiver of any default shall not operate as a waiver of any other default.",
    "Any holder of this consumer credit contract is subject to all claims and defenses which the debtor could assert against the seller of goods or services obtained pursuant hereto or with the proceeds hereof. Recovery hereunder by the debtor shall not exceed amounts paid by the debtor hereunder.",
    "Do not sign this agreement before you read it or if it contains any blank space.",
    "You are entitled to a completed copy of this agreement. Keep this agreement to protect your legal rights.",
    "You have the right to pay in advance the full amount due and under certain conditions to obtain a partial refund of the time price differential.",
    "You, the buyer may cancel this transaction at any time prior to midnight of the third business day after the date of this transaction. See the notice of cancellation form for any explanation of this right.",
    "I understand and agree that there shall be no refunds of payments or any cancellations of this contract, unless I cancel prior to midnight of the third business day after the date of this transaction. I agree that should I fail to fulfill any of my obligations under this agreement, Home Health Education Service may declare the entire balance due and may proceed to enforce payment thereof, including to an attorney for collection. I understand all payments become necessary for a collector to call at my home regarding my account, there will be a $10.00 collection charge for each call. I further agree to pay a reasonable attorney fee and actual court costs should legal action become necessary to enforce payment.",
    "Any unpaid check returned by your bank will go directly to NexCheck for collection. You will need to contact them directly regarding the returned check and not Home Health Education Service. NexCheck will charge an additional fee for their collection services.",
    "When you provide a check as payment, you authorize us either to use information from your check to make a one-time electronic funds transfer from your account or to process the payment as a check transaction.",
    "I, the undersigned buyer, have read and understand the above terms and acknowledge receipt of this opened credit account agreement including duplicate copies of the notice of cancellation and have received verbal instruction regarding my right to cancel. NOTICE: See accompanying statement for important information regarding your rights to dispute billing errors.",
    "The Federal Equal Opportunity Act prohibits creditors from discriminating against credit applicants on the basis of sex or marital status. The Federal agency which administers compliance with this law concerning Home Health Education Service is Federal Trade Commission, Washington, DC 20580.",
  ],
  headingThree: "IN CASE OF ERRORS OR INQUIRIES ABOUT YOUR BILL",
  contentThree: [
    "The Federal Truth in Lending Act requires prompt correction of billing mistakes.",
    "If you want to preserve your rights under the Act, here is what to do if you think your bill is wrong or if you need more information about an item on your bill.",
    "a. Do not write on the bill. On a separate sheet of paper write (you may telephone your inquiry but doing so will not preserve your rights under this law) the following:",
    "(1) Your name and account number {if any}.",
    "(2) A description of the error and an explanation (to the extent you can explain) why you believe it is an error. If you only need  more information, explain the item you are not sure about and, if you wish, ask for evidence of the charge such as a copy of thecharge slip. Do not send in your copy of a sales slip or other document unless you have a duplicate copy for your records.",
    "(3) The dollar amount of the suspected error.",
    "(4) Any other information (such as your address) which you think will help the creditor to identify you or the reason for your complaint or inquiry.",
  ],
  contentFour: [
    "a. Send your billing error notice to:",
    "Home Health Education Service",
    "P.O. Box 2399",
    "Dalton, Georgia 30722-2399",
  ],
  contentFive: [
    "2. The creditor must acknowledge all letters pointing out possible errors within 30 days of receipt, unless the creditor is able to  correct your bill during that 30 days. Within 90 days after receiving your letter, the creditor must either correct the error or explain  why the creditor believes the bill was correct. Once the creditor has explained the bill; the creditor has no further obligation to you  even though you still believe that there is an error, except as provided in paragraph 5 below.",
    "3. After the creditor has been notified, neither the creditor nor an attorney nor a collection agency may send you collection letters or take other collection action with respect to the amount in dispute, but periodic statements may be sent to you and the disputed amount can be applied against your credit limit. You cannot be threatened with damage to your credit rating or sued for the amount in question, nor can the disputed amount be reported to a credit bureau or to other creditors as delinquent until the creditor has answered your inquiry. However, you remain obligated to pay the parts of your bill not in dispute.",
    "4. If it is determined that the creditor has made a mistake on your bill, you will not have to pay any finance charges on any disputed amount. If it turns out that the creditor has not made an error, you may have to pay finance changes on the amount in dispute, and you will have to make up any missed minimum or required payments on the disputed amount. Unless you have agreed that your bill was correct, the creditor must send you a written notification of what you owe; and if it is determined that the creditor did make a mistake in billing the disputed amount, you must be given the time to pay which you normally are given to pay undisputed amounts before any more finance charges or late payment charges on the disputed amount can be charged to you.",
    "5. If the creditor’s explanation does not satisfy you and you notify the creditor in writing within 10 days after you receive his explanation that you still refuse to pay the disputed amount, the creditor may report you to credit bureaus and other creditors and may pursue regular collection procedures. But the creditor must also report that you think you do not owe the money, and the  creditor must let you know to whom such reports were made. Once the matter has been settled between you and the creditor, the creditor must notify those to whom the creditor reported you as delinquent of the subsequent resolution.",
    "6. If the creditor does not follow these rules, the creditor is not allowed to collect the first $50 of the disputed amount and finance charges, even if the bill turns out to be correct.",
  ],
  headingFour: "NOTICE OF CANCELLATION",
  contentSix: [
    "You may cancel this transaction, without any penalty or obligation, within three business days from the above date.",
    "If you cancel, any property traded in, any payments made by you under the contract or sale, and any negotiable instrument executed by you will be returned within 10 business days following receipt by the seller of your cancellation notice, and any security interest arising out of the transaction will be cancelled.",
    "If you cancel, you must make available to the seller at your residence, in substantially as good condition as when received, any goods delivered to you under this contract or sale; or you may if you wish, com-ply with the instructions of the seller regarding the return shipment of the goods at the sellers expense and risk",
    "If you do make the goods available to the seller and the seller does not pick them up within 20 days of the date of your notice of cancellation, you may retain or dispose of the goods without any further obligation. If you fail to make the goods available to the  seller, or if you agree to return the goods to the seller and fail to do so, then you remain liable for performance of all obligations under the contract.",
    `To cancel this transaction, mail or deliver a signed and dated copy of this cancellation notice or any other written notice, to Home Health Education Service, P. 0. Box 2399, Dalton, Georgia 30722, not later than midnight of ${date.addDays(
      3
    )}.`,
  ],
};

module.exports = {
  privacyPolicy,
};
