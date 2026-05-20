'use client';

import { useCallback, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ProductFilters } from '../types';
import { parseFiltersFromSearchParams, serializeFiltersToSearchParams } from '../utils/urlFilters';
import { hasActiveFilters as checkActiveFilters } from '../services/productFiltering';


export function useFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo(
    (): ProductFilters => parseFiltersFromSearchParams(searchParams),
    [searchParams]
  );

  const updateFilters = useCallback(
    (newFilters: Partial<ProductFilters>) => {
      const params = serializeFiltersToSearchParams(searchParams, newFilters);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const clearFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [pathname, router]);

  const hasActiveFilters = useMemo(
    () => checkActiveFilters(filters),
    [filters]
  );

  return {
    filters,
    updateFilters,
    clearFilters,
    hasActiveFilters,
  };
}
