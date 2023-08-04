import { PaymentEnum } from '@/constants/enums/payments.enum.ts';
import {detail} from '@/api/dto/orders.dto.ts';


export interface IOrder {
  _id: string;

  userID: string;

  status: OrderStatus;

  details: {
    [name: string]: detail[];
  };

  quantity: number

  product: string;

  address: string;

  totalPrice: number

  email: string;

  username: string;

  phoneNumber: string;

  paypal_id: string;

  date: Date

  productionDays: number

  payment: PaymentEnum
}



export enum OrderStatus {
  DELIVERING = 'DELIVERING',
  PAID = 'PAID',
  NotPAID = 'NotPAID',
  RECEIVED = 'RECEIVED',
}

export const OrderStatusArray: OrderStatus[] = [OrderStatus.PAID, OrderStatus.DELIVERING, OrderStatus.RECEIVED];

export interface IPurchase {
  product: product;
  count: number;
  details: {
    [name: string]: { material: string; color: string };
  };
}

export interface lanches {
  material: string;
  color: string;
}

export interface product {
  type: string;
  title: string;
  price: number;
  description: string;
}
