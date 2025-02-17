// Constants and DOM Elements
const main = document.getElementById("main");
const navTimePeriods = document.querySelectorAll("ul li a");
const popup = document.getElementById("popup");
const confirmDialog = document.getElementById("confirmDialog");

let timePeriod = "weekly";
let activeButton = null;
let activeCard = null;

// Time Period Configuration
const getTimeLabel = {
  daily: "Yesterday",
  weekly: "Last Week",
  monthly: "Last Month",
}[timePeriod];

const updateTimePeriod = (id) => {
  timePeriod = id;
  fetchDataAndUpdate();
};

// Card Creation
const createTimeCard = (item) => {
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
        <p class="time-previous">${getTimeLabel} - ${formattedPreviousHours}</p>
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
      activeCard = button.closest(".timer-card");
      activeButton = button;
      updatePopupPosition(button);
    });
  });
};

const populateDOM = (data) => {
  main.innerHTML = "";
  data.forEach((item) => main.appendChild(createTimeCard(item)));
  setupEditButtons();

  window.addEventListener("resize", () => {
    if (activeButton && popup.style.display === "flex") {
      updatePopupPosition(activeButton);
    }
  });
};

// Data Fetching
const fetchDataAndUpdate = async () => {
  try {
    const response = await fetch("./data.json");
    if (!response.ok) throw new Error(`Error Code: ${response.status}`);
    const data = await response.json();
    populateDOM(data);
  } catch (error) {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.innerHTML = `Failed to load data. <span id="errorCode">${error.message}</span>`;
    document.getElementById("errorDialog").showModal();
    console.error("Error fetching data:", error);
  }
};

// Dialog Handling
const closeDialog = () => {
  const openedDialog = document.querySelector("dialog[open]");
  openedDialog.close();
};

const retryFetch = () => {
  closeDialog();
  fetchDataAndUpdate();
};

// Event Listeners Setup
const setupEventListeners = () => {
  // Handles navigation time period selection and updates active state
  navTimePeriods.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      navTimePeriods.forEach((el) => el.classList.remove("active"));
      link.classList.toggle("active");
      updateTimePeriod(link.getAttribute("href").slice(1));
    });
  });

  // Shows confirmation dialog when delete button is clicked
  document.getElementById("deleteButton").addEventListener("click", () => {
    popup.style.display = "none";
    confirmDialog.showModal();
  });

  // Removes the card when delete is confirmed
  document.getElementById("confirmDelete").addEventListener("click", () => {
    activeCard.remove();
    confirmDialog.close();
  });

  // Closes any open dialog when close button is clicked
  document.querySelectorAll(".button__close").forEach((button) => {
    button.addEventListener("click", closeDialog);
  });

  // Closes popup when clicking outside of it
  window.addEventListener("click", (e) => {
    if (!popup.contains(e.target) && !e.target.closest(".button__edit")) {
      activeButton = null;
      popup.style.display = "none";
    }
  });

  // Retries data fetching when retry button is clicked
  document.getElementById("retryButton").addEventListener("click", retryFetch);
};
// Initialize Application
setupEventListeners();
fetchDataAndUpdate();
