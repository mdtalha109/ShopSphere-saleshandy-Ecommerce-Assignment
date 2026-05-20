'use client';

import styles from './RatingFilter.module.css';

interface RatingFilterProps {
  selectedRating?: number;
  onChange: (rating?: number) => void;
}

const RATING_OPTIONS = [4, 3, 2, 1];

const RatingFilter = ({ selectedRating, onChange }: RatingFilterProps) => {
  const handleClear = () => {
    onChange(undefined);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Customer Ratings</h3>
        {selectedRating !== undefined && (
          <button onClick={handleClear} className={styles.clearButton}>
            Clear
          </button>
        )}
      </div>

      <div className={styles.list}>
        {RATING_OPTIONS.map((rating) => (
          <label key={rating} className={styles.item}>
            <input
              type="radio"
              name="rating"
              checked={selectedRating === rating}
              onChange={() => onChange(rating)}
              className={styles.radio}
            />
            <div className={styles.stars}>
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className={i < rating ? styles.starFilled : styles.starEmpty}
                >
                  ★
                </span>
              ))}
            </div>
            <span className={styles.text}>& Up</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default RatingFilter;
