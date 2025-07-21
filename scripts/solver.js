// Uses backtracking to solve any n x n block sudoku (e.g., 9x9, 16x16)

import { isSafe } from "./validation.js";

export function solveSudoku(board, n) {
  const size = n * n;

  function solveHelper(row, col) {
    if (row === size) return true;
    if (col === size) return solveHelper(row + 1, 0);
    if (board[row][col] !== 0) return solveHelper(row, col + 1);

    for (let num = 1; num <= size; num++) {
      if (isSafe(board, row, col, num, n)) {
        board[row][col] = num;
        if (solveHelper(row, col + 1)) return true;
        board[row][col] = 0;
      }
    }
    return false;
  }

  return solveHelper(0, 0);
}
