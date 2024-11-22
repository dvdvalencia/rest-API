// const apiKey = process.env.REACT_APP_API_KEY;
// const hash = process.env.REACT_APP_HASH;

// export async function getCharacterById(id) {
//   const url = `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${apiKey}&hash=${hash}`;

//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Error: ${response.status} ${response.statusText}`);
//     }
//     const data = await response.json();
//     return data.data.results[0];
//   } catch (error) {
//     console.error('Error fetching character by ID:', error);
//     throw error;
//   }
// }
