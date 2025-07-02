const questions = [
  {
    question: "Quem construiu a arca?",
    options: ["Noé", "Moisés", "Davi"],
    correct: 0
  },
  {
    question: "Quem venceu Golias?",
    options: ["Saul", "Davi", "Pedro"],
    correct: 1
  },
  {
    question: "Quem foi engolido pelo peixe?",
    options: ["Jonas", "Paulo", "José"],
    correct: 0
  },
  {
    question: "Quantos discípulos Jesus teve?",
    options: ["12", "10", "7"],
    correct: 0
  },
  {
    question: "Quem traiu Jesus?",
    options: ["Pedro", "João", "Judas"],
    correct: 2
  },
  {
    question: "Onde Jesus nasceu?",
    options: ["Belém", "Nazaré", "Jerusalém"],
    correct: 0
  },
  {
    question: "Quem abriu o mar?",
    options: ["Moisés", "Elias", "Abraão"],
    correct: 0
  },
  {
    question: "Quantos dias Jesus jejuou?",
    options: ["30", "40", "50"],
    correct: 1
  },
  {
    question: "Quem era pai de Isaque?",
    options: ["Jacó", "Abraão", "Davi"],
    correct: 1
  },
  {
    question: "Quem recebeu os 10 mandamentos?",
    options: ["Moisés", "Noé", "José"],
    correct: 0
  }
];

let currentQuestion = 0;
let score = 0;
let frogPosition = 10;

const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const feedback = document.getElementById("feedback");
const livesSpan = document.getElementById("lives");
const levelSpan = document.getElementById("level");
const scoreSpan = document.getElementById("score");
const frog = document.getElementById("frog");

let lives = 3;

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "pt-BR";
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}

function startGame() {
  speak("Aventuras da Tia Aline. Ajude o sapinho a atravessar a lagoa!");
  showQuestion();
}

function showQuestion() {
  if (currentQuestion >= questions.length || lives <= 0) {
    endGame();
    return;
  }

  const q = questions[currentQuestion];
  questionText.textContent = q.question;
  optionsContainer.innerHTML = "";
  feedback.textContent = "";

  let fullTextToRead = q.question + ". ";

  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => handleAnswer(index);
    optionsContainer.appendChild(btn);
    fullTextToRead += `Opção ${index + 1}: ${opt}. `;
  });

  speak(fullTextToRead);
}

function handleAnswer(selectedIndex) {
  const correct = questions[currentQuestion].correct;

  if (selectedIndex === correct) {
    feedback.textContent = "🎉 Parabéns! Você ganhou 10 pontos!";
    feedback.classList.remove("error");
    score += 10;
    speak("Parabéns! Você ganhou 10 pontos! Vamos para a próxima fase.");
    scoreSpan.textContent = score;

    frogPosition += 60;
    frog.style.left = frogPosition + "px";

    currentQuestion++;
    levelSpan.textContent = currentQuestion + 1;

    setTimeout(showQuestion, 4000);
  } else {
    feedback.textContent = "❌ Resposta errada. Tente novamente.";
    feedback.classList.add("error");
    speak("Resposta errada. Tente novamente.");
    lives--;
    livesSpan.textContent = lives;

    if (lives <= 0) {
      setTimeout(endGame, 3000);
    }
  }
}

function endGame() {
  questionText.textContent = "Fim de jogo!";
  optionsContainer.innerHTML = "";
  feedback.textContent = `Você fez ${score} pontos.`;

  if (score >= 80) {
    speak("Parabéns! Você completou todas as fases!");
  } else {
    speak(`Você terminou com ${score} pontos. Jogue novamente para melhorar!`);
  }
}

window.onload = startGame;
