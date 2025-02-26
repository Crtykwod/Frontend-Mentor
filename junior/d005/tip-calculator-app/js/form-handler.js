import { billInput, form, peopleInput, tipAmount, tipInputCustom, tipInputCustomRadio, tipInputRadio, totalAmount } from "./constants.js";
import { validateBill, validatePeople } from "./validation.js";
import { formatters, calculations, debounce } from "./utils.js";

export const showErrorMessage = (input) => {
  const validation = input === billInput ? validateBill(input) : validatePeople(input);
  
  if (validation.isValid) {
    let errorMessage = input.parentNode.querySelector(".error-message");
    if (errorMessage) {
      input.parentNode.removeChild(errorMessage);
      input.classList.remove("error");
    }
    return;
  }

  let errorMessage = document.createElement("span");
  errorMessage.classList.add("error-message");
  errorMessage.textContent = validation.errorMessage;

  input.parentNode.style.position = "relative";
  input.parentNode.appendChild(errorMessage);
  input.classList.add("error");
}

const getTipValue = () => {
  if (tipInputCustomRadio.checked) {
    return Number(tipInputCustom.value.replace("%", "")) / 100;
  }
  
  const checkedRadio = [...tipInputRadio].find(radio => radio.checked);
  return checkedRadio ? Number(checkedRadio.value) / 100 : 0;
}

export const handleSubmit = () => {
  const calculateResults = debounce(() => {
    const bill = Number(billInput.value.replace(/,/g, ''));
    const people = Number(peopleInput.value);
    const tip = getTipValue();

    if (people < 1) return;

    const tipAmountValue = calculations.tipAmount(bill, people, tip);
    const totalAmountValue = calculations.totalPerPerson(bill, people, tip);

    tipAmount.textContent = formatters.currency(tipAmountValue);
    totalAmount.textContent = formatters.currency(totalAmountValue);
  }, 150);

  form.addEventListener("input", calculateResults);
};