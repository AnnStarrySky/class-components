import React from 'react';

type Props = {
  onSearch: (value: string) => void;
  initialValue: string;
};

class Search extends React.Component<Props> {
  state = {
    searchQuery: this.props.initialValue,
  };

  onSearchClick = () => {
    this.props.onSearch(this.state.searchQuery.trim());
  };

  render() {
    return (
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 flex-1"
          value={this.state.searchQuery}
          onChange={(e) => this.setState({ searchQuery: e.target.value })}
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