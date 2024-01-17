import React, { useState, useEffect } from "react";

const CharacterSelection = ({ onSelectCharacter }) => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    // Fetch characters from Giphy API
    const apiKey = "CSihDGDXYSQhtQgkW5TfC6AN1op6riVf";
    const endpoint = `https://api.giphy.com/v1/gifs/search?q=character&api_key=${apiKey}&limit=5`;

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        const characterData = data.data.map((gif) => ({
          id: gif.id,
          url: gif.images.fixed_height.url,
        }));
        setCharacters(characterData);
      })
      .catch((error) => console.error("Error fetching characters:", error));
  }, []);

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
    onSelectCharacter(character.url);
  };

  return (
    <div>
      <h2>Select Your Character</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {characters.map((character) => (
          <div
            key={character.id}
            onClick={() => handleCharacterSelect(character)}
          >
            <img
              src={character.url}
              alt={`Character ${character.id}`}
              style={{ width: "80px", height: "80px", cursor: "pointer" }}
            />
          </div>
        ))}
      </div>
      {selectedCharacter && (
        <div>
          <h3>Selected Character:</h3>
          <img
            src={selectedCharacter.url}
            alt="Selected Character"
            style={{ width: "120px", height: "120px" }}
          />
        </div>
      )}
    </div>
  );
};

export default CharacterSelection;
