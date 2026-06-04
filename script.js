const questions = [

    {
        question: "What does Bug mean in programming?",
        options: ["A software error", "A computer virus", "A keyboard shortcut", "A database"],
        answer: "A software error"
    },

    {
        question: "What does Compiler do?",
        options: ["Stores data", "Converts code into executable form", "Creates databases", "Designs interfaces"],
        answer: "Converts code into executable form"
    },

    {
        question: "What is an Object?",
        options: ["A compiler", "An instance of a class", "A variable type", "A comment"],
        answer: "An instance of a class"
    },

    {
        question: "What does Database mean?",
        options: ["A collection of organized data", "A programming language", "web browser", "A function"],
        answer: "A collection of organized data"
    },

    {
        question: "Which of the following is NOT a programming language??", options: ["Python", "Java", "HTML", "C++"], answer: "HTML"
    },

    {
        question: "In CSS, what property is used to change the background color of an element?", options: ["Color", "Front-color", "background-color", "border-color"],
        answer: "background-color"
    },

    {
        question: "What function does a \"Comment\" serve in the code?", options: ["It makes the program run faster", "Explain the code", "Shows a message", "Connect the code to the internet."], answer: "Explain the code"
    },

    {
        question: "What does the acronym CSS stand for??", options: ["Computer Style Sheets", "Creative Style Systems", "Cascading Style Sheets", "Complex Style Syntax"],
        answer: "Cascading Style Sheets"
    },

    {
        question: "What is Github?", options: ["A programming language for apps", "A cloud-based platform for storing, organizing, and sharing source code.", "A type of computer virus", "A text editor for writing fast code."],
        answer: "A cloud-based platform for storing, organizing, and sharing source code."
    },

    {
        question: "What is String in Programming?", options: ["A data type used to represent text", "", "Blue", "Green"], answer: "Yellow"
    },

    {
        question: "What animal barks?", options: ["Cat", "Dog", "Fish", "Bird"], answer: "Dog"
    },

    {
        question: "Where do fish live?", options: ["Water", "Tree", "Road", "House"], answer: "Water"
    },

    {
        question: "How many days are in a week?", options: ["5", "6", "7", "8"], answer: "7"
    },

    {
        question: "What season comes after spring?", options: ["Summer", "Winter", "Autumn", "Rain"], answer: "Summer"
    },

    {
        question: "What do you drink when thirsty?", options: ["Coffee", "Tea", "Water", "Milk"], answer: "Water"
    }];

//Variables del juego
let currentQuestion = 0;
let score = 0;
let selectedAnswer = "";
let answered = false;
//Variables de errores
let virusPosition = 20;
let mistakes = 0;

//Sonidos para respuesras malas y correctas
const correctSound =
    new Audio("sounds/correct.mp3.mp3");

const wrongSound =
    new Audio("sounds/wrong.mp3.mp3");

//Mostrar las instrucciones
function showInstructions() {

    document.getElementById("welcome-screen").style.display = "none";

    document.getElementById("instructions-screen").style.display = "block";

}

//Iniciar el Quiz
function startQuiz() {

    document.getElementById("instructions-screen").style.display = "none";

    document.getElementById("quiz-screen").style.display = "block";

    showQuestion();

}

//Mostrar preguntas

function showQuestion() {

    let q = questions[currentQuestion];

    document.getElementById("question-number").innerHTML = "Question " + (currentQuestion + 1) + " of 15";

    document.getElementById("question").innerHTML = q.question;

    let answersDiv = document.getElementById("answers");

    answersDiv.innerHTML = "";

    q.options.forEach((option, index) => {

        let button = document.createElement("button");

        button.className = "option";

        const letters = ["A", "B", "C", "D"];

        button.innerHTML = "<strong>" +
            letters[index] + ")</strong> " + option;

        button.dataset.answer = option;

        button.onclick = function () {

            if (answered) {
                return;
            }

            answered = true;

            selectedAnswer = option;

            let correctAnswer =
                questions[currentQuestion].answer;

            if (option === correctAnswer) {

                button.style.backgroundColor =
                    "green";

                button.style.color =
                    "white";

                //Agregar sonido
                correctSound.currentTime = 0;
                correctSound.play();

                score++;

            } else {

                button.style.backgroundColor =
                    "red";
                button.classList.add("wrong");

                button.style.color =
                    "white";

                moveVirus();

                wrongSound.currentTime = 0;
                wrongSound.play();

                // Mostrar cuál era la correcta
                let buttons =
                    document.querySelectorAll(".option");

                buttons.forEach(btn => {

                    if (btn.dataset.answer  === correctAnswer) {

                        btn.style.backgroundColor =
                            "green";

                        btn.style.color =
                            "white";
                    }

                });

            }
            //Desactivar todas las opciones despues de contestar
            let buttons =
                document.querySelectorAll(".option");

            buttons.forEach(btn => {
                btn.disabled = true;
            });

        };

        answersDiv.appendChild(button);
    });

}

//Validar respuestas
function nextQuestion() {
    if (!answered) {

        alert(
            "Please select an answer first."
        );

        return;
    }

    if (selectedAnswer === "") {
        alert("Please select an answer.");
        return;
    }

    ///if (selectedAnswer === questions[currentQuestion].answer) {
       /// score++;


    selectedAnswer = "";

    currentQuestion++;

    if (currentQuestion < questions.length) {
        answered = false;
        showQuestion();
    } else {
        showResult();
    }
}

/*Funciones para mover el virus*/

function moveVirus(){

    mistakes++;

    virusPosition += 40;

    document.getElementById(
        "virus"
    ).style.left =
        (20 - virusPosition) + "px";

    if(mistakes >= 5){

        showVirusGameOver();

    }

}

//Pantalla final del juego
function showResult() {

    document.getElementById("quiz-screen").style.display = "none";

    document.getElementById("result-screen").style.display = "block";

    document.getElementById("final-score").innerHTML = "Your Score: " + score + "/15";

    let msg = "";

    if (score >= 13) {

        msg = "Excellent!";

    } else if (score >= 8) {

        msg = "Good Job!";

    } else {

        msg = "Keep Practicing!";

    }

    document.getElementById("message").innerHTML = msg;

}

//Función del GameOver para el juego
function showVirusGameOver(){

    clearInterval(timer);

    document.getElementById(
        "quiz-screen"
    ).style.display =
        "none";

    document.getElementById(
        "result-screen"
    ).style.display =
        "block";

    document.getElementById(
        "final-score"
    ).innerHTML =
        "💀 SYSTEM INFECTED";

    document.getElementById(
        "message"
    ).innerHTML =
        "The virus reached the programmer!";
}