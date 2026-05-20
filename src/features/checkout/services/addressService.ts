import { Address, AddressFormData } from '../types';
import { AddressRepository } from '../repositories';
import { InvalidAddressError } from '../domain';

export class AddressService {
  constructor(private repository: AddressRepository) {}

  private validateAddress(data: AddressFormData): void {
    if (!data.name || data.name.trim().length < 2) {
      throw new InvalidAddressError('Name must be at least 2 characters');
    }
    
    if (!data.phone || !/^\d{10}$/.test(data.phone.replace(/\D/g, ''))) {
      throw new InvalidAddressError('Please enter a valid 10-digit phone number');
    }
    
    if (!data.addressLine1 || data.addressLine1.trim().length < 5) {
      throw new InvalidAddressError('Address must be at least 5 characters');
    }
    
    if (!data.city || data.city.trim().length < 2) {
      throw new InvalidAddressError('City is required');
    }
    
    if (!data.state || data.state.trim().length < 2) {
      throw new InvalidAddressError('State is required');
    }
    
    if (!data.postalCode || !/^\d{6}$/.test(data.postalCode)) {
      throw new InvalidAddressError('Please enter a valid 6-digit postal code');
    }
    
    if (!data.country || data.country.trim().length < 2) {
      throw new InvalidAddressError('Country is required');
    }
  }

  getAllAddresses(): Address[] {
    return this.repository.getAll();
  }

  getAddressById(id: string): Address | null {
    return this.repository.getById(id);
  }

  getDefaultAddress(): Address | null {
    return this.repository.getDefault();
  }

  createAddress(data: AddressFormData): Address {
    this.validateAddress(data);
    return this.repository.create(data);
  }

  updateAddress(id: string, data: Partial<AddressFormData>): Address {
    if (Object.keys(data).length > 0) {
      const existingAddress = this.repository.getById(id);
      if (!existingAddress) {
        throw new InvalidAddressError('Address not found');
      }
      
      const mergedData = { ...existingAddress, ...data };
      this.validateAddress(mergedData as AddressFormData);
    }
    
    return this.repository.update(id, data);
  }
}
