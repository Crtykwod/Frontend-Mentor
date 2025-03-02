import { form, generateButton, lengthSlider, strengths, copyButton, setLengthValue, passwordDisplay, copyStatusMessage } from "./constants.js";
import { handlePasswordGeneration, runSliderAnimation, setLengthValueDisplay, changeGenerateButtonState } from "./ui-utils.js";
import { updateStrengthDisplay, calculateStrength } from "./password-strength.js";
import { createNotification } from "./notification.js";

export const setupEventsListeners = () => {
  window.addEventListener("load", () => setLengthValue(lengthSlider.value));

  form.addEventListener("submit", (e) => e.preventDefault());
  
  generateButton.addEventListener("click", handlePasswordGeneration);
  
  lengthSlider.addEventListener("input", () => {
    setLengthValue(lengthSlider.value);
    setLengthValueDisplay();
    runSliderAnimation();
    updateStrengthDisplay(calculateStrength());
    changeGenerateButtonState();
  });
  
  strengths.forEach((input) => {
    input.addEventListener("change", () => {
      updateStrengthDisplay(calculateStrength());
      changeGenerateButtonState();
    });
  });
  
  copyButton.addEventListener("click", () => {
    navigator.clipboard.writeText(passwordDisplay.textContent);
    copyStatusMessage.style.visibility = "visible";
    setTimeout(() => (copyStatusMessage.style.visibility = "hidden"), 1800);
    createNotification("Password copied to clipboard");
  });
};