import { lengthValue, setStrength, strength, strengthBars, strengths, strengthValue } from "./constants.js";

const passwordStrengthDisplay = [
  {
    value: 0,
    color: "var(--clr-very-dark-gray)",
    text: null,
  },
  {
    value: 1,
    color: "var(--clr-red)",
    text: "Very weak",
  },
  {
    value: 2,
    color: "var(--clr-orange)",
    text: "Weak",
  },
  {
    value: 3,
    color: "var(--clr-yellow)",
    text: "Medium",
  },
  {
    value: 4,
    color: "var(--clr-neon-green)",
    text: "Strong",
  },
];

export const calculateStrength = () => {
  setStrength(strengths.filter((input) => input.checked).length);
  if (lengthValue < 12) return strength - 1;
  if (lengthValue > 16 && strength > 0) return strength + 1
  console.log(strength)
  return strength
};

export const updateStrengthDisplay = (strength) => {
  const boundedStrength = Math.max(0, Math.min(4, strength));
  const display = passwordStrengthDisplay[boundedStrength];
  strengthValue.textContent = display.text;
  strengthBars.forEach((bar, index) => {
    if (index < strength) {
      bar.style.backgroundColor = display.color;
      bar.style.borderColor = display.color;
    } else {
      bar.style.backgroundColor = "transparent";
      bar.style.borderColor = "var(--clr-almost-white)";
    }
  });
};
