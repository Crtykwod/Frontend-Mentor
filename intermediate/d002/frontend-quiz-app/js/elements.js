export const elements = {
  root: document.documentElement,
  main: document.getElementById("main"),
  quizTemplate: document.getElementById("quizTemplate"),
  returnToMenuButton: document.getElementById("returnToMenu"),
  timerCheck: document.getElementById("timerCheck"),
  timerDuration: document.getElementById("timerDuration"),
  durationInputs: document.querySelectorAll(".quiz__duration"),
  headerContent: document.getElementById("headerContent"),
  headerIcon: document.getElementById("headerIcon"),
  headerTitle: document.getElementById("headerTitle"),
  resultsTemplate: document.getElementById("resultsTemplate"),
};

export const quizElements = {
  questionText: HTMLElement,
  questionNumber: HTMLElement,
  timesUpMessage: HTMLElement,
  quizOptions: HTMLElement,
  quizAnswers: HTMLElement,
  submitAnswerButton: HTMLElement,
  retryButton: HTMLElement,
  nextQuestionButton: HTMLElement,
  showResultsButton: HTMLElement,
  noSelectedAnswerMessage: HTMLElement,
};

export const resultsElements = {
  scoreDisplay: HTMLElement,
  playAgainButton: HTMLElement,
  quizIcon: HTMLElement,
  quizTitleResults: HTMLElement,
};

export const updateElementReferences = () => {
  const main = elements.main;

  Object.assign(elements, {
    main: main,
    quizTemplate: document.getElementById("quizTemplate"),
    returnToMenuButton: document.getElementById("returnToMenu"),
    timerCheck: document.getElementById("timerCheck"),
    timerDuration: document.getElementById("timerDuration"),
    durationInputs: document.querySelectorAll(".quiz__duration"),
    headerContent: document.getElementById("headerContent"),
    headerIcon: document.getElementById("headerIcon"),
    headerTitle: document.getElementById("headerTitle"),
  });
};
