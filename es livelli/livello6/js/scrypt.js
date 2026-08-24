document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. CRONOMETRO
     ========================================== */
  let chronoInterval = null;
  let chronoSeconds = 0;

  const chronoDisplay = document.getElementById('chrono-display');
  const chronoStartBtn = document.getElementById('chrono-start');
  const chronoStopBtn = document.getElementById('chrono-stop');
  const chronoResetBtn = document.getElementById('chrono-reset');

  function formatChronoTime(sec) {
    const hrs = String(Math.floor(sec / 3600)).padStart(2, '0');
    const mins = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
    const secs = String(sec % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  }

  function startChrono() {
    if (chronoInterval) return;
    chronoInterval = setInterval(() => {
      chronoSeconds++;
      chronoDisplay.textContent = formatChronoTime(chronoSeconds);
    }, 1000);
  }

  function stopChrono() {
    clearInterval(chronoInterval);
    chronoInterval = null;
  }

  function resetChrono() {
    stopChrono();
    chronoSeconds = 0;
    chronoDisplay.textContent = formatChronoTime(0);
  }

  chronoStartBtn.addEventListener('click', startChrono);
  chronoStopBtn.addEventListener('click', stopChrono);
  chronoResetBtn.addEventListener('click', resetChrono);


  /* ==========================================
     2. TIMER CONTO ALLA ROVESCIA
     ========================================== */
  let timerInterval = null;
  let timerSecondsLeft = 0;

  const timerInput = document.getElementById('timer-input');
  const timerDisplay = document.getElementById('timer-display');
  const timerMsg = document.getElementById('timer-msg');
  const timerStartBtn = document.getElementById('timer-start');
  const timerStopBtn = document.getElementById('timer-stop');

  function formatTimerTime(sec) {
    const mins = String(Math.floor(sec / 60)).padStart(2, '0');
    const secs = String(sec % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  }

  function startTimer() {
  // 1. Se il timer era arrivato a 0 o fermato, legge il valore dall'input
  if (timerSecondsLeft <= 0) {
    timerSecondsLeft = parseInt(timerInput.value);
  }

  // 2. Controllo di sicurezza: verifica che sia stato inserito un numero valido > 0
  if (isNaN(timerSecondsLeft) || timerSecondsLeft <= 0) {
    timerMsg.style.color = '#e74c3c';
    timerMsg.textContent = 'Inserisci un numero di secondi valido!';
    return;
  }

  // Pulisce eventuali messaggi di errore precedenti
  timerMsg.textContent = '';

  // 3. Pulisce eventuali intervalli già attivi prima di avviarne uno nuovo
  clearInterval(timerInterval);

  // Imposta subito il display con il tempo di partenza
  timerDisplay.textContent = formatTimerTime(timerSecondsLeft);

  // 4. Avvia il conto alla rovescia
  timerInterval = setInterval(() => {
    timerSecondsLeft--;
    timerDisplay.textContent = formatTimerTime(timerSecondsLeft);

    // Quando arriva a zero, ferma il timer e mostra il messaggio
    if (timerSecondsLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      timerMsg.style.color = '#e74c3c';
      timerMsg.textContent = '⏰ Tempo Scaduto!';
    }
  }, 1000);
}

  function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  timerStartBtn.addEventListener('click', startTimer);
  timerStopBtn.addEventListener('click', stopTimer);


  /* ==========================================
     3. GIOCO A TEMPO (30 Secondi)
     ========================================== */
  const TOTAL_CELLS = 16;
  const SPECIAL_COUNT = 3;
  let gameInterval = null;
  let gameTimeLeft = 30;
  let specialIndexes = [];
  let foundCount = 0;
  let gameActive = false;

  const gameGrid = document.getElementById('game-grid');
  const gameTimerDisplay = document.getElementById('game-timer');
  const gameStartBtn = document.getElementById('game-start-btn');
  const gameMsg = document.getElementById('game-msg');

  function initGrid() {
    gameGrid.innerHTML = '';
    for (let i = 0; i < TOTAL_CELLS; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell', 'disabled');
      cell.dataset.index = i;
      cell.addEventListener('click', () => handleCellClick(cell, i));
      gameGrid.appendChild(cell);
    }
  }

  function startGame() {
    const gridCells = document.querySelectorAll('.cell');

    clearInterval(gameInterval);
    gameTimeLeft = 30;
    foundCount = 0;
    gameActive = true;
    gameMsg.textContent = '';
    gameTimerDisplay.textContent = '30s';

    specialIndexes = [];
    while (specialIndexes.length < SPECIAL_COUNT) {
      const rand = Math.floor(Math.random() * TOTAL_CELLS);
      if (!specialIndexes.includes(rand)) specialIndexes.push(rand);
    }

    gridCells.forEach(cell => {
      cell.className = 'cell';
      cell.textContent = '?';
    });

    gameInterval = setInterval(() => {
      gameTimeLeft--;
      gameTimerDisplay.textContent = `${gameTimeLeft}s`;

      if (gameTimeLeft <= 0) {
        endGame(false);
      }
    }, 1000);
  }

  function handleCellClick(cell, index) {
    if (!gameActive || cell.classList.contains('found') || cell.classList.contains('wrong')) return;

    if (specialIndexes.includes(index)) {
      cell.classList.add('found');
      cell.textContent = '★';
      foundCount++;

      if (foundCount === SPECIAL_COUNT) {
        endGame(true);
      }
    } else {
      cell.classList.add('wrong');
      cell.textContent = '✕';
    }
  }

  function endGame(won) {
    clearInterval(gameInterval);
    gameActive = false;

    const gridCells = document.querySelectorAll('.cell');
    gridCells.forEach(cell => cell.classList.add('disabled'));

    if (won) {
      gameMsg.style.color = '#2ecc71';
      gameMsg.textContent = `🎉 Vittoria! Hai trovato tutte le celle in ${30 - gameTimeLeft} secondi!`;
    } else {
      gameMsg.style.color = '#e74c3c';
      gameMsg.textContent = `💥 Tempo scaduto! Trovate: ${foundCount}/${SPECIAL_COUNT}`;

      specialIndexes.forEach(idx => {
        if (!gridCells[idx].classList.contains('found')) {
          gridCells[idx].textContent = '★';
          gridCells[idx].style.color = '#e67e22';
        }
      });
    }
  }

  gameStartBtn.addEventListener('click', startGame);

  // Inizializzazione griglia
  initGrid();
});