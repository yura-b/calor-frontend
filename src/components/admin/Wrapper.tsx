import React from 'react';
import { OrderStatus } from '@/constants/interfaces/order.ts';

const Wrapper: React.FC<{ status?: OrderStatus; title?: string }> = ({ status, title }) => {
  const statusName: OrderStatus | string = status || title || 'Unpaid';

  return <span className={'rounded-full text-center text-black px-3 py-1 bg-neutral-300'}>{statusName}</span>;
};

export default Wrapper;
