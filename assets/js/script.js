//global vars

//get el from html
var startEl = getById("start");
var quizEl = getById("quiz");
var scoreSubmitEl = getById("score-submit");
var highScoresEl = getById("high-scores");
var activeSection = startEl;

var quiz = {
    highScoreEl: getById("high-score"),
    questionEl: getById("question"),
    choiceEl: [
        getById("btn-1"),
        getById("btn-2"),
        getById("btn-3"),
        getById("btn-4"),
    ],
    timerEl: getById("timer")
};

var scoreDefault = ['', 0];

var timerDefault = 10;

var highScores = JSON.parse(localStorage.getItem('scores'));

//question vars

var questions = [
    {
        text: "placehoder quesiton",
        choices: [
            "1. ",
            "2. ",
            "3. ",
            "4. "
        ],
        answer: "1. "
    },
    {
        text: "placehoder quesiton 2",
        choices: [
            "1. ",
            "2. ",
            "3. ",
            "4. "
        ],
        answer: "2. "
    },
    {
        text: "placehoder quesiton 3",
        choices: [
            "1. ",
            "2. ",
            "3. ",
            "4. "
        ],
        answer: "3. "
    }
];

//funcions

//start quiz
function startQuiz(event) {
    if (event.target.matches("#start-btn") || event.target.matches("#restart-btn")) {
        var score = scoreDefault;
        var timer = timerDefault;

        displaySection(quizEl);

        //timer
        var interval = setInterval(() => {
            if (timer > 0) {
                quiz.timerEl.textContent = "Time Left: " + timer;
                timer--;
            }
            else {
                clearInterval(interval);
                displaySection(scoreSubmitEl);
                submitH1 = getById("submit-form-h1");
                submitH1.textContent = "You ran out of time!";
            }
        }, 1000);

        //start questions
        var activeQuestion = 0;
        var rightAnswers = 0;

        getQuestion(activeQuestion);

        quiz.choiceEl.forEach(element => {
            element.addEventListener("click", function () {
                feedBackText = getById("correct-wrong");
                if (element.textContent === questions[activeQuestion].answer) {
                    feedBackText.textContent = "correct";
                    rightAnswers++;
                }

                else {
                    feedBackText.textContent = "wrong";
                }

                activeQuestion++;
                if (activeQuestion < questions.length) {
                    getQuestion(activeQuestion);
                }
                else {
                    clearInterval(interval)
                    displaySection(scoreSubmitEl);
                }
            })
        });

        score[1] = Math.ceil(rightAnswers / questions.length * 100);
        getById("final-score").textContent = score[1];

        getById("submit-btn").addEventListener("click", function (event) {
            event.preventDefault();
            var name = getById("name").value;
            if (name != null) {
                score[0] = name;
                refreshHighScores(score);
                listHighScores();
                displaySection(highScoresEl);
            }
        });
    }
}

//get next question
function getQuestion(num) {
    quiz.questionEl.textContent = questions[num].text;
    for (i = 0; i < 4; i++) {
        quiz.choiceEl[i].textContent = questions[num].choices[i];
    }
}

//score

//set new high score if applicable
//doesn't work properly
function refreshHighScores(newScore) {
    if (!highScores) {
        highScores = {
            first: newScore,
            second: ["", ""],
            third: ["", ""]
        }
    }
    else if (newScore > highScores.first[1]) {
        highScores.third = highScores.second;
        highScores.second = highScores.first;
        highScores.first = newScore;
    }
    else if (newScore > highScores.second[1]) {
        highScores.third = highScores.second;
        highScores.second = newScore;
    }
    else if (newScore > highScores.third[1]) {
        highScores.third = newScore;
    }

    localStorage.setItem("scores", JSON.stringify(highScores));
}

//high score list
//unfinished
function listHighScores() {
    var hsList = [
        getById("hs-1"),
        getById("hs-2"),
        getById("hs-3"),
    ];

    hsList[0].textContent = highScores.first;
    hsList[1].textContent = highScores.second;
    hsList[2].textContent = highScores.third;
}

//clear high scores
function clearHighScores(event) {
    if (event.target.matches("#clear-high-scores")) {
        localStorage.clear();
        highScores.first = ["", ""];
        highScores.second = ["", ""];
        highScores.third = ["", ""];
        listHighScores();
    }
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

document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("clear-high-scores").addEventListener("click", clearHighScores);
document.getElementById("restart-btn").addEventListener("click", startQuiz);
