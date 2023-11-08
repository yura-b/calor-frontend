import React from 'react';
import OrderStepper from './../OrderStepper/OrderStepper';
import Button from '@/components/ui/Button';
import { IOrder, OrderStatus } from '@/constants/interfaces/order';
import ShippingInfo from '../ShippingInfo';
import OrderSummary from '../OrderSummary';
import OrderHeader from '../OrderHeader';

interface Props {
  orderData: IOrder;
  className?: string;
  loading?: boolean;
  error?: any;
  token: string | null;
}

const Order: React.FC<Props> = ({ orderData, className, loading, error, token }): React.ReactElement => {
  const { status } = orderData;
  const stepsCustom = [OrderStatus.PROCESSING, OrderStatus.PRODUCTION, OrderStatus.QualityControl];
  const stepsNoCustom = [OrderStatus.PROCESSING, OrderStatus.QualityControl];
  const stepsCustomNotAuth = [
    OrderStatus.PROCESSING,
    OrderStatus.PRODUCTION,
    OrderStatus.QualityControl,
    OrderStatus.Shipped,
  ];
  const stepsNoCustomNotAuth = [OrderStatus.PROCESSING, OrderStatus.QualityControl, OrderStatus.Shipped];

  return (
    <div className={`lg:border-b-2 lg:border-lightGray lg:pb-5 mb-6 ${className}`}>
      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p>Error loading data</p>
      ) : (
        <>
          {orderData?.shoes && token && <OrderStepper step={status} steps={stepsCustom} />}
          {orderData?.accessory && token && <OrderStepper step={status} steps={stepsNoCustom} />}
          {orderData?.shoes && !token && <OrderStepper step={status} steps={stepsCustomNotAuth} />}
          {orderData?.accessory && !token && <OrderStepper step={status} steps={stepsNoCustomNotAuth} />}
          <div className="xl:flex xl:justify-between xl:mt-4 xl:gap-4">
            <div className="xl:basis-[50%] ">
              <OrderHeader orderData={orderData} />
              <ShippingInfo shippingInfo={orderData.shippingInfo} />
            </div>
            <div className="xl:basis-[40%]">
              <OrderSummary orderData={orderData} />
              {/* <Button color="gray" type="submit" className="my-4 mx-auto block">
                Track Delivery
              </Button> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Order;
