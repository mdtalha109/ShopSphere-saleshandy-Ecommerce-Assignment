"use client";

import { Product } from "@/src/types";
import styles from "./ProductSpecs.module.css";

interface ProductSpecsProps {
  product: Product;
}

export function ProductSpecs({ product }: ProductSpecsProps) {
  if (!product.specifications || product.specifications.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Specifications</h2>
      <div className={styles.specsGrid}>
        {product.specifications.map((spec, index) => (
          <div key={index} className={styles.specRow}>
            <div className={styles.specKey}>{spec.key}</div>
            <div className={styles.specValue}>
              {spec.value}
              {spec.unit && <span className={styles.unit}> {spec.unit}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
