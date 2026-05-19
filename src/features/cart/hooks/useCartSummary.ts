'use client';

import { useMemo } from 'react';
import type { Product } from '@/src/types';
import type { CartItem } from '@/src/types/cart';
import { calculateCartSummary } from '../services/cartCalculations';

interface CartSummary {
  totalItems: number;
  subtotal: number;
  currency: string;
  formattedSubtotal: string;
  isValid: boolean;
}

export function useCartSummary(
  cartItems: CartItem[],
  productsById: Map<string, Product>
): CartSummary {
  return useMemo(() => {
    return calculateCartSummary(cartItems, productsById);
  }, [cartItems, productsById]);
}
