import { expect, test, beforeEach } from 'vitest';
import { usePokemonStore } from './usePokemonStore';

beforeEach(() => {
  usePokemonStore.getState().clearSelected();
});

test('should start with an empty array', () => {
  const state = usePokemonStore.getState();
  expect(state.selectedPokemons).toEqual([]);
});

test('should add a pokemon if it is not selected', () => {
  usePokemonStore.getState().togglePokemon('pikachu');

  const state = usePokemonStore.getState();
  expect(state.selectedPokemons).toEqual(['pikachu']);
});

test('should remove a pokemon if it is already selected', () => {
  usePokemonStore.getState().togglePokemon('pikachu');
  usePokemonStore.getState().togglePokemon('pikachu');

  const state = usePokemonStore.getState();
  expect(state.selectedPokemons).toEqual([]);
});

test('should clear all selected pokemons', () => {
  usePokemonStore.getState().togglePokemon('pikachu');
  usePokemonStore.getState().togglePokemon('bulbasaur');

  usePokemonStore.getState().clearSelected();

  const state = usePokemonStore.getState();
  expect(state.selectedPokemons).toEqual([]);
});