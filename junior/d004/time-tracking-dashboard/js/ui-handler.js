import { activeButton, main, popup, setActiveButton, setActiveCard } from './constants.js';
import { getTimeLabel, timePeriod, fetchDataAndUpdate } from './data-handler.js';


export const createTimeCard = (item) => {
  const {title, timeframes} = item;
  const hours = timeframes[timePeriod];
  const formattedCurrentHours = `${hours.current}${hours.current < 2 ? "hr" : "hrs"}`;
  const formattedPreviousHours = `${hours.previous}${hours.previous < 2 ? "hr" : "hrs"}`;

  const card = document.createElement("section");
  card.className = "timer-card";
  card.innerHTML = `
    <div class="timer-background ${title.toLowerCase()}"></div>
    <div class="timer-content">
      <h2 class="timer-label">${title}</h2>
      <button class="button__edit">
        <svg width="21" height="7" tabindex="-1" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#BBC0FF" fill-rule="evenodd"/>
        </svg>
        <span class="sr-only">Timer Settings</span>
      </button>
      <div class="time-container">
        <p class="time-current">${formattedCurrentHours}</p>
        <p class="time-previous">${getTimeLabel()} - ${formattedPreviousHours}</p>
      </div>
    </div>
  `;

  return card;
};

const updatePopupPosition = (button) => {
  const rect = button.getBoundingClientRect();
  popup.style.top = `${rect.bottom + window.scrollY + 15}px`;
  popup.style.left = `${rect.left + window.scrollX - 150}px`;
  popup.style.display = "flex";
};

const setupEditButtons = () => {
  const editButtons = document.querySelectorAll(".button__edit");
  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveCard(button.closest(".timer-card"));
      setActiveButton(button);
      updatePopupPosition(button);
    });
  });
};

export const populateDOM = (data) => {
  main.innerHTML = "";
  data.forEach((item) => main.appendChild(createTimeCard(item)));
  setupEditButtons();

  window.addEventListener("resize", () => {
    if (activeButton && popup.style.display === "flex") {
      updatePopupPosition(activeButton);
    }
  });
};

export const closeDialog = () => {
  const openedDialog = document.querySelector("dialog[open]");
  openedDialog.close();
};

export const retryFetch = () => {
  closeDialog();
  fetchDataAndUpdate();
};