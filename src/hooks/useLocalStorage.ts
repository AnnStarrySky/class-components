import { useState } from 'react';

export function useLocalStorage(key: string, initialValue: string) {
  const [storedValue, setStoredValue] = useState(() => {
    return localStorage.getItem(key) || initialValue;
  });

  const setValue = (value: string) => {
    const trimmed = value.trim();
    setStoredValue(trimmed);
    localStorage.setItem(key, trimmed);
  };

  return [storedValue, setValue] as const;
}