'use client'

import Search from '../Search/Search';
import Results from '../Results/Results';
import ErrorSimulator from '../ErrorBoundary/ErrorSimulator';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { usePokemonStore } from "../../store/usePokemonStore";
import ThemeToggler from "../ThemeToggler/ThemeToggler";
import { useQueryClient } from "@tanstack/react-query";

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

const Layout = () => {
  const [searchQuery, setSearchQuery] = useLocalStorage('searchQuery', '');
  const router = useRouter()
  const queryClient = useQueryClient();

  const handleSearch = (value: string) => {
  setSearchQuery(value);
  router.push('/?page=1');
  };

  const pathname = usePathname();
  const isDetailsPage =
  pathname.startsWith('/details/');

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

  const handleRefresh = () => {
    queryClient.invalidateQueries();
  };

  return (
    <div className="max-w-[1400px] mx-auto p-4 min-h-screen flex flex-col dark:bg-gray-900 dark:text-white">
      <header className="bg-gray-100 p-4 mb-4 dark:bg-gray-700 dark:text-white">
        <Search onSearch={handleSearch}/>
        <ThemeToggler />
        <button
          onClick={handleRefresh}
          className="bg-green-500 text-white px-3 py-1 ml-4"
        >
          Refresh
        </button>
      </header>
      <Link href="/about" className="bg-blue-500 text-white px-2 py-2 w-fit">
          About
      </Link>
      <main className="flex-1 flex gap-4">
        <div className={isDetailsPage ? "w-1/2" : "w-full"}>
          <ErrorSimulator />
          <Results searchQuery={searchQuery} />
        </div>
        {isDetailsPage && (
          <div className="w-1/2 border-l pl-4">
            Details page
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