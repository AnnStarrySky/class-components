import { create } from "zustand";

type PokemonStore = {
  selectedPokemons: string[];
  togglePokemon: (name: string) => void;
  clearSelected: () => void;
};

export const usePokemonStore = create<PokemonStore>((set) => ({
  selectedPokemons: [],

  togglePokemon: (name) =>
    set((state) => {
      const isSelected =
        state.selectedPokemons.includes(name);

      if (isSelected) {
        return {
          selectedPokemons:
            state.selectedPokemons.filter(
              (pokemon) => pokemon !== name
            ),
        };
      }

      return {
        selectedPokemons: [
          ...state.selectedPokemons,
          name,
        ],
      };
    }),

  clearSelected: () =>
    set({
      selectedPokemons: [],
    }),
}));