# Sudoku Solver Web App

An interactive, web-based Sudoku solver that supports both auto-generated puzzles and custom grid input. This project allows users to choose puzzle difficulty, select grid sizes (e.g. 9x9, 16x16), solve puzzles with live validation and mistake tracking, and even input custom puzzles for solution.

## 🔧 Features

- 🎯 Choose grid size: 3x3, 4x4, 5x5 (i.e., 9x9, 16x16, 25x25)
- 🧠 Difficulty levels: Easy, Medium, Hard
- 🔄 Supports auto-generated and custom user puzzles
- ❌ Mistake counter with difficulty-based limits
- ⏱ Live timer (starts on first input)
- 💡 Hint and Undo functionality
- 🌒 Optional Dark Mode toggle
- ✅ Solves puzzles using backtracking with validation for any `n x n` block grid

## 🖥 Technologies

- HTML, CSS, JavaScript (Vanilla)
- Modular file structure using ES Modules (`type="module"`)
- Responsive layout with accessibility considerations

## 🚀 Getting Started

1. Clone this repo: git clone https://github.com/your-username/sudoku-solver.git
2. Open `main.html` in your browser (no server required)

## 📁 Folder Structure
sudoku-solver/
├── main.html
├── custom.html
├── style/
│ └── style.css
├── scripts/
│ ├── main.js
│ ├── custom.js
│ ├── solver.js
│ ├── ui.js
│ ├── generator.js
│ └── validation.js
