"use client";

import { ProductCategory } from "@/src/types";
import { CategoryRow, CategoryRowSkeleton } from "@/src/components/product";
import { useProductsByCategory } from "@/src/hooks/api";
import styles from "./ProductsByCategory.module.css";

const categoryLabels: Record<ProductCategory, string> = {
  [ProductCategory.ELECTRONICS]: "Electronics",
  [ProductCategory.CLOTHING]: "Clothing",
  [ProductCategory.SHOES]: "Shoes",
  [ProductCategory.ACCESSORIES]: "Accessories",
  [ProductCategory.HOME_GARDEN]: "Home & Garden",
  [ProductCategory.SPORTS_OUTDOORS]: "Sports & Outdoors",
  [ProductCategory.BEAUTY_HEALTH]: "Beauty & Health",
  [ProductCategory.BOOKS]: "Books",
  [ProductCategory.TOYS_GAMES]: "Toys & Games",
  [ProductCategory.JEWELRY]: "Jewelry",
  [ProductCategory.AUTOMOTIVE]: "Automotive",
  [ProductCategory.FOOD_BEVERAGES]: "Food & Beverages",
};

const HOMEPAGE_CATEGORIES: ProductCategory[] = [
  ProductCategory.ELECTRONICS,
  ProductCategory.ACCESSORIES,
];

interface CategorySectionProps {
  category: ProductCategory;
}

function CategorySection({ category }: CategorySectionProps) {
  const { data: products, isLoading, isError } = useProductsByCategory(category, { limit: 10 });

  if (isLoading) {
    return (
      <CategoryRowSkeleton 
        categoryLabel={categoryLabels[category]} 
        count={10}
      />
    );
  }

  if (isError || !products || products.length === 0) {
    return null;
  }

  return (
    <CategoryRow
      category={category}
      categoryLabel={categoryLabels[category]}
      products={products}
    />
  );
}

export function ProductsByCategory() {
  return (
    <div className={styles.wrapper}>
      {HOMEPAGE_CATEGORIES.map((category) => (
        <CategorySection key={category} category={category} />
      ))}
    </div>
  );
}
