import { fetchOnePokemon } from "../../../api/pokemonApi";

type Props = {
  params: {
    id: string;
  };
};

const Details = async ({ params }: Props) => {
  const { id } = await params

  let pokemon = null;
  let isError = false;

  try {
    pokemon = await fetchOnePokemon(id);
  } catch {
    isError = true;
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
    <div>
      <h2 className="text-3xl font-bold capitalize mb-4 mt-4">
        {pokemon.name}
      </h2>

      <div className="space-y-2">
        {pokemon.stats?.map((s) => (
          <div key={s.stat.name} className="border rounded p-2">
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