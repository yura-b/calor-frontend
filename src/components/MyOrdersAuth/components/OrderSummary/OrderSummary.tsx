import React from 'react';
import styles from '@/styles/Styles.module.scss';
import { IOrder } from '@/constants/interfaces/order';

interface Props {
  orderData: IOrder;
}

const OrderSummary: React.FC<Props> = ({ orderData }): React.ReactElement => {
  const { tax, totalPrice } = orderData;
  const product = orderData?.shoes || orderData?.accessory;
  if (!product) return <></>;
  const { title, price } = product;

  return (
    <div className="border-b-2 border-mint py-2 lg:border-none">
      <p className={`${styles.subtitle}`}>Order Summary </p>
      <div className="flex justify-between">
        <p>{title}</p>
        <p>${price} </p>
      </div>
      <div className="flex justify-between py-2">
        <p>Order Delivery</p>
        <p>$20 </p>
      </div>
      <div className="flex justify-between">
        <p>Taxes</p>
        <p>${tax} </p>
      </div>
      <div className={`${styles.body2} font-bold text-mint flex justify-between`}>
        <h2>Subtotal</h2>
        <h2>${totalPrice}</h2>
      </div>
    </div>
  );
};

export default OrderSummary;
