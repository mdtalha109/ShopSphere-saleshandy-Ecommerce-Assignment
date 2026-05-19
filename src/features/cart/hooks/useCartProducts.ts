'use client';

import { useQueries } from '@tanstack/react-query';
import { productKeys } from '@/src/hooks/api/useProducts';
import { fetchProductById } from '@/src/lib/api/products';
import type { Product } from '@/src/types';
import type { CartItem } from '@/src/types/cart';

interface UseCartProductsResult {
  productsById: Map<string, Product>;
  products: (Product | undefined)[];
  isLoading: boolean;
  hasError: boolean;
  errorIds: string[];
}

export function useCartProducts(cartItems: CartItem[]): UseCartProductsResult {
  const productIds = cartItems.map((item) => item.productId);

  const queries = useQueries({
    queries: productIds.map((productId) => ({
      queryKey: productKeys.detail(productId),
      queryFn: async () => {
        const response = await fetchProductById(productId);
        return response.data;
      },
      retry: 1,
    })),
  });

  const productsById = new Map<string, Product>();
  const products: (Product | undefined)[] = [];
  const errorIds: string[] = [];
  let isLoading = false;
  let hasError = false;

  queries.forEach((query, index) => {
    if (query.isLoading) {
      isLoading = true;
    }

    if (query.isError) {
      hasError = true;
      errorIds.push(productIds[index]);
    }

    if (query.data) {
      productsById.set(productIds[index], query.data);
      products.push(query.data);
    } else {
      products.push(undefined);
    }
  });

  return {
    productsById,
    products,
    isLoading,
    hasError,
    errorIds,
  };
}
