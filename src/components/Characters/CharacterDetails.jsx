import React from "react";

function CharacterDetails({ character }) {
  return (
    <div className="character-details">
      <h2>{character.name}</h2>
      <p>{character.description || "No description available"}</p>
      {/* Optionally display additional details if available */}
      {character.comics?.available > 0 && (
        <p>
          Appears in: {character.comics.available} comics
        </p>
      )}
      {character.series?.available > 0 && (
        <p>
          Featured in: {character.series.available} series
        </p>
      )}
      {character.stories?.available > 0 && (
        <p>
          Has {character.stories.available} stories
        </p>
      )}
      {character.events?.available > 0 && (
        <p>
          Involved in: {character.events.available} events
        </p>
      )}
    </div>
  );
}

export default CharacterDetails;