//global vars
//-timer
//-high score /check localstorage for exisitng scores
//-current score

var timer = 10;

var quiz = {
    highScore: getHighScore(),
    question: getById("question").textContent,
    choice: [
        getById("btn-1"),
        getById("btn-2"),
        getById("btn-3"),
        getById("btn-4"),
    ],
    timer: getById("timer")
};

var nextQuestion = 0;

var questionList = [
    {
        text: "This is the question",
        choices: [
            "1.",
            "2.",
            "3.",
            "4."
        ],
        answer: "1."
    },
    {
        text: "This is the question",
        choices: [
            "1. 2",
            "2. 2",
            "3. 2",
            "4. 2"
        ],
        answer: "1. 2"
    },
];

var userAnswers = [];

function getHighScore() {
    var score = localStorage.getItem("high-score");
    var scoreBoard = getById("high-score");
    if (!score) {
        scoreBoard.textContent = "High Score:";
        return "";
    }

    else {
        scoreBoard.textContent = "High Score: " + score;
        return score;
    }
}

//to shorten the call
function getById(id) {
    var el = document.getElementById(id);
    return el;
}

function startQuiz(event) {
    if (event.target.matches("#start-quiz")) {
        var startPageEl = getById("start-page");
        var quizEl = getById("quiz");
        var formEl = getById("form");
        toggleDisplay(startPageEl);
        toggleDisplay(quizEl);

        var interval = setInterval(() => {
            if (timer > 0) {
                countDown();
            }
            else {
                clearInterval(interval);
                toggleDisplay(quizEl);
                toggleDisplay(formEl);
                var score = score();
                formEl.textContent = score;
            }
        }, 1000);
        
        quiz.choice.forEach(element => {
            element.addEventListener("click", function () {
                if (nextQuestion < questionList.length)
                getQuestion(nextQuestion);
                else {
                    clearInterval(interval);
                    toggleDisplay(quizEl);
                    toggleDisplay(formEl);
                    var score = score();
                    formEl.textContent = score;
                }
            })
        });
        
        getQuestion(nextQuestion);
    }
}

function getQuestion(index) {
    quiz.question = questionList[index].text; //doesn't work
    for (i = 0; i < 4; i++) {
        quiz.choice[i].textContent = questionList[index].choices[i];
        console.log(questionList[index].choices[i]);
    }
    nextQuestion++;
}

function toggleDisplay(element) {
    if (element.style.display === "none") {
        element.style.display = "flex";
    }

    else {
        element.style.display = "none";
    }
}

function countDown() {
    quiz.timer.textContent = timer;
    timer--;
}

function score() {
    var correctAnswers;
    for (i = 0; i < userAnswers.length; i++) {
        if (userAnswers[i] === questionList[i].answer) {
            correctAnswers++;
        }
    }
    return (correctAnswers / questionList.length) * 100;
}

//steps
//-start quiz
//-first question
//-right/wrong add-points/deduct-time
//-next question
//-if time === 0/ end
//-if all questions answered/ end
//-show/claim score form
//-prompt try again

//first call

document.getElementById("start-quiz").addEventListener("click", startQuiz);