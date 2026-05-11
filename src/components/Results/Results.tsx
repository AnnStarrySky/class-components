import React from 'react';
import { fetchPokemons, fetchOnePokemon } from '../../api/pokemonApi';

type Pokemon = {
  name: string;
  url?: string;
  id?: number;
  stats?: {
    base_stat: number;
    stat: { name: string };
  }[];
};

type State = {
  items: Pokemon[];
  loading: boolean;
  error: string | null;
};

type Props = {
  searchQuery: string;
};

class Results extends React.Component<Props, State> {
  state: State = {
    items: [],
    loading: false,
    error: null,
  };

  loadData = async () => {
    const { searchQuery } = this.props;
    this.setState({ loading: true, error: null });

    try {
      if (searchQuery) {
        const data = await fetchOnePokemon(searchQuery);
        this.setState({ items: [data], loading: false });
      } else {
        const data = await fetchPokemons();
        this.setState({ items: data.results || [], loading: false });
      }
    } catch {
      this.setState({
        items: [],
        error: searchQuery ? 'Pokemon not found' : 'Failed to load data',
        loading: false,
      });
    }
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.loadData();
    }
  }

  render() {
    const { items, loading, error } = this.state;
    const { searchQuery } = this.props;

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
      <div>
        <h2 className="text-xl font-bold mb-4 mt-4">
          {searchQuery ? `Results for: ${searchQuery}` : 'Results'}
        </h2>
        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((pokemon) => (
              <div key={pokemon.name} className="p-4 border rounded shadow-sm bg-white">
                <h3 className="font-bold capitalize text-lg">{pokemon.name}</h3>
                
                {pokemon.stats ? (
                  <div className="mt-2">
                    <p className="text-xs font-semibold text-gray-400 uppercase">Stats:</p>
                    <div className="grid grid-cols-2 gap-1 mt-1">
                      {pokemon.stats.map((s) => (
                        <div key={s.stat.name} className="text-sm">
                          <span className="text-gray-500 capitalize">{s.stat.name}: </span>
                          <span className="font-medium">{s.base_stat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 mt-2">{pokemon.url}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No results found</p>
        )}
      </div>
    );
  }
}

export default Results;