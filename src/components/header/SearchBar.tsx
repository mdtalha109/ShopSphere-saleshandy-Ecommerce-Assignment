"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useSearchDropdown } from "@/src/hooks/useSearchDropdown";
import Input from "@/src/components/ui/Input/Input";
import { SearchDropdown } from "./SearchDropdown";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export function SearchBar({
  placeholder = "Search for products...",
  onSearch,
  className,
}: SearchBarProps) {
  const router = useRouter();
  const {
    searchQuery,
    setSearchQuery,
    debouncedQuery,
    isDropdownOpen,
    setIsDropdownOpen,
    searchRef,
    searchResults,
    isLoading,
  } = useSearchDropdown();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsDropdownOpen(false);
      
      if (onSearch) {
        onSearch(searchQuery.trim());
      } else {
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      }
    }
  };

  const handleItemClick = () => {
    setIsDropdownOpen(false);
    setSearchQuery("");
  };

  return (
    <form onSubmit={handleSearch} className={className}>
      <div className={styles.searchContainer} ref={searchRef}>
        <Search className={styles.searchIcon} size={20} />
        <Input
          variant="search"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => {
            if (debouncedQuery.trim().length >= 2) {
              setIsDropdownOpen(true);
            }
          }}
          className={styles.searchInput}
          aria-label="Search products"
          autoComplete="off"
        />
        {isDropdownOpen && (
          <SearchDropdown
            products={searchResults}
            isLoading={isLoading}
            searchQuery={debouncedQuery}
            onClose={() => setIsDropdownOpen(false)}
            onItemClick={handleItemClick}
          />
        )}
      </div>
    </form>
  );
}
