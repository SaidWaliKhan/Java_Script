// --- DOM Elements ---
const buttons = document.querySelectorAll(".choice-btn");
const resultEl = document.getElementById("result");
const playerScoreEl = document.getElementById("user-score");
const computerScoreEl = document.getElementById("computer-score");
const winnerMessageEl = document.getElementById("winner-message");
const resetBtn = document.getElementById("reset-btn");

// --- State ---
let playerScore = 0;
let computerScore = 0;
const WIN_SCORE = 5;
let gameOver = false;

// --- Helper Functions ---
function updateScoreUI() {
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
}

function disableButtons(disabled) {
  buttons.forEach((btn) => (btn.disabled = disabled));
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  gameOver = false;
  updateScoreUI();
  resultEl.textContent = "✨ Make your move!";
  winnerMessageEl.textContent = "";
  winnerMessageEl.style.color = "";
  disableButtons(false);
  buttons.forEach((btn) => (btn.style.opacity = "1"));
}

// --- Core Game Logic ---
function computerPlay() {
  const choices = ["rock", "paper", "scissors"];
  const randomChoice = Math.floor(Math.random() * choices.length);
  return choices[randomChoice];
}

function playRound(playerSelection, computerSelection) {
  const winConditions = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  if (playerSelection === computerSelection) {
    return { result: "tie", message: "It's a tie! 🤝" };
  } else if (winConditions[playerSelection] === computerSelection) {
    playerScore++;
    return {
      result: "win",
      message: `You win! ${playerSelection} beats ${computerSelection} 🎉`,
    };
  } else {
    computerScore++;
    return {
      result: "lose",
      message: `You lose! ${computerSelection} beats ${playerSelection} 😵`,
    };
  }
}

// --- Event Handlers ---
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (gameOver) return;

    const playerSelection = button.id;
    const computerSelection = computerPlay();

    resultEl.textContent = "🤔 Computer is thinking...";
    button.style.opacity = "0.7";

    setTimeout(() => {
      const { result, message } = playRound(playerSelection, computerSelection);
      resultEl.textContent = message;
      updateScoreUI();
      button.style.opacity = "1";

      if (playerScore >= WIN_SCORE) {
        winnerMessageEl.textContent = "🏆 You are the Champion! 🏆";
        winnerMessageEl.style.color = "#4CAF50";
        gameOver = true;
        disableButtons(true);
      } else if (computerScore >= WIN_SCORE) {
        winnerMessageEl.textContent = "💻 Computer crushes you! Better luck next time.";
        winnerMessageEl.style.color = "#f44336";
        gameOver = true;
        disableButtons(true);
      }
    }, 300);
  });

  button.addEventListener("keydown", (e) => e.stopPropagation());
});

// --- Keyboard Shortcuts ---
document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  if (gameOver) return;
  let targetId = null;
  if (key === "r") targetId = "rock";
  else if (key === "p") targetId = "paper";
  else if (key === "s") targetId = "scissors";
  else return;

  const targetBtn = document.getElementById(targetId);
  if (targetBtn) targetBtn.click();
});

// --- Reset ---
resetBtn.addEventListener("click", resetGame);

// --- Initialize ---
resetGame();