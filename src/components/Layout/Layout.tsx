import { useState } from 'react';
import { useSearchParams } from "react-router-dom";
import Search from '../Search/Search';
import Results from '../Results/Results';
import ErrorSimulator from '../ErrorBoundary/ErrorSimulator';

const Layout = () => {
  const [searchQuery, setSearchQuery] = useState(() => localStorage.getItem('searchQuery') || '');
  const [, setSearchParams] = useSearchParams();

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setSearchParams({ page: "1" });
  };

  return (
    <div className="max-w-[1400px] mx-auto p-4 min-h-screen flex flex-col">
      <header className="bg-gray-100 p-4 mb-4">
        <Search onSearch={handleSearch} />
      </header>
      <main className="flex-1">
        <ErrorSimulator />
        <Results searchQuery={searchQuery} />
      </main>
    </div>
  );
};

export default Layout;