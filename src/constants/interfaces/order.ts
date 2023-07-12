export interface IOrder {
  address: string;
  email: string;
  number: string;
  purchases: IPurchase[];
  status: OrderStatus;
  username: string;
  _id: string;
}

export enum OrderStatus {
  DELIVERING = 'DELIVERING',
  PAID = 'PAID',
  NotPAID = 'NotPAID',
  RECEIVED = 'RECEIVED',
}

export const OrderStatusArray: OrderStatus[] = [
  OrderStatus.PAID,
  OrderStatus.DELIVERING,
  OrderStatus.RECEIVED,
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
  type: string;
  title: string;
  price: number;
  description: string;
}
