import React from 'react';

class Search extends React.Component {
  render() {
    return (
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 flex-1"
        />
        <button className="bg-blue-500 text-white px-4">
          Search
        </button>
      </div>
    );
  }
}

export default Search;