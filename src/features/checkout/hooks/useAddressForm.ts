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

type FieldErrors = {
  [K in keyof AddressFormData]?: string;
};

export function useAddressForm(onSuccess?: (address: Address) => void) {
  const [formData, setFormData] = useState<AddressFormData>(initialFormData);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof AddressFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user types
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setFieldErrors({});
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validateField = (field: keyof AddressFormData, value: any): string | undefined => {
    switch (field) {
      case 'name':
        if (!value || (typeof value === 'string' && value.trim().length < 2)) {
          return 'Name must be at least 2 characters';
        }
        break;
      case 'phone':
        if (!value || !/^\d{10}$/.test(String(value).replace(/\D/g, ''))) {
          return 'Please enter a valid 10-digit phone number';
        }
        break;
      case 'addressLine1':
        if (!value || (typeof value === 'string' && value.trim().length < 5)) {
          return 'Address must be at least 5 characters';
        }
        break;
      case 'city':
        if (!value || (typeof value === 'string' && value.trim().length < 2)) {
          return 'City is required';
        }
        break;
      case 'state':
        if (!value || (typeof value === 'string' && value.trim().length < 2)) {
          return 'State is required';
        }
        break;
      case 'postalCode':
        if (!value || !/^\d{6}$/.test(String(value))) {
          return 'Please enter a valid 6-digit postal code';
        }
        break;
      case 'country':
        if (!value || (typeof value === 'string' && value.trim().length < 2)) {
          return 'Country is required';
        }
        break;
    }
    return undefined;
  };

  const validateAllFields = (): boolean => {
    const errors: FieldErrors = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof AddressFormData>).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        errors[field] = error;
        isValid = false;
      }
    });

    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFieldErrors({});

    if (!validateAllFields()) {
      setIsSubmitting(false);
      toast.error('Please fix the errors in the form');
      return;
    }

    try {
      const address = addressService.createAddress(formData);
      toast.success('Address added successfully!');
      resetForm();
      onSuccess?.(address);
      return address;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add address';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    fieldErrors,
    isSubmitting,
    updateField,
    resetForm,
    handleSubmit,
  };
}
