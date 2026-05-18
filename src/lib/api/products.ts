/**
 * Product API Client Functions
 */

import { apiClient } from "./client";
import { ApiResponse, SearchParams } from "@/src/types/api.types";
import { Product, ProductCategory } from "@/src/types";

/**
 * Fetch all products
 */
export async function fetchProducts(): Promise<ApiResponse<Product[]>> {
  return apiClient.get<ApiResponse<Product[]>>("/products");
}

/**
 * Fetch product by ID
 */
export async function fetchProductById(id: string): Promise<ApiResponse<Product>> {
  return apiClient.get<ApiResponse<Product>>(`/products/${id}`);
}

/**
 * Fetch product by slug
 */
export async function fetchProductBySlug(slug: string): Promise<ApiResponse<Product>> {
  return apiClient.get<ApiResponse<Product>>(`/products/slug/${slug}`);
}

/**
 * Fetch products by category
 * @param category - Product category
 * @param options - Pagination options (limit, page)
 */
export async function fetchProductsByCategory(
  category: ProductCategory,
  options?: { limit?: number; page?: number }
): Promise<ApiResponse<Product[]>> {
  const params: Record<string, string> = {};
  
  if (options?.limit) {
    params.limit = options.limit.toString();
  }
  if (options?.page) {
    params.page = options.page.toString();
  }

  return apiClient.get<ApiResponse<Product[]>>(
    `/products/category/${category}`,
    Object.keys(params).length > 0 ? params : undefined
  );
}

/**
 * Search products
 */
export async function searchProducts(
  params: SearchParams
): Promise<ApiResponse<Product[]>> {
  return apiClient.get<ApiResponse<Product[]>>("/search", params);
}
