import React from 'react';
import AdminLayout from '@layouts/admin/AdminLayout.tsx';
import GridHeader from '@components/admin/GridHeader.tsx';
import OrderGridPage from '@pages/admin/main/components/orderGrid/OrderGridPage.tsx';

const MainPage = () => {
  return (
    <AdminLayout>
      <GridHeader title={'Orders'} buttonTitle={'+ New OrderHistrory'} />
      <OrderGridPage />
    </AdminLayout>
  );
};

export default MainPage;
