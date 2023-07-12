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
  OrderStatus.DELIVERING,
  OrderStatus.RECEIVED,
  OrderStatus.PAID,
  OrderStatus.NotPAID,
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
