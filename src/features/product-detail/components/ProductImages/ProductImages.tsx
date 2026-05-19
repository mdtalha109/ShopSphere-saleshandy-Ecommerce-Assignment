"use client";

import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { Product } from "@/src/types";
import styles from "./ProductImages.module.css";

interface ProductImagesProps {
  product: Product;
  selectedIndex: number;
}

export function ProductImages({ product, selectedIndex }: ProductImagesProps) {
  const selectedImage = product.images[selectedIndex];

  return (
    <div className={styles.container}>
      {/* Main Image */}
      <div className={styles.mainImage}>
        <div className={styles.imageWrapper}>
          <Image
            src={selectedImage.url}
            alt={selectedImage.alt || product.title}
            width={600}
            height={600}
            className={styles.image}
            priority
          />
        </div>
      </div>
    </div>
  );
}
