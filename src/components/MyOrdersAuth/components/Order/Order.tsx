import React from 'react';
import OrderStepper from './../OrderStepper/OrderStepper';
import styles from '@/styles/Styles.module.scss';
import Button from '@/components/ui/Button';
// import { IOrder } from '@/constants/interfaces/order';

interface Props {
  orderData: any;
  className?: string;
  loading: boolean;
  error: any;
}

const Order: React.FC<Props> = ({ orderData, className, loading, error }): React.ReactElement => {
  const { order_id, date, firstName, secondName, phoneNumber, tax, totalPrice, status } = orderData;
  const { title, price, photo } = orderData.shoes;
  const originalDate = new Date(date);
  const year = originalDate.getFullYear();
  const month = String(originalDate.getMonth() + 1).padStart(2, '0');
  const day = String(originalDate.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  return (
    <div className={`lg:border-b-2 lg:border-lightGray lg:pb-5 mb-6 ${className}`}>
      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p>Error loading data</p>
      ) : (
        <>
          <OrderStepper step={status} />
          <div className="xl:flex xl:justify-between xl:mt-4 xl:gap-4">
            <div className="xl:basis-[50%] ">
              <h2 className={`${styles.subtitle} text-gray mt-6 `}>Order №{order_id}</h2>
              <p className="border-b-2 border-gray py-2 lg:border-none">Date {formattedDate}</p>
              <div className="border-b-2 border-gray py-2 lg:border-none">
                <div className="flex justify-between">
                  <p>Item Name</p>
                  <p>{title}</p>
                  <p className="">${price}</p>
                </div>
                <img src={photo} className="w-[160px]" />
                {/* <p>Color: Color Name / Category</p> */}
              </div>
              <div className="border-b-2 border-gray py-2 lg:border-none">
                <p className={`${styles.subtitle}`}>Shipping Information</p>
                <div className="flex justify-between">
                  <p className="py-2">Name Surname</p>
                  <p>
                    {firstName} {secondName}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p>Company</p>
                  <p>{'company'}</p>
                </div>
                <div className="flex justify-between py-2">
                  <p>Address</p>
                  <p>{'address'}</p>
                </div>
                <div className="flex justify-between">
                  <p>City, State, ZIP</p>
                  <p>
                    {'city'}, {'state'}, {'zip'}{' '}
                  </p>
                </div>
                <div className="flex justify-between py-2">
                  <p>Country/Region</p>
                  <p>{'country/region'} </p>
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
                  <p>${price} </p>
                </div>
                <div className="flex justify-between py-2">
                  <p>Order Delivery</p>
                  <p>$XXX </p>
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
              <Button color="gray" type="submit" className="my-4 mx-auto block">
                Track Delivery
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Order;
