"use client";

import { ProductDetail } from "@/src/features/product-detail";
import { Product } from "@/src/types";

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  return <ProductDetail product={product} />;
}
