export async function getAllCharacters(offset = 0) {
  const baseUrl = 'https://gateway.marvel.com/v1/public/characters';
  const params = new URLSearchParams({
    ts: '1',
    apikey: '571b4bf3ff40286b0e70f67be7cd6824',
    hash: 'a515bf55b4fb6fdf861f29c5a70093cf',
    offset,
    limit: 20 
  });

  const url = `${baseUrl}?${params.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch character data:', error);
    throw error;
  }
}

// Función para obtener un personaje por ID
export async function getCharacterById(id) {
  const url = `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=571b4bf3ff40286b0e70f67be7cd6824&hash=a515bf55b4fb6fdf861f29c5a70093cf`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data; // Retorna el objeto data que contiene el personaje
  } catch (error) {
    console.error('Failed to fetch character data by ID:', error);
    throw error;
  }
}
