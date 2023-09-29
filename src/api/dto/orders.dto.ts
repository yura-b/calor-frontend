import { IMeasurement, OrderStatus } from '@/constants/interfaces/order.ts';

export interface changeOrderStatusInterface {
  _id: string;
  orderStatus: OrderStatus;
}

export interface CreateOrderDto {
  email: string;

  phone_number: string;

  firstName: string;

  secondName: string;

  shippingInfo: ShippingInfoDto;

  purchases: Purchases[];
}

export interface Purchases {
  product: string;
  details: {
    [name: string]: detail[];
  };
  measurement: IMeasurement;
  count: number;
}

export interface detail {
  name: string;
  material: string;
  color: string;
}

export interface ShippingInfoDto {
  streetAddress: string;

  ASB: string;

  country: string;

  city: string;

  state: string;

  ZIP: number;

  save: boolean;

  user_id?: string;

  receiverPhoneNumber: string;
}

export interface deliveryInfo {
  order_id: string;

  trackingNumber: string;

  courier: string;

  approxDeliveryDate: string;
}

export interface refundDto {
  order_id: string;

  orders_id?: string[];

  custom_price?: number;
}
