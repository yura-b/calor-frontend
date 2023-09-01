import { product } from '@/constants/interfaces/order.ts';

export interface Basket {
  _id: string;

  product: product;

  photo: string;

  count: number;

  details: details[];
}

export interface details {
  detail: string;

  material: string;

  color: string;
}
