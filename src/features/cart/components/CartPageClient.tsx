
'use client';

import { useCart } from '@/src/hooks/cart';
import { useCartProducts, useCartSummary } from '../hooks';
import  CartItemList  from './CartItemList/CartItemList';
import styles from './CartPageClient.module.css';
import CartSkeleton from './CartSkeleton/CartSkeleton';
import CartSummary from './CartSummary/CartSummary';
import EmptyCart from './EmptyCart/EmptyCart';

export function CartPageClient() {
  const { state, updateQuantity, removeItem } = useCart();
  const { productsById, isLoading, hasError } = useCartProducts(state.items);
  const summary = useCartSummary(state.items, productsById);

  if (state.items.length === 0) {
    return <EmptyCart />;
  }

  if (isLoading) {
    return <CartSkeleton />;
  }

  if (hasError && productsById.size === 0) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorText}>
          Something went wrong while loading your cart items. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Shopping Cart</h1>
        <p className={styles.subtitle}>
          {summary.totalItems} {summary.totalItems === 1 ? 'item' : 'items'}
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.itemsSection}>
          <CartItemList
            items={state.items}
            productsById={productsById}
            onQuantityChange={updateQuantity}
            onRemove={removeItem}
          />
        </div>

        <aside className={styles.summarySection}>
          <CartSummary
            totalItems={summary.totalItems}
            formattedSubtotal={summary.formattedSubtotal}
            showCheckout={true} 
          />
        </aside>
      </div>
    </div>
  );
}
