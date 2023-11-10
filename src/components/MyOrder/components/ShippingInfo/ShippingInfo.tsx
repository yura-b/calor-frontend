import React from 'react';
import styles from '@/styles/Styles.module.scss';
import { IOrder } from '@/constants/interfaces/order';

interface Props {
  orderData: IOrder;
}

const ShippingInfo: React.FC<Props> = ({ orderData }): React.ReactElement => {
  const { fullName } = orderData;
  const { streetAddress, city, state, ZIP, country, receiverPhoneNumber } = orderData.shippingInfo;
  return (
    <div className="border-b-2 border-gray py-2 lg:border-none">
      <p className={`${styles.subtitle}`}>Shipping Information</p>
      <p className="py-2">{fullName}</p>
      <p>{streetAddress}</p>
      <p className="py-2">
        {city}, {state}, {ZIP}
      </p>
      <p>{country} </p>
      <p className="py-2">{receiverPhoneNumber} </p>
    </div>
  );
};

export default ShippingInfo;
