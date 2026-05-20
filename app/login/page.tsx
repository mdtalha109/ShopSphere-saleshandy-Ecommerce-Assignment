import { Metadata } from 'next';
import { LoginForm } from '@/src/features/auth';

export const metadata: Metadata = {
  title: 'Sign In - ShopSphere',
  description: 'Sign in to your ShopSphere account or continue as a guest',
};

export default function LoginPage() {
  return <LoginForm />;
}
