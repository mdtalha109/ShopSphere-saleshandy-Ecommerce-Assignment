import { Address, AddressFormData } from '../types';
import { AddressRepository } from './addressRepository';

const ADDRESS_STORAGE_KEY = 'saleshandy_addresses';

export class LocalStorageAddressRepository implements AddressRepository {
  private getAddresses(): Address[] {
    try {
      const data = localStorage.getItem(ADDRESS_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to get addresses from localStorage:', error);
      return [];
    }
  }

  private saveAddresses(addresses: Address[]): void {
    try {
      localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(addresses));
    } catch (error) {
      console.error('Failed to save addresses to localStorage:', error);
    }
  }

  getAll(): Address[] {
    return this.getAddresses();
  }

  getById(id: string): Address | null {
    const addresses = this.getAddresses();
    return addresses.find((addr) => addr.id === id) || null;
  }

  getDefault(): Address | null {
    const addresses = this.getAddresses();
    return addresses.find((addr) => addr.isDefault) || addresses[0] || null;
  }

  save(address: Address): void {
    const addresses = this.getAddresses();
    const index = addresses.findIndex((addr) => addr.id === address.id);
    
    if (index >= 0) {
      addresses[index] = address;
    } else {
      addresses.push(address);
    }
    
    this.saveAddresses(addresses);
  }

  create(data: AddressFormData): Address {
    const addresses = this.getAddresses();
    
    const isDefault = data.isDefault || addresses.length === 0;
    
    if (isDefault) {
      addresses.forEach((addr) => {
        addr.isDefault = false;
      });
    }
    
    const newAddress: Address = {
      id: `addr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...data,
      isDefault,
      createdAt: Date.now(),
    };
    
    addresses.push(newAddress);
    this.saveAddresses(addresses);
    
    return newAddress;
  }

  update(id: string, data: Partial<AddressFormData>): Address {
    const addresses = this.getAddresses();
    const index = addresses.findIndex((addr) => addr.id === id);
    
    if (index === -1) {
      throw new Error(`Address with id ${id} not found`);
    }
    
    const updatedAddress = {
      ...addresses[index],
      ...data,
    };
    
    if (data.isDefault) {
      addresses.forEach((addr, i) => {
        if (i !== index) addr.isDefault = false;
      });
    }
    
    addresses[index] = updatedAddress;
    this.saveAddresses(addresses);
    
    return updatedAddress;
  }

  delete(id: string): void {
    const addresses = this.getAddresses();
    const filtered = addresses.filter((addr) => addr.id !== id);
    
    // If we deleted the default, make the first one default
    if (filtered.length > 0 && !filtered.some((addr) => addr.isDefault)) {
      filtered[0].isDefault = true;
    }
    
    this.saveAddresses(filtered);
  }

  setDefault(id: string): void {
    const addresses = this.getAddresses();
    
    addresses.forEach((addr) => {
      addr.isDefault = addr.id === id;
    });
    
    this.saveAddresses(addresses);
  }
}

export const localStorageAddressRepository = new LocalStorageAddressRepository();
