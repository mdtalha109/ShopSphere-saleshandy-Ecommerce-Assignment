"use client";

import Image from 'next/image';
import Link from 'next/link';
import Button from '@/src/components/ui/Button/Button';
import { Order } from '../../types';
import styles from './OrderCard.module.css';

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusClass = (status: Order['status']) => {
    return `${styles.status} ${styles[status]}`;
  };

  const displayItems = order.items.slice(0, 2);
  const remainingCount = order.items.length - 2;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.orderId}>Order #{order.id.slice(-8).toUpperCase()}</div>
          <div className={styles.orderDate}>{formatDate(order?.createdAt)}</div>
        </div>
        <span className={getStatusClass(order?.status)}>{order?.status}</span>
      </div>

      <div className={styles.items}>
        {displayItems.map((item) => (
          <div key={item.productId} className={styles.item}>
            <Image
              src={item.image}
              alt={item.name}
              width={60}
              height={60}
              className={styles.itemImage}
            />
            <div className={styles.itemDetails}>
              <div className={styles.itemName}>{item.name}</div>
              <div className={styles.itemMeta}>
                <span>Qty: {item?.quantity}</span>
                <span>₹{(item?.price * item?.quantity).toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
        {remainingCount > 0 && (
          <div className={styles.itemMeta}>
            +{remainingCount} more {remainingCount === 1 ? 'item' : 'items'}
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.total}>
          <span className={styles.totalLabel}>Total:</span>
          ₹{order.total.toFixed(2)}
        </div>
        <Link href={`/orders/${order.id}`}>
          <Button size="small" variant="outline" className={styles.viewButton}>
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default OrderCard;
