import React from 'react';
import { fetchPokemons } from '../../api/pokemonApi';

type Pokemon = {
  name: string;
  url: string;
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
    loading: true,
    error: null,
  };

  async componentDidMount() {
    try {
      const data = await fetchPokemons();
      this.setState({ items: data.results || [], loading: false });
    } catch {
      this.setState({
        error: 'Failed to load data',
        loading: false,
      });
    }
  }

  render() {
    const { items, loading, error } = this.state;
    const { searchQuery } = this.props;

    if (error) return <p className="text-red-500">{error}</p>;
    if (loading) return <p>Loading...</p>;

    const filteredItems = items.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div>
        <h2 className="text-xl font-bold mb-4 mt-4">
          {searchQuery ? `Results for: ${searchQuery}` : 'Results'}
        </h2>
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((pokemon) => (
              <div key={pokemon.name} className="p-4 border rounded shadow-sm">
                <h3 className="font-bold capitalize">{pokemon.name}</h3>
                <p className="text-sm text-gray-500">{pokemon.url}</p>
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