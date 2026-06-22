import {createContext} from "react";

export type Theme = 'light' | 'dark';

type ThemContextType = {
    theme: Theme;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemContextType | null>(null);