import {elements, quizElements, updateElementReferences} from "./elements.js";
import {setupEventListeners} from "./events.js";
import {getQuizData, quizTypes} from "./quiz-data.js";
import {renderQuiz} from "./quiz-renderer.js";
import {state} from "./state.js";

const updateHeader = () => {
  if (!state.currentQuiz) {
    elements.headerContent.classList.add("invisible");
    return;
  }

  const quizName = state.currentQuiz.toLowerCase();
  elements.headerIcon.setAttribute(
    "src",
    `./assets/images/icon-${quizName}.svg`
  );
  elements.headerIcon.setAttribute(
    "class",
    `quiz__icon quiz__icon--${quizName}`
  );
  elements.headerTitle.textContent = state.currentQuiz;
  elements.headerContent.classList.remove("invisible");
};

export const handleQuizSelection = (event) => {
  const button = event.target.closest(".menu__button");
  if (!button) return;

  state.currentQuiz = button.textContent.trim();
  updateHeader();

  const selectedQuiz = quizTypes[state.currentQuiz.toLowerCase()];
  const quiz = selectedQuiz
    ? selectedQuiz(getQuizData(state.currentQuiz))
    : null;

  quiz ? renderQuiz(quiz) : restoreMainMenu();
};

export const handleOptionClick = (event) => {
  if (!quizElements.noSelectedAnswerMessage.classList.contains("hidden")) {
    quizElements.noSelectedAnswerMessage.classList.add("hidden");
  }

  const button = event.target.closest(".quiz__button");
  if (!button || event.target.tagName === "INPUT") return;

  state.selectedButton = button;

  state.selectedAnswer = {
    element: button.querySelector(".quiz__answer"),
    text: button.textContent.trim().slice(1).trim(),
  };
};

export const submitAnswer = () => {
  if (!state.selectedAnswer) {
    quizElements.noSelectedAnswerMessage.classList.remove("hidden");
    return;
  }

  checkAnswer();
  state.selectedButton = null;
  state.selectedAnswer = null;

  document
    .querySelector(".quiz__answer--correct")
    .classList.add("before:block");
  document.querySelector(".quiz__answer--correct").classList.add("after:block");

  quizElements.quizOptions.disabled = true;
  quizElements.submitAnswerButton.classList.add("hidden");
  if (
    state.currentQuestion === getQuizData(state.currentQuiz).questions.length
  ) {
    return quizElements.showResultsButton.classList.remove("hidden");
  }
  quizElements.nextQuestionButton.classList.remove("hidden");
};

export const goToNextQuestion = () => {
  state.currentQuestion++;

  if (state.currentQuestion > getQuizData(state.currentQuiz).questions.length) {
    restoreMainMenu();
    return;
  }

  const selectedQuiz = quizTypes[state.currentQuiz.toLowerCase()];
  const quiz = selectedQuiz
    ? selectedQuiz(getQuizData(state.currentQuiz))
    : null;
  renderQuiz(quiz);
};

const checkAnswer = () => {
  const isCorrect =
    state.selectedAnswer.text ===
    getQuizData(state.currentQuiz).questions[state.currentQuestion - 1].answer;

  if (isCorrect) {
    state.selectedAnswer.element.id = "isCorrect";
    state.score++;
  } else {
    state.selectedAnswer.element.id = "isIncorrect";
  }
};

export const retryQuestion = () => {
  state.currentQuestion = 1;
  const selectedQuiz = quizTypes[state.currentQuiz.toLowerCase()];
  const quiz = selectedQuiz
    ? selectedQuiz(getQuizData(state.currentQuiz))
    : null;
  renderQuiz(quiz);
};

export const restoreMainMenu = () => {
  state.currentQuiz = null;
  state.currentQuestion = 1;
  updateHeader();

  elements.main.innerHTML = state.mainMenu;

  updateElementReferences();
  setupEventListeners();
};
