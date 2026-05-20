'use client';

import type { Product } from '@/src/types';
import { useFilters, useFilteredProducts } from '../../hooks';
import { SortDropdown } from '../SortDropdown/SortDropdown';
import styles from './ProductListingLayout.module.css';
import FilterSidebar from '../Filters/FilterSidebar/FilterSidebar';
import { ProductGrid } from '../ProductGrid';

interface ProductListingLayoutProps {
  products: Product[];
  title: string;
  description?: string;
}

const ProductListingLayout = ({ products, title, description }: ProductListingLayoutProps) => {
  const { filters, updateFilters } = useFilters();
  const { filteredProducts } = useFilteredProducts(products, filters);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>{title}</h1>
          {description && <p className={styles.description}>{description}</p>}
        </div>
       
      </div>

      <div className={styles.layout}>
        <FilterSidebar products={products} />

        <div className={styles.mainContent}>
          <div className={styles.toolbar}>
            <p className={styles.resultCount}>
              Showing {filteredProducts.length} of {products.length} products
            </p>
            <SortDropdown
              value={filters.sortBy}
              onChange={(sortBy) => updateFilters({ sortBy })}
            />
          </div>

          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}

export default ProductListingLayout;
