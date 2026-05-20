import type { Product } from '@/src/types';
import { ProductFilters } from '../types';

export function filterByBrands(products: Product[], brands: string[]): Product[] {
  if (!brands || brands.length === 0) {
    return products;
  }
  return products.filter((product) => brands.includes(product.brand.slug));
}

export function filterByMinPrice(products: Product[], minPrice: number): Product[] {
  return products.filter((product) => product.price.current >= minPrice);
}

export function filterByMaxPrice(products: Product[], maxPrice: number): Product[] {
  return products.filter((product) => product.price.current <= maxPrice);
}

export function filterByPriceRange(
  products: Product[],
  minPrice?: number,
  maxPrice?: number
): Product[] {
  let result = products;
  if (minPrice !== undefined) {
    result = filterByMinPrice(result, minPrice);
  }
  if (maxPrice !== undefined) {
    result = filterByMaxPrice(result, maxPrice);
  }
  return result;
}

export function filterByMinRating(products: Product[], minRating: number): Product[] {
  return products.filter((product) => product.rating.average >= minRating);
}

export function filterByInStock(products: Product[], inStock: boolean): Product[] {
  if (!inStock) {
    return products;
  }
  return products.filter((product) => product.stock.inStock);
}

export function applyFilters(products: Product[], filters: ProductFilters): Product[] {
  let result = products;

  if (filters.brands && filters.brands.length > 0) {
    result = filterByBrands(result, filters.brands);
  }

  result = filterByPriceRange(result, filters.minPrice, filters.maxPrice);

  if (filters.minRating !== undefined) {
    result = filterByMinRating(result, filters.minRating);
  }

  if (filters.inStock === true) {
    result = filterByInStock(result, true);
  }

  return result;
}

export function hasActiveFilters(filters: ProductFilters): boolean {
  return (
    (filters.brands !== undefined && filters.brands.length > 0) ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined ||
    filters.minRating !== undefined ||
    filters.inStock !== undefined
  );
}
