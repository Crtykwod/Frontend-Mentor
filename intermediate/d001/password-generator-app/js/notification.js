import { notificationContainer } from "./constants.js";
import { scrollToBottom } from "./ui-utils.js";

export const createNotification = (message) => {
  const notification = document.createElement("div");
  notification.classList.add("notification");
  notification.innerHTML = 
        `<button class="notification__close-btn">
          <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14 1.41L12.59 0 7 5.59 1.41 0 0 1.41 5.59 7 0 12.59 1.41 14 7 8.41 12.59 14 14 12.59 8.41 7z"
            />
          </svg>
          <span class="sr-only">Fechar notificação</span>
        </button>
        <p class="notification__text"> ${message} </p>
        <div class="notification__remaining-time"></div>
        `;
  notificationContainer.appendChild(notification);
  timeoutNotification(notification);
  scrollToBottom(".notification__container", ".notification");

  let notificationCloseButton = notification.querySelector(".notification__close-btn");
  notificationCloseButton.addEventListener("click", () => {
    notificationContainer.removeChild(notification);
  });
};

const timeoutNotification = (notification) => {
  setTimeout(() => {
    notificationContainer.removeChild(notification);
  }, 5000);
};