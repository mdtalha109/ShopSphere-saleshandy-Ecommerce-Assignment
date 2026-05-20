"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import Button from '@/src/components/ui/Button/Button';
import { useAuth } from '@/src/features/auth';
import { Order } from '@/src/features/checkout/types';
import { CheckoutService } from '@/src/features/checkout/services/checkoutService';
import {
  localStorageOrderRepository,
  localStorageAddressRepository,
} from '@/src/features/checkout/repositories';
import styles from './orderDetail.module.css';

const checkoutService = new CheckoutService(
  localStorageOrderRepository,
  localStorageAddressRepository
);

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const orderId = params.id as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push(`/login?redirectTo=/orders/${orderId}`);
    }
  }, [authLoading, isAuthenticated, router, orderId]);

  useEffect(() => {
    const loadOrder = () => {
      try {
        const loadedOrder = checkoutService.getOrderById(orderId);
        setOrder(loadedOrder);
      } catch (error) {
        console.error('Failed to load order:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrder();
  }, [orderId]);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusClass = (status: Order['status']) => {
    return `${styles.status} ${styles[status]}`;
  };

  if (authLoading || isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <p>Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (!order) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.notFound}>
            <div className={styles.notFoundIcon}>📦</div>
            <h2 className={styles.notFoundText}>Order not found</h2>
            <Link href="/orders">
              <Button>View All Orders</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Link href="/orders" className={styles.backLink}>
          <ArrowLeft size={16} />
          Back to Orders
        </Link>

        <div className={styles.header}>
          <div className={styles.headerTop}>
            <h1 className={styles.orderId}>Order #{order.id.slice(-8).toUpperCase()}</h1>
            <span className={getStatusClass(order.status)}>{order.status}</span>
          </div>
          <div className={styles.orderMeta}>
            <span>Placed on: {formatDate(order.createdAt)}</span>
            <span>Payment: {order.paymentMethod.toUpperCase()}</span>
          </div>
        </div>

        <div className={styles.grid}>
          <div>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Order Items</h2>
              <div className={styles.items}>
                {order.items.map((item) => (
                  <div key={item.productId} className={styles.item}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className={styles.itemImage}
                    />
                    <div className={styles.itemDetails}>
                      <div className={styles.itemName}>{item.name}</div>
                      <div className={styles.itemMeta}>
                        <span>Quantity: {item.quantity}</span>
                        <span className={styles.itemPrice}>₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.section} style={{ marginTop: '1.5rem' }}>
              <h2 className={styles.sectionTitle}>Shipping Address</h2>
              <div className={styles.address}>
                <div className={styles.addressName}>{order.shippingAddress.name}</div>
                <div className={styles.addressPhone}>{order.shippingAddress.phone}</div>
                <div>
                  {order.shippingAddress.addressLine1}
                  <br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}
                  <br />
                  {order.shippingAddress.country}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Order Summary</h2>
              <div className={styles.summary}>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Subtotal</span>
                  <span className={styles.summaryValue}>₹{order.subtotal.toFixed(2)}</span>
                </div>
                
                <div className={styles.total}>
                  <span>Total</span>
                  <span>₹{order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
