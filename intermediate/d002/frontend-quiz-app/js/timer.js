import { elements, quizElements } from "./elements.js";
import { state } from "./state.js";

const getTimerDuration = () => {
  const selectedDuration = Array.from(elements.durationInputs).find(duration => duration.checked);
  return selectedDuration?.value;
};

export const setTimer = () => {
  const duration = getTimerDuration();
  if (!duration || !elements.timerCheck.checked) {
    elements.root.style.setProperty("--animate-timer-playstate", "paused");
    return;
  };
  state.timerDuration = duration;
  elements.root.style.setProperty("--animate-timer-playstate", "running");
  elements.root.style.setProperty("--animate-timer-duration", `${state.timerDuration}s`);
};

export const setTimesUpEvent = () => {
  if (!state.timerDuration) return;
  setTimeout(() => {
    quizElements.timesUpMessage.classList.remove("hidden");
    quizElements.quizOptions.disabled = true;
    quizElements.retryButton.classList.remove("hidden");
  }, state.timerDuration * 1000);
}