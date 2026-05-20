"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/src/components/ui/Button/Button';
import { useCart } from '@/src/hooks/cart';
import { useCheckout } from '@/src/features/checkout';
import { useCartProducts } from '@/src/features/cart';
import { CheckoutService } from '@/src/features/checkout/services/checkoutService';
import {
  localStorageOrderRepository,
  localStorageAddressRepository,
} from '@/src/features/checkout/repositories';
import styles from './checkout.module.css';
import AddressSelector from '@/src/features/checkout/components/AddressSelector/AddressSelector';
import OrderSummary from '@/src/features/checkout/components/OrderSummary/OrderSummary';

const checkoutService = new CheckoutService(
  localStorageOrderRepository,
  localStorageAddressRepository
);

export default function CheckoutPage() {
  const router = useRouter();
  const { state: cartState, clearCart } = useCart();
  const { productsById, isLoading } = useCartProducts(cartState.items);
  const { selectedAddressId, isProcessing, placeOrder } = useCheckout();

  const handlePlaceOrder = async () => {
    try {
      const orderItems = checkoutService.prepareOrderItems(cartState.items, productsById);

      const order = await placeOrder(orderItems, 'cod');

      clearCart();
      
      router.push(`/orders/${order.id}`);
    } catch (error) {
      console.error('Failed to place order:', error);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <p>Loading checkout...</p>
          </div>
        </div>
      </div>
    );
  }

  if (cartState.items.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.emptyCart}>
            <div className={styles.emptyIcon}>🛒</div>
            <h2 className={styles.emptyText}>Your cart is empty</h2>
            <Link href="/products">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const orderItems = checkoutService?.prepareOrderItems(cartState.items, productsById);
  const { subtotal, total } = checkoutService?.calculateTotals(orderItems);

  return (
    <div className={styles.container}>
      <div className={styles.content}>

        <div className={styles.grid}>
          <div className={styles.main}>
            <div className={styles.section}>
              <AddressSelector />
            </div>
          </div>

          <aside>
            <OrderSummary
              subtotal={subtotal}
              total={total}
              onPlaceOrder={handlePlaceOrder}
              isProcessing={isProcessing}
              disabled={!selectedAddressId}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
