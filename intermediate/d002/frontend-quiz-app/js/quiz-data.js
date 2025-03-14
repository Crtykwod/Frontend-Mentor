import {createQuiz} from "./quiz-renderer.js";

const fetchQuizData = async () => {
  try {
    const response = await fetch("./data.json");
    if (!response.ok) throw new Error(`Error Code: ${response.status}`);
    const {quizzes} = await response.json();
    return quizzes;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const quizData = await fetchQuizData();

export const quizTypes = {
  html: (quiz) => createQuiz(quiz),
  css: (quiz) => createQuiz(quiz),
  javascript: (quiz) => createQuiz(quiz),
  accessibility: (quiz) => createQuiz(quiz),
};

export const getQuizData = (quizType) => {
  const quizIndex = {
    HTML: 0,
    CSS: 1,
    JavaScript: 2,
    Accessibility: 3,
  }[quizType];
  return quizData[quizIndex];
};
