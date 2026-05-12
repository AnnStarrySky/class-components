import { useState } from 'react';
import Search from '../Search/Search';
import Results from '../Results/Results';
import ErrorSimulator from '../ErrorBoundary/ErrorSimulator';

const Layout = () => {
  const [searchQuery, setSearchQuery] = useState(() => localStorage.getItem('searchQuery') || '');

  const handleSearch = (value: string) => {
    if (value !== searchQuery) {
      setSearchQuery(value);
    }
  };

  return (
    <div className="max-w-[1400px] min-h-screen flex flex-col mx-auto">
      <header className="p-4 bg-gray-100">
        <Search onSearch={handleSearch} />
      </header>
      <main className="flex-1 p-4">
        <ErrorSimulator />
        <Results searchQuery={searchQuery} />
      </main>
    </div>
  );
};

export default Layout;