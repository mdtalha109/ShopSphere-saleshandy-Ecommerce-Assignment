import { Metadata } from 'next';
import { Suspense } from 'react';
import { LoginForm } from '@/src/features/auth';

export const metadata: Metadata = {
  title: 'Sign In - ShopSphere',
  description: 'Sign in to your ShopSphere account or continue as a guest',
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
