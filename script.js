var questions = [
	{
		question: "What is HTML considered?",
		choices: ["The bones", "The brain", "The lungs", "The mouth"],
		answer: "The bones"
	},
	{
		question: "What is CSS considered?",
		choices: ["The mind", "The skin", "The foot", "The bones"],
		answer: "The skin"
	},
	{
		question: "What pokemon is better?",
		choices: ["Pikachu", "Blastoise"],
		answer: "Blastoise"
	},
	{
		question: "What is the final step to send your code to GitHub?",
		choices: ["git add -A", "git clone", "git commit -m", "None of the above"],
		answer: "git commit -m"
	},
	{
		question: "Which is superior?",
		choices: ["Wendy's", "McDonald's", "Burger King"],
		answer: "Wendy's"
	}
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 200;
let timerId;

var startBtn = document.getElementById("startBtn");
var quiz = document.getElementById("quiz");
var questionEl = document.getElementById("question");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submitBtn");
var resultEl = document.getElementById("result");
var timeEl = document.getElementById("time");
var scoreboard = document.getElementById("scoreboard");

startBtn.addEventListener("click", startQuiz);

function startClock() {
	timerId = setInterval(function () {
		timeLeft--;
		timeEl.innerHTML = "Time Left: " + timeLeft;
		if (timeLeft <= 0) {
			clearInterval(timerId);
			endQuiz();
		}
	}, 1000);
}

function startQuiz() {
	startBtn.style.display = "none";
	quiz.style.display = "block";
	startClock();
	showQuestion();
}

function showQuestion() {
	var question = questions[currentQuestion];
	questionEl.textContent = question.question;
	choicesEl.innerHTML = "";
	var answer = question.answer;
	for (let i = 0; i < question.choices.length; i++) {
		var choice = question.choices[i];
		var li = document.createElement("li");
		var input = document.createElement("input");
		input.type = "radio";
		input.name = "choice";

		input.value = choice;
		var span = document.createElement("span");
		span.textContent = choice;
		li.appendChild(input);
		li.appendChild(span);
		choicesEl.appendChild(li);
	}
}

function endQuiz() {
	clearInterval(timerId);
	quiz.style.display = "none";
	var highScore = localStorage.getItem("highScore") || 0;
	if (score > highScore) {
		localStorage.setItem("highScore", score.toString());
	}
	console.log("Score: ", score, " High score: ", highScore);
	resultEl.innerHTML = `You scored ${score} out of ${questions.length}!`;
}


submitBtn.addEventListener("click", function () {
	checkAnswer();
	showNextQuestion();
});

function showNextQuestion() {
	currentQuestion++;
	if (currentQuestion < questions.length) {
		showQuestion();
	} else {
		endQuiz();
	}
}

function checkAnswer() {
	var selected = document.querySelector('input[name="choice"]:checked');
	if (!selected) return;
	var answer = selected.value;

	if (answer === questions[currentQuestion].answer) {
		score++;
	}
}

