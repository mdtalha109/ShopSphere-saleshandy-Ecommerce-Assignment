'use client';

import IconButton from '@/src/components/ui/Button/IconButton';
import styles from './QuantityControls.module.css';
import { Minus, Plus } from 'lucide-react';

interface QuantityControlsProps {
  quantity: number;
  maxQuantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  disabled?: boolean;
}

const QuantityControls = ({
  quantity,
  maxQuantity,
  onIncrement,
  onDecrement,
  disabled = false,
}: QuantityControlsProps) => {
  const canDecrement = quantity > 1 && !disabled;
  const canIncrement = quantity < maxQuantity && !disabled;

  return (
    <div className={styles.container}>
      <IconButton
        onClick={onDecrement}
        disabled={!canDecrement}
        label="Decrease quantity"
        variant="outline"
        size="small"
        icon={
          <Minus/>
        }
      />

      <span className={styles.quantity}>{quantity}</span>

      <IconButton
        onClick={onIncrement}
        disabled={!canIncrement}
        label="Increase quantity"
        variant="outline"
        size="small"
        icon={
          <Plus/>
        }
      />
    </div>
  );
}

export default QuantityControls;