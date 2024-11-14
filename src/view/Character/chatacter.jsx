

export async function getCharacter() {
  const url = 'https://gateway.marvel.com/v1/public/characters?ts=1&apikey=571b4bf3ff40286b0e70f67be7cd6824&hash=a515bf55b4fb6fdf861f29c5a70093cf';

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

