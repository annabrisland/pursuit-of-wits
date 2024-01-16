import React, { useEffect } from "react";

import MainBoard from "./components/MainBoard";
import "./App.css";

const App = () => {

  useEffect(() => {
    const totalSquares = 100;
    const gameBoardContainer = document.getElementById("game-board-container");

    // Clear previous squares
    gameBoardContainer.innerHTML = "";

    for (let i = 0; i < totalSquares; i++) {
      let square = document.createElement("div");
      square.classList.add("board-square", "color-square");
      square.style.setProperty("--square-index", i);

      const colNum = i % 10;
      const rowNum = Math.floor(i / 10);

      if (rowNum % 2 === 0) {
        const squareId = rowNum * 10 + colNum + 1;
        square.textContent = squareId;
      } else {
        const squareId = (rowNum + 1) * 10 - colNum;
        square.textContent = squareId;
      }

      gameBoardContainer.appendChild(square);

      // Get screen coordinates
      const rect = square.getBoundingClientRect();
      console.log(
        `Square ${i + 1} Screen Coordinates: (${rect.left}, ${rect.top})`
      );
    }
  }, []);

  return (
    <div className="App">
      <label htmlFor="playerCount" className="block text-lg mb-2">
        Select Number of Players:
      </label>
      <select
        id="playerCount"
        className="mb-4 p-2 border rounded bg-white w-full lg:w-1/4"
      >
        <option value="1">1 Player</option>
        <option value="2">2 Players</option>
        <option value="3">3 Players</option>
        <option value="4">4 Players</option>
      </select>
        <div className="layout" id="game-board-container"></div>
    </div>
  );
  
};

export default App;
