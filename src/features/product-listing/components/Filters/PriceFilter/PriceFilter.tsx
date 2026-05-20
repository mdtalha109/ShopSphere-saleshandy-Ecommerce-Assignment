'use client';

import { useState, useEffect } from 'react';
import { validatePriceRange } from '../../../utils/urlFilters';
import styles from './PriceFilter.module.css';
import Button from '@/src/components/ui/Button/Button';

interface PriceFilterProps {
  min: number;
  max: number;
  currentMin?: number;
  currentMax?: number;
  onChange: (min?: number, max?: number) => void;
}

const PriceFilter = ({ min, max, currentMin, currentMax, onChange }: PriceFilterProps) => {
  const [minValue, setMinValue] = useState(currentMin?.toString() || '');
  const [maxValue, setMaxValue] = useState(currentMax?.toString() || '');
  const [error, setError] = useState<string>();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMinValue(currentMin?.toString() || '');
    setMaxValue(currentMax?.toString() || '');
    setError(undefined);
  }, [currentMin, currentMax]);

  const handleApply = () => {
    const minNum = minValue ? Number(minValue) : undefined;
    const maxNum = maxValue ? Number(maxValue) : undefined;

    const validation = validatePriceRange(minNum, maxNum);
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }

    setError(undefined);
    onChange(minNum, maxNum);
  };

  const handleClear = () => {
    setMinValue('');
    setMaxValue('');
    setError(undefined);
    onChange(undefined, undefined);
  };

  const hasValues = minValue || maxValue;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Price Range</h3>
        {hasValues && (
          <button onClick={handleClear} className={styles.clearButton}>
            Clear
          </button>
        )}
      </div>

      <div className={styles.inputs}>
        <div className={styles.inputGroup}>
          <label htmlFor="min-price" className={styles.label}>
            Min
          </label>
          <input
            id="min-price"
            type="number"
            min={min}
            max={max}
            value={minValue}
            onChange={(e) => setMinValue(e.target.value)}
            placeholder={`₹${min}`}
            className={styles.input}
          />
        </div>

        <span className={styles.separator}>-</span>

        <div className={styles.inputGroup}>
          <label htmlFor="max-price" className={styles.label}>
            Max
          </label>
          <input
            id="max-price"
            type="number"
            min={min}
            max={max}
            value={maxValue}
            onChange={(e) => setMaxValue(e.target.value)}
            placeholder={`₹${max}`}
            className={styles.input}
          />
        </div>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <Button fullWidth onClick={handleApply} className={styles.applyButton}>
        Apply
      </Button>
    </div>
  );
}

export default PriceFilter;
