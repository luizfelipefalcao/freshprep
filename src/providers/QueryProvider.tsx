import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0.5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
});

//Leave this shere for reference

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       // Data is considered fresh for 5 minutes
//       staleTime: 5 * 60 * 1000, // 5 minutes
//       // Data stays in cache for 10 minutes after last use
//       gcTime: 10 * 60 * 1000, // 10 minutes (was cacheTime in v4)
//       // Retry failed requests 3 times with exponential backoff
//       retry: (failureCount, error) => {
//         if (error?.status === 404) return false; // Don't retry 404s
//         return failureCount < 3;
//       },
//       retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
//       // Refetch on window focus for fresh data
//       refetchOnWindowFocus: true,
//       // Refetch on reconnect
//       refetchOnReconnect: true,
//       // Don't refetch on mount if data is fresh
//       refetchOnMount: 'always', // or 'stale' for more conservative approach
//     },
//     mutations: {
//       // Retry mutations once
//       retry: 1,
//     },
//   },
// });

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
