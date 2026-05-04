import React, { type ChangeEvent } from 'react';

type SearchQuery = {
  searchValue: string
}

type Props = Record<string, never>;

class Search extends React.Component<Props, SearchQuery> {
  state: SearchQuery = {
    searchValue: localStorage.getItem('searchQuery') || '',
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({searchValue: e.target.value});
  };

    onSearchClick = () => {
    const trimmedValue = this.state.searchValue.trim();

    if (trimmedValue){
      localStorage.setItem('searchQuery', trimmedValue)
    }
  };
  render() {
    const { searchValue } = this.state;
    return (
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 flex-1"
          value={searchValue}
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