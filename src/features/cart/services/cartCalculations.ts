import type { Product } from '@/src/types';
import type { CartItem } from '@/src/types/cart';

export interface CartTotals {
  subtotal: number;
  totalItems: number;
  currency: string;
}

export interface CartSummaryData extends CartTotals {
  formattedSubtotal: string;
  isValid: boolean;
}

export interface ItemCalculation {
  itemSubtotal: number;
  formattedPrice: string;
  formattedSubtotal: string;
}

export function calculateItemSubtotal(
  price: number,
  quantity: number
): number {
  return price * quantity;
}

export function calculateCartTotals(
  items: CartItem[],
  productsById: Map<string, Product>
): CartTotals {
  let subtotal = 0;
  let currency = 'INR';
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  for (const item of items) {
    const product = productsById.get(item.productId);
    if (product) {
      if (currency === 'INR' && product.price.currency) {
        currency = product.price.currency;
      }
      subtotal += calculateItemSubtotal(product.price.current, item.quantity);
    }
  }

  return {
    subtotal,
    totalItems,
    currency,
  };
}

export function formatCurrency(
  amount: number,
  currency: string,
  locale: string = 'en-IN'
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(amount);
  } catch (error) {
    return `${currency} ${amount.toFixed(2)}`;
  }
}

export function calculateCartSummary(
  items: CartItem[],
  productsById: Map<string, Product>
): CartSummaryData {
  const totals = calculateCartTotals(items, productsById);
  const allProductsLoaded = items.every((item) =>
    productsById.has(item.productId)
  );

  return {
    ...totals,
    formattedSubtotal: formatCurrency(totals.subtotal, totals.currency),
    isValid: allProductsLoaded,
  };
}

export function calculateItemPricing(
  product: Product,
  quantity: number
): ItemCalculation {
  const itemSubtotal = calculateItemSubtotal(product.price.current, quantity);

  return {
    itemSubtotal,
    formattedPrice: formatCurrency(product.price.current, product.price.currency),
    formattedSubtotal: formatCurrency(itemSubtotal, product.price.currency),
  };
}

export function getTotalItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
