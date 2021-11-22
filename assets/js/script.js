//global vars

//get el from html
var startEl = getById("start");
var quizEl = getById("quiz");
var scoreSubmitEl = getById("score-submit");
var scoreBoardEl = getById("score-board");
var answerText = getById("answer");
var activeSection = startEl;
var scoreBoardList = document.querySelector("#score-board-list");

var quiz = {
    highScoreEl: getById("high-score"),
    questionEl: getById("question"),
    choiceEl: [
        document.querySelector("#btn-1"),
        document.querySelector("#btn-2"),
        document.querySelector("#btn-3"),
        document.querySelector("#btn-4"),
    ],
    timerEl: getById("timer"),
    activeQuestion: 0,
    rightAnswers: 0,
    score: 0
};

var timerDefault = 60;
var interval;
var scores;
var highScore;

var questions = [
    {
        text: "placehoder quesiton",
        choices: [
            "1. choice 1",
            "2. choice 2",
            "3. choice 3",
            "4. choice 4"
        ],
        answer: "1. choice 1"
    },
    {
        text: "placehoder quesiton 2",
        choices: [
            "1. choice 1",
            "2. choice 2",
            "3. choice 3",
            "4. choice 4"
        ],
        answer: "2. choice 2"
    },
    {
        text: "placehoder quesiton 3",
        choices: [
            "1. choice 1",
            "2. choice 2",
            "3. choice 3",
            "4. choice 4"
        ],
        answer: "3. choice 3"
    },
    {
        text: "placehoder quesiton 4",
        choices: [
            "1. choice 1",
            "2. choice 2",
            "3. choice 3",
            "4. choice 4"
        ],
        answer: "4. choice 4"
    },

];

//funcions

//start quiz
function startQuiz() {

    scores = JSON.parse(localStorage.getItem("scores"));

    if (!scores) {
        scores = {
            scoreList: [

            ]
        };
        quiz.highScoreEl.textContent = "High Score: none";
    }
    else {
        highScore = scores.scoreList[0][1];
        scores.scoreList.forEach(element => {
            if (element[1] > highScore) {
                highScore = element[1];
            }
        });
        quiz.highScoreEl.textContent = "High Score: " + highScore;
    }

    var timer = timerDefault;
    displaySection(quizEl);

    //timer
    interval = setInterval(() => {
        if (timer > 0) {
            quiz.timerEl.textContent = "Time Left: " + timer;
            timer--;
        }
        else {
            clearInterval(interval);
            submitH1 = getById("submit-form-h1");
            submitH1.textContent = "You ran out of time!";
            score(quiz.rightAnswers);
            displaySection(scoreBoardEl);
        }
    }, 1000);

    //start questions
    getQuestion();
}

function restartQuiz() {
    //reset data
    quiz.score = 0;
    quiz.rightAnswers = 0;
    quiz.activeQuestion = 0;
    startQuiz();
}

function getQuestion() {
    quiz.questionEl.textContent = questions[quiz.activeQuestion].text;
    for (i = 0; i < 4; i++) {
        quiz.choiceEl[i].textContent = questions[quiz.activeQuestion].choices[i];
    }
}

function checkAnswer(event) {
    if (event.target.textContent === questions[quiz.activeQuestion].answer) {
        quiz.rightAnswers++;
        answerText.textContent = "Correct!";
    }
    else {
        answerText.textContent = "Wrong"
    }
    quiz.activeQuestion++;
    if (quiz.activeQuestion < questions.length) {
        getQuestion();
    }
    else {
        clearInterval(interval);
        score(quiz.rightAnswers);
        displaySection(scoreSubmitEl);
    }
}

function score(num) {
    quiz.score = Math.ceil(num / questions.length * 100);
    var finalScore = getById("final-score");
    if (quiz.score > highScore) {
        finalScore.textContent = "Congratulations! You got a new High Score! Your score: " + quiz.score;
    }
    else {
        finalScore.textContent = "Your score: " + quiz.score;
    }
}

function submitScore(event) {
    event.preventDefault();
    var name = getById("name").value;
    scores.scoreList.push([name, quiz.score]);
    updateScores();
    displaySection(scoreBoardEl);
}

function updateScores(clear) {
    scoreBoardList.innerHTML = "";
    scores.scoreList.forEach(element => {
        var li = document.createElement("li");
        li.textContent = element;
        scoreBoardList.appendChild(li);
    });
    localStorage.setItem("scores", JSON.stringify(scores));
}

function clearScores() {
    console.log(scores);
    localStorage.clear();
    updateScores();
}

//shorten document.getElementById
function getById(el) {
    el = document.getElementById(el);
    return el;
}

//toggle displayed section
function displaySection(el) {
    if (el !== activeSection) {
        activeSection.style.display = "none";
        el.style.display = "flex";
        activeSection = el;
    }
}

document.querySelector("#start-btn").addEventListener("click", startQuiz);
quiz.choiceEl.forEach(element => {
    element.addEventListener("click", checkAnswer)
});
document.querySelector("#submit-btn").addEventListener("click", submitScore);
document.querySelector("#restart-btn").addEventListener("click", restartQuiz);
getById("clear-score-board").addEventListener("click", clearScores());