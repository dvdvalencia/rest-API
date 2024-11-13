import React, { useState, useEffect } from 'react';
import './App.css';
import { getCharacter } from './view/Character/chatacter'; 

function App() {
  const [characterData, setCharacterData] = useState(null);
  const [error, setError] = useState(null);

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
    console.log(characterData),
    
    <div>
      <h1>Marvel Characters</h1>
      {error && <p>Error: {error.message}</p>}
      {characterData ? (
        <div>
          <p><b>Code:</b> {characterData.code}</p>
          <p><b>Status:</b> {characterData.status}</p>
          <p><b>Copyright:</b> {characterData.copyright}</p>
          <div className="character-list">
            {characterData.results.map((character) => (
              <div key={character.id} className="character-card">
                <h2>{character.name}</h2>
                <img
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={character.name}
                  className="character-image"
                />
                <p>{character.description || "No description available"}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading characters...</p>
      )}
    </div>
  );
}

export default App;
