import React, { useState, useEffect } from "react";
import MainBoard from "../MainBoard";


const Play = () => {

  const [numberOfPlayers, setNumberOfPlayers] = useState(4);

  useEffect(() => {
    setNumberOfPlayers((JSON.parse(localStorage.getItem("selectedCharacters"))).length);
  }, []);


  return (
    <div style={{ position: "relative", height: "auto" }}>
      <MainBoard numberOfPlayers={numberOfPlayers} />
    </div>
  );
};

export default Play;
