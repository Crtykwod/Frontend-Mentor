
import { popup, activeCard, setActiveCard, setActiveButton, confirmDialog, navTimePeriods } from './constants.js';
import {retryFetch, closeDialog } from "./ui-handler.js";
import { updateTimePeriod } from "./data-handler.js";

export const setupEventListeners = () => {
  navTimePeriods.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      navTimePeriods.forEach((el) => el.classList.remove("active"));
      link.classList.toggle("active");
      updateTimePeriod(link.getAttribute("href").slice(1));
    });
  });

  document.getElementById("deleteButton").addEventListener("click", () => {
    popup.style.display = "none";
    confirmDialog.showModal();
  });

  document.getElementById("confirmDelete").addEventListener("click", () => {
    if (activeCard) {
      activeCard.remove();
      setActiveCard(null);
    }
    confirmDialog.close();
  });

  document.querySelectorAll(".button__close").forEach((button) => {
    button.addEventListener("click", closeDialog);
  });

  window.addEventListener("click", (e) => {
    if (!popup.contains(e.target) && !e.target.closest(".button__edit")) {
      popup.style.display = "none";
      setActiveButton(null);
    }
  });

  document.getElementById("retryButton").addEventListener("click", retryFetch);
};
