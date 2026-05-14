import { useLocalStorage } from '../../hooks/useLocalStorage';

const Search = ({ onSearch }: { onSearch: (v: string) => void }) => {
  const [value, setValue] = useLocalStorage('searchQuery', '');

  const handleAction = () => {
    const trimmed = value.trim();
    onSearch(trimmed);
    localStorage.setItem('searchQuery', trimmed);
  };

  return (
    <div className="flex gap-2">
      <input
        type="search"
        className="border p-2 flex-1"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={handleAction} className="bg-blue-500 text-white px-4">Search</button>
    </div>
  );
};

export default Search;