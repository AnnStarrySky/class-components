import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchOnePokemon } from "../../api/pokemonApi";

const Details = () => {
  const { id } = useParams();

  const {data: pokemon, isLoading, isError} = useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => fetchOnePokemon(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="p-4">
        <p>Loading details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4">
        <p className="text-red-500">
          Failed to load pokemon
        </p>
      </div>
    );
  }

  if (!pokemon) {
    return null;
  }
  
  return (
    <div className="p-4">
      <Link
        to="/"
        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm dark:bg-gray-700 dark:text-white"
      >
        ✕ Close
      </Link>

      <h2 className="text-3xl font-bold capitalize mb-4 mt-4">
        {pokemon.name}
      </h2>

      <div className="space-y-2">
        {pokemon.stats?.map((s) => (
          <div
            key={s.stat.name}
            className="border rounded p-2"
          >
            <span className="font-semibold capitalize">
              {s.stat.name}
            </span>
            : {s.base_stat}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;