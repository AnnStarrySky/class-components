import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { fetchPokemons } from "../../api/pokemonApi";
import { usePokemonStore } from "../../store/usePokemonStore";
import { ITEMS_PER_PAGE } from "../../constants/paginationNumber";

const Results = ({ searchQuery }: { searchQuery: string }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedPokemons = usePokemonStore(
    (state) => state.selectedPokemons
  );

  const togglePokemon = usePokemonStore(
    (state) => state.togglePokemon
  );

  const page = parseInt(searchParams.get("page") || "1");

  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemons", page],
    queryFn: () =>
      fetchPokemons(
        (page - 1) * ITEMS_PER_PAGE,
        ITEMS_PER_PAGE
      ),
  });

  if (isLoading) return <p className="mt-4">Loading...</p>;
  if (error) return <p className="text-red-500">Failed to load pokemons</p>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {data?.results?.map((p) => (
          <Link
            key={p.name}
            to={`/details/${p.name}`}
            replace
            className="p-4 border rounded bg-white shadow-sm block dark:bg-gray-700 dark:text-white"
          >
            <input
              type="checkbox"
              checked={selectedPokemons.includes(p.name)}
              onChange={() => togglePokemon(p.name)}
              onClick={(e) => e.stopPropagation()}
            />

            <h3 className="font-bold capitalize">{p.name}</h3>

            <p className="text-xs text-gray-400">{p.url}</p>
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