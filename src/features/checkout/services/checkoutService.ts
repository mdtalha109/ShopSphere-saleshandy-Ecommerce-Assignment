import { Order, CreateOrderData, OrderItem } from '../types';
import { OrderRepository, AddressRepository } from '../repositories';
import { NoAddressSelectedError, EmptyCartError, OrderCreationError } from '../domain';
import { CartItem } from '@/src/types/cart/cart.types';
import { Product } from '@/src/types';

export class CheckoutService {
  constructor(
    private orderRepository: OrderRepository,
    private addressRepository: AddressRepository
  ) {}

  prepareOrderItems(cartItems: CartItem[], productsById: Map<string, Product>): OrderItem[] {
    return cartItems.map((cartItem) => {
      const product = productsById.get(cartItem.productId);
      
      if (!product) {
        throw new OrderCreationError(`Product ${cartItem.productId} not found`);
      }
      
      return {
        ...cartItem,
        name: product.title,
        price: product.price.current,
        image: product.images?.[0]?.url || '/placeholder.png',
      };
    });
  }

  prepareOrderItemsFromArray(cartItems: CartItem[], products: Product[]): OrderItem[] {
    return cartItems.map((cartItem) => {
      const product = products.find((p) => p.id === cartItem.productId);
      
      if (!product) {
        throw new OrderCreationError(`Product ${cartItem.productId} not found`);
      }
      
      return {
        ...cartItem,
        name: product.title,
        price: product.price.current,
        image: product.images?.[0]?.url || '/placeholder.png',
      };
    });
  }

  calculateTotals(items: OrderItem[]): {
    subtotal: number;
    total: number;
  } {
    const subtotal = items?.reduce((sum, item) => sum + item?.price * item?.quantity, 0) || 0;
    const total = subtotal;
    
    return { subtotal, total };
  }

  async placeOrder(
    items: OrderItem[],
    addressId: string,
    userId: string,
    paymentMethod: string = 'cod'
  ): Promise<Order> {

    if (!items || items?.length === 0) {
      throw new EmptyCartError();
    }
    
    if (!addressId) {
      throw new NoAddressSelectedError();
    }
    
    const address = this.addressRepository.getById(addressId);
    if (!address) {
      throw new OrderCreationError('Selected address not found');
    }
    
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const orderData: CreateOrderData = {
      items,
      addressId,
      paymentMethod,
    };
    
    const order = this.orderRepository.create(orderData, userId);
    return order;
  }

  getOrders(): Order[] {
    return this.orderRepository.getAll();
  }

  getOrderById(id: string): Order | null {
    return this.orderRepository.getById(id);
  }
}
