import { type ReactNode } from 'react';
import {
  dehydrate,
  FetchInfiniteQueryOptions,
  FetchQueryOptions,
  HydrationBoundary,
} from '@tanstack/react-query';
import getQueryClient from './getQueryClient';

type FetchOptions =
  | {
      type: 'infinite';
      options: FetchInfiniteQueryOptions;
    }
  | {
      type: 'query';
      options: FetchQueryOptions;
    };

interface PrefetchBoundaryProps {
  fetchQueryOptions: FetchOptions | FetchOptions[];
  children: ReactNode;
}

export default function PrefetchBoundary({
  fetchQueryOptions,
  children,
}: PrefetchBoundaryProps) {
  const queryClient = getQueryClient();

  if (Array.isArray(fetchQueryOptions)) {
    void Promise.all(
      fetchQueryOptions.map((prefetchOption) => {
        if (prefetchOption.type === 'infinite') {
          return queryClient.prefetchInfiniteQuery(prefetchOption.options);
        } else {
          return queryClient.prefetchQuery(prefetchOption.options);
        }
      }),
    );
  } else {
    if (fetchQueryOptions.type === 'infinite') {
      queryClient.prefetchInfiniteQuery(fetchQueryOptions.options);
    } else {
      queryClient.prefetchQuery(fetchQueryOptions.options);
    }
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
