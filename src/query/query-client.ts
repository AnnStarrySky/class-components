import { QueryClient } from "@tanstack/react-query";

const CACHE_TTL = Number(process.env.NEXT_PUBLIC_QUERY_CACHE_TTL);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: CACHE_TTL,
    },
  },
});