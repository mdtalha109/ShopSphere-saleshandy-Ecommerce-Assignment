
'use client';

import { useRouter } from 'next/navigation';
import Button  from '@/src/components/ui/Button/Button';
import { useAuth } from '@/src/features/auth';
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
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      router.push('/login?redirectTo=/checkout');
    } else {
      router.push('/checkout');
    }
  };
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

      <div className={styles.actions}>
        {showCheckout && (
          <Button variant="outline" size="medium" fullWidth onClick={handleCheckout}>
            Proceed to Checkout
          </Button>
        )}
      </div>
    
      </div>
    
  );
}

export default CartSummary;
