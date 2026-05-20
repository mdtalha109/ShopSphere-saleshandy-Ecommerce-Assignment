import { Address, AddressFormData } from '../types';

export interface AddressRepository {
  getAll(): Address[];
  getById(id: string): Address | null;
  getDefault(): Address | null;
  save(address: Address): void;
  create(data: AddressFormData): Address;
  update(id: string, data: Partial<AddressFormData>): Address;
  delete(id: string): void;
  setDefault(id: string): void;
}
