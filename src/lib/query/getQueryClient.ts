import { QueryClient } from "@tanstack/react-query";

/**
 * Create a new QueryClient for server-side rendering
 * Each request gets a fresh instance
 */
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Server-side: no need for long stale times
        staleTime: 60 * 1000, // 1 minute
        gcTime: 10 * 60 * 1000, // 10 minutes
        retry: 0, // No retries on server
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
  });
}
