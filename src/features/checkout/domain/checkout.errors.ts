export class CheckoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CheckoutError';
  }
}

export class NoAddressSelectedError extends CheckoutError {
  constructor() {
    super('Please select a delivery address');
    this.name = 'NoAddressSelectedError';
  }
}

export class EmptyCartError extends CheckoutError {
  constructor() {
    super('Cart is empty. Add items before checkout');
    this.name = 'EmptyCartError';
  }
}

export class InvalidAddressError extends CheckoutError {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidAddressError';
  }
}

export class OrderCreationError extends CheckoutError {
  constructor(message: string = 'Failed to create order') {
    super(message);
    this.name = 'OrderCreationError';
  }
}
