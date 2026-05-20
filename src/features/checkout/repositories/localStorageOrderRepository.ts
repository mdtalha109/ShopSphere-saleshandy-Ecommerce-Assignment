import { Order, CreateOrderData } from '../types';
import { OrderRepository } from './orderRepository';
import { localStorageAddressRepository } from './localStorageAddressRepository';

const ORDER_STORAGE_KEY = 'saleshandy_orders';

export class LocalStorageOrderRepository implements OrderRepository {
  private getOrders(): Order[] {
    try {
      const data = localStorage.getItem(ORDER_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to get orders from localStorage:', error);
      return [];
    }
  }

  private saveOrders(orders: Order[]): void {
    try {
      localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders));
    } catch (error) {
      console.error('Failed to save orders to localStorage:', error);
    }
  }

  getAll(): Order[] {
    return this.getOrders()?.sort((a, b) => b?.createdAt - a?.createdAt);
  }

  getById(id: string): Order | null {
    const orders = this?.getOrders();
    return orders?.find((order) => order?.id === id) || null;
  }

  save(order: Order): void {
    const orders = this?.getOrders();
    const index = orders?.findIndex((o) => o?.id === order?.id);
    
    if (index >= 0) {
      orders[index] = order;
    } else {
      orders?.push(order);
    }
    
    this.saveOrders(orders);
  }

  create(data: CreateOrderData, userId: string): Order {
    const address = localStorageAddressRepository?.getById(data?.addressId);
    
    if (!address) {
      throw new Error('Address not found');
    }
    
    const subtotal = data?.items?.reduce(
      (sum, item) => sum + item?.price * item?.quantity,
      0
    );
    
    const total = subtotal
    
    const newOrder: Order = {
      id: `order_${Date.now()}_${Math.random()?.toString(36).substr(2, 9)}`,
      userId,
      items: data.items,
      shippingAddress: address,
      subtotal,
      total,
      status: 'pending',
      paymentMethod: data?.paymentMethod,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    const orders = this.getOrders();
    orders.push(newOrder);
    this.saveOrders(orders);
    
    return newOrder;
  }

  updateStatus(id: string, status: Order['status']): Order {
    const orders = this.getOrders();
    const index = orders.findIndex((o) => o.id === id);
    
    if (index === -1) {
      throw new Error(`Order with id ${id} not found`);
    }
    
    orders[index].status = status;
    orders[index].updatedAt = Date.now();
    
    this.saveOrders(orders);
    return orders[index];
  }
}

export const localStorageOrderRepository = new LocalStorageOrderRepository();
