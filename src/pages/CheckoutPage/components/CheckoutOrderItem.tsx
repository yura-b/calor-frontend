import React, { FC } from 'react';
import { DateFormatter } from '@/helpers/functions/dateFormatter.ts';
import { IOrderPurchaseInfo } from '@pages/CheckoutPage/components/CheckoutOrderSuccessfully.tsx';

interface IProps {
  order_number: number;
  date: string;
  products: IOrderPurchaseInfo[];
}

const CheckoutOrderItem: FC<IProps> = ({ order_number, date, products }) => {
  return (
    <div>
      <h3 className="font-bold mt-5">Order № {order_number}</h3>
      <p className="text-[#A7A7A7]">{DateFormatter(date)}</p>
      <hr className="lg:hidden mt-3 mb-3" />
      <div className="flex">
        <div>
          {products.map((product) => {
            return (
              <div key={Math.random()} className={'grid grid-cols-2 gap-10'}>
                <p>{product.productTitle}</p>
                <p>{product.price}$</p>
              </div>
            );
          })}
        </div>
      </div>
      <hr className="lg:hidden mt-3 mb-3" />
    </div>
  );
};

export default CheckoutOrderItem;
