export class CartError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CartError';
  }
}

export class InvalidQuantityError extends CartError {
  constructor(quantity: number) {
    super(`Invalid quantity: ${quantity}. Quantity must be at least 1.`);
    this.name = 'InvalidQuantityError';
  }
}

export class ItemNotFoundError extends CartError {
  constructor(productId: string) {
    super(`Item with productId "${productId}" not found in cart.`);
    this.name = 'ItemNotFoundError';
  }
}

export class InsufficientStockError extends CartError {
  constructor(productId: string, requested: number, available: number) {
    super(
      `Insufficient stock for product "${productId}". Requested: ${requested}, Available: ${available}`
    );
    this.name = 'InsufficientStockError';
  }
}

export class OutOfStockError extends CartError {
  constructor(productId: string) {
    super(`Product "${productId}" is out of stock.`);
    this.name = 'OutOfStockError';
  }
}
