"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchParams } from "@/src/types/api.types";
import { ProductCategory } from "@/src/types";

export function useSearchState() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState<ProductCategory | undefined>(
    (searchParams.get("category") as ProductCategory) || undefined
  );
  const [minPrice, setMinPrice] = useState<number | undefined>(
    searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined
  );
  const [maxPrice, setMaxPrice] = useState<number | undefined>(
    searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined
  );
  const [sort, setSort] = useState<SearchParams["sort"]>(
    (searchParams.get("sort") as SearchParams["sort"]) || undefined
  );

  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const urlQuery = searchParams.get("q") || "";
    const urlCategory = (searchParams.get("category") as ProductCategory) || undefined;
    const urlMinPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined;
    const urlMaxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined;
    const urlSort = (searchParams.get("sort") as SearchParams["sort"]) || undefined;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuery(urlQuery);
    setCategory(urlCategory);
    setMinPrice(urlMinPrice);
    setMaxPrice(urlMaxPrice);
    setSort(urlSort);
  }, [searchParams]);

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Update URL when filters change
  const updateURL = useCallback(() => {
    const params = new URLSearchParams();

    if (debouncedQuery) params.set("q", debouncedQuery);
    if (category) params.set("category", category);
    if (minPrice !== undefined) params.set("minPrice", minPrice.toString());
    if (maxPrice !== undefined) params.set("maxPrice", maxPrice.toString());
    if (sort) params.set("sort", sort);

    const queryString = params.toString();
    router.push(`/search${queryString ? `?${queryString}` : ""}`);
  }, [debouncedQuery, category, minPrice, maxPrice, sort, router]);

  useEffect(() => {
    if (debouncedQuery || category || minPrice || maxPrice || sort) {
      updateURL();
    }
  }, [debouncedQuery, category, minPrice, maxPrice, sort, updateURL]);

  const searchAPIParams: SearchParams = {
    q: debouncedQuery || undefined,
    category,
    minPrice,
    maxPrice,
    sort,
  };

  const resetFilters = () => {
    setQuery("");
    setCategory(undefined);
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setSort(undefined);
    router.push("/search");
  };

  return {

    query,
    debouncedQuery,
    category,
    minPrice,
    maxPrice,
    sort,
    searchAPIParams,


    setQuery,
    setCategory,
    setMinPrice,
    setMaxPrice,
    setSort,
    resetFilters,
  };
}
