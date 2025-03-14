import {elements, resultsElements} from "./elements.js";
import {restoreMainMenu} from "./quiz-logic.js";
import {state} from "./state.js";

const createResults = () => {
  const clone = elements.resultsTemplate.content.cloneNode(true);

  resultsElements.scoreDisplay = clone.getElementById("scoreDisplay");
  resultsElements.playAgainButton = clone.getElementById("playAgainButton");
  resultsElements.quizIcon = clone.querySelector(".quiz__icon");
  resultsElements.quizTitleResults = clone.getElementById("quizTitleResults");
  console.log(resultsElements.quizTitleResults);

  resultsElements.quizIcon.setAttribute(
    "src",
    `./assets/images/icon-${state.currentQuiz.toLowerCase()}.svg`
  );
  resultsElements.quizIcon.classList.add(
    `quiz__icon--${state.currentQuiz.toLowerCase()}`
  );
  resultsElements.quizTitleResults.textContent = state.currentQuiz;
  resultsElements.scoreDisplay.textContent = state.score;
  resultsElements.playAgainButton.addEventListener("click", restoreMainMenu);

  return clone;
};

export const showResults = () => {
  elements.main.innerHTML = "";
  elements.main.appendChild(createResults());
};
