export const formatAmountForStripe = (amount, currency) => {
  let numberFormat = new Intl.NumberFormat("en-bd", {
    style: "currency",
    currency,
    currencyDisplay: "symbol",
  });

  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency = true;
  for (const part of parts) {
    if (part.type === "decimal") {
      zeroDecimalCurrency = false;
    }
  }

  return zeroDecimalCurrency ? amount : Math.round(amount * 100);
};
