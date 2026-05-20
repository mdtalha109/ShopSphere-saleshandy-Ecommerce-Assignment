
import { User } from '../types';

export interface AuthRepository {
  saveUser(user: User): void;
  getUser(): User | null;
  removeUser(): void;
  isAuthenticated(): boolean;
}
