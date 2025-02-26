export const formatCurrency = (input) => {
  const locale = navigator.language || "pt-BR";

  if (typeof input === 'number') {
    return input.toLocaleString(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  let value = input.value.replace(/\D/g, "");
  const numericValue = value;

  if (value === "") {
    input.value = "0.00";
    return numericValue/100;
  }

  input.value = (numericValue / 100).toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  
  return numericValue/100;
}


export const formatNumber = (input) => {
  let value = input.value.replace(/\D/g, "");
  return input.value = value;
}