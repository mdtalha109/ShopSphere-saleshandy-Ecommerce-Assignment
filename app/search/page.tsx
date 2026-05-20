"use client";

import { Search } from "lucide-react";
import { useSearchProducts } from "@/src/hooks/api";
import { useSearchState } from "@/src/features/search";
import ProductListingLayout from "@/src/features/product-listing/components/ProductListingLayout/ProductListingLayout";
import styles from "./search.module.css";

export default function SearchPage() {
  const {
    debouncedQuery,
    searchAPIParams,
  } = useSearchState();

  const { data: products = [], isLoading, isError } = useSearchProducts(searchAPIParams);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white">
        <div className={styles.status}>
          <div className={styles.spinner} />
          <p>Searching for products...</p>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-white">
        <div className={styles.status}>
          <p className={styles.error}>Failed to search products. Please try again.</p>
        </div>
      </main>
    );
  }

  if (!debouncedQuery) {
    return (
      <main className="min-h-screen bg-white">
        <div className={styles.status}>
          <Search size={48} className={styles.icon} />
          <p>Enter a search query to find products</p>
        </div>
      </main>
    );
  }

  if (products.length === 0) {
    return (
      <main className="min-h-screen bg-white">
        <div className={styles.status}>
          <Search size={48} className={styles.icon} />
          <p>No products found for &quot;{debouncedQuery}&quot;</p>
          <p className={styles.suggestion}>Try different keywords or adjust your filters</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <ProductListingLayout
        products={products}
        title={`Search Results for "${debouncedQuery}"`}
        description={`${products.length} products found`}
      />
    </main>
  );
}
