import React from 'react';
import Head from '@/layouts/Head';
import { titles } from '@/translations/titles';
import MainLayout from '@/components/MainLayout';
import styles from '@styles/Styles.module.scss';
import SubCategoriesProductsList from '@/components/SubCategoriesProductsList/SubCategoriesProductsList';
import { useQuery } from 'react-query';
import { getAccessories } from '@/api/products';
import Loader from '@/components/ui/Loader';

const AccessoriesPage: React.FC = (): React.ReactElement => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery('accessories', getAccessories, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
  console.log(products);
  const accessories = products?.data || [];

  return (
    <div className="font-poppins h-screen">
      <Head title={titles.accessories} />
      <MainLayout>
        {isLoading && <Loader />}
        <div className={`${styles.container}`}>
          <SubCategoriesProductsList products={accessories} />
        </div>
      </MainLayout>
    </div>
  );
};

export default AccessoriesPage;
