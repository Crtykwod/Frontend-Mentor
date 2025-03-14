import { elements } from "./elements.js";
import { handleQuizSelection, restoreMainMenu } from "./quiz-logic.js";
import { state } from "./state.js";
import { changeTheme, themeSwitchButton } from "./theme-handler.js";
import { setTimer } from "./timer.js";

export const setupEventListeners = () => {
  elements.returnToMenuButton.addEventListener("click", restoreMainMenu);
  document.querySelector(".quiz__list").addEventListener("click", handleQuizSelection);
  themeSwitchButton.addEventListener("change", changeTheme);
  
  elements.timerCheck.addEventListener("change", () => {
    elements.timerDuration.classList.toggle("invisible", !elements.timerCheck.checked);
    if (!elements.timerCheck.checked) {
      state.timerDuration = 0;
      elements.durationInputs.forEach(duration => duration.checked = false);
      setTimer();
    };
  });

  elements.durationInputs.forEach(duration => {
    duration.addEventListener("change", setTimer);
  });
};