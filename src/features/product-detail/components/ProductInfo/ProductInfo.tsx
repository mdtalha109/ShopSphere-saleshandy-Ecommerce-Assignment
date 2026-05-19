"use client";

import { Star, ShoppingCart, Minus, Plus } from "lucide-react";
import { Product } from "@/src/types";
import styles from "./ProductInfo.module.css";

interface ProductInfoProps {
  product: Product;
  quantity: number;
  isAdding: boolean;
  hasDiscount: boolean;
  discountAmount: number;
  onIncrementQuantity: () => void;
  onDecrementQuantity: () => void;
  onAddToCart: () => void;
}

export function ProductInfo({
  product,
  quantity,
  isAdding,
  hasDiscount,
  discountAmount,
  onIncrementQuantity,
  onDecrementQuantity,
  onAddToCart,
}: ProductInfoProps) {
  return (
    <div className={styles.container}>
      {/* Brand */}
      <div className={styles.brand}>{product.brand.name}</div>

      {/* Title */}
      <h1 className={styles.title}>{product.title}</h1>

      {/* Short Description */}
      {product.shortDescription && (
        <p className={styles.shortDescription}>{product.shortDescription}</p>
      )}

      {/* Rating */}
      <div className={styles.rating}>
        <div className={styles.stars}>
          <Star size={20} fill="currentColor" className={styles.starIcon} />
          <span className={styles.ratingValue}>{product.rating.average}</span>
        </div>
        <span className={styles.ratingCount}>
          ({product.rating.count.toLocaleString()} reviews)
        </span>
      </div>

      {/* Price */}
      <div className={styles.priceSection}>
        <div className={styles.currentPrice}>
          ₹{product.price.current.toLocaleString()}
        </div>
        {hasDiscount && (
          <div className={styles.priceDetails}>
            <span className={styles.originalPrice}>
              ₹{product.price.original.toLocaleString()}
            </span>
            <span className={styles.savings}>
              Save ₹{discountAmount.toFixed(0)} ({product.price.discountPercentage}% off)
            </span>
          </div>
        )}
      </div>

      {/* Stock Status */}
      <div className={styles.stockStatus}>
        {product.stock.inStock ? (
          <>
            {product.stock.status === "low-stock" ? (
              <span className={styles.lowStock}>
                Only {product.stock.quantity} left in stock
              </span>
            ) : (
              <span className={styles.inStock}>In Stock</span>
            )}
          </>
        ) : (
          <span className={styles.outOfStock}>Out of Stock</span>
        )}
      </div>

      {/* Quantity Selector & Add to Cart */}
      {product.stock.inStock && (
        <div className={styles.actions}>
          <div className={styles.quantitySelector}>
            <button
              onClick={onDecrementQuantity}
              disabled={quantity <= 1}
              className={styles.quantityButton}
              aria-label="Decrease quantity"
            >
              <Minus size={18} />
            </button>
            <span className={styles.quantity}>{quantity}</span>
            <button
              onClick={onIncrementQuantity}
              disabled={quantity >= product.stock.quantity}
              className={styles.quantityButton}
              aria-label="Increase quantity"
            >
              <Plus size={18} />
            </button>
          </div>

          <button
            onClick={onAddToCart}
            disabled={isAdding}
            className={styles.addToCartButton}
          >
            <ShoppingCart size={20} />
            <span>{isAdding ? "Adding..." : "Add to Cart"}</span>
          </button>
        </div>
      )}

      {/* Description */}
      <div className={styles.description}>
        <h2 className={styles.sectionTitle}>Description</h2>
        <p className={styles.descriptionText}>{product.description}</p>
      </div>
    </div>
  );
}
