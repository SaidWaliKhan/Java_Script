// ─── DOM Elements ───
const diceEl = document.getElementById('dice');
const rollBtn = document.getElementById('roll-button');
const clearBtn = document.getElementById('clear-btn');
const historyEl = document.getElementById('roll-history');
const currentRollEl = document.getElementById('current-roll');
const totalSumEl = document.getElementById('total-sum');
const rollCountEl = document.getElementById('roll-count');

// ─── State ───
let history = [];
let totalSum = 0;

// ─── Helper: get dice face (Unicode) ───
function getDiceFace(value) {
  const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
  return faces[value - 1] || '⚀';
}

// ─── Roll Logic ───
function rollDice() {
  const result = Math.floor(Math.random() * 6) + 1;
  const face = getDiceFace(result);

  // Update dice
  diceEl.textContent = face;

  // Update info
  currentRollEl.textContent = result;
  totalSum += result;
  totalSumEl.textContent = totalSum;
  rollCountEl.textContent = history.length + 1;

  // Add to history
  history.push(result);
  renderHistory();
}

// ─── Render History ───
function renderHistory() {
  historyEl.innerHTML = '';
  // Show newest first (reverse)
  const reversed = [...history].reverse();
  reversed.forEach((value, index) => {
    const li = document.createElement('li');
    const rollNumber = history.length - index;
    li.innerHTML = `Roll ${rollNumber} <span>${getDiceFace(value)}</span>`;
    historyEl.appendChild(li);
  });
}

// ─── Clear History ───
function clearHistory() {
  history = [];
  totalSum = 0;
  totalSumEl.textContent = '0';
  rollCountEl.textContent = '0';
  currentRollEl.textContent = '—';
  diceEl.textContent = '⚀';
  historyEl.innerHTML = '';
}

// ─── Roll with Animation ───
function handleRoll() {
  diceEl.classList.remove('roll-animation');
  // Force reflow to restart animation
  void diceEl.offsetWidth;
  diceEl.classList.add('roll-animation');

  // Wait for animation to finish, then update
  setTimeout(() => {
    diceEl.classList.remove('roll-animation');
    rollDice();
  }, 900);
}

// ─── Event Listeners ───
rollBtn.addEventListener('click', handleRoll);
clearBtn.addEventListener('click', clearHistory);

// ─── Keyboard shortcut (press Space to roll) ───
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && !e.repeat) {
    e.preventDefault(); // prevent page scroll
    handleRoll();
  }
});

// ─── Init ───
clearHistory(); // set clean start