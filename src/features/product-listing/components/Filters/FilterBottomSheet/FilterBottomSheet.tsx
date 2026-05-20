'use client';

import { useState, useEffect } from 'react';
import type { Product } from '@/src/types';
import { useFilters, useFilteredProducts } from '../../../hooks';
import { getUniqueBrands } from '../../../services/filterCounting';
import styles from './FilterBottomSheet.module.css';
import StockFilter from '../StockFilter/StockFilter';
import RatingFilter from '../RatingFilter/RatingFilter';
import PriceFilter from '../PriceFilter/PriceFilter';
import BrandFilter from '../BrandFilter/BrandFilter';
import Button from '@/src/components/ui/Button/Button';

interface FilterBottomSheetProps {
  products: Product[];
  isOpen: boolean;
  onClose: () => void;
}

const FilterBottomSheet = ({ products, isOpen, onClose }: FilterBottomSheetProps) => {
  const { filters, updateFilters, clearFilters, hasActiveFilters } = useFilters();
  const { filterCounts } = useFilteredProducts(products, filters);

  const brands = getUniqueBrands(products);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.bottomSheet}>
        <div className={styles.handle} />
        
        <div className={styles.header}>
          <h2 className={styles.title}>Filters</h2>
          {hasActiveFilters && (
            <button onClick={clearFilters} className={styles.clearAll}>
              Clear All
            </button>
          )}
        </div>

        <div className={styles.content}>
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

        <div className={styles.footer}>
          <Button fullWidth onClick={onClose}>
            Show Results
          </Button>
        </div>
      </div>
    </>
  );
};

export default FilterBottomSheet;
