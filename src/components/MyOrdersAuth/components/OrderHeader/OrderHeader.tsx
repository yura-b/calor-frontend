import React from 'react';
import styles from '@/styles/Styles.module.scss';
import { IOrder } from '@/constants/interfaces/order';

interface Props {
  orderData: IOrder;
}

const OrderHeader: React.FC<Props> = ({ orderData }): React.ReactElement => {
  const { date, order_id, totalPrice } = orderData;
  const product = orderData?.shoes || orderData?.accessory;
  if (!product) return <></>;
  const { title, photos } = product;
  const originalDate = new Date(date);
  const year = originalDate.getFullYear();
  const month = String(originalDate.getMonth() + 1).padStart(2, '0');
  const day = String(originalDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  return (
    <div>
      <h2 className={`${styles.subtitle} text-gray mt-6 `}>Order №{order_id}</h2>
      <p className="border-b-2 border-gray py-2 lg:border-none">Date {formattedDate}</p>
      <div className="border-b-2 border-gray py-2 lg:border-none">
        <div className="flex justify-between">
          <p className="font-bold">{title}</p>
          <p className="">$ {totalPrice}</p>
        </div>
        <img src={photos[0]} className="object-contain object-cover w-[240px] block h-auto m-auto py-2" />
      </div>
    </div>
  );
};

export default OrderHeader;
