"use client";

import { useState } from "react";
import { Product } from "@/src/types";
import { useCartActions } from "@/src/hooks/cart";
import { AddToCartState, ProductImageGalleryState } from "../types/product-detail.types";
import toast from "react-hot-toast";


export function useProductDetail(product: Product) {
  const { addItem } = useCartActions();

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
    // Check if product is in stock
    if (!product.stock.inStock || product.stock.quantity < cartState.quantity) {
      console.warn('Product is out of stock or insufficient quantity');
      return;
    }

    setCartState((prev) => ({ ...prev, isAdding: true }));
    
    try {
      // Add item to cart via CartContext
      addItem(product.id, cartState.quantity);
      
      toast.success(`${product?.title} added to cart!`);
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    } finally {
      setCartState((prev) => ({ ...prev, isAdding: false }));
    }
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
