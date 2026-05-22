import { useSearchParams } from "react-router-dom";
import Search from '../Search/Search';
import Results from '../Results/Results';
import ErrorSimulator from '../ErrorBoundary/ErrorSimulator';
import { Outlet, useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { usePokemonStore } from "../../store/usePokemonStore";
import { useTheme } from "../../context/useTheme";

const Layout = () => {
  const { theme, toggleTheme } = useTheme();

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

  const handleDownload = () => {
    const csvContent = [
      "Name,Details URL",
      ...selectedPokemons.map(
        (pokemon) =>
          `${pokemon}, /details/${pokemon}`
      ),
    ].join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv",
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download =
      `${selectedPokemons.length}_items.csv`;

    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-[1400px] mx-auto p-4 min-h-screen flex flex-col dark:bg-gray-900 dark:text-white">
      <header className="bg-gray-100 p-4 mb-4 dark:bg-gray-700 dark:text-white">
        <Search onSearch={handleSearch}/>
        <button
          onClick={toggleTheme}
          className="px-3 py-1 border mt-2"
        >
          {theme === "light"
            ? "Dark"
            : "Light"}
        </button>
      </header>
      <Link to="/about" className="bg-blue-500 text-white px-2 py-2 w-fit">
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

        <button
          onClick={handleDownload}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Download
        </button>
      </div>
      )}
    </div>
  );
};

export default Layout;