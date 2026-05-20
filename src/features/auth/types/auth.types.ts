export interface User {
  email: string;
  name: string;
  isGuest: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthError {
  message: string;
  code: 'INVALID_CREDENTIALS' | 'USER_NOT_FOUND' | 'UNKNOWN_ERROR';
}

export const GUEST_USER: User = {
  email: 'guest@example.com',
  name: 'Guest User',
  isGuest: true,
};

export const VALID_CREDENTIALS = {
  email: 'frontend@saleshandy.com',
  password: 'hireme',
} as const;
