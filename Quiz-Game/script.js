// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questiontext = document.getElementById("question-text");
const answerContainer = document.getElementById("answer-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
    {
        question: "What is the Capital of India ?",
        answer: [
            {text: "Rajasthan", correct: false},
            {text: "New Delhi", correct: true},
            {text: "Mumbai", correct: false},
            {text: "Bangalore", correct: false},
        ]
    },

    {
        question: "Which ancient wonder of the world was located in Alexandria, Egypt ?",
        answer: [
            {text: "The Colossus of Rhodes", correct: false},
            {text: "The Lighthouse of Alexandria", correct: true},
            {text: "The Hanging Gardens", correct: false},
            {text: "The Mausoleum at Halicarnassus", correct: false},
        ]
    },

    {
        question: "The Boston Tea Party occurred in which year?",
        answer: [
            {text: " 1770", correct: false},
            {text: "1773", correct: true},
            {text: "1775", correct: false},
            {text: "1776", correct: false},
        ]
    },

    {
        question: "The Meiji Restoration occurred in which country?",
        answer: [
            {text: "China", correct: false},
            {text: "Korea", correct: false},
            {text: "Japan", correct: true},
            {text: "Thailand", correct: false},
        ]
    },

     {
        question: "Who is the prime minister of India?",
        answer: [
            {text: "Donald Trump", correct: false},
            {text: "Akshay Khanna", correct: false},
            {text: "Atif Aslam", correct: false},
            {text: "Narender Modi", correct: true},
        ]
    },
];

//QUIZ STATES VARS
let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

//event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz(){
    //reset vars
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion()
}

function showQuestion() {
    //reset state
    answerDisabled = false

    const currentQuestion = quizQuestions[currentQuestionIndex]

    currentQuestionSpan.textContent = currentQuestionIndex + 1

    const progressPercent = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%"

    questiontext.textContent = currentQuestion.question

    answerContainer.innerHTML = "";

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button")
        button.textContent = answer.text
        button.classList.add("answer-btn")

        button.dataset.correct = answer.correct

        button.addEventListener("click", selectAnswer)

        answerContainer.appendChild(button);
    });
}

function selectAnswer(event) {
    if(answerDisabled) return

    answerDisabled = true

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answerContainer.children).forEach((button) => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
    });

if(!isCorrect) {
    selectedButton.classList.add("incorrect");
}

    if(isCorrect) {
        score++;
        scoreSpan.textContent = score
    }

    setTimeout(() => {
        currentQuestionIndex++;

        if(currentQuestionIndex < quizQuestions.length) {
            showQuestion()
        } else {
            showResults()
        }
    }, 1000)
}

function showResults() {
    quizScreen.classList.remove("active")
    resultScreen.classList.add("active")

    finalScoreSpan.textContent = score;

    const percentage = (score/quizQuestions.length) * 100

    if(percentage === 100){
        resultMessage.textContent = "Perfect! You're a genius!";
    } else if(percentage >= 80) {
        resultMessage.textContent = "Great job! You know your stuff!";
    } else if(percentage >= 60) {
        resultMessage.textContent = "Good effort! Keep learning!";
    } else if(percentage >= 40) {
        resultMessage.textContent = "Not bad! Try again to improve";
    } else {
        resultMessage.textContent = "Keep studying! You'll get better";
    }
}

function restartQuiz(){
    resultScreen.classList.remove("active");

    startQuiz();
}