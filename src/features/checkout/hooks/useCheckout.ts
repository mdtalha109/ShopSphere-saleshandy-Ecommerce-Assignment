"use client";

import { useContext } from 'react';
import { CheckoutContext } from '../contexts';

export function useCheckout() {
  const context = useContext(CheckoutContext);
  
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  
  return context;
}
