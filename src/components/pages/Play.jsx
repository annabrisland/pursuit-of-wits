import React, { useState } from "react";
import MainBoard from "../MainBoard";
import QuestionContainer from "../QuestionContainer";

const Play = () => {
  const [diceNumber, setDiceNumber] = useState(1);
  const [playerPosition, setPlayerPosition] = useState(0);

  // Set up to show & hide components
  const [showQuestion, setShowQuestion] = useState(true);
  const [showBoard, setShowBoard] = useState(false);

  return (
    <div style={{ position: "relative", height: "auto" }}>
      {showQuestion ? <QuestionContainer changeQuestionState={setShowQuestion} changeBoardState={setShowBoard}/> : null}
      {showBoard ? <MainBoard playerPosition={playerPosition} /> : null}
    </div>
  );
};

export default Play;
