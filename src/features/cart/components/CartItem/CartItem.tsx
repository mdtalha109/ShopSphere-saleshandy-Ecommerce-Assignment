'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash } from 'lucide-react';
import IconButton from '@/src/components/ui/Button/IconButton';
import QuantityControls from '../QuantityControls/QuantityControls';
import type { Product } from '@/src/types';
import type { CartItem as CartItemType } from '@/src/types/cart';

import { calculateItemPricing } from '../../services/cartCalculations';
import styles from './CartItem.module.css';

interface CartItemProps {
    item: CartItemType;
    product: Product;
    onQuantityChange: (newQuantity: number) => void;
    onRemove: () => void;
}

const CartItem = ({
    item,
    product,
    onQuantityChange,
    onRemove,
}: CartItemProps) => {
    const primaryImage = product.images[0];
    const maxQuantity = product.stock.quantity;
    
    const { formattedPrice, formattedSubtotal } = calculateItemPricing(
        product,
        item.quantity
    );

    return (
        <div className={styles.container}>
            <Link href={`/products/${product.slug}`} className={styles.imageLink}>
                <div className={styles.imageWrapper}>
                    <Image
                        src={primaryImage.url}
                        alt={primaryImage.alt as string}
                        fill
                        sizes="(max-width: 640px) 80px, 120px"
                        className={styles.image}
                    />
                </div>
            </Link>

            <div className={styles.details}>
                <div className={styles.info}>
                    <Link href={`/products/${product.slug}`} className={styles.titleLink}>
                        <h3 className={styles.title}>{product.title}</h3>
                    </Link>
                    <p className={styles.brand}>{product.brand.name}</p>
                    {product.sku && (
                        <p className={styles.sku}>SKU: {product.sku}</p>
                    )}
                </div>

                <div className={styles.priceSection}>
                    <span className={styles.price}>{formattedPrice}</span>
                    {product.price.onSale && (
                        <span className={styles.originalPrice}>
                            {new Intl.NumberFormat('en-IN', {
                                style: 'currency',
                                currency: product.price.currency,
                            }).format(product.price.original)}
                        </span>
                    )}
                </div>
            </div>

            <div className={styles.quantitySection}>
                <QuantityControls
                    quantity={item.quantity}
                    maxQuantity={maxQuantity}
                    onIncrement={() => onQuantityChange(item.quantity + 1)}
                    onDecrement={() => onQuantityChange(item.quantity - 1)}
                    disabled={!product.stock.inStock}
                />
            </div>

            <div className={styles.subtotalSection}>
                <span className={styles.subtotal}>{formattedSubtotal}</span>
            </div>

            <div className={styles.removeSection}>
                <IconButton
                    label={`Remove ${product.title} from cart`}
                    onClick={onRemove}
                    aria-label={`Remove ${product.title} from cart`}
                    variant="ghost"
                    icon={<Trash/>}
                >
                </IconButton>
            </div>
        </div>
    );
}

export default CartItem;
