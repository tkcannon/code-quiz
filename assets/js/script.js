//global vars
//-timer
//-high score /check localstorage for exisitng scores
//-current score

var timer = 60;
//functions
//-questions
//-timer
//-score

var quiz = {
    highScore: getHighScore(),
    question: getById("question"),
    answers: [
        getById("btn-1"),
        getById("btn-2"),
        getById("btn-3"),
        getById("btn-4"),
    ],
    timer: getById("timer")
};

//to shorten the call
function getById(id) {
    var el = document.getElementById(id);
    return el;
}

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

function startQuiz(event) {
    if (event.target.matches("#start-quiz")) {
        var startPageDiv = getById("start-page");
        var quizDiv = getById("quiz");
        toggleDisplay(startPageDiv);
        toggleDisplay(quizDiv);

        var interval = setInterval(() => {
            if(timer > 0) {
                countDown();
            }
            else{
                toggleDisplay(quizDiv);
                clearInterval(interval);
            }
        }, 1000);

        
    }
}

function toggleDisplay(element) {
    if (element.style.display === "none") {
        element.style.display = "flex";
    }

    else {
        element.style.display = "none";
    }
}

function getQuestion(num) {
    console.log("getQuestion " + num + " called");
    var questions = [
        {
            text: "1",
            a1: "yes",
            a2: "no",
            a3: "maybe",
            a4: "so?",
            answer: "maybe"
        },
        {
            text: "1",
            a1: "yes",
            a2: "no",
            a3: "maybe",
            a4: "so?",
            answer: "maybe"
        },
        {
            text: "1",
            a1: "yes",
            a2: "no",
            a3: "maybe",
            a4: "so?",
            answer: "maybe"
        },
        {
            text: "1",
            a1: "yes",
            a2: "no",
            a3: "maybe",
            a4: "so?",
            answer: "maybe"
        },
        {
            text: "1",
            a1: "yes",
            a2: "no",
            a3: "maybe",
            a4: "so?",
            answer: "maybe"
        },
        {
            text: "1",
            a1: "yes",
            a2: "no",
            a3: "maybe",
            a4: "so?",
            answer: "maybe"
        },
        {
            text: "1",
            a1: "yes",
            a2: "no",
            a3: "maybe",
            a4: "so?",
            answer: "maybe"
        },
        {
            text: "1",
            a1: "yes",
            a2: "no",
            a3: "maybe",
            a4: "so?",
            answer: "maybe"
        },
        {
            text: "1",
            a1: "yes",
            a2: "no",
            a3: "maybe",
            a4: "so?",
            answer: "maybe"
        },
        {
            text: "1",
            a1: "yes",
            a2: "no",
            a3: "maybe",
            a4: "so?",
            answer: "maybe"
        },
        {
            text: "1",
            a1: "yes",
            a2: "no",
            a3: "maybe",
            a4: "so?",
            answer: "maybe"
        },
        {
            text: "1",
            a1: "yes",
            a2: "no",
            a3: "maybe",
            a4: "so?",
            answer: "maybe"
        },
        {
            text: "1",
            a1: "yes",
            a2: "no",
            a3: "maybe",
            a4: "so?",
            answer: "maybe"
        },
    ];

    return questions[num];
}

function countDown () {
    quiz.timer.textContent = timer;
    timer--;
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
