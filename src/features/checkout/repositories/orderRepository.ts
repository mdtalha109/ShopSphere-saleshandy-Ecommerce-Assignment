import { Order, CreateOrderData } from '../types';

export interface OrderRepository {
  getAll(): Order[];
  getById(id: string): Order | null;
  save(order: Order): void;
  create(data: CreateOrderData, userId: string): Order;
  updateStatus(id: string, status: Order['status']): Order;
}
