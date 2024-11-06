// src/components/SudokuGrid.jsx

import React from 'react';

const SudokuGrid = ({ grid, setGrid, isSolved }) => {
  const handleChange = (row, col, value) => {
    if (value === "" || /^[1-9]$/.test(value)) {
      const newGrid = [...grid];
      newGrid[row][col] = value;
      setGrid(newGrid);
    }
  };

  const getCellColor = (value) => {
    // Color logic for empty vs filled cells
    if (value === "") {
      return "bg-white";  // white for empty cells
    }
    return "bg-[#fbc1ea]"; // light green for filled cells
  };

  return (
    <div className="grid grid-cols-9 gap-1">
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <input
            key={`${rowIndex}-${colIndex}`}
            type="text"
            maxLength="1"
            value={cell}
            onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
            className={`w-12 h-12 text-center border-2 border-gray-400 rounded-md ${
              getCellColor(cell)
            } ${isSolved && "text-gray-500"}`}
          />
        ))
      )}
    </div>
  );
};

export default SudokuGrid;
