// Connects UI and logic

import {
  setupUIEvents,
  getSelectedSize,
  getSelectedDifficulty,
  updateMistakes,
} from "./ui.js";
import { generateSudoku } from "./generator.js";

let board = [];
let solvedBoard = [];
let mistakeCount = 0;
let allowedMistakes = 3;
let gameStarted = false;
let moveStack = []; 

const allowedMistakesMap = {
  easy: 3,
  medium: 4,
  hard: 5
};

document.addEventListener("DOMContentLoaded", () => {
  setupUIEvents(handleInput, giveHint, loadNewGame);
});

const toggleBtn = document.getElementById("toggle-theme");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleBtn.textContent = document.body.classList.contains("dark") ? "☀️ Light Mode" : "🌙 Dark Mode";
});


function loadNewGame() {
  const n = getSelectedSize();
  const difficulty = getSelectedDifficulty();
  
  const { puzzle, solution } = generateSudoku(n, difficulty);
  board = puzzle;
  solvedBoard = solution; 
  moveStack = [];
  mistakeCount = 0;
  gameStarted = false;
  mistakeCount = 0;
  allowedMistakes = allowedMistakesMap[difficulty];
  
  renderToUI(board);
  updateMistakes(mistakeCount, allowedMistakes);
  
  clearInterval(window.timer);
  startTimer();
}

function handleInput(e, row, col) {
  const input = e.target;
  const value = input.value.trim();
  const size = getSelectedSize() * getSelectedSize();

  if (!gameStarted) {
    gameStarted = true;
    clearInterval(window.timer);
    startTimer(); // start timer here
  }

  const entered = parseInt(value);
  const correctValue = solvedBoard[row][col];

  if (!entered || entered < 1 || entered > size) {
    input.value = '';
    input.classList.remove('cell-correct', 'cell-incorrect');
    return;
  }

  if(!gameStarted) return;

  if (entered === correctValue) {
    board[row][col] = correctValue;
    input.classList.remove('cell-incorrect');
    input.classList.add('cell-correct');
  } else {
    if(mistakeCount < allowedMistakes)
    {
      mistakeCount++;
      updateMistakes(mistakeCount, allowedMistakes);

      input.classList.add('cell-incorrect');
      input.classList.remove('cell-correct');

      if (mistakeCount >= allowedMistakes) {
        clearInterval(window.timer);
        gameStarted = false;
        alert("Game over! Too many mistakes.");
        document.querySelectorAll(".sudoku-cell").forEach((cell) => {
          if (!cell.disabled) cell.disabled = true;
        });
      }
    }
  }

  if (isPuzzleSolved()) {
    gameStarted = false;
    clearInterval(window.timer);
    setTimeout(() => {
    alert(`🎉 Congratulations! You solved the puzzle in ${timerElement.textContent}`);
    }, 100);
    document.querySelectorAll(".sudoku-cell").forEach((cell) => {
      if (!cell.disabled) cell.disabled = true;
    });
  }


  moveStack.push({ row, col, prev: input.dataset.prev || "", newVal: value });
  input.dataset.prev = value;
}

function isPuzzleSolved() {
const size = getSelectedSize() * getSelectedSize();
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (board[r][c] !== solvedBoard[r][c]) return false;
    }
  }
  return true;
}

function giveHint() {
  if(!gameStarted) return;

  const n = getSelectedSize();
  const size = n * n;

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (board[r][c] === 0) {
        const idx = r * size + c;
        const cell = document.getElementById("sudoku-grid").children[idx];
        const hintVal = solvedBoard[r][c];
        cell.value = hintVal;
        cell.classList.add('cell-correct');
        cell.dataset.prev = hintVal;
        board[r][c] = hintVal;
        return;
      }
    }
  }
}

function renderToUI(grid) {
  const gridElement = document.getElementById("sudoku-grid");
  const n = getSelectedSize();
  const size = n * n;

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const idx = r * size + c;
      const cell = gridElement.children[idx];
      cell.value = grid[r][c] !== 0 ? grid[r][c] : "";
      cell.disabled = grid[r][c] !== 0;
      cell.classList.remove("cell-correct", "cell-incorrect");
    }
  }
}

function startTimer() {
  clearInterval(window.timer);
  const timerElement = document.getElementById("timer");
  let secondsElapsed = 0;
  timerElement.textContent = "00:00";

  window.timer = setInterval(() => {
    secondsElapsed++;
    const mins = String(Math.floor(secondsElapsed / 60)).padStart(2, "0");
    const secs = String(secondsElapsed % 60).padStart(2, "0");
    timerElement.textContent = `${mins}:${secs}`;
  }, 1000);
}

