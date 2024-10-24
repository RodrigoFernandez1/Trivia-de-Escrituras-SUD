const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");
const gameArea = document.getElementById("game-area");
const questionContainer = document.getElementById("question-container");
const answerButtons = document.getElementById("answer-buttons");
const timerDisplay = document.getElementById("time");
const scoreDisplay = document.getElementById("points");
const finalScreen = document.getElementById("final-screen");
const finalScoreDisplay = document.getElementById("final-score");
const finalPointsDisplay = document.getElementById("final-points");
const answerReview = document.getElementById("answer-review");
let currentQuestionIndex, timeLeft, score, timerInterval, answersGiven;

const questions = [
  {
    question: "¿Quién construyó el arca?",
    answers: [
      {
        text: "Noé",
        correct: true,
        explanation:
          "Noé fue llamado por Dios para construir el arca y salvar a su familia del diluvio.",
        reference: "Génesis 6-9",
      },
      {
        text: "Moisés",
        correct: false,
        explanation:
          "Moisés no construyó el arca, él liberó a Israel de la esclavitud en Egipto.",
        reference: "Éxodo 3-14",
      },
      {
        text: "Abraham",
        correct: false,
        explanation:
          "Abraham es conocido por su pacto con Dios, no por construir el arca.",
        reference: "Génesis 12-25",
      },
      {
        text: "Isaac",
        correct: false,
        explanation:
          "Isaac fue el hijo de Abraham y no estuvo relacionado con la construcción del arca.",
        reference: "Génesis 21-27",
      },
    ],
  },
  {
    question: "¿Cuántos días duró la creación según Génesis?",
    answers: [
      {
        text: "6 días",
        correct: true,
        explanation:
          "Según Génesis, Dios creó el mundo en seis días y descansó en el séptimo, lo que establece el modelo del Sabbath. (Génesis 1-2)",
        reference: "Génesis 1-2",
      },
      {
        text: "7 días",
        correct: false,
        explanation:
          "La creación duró seis días, y el séptimo fue un día de descanso, no un día de creación.",
        reference: "Génesis 2:2-3",
      },
      {
        text: "5 días",
        correct: false,
        explanation:
          "La creación no se completó en cinco días; en realidad tomó seis días en total.",
        reference: "Génesis 1",
      },
      {
        text: "8 días",
        correct: false,
        explanation:
          "La narrativa de la creación no menciona ocho días; se realizó en seis días con un día de descanso.",
        reference: "Génesis 1-2",
      },
    ],
  },

  {
    question: "¿Quién fue el primer profeta del Libro de Mormón?",
    answers: [
      {
        text: "Lehi",
        correct: true,
        explanation:
          "Lehi fue un profeta que vivió en Jerusalén y recibió una visión de la destrucción de la ciudad, guiando a su familia a la tierra prometida.",
        reference: "1 Nefi 1",
      },
      {
        text: "Nefi",
        correct: false,
        explanation:
          "Nefi fue el hijo de Lehi y un líder importante, pero no fue el primer profeta del Libro de Mormón.",
        reference: "1 Nefi 2",
      },
      {
        text: "Jacob",
        correct: false,
        explanation:
          "Jacob fue el hijo de Lehi y un profeta, pero llegó después de Lehi.",
        reference: "Jacob 1",
      },
      {
        text: "Enos",
        correct: false,
        explanation:
          "Enos fue el hijo de Jacob y un profeta, pero no fue el primero en el Libro de Mormón.",
        reference: "Enos 1",
      },
    ],
  },
  {
    question: "¿Quién tradujo el Libro de Mormón?",
    answers: [
      {
        text: "José Smith",
        correct: true,
        explanation:
          "José Smith tradujo el Libro de Mormón mediante el poder de Dios, utilizando instrumentos como las piedras de vidente, en los años 1827 a 1829.",
        reference: "Historia de la Iglesia, Vol. 1",
      },
      {
        text: "Oliver Cowdery",
        correct: false,
        explanation:
          "Oliver Cowdery fue un compañero y escriba de José Smith durante la traducción, pero no fue el traductor principal.",
        reference: "Historia de la Iglesia, Vol. 1",
      },
      {
        text: "Moroni",
        correct: false,
        explanation:
          "Moroni es el profeta que enterró las planchas, pero no tradujo el Libro de Mormón, sino que fue José Smith quien realizó la traducción.",
        reference: "Mormón 8",
      },
      {
        text: "Elder Bednar",
        correct: false,
        explanation:
          "Elder Bednar es un líder actual de la Iglesia, pero no estuvo involucrado en la traducción del Libro de Mormón, que ocurrió en el siglo XIX.",
        reference: "Historia de la Iglesia, Vol. 1",
      },
    ],
  },

  // Más preguntas aquí...
];

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);

function startGame() {
  startButton.classList.add("hide");
  finalScreen.classList.add("hide");
  restartButton.classList.add("hide");
  gameArea.classList.remove("hide");
  currentQuestionIndex = 0;
  score = 0;
  answersGiven = [];
  scoreDisplay.innerText = score;
  timeLeft = 60; // 1 minuto
  timerDisplay.innerText = timeLeft;
  timerInterval = setInterval(updateTimer, 1000);
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
  document.getElementById("question").innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.dataset.correct = answer.correct;
    button.dataset.explanation = answer.explanation;
    button.dataset.reference = answer.reference;
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";
  const explanation = selectedButton.dataset.explanation;
  const reference = selectedButton.dataset.reference;

  if (correct) {
    score++;
    scoreDisplay.innerText = score;
  }

  answersGiven.push({
    question: questions[currentQuestionIndex].question,
    selected: selectedButton.innerText,
    correct: correct,
    explanation: explanation,
    reference: reference,
  });

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length && timeLeft > 0) {
    setNextQuestion();
  } else {
    endGame();
  }
}

function updateTimer() {
  timeLeft--;
  timerDisplay.innerText = timeLeft;
  if (timeLeft === 0) {
    endGame();
  }
}

function endGame() {
  clearInterval(timerInterval);
  gameArea.classList.add("hide"); // Ocultamos el área del juego
  finalScreen.classList.remove("hide"); // Mostramos la pantalla final
  finalPointsDisplay.innerText = score;
  showAnswerReview(); // Mostramos la revisión de respuestas
  restartButton.classList.remove("hide"); // Mostrar botón de reinicio
}

function showAnswerReview() {
  answerReview.innerHTML = "<h3>Revisión de respuestas:</h3>";
  answersGiven.forEach((answer) => {
    const answerElement = document.createElement("div");
    answerElement.innerHTML = `
            <p><strong>Pregunta:</strong> ${answer.question}</p>
            <p><strong>Tu respuesta:</strong> ${answer.selected} - ${
      answer.correct ? "Correcto" : "Incorrecto"
    }</p>
            <p><strong>Explicación:</strong> ${answer.explanation}</p>
            <p><strong>Referencia:</strong> ${answer.reference}</p>
            <hr>
        `;
    answerReview.appendChild(answerElement);
  });
}

function restartGame() {
  finalScreen.classList.add("hide"); // Ocultamos la pantalla final
  startButton.classList.remove("hide"); // Mostramos el botón para comenzar de nuevo
}
