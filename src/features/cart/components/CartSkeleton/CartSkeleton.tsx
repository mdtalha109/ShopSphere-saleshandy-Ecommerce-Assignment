
'use client';

import styles from './CartSkeleton.module.css';

const CartSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleSkeleton} />
        <div className={styles.subtitleSkeleton} />
      </div>

      <div className={styles.content}>
        <div className={styles.itemsSection}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.itemSkeleton}>
              <div className={styles.imageSkeleton} />
              <div className={styles.detailsSkeleton}>
                <div className={styles.textSkeleton} style={{ width: '70%' }} />
                <div className={styles.textSkeleton} style={{ width: '40%' }} />
                <div className={styles.textSkeleton} style={{ width: '30%' }} />
              </div>
              <div className={styles.quantitySkeleton} />
              <div className={styles.priceSkeleton} />
            </div>
          ))}
        </div>

        <div className={styles.summarySection}>
          <div className={styles.summarySkeleton}>
            <div className={styles.textSkeleton} style={{ width: '50%', height: '24px' }} />
            <div className={styles.textSkeleton} style={{ width: '100%', marginTop: '1rem' }} />
            <div className={styles.textSkeleton} style={{ width: '100%' }} />
            <div className={styles.buttonSkeleton} style={{ marginTop: '1.5rem' }} />
            <div className={styles.buttonSkeleton} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartSkeleton;
