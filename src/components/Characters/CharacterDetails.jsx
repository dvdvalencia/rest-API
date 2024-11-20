import React from "react";
function CharacterDetails({ character }) {
  const { id } = useParams(); // Obtiene el ID del personaje de la URL
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
      <h2>{character.name}</h2>
      <p>{character.description || "No description available"}</p>
      {/* Optionally display additional details if available */}
      {character.comics?.available > 0 && (
        <p>Appears in: {character.comics.available} comics</p>
      )}
      {character.series?.available > 0 && (
        <p>Featured in: {character.series.available} series</p>
      )}
      {character.stories?.available > 0 && (
        <p>Has {character.stories.available} stories</p>
      )}
      {character.events?.available > 0 && (
        <p>Involved in: {character.events.available} events</p>
      )}
    </div>
  );
}
export default CharacterDetails;
