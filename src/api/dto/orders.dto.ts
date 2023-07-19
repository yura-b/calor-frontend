import { OrderStatus } from '@/constants/interfaces/order.ts';

export interface changeOrderStatusInterface {
  _id: string;
  orderStatus: OrderStatus;
}
