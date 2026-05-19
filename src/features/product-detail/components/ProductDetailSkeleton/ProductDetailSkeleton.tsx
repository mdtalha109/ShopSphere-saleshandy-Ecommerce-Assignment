import styles from "./ProductDetailSkeleton.module.css";

export function ProductDetailSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Left Column - Images Skeleton */}
        <div className={styles.imageColumn}>
          {/* Main Image */}
          <div className={styles.mainImageSkeleton} />
        </div>

        {/* Right Column - Info Skeleton */}
        <div className={styles.infoColumn}>
          {/* Brand */}
          <div className={styles.brandSkeleton} />
          
          {/* Title */}
          <div className={styles.titleSkeleton}>
            <div className={styles.titleLine} />
            <div className={styles.titleLine} />
            <div className={styles.titleLineShort} />
          </div>

          {/* Rating */}
          <div className={styles.ratingSkeleton}>
            <div className={styles.starsSkeleton} />
            <div className={styles.ratingValueSkeleton} />
            <div className={styles.ratingCountSkeleton} />
          </div>

          {/* Availability */}
          <div className={styles.availabilitySkeleton} />

          {/* Divider */}
          <div className={styles.divider} />

          {/* Price Section */}
          <div className={styles.priceSection}>
            <div className={styles.priceLabelSkeleton} />
            <div className={styles.priceValueSkeleton} />
            <div className={styles.originalPriceSkeleton} />
          </div>

          {/* Divider */}
          <div className={styles.divider} />

          {/* Quantity & Add to Cart */}
          <div className={styles.actionSection}>
            <div className={styles.quantitySkeleton}>
              <div className={styles.quantityButton} />
              <div className={styles.quantityValue} />
              <div className={styles.quantityButton} />
            </div>
            <div className={styles.addToCartSkeleton} />
          </div>

          {/* Category & Tags */}
          <div className={styles.metaSection}>
            <div className={styles.metaItem}>
              <div className={styles.metaLabelSkeleton} />
              <div className={styles.metaValueSkeleton} />
            </div>
            <div className={styles.metaItem}>
              <div className={styles.metaLabelSkeleton} />
              <div className={styles.metaTagsSkeleton}>
                <div className={styles.tagSkeleton} />
                <div className={styles.tagSkeleton} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specs Section Skeleton */}
      <div className={styles.specsSection}>
        <div className={styles.specsTitleSkeleton} />
        <div className={styles.specsGrid}>
          {[...Array(8)].map((_, i) => (
            <div key={i} className={styles.specItem}>
              <div className={styles.specLabelSkeleton} />
              <div className={styles.specValueSkeleton} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
