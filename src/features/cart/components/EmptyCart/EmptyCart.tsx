
'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import  Button  from '@/src/components/ui/Button/Button';
import styles from './EmptyCart.module.css';


const EmptyCart = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <ShoppingBag className={styles.icon}/>
        </div>
        <h2 className={styles.title}>Your cart is empty</h2>
        <p className={styles.description}>
          Looks like you haven&apos;t added anything to your cart yet.
          Start shopping to fill it up!
        </p>
        <Link href="/" className={styles.link}>
          <Button variant="primary" size="medium">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default EmptyCart;
