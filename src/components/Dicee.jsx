import React, { useState } from "react";
import "../DiceeStyle.css";

const DiceGame = () => {
  const [diceNumber, setDiceNumber] = useState(1);

  const rollDice = () => {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    setDiceNumber(randomNumber);
  };

  return (
    <div className="container">
      <h1>Roll the Dice</h1>

      <div className="dice" onClick={rollDice}>
        <img
          className={`img rotate-animation`}
          src={`/images/dice${diceNumber}.png`} // Adjust the path based on your project structure
          alt={`Dice ${diceNumber}`}
        />
      </div>
    </div>
  );
};

export default DiceGame;
