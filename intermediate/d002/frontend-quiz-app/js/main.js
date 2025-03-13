import { changeTheme, themeSwitchButton } from "./theme-handler.js";

const elements = {
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

const quizElements = {
  questionText: HTMLElement,
  questionNumber: HTMLElement,
  timesUpMessage: HTMLElement,
  quizOptions: HTMLElement,
  quizAnswers: HTMLElement,
  submitAnswerButton: HTMLElement,
  retryButton: HTMLElement,
  nextQuestionButton: HTMLElement,
  showResultsButton: HTMLElement
}

const resultsElements = {
  scoreDisplay: HTMLElement,
  playAgainButton: HTMLElement,
  quizIcon: HTMLElement,
  quizTitleResults: HTMLElement
}

const state = {
  mainMenu: elements.main.innerHTML,
  currentQuiz: null,
  currentQuestion: 1,
  timerDuration: 0,
  score: 0,
  selectedAnswer: null,
};

const quizTypes = {
  html: (quiz) => createQuiz(quiz),
  css: (quiz) => createQuiz(quiz),
  javascript: (quiz) => createQuiz(quiz),
  accessibility: (quiz) => createQuiz(quiz)
};


const fetchQuizData = async () => {
  try {
    const response = await fetch("./data.json");
    if (!response.ok) throw new Error(`Error Code: ${response.status}`);
    const { quizzes } = await response.json();
    return quizzes;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const quizData = await fetchQuizData();

const getQuizData = (quizType) => {
  const quizIndex = {
    'HTML': 0,
    'CSS': 1,
    'JavaScript': 2,
    'Accessibility': 3
  }[quizType];
  return quizData[quizIndex];
};

const createQuiz = (quiz) => {
  const clone = elements.quizTemplate.content.cloneNode(true);
  const question = quiz.questions[state.currentQuestion - 1];
  
  quizElements.submitAnswerButton = clone.getElementById("submitAnswerButton");
  quizElements.retryButton = clone.getElementById("retryButton");
  quizElements.nextQuestionButton = clone.getElementById("nextQuestionButton");
  quizElements.showResultsButton = clone.getElementById("showResultsButton");
  quizElements.timesUpMessage = clone.getElementById("timesUpMessage");
  quizElements.retryButton = clone.getElementById("retryButton");
  quizElements.questionText = clone.getElementById("questionText");
  quizElements.questionNumber = clone.getElementById("questionNumber");
  quizElements.quizOptions = clone.getElementById("quizOptions");
  quizElements.quizAnswers = clone.querySelectorAll(".quiz__answer");

  quizElements.quizOptions.addEventListener("click", handleOptionClick);
  quizElements.questionText.textContent = question.question;
  quizElements.questionNumber.textContent = `Question ${state.currentQuestion} of ${quiz.questions.length}`;
  quizElements.submitAnswerButton.addEventListener("click", submitAnswer);
  quizElements.nextQuestionButton.addEventListener("click", goToNextQuestion);
  quizElements.showResultsButton.addEventListener("click", showResults);

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

const renderQuiz = (quiz) => {
  elements.main.innerHTML = "";
  elements.main.appendChild(quiz);
  setTimesUpEvent();
};

const handleQuizSelection = (event) => {
  const button = event.target.closest(".menu__button");
  if (!button) return;
  
  state.currentQuiz = button.textContent.trim();
  updateHeader();
  
  const selectedQuiz = quizTypes[state.currentQuiz.toLowerCase()];
  const quiz = selectedQuiz ? selectedQuiz(getQuizData(state.currentQuiz)) : null;
  
  quiz ? renderQuiz(quiz) : restoreMainMenu();
};


const getTimerDuration = () => {
  const selectedDuration = Array.from(elements.durationInputs).find(duration => duration.checked);
  return selectedDuration?.value;
};

const setTimer = () => {
  const duration = getTimerDuration();
  if (!duration || !elements.timerCheck.checked) {
    elements.root.style.setProperty("--animate-timer-playstate", "paused");
    return;
  };
  state.timerDuration = duration;
  elements.root.style.setProperty("--animate-timer-playstate", "running");
  elements.root.style.setProperty("--animate-timer-duration", `${state.timerDuration}s`);
};

const setTimesUpEvent = () => {
  if (!state.timerDuration) return;
  setTimeout(() => {
    quizElements.timesUpMessage.classList.toggle("hidden");
    quizElements.quizOptions.disabled = true;
  }, state.timerDuration * 1000);
}

const handleOptionClick = (event) => {
  if (!event.target.closest(".quiz__answer")) return;
  state.selectedAnswer = event.target.closest(".quiz__answer")
  console.log(state.selectedAnswer);
};

const updateHeader = () => {
  if (!state.currentQuiz) {
    elements.headerContent.classList.add("invisible");
    return;
  }
  
  const quizName = state.currentQuiz.toLowerCase();
  elements.headerIcon.setAttribute("src", `./assets/images/icon-${quizName}.svg`);
  elements.headerIcon.setAttribute("class", `quiz__icon quiz__icon--${quizName}`);
  elements.headerTitle.textContent = state.currentQuiz;
  elements.headerContent.classList.remove("invisible");
};

const restoreMainMenu = () => {
  state.currentQuiz = null;
  state.currentQuestion = 1;
  updateHeader();

  elements.main.innerHTML = state.mainMenu;

  updateElementReferences();
  setupEventListeners();
};

const updateElementReferences = () => {
  const main = elements.main;

  elements.quizTemplate = document.getElementById("quizTemplate");
  elements.returnToMenuButton = document.getElementById("returnToMenu");
  elements.timerCheck = document.getElementById("timerCheck");
  elements.timerDuration = document.getElementById("timerDuration");
  elements.durationInputs = document.querySelectorAll(".quiz__duration");
  elements.headerContent = document.getElementById("headerContent");
  elements.headerIcon = document.getElementById("headerIcon");
  elements.headerTitle = document.getElementById("headerTitle");

  elements.main = main;
};

const submitAnswer = () => {
  if (!state.selectedAnswer) return;
  checkAnswer();
  state.selectedAnswer = null;

  document.querySelector(".quiz__answer--correct").classList.add("before:block");
  document.querySelector(".quiz__answer--correct").classList.add("after:block");

  quizElements.quizOptions.disabled = true
  quizElements.submitAnswerButton.classList.add("hidden");
  if (state.currentQuestion === getQuizData(state.currentQuiz).questions.length) {
    return quizElements.showResultsButton.classList.remove("hidden");
  }
  quizElements.nextQuestionButton.classList.remove("hidden");
};

const showResults = () => {
  elements.main.innerHTML = "";
  elements.main.appendChild(createResults());
}

const createResults = () => {
  const clone = elements.resultsTemplate.content.cloneNode(true);

  resultsElements.scoreDisplay = clone.getElementById("scoreDisplay");
  resultsElements.playAgainButton = clone.getElementById("playAgainButton");
  resultsElements.quizIcon = clone.querySelector(".quiz__icon");
  resultsElements.quizTitleResults = clone.getElementById("quizTitleResults");
  console.log(resultsElements.quizTitleResults)

  resultsElements.quizIcon.setAttribute("src", `./assets/images/icon-${state.currentQuiz.toLowerCase()}.svg`);
  resultsElements.quizTitleResults.textContent = state.currentQuiz;
  resultsElements.scoreDisplay.textContent = state.score;
  resultsElements.playAgainButton.addEventListener("click", restoreMainMenu);

  return clone;
}

const goToNextQuestion = () => {
  state.currentQuestion++;

  if (state.currentQuestion > getQuizData(state.currentQuiz).questions.length) {
    restoreMainMenu();
    return;
  }

  const selectedQuiz = quizTypes[state.currentQuiz.toLowerCase()];
  const quiz = selectedQuiz ? selectedQuiz(getQuizData(state.currentQuiz)) : null;
  renderQuiz(quiz);
}

const checkAnswer = () => {
  const isCorrect = state.selectedAnswer.textContent == getQuizData(state.currentQuiz).questions[state.currentQuestion - 1].answer;

  if (isCorrect) {
    state.selectedAnswer.id = "isCorrect";
    state.score++;
  } else {
    state.selectedAnswer.id = "isIncorrect";
  }
  console.log(state.score)
}

const setupEventListeners = () => {
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

setupEventListeners();