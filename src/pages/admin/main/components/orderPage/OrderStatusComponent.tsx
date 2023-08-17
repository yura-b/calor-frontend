import React, { FC } from 'react';
import { OrderStatus } from '@/constants/interfaces/order.ts';
import { Clipboard } from '@phosphor-icons/react';

const OrderStatusComponent: FC<{ status: OrderStatus }> = ({ status }) => {
  return (
    <div className={'mb-5'}>
      <div className={'p-5'}>
        <div className={'flex flex-row gap-3 align-middle mb-2'}>
          <Clipboard weight={'fill'} size={32} />
          <p className={'font-bold'}>Order’s Status</p>
        </div>
        <p className={'font-bold'}>{status}</p>
      </div>
      <hr />
    </div>
  );
};

export default OrderStatusComponent;
