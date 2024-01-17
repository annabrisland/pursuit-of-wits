import React, { useState, useEffect } from "react";

const CharacterSelection = ({ onSelectCharacter }) => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    // Fetch characters from Giphy API
    const apiKey = "YOUR_GIPHY_API_KEY";
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
};
