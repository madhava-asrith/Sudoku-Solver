// Validates if a number can be placed at a given position

export function isSafe(board, row, col, num, n) {
  const size = n * n;

  // Check row and column
  for (let i = 0; i < size; i++) {
    if (board[row][i] === num || board[i][col] === num) return false;
  }

  // Check box
  const boxRowStart = Math.floor(row / n) * n;
  const boxColStart = Math.floor(col / n) * n;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (board[boxRowStart + i][boxColStart + j] === num) return false;
    }
  }

  return true;
}
