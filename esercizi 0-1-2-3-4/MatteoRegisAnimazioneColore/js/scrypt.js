const container = document.getElementById('container');
const totalDivs = 10;
const divs = [];

for (let i = 0; i < totalDivs; i++) {
  const div = document.createElement('div');
  div.classList.add('box');
  container.appendChild(div);
  divs.push(div);
}

let currentIndex = 0;
let direction = 1;
let timerId = null;
let timeoutId = null;
let isRunning = false;

divs[currentIndex].classList.add('active');

const btnStart = document.getElementById('btnStart');
const btnStop = document.getElementById('btnStop');
const messaggio = document.getElementById('messaggio');

function move() {
  divs[currentIndex].classList.remove('active');

  let nextIndex = currentIndex + direction;

  if (nextIndex >= totalDivs) {
    direction = -1;
    nextIndex = totalDivs - 2;
  } else if (nextIndex < 0) {
    direction = 1;
    nextIndex = 1;
  }

  currentIndex = nextIndex;
  divs[currentIndex].classList.add('active');
}

btnStart.addEventListener('click', () => {
  if (isRunning) return;
  isRunning = true;

  messaggio.textContent = "Animazione in avvio...";

  timeoutId = setTimeout(() => {
    timerId = setInterval(move, 50);
  }, 3000);
});

btnStop.addEventListener('click', () => {
  clearTimeout(timeoutId);
  clearInterval(timerId);

  isRunning = false;
  messaggio.textContent = "";
});