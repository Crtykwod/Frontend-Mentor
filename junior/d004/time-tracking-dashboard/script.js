let timePeriod = "weekly";

const main = document.getElementById("main");

const updateTimePeriod = (id) => {
  timePeriod = id;
  fetchDataAndUpdate();
};

const navTimePeriods = document.querySelectorAll("ul li a");

navTimePeriods.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    navTimePeriods.forEach((el) => el.classList.remove("active"));
    link.classList.toggle("active");
    updateTimePeriod(link.getAttribute("href").slice(1));
  });
});

const getTimeLabel = () =>
  ({
    daily: "Yesterday",
    weekly: "Last Week",
    monthly: "Last Month",
  })[timePeriod];

/* const getTimeLabel = () => 
    if (timePeriod === "daily") { return "Yesterday" }
    if (timePeriod === "weekly") { return "Last Week" }
    if (timePeriod === "monthly") { return "Last Month" } 
*/

const createTimeCard = (item) => {
  // const title = item.title;
  // const timeframes = item.timeframes;
  const {title, timeframes} = item;
  const hours = timeframes[timePeriod];

  const card = document.createElement("section");
  card.innerHTML = `
    <div class="timer-background ${title.toLowerCase()}"></div>
    <div class="timer-content">
      <h2 class="timer-label">${title}</h2>
      <button class="button-edit">
        <svg width="21" height="7" tabindex="-1" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#BBC0FF" fill-rule="evenodd"/>
        </svg>
        <span class="sr-only">Timer Settings</span>
      </button>
      <div class="time-container">
        <p class="time-current">${hours.current}${hours.current < 2 ? "hr" : "hrs"}</p>
        <p class="time-previous">${getTimeLabel()} - ${hours.previous}${hours.previous < 2 ? "hr" : "hrs"}</p>
      </div>
    </div>
  `;
  card.className = "timer-card";
  return card;
};

const populateDOM = (data) => {
  main.innerHTML = "";
  data.forEach((item) => main.appendChild(createTimeCard(item)));
};

const fetchDataAndUpdate = async () => {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    populateDOM(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

fetchDataAndUpdate();
