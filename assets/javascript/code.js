// global variables to keep track of the score

// object of questions located in different javascript file questions.js
// var questions = {}; 

// questionCounter is incremented after each question is attempted. used to iterate new questions
var questionCounter = 0;

// score is used to calculate an additional score for the user. when the player guesses, if the player guessed correctly the time remaining is added to the score
var score = 0;

// an integer incremented when the player answers correctly
var numberRight = 0;

// an integer incremented when the palyer answers incorrectly
var numberWrong = 0;

//an array storing true or false booleans of whether the player answered correctly
var answers = [];

//a number used to hold the setTimeout within the countDown object
var timeOut;

//a number used to hold the setTimeout within the countDown object
var answerTimeOut;

// boolean variable regarding whether the game is active
var gameOver = false;

// object countDown to contain and perform countdown variables and functions
var countDown = {
    time: 5,
    reset: function() {
        countDown.time = 5;
    },
    start: function() {
        //Use setInterval to start the count here
        // print to screen here so that the number is there before the countdown begins
        var display = document.getElementById("display").innerHTML = ("<h2 class='col-md-2 col-md-offset-4'>" + countDown.time + "</h2>");

        //run the decend function every second
        counter = setInterval(countDown.descend, 1000);

    },
    stop: function() {
        //Use clearInterval to stop the count here
        clearInterval(counter);

        // reset the timer each time it is stopped
        countDown.reset();

    },
    descend: function() {
        //decrement time by 1
        countDown.time--;

        //update the time remaining
        var display = document.getElementById("display").innerHTML = ("<h2 class='col-md-2 col-md-offset-4'>" + countDown.time + "</h2>");
    }
}

// more global variables for cross function communication
//set global questionObject
var questionObject = questions["question" + questionCounter];

// variable to hold the question
var question = questionObject.question;

// variable array to hold the possible choices
var choices = questionObject.choices;

// variable setting the answer
var correctAnswer = questionObject.answer;

// variable setting the like to image
var questionImage = questionObject.image;

// HTML locations
var questionArea = document.getElementById("question-area");
var timerDisplay = document.getElementById("display");

// ---------- end global variables ----------

// ----------Start functions ----------

// this function is used to start the game. it resets the values and runs the nextQuestion function.
function start() {

    // reset values
    questionCounter = 0;
    score = 0;
    numberRight = 0;
    numberWrong = 0;
    answers = [];
    gameOver = false;
    countDown.time = 5;
    questionObject = questions["question" + 0];
    question = questionObject.question;
    choices = questionObject.choices;
    correctAnswer = questionObject.answer;
    questionImage = questionObject.image;

    //generate first question
    nextQuestion();
}

// this function creates the next question and creates the click listeners for the choices. it also initializes the timers.
function nextQuestion() {

    // first check to see if endGame condition is met
    endGame();

    if (!gameOver) {

        // call the questionObect and its properties
        questionObject = questions["question" + questionCounter];
        question = questionObject.question;
        choices = questionObject.choices;
        correctAnswer = questionObject.answer;
        questionImage = questionObject.image;
        
        // print question to the screen
        questionArea.innerHTML = "<h2>" + question + "</h2>";

        // output the question choices to #question-area
        for (var i = 0; i < 4; i++) {

            // apply letter to choice
            var letter;
            switch (i) {
                case 0:
                    letter = "a: ";
                    break;
                case 1:
                    letter = "b: ";
                    break;
                case 2:
                    letter = "c: ";
                    break;
                case 3:
                    letter = "d: ";
                    break;
            }

            // create paragraph element to take the choice options  
            var optionH3 = document.createElement("h3");
            optionH3.innerHTML = letter + choices[i];

            //test for correct answer and add a value of true for the correct answer
            if (choices[i] == questionObject.answer) {
                optionH3.value = "true";
            } else optionH3.value = "false";

            // add hover class to paragraph element
            optionH3.className = "choices hvr-grow";

            //add data value to paragraph element
            optionH3.data = ("number", i);

            // add the paragraph element to the section
            questionArea.appendChild(optionH3);

            //add <br> for spacing issue
            var br = document.createElement("br");
            questionArea.appendChild(br);
        }

        // ---------- click listeners on .choices----------
        // get all elements with the class .choices
        var choicesClicks = document.getElementsByClassName("choices");

        // add clicklistener to each choice with the class ".choices"
        for (var i = 0; i < choicesClicks.length; i++) {
            choicesClicks[i].addEventListener("click", function() {

                // actions to take if answer is correct
                if (this.value == "true") {
                    numberRight++;
                    answers.push("Correct!");
                    score += countDown.time; // add time remaining to score

                } else {
                    numberWrong++;
                    answers.push("Incorrect.");
                }

                // stop the outOfTime function on button click
                stopTimer();

                // stop the visual display of the countdown
                countDown.stop();

                // go to answerScreen for status update
                answerScreen();

            })
        }

        // ---------- end click listeners ----------

        // set up the visible countdown using interval timers
        countDown.start();

        // run the out of time timer. will run the timesUp function in five seconds unless the timer is cleared
        outOfTime();

    }

}

