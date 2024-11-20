import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import "./Characters.css";
import { getCharacter } from "../../view/Character/chatacter";

function Characters() {
  const [characterData, setCharacterData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Inicializar useNavigate

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

  const handleCharacterClick = (id) => {
    navigate(`/character/${id}`); // Redirigir a la página de detalles
  };

  return (
    <div>
      <h1>Marvel Characters</h1>
      {error && <p>Error: {error.message}</p>}
      {characterData ? (
        <div className="character-list">
          {characterData.results.map((character) => (
            <div key={character.id} className="character-card" onClick={() => handleCharacterClick(character.id)}>
              <h2>{character.name}</h2>
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
                className="character-image"
              />
            </div>
          ))}
        </div>
      ) : (
        <p>Loading characters...</p>
      )}
    </div>
  );
}

export default Characters;