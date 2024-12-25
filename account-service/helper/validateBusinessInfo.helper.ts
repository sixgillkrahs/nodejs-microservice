const validateBusinessName = (businessName: string) => {
  // Merchant name must contain at least 5 alphabetic character and maximum 50 any character except special character
  const regex = /^(?=(.*[a-zA-Z\u00C0-\u1EF9\u1EFB-\u1F00]){5})[a-zA-Z0-9\u00C0-\u1EF9\u1EFB-\u1F00 ]{1,50}$/;
  return businessName ? regex.test(businessName) : false;
};

export { validateBusinessName };
