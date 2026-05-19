export interface CartItem {
    productId: string;
    quantity: number;
    addedAt: number;
}

export interface CartState {
    items: CartItem[];
    itemCount: number;
}

export interface CartContextValue {
    state: CartState;
    addItem: (productId: string, quantity?: number) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getItemQuantity: (productId: string) => number;
}
