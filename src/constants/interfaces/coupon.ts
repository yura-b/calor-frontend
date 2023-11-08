export interface Coupon {
  amount_off: number;

  endDate: string;

  numberOfUses: number;

  percent_off: number;

  startDate: string;

  stripe_coupon_id: string;

  uuid: string;

  _id: string;
}

export interface CouponResponse {
  discount: number;
  taxDiscount: number;
  promoCodeInfo: {
    value: string;
    id: string;
  };
}
