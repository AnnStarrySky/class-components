const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export const fetchPokemons = async (offset = 0, limit = 10) => {
  const res = await fetch(`${BASE_URL}?limit=${limit}&offset=${offset}`);
  
  if (!res.ok) throw new Error('Ошибка при загрузке');
  
  return res.json();
};