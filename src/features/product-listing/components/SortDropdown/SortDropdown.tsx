'use client';

import { SortOption } from '../../types';
import styles from './SortDropdown.module.css';

interface SortDropdownProps {
  value?: SortOption;
  onChange: (value: SortOption) => void;
}

const SORT_OPTIONS = [
  { value: SortOption.RELEVANCE, label: 'Relevance' },
  { value: SortOption.PRICE_LOW_HIGH, label: 'Price: Low to High' },
  { value: SortOption.PRICE_HIGH_LOW, label: 'Price: High to Low' },
  { value: SortOption.RATING, label: 'Customer Rating' },
  { value: SortOption.NEWEST, label: 'Newest Arrivals' },
];

export function SortDropdown({ value = SortOption.RELEVANCE, onChange }: SortDropdownProps) {
  return (
    <div className={styles.container}>
      <label htmlFor="sort" className={styles.label}>
        Sort by:
      </label>
      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className={styles.select}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
