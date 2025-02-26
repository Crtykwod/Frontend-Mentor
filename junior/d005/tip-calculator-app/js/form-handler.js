import { billInput, form, peopleInput, tipAmount, tipInputCustom, tipInputCustomRadio, tipInputRadio, totalAmount } from "./constants.js";
import { formatCurrency } from "./formatting.js";

export const showErrorMessage = (input) => {
  if (input.value < 1 || !input) {
    input.classList.add("error");
  }
  input.addEventListener("input", () => input.classList.remove("error"));
}

const getTipValue = () => {
  if (tipInputCustomRadio.checked) {
    return Number(tipInputCustom.value.replace("%", "")) / 100;
  }
  
  const checkedRadio = [...tipInputRadio].find(radio => radio.checked);
  return checkedRadio ? Number(checkedRadio.value) / 100 : 0;
}

export const handleSubmit = () => {
  form.addEventListener("input", () => {
    const bill = formatCurrency(billInput);
    const people = Number(peopleInput.value);
    const tip = getTipValue();
    let tipAmountValue = 0;
    let totalAmountValue = 0;

    if (people < 1) return;

    totalAmountValue = Number((bill / people).toFixed(2));

    if (tip) {
      totalAmountValue *= (1 + tip);
      tipAmountValue = Number(((bill * tip) / people).toFixed(2));
    }

    tipAmount.textContent = formatCurrency(tipAmountValue) || "0,00";
    totalAmount.textContent = formatCurrency(totalAmountValue) || "0,00";

    console.log(bill, people, tip, totalAmountValue, tipAmountValue);
  });
};