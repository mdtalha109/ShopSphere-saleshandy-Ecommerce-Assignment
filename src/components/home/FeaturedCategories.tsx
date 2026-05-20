"use client";

import Link from "next/link";
import { 
  Laptop, 
  Shirt, 
  Watch, 
  Home, 
  Dumbbell, 
  Sparkles
} from "lucide-react";
import { ProductCategory } from "@/src/types";
import styles from "./FeaturedCategories.module.css";

interface CategoryItem {
  id: ProductCategory;
  name: string;
  icon: React.ReactNode;
  description: string;
  href: string;
  color: string;
}

const categories: CategoryItem[] = [
  {
    id: ProductCategory.ELECTRONICS,
    name: "Electronics",
    icon: <Laptop size={32} />,
    description: "Laptops, Phones & More",
    href: "/category/electronics",
    color: "#275df5",
  },
  {
    id: ProductCategory.CLOTHING,
    name: "Clothing",
    icon: <Shirt size={32} />,
    description: "Fashion for Everyone",
    href: "/category/clothing",
    color: "#f54242",
  },
  {
    id: ProductCategory.ACCESSORIES,
    name: "Accessories",
    icon: <Watch size={32} />,
    description: "Watches, Bags & More",
    href: "/category/accessories",
    color: "#f5a623",
  },
  {
    id: ProductCategory.HOME_GARDEN,
    name: "Home & Garden",
    icon: <Home size={32} />,
    description: "Furniture & Decor",
    href: "/category/home-garden",
    color: "#7ed321",
  },
  {
    id: ProductCategory.SPORTS_OUTDOORS,
    name: "Sports & Outdoors",
    icon: <Dumbbell size={32} />,
    description: "Fitness & Adventure",
    href: "/category/sports-outdoors",
    color: "#ff6b6b",
  },
  {
    id: ProductCategory.BEAUTY_HEALTH,
    name: "Beauty & Health",
    icon: <Sparkles size={32} />,
    description: "Skincare & Wellness",
    href: "/category/beauty-health",
    color: "#e056fd",
  },
  
];

export function FeaturedCategories() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Shop by Category</h2>
          
        </div>

        <div className={styles.grid}>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className={styles.card}
              style={{ "--category-color": category.color } as React.CSSProperties}
            >
              <div className={styles.iconWrapper}>
                {category.icon}
              </div>
              <h3 className={styles.categoryName}>{category.name}</h3>
              <p className={styles.categoryDescription}>{category.description}</p>
              <span className={styles.viewMore}>
                View Products →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
