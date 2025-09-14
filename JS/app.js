let questions = [];
let currentIndex = 0;
let score = 0;
let timer;
let timePerQuestion = 20;
let timeLeft = 0;

const startBtn = document.getElementById("startBtn");
const quizEl = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const timeEl = document.getElementById("time");
const nextBtn = document.getElementById("nextBtn");

// Start Quiz
startBtn.addEventListener("click", () => {
  timePerQuestion = parseInt(document.getElementById("timerInput").value) || 20;
  const section = document.getElementById("sectionSelect").value;

  questions = [...questionBank[section]];
  document.body.className = section + "-mode";

  currentIndex = 0;
  score = 0;
  document.querySelector(".settings").classList.add("hidden");
  quizEl.classList.remove("hidden");

  showQuestion();
});

// Show Question
function showQuestion() {
  resetState();
  const q = questions[currentIndex];
  questionEl.textContent = `Q${currentIndex + 1}: ${q.question}`;

  q.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.classList.add("btn");
    btn.textContent = choice;
    btn.addEventListener("click", () => selectAnswer(btn, choice));
    choicesEl.appendChild(btn);
  });

  startTimer();
}

// Reset
function resetState() {
  nextBtn.classList.add("hidden");
  choicesEl.innerHTML = "";
  clearInterval(timer);
}

// Answer Select
function selectAnswer(button, choice) {
  const correct = questions[currentIndex].answer;
  const buttons = choicesEl.querySelectorAll(".btn");

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) btn.classList.add("correct");
    else if (btn === button) btn.classList.add("wrong");
  });

  if (choice === correct) score++;

  nextBtn.textContent = currentIndex === questions.length - 1 ? "Finish Quiz" : "Next";
  nextBtn.classList.remove("hidden");

  clearInterval(timer);
}

// Timer
function startTimer() {
  timeLeft = timePerQuestion;
  timeEl.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);

      const buttons = choicesEl.querySelectorAll(".btn");
      buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === questions[currentIndex].answer) btn.classList.add("correct");
      });

      if (currentIndex === questions.length - 1) endQuiz();
      else nextQuestion();
    }
  }, 1000);
}

// Next button
nextBtn.addEventListener("click", () => {
  if (currentIndex === questions.length - 1) endQuiz();
  else nextQuestion();
});

function nextQuestion() {
  currentIndex++;
  if (currentIndex < questions.length) showQuestion();
  else endQuiz();
}

// End Quiz
function endQuiz() {
  clearInterval(timer);
  window.location.href = `congrats.html?score=${score}&total=${questions.length}`;
}
