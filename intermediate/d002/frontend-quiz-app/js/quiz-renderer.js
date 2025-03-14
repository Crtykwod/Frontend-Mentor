import { elements, quizElements } from "./elements.js";
import { goToNextQuestion, handleOptionClick, submitAnswer } from "./quiz-logic.js";
import { showResults } from "./results.js";
import { state } from "./state.js";
import { setTimesUpEvent } from "./timer.js";

export const createQuiz = (quiz) => {
  const clone = elements.quizTemplate.content.cloneNode(true);
  const question = quiz.questions[state.currentQuestion - 1];
  
  Object.assign(quizElements, {
    submitAnswerButton: clone.getElementById("submitAnswerButton"),
    retryButton: clone.getElementById("retryButton"),
    nextQuestionButton: clone.getElementById("nextQuestionButton"),
    showResultsButton: clone.getElementById("showResultsButton"),
    timesUpMessage: clone.getElementById("timesUpMessage"),
    questionText: clone.getElementById("questionText"),
    questionNumber: clone.getElementById("questionNumber"),
    quizOptions: clone.getElementById("quizOptions"),
    quizAnswers: clone.querySelectorAll(".quiz__answer")
  });

  quizElements.questionText.textContent = question.question;
  quizElements.questionNumber.textContent = `Question ${state.currentQuestion} of ${quiz.questions.length}`;

  setupQuizEventsListeners();
  setupAnswers(question);
  return clone;
};

const setupAnswers = (question) => {
  const answers = quizElements.quizAnswers;
  answers.forEach((answer, index) => {
    answer.textContent = question.options[index];
    const answerClass = question.answer === answer.textContent ? "quiz__answer--correct" : "quiz__answer--incorrect";
    answer.classList.add(answerClass);
  });
};

const setupQuizEventsListeners = () => {
  quizElements.quizOptions.addEventListener("click", handleOptionClick);

  quizElements.submitAnswerButton.addEventListener("click", submitAnswer);

  quizElements.nextQuestionButton.addEventListener("click", goToNextQuestion);

  quizElements.showResultsButton.addEventListener("click", showResults);
}

export const renderQuiz = (quiz) => {
  elements.main.innerHTML = "";
  elements.main.appendChild(quiz);
  setTimesUpEvent();
};