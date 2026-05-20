"use client";

import Button from '@/src/components/ui/Button/Button';
import styles from './OrderSummary.module.css';

interface OrderSummaryProps {
  subtotal: number;
  total: number;
  onPlaceOrder: () => void;
  isProcessing: boolean;
  disabled?: boolean;
}

const OrderSummary = ({
  subtotal,
  total,
  onPlaceOrder,
  isProcessing,
  disabled,
}: OrderSummaryProps) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Order Summary</h3>

      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Subtotal</span>
          <span className={styles.summaryValue}>₹{subtotal?.toFixed(2)}</span>
        </div>

      </div>

      <div className={styles.divider} />

      <div className={styles.total}>
        <span>Total</span>
        <span>₹{total?.toFixed(2)}</span>
      </div>

      <Button
        onClick={onPlaceOrder}
        disabled={disabled || isProcessing}
        className={styles.placeOrderButton}
      >
        {isProcessing ? 'Processing...' : 'Place Order'}
      </Button>
    </div>
  );
}

export default OrderSummary;
