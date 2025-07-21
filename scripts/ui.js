// Handles UI rendering and interactions

const gridContainer = document.getElementById("sudoku-grid");
const gridSizeSelect = document.getElementById("grid-size");
const difficultyButtons = document.querySelectorAll(".diff-btn");
const timerElement = document.getElementById("timer");
const mistakeCountElement = document.getElementById("mistake-count");
const undoBtn = document.getElementById("undo-btn");
const hintBtn = document.getElementById("hint-btn");

let selectedSize = 3;
let selectedDifficulty = "easy";
let secondsElapsed = 0; // For timer
// let mistakeCount = 0; // For tracking mistakes
// let allowedMistakes = 3; // For setting allowed mistakes
// let moveStack = []; // For undo

export function setupUIEvents(onCellInput, onHintRequest, onStartGame, undoMove) {
  gridSizeSelect.addEventListener("change", (e) => {
    selectedSize = parseInt(e.target.value);
    resetGame();
  });

  difficultyButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      difficultyButtons.forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      selectedDifficulty = btn.dataset.diff;
      resetGame();
    });
  });

  undoBtn.addEventListener("click", undoMove);
  hintBtn.addEventListener("click", onHintRequest);

  const startBtn = document.getElementById('start-btn');
  const resetBtn = document.getElementById('reset-btn');
  const gameSection = document.querySelector('.game');

  startBtn.addEventListener('click', () => {
    gameSection.style.display = '';
    startBtn.style.display = 'none';
    resetBtn.style.display = 'inline-block';
    renderGrid(selectedSize, onCellInput);
    onStartGame();
  });

  resetBtn.addEventListener('click', () => {
    gameSection.style.display = 'none';
    startBtn.style.display = 'inline-block';
    resetBtn.style.display = 'none';

    clearInterval(window.timer);
    timerElement.textContent = "00:00";
    secondsElapsed = 0;
    mistakeCount = 0;
    updateMistakes(0, allowedMistakes);

    gridContainer.innerHTML = "";
  });

  // function handleInput(e, row, col) {
  //   if (!gameStarted) {
  //     gameStarted = true;
  //     startTimer();
  //   }

  //   const input = e.target;
  //   const entered = parseInt(input.value);
  //   const correct = solvedBoard[r][c];

  //   if (!entered || entered < 1 || entered > selectedSize * selectedSize) {
  //     input.value = '';
  //     input.classList.remove("cell-correct", "cell-incorrect");
  //     return;
  //   }

  //   if (entered === correct) {
  //     input.classList.add("cell-correct");
  //     input.classList.remove("cell-incorrect");
  //   } else {
  //     input.classList.add("cell-incorrect");
  //     input.classList.remove("cell-correct");
  //   }

  //   const value = e.target.value;
  //   moveStack.push({ row, col, prev: e.target.dataset.prev, newVal: value });
  //   e.target.dataset.prev = value;
  //   onCellInput(row, col, value);

  //   if (mistakeCount >= allowedMistakes) {
  //     alert("Game Over");
  //     document.querySelectorAll(".sudoku-cell").forEach((cell) => {
  //       if (!cell.disabled) cell.disabled = true;
  //     });
  //   }
  // }

  function renderGrid(n, onCellInput) {
    gridContainer.innerHTML = "";
    const fullSize = n * n;

    gridContainer.style.display = "grid";
    gridContainer.style.gridTemplateColumns = `repeat(${fullSize}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${fullSize}, 1fr)`;
    gridContainer.style.gap = "2px";

    const blockSize = n;
    
    for (let r = 0; r < fullSize; r++) {
      for (let c = 0; c < fullSize; c++) {
        const input = document.createElement("input");
        input.type = "text";
        input.maxLength = "2";
        input.dataset.row = r;
        input.dataset.col = c;
        input.classList.add("sudoku-cell");

        if (r % blockSize === 0 && r !== 0) {
          input.style.borderTop = "2px solid black";
        }
        if (c % blockSize === 0 && c !== 0) {
          input.style.borderLeft = "2px solid black";
        }

        input.addEventListener("input", (e) => onCellInput(e, r, c));
        gridContainer.appendChild(input);
      }
    }
  }

  function resetGame() {
    // gameStarted = false;
    // secondsElapsed = 0;
    // moveStack = [];
    // mistakeCountElement.textContent = "0";
    // clearInterval(timer);
    // renderGrid(selectedSize);
    gridContainer.innerHTML = "";
    renderGrid(selectedSize, onCellInput);
    onStartGame();
  }
  
}

// function startTimer() {
//   clearInterval(timer);
//   timerElement.textContent = "00:00";
//   timer = setInterval(() => {
//     secondsElapsed++;
//     const mins = String(Math.floor(secondsElapsed / 60)).padStart(2, "0");
//     const secs = String(secondsElapsed % 60).padStart(2, "0");
//     timerElement.textContent = `${mins}:${secs}`;
//   }, 1000);
// }

export function getSelectedSize() {
  return selectedSize;
}

export function getSelectedDifficulty() {
  return selectedDifficulty;
}

export function updateMistakes(count, limit) {
  mistakeCountElement.textContent = count;
  document.getElementById("mistake-limit").textContent = limit;
}


