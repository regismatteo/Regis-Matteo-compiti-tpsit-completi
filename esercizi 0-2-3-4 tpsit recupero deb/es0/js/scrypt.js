const GRID_SIZE = 8;
const FLEET_CONFIG = [
  { name: "Cacciatorpediniere", size: 3 },
  { name: "Sottomarino", size: 2 },
  { name: "Mottoscafo", size: 1 }
];

let grid = [];
let totalTargets = 0;
let hitTargets = 0;
let attempts = 0;
let secondsElapsed = 0;
let timerInterval = null;
let gameOver = false;

const gridContainer = document.getElementById("grid-container");
const attemptsEl = document.getElementById("attempts");
const remainingTargetsEl = document.getElementById("remaining-targets");
const timerEl = document.getElementById("timer");
const messageBoard = document.getElementById("message-board");
const restartBtn = document.getElementById("restart-btn");

restartBtn.addEventListener("click", initGame);

initGame();

function initGame() {
  attempts = 0;
  hitTargets = 0;
  secondsElapsed = 0;
  gameOver = false;
  
  attemptsEl.textContent = "0";
  timerEl.textContent = "00:00";
  messageBoard.textContent = "Partita iniziata! Clicca su una cella.";
  
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);
  
  grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0));
  
  placeFleet();
  renderGrid();
}

function placeFleet() {
  totalTargets = 0;

  FLEET_CONFIG.forEach(ship => {
    let placed = false;

    while (!placed) {
      const isHorizontal = Math.random() < 0.5;
      const row = Math.floor(Math.random() * (isHorizontal ? GRID_SIZE : GRID_SIZE - ship.size + 1));
      const col = Math.floor(Math.random() * (isHorizontal ? GRID_SIZE - ship.size + 1 : GRID_SIZE));

      let canPlace = true;
      for (let i = 0; i < ship.size; i++) {
        const r = isHorizontal ? row : row + i;
        const c = isHorizontal ? col + i : col;
        if (grid[r][c] !== 0) {
          canPlace = false;
          break;
        }
      }

      if (canPlace) {
        for (let i = 0; i < ship.size; i++) {
          const r = isHorizontal ? row : row + i;
          const c = isHorizontal ? col + i : col;
          grid[r][c] = 1;
        }
        totalTargets += ship.size;
        placed = true;
      }
    }
  });

  remainingTargetsEl.textContent = totalTargets;
}

function renderGrid() {
  gridContainer.innerHTML = "";

  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = r;
      cell.dataset.col = c;

      cell.addEventListener("click", handleCellClick);
      gridContainer.appendChild(cell);
    }
  }
}

function handleCellClick(event) {
  const cell = event.target;

  if (gameOver || cell.classList.contains("hit") || cell.classList.contains("miss")) {
    return;
  }

  const r = parseInt(cell.dataset.row);
  const c = parseInt(cell.dataset.col);

  attempts++;
  attemptsEl.textContent = attempts;

  if (grid[r][c] === 1) {
    cell.classList.add("hit");
    cell.textContent = "💥";
    hitTargets++;
    remainingTargetsEl.textContent = totalTargets - hitTargets;
    messageBoard.textContent = "Colpito!";

    if (hitTargets === totalTargets) {
      handleWin();
    }
  } else {
    cell.classList.add("miss");
    cell.textContent = "💧";
    messageBoard.textContent = "Acqua!";
  }
}

function handleWin() {
  gameOver = true;
  clearInterval(timerInterval);
  const formattedTime = formatTime(secondsElapsed);
  messageBoard.textContent = `🎉 Vittoria! Hai affondato tutte le navi in ${attempts} tentativi e ${formattedTime}!`;
}

function updateTimer() {
  secondsElapsed++;
  timerEl.textContent = formatTime(secondsElapsed);
}

function formatTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  const padMin = mins < 10 ? "0" + mins : mins;
  const padSec = secs < 10 ? "0" + secs : secs;
  return `${padMin}:${padSec}`;
}