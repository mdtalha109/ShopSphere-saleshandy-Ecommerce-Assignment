import { ProductCardSkeleton } from "./ProductCardSkeleton";
import styles from "./CategoryRow.module.css";
import skeletonStyles from "./CategoryRowSkeleton.module.css";

interface CategoryRowSkeletonProps {
  categoryLabel: string;
  count?: number;
}

export function CategoryRowSkeleton({ categoryLabel, count = 6 }: CategoryRowSkeletonProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>{categoryLabel}</h2>
          <div className={skeletonStyles.viewMoreSkeleton}>
            <div className={skeletonStyles.viewMoreTextSkeleton} />
            <div className={skeletonStyles.viewMoreIconSkeleton} />
          </div>
        </div>

        {/* Products Scroll Container with Skeletons */}
        <div className={styles.scrollContainer}>
          <div className={styles.productsGrid}>
            {Array.from({ length: count }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
