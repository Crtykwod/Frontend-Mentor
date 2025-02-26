import { billInput, form, numberInputs, peopleInput, resetButton, tipAmount, tipInputCustom, tipInputCustomRadio, tipInputRadio, totalAmount } from "./constants.js";
import { showErrorMessage } from "./form-handler.js";
import { formatCurrency, formatNumber } from "./formatting.js";

export const setupEventListeners = () => {

  billInput.addEventListener("input", () => formatCurrency(billInput));
  billInput.addEventListener("input", () => showErrorMessage(billInput));
  peopleInput.addEventListener("input", () => showErrorMessage(peopleInput));
  numberInputs.forEach((input) => input.addEventListener("input", () => formatNumber(input)));

  billInput.addEventListener("focus", () => {
      setTimeout(() => billInput.setSelectionRange(billInput.value.length, billInput.value.length), 0);
  });

  tipInputCustom.addEventListener("focus", () => {
    setTimeout(() => tipInputCustom.setSelectionRange(tipInputCustom.value.length, tipInputCustom.value.length), 0)
    tipInputCustomRadio.checked = true;
  });

  tipInputCustom.addEventListener("blur", () => {
    if (!tipInputCustom.value) return;
    if (!tipInputCustom.value.includes("%")) {
      tipInputCustom.value = tipInputCustom.value + "%";
    }
  });

  tipInputRadio.forEach((radio) => radio.addEventListener("click", () => {
    tipInputCustom.value = "";
  }));

  tipInputRadio.forEach((radio) => radio.addEventListener("keydown", (e) => {
    if (e.key === "Space") {
      e.preventDefault();
      tipInputCustom.focus();
    }
  }));

  resetButton.addEventListener("click", () => {
    form.reset();
    tipAmount.textContent = "0.00";
    totalAmount.textContent = "0.00";
    resetButton.innerHTML = "Form reseted!";
  });

  form.addEventListener("click", () => {
    if (resetButton.innerHTML === "Form reseted!") {
      resetButton.innerHTML = "Reset";
    };
  });
}
