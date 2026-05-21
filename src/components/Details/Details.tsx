import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchOnePokemon } from "../../api/pokemonApi";
import type { Pokemon } from "../../api/pokemonApi";
import { Link } from "react-router-dom";

const Details = () => {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadPokemon = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchOnePokemon(id);
        setPokemon(data);
      } catch {
        setError("Failed to load pokemon");
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, [id]);

  if (loading) {
    return (
      <div className="p-4">
        <p>Loading details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-500">{error}</p>
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
        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
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