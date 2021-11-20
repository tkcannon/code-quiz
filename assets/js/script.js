//global vars
//-timer
//-high score /check localstorage for exisitng scores
//-current score

var timer = 60;
var highscore = getHighScore();
var currentscore;

//functions
//-questions
//-timer
//-score

function getHighScore() {
   var score = parseInt(localStorage.getItem("highscore"));

   if (!score) {
       return "";
   }

   else {
       return score;
   }
}

function startQuiz() {
    
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
