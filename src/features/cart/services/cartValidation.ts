import { InvalidQuantityError, InsufficientStockError, OutOfStockError } from '../domain/cart.errors';
import type { Product } from '@/src/types';
import type { CartItem } from '@/src/types/cart';

export interface ValidationResult {
  isValid: boolean;
  error?: Error;
}

export function validateQuantity(quantity: number): ValidationResult {
  if (!Number.isInteger(quantity) || quantity < 1) {
    return {
      isValid: false,
      error: new InvalidQuantityError(quantity),
    };
  }
  return { isValid: true };
}

export function validateStock(
  productId: string,
  requestedQuantity: number,
  product?: Product
): ValidationResult {
  if (!product) {
    return {
      isValid: false,
      error: new Error(`Product ${productId} not found`),
    };
  }

  if (!product.stock.inStock) {
    return {
      isValid: false,
      error: new OutOfStockError(productId),
    };
  }

  if (requestedQuantity > product.stock.quantity) {
    return {
      isValid: false,
      error: new InsufficientStockError(
        productId,
        requestedQuantity,
        product.stock.quantity
      ),
    };
  }

  return { isValid: true };
}

export function validateCartItem(item: CartItem): boolean {
  return (
    typeof item.productId === 'string' &&
    item.productId.length > 0 &&
    Number.isInteger(item.quantity) &&
    item.quantity > 0 &&
    typeof item.addedAt === 'number' &&
    item.addedAt > 0
  );
}

export function validateCartItems(items: unknown[]): CartItem[] {
  return items.filter(
    (item): item is CartItem =>
      typeof item === 'object' && item !== null && validateCartItem(item as CartItem)
  );
}

export function canIncrement(
  currentQuantity: number,
  maxQuantity: number
): boolean {
  return currentQuantity < maxQuantity;
}

export function canDecrement(currentQuantity: number): boolean {
  return currentQuantity > 1;
}
