"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Product, ProductCategory } from "@/src/types";
import { ProductCard } from "./ProductCard";
import styles from "./CategoryRow.module.css";

interface CategoryRowProps {
  category: ProductCategory;
  categoryLabel: string;
  products: Product[];
}

export function CategoryRow({ category, categoryLabel, products }: CategoryRowProps) {
  if (products.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{categoryLabel}</h2>
          <Link 
            href={`/category/${category}`}
            className={styles.viewMore}
          >
            <span>View More</span>
            <ChevronRight size={20} />
          </Link>
        </div>

        <div className={styles.scrollContainer}>
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
