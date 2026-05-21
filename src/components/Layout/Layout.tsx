import { useSearchParams } from "react-router-dom";
import Search from '../Search/Search';
import Results from '../Results/Results';
import ErrorSimulator from '../ErrorBoundary/ErrorSimulator';
import { Outlet, useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { usePokemonStore } from "../../store/usePokemonStore";

const Layout = () => {
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');
  const [, setSearchParams] = useSearchParams();

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setSearchParams({ page: "1" });
  };

  const location = useLocation();
  const isDetailsPage = location.pathname.startsWith('/details/');

  const selectedPokemons = usePokemonStore(
    (state) => state.selectedPokemons
  );

  const clearSelected = usePokemonStore(
    (state) => state.clearSelected
  );

  return (
    <div className="max-w-[1400px] mx-auto p-4 min-h-screen flex flex-col">
      <header className="bg-gray-100 p-4 mb-4">
        <Search onSearch={handleSearch} />
      </header>
      <Link to="/about" className="text-blue-600 underline">
          About
      </Link>
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
      {selectedPokemons.length > 0 && (
      <div className="w-full border-t p-4 flex justify-center gap-8 items-center">
        
        <p>
          Selected: {selectedPokemons.length}
        </p>

        <button
          onClick={clearSelected}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          Unselect all
        </button>

      </div>
      )}
    </div>
  );
};

export default Layout;