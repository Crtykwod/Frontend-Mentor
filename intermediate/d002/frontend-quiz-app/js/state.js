import { elements } from "./elements.js";

export const state = {
  mainMenu: elements.main.innerHTML,
  currentQuiz: null,
  currentQuestion: 1,
  timerDuration: 0,
  score: 0,
  selectedButton: null,
  selectedAnswer: null,
};