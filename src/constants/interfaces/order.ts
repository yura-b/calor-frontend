import { PaymentEnum } from '@/constants/enums/payments.enum.ts';
import { detail } from '@/api/dto/orders.dto.ts';
import { details } from '@/constants/interfaces/basket.ts';

export interface IOrder {
  _id: string;

  status: OrderStatus;

  details: {
    [name: string]: detail;
  };

  measurement: IMeasurement;

  shoes: shoes | null;

  accessory: accessory | null;

  shippingInfo: shippingDetails;

  totalPrice: number;

  email: string;

  firstName: string;

  tax: number;

  subtotal: number;

  secondName: string;

  phoneNumber: string;

  paypal_id: string;

  date: Date;

  productionDays: number;

  payment: PaymentEnum;

  shippingPrice: number;

  order_id: number;

  invoiceUrl: string;

  size?: number;

  trackingNumber?: string;

  courier?: string;

  approxDeliveryDate?: string;

  photo: string;
}

export enum OrderStatus {
  NotPaid = 'Not paid yet',
  PROCESSING = 'Processing',
  PRODUCTION = 'Production',
  QualityControl = 'Quality  Control',
  Shipped = 'Shipped',
  Refunded = 'Refunded',
}

export const OrderStatusArray: OrderStatus[] = [
  OrderStatus.PRODUCTION,
  OrderStatus.QualityControl,
  OrderStatus.Shipped,
];

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

interface shoes {
  description: string;
  details: string;
  insole: string;
  photo: string;
  liningMaterial: string;
  price: number;
  sizes: number[];
  sole: string;
  stripeID: string;
  title: string;
  upperMaterial: string;
  _id: string;
}

interface accessory {
  category: string;
  description: string;
  title: string;
  photo: string;
  price: number;
  rating: number;
  size: number[];
  stripeID: string;
  subcategory: string;
  _id: string;
}

export interface shippingDetails {
  country: string;

  streetAddress: string;

  ASB: string;

  city: string;

  state: string;

  ZIP: string;

  receiverPhoneNumber: string;

  _id: string;
}

export interface IMeasurement {
  size: number;

  rightFootLength: number;

  rightFootWidth: number;

  leftFootLength: number;

  leftFootWidth: number;

  insoleLength: number;

  insoleWidth: number;

  comment: string;
}
