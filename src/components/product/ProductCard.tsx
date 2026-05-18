"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { Product } from "@/src/types";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
  const discountAmount = product.price.original - product.price.current;
  const hasDiscount = product.price.onSale && discountAmount > 0;

  return (
    <Link href={`/products/${product.slug}`} className={styles.card}>
      {/* Image */}
      <div className={styles.imageWrapper}>
        {hasDiscount && (
          <span className={styles.badge}>
            -{product.price.discountPercentage}%
          </span>
        )}
        <Image
          src={primaryImage.url}
          alt={primaryImage.alt || product.title}
          width={300}
          height={300}
          className={styles.image}
        />
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Brand */}
        <div className={styles.brand}>{product.brand.name}</div>

        {/* Title */}
        <h3 className={styles.title}>{product.title}</h3>

        {/* Rating */}
        <div className={styles.rating}>
          <Star className={styles.starIcon} size={16} fill="currentColor" />
          <span className={styles.ratingValue}>{product.rating.average}</span>
          <span className={styles.ratingCount}>({product.rating.count})</span>
        </div>

        {/* Price */}
        <div className={styles.priceWrapper}>
          <div className={styles.currentPrice}>
            ₹{product.price.current.toLocaleString()}
          </div>
          {hasDiscount && (
            <>
              <div className={styles.originalPrice}>
                ₹{product.price.original.toLocaleString()}
              </div>
              <div className={styles.savings}>
                Save ₹{discountAmount.toFixed(0)}
              </div>
            </>
          )}
        </div>

    
      </div>
    </Link>
  );
}
