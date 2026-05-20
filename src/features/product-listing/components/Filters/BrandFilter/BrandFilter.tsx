'use client';

import { useState, useMemo } from 'react';
import { filterBrandsBySearch } from '../../../services/filterCounting';
import styles from './BrandFilter.module.css';

interface BrandFilterProps {
  brands: Array<{ slug: string; name: string; count: number }>;
  selectedBrands: string[];
  onChange: (brands: string[]) => void;
}

const BrandFilter = ({ brands, selectedBrands, onChange }: BrandFilterProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBrands = useMemo(
    () => filterBrandsBySearch(brands, searchQuery),
    [brands, searchQuery]
  );

  const handleToggle = (brandSlug: string) => {
    const newSelection = selectedBrands.includes(brandSlug)
      ? selectedBrands.filter((b) => b !== brandSlug)
      : [...selectedBrands, brandSlug];
    onChange(newSelection);
  };

  const handleClear = () => {
    onChange([]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Brand</h3>
        {selectedBrands.length > 0 && (
          <button onClick={handleClear} className={styles.clearButton}>
            Clear
          </button>
        )}
      </div>

      {brands.length > 5 && (
        <input
          type="text"
          placeholder="Search brands..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      )}

      <div className={styles.list}>
        {filteredBrands.map((brand) => (
          <label key={brand.slug} className={styles.item}>
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand.slug)}
              onChange={() => handleToggle(brand.slug)}
              className={styles.checkbox}
            />
            <span className={styles.brandName}>{brand.name}</span>
            <span className={styles.count}>({brand.count})</span>
          </label>
        ))}

        {filteredBrands.length === 0 && (
          <p className={styles.noResults}>No brands found</p>
        )}
      </div>
    </div>
  );
}

export default BrandFilter;
