import { OrderStatus } from '@/constants/interfaces/order.ts';

export interface changeOrderStatusInterface {
  _id: string;
  orderStatus: OrderStatus;
}

export interface CreateOrderDto {
  address: string;

  userID: string;

  email: string;

  phone_number: string;

  username: string;

  purchases: Purchases[];
}

export interface Purchases {
  product: string;
  details: {
    [name: string]: detail[];
  };
  count: number;
}

export interface detail {
  material: string;
  color: string;
}
