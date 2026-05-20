import { User } from '../types';
import { AuthRepository } from './authRepository';

const AUTH_STORAGE_KEY = 'saleshandy_auth_user';

export class LocalStorageAuthRepository implements AuthRepository {
  saveUser(user: User): void {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Failed to save user to localStorage:', error);
    }
  }

  getUser(): User | null {
    try {
      const userJson = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!userJson) return null;
      
      return JSON.parse(userJson) as User;
    } catch (error) {
      console.error('Failed to get user from localStorage:', error);
      return null;
    }
  }

  removeUser(): void {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to remove user from localStorage:', error);
    }
  }

  isAuthenticated(): boolean {
    return this.getUser() !== null;
  }
}

export const localStorageAuthRepository = new LocalStorageAuthRepository();
