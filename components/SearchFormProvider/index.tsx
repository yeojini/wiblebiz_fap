'use client';

import { createContext, useState, ReactNode } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { searchSchema, type SearchFormData } from '@/schemas/searchSchema';

export const SearchContext = createContext<{
  query: string;
  setQuery: (query: string) => void;
  searchResult: number;
  setSearchResult: (searchResult: number) => void;
} | null>(null);

function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState<number>(0);

  return (
    <SearchContext.Provider
      value={{ query, setQuery, searchResult, setSearchResult }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export default function SearchFormProvider({
  children,
}: {
  children: ReactNode;
}) {
  const methods = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: '',
    },
    mode: 'onSubmit',
  });
  return (
    <FormProvider {...methods}>
      <SearchProvider>{children}</SearchProvider>
    </FormProvider>
  );
}
