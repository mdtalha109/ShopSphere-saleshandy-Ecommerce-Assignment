export interface PriceRange {
  min: number;
  max: number;
}

export interface ProductFilters {
  categories?: string[];
  brands?: string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStock?: boolean;
  sortBy?: SortOption;
}

export enum SortOption {
  RELEVANCE = 'relevance',
  PRICE_LOW_HIGH = 'price-asc',
  PRICE_HIGH_LOW = 'price-desc',
  RATING = 'rating',
  NEWEST = 'newest',
}

export interface FilterCounts {
  brands: Record<string, number>;
  totalProducts: number;
  inStockCount: number;
  priceRange: PriceRange;
}
