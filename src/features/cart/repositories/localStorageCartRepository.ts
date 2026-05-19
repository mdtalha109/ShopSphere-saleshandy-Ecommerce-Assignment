import type { CartItem } from '@/src/types/cart';
import { validateCartItems } from '../services/cartValidation';
import type { ICartRepository } from './cartRepository';

const CART_STORAGE_KEY = 'shopsphere_cart';

export class LocalStorageCartRepository implements ICartRepository {
  getItems(): CartItem[] {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      
      if (!stored) {
        return [];
      }

      const parsed = JSON.parse(stored);
      return validateCartItems(Array.isArray(parsed) ? parsed : []);
    } catch (error) {
      console.error('Failed to parse cart from localStorage:', error);
      return [];
    }
  }

  saveItems(items: CartItem[]): void {
    try {
      const serialized = JSON.stringify(items);
      localStorage.setItem(CART_STORAGE_KEY, serialized);
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }

  clear(): void {
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear cart from localStorage:', error);
    }
  }
}
