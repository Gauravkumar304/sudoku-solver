// src/App.jsx
import { useState } from "react";
import SudokuGrid from "./components/SudokuGrid";
import Button from "./components/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [grid, setGrid] = useState(Array(9).fill("").map(() => Array(9).fill("")));
  const [isSolved, setIsSolved] = useState(false);

  // Helper function to validate grid entries for uniqueness
  const isValidEntry = (grid, row, col, num) => {
    const numStr = num.toString();

    // Check row
    for (let j = 0; j < 9; j++) {
      if (grid[row][j] === numStr) return false;
    }

    // Check column
    for (let i = 0; i < 9; i++) {
      if (grid[i][col] === numStr) return false;
    }

    // Check 3x3 subgrid
    const boxRowStart = Math.floor(row / 3) * 3;
    const boxColStart = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[boxRowStart + i][boxColStart + j] === numStr) return false;
      }
    }

    return true;
  };

  // Validate the current state of the grid entries
  const validateGrid = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const num = grid[row][col];
        if (num) {
          grid[row][col] = ""; // Temporarily clear the cell for validation
          if (!isValidEntry(grid, row, col, num)) {
            grid[row][col] = num; // Restore the original value
            toast.error("Invalid entries. Check rows, columns, and 3x3 grids.");
            return false;
          }
          grid[row][col] = num; // Restore the original value
        }
      }
    }
    toast.success("Valid Sudoku grid!");
    return true;
  };

  // Solve function with integrated validation
  const solveSudoku = () => {
    // Run validation first
    if (!validateGrid()) {
      toast.error("Please correct the entries before solving.");
      return;
    }

    const board = grid.map(row => [...row]); // Create a copy of the grid

    const solve = () => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (!board[row][col]) {
            for (let num = 1; num <= 9; num++) {
              if (isValidEntry(board, row, col, num)) {
                board[row][col] = num.toString();
                if (solve()) return true;
                board[row][col] = ""; // Undo if backtrack is needed
              }
            }
            return false; // No valid number found, trigger backtracking
          }
        }
      }
      return true; // Puzzle solved
    };

    if (solve()) {
      setGrid(board);
      setIsSolved(true);
      toast.success("Sudoku solved successfully!");
    } else {
      toast.error("No solution exists for the current puzzle.");
    }
  };

  // Clear button function to reset the grid
  const handleClear = () => {
    setGrid(Array(9).fill("").map(() => Array(9).fill("")));
    setIsSolved(false);
    toast.info("Sudoku grid cleared.");
  };

  // Hint button function to provide a hint to the user
  const handleHint = () => {
    // Find the first empty cell
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === "") {
          // Try each number (1-9) for this cell
          for (let num = 1; num <= 9; num++) {
            if (isValidEntry(grid, row, col, num)) {
              toast.info(`Hint: Place ${num} at [${row + 1},${col + 1}]`);
              return; // Stop after finding the first valid number
            }
          }
        }
      }
    }
    toast.error("No hint available. Try solving more of the puzzle.");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-no-repeat  bg-center bg-contain p-4"
    style={{ backgroundImage: `linear-gradient(to top right, #fbc2eb, #a6c1ee, #fbc2eb, #ffecd2), url('https://img.freepik.com/free-vector/sudoku-word-logo-design_1308-114424.jpg')` }} >
      <h1 className="text-4xl font-bold mb-4">Sudoku Solver</h1>
      <SudokuGrid grid={grid} setGrid={setGrid} isSolved={isSolved} />
      <div className="flex gap-4 mt-4">
        <Button onClick={validateGrid} label="Validate" />
        <Button onClick={solveSudoku} label="Solve" />
        <Button onClick={handleClear} label="Clear" />
        <Button onClick={handleHint} label="Hint" />
      </div>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default App;
