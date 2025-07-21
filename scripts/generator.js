// Generates a sudoku puzzle based on difficulty
 
import { solveSudoku } from "./solver.js";

export function generateSudoku(n, difficulty) {
  const size = n * n;
  const board = Array.from({ length: size }, () => Array(size).fill(0));

  // Fill diagonal boxes
  for (let i = 0; i < size; i += n) {
    fillBox(board, i, i, n, size);
  }

  solveSudoku(board, n);

  // Make holes based on difficulty
  let cluesToKeep = {
    easy: size * size - size * 2,
    medium: size * size - size * 3,
    hard: size * size - size * 4,
  }[difficulty];

  const puzzle = board.map(row => row.slice());
  const full_solution = board.map(row => row.slice());

  let attempts = size * size - cluesToKeep;
  while (attempts > 0) {
    const r = Math.floor(Math.random() * size);
    const c = Math.floor(Math.random() * size);
    if (puzzle[r][c] !== 0) {
      puzzle[r][c] = 0;
      attempts--;
    }
  }

  return  { puzzle, solution: full_solution };
}

function fillBox(board, row, col, n, size) {
  const used = new Set();
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let num;
      do {
        num = Math.floor(Math.random() * size) + 1;
      } while (used.has(num));
      used.add(num);
      board[row + i][col + j] = num;
    }
  }
}
