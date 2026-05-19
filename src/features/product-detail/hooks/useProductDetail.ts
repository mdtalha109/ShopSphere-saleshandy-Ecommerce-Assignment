"use client";

import { useState } from "react";
import { Product } from "@/src/types";
import { AddToCartState, ProductImageGalleryState } from "../types/product-detail.types";


export function useProductDetail(product: Product) {

  const [gallery, setGallery] = useState<ProductImageGalleryState>({
    selectedImageIndex: 0,
  });

  const [cartState, setCartState] = useState<AddToCartState>({
    quantity: 1,
    isAdding: false,
  });

  const incrementQuantity = () => {
    if (cartState.quantity < product.stock.quantity) {
      setCartState((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
    }
  };

  const decrementQuantity = () => {
    if (cartState.quantity > 1) {
      setCartState((prev) => ({ ...prev, quantity: prev.quantity - 1 }));
    }
  };

  const setQuantity = (quantity: number) => {
    if (quantity >= 1 && quantity <= product.stock.quantity) {
      setCartState((prev) => ({ ...prev, quantity }));
    }
  };

  const addToCart = async () => {
    setCartState((prev) => ({ ...prev, isAdding: true }));
    
    // TODO: Implement actual add to cart logic`);
    
    setCartState((prev) => ({ ...prev, isAdding: false }));
  };

  const selectedImage = product.images[gallery.selectedImageIndex];
  const hasDiscount = product.price.onSale && product.price.discountPercentage > 0;
  const discountAmount = product.price.original - product.price.current;

  return {
    gallery,
    cartState,

    incrementQuantity,
    decrementQuantity,
    setQuantity,
    addToCart,
    
    selectedImage,
    hasDiscount,
    discountAmount,

  };
}
