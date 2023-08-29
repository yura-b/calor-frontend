import React from 'react';
import MyOrdersAuth from '@/components/MyOrdersAuth';

import AccountLayout from '../AccountLayout';

const MyOrders: React.FC = (): React.ReactElement => {
  return (
    <AccountLayout>
      <MyOrdersAuth />
    </AccountLayout>
  );
};

export default MyOrders;
