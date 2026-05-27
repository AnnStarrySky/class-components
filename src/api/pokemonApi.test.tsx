import { expect, test, vi } from 'vitest';
import { fetchPokemons, fetchOnePokemon } from './pokemonApi';

test('fetchPokemons returns data', async () => {
  const fakeData = { results: [{ name: 'pikachu' }] };
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok: true,
    json: async () => fakeData,
  }));

  const data = await fetchPokemons();
  expect(data).toEqual(fakeData);
});

test('fetchPokemons handles error', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));

  await expect(fetchPokemons()).rejects.toThrow('Error loading');
});

test('fetchOnePokemon returns data', async () => {
  const fakePokemon = { name: 'bulbasaur' };
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok: true,
    json: async () => fakePokemon,
  }));

  const data = await fetchOnePokemon('bulbasaur');
  expect(data).toEqual(fakePokemon);
});

test('fetchOnePokemon handles error', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));

  await expect(fetchOnePokemon('unknown')).rejects.toThrow('Not found');
});