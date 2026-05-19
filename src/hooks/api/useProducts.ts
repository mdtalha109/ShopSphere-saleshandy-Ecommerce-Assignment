
import { useQuery } from "@tanstack/react-query";
import {
  fetchProducts,
  fetchProductBySlug,
  fetchProductsByCategory,
} from "@/src/lib/api";
import { ProductCategory } from "@/src/types";

export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: () => [...productKeys.lists()] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (slug: string) => [...productKeys.details(), slug] as const,
  categories: () => [...productKeys.all, "category"] as const,
  category: (category: ProductCategory, limit?: number, page?: number) => {
    const key: any[] = [...productKeys.categories(), category];
    if (limit !== undefined) key.push(limit);
    if (page !== undefined) key.push(page);
    return key;
  },
};

export function useProducts() {
  return useQuery({
    queryKey: productKeys.list(),
    queryFn: async () => {
      const response = await fetchProducts();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useProductBySlug(slug: string) {
  return useQuery({
    queryKey: productKeys.detail(slug),
    queryFn: async () => {
      const response = await fetchProductBySlug(slug);
      return response.data;
    },
  });
}

export function useProductsByCategory(
  category: ProductCategory,
  options?: { limit?: number; page?: number }
) {
  return useQuery({
    queryKey: productKeys.category(category, options?.limit, options?.page),
    queryFn: async () => {
      const response = await fetchProductsByCategory(category, options);
      return response.data;
    },
  });
}

