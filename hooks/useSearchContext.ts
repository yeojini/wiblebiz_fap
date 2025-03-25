'use client';

import { useContext } from 'react';
import { SearchContext } from '@/components/SearchProvider';

export function useSearchContext() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
}

export default useSearchContext;
