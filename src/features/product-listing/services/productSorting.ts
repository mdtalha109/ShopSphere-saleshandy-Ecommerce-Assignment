
import type { Product } from '@/src/types';
import { SortOption } from '../types';

export function sortByPriceLowToHigh(products: Product[]): Product[] {
  return [...products].sort((a, b) => (a?.price?.current ?? 0) - (b?.price?.current ?? 0));
}

export function sortByPriceHighToLow(products: Product[]): Product[] {
  return [...products].sort((a, b) => (b?.price?.current ?? 0) - (a?.price?.current ?? 0));
}

export function sortByRating(products: Product[]): Product[] {
  return [...products].sort((a, b) => (b?.rating?.average ?? 0) - (a?.rating?.average ?? 0));
}

export function sortByNewest(products: Product[]): Product[] {
  return [...products].sort(
    (a, b) => (new Date(b?.createdAt ?? 0).getTime()) - (new Date(a?.createdAt ?? 0).getTime())
  );
}

export function applySorting(products: Product[], sortBy: SortOption): Product[] {
  switch (sortBy) {
    case SortOption.PRICE_LOW_HIGH:
      return sortByPriceLowToHigh(products);
    case SortOption.PRICE_HIGH_LOW:
      return sortByPriceHighToLow(products);
    case SortOption.RATING:
      return sortByRating(products);
    case SortOption.NEWEST:
      return sortByNewest(products);
    case SortOption.RELEVANCE:
    default:
      return [...products];
  }
}
