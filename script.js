const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Paris", "London", "Berlin", "Madrid"],
        correct: 0
    },
    {
        question: "Which animal is known as the 'King of the Jungle'?",
        answers: ["Elephant", "Lion", "Tiger", "Bear"],
        correct: 1
    },
    {
        question: "What color do you get when you mix red and white?",
        answers: ["Pink", "Purple", "Orange", "Brown"],
        correct: 0
    },
    {
        question: "Which planet is closest to the Sun?",
        answers: ["Venus", "Earth", "Mercury", "Mars"],
        correct: 2
    },
    {
        question: "What is 5 + 7?",
        answers: ["10", "12", "13", "11"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const startBtn = document.getElementById('start-btn');
const quizScreen = document.getElementById('quiz-screen');
const startScreen = document.getElementById('start-screen');
const endScreen = document.getElementById('end-screen');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const scoreEl = document.getElementById('score');
const nextBtn = document.getElementById('next-btn');
const finalScoreEl = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');

function showQuestion() {
    answered = false;
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    answersEl.innerHTML = '';
    q.answers.forEach((ans, idx) => {
        const btn = document.createElement('button');
        btn.textContent = ans;
        btn.onclick = () => selectAnswer(idx, btn);
        answersEl.appendChild(btn);
    });
    scoreEl.textContent = `Score: ${score}`;
    nextBtn.classList.add('hidden');
}

function selectAnswer(idx, btn) {
    if (answered) return;
    answered = true;
    const q = questions[currentQuestion];
    const buttons = answersEl.querySelectorAll('button');
    buttons.forEach((b, i) => {
        if (i === q.correct) {
            b.classList.add('selected');
        }
        b.disabled = true;
    });
    if (idx === q.correct) {
        score++;
        scoreEl.textContent = `Score: ${score}`;
    } else {
        btn.classList.add('wrong');
    }
    nextBtn.classList.remove('hidden');
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    quizScreen.classList.add('hidden');
    endScreen.classList.remove('hidden');
    finalScoreEl.textContent = `${score} / ${questions.length}`;
    saveHighScore(score);
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    endScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
}

function startQuiz() {
    score = 0;
    currentQuestion = 0;
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    showQuestion();
}

function saveHighScore(newScore) {
    let highScore = localStorage.getItem('quizHighScore') || 0;
    if (newScore > highScore) {
        localStorage.setItem('quizHighScore', newScore);
        alert('🎉 New High Score!');
    }
}

startBtn.onclick = startQuiz;
nextBtn.onclick = nextQuestion;
restartBtn.onclick = restartQuiz;

// On load, show start screen
window.onload = () => {
    startScreen.classList.remove('hidden');
    quizScreen.classList.add('hidden');
    endScreen.classList.add('hidden');
}; 