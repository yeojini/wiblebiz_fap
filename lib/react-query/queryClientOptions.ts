import { Query, defaultShouldDehydrateQuery } from '@tanstack/react-query';

const queryClientOptions = {
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      gcTime: Infinity,
    },
    throwOnError: true,
    dehydrate: {
      shouldDehydrateQuery: (query: Query) =>
        defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
    },
  },
};

export default queryClientOptions;
