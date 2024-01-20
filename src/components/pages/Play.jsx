import React, { useState } from "react";
import MainBoard from "../MainBoard";
import QuestionContainer from "../QuestionContainer";

const Play = () => {

  // Set up to show & hide components
  const [showBoard, setShowBoard] = useState(true);

  return (
    <div style={{ position: "relative", height: "auto" }}>
      {showBoard ? <MainBoard 
          changeBoardState={setShowBoard} /> : null}
    </div>
  );
};

export default Play;
