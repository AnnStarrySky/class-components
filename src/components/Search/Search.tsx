import React, { useState } from 'react';

type Props = {
  onSearch: (value: string) => void;
};

const Search = ({ onSearch }: Props) => {
  const [searchQuery, setSearchQuery] = useState(() => 
    localStorage.getItem('searchQuery') || ''
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const onSearchClick = () => {
    const trimmedValue = searchQuery.trim();
    onSearch(trimmedValue);
    localStorage.setItem('searchQuery', trimmedValue);
  };

  return (
    <div className="flex gap-2">
      <input
        type="search"
        placeholder="Search..."
        className="border p-2 flex-1"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4"
        onClick={onSearchClick}
      >
        Search
      </button>
    </div>
  );
};

export default Search;