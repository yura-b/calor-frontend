import React from 'react';
import OrderStepper from './../OrderStepper/OrderStepper';
import { IOrder, OrderStatus } from '@/constants/interfaces/order';
import ShippingInfo from '../ShippingInfo';
import OrderSummary from '../OrderSummary';
import OrderHeader from '../OrderHeader';
import styles from '@/styles/Styles.module.scss';

interface Props {
  orderData: IOrder;
  className?: string;
  loading?: boolean;
  error?: any;
}

const Order: React.FC<Props> = ({ orderData, className, loading, error }): React.ReactElement => {
  const { status } = orderData;
  const stepsCustom = [OrderStatus.PROCESSING, OrderStatus.PRODUCTION, OrderStatus.QualityControl, OrderStatus.Shipped];
  const { products, order_id, date } = orderData;
  const originalDate = new Date(date);
  const year = originalDate.getFullYear();
  const month = String(originalDate.getMonth() + 1).padStart(2, '0');
  const day = String(originalDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  return (
    <div className={`lg:border-b-2 lg:border-lightGray lg:pb-5 mb-6 ${className} xl:max-w-[50vw]`}>
      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p>Error loading data</p>
      ) : (
        <>
          {orderData && <OrderStepper step={status} steps={stepsCustom} />}

          <div className="border-b-2 border-gray">
            <h2 className={`${styles.subtitle} text-gray mt-6 `}>Order №{order_id}</h2>
            <p className="py-2 ">Date {formattedDate}</p>
          </div>
          <div className="lg:flex justify-between  xl:mt-4 xl:gap-4 ">
            <div className="basis-[45%] flex flex-wrap lg:block  gap-4 justify-between ">
              {products?.map((product, i) => (
                <OrderHeader product={product} index={i} />
              ))}
            </div>
            <div className="basis-[50%] flex flex-col md:flex-row lg:flex-col justify-between lg:justify-start">
              <div className="basis-[46%] lg:basis-auto">
                <ShippingInfo orderData={orderData} />
              </div>
              <div className="basis-[46%] lg:basis-auto">
                <OrderSummary orderData={orderData} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Order;
