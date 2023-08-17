import React, { useEffect, useState } from 'react';
import { getDetails } from '@/api/warehouse.ts';
import AdminLayout from '@layouts/admin/AdminLayout.tsx';

import GridHeader from '@components/admin/GridHeader.tsx';
import DetailsGrid from '@pages/admin/warehouse/components/DetailsGrid.tsx';
import { Detail, products } from '@/constants/interfaces/details.ts';
import { useAppDispatch } from '@/store/hooks/hooks.ts';
import { loading, loadingFinished } from '@/store/reducers/StatusReducer.ts';
import { useCleanUserDataAndNavigateToLogin } from '@/hooks/CleanUserData.ts';
import WarehouseFilters from '@pages/admin/warehouse/components/WarehouseFilters.tsx';
import { ProductsEnum } from '@/constants/enums/products.enum.ts';
import { SelectChangeEvent } from '@mui/material/Select';

export interface DetailsAndProductName {
  detail: Detail;
  products: products;
}

const WarehousePage = () => {
  const [details, setDetails] = useState<DetailsAndProductName[]>([]);
  const [productFilter, setProductFilter] = useState<ProductsEnum>(ProductsEnum.empty);
  const dispatch = useAppDispatch();
  const cleanUserData = useCleanUserDataAndNavigateToLogin();

  const onChangeFilter = (e: SelectChangeEvent) => {
    setProductFilter(e.target.value as ProductsEnum);
  };

  useEffect(() => {
    dispatch(loading());
    getDetails(productFilter)
      .then((res) => {
        setDetails(res.data);

        dispatch(loadingFinished());
      })
      .catch((e) => {
        cleanUserData(e);
      });
  }, [productFilter]);

  if (!details) return;
  return (
    <AdminLayout>
      <GridHeader title={'Details'} />
      <WarehouseFilters setProductFilter={onChangeFilter} productValue={productFilter} />
      <DetailsGrid details={details} setDetails={setDetails} />
    </AdminLayout>
  );
};

export default WarehousePage;
