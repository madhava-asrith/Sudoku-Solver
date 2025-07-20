const gridContainer = document.getElementById('sudoku-grid');

// Create a 9x9 Sudoku grid
// Each cell is an input field that accepts only digits 1-9
function createSudokuGrid() {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('maxlength', '1');
        input.dataset.row = row;
        input.dataset.col = col;
        input.classList.add('sudoku-cell');


        input.addEventListener('input', () => {
        const value = input.value;
        if (!/^[1-9]$/.test(value)) {
            input.value = '';
            showAlert('Only digits 1–9 are allowed!');
        }
        });

        // Add thicker border for 3x3 boxes
        if ((row % 3 === 0 && row !== 0)) {
        input.style.borderTop = '2px solid black';
        }
        if ((col % 3 === 0 && col !== 0)) {
        input.style.borderLeft = '2px solid black';
        }

        gridContainer.appendChild(input);
    }
  }

  
}

createSudokuGrid();

// Function to get the current state of the Sudoku board
// Returns a 2D array where empty cells are represented by 0
function readBoardFromGrid() {
  const board = [];
  for (let row = 0; row < 9; row++) {
    const rowData = [];
    for (let col = 0; col < 9; col++) {
      const input = document.querySelector(
        `.sudoku-cell[data-row="${row}"][data-col="${col}"]`
      );
      const value = parseInt(input.value);
      rowData.push(isNaN(value) ? 0 : value);
    }
    board.push(rowData);
  }
  return board;
}


// Event listener for the "Reset" button
document.getElementById('reset-btn').addEventListener('click', () => {
  const inputs = document.querySelectorAll('#sudoku-grid input');
  inputs.forEach(input => input.value = '');
});

// Function to show an alert message for the 1-9 number validation
function showAlert(message) {
  const alertBox = document.getElementById('alert-box');
  if (!alertBox) return;
  alertBox.textContent = message;
  alertBox.style.opacity = 1;
  setTimeout(() => (alertBox.style.opacity = 0), 3000);
}


// function to solve the Sudoku puzzle
function isSafe(board, row, col, num) {
  // Row check
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num) return false;
  }

  // Column check
  for (let x = 0; x < 9; x++) {
    if (board[x][col] === num) return false;
  }

  // 3x3 box check
  const startRow = row - (row % 3);
  const startCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === num) return false;
    }
  }

  return true;
}

function solveSudoku(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board)) return true;
            board[row][col] = 0; // backtrack
          }
        }
        return false; // no number is valid
      }
    }
  }
  return true; // solved
}

function fillGridWithSolution(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const input = document.querySelector(
        `.sudoku-cell[data-row="${row}"][data-col="${col}"]`
      );
      input.value = board[row][col] !== 0 ? board[row][col] : '';
    }
  }
}

document.getElementById('solve-btn').addEventListener('click', () => {
  const board = readBoardFromGrid();
  const solved = solveSudoku(board);

  if (solved) {
    fillGridWithSolution(board);
  } else {
    showAlert('This Sudoku puzzle has no solution.');
  }
});

