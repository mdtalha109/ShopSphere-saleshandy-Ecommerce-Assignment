import type { CartItem } from '@/src/types/cart';

export interface ICartRepository {
  getItems(): CartItem[];
  saveItems(items: CartItem[]): void;
  clear(): void;
}

export class InMemoryCartRepository implements ICartRepository {
  private items: CartItem[] = [];

  getItems(): CartItem[] {
    return [...this.items];
  }

  saveItems(items: CartItem[]): void {
    this.items = [...items];
  }

  clear(): void {
    this.items = [];
  }
}
