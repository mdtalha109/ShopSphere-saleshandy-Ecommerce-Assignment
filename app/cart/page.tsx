
import type { Metadata } from 'next';
import { CartPageClient } from '@/src/features/cart';

export const metadata: Metadata = {
  title: 'Cart - ShopSphere',
  description: 'Review and manage items in your shopping cart',
};

export default function CartPage() {
  return <CartPageClient />;
}
