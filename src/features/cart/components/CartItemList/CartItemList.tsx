
'use client';

import type { Product } from '@/src/types';
import type { CartItem as CartItemType } from '@/src/types/cart';
import CartItem from '../CartItem/CartItem';

import styles from './CartItemList.module.css';

interface CartItemListProps {
  items: CartItemType[];
  productsById: Map<string, Product>;
  onQuantityChange: (productId: string, newQuantity: number) => void;
  onRemove: (productId: string) => void;
}

const CartItemList =({
  items,
  productsById,
  onQuantityChange,
  onRemove,
}: CartItemListProps) => {
  return (
    <div className={styles.container}>
      {items.map((item) => {
        const product = productsById.get(item.productId);
        if (!product) {
          return (
            <div key={item.productId} className={styles.errorItem}>
              <p className={styles.errorText}>
                Unable to load product details. Please try refreshing the page.
              </p>
              <button
                onClick={() => onRemove(item.productId)}
                className={styles.errorRemoveButton}
              >
                Remove item
              </button>
            </div>
          );
        }

        return (
          <CartItem
            key={item.productId}
            item={item}
            product={product}
            onQuantityChange={(newQuantity) =>
              onQuantityChange(item.productId, newQuantity)
            }
            onRemove={() => onRemove(item.productId)}
          />
        );
      })}
    </div>
  );
}

export default CartItemList;
