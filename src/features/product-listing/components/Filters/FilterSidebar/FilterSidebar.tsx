'use client';

import type { Product } from '@/src/types';
import { useFilters, useFilteredProducts } from '../../../hooks';
import { getUniqueBrands } from '../../../services/filterCounting';
import styles from './FilterSidebar.module.css';
import StockFilter from '../StockFilter/StockFilter';
import RatingFilter from '../RatingFilter/RatingFilter';
import PriceFilter from '../PriceFilter/PriceFilter';
import BrandFilter from '../BrandFilter/BrandFilter';

interface FilterSidebarProps {
  products: Product[];
}

const FilterSidebar = ({ products }: FilterSidebarProps) => {
  const { filters, updateFilters, clearFilters, hasActiveFilters } = useFilters();
  const { filterCounts } = useFilteredProducts(products, filters);

  const brands = getUniqueBrands(products);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <h2 className={styles.title}>Filters</h2>
        {hasActiveFilters && (
          <button onClick={clearFilters} className={styles.clearAll}>
            Clear All
          </button>
        )}
      </div>

      <div className={styles.filters}>
        <PriceFilter
          min={filterCounts.priceRange.min}
          max={filterCounts.priceRange.max}
          currentMin={filters.minPrice}
          currentMax={filters.maxPrice}
          onChange={(min, max) =>
            updateFilters({ minPrice: min, maxPrice: max })
          }
        />

        <BrandFilter
          brands={brands}
          selectedBrands={filters.brands || []}
          onChange={(brands) => updateFilters({ brands })}
        />

        <RatingFilter
          selectedRating={filters.minRating}
          onChange={(rating) => updateFilters({ minRating: rating })}
        />

        <StockFilter
          inStockCount={filterCounts.inStockCount}
          totalCount={filterCounts.totalProducts}
          isChecked={filters.inStock === true}
          onChange={(inStock) => updateFilters({ inStock: inStock || undefined })}
        />
      </div>
    </aside>
  );
}

export default FilterSidebar;
