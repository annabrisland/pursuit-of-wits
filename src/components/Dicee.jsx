import React, { useState } from "react";
import "../DiceeStyle.css";

const DiceGame = () => {
  const [diceNumber, setDiceNumber] = useState(1);

  const rollDice = () => {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    setDiceNumber(randomNumber);

    const diceElement = document.querySelector(".dice");
    diceElement.classList.remove("rotate-animation");

    // Trigger reflow to restart the animation
    void diceElement.offsetWidth;

    // Add animation class back
    diceElement.classList.add("rotate-animation");
  };

  return (
    <div className="container">
      <h1>Roll the Dice</h1>

      <div className="dice" onClick={rollDice}>
        <img
          className={`img rotate-animation`}
          src={`/images/dice${diceNumber}.png`}
          alt={`Dice ${diceNumber}`}
        />
      </div>
    </div>
  );
};

export default DiceGame;
