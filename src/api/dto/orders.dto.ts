import { OrderStatus } from '@/constants/interfaces/order.ts';

export interface changeOrderStatusInterface {
  _id: string;
  orderStatus: OrderStatus;
}

export interface CreateOrderDto {
  email: string;

  phone_number: string;

  fistName: string;

  secondName: string;

  shippingInfo: ShippingInfoDto;
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

export interface ShippingInfoDto {
  receiverFirstName: string;

  receiverSecondName: string;

  streetAddress: string;

  ASB: string;

  city: string;

  state: string;

  ZIP: number;

  save: boolean;

  user_id?: string;
}
