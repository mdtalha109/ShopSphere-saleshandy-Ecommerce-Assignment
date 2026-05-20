"use client";

import { useState, useEffect } from 'react';
import { Order } from '../types';
import { CheckoutService } from '../services';
import {
  localStorageOrderRepository,
  localStorageAddressRepository,
} from '../repositories';

const checkoutService = new CheckoutService(
  localStorageOrderRepository,
  localStorageAddressRepository
);

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOrders = () => {
      try {
        const loadedOrders = checkoutService.getOrders();
        setOrders(loadedOrders);
      } catch (error) {
        console.error('Failed to load orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  const refreshOrders = () => {
    const loadedOrders = checkoutService.getOrders();
    setOrders(loadedOrders);
  };

  return {
    orders,
    isLoading,
    refreshOrders,
  };
}
