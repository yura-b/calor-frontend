import React from 'react';
import AdminLayout from '@layouts/admin/AdminLayout.tsx';
import OrdersGrid from '@pages/admin/main/components/OrdersGrid.tsx';

const MainPage = () => {
  return (
    <AdminLayout>
      <OrdersGrid />
    </AdminLayout>
  );
};

export default MainPage;
