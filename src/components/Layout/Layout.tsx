import { useState } from 'react';
import { useSearchParams } from "react-router-dom";
import Search from '../Search/Search';
import Results from '../Results/Results';
import ErrorSimulator from '../ErrorBoundary/ErrorSimulator';
import { Outlet, useMatch } from "react-router-dom";

const Layout = () => {
  const [searchQuery, setSearchQuery] = useState(() => localStorage.getItem('searchQuery') || '');
  const [, setSearchParams] = useSearchParams();

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setSearchParams({ page: "1" });
  };

  const isDetailsPage = useMatch("/details/:id");

  return (
    <div className="max-w-[1400px] mx-auto p-4 min-h-screen flex flex-col">
      <header className="bg-gray-100 p-4 mb-4">
        <Search onSearch={handleSearch} />
      </header>
      <main className="flex-1 flex gap-4">
        <div className={isDetailsPage ? "w-1/2" : "w-full"}>
          <ErrorSimulator />
          <Results searchQuery={searchQuery} />
        </div>
        {isDetailsPage && (
          <div className="w-1/2 border-l pl-4">
            <Outlet />
          </div>
        )}
      </main>
    </div>
  );
};

export default Layout;