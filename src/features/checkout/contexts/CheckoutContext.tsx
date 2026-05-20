"use client";

import { createContext } from 'react';
import { Address, Order, OrderItem } from '../types';

export interface CheckoutContextValue {
  addresses: Address[];
  selectedAddressId: string | null;
  selectAddress: (id: string) => void;
  addAddress: (address: Address) => void;
  isProcessing: boolean;
  placeOrder: (items: OrderItem[], paymentMethod: string) => Promise<Order>;
  error: string | null;
}

export const CheckoutContext = createContext<CheckoutContextValue | undefined>(undefined);
