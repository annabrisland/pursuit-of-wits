import React, { useState } from "react";
import "../DiceeStyle.css";

const DiceGame = ({setParentDiceState, setPlayerPosition, currentPosition, turn, setTurn, setPlayerTurn, playerTurn, changeQuestionState, changeBoardState, rollState, setRollState, numberOfPlayers}) => {

  const [diceNumber, setDiceNumber] = useState(1);
  const [rollNumber, setRollNumber] = useState(0);

  const rollDice = () => {
    
    if (rollState === true) {
      return
    } else {
      setRollState(true);
      const randomNumber = Math.floor(Math.random() * 6) + 1;
    
      setRollNumber(rollNumber + 1);
  
      setParentDiceState({
        rollNumber: rollNumber,
        diceNumber: randomNumber
      });
  
      setDiceNumber(randomNumber);
  
      const updateNum = playerTurn;
  
      setPlayerPosition({...currentPosition, [updateNum]:{old:currentPosition[updateNum].current, current: currentPosition[updateNum].current + randomNumber}});
  
      const diceElement = document.querySelector(".dice");
      diceElement.classList.remove("rotate-animation");
  
      // Trigger reflow to restart the animation
      void diceElement.offsetWidth;
  
      // Add animation class back
      diceElement.classList.add("rotate-animation");
      setTimeout(() => {
        changeQuestionState(true);
        changeBoardState(false);
        setRollState(false);
        setTurn(turn + 1);
        setPlayerTurn((turn+1)%numberOfPlayers)
      }, 3000);
    }

  };

  return (
    <div className="container">
      <h1>{rollState ? `Player ${(playerTurn +1)} rolled:` : `Player ${(playerTurn+1)} Roll the Dice!!` }</h1>

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
