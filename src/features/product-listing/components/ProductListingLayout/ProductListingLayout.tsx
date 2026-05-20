'use client';

import { useState } from 'react';
import type { Product } from '@/src/types';
import { useFilters, useFilteredProducts } from '../../hooks';
import { SortDropdown } from '../SortDropdown/SortDropdown';
import styles from './ProductListingLayout.module.css';
import FilterSidebar from '../Filters/FilterSidebar/FilterSidebar';
import { FilterBottomSheet } from '../Filters/FilterBottomSheet';
import { ProductGrid } from '../ProductGrid';
import Button from '@/src/components/ui/Button/Button';
import { Filter } from 'lucide-react';

interface ProductListingLayoutProps {
  products: Product[];
  title: string;
  description?: string;
}

const ProductListingLayout = ({ products, title, description }: ProductListingLayoutProps) => {
  const { filters, updateFilters, hasActiveFilters } = useFilters();
  const { filteredProducts } = useFilteredProducts(products, filters);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <div className={styles.desktopSidebar}>
          <FilterSidebar products={products} />
        </div>

        <div className={styles.mainContent}>
          <div className={styles.header}>
            <div>
              <h1 className={styles.title}>{title}</h1>
              {description && <p className={styles.description}>{description}</p>}
            </div>

            <div className={styles.controls}>
              <Button
                variant="outline"
                className={styles.mobileFilterButton}
                onClick={() => setIsFilterOpen(true)}
              >
                <Filter width={20} height={20}/>
                Filters
                {hasActiveFilters && <span className={styles.filterBadge} />}
              </Button>

              <SortDropdown
                value={filters.sortBy}
                onChange={(sortBy) => updateFilters({ sortBy })}
              />
            </div>
          </div>

          <ProductGrid products={filteredProducts} />
        </div>
      </div>

      {/* for mobile */}
      <FilterBottomSheet 
        products={products} 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </div>
  );
}

export default ProductListingLayout;
