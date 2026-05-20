'use client';

import styles from './StockFilter.module.css';

interface StockFilterProps {
  inStockCount: number;
  totalCount: number;
  isChecked: boolean;
  onChange: (inStock: boolean) => void;
}

const StockFilter = ({ inStockCount, isChecked, onChange }: StockFilterProps) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Availability</h3>

      <label className={styles.item}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => onChange(e.target.checked)}
          className={styles.checkbox}
        />
        <span className={styles.text}>In Stock Only</span>
        <span className={styles.count}>({inStockCount})</span>
      </label>
    </div>
  );
}

export default StockFilter;
