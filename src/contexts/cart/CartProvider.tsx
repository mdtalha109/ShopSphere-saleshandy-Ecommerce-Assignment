
'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CartContext } from './CartContext';
import type { CartItem, CartState } from '@/src/types/cart';
import { CartService } from '@/src/features/cart/services/cartService';
import { LocalStorageCartRepository } from '@/src/features/cart/repositories/localStorageCartRepository';
import type { ICartRepository } from '@/src/features/cart/repositories/cartRepository';

interface CartProviderProps {
  children: React.ReactNode;
  repository?: ICartRepository;
  cartService?: CartService;
}

export function CartProvider({
  children,
}: CartProviderProps) {

  const repositoryRef = useRef<ICartRepository>(new LocalStorageCartRepository());
  const serviceRef = useRef<CartService>(new CartService());

  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const repository = repositoryRef.current;
  const service = serviceRef.current;

  useEffect(() => {
    const storedItems = repositoryRef.current.getItems();
    setItems(storedItems);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      repositoryRef.current.saveItems(items);
    }
  }, [items, isInitialized]);

  const addItem = useCallback((productId: string, quantity: number = 1) => {
    setItems((currentItems) => service.addItem(currentItems, productId, quantity));
  }, [service]);

  const removeItem = useCallback((productId: string) => {
    setItems((currentItems) => service.removeItem(currentItems, productId));
  }, [service]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((currentItems) => service.updateQuantity(currentItems, productId, quantity));
  }, [service]);

  const clearCart = useCallback(() => {
    setItems(service.clearCart());
    repository.clear();
  }, [service, repository]);

  const getItemQuantity = useCallback(
    (productId: string): number => {
      return service.getItemQuantity(items, productId);
    },
    [items, service]
  );

  const state: CartState = useMemo(() => {
    // eslint-disable-next-line react-hooks/refs
    const itemCount = service.getTotalItems(items);

    return {
      items,
      itemCount,
    };
  }, [items, service]);

  const value = useMemo(
    () => ({
      state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getItemQuantity,
    }),
    [state, addItem, removeItem, updateQuantity, clearCart, getItemQuantity]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
