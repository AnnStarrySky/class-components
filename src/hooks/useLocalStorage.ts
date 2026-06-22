import { useState } from 'react';

export function useLocalStorage(key: string, initialValue: string) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key) || initialValue;
    }
    return initialValue;
  });

  const setValue = (value: string) => {
    const trimmed = value.trim();
    setStoredValue(trimmed);
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, trimmed);
    }
  };

  return [storedValue, setValue] as const;
}