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