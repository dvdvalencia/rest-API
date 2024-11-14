
import React, { useState, useEffect } from "react";
import "./Characters.css";
import { getCharacter } from "../../view/Character/chatacter";
import CharacterDetails from "./CharacterDetails"; // Import the new component

function Characters() {
  const [characterData, setCharacterData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCharacter();
        setCharacterData(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Marvel Characters</h1>
      {error && <p>Error: {error.message}</p>}
      {characterData ? (
        <div>
          <div className="character-list">
            {characterData.results.map((character) => (
              <div key={character.id} className="character-card" onClick={() => setSelectedCharacter(character)}>
                <h2>{character.name}</h2>
                <img
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={character.name}
                  className="character-image"
                />
              </div>
            ))}
          </div>
          {selectedCharacter && <CharacterDetails character={selectedCharacter} />}
        </div>
      ) : (
        <p>Loading characters...</p>
      )}
    </div>
  );
}

export default Characters;