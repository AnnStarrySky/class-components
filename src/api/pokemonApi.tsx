const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export type Pokemon = {
  name: string;
  url?: string;
  stats?: { base_stat: number; stat: { name: string } }[];
}

export const fetchPokemons = async (offset = 0, limit = 8) => {
  const res = await fetch(`${BASE_URL}?limit=${limit}&offset=${offset}`);
  if (!res.ok) throw new Error('Error loading');
  return res.json();
};

export const fetchOnePokemon = async (name: string): Promise<Pokemon> => {
  const res = await fetch(`${BASE_URL}/${name.toLowerCase()}`);
  if (!res.ok) throw new Error('Not found');
  return res.json();
};