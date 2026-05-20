import { CartItem } from '@/src/types/cart/cart.types';
import { Address } from './address.types';

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem extends CartItem {
  name: string;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: Address;
  subtotal: number;
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  createdAt: number;
  updatedAt: number;
}

export interface CreateOrderData {
  items: OrderItem[];
  addressId: string;
  paymentMethod: string;
}

export interface CheckoutState {
  selectedAddressId: string | null;
  paymentMethod: string;
  isProcessing: boolean;
}
