// scripts/custom.js

import { solveSudoku } from './solver.js';

// DOM elements
const gridContainer = document.getElementById('custom-grid');
const gridSizeSelect = document.getElementById('custom-grid-size');
const generateBtn = document.getElementById('generate-grid');
const toggleInputBtn = document.getElementById('toggle-input-btn');
const solve_Btn = document.getElementById('solve-custom-btn');

let n = 3;
let size = 9;
let inputComplete = false;

// Generate sudoku grid based on selected n
generateBtn.addEventListener('click', () => {
  n = parseInt(gridSizeSelect.value);
  size = n * n;
  inputComplete = false;

  renderGrid();
  document.querySelector('.custom-game').style.display = '';

  toggleInputBtn.textContent = 'Start Input';
  solve_Btn.disabled = true;
});

// Toggle "input mode" for user
toggleInputBtn.addEventListener('click', () => {
  inputComplete = !inputComplete;

  const inputFields = gridContainer.querySelectorAll('input');
  inputFields.forEach(input => {
    input.disabled = !inputComplete;
  });

  toggleInputBtn.textContent = inputComplete ? 'Input Complete' : 'Start Input';
  solve_Btn.disabled = inputComplete;
});

// Solve button logic
solve_Btn.addEventListener('click', () => {
  if (inputComplete) return;

  const inputs = gridContainer.querySelectorAll('input');
  const boardInput = [];

  for (let r = 0; r < size; r++) {
    boardInput[r] = [];
    for (let c = 0; c < size; c++) {
      const input = document.querySelector(`.sudoku-cell[data-row="${r}"][data-col="${c}"]`);
      const value = parseInt(input.value);
      boardInput[r][c] = isNaN(value) ? 0 : value;
    }
  }

  const success = solveSudoku(boardInput, n);

  if (success) {
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const input = document.querySelector(`.sudoku-cell[data-row="${r}"][data-col="${c}"]`);
        input.value = boardInput[r][c] !== 0 ? boardInput[r][c] : "";
        input.disabled = true;
        input.classList.add('cell-correct');
      }
    }
  } else {
    alert('❌ No solution found for the provided puzzle.');
  }

  toggleInputBtn.disabled = true;
  solve_Btn.disabled = true;
});

// Render blank customizable Sudoku grid
function renderGrid() {
  gridContainer.innerHTML = '';
  gridContainer.style.display = 'grid';
  gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  gridContainer.style.gap = '2px';

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const cell = document.createElement('input');
      cell.type = 'text';
      cell.maxLength = '2';
      cell.classList.add('sudoku-cell');
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.disabled = true; // Initially disabled until input mode is activated

      // Bold box boundaries
      if (r % n === 0 && r !== 0) cell.style.borderTop = '2px solid black';
      if (c % n === 0 && c !== 0) cell.style.borderLeft = '2px solid black';

      gridContainer.appendChild(cell);
    }
  }
}

const resetCustomBtn = document.getElementById('reset-custom-btn');

if (resetCustomBtn) {
  resetCustomBtn.addEventListener('click', () => {
    const inputs = gridContainer.querySelectorAll('input');
    inputs.forEach(input => {
      input.value = '';
      input.disabled = true; // Back to initial disabled state
      input.classList.remove('cell-correct', 'cell-incorrect');
    });

    inputComplete = false;
    toggleInputBtn.textContent = 'Start Input';
    toggleInputBtn.disabled = false;         // Restore toggle button
    solve_Btn.disabled = true;               // Disable solve again
  });
}

