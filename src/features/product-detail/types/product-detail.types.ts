
export interface ProductImageGalleryState {
  selectedImageIndex: number;
}

export interface AddToCartState {
  quantity: number;
  isAdding: boolean;
}

export interface ProductDetailState {
  gallery: ProductImageGalleryState;
  cart: AddToCartState;
}
