// List of Questions and Answers
// Obtener el botón por su identificador
var questions = document.getElementById("questions");

// Establecer el tamaño del botón
questions.style.width = "380px";
questions.style.height = "0px";

// Establecer el color de fondo del botón
questions.style.backgroundColor = "black";

// Establecer el color de la letra del botón
questions.style.color = "black";

// Establecer el tipo de letra del botón
questions.style.fontFamily = "times new roman";
questions.style.fontWeight = "bold";
questions.style.fontSize = "15px";
questions.style.textAlign = "center";


var questions = [
    {

        prompt: "¿Qué es la didáctica?",
        options: ["a)	Es la pedagogía que no permite abordar o analizar los esquemas y planes destinados a plasmar las bases de cada teoría pedagógica.", 
        "b)	Se refiere a desarrollar una buena capacidad de trabajo en equipo implica poder tomar en cuenta solo las ideas de uno mismo.", 
        "c)	Se entiende por aquella disciplina de carácter científico-pedagógica que se focaliza en cada una de las etapas del aprendizaje.", 
        "d)	Es la que implica poder hacer un perfil teórico."],
        answer: "c)	Se entiende por aquella disciplina de carácter científico-pedagógica que se focaliza en cada una de las etapas del aprendizaje."
    },

    {
        prompt: "¿Cuáles son las cuatro formas que puede ser entendida la clasificación de la didáctica?",
        options: ["a)	Cómo una técnica, como una ciencia aplicada, simplemente como una teoría o bien como una ciencia básica de la instrucción.", 
        "b)	Abordar, analizar, diseñar y planes.", 
        "c)	Con un perfil teórico, descriptivos, explicativos y predictivos.", 
        "d)	Habilidades de negociación, didáctica, mediación y toma  de decisiones."],
        answer: "a)	Cómo una técnica, como una ciencia aplicada, simplemente como una teoría o bien como una ciencia básica de la instrucción."
   },

   {
    prompt: "¿Qué busca el denominado modelo mediacional?",
    options: ["a)	Busca  capacidad de trabajo en equipo implica poder tomar en cuenta solo las ideas de uno mismo.",
    "b)	Busca  generar y potenciar las destrezas individuales para llegar a una autoformación.",
    "c)	Busca  Abordar, analizar, diseñar y planes.",
    "d)	Es la que solo busca un conocimiento tácito."],
    answer: "b)	Busca  generar y potenciar las destrezas individuales para llegar a una autoformación."
    },

    {
      prompt: "¿A qué le llama Schön ''conocimiento en la acción''?",
      options: ["a)	Se refiere a lo que una persona puede comunicar sin palabras, como el lenguaje corporal o el tono de voz.", 
      "b)	Es la capacidad de una persona para comprender y experimentar los sentimientos y emociones de otra persona.", 
      "c)	Se refiere a desarrollar una buena capacidad de trabajo en equipo implica poder tomar en cuenta solo las ideas de uno mismo.", 
      "d)	A las  acciones que las realizamos espontáneamente sin pararnos a pensar en ellas antes de hacerlas, cuando ni siquiera somos conscientes de haberlas aprendido, simplemente nos descubrimos haciéndolas."],
      answer: "d)	A las  acciones que las realizamos espontáneamente sin pararnos a pensar en ellas antes de hacerlas, cuando ni siquiera somos conscientes de haberlas aprendido, simplemente nos descubrimos haciéndolas."
   },
   
   {
    prompt: "¿Qué nos permite el proceso de reflexión?",
    options: ["a)	 Es lo que nos permite tomar conciencia de nuestra práctica pedagógica y de darle significación.", 
    "b)	Es la que solo busca un conocimiento tácito.", 
    "c)	No nos permite desarrollar una buena capacidad de trabajo en equipo implica poder tomar en cuenta solo las ideas de uno mismo.", 
    "d)	Se refiere a lo que una persona puede comunicar sin palabras, como el lenguaje corporal o el tono de voz."],
    answer: "a)	 Es lo que nos permite tomar conciencia de nuestra práctica pedagógica y de darle significación."


    
    }];

    
// Get Dom Elements

var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#timer");
var choicesEl = document.querySelector("#options");
var submitBtn = document.querySelector("#submit-score");
var startBtn = document.querySelector("#start");
var nameEl = document.querySelector("#name");
var feedbackEl = document.querySelector("#feedback");
var reStartBtn = document.querySelector("#restart");

// Quiz's initial state

var currentQuestionIndex = 0;
var time = questions.length * 20;
var timerId;

// Start quiz and hide frontpage

function quizStart() {
    timerId = setInterval(clockTick, 9999999999999999);
    timerEl.textContent = time;
    var landingScreenEl = document.getElementById("start-screen");
    landingScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    getQuestion();
}

// Loop through array of questions and answers and create list with buttons

function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
  var promptEl = document.getElementById("question-words")
    promptEl.textContent = currentQuestion.prompt;
    choicesEl.innerHTML = "";
    currentQuestion.options.forEach(function(choice, i) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.textContent = i + 1 + ". " + choice;
        choiceBtn.onclick = questionClick;
        choicesEl.appendChild(choiceBtn);
    });
}

// Check for right answers and deduct time for wrong answer, go to next question

function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
      time -= 20;
      if (time < 0) {
        time = 0;
      }
      timerEl.textContent = time;
      feedbackEl.textContent = `Sorry! La respuesta correcta era: ${questions[currentQuestionIndex].answer}`;
      feedbackEl.style.color = "red";
      feedbackEl.style.shadow = "black";
      feedbackEl.style.backgroundColor = "Ivory";

    } else {
      feedbackEl.textContent = "Correcto, ¡qué listo eres!";
      feedbackEl.style.color = "green";
      feedbackEl.style.shadow = "black";
      feedbackEl.style.backgroundColor = "Ivory";
    }
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
      feedbackEl.setAttribute("class", "feedback hide");
    }, 15000);
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
      quizEnd();
    } else {
      getQuestion();
    }
}

// End quiz by hiding questions, stop timer and show final score

function quizEnd() {
    clearInterval(timerId);
    var endScreenEl = document.getElementById("quiz-end");
    endScreenEl.removeAttribute("class");
    var finalScoreEl = document.getElementById("score-final");
    finalScoreEl.textContent = time;
    questionsEl.setAttribute("class", "hide");
}

// End quiz if timer reaches 0

function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
      quizEnd();
    }
}

// Save score in local storage along with users' name

function saveHighscore() {
    var name = nameEl.value.trim();
    if (name !== "") {
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
      var newScore = {
        score: time,
        name: name
      };
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
    }
}

// Save users' score after pressing enter

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
    }
}
nameEl.onkeyup = checkForEnter;

// Save users' score after clicking submit

submitBtn.onclick = saveHighscore; 

// Start quiz after clicking start quiz

startBtn.onclick = quizStart;




