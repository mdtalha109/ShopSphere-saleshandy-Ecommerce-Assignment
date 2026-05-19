
'use client';

import { createContext } from 'react';
import type { CartContextValue } from '@/src/types/cart';

export const CartContext = createContext<CartContextValue | null>(null);

CartContext.displayName = 'CartContext';
