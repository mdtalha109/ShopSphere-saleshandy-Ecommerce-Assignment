'use client';

import { useCart } from './useCart';

export function useCartActions() {
  const { addItem, removeItem, updateQuantity, clearCart, getItemQuantity } =
    useCart();

  return {
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemQuantity,
  };
}
