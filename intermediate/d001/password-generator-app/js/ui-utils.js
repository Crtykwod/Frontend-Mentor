import { copyButton, generateButton, lengthSlider, lengthValue, lengthValueDisplay, passwordDisplay } from "./constants.js";
import { createNotification } from "./notification.js";
import { generatePassword } from "./password-generator.js";
import { calculateStrength } from "./password-strength.js";

export const handlePasswordGeneration = () => {
  const password = generatePassword();
  passwordDisplay.textContent = password;
  passwordDisplay.style.opacity = "1";
  copyButton.disabled = false;
  createNotification("Password successfully generated");
};

export const runSliderAnimation = () => {
  const value =
    ((lengthSlider.value - lengthSlider.min) /
      (lengthSlider.max - lengthSlider.min)) *
    100;
  lengthSlider.style.background = `linear-gradient(to right, var(--clr-neon-green) ${value}%, var(--clr-very-dark-gray) ${value}%)`;
};


export const setLengthValueDisplay = () => lengthValueDisplay.textContent = lengthValue;

export const changeGenerateButtonState = () => {
  if (calculateStrength() > 0) return (generateButton.disabled = false);
  generateButton.disabled = true;
}

export const scrollToBottom = (container, item) => {
  const items = document.querySelectorAll(`${container} ${item}`);
  const lastItem = items[items.length - 1];
  lastItem.scrollIntoView({ behavior: "smooth", block: "center" });
}