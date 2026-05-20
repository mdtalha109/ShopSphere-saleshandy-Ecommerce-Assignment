"use client";

import { useState, useEffect, useCallback, ReactNode } from 'react';
import toast from 'react-hot-toast';
import { CheckoutContext } from './CheckoutContext';
import { Address, Order, OrderItem } from '../types';
import { AddressService, CheckoutService } from '../services';
import {
  localStorageAddressRepository,
  localStorageOrderRepository,
} from '../repositories';
import { useAuth } from '@/src/features/auth';

const addressService = new AddressService(localStorageAddressRepository);
const checkoutService = new CheckoutService(
  localStorageOrderRepository,
  localStorageAddressRepository
);

interface CheckoutProviderProps {
  children: ReactNode;
}

export function CheckoutProvider({ children }: CheckoutProviderProps) {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadedAddresses = addressService.getAllAddresses();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAddresses(loadedAddresses);

    const defaultAddress = addressService.getDefaultAddress();
    if (defaultAddress) {
      setSelectedAddressId(defaultAddress.id);
    }
  }, []);

  const selectAddress = useCallback((id: string) => {
    setSelectedAddressId(id);
    setError(null);
  }, []);

  const addAddress = useCallback((address: Address) => {
    setAddresses((prev) => [...prev, address]);
    
    if (addresses.length === 0) {
      setSelectedAddressId(address.id);
    }
  }, [addresses.length]);


  const placeOrder = useCallback(
    async (items: OrderItem[], paymentMethod: string = 'cod'): Promise<Order> => {
      setIsProcessing(true);
      setError(null);

      try {
        if (!selectedAddressId) {
          throw new Error('Please select a delivery address');
        }

        if (!user) {
          throw new Error('Please login to place order');
        }

        const order = await checkoutService.placeOrder(
          items,
          selectedAddressId,
          user.email,
          paymentMethod
        );

        toast.success('Order placed successfully!');
        return order;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to place order';
        setError(errorMessage);
        toast.error(errorMessage);
        throw err;
      } finally {
        setIsProcessing(false);
      }
    },
    [selectedAddressId, user]
  );

  const value = {
    addresses,
    selectedAddressId,
    selectAddress,
    addAddress,
    isProcessing,
    placeOrder,
    error,
  };

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
}
