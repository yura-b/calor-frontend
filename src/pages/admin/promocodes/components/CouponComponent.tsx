import React, { FC } from 'react';
import { Coupon } from '@/constants/interfaces/coupon.ts';
import percentOrAmountCoupon from '@/helpers/functions/percentOrAmountCoupon.ts';
import UsesLeftComponent from '@pages/admin/promocodes/components/UsesLeftComponent.tsx';

const CouponComponent: FC<{ coupon: Coupon }> = ({ coupon }) => {
  return (
    <div className={'flex flex-row gap-5'}>
      <h1 className={'font-bold'}>Coupon:</h1>
      <p>{coupon.uuid}</p>
      <p>{percentOrAmountCoupon(coupon.amount_off, coupon.percent_off)}</p>
      <p>
        <UsesLeftComponent amountOfUses={coupon.numberOfUses} />
      </p>
    </div>
  );
};

export default CouponComponent;
