import { useState } from "react";
import SudokuGrid from "./components/SudokuGrid";
import Button from "./components/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [grid, setGrid] = useState(Array(9).fill("").map(() => Array(9).fill("")));
  const [isSolved, setIsSolved] = useState(false);

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

    const boxRowStart = Math.floor(row / 3) * 3;
    const boxColStart = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[boxRowStart + i][boxColStart + j] === numStr) return false;
      }
    }

    return true;
  };

  const validateGrid = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const num = grid[row][col];
        if (num) {
          grid[row][col] = ""; 
          if (!isValidEntry(grid, row, col, num)) {
            grid[row][col] = num; 
            toast.error("Invalid entries. Check rows, columns, and 3x3 grids.");
            return false;
          }
          grid[row][col] = num; 
        }
      }
    }
    toast.success("Valid Sudoku grid!");
    return true;
  };


  const solveSudoku = () => {
    if (!validateGrid()) {
      toast.error("Please correct the entries before solving.");
      return;
    }

    const board = grid.map(row => [...row]); 

    const solve = () => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (!board[row][col]) {
            for (let num = 1; num <= 9; num++) {
              if (isValidEntry(board, row, col, num)) {
                board[row][col] = num.toString();
                if (solve()) return true;
                board[row][col] = ""; 
              }
            }
            return false; 
          }
        }
      }
      return true;
    };

    if (solve()) {
      setGrid(board);
      setIsSolved(true);
      toast.success("Sudoku solved successfully!");
    } else {
      toast.error("No solution exists for the current puzzle.");
    }
  };


  const handleClear = () => {
    setGrid(Array(9).fill("").map(() => Array(9).fill("")));
    setIsSolved(false);
    toast.info("Sudoku grid cleared.");
  };


  const handleHint = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === "") {
          for (let num = 1; num <= 9; num++) {
            if (isValidEntry(grid, row, col, num)) {
              toast.info(`Hint: Place ${num} at [${row + 1},${col + 1}]`);
              return;
            }
          }
        }
      }
    }
    toast.error("No hint available. Try solving more of the puzzle.");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-no-repeat  bg-center bg-contain p-4"
    style={{ backgroundImage: `linear-gradient(to top right, #fbc2eb, #a6c1ee, #fbc2eb, #ffecd2)` }} >
      <h1 className="text-4xl font-bold mb-4">Sudoku Solver</h1>
      <SudokuGrid grid={grid} setGrid={setGrid} isSolved={isSolved} />
      <div className="flex gap-4 mt-4">
        <Button onClick={validateGrid} label="Validate" />
        <Button onClick={solveSudoku} label="Solve" />
        <Button onClick={handleClear} label="Clear" />
        <Button onClick={handleHint} label="Hint" />
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default App;
