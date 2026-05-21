"use client";

import { useState, FormEvent } from 'react';
import { useAuth } from './useAuth';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

export function useLogin() {
  const { login, loginAsGuest, isLoading, error: authError } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '/';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      await login(email, password);
      toast.success('Successfully logged in!');
      router.replace(redirectTo);
    } catch {
      const errorMsg = authError || 'Login failed';
      setError(errorMsg);
      toast.error(errorMsg);
    }
  };

  const handleGuestLogin = async () => {
    setError(null);
    
    try {
      await loginAsGuest();
      toast.success('Welcome, Guest!');
      router.replace(redirectTo);
    } catch {
      const errorMsg = authError || 'Guest login failed';
      setError(errorMsg);
      toast.error(errorMsg);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    handleSubmit,
    handleGuestLogin,
  };
}
