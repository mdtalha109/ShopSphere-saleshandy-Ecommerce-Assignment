"use client";

import { Search } from "lucide-react";
import { ProductCard } from "@/src/components/product";
import { Product } from "@/src/types";
import styles from "./SearchResults.module.css";

interface SearchResultsProps {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  query: string;
}

export function SearchResults({ products, isLoading, isError, query }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.status}>
          <div className={styles.spinner} />
          <p>Searching for products...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.container}>
        <div className={styles.status}>
          <p className={styles.error}>Failed to search products. Please try again.</p>
        </div>
      </div>
    );
  }

  if (!query) {
    return (
      <div className={styles.container}>
        <div className={styles.status}>
          <Search size={48} className={styles.icon} />
          <p>Enter a search query to find products</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.status}>
          <Search size={48} className={styles.icon} />
          <p>No products found for &quot;{query}&quot;</p>
          <p className={styles.suggestion}>Try different keywords or adjust your filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Search Results for &quot;{query}&quot;
        </h2>
        <p className={styles.count}>{products.length} products found</p>
      </div>

      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
