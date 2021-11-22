//global vars
//-timer
//-high score /check localstorage for exisitng scores
//-current score

var activeEl;
var startPageEl = getById("start-page");
var formEl = getById("form");
var quizEl = getById("quiz");
var endPageEl = getById("end-page");
activeEl = startPageEl;

var timer = 10;

scoreList = JSON.parse(localStorage.getItem("score"));

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


//to shorten the call
function getById(id) {
    var el = document.getElementById(id);
    return el;
}

function startQuiz(event) {
    if (event.target.matches("#start-quiz")) {

        setActiveDisplay(quizEl);

        var interval = setInterval(() => {
            if (timer > 0) {
                countDown();
            }
            else {
                clearInterval(interval);
                setActiveDisplay(formEl);
                score();
            }
        }, 1000);

        //quiz cycle
        getQuestion(nextQuestion);
        
        quiz.choice.forEach(element => {
            element.addEventListener("click", function () {

                userAnswers.push(element.textContent);
                
                if (element.textContent === questionList[nextQuestion - 1].answer) {
                    console.log("Correct!");
                }
                else {
                    console.log("Wrong");
                    timer -= 5;
                }

                if (nextQuestion < questionList.length) {
                    getQuestion(nextQuestion);
                }
                else {
                    clearInterval(interval);
                    setActiveDisplay(formEl);
                    score();
                }
            })
        });
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

function setActiveDisplay(element) {
    if (element !== activeEl) {
        activeEl.style.display = "none";
        element.style.display = "flex";
        activeEl = element;
    }
}

function countDown() {
    quiz.timer.textContent = timer;
    timer--;
}

function getHighScore () {
    if (!scoreList) {
        return "";
    }

    else {
        return scoreList[0];
    }
}

function score() {
    var correctAnswers = 0;
    for (i = 0; i < userAnswers.length; i++) {
        if (userAnswers[i] === questionList[i].answer) {
            correctAnswers++;
        }
    }

    var score = (correctAnswers / questionList.length) * 100;

    if (score > quiz.highScore) {
        formEl.textContent = "New High Score! " + score;
    }
    else {
        formEl.textContent = "Score: " + score;
    }
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