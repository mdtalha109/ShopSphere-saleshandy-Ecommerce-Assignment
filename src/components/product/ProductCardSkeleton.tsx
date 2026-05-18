import styles from "./ProductCardSkeleton.module.css";

export function ProductCardSkeleton() {
  return (
    <div className={styles.card}>
      {/* Image Skeleton */}
      <div className={styles.imageWrapper}>
        <div className={styles.imageSkeleton} />
      </div>

      {/* Content Skeleton */}
      <div className={styles.content}>
        {/* Brand */}
        <div className={styles.brandSkeleton} />

        {/* Title (2 lines) */}
        <div className={styles.titleSkeleton}>
          <div className={styles.titleLine} />
          <div className={styles.titleLineShort} />
        </div>

        {/* Rating */}
        <div className={styles.ratingSkeleton}>
          <div className={styles.starSkeleton} />
          <div className={styles.ratingValueSkeleton} />
          <div className={styles.ratingCountSkeleton} />
        </div>

        {/* Price */}
        <div className={styles.priceSkeleton}>
          <div className={styles.currentPriceSkeleton} />
          <div className={styles.originalPriceSkeleton} />
        </div>
      </div>
    </div>
  );
}
