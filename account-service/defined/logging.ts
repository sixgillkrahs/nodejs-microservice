export const LOG_IGNORE_FIELDS = ["password", "data.qrCode"];

export const LOG_MASKING_FIELDS = [
  {
    fields: ["cardNumber"],
    maskType: "BANK_CARD"
  }
];
