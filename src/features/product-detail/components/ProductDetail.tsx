"use client";

import { Product } from "@/src/types";
import { useProductDetail } from "../hooks/useProductDetail";
import { ProductImages } from "./ProductImages/ProductImages";
import { ProductInfo } from "./ProductInfo/ProductInfo";
import { ProductSpecs } from "./ProductSpecs/ProductSpecs";
import styles from "./ProductDetail.module.css";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const {
    gallery,
    cartState,
    incrementQuantity,
    decrementQuantity,
    addToCart,
    hasDiscount,
    discountAmount,
  } = useProductDetail(product);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Left Column - Images */}
        <div className={styles.imageColumn}>
          <ProductImages
            product={product}
            selectedIndex={gallery.selectedImageIndex}
          />
        </div>

        {/* Right Column - Info */}
        <div className={styles.infoColumn}>
          <ProductInfo
            product={product}
            quantity={cartState.quantity}
            isAdding={cartState.isAdding}
            hasDiscount={hasDiscount}
            discountAmount={discountAmount}
            onIncrementQuantity={incrementQuantity}
            onDecrementQuantity={decrementQuantity}
            onAddToCart={addToCart}
          />
        </div>
      </div>

      <div className={styles.specsSection}>
        <ProductSpecs product={product} />
      </div>
    </div>
  );
}
