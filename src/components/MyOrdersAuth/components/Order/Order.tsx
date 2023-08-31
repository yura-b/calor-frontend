import React from 'react';
import OrderStepper from './../OrderStepper/OrderStepper';
import styles from '@/styles/Styles.module.scss';
import Button from '@/components/ui/Button';

interface Props {
  orderData?: any;
  className?: string;
}

const Order: React.FC<Props> = ({ orderData, className }): React.ReactElement => {
  const { number, date, product, phoneNumber } = orderData.order;
  const { username, company, address, city, state, zip, country, region } = orderData.shippingInfo;

  return (
    <div className={`lg:border-b-2 lg:border-lightGray lg:pb-5 mb-6 ${className}`}>
      <OrderStepper />
      <div className="xl:flex xl:justify-between xl:mt-4 xl:gap-4">
        <div className="xl:basis-[50%] ">
          <h2 className={`${styles.subtitle} text-gray mt-6 `}>Order №{number}</h2>
          <p className="border-b-2 border-gray py-2 lg:border-none">Date {date.toISOString().substring(0, 10)}</p>
          <div className="border-b-2 border-gray py-2 lg:border-none">
            <div className="flex justify-between">
              <p>Item Name</p>
              <p>{product}</p>
              <p className="">XXX</p>
            </div>

            <p>Color: Color Name / Category</p>
          </div>
          <div className="border-b-2 border-gray py-2 lg:border-none">
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
        </div>
        <div className="xl:basis-[40%]">
          <div className="border-b-2 border-mint py-2 lg:border-none">
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
            <div className={`${styles.body2} font-bold text-mint flex justify-between`}>
              <h2>Subtotal</h2>
              <h2>$XXX</h2>
            </div>
          </div>
          <Button color="gray" type="submit" className="my-4 mx-auto block">
            Track Delivery
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Order;
