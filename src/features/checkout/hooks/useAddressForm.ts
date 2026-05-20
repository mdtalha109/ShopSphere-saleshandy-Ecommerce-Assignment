"use client";

import { useState, FormEvent } from 'react';
import { AddressFormData, Address } from '../types';
import { AddressService } from '../services';
import { localStorageAddressRepository } from '../repositories';
import toast from 'react-hot-toast';

const addressService = new AddressService(localStorageAddressRepository);

const initialFormData: AddressFormData = {
  name: '',
  phone: '',
  addressLine1: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'India',
  isDefault: false,
};

export function useAddressForm(onSuccess?: (address: Address) => void) {
  const [formData, setFormData] = useState<AddressFormData>(initialFormData);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof AddressFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const address = addressService.createAddress(formData);
      toast.success('Address added successfully!');
      resetForm();
      onSuccess?.(address);
      return address;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add address';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    error,
    isSubmitting,
    updateField,
    resetForm,
    handleSubmit,
  };
}
