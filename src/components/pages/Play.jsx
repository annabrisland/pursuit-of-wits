import React, { useState } from "react";
import MainBoard from "../MainBoard";
import QuestionContainer from "../QuestionContainer";
import Dicee from "../Dicee";

const Play = () => {
  const [diceNumber, setDiceNumber] = useState(1);
  const [playerPosition, setPlayerPosition] = useState(0);

  // Set up to show & hide components
  const [showQuestion, setShowQuestion] = useState(true);
  const [showDice, setShowDice] = useState(false);
  const [showBoard, setShowBoard] = useState(true);

  return (
    <div style={{ position: "relative", height: "auto" }}>
      {showQuestion ? <QuestionContainer changeQuestionState={setShowQuestion} changeDiceState={setShowDice}/> : null}
      {showDice ? (
        <Dicee setDiceNumber={setDiceNumber} movePlayer={setPlayerPosition} />
      ) : null}
      {showBoard ? <MainBoard playerPosition={playerPosition} /> : null}
    </div>
  );
};

export default Play;
