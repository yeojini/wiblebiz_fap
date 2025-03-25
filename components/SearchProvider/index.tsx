'use client';
import { createContext, useState, ReactNode } from 'react';

export const SearchContext = createContext<{
  query: string;
  setQuery: (query: string) => void;
} | null>(null);

export default function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('');

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
}
