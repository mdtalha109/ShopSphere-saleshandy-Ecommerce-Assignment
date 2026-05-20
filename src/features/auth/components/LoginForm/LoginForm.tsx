"use client";

import Button from '@/src/components/ui/Button/Button';
import Input from '@/src/components/ui/Input/Input';
import { useLogin } from '../../hooks';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    handleSubmit,
    handleGuestLogin,
  } = useLogin();

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Sign in to continue shopping</p>
        </div>

        <div className={styles.formContent}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address
              </label>
              <Input
                id="email"
                variant="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={isLoading}
                autoComplete="email"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <Input
                id="password"
                variant="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={isLoading}
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className={styles.error} role="alert">
                {error}
              </div>
            )}

            <div className={styles.buttonGroup}>
              <Button
                type="submit"
                
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>

              <div className={styles.divider}>OR</div>

              <Button
              variant='outline'
                onClick={handleGuestLogin}
                disabled={isLoading}
              >
                Continue as Guest
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
