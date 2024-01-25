import React from "react";
import Avatar from "./Avatar";

const Podium = () => {
  const results = JSON.parse(localStorage.getItem("final-pos"));
  const playerInfo = JSON.parse(localStorage.getItem("avatars-config"));

  return (
    <div className="podium">
      <div>
        <div className="player-name">
          {results[1] ? "Player " + (results[1][0] + 1) : ""}
        </div>
        {results[1] ? <Avatar seed={playerInfo[results[1][0]].seed} /> : ""}
        <div className="podium-level" id="second-place">
          <p>2nd Place</p>
        </div>
      </div>
      <div>
        <div className="player-name">Player {results[0][0] + 1}</div>
        <Avatar seed={playerInfo[results[0][0]].seed} />
        <div className="podium-level" id="first-place">
          <p>1st Place</p>
        </div>
      </div>
      <div>
        <div className="player-name">
          {results[2] ? "Player " + (results[2][0] + 1) : ""}
        </div>
        {results[2] ? <Avatar seed={playerInfo[results[2][0]].seed} /> : ""}
        <div className="podium-level" id="third-place">
          <p>3rd Place</p>
        </div>
      </div>
    </div>
  );
};

export default Podium;
