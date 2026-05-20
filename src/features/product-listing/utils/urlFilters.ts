
import { ProductFilters, SortOption } from '../types';

/**
 * Parse filters from URL search parameters
 */
export function parseFiltersFromSearchParams(searchParams: URLSearchParams): ProductFilters {
  const brands = searchParams.get('brands')?.split(',').filter(Boolean);
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const minRating = searchParams.get('minRating');
  const inStock = searchParams.get('inStock');
  const sortBy = searchParams.get('sortBy') as SortOption;

  return {
    brands: brands && brands.length > 0 ? brands : undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    minRating: minRating ? Number(minRating) : undefined,
    inStock: inStock === 'true' ? true : undefined,
    sortBy: sortBy || SortOption.RELEVANCE,
  };
}

/**
 * Serialize filters to URL search parameters
 */
export function serializeFiltersToSearchParams(
  currentParams: URLSearchParams,
  filters: Partial<ProductFilters>
): URLSearchParams {
  const params = new URLSearchParams(currentParams.toString());

  Object.entries(filters).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      params.delete(key);
    } else if (Array.isArray(value)) {
      if (value.length > 0) {
        params.set(key, value.join(','));
      } else {
        params.delete(key);
      }
    } else {
      params.set(key, String(value));
    }
  });

  return params;
}

export function validatePriceRange(
  minPrice?: number,
  maxPrice?: number
): { isValid: boolean; error?: string } {
  if (minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice) {
    return { isValid: false, error: 'Minimum price cannot be greater than maximum price' };
  }

  if (minPrice !== undefined && minPrice < 0) {
    return { isValid: false, error: 'Minimum price cannot be negative' };
  }

  if (maxPrice !== undefined && maxPrice < 0) {
    return { isValid: false, error: 'Maximum price cannot be negative' };
  }

  return { isValid: true };
}

export function validateRating(rating?: number): { isValid: boolean; error?: string } {
  if (rating === undefined) {
    return { isValid: true };
  }

  if (rating < 0 || rating > 5) {
    return { isValid: false, error: 'Rating must be between 0 and 5' };
  }

  return { isValid: true };
}