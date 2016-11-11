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
        var display = document.getElementById("display").innerHTML = ("<h2>" + countDown.time + "</h2>");

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
        var display = document.getElementById("display").innerHTML = ("<h2>" + countDown.time + "</h2>");
    }
}


// HTML locations
var questionArea = document.getElementById("question-area");
var timerDisplay = document.getElementById("display");

// ---------- end global variables ----------

// ----------Start functions ----------

// this function is used to start the game. it resets the values and runs the nextQuestion function.
function start() {

    // reset values
    var questionCounter = 0;
    var score = 0;
    var numberRight = 0;
    var numberWrong = 0;
    var answers = [];
    var gameOver = false;
    countDown.time = 5;

    //generate first question
    nextQuestion();
}

// this function creates the next question and creates the click listeners for the choices. it also initializes the timers.
function nextQuestion() {

    if (!gameOver) {

        // variable to the question object
        var questionObject = questions["question" + questionCounter];
        //console.log(questionObject);

        // variable to hold the question
        var question = questionObject.question;
        //console.log(question);

        // variable array to hold the possible choices
        var choices = questionObject.choices;

        // variable setting the answer
        var correctAnswer = questionObject.answer;

        // variable setting the like to image
        var questionImage = questionObject.image;

        //console.log(choices);

        // output the question to #question-area
        questionArea.innerHTML = "<h2>" + (questionCounter + 1) + ": " + question + "</h2>";

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

            // create paragraph element to take the answer options  
            var optionH3 = document.createElement("h3");
            optionH3.innerHTML = letter + choices[i];

            //test for correct answer and add a value of true for the correct answer
            if (choices[i] == questionObject.answer) {
                optionH3.value = "true";
            } else optionH3.value = "false";

            // add hover class to paragraph element
            optionH3.className = "choices hvr-underline-from-center hvr-grow";

            //add data value to paragraph element
            optionH3.data = i;

            // add the paragraph element to the section
            questionArea.appendChild(optionH3);

            //add <br> for spacing issue
            var br = document.createElement("br");
            questionArea.appendChild(br);
        }

        // ---------- click listeners ----------
        var choicesClicks = document.getElementsByClassName("choices");

        // add clicklistener to each choice with the class ".choices"
        for (var i = 0; i < choicesClicks.length; i++) {
            choicesClicks[i].addEventListener("click", function() {
                //console.log(this.value);
                questionCounter++;
                console.log(questionCounter);

                // actions to take if answer is correct
                if (this.value == "true") {
                    numberRight++;
                    answers.push("correct");
                    score += countDown.time; // add time remaining to score
                    answerScreen("Correct!", correctAnswer, questionImage);

                } else {
                    numberWrong++;
                    answers.push("wrong");
                    answered = true;
                    answerScreen("Incorrect.", correctAnswer, questionImage);
                }

                // stop the outOfTime function on button click
                stopTimer();

                // stop the visual display of the countdown
                countDown.stop();

                // check end game condition
                endGame();



                // run nextQuestion regardless of whether answer was correct or incorrect
                //nextQuestion(questionCounter);
            })
        }

        // ---------- end click listeners ----------

        // set up the visible countdown using interval timers
        countDown.start();

        // run the out of time timer. will run the timesUp function in five seconds unless the timer is cleared
        outOfTime();

    }

}

// ********** for basic homework game (make this an option) **********
function createQuestions(object) {
    var location = document.getElementById("question-area");
    for (var i = 0; i < 10; i++) {
        console.log(object["question" + i].question);
        var questionH2 = document.createElement("h2");
        questionH2.innerHTML = (i + 1) + ": " + object["question" + i].question;
        location.appendChild(questionH2);

        for (var j = 0; j < 4; j++) {

            var letter;
            switch (j) {
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

            // create input element to take the answer options  
            var optionP = document.createElement("p");
            optionP.innerHTML = letter + object["question" + i].choices[j];

            // add type radio so that the input will be radio buttons
            optionP.type = "radio";

            // add name so that the radios will be related
            optionP.name = "question" + i;

            //test for correct answer and add a value of true for the correct answer
            if (object["question" + i].choices[j] == object["question" + i].answer) {
                optionP.value = "true";
            } else optionP.value = "false";

            // add hover class to paragraph element
            optionP.className = "hvr-underline-from-center hvr-grow";

            //add data value to paragraph element
            optionP.data = i;

            // add the paragraph element to the section
            location.appendChild(optionP);

            //add <br> for spacing issue
            var br = document.createElement("br");
            location.appendChild(br);
        }
    }
}

function endGame() {
    if (answers.length >= 10) {

        // end game with boolean
        gameOver = true;

        // show stats

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

// functions for Timeout timers
function outOfTime() {
    timeOut = setTimeout(timesUp, 5000);
}

function stopTimer() {
    clearTimeout(timeOut);
}

function timesUp() {
    questionCounter++;
    numberWrong++;
    answers.push("wrong");
    countDown.stop();

    // perform endGame check here
    if (answers.length == 10) gameOver = true;
    endGame();
    nextQuestion(questionCounter);
}

function answerScreen(rightOrWrong, correctAnswer, questionImage) {
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

    outOfTime();

}

// ---------- code to run on start of game ----------

start();

//document.addEventListener("click", "#newGameButton", function() {
//    console.log("reached")
//    start();
//});
