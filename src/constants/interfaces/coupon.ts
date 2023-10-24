export interface Coupon {
  amount_off: number;

  endDate: string;

  isUsed: boolean;

  percent_off: number;

  startDate: string;

  stripe_coupon_id: string;

  uuid: string;

  _id: string;
}
