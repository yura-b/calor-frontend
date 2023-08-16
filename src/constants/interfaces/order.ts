import { PaymentEnum } from '@/constants/enums/payments.enum.ts';
import {detail} from '@/api/dto/orders.dto.ts';
import { details } from '@/constants/interfaces/basket.ts';


export interface IOrder {
  _id: string;

  status: OrderStatus;

  details: {
    [name: string]: detail[];
  };

  product: product;

  address: shippingDetails;

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
  PROCESSING= 'Processing',
  PRODUCTION = 'Production',
  QualityControl  = 'Quality  Control',
  Shipped = 'Shipped'
}

export const OrderStatusArray: OrderStatus[] = [OrderStatus.PRODUCTION, OrderStatus.QualityControl, OrderStatus.Shipped];

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
  title: string;


  details: details[];


  stripeID: string;


  price: number;

  description: string;
}

export  interface shippingDetails {
  country: string;
  
  streetAddress: string;
  
  ASB: string;

  
  city: string;
  
  state: string;
  
  ZIP: string;
}

export interface IMeasurement {

  size: number;

  rightFootLength: number;

  rightFootWidth: number;

  leftFootLength: number;

  leftFootWidth: number;

  insoleLength: number;

  insoleWidth: number;

}