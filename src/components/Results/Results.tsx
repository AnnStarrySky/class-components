import { useState, useEffect } from 'react';
import { fetchPokemons, fetchOnePokemon } from '../../api/pokemonApi';
import type { Pokemon } from '../../api/pokemonApi';
import { useSearchParams } from "react-router-dom";

const ITEMS_PER_PAGE = 10;

const Results = ({ searchQuery }: { searchQuery: string }) => {
  const [items, setItems] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const page = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        if (searchQuery) {
          const data = await fetchOnePokemon(searchQuery);
          setItems([data]);
        } else {
          const data = await fetchPokemons((page - 1) * ITEMS_PER_PAGE, ITEMS_PER_PAGE);
          setItems(data.results);
        }
      } catch {
        setItems([]);
        setError("Nothing found");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [searchQuery, page]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {items.map((p) => (
          <div key={p.name} className="p-4 border rounded bg-white shadow-sm">
            <h3 className="font-bold capitalize">{p.name}</h3>
            {p.stats ? (
              <div className="text-sm grid grid-cols-2 mt-2">
                {p.stats.map(s => <div key={s.stat.name}>{s.stat.name}: {s.base_stat}</div>)}
              </div>
            ) : <p className="text-xs text-gray-400">{p.url}</p>}
          </div>
        ))}
      </div>

      {!searchQuery && (
        <div className="flex gap-4 mt-6 items-center">
          <button onClick={() => setSearchParams({ page: String(page - 1) })} disabled={page === 1}>Prev</button>
          <span>Page {page}</span>
          <button onClick={() => setSearchParams({ page: String(page + 1) })}>Next</button>
        </div>
      )}
    </div>
  );
};

export default Results;