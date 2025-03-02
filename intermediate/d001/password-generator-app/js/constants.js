export const form = document.getElementById("form");

// Slider
export const lengthSlider = document.getElementById("passwordLength");
export let lengthValue = null;
export const lengthValueDisplay = document.getElementById("passwordLengthValue");
export const setLengthValue = (value) => (lengthValue = value);

// Checkboxes
export const hasUppercase = document.getElementById("hasUppercase");
export const hasLowercase = document.getElementById("hasLowercase");
export const hasNumbers = document.getElementById("hasNumbers");
export const hasSymbols = document.getElementById("hasSymbols");

// Password Strength
export const strengths = [hasUppercase, hasLowercase, hasNumbers, hasSymbols];
export let strength = null;
export const setStrength = (value) => (strength = value);

// Password Strength Display
export const strengthValue = document.getElementById("strengthValue");
export const strengthIndicator = document.getElementById("strengthIndicator");
export const strengthBars = strengthIndicator.querySelectorAll(".strength__bar");

// Buttons and Password Display
export const passwordDisplay = document.getElementById("password");
export const copyButton = document.getElementById("copyButton");
export const copyStatusMessage = document.getElementById("copyStatusMessage");
export const generateButton = document.getElementById("generateButton");

// Notification
export const notificationContainer = document.getElementById("notificationContainer");
