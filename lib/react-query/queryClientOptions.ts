import { Query, defaultShouldDehydrateQuery } from '@tanstack/react-query';

const queryClientOptions = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
    dehydrate: {
      shouldDehydrateQuery: (query: Query) =>
        defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
    },
  },
};

export default queryClientOptions;
