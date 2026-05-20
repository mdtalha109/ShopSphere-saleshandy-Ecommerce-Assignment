'use client';

import type { Product } from '@/src/types';
import { ProductCard } from '@/src/components/product';
import styles from './ProductGrid.module.css';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyText}>No products found matching your filters.</p>
        <p className={styles.emptyHint}>Try adjusting your filters or clear them to see more results.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
