import React from 'react';
import OrderStepper from './../OrderStepper/OrderStepper';
import styles from '@/styles/Styles.module.scss';
import Button from '@/components/ui/Button';

interface Props {
  orderData?: any;
}

const Order: React.FC<Props> = ({ orderData }): React.ReactElement => {
  const { number, date, product, phoneNumber } = orderData.order;
  const { username, company, address, city, state, zip, country, region } = orderData.shippingInfo;

  return (
    <div className="mb-10 mt-2">
      <OrderStepper />
      <h2 className={`${styles.header2} text-gray mt-4 `}>Order {number}</h2>
      <p className="border-b-2 border-gray py-2">Date {date.toISOString().substring(0, 10)}</p>
      <div className="border-b-2 border-gray py-2">
        <div className="flex justify-between">
          <p>Item Name</p>
          <p>{product}</p>
          <p className="">XXX</p>
        </div>

        <p>Color: Color Name / Category</p>
      </div>
      <div className="border-b-2 border-gray py-2">
        <p className={`${styles.subtitle}`}>Shipping Information</p>
        <div className="flex justify-between">
          <p className="py-2">Name Surname</p>
          <p>{username}</p>
        </div>
        <div className="flex justify-between">
          <p>Company</p>
          <p>{company}</p>
        </div>
        <div className="flex justify-between py-2">
          <p>Address</p>
          <p>{address}</p>
        </div>
        <div className="flex justify-between">
          <p>City, State, ZIP</p>
          <p>
            {city}, {state}, {zip}{' '}
          </p>
        </div>
        <div className="flex justify-between py-2">
          <p>Country/Region</p>
          <p>
            {country}/{region}{' '}
          </p>
        </div>
        <div className="flex justify-between">
          <p>Phone Number</p>
          <p>{phoneNumber} </p>
        </div>
      </div>
      <div className="border-b-2 border-mint py-2">
        <p className={`${styles.subtitle}`}>Order Summary </p>
        <div className="flex justify-between">
          <p>Item</p>
          <p>$XXX </p>
        </div>
        <div className="flex justify-between py-2">
          <p>Order Delivery</p>
          <p>$XXX </p>
        </div>
        <div className="flex justify-between">
          <p>Taxes</p>
          <p>$XXX </p>
        </div>
        <div className="flex justify-between">
          <h2 className={`${styles.header2} `}>Subtotal</h2>
          <h2 className={`${styles.header2} `}>$XXX</h2>
        </div>
      </div>
      <Button color="gray" type="submit" className="mt-4">
        Track Delivery
      </Button>
    </div>
  );
};

export default Order;
