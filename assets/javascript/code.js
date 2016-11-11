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
        counter = setInterval(countDown.descend, 1000);
        console.log(countDown.time);

    },
    stop: function() {
        //Use clearInterval to stop the count here
        console.log("stop");
        clearInterval(counter);


    },
    descend: function() {
        console.log(countDown.time);
        //increment time by 1, remember we cant use "this" here
        countDown.time--;
        //Get the current time, pass that into the stopwatch.timeConverter function, and save the result in a variable
        var temp = countDown.timeConverter(countDown.time);
        //Use the variable you just created to show the converted time in the "display" div
        var display = document.getElementById("display").innerHTML = ("<p>" + temp + "</p>");
    },
    timeConverter: function(t) {
        //This function is done. You do not need to touch it. It takes the current time in seconds and converts it to minutes and seconds (mm:ss).
        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (minutes === 0) {
            minutes = "00";
        } else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
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

    // variable to the question object
    var questionObject = questions["question" + questionCounter];
    //console.log(questionObject);

    // variable to hold the question
    var question = questionObject.question;
    //console.log(question);

    // variable array to hold the possible choices
    var choices = questionObject.choices;
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
            
            // stop the outOfTime function on button click
            stopTimer();

            // actions to take if answer is correct
            if (this.value == "true") {
                numberRight++;
                answers.push("correct");
                score += countDown.time; // add time remaining to score
                answered = true;

            } else {
                numberWrong++;
                answers.push("wrong");
                answered = true;
            }

            // check end game condition
            endGame();

            // run nextQuestion regardless of whether answer was correct or incorrect
            if (!gameOver) nextQuestion(questionCounter);
        })
    }

    // ---------- end click listeners ----------

    // run the out of time timer. will run the timesUp function in five seconds unless the timer is cleared
    outOfTime();

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
    nextQuestion();
}

// ---------- code to run on start of game ----------

start();

