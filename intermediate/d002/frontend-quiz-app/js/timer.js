import { elements, quizElements } from "./elements.js";
import { state } from "./state.js";

const getTimerDuration = () => {
  const selectedDuration = Array.from(elements.durationInputs).find(duration => duration.checked);
  return selectedDuration?.value;
};

const saveTimerSettings = () => {
  const timerSettings = {
    enabled: elements.timerCheck.checked,
    duration: getTimerDuration(),
  };

  localStorage.setItem("timerSettings", JSON.stringify(timerSettings));
}

const loadTimerSettings = () => {
  const savedTimerSettings = localStorage.getItem("timerSettings");

  if (savedTimerSettings) {
    const { enabled, duration } = JSON.parse(savedTimerSettings);
    elements.timerCheck.checked = enabled;

    if (duration) {
      elements.timerDuration.classList.remove("invisible");
      const durationInput = Array.from(elements.durationInputs).find(input => input.value === duration);
      console.log(durationInput);
      durationInput.checked = true;
    }
    state.timerDuration = duration;
  }
}

export const setTimer = () => {
  const duration = getTimerDuration();
  if (!duration || !elements.timerCheck.checked) {
    elements.root.style.setProperty("--animate-timer-playstate", "paused");
    saveTimerSettings();
    return;
  };
  state.timerDuration = duration;
  elements.root.style.setProperty("--animate-timer-playstate", "running");
  elements.root.style.setProperty("--animate-timer-duration", `${state.timerDuration}s`);
  saveTimerSettings();
};

export const setTimesUpEvent = () => {
  if (!state.timerDuration) return;
  setTimeout(() => {
    quizElements.timesUpMessage.classList.remove("hidden");
    quizElements.quizOptions.disabled = true;
    quizElements.retryButton.classList.remove("hidden");
  }, state.timerDuration * 1000);
}

export const initTimer = () => {
  loadTimerSettings();
  setTimer();
};