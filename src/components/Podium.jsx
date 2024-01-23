import React from "react";
import "../Podium.css";

const Podium = () => {
  return (
    <div className="podium">
      <div className="podium-level" id="third-place">
        <p>Third Place</p>
      </div>
      <div className="podium-level" id="second-place">
        <p>Second Place</p>
      </div>
      <div className="podium-level" id="first-place">
        <p>First Place</p>
      </div>
    </div>
  );
};

export default Podium;
