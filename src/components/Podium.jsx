import React from "react";

const Podium = () => {
  return (
    <div className="podium">
      <div>
        <div>Player</div>
        <div className="podium-level" id="second-place">
          <p>2nd Place</p>
        </div>
      </div>
      <div>
        <div>Player</div>
        <div className="podium-level" id="first-place">
          <p>1st Place</p>
        </div>
      </div>
      <div>
        <div>Player</div>
        <div className="podium-level" id="third-place">
          <p>3rd Place</p>
        </div>
      </div>
    </div>
  );
};

export default Podium;
