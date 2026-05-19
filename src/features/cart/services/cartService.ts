import type { CartItem } from '@/src/types/cart';
import { validateQuantity } from './cartValidation';
import { ItemNotFoundError } from '../domain/cart.errors';

export class CartService {
  addItem(items: CartItem[], productId: string, quantity: number = 1): CartItem[] {
    const validation = validateQuantity(quantity);
    if (!validation.isValid) {
      console.warn(validation.error?.message);
      return items;
    }

    const existingItemIndex = items.findIndex(
      (item) => item.productId === productId
    );

    if (existingItemIndex !== -1) {
      const updatedItems = [...items];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + quantity,
      };
      return updatedItems;
    }

    const newItem: CartItem = {
      productId,
      quantity,
      addedAt: Date.now(),
    };
    return [...items, newItem];
  }

  removeItem(items: CartItem[], productId: string): CartItem[] {
    return items.filter((item) => item.productId !== productId);
  }

  updateQuantity(items: CartItem[], productId: string, quantity: number): CartItem[] {
    const validation = validateQuantity(quantity);
    if (!validation.isValid) {
      console.warn(validation.error?.message);
      return items;
    }

    const itemIndex = items.findIndex((item) => item.productId === productId);

    if (itemIndex === -1) {
      console.warn(new ItemNotFoundError(productId).message);
      return items;
    }

    const updatedItems = [...items];
    updatedItems[itemIndex] = {
      ...updatedItems[itemIndex],
      quantity,
    };
    return updatedItems;
  }

  clearCart(): CartItem[] {
    return [];
  }

  getItemQuantity(items: CartItem[], productId: string): number {
    const item = items.find((item) => item.productId === productId);
    return item?.quantity ?? 0;
  }

  findItem(items: CartItem[], productId: string): CartItem | undefined {
    return items.find((item) => item.productId === productId);
  }

  hasItem(items: CartItem[], productId: string): boolean {
    return items.some((item) => item.productId === productId);
  }

  getTotalItems(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }
}
