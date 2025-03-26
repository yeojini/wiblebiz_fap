'use client';

import { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSearchContext } from '@/hooks/useSearchContext';
import Tab from '@/components/common/Tab';

export default function CategoryTab({ children }: { children: ReactNode }) {
  const { setQuery } = useSearchContext();
  const { reset } = useFormContext();

  const handleTabChange = () => {
    setQuery('');
    reset();
  };

  return (
    <Tab defaultTab="CONSULT" onChange={handleTabChange}>
      {children}
    </Tab>
  );
}
