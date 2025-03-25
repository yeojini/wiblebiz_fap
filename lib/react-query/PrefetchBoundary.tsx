import { type ReactNode } from 'react';
import {
  dehydrate,
  FetchQueryOptions,
  HydrationBoundary,
} from '@tanstack/react-query';
import getQueryClient from './getQueryClient';

interface PrefetchBoundaryProps {
  fetchQueryOptions: FetchQueryOptions[] | FetchQueryOptions;
  children: ReactNode;
}

export default function PrefetchBoundary({
  fetchQueryOptions,
  children,
}: PrefetchBoundaryProps) {
  const queryClient = getQueryClient();

  if (Array.isArray(fetchQueryOptions)) {
    void Promise.all(
      fetchQueryOptions.map((prefetchOption) =>
        queryClient.prefetchQuery(prefetchOption),
      ),
    );
  } else {
    void queryClient.prefetchQuery(fetchQueryOptions);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
