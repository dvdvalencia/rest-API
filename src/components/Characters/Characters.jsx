import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Characters.css";
import "../../styles/SearchBar.css";
import "../../styles/Header.css";
import { getAllCharacters } from "../../view/Character/getChatacter";

function Characters() {
  const [characters, setCharacters] = useState([]); // Lista de personajes
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0); // Desplazamiento para paginación
  const [limit, setLimit] = useState(20); // Límite de personajes por página
  const [loading, setLoading] = useState(false); // Estado de carga
  const navigate = useNavigate();

  // Función para obtener personajes
  const fetchCharacters = async (currentOffset) => {
    setLoading(true);
    try {
      const response = await getAllCharacters(currentOffset);
      setCharacters(response.data.results); // Actualizar personajes para la página actual
      setFilteredCharacters(response.data.results);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Obtener personajes al cargar el componente o cambiar el offset
  useEffect(() => {
    fetchCharacters(offset);
  }, [offset]);

  // Manejar búsqueda
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

  // Manejar navegación de páginas
  const handleNextPage = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  const handlePreviousPage = () => {
    if (offset > 0) {
      setOffset((prevOffset) => prevOffset - limit);
    }
  };

  return (
    <div className="marvel">
      <img
        src="/public/marvel.png"
        alt="marvel"
        className="marvel"
      />
      <input
        type="text"
        placeholder="Search characters..."
        value={searchQuery}
        onChange={handleSearch}
        className="SearchBar"
      />
      {error && <p>Error: {error.message}</p>}
      {loading ? (
        <p>Loading characters...</p>
      ) : filteredCharacters.length > 0 ? (
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
        <p>No characters found.</p>
      )}
      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={offset === 0}>
          Previous
        </button>
        <button onClick={handleNextPage}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Characters;
