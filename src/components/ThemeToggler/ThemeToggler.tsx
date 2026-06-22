import { useTheme } from "../../context/useTheme";

const ThemeToggler = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1 border mt-2"
    >
      {theme === "light"
        ? "Dark"
        : "Light"}
    </button>
  );
};

export default ThemeToggler;