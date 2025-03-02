import { lengthValue, strengths } from "./constants.js";

export const generatePassword = () => {
  const charset = [
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "abcdefghijklmnopqrstuvwxyz",
    "0123456789",
    "!@#$%^&*()_+-=[]{}|;:,.<>?/",
  ];

  const selectedCharsets = strengths
    .map((input, index) => input.checked ? charset[index] : '')
    .filter(set => set !== '')
    .join('');

  let password = "";
  for (let i = 0; i < lengthValue; i++) {
    const randomIndex = Math.floor(Math.random() * selectedCharsets.length);
    password += selectedCharsets.charAt(randomIndex);
  }
  return password;
}
