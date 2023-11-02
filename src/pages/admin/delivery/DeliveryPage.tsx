import React from 'react';
import AdminLayout from '@layouts/admin/AdminLayout.tsx';
import GridHeader from '@components/admin/GridHeader.tsx';
import DeliveryTable from '@pages/admin/delivery/components/DeliveryTable.tsx';

const DeliveryPage = () => {
  return (
    <AdminLayout>
      <GridHeader title={'Delivery Prices'} />
      <DeliveryTable />
    </AdminLayout>
  );
};

export default DeliveryPage;
