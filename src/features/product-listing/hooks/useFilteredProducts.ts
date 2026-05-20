'use client';

import { useMemo } from 'react';
import type { Product } from '@/src/types';
import { ProductFilters, SortOption, FilterCounts } from '../types';
import { applyFilters } from '../services/productFiltering';
import { applySorting } from '../services/productSorting';
import { calculateFilterCounts } from '../services/filterCounting';

export function useFilteredProducts(products: Product[], filters: ProductFilters) {
  const filteredProducts = useMemo(() => {
    const filtered = applyFilters(products, filters);
    return applySorting(filtered, filters.sortBy || SortOption.RELEVANCE);
  }, [products, filters]);

  const filterCounts = useMemo(
    (): FilterCounts => calculateFilterCounts(products),
    [products]
  );

  return {
    filteredProducts,
    filterCounts,
    totalCount: filteredProducts.length,
  };
}
