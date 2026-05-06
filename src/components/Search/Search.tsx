import React from 'react';

type Props = {
  onSearch: (value: string) => void;
};

type State = {
  searchQuery: string;
};

class Search extends React.Component<Props, State> {
  state: State = {
    searchQuery: localStorage.getItem('searchQuery') || '',
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: e.target.value });
  };

  onSearchClick = () => {
    const trimmedValue = this.state.searchQuery.trim();

    this.props.onSearch(trimmedValue);

    localStorage.setItem('searchQuery', trimmedValue);
  };

  render() {
    return (
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 flex-1"
          value={this.state.searchQuery}
          onChange={this.handleInputChange}
        />
        <button
          className="bg-blue-500 text-white px-4"
          onClick={this.onSearchClick}
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;