// functions for Timeout timers. outOfTime will pull up the answerScreen
function outOfTime() {
    timeOut = setTimeout(timesUp, 5000);
}

function stopTimer() {
    clearTimeout(timeOut);
}

// this function handles the consequences of not answering the question in time
// stop running timers. push incorrect. increment numberWrong. load answerScreen
function timesUp() {

    stopTimer();

    // stop the visual countdown
    countDown.stop();

    // did not answer the question in time, so increment numberWrong
    numberWrong++;

    // did not answer the question in time, so push wrong to answers array
    answers.push("Incorrect.");
    
    // load answer screen
    answerScreen();
}

// this function is used on the answerScreen
function nextQuestionTimer() {
    answerTimeOut = setTimeout(nextQuestion, 5000);
}

function stopAnswerTimer() {
    clearTimeout(answerTimeOut);
}

// this is the screen to show after each attempted question. 
// tasks: increment questionCount. endGame check. show results
function answerScreen() {

    // look at the last answer in the answer array
    var rightOrWrong = answers[answers.length-1];

    questionArea.innerHTML = "<h2>" + rightOrWrong + "</h2>";

    // create elements to show the stats
    questionArea.appendChild(document.createElement("hr"));

    if (rightOrWrong == "Correct!") {
        // when answer is right show giphy image

        var image = document.createElement("img");
        image.setAttribute("src", questionImage);
        image.setAttribute("alt", "giphy image");
        questionArea.appendChild(image);
    }

    else {

        // when answer is wrong, show correct answer
        var h3 = document.createElement("h3");
        var text = document.createTextNode("The correct answer is: " + correctAnswer);
        h3.appendChild(text);
        questionArea.appendChild(h3);
    }

    nextQuestionTimer();

    questionCounter++;

}

// this function checks to see if the endGame condition is met and handles the true result
function endGame() {
    if (answers.length >= 10) {

        // end game with boolean
        gameOver = true;

        // ---------- show stats ----------

        // first clear "#question-area"
        questionArea.innerHTML = "";

        // create elements to show the stats
        var gameOverH2 = document.createElement("h2");
        gameOverH2.innerHTML = "Game Over!";
        questionArea.appendChild(gameOverH2);

        questionArea.appendChild(document.createElement("hr"));

        // show answers that were right
        var h3 = document.createElement("h3");
        var text = document.createTextNode("Correct Answers: " + numberRight);
        h3.appendChild(text);
        questionArea.appendChild(h3);

        // show answers that were wrong
        h3 = document.createElement("h3");
        text = document.createTextNode("Incorrect Answers: " + numberWrong);
        h3.appendChild(text);
        questionArea.appendChild(h3);

        h3 = document.createElement("h3");
        text = document.createTextNode("Score: " + score);
        h3.appendChild(text);
        questionArea.appendChild(h3);

        var newButton = document.createElement("button");
        text = document.createTextNode("Try Again?");
        newButton.appendChild(text);
        newButton.setAttribute("id", "newGameButton");

        // add event listener here
        newButton.addEventListener("click", function() {
            console.log("hello");
            start();
        });
        questionArea.appendChild(newButton);

    }
}

// ---------- code to run on start of game ----------

start();

//document.addEventListener("click", "#newGameButton", function() {
//    console.log("reached")
//    start();
//});
