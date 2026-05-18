
import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "@/src/lib/api";
import { SearchParams } from "@/src/types/api.types";

export const searchKeys = {
  all: ["search"] as const,
  searches: () => [...searchKeys.all] as const,
  search: (params: SearchParams) => [...searchKeys.searches(), params] as const,
};

export function useSearchProducts(
  params: SearchParams,
  options?: {
    enabled?: boolean;
    staleTime?: number;
  }
) {
  return useQuery({
    queryKey: searchKeys.search(params),
    queryFn: async () => {
      const response = await searchProducts(params);
      return response.data;
    },
    staleTime: options?.staleTime ?? 2 * 60 * 1000, // 2 minutes default
    enabled: options?.enabled ?? !!(params.q || params.category), // Only search if there's a query or category
  });
}
