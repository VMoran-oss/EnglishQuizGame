const questions = [

    {
        question: "What is the capital of France?", options: ["Paris", "Madrid", "Rome", "Berlin"], answer: "Paris"
    },

    {
        question: "What color is the sky?", options: ["Green", "Blue", "Red", "Yellow"], answer: "Blue"
    },

    {
        question: "What animal says meow?", options: ["Dog", "Cat", "Horse", "Bird"], answer: "Cat"
    },

    {
        question: "What is 5 + 5?", options: ["8", "10", "12", "15"], answer: "10"
    },

    {
        question: "What color is grass?", options: ["Blue", "Green", "Red", "Black"], answer: "Green"
    },

    {
        question: "What do bees make?", options: ["Milk", "Honey", "Water", "Juice"], answer: "Honey"
    },

    {
        question: "What is the opposite of hot?", options: ["Cold", "Tall", "Fast", "Big"], answer: "Cold"
    },

    {
        question: "What day comes after Monday?",
        options: ["Sunday", "Tuesday", "Friday", "Saturday"],
        answer: "Tuesday"
    },

    {
        question: "What is 10 - 2?", options: ["6", "7", "8", "9"], answer: "8"
    },

    {
        question: "What color is a banana?", options: ["Red", "Yellow", "Blue", "Green"], answer: "Yellow"
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

    q.options.forEach(option => {

        let button = document.createElement("button");

        button.className = "option";

        button.innerHTML = option;

        button.onclick = function () {

            // Quitar selección anterior
            let options = document.querySelectorAll(".option");

            options.forEach(btn => {
                btn.style.border = "none";
            });

            // Marcar la seleccionada
            button.style.border = "3px solid green";

            selectedAnswer = option;
        };

        answersDiv.appendChild(button);
    });

}

//Validar respuestas
function nextQuestion(){

    if(selectedAnswer === ""){
        alert("Please select an answer.");
        return;
    }

    if(selectedAnswer === questions[currentQuestion].answer){
        score++;
    }

    selectedAnswer = "";

    currentQuestion++;

    if(currentQuestion < questions.length){
        showQuestion();
    }else{
        showResult();
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