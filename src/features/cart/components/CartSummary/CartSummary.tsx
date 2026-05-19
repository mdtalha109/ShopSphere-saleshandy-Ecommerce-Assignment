
'use client';

import Link from 'next/link';
import Button  from '@/src/components/ui/Button/Button';
import styles from './CartSummary.module.css';

interface CartSummaryProps {
  totalItems: number;
  formattedSubtotal: string;
  showCheckout?: boolean;
}

const CartSummary = ({
  totalItems,
  formattedSubtotal,
  showCheckout = false,
}: CartSummaryProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Order Summary</h2>

      <div className={styles.row}>
        <span className={styles.label}>
          Items ({totalItems} {totalItems === 1 ? 'item' : 'items'})
        </span>
        <span className={styles.value}>{formattedSubtotal}</span>
      </div>

      <div className={styles.divider} />

      <div className={styles.row}>
        <span className={styles.totalLabel}>Subtotal</span>
        <span className={styles.totalValue}>{formattedSubtotal}</span>
      </div>

      <p className={styles.note}>
        Shipping and taxes will be calculated at checkout
      </p>

      <div className={styles.actions}>
        {showCheckout && (
          <Button variant="primary" size="large" disabled>
            Proceed to Checkout
          </Button>
        )}
        <Link href="/" className={styles.link}>
          <Button variant="outline" size="small">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default CartSummary;
