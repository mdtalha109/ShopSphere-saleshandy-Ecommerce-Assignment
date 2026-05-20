"use client";

import Link from 'next/link';
import Button from '@/src/components/ui/Button/Button';
import { useOrders } from '@/src/features/checkout';
import styles from './orders.module.css';
import OrderCard from '@/src/features/checkout/components/OrderCard/OrderCard';

export default function OrdersPage() {
  const { orders, isLoading } = useOrders();

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <p>Loading orders...</p>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h1 className={styles.title}>My Orders</h1>
            <p className={styles.subtitle}>View and track your orders</p>
          </div>
          
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📦</div>
            <h2 className={styles.emptyText}>No orders yet</h2>
            <Link href="/products">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Orders</h1>
          <p className={styles.subtitle}>{orders.length} {orders.length === 1 ? 'order' : 'orders'} found</p>
        </div>

        <div className={styles.ordersList}>
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}
