"use client";

import { useSearchProducts } from "@/src/hooks/api";
import { useSearchState } from "@/src/features/search";
import { SearchResults } from "@/src/features/search";

export default function SearchPage() {
  const {
    debouncedQuery,
    searchAPIParams,
  } = useSearchState();

  const { data: products = [], isLoading, isError } = useSearchProducts(searchAPIParams);

  return (
    <main className="min-h-screen bg-white">
      <SearchResults
        products={products}
        isLoading={isLoading}
        isError={isError}
        query={debouncedQuery}
      />
    </main>
  );
}
