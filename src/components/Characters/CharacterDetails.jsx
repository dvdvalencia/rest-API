import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCharacterById } from "../../view/Character/getChatacter"; // Importa la función

function CharacterDetails() {
  const { id } = useParams(); // Obtiene el ID del personaje de la URL
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await getCharacterById(id); // Llama a la función para obtener datos
        setCharacter(response.data.results[0]); // Asegúrate de acceder correctamente a los datos
      } catch (err) {
        setError(err);
      }
    };
    fetchCharacter();
  }, [id]);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!character) {
    return <p>Loading character details...</p>;
  }

  return (
    <div className="character-details">
      <h2>{character.name.toUpperCase()}</h2>
      <div className="character-info">
        <div className="character-img">
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
          className="description-image"
        />
        </div>
        <div className="character-description">
        <div className="character-description-panel">
          <p>{character.description || "No description available"}</p>
          {character.comics?.available > 0 && (
            <p>Appears in: {character.comics.available} comics</p>
          )}
        </div>
          <div className="character-series">
          {character.series?.available > 0 && (
            <p>Featured in: {character.series.available} series</p>
          )}
          </div>
          <div className="character-stories">
          {character.stories?.available > 0 && (
            <p>Has {character.stories.available} stories</p>
          )}
          </div>
          <div className="character-events">
          {character.events?.available > 0 && (
            <p>Involved in: {character.events.available} events</p>
          )}
          </div>
        </div>
      </div>
      {/* Botón para regresar a la página principal */}
      <button onClick={() => navigate("/")}>Regresar</button>
    </div>
  );
}

export default CharacterDetails;

// return (
//   <div className="character-details">
//     <h2>{character.name.toUpperCase()}</h2>
//     <div className="character-info">
// {/* Imagen */}
// <div className="character-thumbnail">
//         <img
//           src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
//           alt={character.name}
//           className="description-image"
//         />
//       </div>

//       {/* Descripción y detalles */}
//       <div className="character-panels">
//         <div className="character-description-panel">
//           <p>{character.description || "No description available"}</p>
//         </div>
//         <div className="character-series-panel">
//           <p>Appears in: {character.series?.available || 0} series</p>
//         </div>
//         <div className="character-stories-panel">
//           <p>Has {character.stories?.available || 0} stories</p>
//         </div>
//         <div className="character-events-panel">
//           <p>Involved in: {character.events?.available || 0} events</p>
//         </div>
//       </div>
//     </div>  
//     {/* Botón para regresar a la página principal */}
//     <button onClick={() => navigate("/")}>Regresar</button>
//   </div>
// );
// }

// export default CharacterDetails;
