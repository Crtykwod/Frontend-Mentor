export const main = document.getElementById("main");
export const navTimePeriods = document.querySelectorAll("ul li a");
export const popup = document.getElementById("popup");
export const confirmDialog = document.getElementById("confirmDialog");

export let activeButton = null;
export const setActiveButton = (button) => (activeButton = button);
export const getActiveButton = () => activeButton;

export let activeCard = null;
export const setActiveCard = (card) => (activeCard = card);
export const getActiveCard = () => activeCard;