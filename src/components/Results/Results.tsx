import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from "react-router-dom";

import { fetchOnePokemon, fetchPokemons, type Pokemon } from '../../api/pokemonApi';
import { usePokemonStore } from '../../store/usePokemonStore';
import { ITEMS_PER_PAGE } from '../../constants/paginationNumber';

const Results = ({ searchQuery }: { searchQuery: string }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedPokemons = usePokemonStore(
    (state) => state.selectedPokemons
  );

  const togglePokemon = usePokemonStore(
    (state) => state.togglePokemon
  );

  const page = parseInt(searchParams.get("page") || "1");

  const {data: items = [], isLoading, isError} = useQuery<Pokemon[]>({
    queryKey: ['pokemons', page, searchQuery],
    queryFn: async () => {
      if (searchQuery) {
        const data = await fetchOnePokemon(searchQuery);
        return [data];
      }

      const data = await fetchPokemons(
        (page - 1) * ITEMS_PER_PAGE,
        ITEMS_PER_PAGE
      );

      return data.results ?? [];
    },
  });

  if (isLoading) {
    return <p className="mt-4">Loading...</p>;
  }

  if (isError) {
  return (
    <p className="text-red-500">
      {searchQuery ? "Pokemon not found" : "Failed to load data"}
    </p>
  );
}

  if (!searchQuery && items.length === 0) {
    return (
      <p className="text-red-500">
        No results found
      </p>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {items.map((p) => (
          <Link
            to={`/details/${p.name}`}
            replace
            key={p.name}
            className="p-4 border rounded bg-white shadow-sm block dark:bg-gray-700 dark:text-white"
          >
            <input
              type="checkbox"
              checked={selectedPokemons.includes(p.name)}
              onChange={() => togglePokemon(p.name)}
              onClick={(e) => e.stopPropagation()}
            />
            <h3 className="font-bold capitalize">{p.name}</h3>

            {p.stats ? (
              <div className="text-sm grid grid-cols-2 mt-2">
                {p.stats.map((s) => (
                  <div key={s.stat.name}>
                    {s.stat.name}: {s.base_stat}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400">
                {p.url}
              </p>
            )}
          </Link>
        ))}
      </div>

      {!searchQuery && (
        <div className="flex gap-4 mt-6 items-center">
          <button
            className="px-3 py-1 border disabled:opacity-50"
            onClick={() =>
              setSearchParams({ page: String(page - 1) })
            }
            disabled={page === 1}
          >
            Prev
          </button>

          <span>Page {page}</span>

          <button
            className="px-3 py-1 border"
            onClick={() =>
              setSearchParams({ page: String(page + 1) })
            }
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Results;