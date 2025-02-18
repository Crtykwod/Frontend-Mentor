import { populateDOM } from './ui-handler.js';

export let timePeriod = "weekly";

export const getTimeLabel = () => ({
  daily: "Yesterday",
  weekly: "Last Week",
  monthly: "Last Month"
})[timePeriod];

export const fetchDataAndUpdate = async () => {
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

export const updateTimePeriod = (id) => {
  timePeriod = id;
  fetchDataAndUpdate();
};