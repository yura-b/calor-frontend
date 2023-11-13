import React from 'react';
import styles from '@/styles/Styles.module.scss';
import { IOrder } from '@/constants/interfaces/order';

interface Props {
  orderData: IOrder;
}

const OrderSummary: React.FC<Props> = ({ orderData }): React.ReactElement => {
  const { products, shippingPrice, tax, subtotal } = orderData;
  return (
    <div className="border-b-2 border-mint py-2 lg:border-none">
      <p className={`${styles.subtitle}`}>Order Summary </p>
      {products.map((product, i) => (
        <div className="flex justify-between mb-1 gap-2" key={i}>
          <p>{product.title}</p>
          <div className="flex gap-1">
            <p>$</p> <p> {product.price}</p>
          </div>
        </div>
      ))}
      <div className="flex justify-between py-2">
        <p>Order Delivery</p>
        <p>$ {shippingPrice.toFixed(2)}</p>
      </div>
      <div className="flex justify-between">
        <p>Taxes</p>
        <p>$ {tax.toFixed(2)}</p>
      </div>
      <div className={`${styles.body1} font-bold text-mint flex justify-between mt-1`}>
        <h2>Subtotal</h2>
        <h2>$ {subtotal.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default OrderSummary;
