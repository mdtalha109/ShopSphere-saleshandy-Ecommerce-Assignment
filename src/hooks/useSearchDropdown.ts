import { useState, useEffect, useRef } from "react";
import { useSearchProducts } from "@/src/hooks/api";

interface UseSearchDropdownOptions {
  minQueryLength?: number;
  debounceMs?: number;
  staleTime?: number;
  maxResults?: number;
}

/**
 * Custom hook for search dropdown functionality
 * Handles debouncing, API calls, dropdown state, and click outside
 */
export function useSearchDropdown(options: UseSearchDropdownOptions = {}) {
  const {
    minQueryLength = 2,
    debounceMs = 300,
    staleTime = 60 * 1000,
    maxResults = 8,
  } = options;

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchQuery, debounceMs]);

  // Fetch search results
  const { data: searchResults, isLoading } = useSearchProducts(
    { q: debouncedQuery },
    {
      enabled: debouncedQuery.trim().length >= minQueryLength,
      staleTime,
    }
  );

  // Show/hide dropdown based on query length
  useEffect(() => {
    if (debouncedQuery.trim().length >= minQueryLength) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  }, [debouncedQuery, minQueryLength]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Limit results
  const limitedResults = searchResults?.slice(0, maxResults) || [];

  return {
    searchQuery,
    setSearchQuery,
    debouncedQuery,
    isDropdownOpen,
    setIsDropdownOpen,
    searchRef,
    searchResults: limitedResults,
    isLoading,
  };
}
