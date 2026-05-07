const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export const fetchPokemons = async (offset = 0, limit = 100) => {
  const res = await fetch(`${BASE_URL}?limit=${limit}&offset=${offset}`);
  
  if (!res.ok) throw new Error('Error loading');
  
  return res.json();
};

export const fetchOnePokemon = async (name: string) => {
  const res = await fetch(`${BASE_URL}/${name.toLowerCase()}`);
  if (!res.ok) throw new Error('Pokemon not found');
  return res.json();
};