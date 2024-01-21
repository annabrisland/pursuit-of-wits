import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Avatar from "../Avatar";

const SetUp = () => {
  const [selectedPlayers, setSelectedPlayers] = useState(null);
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const avatarSeeds = JSON.parse(localStorage.getItem("avatarSeeds")) || [];

  useEffect(() => {
    if (avatarSeeds.length === 0) {
      // Generate random avatar seeds only if not present in local storage
      const newSeeds = [...Array(10)].map(() =>
        Math.floor(Math.random() * 100000).toString()
      );
      localStorage.setItem("avatarSeeds", JSON.stringify(newSeeds));
    }
  }, [avatarSeeds]);

  useEffect(() => {
    // Load previously saved characters from local storage
    const savedCharacters =
      JSON.parse(localStorage.getItem("selectedCharacters")) || [];
    setSelectedCharacters(savedCharacters);
  }, []);

  const handlePlayerSelect = (num) => {
    setSelectedPlayers(num);
    setSelectedCharacters([]);
  };

  const handleCharacterSelect = (index) => {
    if (
      selectedPlayers !== null &&
      selectedCharacters.length < selectedPlayers
    ) {
      const newCharacter = {
        player: (selectedCharacters.length % selectedPlayers) + 1,
        index: index,
      };
      setSelectedCharacters((prevCharacters) => [
        ...prevCharacters,
        newCharacter,
      ]);

      // Save selected characters to local storage
      localStorage.setItem(
        "selectedCharacters",
        JSON.stringify([...selectedCharacters, newCharacter])
      );
    }
  };

  const handleLetsPlay = () => {
    // Logic to proceed to the game board
    console.log("Let's Play!");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Select Number of Players</h2>
      <div>
        {[1, 2, 3, 4].map((num) => (
          <button key={num} onClick={() => handlePlayerSelect(num)}>
            {num} Players
          </button>
        ))}
      </div>

      {selectedPlayers && (
        <>
          <h2>Select Characters</h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {avatarSeeds.map((seed, index) => (
              <div
                key={index}
                onClick={() => handleCharacterSelect(index)}
                style={{
                  width: "100px",
                  height: "100px",
                  border: "4px solid black",
                  backgroundColor: "white",
                  margin: "10px",
                  fontSize: "20px",
                  cursor: "pointer",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {selectedCharacters.map(
                  (item, i) =>
                    item.index === index && (
                      <span
                        key={i}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          background: "black",
                          color: "white",
                          padding: "4px",
                        }}
                      >
                        Player {item.player}
                      </span>
                    )
                )}
                <Avatar key={index} seed={seed} />
              </div>
            ))}
          </div>
          {selectedCharacters.length === selectedPlayers && (
            <NavLink
              to="/play"
              onClick={handleLetsPlay}
              style={{
                display: "inline-block",
                padding: "10px 20px",
                backgroundColor: "#4caf50",
                color: "white",
                textDecoration: "none",
                marginTop: "20px",
                borderRadius: "5px",
                fontSize: "18px",
              }}
            >
              Let's Play
            </NavLink>
          )}
        </>
      )}
    </div>
  );
};

export default SetUp;
