// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // Importar useNavigate
// import "../../styles/Characters.css";
// import "../../styles/SearchBar.css";
// import "../../styles/Header.css"
// import { getCharacter } from "../../view/Character/getChatacter";

// function Characters() {
//   const [characterData, setCharacterData] = useState(null);
//   const [filteredCharacters, setFilteredCharacters] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [error, setError] = useState(null);
//   const navigate = useNavigate(); // Inicializar useNavigate

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getCharacter();
//         setCharacterData(response.data.results);
//         setFilteredCharacters(response.data.results);
//       } catch (err) {
//         setError(err);
//       }
//     };
//     fetchData();
//   }, []);

//     // Maneja el cambio en el input de búsqueda
//     const handleSearch = (e) => {
//       const query = e.target.value.toLowerCase();
//       setSearchQuery(query);
//       if (characterData) {
//         const filtered = characterData.filter((character) =>
//           character.name.toLowerCase().includes(query)
//         );
//         setFilteredCharacters(filtered);
//       }
//     };

//   const handleCharacterClick = (id) => {
//     navigate(`/${id}`); // Redirigir a la página de detalles
//   };

//   return (
//     <div>
//       <img src="/public/marvel.png" alt="universo-marvel" className="universo-marvel" />
//       <input
//         type="text"
//         placeholder="Search characters..."
//         value={searchQuery}
//         onChange={handleSearch}
//         className="SearchBar"
//       />
//       {error && <p>Error: {error.message}</p>}
//       {filteredCharacters.length > 0 ? (
//         <div className="character-list">
//           {filteredCharacters.map((character) => (
//             <div
//               key={character.id}
//               className="character-card"
//               onClick={() => handleCharacterClick(character.id)}
//             >
//               <h2>{character.name.toUpperCase()}</h2>
//               <img
//                 src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
//                 alt={character.name}
//                 className="character-image"
//               />
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>Loading characters...</p>
//       )}
//     </div>
//   );
// }

// export default Characters;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Characters.css";
import "../../styles/SearchBar.css";
import "../../styles/Header.css";
import { getAllCharacters } from "../../view/Character/getChatacter"; // Use getAllCharacters for pagination

function Characters() {
  const [characters, setCharacters] = useState([]); // List of characters
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0); // Offset for pagination
  const [limit, setLimit] = useState(99); // Limit of characters per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCharacters(offset); // Use getAllCharacters with offset
        setCharacters((prevChars) => [...prevChars, ...response.data.results]); // Accumulate characters
        setFilteredCharacters(response.data.results); // Set initial filtered characters
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, [offset]); // Refetch on offset change

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (characters) {
      const filtered = characters.filter((character) =>
        character.name.toLowerCase().includes(query)
      );
      setFilteredCharacters(filtered);
    }
  };

  const handleCharacterClick = (id) => {
    navigate(`/${id}`); // Redirigir a la página de detalles
  };

  const handleLoadMore = () => {
    setOffset(offset + limit); // Update offset for next page
  };

  return (
    <div>
      <img
        src="/public/marvel.png"
        alt="universo-marvel"
        className="universo-marvel"
      />
      <input
        type="text"
        placeholder="Search characters..."
        value={searchQuery}
        onChange={handleSearch}
        className="SearchBar"
      />
      {error && <p>Error: {error.message}</p>}
      {filteredCharacters.length > 0 ? (
        <div className="character-list">
          {filteredCharacters.map((character) => (
            <div
              key={character.id}
              className="character-card"
              onClick={() => handleCharacterClick(character.id)}
            >
              <h2>{character.name.toUpperCase()}</h2>
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
      {filteredCharacters.length < characters.length && !error && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
    </div>
  );
}

export default Characters;