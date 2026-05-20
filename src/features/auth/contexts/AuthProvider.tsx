"use client";

import { useState, useEffect, useCallback, ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { User } from '../types';
import { AuthService } from '../services';
import { localStorageAuthRepository } from '../repositories';

const authService = new AuthService(localStorageAuthRepository);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const user = await authService.login({ email, password });
      setUser(user);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginAsGuest = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const guestUser = await authService.loginAsGuest();
      setUser(guestUser);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Guest login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setError(null);
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    loginAsGuest,
    logout,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
