const questions = [

    {
        question: "What does \"Bug\" mean in programming?",
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
        question: "What is String in Programming?", options: ["A data type used to represent text", "a virus", "an argument", " A data type that represents whole numbers "], answer: "A data type used to represent text"
    },

    {
        question: "What is a \"Back up\"?", options: ["Process of creating a copy of the data or code to protect it.", "Process of monitoring and evaluating", "Go back", "Reset data"],
        answer: "Process of creating a copy of the data or code to protect it."
    },

    {
        question: "What are the correct Hardware components?", options: ["Programs, Browsers", "Door, window and desk", "Visual Code, SQL, Java", "Screens, hard drives, processors"], answer: "Screens, hard drives, processors"
    },

    {
        question: "What are the correct Software components?", options: ["Screens, hard drives, processors", "bookstores, mouse", "Programs, Browsers, Apps", "Computer, projector, code"], answer: "Programs, Browsers, Apps"
    },

    {
        question: "What is CPU?", options: ["It is the main electronic component of a computer", "It's personal computer care", "Part of a program", "A syntax error"], answer: "It is the main electronic component of a computer"
    },

    {
        question: "What does a Software developer do??", options: ["Build big houses", "Design, create, test and maintain programs, applications and code", "Reply to messages", "Composer"], answer: "Design, create, test and maintain programs, applications and code"
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

    currentQuestion = 0;
    score = 0;
    mistakes = 0;
    virusPosition = 20;
    answered = false;
    selectedAnswer = "";

    // Oculta el confeti si estaba activo de la partida anterior
    document.getElementById("victory-assets").classList.add("hidden");

    // Resetea visualmente la posición del virus en la pantalla
    document.getElementById("virus").style.left = "auto";
    document.getElementById("virus").style.right = "20px";

    // Tu código original que ya tenías
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

    if(mistakes >= 8){

        showVirusGameOver();

    }

}

//Pantalla final del juego
function showResult() {


    document.getElementById("quiz-screen").style.display = "none";

    document.getElementById("result-screen").style.display = "block";

    document.getElementById("final-score").innerHTML = "Your Score: " + score + "/15";

    let msg = "";

    if (score === 15) {
        msg = "Excellent! SYSTEM SECURED 🛡️";
        // Muestra el confeti removiendo la clase 'hidden'
        document.getElementById("victory-assets").classList.remove("hidden");
    } else {
        // Si no hizo 15, nos aseguramos de que el confeti se mantenga oculto
        document.getElementById("victory-assets").classList.add("hidden");

        if (score >= 13) {
            msg = "Excellent!";
        } else if (score >= 8) {
            msg = "Good Job!";
        } else {
            msg = "Keep Practicing!";
        }
    }

    document.getElementById("message").innerHTML = msg;

    document.querySelector('.trophy').classList.remove('ocultar-copa');
}

//Función de boton de volver a intentar
function restartQuiz(){

    currentQuestion = 0;
    score = 0;
    selectedAnswer = "";
    answered = false;

    mistakes = 0;
    virusPosition = 20;

    document.getElementById("virus").style.left =
        "20px";

    document.getElementById("result-screen").style.display =
        "none";

    document.getElementById("quiz-screen").style.display =
        "block";

    showQuestion();

}
//Función del GameOver para el juego
function showVirusGameOver(){


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

    document.querySelector('.trophy').classList.add('ocultar-copa');
}