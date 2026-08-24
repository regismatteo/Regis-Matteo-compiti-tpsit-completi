let currentPlayer = 1;
let p1Name = "";
let p2Name = "";
let clickedCount = 0;
const TOTAL_BUTTONS = 18;

window.onload = function() {
    const setupArea = document.getElementById("setup-area");
    setupArea.innerHTML = `
        <div class="row g-3 align-items-center justify-content-center">
            <div class="col-md-5">
                <input type="text" id="p1-input" class="form-control" placeholder="Nome Giocatore 1">
            </div>
            <div class="col-md-5">
                <input type="text" id="p2-input" class="form-control" placeholder="Nome Giocatore 2">
            </div>
            <div class="col-md-2 text-center">
                <button id="btn-start" class="btn btn-primary w-100">AVVIA</button>
            </div>
        </div>
    `;

    document.getElementById("btn-start").onclick = startGame;
};

function startGame() {
    p1Name = document.getElementById("p1-input").value.trim() || "Giocatore 1";
    p2Name = document.getElementById("p2-input").value.trim() || "Giocatore 2";

    document.getElementById("setup-area").style.display = "none";
    document.getElementById("hint-div").classList.remove("d-none");

    const playersArea = document.getElementById("players-area");
    playersArea.innerHTML = `
        <div id="p1-container">
            <button id="p1-btn" class="btn btn-warning text-dark fw-bold player-btn d-flex align-items-center justify-content-center">
                ${p1Name}
            </button>
        </div>
        <div id="p2-container">
            <button id="p2-btn" class="btn btn-danger text-white fw-bold player-btn d-flex align-items-center justify-content-center">
                ${p2Name}
            </button>
        </div>
    `;

    updateTurnVisual();

    const matrixContainer = document.getElementById("matrix-container");
    matrixContainer.innerHTML = "";

    for (let r = 0; r < 3; r++) {
        const row = document.createElement("div");
        row.className = "row g-2 mb-2";

        for (let c = 0; c < 6; c++) {
            const col = document.createElement("div");
            col.className = "col-2";

            const randomValue = Math.floor(Math.random() * 101) - 50;

            const btn = document.createElement("button");
            btn.className = "btn btn-outline-secondary w-100 py-3 fw-bold";
            btn.innerText = "?";
            btn.dataset.value = randomValue;

            btn.onmouseenter = function() {
                if (!btn.disabled) {
                    document.getElementById("hint-value").innerText = randomValue;
                }
            };

            btn.onmouseleave = function() {
                document.getElementById("hint-value").innerText = "";
            };

            btn.onclick = function() {
                handleButtonClick(btn, randomValue);
            };

            col.appendChild(btn);
            row.appendChild(col);
        }
        matrixContainer.appendChild(row);
    }
}

function handleButtonClick(btn, value) {
    btn.innerText = value;
    btn.disabled = true;
    btn.onmouseenter = null;
    document.getElementById("hint-value").innerText = "";

    const targetBtn = currentPlayer === 1 ? document.getElementById("p1-btn") : document.getElementById("p2-btn");

    if (currentPlayer === 1) {
        btn.className = "btn btn-warning text-dark fw-bold w-100 py-3";
    } else {
        btn.className = "btn btn-danger text-white fw-bold w-100 py-3";
    }

    let currentWidth = targetBtn.offsetWidth;
    let newWidth = currentWidth + value;
    targetBtn.style.width = `${newWidth}px`;

    clickedCount++;

    if (newWidth < 0) {
        targetBtn.style.width = "0px";
        const winner = currentPlayer === 1 ? p2Name : p1Name;
        endGame(`Partita terminata! <strong>${winner}</strong> vince perché l'avversario ha ridotto la larghezza del proprio pulsante sotto lo 0!`);
        return;
    }

    if (clickedCount === TOTAL_BUTTONS) {
        checkFinalWinner();
        return;
    }

    currentPlayer = currentPlayer === 1 ? 2 : 1;
    updateTurnVisual();
}

function updateTurnVisual() {
    const p1Btn = document.getElementById("p1-btn");
    const p2Btn = document.getElementById("p2-btn");

    if (currentPlayer === 1) {
        p1Btn.classList.add("border", "border-dark", "border-4");
        p2Btn.classList.remove("border", "border-dark", "border-4");
    } else {
        p2Btn.classList.add("border", "border-dark", "border-4");
        p1Btn.classList.remove("border", "border-dark", "border-4");
    }
}

function checkFinalWinner() {
    const w1 = document.getElementById("p1-btn").offsetWidth;
    const w2 = document.getElementById("p2-btn").offsetWidth;

    let msg = "";
    if (w1 > w2) {
        msg = `Tutti i pulsanti sono stati cliccati! Vince <strong>${p1Name}</strong> con un pulsante largo ${w1}px contro i ${w2}px di ${p2Name}!`;
    } else if (w2 > w1) {
        msg = `Tutti i pulsanti sono stati cliccati! Vince <strong>${p2Name}</strong> con un pulsante largo ${w2}px contro i ${w1}px di ${p1Name}!`;
    } else {
        msg = `Tutti i pulsanti sono stati cliccati! La partita finisce in <strong>Pareggio</strong> (${w1}px a testa)!`;
    }

    endGame(msg);
}

function endGame(message) {
    const matrixButtons = document.querySelectorAll("#matrix-container button");
    matrixButtons.forEach(b => b.disabled = true);

    document.getElementById("hint-div").classList.add("d-none");
    const resultDiv = document.getElementById("result-div");
    resultDiv.innerHTML = `
        <div class="alert alert-success text-center fs-5" role="alert">
            ${message}
        </div>
    `;
}