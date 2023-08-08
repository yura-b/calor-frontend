import React, { useEffect, useState } from 'react';
import { getDetails } from '@/api/warehouse.ts';
import AdminLayout from '@layouts/admin/AdminLayout.tsx';

import GridHeader from '@components/admin/GridHeader.tsx';
import DetailsGrid from '@pages/admin/warehouse/components/DetailsGrid.tsx';
import { Detail, ProductNameAndId } from '@/constants/interfaces/details.ts';

export interface DetailsAndProductName {
  details: Detail[];
  productsName: ProductNameAndId[];
}

const WarehousePage = () => {
  const [details, setDetails] = useState<DetailsAndProductName>();
  useEffect(() => {
    getDetails().then((res) => {
      setDetails(res.data);
    });
  }, []);
  if (!details) return;
  return (
    <AdminLayout>
      <GridHeader title={'Details'} />
      <DetailsGrid details={details} />
    </AdminLayout>
  );
};

export default WarehousePage;
