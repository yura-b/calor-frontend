import React from 'react';
import styles from '@/styles/Styles.module.scss';
import { shippingDetails } from '@/constants/interfaces/order';

interface Props {
  shippingInfo: shippingDetails;
  firstName?: string;
  secondName?: string;
}

const ShippingInfo: React.FC<Props> = ({ shippingInfo, firstName, secondName }): React.ReactElement => {
  const { streetAddress, city, state, ZIP, country, receiverPhoneNumber } = shippingInfo;
  return (
    <div className="border-b-2 border-gray py-2 lg:border-none">
      <p className={`${styles.subtitle}`}>Shipping Information</p>
      <p className="py-2">
        {firstName} {secondName}
      </p>
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
