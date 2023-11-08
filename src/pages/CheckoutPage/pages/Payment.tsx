import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import PaymentButtons from '@components/payment/PaymentButtons.tsx';
import CustomInput from '@components/input/CustomInput.tsx';
import { InputType } from '@/constants/interfaces/inputTypes.ts';
import { useState } from 'react';
import CustomButton from '@components/button/CustomButton.tsx';
import { activateCoupon } from '@/api/promoCodes.ts';
import { errorCorrupted } from '@/store/reducers/StatusReducer.ts';

const Payment = () => {
  const dispatch = useAppDispatch();

  const { order_ids, numberOfItems, totalPrice, shippingPrice, tax } = useAppSelector((state) => state.checkout);

  const [promoCode, setPromoCode] = useState<string>('');
  const [discount, setDiscount] = useState<number | null>(null);

  if (!order_ids) return <div>order ID is missing</div>;
  const promoCodeClickHandler = () => {
    activateCoupon(promoCode, order_ids)
      .then((res) => {
        console.log(res);
        setDiscount(res.data.discount);
      })
      .catch((e) => {
        console.log(e);
        dispatch(errorCorrupted(e.response.data.message));
      });
  };

  return (
    <div className={'flex flex-col gap-5 justify-center p-5'}>
      <p className={'font-bold'}>Order Summary</p>
      <div className={'grid grid-cols-2'}>
        <p>{numberOfItems} item</p>
        <p>$ {totalPrice}</p>

        <p>Order Delivery</p>
        <p>$ {shippingPrice.toFixed(2)}</p>

        <p>Taxes</p>
        <p>$ {tax.toFixed(2)}</p>

        {discount && (
          <>
            <p>Discount</p>
            <p>$ {discount.toFixed(2)}</p>
          </>
        )}
      </div>

      {!discount && (
        <div className={'flex flex-col gap-5 justify-center mb-6'}>
          <p className={'font-bold'}>Promo Code</p>
          <CustomInput type={InputType.text} value={promoCode} onChange={(e) => setPromoCode(e.target.value)} placeholder="Add promo code"/>
          <CustomButton title={'Activate promo code'} handler={promoCodeClickHandler} />
        </div>
      )}

      <p className={'font-bold'}>Payment Method</p>
      <p>Please choose a payment method</p>

      <PaymentButtons order_ids={order_ids} />
    </div>
  );
};

export default Payment;
